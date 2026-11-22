"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getCheckoutAvailability } from "@/lib/api/client";
import { getPublicProduct } from "@/lib/products/public-catalog";

type Availability = "checking" | "available" | "unavailable";
type PublicAvailability = Record<string, { available: boolean }>;
type Snapshot =
  | { status: "checking" | "unavailable" }
  | { status: "ready"; products: PublicAvailability };

const checking: Snapshot = { status: "checking" };
const unavailable: Snapshot = { status: "unavailable" };
let snapshot: Snapshot = checking;
const listeners = new Set<() => void>();

// Browser effects and retries share only public, non-personal availability.
// Every control observes the same acknowledgement, never orders or tokens.
let pending:
  | {
      expiresAt: number;
      request: Promise<PublicAvailability>;
      settled: boolean;
    }
  | undefined;
let retryTimer: ReturnType<typeof setTimeout> | undefined;
let automaticRetries = 0;
const RETRY_DELAYS = [20_000, 40_000, 60_000] as const;

function clearAutomaticRetry() {
  clearTimeout(retryTimer);
  retryTimer = undefined;
}

function canRefresh() {
  return document.visibilityState !== "hidden" && navigator.onLine !== false;
}

function scheduleAutomaticRetry() {
  clearAutomaticRetry();
  const delay = RETRY_DELAYS[automaticRetries];
  if (
    snapshot.status !== "unavailable" ||
    !listeners.size ||
    !canRefresh() ||
    delay === undefined
  )
    return;
  retryTimer = setTimeout(() => {
    retryTimer = undefined;
    if (!canRefresh()) return;
    automaticRetries += 1;
    readAvailability(true);
  }, delay);
}

function refreshOnResume() {
  if (!canRefresh() || (pending && !pending.settled)) return;
  if (snapshot.status === "unavailable") automaticRetries = 0;
  readAvailability(snapshot.status === "unavailable");
}

function refreshOnReconnect() {
  if (!canRefresh() || (pending && !pending.settled)) return;
  automaticRetries = 0;
  readAvailability(true);
}

function publish(value: Snapshot) {
  if (snapshot === value) return;
  snapshot = value;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    automaticRetries = 0;
    window.addEventListener("focus", refreshOnResume);
    window.addEventListener("online", refreshOnReconnect);
    document.addEventListener("visibilitychange", refreshOnResume);
    scheduleAutomaticRetry();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      clearAutomaticRetry();
      window.removeEventListener("focus", refreshOnResume);
      window.removeEventListener("online", refreshOnReconnect);
      document.removeEventListener("visibilitychange", refreshOnResume);
    }
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return checking;
}

export function resetCheckoutAvailability() {
  clearAutomaticRetry();
  automaticRetries = 0;
  pending = undefined;
  publish(checking);
}

function readAvailability(force = false) {
  if (!force && pending && pending.expiresAt > Date.now()) return;
  clearAutomaticRetry();
  const request = (async () => {
    const value = await getCheckoutAvailability();
    if (
      !value ||
      typeof value !== "object" ||
      !("ok" in value) ||
      value.ok !== true ||
      !("products" in value) ||
      !value.products ||
      typeof value.products !== "object" ||
      Array.isArray(value.products)
    )
      throw new Error("Checkout availability is unavailable.");
    const result: PublicAvailability = {};
    for (const [slug, product] of Object.entries(value.products)) {
      if (!getPublicProduct(slug)) continue;
      if (
        !product ||
        typeof product !== "object" ||
        !("available" in product) ||
        typeof product.available !== "boolean"
      )
        throw new Error("Checkout availability is unavailable.");
      result[slug] = { available: product.available };
    }
    return result;
  })();
  const current = {
    expiresAt: Date.now() + 20_000,
    request,
    settled: false,
  };
  pending = current;
  // Keep a visible failure steady during a background recovery attempt.
  // A closed offer is never changed to available without a new server response.
  if (snapshot.status !== "unavailable") publish(checking);
  void request.then(
    (products) => {
      current.settled = true;
      // A superseded request must not reopen an offer closed by a newer read.
      if (pending === current) {
        automaticRetries = 0;
        publish({ status: "ready", products });
      }
    },
    () => {
      current.settled = true;
      if (pending === current) {
        publish(unavailable);
        scheduleAutomaticRetry();
      }
    },
  );
}

function retryAvailability() {
  resetCheckoutAvailability();
  readAvailability();
}

export function useCheckoutAvailability(productSlug: string): {
  status: Availability;
  retry: () => void;
} {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    readAvailability();
  }, [productSlug]);
  return {
    status:
      state.status === "ready"
        ? state.products[productSlug]?.available === true
          ? "available"
          : "unavailable"
        : state.status,
    retry: retryAvailability,
  };
}

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
  { expiresAt: number; request: Promise<PublicAvailability> } | undefined;

function publish(value: Snapshot) {
  if (snapshot === value) return;
  snapshot = value;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return checking;
}

export function resetCheckoutAvailability() {
  pending = undefined;
  publish(checking);
}

function readAvailability() {
  if (pending && pending.expiresAt > Date.now()) return;
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
  const current = { expiresAt: Date.now() + 20_000, request };
  pending = current;
  publish(checking);
  void request.then(
    (products) => {
      // A superseded request must not reopen an offer closed by a newer read.
      if (pending === current) publish({ status: "ready", products });
    },
    () => {
      if (pending === current) publish(unavailable);
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

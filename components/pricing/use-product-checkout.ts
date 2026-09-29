"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { createCheckoutSession } from "@/lib/api/client";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { trackMoneyPathEvent } from "@/lib/analytics";

export function useProductCheckout(input: {
  productSlug: string;
  productName: string | null;
  email?: string;
}) {
  const pathname = usePathname();
  const key = JSON.stringify([pathname, input.productSlug, input.email]);
  const active = React.useRef<{
    key: string;
    controller: AbortController;
  } | null>(null);
  const [state, setState] = React.useState<{
    key: string;
    status: "idle" | "pending" | "failed";
  }>({ key, status: "idle" });
  // Reset on identity changes, including A → B → A on a persistent component.
  if (state.key !== key) setState({ key, status: "idle" });

  React.useLayoutEffect(() => {
    const abandon = () => {
      active.current?.controller.abort();
      active.current = null;
    };
    const onPageHide = () => {
      abandon();
      setState({ key, status: "idle" });
    };
    window.addEventListener("pagehide", onPageHide);
    return () => {
      abandon();
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [key]);

  async function handleBuy() {
    // Synchronous guard: also covers activations before React commits disabled.
    if (active.current?.key === key) return;
    active.current?.controller.abort();
    const attempt = { key, controller: new AbortController() };
    active.current = attempt;
    setState({ key, status: "pending" });

    function track(
      event:
        | "buy_clicked"
        | "checkout_redirect_started"
        | "checkout_redirect_failed",
    ) {
      try {
        trackMoneyPathEvent({
          event,
          productSlug: input.productSlug,
          productName: input.productName,
          page: globalThis.location.pathname,
          ...(event === "checkout_redirect_failed" ? { status: "error" } : {}),
        });
      } catch {
        // Optional telemetry must never control purchase or recovery.
      }
    }

    track("buy_clicked");
    try {
      const url = await createCheckoutSession(
        {
          productSlug: input.productSlug,
          email: input.email,
        },
        { signal: attempt.controller.signal },
      );
      if (active.current !== attempt || attempt.controller.signal.aborted)
        return;
      track("checkout_redirect_started");
      navigateToCheckout(url);
    } catch {
      if (active.current !== attempt) return;
      active.current = null;
      setState({ key, status: "failed" });
      track("checkout_redirect_failed");
    }
  }

  return {
    handleBuy,
    isLoading: state?.key === key && state.status === "pending",
    hasError: state?.key === key && state.status === "failed",
  };
}

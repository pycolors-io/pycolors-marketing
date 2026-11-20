"use client";

import { useEffect, useState } from "react";
import { getCheckoutAvailability } from "@/lib/api/client";
import { getPublicProduct } from "@/lib/products/public-catalog";

type Availability = "checking" | "available" | "unavailable";
type PublicAvailability = Record<string, { available: boolean }>;

// This cache is filled only in browser effects. It deduplicates public,
// non-personal availability reads across purchase controls, never orders/tokens.
let pending:
  { expiresAt: number; request: Promise<PublicAvailability> } | undefined;

export function resetCheckoutAvailability() {
  pending = undefined;
}

async function readAvailability(): Promise<PublicAvailability> {
  if (pending && pending.expiresAt > Date.now()) return pending.request;
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
  pending = { expiresAt: Date.now() + 20_000, request };
  return request;
}

export function useCheckoutAvailability(productSlug: string) {
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState<{ slug: string; status: Availability }>({
    slug: productSlug,
    status: "checking",
  });
  useEffect(() => {
    let active = true;
    readAvailability().then(
      (products) => {
        if (active)
          setState({
            slug: productSlug,
            status:
              products[productSlug]?.available === true
                ? "available"
                : "unavailable",
          });
      },
      () => {
        if (active) setState({ slug: productSlug, status: "unavailable" });
      },
    );
    return () => {
      active = false;
    };
  }, [productSlug, revision]);
  return {
    status: state.slug === productSlug ? state.status : "checking",
    retry: () => {
      resetCheckoutAvailability();
      setState({ slug: productSlug, status: "checking" });
      setRevision((value) => value + 1);
    },
  };
}

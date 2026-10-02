import type { PublicProductSlug } from "@/lib/products/public-catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL.");
}

// Initial UX bound, not a payment cancellation guarantee or measured SLA.
export const CHECKOUT_TIMEOUT_MS = 30_000;

export async function createCheckoutSession(
  input: {
    productSlug: string;
    email?: string;
  },
  options: { signal?: AbortSignal } = {},
) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timeout = setTimeout(abort, CHECKOUT_TIMEOUT_MS);
  options.signal?.addEventListener("abort", abort, { once: true });
  if (options.signal?.aborted) abort();

  // Race the entire operation, including body parsing. Some transports ignore abort.
  let onAbort: () => void = () => {};
  const cancelled = new Promise<never>((_, reject) => {
    onAbort = () => reject(new Error("Checkout request interrupted."));
    controller.signal.addEventListener("abort", onAbort, { once: true });
    if (controller.signal.aborted) onAbort();
  });

  try {
    return await Promise.race([
      cancelled,
      (async () => {
        controller.signal.throwIfAborted();
        const response = await fetch(`${API_BASE_URL}/api/v1/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          signal: controller.signal,
        });
        const data: unknown = await response.json();
        if (
          !response.ok ||
          typeof data !== "object" ||
          data === null ||
          !("url" in data) ||
          typeof data.url !== "string" ||
          !data.url.trim()
        ) {
          throw new Error("Invalid checkout response.");
        }
        const url = new URL(data.url);
        // Hosted Checkout supports Stripe-configured custom domains.
        if (url.protocol !== "https:" || url.username || url.password) {
          throw new Error("Invalid checkout destination.");
        }
        controller.signal.throwIfAborted();
        return data.url;
      })(),
    ]);
  } catch {
    // Never propagate arbitrary response bodies, network or parsing diagnostics.
    throw new Error("Unable to create checkout session.");
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", abort);
    controller.signal.removeEventListener("abort", onAbort);
  }
}

/**
 * Legacy helper kept for backward compatibility.
 */
export function createStarterProCheckout(input?: { email?: string }) {
  return createCheckoutSession({
    productSlug: "starter-pro",
    email: input?.email,
  });
}

export const RECOVERY_FAILURE_MESSAGE =
  "Unable to request your access link. Please try again or contact support.";

export async function recoverCommerceAccess(input: {
  email: string;
  productSlug?: PublicProductSlug;
}): Promise<{ ok: true }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/recover`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data: unknown = await response.json();
    if (
      !response.ok ||
      typeof data !== "object" ||
      data === null ||
      Array.isArray(data) ||
      Object.keys(data).length !== 1 ||
      !("ok" in data) ||
      data.ok !== true
    ) {
      throw new Error(RECOVERY_FAILURE_MESSAGE);
    }
    return { ok: true };
  } catch {
    // Old API responses and transport exceptions are untrusted too.
    throw new Error(RECOVERY_FAILURE_MESSAGE);
  }
}

/**
 * Legacy helper kept for backward compatibility.
 */
export function recoverStarterProAccess(input: { email: string }) {
  return recoverCommerceAccess({
    email: input.email,
    productSlug: "starter-pro",
  });
}

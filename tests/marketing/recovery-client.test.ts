import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(Response.json({ ok: true })),
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("recovery client contract", () => {
  it.each(["starter-pro", "na-ai-landing"] as const)(
    "sends the explicit %s selection",
    async (productSlug) => {
      const { recoverCommerceAccess } = await import("@/lib/api/client");
      await recoverCommerceAccess({ email: "buyer@example.com", productSlug });
      expect(fetch).toHaveBeenCalledExactlyOnceWith(
        "https://api.example.com/api/v1/orders/recover",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "buyer@example.com", productSlug }),
        },
      );
    },
  );
  it("preserves the optional-product compatibility request", async () => {
    const { recoverCommerceAccess } = await import("@/lib/api/client");
    await recoverCommerceAccess({ email: "buyer@example.com" });
    expect(
      JSON.parse(vi.mocked(fetch).mock.calls[0]![1]!.body as string),
    ).toEqual({ email: "buyer@example.com" });
  });
  it("pins the historical helper to Starter Pro", async () => {
    const { recoverStarterProAccess } = await import("@/lib/api/client");
    await recoverStarterProAccess({ email: "buyer@example.com" });
    expect(
      JSON.parse(vi.mocked(fetch).mock.calls[0]![1]!.body as string),
    ).toEqual({ email: "buyer@example.com", productSlug: "starter-pro" });
  });
});

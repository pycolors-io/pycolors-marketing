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

describe("recovery response privacy", () => {
  const marker = "synthetic-private-recovery-marker";
  it("accepts only the explicit neutral result, including old-client-compatible success", async () => {
    const { recoverCommerceAccess } = await import("@/lib/api/client");
    await expect(
      recoverCommerceAccess({ email: "buyer@example.com" }),
    ).resolves.toEqual({ ok: true });
  });
  it.each([
    null,
    [],
    {},
    true,
    { ok: false },
    { ok: "true" },
    { error: marker },
    { ok: true, error: marker },
  ])(
    "rejects malformed success payload %# without forwarding content",
    async (body) => {
      vi.mocked(fetch).mockResolvedValue(Response.json(body));
      const { recoverCommerceAccess, RECOVERY_FAILURE_MESSAGE } =
        await import("@/lib/api/client");
      await expect(
        recoverCommerceAccess({ email: "buyer@example.com" }),
      ).rejects.toThrow(RECOVERY_FAILURE_MESSAGE);
    },
  );
  it.each(["legacy-error", "network", "invalid-json", "body-read"])(
    "sanitizes %s without logging or automatic retry",
    async (failure) => {
      const logs = [
        vi.spyOn(console, "error"),
        vi.spyOn(console, "warn"),
        vi.spyOn(console, "log"),
      ];
      if (failure === "network")
        vi.mocked(fetch).mockRejectedValue(new Error(marker));
      else if (failure === "invalid-json")
        vi.mocked(fetch).mockResolvedValue(new Response("<html>"));
      else if (failure === "body-read") {
        const response = Response.json({ ok: true });
        vi.spyOn(response, "json").mockRejectedValue(new Error(marker));
        vi.mocked(fetch).mockResolvedValue(response);
      } else
        vi.mocked(fetch).mockResolvedValue(
          Response.json({ error: marker }, { status: 400 }),
        );
      const { recoverCommerceAccess, RECOVERY_FAILURE_MESSAGE } =
        await import("@/lib/api/client");
      const error: unknown = await recoverCommerceAccess({
        email: "buyer@example.com",
      }).catch((value: unknown) => value);
      expect(
        error instanceof Error &&
          error.message === RECOVERY_FAILURE_MESSAGE &&
          error.cause === undefined,
      ).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      for (const log of logs) {
        expect(log).not.toHaveBeenCalled();
        log.mockRestore();
      }
    },
  );
});

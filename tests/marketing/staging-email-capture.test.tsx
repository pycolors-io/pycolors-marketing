import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import StagingEmailsPage from "@/app/[locale]/staging/emails/page";
import {
  capturedClaimHref,
  isolatedEmailPreview,
} from "@/lib/staging/email-capture";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
}));
const base = "https://staging.example.com";
const authToken = "server-only-capture-secret";
const privateClaim = `${base}/fr/orders/claim?token=synthetic_private_claim`;

beforeEach(() => {
  vi.stubEnv("COMMERCE_ENVIRONMENT", "staging");
  vi.stubEnv("STAGING_CAPTURE_TOKEN", authToken);
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api-staging.example.com");
  vi.stubEnv("APP_BASE_URL", base);
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("private staging capture viewer", () => {
  it.each(["production", "test", "development", ""])(
    "is absent in environment %s before any fetch",
    async (environment) => {
      vi.stubEnv("COMMERCE_ENVIRONMENT", environment);
      await expect(StagingEmailsPage()).rejects.toThrow("NOT_FOUND");
      expect(fetch).not.toHaveBeenCalled();
    },
  );

  it("is absent without the server credential", async () => {
    vi.stubEnv("STAGING_CAPTURE_TOKEN", "");
    await expect(StagingEmailsPage()).rejects.toThrow("NOT_FOUND");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("uses server-to-server auth/no-store while rendering no bearer credential", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({
        ok: true,
        emails: [
          {
            id: "capture-1",
            createdAt: "2026-11-20T12:00:00.000Z",
            to: "buyer@example.com",
            subject: "Your Mobile access",
            html: `<a href="${privateClaim}">Claim access</a><a href="${privateClaim}">Same access</a>`,
            kind: "order",
            productSlug: "starter-pro-mobile",
            orderReference: "order-1",
          },
        ],
      }),
    );
    const markup = renderToStaticMarkup(await StagingEmailsPage());
    expect(fetch).toHaveBeenCalledWith(
      "https://api-staging.example.com/api/internal/staging/emails",
      expect.objectContaining({
        cache: "no-store",
        headers: { Authorization: `Bearer ${authToken}` },
      }),
    );
    expect(markup).not.toContain(authToken);
    expect(markup).toContain(
      'href="/fr/orders/claim?token=synthetic_private_claim"',
    );
    expect(markup).toContain('sandbox=""');
    expect(markup).toContain("Content-Security-Policy");
  });

  it("does not expose arbitrary provider errors", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error(authToken));
    const markup = renderToStaticMarkup(await StagingEmailsPage());
    expect(markup).not.toContain(authToken);
    expect(markup).toContain("Captured messages are unavailable");
  });

  it("keeps arbitrary message HTML inert, including refresh, scripts and external resources", () => {
    const preview = isolatedEmailPreview(
      '<meta http-equiv="refresh" content="0;url=https://invalid.example/private"><script>alert(1)</script><img src="https://invalid.example/private">',
    );
    expect(preview).not.toContain('<meta http-equiv="refresh"');
    expect(preview).not.toContain("<script>");
    expect(preview).not.toContain("<img src=");
    expect(preview).toContain("&lt;meta");
    expect(preview).toContain("default-src 'none'");
  });

  it.each([
    "https://other.example.com/orders/claim?token=private",
    `${base}/orders/claim?token=one&token=two`,
    `${base}/orders/claim?token=private&email=buyer`,
    `${base}/orders/recover?token=private`,
  ])("does not turn an unqualified email link into a claim action", (url) => {
    expect(capturedClaimHref(`<a href="${url}">access</a>`, base)).toBeNull();
  });
});

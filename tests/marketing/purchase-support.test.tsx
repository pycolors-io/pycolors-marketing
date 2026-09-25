import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import PurchaseSupportPage from "../../app/(site)/orders/support/page";
import ClaimOrderPage from "../../app/(site)/orders/claim/page";
import CheckoutCancelPage from "../../app/(site)/checkout/cancel/page";

vi.mock("@/components/analytics/money-path-event", () => ({
  MoneyPathPageEvent: () => null,
}));

describe("Purchase support", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("offers accessible email contact, a fallback and recovery without contacting the API", async () => {
    const { container } = render(<PurchaseSupportPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Get help with your purchase",
    );
    expect(
      screen.getByRole("link", { name: "Write to support" }),
    ).toHaveAttribute(
      "href",
      "mailto:support@pycolors.com?subject=PyColors%20purchase%20support",
    );
    expect(
      screen.getByRole("link", { name: "support@pycolors.com" }),
    ).toHaveAttribute("href", "mailto:support@pycolors.com");
    expect(
      screen.getByText(/If nothing opens, copy the address/),
    ).toHaveTextContent("it does not send a request");
    expect(screen.getByText(/Do not send passwords/)).toHaveTextContent(
      "claim/download links",
    );
    expect(
      screen.getByRole("link", { name: "Recover purchase access" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(fetch).not.toHaveBeenCalled();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("offers support when checkout is cancelled", () => {
    render(<CheckoutCancelPage />);

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
  });

  it("offers support without requiring a claim token", async () => {
    render(await ClaimOrderPage({ searchParams: Promise.resolve({}) }));

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("keeps unavailable access recoverable without passing the token to support", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({ ok: false }, { status: 410 }),
    );
    render(
      await ClaimOrderPage({
        searchParams: Promise.resolve({ token: "expired-test-token" }),
      }),
    );

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("link", { name: "Resend access link" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(screen.queryByRole("link", { name: /Download package/ })).toBeNull();
  });

  it("preserves the download while keeping buyer data out of the support destination", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({
        ok: true,
        claim: {
          productSlug: "starter-pro",
          productName: "Starter Pro",
          orderReference: "test-order-reference",
          customerEmail: "buyer@example.com",
          paidAt: null,
        },
      }),
    );
    render(
      await ClaimOrderPage({
        searchParams: Promise.resolve({ token: "valid-test-token" }),
      }),
    );

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("link", { name: /Download package/ }),
    ).toHaveAttribute(
      "href",
      "https://api.example.com/api/v1/downloads/valid-test-token",
    );
  });
});

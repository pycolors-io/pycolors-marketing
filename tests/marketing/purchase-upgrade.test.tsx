import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { parseClaimResponse } from "@/lib/api/claim-contract";
import {
  COMMERCE_TERMS_VERSION,
  UPGRADE_DISPLAY,
} from "@/lib/products/public-catalog";
import { createCheckoutSession } from "@/lib/api/client";
import { PurchaseUpgrade } from "@/components/orders/purchase-upgrade";

vi.mock("next/navigation", () => ({ usePathname: () => "/orders/claim" }));
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/api/client", () => ({ createCheckoutSession: vi.fn() }));
// An upgrade has its own acknowledged Stripe price. Base Fullstack availability
// must not override the server's original-order quote.
vi.mock("@/components/pricing/use-checkout-availability", () => ({
  useCheckoutAvailability: () => ({ status: "unavailable", retry: () => {} }),
}));
const claim = {
  productSlug: "starter-pro",
  productName: "PyColors Starter Pro",
  orderReference: "order-synthetic",
  customerEmail: "buyer@example.com",
  paidAt: null,
};

describe("verified purchase upgrade presentation", () => {
  it.each(["web-to-fullstack", "mobile-to-fullstack"] as const)(
    "accepts only the acknowledged %s quote and keeps its original purchase",
    (offerKey) => {
      const offer = UPGRADE_DISPLAY[offerKey];
      const result = parseClaimResponse({
        ok: true,
        claim: {
          ...claim,
          productSlug: offer.sourceProductSlug,
          upgrade: {
            eligible: true,
            available: true,
            targetProductSlug: offer.targetProductSlug,
            offerKey,
            amountTotal: offer.amountTotal,
            currency: "eur",
            termsVersion: COMMERCE_TERMS_VERSION,
          },
        },
      });
      expect(result?.claim.upgrade).not.toBeNull();
      expect(result?.claim.orderReference).toBe(claim.orderReference);
      render(
        <PurchaseUpgrade
          upgrade={result!.claim.upgrade!}
          token="private-synthetic-claim-token"
        />,
      );
      expect(
        screen.getByRole("button", { name: /Upgrade to Fullstack/ }),
      ).toBeEnabled();
      expect(
        screen.getByText(/Your existing purchase access remains available/),
      ).toBeVisible();
      expect(screen.queryByText("private-synthetic-claim-token")).toBeNull();
    },
  );

  it("submits only the target SKU, original verified token and locale", async () => {
    vi.mocked(createCheckoutSession).mockResolvedValue(
      "https://checkout.stripe.com/c/pay/synthetic",
    );
    render(
      <PurchaseUpgrade
        token="synthetic-private-original-token"
        upgrade={{
          eligible: true,
          available: true,
          targetProductSlug: "starter-pro-fullstack",
          offerKey: "web-to-fullstack",
          amountTotal: 20000,
          currency: "eur",
          termsVersion: COMMERCE_TERMS_VERSION,
        }}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Upgrade to Fullstack/ }),
    );
    await waitFor(() => expect(createCheckoutSession).toHaveBeenCalledTimes(1));
    expect(
      JSON.parse(
        JSON.stringify(vi.mocked(createCheckoutSession).mock.calls[0]![0]),
      ),
    ).toEqual({
      productSlug: "starter-pro-fullstack",
      upgradeToken: "synthetic-private-original-token",
      locale: "en",
    });
  });

  it("preserves the original access and does not activate an unavailable upgrade price", () => {
    const result = parseClaimResponse({
      ok: true,
      claim: {
        ...claim,
        upgrade: {
          eligible: true,
          available: false,
          targetProductSlug: "starter-pro-fullstack",
          offerKey: "web-to-fullstack",
          amountTotal: 20000,
          currency: "eur",
          termsVersion: COMMERCE_TERMS_VERSION,
        },
      },
    });
    expect(result?.claim.orderReference).toBe(claim.orderReference);
    render(
      <PurchaseUpgrade
        token="synthetic-token"
        upgrade={result!.claim.upgrade!}
      />,
    );
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Checkout is currently unavailable",
    );
  });

  it.each([
    undefined,
    null,
    { eligible: true },
    {
      eligible: true,
      available: true,
      targetProductSlug: "starter-pro-fullstack",
      offerKey: "web-to-fullstack",
      amountTotal: 1,
      currency: "eur",
      termsVersion: COMMERCE_TERMS_VERSION,
    },
  ])(
    "keeps legacy/original access without inventing upgrade eligibility",
    (upgrade) => {
      const result = parseClaimResponse({
        ok: true,
        claim: { ...claim, upgrade },
      });
      expect(result?.claim.upgrade).toBeNull();
      expect(result?.claim.orderReference).toBe(claim.orderReference);
    },
  );

  it("does not grant a Web quote to a different purchased product", () => {
    const result = parseClaimResponse({
      ok: true,
      claim: {
        ...claim,
        productSlug: "na-ai-landing",
        upgrade: {
          eligible: true,
          available: true,
          targetProductSlug: "starter-pro-fullstack",
          offerKey: "web-to-fullstack",
          amountTotal: UPGRADE_DISPLAY["web-to-fullstack"].amountTotal,
          currency: "eur",
          termsVersion: COMMERCE_TERMS_VERSION,
        },
      },
    });
    expect(result?.claim.upgrade).toBeNull();
  });
});

import * as React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PricingComparisonTable } from "@/components/pricing/pricing-comparison-table";
import { createCheckoutSession } from "@/lib/api/client";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
vi.unmock("@/lib/i18n/navigation");
const route = vi.hoisted(() => ({ path: "/pricing" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.path }));
vi.mock("@/lib/api/client", () => ({ createCheckoutSession: vi.fn() }));
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));

const price = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const cases = [
  {
    locale: "en",
    action: `Buy Starter Pro — ${price}`,
    loading: "Redirecting to secure checkout...",
    trust: "One-time payment · Claim email after order processing",
    failure: "Checkout could not be opened.",
    support: "Contact purchase support",
    supportHref: "/orders/support",
    payment: "One-time payment",
  },
  {
    locale: "fr",
    action: `Acheter Starter Pro — ${price}`,
    loading: "Chargement en cours...",
    trust: "Paiement unique · E-mail d’accès après traitement de la commande",
    failure: "Le paiement n’a pas pu être ouvert.",
    support: "Contacter l’assistance achat",
    supportHref: "/fr/orders/support",
    payment: "Paiement unique",
  },
] as const;

function renderLocalized(ui: React.ReactNode, locale: "en" | "fr") {
  route.path = locale === "fr" ? "/fr/tarifs" : "/pricing";
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={locale === "fr" ? fr : en}
    >
      {ui}
    </NextIntlClientProvider>,
  );
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe.each(cases)("$locale purchase copy", (copy) => {
  it("uses the canonical price and locale throughout a simulated checkout", async () => {
    let completeCheckout!: (url: string) => void;
    vi.mocked(createCheckoutSession).mockReturnValueOnce(
      new Promise<string>((resolve) => {
        completeCheckout = resolve;
      }),
    );
    renderLocalized(<BuyStarterProButton showTrustText />, copy.locale);

    const button = screen.getByRole("button", { name: copy.action });
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("aria-busy", "false");
    expect(screen.getByText(copy.trust)).toBeVisible();

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: copy.loading })).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-live", "polite");
    fireEvent.click(button);
    expect(createCheckoutSession).toHaveBeenCalledExactlyOnceWith(
      { productSlug: "starter-pro", email: undefined, locale: copy.locale },
      { signal: expect.any(AbortSignal) },
    );
    expect(navigateToCheckout).not.toHaveBeenCalled();

    const destination = "https://checkout.example.com/pay/cs_test_synthetic";
    await act(async () => completeCheckout(destination));
    expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(destination);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it.each(["One-time payment", "Accéder à ma licence"])(
    "preserves the explicit caller label %s",
    (label) => {
      renderLocalized(<BuyStarterProButton label={label} />, copy.locale);
      expect(screen.getByRole("button", { name: label })).toBeEnabled();
      expect(screen.queryByText(copy.trust)).not.toBeInTheDocument();
      expect(createCheckoutSession).not.toHaveBeenCalled();
    },
  );

  it("restores the purchase action and localized support after failure", async () => {
    vi.mocked(createCheckoutSession).mockRejectedValueOnce(
      new Error("Internal provider diagnostic"),
    );
    renderLocalized(<BuyStarterProButton />, copy.locale);
    fireEvent.click(screen.getByRole("button", { name: copy.action }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(copy.failure);
    expect(alert).not.toHaveTextContent("Internal provider diagnostic");
    expect(
      within(alert).getByRole("link", { name: copy.support }),
    ).toHaveAttribute("href", copy.supportHref);
    expect(screen.getByRole("button", { name: copy.action })).toBeEnabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "false");
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("localizes the comparison payment terms and preserves catalogue prices", () => {
    renderLocalized(<PricingComparisonTable />, copy.locale);
    const table = screen.getByRole("table");
    for (const [name, slug] of [
      ["NA-AI Landing", "na-ai-landing"],
      ["Starter Pro", "starter-pro"],
    ] as const) {
      expect(
        within(table).getByRole("columnheader", {
          name: `${name} ${PRODUCT_DISPLAY[slug].priceLabel} ${copy.payment}`,
        }),
      ).toBeVisible();
    }
  });
});

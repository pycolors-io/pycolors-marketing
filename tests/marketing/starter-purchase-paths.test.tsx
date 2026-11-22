import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PricingPage from "@/app/[locale]/(site)/pricing/page";
import StartersPage from "@/app/[locale]/(site)/starters/page";
import MobilePage from "@/app/[locale]/(site)/starters/mobile/page";
import FullstackPage from "@/app/[locale]/(site)/starters/fullstack/page";
import { resetCheckoutAvailability } from "@/components/pricing/use-checkout-availability";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { createCopy } from "@/lib/i18n/copy-core";
import { localizedHref } from "@/lib/i18n/routing";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

const path = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
  return { current: "/pricing" };
});

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
vi.unmock("@/lib/i18n/navigation");
vi.unmock("@/components/pricing/use-checkout-availability");
vi.mock("next/navigation", () => ({ usePathname: () => path.current }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));

const products = [
  PRODUCT_DISPLAY["starter-pro-mobile"],
  PRODUCT_DISPLAY["starter-pro-fullstack"],
] as const;
const pages = [
  { route: "/pricing", Component: PricingPage },
  { route: "/starters", Component: StartersPage },
  { route: "/starters/mobile", Component: MobilePage },
  { route: "/starters/fullstack", Component: FullstackPage },
] as const;
const locales = ["en", "fr"] as const;
const destination = "https://checkout.example.com/pay/cs_test_synthetic";
let sourcePurchasesAvailable = true;

function copy(locale: "en" | "fr") {
  const messages = locale === "fr" ? fr.site : en.site;
  const translate = Object.assign(
    (key: string) => messages[key as keyof typeof messages] ?? key,
    { has: (key: string) => Object.hasOwn(messages, key) },
  );
  return createCopy(locale, translate);
}

function renderPage(locale: "en" | "fr", page: (typeof pages)[number]) {
  path.current = localizedHref(page.route, locale);
  const Page = page.Component;
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={locale === "fr" ? fr : en}
    >
      <Page />
    </NextIntlClientProvider>,
  );
}

function label(locale: "en" | "fr", product: (typeof products)[number]) {
  const t = copy(locale);
  return t("Buy {value0} — {value1}", {
    value0: t(product.name),
    value1: product.priceLabel,
  });
}

function checkoutRequests() {
  return vi
    .mocked(fetch)
    .mock.calls.filter(([, init]) => init?.method === "POST");
}

beforeEach(() => {
  vi.clearAllMocks();
  resetCheckoutAvailability();
  sourcePurchasesAvailable = true;
  // All API traffic stays inside this fixture. No Stripe session is created.
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (
        url === "https://api.example.com/api/v1/checkout/availability" &&
        !init?.method
      ) {
        return Response.json({
          ok: true,
          products: {
            "starter-pro": { available: true },
            "na-ai-landing": { available: true },
            "starter-pro-mobile": { available: sourcePurchasesAvailable },
            "starter-pro-fullstack": { available: sourcePurchasesAvailable },
          },
        });
      }
      if (
        url === "https://api.example.com/api/v1/checkout" &&
        init?.method === "POST"
      ) {
        return Response.json({ url: destination });
      }
      throw new Error("Unexpected outbound request");
    }),
  );
});
afterEach(() => vi.unstubAllGlobals());

const purchaseCases = locales.flatMap((locale) =>
  pages.flatMap((page) =>
    products.flatMap((product) => {
      const dedicated =
        page.route === "/starters/mobile" ||
        page.route === "/starters/fullstack";
      if (dedicated && page.route !== product.href) return [];
      // Dedicated pages repeat their own offer; alternatives remain plain links.
      const expectedButtons = dedicated ? 2 : 1;
      return Array.from({ length: expectedButtons }, (_, buttonIndex) => ({
        locale,
        page,
        route: page.route,
        product,
        slug: product.slug,
        buttonIndex,
        expectedButtons,
      }));
    }),
  ),
);

describe("Mobile and Fullstack purchase entry points", () => {
  it.each(purchaseCases)(
    "$locale $route sends $slug from CTA $buttonIndex to Checkout once",
    async ({ locale, page, product, expectedButtons, buttonIndex }) => {
      renderPage(locale, page);
      const buttons = screen.getAllByRole("button", {
        name: label(locale, product),
      });
      expect(buttons).toHaveLength(expectedButtons);
      if (page.route === product.href) {
        const otherProduct = products.find(
          (offer) => offer.slug !== product.slug,
        )!;
        expect(
          screen.queryByRole("button", { name: label(locale, otherProduct) }),
        ).not.toBeInTheDocument();
        expect(
          document.querySelectorAll('main button[aria-live="polite"]'),
        ).toHaveLength(2);
      }
      for (const button of buttons) expect(button).toBeDisabled();
      expect(checkoutRequests()).toHaveLength(0);

      await waitFor(() => {
        for (const button of buttons) expect(button).toBeEnabled();
      });
      const button = buttons[buttonIndex]!;
      button.focus();
      expect(button).toHaveFocus();
      act(() => {
        fireEvent.click(button);
        fireEvent.click(button);
      });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(checkoutRequests()).toHaveLength(1);
      expect(checkoutRequests()[0]).toEqual([
        "https://api.example.com/api/v1/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productSlug: product.slug, locale }),
          signal: expect.any(AbortSignal),
        },
      ]);
      await waitFor(() =>
        expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(destination),
      );
      expect(
        vi.mocked(fetch).mock.calls.filter(([, init]) => !init?.method),
      ).toHaveLength(1);
    },
  );

  it.each(
    locales.flatMap((locale) => pages.map((page) => ({ locale, ...page }))),
  )(
    "$locale $route keeps every new-offer CTA closed when the server is unavailable",
    async ({ locale, ...page }) => {
      sourcePurchasesAvailable = false;
      renderPage(locale, page);
      await screen.findAllByText(
        copy(locale)(
          "Checkout is currently unavailable. Please try again later or contact purchase support.",
        ),
      );
      const dedicated =
        page.route === "/starters/mobile" ||
        page.route === "/starters/fullstack";
      for (const product of products.filter(
        (offer) => !dedicated || page.route === offer.href,
      )) {
        const buttons = screen.getAllByRole("button", {
          name: label(locale, product),
        });
        for (const button of buttons) {
          expect(button).toBeDisabled();
          fireEvent.click(button);
        }
      }
      if (dedicated) {
        const otherProduct = products.find(
          (offer) => page.route !== offer.href,
        )!;
        expect(
          screen.queryByRole("button", { name: label(locale, otherProduct) }),
        ).not.toBeInTheDocument();
      }
      expect(checkoutRequests()).toHaveLength(0);
      expect(navigateToCheckout).not.toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(1);
    },
  );
});

import * as React from "react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import StarterMobilePage, {
  generateMetadata,
} from "@/app/[locale]/(site)/starters/mobile/page";
import StarterFullstackPage, {
  generateMetadata as fullstackMetadata,
} from "@/app/[locale]/(site)/starters/fullstack/page";
import {
  PRODUCT_DISPLAY,
  UPGRADE_DISPLAY,
} from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW as mobile } from "@/lib/products/starter-pro-mobile-preview";
import { createCheckoutSession } from "@/lib/api/client";
import { createCopy, messageKey } from "@/lib/i18n/copy-core";
import { getMarketingBreadcrumbItems } from "@/components/marketing/breadcrumb";
import sitemap from "@/app/sitemap";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
vi.unmock("@/lib/i18n/navigation");
vi.mock("@/lib/api/client", () => ({ createCheckoutSession: vi.fn() }));
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("next/navigation", () => ({ usePathname: () => "/starters/mobile" }));
vi.mock("@/lib/i18n/server-copy", () => ({
  getCopy: async (locale: "en" | "fr" = "en") => {
    const messages = locale === "fr" ? fr.site : en.site;
    const translate = Object.assign(
      (key: string) => messages[key as keyof typeof messages] ?? key,
      { has: (key: string) => Object.hasOwn(messages, key) },
    );
    return createCopy(locale, translate);
  },
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/lib/source", () => ({ source: { getPages: () => [] } }));
vi.mock("@/lib/blog/utils", () => ({
  getAllCategories: () => [],
  getAllPosts: () => [],
  getAllTags: () => [],
  normalizeTaxonomy: (value: string) => value,
}));

function copy(locale: "en" | "fr", value: string) {
  return locale === "fr"
    ? (fr.site[messageKey(value) as keyof typeof fr.site] ?? value)
    : value;
}
function renderPage(locale: "en" | "fr" = "en", fullstack = false) {
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={locale === "fr" ? fr : en}
    >
      {fullstack ? <StarterFullstackPage /> : <StarterMobilePage />}
    </NextIntlClientProvider>,
  );
}
function buyLabel(
  locale: "en" | "fr",
  product: typeof mobile | typeof mobile.bundle,
) {
  return copy(locale, "Buy {value0} — {value1}")
    .replace("{value0}", copy(locale, product.name))
    .replace("{value1}", product.priceLabel);
}
beforeEach(() => vi.clearAllMocks());

describe("Starter Pro Mobile and Fullstack source offers", () => {
  it.each(["en", "fr"] as const)(
    "distinguishes Web, autonomous Mobile and Fullstack with canonical TTC prices in %s",
    async (locale) => {
      const { container } = renderPage(locale);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("main")).toHaveAttribute("id", "content");
      expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
      const web = screen.getByRole("article", {
        name: copy(locale, "Starter Pro Web"),
      });
      expect(
        within(web).getByText(PRODUCT_DISPLAY["starter-pro"].priceLabel),
      ).toBeVisible();
      for (const product of [mobile, mobile.bundle]) {
        const card = screen.getByRole("article", {
          name: copy(locale, product.name),
        });
        expect(within(card).getByText(product.priceLabel)).toBeVisible();
        expect(
          within(card).getByText(copy(locale, product.priceQualifier)),
        ).toBeVisible();
        expect(
          within(card).getByRole("button", { name: buyLabel(locale, product) }),
        ).toBeEnabled();
        expect(card.querySelectorAll("dt")).toHaveLength(2);
      }
      expect(
        screen.getByText(
          copy(
            locale,
            "Compatible backend source included. No Web purchase required.",
          ),
        ),
      ).toBeVisible();
      expect(
        screen.getByText(
          copy(locale, "Shared backend source for the same accounts and data."),
        ),
      ).toBeVisible();
      expect(container).not.toHaveTextContent(copy(locale, "Coming soon"));
      expect((await axe(container)).violations).toEqual([]);
    },
  );

  it.each(["en", "fr"] as const)(
    "hands the selected SKU and locale to the existing checkout without sending a price in %s",
    async (locale) => {
      vi.mocked(createCheckoutSession).mockResolvedValue(
        "https://checkout.example.com/pay/synthetic",
      );
      renderPage(locale);
      const card = screen.getByRole("article", {
        name: copy(locale, mobile.name),
      });
      await act(async () =>
        fireEvent.click(
          within(card).getByRole("button", { name: buyLabel(locale, mobile) }),
        ),
      );
      expect(createCheckoutSession).toHaveBeenCalledExactlyOnceWith(
        { productSlug: "starter-pro-mobile", email: undefined, locale },
        { signal: expect.any(AbortSignal) },
      );
    },
  );

  it("has an explicit Fullstack product entry with shared-backend guidance", () => {
    renderPage("en", true);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "One foundation for Web and native apps.",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Fullstack setup guide" }),
    ).toHaveAttribute("href", "/docs/starter-pro/fullstack");
    expect(
      getMarketingBreadcrumbItems(mobile.bundle.href)?.map(({ href }) => href),
    ).toEqual(["/", "/starters", "/starters/fullstack"]);
  });

  it("keeps concept artwork honest and exposes purchase, upgrade and native boundaries", () => {
    const { container } = renderPage();
    expect(
      container.querySelector('img[alt=""]')?.closest('[aria-hidden="true"]'),
    ).not.toBeNull();
    expect(screen.getByText("Concept illustration")).toBeVisible();
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "public/images/marketing/concepts/modular-platform-v1.webp",
        ),
      ),
    ).toBe(true);
    expect(container.querySelector("form")).toBeNull();
    const faq = screen.getByRole("region", {
      name: "Before you choose your source licence.",
    });
    const rows = Array.from(faq.querySelectorAll("details"));
    expect(rows).toHaveLength(6);
    for (const row of rows) {
      expect(row.open).toBe(false);
      fireEvent.click(row.querySelector("summary")!);
      expect(row.open).toBe(true);
    }
    expect(faq).toHaveTextContent(
      UPGRADE_DISPLAY["web-to-fullstack"].priceLabel,
    );
    expect(faq).toHaveTextContent(
      UPGRADE_DISPLAY["mobile-to-fullstack"].priceLabel,
    );
    expect(faq).toHaveTextContent(
      "an email address alone is not proof of purchase",
    );
    expect(faq).toHaveTextContent(
      "A Hermes export is not an installed-device or store-approval result",
    );
  });

  it.each([
    ["mobile", generateMetadata],
    ["fullstack", fullstackMetadata],
  ] as const)(
    "provides localized %s metadata and sitemap entries without invented dates",
    async (kind, metadata) => {
      const english = await metadata({
        params: Promise.resolve({ locale: "en" }),
      });
      const french = await metadata({
        params: Promise.resolve({ locale: "fr" }),
      });
      expect(english.alternates?.canonical).toBe(`/starters/${kind}`);
      expect(french.alternates?.canonical).toBe(
        `https://pycolors.io/fr/starters/${kind}`,
      );
      expect(String(french.title)).not.toMatch(/Bientôt|Coming soon/);
      const entries = sitemap().filter(({ url }) =>
        [`/starters/${kind}`, `/fr/starters/${kind}`].includes(
          new URL(url).pathname,
        ),
      );
      expect(entries).toHaveLength(2);
      expect(entries.every((entry) => entry.lastModified === undefined)).toBe(
        true,
      );
    },
  );
});

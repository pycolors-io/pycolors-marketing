import * as React from "react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import StarterMobilePage, {
  generateMetadata,
} from "@/app/[locale]/(site)/starters/mobile/page";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW as mobile } from "@/lib/products/starter-pro-mobile-preview";
import { createCopy, messageKey } from "@/lib/i18n/copy-core";
import { getMarketingBreadcrumbItems } from "@/components/marketing/breadcrumb";
import sitemap from "@/app/sitemap";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
vi.unmock("@/lib/i18n/navigation");
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
function renderPage(locale: "en" | "fr" = "en") {
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={locale === "fr" ? fr : en}
    >
      <StarterMobilePage />
    </NextIntlClientProvider>,
  );
}

describe("Starter Pro Mobile coming-soon page", () => {
  it.each(["en", "fr"] as const)(
    "separates the existing Web offer from proposed Mobile and Fullstack prices in %s",
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
      expect(
        within(web).getByRole("link", {
          name: copy(locale, "Explore Starter Pro Web"),
        }),
      ).toHaveAttribute(
        "href",
        locale === "fr" ? "/fr/starters/pro" : "/starters/pro",
      );
      for (const [item, proposedPrice] of [
        [mobile, "249 €"],
        [mobile.bundle, "499 €"],
      ] as const) {
        const name = item.name;
        const preview = screen.getByRole("article", {
          name: copy(locale, name),
        });
        expect(
          within(preview).getByText(copy(locale, mobile.status)),
        ).toBeVisible();
        expect(within(preview).getByText(proposedPrice)).toBeVisible();
        expect(
          within(preview).getByText(copy(locale, item.priceQualifier)),
        ).toBeVisible();
        expect(within(preview).queryByRole("button")).toBeNull();
        expect(within(preview).queryByRole("link")).toBeNull();
      }
      expect(
        screen.getByText(copy(locale, "Web + Mobile + shared API")),
      ).toBeVisible();
      expect(
        screen.getByText(
          copy(
            locale,
            "Mobile is not on sale. No release date has been announced.",
          ),
        ),
      ).toBeVisible();
      for (const link of container.querySelectorAll("a"))
        expect(link.href).not.toMatch(/checkout|stripe\.com|\/api\//i);
      expect((await axe(container)).violations).toEqual([]);
    },
  );

  it("keeps conceptual art honest and exposes the availability answers without a form", () => {
    const { container } = renderPage();
    const art = container.querySelector('img[alt=""]');
    expect(art?.closest('[aria-hidden="true"]')).not.toBeNull();
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
      name: "Before the Mobile launch.",
    });
    const rows = Array.from(faq.querySelectorAll("details"));
    expect(rows).toHaveLength(3);
    for (const row of rows) {
      expect(row.open).toBe(false);
      fireEvent.click(row.querySelector("summary")!);
      expect(row.open).toBe(true);
    }
    expect(
      within(faq).getByText(
        /The current Starter Pro purchase covers the Web source licence/,
      ),
    ).toBeVisible();
  });

  it("publishes a breadcrumb, never a saleable Product or Offer schema", () => {
    const { container } = renderPage();
    const data = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).map((node) => JSON.parse(node.textContent!));
    expect(data).toHaveLength(1);
    expect(data[0]["@type"]).toBe("BreadcrumbList");
    expect(JSON.stringify(data)).not.toMatch(/"@type":"(?:Product|Offer)"/);
    expect(
      getMarketingBreadcrumbItems(mobile.href)?.map(({ href }) => href),
    ).toEqual(["/", "/starters", "/starters/mobile"]);
  });

  it("provides localized metadata and exactly one sitemap entry per locale without invented dates", async () => {
    const english = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });
    const french = await generateMetadata({
      params: Promise.resolve({ locale: "fr" }),
    });
    expect(english.alternates?.canonical).toBe("/starters/mobile");
    expect(french.alternates?.canonical).toBe(
      "https://pycolors.io/fr/starters/mobile",
    );
    expect(french.title).toBe("Starter Pro Mobile — Bientôt disponible");
    expect(french.description).toContain(
      "conditions définitives restent à annoncer",
    );
    const entries = sitemap().filter(({ url }) =>
      ["/starters/mobile", "/fr/starters/mobile"].includes(
        new URL(url).pathname,
      ),
    );
    expect(entries).toHaveLength(2);
    expect(entries.every((entry) => entry.lastModified === undefined)).toBe(
      true,
    );
    expect(french.alternates?.languages).toMatchObject({
      en: "https://pycolors.io/starters/mobile",
      fr: "https://pycolors.io/fr/starters/mobile",
    });
  });
});

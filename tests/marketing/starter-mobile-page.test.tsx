import * as React from "react";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
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
  it.each([
    ["en", false],
    ["fr", false],
    ["en", true],
    ["fr", true],
  ] as const)(
    "keeps the %s hero focused on its own purchase and setup guide (Fullstack: %s)",
    (locale, fullstack) => {
      renderPage(locale, fullstack);
      const product = fullstack ? mobile.bundle : mobile;
      const hero = screen
        .getByRole("heading", { level: 1 })
        .closest("section")!;
      const actions = within(hero);
      expect(actions.getAllByRole("button")).toHaveLength(1);
      expect(
        actions.getByRole("button", { name: buyLabel(locale, product) }),
      ).toBeEnabled();
      const prefix = locale === "fr" ? "/fr" : "";
      const guide = actions.getByRole("link", {
        name: copy(
          locale,
          fullstack ? "Fullstack setup guide" : "Mobile setup guide",
        ),
      });
      expect(guide).toHaveAttribute("href", `${prefix}${product.docsHref}`);
      expect(guide).toHaveAttribute("data-slot", "button");
      const compare = actions.getByRole("link", {
        name: copy(locale, "Compare source licences"),
      });
      expect(compare).toHaveAttribute("href", "#platforms");
      expect(compare).not.toHaveAttribute("data-slot", "button");
      const web = actions.getByRole("link", {
        name: copy(locale, "Explore Starter Pro Web"),
      });
      expect(web).toHaveAttribute("href", `${prefix}/starters/pro`);
      expect(web).not.toHaveAttribute("data-slot", "button");
      const stack = actions.getByRole("link", {
        name: copy(locale, "Explore the stack"),
      });
      expect(stack).toHaveAttribute("href", "#technology");
      expect(stack).not.toHaveAttribute("data-slot", "button");
      expect(actions.getAllByRole("link")).toHaveLength(4);
      for (const link of [guide, stack, compare, web]) {
        link.focus();
        expect(link).toHaveFocus();
      }
      expect(createCheckoutSession).not.toHaveBeenCalled();
    },
  );

  it.each([
    ["en", false],
    ["fr", false],
    ["en", true],
    ["fr", true],
  ] as const)(
    "documents the delivered technology layers and local setup links in %s (Fullstack: %s)",
    async (locale, fullstack) => {
      renderPage(locale, fullstack);
      const stack = screen.getByRole("region", {
        name: copy(locale, "Your stack, from interface to data."),
      });
      const region = within(stack);
      const prefix = locale === "fr" ? "/fr" : "";
      expect(
        region
          .getAllByRole("article")
          .map(
            (article) =>
              within(article).getByRole("heading", { level: 3 }).textContent,
          ),
      ).toEqual([
        ...(fullstack ? ["Next.js + React"] : []),
        "React Native + Expo",
        "Next.js + PostgreSQL",
      ]);

      const native = region.getByRole("article", {
        name: "React Native + Expo",
      });
      expect(
        within(native)
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual(["TypeScript", "Expo Router", "Expo SecureStore"]);
      expect(
        within(native).getByRole("link", {
          name: copy(locale, "Explore the native architecture"),
        }),
      ).toHaveAttribute(
        "href",
        `${prefix}/docs/starter-pro/mobile#native-source`,
      );

      const backend = region.getByRole("article", {
        name: "Next.js + PostgreSQL",
      });
      expect(
        within(backend)
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual(["Better Auth", "oRPC", "Prisma"]);
      expect(
        within(backend).getByText(
          copy(locale, fullstack ? "Shared backend" : "Included backend"),
        ),
      ).toBeVisible();
      expect(
        within(backend).getByRole("link", {
          name: copy(locale, "Explore the backend architecture"),
        }),
      ).toHaveAttribute(
        "href",
        `${prefix}/docs/starter-pro/backend#architecture`,
      );

      const integrations = region.getByRole("complementary", {
        name: copy(locale, "Integrations to configure"),
      });
      expect(
        within(integrations).getByRole("link", {
          name: copy(
            locale,
            fullstack ? "Resend · Email" : "Resend · Authentication emails",
          ),
        }),
      ).toHaveAttribute(
        "href",
        `${prefix}/docs/starter-pro/environment-variables#email-delivery`,
      );

      if (fullstack) {
        const web = region.getByRole("article", { name: "Next.js + React" });
        expect(
          within(web)
            .getAllByRole("listitem")
            .map((item) => item.textContent),
        ).toEqual(["TypeScript", "Tailwind CSS", "PyColors UI"]);
        expect(
          within(web).getByRole("link", {
            name: copy(locale, "Explore the Web architecture"),
          }),
        ).toHaveAttribute("href", `${prefix}/docs/starter-pro/architecture`);
        expect(
          within(integrations).getByRole("link", {
            name: copy(locale, "Stripe · Web billing"),
          }),
        ).toHaveAttribute("href", `${prefix}/docs/starter-pro/billing`);
        expect((await axe(stack)).violations).toEqual([]);
      } else {
        expect(
          region.queryByRole("article", { name: "Next.js + React" }),
        ).toBeNull();
        expect(stack).not.toHaveTextContent("Stripe");
        expect(stack).not.toHaveTextContent("Tailwind CSS");
      }
      expect(region.queryByRole("button")).toBeNull();
      expect(createCheckoutSession).not.toHaveBeenCalled();
    },
  );

  it.each([false, true])(
    "renders the source stack in server HTML without adding a client boundary (Fullstack: %s)",
    (fullstack) => {
      const source = readFileSync(
        resolve(
          process.cwd(),
          "components/starters/starter-technology-stack.tsx",
        ),
        "utf8",
      );
      expect(source).not.toMatch(/^\s*["']use client["']/m);
      const server = document.createElement("div");
      server.innerHTML = renderToString(
        <NextIntlClientProvider locale="en" timeZone="UTC" messages={en}>
          {fullstack ? <StarterFullstackPage /> : <StarterMobilePage />}
        </NextIntlClientProvider>,
      );
      document.body.append(server);
      try {
        const stack = within(server).getByRole("region", {
          name: "Your stack, from interface to data.",
        });
        expect(within(stack).getAllByRole("article")).toHaveLength(
          fullstack ? 3 : 2,
        );
        expect(stack).toHaveTextContent("React Native + Expo");
        expect(stack).toHaveTextContent("Next.js + PostgreSQL");
        const sourceCards = server.querySelectorAll<HTMLElement>(
          "[data-source-offer]",
        );
        expect(sourceCards).toHaveLength(3);
        for (const card of sourceCards) {
          expect(card.querySelectorAll("figure img")).toHaveLength(1);
          expect(card.querySelector("img")).toHaveAttribute("alt", "");
          expect(
            within(card).getByText("Concept illustration"),
          ).toBeInTheDocument();
        }
      } finally {
        server.remove();
      }
    },
  );

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
      for (const [name, illustration] of [
        ["Starter Pro Web", "workflow-path"],
        ["Starter Pro Mobile", "connected-workspace"],
        ["Starter Pro Fullstack", "source-stack"],
      ] as const) {
        const card = screen.getByRole("article", { name: copy(locale, name) });
        const image = card.querySelector("img")!;
        expect(card.querySelectorAll("figure")).toHaveLength(1);
        expect(card.querySelectorAll("img")).toHaveLength(1);
        expect(image).toHaveAttribute("alt", "");
        expect(image.closest('[aria-hidden="true"]')).not.toBeNull();
        const imageUrl = new URL(
          image.getAttribute("src")!,
          "https://marketing.example",
        );
        expect(imageUrl.searchParams.get("url") ?? imageUrl.pathname).toBe(
          `/images/starters/pro/concepts/${illustration}-test-v1.png`,
        );
        expect(
          within(card).getByText(copy(locale, "Concept illustration")),
        ).toBeVisible();
        expect(card.querySelector("a img, button img")).toBeNull();
        expect(within(card).getAllByRole("button")).toHaveLength(1);
        expect(within(card).getAllByRole("link")).toHaveLength(2);
      }
      for (const product of [mobile, mobile.bundle]) {
        const card = screen.getByRole("article", {
          name: copy(
            locale,
            product.slug === "starter-pro-mobile"
              ? "Starter Pro Mobile"
              : "Starter Pro Fullstack",
          ),
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
        name: copy(locale, "Starter Pro Mobile"),
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
    for (const link of screen.getAllByRole("link", {
      name: "Fullstack setup guide",
    })) {
      expect(link).toHaveAttribute("href", "/docs/starter-pro/fullstack");
    }
    expect(
      getMarketingBreadcrumbItems(mobile.bundle.href)?.map(({ href }) => href),
    ).toEqual(["/", "/starters", "/starters/fullstack"]);
  });

  it("keeps concept artwork honest and exposes purchase, upgrade and native boundaries", () => {
    const { container } = renderPage();
    expect(
      container.querySelector('img[alt=""]')?.closest('[aria-hidden="true"]'),
    ).not.toBeNull();
    const hero = screen
      .getByRole("heading", { level: 1 })
      .closest<HTMLElement>('[data-marketing-hero="cool"]')!;
    expect(within(hero).getByText("Concept illustration")).toBeVisible();
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

import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getMarketingBreadcrumbItems,
  MarketingBreadcrumb,
} from "@/components/marketing/breadcrumb";
import { messageKey } from "@/lib/i18n/copy-core";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
vi.unmock("@/lib/i18n/navigation");
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

function localized(locale: "en" | "fr", text: string) {
  return locale === "fr"
    ? (fr.site[messageKey(text) as keyof typeof fr.site] ?? text)
    : text;
}

function withLocale(children: React.ReactNode, locale: "en" | "fr" = "en") {
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={locale === "fr" ? fr : en}
    >
      {children}
    </NextIntlClientProvider>,
  );
}

describe("public Marketing breadcrumbs", () => {
  it.each(["en", "fr"] as const)(
    "keeps real parent destinations and a non-link current page in %s",
    async (locale) => {
      const { container } = withLocale(
        <MarketingBreadcrumb route="/starters/pro/faq" />,
        locale,
      );
      const nav = screen.getByRole("navigation", {
        name: localized(locale, "Breadcrumb"),
      });
      const prefix = locale === "fr" ? "/fr" : "";
      expect(
        within(nav).getAllByRole("link", {
          name: localized(locale, "Home"),
        })[0],
      ).toHaveAttribute("href", prefix || "/");
      expect(
        within(nav).getByRole("link", { name: localized(locale, "Starters") }),
      ).toHaveAttribute("href", `${prefix}/starters`);
      const parent = within(nav).getByRole("link", {
        name: localized(locale, "Starter Pro"),
      });
      expect(parent).toHaveAttribute("href", `${prefix}/starters/pro`);
      parent.focus();
      expect(parent).toHaveFocus();
      const current = nav.querySelectorAll('[aria-current="page"]');
      expect(current).toHaveLength(2);
      for (const item of current) {
        expect(item).toHaveTextContent(localized(locale, "Starter Pro FAQ"));
        expect(item.tagName).toBe("SPAN");
        expect(item).not.toHaveAttribute("href");
      }
      expect((await axe(container)).violations).toEqual([]);
    },
  );

  it.each([
    ["/pricing", ["/fr", "/fr/tarifs"]],
    ["/request-a-quote", ["/fr", "/fr/services", "/fr/demande-de-devis"]],
  ] as const)(
    "uses the localized French destinations in the new %s structured path",
    (route, destinations) => {
      const { container } = withLocale(
        <MarketingBreadcrumb route={route} />,
        "fr",
      );
      const structured = JSON.parse(
        container.querySelector("#breadcrumb-jsonld")!.textContent!,
      ) as { itemListElement: { item: string }[] };
      expect(
        structured.itemListElement.map(({ item }) => new URL(item).pathname),
      ).toEqual(destinations);
    },
  );

  it("keeps intermediate ancestors reachable from the compact path menu", async () => {
    withLocale(<MarketingBreadcrumb route="/starters/pro/faq" />);
    const trigger = screen.getByRole("button", {
      name: "Show breadcrumb path",
    });
    trigger.focus();
    expect(trigger).toHaveFocus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const menu = await screen.findByRole("menu");
    expect(
      within(menu).getByRole("menuitem", { name: "Starters" }),
    ).toHaveAttribute("href", "/starters");
    expect(
      within(menu).getByRole("menuitem", { name: "Starter Pro" }),
    ).toHaveAttribute("href", "/starters/pro");
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it.each([
    "/",
    "/docs/ui",
    "/orders/claim?token=secret",
    "/checkout/success",
    "/request-a-quote/private-id",
    "/ui?quote=private",
    "/blog/arbitrary-slug",
  ])("never derives a trail from an unlisted path or query: %s", (route) => {
    expect(getMarketingBreadcrumbItems(route)).toBeNull();
  });

  it("links a quote back to Services without exposing a service query", () => {
    expect(getMarketingBreadcrumbItems("/request-a-quote")).toEqual([
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Request a quote", href: "/request-a-quote" },
    ]);
  });

  it("keeps existing page-owned structured data as the only BreadcrumbList", () => {
    const items = getMarketingBreadcrumbItems("/showcase/product-studio")!;
    const { container } = withLocale(
      <>
        <JsonLd
          id="product-studio-breadcrumb"
          data={generateBreadcrumbJsonLd(items)}
        />
        <MarketingBreadcrumb route="/showcase/product-studio" />
      </>,
    );
    expect(
      screen.getAllByRole("navigation", { name: "Breadcrumb" }),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).toHaveLength(1);
    expect(container.querySelector("#breadcrumb-jsonld")).toBeNull();
    expect(
      JSON.parse(
        container.querySelector("#product-studio-breadcrumb")!.textContent!,
      ),
    ).toEqual(generateBreadcrumbJsonLd(items));
  });

  it("preserves structured data by default for existing Breadcrumb callers", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Privacy", href: "/privacy" },
    ];
    const { container } = withLocale(<Breadcrumb items={items} />);
    expect(
      JSON.parse(container.querySelector("#breadcrumb-jsonld")!.textContent!),
    ).toEqual(generateBreadcrumbJsonLd(items));
  });
});

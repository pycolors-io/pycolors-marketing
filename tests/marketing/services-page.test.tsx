import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { axe } from "vitest-axe";
import ServicesPage, {
  generateMetadata,
} from "@/app/[locale]/(site)/services/page";
import { CUSTOM_SOFTWARE_SERVICE } from "@/lib/products/project-services";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { productStudio } from "@/lib/showcase/product-studio";
import {
  PRIMARY_NAV_ITEMS,
  MOBILE_BROWSE_NAV_ITEMS,
} from "@/lib/layout.shared";
import sitemap from "@/app/sitemap";
import fr from "@/messages/fr.json";

vi.unmock("@/lib/i18n/use-copy");
vi.unmock("next-intl");
vi.mock("@/lib/source", () => ({ source: { getPages: () => [] } }));
vi.mock("@/lib/blog/utils", () => ({
  getAllPosts: () => [],
  getAllCategories: () => [],
  getAllTags: () => [],
  normalizeTaxonomy: (value: string) => value,
}));

function preview(locale: "en" | "fr" = "en") {
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={locale === "fr" ? fr : { site: {} }}
      timeZone="UTC"
    >
      <ServicesPage />
    </NextIntlClientProvider>,
  );
}

describe("custom project services", () => {
  it("connects each source foundation to its product and setup guide separately from quoted services", () => {
    const view = preview();
    const foundations = screen.getByRole("region", {
      name: "Choose the source for your project.",
    });
    expect(within(foundations).getAllByRole("article")).toHaveLength(3);
    expect(
      within(foundations).getAllByRole("heading", { level: 3 }),
    ).toHaveLength(3);
    for (const slug of [
      "starter-pro",
      "starter-pro-mobile",
      "starter-pro-fullstack",
    ] as const) {
      const product = PRODUCT_DISPLAY[slug];
      expect(
        foundations.querySelector(`a[href="${product.href}"]`),
      ).toBeTruthy();
      expect(
        foundations.querySelector(`a[href="${product.docsHref}"]`),
      ).toBeTruthy();
    }
    expect(foundations).toHaveTextContent(
      "implementation services and provider costs are separate",
    );
    expect(
      within(foundations).getByRole("link", {
        name: "Review scope and support",
      }),
    ).toHaveAttribute("href", "/docs/starter-pro/implementation-support");
    expect(within(foundations).queryByRole("button")).toBeNull();
    expect(foundations.textContent).not.toMatch(/€|\bBuy\b|\/api\//);
    for (const service of Object.values(STARTER_PRO_SERVICES)) {
      expect(within(foundations).queryByText(service.priceLabel)).toBeNull();
      expect(screen.getByText(service.priceLabel)).toBeVisible();
    }
    const approach = view.container.querySelector("#approach")!;
    const delivery = view.container.querySelector("#delivery")!;
    expect(
      approach.compareDocumentPosition(foundations) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      foundations.compareDocumentPosition(delivery) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
  it("presents scoped use cases, an owned reference and the existing engagement prices", async () => {
    const view = preview();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Build the software your business needs.",
    );
    for (const title of [
      "Client portals & activity tracking",
      "Internal tools & dashboards",
      "Documents & automation",
      "Custom SaaS applications",
    ])
      expect(screen.getByRole("heading", { name: title })).toBeVisible();
    expect(
      screen.getByText(/Examples of projects to scope around your activity/),
    ).toBeVisible();
    const brief = screen.getByRole("complementary", {
      name: "A clear scope. A concrete delivery.",
    });
    expect(within(brief).queryByRole("img")).toBeNull();
    expect(brief).toHaveTextContent(
      "Source code, setup notes and validation results",
    );
    expect(within(brief).getByRole("link")).toHaveAttribute(
      "href",
      "#delivery",
    );
    expect(view.container.textContent).not.toMatch(/\b(?:we|our|us)\b/i);
    const approach = screen.getByRole("region", {
      name: "Explore the work behind PyColors.",
    });
    for (const href of ["/ui", "/starters/pro", productStudio.href]) {
      expect(approach.querySelector(`a[href="${href}"]`)).toBeTruthy();
    }
    expect(
      screen.getByRole("link", { name: "View example delivery" }),
    ).toHaveAttribute("href", "/starters/pro/implementation-example");
    for (const service of Object.values(STARTER_PRO_SERVICES)) {
      expect(screen.getByText(service.priceLabel)).toBeVisible();
      expect(
        screen.getByRole("link", { name: service.action }),
      ).toHaveAttribute("href", service.href);
    }
    for (const link of screen.getAllByRole("link", {
      name: "Describe your project",
    }))
      expect(link).toHaveAttribute("href", CUSTOM_SOFTWARE_SERVICE.href);
    const proposal = screen.getByRole("link", {
      name: "See what a proposal includes",
    });
    expect(proposal).toHaveAttribute("href", "/request-a-quote/template");
    expect(proposal).not.toHaveAttribute("download");
    expect((await axe(view.container)).violations).toEqual([]);
  });
  it("uses the same layout and localized conversion paths in French", () => {
    const view = preview("fr");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Le logiciel dont votre activité a besoin.",
    );
    expect(
      screen.getByRole("heading", {
        name: "Portails clients et suivi d’activité",
      }),
    ).toBeVisible();
    expect(view.container).not.toHaveTextContent(
      "Examples of projects to scope around your activity",
    );
    expect(view.container).not.toHaveTextContent(
      "Fictional projects, people and activity",
    );
    expect(view.container).toHaveTextContent(
      "Un périmètre clair. Une livraison concrète.",
    );
    const foundations = screen.getByRole("region", {
      name: "Choisissez la base source de votre projet.",
    });
    expect(within(foundations).getAllByRole("article")).toHaveLength(3);
    expect(foundations).toHaveTextContent(
      "Découvrez les sources Web, Mobile et Fullstack",
    );
    expect(foundations).not.toHaveTextContent(
      "Explore Web, Mobile and Fullstack source",
    );
    for (const href of [
      "/docs/starter-pro/mobile",
      "/docs/starter-pro/fullstack",
      "/docs/starter-pro/implementation-support",
    ])
      expect(foundations.querySelector(`a[href="${href}"]`)).toBeTruthy();
    expect(screen.getByText("Prix défini après cadrage")).toBeVisible();
    expect(view.container.textContent).not.toMatch(/\b(?:nous|nos|notre)\b/i);
    // The native Next link mock preserves href; actual locale routing is exercised in browser QA.
    const possibilities = screen.getByRole("region", {
      name: "Votre activité, ses outils et ses parcours.",
    });
    expect(within(possibilities).getAllByRole("article")).toHaveLength(4);
  });
  it("publishes reciprocal routes and exposes services in desktop and mobile navigation", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "fr" }),
    });
    expect(metadata.alternates).toMatchObject({
      canonical: "https://pycolors.io/fr/services",
      languages: {
        en: "https://pycolors.io/services",
        fr: "https://pycolors.io/fr/services",
        "x-default": "https://pycolors.io/services",
      },
    });
    for (const items of [PRIMARY_NAV_ITEMS, MOBILE_BROWSE_NAV_ITEMS])
      expect(items).toContainEqual({ label: "Services", href: "/services" });
    for (const url of [
      "https://pycolors.io/services",
      "https://pycolors.io/fr/services",
    ])
      expect(sitemap().some((entry) => entry.url === url)).toBe(true);
  });
});

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { axe } from "vitest-axe";
import ServicesPage, {
  generateMetadata,
} from "@/app/[locale]/(site)/services/page";
import { CUSTOM_SOFTWARE_SERVICE } from "@/lib/products/project-services";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
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
    expect(view.container).toHaveTextContent("Reference implementation");
    expect(view.container.textContent).not.toMatch(/\b(?:we|our|us)\b/i);
    const reference = screen
      .getByRole("img", { name: productStudio.images.project.alt })
      .closest("figure")!;
    expect(reference).toHaveTextContent(productStudio.disclosure);
    expect(
      within(reference).getByRole("link", { name: "Explore the reference" }),
    ).toHaveAttribute("href", productStudio.href);
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
      "Les projets, personnes et activités sont fictifs.",
    );
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

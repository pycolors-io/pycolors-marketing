import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { renderToString } from "react-dom/server";
import HomePage, { metadata } from "../../app/(site)/page";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";
import { getUiExplorerUrl } from "../../lib/docs/ui-explorer";

vi.mock("@/lib/api/client", () => ({ createStarterProCheckout: vi.fn() }));

const headings = [
  "Project readiness workspace",
  "Start with what your project needs now.",
  "From the interface to your implementation.",
  "Choose the infrastructure your project needs.",
  "Inspect the project before you commit.",
  "Choose the foundation for your next step.",
];

const destinations = [
  ["Templates", "/templates/na-ai-landing"],
  ["PyColors UI", "/ui"],
  ["Blocks", "/blocks"],
  ["PyColors Starter Free", "/starters/free"],
  [PRODUCT_DISPLAY["starter-pro"].name, "/starters/pro"],
];

describe("showcase-first homepage", () => {
  it("renders one main and the approved seven-step journey with proof immediately after the hero", () => {
    render(<HomePage />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Ship credible SaaS products faster.",
    );
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(headings);
    const sections = Array.from(main.children).filter(
      (el) => el.tagName === "SECTION",
    );
    expect(sections).toHaveLength(7);
    expect(sections[1]).toBe(screen.getByRole("region", { name: headings[0] }));
    expect(screen.getAllByRole("table", { name: "Projects" })).toHaveLength(1);
    expect(screen.getByRole("region", { name: headings[1] })).toHaveAttribute(
      "id",
      "start-with-pycolors",
    );
    expect(screen.getByRole("region", { name: headings[2] })).toHaveAttribute(
      "id",
      "what-you-get",
    );
    for (const obsolete of [
      "home-product-ladder-heading",
      "home-saas-builders-heading",
      "home-template-heading",
      "home-starter-free-heading",
      "home-workflow-heading",
    ]) {
      expect(document.getElementById(obsolete)).toBeNull();
    }
  });

  it("keeps exactly two hero/final actions and situation-led rows with one canonical destination each", () => {
    render(<HomePage />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(
      within(hero)
        .getAllByRole("link")
        .map((a) => [a.textContent?.trim(), a.getAttribute("href")]),
    ).toEqual([
      ["Choose your starting point", "#start-with-pycolors"],
      ["Explore Starter Free", "/starters/free"],
    ]);
    expect(
      hero.querySelector("p")!.textContent!.split(/\s+/).length,
    ).toBeLessThanOrEqual(35);
    expect(within(hero).queryByRole("button")).toBeNull();
    const rows = within(
      screen.getByRole("list", { name: "PyColors starting points" }),
    ).getAllByRole("listitem");
    expect(rows).toHaveLength(5);
    destinations.forEach(([name, href], i) => {
      expect(
        within(rows[i]!).getByRole("heading", { level: 3, name }),
      ).toBeVisible();
      expect(within(rows[i]!).getAllByRole("link")).toHaveLength(1);
      expect(within(rows[i]!).getByRole("link")).toHaveAttribute("href", href);
    });
    expect(rows[0]).toHaveTextContent(PRODUCT_DISPLAY["na-ai-landing"].name);
    const closing = screen.getByRole("region", { name: headings[5] });
    expect(
      within(closing)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["#start-with-pycolors", "/starters/pro"]);
  });

  it("preserves the real showcase interactions inside the page", () => {
    render(<HomePage />);
    fireEvent.click(
      screen.getByRole("button", { name: "Open Team workspace" }),
    );
    expect(
      screen.getByRole("region", { name: "Team workspace" }),
    ).toBeVisible();
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Archived" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(
      screen.getByRole("heading", { name: "No archived projects" }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Show all projects" }));
    expect(screen.getByRole("tab", { name: "All" })).toHaveFocus();
    expect(
      screen.getByRole("button", { name: "Open Customer portal" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("uses helper-owned Explorer URLs and precise documentation, trust and production handoffs", () => {
    render(<HomePage />);
    const links = within(
      screen.getByRole("navigation", {
        name: "Explore the showcase primitives",
      }),
    ).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      ["table", "tabs", "empty-state"].map((family) =>
        getUiExplorerUrl(["ui", family]),
      ),
    );
    for (const href of [
      "/docs/ui/installation",
      "/docs/ui/accessibility",
      "/docs/ui/theming",
      "/docs/ui/composition",
      "/docs/ui/storybook",
      "/ui/patterns",
      "/ui/examples",
      "/docs/starter/installation",
      "/docs/starter/upgrade",
      "/docs/starter-pro/what-is-included",
      "/docs/starter-pro/getting-started",
      "/docs/starter-pro/delivery",
      "/pricing",
      "/roadmap",
      "/changelog",
      "/open-source",
      "/license",
      "/terms",
      "/privacy",
      "/orders/support",
    ]) {
      expect(document.querySelector(`main a[href="${href}"]`)).not.toBeNull();
    }
    const production = screen.getByRole("region", { name: headings[3] });
    expect(
      within(production).getByRole("link", {
        name: "Open the Starter Free demo",
      }),
    ).toHaveAttribute("href", "https://starter-demo.pycolors.io");
    expect(production).toHaveTextContent(
      "Authentication, payments and data are mocked.",
    );
    expect(production).toHaveTextContent(
      "configuration, integration and production checks",
    );
    expect(
      screen.getAllByRole("button", {
        name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      }),
    ).toHaveLength(1);
    expect(
      within(production).getByRole("button", { name: /Buy Starter Pro/ }),
    ).toBeVisible();
  });

  it("keeps metadata and breadcrumb identity and meaningful initial server markup", () => {
    expect(metadata).toEqual({
      title: {
        absolute: "Next.js SaaS UI System, Templates & Starters · PyColors",
      },
      description:
        "PyColors helps developers build and launch modern Next.js SaaS products faster with premium templates, a production-ready UI system, Starter Free, and Starter Pro with Auth.js, Prisma, Stripe commerce, secure delivery, purchase recovery, and SaaS architecture.",
      alternates: { canonical: "https://pycolors.io" },
      openGraph: {
        title: "Next.js SaaS UI System, Templates & Starters · PyColors",
        description:
          "Production-ready Next.js SaaS foundations including premium templates, UI systems, Starter Free, and Starter Pro with authentication, Stripe commerce, Prisma, secure delivery, purchase recovery, and protected app architecture.",
        url: "https://pycolors.io",
        siteName: "PyColors",
        type: "website",
        images: ["/seo/og-main.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Next.js SaaS UI System, Templates & Starters · PyColors",
        description:
          "Build modern SaaS products faster with premium templates, a production-ready UI system, Starter Free, and Starter Pro commerce foundations.",
        images: ["/seo/twitter-main.png"],
      },
    });
    const html = renderToString(<HomePage />);
    for (const text of [
      "Customer portal",
      "Team workspace",
      "Help center",
      "Synthetic demo data",
      "start-with-pycolors",
      "what-you-get",
    ])
      expect(html).toContain(text);
    render(<HomePage />);
    expect(
      JSON.parse(document.getElementById("home-breadcrumb")!.textContent!),
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pycolors.io/",
        },
      ],
    });
  });

  it("passes automated accessibility checks with descriptive native controls", async () => {
    const { container } = render(<HomePage />);
    expect(await axe(container)).toHaveNoViolations();
    for (const icon of container.querySelectorAll("svg"))
      expect(icon.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});

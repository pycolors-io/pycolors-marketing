import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { renderToString } from "react-dom/server";
import HomePage, { metadata } from "../../app/(site)/page";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";
import { STARTER_PRO_SERVICES } from "../../lib/products/starter-pro-services";

vi.mock("@/lib/api/client", () => ({ createStarterProCheckout: vi.fn() }));

const headings = [
  "Start with what your project needs now.",
  "From the interface to your implementation.",
  "Choose the infrastructure your project needs.",
  "A working example. A foundation to adapt.",
  "Your brand. Your interface.",
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

describe("product homepage", () => {
  it("hands off to the product tour without embedding a video on the homepage", () => {
    const { container } = render(<HomePage />);
    expect(
      screen.getByRole("link", { name: "Watch the product tour" }),
    ).toHaveAttribute("href", "/starters/pro#product-tour");
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("prioritizes products and starters before the complementary Theme Builder", () => {
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
    expect(sections).toHaveLength(8);
    expect(sections[1]).toBe(screen.getByRole("region", { name: headings[0] }));
    expect(screen.queryByRole("table", { name: "Projects" })).toBeNull();
    expect(sections[4]).toBe(screen.getByRole("region", { name: headings[3] }));
    expect(sections[5]).toBe(screen.getByRole("region", { name: headings[4] }));
    expect(screen.getByRole("region", { name: headings[0] })).toHaveAttribute(
      "id",
      "start-with-pycolors",
    );
    expect(screen.getByRole("region", { name: headings[1] })).toHaveAttribute(
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
    const closing = screen.getByRole("region", { name: headings[6] });
    expect(
      within(closing)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["#start-with-pycolors", "/starters/pro"]);
  });

  it("offers one clear handoff to the complete Theme Builder without a second editor", () => {
    render(<HomePage />);
    const section = screen.getByRole("region", { name: headings[4] });
    expect(within(section).getAllByRole("link")).toHaveLength(1);
    expect(
      within(section).getByRole("link", { name: "Open Theme Builder" }),
    ).toHaveAttribute("href", "/tools/theme-builder");
    expect(
      screen.getAllByRole("link", { name: "Open Theme Builder" }),
    ).toHaveLength(1);
    expect(section).toHaveTextContent("light and dark themes");
    expect(section).toHaveTextContent("export the CSS tokens");
    expect(section).toHaveTextContent("Free · No account needed");
    expect(within(section).queryByRole("button")).toBeNull();
    expect(within(section).queryByRole("textbox")).toBeNull();
    expect(within(section).queryByRole("tablist")).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Open Team workspace" }),
    ).toBeNull();
    expect(
      screen.queryByText("Synthetic demo data.", { exact: false }),
    ).toBeNull();
  });

  it("retains the documentation, product and trust handoffs", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("link", { name: "Read the UI Explorer guide" }),
    ).toHaveAttribute("href", "/docs/ui/storybook");
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
    const production = screen.getByRole("region", { name: headings[2] });
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

  it("provides a clear project-quote handoff alongside the starters", () => {
    render(<HomePage />);
    const production = screen.getByRole("region", { name: headings[2] });
    const implementation = within(production).getByRole("complementary", {
      name: "Implementation, scoped to your product.",
    });
    expect(implementation).toHaveTextContent("written proposal");
    expect(implementation).toHaveTextContent(
      "Source licence and provider costs are separate.",
    );
    const process = within(implementation).getByRole("list", {
      name: "Implementation process",
    });
    expect(within(process).getAllByRole("listitem")).toHaveLength(3);
    for (const service of Object.values(STARTER_PRO_SERVICES)) {
      const offer = within(implementation).getByRole("region", {
        name: service.title,
      });
      expect(offer).toHaveTextContent(service.priceLabel);
      expect(offer).toHaveTextContent(service.description);
      expect(offer).toHaveTextContent(service.deliverable);
      for (const highlight of service.highlights)
        expect(offer).toHaveTextContent(highlight);
      expect(
        within(offer).getByRole("link", { name: service.action }),
      ).toHaveAttribute("href", service.href);
    }
    expect(
      within(implementation).getByRole("link", {
        name: "Review scope & support",
      }),
    ).toHaveAttribute("href", "/docs/starter-pro/implementation-support");
  });

  it("keeps metadata and breadcrumb identity and meaningful initial server markup", () => {
    expect(metadata).toEqual({
      title: {
        absolute: "React & Next.js UI, Blocks and SaaS Starters · PyColors",
      },
      description:
        "Build React and Next.js products with UI components, reusable blocks, templates and SaaS starters. Explore the public library and choose your starting point.",
      alternates: { canonical: "https://pycolors.io" },
      openGraph: {
        title: "React & Next.js UI, Blocks and SaaS Starters · PyColors",
        description:
          "Build React and Next.js products with UI components, reusable blocks, templates and SaaS starters. Explore the public library and choose your starting point.",
        url: "https://pycolors.io",
        siteName: "PyColors",
        type: "website",
        images: ["/seo/og-main.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "React & Next.js UI, Blocks and SaaS Starters · PyColors",
        description:
          "Build React and Next.js products with UI components, reusable blocks, templates and SaaS starters. Explore the public library and choose your starting point.",
        images: ["/seo/twitter-main.png"],
      },
    });
    const html = renderToString(<HomePage />);
    for (const text of [
      "Your brand. Your interface.",
      "Open Theme Builder",
      "/tools/theme-builder",
      "CSS tokens",
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

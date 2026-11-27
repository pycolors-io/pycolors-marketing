import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { renderToString } from "react-dom/server";
import { localizedAlternates } from "@/lib/i18n/routes";
import HomePage, {
  generateMetadata as getLocalizedMetadata0,
} from "../../app/[locale]/(site)/page";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";
import { STARTER_PRO_SERVICES } from "../../lib/products/starter-pro-services";

const metadata = await getLocalizedMetadata0({
  params: Promise.resolve({ locale: "en" }),
});

vi.mock("@/lib/api/client", () => ({ createStarterProCheckout: vi.fn() }));

const headings = [
  "Start with what your project needs now.",
  "Your next application. Web, Mobile, or both.",
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
  [PRODUCT_DISPLAY["starter-pro-mobile"].name, "/starters/mobile"],
  [PRODUCT_DISPLAY["starter-pro-fullstack"].name, "/starters/fullstack"],
];

describe("product homepage", () => {
  it("connects source evaluation to the three setup guides before implementation services", () => {
    render(<HomePage />);
    const documentation = screen.getByRole("region", {
      name: "Choose your Starter Pro documentation.",
    });
    expect(within(documentation).getAllByRole("article")).toHaveLength(3);
    expect(
      within(documentation).getAllByRole("heading", { level: 4 }),
    ).toHaveLength(3);
    expect(within(documentation).getAllByRole("link")).toHaveLength(6);
    for (const slug of [
      "starter-pro",
      "starter-pro-mobile",
      "starter-pro-fullstack",
    ] as const) {
      const product = PRODUCT_DISPLAY[slug];
      expect(
        documentation.querySelector(`a[href="${product.docsHref}"]`),
      ).toHaveAccessibleName();
      expect(
        documentation.querySelector(`a[href="${product.href}"]`),
      ).toHaveAccessibleName();
    }
    expect(within(documentation).queryByRole("button")).toBeNull();
    const services = screen.getByRole("complementary", {
      name: "Custom software, built around your business.",
    });
    expect(
      documentation.compareDocumentPosition(services) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("hands off to the product tour without embedding a video on the homepage", () => {
    const { container } = render(<HomePage />);
    expect(
      screen.getByRole("link", { name: "Watch the product tour" }),
    ).toHaveAttribute("href", "/starters/pro#product-tour");
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("presents genuine light and dark product captures with their demonstration-data boundary", () => {
    render(<HomePage />);
    const images = screen.getAllByAltText(
      "Starter Pro dashboard with saved project counts, weekly chart and workspace team",
    );
    expect(images).toHaveLength(2);
    expect(images[0]!.getAttribute("src")).toContain(
      "dashboard-pycolors-2x.png",
    );
    expect(images[1]!.getAttribute("src")).toContain(
      "dashboard-dark-pycolors-2x.png",
    );
    const preview = images[0]!.closest("figure")!;
    expect(preview).toContainElement(images[1]!);
    expect(preview).toHaveTextContent(
      "Project counts, weekly creation history and team roles come from a seeded PostgreSQL workspace. These captures use demonstration data, not customer results.",
    );
    expect(within(preview).queryByRole("button")).toBeNull();
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
    expect(sections).toHaveLength(9);
    expect(sections[1]).toBe(screen.getByRole("region", { name: headings[0] }));
    expect(screen.queryByRole("table", { name: "Projects" })).toBeNull();
    expect(sections[5]).toBe(screen.getByRole("region", { name: headings[4] }));
    expect(sections[6]).toBe(screen.getByRole("region", { name: headings[5] }));
    expect(screen.getByRole("region", { name: headings[0] })).toHaveAttribute(
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
    expect(rows).toHaveLength(7);
    destinations.forEach(([name, href], i) => {
      expect(
        within(rows[i]!).getByRole("heading", { level: 3, name }),
      ).toBeVisible();
      expect(within(rows[i]!).getAllByRole("link")).toHaveLength(1);
      expect(within(rows[i]!).getByRole("link")).toHaveAttribute("href", href);
    });
    expect(rows[0]).toHaveTextContent(PRODUCT_DISPLAY["na-ai-landing"].name);
    const closing = screen.getByRole("region", { name: headings[7] });
    expect(
      within(closing)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["#start-with-pycolors", "/starters/pro"]);
  });

  it("discovers Mobile and Fullstack as distinct source offers", () => {
    render(<HomePage />);
    const gallery = screen.getByRole("region", { name: headings[0] });
    expect(gallery).toHaveTextContent("One system. Seven entry points.");
    expect(within(gallery).getByText("01 / 07")).toBeVisible();
    const mobile = within(gallery)
      .getByRole("heading", {
        level: 3,
        name: PRODUCT_DISPLAY["starter-pro-mobile"].name,
      })
      .closest("li")!;
    expect(mobile).toHaveTextContent(
      PRODUCT_DISPLAY["starter-pro-mobile"].priceLabel,
    );
    expect(mobile).toHaveTextContent("React Native · Expo");
    expect(mobile).toHaveTextContent(
      "Native iOS and Android source with a compatible backend, configuration, database schema and setup guides. No Web purchase is required.",
    );
    expect(
      within(mobile).getByRole("link", { name: "Explore Starter Pro Mobile" }),
    ).toHaveAttribute("href", "/starters/mobile");
    expect(within(mobile).getAllByRole("link")).toHaveLength(1);
    expect(within(mobile).queryByRole("button")).toBeNull();
  });

  it("uses Starter Pro decorative artwork in the gallery and keeps real evidence in the infrastructure stories", () => {
    const { container } = render(<HomePage />);
    const gallery = screen.getByRole("region", { name: headings[0] });
    const images = gallery.querySelectorAll("img");
    expect(images).toHaveLength(7);
    expect(
      new Set(Array.from(images, (image) => image.getAttribute("src"))).size,
    ).toBe(6);
    for (const image of images) {
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute("aria-hidden", "true");
      expect(decodeURIComponent(image.getAttribute("src")!)).toContain(
        "/images/starters/pro/concepts/",
      );
    }
    const infrastructure = screen.getByRole("region", { name: headings[3] });
    expect(infrastructure).toHaveAttribute("id", "infrastructure");
    const stories = [
      within(infrastructure).getByRole("article", {
        name: "PyColors Starter Free",
      }),
      within(infrastructure).getByRole("article", {
        name: PRODUCT_DISPLAY["starter-pro"].name,
      }),
    ];
    expect(stories).toHaveLength(2);
    expect(stories[0]).toHaveAccessibleName("PyColors Starter Free");
    expect(stories[1]).toHaveAccessibleName(
      PRODUCT_DISPLAY["starter-pro"].name,
    );
    expect(
      container.querySelectorAll("[data-product-preview=starter-free]"),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll("[data-product-preview=starter-pro]"),
    ).toHaveLength(1);
    expect(stories[0]).toHaveTextContent(
      "Mock authentication, payments & data",
    );
    expect(stories[1]).toHaveTextContent(
      "Validated ZIP, guides & operational checks",
    );
  });

  it("offers one clear handoff to the complete Theme Builder without a second editor", () => {
    render(<HomePage />);
    const section = screen.getByRole("region", { name: headings[5] });
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

  it("features Mobile and Fullstack before implementation with distinct product and setup actions", () => {
    render(<HomePage />);
    const products = screen.getByRole("region", {
      name: "Your next application. Web, Mobile, or both.",
    });
    const gallery = screen.getByRole("region", { name: headings[0] });
    const foundations = screen.getByRole("region", { name: headings[2] });
    expect(
      gallery.compareDocumentPosition(products) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      products.compareDocumentPosition(foundations) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(products).toHaveAttribute("id", "starter-pro-mobile");
    expect(within(products).getAllByRole("article")).toHaveLength(2);
    for (const slug of [
      "starter-pro-mobile",
      "starter-pro-fullstack",
    ] as const) {
      const product = PRODUCT_DISPLAY[slug];
      const card = within(products).getByRole("article", {
        name: product.name,
      });
      expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent(
        product.name,
      );
      expect(card).toHaveTextContent(product.priceLabel);
      expect(card).toHaveTextContent("One-time payment · VAT included");
      expect(card).toHaveTextContent("Source licence");
      expect(
        card.querySelector(`a[href="${product.href}"]`),
      ).toHaveAccessibleName();
      expect(
        card.querySelector(`a[href="${product.docsHref}"]`),
      ).toHaveAccessibleName();
      expect(within(card).getAllByRole("link")).toHaveLength(2);
      expect(within(card).getByText("Concept illustration")).toBeVisible();
    }
    expect(products).toHaveTextContent(
      "Mobile includes a compatible backend. Fullstack adds the Web interface with the same accounts and data.",
    );
    expect(
      within(products).getByRole("link", { name: "Compare source licences" }),
    ).toHaveAttribute("href", "/pricing#source-licences");
    expect(within(products).queryByRole("button")).toBeNull();
    expect(products.textContent).not.toMatch(/Coming soon|Now available/);
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

  it("provides a clear project-quote handoff alongside the starters", () => {
    render(<HomePage />);
    const production = screen.getByRole("region", { name: headings[3] });
    const implementation = within(production).getByRole("complementary", {
      name: "Custom software, built around your business.",
    });
    expect(implementation).toHaveTextContent("written proposal");
    expect(
      within(implementation).getByRole("link", {
        name: "Explore our services",
      }),
    ).toHaveAttribute("href", "/services");
    expect(implementation).toHaveTextContent(
      "Source licence and provider costs are separate.",
    );
    const process = within(implementation).getByRole("list", {
      name: "Implementation process",
    });
    expect(within(process).getAllByRole("listitem")).toHaveLength(3);
    const details = implementation.querySelector("details")!;
    const summary = within(implementation)
      .getByText("Explore implementation services")
      .closest("summary")!;
    expect(details.open).toBe(true);
    expect(
      within(implementation).getByRole("region", { name: "Guided setup" }),
    ).toBeVisible();
    fireEvent.click(summary);
    expect(details.open).toBe(false);
    fireEvent.click(summary);
    expect(details.open).toBe(true);
    for (const service of Object.values(STARTER_PRO_SERVICES)) {
      const offer = within(implementation).getByRole("region", {
        name: service.title,
      });
      expect(offer).toBeVisible();
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

  it("supports purchase decisions with public source, a real demo and delivery guidance", () => {
    render(<HomePage />);
    const trust = screen.getByRole("region", { name: headings[6] });
    for (const [label, href] of [
      ["Explore PyColors UI", "/ui"],
      ["Open the Starter Free demo", "https://starter-demo.pycolors.io"],
      ["Understand purchase and delivery", "/docs/starter-pro/delivery"],
    ]) {
      expect(within(trust).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
    expect(trust).toHaveTextContent("mock authentication, payments and data");
    expect(trust).toHaveTextContent(
      "licence, included files, setup requirements and delivery process",
    );
    const infrastructure = screen.getByRole("region", { name: headings[3] });
    for (const name of [
      "Starter Free dashboard with example projects and metrics",
      "Starter Pro dashboard with sample projects and workspace metrics",
    ]) {
      expect(within(infrastructure).getByRole("img", { name })).toBeVisible();
    }
  });

  it("keeps metadata and breadcrumb identity and meaningful initial server markup", () => {
    expect(metadata).toEqual({
      title: {
        absolute: "React & Next.js UI, Blocks and SaaS Starters · PyColors",
      },
      description:
        "Build React and Next.js products with UI components, reusable blocks, templates and SaaS starters. Explore the public library and choose your starting point.",
      alternates: {
        canonical: "https://pycolors.io",
        languages: localizedAlternates("home", "en").languages,
      },
      openGraph: {
        locale: "en_US",
        alternateLocale: "fr_FR",
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
      "Your next application. Web, Mobile, or both.",
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

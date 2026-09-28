import * as React from "react";
import Link from "next/link";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import AboutPage, {
  metadata as aboutMetadata,
} from "../../app/(site)/about/page";
import OpenSourcePage, {
  metadata as openSourceMetadata,
} from "../../app/(site)/open-source/page";
import RoadmapPage, {
  metadata as roadmapMetadata,
} from "../../app/(site)/roadmap/page";
import ChangelogPage, {
  metadata as changelogMetadata,
} from "../../app/(site)/changelog/page";
import { PageHero } from "../../components/marketing/page-hero";

const pages = [
  [
    "about",
    AboutPage,
    aboutMetadata,
    "PyColors helps developers ship credible SaaS products faster.",
  ],
  [
    "open-source",
    OpenSourcePage,
    openSourceMetadata,
    "Open-source foundations behind PyColors.",
  ],
  ["roadmap", RoadmapPage, roadmapMetadata, "Roadmap"],
  ["changelog", ChangelogPage, changelogMetadata, "Changelog"],
] as const;

describe("company and trust pages", () => {
  for (const [route, Page, metadata, title] of pages) {
    it(`${route} retains its canonical, breadcrumb data, one H1 and a reachable main landmark`, () => {
      const { container } = render(<Page />);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "content");
      expect(main).toHaveAttribute("tabindex", "-1");
      expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(
        1,
      );
      expect(within(main).getByRole("heading", { level: 1 })).toHaveTextContent(
        title,
      );
      expect(metadata.alternates?.canonical).toBe(`/${route}`);
      expect(metadata.openGraph?.url).toBe(`/${route}`);
      const breadcrumb = JSON.parse(
        container.querySelector('script[type="application/ld+json"]')!
          .textContent!,
      );
      expect(
        breadcrumb.itemListElement.map((item: { item: string }) => item.item),
      ).toEqual(["https://pycolors.io/", `https://pycolors.io/${route}`]);
      for (const link of within(main).getAllByRole("link")) {
        expect(link).toHaveAccessibleName();
        expect(link).toHaveAttribute("href");
        expect(link.querySelector("a,button")).toBeNull();
        if (link.getAttribute("target") === "_blank") {
          expect(link).toHaveAttribute("rel", "noreferrer noopener");
        }
      }
    });

    // Scan the complete release/milestone history, including on slower CI
    // runners. Keep the functional checks on Vitest's default deadline.
    it(`${route} has no automated accessibility violations across the full page`, async () => {
      const { container } = render(<Page />);
      expect(await axe(container)).toHaveNoViolations();
    }, 15_000);
  }

  it("keeps the About progression table and the existing product destinations", () => {
    render(<AboutPage />);
    const table = screen.getByRole("table", {
      name: "How the ecosystem works",
    });
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(5);
    expect(
      within(rows[0]!)
        .getAllByRole("columnheader")
        .map((n) => n.textContent),
    ).toEqual(["Stage", "What it means", "Where to go", "Why it matters"]);
    expect(
      rows
        .slice(1)
        .map((row) => within(row).getAllByRole("cell")[0]!.textContent),
    ).toEqual(["Learn", "Explore", "Validate", "Launch"]);
    expect(
      within(table)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual([
      "/guides",
      "/ui/patterns",
      "/examples",
      "/starters/free",
      "/starters/pro",
      "/pricing",
    ]);
    expect(
      screen.getByRole("heading", { name: "Today", level: 3 }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Next", level: 3 }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "View changelog" }),
    ).toHaveAttribute("href", "/changelog");
    expect(screen.getByRole("link", { name: "View roadmap" })).toHaveAttribute(
      "href",
      "/roadmap",
    );
  });

  it("keeps all six repositories, their categories, safe links and license boundary", () => {
    render(<OpenSourcePage />);
    const repositories = screen.getByRole("region", { name: "Repositories" });
    const links = within(repositories).getAllByRole("link");
    expect(links).toHaveLength(6);
    const expected = [
      ["pycolors-ui", "Core foundations"],
      ["pycolors-tokens", "Core foundations"],
      ["pycolors-eslint-config", "Developer tooling"],
      ["pycolors-typescript-config", "Developer tooling"],
      ["pycolors-starter-free", "Starters"],
      ["pycolors-marketing", "Website"],
    ];
    expected.forEach(([name, category], i) => {
      expect(links[i]).toHaveAttribute(
        "href",
        `https://github.com/pycolors-io/${name}`,
      );
      expect(links[i]).toHaveAccessibleName(expect.stringContaining(name!));
      expect(links[i]).toHaveTextContent(category!);
      expect(
        within(links[i]!).getByRole("heading", { level: 4 }),
      ).toHaveTextContent(name!);
    });
    expect(
      screen.getByText(
        /Public repositories are governed by their repository licenses/,
      ),
    ).toBeVisible();
    expect(
      within(
        screen.getByRole("table", { name: "Open-core strategy" }),
      ).getAllByRole("row"),
    ).toHaveLength(4);
  });

  it("preserves all milestone groups and distinguishes active, planned and shipped work", () => {
    render(<RoadmapPage />);
    const totals = within(
      screen.getByRole("list", { name: "Roadmap status totals" }),
    ).getAllByRole("listitem");
    expect(totals.map((n) => n.textContent)).toEqual([
      "shipped73",
      "now3",
      "next4",
      "later0",
    ]);
    const groups = [
      "Release Week",
      "January 2026",
      "February 2026",
      "March 2026",
      "April 2026",
      "May 2026",
      "June 2026",
      "July 2026",
      "August 2026",
      "September 2026",
      "H1 2026",
    ];
    const rows = groups.flatMap((name) =>
      Array.from(screen.getByRole("list", { name }).children),
    );
    expect(rows).toHaveLength(80);
    expect(
      rows.map(
        (row) =>
          within(row as HTMLElement).getByRole("heading", { level: 3 })
            .textContent,
      ),
    ).toEqual(roadmapTitles);
    for (const [title, status] of pendingRoadmap) {
      const card = screen
        .getByRole("heading", { level: 3, name: title })
        .closest("li")!;
      expect(within(card).getByText(status, { exact: true })).toBeVisible();
      expect(within(card).queryByText("Shipped", { exact: true })).toBeNull();
    }
    expect(
      screen.getByText(/Package-based distribution remains planned/),
    ).toBeVisible();
  });

  it("keeps every historical release in order, with its date, status, title, detail link and highlights", () => {
    render(<ChangelogPage />);
    const list = screen.getByRole("list", { name: "Release history" });
    expect(list.tagName).toBe("OL");
    const articles = within(list).getAllByRole("article");
    expect(articles).toHaveLength(releases.length);
    releases.forEach(([version, date, title, href], i) => {
      const article = articles[i]!;
      expect(within(article).getByText(version, { exact: true })).toBeVisible();
      expect(article.querySelector("time")).toHaveAttribute("datetime", date);
      expect(
        within(article).getByRole("heading", { level: 2 }),
      ).toHaveTextContent(title);
      expect(
        within(article).getByText("Stable", { exact: true }),
      ).toBeVisible();
      expect(within(article).getAllByRole("link")[0]).toHaveAttribute(
        "href",
        href,
      );
      expect(within(article).getAllByRole("list").length).toBeGreaterThan(0);
    });
  });

  it("keeps the existing hero default and supports a compact introduction with identical content", () => {
    const props = {
      title: "Company",
      description: "Existing description",
      actions: <Link href="/docs">Read docs</Link>,
      extra: <p>Existing context</p>,
    };
    const { container, rerender } = render(<PageHero {...props} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    rerender(<PageHero {...props} variant="compact" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Company",
    );
    expect(screen.getByText("Existing description")).toBeVisible();
    expect(screen.getByText("Existing context")).toBeVisible();
    expect(screen.getByRole("link", { name: "Read docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});

// Public data frozen before the #631 composition migration. Update only with an intentional content change.
const roadmapTitles = [
  "Ship v1.0 — UI Core",
  "Docs quality pass",
  "Release hygiene",
  "Marketing site baseline",
  "Patterns docs v1",
  "Distribution loop v1",
  "UI Advanced v1",
  "Public packages",
  "Starter Free public alpha",
  "Starter docs v1",
  "Guides knowledge layer",
  "Patterns + Examples discovery layer",
  "PRO upgrade funnel",
  "Billing system v1",
  "Starter PRO auth foundation",
  "OAuth sign-in and sign-up UX",
  "Auth security hardening",
  "Starter Pro public commercial launch",
  "Secure claim, download, and access recovery",
  "Pricing route consolidation",
  "Reusable marketing hero system",
  "Premium docs navigation and header system",
  "Focused docs reading experience",
  "Starter Free documentation refinement",
  "Starter Pro production documentation expansion",
  "Marketing and pricing polish",
  "Premium brand, token, and conversion polish",
  "NA-AI Landing commercial template",
  "Multi-product commerce foundation",
  "Templates documentation system",
  "Blog editorial UX polish",
  "Reusable docs component system",
  "NA-AI Landing documentation expansion",
  "Documentation decision surfaces",
  "Starter Pro production architecture documentation",
  "Scalable token foundation",
  "Trusted Publishing infrastructure",
  "Commercial upgrade clarity",
  "Starter Pro sales proof and trust content",
  "Starter Pro PWA foundation",
  "Public shell and safe-area layout system",
  "Local validation and billing testing docs",
  "Analytics, SEO, and recovery-path hardening",
  "Starter Pro release history and packaging",
  "Marketing proof and launch visibility",
  "Starter Pro conversion instrumentation",
  "Starter Pro buyer trust and purchase-flow clarity",
  "Starter Pro hosted demo",
  "Starter Pro video walkthrough",
  "Traffic-readiness trust cleanup",
  "Starter Pro demo visibility and conversion proof",
  "@pycolors/ui v1.1.2 accessibility hardening",
  "@pycolors/ui production-readiness sprint",
  "Release catch-up and UI delivery cleanup",
  "@pycolors/tokens v1.2.2 contrast baseline",
  "Component standards and reliable delivery foundation",
  "PyColors Marketing v1.21.1",
  "PyColors UI adoption guidance",
  "Starter Pro purchase clarity",
  "PyColors Marketing v1.25.0",
  "Starter Pro purchase and recovery clarity",
  "Live PyColors UI evaluation",
  "Showcase-first product journey",
  "Product-specific setup guidance",
  "Interactive UI usage examples",
  "Design-system principles",
  "Semantic color and Toast readability",
  "PyColors Marketing v1.23.0",
  "Blocks discovery and complete-source documentation",
  "Pricing Plans Block",
  "Data Table empty-state actions",
  "PyColors Marketing v1.22.0",
  "Reusable SaaS feature showcase system",
  "Upgrade Gate monetization patterns",
  "Starter Pro product-surface refinement",
  "Documentation modularity and decision systems",
  "Authority engineering content engine",
  "Template #2",
  "@pycolors/blocks",
  "Documentation-to-product conversion loop",
] as const;
const pendingRoadmap = [
  ["Authority engineering content engine", "Now"],
  ["Starter Pro hosted demo", "Next"],
  ["Starter Pro video walkthrough", "Next"],
  ["Template #2", "Next"],
  ["@pycolors/blocks", "Next"],
  ["Starter Pro sales proof and trust content", "Now"],
  ["Documentation-to-product conversion loop", "Now"],
] as const;
const releases = [
  [
    "v1.25.0",
    "2026-09-25",
    "PyColors Marketing v1.25.0: clearer product proof and purchase guidance",
    "/",
  ],
  [
    "v1.24.0",
    "2026-09-18",
    "PyColors Marketing v1.24.0: from setup to working UI examples",
    "/docs/getting-started",
  ],
  [
    "v1.23.0",
    "2026-09-11",
    "PyColors Marketing v1.23.0: discover, copy, and adapt Blocks",
    "/blocks",
  ],
  [
    "v1.22.0",
    "2026-09-04",
    "PyColors Marketing v1.22.0: a more practical path to implementation",
    "/tools/theme-builder",
  ],
  [
    "v1.21.1",
    "2026-08-14",
    "A clearer next step for product builders",
    "/docs/ui",
  ],
  [
    "v1.21.0",
    "2026-08-07",
    "Clearer guidance from adoption to upgrade",
    "/docs/ui",
  ],
  [
    "v1.20.0",
    "2026-07-31",
    "Tokens baseline folded into the product story",
    "/docs/design-system/tokens",
  ],
  [
    "v1.19.0",
    "2026-07-24",
    "Release catch-up and UI delivery cleanup",
    "/roadmap",
  ],
  [
    "v1.18.0",
    "2026-07-17",
    "UI quality standards and more reliable product delivery",
    "/roadmap",
  ],
  [
    "v1.1.2 (@pycolors/ui)",
    "2026-07-11",
    "@pycolors/ui accessibility hardening",
    "/docs/ui",
  ],
  [
    "v1.17.4",
    "2026-07-03",
    "Starter Pro demo visibility and conversion proof",
    "/starters/pro",
  ],
  [
    "v1.17.3",
    "2026-06-26",
    "Starter Pro buyer trust and purchase-flow clarity",
    "/starters/pro",
  ],
  [
    "v1.17.1",
    "2026-06-19",
    "NA-AI Landing checkout reliability fix",
    "/templates",
  ],
  [
    "v1.17.0",
    "2026-06-12",
    "Starter Pro PWA foundations, public shell, local validation docs, analytics, and launch visibility",
    "/starters/pro",
  ],
  [
    "v1.16.0",
    "2026-06-05",
    "Starter Pro product maturity, reusable SaaS patterns, premium docs polish, and conversion-ready platform refinement",
    "/docs",
  ],
  [
    "v1.15.0",
    "2026-05-29",
    "Starter Pro production documentation, scalable token architecture, npm Trusted Publishing, and stronger commercial positioning",
    "/docs",
  ],
  [
    "v1.14.0",
    "2026-05-22",
    "Documentation system consolidation, reusable docs components, NA-AI guidance, and clearer product decision paths",
    "/docs",
  ],
  [
    "v1.13.0",
    "2026-05-15",
    "NA-AI Landing launch, multi-product commerce, templates funnel, docs system cleanup, and blog polish",
    "/templates",
  ],
  [
    "v1.12.0",
    "2026-05-08",
    "Premium brand system, SaaS token architecture, marketing polish, and stronger Starter Free-to-Pro conversion",
    "/pricing",
  ],
  [
    "v1.11.0",
    "2026-05-01",
    "Premium documentation system, docs navigation polish, SaaS guides expansion, and stronger Free-to-Pro clarity",
    "/docs",
  ],
  [
    "v1.10.0",
    "2026-04-24",
    "Pricing route, product navigation, documentation UX, and Free-to-Pro conversion polish",
    "/pricing",
  ],
  [
    "v1.9.0",
    "2026-04-17",
    "Starter Pro public commercial launch, checkout flow, secure delivery, and conversion hardening",
    "/roadmap",
  ],
  [
    "v1.8.0",
    "2026-04-10",
    "Starter Pro security hardening, account security activity, premium auth UX, pricing clarity, and production-shaped app surfaces",
    "/roadmap",
  ],
  [
    "v1.7.0",
    "2026-04-03",
    "Starter Pro account management, OAuth UX, connected accounts, and in-session security flows",
    "/roadmap",
  ],
  [
    "v1.6.0",
    "2026-03-27",
    "Starter Pro auth foundation + transactional auth emails + marketing UX polish",
    "/roadmap",
  ],
  [
    "v1.5.0",
    "2026-03-20",
    "Blog platform + billing maturity + marketing clarity",
    "/blog",
  ],
  [
    "v1.4.0",
    "2026-03-13",
    "Starter Pro foundation + billing engine groundwork",
    "/roadmap",
  ],
  ["v1.3.0", "2026-03-06", "SaaS knowledge layer + PRO funnel", "/guides"],
  ["v1.2.2", "2026-02-27", "Trust foundation: Terms + Privacy", "/license"],
  [
    "v1.2.1",
    "2026-02-20",
    "Starter Free docs + marketing UX polish",
    "/docs/starter",
  ],
  [
    "v1.2.0",
    "2026-02-13",
    "Ecosystem public launch: Tokens + ESLint + Release Engine",
    "/docs",
  ],
  ["v1.1.2", "2026-02-06", "Starter foundations + release engine", "/roadmap"],
  ["v1.1.1", "2026-01-30", "Patterns docs + SEO polish", "/docs/patterns"],
  ["v1.1.0", "2026-01-23", "Advanced UI + product patterns", "/docs/ui"],
  ["v1.0.1", "2026-01-16", "Marketing & trust baseline", "/templates"],
  ["v1.0.0", "2026-01-09", "UI Core Foundation", "/roadmap"],
] as const;

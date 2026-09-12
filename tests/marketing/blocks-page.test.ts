// @vitest-environment node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { BLOCKS_CATALOG } from "../../lib/blocks/catalog";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (path: string) =>
  readFileSync(resolve(marketingRoot, path), "utf8");
const page = read("app/(site)/blocks/page.tsx");

function readStaticRoutes() {
  const source = read("app/sitemap.ts");
  const declaration = source.match(
    /const STATIC_ROUTES = \[([\s\S]*?)\] as const;/u,
  );
  expect(declaration).not.toBeNull();
  const matches = (declaration?.[1] ?? "").matchAll(/"([^"\n]*)"/gu);
  return [...matches].map((match) => match[1]);
}

describe("Blocks discovery", () => {
  it("lists six canonical Blocks with unique identities", () => {
    const identities = BLOCKS_CATALOG.map((block) => block.id);
    expect(identities).toEqual([
      "app-shells/responsive-sidebar",
      "data/data-table",
      "account/settings-panel",
      "commerce/pricing-plans",
      "feedback/empty-state-panel",
      "account/workspace-members",
    ]);
    expect(new Set(identities).size).toBe(BLOCKS_CATALOG.length);
    expect(new Set(BLOCKS_CATALOG.map((block) => block.href)).size).toBe(
      BLOCKS_CATALOG.length,
    );
  });

  it.each(BLOCKS_CATALOG)(
    "$title has canonical source and public documentation, not a placeholder",
    (block) => {
      expect(block.id).toMatch(/^[a-z]+(?:-[a-z]+)*\/[a-z]+(?:-[a-z]+)*$/u);
      expect(block.href).toBe(`/docs/blocks/${block.id}`);
      expect(block.title.trim().length).toBeGreaterThan(0);
      expect(block.category.trim().length).toBeGreaterThan(0);
      expect(block.description.trim().length).toBeGreaterThan(30);

      const source = read(`content/blocks/${block.id}/index.tsx`);
      const docs = read(`content/docs/blocks/${block.id}.mdx`);
      expect(source).toMatch(/export function /u);
      expect(docs).toMatch(/^---\r?\n/u);
      expect(docs).toMatch(/title:\s*\S/u);
      expect(docs).not.toMatch(/^\s*(?:draft|private):\s*true\s*$/mu);
      expect(docs).toContain(`content/blocks/${block.id}/`);
    },
  );

  it("uses shared Marketing components and catalog data", () => {
    expect(page).toContain("BLOCKS_CATALOG.map");
    expect(page).toContain("BLOCKS_CATALOG.length");
    for (const component of [
      "Container",
      "PageHero",
      "MarketingResourceCard",
      "MarketingSectionHeader",
      "MarketingSectionShell",
      "MarketingCtaPanel",
      "MarketingActionGroup",
    ]) {
      expect(page).toContain(`<${component}`);
    }
    expect(page).not.toMatch(/from ["'][^"']*content\/blocks\//u);
    expect(page).not.toMatch(/from ["']@pycolors\/ui\//u);
    expect(page).not.toMatch(/registryDependencies|registry:|registry\.json/u);
  });

  it("provides server-rendered metadata and existing social images", () => {
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).not.toMatch(/\b(?:useEffect|useState|fetch|localStorage)\b/u);
    expect(page).toMatch(/alternates:\s*\{\s*canonical:\s*"\/blocks"/u);
    expect(page).toMatch(/openGraph:\s*\{[\s\S]*?url:\s*"\/blocks"/u);
    expect(page).toMatch(/twitter:\s*\{\s*card:\s*"summary_large_image"/u);
    for (const image of ["og-main.png", "twitter-main.png"]) {
      const filename = resolve(marketingRoot, "public/seo", image);
      expect(existsSync(filename)).toBe(true);
    }
  });

  it("preserves the skip target and section heading hierarchy", () => {
    expect(page).toMatch(/<main id="content" tabIndex=\{-1\}>/u);
    expect(page.match(/<PageHero\b/gu)).toHaveLength(1);
    expect(page).not.toMatch(/<h1\b/u);
    expect(page).toContain("headingLevel={3}");
    const labels = Array.from(page.matchAll(/aria-labelledby="([^"]+)"/gu));
    expect(labels).toHaveLength(4);
    for (const [, id] of labels) {
      expect(page).toContain(`titleId="${id}"`);
    }
    expect(page).toContain("focus-visible:ring-2");
    expect(page).toContain('id="catalog"');
    expect(page).toContain("scroll-mt-24");
  });

  it("links to installation and Starter comparison", () => {
    for (const href of ["#catalog", "/docs/blocks", "/starters"]) {
      expect(page).toContain(`href="${href}"`);
    }

    // The installation link is data-driven: verify both the route declaration
    // and the Link binding instead of requiring a formatting-sensitive JSX
    // literal. This keeps the contract valid when the presentation is refactored.
    expect(page).toContain('href: "/docs/ui/installation"');
    expect(page).toContain("href={step.href}");
    expect(page).toContain('cta: "UI installation"');

    expect(page).toContain("no automatic updates or synchronization");
    expect(page).toContain("no Blocks npm package, Registry installer or CLI");
    expect(page).not.toMatch(
      /BuyStarterProButton|checkout|\/api\/|https:\/\/github/u,
    );
    expect(
      BLOCKS_CATALOG.every((block) => block.href.startsWith("/docs/blocks/")),
    ).toBe(true);
  });

  it("adds Blocks to shared desktop and mobile navigation", () => {
    const menu = read("lib/layout.shared.tsx");
    expect(menu).toMatch(/label:\s*"Blocks",\s*href:\s*"\/blocks"/u);
    expect(menu.match(/href:\s*"\/blocks"/gu)).toHaveLength(1);
    const header = read("components/layout/site-header.tsx");
    expect(header).toContain("PRODUCT_MENU_GROUPS.flatMap");
    expect(header).toContain("PRODUCT_MENU_GROUPS.map");
  });

  it("adds a sitemap route and an installation-guide backlink", () => {
    expect(
      readStaticRoutes().filter((route) => route === "/blocks"),
    ).toHaveLength(1);
    expect(read("content/docs/blocks/index.mdx")).toContain(
      "[Explore the Blocks catalog](/blocks)",
    );
  });
});

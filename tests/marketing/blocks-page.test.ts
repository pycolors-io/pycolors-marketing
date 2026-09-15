// @vitest-environment node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { BLOCK_CATEGORIES, BLOCKS_CATALOG } from "../../lib/blocks/catalog";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (path: string) =>
  readFileSync(resolve(marketingRoot, path), "utf8");
const page = read("app/(site)/blocks/page.tsx");
const preview = read("components/marketing/blocks/block-catalog-preview.tsx");
const clientPreviews = read(
  "components/marketing/blocks/catalog-client-previews.tsx",
);

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
  it("lists documented canonical Blocks with unique identities", () => {
    const identities = BLOCKS_CATALOG.map((block) => block.id);
    expect(identities).toEqual([
      "app-shells/responsive-sidebar",
      "auth/sign-in",
      "auth/sign-up",
      "auth/password-recovery",
      "data/data-table",
      "account/settings-panel",
      "commerce/pricing-plans",
      "commerce/billing-overview",
      "commerce/payment-method",
      "commerce/invoice-history",
      "feedback/empty-state-panel",
      "account/workspace-members",
      "account/workspace-invitations",
      "account/audit-log",
    ]);
    expect(new Set(identities).size).toBe(BLOCKS_CATALOG.length);
    expect(new Set(BLOCKS_CATALOG.map((block) => block.href)).size).toBe(
      BLOCKS_CATALOG.length,
    );
    expect(BLOCK_CATEGORIES.map((category) => category.slug)).toEqual([
      "app-shells",
      "auth",
      "commerce",
      "account",
      "data",
      "feedback",
    ]);
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

  it("renders a real canonical preview for every catalogued Block", () => {
    const slugs = BLOCKS_CATALOG.map((block) => block.id.split("/")[1]);
    expect(new Set(slugs).size).toBe(BLOCKS_CATALOG.length);

    for (const slug of slugs) {
      expect(preview).toContain(`case "${slug}"`);
    }

    expect(preview).toMatch(/from ["']@\/content\/blocks\//u);
    expect(preview).not.toMatch(/fumadocs|\.mdx|components\/docs/u);
    expect(preview).not.toMatch(/\b(?:fetch|axios|XMLHttpRequest)\b/u);
  });

  it("keeps the catalog server-rendered with only bounded client fixtures", () => {
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).not.toMatch(/\b(?:useEffect|useState|fetch|localStorage)\b/u);
    expect(preview).not.toMatch(/["']use client["']/u);
    expect(clientPreviews).toMatch(/^"use client";/u);
    expect(clientPreviews).toContain("CatalogDataTablePreview");
    expect(clientPreviews).toContain("CatalogSettingsPanelPreview");
    expect(clientPreviews).not.toMatch(/\b(?:fetch|axios|XMLHttpRequest)\b/u);
  });

  it("uses shared Marketing components, category navigation and catalog data", () => {
    expect(page).toContain("BLOCK_CATEGORIES.map");
    expect(page).toContain("BLOCKS_CATALOG.filter");
    expect(page).toContain("BLOCKS_CATALOG.length");
    expect(page).toContain("BlockCatalogPreview");
    expect(page).toContain('aria-label="Block categories"');
    expect(page).toContain("Build SaaS interfaces faster");
    expect(page).toContain("Live preview");
    for (const component of [
      "Container",
      "PageHero",
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
    expect(page).toMatch(/alternates:\s*\{\s*canonical:\s*"\/blocks"/u);
    expect(page).toMatch(/openGraph:\s*\{[\s\S]*?url:\s*"\/blocks"/u);
    expect(page).toMatch(/twitter:\s*\{\s*card:\s*"summary_large_image"/u);
    for (const image of ["og-main.png", "twitter-main.png"]) {
      const filename = resolve(marketingRoot, "public/seo", image);
      expect(existsSync(filename)).toBe(true);
    }
  });

  it("preserves the skip target and accessible heading structure", () => {
    expect(page).toMatch(/<main id="content" tabIndex=\{-1\}>/u);
    expect(page.match(/<PageHero\b/gu)).toHaveLength(1);
    expect(page).not.toMatch(/<h1\b/u);
    expect(page).toContain("<h3");
    expect(page).toContain("<h4");
    expect(page).toContain("focus-visible:ring-2");
    expect(page).toContain('id="block-catalog"');
    expect(page).toContain("scroll-mt-24");
    expect(page).toContain('aria-hidden="true"');
    expect(page).toContain("inert");
  });

  it("exposes distinct View, Source and Install actions without a fake installer", () => {
    for (const href of ["#block-catalog", "/docs/blocks", "/starters"]) {
      expect(page).toContain(`href="${href}"`);
    }
    expect(page).toContain('const sourceHref = `${block.href}#copy-source`');
    expect(page).toContain(
      'const installHref = `${block.href}#install-by-copying-source`',
    );
    expect(page).toContain("View");
    expect(page).toContain("Source");
    expect(page).toContain("Install");
    expect(page).toContain("Copy the complete source into your application");
    expect(page).toContain("no Blocks Registry or CLI is required");
    expect(page).not.toMatch(
      /BuyStarterProButton|checkout|\/api\/|https:\/\/github/u,
    );
  });

  it("adds Blocks to shared desktop and mobile navigation", () => {
    const menu = read("lib/layout.shared.tsx");
    expect(menu).toMatch(/label:\s*"Blocks",\s*href:\s*"\/blocks"/u);
    expect(menu.match(/href:\s*"\/blocks"/gu)).toHaveLength(1);
    const header = read("components/layout/site-header.tsx");
    expect(header).toContain("PRODUCT_MENU_GROUPS.flatMap");
    expect(header).toContain("PRODUCT_MENU_GROUPS.map");
  });

  it("keeps the sitemap route and installation-guide backlink", () => {
    expect(
      readStaticRoutes().filter((route) => route === "/blocks"),
    ).toHaveLength(1);
    expect(read("content/docs/blocks/index.mdx")).toContain(
      "[Explore the Blocks catalog](/blocks)",
    );
  });
});

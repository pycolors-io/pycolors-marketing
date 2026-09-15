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

describe("Blocks discovery", () => {
  it("keeps the canonical catalog and ordered categories", () => {
    expect(BLOCKS_CATALOG).toHaveLength(14);
    expect(new Set(BLOCKS_CATALOG.map((block) => block.id)).size).toBe(14);
    expect(BLOCK_CATEGORIES.map((category) => category.slug)).toEqual([
      "app-shells",
      "auth",
      "commerce",
      "account",
      "data",
      "feedback",
    ]);

    for (const block of BLOCKS_CATALOG) {
      expect(block.href).toBe(`/docs/blocks/${block.id}`);
      expect(
        existsSync(
          resolve(marketingRoot, `content/blocks/${block.id}/index.tsx`),
        ),
      ).toBe(true);
      expect(
        existsSync(
          resolve(marketingRoot, `content/docs/blocks/${block.id}.mdx`),
        ),
      ).toBe(true);
    }
  });

  it("renders every catalogued Block through the source-backed preview registry", () => {
    for (const block of BLOCKS_CATALOG) {
      expect(preview).toContain(`case "${block.id.split("/")[1]}"`);
    }
    expect(preview).toMatch(/from ["']@\/content\/blocks\//u);
    expect(preview).toContain("canonical-examples");
    expect(preview).not.toMatch(
      /fumadocs|\.mdx|\b(?:fetch|axios|XMLHttpRequest)\b/u,
    );
  });

  it("keeps the visual catalog server-rendered and category-driven", () => {
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).not.toMatch(/\b(?:useEffect|useState|fetch|localStorage)\b/u);
    expect(page).toContain("BLOCK_CATEGORIES.map");
    expect(page).toContain("BLOCKS_CATALOG.filter");
    expect(page).toContain("BlockCatalogPreview");
    expect(page).toContain('aria-label="Block categories"');
    expect(page).toContain("Live preview");
    expect(page).toContain("View");
    expect(page).toContain("Source");
    expect(page).toContain("Install");
    expect(page).toContain("no Blocks Registry or CLI is required");
  });

  it("preserves public navigation and discovery routes", () => {
    expect(page).toMatch(/alternates:\s*\{\s*canonical:\s*"\/blocks"/u);
    expect(page).toContain('id="block-catalog"');
    expect(page).toContain('href="/docs/blocks"');
    expect(page).toContain('href="/starters"');
    expect(read("lib/layout.shared.tsx")).toMatch(
      /label:\s*"Blocks",\s*href:\s*"\/blocks"/u,
    );
    expect(read("app/sitemap.ts")).toContain('"/blocks"');
    expect(read("content/docs/blocks/index.mdx")).toContain(
      "[Explore the Blocks catalog](/blocks)",
    );
  });
});

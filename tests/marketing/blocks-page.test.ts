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
const catalogPreview = read(
  "components/marketing/blocks/block-catalog-preview.tsx",
);
const canonicalExamples = read(
  "components/docs/blocks/canonical-examples.tsx",
);
const showcaseTabs = read(
  "components/marketing/blocks/block-showcase-tabs.tsx",
);

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

  it("keeps the visual catalog server-rendered and category-driven", () => {
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).not.toMatch(/\b(?:useEffect|useState|fetch|localStorage)\b/u);
    expect(page).toContain("BLOCK_CATEGORIES.map");
    expect(page).toContain("BLOCKS_CATALOG.filter");
    expect(page).toContain("BlockCatalogPreview");
    expect(page).toContain('aria-label="Block categories"');
  });

  it("keeps Preview interactive with safe local demo state", () => {
    expect(page).toContain(
      "preview={<BlockCatalogPreview blockId={blockId} />}",
    );
    expect(page).not.toContain('aria-hidden="true" inert');
    expect(page).toContain("Interactive local demos");
    expect(page).toContain("No account,");
    expect(catalogPreview).toContain("SignInExample");
    expect(catalogPreview).toContain("SignUpExample");
    expect(catalogPreview).toContain("PasswordRecoveryExample");
    expect(catalogPreview).toContain("PricingPlansExample");
    expect(catalogPreview).toContain("DataTableExample");
    expect(catalogPreview).toContain("SettingsPanelExample");
    expect(catalogPreview).toContain("WorkspaceMembersExample");
    expect(catalogPreview).toContain("EmptyStatePanelExample");
    expect(canonicalExamples).toMatch(/^"use client";/u);
    expect(canonicalExamples).toContain("React.useState");
    expect(canonicalExamples).toContain("onClick");
    expect(canonicalExamples).toContain('aria-pressed={selected}');
  });

  it("exposes syntax-highlighted canonical source beside every preview", () => {
    expect(page).toContain("readBlockSource");
    expect(page).toContain('"content", "blocks", block.id, "index.tsx"');
    expect(page).toContain("BlockShowcaseTabs");
    expect(page).toContain("source={source}");
    expect(showcaseTabs).toContain('role="tablist"');
    expect(showcaseTabs).toContain('role="tab"');
    expect(showcaseTabs).toContain('role="tabpanel"');
    expect(showcaseTabs).toContain("Preview");
    expect(showcaseTabs).toContain("Code");
    expect(showcaseTabs).toContain("Copy code");
    expect(showcaseTabs).toContain("navigator.clipboard.writeText(source)");
    expect(showcaseTabs).toContain("DynamicCodeBlock");
    expect(showcaseTabs).toContain('lang="tsx"');
    expect(showcaseTabs).toContain('light: "github-light"');
    expect(showcaseTabs).toContain('dark: "github-dark"');
  });

  it("preserves public navigation and discovery routes", () => {
    expect(page).toMatch(/alternates:\s*\{\s*canonical:\s*"\/blocks"/u);
    expect(page).toContain('id="block-catalog"');
    expect(read("lib/layout.shared.tsx")).toMatch(
      /label:\s*"Blocks",\s*href:\s*"\/blocks"/u,
    );
    expect(read("app/sitemap.ts")).toContain('"/blocks"');
  });
});

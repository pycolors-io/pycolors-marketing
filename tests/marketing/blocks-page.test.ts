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
const canonicalExamples = read("components/docs/blocks/canonical-examples.tsx");
const showcaseTabs = read(
  "components/marketing/blocks/block-showcase-tabs.tsx",
);
const standalonePreview = read(
  "components/marketing/blocks/block-standalone-preview.tsx",
);
const standalonePage = read(
  "app/(preview)/blocks/[category]/[block]/preview/page.tsx",
);
const sourceLoader = read("lib/blocks/source.server.ts");

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
    expect(canonicalExamples).toContain("aria-pressed={selected}");
  });

  it("adds accessible Desktop, Tablet, Mobile, open, fullscreen and Reset controls", () => {
    expect(showcaseTabs).toContain('id: "desktop"');
    expect(showcaseTabs).toContain('id: "tablet"');
    expect(showcaseTabs).toContain('id: "mobile"');
    expect(showcaseTabs).toContain('width: "100%"');
    expect(showcaseTabs).toContain('width: "768px"');
    expect(showcaseTabs).toContain('width: "390px"');
    expect(showcaseTabs).toContain('aria-label="Preview viewport"');
    expect(showcaseTabs).toContain("aria-pressed={selected}");
    expect(showcaseTabs).toContain('aria-label="Open preview in new tab"');
    expect(showcaseTabs).toContain('rel="noopener noreferrer"');
    expect(showcaseTabs).toContain('target="_blank"');
    expect(showcaseTabs).toContain('aria-label="Enter fullscreen"');
    expect(showcaseTabs).toContain("requestFullscreen");
    expect(showcaseTabs).toContain('aria-label="Reset preview"');
    expect(showcaseTabs).toContain("setPreviewKey");
    expect(showcaseTabs).toContain("data-viewport={viewport}");
    expect(showcaseTabs).toContain("style={{ width: viewportWidth }}");
  });

  it("maps every catalog identity to the standalone preview route", () => {
    expect(page).toContain("previewHref={`/blocks/${block.id}/preview`}");
    expect(standalonePage).toContain("generateStaticParams");
    expect(standalonePage).toContain("BLOCKS_CATALOG.map");
    expect(standalonePage).toContain('entry.id === `${category}/${block}`');
    expect(standalonePage).toContain("<BlockCatalogPreview blockId={block} />");
    expect(standalonePage).toContain("robots: { index: false, follow: false }");
    expect(standalonePreview).toContain('aria-label="Preview actions"');
    expect(standalonePreview).toContain("requestFullscreen");
    expect(standalonePreview).toContain("document.exitFullscreen");
    expect(standalonePreview).toContain("setPreviewKey");
  });

  it("simulates real mobile breakpoint stacking inside the 390px canvas", () => {
    expect(showcaseTabs).toContain("mobileSimulationClassName");
    expect(showcaseTabs).toContain("data-preview-layout={viewport}");
    expect(showcaseTabs).toContain(
      "[&_[data-slot=pricing-plans-list]]:!grid-cols-1",
    );
    expect(showcaseTabs).toContain(
      "[&_[data-slot=billing-overview-panel]>dl]:!grid-cols-1",
    );
    expect(showcaseTabs).toContain(
      "[&_[data-slot=payment-method-panel]>dl]:!grid-cols-1",
    );
    expect(showcaseTabs).toContain(
      "[&_[data-slot=workspace-member]]:!flex-col",
    );
    expect(showcaseTabs).toContain(
      "[&_[data-slot=settings-panel-section]]:!grid-cols-1",
    );
    expect(showcaseTabs).toContain(
      "[&_[data-slot=responsive-sidebar-desktop]]:!hidden",
    );
    expect(showcaseTabs).toContain(
      "[&_[data-slot=responsive-sidebar-mobile-trigger]]:!inline-flex",
    );
    expect(showcaseTabs).toContain("const previewPaddingClassName");
    expect(showcaseTabs).toContain('viewport === "mobile"');
    expect(showcaseTabs).toContain('? "p-3"');
  });

  it("exposes syntax-highlighted canonical source without repository path chrome", () => {
    expect(page).toContain("readBlockSource");
    expect(page).toContain('from "@/lib/blocks/source.server"');
    expect(page).not.toContain('from "node:fs"');
    expect(page).not.toContain('from "node:path"');
    expect(sourceLoader).toContain('from "node:fs"');
    expect(sourceLoader).toContain('from "node:path"');
    expect(sourceLoader).toContain(
      '"content", "blocks", block.id, "index.tsx"',
    );
    expect(page).toContain("BlockShowcaseTabs");
    expect(page).toContain("source={source}");
    expect(page).not.toContain("sourcePath");
    expect(showcaseTabs).not.toContain("sourcePath");
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

  it("keeps one bounded demo surface instead of wrapping every Block in a card", () => {
    expect(page).toContain('<article className="space-y-5">');
    expect(page).not.toContain(
      '<article className="overflow-hidden rounded-xl border border-border-subtle bg-card shadow-sm">',
    );
    expect(showcaseTabs).toContain(
      "overflow-hidden rounded-xl border border-border-subtle bg-background",
    );
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

// @vitest-environment node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { starterProBuyerFaqs } from "../../lib/products/starter-pro-buyer-faq";
import sitemap from "../../app/sitemap";

vi.mock("@/lib/blog/utils", () => ({
  getAllCategories: () => [],
  getAllPosts: () => [],
  getAllTags: () => [],
  normalizeTaxonomy: (value: string) => value,
}));
vi.mock("@/lib/source", () => ({ source: { getPages: () => [] } }));

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const faqRoute = "/starters/pro/faq";

function read(relativePath: string) {
  return readFileSync(resolve(marketingRoot, relativePath), "utf8");
}

describe("Starter Pro FAQ discovery contracts", () => {
  it("lists the FAQ route once with no invented modification date", () => {
    const entries = sitemap().filter(
      (entry) => new URL(entry.url).pathname === faqRoute,
    );

    expect(entries).toHaveLength(1);
    expect(entries[0]?.lastModified).toBeUndefined();
    const pagePath = resolve(
      marketingRoot,
      "app/(site)",
      faqRoute.slice(1),
      "page.tsx",
    );
    expect(existsSync(pagePath)).toBe(true);
    expect(read("components/footer.tsx")).toContain(
      '{ label: "Starter Pro FAQ", href: "/starters/pro/faq" }',
    );
  });

  it("links canonical answers to existing routes", () => {
    const destinations = new Set(
      starterProBuyerFaqs.flatMap((faq) => faq.links.map((link) => link.href)),
    );

    for (const href of destinations) {
      const path = href.startsWith("/docs/")
        ? resolve(marketingRoot, "content/docs", href.slice(6))
        : resolve(marketingRoot, "app/(site)", href.slice(1));
      const exists = href.startsWith("/docs/")
        ? existsSync(`${path}.mdx`) || existsSync(resolve(path, "index.mdx"))
        : existsSync(resolve(path, "page.tsx"));

      expect(exists, `Missing FAQ destination: ${href}`).toBe(true);
    }
  });

  it("keeps a server page and in-memory search boundary", () => {
    const page = read("app/(site)/starters/pro/faq/page.tsx");
    const explorer = read("components/starters/starter-pro-faq-explorer.tsx");
    const search = read("lib/products/starter-pro-faq-search.ts");

    expect(page).not.toMatch(/^\s*["']use client["']/u);
    expect(explorer).toMatch(/^"use client";/u);
    expect(explorer).toContain("<MarketingFaq");
    expect(search).toContain('from "./starter-pro-buyer-faq"');
    for (const source of [page, explorer, search]) {
      expect(source).not.toMatch(
        /\b(?:localStorage|sessionStorage|fetch|XMLHttpRequest|sendBeacon|useSearchParams)\b/u,
      );
      expect(source).not.toMatch(
        /document\.cookie|history\.(?:pushState|replaceState)/u,
      );
    }
  });
});

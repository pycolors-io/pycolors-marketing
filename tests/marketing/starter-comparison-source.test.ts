// @vitest-environment node
// Keep filesystem contracts separate from the jsdom rendering suite.

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

describe("Starter comparison source contracts", () => {
  it("keeps every comparison link on an existing internal route", () => {
    const component = readFileSync(
      resolve(
        marketingRoot,
        "components/starters/starter-comparison-table.tsx",
      ),
      "utf8",
    );
    const destinations = [...component.matchAll(/href="([^"]+)"/gu)].map(
      (match) => match[1],
    );

    expect(destinations).toEqual([
      "/starters/free",
      "/docs/starter/upgrade",
      "/docs/starter-pro/production-checklist",
    ]);
    for (const href of destinations) {
      expect(href).toBeDefined();
      if (!href) {
        throw new Error("Comparison link is missing its destination");
      }

      const path = href.startsWith("/docs/")
        ? resolve(marketingRoot, "content/docs", `${href.slice(6)}.mdx`)
        : resolve(marketingRoot, "app/(site)", href.slice(1), "page.tsx");

      expect(existsSync(path), `Missing destination: ${href}`).toBe(true);
    }
  });

  it("keeps the page connected to the comparison and purchase CTA", () => {
    const page = readFileSync(
      resolve(marketingRoot, "app/(site)/starters/pro/page.tsx"),
      "utf8",
    );

    expect(page).toContain("<StarterComparisonTable />");
    expect(page).toContain('id="free-vs-pro"');
    expect(page).not.toContain("const comparisonRows =");
    expect(page).toContain("BuyStarterProButton");
    expect(page).toContain("Try the Starter Free demo");
    expect(page).toContain("starterProBuyerFaqs.map");
  });
});

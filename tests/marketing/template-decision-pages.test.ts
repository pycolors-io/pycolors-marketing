// @vitest-environment node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const siteRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../app/(site)",
);

function readPage(path: string) {
  return readFileSync(resolve(siteRoot, path), "utf8");
}

describe("template and product-decision page composition contracts", () => {
  it("uses canonical Marketing composition without local duplicate helpers", () => {
    const pages = [
      readPage("templates/page.tsx"),
      readPage("templates/na-ai-landing/page.tsx"),
      readPage("upgrade/page.tsx"),
      readPage("compare/build-vs-buy/page.tsx"),
    ];

    for (const page of pages) {
      expect(page).toContain("MarketingSectionHeader");
      expect(page).toContain("MarketingFeatureCard");
      expect(page).not.toMatch(
        /function (SectionHeading|SectionHeader|Pill|CheckItem|FeatureCard|ValueCard)\b/u,
      );
    }

    expect(pages[0]).toContain("MarketingPillList");
    expect(pages[1]).toContain("MarketingPillList");
    expect(pages[2]).toContain("MarketingCheckItem");
    expect(pages[3]).toContain("MarketingSectionShell");
  });

  it("keeps product routes, data sources, and purchase controls page-owned", () => {
    expect(readPage("templates/page.tsx")).toMatch(
      /canonical:\s*['"]\/templates['"]/u,
    );
    expect(readPage("templates/na-ai-landing/page.tsx")).toMatch(
      /canonical:\s*['"]\/templates\/na-ai-landing['"]/u,
    );
    expect(readPage("upgrade/page.tsx")).toMatch(
      /canonical:\s*['"]\/upgrade['"]/u,
    );
    expect(readPage("compare/build-vs-buy/page.tsx")).toMatch(
      /canonical:\s*['"]\/compare\/build-vs-buy['"]/u,
    );

    expect(readPage("templates/page.tsx")).toContain("BuyProductButton");
    expect(readPage("templates/na-ai-landing/page.tsx")).toContain(
      "generateProductOfferJsonLd",
    );
    expect(readPage("upgrade/page.tsx")).toContain("BuyStarterProButton");
    expect(readPage("compare/build-vs-buy/page.tsx")).toContain(
      'PRODUCT_DISPLAY["starter-pro"].priceLabel',
    );
  });
});

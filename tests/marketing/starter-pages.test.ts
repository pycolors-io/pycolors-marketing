// @vitest-environment node
// These contracts inspect source files and do not require a browser DOM.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const startersRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../app/(site)/starters",
);

function readPage(path: string) {
  return readFileSync(resolve(startersRoot, path), "utf8");
}

describe("Starter page composition contracts", () => {
  it("uses the canonical Marketing composition layer", () => {
    const pages = [
      readPage("page.tsx"),
      readPage("free/page.tsx"),
      readPage("pro/page.tsx"),
    ];

    for (const page of pages) {
      expect(page).toContain("MarketingSectionHeader");
      expect(page).toContain("MarketingCheckItem");
      expect(page).toContain("MarketingPillList");
    }
  });

  it("keeps the public Starter routes and purchase data source intact", () => {
    expect(readPage("page.tsx")).toMatch(/canonical:\s*['"]\/starters['"]/u);
    expect(readPage("free/page.tsx")).toMatch(
      /canonical:\s*['"]\/starters\/free['"]/u,
    );
    expect(readPage("pro/page.tsx")).toMatch(
      /canonical:\s*['"]\/starters\/pro['"]/u,
    );

    const proPage = readPage("pro/page.tsx");
    expect(proPage).toMatch(
      /PRODUCT_DISPLAY\[["']starter-pro["']\]\.priceLabel/u,
    );
    expect(proPage).toContain("BuyStarterProButton");
    expect(proPage).toContain("INTERNAL.ordersRecover");
  });
});

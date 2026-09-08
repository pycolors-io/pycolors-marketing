// @vitest-environment node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const uiRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../app/(site)/ui",
);

function readPage(path: string) {
  return readFileSync(resolve(uiRoot, path), "utf8");
}

describe("UI discovery page composition contracts", () => {
  it("uses the canonical Marketing composition layer", () => {
    const pages = [
      readPage("page.tsx"),
      readPage("patterns/page.tsx"),
      readPage("examples/page.tsx"),
    ];

    for (const page of pages) {
      expect(page).toContain("MarketingSectionHeader");
      expect(page).toContain("MarketingCheckItem");
      expect(page).toContain("MarketingPillList");
      expect(page).not.toMatch(/function (SectionHeader|CheckItem|Pill)\b/u);
    }
  });

  it("keeps page-owned developer surfaces and public routes intact", () => {
    expect(readPage("page.tsx")).toMatch(/canonical:\s*['"]\/ui['"]/u);
    expect(readPage("patterns/page.tsx")).toMatch(
      /canonical:\s*['"]\/ui\/patterns['"]/u,
    );
    expect(readPage("examples/page.tsx")).toMatch(
      /canonical:\s*['"]\/ui\/examples['"]/u,
    );

    expect(readPage("page.tsx")).toContain("@pycolors/ui");
    expect(readPage("patterns/page.tsx")).toContain("PatternCard");
    expect(readPage("examples/page.tsx")).toContain("AvailableNowCard");
  });
});

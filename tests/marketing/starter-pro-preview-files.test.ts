// @vitest-environment node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const marketing = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const page = readFileSync(
  resolve(marketing, "app/(site)/starters/pro/page.tsx"),
  "utf8",
);

describe("Starter Pro preview assets", () => {
  it("uses five existing original PNGs with known intrinsic dimensions", () => {
    const captures = [
      ...page.matchAll(/image: "(\/images\/starters\/pro\/[^"\n]+)"/gu),
    ];
    expect(captures.map(([, path]) => path)).toEqual([
      "/images/starters/pro/dashboard-pycolors.png",
      "/images/starters/pro/auth-pycolors.png",
      "/images/starters/pro/billing-pycolors.png",
      "/images/starters/pro/pricing-pycolors.png",
      "/images/starters/pro/pwa-pycolors.png",
    ]);
    const heights = [3790, 1928, 2752, 5426, 1926];
    captures.forEach(([, path], index) => {
      const bytes = readFileSync(resolve(marketing, `public${path}`));
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(bytes.readUInt32BE(16)).toBe(3456);
      expect(bytes.readUInt32BE(20)).toBe(heights[index]);
    });
  });

  it("keeps the product page server-rendered with its purchase component", () => {
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).toContain('from "next/image"');
    expect(page).toContain(
      'from "@/components/pricing/buy-starter-pro-button"',
    );
  });
});

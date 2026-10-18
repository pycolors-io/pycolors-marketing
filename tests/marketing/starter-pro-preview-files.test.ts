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
  it("uses five existing PNGs, including the refreshed dashboard capture", () => {
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
    const legacyHeights = [1928, 2752, 5426, 1926];
    captures.forEach(([, path], index) => {
      const bytes = readFileSync(resolve(marketing, `public${path}`));
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      if (index > 0) {
        expect(bytes.readUInt32BE(16)).toBe(3456);
        expect(bytes.readUInt32BE(20)).toBe(legacyHeights[index - 1]);
      }
    });

    const light = readFileSync(
      resolve(marketing, "public/images/starters/pro/dashboard-pycolors.png"),
    );
    const dark = readFileSync(
      resolve(
        marketing,
        "public/images/starters/pro/dashboard-dark-pycolors.png",
      ),
    );
    expect(light.readUInt32BE(16)).toBeGreaterThanOrEqual(1200);
    expect(light.readUInt32BE(20)).toBeGreaterThanOrEqual(600);
    expect(dark.subarray(0, 8)).toEqual(light.subarray(0, 8));
    expect(dark.readUInt32BE(16)).toBe(light.readUInt32BE(16));
    expect(dark.readUInt32BE(20)).toBe(light.readUInt32BE(20));
    expect(dark).not.toEqual(light);
  });

  it("keeps the product page server-rendered with its purchase component", () => {
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).toContain('from "next/image"');
    expect(page).toContain(
      'from "@/components/pricing/buy-starter-pro-button"',
    );
  });
});

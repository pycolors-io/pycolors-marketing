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
  it("uses existing PNGs with their actual intrinsic dimensions", () => {
    const captures = [
      ...page.matchAll(
        /src: "(\/images\/starters\/pro\/[^"\n]+)",\s+width: (\d+),\s+height: (\d+)/gu,
      ),
    ];
    expect(captures.map(([, path]) => path)).toEqual([
      "/images/starters/pro/auth-pycolors.png",
      "/images/starters/pro/pwa-pycolors.png",
    ]);
    for (const [, path, width, height] of captures) {
      const bytes = readFileSync(resolve(marketing, `public${path}`));
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(bytes.readUInt32BE(16)).toBe(Number(width));
      expect(bytes.readUInt32BE(20)).toBe(Number(height));
    }
  });

  it("keeps the product page server-rendered with its purchase component", () => {
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).toContain('from "next/image"');
    expect(page).toContain(
      'from "@/components/pricing/buy-starter-pro-button"',
    );
  });
});

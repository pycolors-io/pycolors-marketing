// @vitest-environment node

import { readFileSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { PRODUCT_PREVIEW_MEDIA } from "@/lib/products/product-preview-media";

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../public");

describe("commercial product capture contracts", () => {
  it.each(Object.entries(PRODUCT_PREVIEW_MEDIA))(
    "%s uses optimized real captures for both appearances",
    (_product, media) => {
      expect(media.light).not.toBe(media.dark);
      expect(media.caption).toMatch(/Mock|Demo|Illustrative/u);

      for (const source of [media.light, media.dark]) {
        expect(source).toMatch(/^\/(images|templates)\//u);
        const path = resolve(publicDir, `.${source}`);
        expect(path.startsWith(`${publicDir}${sep}`)).toBe(true);
        const bytes = readFileSync(path);
        expect(bytes.length).toBeGreaterThan(1000);
        expect(bytes.length).toBeLessThan(350_000);

        if (extname(path) === ".png") {
          expect(bytes.subarray(0, 8).toString("hex")).toBe(
            "89504e470d0a1a0a",
          );
          expect(bytes.readUInt32BE(16)).toBeGreaterThan(800);
          expect(bytes.readUInt32BE(20)).toBeGreaterThan(400);
        } else {
          expect(extname(path)).toBe(".webp");
          expect(bytes.subarray(0, 4).toString("ascii")).toBe("RIFF");
          expect(bytes.subarray(8, 12).toString("ascii")).toBe("WEBP");
        }
      }
    },
  );
});

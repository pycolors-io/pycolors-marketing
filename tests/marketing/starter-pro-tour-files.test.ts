// @vitest-environment node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { STARTER_PRO_TOUR } from "@/lib/products/starter-pro-tour";

describe("bundled Starter Pro tour media", () => {
  it("ships a bounded H.264/AAC MP4 with progressive playback metadata", () => {
    const bytes = readFileSync(resolve(`public${STARTER_PRO_TOUR.source}`));
    expect(bytes.length).toBeLessThan(20_000_000);
    const atoms: string[] = [];
    for (let offset = 0; offset + 8 <= bytes.length;) {
      const size = bytes.readUInt32BE(offset);
      atoms.push(bytes.toString("ascii", offset + 4, offset + 8));
      expect(size).toBeGreaterThanOrEqual(8);
      offset += size;
    }
    expect(atoms[0]).toBe("ftyp");
    expect(atoms).toContain("moov");
    expect(atoms).toContain("mdat");
    expect(atoms.indexOf("moov")).toBeLessThan(atoms.indexOf("mdat"));
    expect(bytes.includes(Buffer.from("avc1"))).toBe(true);
    expect(bytes.includes(Buffer.from("mp4a"))).toBe(true);
  });

  it("includes an optimized poster and captions for the transcript chapters", () => {
    const poster = readFileSync(resolve(`public${STARTER_PRO_TOUR.poster}`));
    expect(poster.length).toBeLessThan(200_000);
    expect(poster.toString("ascii", 0, 4)).toBe("RIFF");
    expect(poster.toString("ascii", 8, 12)).toBe("WEBP");
    const captions = readFileSync(
      resolve(`public${STARTER_PRO_TOUR.captions}`),
      "utf8",
    );
    expect(captions).toMatch(/^WEBVTT/u);
    expect(captions).toContain("[Instrumental music]");
    expect(captions.match(/ --> /gu)).toHaveLength(
      STARTER_PRO_TOUR.transcript.length,
    );
    expect(captions).toContain("00:02:51.500");
  });
});

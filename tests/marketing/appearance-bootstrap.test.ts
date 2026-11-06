// @vitest-environment node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { SITE_PALETTE_STORAGE_KEY } from "@/lib/site-palette";

const script = readFileSync(
  resolve(import.meta.dirname, "../../public/site-appearance.js"),
  "utf8",
);
function bootstrap(
  saved: string | null,
  systemDark: boolean,
  storageBlocked = false,
) {
  const classes = new Set(["light", "font-geist"]);
  const root = {
    dataset: { sitePalette: "pycolors" },
    style: { colorScheme: "" },
    classList: {
      remove: (...values: string[]) =>
        values.forEach((value) => classes.delete(value)),
      add: (value: string) => classes.add(value),
    },
  };
  runInNewContext(script, {
    document: { documentElement: root },
    matchMedia: () => ({ matches: systemDark }),
    localStorage: {
      getItem: (key: string) => {
        if (storageBlocked) throw new Error("Storage blocked");
        return key === SITE_PALETTE_STORAGE_KEY ? "monochrome" : saved;
      },
    },
  });
  return { root, classes };
}

describe("appearance before hydration", () => {
  it.each([
    ["light", true, "light"],
    ["dark", false, "dark"],
    ["system", true, "dark"],
    [null, false, "light"],
  ] as const)(
    "resolves %s with system dark=%s",
    (saved, systemDark, expected) => {
      const { root, classes } = bootstrap(saved, systemDark);
      expect(root.style.colorScheme).toBe(expected);
      expect(classes.has(expected)).toBe(true);
      expect(classes.has(expected === "dark" ? "light" : "dark")).toBe(false);
      expect(classes.has("font-geist")).toBe(true);
      expect(root.dataset.sitePalette).toBe("monochrome");
    },
  );
  it("uses the system preference when browser storage is blocked", () => {
    const { root } = bootstrap(null, true, true);
    expect(root.style.colorScheme).toBe("dark");
    expect(root.dataset.sitePalette).toBe("pycolors");
  });
});

// @vitest-environment node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  getUiExplorerUrl,
  uiExplorerStories,
} from "../../lib/docs/ui-explorer";

const marketing = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const repository = resolve(marketing, "../..");
const stories = resolve(repository, "packages/ui/stories/components");

describe("canonical UI Explorer story coverage", () => {
  it("covers every versioned component family with its real default story and docs page", () => {
    const families = readdirSync(stories)
      .filter((name) => name.endsWith(".stories.tsx"))
      .map((name) => name.replace(".stories.tsx", ""));
    expect(Object.keys(uiExplorerStories).sort()).toEqual(families.sort());
    for (const family of families) {
      const source = readFileSync(
        resolve(stories, `${family}.stories.tsx`),
        "utf8",
      );
      expect(source).toContain(`id: "components-${family}"`);
      expect(source).toMatch(/export const Default\b/u);
      expect(
        existsSync(resolve(marketing, `content/docs/ui/${family}.mdx`)),
      ).toBe(true);
      expect(getUiExplorerUrl(["ui", family])).toBe(
        `https://ui.pycolors.io/?path=/story/${uiExplorerStories[family]}`,
      );
    }
  });
});

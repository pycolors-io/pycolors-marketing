import * as React from "react";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { UiExplorerLink } from "../../components/docs/ui-explorer-link";
import {
  getUiExplorerUrl,
  uiExplorerStories,
} from "../../lib/docs/ui-explorer";

const marketing = process.cwd();
const repository = resolve(marketing, "../..");
const stories = resolve(repository, "packages/ui/stories/components");
afterEach(cleanup);

describe("canonical UI Explorer links", () => {
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

  it.each([
    undefined,
    [],
    ["ui"],
    ["ui", "installation"],
    ["ui", "storybook"],
    ["ui", "button", "extra"],
    ["patterns", "button"],
    ["ui", "toString"],
    ["ui", "__proto__"],
  ])("does not fabricate stories for unrelated routes: %j", (slug) => {
    expect(getUiExplorerUrl(slug)).toBeUndefined();
    const { container } = render(<UiExplorerLink slug={slug} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one accessible native same-tab link without embedding the Explorer", async () => {
    const { container } = render(<UiExplorerLink slug={["ui", "button"]} />);
    const link = screen.getByRole("link", {
      name: "Open interactive example in PyColors UI Explorer",
    });
    expect(link).toHaveAttribute("href", getUiExplorerUrl(["ui", "button"]));
    expect(link).not.toHaveAttribute("target");
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});

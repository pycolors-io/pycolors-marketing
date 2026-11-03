// @vitest-environment node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const docs = resolve("content/docs/starter-pro");
const recipes = ["client-tracking", "support-requests", "internal-validation"];
const read = (name: string) => readFileSync(resolve(docs, name), "utf8");
const links = (text: string) =>
  [
    ...text.matchAll(
      /\]\((\/docs\/[^)#]+)(?:#[^)]*)?\)|href:\s*"(\/docs\/[^"#]+)(?:#[^"]*)?"/g,
    ),
  ].map(([, markdown, component]) => markdown ?? component);

describe("Starter Pro business recipe discovery", () => {
  it("exposes the shared foundation and three recipes in documentation navigation", () => {
    expect(JSON.parse(read("meta.json")).pages).toContain("recipes");
    expect(JSON.parse(read("recipes/meta.json")).pages).toEqual([
      "index",
      ...recipes,
    ]);
    for (const name of [
      "getting-started",
      "local-development",
      "what-is-included",
      "customization-and-upgrades",
    ])
      expect(links(read(`${name}.mdx`))).toContain("/docs/starter-pro/recipes");
    const hub = read("recipes/index.mdx");
    for (const name of recipes) {
      expect(hub).toContain(`/docs/starter-pro/recipes/${name}`);
      expect(read(`recipes/${name}.mdx`)).toContain(`docs/recipes/${name}.md`);
    }
  });

  it("keeps each recipe connected to the shared foundation and its sibling workflows", () => {
    for (const name of recipes) {
      const destinations = links(read(`recipes/${name}.mdx`));
      expect(destinations).toContain("/docs/starter-pro/recipes");
      expect(destinations).toContain(
        "/docs/starter-pro/customization-and-upgrades",
      );
      for (const sibling of recipes.filter((recipe) => recipe !== name))
        expect(destinations).toContain(`/docs/starter-pro/recipes/${sibling}`);
    }
  });

  it("resolves every recipe's internal documentation destination", () => {
    for (const name of ["index", ...recipes]) {
      const text = read(`recipes/${name}.mdx`);
      const destinations = links(text);
      expect(destinations.length).toBeGreaterThan(0);
      for (const href of destinations) {
        const stem = resolve("content", href.slice(1));
        expect(
          existsSync(`${stem}.mdx`) || existsSync(resolve(stem, "index.mdx")),
          `${name}: ${href}`,
        ).toBe(true);
      }
    }
  });
});

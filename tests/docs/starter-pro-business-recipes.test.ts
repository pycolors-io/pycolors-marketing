// @vitest-environment node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const docs = resolve("content/docs/starter-pro");
const recipes = ["client-tracking", "support-requests", "internal-validation"];
const read = (name: string) => readFileSync(resolve(docs, name), "utf8");

describe("Starter Pro business recipe discovery", () => {
  it("exposes the shared foundation and three recipes in documentation navigation", () => {
    expect(JSON.parse(read("meta.json")).pages).toContain("recipes");
    expect(JSON.parse(read("recipes/meta.json")).pages).toEqual([
      "index",
      ...recipes,
    ]);
    expect(read("what-is-included.mdx")).toContain("/docs/starter-pro/recipes");
    expect(read("customization-and-upgrades.mdx")).toContain(
      "/docs/starter-pro/recipes",
    );
    const hub = read("recipes/index.mdx");
    for (const name of recipes) {
      expect(hub).toContain(`/docs/starter-pro/recipes/${name}`);
      expect(read(`recipes/${name}.mdx`)).toContain(`docs/recipes/${name}.md`);
    }
  });

  it("resolves every recipe's internal documentation destination", () => {
    for (const name of ["index", ...recipes]) {
      const text = read(`recipes/${name}.mdx`);
      const links = [
        ...text.matchAll(
          /\]\((\/docs\/[^)#]+)(?:#[^)]*)?\)|href:\s*"(\/docs\/[^"#]+)(?:#[^"]*)?"/g,
        ),
      ];
      expect(links.length).toBeGreaterThan(0);
      for (const [, markdown, component] of links) {
        const href = markdown ?? component;
        const stem = resolve("content", href.slice(1));
        expect(
          existsSync(`${stem}.mdx`) || existsSync(resolve(stem, "index.mdx")),
          `${name}: ${href}`,
        ).toBe(true);
      }
    }
  });
});

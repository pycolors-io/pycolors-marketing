// @vitest-environment node

import { readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { inspectModule } from "../../../../scripts/ui-explorer/contract.mjs";
import {
  showcaseProjects,
  projectsForFilter,
} from "../../components/marketing/showcase/showcase-fixtures";

const marketing = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const root = resolve(marketing, "components/marketing");
const entry = "showcase/saas-showcase.tsx";
const sources = new Set([
  entry,
  "showcase/showcase-workspace.tsx",
  "showcase/showcase-fixtures.ts",
  "section-header.tsx",
  "section-shell.tsx",
]);
const external = new Set(["react", "@pycolors/ui", "lucide-react"]);

/** Reuse #419's AST analysis; resolve every local edge against reviewed inputs. */
function inspectGraph(overrides: Readonly<Record<string, string>> = {}) {
  const seen = new Set<string>();
  function visit(file: string) {
    if (seen.has(file)) return;
    if (!sources.has(file)) throw new Error(`Unapproved source: ${file}`);
    const absolute = resolve(root, file);
    if (realpathSync(absolute) !== absolute)
      throw new Error("Symlink outside reviewed source");
    seen.add(file);
    const source = overrides[file] ?? readFileSync(absolute, "utf8");
    for (const specifier of inspectModule(source, file)) {
      if (external.has(specifier)) continue;
      if (!specifier.startsWith("."))
        throw new Error(`Unapproved package: ${specifier}`);
      const target = relative(root, resolve(dirname(absolute), specifier));
      const resolved = [target, `${target}.ts`, `${target}.tsx`].find(
        (candidate) => sources.has(candidate),
      );
      if (!resolved) throw new Error(`Unapproved source: ${specifier}`);
      visit(resolved);
    }
  }
  visit(entry);
  return seen;
}

describe("showcase public source contract", () => {
  it("traverses only reviewed Marketing files and public package entry points", () => {
    expect(inspectGraph()).toEqual(sources);
    expect(readdirSync(resolve(root, "showcase")).sort()).toEqual([
      "saas-showcase.tsx",
      "showcase-fixtures.ts",
      "showcase-workspace.tsx",
    ]);
    const frame = readFileSync(resolve(root, entry), "utf8");
    expect(frame).not.toContain('"use client"');
    expect(frame).toContain("MarketingSectionHeader");
    expect(frame).toContain("MarketingSectionShell");
  });

  it.each([
    'export { secret } from "../../../../starter-pro/private";',
    'import "@pycolors/core-db";',
    'import "@pycolors/ui/src/private";',
    'import "@/content/blocks/private";',
    'if (false) import("private-registry");',
    'const path = "private"; import(path);',
    "process.env.SECRET;",
  ])("rejects unsafe transitive fixture code: %s", (source) => {
    expect(() =>
      inspectGraph({ "showcase/showcase-fixtures.ts": source }),
    ).toThrow();
  });

  it("keeps precisely the approved projects, statuses and interface checks", () => {
    expect(
      showcaseProjects.map(({ id, name, status, areas }) => [
        id,
        name,
        status,
        areas.map(({ name, reviewed }) => [name, reviewed]),
      ]),
    ).toEqual([
      [
        "customer-portal",
        "Customer portal",
        "Active",
        [
          ["Navigation", true],
          ["Empty states", false],
          ["Settings layout", false],
        ],
      ],
      [
        "team-workspace",
        "Team workspace",
        "Active",
        [
          ["Navigation", true],
          ["Empty states", true],
          ["Settings layout", false],
        ],
      ],
      [
        "help-center",
        "Help center",
        "Review",
        [
          ["Navigation", false],
          ["Empty states", false],
          ["Settings layout", true],
        ],
      ],
    ]);
    const before = JSON.stringify(showcaseProjects);
    expect(projectsForFilter("all")).toHaveLength(3);
    expect(projectsForFilter("active").map(({ id }) => id)).toEqual([
      "customer-portal",
      "team-workspace",
    ]);
    expect(projectsForFilter("archived")).toEqual([]);
    expect(JSON.stringify(showcaseProjects)).toBe(before);
  });
});

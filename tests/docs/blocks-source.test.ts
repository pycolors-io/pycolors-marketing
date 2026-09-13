// @vitest-environment node

import { readFileSync, readdirSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { BLOCKS_CATALOG } from "../../lib/blocks/catalog";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const guide = readFileSync(
  resolve(marketingRoot, "content/docs/blocks/index.mdx"),
  "utf8",
);

function readIncludes(document: string) {
  const content = document
    .replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gmu, "")
    .replace(/<!--[\s\S]*?-->/gu, "");
  return Array.from(
    content.matchAll(/<include\b([^>]*)>([\s\S]*?)<\/include>/gu),
    ([tag, attributes, path]) => ({ tag, attributes, path: path.trim() }),
  );
}

function listSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isSymbolicLink()) {
        throw new Error("Block source must not escape through symbolic links.");
      }
      if (entry.isDirectory()) return listSourceFiles(path);
      return /\.(?:[cm]?[jt]sx?|css|json)$/u.test(entry.name) ? [path] : [];
    })
    .sort();
}

describe.each(BLOCKS_CATALOG)("$title source-copy guide", ({ id, href }) => {
  const docPath = resolve(marketingRoot, `content/docs/blocks/${id}.mdx`);
  const sourceRoot = resolve(marketingRoot, "content/blocks", id);
  const document = readFileSync(docPath, "utf8");
  const includes = readIncludes(document);
  const sourceFiles = listSourceFiles(sourceRoot);
  const slug = id.split("/")[1];

  it("includes every canonical source file exactly once", () => {
    expect(sourceFiles.length).toBeGreaterThan(0);
    const includedFiles = includes.map(({ path }) => {
      expect(path).not.toMatch(/[#?:\\]/u);
      expect(path.startsWith(`../../../blocks/${id}/`)).toBe(true);
      return resolve(dirname(docPath), path);
    });
    expect(includedFiles.sort()).toEqual(sourceFiles);
    expect(new Set(includedFiles).size).toBe(includedFiles.length);
  });

  it("labels full source with its application-owned destination", () => {
    const start = document.indexOf("## Copy source");
    const end = document.indexOf("## Install by copying source");
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const section = document.slice(start, end);
    expect(section).toMatch(/<details>\s*<summary>[^<]+<\/summary>/u);
    expect(section).toContain("</details>");

    for (const { tag, attributes, path } of includes) {
      expect(section).toContain(tag);
      const filename = relative(sourceRoot, resolve(dirname(docPath), path));
      expect(attributes).toContain(
        `title="src/components/blocks/${slug}/${filename}"`,
      );
      expect(attributes).toMatch(/\blang=["']tsx["']/u);
      expect(attributes).not.toMatch(/\b(?:cwd|region|lines)\b/u);
    }
    expect(section).toContain("select the code manually");
    expect(section).toContain("/docs/ui/installation");
  });

  it("keeps usage separate and does not duplicate the implementation", () => {
    expect(document).toMatch(/```tsx title=["'][^"']+["']/u);
    expect(document).toContain('"use client"');
    expect(document).toContain(`blocks/${slug}"`);
    for (const filename of sourceFiles) {
      const source = readFileSync(filename, "utf8");
      for (const [, name] of source.matchAll(/export function (\w+)/gu)) {
        expect(document).not.toMatch(
          new RegExp(`export function ${name}\\b`, "u"),
        );
      }
    }
  });

  it("is directly discoverable and preserves consumer ownership", () => {
    expect(guide).toContain(`${href}#copy-source`);
    const normalized = document.replace(/\s+/gu, " ");
    expect(normalized).toContain("does not receive automatic updates");
    expect(normalized).toContain("validate it in your application");
    expect(document).toContain("[Blocks catalog](/blocks)");
  });
});

it("ignores commented and illustrative includes", () => {
  const example = [
    "<!-- <include>hidden.tsx</include> -->",
    "```mdx",
    "<include>example.tsx</include>",
    "```",
    '<include lang="tsx">\n  real.tsx\n</include>',
  ].join("\n");
  expect(readIncludes(example).map(({ path }) => path)).toEqual(["real.tsx"]);
});

it("keeps the existing code-block renderer and next-step destinations", () => {
  const renderer = readFileSync(
    resolve(marketingRoot, "mdx-components.tsx"),
    "utf8",
  );
  expect(renderer).toContain("fumadocs-ui/components/codeblock");
  expect(renderer).toContain("<CodeBlock");
  expect(renderer).toContain("<Pre>");
  expect(guide).toContain("[Compare Starters](/starters)");
  expect(guide).toContain("[Explore the Blocks catalog](/blocks)");
  expect(guide).toContain("no `@pycolors/blocks` package");
});

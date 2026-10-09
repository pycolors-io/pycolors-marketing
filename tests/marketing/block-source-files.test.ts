// @vitest-environment node

import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BLOCKS_CATALOG } from "../../lib/blocks/catalog";
import { readBlockSource } from "../../lib/blocks/source.server";

let temporaryRoot: string | undefined;
afterEach(() => {
  vi.restoreAllMocks();
  if (temporaryRoot) rmSync(temporaryRoot, { recursive: true, force: true });
  temporaryRoot = undefined;
});

function fixture() {
  temporaryRoot = mkdtempSync(join(tmpdir(), "pycolors-block-source-"));
  const directory = join(temporaryRoot, "content/blocks", BLOCKS_CATALOG[0].id);
  mkdirSync(join(directory, "parts"), { recursive: true });
  vi.spyOn(process, "cwd").mockReturnValue(temporaryRoot);
  return directory;
}

describe("Block source files", () => {
  it("serves the exact canonical source for every existing block", () => {
    for (const block of BLOCKS_CATALOG) {
      const source = readBlockSource(block);
      expect(source.directory).toBe(
        `src/components/blocks/${block.id.split("/")[1]}`,
      );
      expect(source.files[0].path).toBe("index.tsx");
      for (const file of source.files) {
        expect(file.content).toBe(
          readFileSync(resolve("content/blocks", block.id, file.path), "utf8"),
        );
        expect(file.path).not.toMatch(/^(?:\/|\.\.)/u);
      }
    }
  });

  it("includes nested source, maps languages, and keeps the entry point first", () => {
    const directory = fixture();
    writeFileSync(join(directory, "index.tsx"), "export {};\n");
    writeFileSync(
      join(directory, "parts/item.tsx"),
      "export const item = 1;\n",
    );
    writeFileSync(join(directory, "a.css"), "body {}\n");
    writeFileSync(join(directory, "README.md"), "Documentation only");
    const { files } = readBlockSource(BLOCKS_CATALOG[0]);
    expect(files).toEqual([
      { path: "index.tsx", language: "tsx", content: "export {};\n" },
      { path: "a.css", language: "css", content: "body {}\n" },
      {
        path: "parts/item.tsx",
        language: "tsx",
        content: "export const item = 1;\n",
      },
    ]);
  });

  it("rejects symbolic links and empty blocks instead of showing incomplete source", () => {
    const directory = fixture();
    expect(() => readBlockSource(BLOCKS_CATALOG[0])).toThrow(
      "No copyable source",
    );
    writeFileSync(join(directory, "index.tsx"), "export {};\n");
    symlinkSync(join(directory, "index.tsx"), join(directory, "linked.tsx"));
    expect(() => readBlockSource(BLOCKS_CATALOG[0])).toThrow("symbolic links");
  });
});

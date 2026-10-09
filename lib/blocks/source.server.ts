import { readFileSync, readdirSync } from "node:fs";
import { extname, resolve } from "node:path";

import type { BlockCatalogEntry } from "@/lib/blocks/catalog";
import type { BlockSource, BlockSourceFile } from "@/lib/blocks/source";

const languages: Readonly<Record<string, BlockSourceFile["language"]>> = {
  ".tsx": "tsx",
  ".ts": "ts",
  ".mts": "ts",
  ".cts": "ts",
  ".jsx": "jsx",
  ".js": "js",
  ".mjs": "js",
  ".cjs": "js",
  ".css": "css",
  ".json": "json",
};

function readFiles(directory: string, prefix = ""): BlockSourceFile[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isSymbolicLink()) {
      throw new Error("Block source must not contain symbolic links.");
    }

    const path = `${prefix}${entry.name}`;
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) return readFiles(absolutePath, `${path}/`);

    const language = languages[extname(entry.name)];
    if (!entry.isFile() || !language) return [];

    return [{ path, language, content: readFileSync(absolutePath, "utf8") }];
  });
}

export function readBlockSource(block: BlockCatalogEntry): BlockSource {
  const files = readFiles(
    resolve(process.cwd(), "content", "blocks", block.id),
  ).sort((a, b) => {
    if (a.path === "index.tsx") return -1;
    if (b.path === "index.tsx") return 1;
    return a.path.localeCompare(b.path, "en");
  });
  const [first, ...rest] = files;
  if (!first) throw new Error(`No copyable source found for ${block.id}.`);

  return {
    directory: `src/components/blocks/${block.id.split("/")[1]}`,
    files: [first, ...rest],
  };
}

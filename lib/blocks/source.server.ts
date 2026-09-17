import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import type { BlockCatalogEntry } from "@/lib/blocks/catalog";

export function readBlockSource(block: BlockCatalogEntry) {
  return readFileSync(
    resolve(process.cwd(), "content", "blocks", block.id, "index.tsx"),
    "utf8",
  );
}

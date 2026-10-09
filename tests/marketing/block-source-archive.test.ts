// @vitest-environment node

import { strFromU8, unzipSync } from "fflate";
import { describe, expect, it } from "vitest";

import { BLOCKS_CATALOG } from "../../lib/blocks/catalog";
import { createBlockArchive } from "../../lib/blocks/download";
import { readBlockSource } from "../../lib/blocks/source.server";
import type { BlockSource } from "../../lib/blocks/source";

const source: BlockSource = {
  directory: "src/components/blocks/example",
  files: [
    {
      path: "index.tsx",
      content: 'export { Item } from "./parts/item";\n',
      language: "tsx",
    },
    {
      path: "parts/item.tsx",
      content: "export const Item = () => <p>Déjà prêt 🎨</p>;\n",
      language: "tsx",
    },
    { path: "styles.css", content: "", language: "css" },
  ],
};

describe("Block ZIP archives", () => {
  it.each(BLOCKS_CATALOG)(
    "preserves every displayed file for $title",
    (block) => {
      const blockSource = readBlockSource(block);
      const archive = createBlockArchive(blockSource);
      const files = unzipSync(archive.bytes);
      expect(archive.fileName).toBe(`pycolors-${block.id.split("/")[1]}.zip`);
      expect(Object.keys(files)).toEqual(
        blockSource.files.map(
          (file) => `${blockSource.directory}/${file.path}`,
        ),
      );
      for (const file of blockSource.files) {
        expect(strFromU8(files[`${blockSource.directory}/${file.path}`])).toBe(
          file.content,
        );
      }
    },
  );

  it("keeps nested paths, Unicode, empty files and reproducible bytes", () => {
    const first = createBlockArchive(source);
    const second = createBlockArchive(source);
    expect(first.bytes).toEqual(second.bytes);
    const files = unzipSync(first.bytes);
    for (const file of source.files) {
      expect(strFromU8(files[`${source.directory}/${file.path}`])).toBe(
        file.content,
      );
    }
  });

  it.each([
    "../index.tsx",
    "/index.tsx",
    "parts/../index.tsx",
    "parts\\index.tsx",
    "C:/index.tsx",
    "parts//index.tsx",
    "index.tsx\u0000",
  ])("rejects invalid archive path %s", (path) => {
    expect(() =>
      createBlockArchive({
        ...source,
        files: [{ ...source.files[0], path }],
      }),
    ).toThrow("unique and relative");
  });

  it("rejects duplicate paths and unexpected source roots", () => {
    expect(() =>
      createBlockArchive({
        ...source,
        files: [source.files[0], source.files[0]],
      }),
    ).toThrow("unique and relative");
    expect(() =>
      createBlockArchive({
        ...source,
        directory: "../private",
      }),
    ).toThrow("source directory");
  });
});

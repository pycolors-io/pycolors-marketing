import { strToU8, zipSync } from "fflate";

import type { BlockSource } from "./source";

/** Package exactly the public source shown in the explorer, including nested files. */
export function createBlockArchive(source: BlockSource) {
  const match = /^src\/components\/blocks\/([a-z0-9]+(?:-[a-z0-9]+)*)$/u.exec(
    source.directory,
  );
  if (!match || source.files.length === 0) {
    throw new Error("A block archive requires a source directory and files.");
  }

  const paths = new Set<string>();
  const entries = source.files.map((file) => {
    if (
      /[\\:\p{Cc}]/u.test(file.path) ||
      file.path
        .split("/")
        .some((part) => !part || part === "." || part === "..") ||
      paths.has(file.path)
    ) {
      throw new Error("Block archive paths must be unique and relative.");
    }
    paths.add(file.path);
    return [`${source.directory}/${file.path}`, strToU8(file.content)] as const;
  });

  return {
    fileName: `pycolors-${match[1]}.zip`,
    bytes: zipSync(Object.fromEntries(entries), {
      level: 6,
      // Source copies have no release timestamp; keep the archive reproducible.
      mtime: new Date(1980, 0, 1),
    }),
  };
}

/** The browser owns the save destination and completion of the download. */
export function downloadBlockSource(source: BlockSource): void {
  const { bytes, fileName } = createBlockArchive(source);
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/zip" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.hidden = true;
  try {
    document.body.append(link);
    link.click();
  } finally {
    link.remove();
    // Let browsers, including Safari, consume the URL before releasing it.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

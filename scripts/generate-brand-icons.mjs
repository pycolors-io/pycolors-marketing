import { Buffer } from "node:buffer";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Use the renderer already installed by Next.js; no separate image dependency.
const require = createRequire(new URL("../package.json", import.meta.url));
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const publicFile = (name) => new URL(`../public/${name}`, import.meta.url);
const logo = await readFile(
  new URL("../components/logo.tsx", import.meta.url),
  "utf8",
);
const paths = [...logo.matchAll(/<path\s+([\s\S]*?)\/>/g)];
if (paths.length !== 1) throw new Error("Expected one canonical logo path");
const path = paths[0][1].match(/\bd="([^"]+)"/)?.[1];
const transform = paths[0][1].match(/\btransform="([^"]+)"/)?.[1];
if (!path || !transform) throw new Error("Missing canonical logo geometry");

function svg({ rounded = false, maskable = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${rounded ? 14 : 0}" fill="#6A30D4"/>
  <g transform="translate(32 32) scale(${maskable ? 1.25 : 1.6}) translate(-22 -20)">
    <path d="${path}" transform="${transform}" fill="#FFFFFF"/>
  </g>
</svg>
`;
}

const favicon = svg({ rounded: true });
await writeFile(publicFile("favicon.svg"), favicon);
await writeFile(
  new URL(
    "../../../packages/ui/.storybook/public/pycolors-mark.svg",
    import.meta.url,
  ),
  favicon,
);

for (const [name, size, source] of [
  ["favicon.png", 64, favicon],
  ["apple-touch-icon.png", 180, svg()],
  ["icons/192x192.png", 192, svg()],
  ["icons/512x512.png", 512, svg()],
  ["icons/maskable-512x512.png", 512, svg({ maskable: true })],
  ["logo.png", 512, svg()],
]) {
  await sharp(Buffer.from(source))
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(publicFile(name)));
}

// ICO directory with individually rasterized PNG entries for small tab sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(favicon)).resize(size, size).png().toBuffer(),
  ),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(
  publicFile("favicon.ico"),
  Buffer.concat([directory, ...images]),
);
console.log("Generated marketing and Explorer icons from components/logo.tsx");

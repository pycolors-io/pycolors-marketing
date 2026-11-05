// @vitest-environment node
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { format } from "prettier";
import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import { createCopy } from "@/lib/i18n/copy-core";
import { LEGAL_COMPANY } from "@/lib/products/commercial-policy";

const root = resolve(import.meta.dirname, "../..");
function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((item) =>
    item.isDirectory()
      ? files(resolve(dir, item.name))
      : [resolve(dir, item.name)],
  );
}
function code(content: string) {
  return Array.from(
    content.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm),
    (match) => match[0],
  );
}
function imports(content: string) {
  return Array.from(
    content.matchAll(
      /^import\s+(?:\{[\s\S]*?\}|\*\s+as\s+\w+|\w+)\s+from ["'][^"']+["'];/gm,
    ),
    (match) => match[0],
  );
}

describe("complete localized content contract", () => {
  it("preserves the registered company identity in French", () => {
    const translate = Object.assign(
      (key: string) => fr.site[key as keyof typeof fr.site],
      {
        has: (key: string) => Object.hasOwn(fr.site, key),
        raw: (key: string) => fr.site[key as keyof typeof fr.site],
      },
    );
    const copy = createCopy("fr", translate);
    for (const value of Object.values(LEGAL_COMPANY))
      expect(copy(value)).toBe(value);
  });
  it("has matching, nonempty French and English UI catalogues", () => {
    expect(Object.keys(fr.site).sort()).toEqual(Object.keys(en.site).sort());
    for (const [key, original] of Object.entries(en.site)) {
      const translated = fr.site[key as keyof typeof fr.site];
      expect(translated.trim(), original).not.toBe("");
      expect(translated, original).not.toMatch(/[\u2047\ufffd]/);
      expect(translated.match(/\{value\d+\}/g)?.sort() ?? [], original).toEqual(
        original.match(/\{value\d+\}/g)?.sort() ?? [],
      );
    }
  });
  it("keeps every translated documentation tab connected to its panel", () => {
    let panels = 0;
    const normalizeValue = (value: string) =>
      value.toLowerCase().replace(/\s/, "-");
    for (const file of files(resolve(root, "content/docs")).filter((file) =>
      file.endsWith(".fr.mdx"),
    )) {
      const content = readFileSync(file, "utf8").replace(
        /^```[^\n]*\n[\s\S]*?^```/gm,
        "",
      );
      const stack: { labels?: string[]; index: number }[] = [];
      for (const match of content.matchAll(/<(\/?)(Tabs|Tab)\b([^>]*?)>/gs)) {
        const [, closing, component, attributes = ""] = match;
        if (component === "Tabs") {
          if (closing) stack.pop();
          else {
            const items = attributes.match(/\bitems=\{(\[[\s\S]*?\])\}/);
            stack.push({
              labels: items
                ? (JSON.parse(items[1]!.replace(/,\s*]/g, "]")) as string[])
                : undefined,
              index: 0,
            });
          }
        } else if (!closing) {
          const group = stack.at(-1);
          if (!group?.labels) continue;
          const label = group.labels[group.index++];
          const value = attributes.match(/\bvalue="([^"]*)"/)?.[1];
          expect(label, file).toBeDefined();
          if (value && label)
            expect(normalizeValue(value), file).toBe(normalizeValue(label));
          panels++;
        }
      }
    }
    expect(panels).toBeGreaterThan(100);
  });
  it("preserves code examples and navigation in every document and article", async () => {
    const sourceFiles = ["content/docs", "content/blog"]
      .flatMap((dir) => files(resolve(root, dir)))
      .filter(
        (file) => /\.(md|mdx)$/.test(file) && !/\.fr\.(md|mdx)$/.test(file),
      );
    expect(sourceFiles.length).toBeGreaterThan(100);
    for (const file of sourceFiles) {
      const frenchPath = file.replace(/\.(mdx?)$/, ".fr.$1");
      expect(existsSync(frenchPath), file).toBe(true);
      const original = readFileSync(file, "utf8");
      const french = readFileSync(frenchPath, "utf8");
      expect(french, file).not.toMatch(/[\u2047\ufffd]/);
      const normalizeCode = (text: string) =>
        Promise.all(
          code(text).map((block) => format(block, { parser: "mdx" })),
        );
      expect(await normalizeCode(french), file).toEqual(
        await normalizeCode(original),
      );
      const normalizeImports = (text: string) =>
        Promise.all(
          imports(text).map((statement) =>
            format(statement, { parser: "typescript" }),
          ),
        );
      expect(await normalizeImports(french), file).toEqual(
        await normalizeImports(original),
      );
      const componentStructure = (text: string) =>
        Array.from(
          text
            .replace(/^```[^\n]*\n[\s\S]*?^```/gm, "")
            .matchAll(/<(\/?[A-Z][\w.]*)\b/g),
          (match) => match[1],
        );
      expect(componentStructure(french), file).toEqual(
        componentStructure(original),
      );
      const inlineCode = (text: string) =>
        Array.from(
          text
            .replace(/^```[^\n]*\n[\s\S]*?^```/gm, "")
            .matchAll(/`([^`\n]+)`/g),
          (match) => match[1],
        );
      expect(inlineCode(french), file).toEqual(inlineCode(original));
    }
    for (const file of files(resolve(root, "content/docs")).filter((file) =>
      file.endsWith("/meta.json"),
    )) {
      const original = JSON.parse(readFileSync(file, "utf8"));
      const translated = JSON.parse(
        readFileSync(file.replace(/meta.json$/, "meta.fr.json"), "utf8"),
      );
      expect(translated.pages, file).toEqual(original.pages);
      expect(translated.icon, file).toEqual(original.icon);
    }
  });
});

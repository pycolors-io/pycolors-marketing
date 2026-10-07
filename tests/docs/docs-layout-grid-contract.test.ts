// @vitest-environment node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import layoutSource from "../../app/docs/layout.tsx?raw";

const globalStyles = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "../../app/global.css"),
  "utf8",
);

describe("docs layout grid bridge", () => {
  it("keeps Fumadocs page regions exposed to the parent grid", () => {
    expect(layoutSource).toContain('className="docs-shell contents"');
    expect(layoutSource).not.toMatch(/className="docs-shell[^"]*\bw-full\b/);
  });

  it("reserves the fixed docs header once at every breakpoint", () => {
    const docsLayoutStyles = globalStyles.match(
      /#nd-docs-layout\s*\{([^}]+)\}/,
    )?.[1];

    expect(docsLayoutStyles).toContain("padding-top: var(--fd-nav-height)");
    expect(layoutSource).not.toContain(
      "lg:[&_#nd-page]:!pt-[calc(var(--fd-nav-height)+2rem)]",
    );
    expect(layoutSource).not.toContain("lg:[&_#nd-page]:!pt-8");
  });
});

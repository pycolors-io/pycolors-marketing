import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const layoutSource = readFileSync(
  new URL("../../app/docs/layout.tsx", import.meta.url),
  "utf8",
);

describe("docs layout grid bridge", () => {
  it("keeps Fumadocs page regions exposed to the parent grid", () => {
    expect(layoutSource).toContain('className="docs-shell contents"');
    expect(layoutSource).not.toMatch(/className="docs-shell[^"]*\bw-full\b/);
  });
});

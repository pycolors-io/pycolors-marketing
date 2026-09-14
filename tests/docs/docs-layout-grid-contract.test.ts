import { describe, expect, it } from "vitest";

import layoutSource from "../../app/docs/layout.tsx?raw";

describe("docs layout grid bridge", () => {
  it("keeps Fumadocs page regions exposed to the parent grid", () => {
    expect(layoutSource).toContain(
      'className="docs-shell contents lg:[&_#nd-page]:!pt-8"',
    );
    expect(layoutSource).not.toMatch(/className="docs-shell[^"]*\bw-full\b/);
  });

  it("aligns the desktop document top with the existing TOC rail spacing", () => {
    expect(layoutSource).toContain("lg:[&_#nd-page]:!pt-8");
  });
});

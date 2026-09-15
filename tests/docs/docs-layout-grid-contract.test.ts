import { describe, expect, it } from "vitest";

import layoutSource from "../../app/docs/layout.tsx?raw";

describe("docs layout grid bridge", () => {
  it("keeps Fumadocs page regions exposed to the parent grid", () => {
    expect(layoutSource).toContain(
      'className="docs-shell contents lg:[&_#nd-page]:!pt-[calc(var(--fd-nav-height)+2rem)]"',
    );
    expect(layoutSource).not.toMatch(/className="docs-shell[^"]*\bw-full\b/);
  });

  it("keeps the desktop breadcrumb below the fixed docs header", () => {
    expect(layoutSource).toContain(
      "lg:[&_#nd-page]:!pt-[calc(var(--fd-nav-height)+2rem)]",
    );
    expect(layoutSource).not.toContain("lg:[&_#nd-page]:!pt-8");
  });
});

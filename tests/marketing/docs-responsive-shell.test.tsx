import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocsPageShell } from "../../components/shells/docs-page-shell";

describe("DocsPageShell responsive contract", () => {
  it("keeps the documentation content shrinkable within the viewport", () => {
    render(
      <DocsPageShell>
        <div>Documentation content</div>
      </DocsPageShell>,
    );

    const section = screen
      .getByText("Documentation content")
      .closest("section");
    const content = section?.firstElementChild;

    expect(section).toHaveClass("w-full", "min-w-0", "max-w-full");
    expect(content).toHaveClass("w-full", "min-w-0", "max-w-3xl");
  });

  it("preserves full-width pages within the outer documentation layout", () => {
    render(
      <DocsPageShell full>
        <div>Full documentation content</div>
      </DocsPageShell>,
    );

    const section = screen
      .getByText("Full documentation content")
      .closest("section");
    const content = section?.firstElementChild;

    expect(content).toHaveClass("max-w-none", "w-full", "min-w-0");
    expect(content).not.toHaveClass("max-w-3xl");
  });
});

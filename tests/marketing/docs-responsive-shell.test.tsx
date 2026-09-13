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
    expect(content).toHaveClass(
      "w-full",
      "min-w-0",
      "sm:px-2",
      "lg:px-0",
      "max-w-205",
    );
  });

  it("preserves full-width pages while keeping the mobile gutter contract", () => {
    render(
      <DocsPageShell full>
        <div>Full documentation content</div>
      </DocsPageShell>,
    );

    const section = screen
      .getByText("Full documentation content")
      .closest("section");
    const content = section?.firstElementChild;

    expect(content).toHaveClass("max-w-none", "sm:px-2", "lg:px-0");
    expect(content).not.toHaveClass("max-w-205");
  });
});

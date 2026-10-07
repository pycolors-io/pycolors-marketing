import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { DocsComponentCatalog } from "../../components/docs/docs-component-catalog";
import { uiExplorerStories } from "../../lib/docs/ui-explorer";

afterEach(cleanup);

describe("docs component catalog", () => {
  it("provides one direct documentation link for every public component family", () => {
    render(<DocsComponentCatalog />);
    const hrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs.sort()).toEqual(
      Object.keys(uiExplorerStories)
        .map((family) => `/docs/ui/${family}`)
        .sort(),
    );
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(
      screen.getByRole("navigation", { name: "Component reference" }),
    ).toBeInTheDocument();
    for (const link of screen.getAllByRole("link")) {
      link.focus();
      expect(link).toHaveFocus();
    }
  });

  it("has no detectable accessibility violations", async () => {
    const { container } = render(<DocsComponentCatalog />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

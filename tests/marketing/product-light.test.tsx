import * as React from "react";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ProductLight } from "../../components/marketing/product-light";
import { MARKETING_BRAND } from "../../lib/brand-identity";

describe("decorative product illustration", () => {
  it("keeps local SVG references unique and reuses the canonical mark without business records or actions", () => {
    const { container } = render(
      <>
        <ProductLight idPrefix="home" />
        <ProductLight idPrefix="starter-pro" />
      </>,
    );
    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (element) => element.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
    for (const illustration of container.querySelectorAll(
      "[data-product-light]",
    )) {
      expect(illustration).toHaveAttribute("aria-hidden", "true");
      expect(illustration.querySelector("svg")).toHaveAttribute(
        "focusable",
        "false",
      );
      expect(illustration.textContent).toBe("");
      expect(
        illustration.querySelectorAll("image, foreignObject, a, button, text"),
      ).toHaveLength(0);
      expect(
        Array.from(illustration.querySelectorAll("path")).some(
          (element) => element.getAttribute("d") === MARKETING_BRAND.mark.path,
        ),
      ).toBe(true);
      for (const painted of illustration.querySelectorAll('[fill^="url("]')) {
        const id = painted.getAttribute("fill")!.slice(5, -1);
        expect(
          Array.from(illustration.querySelectorAll("[id]")).some(
            (element) => element.id === id,
          ),
        ).toBe(true);
      }
    }
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });

  it("is deterministic server markup and introduces no accessible controls", async () => {
    expect(renderToString(<ProductLight idPrefix="home" />)).toBe(
      renderToString(<ProductLight idPrefix="home" />),
    );
    const { container } = render(<ProductLight idPrefix="home" />);
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});

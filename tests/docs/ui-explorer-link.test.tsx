import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { UiExplorerLink } from "../../components/docs/ui-explorer-link";
import { getUiExplorerUrl } from "../../lib/docs/ui-explorer";

afterEach(cleanup);

describe("canonical UI Explorer links", () => {
  it.each([
    undefined,
    [],
    ["ui"],
    ["ui", "installation"],
    ["ui", "storybook"],
    ["ui", "button", "extra"],
    ["patterns", "button"],
    ["ui", "toString"],
    ["ui", "__proto__"],
  ])("does not fabricate stories for unrelated routes: %j", (slug) => {
    expect(getUiExplorerUrl(slug)).toBeUndefined();
    const { container } = render(<UiExplorerLink slug={slug} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one accessible native same-tab link without embedding the Explorer", async () => {
    const { container } = render(<UiExplorerLink slug={["ui", "button"]} />);
    const link = screen.getByRole("link", {
      name: "Open interactive example in PyColors UI Explorer",
    });
    expect(link).toHaveAttribute("href", getUiExplorerUrl(["ui", "button"]));
    expect(link).not.toHaveAttribute("target");
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});

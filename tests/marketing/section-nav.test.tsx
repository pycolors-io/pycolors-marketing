import * as React from "react";
import { act, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { MarketingSectionNav } from "../../components/marketing/section-nav";
import styles from "../../components/marketing/section-nav.module.css";

const items = [
  { href: "#overview", label: "Overview" },
  { href: "#setup", label: "Setup" },
  { href: "#next-steps", label: "Next steps" },
] as const;
const overrides = {
  sectionNavShell: "custom-shell",
  sectionNav: "custom-rail",
  sectionNavLink: "custom-link",
  sectionNavIndex: "custom-index",
  sectionNavControls: "custom-controls",
  sectionNavPosition: "custom-position",
  sectionNavControl: "custom-control",
} as const;
let frame: FrameRequestCallback | undefined;

beforeEach(() => {
  frame = undefined;
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    frame = callback;
    return 1;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {
    frame = undefined;
  });
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const index = items.findIndex((item) => item.href.slice(1) === this.id);
      return new DOMRect(0, index < 0 ? 0 : 300 + index * 600, 600, 100);
    },
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function fixture(
  classNames?: React.ComponentProps<typeof MarketingSectionNav>["classNames"],
) {
  const result = render(
    <div>
      <MarketingSectionNav
        items={items}
        label="Ecosystem chapters"
        classNames={classNames}
      />
      {items.map((item) => (
        <section key={item.href} id={item.href.slice(1)}>
          <h2>{item.label}</h2>
        </section>
      ))}
    </div>,
  );
  const nav = screen.getByRole("navigation", { name: "Ecosystem chapters" });
  const links = within(nav).getAllByRole("link");
  const rail = links[0]!.parentElement!;
  Object.defineProperty(rail, "clientWidth", {
    configurable: true,
    value: 300,
  });
  Object.defineProperty(rail, "scrollWidth", {
    configurable: true,
    value: 620,
  });
  act(() => {
    const callback = frame;
    frame = undefined;
    callback?.(0);
  });
  const controls = within(nav).getAllByRole("button");
  const controlShell = controls[0]!.parentElement!;
  const targets: Record<keyof typeof overrides, Element[]> = {
    sectionNavShell: [nav],
    sectionNav: [rail],
    sectionNavLink: links,
    sectionNavIndex: links.map((link) => link.firstElementChild!),
    sectionNavControls: [controlShell],
    sectionNavPosition: [controlShell.firstElementChild!],
    sectionNavControl: controls,
  };
  return { ...result, nav, links, rail, controls, targets };
}

describe("Marketing section navigation", () => {
  it("uses the caller label and native anchors with decorative indices and default styles", async () => {
    const { container, links, targets } = fixture();
    items.forEach((item, index) => {
      const link = links[index]!;
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", item.href);
      expect(link).toHaveAccessibleName(item.label);
      expect(link.firstElementChild).toHaveAttribute("aria-hidden", "true");
      expect(link.firstElementChild).toHaveTextContent(
        String(index + 1).padStart(2, "0"),
      );
      expect(document.getElementById(item.href.slice(1))).toBeInTheDocument();
    });
    for (const key of Object.keys(overrides) as (keyof typeof overrides)[])
      targets[key].forEach((target) =>
        expect(target).toHaveClass(styles[key]!),
      );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("keeps default classes for every part omitted from a partial override", () => {
    const { targets } = fixture({ sectionNavLink: overrides.sectionNavLink });
    for (const key of Object.keys(overrides) as (keyof typeof overrides)[]) {
      for (const target of targets[key]) {
        if (key === "sectionNavLink") {
          expect(target).toHaveClass(overrides.sectionNavLink);
          expect(target).not.toHaveClass(styles.sectionNavLink!);
        } else expect(target).toHaveClass(styles[key]!);
      }
    }
  });

  it("replaces all seven default classes, including overflow controls", () => {
    const { rail, controls, targets } = fixture(overrides);
    for (const key of Object.keys(overrides) as (keyof typeof overrides)[]) {
      for (const target of targets[key]) {
        expect(target).toHaveClass(overrides[key]);
        expect(target).not.toHaveClass(styles[key]!);
      }
    }
    expect(controls[0]).toHaveAccessibleName("Previous sections");
    expect(controls[0]).toBeDisabled();
    expect(controls[1]).toHaveAccessibleName("Next sections");
    expect(controls[1]).toBeEnabled();
    controls.forEach((control) =>
      expect(control).toHaveAttribute("aria-controls", rail.id),
    );
  });
});

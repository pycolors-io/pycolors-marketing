import * as React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { StarterProSectionNav } from "../../components/starters/starter-pro-section-nav";

const items = [
  { href: "#tour", label: "Product tour" },
  { href: "#preview", label: "Product preview" },
  { href: "#included", label: "What’s included" },
] as const;
let positions: Record<string, number>;
let frame: FrameRequestCallback | undefined;
let reduced = false;
const disconnect = vi.fn();
const originalScroll = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "scrollTo",
);
const scrollTo = vi.fn(function (this: HTMLElement, options: ScrollToOptions) {
  this.scrollLeft = Math.max(
    0,
    Math.min(options.left ?? 0, this.scrollWidth - this.clientWidth),
  );
  fireEvent.scroll(this);
});

beforeEach(() => {
  positions = { tour: 300, preview: 900, included: 1500 };
  frame = undefined;
  reduced = false;
  disconnect.mockClear();
  scrollTo.mockClear();
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: scrollTo,
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const preference = window.matchMedia("");
  vi.spyOn(window, "matchMedia").mockReturnValue({
    ...preference,
    get matches() {
      return reduced;
    },
  });
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
      disconnect = disconnect;
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      if (this.id in positions)
        return new DOMRect(0, positions[this.id], 600, 500);
      if (this instanceof HTMLAnchorElement) {
        const index = items.findIndex(
          (item) => item.href === this.getAttribute("href"),
        );
        return new DOMRect(
          100 + index * 210 - this.parentElement!.scrollLeft,
          0,
          200,
          44,
        );
      }
      if (this.firstElementChild instanceof HTMLAnchorElement)
        return new DOMRect(100, 0, 300, 52);
      return new DOMRect(0, 0, 600, 100);
    },
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  if (originalScroll)
    Object.defineProperty(HTMLElement.prototype, "scrollTo", originalScroll);
  else Reflect.deleteProperty(HTMLElement.prototype, "scrollTo");
});

function flush() {
  act(() => {
    const callback = frame;
    frame = undefined;
    callback?.(0);
  });
}

function fixture() {
  const result = render(
    <div
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) event.preventDefault();
      }}
    >
      <StarterProSectionNav items={items} />
      {items.map((item) => (
        <section key={item.href} id={item.href.slice(1)}>
          <h2>{item.label}</h2>
        </section>
      ))}
    </div>,
  );
  const nav = screen.getByRole("navigation", { name: "Starter Pro sections" });
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
  flush();
  return { ...result, nav, links, rail };
}

describe("Starter Pro section navigation", () => {
  it("keeps native anchor destinations and names, including decorative numbers", async () => {
    const { container, links } = fixture();
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      items.map((item) => item.href),
    );
    items.forEach((item, index) => {
      expect(links[index]).toHaveAccessibleName(item.label);
      expect(links[index]).not.toHaveAttribute("aria-current");
    });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("scrolls only the rail and disables controls at either end", () => {
    const { rail } = fixture();
    const back = screen.getByRole("button", { name: "Previous sections" });
    const next = screen.getByRole("button", { name: "Next sections" });
    expect(back).toBeDisabled();
    expect(next).toHaveAttribute("aria-controls", rail.id);
    fireEvent.click(next);
    flush();
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 240,
      behavior: "smooth",
    });
    expect(back).toBeEnabled();
    fireEvent.click(next);
    flush();
    expect(rail.scrollLeft).toBe(320);
    expect(next).toBeDisabled();
    fireEvent.click(back);
    flush();
    expect(rail.scrollLeft).toBe(80);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("tracks the reading section and brings its link into view without moving focus", () => {
    const { links } = fixture();
    positions = { tour: -400, preview: 100, included: 900 };
    fireEvent.scroll(window);
    flush();
    expect(links[1]).toHaveAttribute("aria-current", "location");
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 160,
      behavior: "instant",
    });
    expect(document.activeElement).toBe(document.body);
    positions = { tour: -900, preview: -400, included: 100 };
    fireEvent.scroll(window);
    flush();
    expect(links[2]).toHaveAttribute("aria-current", "location");
    expect(links[1]).not.toHaveAttribute("aria-current");
  });

  it("preserves a focused link while reading progress changes", () => {
    const { links } = fixture();
    act(() => links[0]!.focus());
    positions = { tour: -400, preview: 100, included: 900 };
    fireEvent.scroll(window);
    flush();
    expect(links[0]).toHaveFocus();
    expect(links[1]).toHaveAttribute("aria-current", "location");
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("keeps a clicked destination selected during native scrolling and respects interruption", () => {
    const { links } = fixture();
    fireEvent.click(links[2]!);
    positions = { tour: -400, preview: 100, included: 900 };
    fireEvent.scroll(window);
    flush();
    expect(links[2]).toHaveAttribute("aria-current", "location");
    fireEvent.wheel(window, { deltaY: 100 });
    fireEvent.scroll(window);
    flush();
    expect(links[1]).toHaveAttribute("aria-current", "location");
    fireEvent.click(links[2]!);
    expect(links[2]).toHaveAttribute("aria-current", "location");
    fireEvent.keyDown(window, { key: "Home", ctrlKey: true });
    flush();
    expect(links[1]).toHaveAttribute("aria-current", "location");
  });

  it("leaves modified clicks and keyboard activation as native anchors", () => {
    const { links } = fixture();
    for (const modifier of ["ctrlKey", "metaKey", "altKey", "shiftKey"])
      fireEvent.click(links[1]!, { [modifier]: true });
    expect(links[1]).not.toHaveAttribute("aria-current");
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
    });
    fireEvent(links[1]!, event);
    expect(event.defaultPrevented).toBe(false);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("honors reduced motion and removes overflow controls when everything fits", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const { rail } = fixture();
    reduced = true;
    fireEvent.click(screen.getByRole("button", { name: "Next sections" }));
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 240,
      behavior: "instant",
    });
    Object.defineProperty(rail, "clientWidth", {
      configurable: true,
      value: 700,
    });
    rail.scrollLeft = 0;
    fireEvent.resize(window);
    flush();
    expect(
      screen.queryByRole("button", { name: "Next sections" }),
    ).not.toBeInTheDocument();
  });

  it("disconnects resize observers and cancels scheduled work on unmount", () => {
    const { unmount } = fixture();
    fireEvent.scroll(window);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
    expect(frame).toBeUndefined();
  });
});

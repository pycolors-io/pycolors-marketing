import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HomeProductJourney } from "../../components/marketing/home-product-journey";

let reducedMotion = false;
let frame: FrameRequestCallback | undefined;
const disconnect = vi.fn();
const originalScroll = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "scrollTo",
);
const scrollTo = vi.fn(function (this: HTMLElement, options: ScrollToOptions) {
  this.scrollLeft = options.left ?? 0;
  fireEvent.scroll(this);
});

beforeEach(() => {
  reducedMotion = false;
  frame = undefined;
  vi.stubGlobal("innerWidth", 800);
  vi.stubGlobal("innerHeight", 900);
  vi.stubGlobal("scrollY", 0);
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    frame = callback;
    return 1;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {
    frame = undefined;
  });
  disconnect.mockClear();
  scrollTo.mockClear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: scrollTo,
  });
  const preference = window.matchMedia("");
  vi.spyOn(window, "matchMedia").mockReturnValue({
    ...preference,
    get matches() {
      return reducedMotion;
    },
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
      if (this.hasAttribute("data-home-product")) {
        const rail = this.closest('[role="group"]') as HTMLElement;
        const index = Array.from(
          rail.querySelectorAll("[data-home-product]"),
        ).indexOf(this);
        return new DOMRect(index * 420 - rail.scrollLeft, 0, 400, 600);
      }
      return new DOMRect(
        0,
        this.className.includes("productJourneyTrack") ? 1000 : 0,
        450,
        600,
      );
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
function renderJourney() {
  const result = render(
    <HomeProductJourney
      introduction={<h2>Products</h2>}
      footer={<p>One system.</p>}
      count={3}
    >
      <ol>
        {["Template", "UI", "Pro"].map((name) => (
          <li key={name} data-home-product>
            <a href="/starters">{name}</a>
          </li>
        ))}
      </ol>
    </HomeProductJourney>,
  );
  const rail = screen.getByRole("group", { name: "Explore the products" });
  Object.defineProperty(rail, "clientWidth", {
    configurable: true,
    value: 450,
  });
  Object.defineProperty(rail, "scrollWidth", {
    configurable: true,
    value: 1260,
  });
  fireEvent(window, new Event("resize"));
  flush();
  return { ...result, rail };
}

describe("home product journey", () => {
  it("keeps links native and moves between products with buttons and keyboard", () => {
    const { rail } = renderJourney();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(
      screen.getByRole("button", { name: "Previous product" }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Next product" }));
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 420,
      behavior: "smooth",
    });
    fireEvent.keyDown(rail, { key: "End" });
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 810,
      behavior: "smooth",
    });
    expect(screen.getByRole("button", { name: "Next product" })).toBeDisabled();
    fireEvent.keyDown(rail, { key: "Home" });
    expect(rail.scrollLeft).toBe(0);
    scrollTo.mockClear();
    fireEvent.keyDown(screen.getByRole("link", { name: "Template" }), {
      key: "ArrowRight",
    });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("scrolls horizontally with the mouse wheel and releases page scrolling at either end", () => {
    const { rail } = renderJourney();
    expect(fireEvent.wheel(rail, { deltaY: -420, cancelable: true })).toBe(
      true,
    );
    expect(fireEvent.wheel(rail, { deltaY: 420, cancelable: true })).toBe(
      false,
    );
    expect(rail.scrollLeft).toBe(420);
    expect(screen.getByText("02 / 03")).toBeVisible();
    expect(fireEvent.wheel(rail, { deltaY: 600, cancelable: true })).toBe(
      false,
    );
    expect(rail.scrollLeft).toBe(810);
    expect(fireEvent.wheel(rail, { deltaY: 120, cancelable: true })).toBe(true);
    expect(
      fireEvent.wheel(rail, { deltaY: -1, deltaMode: 2, cancelable: true }),
    ).toBe(false);
    expect(rail.scrollLeft).toBe(360);
  });

  it("leaves native trackpad, shifted wheel and browser zoom gestures untouched", () => {
    const { rail } = renderJourney();
    for (const gesture of [
      { deltaX: 300, deltaY: 10 },
      { deltaY: 300, shiftKey: true },
      { deltaY: 300, ctrlKey: true },
    ]) {
      expect(fireEvent.wheel(rail, { ...gesture, cancelable: true })).toBe(
        true,
      );
      expect(rail.scrollLeft).toBe(0);
    }
    rail.scrollLeft = 420;
    fireEvent.scroll(rail);
    expect(screen.getByText("02 / 03")).toBeVisible();
    fireEvent.scroll(window);
    expect(rail.scrollLeft).toBe(420);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("uses instant navigation for reduced motion and measures resized rails", () => {
    const { rail } = renderJourney();
    reducedMotion = true;
    fireEvent.click(screen.getByRole("button", { name: "Next product" }));
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 420,
      behavior: "instant",
    });
    Object.defineProperty(rail, "clientWidth", {
      configurable: true,
      value: 840,
    });
    fireEvent(window, new Event("resize"));
    flush();
    expect(screen.getByRole("button", { name: "Next product" })).toBeDisabled();
  });

  it("pins the desktop gallery until page scrolling has traversed every product", () => {
    vi.stubGlobal("innerWidth", 1280);
    const { rail, container } = renderJourney();
    const journey = container.firstElementChild!;
    expect(journey).toHaveAttribute("data-scroll-linked", "true");
    vi.stubGlobal("scrollY", 1450);
    fireEvent.scroll(window);
    flush();
    expect(rail.scrollLeft).toBe(405);
    vi.stubGlobal("scrollY", 1900);
    fireEvent.scroll(window);
    flush();
    expect(rail.scrollLeft).toBe(810);
    expect(screen.getByRole("button", { name: "Next product" })).toBeDisabled();
    vi.stubGlobal("scrollY", 1000);
    fireEvent.scroll(window);
    flush();
    expect(rail.scrollLeft).toBe(0);
    rail.scrollLeft = 420;
    fireEvent.scroll(rail);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 1000 + (420 / 810) * 900,
      behavior: "instant",
    });
  });

  it("removes the wheel listener and observer on unmount", () => {
    const { rail, unmount } = renderJourney();
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(fireEvent.wheel(rail, { deltaY: 420, cancelable: true })).toBe(true);
    expect(rail.scrollLeft).toBe(0);
  });
});

import * as React from "react";
import Link from "next/link";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { StarterProFoundations } from "../../components/starters/starter-pro-foundations";

let reducedMotion = false;
let journeyTop = 1000;
let stageHeight = 600;
let onPreferenceChange: (() => void) | undefined;
let frame: FrameRequestCallback | undefined;
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
  reducedMotion = false;
  journeyTop = 1000;
  stageHeight = 600;
  onPreferenceChange = undefined;
  vi.stubGlobal("innerWidth", 800);
  vi.stubGlobal("innerHeight", 900);
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  frame = undefined;
  disconnect.mockClear();
  scrollTo.mockClear();
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: scrollTo,
  });
  const preference = window.matchMedia("");
  vi.spyOn(window, "matchMedia").mockReturnValue({
    ...preference,
    addEventListener: vi.fn((_, listener) => {
      onPreferenceChange = listener as () => void;
    }),
    removeEventListener: vi.fn(),
    get matches() {
      return reducedMotion;
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
      if (this.hasAttribute("data-foundation-card")) {
        const rail = this.parentElement!;
        const index = Array.from(rail.children).indexOf(this);
        const inset =
          Number.parseFloat(window.getComputedStyle(rail).paddingInlineStart) ||
          0;
        return new DOMRect(
          100 + inset + index * 420 - rail.scrollLeft,
          0,
          400,
          600,
        );
      }
      if (this.className.includes("foundationJourney"))
        return new DOMRect(100, journeyTop, 450, stageHeight);
      return new DOMRect(100, 0, 450, stageHeight);
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

function renderCards() {
  const result = render(
    <StarterProFoundations
      introduction={<h2>Connected foundations</h2>}
      labels={["Authentication", "Billing", "Application"]}
    >
      <article data-foundation-card="">
        <h3>Authentication</h3>
        <Link href="/docs/starter-pro/auth">Authentication guide</Link>
      </article>
      <article data-foundation-card="">
        <h3>Billing</h3>
        <Link href="/docs/starter-pro/billing">Billing guide</Link>
      </article>
      <article data-foundation-card="">
        <h3>Application</h3>
      </article>
    </StarterProFoundations>,
  );
  const rail = screen.getByRole("group", { name: "Included in the source" });
  Object.defineProperty(rail, "clientWidth", {
    configurable: true,
    value: 450,
  });
  Object.defineProperty(rail, "scrollWidth", {
    configurable: true,
    value: 1240,
  });
  return {
    ...result,
    rail,
    next: screen.getByRole("button", { name: "Next foundation" }),
    previous: screen.getByRole("button", { name: "Previous foundation" }),
  };
}

function flushScroll() {
  act(() => {
    const callback = frame;
    frame = undefined;
    callback?.(0);
  });
}

describe("Starter Pro horizontal foundations", () => {
  it("keeps every foundation and guide readable and has accessible controls", async () => {
    const { container, rail } = renderCards();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(rail).toHaveAttribute("tabindex", "0");
    expect(rail).toHaveAccessibleDescription(/left and right arrow keys/u);
    for (const card of screen.getAllByRole("article")) {
      expect(card).not.toHaveAttribute("inert");
      expect(card).not.toHaveAttribute("aria-hidden");
      expect(card).not.toHaveAttribute("data-reveal");
    }
    expect(screen.getByRole("link", { name: "Billing guide" })).toHaveAttribute(
      "href",
      "/docs/starter-pro/billing",
    );
    expect((await axe(container)).violations).toEqual([]);
  });

  it("steps between cards, handles rapid navigation, and disables the bounds", () => {
    const { rail, next, previous } = renderCards();
    expect(previous).toBeDisabled();
    act(() => next.focus());
    fireEvent.click(next);
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 420,
      behavior: "smooth",
    });
    expect(screen.getByText("Foundation 2 of 3")).toBeInTheDocument();
    fireEvent.click(next);
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 790,
      behavior: "smooth",
    });
    fireEvent(rail, new Event("scrollend"));
    flushScroll();
    expect(next).toBeDisabled();
    expect(previous).toBeEnabled();
    expect(screen.getByText("Foundation 3 of 3")).toBeInTheDocument();
    fireEvent.click(previous);
    expect(screen.getByText("Foundation 2 of 3")).toBeInTheDocument();
  });

  it("tracks native scrolling and the final partially aligned card", () => {
    const { rail, next } = renderCards();
    rail.scrollLeft = 420;
    fireEvent.scroll(rail);
    flushScroll();
    expect(screen.getByText("Foundation 2 of 3")).toBeInTheDocument();
    rail.scrollLeft = 790;
    fireEvent.scroll(rail);
    flushScroll();
    expect(screen.getByText("Foundation 3 of 3")).toBeInTheDocument();
    expect(next).toBeDisabled();
  });

  it("supports arrows and Home/End on the rail while preserving focus", () => {
    const { rail } = renderCards();
    act(() => rail.focus());
    fireEvent.keyDown(rail, { key: "ArrowRight" });
    expect(screen.getByText("Foundation 2 of 3")).toBeInTheDocument();
    expect(rail).toHaveFocus();
    fireEvent.keyDown(rail, { key: "End" });
    expect(screen.getByText("Foundation 3 of 3")).toBeInTheDocument();
    fireEvent.keyDown(rail, { key: "Home" });
    expect(screen.getByText("Foundation 1 of 3")).toBeInTheDocument();
    fireEvent.keyDown(rail, { key: "ArrowLeft" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });
  });

  it("does not intercept page scrolling, shortcuts or keys on a guide", () => {
    const { rail } = renderCards();
    const down = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
      cancelable: true,
    });
    fireEvent(rail, down);
    expect(down.defaultPrevented).toBe(false);
    fireEvent.keyDown(rail, { key: "End", metaKey: true });
    fireEvent.keyDown(screen.getByRole("link", { name: "Billing guide" }), {
      key: "ArrowRight",
    });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("keeps the current gallery position when a card action receives focus", () => {
    renderCards();
    const link = screen.getByRole("link", { name: "Billing guide" });
    act(() => link.focus());
    expect(link).toHaveFocus();
    expect(scrollTo).not.toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("keeps navigation aligned with the gallery inset without realigning focused actions", () => {
    const { rail, next } = renderCards();
    rail.style.paddingInlineStart = "120px";
    fireEvent.click(next);
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 420,
      behavior: "smooth",
    });
    fireEvent(rail, new Event("scrollend"));
    fireEvent.keyDown(rail, { key: "Home" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });
    fireEvent(rail, new Event("scrollend"));
    rail.scrollLeft = 300;
    fireEvent.scroll(rail);
    flushScroll();
    expect(screen.getByText("Foundation 2 of 3")).toBeInTheDocument();
    scrollTo.mockClear();
    act(() => screen.getByRole("link", { name: "Billing guide" }).focus());
    expect(rail.scrollLeft).toBe(300);
    expect(scrollTo).not.toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("uses immediate scrolling for reduced motion, including a changed preference", () => {
    const { next } = renderCards();
    reducedMotion = true;
    fireEvent.click(next);
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 420,
      behavior: "instant",
    });
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("maps vertical progress to horizontal movement in both directions and releases the last card", () => {
    vi.stubGlobal("innerWidth", 1440);
    const { rail, next } = renderCards();
    fireEvent.resize(window);
    flushScroll();
    const journey = rail.parentElement!.parentElement!;
    expect(journey).toHaveAttribute("data-scroll-linked", "true");
    expect(journey.style.height).toBe("1725px");
    journeyTop = -562.5;
    fireEvent.scroll(window);
    flushScroll();
    expect(rail.scrollLeft).toBeCloseTo(395);
    expect(screen.getByText("Foundation 2 of 3")).toBeInTheDocument();
    journeyTop = -281.25;
    fireEvent.scroll(window);
    flushScroll();
    expect(rail.scrollLeft).toBeCloseTo(197.5);
    journeyTop = -1400;
    fireEvent.scroll(window);
    flushScroll();
    expect(rail.scrollLeft).toBe(790);
    expect(next).toBeDisabled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("keeps arrow controls and native horizontal gestures synchronized with page progress", () => {
    vi.stubGlobal("innerWidth", 1440);
    const { rail, next } = renderCards();
    fireEvent.resize(window);
    flushScroll();
    fireEvent.click(next);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 1000 + (420 / 790) * 1125,
      behavior: "smooth",
    });
    expect(scrollTo).not.toHaveBeenCalled();
    fireEvent(window, new Event("scrollend"));
    journeyTop = -562.5;
    fireEvent.scroll(window);
    flushScroll();
    rail.scrollLeft = 500;
    fireEvent.wheel(rail, { deltaX: 105 });
    fireEvent.scroll(rail);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: -562.5 + (500 / 790) * 1125,
      behavior: "instant",
    });
  });

  it("returns to a readable native gallery for reduced motion, short viewports and expanded details", () => {
    vi.stubGlobal("innerWidth", 1440);
    const { rail } = renderCards();
    const journey = rail.parentElement!.parentElement!;
    fireEvent.resize(window);
    flushScroll();
    expect(journey).toHaveAttribute("data-scroll-linked");
    reducedMotion = true;
    act(() => onPreferenceChange?.());
    flushScroll();
    expect(journey).not.toHaveAttribute("data-scroll-linked");
    expect(journey.style.height).toBe("");
    reducedMotion = false;
    stageHeight = 1000;
    fireEvent.resize(window);
    flushScroll();
    expect(journey).not.toHaveAttribute("data-scroll-linked");
    stageHeight = 600;
    fireEvent.resize(window);
    flushScroll();
    expect(journey).toHaveAttribute("data-scroll-linked");
    journeyTop = -562.5;
    fireEvent.scroll(window);
    flushScroll();
    stageHeight = 1200;
    fireEvent.resize(window);
    flushScroll();
    expect(journey).not.toHaveAttribute("data-scroll-linked");
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: -562.5,
      behavior: "instant",
    });
    expect(rail.scrollLeft).toBe(395);
  });

  it("resynchronizes on resize without ResizeObserver and cleans up pending work", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const { rail, unmount } = renderCards();
    rail.scrollLeft = 420;
    fireEvent.resize(window);
    flushScroll();
    expect(screen.getByText("Foundation 2 of 3")).toBeInTheDocument();
    fireEvent.scroll(rail);
    unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
  });
});

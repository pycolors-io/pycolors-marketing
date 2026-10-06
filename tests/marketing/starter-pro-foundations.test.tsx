import * as React from "react";
import Link from "next/link";
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StarterProFoundations } from "../../components/starters/starter-pro-foundations";

type RevealEntry = Pick<IntersectionObserverEntry, "target" | "isIntersecting">;
let notify: ((entries: RevealEntry[]) => void) | undefined;
let reducedMotion = false;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  reducedMotion = false;
  notify = undefined;
  observe.mockClear();
  unobserve.mockClear();
  disconnect.mockClear();
  vi.stubGlobal("innerHeight", 900);
  const preference = window.matchMedia("");
  vi.spyOn(window, "matchMedia").mockReturnValue({
    ...preference,
    get matches() {
      return reducedMotion;
    },
  });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: RevealEntry[]) => void) {
        notify = callback;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      return new DOMRect(
        0,
        this.hasAttribute("data-already-visible") ? 80 : 1500,
        600,
        400,
      );
    },
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderCards() {
  return render(
    <StarterProFoundations introduction={<h2>Connected foundations</h2>}>
      <article data-foundation-card="" data-already-visible="">
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
}

describe("Starter Pro foundation reveals", () => {
  it("keeps content already on screen visible and reveals later cards only on entry", () => {
    const { unmount } = renderCards();
    const cards = screen.getAllByRole("article");
    expect(cards[0]).not.toHaveAttribute("data-reveal");
    expect(cards[1]).toHaveAttribute("data-reveal", "pending");
    expect(observe).toHaveBeenCalledTimes(2);
    notify?.([{ target: cards[1]!, isIntersecting: false }]);
    expect(cards[1]).toHaveAttribute("data-reveal", "pending");
    notify?.([{ target: cards[1]!, isIntersecting: true }]);
    expect(cards[1]).toHaveAttribute("data-reveal", "visible");
    expect(unobserve).toHaveBeenCalledWith(cards[1]);
    notify?.([{ target: cards[1]!, isIntersecting: false }]);
    expect(cards[1]).toHaveAttribute("data-reveal", "visible");
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("reveals a guide immediately on keyboard focus and preserves that focus", () => {
    renderCards();
    const link = screen.getByRole("link", { name: "Billing guide" });
    const card = link.closest("article")!;
    expect(card).toHaveAttribute("data-reveal", "pending");
    act(() => link.focus());
    expect(link).toHaveFocus();
    expect(card).toHaveAttribute("data-reveal", "focused");
    notify?.([{ target: card, isIntersecting: true }]);
    expect(card).toHaveAttribute("data-reveal", "focused");
  });

  it("leaves every card visible when reduced motion is requested", () => {
    reducedMotion = true;
    renderCards();
    expect(observe).not.toHaveBeenCalled();
    for (const card of screen.getAllByRole("article"))
      expect(card).not.toHaveAttribute("data-reveal");
  });

  it("leaves content readable when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    renderCards();
    for (const card of screen.getAllByRole("article"))
      expect(card).not.toHaveAttribute("data-reveal");
    expect(screen.getByRole("link", { name: "Billing guide" })).toHaveAttribute(
      "href",
      "/docs/starter-pro/billing",
    );
  });
});

import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OnThisPageInline } from "../../components/guides/on-this-page-inline";

type Entry = Pick<IntersectionObserverEntry, "target" | "isIntersecting">;
let notify: ((entries: Entry[]) => void) | undefined;
const observe = vi.fn();
const disconnect = vi.fn();
const items = [
  { id: "overview", label: "Overview" },
  { id: "implementation", label: "Implementation" },
];

beforeEach(() => {
  observe.mockClear();
  disconnect.mockClear();
  notify = undefined;
  window.history.replaceState(null, "", "/");
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: Entry[]) => void) {
        notify = callback;
      }
      observe = observe;
      disconnect = disconnect;
    },
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

function fixture() {
  return render(
    <>
      <OnThisPageInline items={items} />
      <section id="overview">
        <h2>Overview content</h2>
      </section>
      <section id="implementation">
        <h2>Implementation content</h2>
      </section>
    </>,
  );
}

describe("Guide section navigation", () => {
  it("follows visible sections without moving focus or changing the URL", () => {
    const { container, unmount } = fixture();
    const nav = container.querySelector("nav")!;
    const first = within(nav).getByRole("link", { name: "Overview" });
    const second = within(nav).getByRole("link", { name: "Implementation" });
    first.focus();
    expect(observe).toHaveBeenCalledTimes(2);
    act(() =>
      notify?.([
        {
          target: document.getElementById("implementation")!,
          isIntersecting: true,
        },
      ]),
    );
    expect(second).toHaveAttribute("aria-current", "location");
    expect(first).not.toHaveAttribute("aria-current");
    expect(first).toHaveFocus();
    expect(location.hash).toBe("");
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("honors deep links and browser hash navigation without an observer", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    window.history.replaceState(null, "", "/#implementation");
    const { container } = fixture();
    const nav = container.querySelector("nav")!;
    expect(
      within(nav).getByRole("link", { name: "Implementation" }),
    ).toHaveAttribute("aria-current", "location");
    act(() => {
      window.history.replaceState(null, "", "/#overview");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(within(nav).getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("closes the mobile contents after choosing a native section link", () => {
    const { container } = fixture();
    const details = container.querySelector("details")!;
    details.open = true;
    const link = within(details).getByRole("link", { name: "Implementation" });
    expect(link).toHaveAttribute("href", "#implementation");
    fireEvent.click(link);
    expect(details.open).toBe(false);
    expect(
      screen.getByRole("heading", { name: "Implementation content" }),
    ).toBeVisible();
  });
});

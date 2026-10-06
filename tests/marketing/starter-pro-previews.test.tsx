import * as React from "react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, act, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import StarterProPage, { metadata } from "../../app/(site)/starters/pro/page";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";

vi.mock("@/lib/api/client", () => ({ createStarterProCheckout: vi.fn() }));

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderPreviews() {
  render(<StarterProPage />);
  return screen.getByRole("region", {
    name: "Inspect the screens you can build on",
  });
}

describe("Starter Pro product page", () => {
  it("keeps all five previews and their explanations without full-size links", () => {
    const region = renderPreviews();
    const images = within(region).getAllByRole("img", { hidden: true });
    expect(images).toHaveLength(5);
    expect(within(region).queryByRole("tablist")).toBeNull();
    for (const [index, [title, file, annotation]] of [
      ["Dashboard", "dashboard", "demonstration data, not customer results"],
      ["Authentication", "auth", "Configure your own provider credentials"],
      [
        "Billing",
        "billing",
        "not evidence of a payment or a verified Stripe integration",
      ],
      [
        "Pricing example",
        "pricing",
        "not the purchase terms for the Starter Pro source package",
      ],
      ["Offline fallback", "pwa", "does not mean every feature works offline"],
    ].entries()) {
      const image = images[index]!;
      expect(image).toHaveAccessibleName(/Starter Pro/u);
      const picker = within(region).getByRole("button", {
        name: title,
      });
      fireEvent.click(picker);
      expect(picker).toHaveAttribute("aria-disabled", "true");
      expect(picker).toHaveAttribute("aria-current", "true");
      expect(picker).toHaveTextContent(title!);
      const note = within(region).getByRole("group", {
        name: `${index + 1} of 5: ${title}`,
      });
      expect(note).toHaveTextContent(annotation!);
      expect(within(note).getByRole("heading", { level: 3 })).toHaveTextContent(
        title!,
      );
      expect(image.getAttribute("src")).toContain(`${file}-pycolors.png`);
      expect(within(note).queryByRole("link")).toBeNull();
      expect(note).not.toHaveAttribute("inert");
      for (const slide of region.querySelectorAll(
        '[aria-roledescription="slide"]',
      )) {
        if (slide !== note) {
          expect(slide).toHaveAttribute("inert");
          expect(slide).toHaveAttribute("aria-hidden", "true");
        }
      }
    }
    expect(region).toHaveTextContent(
      "do not demonstrate a completed payment, a verified integration, or a live production deployment",
    );
  });

  it("keeps focus on navigation controls and wraps between the first and last capture", () => {
    const region = renderPreviews();
    const next = within(region).getByRole("button", { name: "Next preview" });
    const previous = within(region).getByRole("button", {
      name: "Previous preview",
    });
    act(() => next.focus());
    fireEvent.click(next);
    expect(next).toHaveFocus();
    expect(
      within(region).getByRole("group", { name: "2 of 5: Authentication" }),
    ).toBeVisible();
    fireEvent.click(previous);
    fireEvent.click(previous);
    expect(
      within(region).getByRole("group", { name: "5 of 5: Offline fallback" }),
    ).toBeVisible();
    expect(
      within(region).getByRole("button", { name: "Play slideshow" }),
    ).toBeVisible();
  });

  it("rotates automatically, pauses on hover and stays stopped after keyboard focus", () => {
    vi.useFakeTimers();
    vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    const region = renderPreviews();
    const carousel = within(region).getByRole("group", {
      name: "Starter Pro interface previews",
    });
    act(() => vi.advanceTimersByTime(5000));
    expect(
      within(region).getByRole("group", { name: "2 of 5: Authentication" }),
    ).toBeVisible();
    fireEvent.mouseEnter(carousel);
    act(() => vi.advanceTimersByTime(10000));
    expect(
      within(region).getByRole("group", { name: "2 of 5: Authentication" }),
    ).toBeVisible();
    fireEvent.mouseLeave(carousel);
    act(() => vi.advanceTimersByTime(5000));
    expect(
      within(region).getByRole("group", { name: "3 of 5: Billing" }),
    ).toBeVisible();
    const pause = within(region).getByRole("button", {
      name: "Pause slideshow",
    });
    fireEvent.pointerDown(pause);
    act(() => pause.focus());
    fireEvent.click(pause);
    expect(
      within(region).getByRole("button", { name: "Play slideshow" }),
    ).toBeVisible();
    act(() => pause.blur());
    act(() => vi.advanceTimersByTime(10000));
    expect(
      within(region).getByRole("group", { name: "3 of 5: Billing" }),
    ).toBeVisible();
    fireEvent.click(
      within(region).getByRole("button", { name: "Play slideshow" }),
    );
    act(() => vi.advanceTimersByTime(5000));
    expect(
      within(region).getByRole("group", { name: "4 of 5: Pricing example" }),
    ).toBeVisible();
  });

  it("keeps rapid navigation responsive and exposes only the incoming slide", () => {
    const region = renderPreviews();
    const carousel = within(region).getByRole("group", {
      name: "Starter Pro interface previews",
    });
    const next = within(region).getByRole("button", { name: "Next preview" });
    const previous = within(region).getByRole("button", {
      name: "Previous preview",
    });
    act(() => next.focus());
    fireEvent.click(next);
    fireEvent.click(next);
    expect(carousel).toHaveAttribute("data-direction", "next");
    expect(next).toHaveFocus();
    act(() => previous.focus());
    fireEvent.click(previous);
    expect(carousel).toHaveAttribute("data-direction", "previous");
    expect(previous).toHaveFocus();
    expect(
      within(region).getByRole("button", { name: "Authentication" }),
    ).toHaveAttribute("aria-current", "true");
    expect(
      within(region).getByRole("group", { name: "2 of 5: Authentication" }),
    ).not.toHaveAttribute("inert");
    expect(
      carousel.querySelectorAll(
        '[aria-roledescription="slide"][aria-hidden="false"]',
      ),
    ).toHaveLength(1);
    expect(
      within(region).getByRole("button", { name: "Play slideshow" }),
    ).toBeVisible();
  });

  it("plays immediately under the pointer and continues through a complete loop", () => {
    vi.useFakeTimers();
    vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    const region = renderPreviews();
    const carousel = within(region).getByRole("group", {
      name: "Starter Pro interface previews",
    });
    fireEvent.mouseEnter(carousel);
    const pause = within(region).getByRole("button", {
      name: "Pause slideshow",
    });
    fireEvent.pointerDown(pause);
    act(() => pause.focus());
    fireEvent.click(pause);
    fireEvent.pointerDown(pause);
    fireEvent.click(pause);
    expect(carousel).toHaveAttribute("data-rotating", "true");
    expect(region).toHaveTextContent("Auto-play");
    for (const title of [
      "Authentication",
      "Billing",
      "Pricing example",
      "Offline fallback",
      "Dashboard",
    ]) {
      act(() => vi.advanceTimersByTime(5000));
      expect(
        within(region).getByRole("button", { name: title }),
      ).toHaveAttribute("aria-current", "true");
    }
    fireEvent.mouseLeave(carousel);
    fireEvent.mouseEnter(carousel);
    expect(carousel).toHaveAttribute("data-rotating", "false");
  });

  it("gives each preview a full cycle after returning to the browser tab", () => {
    vi.useFakeTimers();
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    const region = renderPreviews();
    act(() => vi.advanceTimersByTime(3000));
    hidden.mockReturnValue(true);
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(15000));
    expect(
      within(region).getByRole("button", { name: "Dashboard" }),
    ).toHaveAttribute("aria-current", "true");
    hidden.mockReturnValue(false);
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(4999));
    expect(
      within(region).getByRole("button", { name: "Dashboard" }),
    ).toHaveAttribute("aria-current", "true");
    act(() => vi.advanceTimersByTime(1));
    expect(
      within(region).getByRole("button", { name: "Authentication" }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("waits for the gallery to enter the viewport before rotating", () => {
    vi.useFakeTimers();
    vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    let onIntersection:
      | ((
          entries: Pick<
            IntersectionObserverEntry,
            "isIntersecting" | "intersectionRatio"
          >[],
        ) => void)
      | undefined;
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(private callback: NonNullable<typeof onIntersection>) {}
        observe = vi.fn((element: Element) => {
          if (element.getAttribute("aria-roledescription") === "carousel") {
            onIntersection = this.callback;
          }
        });
        disconnect = disconnect;
      },
    );
    const region = renderPreviews();
    act(() =>
      onIntersection?.([{ isIntersecting: false, intersectionRatio: 0 }]),
    );
    act(() => vi.advanceTimersByTime(15000));
    expect(
      within(region).getByRole("button", { name: "Dashboard" }),
    ).toHaveAttribute("aria-current", "true");
    act(() =>
      onIntersection?.([{ isIntersecting: true, intersectionRatio: 0.5 }]),
    );
    act(() => vi.advanceTimersByTime(5000));
    expect(
      within(region).getByRole("button", { name: "Authentication" }),
    ).toHaveAttribute("aria-current", "true");
    act(() =>
      onIntersection?.([{ isIntersecting: true, intersectionRatio: 0.1 }]),
    );
    act(() => vi.advanceTimersByTime(10000));
    expect(
      within(region).getByRole("button", { name: "Authentication" }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("does not start automatic rotation when reduced motion is requested", () => {
    vi.useFakeTimers();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    vi.spyOn(window, "matchMedia").mockReturnValue({
      ...preference,
      matches: true,
    });
    const region = renderPreviews();
    expect(
      within(region).getByRole("button", { name: "Play slideshow" }),
    ).toBeVisible();
    act(() => vi.advanceTimersByTime(10000));
    expect(
      within(region).getByRole("group", { name: "1 of 5: Dashboard" }),
    ).toBeVisible();
  });

  it("connects the page navigation to product, comparison, purchase and setup sections", () => {
    renderPreviews();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const navigation = screen.getByRole("navigation", {
      name: "Starter Pro sections",
    });
    const links = within(navigation).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#product-preview",
      "#included",
      "#purchase",
      "#free-vs-pro",
      "#setup",
      "#buyer-faq",
    ]);
    for (const link of links) {
      expect(
        document.getElementById(link.getAttribute("href")!.slice(1)),
      ).not.toBeNull();
    }
    const purchase = screen.getByRole("region", {
      name: "What you receive after purchase",
    });
    expect(purchase).toHaveTextContent("One-time payment");
    expect(purchase).toHaveTextContent(
      "subject to continued product availability",
    );
    expect(purchase).toHaveTextContent("No response-time SLA is promised");
    expect(
      within(purchase).getByRole("link", { name: "Open purchase recovery" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(
      within(purchase).getByRole("link", { name: "/license" }),
    ).toHaveAttribute("href", "/license");
  });

  it("preserves the purchase offer and metadata", () => {
    renderPreviews();
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const offer = screen.getByRole("region", {
      name: "Starter Pro",
    });
    expect(offer).toHaveTextContent(PRODUCT_DISPLAY["starter-pro"].priceLabel);
    expect(offer).toHaveTextContent(
      `Regular price planned at ${PRODUCT_DISPLAY["starter-pro"].regularPriceLabel}`,
    );
    expect(offer).toHaveTextContent("One-time payment");
    expect(offer).toHaveTextContent(
      "payment confirmation and delivery processing",
    );
    expect(
      within(offer).getByRole("link", { name: "License terms" }),
    ).toHaveAttribute("href", "/license");
    expect(
      screen.getAllByRole("button", {
        name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      }).length,
    ).toBeGreaterThan(0);
    expect(metadata.alternates?.canonical).toBe("/starters/pro");
  });

  it("connects delivery and setup to existing documentation and recovery routes", () => {
    renderPreviews();
    const setup = screen.getByRole("region", {
      name: "Your source. Your environment. Your product.",
    });
    expect(within(setup).getAllByRole("listitem")).toHaveLength(3);
    expect(setup).toHaveTextContent("local PostgreSQL database");
    expect(setup).toHaveTextContent("Stripe test environment");
    expect(setup).toHaveTextContent(
      "You own the product logic and operation of your app",
    );
    for (const link of within(screen.getByRole("main")).getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      if (!href.startsWith("/")) continue;
      const route = href.split("#")[0]!;
      const paths = route.startsWith("/docs/")
        ? [
            resolve("content", `${route.slice(1)}.mdx`),
            resolve("content", route.slice(1), "index.mdx"),
          ]
        : [resolve("app/(site)", route.slice(1), "page.tsx")];
      expect(paths.some(existsSync), href).toBe(true);
    }
  });

  it("has accessible image names, heading structure and links", async () => {
    renderPreviews();
    expect((await axe(screen.getByRole("main"))).violations).toEqual([]);
  });
});

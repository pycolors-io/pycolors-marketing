import * as React from "react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, act, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import StarterProPage, {
  generateMetadata as getLocalizedMetadata0,
} from "../../app/[locale]/(site)/starters/pro/page";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";
import { STARTER_PRO_SERVICES } from "../../lib/products/starter-pro-services";

const metadata = await getLocalizedMetadata0({
  params: Promise.resolve({ locale: "en" }),
});

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
  it("introduces the real dashboard captures with their demonstration-data context and preview destination", () => {
    render(<StarterProPage />);
    const hero = screen.getByRole("figure", { name: "Dashboard" });
    const images = within(hero).getAllByRole("img", { hidden: true });
    expect(images).toHaveLength(2);
    for (const [index, file] of [
      "dashboard-pycolors-2x.png",
      "dashboard-dark-pycolors-2x.png",
    ].entries()) {
      expect(images[index]?.getAttribute("src")).toContain(file);
      expect(images[index]).toHaveAccessibleName(
        /Starter Pro dashboard.*workspace team/u,
      );
    }
    expect(hero).toHaveTextContent("seeded PostgreSQL workspace");
    expect(hero).toHaveTextContent(
      "These captures use demonstration data, not customer results.",
    );
    const destination = within(hero).getByRole("link", {
      name: "Product preview",
    });
    expect(destination).toHaveAttribute("href", "#product-preview");
    expect(document.getElementById("product-preview")).toBe(
      screen.getByRole("region", {
        name: "Inspect the screens you can build on",
      }),
    );
  });

  it("keeps repeated wave artwork decorative with unique, resolving gradient references", () => {
    const { container } = render(<StarterProPage />);
    const allIds = Array.from(
      container.querySelectorAll("[id]"),
      (node) => node.id,
    );
    expect(new Set(allIds).size).toBe(allIds.length);
    const waves = container.querySelectorAll("[data-starter-pro-waves]");
    expect(waves.length).toBeGreaterThan(1);
    for (const wave of waves) {
      expect(wave).toHaveAttribute("aria-hidden", "true");
      expect(wave).toHaveAttribute("focusable", "false");
      expect(
        wave.querySelectorAll("a, button, image, foreignObject, text"),
      ).toHaveLength(0);
      for (const painted of wave.querySelectorAll('[fill^="url("]')) {
        const target = painted.getAttribute("fill")!.slice(5, -1);
        expect(
          Array.from(wave.querySelectorAll("[id]"), (node) => node.id),
        ).toContain(target);
      }
    }
  });

  it("keeps body illustrations decorative and preserves the six readiness guide destinations", () => {
    const { container } = render(<StarterProPage />);
    const readiness = screen.getByRole("region", {
      name: "More of the product journey, already connected.",
    });
    const illustrations = readiness.querySelectorAll(
      "[data-readiness-illustration]",
    );
    expect(illustrations).toHaveLength(6);
    for (const illustration of illustrations) {
      const image = illustration.querySelector("img");
      expect(image).not.toBeNull();
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute("loading", "lazy");
      expect(decodeURIComponent(image?.getAttribute("src") ?? "")).toContain(
        "/images/starters/pro/concepts/",
      );
    }
    for (const artwork of [
      ...illustrations,
      ...container.querySelectorAll("[data-body-artwork]"),
    ]) {
      expect(artwork).toHaveAttribute("aria-hidden", "true");
      expect(artwork.querySelectorAll("a, button, input, text")).toHaveLength(
        0,
      );
    }
    for (const guide of within(readiness).getAllByRole("link")) {
      expect(guide.getAttribute("href")).toMatch(/^\/docs\/starter-pro\//u);
    }
    expect(within(readiness).getAllByRole("link")).toHaveLength(6);
  });

  it("keeps concept artwork decorative and separate from genuine interface previews", () => {
    render(<StarterProPage />);
    for (const [title, guide] of [
      ["Source & architecture", "Included source"],
      ["Delivery & ownership", "Delivery guide"],
      ["Your downloadable package", "Review everything included"],
      ["Claim email and purchase recovery", "Open purchase recovery"],
      ["Updates and access support", "Review release history"],
      ["Commercial license and setup", "Review the license"],
    ] as const) {
      const heading = screen.getByRole("heading", { name: title, level: 3 });
      const card = heading.closest<HTMLElement>("[data-card-art]")!;
      const art = card.querySelector("img");
      expect(art).not.toBeNull();
      expect(decodeURIComponent(art?.getAttribute("src") ?? "")).toContain(
        "/images/starters/pro/concepts/",
      );
      expect(art).toHaveAttribute("alt", "");
      expect(art).toHaveAttribute("loading", "lazy");
      expect(art?.closest('[aria-hidden="true"]')).not.toBeNull();
      expect(within(card).queryByRole("img")).not.toBeInTheDocument();
      expect(within(card).getByRole("link", { name: guide })).toHaveAttribute(
        "href",
      );
    }
  });

  it("keeps setup requirements visible beside decorative configuration artwork", () => {
    render(<StarterProPage />);
    const panel = screen.getByRole("heading", {
      name: "Prepare the services your app will use.",
      level: 3,
    }).parentElement!;
    const image = panel.querySelector("img");
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image?.closest('[aria-hidden="true"]')).not.toBeNull();
    for (const term of ["Runtime", "Database", "Auth & email", "Payments"]) {
      expect(within(panel).getByText(term, { selector: "dt" })).toBeVisible();
    }
    expect(
      within(panel).getByRole("link", { name: "Review setup" }),
    ).toHaveAttribute("href");
  });

  it("keeps recurring-work cards conceptual and real screenshots in the product preview", () => {
    render(<StarterProPage />);
    const included = screen.getByRole("region", {
      name: "The recurring work, already connected.",
    });
    const cards = included.querySelectorAll<HTMLElement>(
      "[data-foundation-card]",
    );
    expect(cards).toHaveLength(6);
    for (const card of cards) {
      const image = card.querySelector("img");
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image?.closest('[aria-hidden="true"]')).not.toBeNull();
      expect(decodeURIComponent(image?.getAttribute("src") ?? "")).toContain(
        "/images/starters/pro/concepts/",
      );
      expect(within(card).queryByRole("img")).not.toBeInTheDocument();
    }
    expect(within(included).queryByRole("figure")).not.toBeInTheDocument();
    for (const [guide, href] of [
      ["Authentication guide", "/docs/starter-pro/auth"],
      ["Billing guide", "/docs/starter-pro/billing"],
    ]) {
      expect(
        within(included).getByRole("link", { name: guide }),
      ).toHaveAttribute("href", href);
    }
    const previews = screen.getByRole("region", {
      name: "Inspect the screens you can build on",
    });
    expect(within(previews).getAllByRole("img", { hidden: true })).toHaveLength(
      5,
    );
    expect(previews).toHaveTextContent("Demonstration data");
  });

  it("keeps the source offer distinct from a scoped implementation and exposes the readiness guides", () => {
    render(<StarterProPage />);
    const readiness = screen.getByRole("region", {
      name: "More of the product journey, already connected.",
    });
    expect(within(readiness).getAllByRole("article")).toHaveLength(6);
    expect(
      within(readiness).getByRole("link", {
        name: "Inspect the packaging gate",
      }),
    ).toHaveAttribute("href", "/docs/starter-pro/release-readiness");
    const service = screen.getByRole("region", {
      name: "An assisted start, scoped to your product.",
    });
    expect(service).toHaveTextContent("Optional services");
    expect(service).toHaveTextContent(
      "total price and follow-up support are agreed in writing",
    );
    expect(service).toHaveTextContent("itemized separately in your quote");
    expect(within(service).getAllByRole("article")).toHaveLength(2);
    for (const offer of Object.values(STARTER_PRO_SERVICES)) {
      const card = within(service).getByRole("article", { name: offer.title });
      expect(card).toHaveTextContent(offer.priceLabel);
      expect(
        within(card).getByRole("link", { name: offer.action }),
      ).toHaveAttribute("href", offer.href);
    }
    expect(
      within(service).queryByRole("button", { name: /Buy Starter Pro/u }),
    ).toBeNull();
    expect(
      screen.getByRole("region", { name: "Starter Pro" }),
    ).toHaveTextContent(PRODUCT_DISPLAY["starter-pro"].priceLabel);
  });

  it("keeps all five previews and their explanations without full-size links", () => {
    const region = renderPreviews();
    const images = within(region).getAllByRole("img", { hidden: true });
    expect(images).toHaveLength(5);
    expect(within(region).queryByRole("tablist")).toBeNull();
    for (const [index, [title, file, annotation]] of [
      [
        "Dashboard",
        "dashboard-pycolors-2x",
        "demonstration data, not customer results",
      ],
      [
        "Authentication",
        "auth-indigo-2x",
        "Configure your own provider credentials",
      ],
      [
        "Billing",
        "billing-emerald-2x",
        "not evidence of a payment or a verified Stripe integration",
      ],
      [
        "Pricing example",
        "pricing-cyan-2x",
        "not the purchase terms for the Starter Pro source package",
      ],
      [
        "Project work",
        "project-work-coral-2x",
        "Archived projects remain readable",
      ],
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
      expect(image.getAttribute("src")).toContain(`${file}.png`);
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
      within(region).getByRole("group", { name: "5 of 5: Project work" }),
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
      "Project work",
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
      "#product-tour",
      "#product-preview",
      "#built-with-pycolors",
      "#readiness",
      "#implementation",
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
      "Complete source licence. Provider costs and implementation services are separate.",
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
      const target = new URL(href, "https://pycolors.io");
      expect(target.origin).toBe("https://pycolors.io");
      const route = target.pathname;
      const paths = route.startsWith("/docs/")
        ? [
            resolve("content", `${route.slice(1)}.mdx`),
            resolve("content", route.slice(1), "index.mdx"),
          ]
        : [resolve("app/[locale]/(site)", route.slice(1), "page.tsx")];
      expect(paths.some(existsSync), href).toBe(true);
    }
  });

  it("has accessible image names, heading structure and links", async () => {
    renderPreviews();
    expect((await axe(screen.getByRole("main"))).violations).toEqual([]);
  });
});

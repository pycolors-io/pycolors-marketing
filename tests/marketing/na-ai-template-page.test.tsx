import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { axe } from "vitest-axe";

import NaAiTemplatePage, {
  metadata,
} from "../../app/(site)/templates/na-ai-landing/page";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { trackMoneyPathEvent } from "@/lib/analytics";

vi.hoisted(() =>
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com"),
);
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));

const product = PRODUCT_DISPLAY["na-ai-landing"];
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("fetch", vi.fn());
  window.history.replaceState(null, "", "/templates/na-ai-landing");
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

describe("NA-AI Landing product page", () => {
  it("preserves metadata, product offer and breadcrumb structured data", () => {
    render(<NaAiTemplatePage />);
    expect(metadata.alternates?.canonical).toBe("/templates/na-ai-landing");
    expect(metadata.openGraph?.url).toBe("/templates/na-ai-landing");
    const offer = JSON.parse(
      document.querySelector("#na-ai-landing-product-jsonld")!.textContent!,
    );
    expect(offer).toMatchObject({
      "@type": "Product",
      name: product.name,
      url: "https://pycolors.io/templates/na-ai-landing",
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.currency,
      },
    });
    const breadcrumb = JSON.parse(
      document.querySelector("#breadcrumb-jsonld")!.textContent!,
    );
    expect(
      breadcrumb.itemListElement.map((item: { item: string }) => item.item),
    ).toEqual([
      "https://pycolors.io/",
      "https://pycolors.io/templates",
      "https://pycolors.io/templates/na-ai-landing",
    ]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("provides a single main heading, skip target and five correctly labelled section anchors", () => {
    render(<NaAiTemplatePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const nav = screen.getByRole("navigation", {
      name: "NA-AI Landing sections",
    });
    const links = within(nav).getAllByRole("link");
    expect(links).toHaveLength(5);
    for (const link of links) {
      const target = document.getElementById(
        link.getAttribute("href")!.slice(1),
      );
      expect(target).not.toBeNull();
      expect(target).toHaveAccessibleName();
    }
    expect(
      screen.queryByRole("button", { name: /sticky purchase bar/ }),
    ).toBeNull();
  });

  it("keeps prices from the catalog and explicit source-code delivery beside the purchase action", () => {
    render(<NaAiTemplatePage />);
    const purchase = screen.getByRole("complementary", {
      name: "Purchase NA-AI Landing",
    });
    expect(within(purchase).getByText(product.priceLabel)).toBeVisible();
    expect(purchase).toHaveTextContent(
      `Regular price ${product.regularPriceLabel}`,
    );
    expect(purchase).toHaveTextContent("One-time payment");
    expect(purchase).toHaveTextContent(
      "after payment confirmation and delivery processing",
    );
    expect(
      within(purchase).getByRole("link", { name: "License" }),
    ).toHaveAttribute("href", "/license");
    expect(
      within(purchase).getByRole("link", { name: "Purchase terms" }),
    ).toHaveAttribute("href", "/terms");
    expect(
      screen.getAllByRole("button", { name: /Buy NA-AI Landing/ }),
    ).toHaveLength(2);
  });

  it("restores the bottom purchase bar after four seconds without exposing hidden controls", () => {
    vi.useFakeTimers();
    render(<NaAiTemplatePage />);
    const bar = document.querySelector(
      '[aria-label="NA-AI Landing purchase bar"]',
    );
    expect(bar).toHaveAttribute("inert");
    act(() => vi.advanceTimersByTime(3999));
    expect(screen.queryByRole("button", { name: "Buy now" })).toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(bar).not.toHaveAttribute("inert");
    const visibleBar = screen.getByRole("region", {
      name: "NA-AI Landing purchase bar",
    });
    expect(within(visibleBar).getByText("NA-AI Landing")).toBeVisible();
    expect(
      within(visibleBar).getByText(`· ${product.priceLabel}`),
    ).toBeVisible();
    expect(visibleBar).toHaveTextContent("Instant access");
    expect(visibleBar).toHaveTextContent("Commercial usage");
    expect(visibleBar).toHaveTextContent(
      "Production-ready landing page template built for AI and SaaS launches.",
    );
    const demo = within(visibleBar).getByRole("link", {
      name: "Demo (opens in a new tab)",
    });
    expect(demo).toHaveAttribute("href", "https://na-ai.pycolors.io");
    expect(demo).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("can collapse and reopen the bar with focus retained on its toggle", async () => {
    vi.useFakeTimers();
    const { container } = render(<NaAiTemplatePage />);
    act(() => vi.advanceTimersByTime(4000));
    vi.useRealTimers();
    fireEvent.click(
      screen.getByRole("button", { name: "Close sticky purchase bar" }),
    );
    const reopen = screen.getByRole("button", {
      name: "Open sticky purchase bar",
    });
    expect(reopen).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Buy now" })).toBeNull();
    fireEvent.click(reopen);
    expect(
      screen.getByRole("button", { name: "Close sticky purchase bar" }),
    ).toHaveFocus();
    expect(screen.getByRole("button", { name: "Buy now" })).toBeVisible();
    expect(await axe(container)).toHaveNoViolations();
  }, 15_000);

  it("keeps both preview assets available and opens the live demo with safe external links", () => {
    render(<NaAiTemplatePage />);
    for (const label of ["Dark", "Light"]) {
      fireEvent.mouseDown(screen.getByRole("tab", { name: label }), {
        button: 0,
        ctrlKey: false,
      });
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      const panel = screen.getByRole("tabpanel", { name: label });
      const image = within(panel).getByRole("img");
      expect(image).toHaveAccessibleName(
        `NA-AI Landing hero and illustrative analytics preview in ${label.toLowerCase()} mode`,
      );
      const src = new URL(image.getAttribute("src")!, "http://localhost");
      expect(
        existsSync(
          resolve(
            "public",
            (src.searchParams.get("url") ?? src.pathname).slice(1),
          ),
        ),
      ).toBe(true);
      const link = within(panel).getByRole("link");
      expect(link).toHaveAttribute("href", "https://na-ai.pycolors.io");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
      expect(link).toHaveAccessibleName(/opens in a new tab/);
      expect(panel).toHaveTextContent(
        "Product visuals and metrics are illustrative.",
      );
    }
  });

  it("groups included features and distinguishes integrations the buyer must supply", () => {
    render(<NaAiTemplatePage />);
    const included = screen.getByRole("region", {
      name: "The marketing layer, already considered.",
    });
    for (const name of [
      "The marketing sections",
      "The visual foundation",
      "The source project",
    ]) {
      expect(
        within(within(included).getByRole("list", { name })).getAllByRole(
          "listitem",
        ),
      ).toHaveLength(5);
    }
    const exclusions = within(included).getByRole("list", {
      name: "Not included in the template",
    });
    expect(
      within(exclusions)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual([
      "Authentication",
      "Database",
      "Backend API",
      "Stripe billing",
      "Email delivery",
      "User dashboard",
    ]);
    expect(included).toHaveTextContent(
      "connect real services for your product",
    );
    expect(
      within(included).getByRole("link", {
        name: "Need auth and billing? Explore Starter Pro",
      }),
    ).toHaveAttribute("href", "/starters/pro");
  });

  it("maps customization to real source files and documentation, with recovery and support paths", () => {
    render(<NaAiTemplatePage />);
    const customization = screen.getByRole("region", {
      name: "Your content. Your visual identity.",
    });
    const paths = [...customization.querySelectorAll("dt code")].map(
      (code) => code.textContent!,
    );
    expect(paths).toHaveLength(5);
    for (const path of paths)
      expect(existsSync(resolve("../na-ai-landing/src", path)), path).toBe(
        true,
      );
    const delivery = screen.getByRole("region", {
      name: "What arrives after purchase.",
    });
    expect(
      within(delivery).getByRole("link", { name: "Recover a purchase" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(
      within(delivery).getByRole("link", { name: "Purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (!href.startsWith("/")) continue;
      const candidates = href.startsWith("/docs/")
        ? [
            resolve("content", `${href.slice(1)}.mdx`),
            resolve("content", href.slice(1), "index.mdx"),
          ]
        : [resolve("app/(site)", href.slice(1), "page.tsx")];
      expect(candidates.some(existsSync), href).toBe(true);
    }
  });

  it.each([
    "Buy NA-AI Landing",
    `Buy NA-AI Landing — ${product.priceLabel}`,
    "Buy now",
  ])(
    "preserves the real checkout payload and pending state for %s",
    async (label) => {
      let finish!: (response: Response) => void;
      vi.mocked(fetch).mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            finish = resolve;
          }),
      );
      if (label === "Buy now") vi.useFakeTimers();
      render(<NaAiTemplatePage />);
      if (label === "Buy now") {
        act(() => vi.advanceTimersByTime(4000));
        vi.useRealTimers();
      }
      const button = screen.getByRole("button", { name: label });
      fireEvent.click(button);
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
      fireEvent.click(button);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.example.com/api/v1/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productSlug: "na-ai-landing" }),
          signal: expect.any(AbortSignal),
        },
      );
      finish(
        new Response(
          JSON.stringify({
            url: "https://checkout.example.com/controlled-template",
          }),
          { status: 200 },
        ),
      );
      await waitFor(() =>
        expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(
          "https://checkout.example.com/controlled-template",
        ),
      );
      expect(trackMoneyPathEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "checkout_redirect_started",
          productSlug: "na-ai-landing",
          page: "/templates/na-ai-landing",
        }),
      );
    },
  );

  it("retains actionable feedback if checkout fails", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(
      new Error("Controlled network failure"),
    );
    render(<NaAiTemplatePage />);
    fireEvent.click(screen.getByRole("button", { name: "Buy NA-AI Landing" }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Checkout could not be opened.");
    expect(
      within(alert).getByRole("link", { name: "Contact purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations with the preview and expanded FAQ", async () => {
    const { container } = render(<NaAiTemplatePage />);
    const faq = screen.getByRole("region", { name: "Questions before buying" });
    expect(faq.querySelectorAll("details")).toHaveLength(5);
    for (const summary of faq.querySelectorAll("summary"))
      fireEvent.click(summary);
    expect(await axe(container)).toHaveNoViolations();
  }, 15_000);
});

import {
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

import StartersPage, { metadata } from "../../app/(site)/starters/page";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { trackMoneyPathEvent } from "@/lib/analytics";

vi.hoisted(() =>
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com"),
);
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("fetch", vi.fn());
  window.history.replaceState(null, "", "/starters");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

describe("Starter discovery page", () => {
  it("preserves the public route and gives keyboard users a main target and valid section anchors", () => {
    render(<StartersPage />);
    expect(metadata.alternates?.canonical).toBe("/starters");
    expect(metadata.openGraph?.url).toBe("/starters");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href");
      if (href?.startsWith("#"))
        expect(document.getElementById(href.slice(1))).not.toBeNull();
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("distinguishes mock UI from integration foundations and takes prices from the catalog", () => {
    render(<StartersPage />);
    const free = screen.getByRole("article", { name: "Starter Free" });
    const pro = screen.getByRole("article", { name: "Starter Pro" });
    expect(within(free).getByText(STARTER_FREE_PRICE_LABEL)).toBeVisible();
    expect(free).toHaveTextContent("No real accounts, payments or database.");
    expect(free).toHaveTextContent("Public repository");
    expect(
      within(pro).getByText(PRODUCT_DISPLAY["starter-pro"].priceLabel),
    ).toBeVisible();
    expect(pro).toHaveTextContent(
      `Regular price planned at ${PRODUCT_DISPLAY["starter-pro"].regularPriceLabel}`,
    );
    expect(pro).toHaveTextContent("One-time payment");
    expect(pro).toHaveTextContent(
      "Configure your providers, database and Stripe",
    );
    expect(pro).toHaveTextContent("Source ZIP delivered by claim email.");
    expect(
      within(free).getByRole("link", { name: "Explore Starter Free" }),
    ).toHaveAttribute("href", "/starters/free");
    expect(
      within(pro).getByRole("link", { name: "Explore Starter Pro" }),
    ).toHaveAttribute("href", "/starters/pro");
  });

  it("labels both screenshots as sample data and opens their product pages instead of full-size assets", () => {
    render(<StartersPage />);
    for (const name of ["Starter Free", "Starter Pro"]) {
      const article = screen.getByRole("article", { name });
      const preview = within(article).getByRole("link", {
        name: `Explore the ${name} preview`,
      });
      expect(preview).toHaveAttribute(
        "href",
        name === "Starter Free" ? "/starters/free" : "/starters/pro",
      );
      expect(within(preview).getByRole("img")).toHaveAccessibleName();
      expect(article.querySelector("figcaption")).toHaveTextContent(
        "Dashboard preview · Sample data",
      );
    }
  });

  it("clearly identifies the Free demo and public source with safe external links", () => {
    render(<StartersPage />);
    const demo = screen.getByRole("link", {
      name: "Try the Starter Free demo (opens in a new tab)",
    });
    expect(demo).toHaveAttribute("href", "https://starter-demo.pycolors.io");
    const repository = screen.getByRole("link", {
      name: "View source on GitHub (opens in a new tab)",
    });
    expect(repository).toHaveAttribute(
      "href",
      "https://github.com/pycolors-io/pycolors-starter-free",
    );
    for (const link of [demo, repository]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
    }
  });

  it("renders the shared eight-capability comparison once with accessible horizontal scrolling", () => {
    render(<StartersPage />);
    const tables = screen.getAllByRole("table", {
      name: "Compare Starter Free and Starter Pro",
    });
    expect(tables).toHaveLength(1);
    expect(within(tables[0]!).getAllByRole("rowheader")).toHaveLength(8);
    expect(
      screen.getByRole("region", {
        name: "Starter comparison, scroll horizontally for all columns",
      }),
    ).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByText(/does not automatically migrate your app or data/),
    ).toBeVisible();
    expect(document.querySelectorAll("#starter-comparison-setup")).toHaveLength(
      1,
    );
  });

  it("keeps the real purchase flow, duplicate-click guard and checkout destination", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        }),
    );
    render(<StartersPage />);
    const buttons = screen.getAllByRole("button", { name: "Buy Starter Pro" });
    expect(buttons).toHaveLength(1);
    const button = buttons[0]!;
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveTextContent("Opening checkout…");
    fireEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/api/v1/checkout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: "starter-pro" }),
        signal: expect.any(AbortSignal),
      },
    );
    finish(
      new Response(
        JSON.stringify({
          url: "https://checkout.example.com/controlled-checkout",
        }),
        { status: 200 },
      ),
    );
    await waitFor(() =>
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(
        "https://checkout.example.com/controlled-checkout",
      ),
    );
    expect(trackMoneyPathEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "checkout_redirect_started",
        productSlug: "starter-pro",
        page: "/starters",
      }),
    );
  });

  it("keeps purchase failures visible with a support destination", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(
      new Error("Controlled network failure"),
    );
    render(<StartersPage />);
    fireEvent.click(screen.getByRole("button", { name: "Buy Starter Pro" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Checkout could not be opened.",
    );
    expect(
      screen.getByRole("link", { name: "Contact purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("button", { name: "Buy Starter Pro" }),
    ).toBeEnabled();
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<StartersPage />);
    expect(await axe(container)).toHaveNoViolations();
  }, 15_000);
});

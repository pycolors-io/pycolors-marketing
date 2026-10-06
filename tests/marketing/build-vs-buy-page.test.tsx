import { existsSync } from "node:fs";
import { resolve } from "node:path";
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
import BuildVsBuyPage, {
  metadata,
} from "@/app/(site)/compare/build-vs-buy/page";
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

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("fetch", vi.fn());
  window.history.replaceState(null, "", "/compare/build-vs-buy");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

describe("Build versus buy decision page", () => {
  it("preserves SEO and existing deep links with accessible section navigation", () => {
    render(<BuildVsBuyPage />);
    expect(metadata.alternates?.canonical).toBe("/compare/build-vs-buy");
    expect(metadata.openGraph?.url).toBe("/compare/build-vs-buy");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const links = within(
      screen.getByRole("navigation", { name: "Comparison page sections" }),
    ).getAllByRole("link");
    expect(links).toHaveLength(4);
    for (const link of links) {
      expect(
        document.getElementById(link.getAttribute("href")!.slice(1)),
      ).toHaveAccessibleName();
    }
    for (const id of [
      "build-from-scratch",
      "buy-starter-pro",
      "cost-time-comparison",
      "included",
      "risks-tradeoffs",
    ]) {
      expect(document.getElementById(id)).toHaveAccessibleName();
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("exposes a keyboard-scrollable semantic comparison and honest ongoing costs", () => {
    render(<BuildVsBuyPage />);
    const table = screen.getByRole("table", {
      name: "Compare building from scratch with Starter Pro",
    });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(3);
    expect(within(table).getAllByRole("rowheader")).toHaveLength(7);
    expect(table).toHaveAccessibleDescription(
      /Both paths require product development, testing, deployment and maintenance/,
    );
    expect(table).toHaveTextContent("Configure and test your Stripe account");
    expect(table).toHaveTextContent(
      `${PRODUCT_DISPLAY["starter-pro"].priceLabel} + adaptation + services.`,
    );
    expect(table).toHaveTextContent(
      "Hosting, database, email and other providers are separate",
    );
    expect(
      screen.getByRole("region", {
        name: "Build versus buy comparison, scroll horizontally for all columns",
      }),
    ).toHaveAttribute("tabindex", "0");
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("lets readers evaluate both paths through valid product and documentation links", () => {
    render(<BuildVsBuyPage />);
    expect(
      screen.getByRole("link", { name: "Build with PyColors UI" }),
    ).toHaveAttribute("href", "/ui");
    expect(
      screen.getByRole("link", { name: "Compare Free and Pro" }),
    ).toHaveAttribute("href", "/upgrade");
    const nextStep = screen.getByRole("region", {
      name: "Choose with the product in front of you.",
    });
    expect(nextStep).toHaveTextContent(
      "Starter Free uses mocked auth, billing and product data.",
    );
    expect(nextStep).toHaveTextContent(
      `Planned regular price ${PRODUCT_DISPLAY["starter-pro"].regularPriceLabel}`,
    );
    expect(nextStep).toHaveTextContent(
      "after payment confirmation and delivery processing",
    );
    for (const link of document.querySelectorAll("main a")) {
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (!href.startsWith("/")) continue;
      const route = href.split("#")[0]!;
      const candidates = route.startsWith("/docs/")
        ? [
            resolve("content", `${route.slice(1)}.mdx`),
            resolve("content", route.slice(1), "index.mdx"),
          ]
        : [resolve("app/(site)", route.slice(1), "page.tsx")];
      expect(candidates.some(existsSync), href).toBe(true);
    }
  });

  it("keeps the real Starter Pro checkout contract and prevents duplicate requests", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        }),
    );
    render(<BuildVsBuyPage />);
    const button = screen.getByRole("button", {
      name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
    });
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
        body: JSON.stringify({ productSlug: "starter-pro" }),
        signal: expect.any(AbortSignal),
      },
    );
    finish(
      new Response(
        JSON.stringify({
          url: "https://checkout.example.com/controlled-comparison",
        }),
        { status: 200 },
      ),
    );
    await waitFor(() =>
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(
        "https://checkout.example.com/controlled-comparison",
      ),
    );
    expect(trackMoneyPathEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "checkout_redirect_started",
        productSlug: "starter-pro",
        page: "/compare/build-vs-buy",
      }),
    );
  });

  it("keeps support reachable if checkout fails", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(
      new Error("Controlled network failure"),
    );
    render(<BuildVsBuyPage />);
    fireEvent.click(
      screen.getByRole("button", {
        name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      }),
    );
    const alert = await screen.findByRole("alert");
    expect(
      within(alert).getByRole("link", { name: "Contact purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<BuildVsBuyPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

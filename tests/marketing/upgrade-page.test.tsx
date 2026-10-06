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
import UpgradePage, { metadata } from "@/app/(site)/upgrade/page";
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
const product = PRODUCT_DISPLAY["starter-pro"];
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("fetch", vi.fn());
  window.history.replaceState(null, "", "/upgrade");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

describe("Starter upgrade page", () => {
  it("preserves the canonical route and exposes labelled section and skip destinations", () => {
    render(<UpgradePage />);
    expect(metadata.alternates?.canonical).toBe("/upgrade");
    expect(metadata.openGraph?.url).toBe("/upgrade");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const links = within(
      screen.getByRole("navigation", { name: "Upgrade page sections" }),
    ).getAllByRole("link");
    expect(links).toHaveLength(5);
    for (const link of links) {
      expect(
        document.getElementById(link.getAttribute("href")!.slice(1)),
      ).toHaveAccessibleName();
    }
    expect(
      screen.getByRole("link", { name: "Compare Free and Pro" }),
    ).toHaveAttribute("href", "#upgrade-comparison");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("keeps the catalog offer and delivery conditions next to the purchase action", () => {
    render(<UpgradePage />);
    const purchase = screen.getByRole("complementary", {
      name: "Starter Pro purchase",
    });
    expect(within(purchase).getByText(product.priceLabel)).toBeVisible();
    expect(purchase).toHaveTextContent(
      `Planned regular price ${product.regularPriceLabel}`,
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
    expect(screen.getAllByRole("button", { name: /Starter Pro/ })).toHaveLength(
      2,
    );
  });

  it("integrates the full comparison without implying Free has real accounts or payments", () => {
    render(<UpgradePage />);
    const table = screen.getByRole("table", {
      name: "Compare Starter Free and Starter Pro",
    });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(3);
    expect(within(table).getAllByRole("rowheader")).toHaveLength(8);
    expect(table).toHaveTextContent("no real account or session is created");
    expect(table).toHaveTextContent("configure and test your Stripe account");
    expect(table).toHaveAccessibleDescription(
      /does not provision or deploy your app/,
    );
    expect(
      screen.getByRole("region", {
        name: "Starter comparison, scroll horizontally for all columns",
      }),
    ).toHaveAttribute("tabindex", "0");
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("explains migration and delivery with links to actual documentation and recovery", () => {
    render(<UpgradePage />);
    const path = screen.getByRole("region", {
      name: "A deliberate move from Free to Pro.",
    });
    expect(
      within(
        within(path).getByRole("list", { name: "Free to Pro upgrade steps" }),
      ).getAllByRole("listitem"),
    ).toHaveLength(3);
    expect(path).toHaveTextContent(
      "does not automatically migrate your app, move your data or deploy it",
    );
    const delivery = screen.getByRole("region", {
      name: "From purchase to your project.",
    });
    expect(delivery).toHaveTextContent(
      "After payment confirmation and delivery processing",
    );
    expect(
      within(delivery).getByRole("link", { name: "Recover purchase access" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(
      within(delivery).getByRole("link", { name: "Purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    for (const link of document.querySelectorAll("main a")) {
      const href = link.getAttribute("href")!;
      expect(link.querySelector("a,button")).toBeNull();
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

  it.each([
    `Buy Starter Pro — ${product.priceLabel}`,
    `Upgrade to Starter Pro — ${product.priceLabel}`,
  ])(
    "preserves real checkout payload, telemetry and pending guard for %s",
    async (label) => {
      let finish!: (response: Response) => void;
      vi.mocked(fetch).mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            finish = resolve;
          }),
      );
      render(<UpgradePage />);
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
          body: JSON.stringify({ productSlug: "starter-pro" }),
          signal: expect.any(AbortSignal),
        },
      );
      finish(
        new Response(
          JSON.stringify({
            url: "https://checkout.example.com/controlled-upgrade",
          }),
          { status: 200 },
        ),
      );
      await waitFor(() =>
        expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(
          "https://checkout.example.com/controlled-upgrade",
        ),
      );
      expect(trackMoneyPathEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "checkout_redirect_started",
          productSlug: "starter-pro",
          page: "/upgrade",
        }),
      );
    },
  );

  it("retains useful feedback when checkout fails", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(
      new Error("Controlled network failure"),
    );
    render(<UpgradePage />);
    fireEvent.click(
      screen.getByRole("button", {
        name: `Buy Starter Pro — ${product.priceLabel}`,
      }),
    );
    const alert = await screen.findByRole("alert");
    expect(
      within(alert).getByRole("link", { name: "Contact purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("keeps six independent FAQ answers and has no automated accessibility violations", async () => {
    const { container } = render(<UpgradePage />);
    const faq = screen.getByRole("region", {
      name: "Clear scope. Clear decision.",
    });
    const rows = [...faq.querySelectorAll("details")];
    expect(rows).toHaveLength(6);
    for (const row of rows) {
      fireEvent.click(row.querySelector("summary")!);
      expect(row.open).toBe(true);
    }
    expect(faq).toHaveTextContent(
      "does not automatically migrate your application or data",
    );
    expect(faq).toHaveTextContent(
      "Hosting and third-party services are separate",
    );
    expect(await axe(container)).toHaveNoViolations();
  }, 15000);
});

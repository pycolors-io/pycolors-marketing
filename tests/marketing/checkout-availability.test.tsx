import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.unmock("@/components/pricing/use-checkout-availability");
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
});
vi.mock("next/navigation", () => ({ usePathname: () => "/starters/mobile" }));
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { resetCheckoutAvailability } from "@/components/pricing/use-checkout-availability";

beforeEach(() => {
  resetCheckoutAvailability();
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function Buyer() {
  return (
    <BuyProductButton productSlug="starter-pro-mobile" label="Buy Mobile" />
  );
}

describe("server-controlled purchase availability", () => {
  it("keeps purchase disabled until availability is acknowledged and deduplicates public reads", async () => {
    let resolve!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise<Response>((done) => {
        resolve = done;
      }),
    );
    render(
      <>
        <Buyer />
        <BuyProductButton
          productSlug="starter-pro-fullstack"
          label="Buy Fullstack"
        />
      </>,
    );
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Buy Fullstack" }),
    ).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(1);
    resolve(
      Response.json({
        ok: true,
        products: {
          "starter-pro-mobile": { available: true },
          "starter-pro-fullstack": { available: false },
        },
      }),
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled(),
    );
    expect(
      screen.getByRole("button", { name: "Buy Fullstack" }),
    ).toBeDisabled();
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/api/v1/checkout/availability",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it.each([
    { ok: true, products: {} },
    { ok: true, products: { "starter-pro-mobile": { available: false } } },
    { ok: true, products: { "starter-pro-mobile": { available: "true" } } },
    { ok: false, products: { "starter-pro-mobile": { available: true } } },
  ])(
    "does not start checkout for missing, unavailable or malformed acknowledgements",
    async (payload) => {
      vi.mocked(fetch).mockResolvedValue(Response.json(payload));
      render(<Buyer />);
      await screen.findByText(
        "Checkout is currently unavailable. Please try again later or contact purchase support.",
      );
      fireEvent.click(screen.getByRole("button", { name: "Buy Mobile" }));
      expect(fetch).toHaveBeenCalledTimes(1);
    },
  );

  it("rechecks availability without sending a checkout request after a transient failure", async () => {
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: { "starter-pro-mobile": { available: true } },
        }),
      );
    render(<Buyer />);
    fireEvent.click(
      await screen.findByRole("button", {
        name: "Check checkout availability",
      }),
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled(),
    );
    expect(fetch).toHaveBeenCalledTimes(2);
    for (const [, options] of vi.mocked(fetch).mock.calls)
      expect(options).not.toHaveProperty("method", "POST");
  });

  it("fails closed without displaying private transport diagnostics", async () => {
    vi.mocked(fetch).mockRejectedValue(
      new Error("private-token-and-buyer@example.com"),
    );
    const { container } = render(<Buyer />);
    await screen.findByRole("status");
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeDisabled();
    expect(container).not.toHaveTextContent("private-token");
    expect(container).not.toHaveTextContent("buyer@example.com");
  });

  it("refreshes repeated controls and other offers together from one retry", async () => {
    let resolveRefresh!: (value: Response) => void;
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: {
            "starter-pro": { available: true },
            "starter-pro-mobile": { available: false },
            "starter-pro-fullstack": { available: true },
          },
        }),
      )
      .mockReturnValueOnce(
        new Promise<Response>((resolve) => {
          resolveRefresh = resolve;
        }),
      );
    render(
      <>
        <Buyer />
        <BuyProductButton
          productSlug="starter-pro-mobile"
          label="Buy Mobile again"
        />
        <BuyProductButton
          productSlug="starter-pro-fullstack"
          label="Buy Fullstack"
        />
        <BuyStarterProButton label="Buy Web" />
      </>,
    );
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Buy Fullstack" }),
      ).toBeEnabled(),
    );
    expect(screen.getByRole("button", { name: "Buy Web" })).toBeEnabled();
    fireEvent.click(
      screen.getAllByRole("button", {
        name: "Check checkout availability",
      })[0]!,
    );
    for (const label of [
      "Buy Mobile",
      "Buy Mobile again",
      "Buy Fullstack",
      "Buy Web",
    ])
      expect(screen.getByRole("button", { name: label })).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(2);

    resolveRefresh(
      Response.json({
        ok: true,
        products: {
          "starter-pro": { available: true },
          "starter-pro-mobile": { available: true },
          "starter-pro-fullstack": { available: false },
        },
      }),
    );
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled();
      expect(
        screen.getByRole("button", { name: "Buy Mobile again" }),
      ).toBeEnabled();
      expect(screen.getByRole("button", { name: "Buy Web" })).toBeEnabled();
      expect(
        screen.getByRole("button", { name: "Buy Fullstack" }),
      ).toBeDisabled();
    });
    for (const [, options] of vi.mocked(fetch).mock.calls)
      expect(options).not.toHaveProperty("method", "POST");
  });

  it("ignores an old response after a newer availability read closes the offers", async () => {
    const now = vi.spyOn(Date, "now").mockReturnValue(1_000);
    let resolveOld!: (value: Response) => void;
    vi.mocked(fetch)
      .mockReturnValueOnce(
        new Promise<Response>((resolve) => {
          resolveOld = resolve;
        }),
      )
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: {
            "starter-pro-mobile": { available: false },
            "starter-pro-fullstack": { available: false },
          },
        }),
      );
    render(<Buyer />);
    now.mockReturnValue(22_000);
    render(
      <BuyProductButton
        productSlug="starter-pro-fullstack"
        label="Buy Fullstack"
      />,
    );
    await screen.findAllByRole("button", {
      name: "Check checkout availability",
    });
    await act(async () => {
      resolveOld(
        Response.json({
          ok: true,
          products: {
            "starter-pro-mobile": { available: true },
            "starter-pro-fullstack": { available: true },
          },
        }),
      );
    });
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Buy Fullstack" }),
    ).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("renders disabled on the server without reading or reusing browser availability", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({
        ok: true,
        products: { "starter-pro-mobile": { available: true } },
      }),
    );
    render(<Buyer />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled(),
    );
    const markup = document.createElement("div");
    markup.innerHTML = renderToString(<Buyer />);
    expect(markup.querySelector("button")).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

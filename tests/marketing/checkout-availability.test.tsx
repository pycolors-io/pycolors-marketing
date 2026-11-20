import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
import { resetCheckoutAvailability } from "@/components/pricing/use-checkout-availability";

beforeEach(() => {
  resetCheckoutAvailability();
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => {
  vi.unstubAllGlobals();
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
});

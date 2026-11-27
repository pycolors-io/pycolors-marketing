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
import {
  CHECKOUT_AVAILABILITY_TIMEOUT_MS,
  getCheckoutAvailability,
} from "@/lib/api/client";

beforeEach(() => {
  resetCheckoutAvailability();
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function Buyer() {
  return (
    <BuyProductButton productSlug="starter-pro-mobile" label="Buy Mobile" />
  );
}

describe("server-controlled purchase availability", () => {
  it("recovers all mounted controls on reconnect after an HTTP failure, without reloading or starting checkout", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({}, { status: 500 }))
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: {
            "starter-pro": { available: true },
            "starter-pro-mobile": { available: true },
          },
        }),
      );
    render(
      <>
        <Buyer />
        <BuyStarterProButton label="Buy Web" />
      </>,
    );
    await screen.findAllByRole("button", {
      name: "Check checkout availability",
    });
    await act(async () => {
      window.dispatchEvent(new Event("online"));
    });
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled(),
    );
    expect(screen.getByRole("button", { name: "Buy Web" })).toBeEnabled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(
      vi
        .mocked(fetch)
        .mock.calls.every(([, options]) => options?.method !== "POST"),
    ).toBe(true);
  });

  it("revalidates an expired acknowledgement on focus and deduplicates simultaneous visibility changes", async () => {
    const now = vi.spyOn(Date, "now").mockReturnValue(1_000);
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: { "starter-pro-mobile": { available: true } },
        }),
      )
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: { "starter-pro-mobile": { available: false } },
        }),
      );
    render(<Buyer />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled(),
    );
    now.mockReturnValue(22_000);
    await act(async () => {
      window.dispatchEvent(new Event("focus"));
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("automatically recovers a transient transport failure while preserving disabled controls until a valid acknowledgement", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: { "starter-pro-mobile": { available: true } },
        }),
      );
    render(<Buyer />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeDisabled();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(20_000);
    });
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("bounds automatic retries and removes timers and browser listeners when controls unmount", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    const view = render(<Buyer />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(120_000);
    });
    expect(fetch).toHaveBeenCalledTimes(4);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300_000);
    });
    expect(fetch).toHaveBeenCalledTimes(4);
    view.unmount();
    window.dispatchEvent(new Event("online"));
    window.dispatchEvent(new Event("focus"));
    document.dispatchEvent(new Event("visibilitychange"));
    expect(fetch).toHaveBeenCalledTimes(4);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("keeps an explicitly closed offer disabled without treating it as a retryable network error", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockResolvedValue(
      Response.json({
        ok: true,
        products: { "starter-pro-mobile": { available: false } },
      }),
    );
    render(<Buyer />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300_000);
    });
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("waits until the document is visible before recovering an interrupted background retry", async () => {
    vi.useFakeTimers();
    const visibility = vi
      .spyOn(document, "visibilityState", "get")
      .mockReturnValue("visible");
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          products: { "starter-pro-mobile": { available: true } },
        }),
      );
    render(<Buyer />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    visibility.mockReturnValue("hidden");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(20_000);
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    visibility.mockReturnValue("visible");
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toBeEnabled();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it.each(["fetch", "body"])(
    "bounds a stalled availability %s even when abort is ignored",
    async (phase) => {
      vi.useFakeTimers();
      const unresolved = new Promise<never>(() => {});
      const response = Response.json({});
      vi.spyOn(response, "json").mockReturnValue(unresolved);
      vi.mocked(fetch).mockReturnValue(
        phase === "fetch" ? unresolved : Promise.resolve(response),
      );
      const pending = getCheckoutAvailability();
      const rejected = expect(pending).rejects.toThrow(
        "Checkout availability is unavailable.",
      );
      await vi.advanceTimersByTimeAsync(CHECKOUT_AVAILABILITY_TIMEOUT_MS);
      await rejected;
      expect(vi.mocked(fetch).mock.calls[0]?.[1]?.signal?.aborted).toBe(true);
      expect(vi.getTimerCount()).toBe(0);
    },
  );

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
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
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
    expect(screen.getByRole("button", { name: "Buy Mobile" })).toHaveAttribute(
      "aria-busy",
      "false",
    );
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

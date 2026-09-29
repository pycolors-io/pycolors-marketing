import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import {
  CHECKOUT_TIMEOUT_MS,
  createCheckoutSession,
  createStarterProCheckout,
} from "@/lib/api/client";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { trackMoneyPathEvent } from "@/lib/analytics";

const path = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
  return { current: "/pricing" };
});
vi.mock("next/navigation", () => ({ usePathname: () => path.current }));
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));

const url = "https://checkout.example.com/pay/cs_test_synthetic";
const safeError = "Unable to create checkout session.";
const sensitive = "SYNTHETIC_SECRET synthetic@example.com";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

beforeEach(() => {
  vi.resetAllMocks();
  path.current = "/pricing";
  vi.useFakeTimers();
  // Every fetch is intercepted; no payment-service/network request is possible.
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("Unexpected outbound request");
    }),
  );
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("real checkout client", () => {
  it.each([url, "https://checkout.stripe.com/c/pay/cs_test_synthetic"])(
    "accepts hosted/custom domain %s and preserves payload",
    async (destination) => {
      vi.mocked(fetch).mockResolvedValue(Response.json({ url: destination }));
      await expect(
        createCheckoutSession({
          productSlug: "na-ai-landing",
          email: "synthetic@example.com",
        }),
      ).resolves.toBe(destination);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.example.com/api/v1/checkout",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productSlug: "na-ai-landing",
            email: "synthetic@example.com",
          }),
          signal: expect.any(AbortSignal),
        }),
      );
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it("keeps the legacy Starter Pro helper compatible", async () => {
    vi.mocked(fetch).mockResolvedValue(Response.json({ url }));
    await createStarterProCheckout({ email: "synthetic@example.com" });
    expect(
      JSON.parse(String(vi.mocked(fetch).mock.calls[0]?.[1]?.body)),
    ).toEqual({
      productSlug: "starter-pro",
      email: "synthetic@example.com",
    });
  });

  it.each([400, 500, 502, 503])(
    "handles HTTP %s without exposing arbitrary error text",
    async (status) => {
      vi.mocked(fetch).mockResolvedValue(
        Response.json({ error: sensitive }, { status }),
      );
      await expect(
        createCheckoutSession({ productSlug: "starter-pro" }),
      ).rejects.toThrow(safeError);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it.each([
    null,
    {},
    [],
    { url: 123 },
    { url: "" },
    { url: " " },
    { url: "/pay" },
    { url: "javascript:alert(1)" },
    { url: "http://checkout.example.com/pay" },
    { url: "https://user:pass@checkout.example.com/pay" },
  ])("rejects malformed success %j", async (data) => {
    vi.mocked(fetch).mockResolvedValue(Response.json(data));
    await expect(
      createCheckoutSession({ productSlug: "starter-pro" }),
    ).rejects.toThrow(safeError);
  });

  it("rejects HTML and network failures safely", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(`<html>${sensitive}</html>`),
    );
    vi.mocked(fetch).mockRejectedValueOnce(new Error(sensitive));
    for (let i = 0; i < 2; i++) {
      await expect(
        createCheckoutSession({ productSlug: "starter-pro" }),
      ).rejects.toThrow(safeError);
    }
  });

  it.each(["fetch", "body"])(
    "bounds stalled %s, even if abort is ignored",
    async (phase) => {
      const pending = deferred<Response>();
      const body = deferred<unknown>();
      vi.mocked(fetch).mockImplementation(() =>
        phase === "fetch"
          ? pending.promise
          : Promise.resolve({
              ok: true,
              json: () => body.promise,
            } as Response),
      );
      const result = createCheckoutSession({ productSlug: "starter-pro" });
      const rejected = expect(result).rejects.toThrow(safeError);
      await vi.advanceTimersByTimeAsync(CHECKOUT_TIMEOUT_MS);
      await rejected;
      expect(vi.mocked(fetch).mock.calls[0]?.[1]?.signal?.aborted).toBe(true);
      pending.resolve(Response.json({ url }));
      body.resolve({ url });
      await Promise.resolve();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it("honors pre-abort without sending a request and removes listeners on success", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(
      createCheckoutSession(
        { productSlug: "starter-pro" },
        { signal: controller.signal },
      ),
    ).rejects.toThrow(safeError);
    expect(fetch).not.toHaveBeenCalled();
    const live = new AbortController();
    const remove = vi.spyOn(live.signal, "removeEventListener");
    vi.mocked(fetch).mockResolvedValue(Response.json({ url }));
    await createCheckoutSession(
      { productSlug: "starter-pro" },
      { signal: live.signal },
    );
    expect(remove).toHaveBeenCalledWith("abort", expect.any(Function));
  });
});

describe.each(["product", "starter"])(
  "%s real purchase interaction",
  (variant) => {
    function button(slug = "na-ai-landing") {
      return variant === "starter" ? (
        <BuyStarterProButton />
      ) : (
        <BuyProductButton
          productSlug={slug}
          customerEmail="synthetic@example.com"
          label="Buy template"
        />
      );
    }
    async function click() {
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });
    }

    it("sends one pending request even before disabled commits, then navigates", async () => {
      const pending = deferred<Response>();
      vi.mocked(fetch).mockReturnValue(pending.promise);
      render(button());
      act(() => {
        const target = screen.getByRole("button");
        fireEvent.click(target);
        fireEvent.click(target);
      });
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
      expect(
        JSON.parse(String(vi.mocked(fetch).mock.calls[0]?.[1]?.body)),
      ).toEqual(
        variant === "starter"
          ? { productSlug: "starter-pro" }
          : { productSlug: "na-ai-landing", email: "synthetic@example.com" },
      );
      await act(async () => pending.resolve(Response.json({ url })));
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(url);
    });

    it("restores safe recovery after timeout and ignores a late old response during retry", async () => {
      const old = deferred<Response>();
      const retry = deferred<Response>();
      vi.mocked(fetch)
        .mockReturnValueOnce(old.promise)
        .mockReturnValueOnce(retry.promise);
      render(button());
      screen.getByRole("button").focus();
      await click();
      await act(async () => vi.advanceTimersByTimeAsync(CHECKOUT_TIMEOUT_MS));
      expect(screen.getByRole("alert")).toHaveTextContent(
        "before paying again",
      );
      expect(
        screen.getByRole("link", { name: "Contact purchase support" }),
      ).toHaveAttribute("href", "/orders/support");
      expect(screen.getByRole("button")).toBeEnabled();
      expect(screen.getByRole("button")).toHaveFocus();
      expect(fetch).toHaveBeenCalledTimes(1); // No automatic retry.
      await click();
      await act(async () => old.resolve(Response.json({ url: `${url}-old` })));
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.queryByRole("alert")).toBeNull();
      expect(navigateToCheckout).not.toHaveBeenCalled();
      await act(async () => retry.resolve(Response.json({ url })));
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(url);
    });

    it.each(["unmount", "pagehide", "route change"])(
      "abandons on %s and ignores late resolution",
      async (action) => {
        const pending = deferred<Response>();
        vi.mocked(fetch).mockReturnValue(pending.promise);
        const view = render(button());
        await click();
        await act(async () => {
          if (action === "unmount") view.unmount();
          else if (action === "pagehide")
            window.dispatchEvent(new Event("pagehide"));
          else {
            path.current = "/another-page";
            view.rerender(button());
          }
        });
        expect(vi.mocked(fetch).mock.calls[0]?.[1]?.signal?.aborted).toBe(true);
        await act(async () => pending.resolve(Response.json({ url })));
        expect(navigateToCheckout).not.toHaveBeenCalled();
        expect(screen.queryByRole("alert")).toBeNull();
        if (action !== "unmount")
          expect(screen.getByRole("button")).toBeEnabled();
        expect(vi.getTimerCount()).toBe(0);
      },
    );

    it("contains throwing telemetry on failure, retry and success", async () => {
      vi.mocked(trackMoneyPathEvent).mockImplementation(() => {
        throw new Error(sensitive);
      });
      vi.mocked(fetch)
        .mockRejectedValueOnce(new Error(sensitive))
        .mockResolvedValueOnce(Response.json({ url }));
      render(button());
      await click();
      expect(screen.getByRole("alert")).not.toHaveTextContent(sensitive);
      expect(screen.getByRole("button")).toBeEnabled();
      await click();
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(url);
      expect(
        vi.mocked(trackMoneyPathEvent).mock.calls.map(([event]) => event.event),
      ).toEqual([
        "buy_clicked",
        "checkout_redirect_failed",
        "buy_clicked",
        "checkout_redirect_started",
      ]);
    });
  },
);

it("resets an abandoned A → B → A identity and ignores old work during retry", async () => {
  const old = deferred<Response>();
  const current = deferred<Response>();
  vi.mocked(fetch)
    .mockReturnValueOnce(old.promise)
    .mockReturnValueOnce(current.promise);
  const view = render(
    <BuyProductButton productSlug="na-ai-landing" label="Buy" />,
  );
  await act(async () => fireEvent.click(screen.getByRole("button")));
  view.rerender(<BuyProductButton productSlug="starter-pro" label="Buy" />);
  view.rerender(<BuyProductButton productSlug="na-ai-landing" label="Buy" />);
  expect(screen.getByRole("button")).toBeEnabled();
  await act(async () => fireEvent.click(screen.getByRole("button")));
  await act(async () => old.reject(new Error(sensitive)));
  expect(screen.queryByRole("alert")).toBeNull();
  expect(screen.getByRole("button")).toBeDisabled();
  await act(async () => current.resolve(Response.json({ url })));
  expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(url);
});

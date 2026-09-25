import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import CheckoutCancelPage from "../../app/(site)/checkout/cancel/page";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import {
  createCheckoutSession,
  createStarterProCheckout,
} from "@/lib/api/client";
import { trackMoneyPathEvent } from "@/lib/analytics";

vi.mock("@/lib/api/client", () => ({
  createCheckoutSession: vi.fn(),
  createStarterProCheckout: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackMoneyPathEvent: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubGlobal("fetch", vi.fn());
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

describe("Interrupted checkout", () => {
  it("does not infer payment failure from the cancellation route", async () => {
    const { container } = render(<CheckoutCancelPage />);

    expect(container).not.toHaveTextContent(
      /No payment captured|no order was created|Your card was not charged/i,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Checkout interrupted",
    );
    expect(screen.getByText(/This page cannot confirm/)).toHaveTextContent(
      "whether a payment went through",
    );
    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("link", { name: "Recover purchase access" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(
      screen.getByRole("link", { name: /Return to pricing/ }),
    ).toHaveAttribute("href", "/pricing");
    expect(fetch).not.toHaveBeenCalled();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});

const checkoutCases = [
  {
    name: "Starter Pro",
    productSlug: "starter-pro",
    renderButton: () => <BuyStarterProButton />,
    request: vi.mocked(createStarterProCheckout),
  },
  {
    name: "template",
    productSlug: "na-ai-landing",
    renderButton: () => (
      <BuyProductButton productSlug="na-ai-landing" label="Buy template" />
    ),
    request: vi.mocked(createCheckoutSession),
  },
];

describe.each(checkoutCases)(
  "$name checkout",
  ({ renderButton, request, productSlug }) => {
    it.each([new Error("Internal provider diagnostic"), "Network unavailable"])(
      "announces a safe failure and offers support: %s",
      async (failure) => {
        request.mockRejectedValueOnce(failure);
        const { container } = render(renderButton());

        fireEvent.click(screen.getByRole("button"));
        const alert = await screen.findByRole("alert");
        expect(alert).toHaveTextContent("Checkout could not be opened");
        expect(alert).toHaveTextContent("before paying again");
        expect(alert).not.toHaveTextContent("Internal provider diagnostic");
        expect(
          screen.getByRole("link", { name: "Contact purchase support" }),
        ).toHaveAttribute("href", "/orders/support");
        expect(screen.getByRole("button")).toBeEnabled();
        expect(window.location.hash).toBe("");
        expect(trackMoneyPathEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            event: "checkout_redirect_failed",
            productSlug,
            status: "error",
          }),
        );
        await expect(axe(container)).resolves.toHaveNoViolations();
      },
    );

    it("allows a deliberate retry and preserves successful checkout navigation", async () => {
      let completeCheckout!: (url: string) => void;
      request.mockRejectedValueOnce(new Error("Temporary failure"));
      request.mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            completeCheckout = resolve;
          }),
      );
      render(renderButton());

      fireEvent.click(screen.getByRole("button"));
      await screen.findByRole("alert");
      fireEvent.click(screen.getByRole("button"));
      expect(screen.queryByRole("alert")).toBeNull();
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
      fireEvent.click(screen.getByRole("button"));
      expect(request).toHaveBeenCalledTimes(2);

      // A same-document destination exercises navigation without leaving jsdom.
      completeCheckout("#checkout-test-destination");
      await waitFor(() =>
        expect(window.location.hash).toBe("#checkout-test-destination"),
      );
      expect(screen.queryByRole("alert")).toBeNull();
      expect(trackMoneyPathEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "checkout_redirect_started",
          productSlug,
        }),
      );
    });
  },
);

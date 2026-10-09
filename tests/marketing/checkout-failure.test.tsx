import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import CheckoutCancelPage, {
  metadata,
} from "../../app/(site)/checkout/cancel/page";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { trackMoneyPathEvent } from "@/lib/analytics";

vi.hoisted(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
});
vi.mock("next/navigation", () => ({ usePathname: () => "/pricing" }));
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
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
    expect(metadata.title).toBe("Checkout interrupted");
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
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
    expect(screen.getByText(/Opening this page/)).toHaveTextContent(
      "does not cancel a payment or change an existing order",
    );
    expect(
      screen.getByRole("region", { name: "Payment declined or interrupted?" }),
    ).toHaveTextContent(
      "If you have not completed a payment and are not waiting for a pending one",
    );
    expect(
      screen.getByRole("region", { name: "Already tried to pay?" }),
    ).toHaveTextContent("contact support before starting another checkout");
    expect(
      screen.getByRole("link", { name: "Starter Pro purchase help" }),
    ).toHaveAttribute("href", "/docs/starter-pro/purchase-recovery");
    expect(fetch).not.toHaveBeenCalled();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});

const checkoutCases = [
  {
    name: "Starter Pro",
    productSlug: "starter-pro",
    renderButton: () => <BuyStarterProButton />,
  },
  {
    name: "template",
    productSlug: "na-ai-landing",
    renderButton: () => (
      <BuyProductButton productSlug="na-ai-landing" label="Buy template" />
    ),
  },
];

describe.each(checkoutCases)(
  "$name checkout",
  ({ renderButton, productSlug }) => {
    const request = () => vi.mocked(fetch);
    it.each([new Error("Internal provider diagnostic"), "Network unavailable"])(
      "announces a safe failure and offers support: %s",
      async (failure) => {
        request().mockRejectedValueOnce(failure);
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
      let completeCheckout!: (response: Response) => void;
      request().mockRejectedValueOnce(new Error("Temporary failure"));
      request().mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
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
      expect(fetch).toHaveBeenCalledTimes(2);

      // Only the browser navigation boundary is mocked.
      completeCheckout(
        Response.json({ url: "https://checkout.example.com/pay" }),
      );
      await waitFor(() =>
        expect(navigateToCheckout).toHaveBeenCalledWith(
          "https://checkout.example.com/pay",
        ),
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

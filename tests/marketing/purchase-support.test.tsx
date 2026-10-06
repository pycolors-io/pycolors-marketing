import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import PurchaseSupportPage from "../../app/(site)/orders/support/page";
import ClaimOrderPage from "../../app/(site)/orders/claim/page";
import CheckoutCancelPage from "../../app/(site)/checkout/cancel/page";
import { SupportEmail } from "../../components/marketing/support-email";

vi.mock("@/components/analytics/money-path-event", () => ({
  MoneyPathPageEvent: () => null,
}));

const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);

describe("Purchase support", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    if (originalClipboard) {
      Object.defineProperty(navigator, "clipboard", originalClipboard);
    } else {
      Reflect.deleteProperty(navigator, "clipboard");
    }
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("offers accessible email contact, a fallback and recovery without contacting the API", async () => {
    const { container } = render(<PurchaseSupportPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Get help with your purchase",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const topics = screen.getByRole("navigation", {
      name: "Purchase support topics",
    });
    for (const link of within(topics).getAllByRole("link")) {
      const target = document.getElementById(
        link.getAttribute("href")!.slice(1),
      );
      expect(target).toHaveAccessibleName();
      expect(target).toBeVisible();
    }
    expect(
      screen.getByRole("link", { name: "Write to support" }),
    ).toHaveAttribute(
      "href",
      "mailto:support@pycolors.com?subject=PyColors%20purchase%20support",
    );
    expect(
      screen.getByRole("link", { name: "support@pycolors.com" }),
    ).toHaveAttribute("href", "mailto:support@pycolors.com");
    expect(
      screen.getByText(/If nothing opens, copy the address/),
    ).toHaveTextContent("it does not send a request");
    expect(screen.getByText(/Do not send passwords/)).toHaveTextContent(
      "claim/download links",
    );
    expect(
      screen.getByRole("link", { name: "Recover purchase access" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(fetch).not.toHaveBeenCalled();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("copies only the support address and announces success after the clipboard resolves", async () => {
    let finishCopy!: () => void;
    const writeText = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishCopy = resolve;
        }),
    );
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<SupportEmail email="support@pycolors.com" />);
    const copyButton = screen.getByRole("button", {
      name: "Copy support email",
    });

    fireEvent.click(copyButton);
    expect(copyButton).toBeDisabled();
    expect(writeText).toHaveBeenCalledExactlyOnceWith("support@pycolors.com");
    expect(screen.getByRole("status")).not.toHaveTextContent(
      "Email address copied.",
    );

    finishCopy();
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Email address copied.",
      ),
    );
    expect(copyButton).toBeEnabled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each(["blocked", "unavailable"])(
    "keeps the email usable when copying is %s",
    async (failure) => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value:
          failure === "blocked"
            ? {
                writeText: vi
                  .fn()
                  .mockRejectedValue(new Error("Clipboard blocked")),
              }
            : undefined,
      });
      render(<SupportEmail email="support@pycolors.com" />);

      fireEvent.click(
        screen.getByRole("button", { name: "Copy support email" }),
      );
      await waitFor(() =>
        expect(screen.getByRole("status")).toHaveTextContent(
          "Copy unavailable. Select the address to copy it.",
        ),
      );
      expect(
        screen.getByRole("link", { name: "support@pycolors.com" }),
      ).toHaveAttribute("href", "mailto:support@pycolors.com");
      expect(
        screen.getByRole("button", { name: "Copy support email" }),
      ).toBeEnabled();
      expect(fetch).not.toHaveBeenCalled();
    },
  );

  it("keeps recovery limits, optional purchase details and consumer guidance visible", () => {
    render(<PurchaseSupportPage />);

    const recovery = screen.getByRole("region", {
      name: "Missing or expired access link?",
    });
    expect(recovery).toHaveTextContent(
      "The recovery form cannot change the purchase email.",
    );
    expect(recovery).toHaveTextContent(
      "The recovery confirmation does not prove an email was delivered.",
    );
    const details = screen.getByRole("region", {
      name: "Include these details",
    });
    expect(details).toHaveTextContent(
      "You can still contact us if you do not have an order reference.",
    );
    expect(details).toHaveTextContent(
      "No response-time or resolution-time guarantee is promised.",
    );
    expect(
      screen.getByRole("region", { name: "Email purchase support" }),
    ).toHaveTextContent("contact support before purchasing again");

    const refunds = screen.getByRole("region", {
      name: "Withdrawal, refunds, or a product problem?",
    });
    expect(refunds).toBeVisible();
    expect(refunds).toHaveTextContent(
      "Digital delivery does not automatically remove consumer rights.",
    );
    expect(refunds).toHaveTextContent(
      "A statutory withdrawal does not require you to give a reason.",
    );
    expect(
      within(refunds).getByRole("link", {
        name: "Withdrawal and refund conditions",
      }),
    ).toHaveAttribute("href", "/terms#terms-delivery-refunds");

    const documents = screen.getByRole("region", {
      name: "Need a receipt or invoice?",
    });
    expect(documents).toHaveTextContent(
      "Your product access email and order reference are separate from a payment receipt or invoice.",
    );
    expect(
      within(documents).getByRole("link", {
        name: "Starter Pro receipts and invoices",
      }),
    ).toHaveAttribute("href", "/docs/starter-pro/purchase-documents");
  });

  it("offers support when checkout is cancelled", () => {
    render(<CheckoutCancelPage />);

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
  });

  it("offers support without requiring a claim token", async () => {
    render(await ClaimOrderPage({ searchParams: Promise.resolve({}) }));

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("keeps unavailable access recoverable without passing the token to support", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({ ok: false }, { status: 410 }),
    );
    render(
      await ClaimOrderPage({
        searchParams: Promise.resolve({ token: "expired-test-token" }),
      }),
    );

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("link", { name: "Resend access link" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(screen.queryByRole("link", { name: /Download package/ })).toBeNull();
  });

  it("preserves the download while keeping buyer data out of the support destination", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({
        ok: true,
        claim: {
          productSlug: "starter-pro",
          productName: "Starter Pro",
          orderReference: "test-order-reference",
          customerEmail: "buyer@example.com",
          paidAt: null,
        },
      }),
    );
    render(
      await ClaimOrderPage({
        searchParams: Promise.resolve({ token: "valid-test-token" }),
      }),
    );

    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("link", { name: /Download package/ }),
    ).toHaveAttribute(
      "href",
      "https://api.example.com/api/v1/downloads/valid-test-token",
    );
  });
});

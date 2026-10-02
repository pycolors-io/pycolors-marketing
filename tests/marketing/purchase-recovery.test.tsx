import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import RecoverOrderPage from "../../app/(site)/orders/recover/page";
import { recoverCommerceAccess } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  recoverCommerceAccess: vi.fn(),
  RECOVERY_FAILURE_MESSAGE:
    "Unable to request your access link. Please try again or contact support.",
}));

vi.mock("@/lib/analytics", () => ({
  trackMoneyPathEvent: vi.fn(),
}));

function submitRecovery(productSlug = "starter-pro") {
  fireEvent.change(screen.getByRole("textbox", { name: /^Purchase email/ }), {
    target: { value: "buyer@example.com" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: "Product" }), {
    target: { value: productSlug },
  });
  fireEvent.click(screen.getByRole("button", { name: "Resend access link" }));
}

describe("Purchase recovery guidance", () => {
  it("requires a product before submitting and never discovers ownership", () => {
    render(<RecoverOrderPage />);
    const email = screen.getByRole("textbox", { name: /^Purchase email/ });
    fireEvent.change(email, { target: { value: "buyer@example.com" } });
    fireEvent.submit(email.closest("form")!);
    expect(recoverCommerceAccess).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("submits the selected NA-AI product with the same neutral confirmation", async () => {
    vi.mocked(recoverCommerceAccess).mockResolvedValue({ ok: true });
    render(<RecoverOrderPage />);
    submitRecovery("na-ai-landing");
    expect(await screen.findByRole("status")).toHaveTextContent(
      "does not verify a purchase or email delivery",
    );
    expect(recoverCommerceAccess).toHaveBeenCalledExactlyOnceWith({
      email: "buyer@example.com",
      productSlug: "na-ai-landing",
    });
  });
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("keeps the recovery and support steps accessible before submission", async () => {
    const { container } = render(<RecoverOrderPage />);

    expect(
      screen.getByRole("textbox", { name: /^Purchase email/ }),
    ).toBeRequired();
    expect(
      screen.getByRole("link", { name: "Starter Pro purchase recovery guide" }),
    ).toHaveAttribute("href", "/docs/starter-pro/purchase-recovery");
    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(screen.getByText(/wait at least 30 minutes/)).toBeInTheDocument();
    const product = screen.getByRole("combobox", { name: "Product" });
    expect(product).toBeRequired();
    expect(product).toHaveValue("");
    expect(
      screen.getByRole("option", { name: "PyColors Starter Pro" }),
    ).toHaveValue("starter-pro");
    expect(
      screen.getByRole("option", { name: "NA-AI — AI Analytics Landing Page" }),
    ).toHaveValue("na-ai-landing");
    expect(recoverCommerceAccess).not.toHaveBeenCalled();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("announces a neutral confirmation without claiming purchase or email delivery", async () => {
    let finishRequest!: () => void;
    vi.mocked(recoverCommerceAccess).mockImplementation(
      () =>
        new Promise((resolve) => {
          finishRequest = () => resolve({ ok: true });
        }),
    );
    const { container } = render(<RecoverOrderPage />);

    submitRecovery();
    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Product" })).toBeDisabled();
    // Reentrant submit events must not create a second request while pending.
    fireEvent.submit(
      screen.getByRole("button", { name: "Sending..." }).closest("form")!,
    );
    expect(recoverCommerceAccess).toHaveBeenCalledTimes(1);

    finishRequest();
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("If eligible purchase access is found");
    expect(status).toHaveTextContent(
      "does not verify a purchase or email delivery",
    );
    expect(status).not.toHaveTextContent("has been sent");
    expect(recoverCommerceAccess).toHaveBeenCalledExactlyOnceWith({
      email: "buyer@example.com",
      productSlug: "starter-pro",
    });
    expect(screen.getByRole("link", { name: "Contact support" })).toBeVisible();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("announces a failed request, preserves the email, and allows a retry", async () => {
    vi.mocked(recoverCommerceAccess)
      .mockRejectedValueOnce(new Error("synthetic-private-detail"))
      .mockResolvedValueOnce({ ok: true });
    const { container } = render(<RecoverOrderPage />);

    submitRecovery();
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Unable to request your access link.");
    expect(alert.textContent?.includes("synthetic-private-detail")).toBe(false);
    expect(alert).toHaveTextContent(
      "contact support before making another purchase",
    );
    expect(
      screen.getByRole("textbox", { name: /^Purchase email/ }),
    ).toHaveValue("buyer@example.com");
    expect(screen.getByRole("combobox", { name: "Product" })).toHaveValue(
      "starter-pro",
    );
    expect(screen.getByRole("combobox", { name: "Product" })).toBeEnabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    await expect(axe(container)).resolves.toHaveNoViolations();

    fireEvent.click(screen.getByRole("button", { name: "Resend access link" }));
    expect(await screen.findByRole("status")).toBeVisible();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(recoverCommerceAccess).toHaveBeenCalledTimes(2);
  });
});

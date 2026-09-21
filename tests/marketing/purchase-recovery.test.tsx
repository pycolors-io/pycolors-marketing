import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import RecoverOrderPage from "../../app/(site)/orders/recover/page";
import { recoverCommerceAccess } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  recoverCommerceAccess: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackMoneyPathEvent: vi.fn(),
}));

function submitRecovery() {
  fireEvent.change(screen.getByRole("textbox", { name: /^Purchase email/ }), {
    target: { value: "buyer@example.com" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Resend access link" }));
}

describe("Purchase recovery guidance", () => {
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
    ).toHaveAttribute(
      "href",
      "mailto:support@pycolors.com?subject=PyColors%20access%20recovery",
    );
    expect(screen.getByText(/wait at least 30 minutes/)).toBeInTheDocument();
    expect(recoverCommerceAccess).not.toHaveBeenCalled();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("announces a neutral confirmation without claiming purchase or email delivery", async () => {
    let finishRequest!: () => void;
    vi.mocked(recoverCommerceAccess).mockImplementation(
      () =>
        new Promise((resolve) => {
          finishRequest = () => resolve(null);
        }),
    );
    const { container } = render(<RecoverOrderPage />);

    submitRecovery();
    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    finishRequest();
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("If eligible purchase access is found");
    expect(status).toHaveTextContent(
      "does not verify a purchase or email delivery",
    );
    expect(status).not.toHaveTextContent("has been sent");
    expect(recoverCommerceAccess).toHaveBeenCalledExactlyOnceWith({
      email: "buyer@example.com",
    });
    expect(screen.getByRole("link", { name: "Contact support" })).toBeVisible();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("announces a failed request, preserves the email, and allows a retry", async () => {
    vi.mocked(recoverCommerceAccess)
      .mockRejectedValueOnce(new Error("Unable to recover order access."))
      .mockResolvedValueOnce(null);
    const { container } = render(<RecoverOrderPage />);

    submitRecovery();
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Unable to recover order access.");
    expect(alert).toHaveTextContent(
      "contact support before making another purchase",
    );
    expect(
      screen.getByRole("textbox", { name: /^Purchase email/ }),
    ).toHaveValue("buyer@example.com");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    await expect(axe(container)).resolves.toHaveNoViolations();

    fireEvent.click(screen.getByRole("button", { name: "Resend access link" }));
    expect(await screen.findByRole("status")).toBeVisible();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(recoverCommerceAccess).toHaveBeenCalledTimes(2);
  });
});

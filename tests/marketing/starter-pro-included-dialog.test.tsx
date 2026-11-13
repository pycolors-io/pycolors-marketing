import * as React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { StarterProIncludedDialog } from "../../components/starters/starter-pro-included-dialog";

function Example() {
  return (
    <StarterProIncludedDialog
      title="Billing & subscriptions"
      description="Connect subscriptions to your application."
      technology="Stripe"
      artwork="/images/starters/pro/concepts/billing-loops-test-v1.png"
      href="/docs/starter-pro/billing"
      guide="Billing guide"
    >
      <ul>
        <li>Secure Stripe Checkout integration</li>
        <li>Subscription lifecycle handling</li>
      </ul>
      <p>Connect your Stripe account and validate webhooks in test mode.</p>
    </StarterProIncludedDialog>
  );
}

describe("Starter Pro inclusion dialogs", () => {
  it("opens the selected feature, exposes its source and setup details, and returns focus after Escape", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", {
      name: "Included in the source: Billing & subscriptions",
    });
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", {
      name: "Billing & subscriptions",
    });
    expect(dialog).toHaveAccessibleDescription(
      "Connect subscriptions to your application.",
    );
    expect(dialog).toHaveTextContent("Secure Stripe Checkout integration");
    expect(dialog).toHaveTextContent("validate webhooks in test mode");
    expect(
      within(dialog).getByRole("link", { name: "Billing guide" }),
    ).toHaveAttribute("href", "/docs/starter-pro/billing");
    expect((await axe(dialog)).violations).toEqual([]);
    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("moves focus into and out of the dialog without scrolling the source card", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", {
      name: "Included in the source: Billing & subscriptions",
    });
    const focus = vi.spyOn(HTMLElement.prototype, "focus");
    try {
      fireEvent.click(trigger);
      const dialog = await screen.findByRole("dialog");
      expect(
        within(dialog).getAllByRole("button", { name: "Close" })[0],
      ).toHaveFocus();
      expect(focus).toHaveBeenLastCalledWith({ preventScroll: true });
      fireEvent.keyDown(dialog, { key: "Escape" });
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(focus).toHaveBeenLastCalledWith({ preventScroll: true });
    } finally {
      focus.mockRestore();
    }
  });

  it("closes through its explicit close control and can be opened again", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", {
      name: "Included in the source: Billing & subscriptions",
    });
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(
      within(dialog).getAllByRole("button", { name: "Close" })[0]!,
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    fireEvent.click(trigger);
    expect(
      await screen.findByRole("dialog", { name: "Billing & subscriptions" }),
    ).toBeVisible();
  });
});

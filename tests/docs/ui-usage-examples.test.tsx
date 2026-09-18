import * as React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import { NotificationSettings } from "../../components/docs/ui-usage/notification-settings";
import { RenameProjectDialog } from "../../components/docs/ui-usage/rename-project-dialog";
import { MembersTable } from "../../components/docs/ui-usage/members-table";
import { SaveToastExample } from "../../components/docs/ui-usage/save-toast-example";

// jsdom does not measure Radix's hidden native checkbox input. Layout and
// keyboard behavior are also verified in a real browser against the docs page.
beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  );
});

afterEach(() => vi.unstubAllGlobals());

describe("notification settings example", () => {
  it("connects validation errors and focuses the invalid field", () => {
    render(<NotificationSettings />);
    const email = screen.getByRole("textbox", { name: /Notification email/ });
    const save = screen.getByRole("button", { name: "Save preview settings" });
    fireEvent.click(save);
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Enter a valid email address.");
    expect(email).toHaveFocus();
    fireEvent.change(email, { target: { value: "invalid" } });
    fireEvent.click(save);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(email).toHaveAttribute("aria-invalid", "true");
  });

  it("saves current field values locally and clears stale feedback after edits", () => {
    render(<NotificationSettings />);
    const email = screen.getByRole("textbox", { name: /Notification email/ });
    fireEvent.change(email, { target: { value: "builder@example.com" } });
    fireEvent.click(
      screen.getByRole("checkbox", { name: "Send a weekly workspace summary" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Save preview settings" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Saved locally for builder@example.com. Weekly summary on.",
    );
    expect(email).not.toHaveAttribute("aria-invalid", "true");
    fireEvent.change(email, { target: { value: "other@example.com" } });
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("keeps labels independent when composed more than once", () => {
    render(
      <>
        <NotificationSettings />
        <NotificationSettings />
      </>,
    );
    const boxes = screen.getAllByRole("checkbox");
    expect(boxes[0]?.id).not.toBe(boxes[1]?.id);
    fireEvent.click(screen.getAllByText("Send a weekly workspace summary")[1]!);
    expect(boxes[0]).not.toBeChecked();
    expect(boxes[1]).toBeChecked();
  });
});

describe("rename dialog example", () => {
  it("validates the draft, commits a trimmed name and restores trigger focus", async () => {
    render(<RenameProjectDialog />);
    const trigger = screen.getByRole("button", { name: "Rename project" });
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", {
      name: "Rename project",
    });
    expect(dialog).toHaveAccessibleDescription(
      "This preview updates local state only.",
    );
    const input = within(dialog).getByRole("textbox", { name: /Project name/ });
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Save name" }));
    expect(input).toHaveAccessibleDescription("Enter a project name.");
    expect(input).toHaveFocus();
    fireEvent.change(input, { target: { value: "  Docs  " } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Save name" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Project: Docs");
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("discards cancelled drafts and restores the saved name on reopen", async () => {
    render(<RenameProjectDialog />);
    const trigger = screen.getByRole("button", { name: "Rename project" });
    fireEvent.click(trigger);
    fireEvent.change(
      await screen.findByRole("textbox", { name: /Project name/ }),
      { target: { value: "Discard me" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Project: Website");
    fireEvent.click(trigger);
    expect(
      await screen.findByRole("textbox", { name: /Project name/ }),
    ).toHaveValue("Website");
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("has no automated accessibility violations while open", async () => {
    render(<RenameProjectDialog />);
    fireEvent.click(screen.getByRole("button", { name: "Rename project" }));
    expect(await axe(await screen.findByRole("dialog"))).toHaveNoViolations();
  });
});

it("paginates records, reports the current page and enforces both boundaries", () => {
  render(<MembersTable />);
  expect(
    screen.getByRole("table", { name: "Example workspace members" }),
  ).toBeInTheDocument();
  const previous = screen.getByRole("button", { name: "Previous page" });
  const next = screen.getByRole("button", { name: "Next page" });
  expect(previous).toBeDisabled();
  expect(screen.getByText("Ava Martin")).toBeInTheDocument();
  fireEvent.click(next);
  expect(screen.queryByText("Ava Martin")).not.toBeInTheDocument();
  expect(screen.getByText("Mia Taylor")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  expect(screen.getByRole("status")).toHaveTextContent("Page 2 of 3");
  fireEvent.click(next);
  expect(screen.getByText("Zoe Patel")).toBeInTheDocument();
  expect(next).toBeDisabled();
  fireEvent.click(next);
  expect(screen.getByRole("status")).toHaveTextContent("Page 3 of 3");
  fireEvent.click(previous);
  expect(screen.getByRole("status")).toHaveTextContent("Page 2 of 3");
  fireEvent.click(screen.getByRole("button", { name: "Page 1" }));
  expect(previous).toBeDisabled();
});

it("opens toast feedback on demand, dismisses it and allows another action", async () => {
  render(<SaveToastExample />);
  const trigger = screen.getByRole("button", {
    name: "Simulate successful save",
  });
  expect(
    screen.queryByRole("button", { name: "Dismiss notification" }),
  ).not.toBeInTheDocument();
  fireEvent.click(trigger);
  expect(trigger).toBeEnabled();
  fireEvent.click(
    await screen.findByRole("button", { name: "Dismiss notification" }),
  );
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(
    screen.queryByRole("button", { name: "Dismiss notification" }),
  ).not.toBeInTheDocument();
  fireEvent.click(trigger);
  expect(
    await screen.findByRole("button", { name: "Dismiss notification" }),
  ).toBeInTheDocument();
});

it.each([
  ["settings form", NotificationSettings],
  ["paginated table", MembersTable],
] as const)(
  "has no automated accessibility violations in the %s",
  async (_name, Component) => {
    const { container } = render(<Component />);
    expect(await axe(container)).toHaveNoViolations();
  },
);

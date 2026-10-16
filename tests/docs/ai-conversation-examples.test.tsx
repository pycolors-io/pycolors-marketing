import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AIMessageExample,
  AIMessageActionsExample,
  AIConversationExample,
} from "../../components/docs/ui-usage/ai-conversation-examples";
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
describe("inline AI component previews", () => {
  it("renders semantic message content inside the docs", () => {
    render(<AIMessageExample />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
  it("copies actual sample text and exposes recoverable failure", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<AIMessageActionsExample />);
    fireEvent.click(
      screen.getByRole("button", { name: "Copy example response" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copied."),
    );
    expect(writeText).toHaveBeenCalledWith(
      "Start with one useful flow, including recovery from errors.",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Simulate copy failure" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Copy example response" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Could not copy"),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Disable simulated failure" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Copy example response" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copied."),
    );
    vi.unstubAllGlobals();
  });
  it("adds local messages and resets the example", () => {
    render(<AIConversationExample />);
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: "Add sample message" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(7);
    fireEvent.click(screen.getByRole("button", { name: "Reset example" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
  });
});

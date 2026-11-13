import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { DocsAssistant } from "../../components/docs/docs-assistant";
const route = vi.hoisted(() => ({ pathname: "/docs/ui/button" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
const descriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
afterEach(() => {
  route.pathname = "/docs/ui/button";
  vi.unstubAllGlobals();
  if (descriptor) Object.defineProperty(navigator, "clipboard", descriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});
function clipboard(reject = false) {
  const write = reject
    ? vi.fn().mockRejectedValue(new Error("blocked"))
    : vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: write },
  });
  return write;
}
function open() {
  fireEvent.click(screen.getByRole("button", { name: "Ask AI" }));
  return screen.getByRole("dialog", {
    name: "A clearer answer starts with the right context.",
  });
}
describe("contextual documentation AI help", () => {
  it("opens accessible help and copies the question with the current page, without sending it to an AI service", async () => {
    const write = clipboard();
    const fetchPage = vi
      .fn()
      .mockResolvedValue(new Response("# Button\nPublic component API."));
    vi.stubGlobal("fetch", fetchPage);
    render(<DocsAssistant />);
    open();
    expect(fetchPage).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "How do I show a loading state?" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Copy question and page" }),
    );
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    const text = write.mock.calls[0]![0] as string;
    expect(text).toContain("How do I show a loading state?");
    expect(text).toContain("# Button\nPublic component API.");
    expect(text).toContain("https://pycolors.io/docs/ui/button");
    expect(fetchPage).toHaveBeenCalledWith(
      "/api/docs/markdown?slug=ui%2Fbutton&locale=en",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Paste the context into your AI tool",
    );
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "Another question" },
    });
    expect(screen.getByRole("status")).not.toHaveTextContent("Ready.");
  });
  it("keeps the prepared context available when copying is blocked", async () => {
    clipboard(true);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("# Button")));
    render(<DocsAssistant />);
    open();
    fireEvent.click(
      screen.getByRole("button", { name: "Summarize this page" }),
    );
    expect(screen.getByLabelText("Your question")).toHaveValue(
      "Summarize this page.",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Copy question and page" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copy unavailable."),
    );
    expect(screen.getByText(/# Button/)).toBeInTheDocument();
    expect(
      screen.getByText("View prepared context").closest("details"),
    ).toHaveAttribute("open");
  });
  it("announces a failed page request and retains the Markdown fallback", async () => {
    const write = clipboard();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Missing", { status: 404 })),
    );
    render(<DocsAssistant />);
    open();
    fireEvent.click(
      screen.getByRole("button", { name: "Copy question and page" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copy unavailable."),
    );
    expect(write).not.toHaveBeenCalled();
    expect(
      screen.getByRole("link", { name: /View as Markdown/ }),
    ).toHaveAttribute("href", "/api/docs/markdown?slug=ui%2Fbutton&locale=en");
  });
  it("resets the question and panel when navigating to another page", () => {
    const { rerender } = render(<DocsAssistant />);
    open();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "A question about Button" },
    });
    route.pathname = "/docs/ui/input";
    rerender(<DocsAssistant />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    open();
    expect(screen.getByLabelText("Your question")).toHaveValue("");
    expect(
      screen.getByText("https://pycolors.io/docs/ui/input"),
    ).toBeInTheDocument();
  });

  it("returns focus to the trigger on Escape", async () => {
    render(<DocsAssistant />);
    const trigger = screen.getByRole("button", { name: "Ask AI" });
    trigger.focus();
    open();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  it("has no detectable accessibility violations with the panel open", async () => {
    render(<DocsAssistant />);
    open();
    expect(await axe(document.body)).toHaveNoViolations();
  });
});

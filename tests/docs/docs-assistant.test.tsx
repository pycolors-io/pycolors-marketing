import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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
    name: "Your question. The right context.",
  });
}
async function prepare() {
  fireEvent.click(screen.getByRole("button", { name: "Prepare my question" }));
  return screen.findByLabelText("Question and documentation to copy");
}
describe("contextual documentation AI help", () => {
  it("prepares a reviewable question and project context before an explicit clipboard action", async () => {
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
    fireEvent.click(screen.getByText("Add project context (optional)"));
    fireEvent.change(screen.getByLabelText("Project context"), {
      target: { value: "A Next.js account settings form." },
    });
    const prompt = await prepare();
    expect(write).not.toHaveBeenCalled();
    expect(prompt).toHaveAttribute("readonly");
    expect((prompt as HTMLTextAreaElement).value).toContain(
      "A Next.js account settings form.",
    );
    expect(
      screen.getByRole("heading", { name: "Your prompt is ready." }),
    ).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Copy for my AI" }));
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    const text = write.mock.calls[0]![0] as string;
    expect(text).toContain("How do I show a loading state?");
    expect(text).toContain("# Button\nPublic component API.");
    expect(text).toContain("https://pycolors.io/docs/ui/button");
    expect(text).toContain("documented public APIs");
    expect(fetchPage).toHaveBeenCalledWith(
      "/api/docs/markdown?slug=ui%2Fbutton&locale=en",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Paste the prompt into your AI tool",
    );
  });
  it("keeps the entire prompt selectable when clipboard access is blocked", async () => {
    clipboard(true);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("# Button")));
    render(<DocsAssistant />);
    open();
    fireEvent.click(
      screen.getByRole("button", { name: "Summarize this page" }),
    );
    expect(
      screen.getByRole("button", { name: "Summarize this page" }),
    ).toHaveAttribute("aria-pressed", "true");
    const prompt = await prepare();
    expect((prompt as HTMLTextAreaElement).value).toContain(
      "Summarize this page.",
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy for my AI" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("copy it manually"),
    );
    expect((prompt as HTMLTextAreaElement).value).toContain("# Button");
    expect(
      screen.getByRole("button", { name: "Copy for my AI" }),
    ).toBeEnabled();
  });
  it("keeps the question on request failure and can retry using the Markdown fallback", async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce(new Response("Missing", { status: 404 }))
      .mockResolvedValueOnce(
        new Response("# Button\nRecovered documentation."),
      );
    vi.stubGlobal("fetch", fetchPage);
    render(<DocsAssistant />);
    open();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "Help with this API" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Prepare my question" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "This page could not be loaded",
      ),
    );
    expect(screen.getByLabelText("Your question")).toHaveValue(
      "Help with this API",
    );
    expect(
      screen.getByRole("link", { name: /View as Markdown/ }),
    ).toHaveAttribute("href", "/api/docs/markdown?slug=ui%2Fbutton&locale=en");
    expect(((await prepare()) as HTMLTextAreaElement).value).toContain(
      "Recovered documentation.",
    );
  });
  it("edits an existing question, restores focus, and reuses the current page without a second request", async () => {
    const write = clipboard();
    const fetchPage = vi
      .fn()
      .mockResolvedValue(new Response("# Button\nSource."));
    vi.stubGlobal("fetch", fetchPage);
    render(<DocsAssistant />);
    open();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "First question" },
    });
    await prepare();
    fireEvent.click(screen.getByRole("button", { name: "Edit question" }));
    await waitFor(() =>
      expect(screen.getByLabelText("Your question")).toHaveFocus(),
    );
    expect(screen.getByLabelText("Your question")).toHaveValue(
      "First question",
    );
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "Updated question" },
    });
    const prompt = await prepare();
    expect((prompt as HTMLTextAreaElement).value).toContain("Updated question");
    expect(fetchPage).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Copy for my AI" }));
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    expect(write.mock.calls[0]![0]).not.toContain("First question");
  });
  it("aborts a pending preparation when the panel closes and ignores the late response", async () => {
    let finish: (response: Response) => void = () => {};
    const fetchPage = vi.fn().mockReturnValue(
      new Promise<Response>((resolve) => {
        finish = resolve;
      }),
    );
    vi.stubGlobal("fetch", fetchPage);
    render(<DocsAssistant />);
    open();
    fireEvent.click(
      screen.getByRole("button", { name: "Prepare my question" }),
    );
    const signal = fetchPage.mock.calls[0]![1].signal as AbortSignal;
    fireEvent.keyDown(document, { key: "Escape" });
    expect(signal.aborted).toBe(true);
    await act(async () => {
      finish(new Response("# Late response"));
    });
    open();
    expect(
      screen.queryByLabelText("Question and documentation to copy"),
    ).not.toBeInTheDocument();
  });
  it("resets the question and panel on navigation", () => {
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
      screen.getByRole("link", { name: /\/docs\/ui\/input/ }),
    ).toHaveAttribute("href", "https://pycolors.io/docs/ui/input");
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
  it("has no detectable accessibility violations in either step", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("# Button")));
    render(<DocsAssistant />);
    open();
    expect(await axe(document.body)).toHaveNoViolations();
    await prepare();
    expect(await axe(document.body)).toHaveNoViolations();
  });
});

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { DocsAssistant } from "../../components/docs/docs-assistant";
import { UI_VERSION, TOKENS_VERSION } from "../../lib/version";
const route = vi.hoisted(() => ({ pathname: "/docs/ui/button" }));
const localeState = vi.hoisted(() => ({ value: "en" as "en" | "fr" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("@/lib/i18n/use-copy", async () => {
  const { createCopy } = await import("../../lib/i18n/copy-core");
  const french = (await import("../../messages/fr.json")).default
    .site as Record<string, string>;
  return {
    useCopy: () =>
      createCopy(
        localeState.value,
        Object.assign((key: string) => french[key] ?? key, {
          has: (key: string) => Object.hasOwn(french, key),
          raw: (key: string) => french[key],
        }),
      ),
  };
});
const descriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockImplementation(() =>
        Promise.resolve(new Response("# Button\nPublic component API.")),
      ),
  );
});
afterEach(() => {
  route.pathname = "/docs/ui/button";
  localeState.value = "en";
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
  fireEvent.click(screen.getByRole("button", { name: "Use with my AI" }));
  return screen.getByRole("dialog", {
    name: "Your question. The right context.",
  });
}
async function ready() {
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "Copy question and context" }),
    ).toBeEnabled(),
  );
}
async function copy() {
  await ready();
  fireEvent.click(
    screen.getByRole("button", { name: "Copy question and context" }),
  );
}
describe("contextual documentation AI help", () => {
  it("loads the real page title and copies the question, versions and documentation in one explicit action", async () => {
    const write = clipboard();
    const fetchPage = vi.mocked(fetch);
    render(<DocsAssistant />);
    open();
    await ready();
    expect(write).not.toHaveBeenCalled();
    expect(
      screen.getByRole("link", { name: /Button.*Opens in a new tab/ }),
    ).toHaveAttribute("href", "https://pycolors.io/docs/ui/button");
    expect(
      screen.getByText("Documentation references:", { exact: false }),
    ).toHaveTextContent(`UI ${UI_VERSION} · Tokens ${TOKENS_VERSION} · EN`);
    expect(
      screen.getByRole("button", { name: "Use this component" }),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "How do I show a loading state?" },
    });
    fireEvent.click(screen.getByText("Add project context (optional)"));
    fireEvent.change(screen.getByLabelText("Project context"), {
      target: { value: "A Next.js account settings form." },
    });
    await copy();
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    const text = write.mock.calls[0]![0] as string;
    expect(text).toContain("How do I show a loading state?");
    expect(text).toContain("A Next.js account settings form.");
    expect(text).toContain("# Button\nPublic component API.");
    expect(text).toContain("https://pycolors.io/docs/ui/button");
    expect(text).toContain(`UI ${UI_VERSION}`);
    expect(text).toContain("installed versions");
    expect(fetchPage).toHaveBeenCalledOnce();
    expect(fetchPage).toHaveBeenCalledWith(
      "/api/docs/markdown?slug=ui%2Fbutton&locale=en",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Paste the prompt into your AI tool",
    );
    expect(
      screen.getByText("Review included context").closest("details"),
    ).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Review included context"));
    expect(
      screen.getByLabelText("Question and documentation to copy"),
    ).toHaveAttribute("readonly");
  });
  it("expands and focuses the full prompt when copying is blocked, and retries without refetching", async () => {
    const write = clipboard(true);
    render(<DocsAssistant />);
    open();
    await ready();
    fireEvent.click(
      screen.getByRole("button", { name: "Summarize this page" }),
    );
    expect(
      screen.getByRole("button", { name: "Summarize this page" }),
    ).toHaveAttribute("aria-pressed", "true");
    await copy();
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("copy it manually"),
    );
    const prompt = screen.getByLabelText("Question and documentation to copy");
    expect(prompt.closest("details")).toHaveAttribute("open");
    expect(prompt).toHaveFocus();
    expect((prompt as HTMLTextAreaElement).value).toContain(
      "Summarize this page.",
    );
    write.mockResolvedValueOnce(undefined);
    await copy();
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copied."),
    );
    expect(fetch).toHaveBeenCalledOnce();
    expect(write).toHaveBeenCalledTimes(2);
  });
  it("preserves the question on request failure and retries from the same action", async () => {
    const write = clipboard();
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce(new Response("Missing", { status: 404 }))
      .mockResolvedValueOnce(
        new Response("# Button\nRecovered documentation."),
      );
    vi.stubGlobal("fetch", fetchPage);
    render(<DocsAssistant />);
    open();
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "This page could not be loaded",
      ),
    );
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "Help with this API" },
    });
    expect(
      screen.getByRole("link", { name: /View as Markdown/ }),
    ).toHaveAttribute("href", "/api/docs/markdown?slug=ui%2Fbutton&locale=en");
    await copy();
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    expect(write.mock.calls[0]![0]).toContain("Recovered documentation.");
    expect(screen.getByLabelText("Your question")).toHaveValue(
      "Help with this API",
    );
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });
  it("invalidates copied context when a question changes and keeps the current page cached", async () => {
    const write = clipboard();
    render(<DocsAssistant />);
    open();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "First question" },
    });
    await copy();
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "Updated question" },
    });
    expect(
      screen.queryByText("Review included context"),
    ).not.toBeInTheDocument();
    await copy();
    await waitFor(() => expect(write).toHaveBeenCalledTimes(2));
    expect(write.mock.calls[1]![0]).toContain("Updated question");
    expect(write.mock.calls[1]![0]).not.toContain("First question");
    expect(fetch).toHaveBeenCalledOnce();
  });
  it("aborts loading on close and ignores the late response without touching the clipboard", async () => {
    const write = clipboard();
    let finish: (response: Response) => void = () => {};
    const fetchPage = vi
      .fn()
      .mockReturnValueOnce(
        new Promise<Response>((resolve) => {
          finish = resolve;
        }),
      )
      .mockResolvedValueOnce(new Response("# Reopened page"));
    vi.stubGlobal("fetch", fetchPage);
    render(<DocsAssistant />);
    open();
    const signal = fetchPage.mock.calls[0]![1].signal as AbortSignal;
    fireEvent.keyDown(document, { key: "Escape" });
    expect(signal.aborted).toBe(true);
    await act(async () => {
      finish(new Response("# Late response"));
    });
    open();
    await ready();
    expect(write).not.toHaveBeenCalled();
    expect(
      screen.queryByText("Review included context"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Late response")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Reopened page/ }),
    ).toBeInTheDocument();
  });
  it("resets question and source on navigation and updates contextual suggestions", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockImplementation((url: string) =>
          Promise.resolve(
            new Response(
              url.includes("installation") ? "# Installation" : "# Button",
            ),
          ),
        ),
    );
    const { rerender } = render(<DocsAssistant />);
    open();
    await ready();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "A question about Button" },
    });
    route.pathname = "/docs/ui/installation";
    rerender(<DocsAssistant />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    open();
    await ready();
    expect(screen.getByLabelText("Your question")).toHaveValue("");
    expect(
      screen.getByRole("button", { name: "Install the library" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Installation.*Opens in a new tab/ }),
    ).toHaveAttribute("href", "https://pycolors.io/docs/ui/installation");
  });
  it("provides French home suggestions, sources and a French prompt", async () => {
    localeState.value = "fr";
    route.pathname = "/fr/docs";
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response("# Documentation PyColors\nDocumentation en français."),
        ),
    );
    const write = clipboard();
    render(<DocsAssistant />);
    fireEvent.click(
      screen.getByRole("button", { name: "Utiliser avec mon IA" }),
    );
    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: "Copier ma question et le contexte",
        }),
      ).toBeEnabled(),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Choisir mon point de départ" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Copier ma question et le contexte" }),
    );
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    expect(write.mock.calls[0]![0]).toContain("répondre en français");
    expect(write.mock.calls[0]![0]).toContain("https://pycolors.io/fr/docs");
    expect(write.mock.calls[0]![0]).toContain("besoins de mon projet");
    expect(write.mock.calls[0]![0]).toContain("FR");
    expect(write.mock.calls[0]![0]).not.toContain("localhost");
  });
  it("returns focus to the trigger on Escape", async () => {
    render(<DocsAssistant />);
    const trigger = screen.getByRole("button", { name: "Use with my AI" });
    trigger.focus();
    open();
    await ready();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  it("has no detectable accessibility violations before and after copying", async () => {
    clipboard();
    render(<DocsAssistant />);
    open();
    await ready();
    expect(await axe(document.body)).toHaveNoViolations();
    await copy();
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copied."),
    );
    fireEvent.click(screen.getByText("Review included context"));
    expect(await axe(document.body)).toHaveNoViolations();
  });
});

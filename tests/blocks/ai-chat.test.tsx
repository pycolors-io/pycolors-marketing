import * as React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  AIChat,
  type AIChatProps,
} from "../../content/blocks/app-shells/ai-chat";
import { AIChatExample } from "../../components/docs/blocks/ai-chat-example";

const base: AIChatProps = {
  messages: [],
  draft: "",
  status: "idle",
  onDraftChange: vi.fn(),
  onSubmit: vi.fn(),
  onCopy: vi.fn(async () => {}),
};
const message = {
  id: "reply",
  role: "assistant" as const,
  text: "A useful response.",
};
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("AIChat", () => {
  it("prefills suggestions and focuses the native textarea without submitting", () => {
    const change = vi.fn(),
      submit = vi.fn(),
      ref = React.createRef<HTMLTextAreaElement>();
    render(
      <AIChat
        {...base}
        ref={ref}
        onDraftChange={change}
        onSubmit={submit}
        suggestions={[{ id: "plan", label: "Plan", prompt: "Make a plan" }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Plan" }));
    expect(change).toHaveBeenCalledWith("Make a plan");
    expect(submit).not.toHaveBeenCalled();
    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Message" }));
    expect(ref.current).toHaveFocus();
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });
  it("delegates IME, modified Enter and duplicate submission protection to AIComposer", async () => {
    const submit = vi.fn();
    render(<AIChat {...base} draft="Keep my draft" onSubmit={submit} />);
    const input = screen.getByRole("textbox");
    fireEvent.compositionStart(input);
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.compositionEnd(input);
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
    expect(submit).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(submit).toHaveBeenCalledExactlyOnceWith("Keep my draft");
    expect(input).toHaveValue("Keep my draft");
    expect(input).toHaveFocus();
    await act(async () => {});
  });
  it("keeps touch Enter as a newline and exposes an explicit send action", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
    } as MediaQueryList);
    const submit = vi.fn();
    render(<AIChat {...base} draft="Touch" onSubmit={submit} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(submit).toHaveBeenCalledExactlyOnceWith("Touch");
  });
  it("preserves edits while busy, calls stop once and recovers focus when it disappears", () => {
    const stop = vi.fn(),
      change = vi.fn();
    const { rerender } = render(
      <AIChat
        {...base}
        draft="Next question"
        status="streaming"
        messages={[message]}
        onStop={stop}
        onDraftChange={change}
      />,
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Newer edit" },
    });
    expect(change).toHaveBeenCalledWith("Newer edit");
    const button = screen.getByRole("button", { name: "Stop response" });
    button.focus();
    fireEvent.click(button);
    expect(stop).toHaveBeenCalledOnce();
    rerender(
      <AIChat
        {...base}
        draft="Newer edit"
        status="stopped"
        messages={[message]}
      />,
    );
    expect(screen.getByRole("textbox")).toHaveValue("Newer edit");
    expect(screen.getByRole("textbox")).toHaveFocus();
    expect(screen.getByText(/may be incomplete/)).toBeVisible();
    expect(screen.getByText(message.text)).toBeVisible();
  });
  it("exposes safe errors, preserves the draft and does not invent unsupported actions", () => {
    const retry = vi.fn();
    const { rerender } = render(
      <AIChat
        {...base}
        draft="My edit"
        status="error"
        messages={[message]}
        errorMessage="Connection lost"
        onRetry={retry}
      />,
    );
    const button = screen.getByRole("button", { name: "Retry response" });
    button.focus();
    fireEvent.click(button);
    expect(retry).toHaveBeenCalledOnce();
    rerender(
      <AIChat
        {...base}
        draft="My edit"
        status="submitting"
        messages={[message]}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /Retry|Stop/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("My edit");
    expect(screen.getByRole("textbox")).toHaveFocus();
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });
  it("does not steal focus from another field after an asynchronous stop", () => {
    const { rerender } = render(
      <>
        <input aria-label="Elsewhere" />
        <AIChat {...base} status="streaming" onStop={() => {}} />
      </>,
    );
    screen.getByRole("button", { name: "Stop response" }).focus();
    fireEvent.click(screen.getByRole("button", { name: "Stop response" }));
    screen.getByLabelText("Elsewhere").focus();
    rerender(
      <>
        <input aria-label="Elsewhere" />
        <AIChat {...base} status="stopped" />
      </>,
    );
    expect(screen.getByLabelText("Elsewhere")).toHaveFocus();
  });
  it("announces copy success only after resolution and suppresses duplicate copying", async () => {
    let resolve!: () => void;
    const copy = vi.fn(
      () =>
        new Promise<void>((done) => {
          resolve = done;
        }),
    );
    render(<AIChat {...base} messages={[message]} onCopy={copy} />);
    const button = screen.getByRole("button", {
      name: "Copy assistant message",
    });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(copy).toHaveBeenCalledExactlyOnceWith(message);
    expect(screen.queryByText("Copied.")).not.toBeInTheDocument();
    expect(button).toBeDisabled();
    await act(async () => resolve());
    expect(screen.getByText("Copied.")).toBeVisible();
  });
  it("offers manual copying after rejection without changing request state", async () => {
    render(
      <AIChat
        {...base}
        messages={[message]}
        onCopy={async () => {
          throw new Error("Denied");
        }}
      />,
    );
    await act(async () =>
      fireEvent.click(
        screen.getByRole("button", { name: "Copy assistant message" }),
      ),
    );
    expect(screen.getByText(/Select the text/)).toBeVisible();
    expect(screen.getByText(message.text)).toBeVisible();
    expect(screen.getByText("Ready for your next message.")).toBeVisible();
  });
  it("does not claim an updated streamed message was copied", async () => {
    let resolve!: () => void;
    const copy = () =>
      new Promise<void>((done) => {
        resolve = done;
      });
    const { rerender } = render(
      <AIChat {...base} messages={[message]} onCopy={copy} />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Copy assistant message" }),
    );
    rerender(
      <AIChat
        {...base}
        messages={[{ ...message, text: "Updated output" }]}
        onCopy={copy}
      />,
    );
    await act(async () => resolve());
    expect(screen.queryByText("Copied.")).not.toBeInTheDocument();
  });
  it("renders untrusted text literally and disables mutation actions when unavailable", () => {
    const { container } = render(
      <AIChat
        {...base}
        disabled
        draft="Draft"
        status="error"
        onRetry={() => {}}
        messages={[
          { ...message, text: '<img src=x onerror="alert(1)">\n**text**' },
        ]}
      />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText(/<img/)).toBeVisible();
    expect(screen.getByRole("textbox")).toBeDisabled();
    for (const button of screen.getAllByRole("button"))
      expect(button).toBeDisabled();
  });
  it("preserves reading position and only follows while at the bottom", () => {
    const { rerender } = render(<AIChat {...base} messages={[message]} />);
    const region = screen.getByRole("group", { name: "Conversation" });
    Object.defineProperties(region, {
      scrollHeight: { configurable: true, value: 1000 },
      clientHeight: { configurable: true, value: 200 },
    });
    region.scrollTop = 150;
    fireEvent.scroll(region);
    rerender(
      <AIChat {...base} messages={[{ ...message, text: "More content" }]} />,
    );
    expect(region.scrollTop).toBe(150);
    const jump = screen.getByRole("button", { name: "Jump to latest" });
    fireEvent.click(jump);
    expect(region.scrollTop).toBe(1000);
    expect(region).toHaveFocus();
    region.scrollTop = 800;
    fireEvent.scroll(region);
    Object.defineProperty(region, "scrollHeight", { value: 1100 });
    rerender(
      <AIChat {...base} messages={[{ ...message, text: "Even more" }]} />,
    );
    expect(region.scrollTop).toBe(1100);
  });
  it("keeps labels unique across instances and has no automated accessibility violations", async () => {
    const { container } = render(
      <>
        <AIChat {...base} />
        <AIChat {...base} messages={[message]} />
      </>,
    );
    const inputs = screen.getAllByRole("textbox", { name: "Message" });
    expect(inputs[0].id).not.toBe(inputs[1].id);
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByRole("list", { name: "Messages" })).not.toHaveAttribute(
      "aria-live",
    );
  });
});

describe("AIChat layout changes", () => {
  function resizeHarness() {
    const observers: TestResizeObserver[] = [];
    class TestResizeObserver implements ResizeObserver {
      targets = new Set<Element>();
      constructor(private callback: ResizeObserverCallback) {
        observers.push(this);
      }
      observe(target: Element) {
        this.targets.add(target);
      }
      unobserve(target: Element) {
        this.targets.delete(target);
      }
      disconnect() {
        this.targets.clear();
      }
      notify(target: Element) {
        if (this.targets.has(target)) this.callback([], this);
      }
    }
    vi.stubGlobal("ResizeObserver", TestResizeObserver);
    return (target: Element) =>
      act(() => {
        for (const observer of observers) observer.notify(target);
      });
  }
  function dimensions(region: HTMLElement, height: number, viewport = 200) {
    Object.defineProperties(region, {
      scrollHeight: { configurable: true, value: height },
      clientHeight: { configurable: true, value: viewport },
    });
  }
  function scrollTo(region: HTMLElement, top: number) {
    region.scrollTop = top;
    fireEvent.scroll(region);
  }
  afterEach(() => vi.unstubAllGlobals());

  it("follows message reflow without new props or moving focus", () => {
    const resize = resizeHarness();
    render(<AIChat {...base} messages={[message]} />);
    const region = screen.getByRole("group", { name: "Conversation" });
    dimensions(region, 1000);
    resize(region);
    scrollTo(region, 800);
    screen.getByRole("textbox").focus();
    dimensions(region, 1400);
    resize(screen.getByRole("list", { name: "Messages" }));
    expect(region.scrollTop).toBe(1400);
    expect(screen.getByRole("textbox")).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Jump to latest" })).toBeNull();
  });

  it("keeps the latest response visible when the viewport becomes shorter", () => {
    const resize = resizeHarness();
    render(<AIChat {...base} messages={[message]} />);
    const region = screen.getByRole("group", { name: "Conversation" });
    dimensions(region, 1000, 400);
    resize(region);
    scrollTo(region, 600);
    dimensions(region, 1000, 200);
    resize(region);
    expect(region.scrollTop).toBe(1000);
  });

  it("does not mistake a browser scroll during reflow for leaving the latest content", () => {
    const resize = resizeHarness();
    render(<AIChat {...base} messages={[message]} />);
    const region = screen.getByRole("group", { name: "Conversation" });
    dimensions(region, 1000);
    resize(region);
    scrollTo(region, 800);
    dimensions(region, 1400);
    // A scroll event can arrive before the resize observer after layout changes.
    fireEvent.scroll(region);
    resize(region);
    expect(region.scrollTop).toBe(1400);
    expect(screen.queryByRole("button", { name: "Jump to latest" })).toBeNull();
  });

  it("preserves a reader's position on reflow until they explicitly jump", () => {
    const resize = resizeHarness();
    render(<AIChat {...base} messages={[message]} />);
    const region = screen.getByRole("group", { name: "Conversation" });
    dimensions(region, 1000);
    resize(region);
    scrollTo(region, 150);
    dimensions(region, 1400);
    resize(screen.getByRole("list", { name: "Messages" }));
    resize(region);
    expect(region.scrollTop).toBe(150);
    fireEvent.click(screen.getByRole("button", { name: "Jump to latest" }));
    expect(region.scrollTop).toBe(1400);
    expect(region).toHaveFocus();
    dimensions(region, 1600);
    resize(screen.getByRole("list", { name: "Messages" }));
    expect(region.scrollTop).toBe(1600);
  });

  it("resumes following when the entire history fits after a resize", () => {
    const resize = resizeHarness();
    render(<AIChat {...base} messages={[message]} />);
    const region = screen.getByRole("group", { name: "Conversation" });
    dimensions(region, 1000);
    resize(region);
    scrollTo(region, 150);
    expect(
      screen.getByRole("button", { name: "Jump to latest" }),
    ).toBeVisible();
    dimensions(region, 200, 400);
    region.scrollTop = 0;
    resize(region);
    expect(screen.queryByRole("button", { name: "Jump to latest" })).toBeNull();
    dimensions(region, 1000, 400);
    resize(screen.getByRole("list", { name: "Messages" }));
    expect(region.scrollTop).toBe(1000);
  });

  it("isolates multiple threads and disconnects on unmount under Strict Mode", () => {
    const resize = resizeHarness();
    const { unmount } = render(
      <React.StrictMode>
        <AIChat {...base} messages={[message]} />
        <AIChat {...base} messages={[message]} />
      </React.StrictMode>,
    );
    const [first, second] = screen.getAllByRole("group", {
      name: "Conversation",
    });
    dimensions(first, 1000);
    dimensions(second, 1000);
    resize(first);
    resize(second);
    scrollTo(first, 800);
    scrollTo(second, 150);
    dimensions(first, 1200);
    resize(first);
    expect(first.scrollTop).toBe(1200);
    expect(second.scrollTop).toBe(150);
    unmount();
    first.scrollTop = 0;
    resize(first);
    expect(first.scrollTop).toBe(0);
  });

  it("still follows new messages when ResizeObserver is unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const { rerender } = render(<AIChat {...base} messages={[message]} />);
    const region = screen.getByRole("group", { name: "Conversation" });
    dimensions(region, 1000);
    scrollTo(region, 800);
    dimensions(region, 1200);
    rerender(<AIChat {...base} messages={[{ ...message, text: "Updated" }]} />);
    expect(region.scrollTop).toBe(1200);
  });
});

describe("AIChat local demo", () => {
  it("runs error, retry, streaming, stop and completion without network or duplicate messages", async () => {
    vi.useFakeTimers();
    const fetch = vi.spyOn(globalThis, "fetch");
    render(<AIChatExample />);
    expect(screen.getByText("Local demo — no AI request")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Plan a product" }));
    fireEvent.click(screen.getByRole("button", { name: "Fail next response" }));
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await act(async () => vi.advanceTimersByTime(160));
    expect(screen.getByText(/simulated error/)).toBeVisible();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "A newer draft" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Retry response" }));
    await act(async () => vi.advanceTimersByTime(320));
    fireEvent.click(screen.getByRole("button", { name: "Stop response" }));
    const stopped = screen.getByRole("list", { name: "Messages" }).textContent;
    await act(async () => vi.advanceTimersByTime(2000));
    expect(screen.getByRole("list", { name: "Messages" }).textContent).toBe(
      stopped,
    );
    fireEvent.click(screen.getByRole("button", { name: "Retry response" }));
    await act(async () => vi.advanceTimersByTime(3000));
    expect(
      within(screen.getByRole("list", { name: "Messages" })).getAllByRole(
        "listitem",
      ),
    ).toHaveLength(2);
    expect(screen.getByRole("textbox")).toHaveValue("A newer draft");
    expect(screen.getByText("Ready for your next message.")).toBeVisible();
    expect(fetch).not.toHaveBeenCalled();
  });
  it("cancels outstanding fixture work on reset and unmount", async () => {
    vi.useFakeTimers();
    const { unmount } = render(<AIChatExample />);
    fireEvent.click(screen.getByRole("button", { name: "Plan a product" }));
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
    await act(async () => vi.advanceTimersByTime(5000));
    expect(
      screen.queryByRole("list", { name: "Messages" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Plan a product" }));
    await act(async () => {});
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

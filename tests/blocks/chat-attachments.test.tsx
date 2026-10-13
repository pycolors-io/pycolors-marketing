import * as React from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  AIChat,
  type AIChatProps,
  type ChatAttachment,
  type ChatAttachmentsControl,
} from "../../content/blocks/app-shells/ai-chat";
import {
  localFilePolicy,
  useLocalChatFile,
  validateLocalFile,
} from "../../components/docs/blocks/use-local-chat-file";
import { AIChatExample } from "../../components/docs/blocks/ai-chat-example";

const base: AIChatProps = {
  messages: [],
  draft: "",
  status: "idle",
  onDraftChange: vi.fn(),
  onSubmit: vi.fn(),
  onCopy: vi.fn(async () => {}),
};
const metadata = { id: "file-1", name: "context.md", size: 12 };
const selected: ChatAttachment = { ...metadata, status: "selected" };
const ready: ChatAttachment = {
  ...metadata,
  status: "ready",
  excerpt: '<script>alert("not executed")</script>',
  truncated: false,
  sourceReference: { id: metadata.id, label: metadata.name },
};
const callbacks = () => ({ onUseSource: vi.fn(), onRemoveSource: vi.fn() });
function control(
  items: readonly ChatAttachment[] = [selected],
): ChatAttachmentsControl {
  return {
    policy: localFilePolicy,
    items,
    onSelect: vi.fn(),
    onRead: vi.fn(),
    onRetry: vi.fn(),
    onCancel: vi.fn(),
    onRemove: vi.fn(),
    onUse: vi.fn(),
  };
}
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

class ReaderMock {
  static LOADING = 1;
  static instances: ReaderMock[] = [];
  readyState = 0;
  result: ArrayBuffer | null = null;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onabort: (() => void) | null = null;
  constructor() {
    ReaderMock.instances.push(this);
  }
  readAsArrayBuffer = vi.fn(() => {
    this.readyState = 1;
  });
  abort = vi.fn(() => {
    this.readyState = 2;
    this.onabort?.();
  });
  complete(text: string) {
    this.result = new TextEncoder().encode(text).buffer;
    this.readyState = 2;
    this.onload?.();
  }
}
function mockReaders() {
  ReaderMock.instances = [];
  vi.stubGlobal("FileReader", ReaderMock);
}

describe("local file policy", () => {
  it.each([
    { name: "note.txt", type: "text/plain", size: 1 },
    { name: "note.MD", type: "text/markdown", size: 524288 },
    { name: "note.md", type: "text/plain", size: 10 },
    { name: "note.txt", type: "", size: 10 },
  ])("accepts explicit supported metadata $name $type", (file) =>
    expect(validateLocalFile(file)).toBeUndefined(),
  );
  it.each([
    { name: "empty.txt", type: "text/plain", size: 0 },
    { name: "large.md", type: "", size: 524289 },
    { name: "note.md.exe", type: "text/plain", size: 10 },
    { name: "report.pdf", type: "application/pdf", size: 10 },
    { name: "note.txt", type: "text/html", size: 10 },
    { name: "note.md", type: "application/octet-stream", size: 10 },
    { name: "note.txt", type: "text/markdown", size: 10 },
    { name: "txt", type: "text/plain", size: 10 },
  ])("rejects unsupported metadata $name $type $size", (file) =>
    expect(validateLocalFile(file)).toBeTypeOf("string"),
  );
});

describe("controlled attachment presentation", () => {
  it("shows limits before selection, emits files without reading and clears the input for reselection", () => {
    mockReaders();
    const attachments = control([]);
    render(<AIChat {...base} attachments={attachments} />);
    expect(
      screen.getByText(/UTF-8 .txt or .md · 1 file maximum · 512 KiB/),
    ).toBeVisible();
    const input = screen.getByLabelText(
      "Choose reference file",
    ) as HTMLInputElement;
    expect(input).toHaveAttribute("accept", ".txt,.md");
    expect(input).not.toHaveAttribute("multiple");
    const file = new File(["Context"], "context.md");
    fireEvent.change(input, { target: { files: [file] } });
    expect(attachments.onSelect).toHaveBeenCalledExactlyOnceWith([file]);
    expect(input.value).toBe("");
    expect(attachments.onRead).not.toHaveBeenCalled();
    expect(ReaderMock.instances).toHaveLength(0);
  });
  it("calls explicit actions once, follows supplied states, and keeps progress truthful", () => {
    const attachments = control();
    const { rerender } = render(<AIChat {...base} attachments={attachments} />);
    const read = screen.getByRole("button", { name: "Read locally" });
    read.focus();
    fireEvent.click(read);
    fireEvent.click(read);
    expect(attachments.onRead).toHaveBeenCalledExactlyOnceWith(metadata.id);
    rerender(
      <AIChat
        {...base}
        attachments={{
          ...attachments,
          items: [{ ...metadata, status: "reading" }],
        }}
      />,
    );
    expect(screen.queryByRole("progressbar")).toBeNull();
    const cancel = screen.getByRole("button", { name: "Cancel reading" });
    cancel.focus();
    fireEvent.click(cancel);
    fireEvent.click(cancel);
    expect(attachments.onCancel).toHaveBeenCalledExactlyOnceWith(metadata.id);
    rerender(
      <AIChat
        {...base}
        attachments={{
          ...attachments,
          items: [{ ...metadata, status: "cancelled" }],
        }}
      />,
    );
    expect(
      screen.getByText("Reading cancelled. You can retry or remove the file."),
    ).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Retry reading" }));
    expect(attachments.onRetry).toHaveBeenCalledExactlyOnceWith(metadata.id);
  });
  it("renders inert text, prefills only when asked and focuses the same composer", () => {
    const attachments = control([ready]);
    const { container } = render(
      <AIChat {...base} attachments={attachments} />,
    );
    expect(attachments.onUse).not.toHaveBeenCalled();
    expect(container.querySelector("script")).toBeNull();
    fireEvent.click(screen.getByText("Text excerpt"));
    expect(screen.getByLabelText("Reference text excerpt")).toHaveTextContent(
      ready.excerpt,
    );
    fireEvent.click(screen.getByRole("button", { name: "Use as reference" }));
    expect(attachments.onUse).toHaveBeenCalledExactlyOnceWith(ready.id);
    expect(base.onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveFocus();
  });
  it("recovers focus after removal without taking it from another field", () => {
    const attachments = control();
    const { rerender } = render(<AIChat {...base} attachments={attachments} />);
    const remove = screen.getByRole("button", { name: "Remove context.md" });
    remove.focus();
    fireEvent.click(remove);
    fireEvent.click(remove);
    expect(attachments.onRemove).toHaveBeenCalledExactlyOnceWith(selected.id);
    rerender(<AIChat {...base} attachments={{ ...attachments, items: [] }} />);
    expect(
      screen.getByRole("button", { name: "Attach reference file" }),
    ).toHaveFocus();
    rerender(<AIChat {...base} attachments={attachments} />);
    screen.getByRole("button", { name: "Remove context.md" }).focus();
    fireEvent.click(screen.getByRole("button", { name: "Remove context.md" }));
    screen.getByRole("textbox", { name: "Message" }).focus();
    rerender(<AIChat {...base} attachments={{ ...attachments, items: [] }} />);
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveFocus();
  });
  it("has accessible errors, disabled controls, independent forms and unique labels", async () => {
    const attachments = {
      ...control([ready]),
      errorMessage: "Remove the current file first.",
    };
    const { container } = render(
      <>
        <AIChat {...base} disabled attachments={attachments} />
        <AIChat {...base} disabled attachments={control([])} />
      </>,
    );
    expect(container.querySelector("form form")).toBeNull();
    for (const button of screen.getAllByRole("button"))
      expect(button).toBeDisabled();
    expect(
      screen.getAllByRole("button", { name: "Attach reference file" })[0],
    ).toHaveAccessibleDescription(/Remove the current file first/);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("local file consumer", () => {
  it("reads a real UTF-8 file only on request and exposes a capped Unicode-safe excerpt", async () => {
    const actions = callbacks(),
      fetch = vi.spyOn(globalThis, "fetch"),
      read = vi.spyOn(FileReader.prototype, "readAsArrayBuffer");
    const { result } = renderHook(() => useLocalChatFile(actions));
    const text = "🙂".repeat(2100);
    act(() =>
      result.current.control.onSelect([
        new File([text], "unicode.md", { type: "text/markdown" }),
      ]),
    );
    expect(read).not.toHaveBeenCalled();
    expect(result.current.source).toBeUndefined();
    act(() =>
      result.current.control.onRead(result.current.control.items[0].id),
    );
    await waitFor(() =>
      expect(result.current.control.items[0].status).toBe("ready"),
    );
    expect(result.current.control.items[0]).toMatchObject({
      excerpt: "🙂".repeat(2000),
      truncated: true,
    });
    expect(result.current.source?.label).toBe("unicode.md");
    expect(actions.onUseSource).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([
    { bytes: new Uint8Array([0xc3, 0x28]), label: "malformed UTF-8" },
    { bytes: new Uint8Array([65, 0, 66]), label: "binary NUL" },
    { bytes: new Uint8Array([65, 7, 66]), label: "binary control" },
    { bytes: new Uint8Array([32, 9, 10]), label: "blank text" },
  ])("rejects actual $label after reading", async ({ bytes }) => {
    const { result } = renderHook(() => useLocalChatFile(callbacks()));
    act(() =>
      result.current.control.onSelect([new File([bytes], "context.txt")]),
    );
    act(() =>
      result.current.control.onRead(result.current.control.items[0].id),
    );
    await waitFor(() =>
      expect(result.current.control.items[0].status).toBe("error"),
    );
    expect(result.current.source).toBeUndefined();
  });
  it("keeps valid context through duplicate, multiple and invalid selections", async () => {
    const { result } = renderHook(() => useLocalChatFile(callbacks()));
    const file = new File(["A valid reference"], "context.txt");
    act(() => result.current.control.onSelect([file]));
    act(() =>
      result.current.control.onRead(result.current.control.items[0].id),
    );
    await waitFor(() =>
      expect(result.current.control.items[0].status).toBe("ready"),
    );
    const accepted = result.current.control.items[0];
    for (const files of [
      [file],
      [file, file],
      [new File(["bad"], "file.pdf")],
    ]) {
      act(() => result.current.control.onSelect(files));
      expect(result.current.control.errorMessage).toBeTruthy();
      expect(result.current.control.items[0]).toEqual(accepted);
    }
    act(() => result.current.control.onRemove(accepted.id));
    act(() => result.current.control.onSelect([file]));
    expect(result.current.control.items[0].id).not.toBe(accepted.id);
    expect(result.current.control.items[0].status).toBe("selected");
  });
  it("cancels real attempts, ignores replayed callbacks, retries and preserves a replacement", () => {
    mockReaders();
    const { result, unmount } = renderHook(() => useLocalChatFile(callbacks()));
    act(() =>
      result.current.control.onSelect([new File(["Read me"], "context.txt")]),
    );
    const id = result.current.control.items[0].id;
    act(() => {
      result.current.control.onRead(id);
      result.current.control.onRead(id);
    });
    expect(ReaderMock.instances).toHaveLength(1);
    const first = ReaderMock.instances[0],
      delayed = first.onload!;
    act(() => result.current.control.onCancel(id));
    expect(first.abort).toHaveBeenCalledOnce();
    expect(result.current.control.items[0].status).toBe("cancelled");
    first.result = new TextEncoder().encode("Late text").buffer;
    act(delayed);
    expect(result.current.source).toBeUndefined();
    act(() => result.current.control.onRetry(id));
    const second = ReaderMock.instances[1];
    act(() => second.onerror?.());
    expect(result.current.control.items[0].status).toBe("error");
    act(() => result.current.control.onRetry(id));
    const third = ReaderMock.instances[2],
      late = third.onload!;
    act(() => result.current.control.onRemove(id));
    act(() =>
      result.current.control.onSelect([new File(["New text"], "new.md")]),
    );
    third.result = new TextEncoder().encode("Stale").buffer;
    act(late);
    expect(result.current.control.items[0]).toMatchObject({
      name: "new.md",
      status: "selected",
    });
    act(() =>
      result.current.control.onRead(result.current.control.items[0].id),
    );
    const final = ReaderMock.instances[3];
    unmount();
    expect(final.abort).toHaveBeenCalledOnce();
    expect(final.onload).toBeNull();
  });
  it("allows recovery even when a reader fails synchronously on repeated attempts", () => {
    mockReaders();
    class FailingReader extends ReaderMock {
      readAsArrayBuffer = vi.fn(() => {
        throw new Error("Private I/O detail");
      });
    }
    vi.stubGlobal("FileReader", FailingReader);
    function Consumer() {
      const local = useLocalChatFile(callbacks());
      return <AIChat {...base} attachments={local.control} />;
    }
    render(<Consumer />);
    fireEvent.change(screen.getByLabelText("Choose reference file"), {
      target: { files: [new File(["Valid"], "context.txt")] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Read locally" }));
    fireEvent.click(screen.getByRole("button", { name: "Retry reading" }));
    fireEvent.click(screen.getByRole("button", { name: "Retry reading" }));
    expect(ReaderMock.instances).toHaveLength(3);
    expect(screen.queryByText("Private I/O detail")).toBeNull();
  });
  it("accepts a real file exactly at the size limit and UTF-8 BOM", async () => {
    const { result } = renderHook(() => useLocalChatFile(callbacks()));
    const text = "\uFEFF" + "a".repeat(524285);
    act(() => result.current.control.onSelect([new File([text], "limit.txt")]));
    act(() =>
      result.current.control.onRead(result.current.control.items[0].id),
    );
    await waitFor(() =>
      expect(result.current.control.items[0].status).toBe("ready"),
    );
    expect(result.current.control.items[0]).toMatchObject({
      excerpt: "a".repeat(2000),
      truncated: true,
    });
  });
});

describe("file to agent in the existing chat", () => {
  it("preserves input, requires read/use/send/confirm, excludes file text and invalidates export on removal", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const log = vi.spyOn(console, "log"),
      info = vi.spyOn(console, "info");
    const storage = vi.spyOn(Storage.prototype, "setItem");
    render(<AIChatExample />);
    const message = screen.getByRole("textbox", { name: "Message" });
    fireEvent.change(message, { target: { value: "Keep this message" } });
    const input = screen.getByLabelText("Choose reference file");
    fireEvent.change(input, {
      target: { files: [new File(["data"], "file.pdf")] },
    });
    expect(message).toHaveValue("Keep this message");
    const raw = '<img src=x onerror="alert(1)">PRIVATE_RAW_DOCUMENT_SENTINEL';
    fireEvent.change(input, {
      target: { files: [new File([raw], "reference.md")] },
    });
    expect(
      screen.queryByRole("heading", { name: "Agent definition" }),
    ).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Read locally" }));
    await screen.findByText("Reference text is ready for review.");
    fireEvent.click(screen.getByRole("button", { name: "Use as reference" }));
    expect(
      screen.queryByRole("heading", { name: "Agent definition" }),
    ).toBeNull();
    expect(message).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(
      screen.getByText(/Sample definition with a locally read source/),
    ).toBeVisible();
    fireEvent.change(screen.getByRole("textbox", { name: /Agent name/ }), {
      target: { value: "My reference assistant" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    await screen.findByText(
      "Definition created locally",
      {},
      { timeout: 2000 },
    );
    const json = screen.getByLabelText(
      "Confirmed definition JSON",
    ).textContent!;
    expect(json).toContain("reference.md");
    expect(json).not.toContain(raw);
    expect(json).not.toContain("PRIVATE_RAW_DOCUMENT_SENTINEL");
    fireEvent.click(
      screen.getByRole("button", { name: "Remove reference.md" }),
    );
    expect(screen.queryByRole("button", { name: "Copy JSON" })).toBeNull();
    expect(screen.queryByText("Definition created locally")).toBeNull();
    expect(screen.getByRole("textbox", { name: /Agent name/ })).toHaveValue(
      "My reference assistant",
    );
    expect(
      screen.getByRole("button", { name: "Confirm definition" }),
    ).toBeEnabled();
    expect(screen.queryByText("reference.md")).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
    expect(storage).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
    expect(info).not.toHaveBeenCalled();
  });
  it("ignores an in-flight confirmation after its reference is removed", async () => {
    render(<AIChatExample />);
    fireEvent.change(screen.getByLabelText("Choose reference file"), {
      target: { files: [new File(["Reference"], "reference.md")] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Read locally" }));
    await screen.findByRole("button", { name: "Use as reference" });
    fireEvent.click(screen.getByRole("button", { name: "Use as reference" }));
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Remove reference.md" }),
    );
    await act(async () => vi.advanceTimersByTime(2000));
    expect(screen.queryByText("Definition created locally")).toBeNull();
    expect(screen.queryByRole("button", { name: "Copy JSON" })).toBeNull();
    expect(
      screen.getByRole("button", { name: "Confirm definition" }),
    ).toBeEnabled();
  });
});

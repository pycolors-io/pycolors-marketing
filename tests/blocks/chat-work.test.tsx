import * as React from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  AIChat,
  type AIChatProps,
  type ChatWorkControl,
  type ChatWorkStatus,
} from "../../content/blocks/app-shells/ai-chat";
import { AIChatExample } from "../../components/docs/blocks/ai-chat-example";
import { useWorkSimulation } from "../../components/docs/blocks/work-simulation";

const base: AIChatProps = {
  messages: [],
  draft: "",
  status: "idle",
  onDraftChange: vi.fn(),
  onSubmit: vi.fn(),
  onCopy: vi.fn(async () => {}),
};
const work = (overrides: Partial<ChatWorkControl> = {}): ChatWorkControl => ({
  id: "review",
  attempt: 1,
  revision: 0,
  title: "Review launch readiness",
  status: "planned",
  steps: [
    {
      id: "brief",
      label: "Read the brief",
      status: "pending",
      detail: "A public activity summary.",
    },
    { id: "result", label: "Prepare the result", status: "pending" },
  ],
  ...overrides,
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
});
function deferred() {
  let resolve!: () => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<void>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

describe("controlled Work presentation", () => {
  it.each<[ChatWorkStatus, string]>([
    ["planned", "Plan supplied. No work has started."],
    ["running", "Work is in progress, as reported by your application."],
    [
      "waiting-for-approval",
      "Waiting for your decision. Approval does not grant application permissions.",
    ],
    ["succeeded", "Your application reports that this task completed."],
    [
      "failed",
      "This attempt failed. Any supplied partial result remains available.",
    ],
    [
      "cancelled",
      "Your application confirmed cancellation. Partial results may be incomplete.",
    ],
    [
      "unknown",
      "The current task state is unknown. Completion and cancellation are not confirmed.",
    ],
  ])(
    "renders supplied %s without starting or deriving task progress",
    (status, message) => {
      const onApprove = vi.fn(),
        onCancel = vi.fn(),
        fetch = vi.spyOn(globalThis, "fetch");
      render(
        <AIChat
          {...base}
          work={work({
            status,
            onApprove,
            onCancel,
            steps: [
              {
                id: "all",
                label: "All steps supplied as done",
                status: "succeeded",
              },
            ],
          })}
        />,
      );
      expect(screen.getByText(message)).toBeVisible();
      expect(screen.queryByRole("progressbar")).toBeNull();
      expect(onApprove).not.toHaveBeenCalled();
      expect(onCancel).not.toHaveBeenCalled();
      expect(fetch).not.toHaveBeenCalled();
    },
  );
  it("omits unsupported actions and preserves native button/disabled semantics", () => {
    const onApprove = vi.fn();
    const { rerender, container } = render(
      <AIChat
        {...base}
        work={work({ status: "waiting-for-approval", onApprove })}
      />,
    );
    expect(screen.getByRole("button", { name: "Approve" })).toHaveAttribute(
      "type",
      "button",
    );
    for (const name of ["Reject", "Cancel task", "Retry task"])
      expect(screen.queryByRole("button", { name })).toBeNull();
    rerender(
      <AIChat
        {...base}
        disabled
        work={work({ status: "waiting-for-approval", onApprove })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Approve" }));
    expect(onApprove).not.toHaveBeenCalled();
    expect(container.querySelector("form form")).toBeNull();
    rerender(
      <AIChat {...base} work={work({ status: "succeeded", onApprove })} />,
    );
    expect(screen.queryByRole("group", { name: "Task actions" })).toBeNull();
  });
  it("deduplicates in-flight requests through rerenders and awaits consumer cancellation truth", async () => {
    const request = deferred(),
      onCancel = vi.fn(() => request.promise);
    const initial = work({ status: "running", onCancel });
    const { rerender } = render(<AIChat {...base} work={initial} />);
    const button = screen.getByRole("button", { name: "Cancel task" });
    fireEvent.click(button);
    fireEvent.click(button);
    rerender(
      <AIChat {...base} draft="A newer message" work={{ ...initial }} />,
    );
    fireEvent.click(button);
    expect(onCancel).toHaveBeenCalledExactlyOnceWith({
      id: "review",
      attempt: 1,
      revision: 0,
    });
    expect(
      screen.getByText(
        "Cancellation requested. The task is not yet confirmed cancelled.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText("In progress", { selector: '[data-slot="badge"]' }),
    ).toBeVisible();
    rerender(
      <AIChat
        {...base}
        work={{ ...initial, revision: 1, pendingAction: "cancel" }}
      />,
    );
    await act(async () => request.resolve());
    expect(button).toBeDisabled();
    expect(
      screen.queryByText("Cancelled", { selector: '[data-slot="badge"]' }),
    ).toBeNull();
    rerender(
      <AIChat
        {...base}
        work={{
          ...initial,
          revision: 2,
          status: "cancelled",
          result: { text: "Kept partial text" },
        }}
      />,
    );
    expect(
      screen.getByText("Cancelled", { selector: '[data-slot="badge"]' }),
    ).toBeVisible();
    expect(screen.getByText("Partial result · not final")).toBeVisible();
  });
  it("does not infer success when a callback resolves and makes failed requests retryable", async () => {
    const onApprove = vi
      .fn()
      .mockRejectedValueOnce(new Error("PRIVATE_TOKEN_SENTINEL"))
      .mockResolvedValue(undefined);
    render(
      <AIChat
        {...base}
        work={work({ status: "waiting-for-approval", onApprove })}
      />,
    );
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Approve" })),
    );
    expect(screen.getByText(/The action request failed/)).toHaveAttribute(
      "role",
      "status",
    );
    expect(screen.getByText(/The action request failed/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.queryByText("PRIVATE_TOKEN_SENTINEL")).toBeNull();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Approve" })),
    );
    expect(onApprove).toHaveBeenCalledTimes(2);
    expect(screen.queryByText(/The action request failed/)).toBeNull();
    expect(screen.getByText("Needs approval")).toBeVisible();
    expect(
      screen.queryByText("Completed", { selector: '[data-slot="badge"]' }),
    ).toBeNull();
  });
  it("ignores old action failures without unlocking or altering a newer attempt", async () => {
    const old = deferred(),
      next = deferred();
    const oldCancel = vi.fn(() => old.promise),
      nextCancel = vi.fn(() => next.promise);
    const { rerender, unmount } = render(
      <AIChat
        {...base}
        work={work({ status: "running", onCancel: oldCancel })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel task" }));
    rerender(
      <AIChat
        {...base}
        work={work({ attempt: 2, status: "running", onCancel: nextCancel })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel task" }));
    await act(async () => old.reject(new Error("stale")));
    fireEvent.click(screen.getByRole("button", { name: "Cancel task" }));
    expect(nextCancel).toHaveBeenCalledOnce();
    expect(screen.queryByText(/The action request failed/)).toBeNull();
    unmount();
    await act(async () => next.resolve());
  });
  it("recovers focus when an action disappears, but does not take focus from the composer", async () => {
    const onApprove = vi.fn();
    const { rerender } = render(
      <AIChat
        {...base}
        work={work({ status: "waiting-for-approval", onApprove })}
      />,
    );
    const button = screen.getByRole("button", { name: "Approve" });
    button.focus();
    await act(async () => fireEvent.click(button));
    rerender(
      <AIChat {...base} work={work({ status: "running", revision: 1 })} />,
    );
    expect(
      screen.getByText("Work is in progress, as reported by your application."),
    ).toHaveFocus();
    rerender(
      <AIChat
        {...base}
        work={work({ status: "waiting-for-approval", revision: 2, onApprove })}
      />,
    );
    const second = screen.getByRole("button", { name: "Approve" });
    second.focus();
    await act(async () => fireEvent.click(second));
    screen.getByRole("textbox", { name: "Message" }).focus();
    rerender(
      <AIChat {...base} work={work({ status: "running", revision: 3 })} />,
    );
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveFocus();
  });
  it("renders inert results and native details with independent accessible names", async () => {
    const text = '<img src=x onerror="alert(1)"><script>run()</script>';
    const { container } = render(
      <>
        <AIChat
          {...base}
          work={work({ result: { text }, status: "failed", onRetry: vi.fn() })}
        />
        <AIChat {...base} work={work({ title: "Another task" })} />
      </>,
    );
    expect(container.querySelector("img, script")).toBeNull();
    expect(screen.getByText(text)).toBeVisible();
    const region = screen.getByRole("region", {
      name: "Review launch readiness",
    });
    const details = within(region).getByText("Step 1 details");
    fireEvent.click(details);
    expect(details.closest("details")).toHaveAttribute("open");
    expect(await axe(container)).toHaveNoViolations();
  });
  it.each([
    "javascript:alert(1)",
    "data:text/html,run",
    "//evil.example/a",
    "/\\evil.example/a",
    "https://user:secret@example.test/",
    "http://example.test",
    " https://example.test",
    "https:///example.test",
    "/%2fexample.test",
    "/%5cexample.test",
    "https://example.test/%0afoo",
    "#fragment",
    "./relative",
    "not a URL",
    "https://",
  ])("does not expose unsafe or ambiguous result link %s", (href) => {
    render(
      <AIChat
        {...base}
        work={work({
          status: "succeeded",
          result: {
            text: "Actual supplied text",
            links: [{ id: "link", label: "Result reference", href }],
          },
        })}
      />,
    );
    expect(screen.queryByRole("link", { name: "Result reference" })).toBeNull();
    expect(screen.getByText("(Link unavailable)")).toBeVisible();
  });
  it("preserves safe native destinations and does not fabricate a missing result", () => {
    const { rerender } = render(
      <AIChat
        {...base}
        work={work({
          status: "succeeded",
          result: {
            text: "Actual supplied text",
            links: [
              {
                id: "docs",
                label: "Documentation",
                href: "/docs/blocks/app-shells/ai-chat#work",
              },
              {
                id: "external",
                label: "Supplied resource",
                href: "https://example.test/result?q=1",
              },
            ],
          },
        })}
      />,
    );
    expect(screen.getByRole("link", { name: "Documentation" })).toHaveAttribute(
      "href",
      "/docs/blocks/app-shells/ai-chat#work",
    );
    expect(
      screen.getByRole("link", { name: "Supplied resource" }).tagName,
    ).toBe("A");
    expect(
      screen.getByText("Result supplied by your application"),
    ).toBeVisible();
    rerender(
      <AIChat {...base} work={work({ status: "succeeded", steps: [] })} />,
    );
    expect(
      screen.getByText("No result was supplied by your application."),
    ).toBeVisible();
    expect(screen.getByText("No step details supplied.")).toBeVisible();
    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("explicit local Work simulation", () => {
  it("prefills only, requires approval and does not finish merely because every step finished", async () => {
    const fetch = vi.spyOn(globalThis, "fetch"),
      storage = vi.spyOn(Storage.prototype, "setItem"),
      log = vi.spyOn(console, "log");
    render(<AIChatExample />);
    fireEvent.click(
      screen.getByRole("button", { name: "Review a task plan (demo)" }),
    );
    expect(
      screen.queryByRole("region", { name: "Review a launch plan" }),
    ).toBeNull();
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(
      screen.getByText(
        "Work simulation. Fictional steps and results; no background task or model is running.",
      ),
    ).toBeVisible();
    fireEvent.click(screen.getByText("Work simulation controls"));
    fireEvent.click(
      screen.getByRole("button", { name: "Simulate approval request" }),
    );
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Approve" })),
    );
    for (let index = 0; index < 3; index++)
      fireEvent.click(screen.getByRole("button", { name: "Advance one step" }));
    expect(
      screen.getByText("Work is in progress, as reported by your application."),
    ).toBeVisible();
    expect(screen.getByText("Partial result · not final")).toBeVisible();
    fireEvent.click(
      screen.getByRole("button", { name: "Supply sample result" }),
    );
    expect(
      screen.getByText("Your application reports that this task completed."),
    ).toBeVisible();
    expect(screen.getByText(/Sample checklist \(fictional\)/)).toBeVisible();
    expect(fetch).not.toHaveBeenCalled();
    expect(storage).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
    expect(
      screen.queryByRole("region", { name: "Review a launch plan" }),
    ).toBeNull();
  });
  it("retains partial results on failure, retries with a new attempt and ignores stale controls", () => {
    const { result, unmount } = renderHook(() => useWorkSimulation());
    act(() => result.current.start());
    const stalePlan = result.current.requestApproval;
    act(() => result.current.requestApproval());
    act(() => {
      const value = result.current.work!;
      value.onApprove?.(value);
    });
    const advance = result.current.advance;
    act(() => {
      advance();
      advance();
    });
    expect(
      result.current.work!.steps.filter((step) => step.status === "succeeded"),
    ).toHaveLength(1);
    const staleComplete = result.current.complete;
    act(() => result.current.fail());
    expect(result.current.work).toMatchObject({
      status: "failed",
      result: { text: expect.stringContaining("Sample finding") },
    });
    act(() => {
      const value = result.current.work!;
      value.onRetry?.(value);
    });
    expect(result.current.work).toMatchObject({
      status: "planned",
      attempt: 2,
      revision: 0,
    });
    expect(result.current.work?.result).toBeUndefined();
    act(() => {
      staleComplete();
      stalePlan();
    });
    expect(result.current.work).toMatchObject({
      status: "planned",
      attempt: 2,
      revision: 0,
    });
    const old = result.current.requestApproval;
    act(() => {
      result.current.reset();
      result.current.start();
      old();
    });
    expect(result.current.work).toMatchObject({
      status: "planned",
      attempt: 1,
      revision: 0,
    });
    const afterUnmount = result.current.complete;
    unmount();
    act(afterUnmount);
  });
  it("keeps cancellation pending until explicitly confirmed and allows rejection without running", () => {
    const { result } = renderHook(() => useWorkSimulation());
    act(() => result.current.start());
    act(() => result.current.requestApproval());
    act(() => {
      const value = result.current.work!;
      value.onApprove?.(value);
    });
    act(() => result.current.advance());
    const staleAdvance = result.current.advance;
    act(() => {
      const value = result.current.work!;
      value.onCancel?.(value);
    });
    act(() => {
      staleAdvance();
      result.current.complete();
      result.current.fail();
    });
    expect(result.current.work).toMatchObject({
      status: "running",
      pendingAction: "cancel",
      result: { text: expect.any(String) },
    });
    act(() => result.current.confirmCancellation());
    expect(result.current.work).toMatchObject({
      status: "cancelled",
      pendingAction: undefined,
    });
    act(() => {
      const value = result.current.work!;
      value.onRetry?.(value);
    });
    act(() => result.current.requestApproval());
    act(() => {
      const value = result.current.work!;
      value.onReject?.(value);
    });
    expect(
      result.current.work!.steps.every((step) => step.status === "cancelled"),
    ).toBe(true);
    expect(result.current.work!.result).toBeUndefined();
  });
  it("preserves supplied partial state when status becomes unknown", () => {
    const { result } = renderHook(() => useWorkSimulation());
    act(() => result.current.start());
    act(() => result.current.requestApproval());
    act(() => {
      const value = result.current.work!;
      value.onApprove?.(value);
    });
    act(() => result.current.advance());
    const prior = result.current.work!;
    act(() => result.current.unknown());
    expect(result.current.work).toMatchObject({
      status: "unknown",
      steps: prior.steps,
      result: prior.result,
    });
  });
});

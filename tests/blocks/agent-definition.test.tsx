import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  AIChat,
  type AIChatProps,
  type AgentDefinitionControl,
  type AgentDefinitionDraft,
} from "../../content/blocks/app-shells/ai-chat";
import { serializeAgentDefinition } from "../../content/blocks/app-shells/ai-chat/agent-definition-export";
import { AIChatExample } from "../../components/docs/blocks/ai-chat-example";

const base: AIChatProps = {
  messages: [],
  draft: "",
  status: "idle",
  onDraftChange: vi.fn(),
  onSubmit: vi.fn(),
  onCopy: vi.fn(async () => {}),
};
const draft: AgentDefinitionDraft = {
  id: "reviewer",
  revision: 1,
  name: "Reviewer",
  purpose: "Review an interface",
  instructions: "Ask before expanding the scope.",
  requestedCapabilities: ["Read supplied context"],
  sourceReferences: [{ id: "prompt-1", label: "User request" }],
};
function control(): Exclude<AgentDefinitionControl, { status: "created" }>;
function control(
  overrides: Partial<AgentDefinitionControl>,
): AgentDefinitionControl;
function control(
  overrides: Partial<AgentDefinitionControl> = {},
): AgentDefinitionControl {
  return {
    draft,
    status: "draft",
    onChange: vi.fn(),
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    ...overrides,
  } as AgentDefinitionControl;
}
function clipboard(copy: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: copy },
  });
}
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("inline agent review", () => {
  it("has no implicit action on arrival and keeps the composer independent", () => {
    const agent = control();
    const { container } = render(<AIChat {...base} agentDefinition={agent} />);
    expect(agent.onConfirm).not.toHaveBeenCalled();
    expect(agent.onChange).not.toHaveBeenCalled();
    expect(agent.onCancel).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Copy JSON" })).toBeNull();
    expect(container.querySelector("form form")).toBeNull();
    expect(screen.getByRole("textbox", { name: "Message" })).toBeEnabled();
    expect(screen.getByText(/No permissions are granted/)).toBeVisible();
  });
  it("validates whitespace, associates required field errors and focuses the first invalid field", () => {
    const agent = control({
      draft: { ...draft, name: " ", purpose: "", instructions: "" },
    });
    render(<AIChat {...base} agentDefinition={agent} />);
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    expect(agent.onConfirm).not.toHaveBeenCalled();
    for (const name of ["Agent name", "Purpose", "Instructions"]) {
      const field = screen.getByRole("textbox", { name: new RegExp(name) });
      expect(field).toBeRequired();
      expect(field).toHaveAttribute("aria-invalid", "true");
      expect(field).toHaveAccessibleDescription(`${name} is required.`);
    }
    expect(screen.getByRole("textbox", { name: /Agent name/ })).toHaveFocus();
  });
  it("preserves field identity/focus through revisions and exposes consumer errors", () => {
    const agent = control();
    const { rerender } = render(<AIChat {...base} agentDefinition={agent} />);
    const name = screen.getByRole("textbox", { name: /Agent name/ });
    name.focus();
    fireEvent.change(name, { target: { value: "Edited reviewer" } });
    expect(agent.onChange).toHaveBeenCalledWith({
      name: "Edited reviewer",
      purpose: draft.purpose,
      instructions: draft.instructions,
    });
    rerender(
      <AIChat
        {...base}
        agentDefinition={control({
          draft: { ...draft, name: "Edited reviewer", revision: 2 },
          status: "error",
          errors: { name: "Choose another name." },
        })}
      />,
    );
    expect(screen.getByRole("textbox", { name: /Agent name/ })).toBe(name);
    expect(name).toHaveFocus();
    expect(name).toHaveValue("Edited reviewer");
    expect(name).toHaveAccessibleDescription("Choose another name.");
    expect(
      screen.getByRole("button", { name: "Retry confirmation" }),
    ).toBeEnabled();
  });
  it("emits one detached revision snapshot and disables confirmation while pending", () => {
    const agent = control();
    const { rerender } = render(<AIChat {...base} agentDefinition={agent} />);
    const confirm = screen.getByRole("button", { name: "Confirm definition" });
    fireEvent.click(confirm);
    fireEvent.click(confirm);
    expect(agent.onConfirm).toHaveBeenCalledExactlyOnceWith(draft);
    const submitted = vi.mocked(agent.onConfirm).mock.calls[0][0];
    expect(submitted).not.toBe(draft);
    expect(submitted.sourceReferences).not.toBe(draft.sourceReferences);
    rerender(
      <AIChat {...base} agentDefinition={{ ...agent, status: "confirming" }} />,
    );
    expect(screen.getByRole("button", { name: "Confirming…" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /Agent name/ })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Cancel definition" }));
    expect(agent.onCancel).toHaveBeenCalledExactlyOnceWith({
      id: draft.id,
      revision: draft.revision,
    });
  });
  it("returns focus after confirmation but never steals it from another control", () => {
    const agent = control();
    const view = (next: AgentDefinitionControl) => (
      <>
        <input aria-label="Elsewhere" />
        <AIChat {...base} agentDefinition={next} />
      </>
    );
    const { rerender } = render(view(agent));
    screen.getByRole("button", { name: "Confirm definition" }).focus();
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    rerender(view({ ...agent, status: "confirming" }));
    rerender(view({ ...agent, status: "error" }));
    expect(
      screen.getByText("Confirmation failed. Your edits are preserved."),
    ).toHaveFocus();
    screen.getByRole("button", { name: "Retry confirmation" }).focus();
    fireEvent.click(screen.getByRole("button", { name: "Retry confirmation" }));
    rerender(view({ ...agent, status: "confirming" }));
    screen.getByRole("textbox", { name: "Elsewhere" }).focus();
    rerender(view({ ...agent, status: "created", confirmed: draft }));
    expect(screen.getByRole("textbox", { name: "Elsewhere" })).toHaveFocus();
  });
  it("rejects stale confirmed identity, revision or content instead of exporting it", () => {
    const { rerender } = render(
      <AIChat
        {...base}
        agentDefinition={control({
          status: "created",
          confirmed: { ...draft, revision: 0 },
        })}
      />,
    );
    for (const confirmed of [
      { ...draft, revision: 0 },
      { ...draft, id: "other" },
      { ...draft, name: "Unreviewed" },
    ]) {
      rerender(
        <AIChat
          {...base}
          agentDefinition={control({ status: "created", confirmed })}
        />,
      );
      expect(screen.queryByRole("button", { name: "Copy JSON" })).toBeNull();
      expect(screen.queryByText("Definition created locally")).toBeNull();
      expect(
        screen.getByText(/This revision has not been confirmed/),
      ).toBeVisible();
    }
  });
  it("keeps cancelled values readable, literal and unavailable for export", () => {
    const { container } = render(
      <AIChat
        {...base}
        agentDefinition={control({
          status: "cancelled",
          draft: {
            ...draft,
            requestedCapabilities: ['<img src=x onerror="alert(1)">'],
            sourceReferences: [
              { id: "x", label: "https://example.test/no-fetch" },
            ],
          },
        })}
      />,
    );
    expect(screen.getByRole("textbox", { name: /Agent name/ })).toHaveAttribute(
      "readonly",
    );
    expect(container.querySelector("img, a")).toBeNull();
    expect(
      screen.queryByRole("button", { name: /JSON|Confirm definition/ }),
    ).toBeNull();
    expect(screen.getByText(/Definition cancelled/)).toBeVisible();
  });
  it("disables mutations globally and retains unique accessible field labels", async () => {
    const { container } = render(
      <>
        <AIChat {...base} disabled agentDefinition={control()} />
        <AIChat {...base} disabled agentDefinition={control()} />
      </>,
    );
    const inputs = screen.getAllByRole("textbox", { name: /Agent name/ });
    expect(inputs[0].id).not.toBe(inputs[1].id);
    for (const button of screen.getAllByRole("button"))
      expect(button).toBeDisabled();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("confirmed definition export", () => {
  it("allowlists fields, including nested provenance, without exporting identity or hidden payloads", () => {
    const input = {
      ...draft,
      credential: "hidden",
      fileBody: "private",
      permissions: ["write"],
      sourceReferences: [
        {
          id: "p",
          label: "Prompt",
          url: "https://secret.test",
          content: "raw file",
        },
      ],
    };
    expect(JSON.parse(serializeAgentDefinition(input))).toEqual({
      schemaVersion: 1,
      kind: "pycolors-agent-definition",
      name: draft.name,
      purpose: draft.purpose,
      instructions: draft.instructions,
      requestedCapabilities: draft.requestedCapabilities,
      sourceReferences: [{ id: "p", label: "Prompt" }],
    });
  });
  it("reports copy only after clipboard completion and suppresses duplicate writes", async () => {
    let done!: () => void;
    const copy = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          done = resolve;
        }),
    );
    clipboard(copy);
    render(
      <AIChat
        {...base}
        agentDefinition={control({ status: "created", confirmed: draft })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy JSON" }));
    fireEvent.click(screen.getByRole("button", { name: "Copying…" }));
    expect(copy).toHaveBeenCalledExactlyOnceWith(
      serializeAgentDefinition(draft),
    );
    expect(screen.queryByText("Definition JSON copied.")).toBeNull();
    await act(async () => done());
    expect(screen.getByText("Definition JSON copied.")).toBeVisible();
  });
  it("provides selectable JSON after copy rejection and ignores feedback from a replaced definition", async () => {
    clipboard(async () => {
      throw new Error("Permission denied");
    });
    const { rerender } = render(
      <AIChat
        {...base}
        agentDefinition={control({ status: "created", confirmed: draft })}
      />,
    );
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Copy JSON" })),
    );
    expect(screen.getByText(/Copy unavailable/)).toBeVisible();
    fireEvent.click(screen.getByText("Definition JSON"));
    expect(
      screen.getByLabelText("Confirmed definition JSON"),
    ).toHaveTextContent('"schemaVersion": 1');
    let done!: () => void;
    clipboard(
      () =>
        new Promise<void>((resolve) => {
          done = resolve;
        }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy JSON" }));
    const newer = { ...draft, revision: 2, name: "New definition" };
    rerender(
      <AIChat
        {...base}
        agentDefinition={control({
          draft: newer,
          status: "created",
          confirmed: newer,
        })}
      />,
    );
    await act(async () => done());
    expect(screen.queryByText("Definition JSON copied.")).toBeNull();
  });
  it("downloads the reviewed JSON and cleans up the object URL without claiming a saved file", async () => {
    const create = vi
        .fn<(blob: Blob) => string>()
        .mockReturnValue("blob:definition"),
      revoke = vi.fn();
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: create,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revoke,
    });
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        expect(this.download).toBe("agent-definition.json");
      });
    render(
      <AIChat
        {...base}
        agentDefinition={control({ status: "created", confirmed: draft })}
      />,
    );
    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Download JSON" }));
    expect(click).toHaveBeenCalledOnce();
    expect(create.mock.calls[0][0]).toBeInstanceOf(Blob);
    expect(screen.getByText(/JSON download requested/)).toBeVisible();
    expect(document.querySelector("a[download]")).toBeNull();
    act(() => vi.advanceTimersByTime(1000));
    expect(revoke).toHaveBeenCalledWith("blob:definition");
  });
});

function startAgent() {
  fireEvent.click(
    screen.getByRole("button", { name: "Define an agent (demo)" }),
  );
  expect(
    screen.queryByRole("heading", { name: "Agent definition" }),
  ).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Send message" }));
}
describe("local agent consumer", () => {
  it("edits, fails, retries and creates a real local snapshot with no network", async () => {
    vi.useFakeTimers();
    const fetch = vi.spyOn(globalThis, "fetch");
    render(<AIChatExample />);
    startAgent();
    expect(
      screen.getByText(/Simulated draft from the exact sample/),
    ).toBeVisible();
    fireEvent.change(screen.getByRole("textbox", { name: /Agent name/ }), {
      target: { value: "My reviewer" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Fail next confirmation" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    await act(async () => vi.advanceTimersByTime(900));
    expect(screen.getByText(/Simulated confirmation failure/)).toBeVisible();
    expect(screen.getByRole("textbox", { name: /Agent name/ })).toHaveValue(
      "My reviewer",
    );
    fireEvent.click(screen.getByRole("button", { name: "Retry confirmation" }));
    await act(async () => vi.advanceTimersByTime(900));
    expect(screen.getByText("Definition created locally")).toBeVisible();
    expect(
      screen.getByLabelText("Confirmed definition JSON").textContent,
    ).toContain('"name": "My reviewer"');
    expect(fetch).not.toHaveBeenCalled();
  });
  it("ignores even replayed late callbacks after cancel and a replacement draft", async () => {
    vi.useFakeTimers();
    const timeout = vi.spyOn(globalThis, "setTimeout");
    render(<AIChatExample />);
    startAgent();
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    const delayed = timeout.mock.calls.find(
      (call) => call[1] === 900,
    )?.[0] as () => void;
    expect(delayed).toBeTypeOf("function");
    fireEvent.click(screen.getByRole("button", { name: "Cancel definition" }));
    act(() => delayed());
    expect(screen.getByText(/Definition cancelled/)).toBeVisible();
    fireEvent.change(screen.getByRole("textbox", { name: "Message" }), {
      target: {
        value: "Create a local definition for a product review assistant.",
      },
    });
    await act(async () => {});
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    fireEvent.change(screen.getByRole("textbox", { name: /Agent name/ }), {
      target: { value: "Replacement" },
    });
    act(() => delayed());
    expect(screen.getByRole("textbox", { name: /Agent name/ })).toHaveValue(
      "Replacement",
    );
    expect(screen.queryByText("Definition created locally")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Confirm definition" }),
    ).toBeEnabled();
  });
  it("invalidates pending confirmation on reset and unmount", async () => {
    vi.useFakeTimers();
    const timeout = vi.spyOn(globalThis, "setTimeout");
    const clear = vi.spyOn(globalThis, "clearTimeout");
    const { unmount } = render(<AIChatExample />);
    startAgent();
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    const attempt = timeout.mock.calls.findIndex((call) => call[1] === 900);
    const delayed = timeout.mock.calls[attempt][0] as () => void;
    fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
    expect(clear).toHaveBeenCalledWith(timeout.mock.results[attempt].value);
    act(() => delayed());
    expect(
      screen.queryByRole("heading", { name: "Agent definition" }),
    ).toBeNull();
    await act(async () => {});
    startAgent();
    fireEvent.click(screen.getByRole("button", { name: "Confirm definition" }));
    const latest = timeout.mock.calls.findLastIndex((call) => call[1] === 900);
    unmount();
    expect(clear).toHaveBeenCalledWith(timeout.mock.results[latest].value);
    act(() => {
      (timeout.mock.calls[latest][0] as () => void)();
      delayed();
    });
    await act(async () => vi.advanceTimersByTime(1000));
    expect(screen.queryByText("Definition created locally")).toBeNull();
  });
});

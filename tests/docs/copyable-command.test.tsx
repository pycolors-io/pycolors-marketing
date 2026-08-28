import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  CopyableCommand,
  copyCommand,
} from "../../components/docs/copyable-command";

const INSTALL_COMMAND = "pnpm add @pycolors/ui @pycolors/tokens";
const clipboardDescriptor = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);

function setClipboard(value: Pick<Clipboard, "writeText"> | undefined) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value,
  });
}

afterEach(() => {
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
});

describe("CopyableCommand", () => {
  it("keeps the canonical command visible, selectable, and keyboard reachable", () => {
    const { container } = render(<CopyableCommand command={INSTALL_COMMAND} />);
    const button = screen.getByRole("button", { name: "Copy command" });
    const code = container.querySelector("code");

    expect(code).toHaveTextContent(INSTALL_COMMAND);
    expect(code?.closest("pre")).toHaveAttribute("tabindex", "0");

    button.focus();
    expect(button).toHaveFocus();
  });

  it("copies exactly the displayed command and confirms success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<CopyableCommand command={INSTALL_COMMAND} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy command" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(INSTALL_COMMAND),
    );
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Command copied.",
    );
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("keeps manual copying available when clipboard access is missing or blocked", async () => {
    const unavailable = await copyCommand(INSTALL_COMMAND, undefined);
    const blocked = await copyCommand(INSTALL_COMMAND, {
      writeText: vi.fn().mockRejectedValue(new Error("blocked")),
    });

    expect(unavailable.kind).toBe("failure");
    expect(blocked.kind).toBe("failure");
    expect(unavailable.message).toMatch(/Select the command/u);
    expect(blocked.message).toMatch(/Select the command/u);

    setClipboard(undefined);
    render(<CopyableCommand command={INSTALL_COMMAND} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy command" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Select the command and copy it manually.",
    );
    expect(screen.getByText(INSTALL_COMMAND)).toBeInTheDocument();
  });

  it("has no detectable accessibility violations", async () => {
    const { container } = render(<CopyableCommand command={INSTALL_COMMAND} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

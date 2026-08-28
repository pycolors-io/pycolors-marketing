"use client";

import * as React from "react";
import { Button } from "@pycolors/ui";
import { Check, Copy } from "lucide-react";

type ClipboardWriter = Pick<Clipboard, "writeText">;

type CopyStatus = Readonly<{
  kind: "idle" | "success" | "failure";
  message: string;
}>;

const IDLE_STATUS = { kind: "idle", message: "" } as const;
const COPY_SUCCESS = {
  kind: "success",
  message: "Command copied.",
} as const;
const COPY_FAILURE = {
  kind: "failure",
  message: "Copy unavailable. Select the command and copy it manually.",
} as const;

function browserClipboard(): ClipboardWriter | undefined {
  if (typeof navigator === "undefined") return undefined;

  try {
    return navigator.clipboard;
  } catch {
    return undefined;
  }
}

export async function copyCommand(
  command: string,
  clipboard: ClipboardWriter | undefined = browserClipboard(),
): Promise<CopyStatus> {
  if (clipboard === undefined || typeof clipboard.writeText !== "function") {
    return COPY_FAILURE;
  }

  try {
    await clipboard.writeText(command);
    return COPY_SUCCESS;
  } catch {
    return COPY_FAILURE;
  }
}

type CopyableCommandProps = Readonly<{
  command: string;
}>;

export function CopyableCommand({ command }: CopyableCommandProps) {
  const [status, setStatus] = React.useState<CopyStatus>(IDLE_STATUS);

  async function handleCopy() {
    setStatus(IDLE_STATUS);
    setStatus(await copyCommand(command));
  }

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-muted/30">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">
          Terminal
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={handleCopy}
        >
          {status.kind === "success" ? (
            <Check aria-hidden="true" className="size-4" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {status.kind === "success" ? "Copied" : "Copy command"}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 py-3" tabIndex={0}>
        <code className="font-mono text-sm text-foreground">{command}</code>
      </pre>
      {status.message ? (
        <p
          aria-live="polite"
          role="status"
          className="border-t border-border px-4 py-2 text-xs text-muted-foreground"
        >
          {status.message}
        </p>
      ) : null}
    </div>
  );
}

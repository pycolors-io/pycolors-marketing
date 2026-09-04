"use client";

import * as React from "react";
import { Button, cn } from "@pycolors/ui";

type ClipboardWriter = Pick<Clipboard, "writeText">;

export type CopyStatus =
  | { readonly kind: "idle"; readonly message: "" }
  | { readonly kind: "success"; readonly message: string }
  | { readonly kind: "unavailable" | "failure"; readonly message: string };

const COPY_SUCCESS_MESSAGE = "Copied to your clipboard.";
const COPY_UNAVAILABLE_MESSAGE =
  "Clipboard access is unavailable. Select the output and copy it manually.";
const COPY_FAILURE_MESSAGE =
  "Copying was blocked. Select the output and copy it manually.";

function browserClipboard(): ClipboardWriter | undefined {
  if (typeof navigator === "undefined") return undefined;
  return navigator.clipboard;
}

/** Keep browser clipboard behavior explicit, testable, and local to the UI. */
export async function copyThemeOutput(
  value: string,
  clipboard: ClipboardWriter | undefined = browserClipboard(),
): Promise<CopyStatus> {
  if (clipboard === undefined || typeof clipboard.writeText !== "function") {
    return { kind: "unavailable", message: COPY_UNAVAILABLE_MESSAGE };
  }

  try {
    await clipboard.writeText(value);
    return { kind: "success", message: COPY_SUCCESS_MESSAGE };
  } catch {
    return { kind: "failure", message: COPY_FAILURE_MESSAGE };
  }
}

type CopyButtonProps = Readonly<{
  value: string;
  label: string;
  className?: string;
  buttonClassName?: string;
  statusClassName?: string;
}>;

export function CopyButton({
  value,
  label,
  className,
  buttonClassName,
  statusClassName,
}: CopyButtonProps) {
  const [status, setStatus] = React.useState<CopyStatus>({
    kind: "idle",
    message: "",
  });

  async function handleCopy() {
    setStatus({ kind: "idle", message: "" });
    setStatus(await copyThemeOutput(value));
  }

  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-2", className)}
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={buttonClassName}
        onClick={handleCopy}
      >
        {label}
      </Button>
      <p
        aria-live="polite"
        role="status"
        className={cn("text-xs text-muted-foreground", statusClassName)}
      >
        {status.message}
      </p>
    </div>
  );
}

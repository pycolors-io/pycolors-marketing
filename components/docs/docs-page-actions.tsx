"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, FileText } from "lucide-react";
import { useCopy } from "@/lib/i18n/use-copy";
import { copyCommand } from "./copyable-command";
import styles from "./docs-design.module.css";
import { DocsAssistant } from "./docs-assistant";

export function DocsPageActions({
  markdownUrl,
}: Readonly<{ markdownUrl: string }>) {
  const tSite = useCopy();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  async function copyPage() {
    const controller = new AbortController();
    request.current = controller;
    setStatus("loading");
    try {
      const response = await fetch(markdownUrl, { signal: controller.signal });
      if (!response.ok) throw new Error("Markdown unavailable");
      const result = await copyCommand(await response.text());
      if (!controller.signal.aborted)
        setStatus(result.kind === "success" ? "success" : "failure");
    } catch {
      if (!controller.signal.aborted) setStatus("failure");
    }
  }
  return (
    <div className={styles.pageActions}>
      <div className={styles.pageActionLinks}>
        <DocsAssistant />
        <button
          type="button"
          onClick={copyPage}
          disabled={status === "loading"}
        >
          {status === "success" ? (
            <Check aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
          {tSite(
            status === "loading"
              ? "Copying…"
              : status === "success"
                ? "Copied"
                : "Copy page",
          )}
        </button>
        <a href={markdownUrl} target="_blank" rel="noopener noreferrer">
          <FileText aria-hidden="true" />
          {tSite("View as Markdown")}
          <span className="sr-only">{tSite("Opens in a new tab")}</span>
        </a>
      </div>
      <p
        role="status"
        className={status === "failure" ? styles.pageActionError : "sr-only"}
      >
        {status === "success"
          ? tSite("Page copied as Markdown.")
          : status === "failure"
            ? tSite(
                "Copy unavailable. Open the Markdown view to select and copy the text.",
              )
            : ""}
      </p>
    </div>
  );
}

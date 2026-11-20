"use client";

import { useId, useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useCopy } from "@/lib/i18n/use-copy";
import { copyCommand } from "./copyable-command";
import styles from "./docs-home.module.css";

export function DocsContextCopy({
  context,
  collapsible = false,
}: Readonly<{ context: string; collapsible?: boolean }>) {
  const tSite = useCopy();
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "failure">("idle");
  async function copyContext() {
    const result = await copyCommand(context);
    if (result.kind !== "success") setExpanded(true);
    setStatus(result.kind === "success" ? "success" : "failure");
  }
  return (
    <div
      className={styles.contextPanel}
      data-collapsed={collapsible && !expanded}
    >
      <div className={styles.contextHeading}>
        <span>{tSite("Agent brief")}</span>
        <button type="button" onClick={copyContext}>
          {status === "success" ? (
            <Check aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
          {tSite(status === "success" ? "Copied" : "Copy AI context")}
        </button>
      </div>
      <pre id={id} tabIndex={0} aria-label={tSite("AI context to copy")}>
        {collapsible && !expanded ? context.split("\n\n")[0] : context}
      </pre>
      {collapsible ? (
        <button
          type="button"
          className={styles.contextExpand}
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
        >
          {tSite(expanded ? "Show less" : "Show more")}
          <ChevronDown aria-hidden="true" />
        </button>
      ) : null}
      <p className={styles.copyStatus} role="status">
        {status === "success"
          ? tSite("Context copied. Paste it into your AI tool.")
          : status === "failure"
            ? tSite(
                "Copy unavailable. Select the context above and copy it manually.",
              )
            : tSite(
                "Your AI tool needs access to these public guides. You can also share their relevant excerpts.",
              )}
      </p>
    </div>
  );
}

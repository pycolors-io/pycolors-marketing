"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCopy } from "@/lib/i18n/use-copy";
import { copyCommand } from "./copyable-command";
import styles from "./docs-home.module.css";

export function DocsContextCopy({ context }: Readonly<{ context: string }>) {
  const tSite = useCopy();
  const [status, setStatus] = useState<"idle" | "success" | "failure">("idle");
  async function copyContext() {
    setStatus(
      (await copyCommand(context)).kind === "success" ? "success" : "failure",
    );
  }
  return (
    <div className={styles.contextPanel}>
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
      <pre tabIndex={0} aria-label={tSite("AI context to copy")}>
        {context}
      </pre>
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

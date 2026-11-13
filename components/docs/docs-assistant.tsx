"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, Sparkles, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  Textarea,
  cn,
} from "@pycolors/ui";
import { useCopy } from "@/lib/i18n/use-copy";
import { usePathname } from "@/lib/i18n/navigation";
import { docsPageContext } from "@/lib/docs/page-context";
import { copyCommand } from "./copyable-command";
import styles from "./docs-design.module.css";

type Status = "idle" | "loading" | "success" | "failure";
export function DocsAssistant({ className }: Readonly<{ className?: string }>) {
  const tSite = useCopy();
  const pathname = usePathname();
  const page = docsPageContext(pathname, tSite.locale);
  return (
    <DocsAssistantPanel key={page.url} page={page} className={className} />
  );
}

function DocsAssistantPanel({
  page,
  className,
}: Readonly<{
  page: ReturnType<typeof docsPageContext>;
  className?: string;
}>) {
  const tSite = useCopy();
  const questionId = useId();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [context, setContext] = useState("");
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  function changeQuestion(value: string) {
    request.current?.abort();
    setQuestion(value);
    setContext("");
    setStatus("idle");
  }
  function changeOpen(value: boolean) {
    if (!value) {
      request.current?.abort();
      setStatus("idle");
    }
    setOpen(value);
  }
  async function prepareContext() {
    const controller = new AbortController();
    request.current = controller;
    setStatus("loading");
    try {
      const response = await fetch(page.markdownUrl, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Documentation unavailable");
      const markdown = await response.text();
      const brief = [
        tSite(
          "Use this official PyColors documentation to answer my question. Base your answer on the page, distinguish documented behavior from assumptions, and point out any missing information.",
        ),
        page.url,
        question.trim() ||
          tSite("Explain this page and the next steps I should take."),
        markdown,
      ].join("\n\n");
      if (controller.signal.aborted) return;
      setContext(brief);
      const result = await copyCommand(brief);
      if (!controller.signal.aborted)
        setStatus(result.kind === "success" ? "success" : "failure");
    } catch {
      if (!controller.signal.aborted) setStatus("failure");
    }
  }
  return (
    <Sheet open={open} onOpenChange={changeOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(styles.assistantTrigger, className)}
        >
          <Sparkles aria-hidden="true" />
          {tSite("Ask AI")}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        style={{ top: 0, borderRadius: 0 }}
        className={styles.assistantPanel}
      >
        <div className={styles.assistantPanelHeader}>
          <span className={styles.assistantEyebrow}>
            <Sparkles aria-hidden="true" />
            PyColors Docs
          </span>
          <SheetClose asChild>
            <button
              type="button"
              className={styles.assistantClose}
              aria-label={tSite("Close AI help")}
            >
              <X aria-hidden="true" />
            </button>
          </SheetClose>
        </div>
        <SheetTitle className={styles.assistantTitle}>
          {tSite("A clearer answer starts with the right context.")}
        </SheetTitle>
        <SheetDescription className={styles.assistantDescription}>
          {tSite(
            "Write your question, then copy it with this page into the AI tool you already use.",
          )}
        </SheetDescription>
        <p className={styles.assistantPage}>{page.url}</p>
        <div
          className={styles.assistantSuggestions}
          aria-label={tSite("Suggested questions")}
        >
          <button
            type="button"
            onClick={() => changeQuestion(tSite("Summarize this page."))}
          >
            {tSite("Summarize this page")}
          </button>
          <button
            type="button"
            onClick={() =>
              changeQuestion(tSite("Help me follow the steps on this page."))
            }
          >
            {tSite("Help me get started")}
          </button>
        </div>
        <label htmlFor={questionId} className={styles.assistantLabel}>
          {tSite("Your question")}
        </label>
        <Textarea
          id={questionId}
          value={question}
          onChange={(event) => changeQuestion(event.target.value)}
          maxLength={2000}
          rows={5}
          placeholder={tSite("What would you like to understand?")}
        />
        <button
          type="button"
          className={styles.assistantCopy}
          disabled={status === "loading"}
          onClick={prepareContext}
        >
          {status === "success" ? (
            <Check aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
          {tSite(
            status === "loading"
              ? "Preparing context…"
              : "Copy question and page",
          )}
        </button>
        <p role="status" className={styles.assistantStatus}>
          {status === "success"
            ? tSite("Ready. Paste the context into your AI tool to continue.")
            : status === "failure"
              ? tSite(
                  "Copy unavailable. Select the prepared context below, or open the Markdown page.",
                )
              : tSite(
                  "The copied brief includes your question, the public page URL, and its Markdown content.",
                )}
        </p>
        {context ? (
          <details
            className={styles.assistantContext}
            open={status === "failure"}
          >
            <summary>{tSite("View prepared context")}</summary>
            <pre tabIndex={0}>{context}</pre>
          </details>
        ) : null}
        <a
          className={styles.assistantMarkdown}
          href={page.markdownUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tSite("View as Markdown")}
          <span className="sr-only">{tSite("Opens in a new tab")}</span>
        </a>
      </SheetContent>
    </Sheet>
  );
}

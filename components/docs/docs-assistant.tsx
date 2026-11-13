"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Sparkles,
  X,
} from "lucide-react";
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

type CopyStatus = "idle" | "copying" | "success" | "failure";
const suggestions = [
  { label: "Summarize this page", question: "Summarize this page." },
  {
    label: "Help me get started",
    question: "Help me follow the steps on this page.",
  },
  {
    label: "Adapt to my project",
    question:
      "Help me adapt the documented example to my project. Explain which parts I need to change.",
  },
  {
    label: "Understand an error",
    question:
      "Help me diagnose an error using this documentation. Ask for the exact error and the relevant code before suggesting a fix.",
  },
] as const;

export function DocsAssistant({ className }: Readonly<{ className?: string }>) {
  const tSite = useCopy();
  const page = docsPageContext(usePathname(), tSite.locale);
  return (
    <DocsAssistantPanel key={page.url} page={page} className={className} />
  );
}

function DocsAssistantPanel({
  page,
  className,
}: Readonly<{ page: ReturnType<typeof docsPageContext>; className?: string }>) {
  const tSite = useCopy();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [project, setProject] = useState("");
  const [prompt, setPrompt] = useState("");
  const [fetchStatus, setFetchStatus] = useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const request = useRef<AbortController | null>(null);
  const markdown = useRef<string | null>(null);
  const questionInput = useRef<HTMLTextAreaElement>(null);
  const readyHeading = useRef<HTMLHeadingElement>(null);
  const focusQuestion = useRef(false);
  const revision = useRef(0);
  useEffect(
    () => () => {
      request.current?.abort();
      revision.current++;
    },
    [],
  );
  useEffect(() => {
    if (prompt) {
      readyHeading.current?.focus();
    } else if (focusQuestion.current) {
      questionInput.current?.focus();
      focusQuestion.current = false;
    }
  }, [prompt]);

  function resetPreparation() {
    request.current?.abort();
    revision.current++;
    setPrompt("");
    setFetchStatus("idle");
    setCopyStatus("idle");
  }
  function changeQuestion(value: string) {
    resetPreparation();
    setQuestion(value);
  }
  function changeOpen(value: boolean) {
    if (!value) {
      request.current?.abort();
      revision.current++;
      setFetchStatus("idle");
      setCopyStatus("idle");
    }
    setOpen(value);
  }
  async function prepareContext() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setFetchStatus("loading");
    try {
      let text = markdown.current;
      if (text === null) {
        const response = await fetch(page.markdownUrl, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Documentation unavailable");
        text = await response.text();
      }
      if (controller.signal.aborted) return;
      if (!text.trim()) throw new Error("Empty documentation");
      markdown.current = text;
      const brief = [
        tSite(
          "Answer in English using the official PyColors documentation below. Use the documented public APIs, cite the page when useful, distinguish documented behavior from assumptions, and ask for any missing details.",
        ),
        `${tSite("Documentation page")}: ${page.url}`,
        `${tSite("Your question")}: ${question.trim() || tSite("Explain this page and the next steps I should take.")}`,
        ...(project.trim()
          ? [`${tSite("Project context")}: ${project.trim()}`]
          : []),
        `${tSite("Official documentation")}\n\n${text}`,
      ].join("\n\n");
      setPrompt(brief);
      setFetchStatus("idle");
      setCopyStatus("idle");
    } catch {
      if (!controller.signal.aborted) setFetchStatus("error");
    }
  }
  async function copyPrompt() {
    const currentRevision = revision.current;
    setCopyStatus("copying");
    const result = await copyCommand(prompt);
    if (currentRevision === revision.current)
      setCopyStatus(result.kind === "success" ? "success" : "failure");
  }
  const ready = prompt.length > 0;
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
        onOpenAutoFocus={(event) => {
          if (questionInput.current) {
            event.preventDefault();
            questionInput.current.focus();
          }
        }}
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
          {tSite("Your question. The right context.")}
        </SheetTitle>
        <SheetDescription className={styles.assistantDescription}>
          {tSite(
            "Prepare your question with the official page, then paste it into your own AI tool to get an answer.",
          )}
        </SheetDescription>
        <ol
          className={styles.assistantSteps}
          aria-label={tSite("How AI help works")}
        >
          <li aria-current={!ready ? "step" : undefined}>
            <span>1</span>
            {tSite("Question")}
          </li>
          <li aria-current={ready ? "step" : undefined}>
            <span>2</span>
            {tSite("Review and copy")}
          </li>
          <li>
            <span>3</span>
            {tSite("Your AI")}
          </li>
        </ol>
        <div className={styles.assistantSource}>
          <BookOpen aria-hidden="true" />
          <div>
            <span>{tSite("Documentation included")}</span>
            <a href={page.url} target="_blank" rel="noopener noreferrer">
              {new URL(page.url).pathname}
              <span className="sr-only">{tSite("Opens in a new tab")}</span>
            </a>
          </div>
        </div>
        {!ready ? (
          <form
            className={styles.assistantForm}
            aria-busy={fetchStatus === "loading"}
            onSubmit={(event) => {
              event.preventDefault();
              void prepareContext();
            }}
          >
            <div
              className={styles.assistantSuggestions}
              aria-label={tSite("Suggested questions")}
            >
              {suggestions.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  aria-pressed={question === tSite(item.question)}
                  onClick={() => {
                    changeQuestion(tSite(item.question));
                    questionInput.current?.focus();
                  }}
                >
                  {tSite(item.label)}
                </button>
              ))}
            </div>
            <label htmlFor={id} className={styles.assistantLabel}>
              {tSite("Your question")}
            </label>
            <Textarea
              ref={questionInput}
              id={id}
              value={question}
              onChange={(event) => changeQuestion(event.target.value)}
              maxLength={2000}
              rows={4}
              placeholder={tSite("What would you like to understand?")}
              aria-describedby={id + "-help"}
            />
            <p id={id + "-help"} className={styles.assistantHint}>
              {tSite(
                "Choose a suggestion or write your own question. Leave it blank for an overview.",
              )}
            </p>
            <details className={styles.assistantProject}>
              <summary>{tSite("Add project context (optional)")}</summary>
              <label
                htmlFor={id + "-project"}
                className={styles.assistantLabel}
              >
                {tSite("Project context")}
              </label>
              <Textarea
                id={id + "-project"}
                value={project}
                onChange={(event) => {
                  resetPreparation();
                  setProject(event.target.value);
                }}
                maxLength={1500}
                rows={3}
                placeholder={tSite(
                  "Your framework, what you are building, or the error you encountered.",
                )}
              />
            </details>
            <button
              type="submit"
              className={styles.assistantCopy}
              disabled={fetchStatus === "loading"}
            >
              {tSite(
                fetchStatus === "loading"
                  ? "Preparing context…"
                  : "Prepare my question",
              )}
              <ArrowRight aria-hidden="true" />
            </button>
          </form>
        ) : (
          <div className={styles.assistantReady}>
            <h3
              ref={readyHeading}
              tabIndex={-1}
              className={styles.assistantReadyTitle}
            >
              <Check aria-hidden="true" />
              {tSite("Your prompt is ready.")}
            </h3>
            <label htmlFor={id + "-prompt"} className={styles.assistantLabel}>
              {tSite("Question and documentation to copy")}
            </label>
            <Textarea
              id={id + "-prompt"}
              readOnly
              value={prompt}
              rows={9}
              className={styles.assistantPrompt}
            />
            <div className={styles.assistantReadyActions}>
              <button
                type="button"
                className={styles.assistantCopy}
                disabled={copyStatus === "copying"}
                onClick={copyPrompt}
              >
                {copyStatus === "success" ? (
                  <Check aria-hidden="true" />
                ) : (
                  <Copy aria-hidden="true" />
                )}
                {tSite(
                  copyStatus === "copying"
                    ? "Copying…"
                    : copyStatus === "success"
                      ? "Copied"
                      : "Copy for my AI",
                )}
              </button>
              <button
                type="button"
                className={styles.assistantEdit}
                onClick={() => {
                  focusQuestion.current = true;
                  resetPreparation();
                }}
              >
                <ArrowLeft aria-hidden="true" />
                {tSite("Edit question")}
              </button>
            </div>
            <p className={styles.assistantHint}>
              {tSite(
                "Paste this prompt into your AI tool. Its answer will appear there.",
              )}
            </p>
          </div>
        )}
        <p role="status" className={styles.assistantStatus}>
          {fetchStatus === "error"
            ? tSite(
                "This page could not be loaded. Try again, or open its Markdown version below.",
              )
            : copyStatus === "success"
              ? tSite(
                  "Copied. Paste the prompt into your AI tool to get an answer.",
                )
              : copyStatus === "failure"
                ? tSite(
                    "Copy unavailable. Select the prepared text above and copy it manually.",
                  )
                : fetchStatus === "loading"
                  ? tSite("Loading the official documentation…")
                  : ""}
        </p>
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

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, Check, Copy, Sparkles, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Textarea, cn } from "@pycolors/ui";
import { useCopy } from "@/lib/i18n/use-copy";
import { usePathname } from "@/lib/i18n/navigation";
import { docsPageContext } from "@/lib/docs/page-context";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";
import { LATEST_MARKETING_RELEASE } from "@/lib/marketing-release";
import { copyCommand } from "./copyable-command";
import styles from "./docs-design.module.css";

type CopyStatus = "idle" | "copying" | "success" | "failure";

function pageSuggestion(path: string) {
  if (path === "/docs")
    return {
      label: "Choose my starting point",
      question:
        "Help me choose between PyColors UI, Blocks, Starter Free, Starter Pro, and Templates. Ask about my project's needs first.",
    };
  if (path.includes("installation"))
    return {
      label: "Install the library",
      question:
        "Guide me through this installation. Ask about my framework, package manager, and installed versions first.",
    };
  if (path.startsWith("/docs/design-system") || path.includes("theming"))
    return {
      label: "Apply this theme",
      question:
        "Help me apply these documented design tokens and support light and dark modes in my project.",
    };
  if (path.startsWith("/docs/ui/"))
    return {
      label: "Use this component",
      question:
        "Help me use the component documented on this page, including its public props, keyboard behavior, and accessible labels.",
    };
  if (path.startsWith("/docs/blocks"))
    return {
      label: "Adapt this block",
      question:
        "Help me adapt this documented block to my application while preserving its responsive layout and accessibility.",
    };
  if (path.startsWith("/docs/starter-pro"))
    return {
      label: "Follow this setup",
      question:
        "Guide me through this Starter Pro setup. Ask which steps I have completed and which environment I am using.",
    };
  return {
    label: "Help me get started",
    question: "Help me follow the steps on this page.",
  };
}

const sharedSuggestions = [
  { label: "Summarize this page", question: "Summarize this page." },
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
}: Readonly<{
  page: ReturnType<typeof docsPageContext>;
  className?: string;
}>) {
  const tSite = useCopy();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [project, setProject] = useState("");
  const [prompt, setPrompt] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [fetchStatus, setFetchStatus] = useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const request = useRef<AbortController | null>(null);
  const markdown = useRef<string | null>(null);
  const questionInput = useRef<HTMLTextAreaElement>(null);
  const promptInput = useRef<HTMLTextAreaElement>(null);
  const revision = useRef(0);
  const suggestions = [pageSuggestion(page.path), ...sharedSuggestions];
  const versions =
    page.path === "/docs" ||
    /^\/docs\/(?:ui|blocks|design-system)(?:\/|$)/.test(page.path)
      ? `UI ${UI_VERSION} · Tokens ${TOKENS_VERSION}`
      : `${tSite("Site & Docs")} ${LATEST_MARKETING_RELEASE.version}`;

  useEffect(
    () => () => {
      request.current?.abort();
      revision.current++;
    },
    [],
  );
  useEffect(() => {
    if (copyStatus === "failure") promptInput.current?.focus();
  }, [copyStatus]);

  function resetCopy() {
    revision.current++;
    setPrompt("");
    setExpanded(false);
    setCopyStatus("idle");
  }
  async function loadDocumentation() {
    if (markdown.current !== null) return markdown.current;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setFetchStatus("loading");
    try {
      const response = await fetch(page.markdownUrl, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Documentation unavailable");
      const text = await response.text();
      if (controller.signal.aborted) return null;
      if (!text.trim()) throw new Error("Empty documentation");
      markdown.current = text;
      setTitle(text.match(/^# +(.+)$/m)?.[1]?.trim() ?? "");
      setFetchStatus("idle");
      return text;
    } catch {
      if (!controller.signal.aborted) setFetchStatus("error");
      return null;
    }
  }
  function changeOpen(value: boolean) {
    if (value) {
      // Load only the public page on opening; copying remains an explicit action.
      void loadDocumentation();
    } else {
      request.current?.abort();
      revision.current++;
      setFetchStatus("idle");
      setCopyStatus("idle");
    }
    setOpen(value);
  }
  async function copyContext() {
    const currentRevision = ++revision.current;
    setCopyStatus("copying");
    const text = markdown.current ?? (await loadDocumentation());
    if (currentRevision !== revision.current) return;
    if (text === null) {
      setCopyStatus("idle");
      return;
    }
    const brief = [
      tSite(
        "Use the official PyColors documentation below to answer in {value0}. Use documented public APIs, cite the source page, distinguish documented behavior from assumptions, and ask for missing details.",
        { value0: tSite.locale === "fr" ? "français" : "English" },
      ),
      `${tSite("Documentation page")}: ${title || page.url}\n${page.url}`,
      `${tSite("Documentation references")}: ${versions} · ${tSite.locale.toUpperCase()}`,
      tSite(
        "These are documentation reference versions. Ask about the project's installed versions before proposing changes.",
      ),
      `${tSite("Your question")}: ${question.trim() || tSite("Explain this page and the next steps I should take.")}`,
      ...(project.trim()
        ? [`${tSite("Project context")}: ${project.trim()}`]
        : []),
      `${tSite("Official documentation")}\n\n${text}`,
    ].join("\n\n");
    setPrompt(brief);
    const result = await copyCommand(brief);
    if (currentRevision !== revision.current) return;
    setCopyStatus(result.kind === "success" ? "success" : "failure");
    setExpanded(result.kind !== "success");
  }
  const busy = fetchStatus === "loading" || copyStatus === "copying";
  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(styles.assistantTrigger, className)}
        >
          <Sparkles aria-hidden="true" />
          {tSite("Use with my AI")}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.assistantOverlay} />
        <Dialog.Content
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
            <Dialog.Close asChild>
              <button
                type="button"
                className={styles.assistantClose}
                aria-label={tSite("Close AI help")}
              >
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Title className={styles.assistantTitle}>
            {tSite("Your question. The right context.")}
          </Dialog.Title>
          <Dialog.Description className={styles.assistantDescription}>
            {tSite(
              "Copy your question with the official documentation, then paste it into your AI tool. The answer will appear there.",
            )}
          </Dialog.Description>
          <div
            className={styles.assistantSource}
            aria-busy={fetchStatus === "loading"}
          >
            <BookOpen aria-hidden="true" />
            <div>
              <span>{tSite("Documentation included")}</span>
              <a href={page.url} target="_blank" rel="noopener noreferrer">
                {title || tSite("Current documentation page")}
                <span className="sr-only">{tSite("Opens in a new tab")}</span>
              </a>
              <p className={styles.assistantSourcePath}>
                {new URL(page.url).pathname}
              </p>
              <p className={styles.assistantReferences}>
                {tSite("Documentation references")}: {versions} ·{" "}
                {tSite.locale.toUpperCase()}
              </p>
            </div>
          </div>
          <form
            className={styles.assistantForm}
            aria-busy={busy}
            onSubmit={(event) => {
              event.preventDefault();
              void copyContext();
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
                    resetCopy();
                    setQuestion(tSite(item.question));
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
              onChange={(event) => {
                resetCopy();
                setQuestion(event.target.value);
              }}
              maxLength={2000}
              rows={3}
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
                  resetCopy();
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
              disabled={busy}
            >
              {copyStatus === "success" ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
              {tSite(
                fetchStatus === "loading"
                  ? "Loading the official documentation…"
                  : copyStatus === "copying"
                    ? "Copying…"
                    : copyStatus === "success"
                      ? "Copied"
                      : "Copy question and context",
              )}
            </button>
          </form>
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
                      "Copy unavailable. Select the prepared text below and copy it manually.",
                    )
                  : ""}
          </p>
          {prompt ? (
            <details
              className={styles.assistantContext}
              open={expanded}
              onToggle={(event) => setExpanded(event.currentTarget.open)}
            >
              <summary>{tSite("Review included context")}</summary>
              <label htmlFor={id + "-prompt"} className={styles.assistantLabel}>
                {tSite("Question and documentation to copy")}
              </label>
              <Textarea
                ref={promptInput}
                id={id + "-prompt"}
                readOnly
                value={prompt}
                rows={8}
                className={styles.assistantPrompt}
              />
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

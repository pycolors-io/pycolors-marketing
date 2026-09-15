"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

type View = "preview" | "source";

const views: readonly View[] = ["preview", "source"];

export function BlockShowcaseTabs({
  preview,
  source,
  sourcePath,
}: Readonly<{
  preview: ReactNode;
  source: string;
  sourcePath: string;
}>) {
  const id = useId();
  const [view, setView] = useState<View>("preview");
  const [copied, setCopied] = useState(false);

  async function copySource() {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const currentIndex = views.indexOf(view);
    const nextView =
      event.key === "Home"
        ? views[0]
        : event.key === "End"
          ? views.at(-1)
          : views[
              (currentIndex +
                (event.key === "ArrowRight" ? 1 : -1) +
                views.length) %
                views.length
            ];

    if (nextView) {
      setView(nextView);
      document.getElementById(`${id}-${nextView}-tab`)?.focus();
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 sm:px-6">
        <div
          aria-label="Block view"
          className="inline-flex h-9 items-center rounded-md bg-surface-muted/60 p-1"
          role="tablist"
        >
          {views.map((item) => {
            const selected = view === item;
            return (
              <button
                aria-controls={`${id}-${item}-panel`}
                aria-selected={selected}
                className="inline-flex h-7 items-center justify-center rounded-sm px-3 text-xs font-medium capitalize text-muted-foreground transition data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-selected={selected}
                id={`${id}-${item}-tab`}
                key={item}
                onClick={() => setView(item)}
                onKeyDown={onTabKeyDown}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
              >
                {item === "source" ? "Code" : "Preview"}
              </button>
            );
          })}
        </div>
        <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
          {sourcePath}
        </span>
      </div>

      <div
        aria-labelledby={`${id}-preview-tab`}
        hidden={view !== "preview"}
        id={`${id}-preview-panel`}
        role="tabpanel"
      >
        <div className="min-h-[28rem] overflow-auto bg-surface-muted/20 p-5 sm:p-8 lg:min-h-[36rem] lg:p-10">
          {preview}
        </div>
      </div>

      <div
        aria-labelledby={`${id}-source-tab`}
        hidden={view !== "source"}
        id={`${id}-source-panel`}
        role="tabpanel"
      >
        <div className="relative bg-neutral-950 text-neutral-100">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-neutral-950/95 px-4 py-3 backdrop-blur sm:px-6">
            <span className="truncate font-mono text-xs text-neutral-400">
              {sourcePath}
            </span>
            <button
              className="inline-flex min-h-9 shrink-0 items-center rounded-md border border-white/15 bg-white/5 px-3 text-xs font-medium text-neutral-100 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={copySource}
              type="button"
            >
              {copied ? "Copied" : "Copy code"}
            </button>
          </div>
          <div className="max-h-[36rem] overflow-auto [&_figure]:m-0 [&_figure]:rounded-none [&_pre]:max-h-none">
            <DynamicCodeBlock
              code={source}
              lang="tsx"
              options={{
                themes: {
                  light: "github-light",
                  dark: "github-dark",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

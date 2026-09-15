"use client";

import * as React from "react";
import { Check, Copy, Monitor, RotateCcw, Smartphone, Tablet } from "lucide-react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

import { cn } from "@pycolors/ui/lib/utils";

const viewports = [
  { id: "desktop", label: "Desktop", width: "100%", icon: Monitor },
  { id: "tablet", label: "Tablet", width: "768px", icon: Tablet },
  { id: "mobile", label: "Mobile", width: "390px", icon: Smartphone },
] as const;

type Viewport = (typeof viewports)[number]["id"];

type BlockShowcaseTabsProps = Readonly<{
  preview: React.ReactNode;
  source: string;
}>;

const iconButtonClassName =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-accent aria-pressed:text-foreground";

// The picker resizes a component canvas, not the browser viewport. These
// bounded overrides mirror the canonical Blocks' media-query results at the
// simulated width so desktop browser breakpoints cannot leak into the preview.
const tabletSimulationClassName = [
  "[&_[data-slot=pricing-plans-list]]:!grid-cols-2",
  "[&_[data-slot=workspace-invitation]]:!flex-col",
  "[&_[data-slot=audit-log-panel]>div:first-child]:!flex-col",
  "[&_[data-slot=audit-log-event]_article]:!flex-col",
].join(" ");

const mobileSimulationClassName = [
  "[&_[data-slot=pricing-plans-list]]:!grid-cols-1",
  "[&_[data-slot=billing-overview-panel]>dl]:!grid-cols-1",
  "[&_[data-slot=payment-method-panel]>dl]:!grid-cols-1",
  "[&_[data-slot=workspace-member]]:!flex-col",
  "[&_[data-slot=workspace-invitation]]:!flex-col",
  "[&_[data-slot=settings-panel-section]]:!grid-cols-1",
  "[&_[data-slot=audit-log-panel]>div:first-child]:!flex-col",
  "[&_[data-slot=audit-log-event]_article]:!flex-col",
  "[&_[data-slot=responsive-sidebar-desktop]]:!hidden",
  "[&_[data-slot=responsive-sidebar-mobile-trigger]]:!inline-flex",
].join(" ");

function getSimulationClassName(viewport: Viewport) {
  if (viewport === "mobile") return mobileSimulationClassName;
  if (viewport === "tablet") return tabletSimulationClassName;
  return "";
}

export function BlockShowcaseTabs({
  preview,
  source,
}: BlockShowcaseTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview",
  );
  const [viewport, setViewport] = React.useState<Viewport>("desktop");
  const [previewKey, setPreviewKey] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewportWidth =
    viewports.find((option) => option.id === viewport)?.width ?? "100%";
  const previewPaddingClassName =
    viewport === "mobile"
      ? "p-3"
      : viewport === "tablet"
        ? "p-5"
        : "p-4 sm:p-6 lg:p-8";
  const simulationClassName = getSimulationClassName(viewport);

  async function copySource() {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 1500);
  }

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-background">
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface-muted/35 px-2 py-1.5 sm:px-3">
        <div
          aria-label="Block showcase"
          className="flex items-center gap-1"
          role="tablist"
        >
          {(["preview", "code"] as const).map((tab) => {
            const selected = activeTab === tab;
            const label = tab === "preview" ? "Preview" : "Code";
            return (
              <button
                aria-controls={`block-showcase-${tab}`}
                aria-selected={selected}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
                id={`block-showcase-${tab}-tab`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>

        {activeTab === "preview" ? (
          <div className="flex min-w-0 items-center gap-1">
            <div
              aria-label="Preview viewport"
              className="flex items-center gap-0.5"
              role="group"
            >
              {viewports.map((option) => {
                const selected = viewport === option.id;
                const Icon = option.icon;
                return (
                  <button
                    aria-label={option.label}
                    aria-pressed={selected}
                    className={iconButtonClassName}
                    key={option.id}
                    onClick={() => setViewport(option.id)}
                    title={option.label}
                    type="button"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <span
              aria-hidden="true"
              className="mx-1 h-5 w-px bg-border-subtle"
            />
            <button
              aria-label="Reset preview"
              className={iconButtonClassName}
              onClick={() => setPreviewKey((key) => key + 1)}
              title="Reset preview"
              type="button"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            aria-label="Copy code"
            className="inline-flex min-h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={copySource}
            type="button"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy code"}
          </button>
        )}
      </div>

      <div
        aria-labelledby="block-showcase-preview-tab"
        className={cn(activeTab !== "preview" && "hidden")}
        id="block-showcase-preview"
        role="tabpanel"
      >
        <div className="overflow-x-auto bg-surface-muted/15 py-4 sm:py-6">
          <div
            className="mx-auto max-w-full transition-[width] duration-200"
            data-viewport={viewport}
            key={previewKey}
            style={{ width: viewportWidth }}
          >
            <div
              className={`${previewPaddingClassName} ${simulationClassName}`}
              data-preview-layout={viewport}
            >
              {preview}
            </div>
          </div>
        </div>
      </div>

      <div
        aria-labelledby="block-showcase-code-tab"
        className={cn(activeTab !== "code" && "hidden")}
        id="block-showcase-code"
        role="tabpanel"
      >
        <div className="max-h-[42rem] overflow-auto bg-[#0d1117]">
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
  );
}

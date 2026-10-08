"use client";

import {
  ExternalLink,
  Maximize2,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
} from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import type { BlockSource } from "@/lib/blocks/source";
import { BlockSourceExplorer } from "./block-source-explorer";
import styles from "./block-showcase.module.css";

type View = "preview" | "source";
type Viewport = "desktop" | "tablet" | "mobile";

const views: readonly View[] = ["preview", "source"];
const viewports = [
  { id: "desktop", label: "Desktop", width: "100%", icon: Monitor },
  { id: "tablet", label: "Tablet", width: "768px", icon: Tablet },
  { id: "mobile", label: "Mobile", width: "390px", icon: Smartphone },
] as const satisfies readonly {
  id: Viewport;
  label: string;
  width: string;
  icon: typeof Monitor;
}[];

const iconButtonClassName = `${styles.control} inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-accent aria-pressed:text-foreground motion-reduce:transition-none`;

const tabletSimulationClassName = [
  "[&_[data-slot=pricing-plans-list]]:!grid-cols-2",
  "[&_[data-slot=stats-overview-metrics]]:!grid-cols-2",
  "[&_[data-slot=workspace-invitation]]:!flex-col",
  "[&_[data-slot=audit-log-panel]>div:first-child]:!flex-col",
  "[&_[data-slot=audit-log-event]_article]:!flex-col",
].join(" ");

const mobileSimulationClassName = [
  "[&_[data-slot=pricing-plans-list]]:!grid-cols-1",
  "[&_[data-slot=stats-overview-metrics]]:!grid-cols-1",
  "[&_[data-slot=billing-overview-panel]>dl]:!grid-cols-1",
  "[&_[data-slot=billing-overview-panel]>div:last-child]:!flex-col",
  "[&_[data-slot=payment-method-panel]>header>div]:!flex-col",
  "[&_[data-slot=payment-method-panel]>dl]:!grid-cols-1",
  "[&_[data-slot=payment-method-panel]>div:last-child]:!flex-col",
  "[&_[data-slot=workspace-members-panel]>div:first-child]:!flex-col",
  "[&_[data-slot=workspace-member]]:!flex-col",
  "[&_[data-slot=workspace-invitations-panel]>div:first-child]:!flex-col",
  "[&_[data-slot=workspace-invitation]]:!flex-col",
  "[&_[data-slot=audit-log-panel]>div:first-child]:!flex-col",
  "[&_[data-slot=audit-log-panel]>div:first-child>div:last-child]:!flex-col",
  "[&_[data-slot=audit-log-event]_article]:!flex-col",
  "[&_[data-slot=settings-panel-section]]:!grid-cols-1",
  "[&_[data-slot=settings-panel-section]>div:last-child]:!grid-cols-1",
  "[&_[data-slot=settings-panel-field]]:!col-span-1",
  "[&_[data-slot=settings-panel-actions]]:!flex-col",
  "[&_[data-slot=settings-panel-actions]>button]:!w-full",
  "[&_[data-slot=data-table-query]>div:first-child]:!flex-col",
  "[&_[data-slot=data-table-pagination]]:!flex-col",
  "[&_[data-slot=responsive-sidebar-desktop]]:!hidden",
  "[&_[data-slot=responsive-sidebar-mobile-trigger]]:!inline-flex",
].join(" ");

const simulatedPreviewStyles = `
[data-preview-layout="tablet"] [data-slot="audit-log-panel"] > div:first-child,
[data-preview-layout="mobile"] [data-slot="audit-log-panel"] > div:first-child,
[data-preview-layout="tablet"] [data-slot="audit-log-event"] > article,
[data-preview-layout="mobile"] [data-slot="audit-log-event"] > article {
  flex-direction: column !important;
}

[data-preview-layout="mobile"] input,
[data-preview-layout="mobile"] textarea,
[data-preview-layout="mobile"] select {
  box-sizing: border-box;
  min-width: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
}
`;

function getSimulationClassName(viewport: Viewport) {
  if (viewport === "mobile") return mobileSimulationClassName;
  if (viewport === "tablet") return tabletSimulationClassName;
  return "";
}

export function BlockShowcaseTabs({
  preview,
  previewHref,
  source,
}: Readonly<{
  preview: ReactNode;
  previewHref: string;
  source: BlockSource;
}>) {
  const id = useId();
  const previewSurfaceRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [fullscreenAvailable, setFullscreenAvailable] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  useEffect(() => {
    setFullscreenAvailable(Boolean(document.fullscreenEnabled));
  }, []);
  const [previewKey, setPreviewKey] = useState(0);
  const viewportWidth =
    viewports.find((item) => item.id === viewport)?.width ?? "100%";
  const previewPaddingClassName =
    viewport === "mobile"
      ? "p-3"
      : viewport === "tablet"
        ? "p-5"
        : "p-4 sm:p-6 lg:p-8";
  const simulationClassName = getSimulationClassName(viewport);

  async function enterFullscreen() {
    if (!document.fullscreenEnabled || !previewSurfaceRef.current) return;
    try {
      await previewSurfaceRef.current.requestFullscreen();
      setFullscreenError(false);
    } catch {
      setFullscreenError(true);
    }
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
    <div className="w-full overflow-hidden rounded-[5px] border border-border-subtle bg-background">
      <style>{simulatedPreviewStyles}</style>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle p-2 sm:px-3">
        <div
          aria-label="Block view"
          className="inline-flex items-center gap-1"
          role="tablist"
        >
          {views.map((item) => {
            const selected = view === item;
            return (
              <button
                aria-controls={`${id}-${item}-panel`}
                aria-selected={selected}
                className={`${styles.control} inline-flex h-9 items-center justify-center rounded-[5px] px-3 text-xs font-medium text-muted-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none`}
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

        {view === "preview" ? (
          <div
            aria-label="Preview viewport"
            className="inline-flex w-full max-w-full flex-wrap items-center justify-between sm:w-auto sm:gap-0.5"
            role="group"
          >
            {viewports.map((item) => {
              const Icon = item.icon;
              const selected = viewport === item.id;
              return (
                <button
                  aria-label={`${item.label} preview`}
                  aria-pressed={selected}
                  className={iconButtonClassName}
                  key={item.id}
                  onClick={() => setViewport(item.id)}
                  title={`${item.label} preview`}
                  type="button"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </button>
              );
            })}
            <span
              aria-hidden="true"
              className="mx-1 hidden h-5 w-px bg-border-subtle sm:block"
            />
            <a
              aria-label="Open preview in new tab"
              className={iconButtonClassName}
              href={previewHref}
              rel="noopener noreferrer"
              target="_blank"
              title="Open preview in new tab"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
            <button
              aria-label="Enter fullscreen"
              className={`${iconButtonClassName} disabled:opacity-40`}
              disabled={!fullscreenAvailable}
              onClick={enterFullscreen}
              title="Enter fullscreen"
              type="button"
            >
              <Maximize2 aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Reset preview"
              className={iconButtonClassName}
              onClick={() => setPreviewKey((value) => value + 1)}
              title="Reset preview"
              type="button"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
            </button>
          </div>
        ) : (
          <span className="px-2 text-xs text-muted-foreground">
            {source.files.length} {source.files.length === 1 ? "file" : "files"}
          </span>
        )}
      </div>

      <div
        aria-labelledby={`${id}-preview-tab`}
        hidden={view !== "preview"}
        id={`${id}-preview-panel`}
        ref={previewSurfaceRef}
        className={styles.preview}
        role="tabpanel"
      >
        <div className={`${styles.stage} overflow-auto p-3 sm:p-6 lg:p-8`}>
          <div
            className="mx-auto max-w-full overflow-auto rounded-[5px] bg-background shadow-sm transition-[width] duration-200 motion-reduce:transition-none"
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

      {fullscreenError ? (
        <p role="status" className="px-4 py-2 text-xs text-muted-foreground">
          Fullscreen unavailable. Open the preview in a new tab.
        </p>
      ) : null}

      <div
        aria-labelledby={`${id}-source-tab`}
        hidden={view !== "source"}
        id={`${id}-source-panel`}
        role="tabpanel"
      >
        <BlockSourceExplorer
          key={source.directory}
          source={source}
          active={view === "source"}
        />
      </div>
    </div>
  );
}

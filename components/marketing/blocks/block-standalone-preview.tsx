"use client";

import { Maximize2, Minimize2, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const iconButtonClassName =
  "inline-flex size-9 items-center justify-center rounded-md border border-border-subtle bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function BlockStandalonePreview({
  preview,
  title,
}: Readonly<{
  preview: ReactNode;
  title: string;
}>) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [previewKey, setPreviewKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    function syncFullscreenState() {
      setFullscreen(document.fullscreenElement === surfaceRef.current);
    }

    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  async function toggleFullscreen() {
    if (!document.fullscreenEnabled || !surfaceRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await surfaceRef.current.requestFullscreen();
  }

  return (
    <div className="min-h-dvh bg-background p-3 sm:p-5" ref={surfaceRef}>
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1440px] flex-col overflow-hidden rounded-xl border border-border-subtle bg-background sm:min-h-[calc(100dvh-2.5rem)]">
        <header className="flex min-h-14 items-center justify-between gap-4 border-b border-border-subtle px-4 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">Interactive preview</p>
          </div>
          <div
            aria-label="Preview actions"
            className="flex items-center gap-1"
            role="group"
          >
            <button
              aria-label="Reset preview"
              className={iconButtonClassName}
              onClick={() => setPreviewKey((value) => value + 1)}
              title="Reset preview"
              type="button"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className={iconButtonClassName}
              disabled={
                typeof document !== "undefined" && !document.fullscreenEnabled
              }
              onClick={toggleFullscreen}
              title={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              type="button"
            >
              {fullscreen ? (
                <Minimize2 aria-hidden="true" className="size-4" />
              ) : (
                <Maximize2 aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
        </header>
        <div className="flex flex-1 items-start justify-center overflow-auto bg-surface-muted/20 p-3 sm:p-6 lg:p-8">
          <div
            className="w-full rounded-lg bg-background p-3 shadow-sm sm:p-6 lg:p-8"
            key={previewKey}
          >
            {preview}
          </div>
        </div>
      </div>
    </div>
  );
}

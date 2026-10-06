"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SerializedThemeResult, ThemeMode } from "@pycolors/color-engine";
import { Button } from "@pycolors/ui";
import {
  ThemeComponentsPreview,
  INITIAL_THEME_COMPONENTS_STATE,
} from "@/components/theme-builder/theme-components-preview";
import { ThemeModeControl } from "@/components/theme-builder/theme-mode-control";
import { DEFAULT_THEME_FONT } from "@/components/theme-builder/theme-typography";

export function UiLivePreview({
  modes,
}: Readonly<{ modes: SerializedThemeResult["modes"] }>) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [view, setView] = useState(INITIAL_THEME_COMPONENTS_STATE);
  return (
    <div className="min-w-0 overflow-hidden rounded-[5px] border border-border-subtle">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-background px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 text-xs font-medium">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />{" "}
          Live components
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <ThemeModeControl
            idPrefix="ui-showcase-mode"
            value={mode}
            onChange={setMode}
          />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-auto min-h-10 max-w-full whitespace-normal rounded-[5px] px-3 py-2 text-xs"
          >
            <Link href="/tools/theme-builder">
              Customize colors{" "}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
      <ThemeComponentsPreview
        theme={modes[mode]}
        mode={mode}
        fontFamily={DEFAULT_THEME_FONT.previewFamily}
        view={view}
        onViewChange={setView}
      />
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border-subtle bg-background px-4 py-3 text-xs text-muted-foreground sm:px-5">
        <p>Demo content · Built with public PyColors components.</p>
        <Link
          href="https://ui.pycolors.io"
          className="inline-flex min-h-10 items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Open UI Explorer{" "}
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

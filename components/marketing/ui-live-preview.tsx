"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { useState } from "react";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import type { SerializedThemeResult, ThemeMode } from "@pycolors/color-engine";
import { Button } from "@pycolors/ui";
import { UiWorkspacePreview } from "./ui-workspace-preview";
import { UiConversationPreview } from "./ui-conversation-preview";
import { ThemeModeControl } from "@/components/theme-builder/theme-mode-control";

export function UiLivePreview({
  modes,
}: Readonly<{ modes: SerializedThemeResult["modes"] }>) {
  const tSite = useCopy();

  const [mode, setMode] = useState<ThemeMode>("light");
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-border-subtle">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-background px-5 py-4 sm:px-8">
        <p className="flex items-center gap-2 text-xs font-medium">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
          {tSite(" ")}
          {tSite("Live components")}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#conversation-primitives"
            className="inline-flex min-h-11 items-center px-2 text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {tSite("Try a conversation")}
          </a>
          <ThemeModeControl
            idPrefix="ui-showcase-mode"
            value={mode}
            onChange={setMode}
          />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-auto min-h-10 max-w-full whitespace-normal rounded-2xl px-3 py-2 text-xs"
          >
            <Link href="/tools/theme-builder">
              {tSite("Customize colors")}
              {tSite(" ")}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
      <UiWorkspacePreview theme={modes[mode]} mode={mode}>
        <UiConversationPreview />
      </UiWorkspacePreview>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border-subtle bg-background px-4 py-3 text-xs text-muted-foreground sm:px-5">
        <p>{tSite("Demo content · Built with public PyColors components.")}</p>
        <Link
          href="https://ui.pycolors.io"
          className="inline-flex min-h-10 items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {tSite("Open UI Explorer")}
          {tSite(" ")}
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

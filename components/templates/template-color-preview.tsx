"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pycolors/ui";

type TemplateColorPreviewProps = Readonly<{
  previews: readonly Readonly<{
    mode: "dark" | "light";
    label: string;
    content: ReactNode;
  }>[];
}>;

/** The page owns the screenshots; only color-mode selection runs on the client. */
export function TemplateColorPreview({ previews }: TemplateColorPreviewProps) {
  return (
    <Tabs defaultValue="dark" className="flex h-full min-w-0 flex-col gap-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-background px-4 py-2 sm:px-6">
        <span className="text-xs font-medium text-muted-foreground">
          Template preview
        </span>
        <TabsList
          aria-label="Template color mode"
          className="h-auto gap-1 rounded-[5px] bg-surface-muted/60 p-1"
        >
          {previews.map((preview) => (
            <TabsTrigger
              key={preview.mode}
              value={preview.mode}
              className="min-h-11 min-w-16 rounded-[3px] border-0 px-3 text-xs shadow-none transition-colors data-[state=active]:bg-background data-[state=active]:shadow-none motion-reduce:transition-none"
            >
              {preview.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {previews.map((preview) => (
        <TabsContent
          key={preview.mode}
          value={preview.mode}
          className="m-0 flex min-w-0 flex-1 items-center rounded-none p-4 focus-visible:ring-inset data-[state=inactive]:hidden sm:p-7"
        >
          {preview.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

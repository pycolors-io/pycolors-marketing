"use client";

import { useId, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pycolors/ui";

export function BlockShowcaseTabs({
  preview,
  source,
  sourcePath,
}: Readonly<{
  preview: ReactNode;
  source: string;
  sourcePath: string;
}>) {
  const sourceId = useId();
  const [copied, setCopied] = useState(false);

  async function copySource() {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Tabs className="w-full" defaultValue="preview">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 sm:px-6">
        <TabsList aria-label="Block view" className="h-9 bg-surface-muted/60" size="sm">
          <TabsTrigger size="sm" value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger size="sm" value="source">
            Code
          </TabsTrigger>
        </TabsList>
        <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
          {sourcePath}
        </span>
      </div>

      <TabsContent className="mt-0" value="preview">
        <div className="min-h-[28rem] overflow-auto bg-surface-muted/20 p-5 sm:p-8 lg:min-h-[36rem] lg:p-10">
          {preview}
        </div>
      </TabsContent>

      <TabsContent className="mt-0" value="source">
        <div className="relative bg-neutral-950 text-neutral-100">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-neutral-950/95 px-4 py-3 backdrop-blur sm:px-6">
            <span className="truncate font-mono text-xs text-neutral-400">
              {sourcePath}
            </span>
            <button
              className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 text-xs font-medium text-neutral-100 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={copySource}
              type="button"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy code"}
            </button>
          </div>
          <pre
            className="max-h-[36rem] overflow-auto p-5 text-[13px] leading-6 sm:p-6"
            id={sourceId}
          >
            <code>{source}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
}

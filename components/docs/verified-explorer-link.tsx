"use client";

import { useEffect, useState } from "react";
import { ExternalLink, MonitorPlay } from "lucide-react";
import { UI_EXPLORER_URL } from "@/lib/docs/ui-explorer";

/** New stories can exist in a docs preview before the public Explorer ships. */
export function VerifiedExplorerLink({
  href,
  storyId,
}: {
  href: string;
  storyId: string;
}) {
  const [verified, setVerified] = useState<string>();
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let active = true;
    void fetch(`${UI_EXPLORER_URL}index.json`, {
      signal: controller.signal,
      credentials: "omit",
    })
      .then(async (response) => {
        if (!response.ok) return;
        const catalog: unknown = await response.json();
        if (!catalog || typeof catalog !== "object" || !("entries" in catalog))
          return;
        const entries = catalog.entries;
        if (
          !entries ||
          typeof entries !== "object" ||
          !Object.hasOwn(entries, storyId)
        )
          return;
        const entry: unknown = (entries as Record<string, unknown>)[storyId];
        if (
          entry &&
          typeof entry === "object" &&
          "type" in entry &&
          entry.type === "story" &&
          active
        )
          setVerified(storyId);
      })
      .catch(() => {
        /* The inline example remains available offline or before publication. */
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [storyId]);
  if (verified !== storyId)
    return (
      <a
        href="#preview"
        className="inline-flex min-h-10 items-center gap-2 text-xs font-medium text-muted-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <MonitorPlay className="size-3.5" aria-hidden="true" />
        Try the example below
      </a>
    );
  return (
    <a
      href={href}
      aria-label="Open interactive example in PyColors UI Explorer"
      className="inline-flex min-h-10 items-center gap-2 text-xs font-medium text-muted-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      Open in UI Explorer
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}

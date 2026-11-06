import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { cn } from "@pycolors/ui";

import { marketingSurfaceToneClass, type MarketingTone } from "./tones";

export type MarketingStatCardProps = Readonly<{
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  tone?: MarketingTone;
  className?: string;
}>;

/**
 * One proof point or status summary.
 *
 * Label, value, and description are always text, so a stat never communicates
 * through tone/color alone. The caller owns any surrounding list semantics.
 */
export function MarketingStatCard({
  label,
  value,
  description,
  tone = "neutral",
  className,
}: MarketingStatCardProps) {
  const tSite = useCopy();

  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 shadow-soft",
        marketingSurfaceToneClass[tone],
        className,
      )}
    >
      <div className="text-xs text-muted-foreground">{tSite(label)}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">
        {tSite(value)}
      </div>
      {description ? (
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          {tSite(description)}
        </p>
      ) : null}
    </div>
  );
}

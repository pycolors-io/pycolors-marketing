import * as React from "react";
import { cn } from "@pycolors/ui";

export type MarketingSectionWidth = "full" | "content" | "reading";
export type MarketingSectionSpacing = "compact" | "default";

export type MarketingSectionShellProps = Readonly<{
  children: React.ReactNode;
  id?: string;
  width?: MarketingSectionWidth;
  spacing?: MarketingSectionSpacing;
  className?: string;
  /** Points at the id of the section heading rendered by the caller. */
  "aria-labelledby"?: string;
  "aria-label"?: string;
}>;

const widthClass: Record<MarketingSectionWidth, string> = {
  full: "w-full",
  content: "mx-auto w-full max-w-6xl",
  reading: "mx-auto w-full max-w-3xl",
};

const spacingClass: Record<MarketingSectionSpacing, string> = {
  compact: "py-10",
  default: "py-14 sm:py-16",
};

/**
 * Semantic section wrapper that owns public-page vertical rhythm and content
 * width. The caller always owns the heading and the labelling relationship.
 *
 * It never hides overflow globally: bounded scrolling stays the concern of the
 * dense table, media, or code surface that needs it.
 */
export function MarketingSectionShell({
  children,
  id,
  width = "content",
  spacing = "default",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: MarketingSectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn(spacingClass[spacing], className)}
    >
      <div className={widthClass[width]}>{children}</div>
    </section>
  );
}

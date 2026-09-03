import * as React from "react";
import { cn } from "@pycolors/ui";

import { marketingPillToneClass, type MarketingTone } from "./tones";

export type MarketingPillListProps = Readonly<{
  /** Expects `MarketingPill` children. */
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  "aria-label"?: string;
}>;

export type MarketingPillProps = Readonly<{
  children: React.ReactNode;
  tone?: MarketingTone;
  /** Decorative icon. Meaning must stay in the pill text. */
  icon?: React.ReactNode;
  className?: string;
}>;

/**
 * Wrapping list for lightweight marketing labels.
 *
 * Pills are presentational: they never become buttons, links, or a public
 * `Badge` replacement.
 */
export function MarketingPillList({
  children,
  align = "left",
  className,
  "aria-label": ariaLabel,
}: MarketingPillListProps) {
  return (
    <ul
      aria-label={ariaLabel}
      className={cn(
        "flex flex-wrap gap-2",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {children}
    </ul>
  );
}

/**
 * One presentational label. Must be rendered inside `MarketingPillList` (or
 * another `ul`/`ol`) to keep list semantics valid.
 */
export function MarketingPill({
  children,
  tone = "neutral",
  icon,
  className,
}: MarketingPillProps) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[5px] border px-2.5 py-1 text-xs",
        marketingPillToneClass[tone],
        className,
      )}
    >
      {icon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      ) : null}
      {children}
    </li>
  );
}

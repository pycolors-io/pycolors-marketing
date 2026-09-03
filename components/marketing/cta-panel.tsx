import * as React from "react";
import { cn } from "@pycolors/ui";

import {
  marketingSurfaceToneClass,
  type MarketingNavigationTone,
} from "./tones";
import type { MarketingCardHeadingLevel } from "./feature-card";

export type MarketingActionAlign = "left" | "center";

export type MarketingActionGroupProps = Readonly<{
  /** Caller-owned links/buttons in primary-first DOM order. */
  children: React.ReactNode;
  align?: MarketingActionAlign;
  className?: string;
}>;

export type MarketingCtaPanelProps = Readonly<{
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Usually a `MarketingActionGroup`. */
  actions?: React.ReactNode;
  tone?: MarketingNavigationTone;
  align?: MarketingActionAlign;
  headingLevel?: MarketingCardHeadingLevel;
  titleId?: string;
  className?: string;
}>;

/**
 * Groups conversion actions without reordering them: the visual order always
 * matches the DOM order the caller wrote, so the primary action stays first
 * for keyboard and assistive-technology users.
 */
export function MarketingActionGroup({
  children,
  align = "left",
  className,
}: MarketingActionGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center",
        align === "center" ? "sm:justify-center" : "sm:justify-start",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Closing or in-section conversion surface.
 *
 * The panel owns heading, body, and action placement only. It never owns
 * checkout, pricing, or product behavior: actions stay caller-owned links or
 * buttons.
 */
export function MarketingCtaPanel({
  title,
  description,
  actions,
  tone = "neutral",
  align = "left",
  headingLevel = 2,
  titleId,
  className,
}: MarketingCtaPanelProps) {
  const Heading = `h${headingLevel}` as const;
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "rounded-[5px] border px-6 py-10 shadow-soft sm:px-10",
        marketingSurfaceToneClass[tone],
        isCentered ? "text-center" : "text-left",
        className,
      )}
    >
      <Heading
        id={titleId}
        className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            "mt-4 text-sm leading-7 text-muted-foreground",
            isCentered ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}

      {actions ? <div className="mt-8">{actions}</div> : null}
    </div>
  );
}

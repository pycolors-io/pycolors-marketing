import * as React from "react";
import { Card, cn } from "@pycolors/ui";

import { marketingSurfaceToneClass, type MarketingTone } from "./tones";

export type MarketingCardHeadingLevel = 2 | 3 | 4;

export type MarketingFeatureCardProps = Readonly<{
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Decorative icon rendered in the standard bordered square frame. */
  icon?: React.ReactNode;
  /** Supporting context such as pills or short qualifiers. */
  meta?: React.ReactNode;
  /** Caller-owned link or button. */
  action?: React.ReactNode;
  tone?: MarketingTone;
  /** Heading level supplied by the surrounding page hierarchy. */
  headingLevel?: MarketingCardHeadingLevel;
  className?: string;
}>;

/**
 * Feature, trust, and product card composition.
 *
 * It composes the public `Card` primitive and never synthesizes interactive
 * behavior: any action is a real caller-owned link or button, so a card never
 * produces nested or invalid link semantics.
 */
export function MarketingFeatureCard({
  title,
  description,
  icon,
  meta,
  action,
  tone = "neutral",
  headingLevel = 3,
  className,
}: MarketingFeatureCardProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <Card
      className={cn(
        "flex h-full flex-col justify-between rounded-[5px] border p-6 shadow-soft",
        marketingSurfaceToneClass[tone],
        className,
      )}
    >
      <div className="space-y-4">
        {icon ? (
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] border border-border-subtle bg-surface text-muted-foreground"
          >
            {icon}
          </span>
        ) : null}

        <div>
          <Heading className="text-lg font-semibold tracking-tight">
            {title}
          </Heading>

          {description ? (
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {meta ? <div className="text-sm">{meta}</div> : null}
      </div>

      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}

import * as React from "react";
import Link from "next/link";
import { Card, cn } from "@pycolors/ui";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import {
  marketingSurfaceToneClass,
  type MarketingNavigationTone,
} from "./tones";
import type { MarketingCardHeadingLevel } from "./feature-card";

export type MarketingResourceCardProps = Readonly<{
  title: React.ReactNode;
  href: string;
  description?: React.ReactNode;
  /** Supporting context such as a category, duration, or date. */
  meta?: React.ReactNode;
  tone?: MarketingNavigationTone;
  headingLevel?: MarketingCardHeadingLevel;
  className?: string;
}>;

/**
 * Returns true for hrefs that leave the marketing site.
 *
 * Protocol-relative and absolute URLs are treated as external so external
 * link safety is never skipped by accident.
 */
export function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/iu.test(href);
}

/**
 * Navigation card for one resource: the whole card is exactly one descriptive
 * link, and external destinations keep safe `target`/`rel` behavior plus a
 * screen-reader-only "opens in a new tab" hint.
 */
export function MarketingResourceCard({
  title,
  href,
  description,
  meta,
  tone = "neutral",
  headingLevel = 3,
  className,
}: MarketingResourceCardProps) {
  const Heading = `h${headingLevel}` as const;
  const isExternal = isExternalHref(href);

  const content = (
    <>
      <div className="space-y-2">
        {meta ? (
          <div className="text-xs text-muted-foreground">{meta}</div>
        ) : null}

        <Heading className="text-base font-semibold tracking-tight">
          {title}
          {isExternal ? (
            <span className="sr-only"> (opens in a new tab)</span>
          ) : null}
        </Heading>

        {description ? (
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      <span
        aria-hidden="true"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
      >
        {isExternal ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </>
  );

  const linkClassName = cn(
    "group flex h-full flex-col justify-between rounded-[5px] border p-5 shadow-soft transition-colors hover:border-border",
    marketingSurfaceToneClass[tone],
    className,
  );

  return (
    <Card asChild interactive>
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={linkClassName}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={linkClassName}>
          {content}
        </Link>
      )}
    </Card>
  );
}

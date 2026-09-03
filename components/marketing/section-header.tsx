import * as React from "react";
import { Badge, cn } from "@pycolors/ui";

export type MarketingSectionHeaderAlign = "left" | "center";

export type MarketingSectionHeaderProps = Readonly<{
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  /** Caller-owned link or button rendered beside (or under) the title. */
  action?: React.ReactNode;
  /**
   * Defaults to `center`, matching the current public-page section rhythm.
   * Conversion surfaces (`MarketingCtaPanel`, `MarketingActionGroup`) default
   * to `left` because their actions sit inside an already aligned surface.
   */
  align?: MarketingSectionHeaderAlign;
  /** Heading id, so the surrounding section can reference it. */
  titleId?: string;
  className?: string;
}>;

/**
 * Renders the single `h2` of a marketing section plus its optional eyebrow,
 * description, and caller-owned action.
 *
 * Heading order stays the caller's responsibility: this component only ever
 * renders one `h2` and never nests interactive behavior of its own.
 */
export function MarketingSectionHeader({
  title,
  eyebrow,
  description,
  action,
  align = "center",
  titleId,
  className,
}: MarketingSectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "mb-8",
        isCentered
          ? "mx-auto max-w-3xl text-center"
          : "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="rounded-[5px] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2
          id={titleId}
          className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>

        {description ? (
          <p
            className={cn(
              "text-sm leading-7 text-muted-foreground",
              isCentered ? "mx-auto max-w-3xl" : "max-w-3xl",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div
          className={cn(isCentered ? "flex justify-center pt-1" : "shrink-0")}
        >
          {action}
        </div>
      ) : null}
    </div>
  );
}

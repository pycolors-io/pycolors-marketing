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
        "mb-8 sm:mb-10",
        isCentered
          ? "mx-auto max-w-3xl text-center"
          : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8",
        className,
      )}
    >
      <div className="min-w-0 space-y-4">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="max-w-full rounded-md px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2
          id={titleId}
          className="text-balance font-brand text-2xl font-semibold leading-[1.2] tracking-[-0.025em] sm:text-[28px]"
        >
          {title}
        </h2>

        {description ? (
          <p
            className={cn(
              "max-w-2xl text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base",
              isCentered && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div
          className={cn(isCentered ? "mt-6 flex justify-center" : "shrink-0")}
        >
          {action}
        </div>
      ) : null}
    </div>
  );
}

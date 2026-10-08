import type { ReactNode } from "react";
import { Card, cn } from "@pycolors/ui";
import type { MarketingHeadingLevel } from "./tones";
import styles from "./detail-card.module.css";

type MarketingDetailCardProps = Readonly<{
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  eyebrow: string;
  meta?: ReactNode;
  visual?: ReactNode;
  children?: ReactNode;
  footer: ReactNode;
  headingLevel?: MarketingHeadingLevel;
  className?: string;
}>;

/** An editorial feature card; links and meaningful previews stay caller-owned. */
export function MarketingDetailCard({
  title,
  description,
  icon,
  eyebrow,
  meta,
  visual,
  children,
  footer,
  headingLevel = 3,
  className,
}: MarketingDetailCardProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <Card
      asChild
      className={cn(
        "flex min-w-0 flex-col gap-0 p-0 shadow-none",
        styles.surface,
        className,
      )}
    >
      <article>
        <div className="p-5 sm:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-[5px] border border-border-subtle bg-background text-foreground [&_svg]:size-4"
              >
                {icon}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {eyebrow}
              </span>
            </div>
            {meta ? (
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {meta}
              </span>
            ) : null}
          </div>
          <Heading className="text-balance font-brand text-lg font-semibold leading-snug tracking-normal">
            {title}
          </Heading>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>

        {visual ? (
          <div
            className={cn(
              "mx-5 mb-6 overflow-hidden rounded-[5px] border border-border-subtle sm:mx-7",
              styles.preview,
            )}
          >
            {visual}
          </div>
        ) : null}

        {children ? (
          <div className="px-5 pb-6 sm:px-7 sm:pb-7">{children}</div>
        ) : null}

        <div
          className={cn(
            "flex-1 border-t border-border-subtle px-5 py-3 sm:px-7",
            styles.footer,
          )}
        >
          {footer}
        </div>
      </article>
    </Card>
  );
}

import * as React from "react";
import { EmptyState, cn } from "@pycolors/ui";

export interface EmptyStatePanelProps {
  /** Stable HTML id, unique across the consuming page. */
  id: string;
  heading: string;
  title: string;
  description?: string;
  /** Decorative only; communicate meaningful information in the text. */
  icon?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  /** Opt in only for a meaningful dynamic update, outside other live regions. */
  ariaLive?: "off" | "polite" | "assertive";
  className?: string;
}

export function EmptyStatePanel({
  id,
  heading,
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  ariaLive = "off",
  className,
}: EmptyStatePanelProps) {
  const headingId = `${id}-heading`;
  const hasActions =
    React.Children.toArray([primaryAction, secondaryAction]).length > 0;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-slot="empty-state-panel"
      className={cn(
        "min-w-0 rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <h2 id={headingId} className="break-words text-base font-semibold">
          {heading}
        </h2>
      </div>
      <EmptyState
        title={title}
        description={description}
        icon={icon ? <span aria-hidden="true">{icon}</span> : undefined}
        ariaLive={ariaLive}
        className="min-w-0 break-words rounded-none border-0 px-4 py-8 sm:px-6 sm:py-12"
        action={
          hasActions ? (
            <div
              data-slot="empty-state-panel-actions"
              className="flex min-w-0 flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:break-words"
            >
              {primaryAction}
              {secondaryAction}
            </div>
          ) : undefined
        }
      />
    </section>
  );
}

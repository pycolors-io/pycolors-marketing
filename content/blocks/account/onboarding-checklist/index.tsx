import type { ReactNode } from "react";
import { Badge, cn } from "@pycolors/ui";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  complete: boolean;
  /** Native link or button; navigation and completion remain consumer-owned. */
  action?: ReactNode;
}

export interface OnboardingChecklistProps {
  id: string;
  heading: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  description?: string;
  steps: readonly OnboardingStep[];
  completedLabel?: string;
  incompleteLabel?: string;
  emptyMessage?: string;
  className?: string;
}

export function OnboardingChecklist({
  id,
  heading,
  headingLevel = 2,
  description,
  steps,
  completedLabel = "Completed",
  incompleteLabel = "To do",
  emptyMessage = "No setup steps available.",
  className,
}: OnboardingChecklistProps) {
  const Heading = `h${headingLevel}` as const;
  const completed = steps.filter((step) => step.complete).length;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      data-slot="onboarding-checklist"
      className={cn(
        "min-w-0 overflow-hidden rounded-lg border border-border bg-card text-card-foreground",
        className,
      )}
    >
      <header className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <Heading id={`${id}-heading`} className="text-base font-semibold">
              {heading}
            </Heading>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {steps.length ? (
            <span className="text-xs leading-6 text-muted-foreground tabular-nums">
              {completed} / {steps.length}
            </span>
          ) : null}
        </div>
        {steps.length ? (
          <progress
            aria-labelledby={`${id}-heading`}
            className="block h-1.5 w-full overflow-hidden rounded-full border-0 bg-muted accent-primary [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary"
            max={steps.length}
            value={completed}
          />
        ) : null}
      </header>

      {steps.length ? (
        <ol className="divide-y divide-border border-t border-border">
          {steps.map((step, index) => (
            <li
              key={step.id}
              data-slot="onboarding-checklist-step"
              className="flex min-w-0 flex-wrap items-start gap-4 p-5 sm:p-6"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border text-xs tabular-nums",
                  step.complete
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {step.complete ? "✓" : index + 1}
              </span>
              <div className="min-w-0 flex-1 basis-40 [overflow-wrap:anywhere]">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-medium">{step.title}</p>
                  <Badge
                    variant="outline"
                    className="h-auto rounded-md py-0.5 text-[10px]"
                  >
                    {step.complete ? completedLabel : incompleteLabel}
                  </Badge>
                </div>
                {step.description ? (
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                ) : null}
              </div>
              {step.action ? (
                <div className="max-w-full [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:[overflow-wrap:anywhere]">
                  {step.action}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="border-t border-border p-5 text-sm text-muted-foreground [overflow-wrap:anywhere] sm:p-6">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}

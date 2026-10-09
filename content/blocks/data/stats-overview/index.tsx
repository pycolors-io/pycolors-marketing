import { Badge, cn } from "@pycolors/ui";

export interface OverviewMetric {
  /** Stable and unique within this overview. */
  id: string;
  label: string;
  /** Formatted by the application, including units or currency. */
  value: string;
  description?: string;
  /** Include direction and comparison context in the visible label. */
  change?: {
    label: string;
    tone?: "positive" | "negative" | "neutral";
  };
}

export interface StatsOverviewProps {
  /** Unique across the page, including the derived heading ID. */
  id: string;
  heading: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  description?: string;
  periodLabel?: string;
  metrics: readonly OverviewMetric[];
  emptyMessage?: string;
  className?: string;
}

export function StatsOverview({
  id,
  heading,
  headingLevel = 2,
  description,
  periodLabel,
  metrics,
  emptyMessage = "No metrics available.",
  className,
}: StatsOverviewProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      data-slot="stats-overview"
      className={cn("min-w-0 space-y-5 text-foreground", className)}
    >
      <header className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1 basis-56 [overflow-wrap:anywhere]">
          <Heading id={`${id}-heading`} className="text-base font-semibold">
            {heading}
          </Heading>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {periodLabel ? (
          <p className="max-w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
            {periodLabel}
          </p>
        ) : null}
      </header>

      {metrics.length ? (
        <dl
          data-slot="stats-overview-metrics"
          className="grid min-w-0 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 xl:grid-cols-4"
        >
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="min-w-0 bg-card p-5 text-card-foreground [overflow-wrap:anywhere] sm:p-6"
            >
              <dt className="text-sm text-muted-foreground">{metric.label}</dt>
              <dd className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
                {metric.value}
              </dd>
              {metric.change || metric.description ? (
                <dd className="mt-4 space-y-2">
                  {metric.change ? (
                    <Badge
                      variant={
                        metric.change.tone === "positive"
                          ? "success"
                          : metric.change.tone === "negative"
                            ? "destructive"
                            : "outline"
                      }
                      className="h-auto max-w-full whitespace-normal rounded-md py-1 text-[11px]"
                    >
                      {metric.change.label}
                    </Badge>
                  ) : null}
                  {metric.description ? (
                    <p className="text-xs leading-5 text-muted-foreground">
                      {metric.description}
                    </p>
                  ) : null}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      ) : (
        <p className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground [overflow-wrap:anywhere]">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}

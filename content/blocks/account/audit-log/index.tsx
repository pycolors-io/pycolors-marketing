import * as React from "react";

export interface AuditLogEvent {
  /** Stable identity, unique within this panel; used as the React key. */
  id: string;
  actor: string;
  action: string;
  target?: string;
  /** Machine-readable timestamp, ideally ISO 8601. */
  occurredAt: string;
  /** Human-readable timestamp controlled by the consuming application. */
  occurredAtLabel: string;
  details?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface AuditLogPanelProps {
  /** Stable HTML id, unique across the consuming page. */
  id: string;
  heading: string;
  description?: string;
  events: readonly AuditLogEvent[];
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

function hasContent(children?: React.ReactNode) {
  return React.Children.toArray(children).some((child) => child !== "");
}

function Slot({
  children,
  slot,
}: {
  children?: React.ReactNode;
  slot: string;
}) {
  if (!hasContent(children)) return null;

  return (
    <div
      data-slot={slot}
      className="flex min-w-0 flex-wrap items-center gap-2 [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:break-words"
    >
      {children}
    </div>
  );
}

export function AuditLogPanel({
  id,
  heading,
  description,
  events,
  filters,
  actions,
  emptyTitle = "No activity to display",
  emptyDescription,
  className,
}: AuditLogPanelProps) {
  const headingId = `${id}-heading`;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      data-slot="audit-log-panel"
      className={[
        "min-w-0 rounded-xl border border-border bg-card text-card-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex min-w-0 flex-col gap-4 border-b border-border p-4 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-1">
          <h2 id={headingId} className="break-words text-base font-semibold">
            {heading}
          </h2>
          {description ? (
            <p
              id={descriptionId}
              className="break-words text-sm text-muted-foreground"
            >
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <Slot slot="audit-log-filters">{filters}</Slot>
          <Slot slot="audit-log-actions">{actions}</Slot>
        </div>
      </div>

      {events.length > 0 ? (
        <ol
          role="list"
          aria-labelledby={headingId}
          className="divide-y divide-border"
        >
          {events.map((event) => (
            <li
              key={event.id}
              data-slot="audit-log-event"
              className="min-w-0 p-4 sm:p-6"
            >
              <article className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="min-w-0 break-words text-sm leading-6">
                    <span className="font-medium">{event.actor}</span>{" "}
                    <span>{event.action}</span>
                    {event.target ? (
                      <>
                        {" "}
                        <span className="font-medium">{event.target}</span>
                      </>
                    ) : null}
                  </p>

                  <time
                    dateTime={event.occurredAt}
                    className="block break-words text-xs text-muted-foreground"
                  >
                    {event.occurredAtLabel}
                  </time>

                  {hasContent(event.details) ? (
                    <div
                      data-slot="audit-log-details"
                      className="min-w-0 break-words text-sm text-muted-foreground [&_pre]:max-w-full [&_pre]:overflow-x-auto"
                    >
                      {event.details}
                    </div>
                  ) : null}
                </div>

                <Slot slot="audit-log-event-actions">{event.actions}</Slot>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div
          data-slot="audit-log-empty"
          className="min-w-0 space-y-1 p-6 text-center sm:p-8"
        >
          <p className="break-words text-sm font-medium">{emptyTitle}</p>
          {emptyDescription ? (
            <p className="break-words text-sm text-muted-foreground">
              {emptyDescription}
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}

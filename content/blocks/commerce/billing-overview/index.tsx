import * as React from "react";

export type BillingOverviewPanelProps = Readonly<{
  title: React.ReactNode;
  description?: React.ReactNode;
  planLabel: React.ReactNode;
  planValue: React.ReactNode;
  billingLabel?: React.ReactNode;
  billingValue?: React.ReactNode;
  statusLabel?: React.ReactNode;
  statusValue?: React.ReactNode;
  renewalLabel?: React.ReactNode;
  renewalValue?: React.ReactNode;
  paymentLabel?: React.ReactNode;
  paymentValue?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}>;

/**
 * Presentation-only billing summary. Billing truth and every action remain
 * entirely owned by the consuming application.
 */
export function BillingOverviewPanel({
  title,
  description,
  planLabel,
  planValue,
  billingLabel,
  billingValue,
  statusLabel,
  statusValue,
  renewalLabel,
  renewalValue,
  paymentLabel,
  paymentValue,
  primaryAction,
  secondaryAction,
  className,
}: BillingOverviewPanelProps) {
  const id = React.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const rootClassName = [
    "min-w-0 space-y-6 rounded-xl border border-border bg-card p-5 text-card-foreground sm:p-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const details = [
    { label: planLabel, value: planValue },
    billingLabel && billingValue
      ? { label: billingLabel, value: billingValue }
      : null,
    statusLabel && statusValue
      ? { label: statusLabel, value: statusValue }
      : null,
    renewalLabel && renewalValue
      ? { label: renewalLabel, value: renewalValue }
      : null,
    paymentLabel && paymentValue
      ? { label: paymentLabel, value: paymentValue }
      : null,
  ].filter(
    (
      detail,
    ): detail is Readonly<{
      label: React.ReactNode;
      value: React.ReactNode;
    }> => detail !== null,
  );

  return (
    <section
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={rootClassName}
      data-slot="billing-overview-panel"
    >
      <header className="min-w-0 space-y-2">
        <h2 className="break-words text-xl font-semibold" id={titleId}>
          {title}
        </h2>
        {description ? (
          <div
            className="break-words text-sm text-muted-foreground"
            id={descriptionId}
          >
            {description}
          </div>
        ) : null}
      </header>

      <dl className="grid min-w-0 gap-4 sm:grid-cols-2">
        {details.map((detail, index) => (
          <div
            className="min-w-0 rounded-lg border border-border bg-background p-4"
            key={index}
          >
            <dt className="text-sm font-medium text-muted-foreground">
              {detail.label}
            </dt>
            <dd className="mt-1 break-words text-sm font-medium">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>

      {primaryAction || secondaryAction ? (
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
          {primaryAction}
          {secondaryAction}
        </div>
      ) : null}
    </section>
  );
}

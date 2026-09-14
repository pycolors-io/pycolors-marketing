import * as React from "react";

export type PaymentMethodPanelProps = Readonly<{
  title: React.ReactNode;
  description?: React.ReactNode;
  methodLabel: React.ReactNode;
  methodValue: React.ReactNode;
  expiryLabel?: React.ReactNode;
  expiryValue?: React.ReactNode;
  contactLabel?: React.ReactNode;
  contactValue?: React.ReactNode;
  status?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}>;

/**
 * Presentation-only payment-method surface. Billing truth and every action
 * remain entirely owned by the consuming application.
 */
export function PaymentMethodPanel({
  title,
  description,
  methodLabel,
  methodValue,
  expiryLabel,
  expiryValue,
  contactLabel,
  contactValue,
  status,
  primaryAction,
  secondaryAction,
  className,
}: PaymentMethodPanelProps) {
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
    { label: methodLabel, value: methodValue },
    expiryLabel && expiryValue
      ? { label: expiryLabel, value: expiryValue }
      : null,
    contactLabel && contactValue
      ? { label: contactLabel, value: contactValue }
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
      data-slot="payment-method-panel"
    >
      <header className="min-w-0 space-y-2">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-2">
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
          </div>
          {status ? <div className="shrink-0">{status}</div> : null}
        </div>
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

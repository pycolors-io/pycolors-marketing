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
    "min-w-0 space-y-6 rounded-[5px] border border-border bg-background p-5 text-foreground sm:p-6",
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
            <h2
              className="break-words text-lg font-semibold tracking-tight"
              id={titleId}
            >
              {title}
            </h2>
            {description ? (
              <div
                className="break-words text-sm leading-6 text-muted-foreground"
                id={descriptionId}
              >
                {description}
              </div>
            ) : null}
          </div>
          {status ? <div className="shrink-0">{status}</div> : null}
        </div>
      </header>

      <dl className="grid min-w-0 gap-x-8 gap-y-5 sm:grid-cols-2">
        {details.map((detail, index) => (
          <div
            className={
              index === 0
                ? "relative col-span-full min-w-0 rounded-[5px] border border-border bg-linear-to-br from-primary/5 to-background p-5"
                : "min-w-0"
            }
            key={index}
          >
            <dt className="text-xs leading-5 text-muted-foreground">
              {index === 0 ? (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="mb-4 size-8 text-muted-foreground"
                  viewBox="0 0 32 24"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="1"
                    width="30"
                    height="22"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M1 8h30M6 17h5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : null}
              {detail.label}
            </dt>
            <dd
              className={
                index === 0
                  ? "mt-2 break-words text-lg font-semibold tracking-tight"
                  : "mt-1 break-words text-sm font-medium"
              }
            >
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>

      {primaryAction || secondaryAction ? (
        <div className="flex min-w-0 flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:flex-wrap [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:break-words">
          {primaryAction}
          {secondaryAction}
        </div>
      ) : null}
    </section>
  );
}

import * as React from "react";

export type PasswordRecoveryPanelProps = Readonly<{
  title?: React.ReactNode;
  description?: React.ReactNode;
  form: React.ReactNode;
  error?: React.ReactNode;
  status?: React.ReactNode;
  help?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}>;

/**
 * Presentation-only password recovery surface. Recovery state, validation,
 * token issuance, email delivery and navigation remain consumer-owned.
 */
export function PasswordRecoveryPanel({
  title = "Recover your account",
  description,
  form,
  error,
  status,
  help,
  footer,
  className,
}: PasswordRecoveryPanelProps) {
  const sectionClassName = ["mx-auto w-full max-w-md", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClassName}>
      <div className="space-y-6 rounded-xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          {description ? (
            <div className="text-sm text-muted-foreground">{description}</div>
          ) : null}
        </header>

        {error ? (
          <div role="alert" className="text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {status ? (
          <div role="status" className="text-sm text-muted-foreground">
            {status}
          </div>
        ) : null}

        <div>{form}</div>

        {help ? (
          <div className="text-sm text-muted-foreground">{help}</div>
        ) : null}

        {footer ? (
          <footer className="text-sm text-muted-foreground">{footer}</footer>
        ) : null}
      </div>
    </section>
  );
}

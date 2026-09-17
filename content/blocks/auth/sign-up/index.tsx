import * as React from "react";

export type SignUpPanelProps = Readonly<{
  title?: React.ReactNode;
  description?: React.ReactNode;
  form: React.ReactNode;
  providers?: React.ReactNode;
  error?: React.ReactNode;
  consent?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}>;

/**
 * Presentation-only sign-up surface. Account creation, validation and
 * authentication behavior remain entirely owned by the consuming application.
 */
export function SignUpPanel({
  title = "Create your account",
  description,
  form,
  providers,
  error,
  consent,
  footer,
  className,
}: SignUpPanelProps) {
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

        <div>{form}</div>

        {providers ? (
          <div className="space-y-3" aria-label="Other sign-up options">
            {providers}
          </div>
        ) : null}

        {consent ? (
          <div className="text-xs text-muted-foreground">{consent}</div>
        ) : null}

        {footer ? (
          <footer className="text-sm text-muted-foreground">{footer}</footer>
        ) : null}
      </div>
    </section>
  );
}

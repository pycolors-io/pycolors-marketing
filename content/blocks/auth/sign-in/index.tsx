import * as React from "react";

export type SignInPanelProps = Readonly<{
  title?: React.ReactNode;
  description?: React.ReactNode;
  form: React.ReactNode;
  providers?: React.ReactNode;
  error?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}>;

/**
 * Presentation-only sign-in surface. Authentication state and actions remain
 * entirely owned by the consuming application.
 */
export function SignInPanel({
  title = "Sign in",
  description,
  form,
  providers,
  error,
  footer,
  className,
}: SignInPanelProps) {
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
          <div className="space-y-3" aria-label="Other sign-in options">
            {providers}
          </div>
        ) : null}

        {footer ? (
          <footer className="text-sm text-muted-foreground">{footer}</footer>
        ) : null}
      </div>
    </section>
  );
}

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
      <div className="space-y-6 rounded-[5px] border border-border bg-card p-5 text-card-foreground sm:p-6">
        <header className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description ? (
            <div className="text-sm leading-6 text-muted-foreground">
              {description}
            </div>
          ) : null}
        </header>

        {error ? (
          <div
            role="alert"
            className="rounded-md border border-destructive/25 bg-destructive/5 px-3 py-2 text-sm leading-6 text-destructive"
          >
            {error}
          </div>
        ) : null}

        <div>{form}</div>

        {providers ? (
          <div
            className="space-y-3 border-t border-border pt-5"
            aria-label="Other sign-in options"
          >
            {providers}
          </div>
        ) : null}

        {footer ? (
          <footer className="border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
            {footer}
          </footer>
        ) : null}
      </div>
    </section>
  );
}

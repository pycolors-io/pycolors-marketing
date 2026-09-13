import * as React from "react";

import { Card, cn } from "@pycolors/ui";

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
  return (
    <section className={cn("mx-auto w-full max-w-md", className)}>
      <Card className="space-y-6 p-5 sm:p-6">
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
      </Card>
    </section>
  );
}

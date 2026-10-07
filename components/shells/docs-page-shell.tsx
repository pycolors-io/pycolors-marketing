import * as React from "react";
import { cn } from "@pycolors/ui";

type DocsPageShellProps = Readonly<{
  children: React.ReactNode;
  full?: boolean;
}>;

export function DocsPageShell({ children, full = false }: DocsPageShellProps) {
  return (
    <section className="w-full min-w-0 max-w-full">
      <div
        className={cn(
          "mx-auto w-full min-w-0",
          full ? "max-w-none" : "max-w-3xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}

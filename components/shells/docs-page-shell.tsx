import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { cn } from "@pycolors/ui";

type DocsPageShellProps = Readonly<{
  children: React.ReactNode;
  full?: boolean;
}>;

export function DocsPageShell({ children, full = false }: DocsPageShellProps) {
  const tSite = useCopy();

  return (
    <section
      id="content"
      tabIndex={-1}
      className="w-full min-w-0 max-w-full scroll-mt-28"
    >
      <div
        className={cn(
          "mx-auto w-full min-w-0",
          full ? "max-w-none" : "max-w-3xl",
        )}
      >
        {tSite(children)}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { Card, cn } from "@pycolors/ui";
import { MarketingSectionShell } from "../section-shell";
import { ShowcaseWorkspace } from "./showcase-workspace";

/** Public product proof; the page owns navigation and component handoffs. */
export function SaasShowcase({
  className,
  actions,
  footer,
}: {
  className?: string;
  actions?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <MarketingSectionShell
      spacing="compact"
      aria-labelledby="project-readiness-title"
      className={cn("min-w-0", className)}
    >
      <div data-showcase-frame>
        <h2
          id="project-readiness-title"
          className="mb-3 text-xs font-normal leading-5 text-muted-foreground"
        >
          Built with{" "}
          <span className="font-semibold text-foreground">PyColors UI</span>
        </h2>
        <Card
          data-showcase-preview
          className="min-w-0 overflow-hidden rounded-[5px] border-border-subtle bg-surface shadow-none"
        >
          <ShowcaseWorkspace />
        </Card>
        <div
          data-showcase-caption
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <p className="max-w-xl text-xs leading-5 text-muted-foreground">
            Synthetic demo data. Interactions stay local; nothing is saved and
            no backend is connected.
          </p>
          {actions ? (
            <div data-showcase-actions className="shrink-0">
              {actions}
            </div>
          ) : null}
        </div>
        {footer ? <div data-showcase-footer>{footer}</div> : null}
      </div>
    </MarketingSectionShell>
  );
}

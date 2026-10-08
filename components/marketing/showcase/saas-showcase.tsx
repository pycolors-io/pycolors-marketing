import type { ReactNode } from "react";
import { Card, cn } from "@pycolors/ui";
import { Box, MousePointer2 } from "lucide-react";
import { MarketingSectionHeader } from "../section-header";
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
      divider="pattern"
      aria-labelledby="project-readiness-title"
      className={cn("min-w-0", className)}
    >
      <div data-showcase-frame>
        <div data-showcase-intro>
          <div data-showcase-signature>
            <p className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <span data-showcase-mark aria-hidden="true">
                <Box className="size-4" strokeWidth={1.5} />
              </span>
              <span>
                Built with{" "}
                <strong className="font-semibold text-foreground">
                  PyColors UI
                </strong>
              </span>
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <MousePointer2 className="size-3.5" aria-hidden="true" />
              Interactive workspace
            </p>
          </div>
          <div data-showcase-heading>
            <MarketingSectionHeader
              title={
                <>
                  Your next interface{" "}
                  <span data-showcase-accent>starts here.</span>
                </>
              }
              titleId="project-readiness-title"
              align="left"
              className="mb-0"
            />
            <div data-showcase-pitch>
              <p>
                A polished workspace, built with the public components you can
                use today. Try the views, explore a project, then make it yours.
              </p>
              {actions ? <div data-showcase-actions>{actions}</div> : null}
            </div>
          </div>
        </div>
        <Card className="min-w-0 overflow-hidden rounded-[5px] border-border-subtle bg-surface shadow-soft">
          <ShowcaseWorkspace />
          <p className="border-t border-border-subtle bg-surface-muted/40 px-4 py-4 text-xs leading-5 text-muted-foreground sm:px-6">
            Synthetic demo data. Interactions stay local; nothing is saved and
            no backend is connected. This is an interface review, not production
            readiness.
          </p>
        </Card>
        {footer ? <div data-showcase-footer>{footer}</div> : null}
      </div>
    </MarketingSectionShell>
  );
}

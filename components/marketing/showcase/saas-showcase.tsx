import { Badge, Card } from "@pycolors/ui";
import { MarketingSectionHeader } from "../section-header";
import { MarketingSectionShell } from "../section-shell";
import { ShowcaseWorkspace } from "./showcase-workspace";

/** Public product proof; #439 owns its page placement and surrounding CTAs. */
export function SaasShowcase() {
  return (
    <MarketingSectionShell
      spacing="compact"
      aria-labelledby="project-readiness-title"
      className="min-w-0"
    >
      <Card className="min-w-0 overflow-hidden rounded-[5px] border-border-subtle bg-surface shadow-soft">
        <div className="border-b border-border-subtle px-4 py-5 sm:px-6 sm:py-6">
          <MarketingSectionHeader
            title="Project readiness workspace"
            titleId="project-readiness-title"
            eyebrow="Demo workspace"
            align="left"
            className="mb-0"
            action={
              <Badge variant="outline" className="rounded-[5px]">
                Interface review
              </Badge>
            }
          />
        </div>
        <ShowcaseWorkspace />
        <p className="border-t border-border-subtle bg-surface-muted/40 px-4 py-4 text-xs leading-5 text-muted-foreground sm:px-6">
          Synthetic demo data. Interactions stay local; nothing is saved and no
          backend is connected. This is an interface review, not production
          readiness.
        </p>
      </Card>
    </MarketingSectionShell>
  );
}

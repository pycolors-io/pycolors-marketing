import { useCopy } from "@/lib/i18n/use-copy";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { STARTER_PRO_TOUR } from "@/lib/products/starter-pro-tour";
import { StarterProTourPlayer } from "./starter-pro-tour-player";

export function StarterProTour() {
  const tSite = useCopy();

  return (
    <MarketingSectionShell
      id={STARTER_PRO_TOUR.id}
      divider="pattern"
      width="full"
      className="scroll-mt-24"
      aria-labelledby="starter-pro-tour-heading"
    >
      <MarketingSectionHeader
        titleId="starter-pro-tour-heading"
        align="left"
        eyebrow={tSite("Product tour")}
        title={tSite(STARTER_PRO_TOUR.title)}
        description={tSite(
          "See the real interface in action: authentication, workspaces, customization and a project workflow your team can build on.",
        )}
      />
      <StarterProTourPlayer
        source={STARTER_PRO_TOUR.source}
        poster={STARTER_PRO_TOUR.poster}
        captions={STARTER_PRO_TOUR.captions}
        duration={STARTER_PRO_TOUR.duration}
      />
      <div className="mt-4 flex flex-col gap-3 text-xs leading-6 text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <p>
          {tSite(STARTER_PRO_TOUR.duration)}{" "}
          {tSite(" · English · Instrumental music · Example data")}
        </p>
        <details className="min-w-0 sm:max-w-2xl sm:flex-1">
          <summary className="min-h-11 cursor-pointer rounded-[3px] py-2 text-foreground underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            {tSite("Read the tour transcript")}
          </summary>
          <ol className="mt-4 space-y-5 border-t border-border-subtle pt-5">
            {STARTER_PRO_TOUR.transcript.map(({ title, text }) => (
              <li key={title}>
                <h3 className="font-medium text-foreground">{tSite(title)}</h3>
                <p className="mt-1">{tSite(text)}</p>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </MarketingSectionShell>
  );
}

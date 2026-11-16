import { ChevronDown } from "lucide-react";
import { useCopy } from "@/lib/i18n/use-copy";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { STARTER_PRO_TOUR } from "@/lib/products/starter-pro-tour";
import { StarterProTourPlayer } from "./starter-pro-tour-player";
import styles from "./starter-pro.module.css";

export function StarterProTour() {
  const tSite = useCopy();

  return (
    <MarketingSectionShell
      id={STARTER_PRO_TOUR.id}
      divider="pattern"
      width="full"
      className={`${styles.mediaSection} ${styles.tourSection} scroll-mt-24`}
      aria-labelledby="starter-pro-tour-heading"
    >
      <MarketingSectionHeader
        className={styles.showcaseHeader}
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
      <div className={styles.tourDetails}>
        <p className={styles.tourMetadata}>
          {tSite(STARTER_PRO_TOUR.duration)}{" "}
          {tSite(" · English · Instrumental music · Example data")}
        </p>
        <details className={styles.tourTranscript}>
          <summary>
            {tSite("Read the tour transcript")}
            <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
          </summary>
          <ol>
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

import { ArrowUpRight, Layers3 } from "lucide-react";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { ProductStudioCapture } from "@/components/marketing/product-studio-capture";
import { SiteButton } from "@/components/site-button";
import { productStudio } from "@/lib/showcase/product-studio";
import styles from "./starter-pro.module.css";

/** A page-owned presentation of the same PyColors reference and disclosures. */
export function StarterProReference() {
  const tSite = useCopy();

  return (
    <MarketingSectionShell
      id="built-with-pycolors"
      width="full"
      aria-labelledby="product-studio-reference-heading"
    >
      <div className={styles.studioCard}>
        <div className={styles.studioIntro}>
          <p className={styles.studioEyebrow}>
            {tSite("Built with Starter Pro")}
          </p>
          <h2 id="product-studio-reference-heading">
            {tSite("A working example. A foundation to adapt.")}
          </h2>
          <p className={styles.studioSummary}>{tSite(productStudio.summary)}</p>
          <SiteButton asChild size="lg" className={styles.studioAction}>
            <Link href={productStudio.href}>
              {tSite("Explore the reference")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </SiteButton>
        </div>
        <Link
          href={productStudio.href}
          aria-label={tSite("View the Product studio reference implementation")}
          className={styles.studioVisual}
        >
          <div className={styles.studioDisplay}>
            <div className={styles.studioChrome} aria-hidden="true">
              <span className={styles.studioIdentity}>
                <Layers3 className="size-4" />
                {tSite(productStudio.name)}
              </span>
              <ArrowUpRight className="size-4" />
            </div>
            <ProductStudioCapture sizes="(min-width: 1440px) 600px, (min-width: 1024px) 48vw, 88vw" />
          </div>
          <div className={styles.studioInset}>
            <p>{tSite("Project work")}</p>
            <ProductStudioCapture
              view="project"
              sizes="(min-width: 1024px) 280px, 44vw"
            />
          </div>
        </Link>
        <div className={styles.studioDetails}>
          <dl className={styles.studioFacts}>
            {[
              ["Project", productStudio.name],
              ["Created by", "PyColors"],
              ["Type", "Reference implementation"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{tSite(label)}</dt>
                <dd>{tSite(value)}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.studioDisclosure}>
            {tSite(productStudio.disclosure)}
          </p>
        </div>
      </div>
    </MarketingSectionShell>
  );
}

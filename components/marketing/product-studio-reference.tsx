import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, Info } from "lucide-react";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { ProductStudioCapture } from "@/components/marketing/product-studio-capture";
import { SiteButton } from "@/components/site-button";
import { productStudio } from "@/lib/showcase/product-studio";
import styles from "./presentation.module.css";

/** One owned reference until independently verified customer cases are available. */
export function ProductStudioReference() {
  const tSite = useCopy();

  return (
    <MarketingSectionShell
      id="built-with-pycolors"
      width="full"
      aria-labelledby="product-studio-reference-heading"
    >
      <div className={styles.reference}>
        <div className={styles.referenceMain}>
          <div className={styles.referenceCopy}>
            <p className={styles.referenceEyebrow}>
              {tSite("Built with Starter Pro")}
            </p>
            <h2
              id="product-studio-reference-heading"
              className={styles.referenceTitle}
            >
              {tSite("A working example. A foundation to adapt.")}
            </h2>
            <p className={styles.referenceSummary}>
              {tSite(productStudio.summary)}
            </p>
            <SiteButton asChild size="lg" className={styles.referenceAction}>
              <Link href={productStudio.href}>
                {tSite("Explore the reference")}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </SiteButton>
          </div>
          <figure className={styles.referencePreview}>
            <figcaption className={styles.referenceCaption}>
              <span>{tSite(productStudio.name)}</span>
              <span>{tSite("Reference implementation")}</span>
            </figcaption>
            <Link
              href={productStudio.href}
              aria-label={tSite(
                "View the Product studio reference implementation",
              )}
              className={styles.referenceVisual}
            >
              <ProductStudioCapture sizes="(min-width: 1536px) 690px, (min-width: 1024px) 50vw, 90vw" />
            </Link>
          </figure>
        </div>
        <dl className={styles.referenceFacts}>
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
        <p className={styles.referenceDisclosure}>
          <Info aria-hidden="true" />
          <span>{tSite(productStudio.disclosure)}</span>
        </p>
      </div>
    </MarketingSectionShell>
  );
}

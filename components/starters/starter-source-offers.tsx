import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Layers3,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW as mobile } from "@/lib/products/starter-pro-mobile-preview";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import styles from "./starter-source-offers.module.css";

const sourceOffers = [
  {
    slug: "starter-pro",
    headingId: "web-option-title",
    name: "Starter Pro Web",
    icon: Monitor,
    illustration: "workflow-path",
    stack: "Next.js · Web",
    description: "A connected foundation for your Web application.",
    interface: "Web and installable PWA",
    backend: "Starter Pro foundation to configure and deploy.",
    action: "Explore Starter Pro Web",
    guide: "Open Getting Started",
  },
  {
    slug: "starter-pro-mobile",
    headingId: "mobile-option-title",
    name: "Starter Pro Mobile",
    icon: Smartphone,
    illustration: "connected-workspace",
    stack: mobile.stack,
    description: "Native iOS and Android, with a compatible backend.",
    interface: "Native iOS and Android interface",
    backend: "Compatible backend source included. No Web purchase required.",
    action: mobile.action,
    guide: "Mobile setup guide",
  },
  {
    slug: "starter-pro-fullstack",
    headingId: "bundle-option-title",
    name: "Starter Pro Fullstack",
    icon: Layers3,
    illustration: "source-stack",
    stack: mobile.bundle.stack,
    description: "Web and Mobile, built around the same accounts and data.",
    interface: "Web and native iOS/Android",
    backend: "Shared backend source for the same accounts and data.",
    action: mobile.bundle.action,
    guide: "Fullstack setup guide",
  },
] as const;

type SourceSlug = (typeof sourceOffers)[number]["slug"];

/** Shared source choices; the API continues to decide purchase availability. */
export function StarterSourceOffers({
  currentProduct,
}: Readonly<{ currentProduct?: SourceSlug }>) {
  const tSite = useCopy();

  return (
    <>
      <div className={styles.grid}>
        {sourceOffers.map((offer) => {
          const product = PRODUCT_DISPLAY[offer.slug];
          const Icon = offer.icon;
          return (
            <article
              key={offer.slug}
              aria-labelledby={offer.headingId}
              data-source-offer={offer.slug}
              data-current={currentProduct === offer.slug || undefined}
              className={styles.card}
            >
              <figure className={styles.visual}>
                <div className={styles.artwork} aria-hidden="true">
                  <Image
                    src={`/images/starters/pro/concepts/${offer.illustration}-test-v1.png`}
                    alt=""
                    width={1280}
                    height={1280}
                    sizes="(min-width: 1440px) 400px, (min-width: 1024px) 32vw, (min-width: 640px) 560px, 90vw"
                    loading="lazy"
                    className={styles.illustration}
                  />
                </div>
                <figcaption>{tSite("Concept illustration")}</figcaption>
              </figure>
              <header className={styles.summary}>
                <div className={styles.topline}>
                  <span className={styles.icon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span>{tSite("Source licence")}</span>
                </div>
                <h3 id={offer.headingId}>{tSite(offer.name)}</h3>
                <p className={styles.stack}>{tSite(offer.stack)}</p>
                <p className={styles.description}>{tSite(offer.description)}</p>
              </header>
              <div className={styles.priceBlock}>
                <p className={styles.price}>{product.priceLabel}</p>
                <p className={styles.priceNote}>
                  {tSite("One-time payment · VAT included")}
                </p>
              </div>
              <dl className={styles.details}>
                <div>
                  <dt>{tSite("Interface")}</dt>
                  <dd>{tSite(offer.interface)}</dd>
                </div>
                <div>
                  <dt>{tSite("Backend")}</dt>
                  <dd>{tSite(offer.backend)}</dd>
                </div>
              </dl>
              <div className={styles.actions}>
                {offer.slug === "starter-pro" ? (
                  <BuyStarterProButton
                    label={tSite("Buy Starter Pro")}
                    loadingLabel={tSite("Opening checkout…")}
                  />
                ) : (
                  <BuyProductButton
                    productSlug={offer.slug}
                    locale={tSite.locale}
                    label={tSite("Buy {value0} — {value1}", {
                      value0: tSite(product.name),
                      value1: product.priceLabel,
                    })}
                  />
                )}
                <Link href={product.href} className={styles.productLink}>
                  {tSite(offer.action)}
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link href={product.docsHref} className={styles.guideLink}>
                  <BookOpen aria-hidden="true" />
                  {tSite(offer.guide)}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.footnote}>
        <p>
          {tSite(
            "Mobile includes a backend without the Web interface. Fullstack includes Web, Mobile and the shared API. These are source licences; implementation services and provider costs are separate.",
          )}
        </p>
        <Link href="/product-releases">{tSite("Product releases")}</Link>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Layers3, Monitor, Smartphone, Workflow } from "lucide-react";
import { Badge } from "@pycolors/ui";
import { Container } from "@/components/container";
import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { MarketingFaq, MarketingFaqSection } from "@/components/marketing/faq";
import { MarketingHeroBand } from "@/components/marketing/hero-band";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { SiteButton } from "@/components/site-button";
import { Link } from "@/lib/i18n/navigation";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW as mobile } from "@/lib/products/starter-pro-mobile-preview";
import styles from "@/components/starters/starter-mobile.module.css";

const title = "Starter Pro Mobile — Coming soon";
const description =
  "Discover Starter Pro Mobile and Starter Pro Fullstack. Explore the proposed Mobile extension and the Web, Mobile and shared API bundle. Availability and final terms are to be announced.";
const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/starters/mobile" },
  openGraph: {
    title,
    description,
    url: "/starters/mobile",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const faqs = [
  {
    question: "Is Starter Pro Mobile available to buy?",
    answer:
      "Not yet. The displayed Mobile and Fullstack prices are proposals, not live purchase offers. Availability, scope and delivery terms will be announced before either goes on sale.",
  },
  {
    question: "Does the Web purchase include Mobile?",
    answer:
      "The current Starter Pro purchase covers the Web source licence. Mobile and the proposed Fullstack bundle will have their own final scope and terms announced before sale.",
  },
  {
    question: "When will Mobile be released?",
    answer:
      "No release date has been announced. Contact PyColors if you would like to discuss your product’s mobile direction.",
    links: [{ href: "/contact", label: "Contact PyColors" }],
  },
] as const;

export default function StarterMobilePage() {
  const tSite = useCopy();
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <MarketingHeroBand tone="cool">
        <Container className={`marketing-page-intro ${styles.heroContainer}`}>
          <MarketingBreadcrumb route="/starters/mobile" />
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              contentClassName="mx-0 max-w-4xl"
              className={styles.hero}
              actionsClassName={styles.heroActions}
              badges={[
                { label: mobile.name, variant: "outline" },
                { label: mobile.status, variant: "outline" },
              ]}
              title={tSite("A native start for your next product.")}
              description={tSite(
                "Starter Pro Mobile is being prepared with React Native and Expo for iOS and Android. Explore the proposed Mobile extension and Starter Pro Fullstack bundle, with availability and final terms still to be announced.",
              )}
              actions={
                <>
                  <SiteButton asChild size="lg" className="site-primary-action">
                    <Link href="/contact">{tSite("Contact PyColors")}</Link>
                  </SiteButton>
                  <SiteButton asChild size="lg" variant="outline">
                    <Link href="/starters/pro">
                      {tSite("Explore Starter Pro Web")}
                    </Link>
                  </SiteButton>
                </>
              }
              extra={
                <p className={styles.availability}>
                  {tSite(
                    "Mobile is not on sale. No release date has been announced.",
                  )}
                </p>
              }
            />
            <figure className={styles.visual}>
              <div className={styles.artwork} aria-hidden="true">
                <Image
                  src="/images/marketing/concepts/modular-platform-v1.webp"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1440px) 600px, (min-width: 1024px) 44vw, (min-width: 640px) 70vw, 92vw"
                />
                <span className={styles.stack}>
                  <Smartphone className="size-4" />
                  {tSite(mobile.stack)}
                </span>
              </div>
              <figcaption>{tSite("Concept illustration")}</figcaption>
            </figure>
          </div>
        </Container>
      </MarketingHeroBand>

      <Container>
        <MarketingSectionShell
          id="platforms"
          width="full"
          aria-labelledby="platforms-title"
        >
          <MarketingSectionHeader
            titleId="platforms-title"
            title={tSite("Start on Web. Plan your next platform.")}
            description={tSite(
              "Starter Pro Web is available today. The Mobile extension and Fullstack bundle are proposals for future delivery.",
            )}
          />
          <div className={styles.options}>
            <article
              className={`${styles.option} ${styles.webOption}`}
              aria-labelledby="web-option-title"
            >
              <div className={styles.optionTop}>
                <Monitor aria-hidden="true" />
                <Badge variant="outline">{tSite("Available now")}</Badge>
              </div>
              <h3 id="web-option-title">{tSite("Starter Pro Web")}</h3>
              <p className={styles.price}>
                {tSite(PRODUCT_DISPLAY["starter-pro"].priceLabel)}
              </p>
              <p className={styles.priceNote}>
                {tSite("One-time source licence")}
              </p>
              <p>
                {tSite(
                  "The existing Next.js foundation for accounts, workspaces, billing and your product workflow.",
                )}
              </p>
              <SiteButton asChild size="lg" className={styles.webAction}>
                <Link href="/starters/pro">
                  {tSite("Explore Starter Pro Web")}
                </Link>
              </SiteButton>
            </article>
            <article
              className={`${styles.option} ${styles.mobileOption}`}
              aria-labelledby="mobile-option-title"
            >
              <div className={styles.optionTop}>
                <Smartphone aria-hidden="true" />
                <Badge variant="outline">{tSite(mobile.status)}</Badge>
              </div>
              <h3 id="mobile-option-title">{tSite(mobile.name)}</h3>
              <p className={styles.price}>{tSite(mobile.priceLabel)}</p>
              <p className={styles.priceNote}>{tSite(mobile.priceQualifier)}</p>
              <p>{tSite(mobile.description)}</p>
            </article>
            <article
              className={`${styles.option} ${styles.bundleOption}`}
              aria-labelledby="bundle-option-title"
            >
              <div className={styles.optionTop}>
                <Layers3 aria-hidden="true" />
                <Badge variant="outline">{tSite(mobile.bundle.status)}</Badge>
              </div>
              <h3 id="bundle-option-title">{tSite(mobile.bundle.name)}</h3>
              <p className={styles.price}>{tSite(mobile.bundle.priceLabel)}</p>
              <p className={styles.priceNote}>
                {tSite(mobile.bundle.priceQualifier)}
              </p>
              <p className={styles.bundleScope}>{tSite(mobile.bundle.stack)}</p>
              <p>{tSite(mobile.bundle.description)}</p>
            </article>
          </div>
          <p className={styles.scopeNote}>
            {tSite(
              "Starter Pro Web is the current purchase option. The proposed Mobile extension and the Fullstack bundle to test are not included in the current Web offer.",
            )}
          </p>
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          aria-labelledby="native-direction-title"
        >
          <MarketingSectionHeader
            titleId="native-direction-title"
            title={tSite("A native interface. A connected direction.")}
          />
          <div className={styles.foundations}>
            <article>
              <Smartphone aria-hidden="true" />
              <h3>{tSite("React Native and Expo")}</h3>
              <p>
                {tSite(
                  "The Mobile project uses its own native interface and navigation for iOS and Android.",
                )}
              </p>
            </article>
            <article>
              <Workflow aria-hidden="true" />
              <h3>{tSite("Built around Starter Pro")}</h3>
              <p>
                {tSite(
                  "The Mobile project connects to the Starter Pro application backend. Final backend delivery scope and commercial terms are still to be confirmed.",
                )}
              </p>
            </article>
          </div>
        </MarketingSectionShell>

        <MarketingFaqSection width="full" aria-labelledby="mobile-faq-title">
          <MarketingFaq
            titleId="mobile-faq-title"
            title={tSite("Before the Mobile launch.")}
            description={tSite(
              "Availability, proposed pricing and the current Web offer.",
            )}
            items={faqs}
          />
        </MarketingFaqSection>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/starters/mobile", locale);
}

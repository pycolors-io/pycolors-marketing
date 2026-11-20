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
import { useCopy } from "@/lib/i18n/use-copy";
import {
  PRODUCT_DISPLAY,
  UPGRADE_DISPLAY,
} from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW as mobile } from "@/lib/products/starter-pro-mobile-preview";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import styles from "@/components/starters/starter-mobile.module.css";

const faqs = [
  {
    question: "Can I buy Mobile without the Web product?",
    answer:
      "Yes. Mobile includes native iOS and Android source and a compatible backend source, configuration, database schema and setup guides. A Web purchase is not required. The Web application interface is included only in the Web and Fullstack offers.",
  },
  {
    question: "What does Fullstack include?",
    answer:
      "Fullstack combines the complete Web source, the native Mobile source and a shared API. Your Web and Mobile applications use the same backend, accounts and data. You configure and operate the services yourself.",
  },
  {
    question: "Can I upgrade an existing purchase?",
    answer:
      "An existing Web purchase can upgrade to Fullstack for {value0} including VAT, regardless of its original Web price. A Mobile purchase can upgrade for {value1} including VAT. Open your original purchase access link, or request a fresh one through purchase recovery. The server verifies the original order before offering an upgrade; an email address alone is not proof of purchase.",
    links: [{ href: "/orders/recover", label: "Recover purchase access" }],
  },
  {
    question: "Do I receive a signed native application?",
    answer:
      "You receive source code and setup instructions, not an App Store or Google Play binary, hosting or a managed backend. Configure your own providers and Apple/Google accounts, build and validate the native applications, then follow the stores’ distribution requirements. A Hermes export is not an installed-device or store-approval result.",
  },
  {
    question: "What happens after payment?",
    answer:
      "After the server verifies payment, PyColors processes your order and sends a private claim link for the purchased ZIP. Payment, email delivery and a completed download are separate steps. Use purchase recovery for a missing or expired access link.",
    links: [{ href: "/orders/recover", label: "Recover purchase access" }],
  },
  {
    question: "Which source licence applies?",
    answer:
      "One licence covers one individual or legal entity and unlimited end products. A client needs their own licence to access the source code. Redistribution as a competing kit is prohibited and third-party licences remain applicable. Earlier purchases retain any more favourable rights in their original terms.",
    links: [{ href: "/license", label: "Review the license" }],
  },
] as const;

export function StarterProPlatformPage({
  productSlug = "starter-pro-mobile",
}: Readonly<{ productSlug?: "starter-pro-mobile" | "starter-pro-fullstack" }>) {
  const tSite = useCopy();
  const offer = productSlug === "starter-pro-mobile" ? mobile : mobile.bundle;
  const localizedFaqs = faqs.map((item) => ({
    ...item,
    answer: tSite(item.answer, {
      value0: UPGRADE_DISPLAY["web-to-fullstack"].priceLabel,
      value1: UPGRADE_DISPLAY["mobile-to-fullstack"].priceLabel,
    }),
  }));
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <MarketingHeroBand tone="cool">
        <Container className={`marketing-page-intro ${styles.heroContainer}`}>
          <MarketingBreadcrumb route={offer.href} />
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              contentClassName="mx-0 max-w-4xl"
              className={styles.hero}
              actionsClassName={styles.heroActions}
              badges={[
                { label: offer.name, variant: "outline" },
                { label: offer.status, variant: "outline" },
              ]}
              title={tSite(
                productSlug === "starter-pro-mobile"
                  ? "Build your native product on a shared foundation."
                  : "One foundation for Web and native apps.",
              )}
              description={tSite(offer.description)}
              actions={
                <>
                  <BuyProductButton
                    productSlug={offer.slug}
                    locale={tSite.locale}
                    fullWidth={false}
                    label={tSite("Buy {value0} — {value1}", {
                      value0: tSite(offer.name),
                      value1: offer.priceLabel,
                    })}
                  />
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
                    "One-time source licence · VAT included. Hosting, third-party services and Apple/Google accounts are configured by you.",
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
            title={tSite("Choose the source your product needs.")}
            description={tSite(
              "Web, native Mobile or both with a shared API. Each offer includes its own setup guides; provider and operating costs are separate.",
            )}
          />
          <div className={styles.options}>
            <article
              className={`${styles.option} ${styles.webOption}`}
              aria-labelledby="web-option-title"
            >
              <div className={styles.optionTop}>
                <Monitor aria-hidden="true" />
                <Badge variant="outline">{tSite("Source licence")}</Badge>
              </div>
              <h3 id="web-option-title">{tSite("Starter Pro Web")}</h3>
              <p className={styles.price}>
                {tSite(PRODUCT_DISPLAY["starter-pro"].priceLabel)}
              </p>
              <p className={styles.priceNote}>
                {tSite("One-time source licence · VAT included")}
              </p>
              <p>
                {tSite(
                  "The existing Next.js foundation for accounts, workspaces, billing and your product workflow.",
                )}
              </p>
              <dl className={styles.optionDetails}>
                <div>
                  <dt>{tSite("Interface")}</dt>
                  <dd>{tSite("Web and installable PWA")}</dd>
                </div>
                <div>
                  <dt>{tSite("Backend")}</dt>
                  <dd>
                    {tSite("Starter Pro foundation to configure and deploy.")}
                  </dd>
                </div>
              </dl>
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
              <dl className={styles.optionDetails}>
                <div>
                  <dt>{tSite("Interface")}</dt>
                  <dd>{tSite("Native iOS and Android interface")}</dd>
                </div>
                <div>
                  <dt>{tSite("Backend")}</dt>
                  <dd>
                    {tSite(
                      "Compatible backend source included. No Web purchase required.",
                    )}
                  </dd>
                </div>
              </dl>
              <BuyProductButton
                productSlug={mobile.slug}
                locale={tSite.locale}
                variant="outline"
                className={styles.enquiryAction}
                label={tSite("Buy {value0} — {value1}", {
                  value0: tSite(mobile.name),
                  value1: mobile.priceLabel,
                })}
              />
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
              <dl className={styles.optionDetails}>
                <div>
                  <dt>{tSite("Interface")}</dt>
                  <dd>{tSite("Web and native iOS/Android")}</dd>
                </div>
                <div>
                  <dt>{tSite("Backend")}</dt>
                  <dd>
                    {tSite(
                      "Shared backend source for the same accounts and data.",
                    )}
                  </dd>
                </div>
              </dl>
              <BuyProductButton
                productSlug={mobile.bundle.slug}
                locale={tSite.locale}
                variant="outline"
                className={styles.enquiryAction}
                label={tSite("Buy {value0} — {value1}", {
                  value0: tSite(mobile.bundle.name),
                  value1: mobile.bundle.priceLabel,
                })}
              />
            </article>
          </div>
          <p className={styles.scopeNote}>
            {tSite(
              "Mobile includes a backend without the Web interface. Fullstack includes Web, Mobile and the shared API. These are source licences; implementation services and provider costs are separate.",
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
                  "Mobile connects to its included compatible backend. Fullstack connects Web and Mobile to one shared backend. You configure the database, authentication, email, billing and deployment for your application.",
                )}
              </p>
            </article>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          aria-labelledby="source-guides-title"
        >
          <MarketingSectionHeader
            titleId="source-guides-title"
            title={tSite("Start with the included guides.")}
            description={tSite(
              "Read the archive layout, installation steps, licence and validation boundaries before you buy.",
            )}
          />
          <div className="flex flex-wrap gap-3">
            <SiteButton asChild variant="outline">
              <Link href={mobile.docsHref}>{tSite("Mobile setup guide")}</Link>
            </SiteButton>
            <SiteButton asChild variant="outline">
              <Link href={mobile.bundle.docsHref}>
                {tSite("Fullstack setup guide")}
              </Link>
            </SiteButton>
            <SiteButton asChild variant="outline">
              <Link href="/license">{tSite("Review the license")}</Link>
            </SiteButton>
          </div>
        </MarketingSectionShell>

        <MarketingFaqSection width="full" aria-labelledby="mobile-faq-title">
          <MarketingFaq
            titleId="mobile-faq-title"
            title={tSite("Before you choose your source licence.")}
            description={tSite(
              "Included source, purchase access, upgrades and your deployment responsibilities.",
            )}
            items={localizedFaqs}
          />
        </MarketingFaqSection>
      </Container>
    </main>
  );
}

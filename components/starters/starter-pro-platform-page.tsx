import Image from "next/image";
import { ArrowDown, BookOpen, Layers3, Smartphone } from "lucide-react";
import { Container } from "@/components/container";
import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { MarketingFaq, MarketingFaqSection } from "@/components/marketing/faq";
import { MarketingHeroBand } from "@/components/marketing/hero-band";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { SiteButton } from "@/components/site-button";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import { UPGRADE_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW as mobile } from "@/lib/products/starter-pro-mobile-preview";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import {
  StarterPlatformAlternatives,
  StarterPlatformOverview,
  StarterPlatformSetup,
} from "./starter-platform-content";
import { StarterTechnologyStack } from "./starter-technology-stack";
import styles from "@/components/starters/starter-mobile.module.css";

const faqs = [
  {
    question: "Which native journeys are included?",
    answer:
      "The native app supports verified email/password sign-in, session restoration, workspace selection, project creation, project details, task lists and account information. Registration and password recovery open in the browser on your configured backend. Native social login, native signup, task editing and offline replay are not included in these journeys.",
    links: [{ href: "/docs/starter-pro/mobile", label: "Mobile setup guide" }],
  },
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
  const guideLabel =
    productSlug === "starter-pro-mobile"
      ? "Mobile setup guide"
      : "Fullstack setup guide";
  const PlatformIcon =
    productSlug === "starter-pro-mobile" ? Smartphone : Layers3;
  const localizedFaqs = faqs.map((item) => ({
    ...item,
    answer: tSite(item.answer, {
      value0: UPGRADE_DISPLAY["web-to-fullstack"].priceLabel,
      value1: UPGRADE_DISPLAY["mobile-to-fullstack"].priceLabel,
    }),
  }));
  return (
    <main
      id="content"
      tabIndex={-1}
      className={styles.page}
      data-starter-product={productSlug}
    >
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
                  <SiteButton
                    asChild
                    size="lg"
                    variant="outline"
                    className={styles.guideAction}
                  >
                    <Link href={offer.docsHref}>
                      <BookOpen
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {tSite(guideLabel)}
                    </Link>
                  </SiteButton>
                </>
              }
              extra={
                <div className={styles.heroDetails}>
                  <p className={styles.availability}>
                    {tSite(
                      "One-time source licence · VAT included. Hosting, third-party services and Apple/Google accounts are configured by you.",
                    )}
                  </p>
                  <div className={styles.contextLinks}>
                    <Link href="#included">
                      {tSite("Explore the included source")}
                    </Link>
                    <Link href="#technology">{tSite("Explore the stack")}</Link>
                    <Link href="#source-guides">
                      {tSite("Explore the setup")}
                      <ArrowDown
                        className="size-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              }
            />
            <figure className={styles.visual}>
              <div className={styles.artwork} aria-hidden="true">
                <Image
                  src={
                    productSlug === "starter-pro-mobile"
                      ? "/images/starters/pro/concepts/connected-workspace-test-v1.png"
                      : "/images/starters/pro/concepts/source-stack-test-v1.png"
                  }
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1440px) 600px, (min-width: 1024px) 44vw, (min-width: 640px) 70vw, 92vw"
                />
                <span className={styles.stack}>
                  <PlatformIcon className="size-4" aria-hidden="true" />
                  {productSlug === "starter-pro-fullstack"
                    ? "Next.js · React Native · Expo"
                    : offer.stack}
                </span>
              </div>
              <figcaption>{tSite("Concept illustration")}</figcaption>
            </figure>
          </div>
        </Container>
      </MarketingHeroBand>

      <Container>
        <StarterPlatformOverview productSlug={productSlug} />
        <StarterTechnologyStack productSlug={productSlug} />
        <StarterPlatformSetup productSlug={productSlug} />
        <MarketingSectionShell
          id="purchase"
          width="full"
          aria-labelledby="purchase-title"
        >
          <div className={styles.purchasePanel}>
            <div className={styles.purchaseCopy}>
              <p className={styles.cardEyebrow}>{tSite(offer.name)}</p>
              <h2 id="purchase-title">
                {tSite(
                  productSlug === "starter-pro-mobile"
                    ? "Build your next native product."
                    : "Build across Web and Mobile.",
                )}
              </h2>
              <p className={styles.cardDescription}>
                {tSite(offer.description)}
              </p>
              <div className={styles.contextLinks}>
                <Link href={offer.docsHref}>{tSite(guideLabel)}</Link>
                <Link href="/license">{tSite("Review the license")}</Link>
                <Link href="/orders/support">{tSite("Purchase support")}</Link>
              </div>
            </div>
            <div className={styles.purchaseActions}>
              <p className={styles.purchasePrice}>{offer.priceLabel}</p>
              <p className={styles.purchaseQualifier}>
                {tSite("One-time payment · VAT included")}
              </p>
              <BuyProductButton
                productSlug={offer.slug}
                locale={tSite.locale}
                label={tSite("Buy {value0} — {value1}", {
                  value0: tSite(offer.name),
                  value1: offer.priceLabel,
                })}
              />
              <p className={styles.purchaseNote}>
                {tSite(
                  "Source code and setup guides. Hosting, provider accounts and native distribution are configured by you.",
                )}
              </p>
            </div>
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
        <StarterPlatformAlternatives productSlug={productSlug} />
      </Container>
    </main>
  );
}

import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import styles from "@/components/pricing/pricing-page.module.css";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { SiteText } from "@/components/site-text";
import { STARTER_PRO_MOBILE_PREVIEW } from "@/lib/products/starter-pro-mobile-preview";
import { useCopy } from "@/lib/i18n/use-copy";
import { localizedAlternates } from "@/lib/i18n/routes";
import { Link } from "@/lib/i18n/navigation";
import {
  DIGITAL_REFUND_SUMMARY,
  PURCHASE_SUPPORT_SUMMARY,
} from "@/lib/products/commercial-policy";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Check, PackageCheck, ShieldCheck } from "lucide-react";
import { Badge, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { JsonLd, generateProductOfferJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingFaq, MarketingFaqSection } from "@/components/marketing/faq";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { ProductPreviewWindow } from "@/components/marketing/product-preview-window";
import { ProductPreviewMedia } from "@/components/marketing/product-preview-media";
import { PRODUCT_PREVIEW_MEDIA } from "@/lib/products/product-preview-media";
import { PricingComparisonTable } from "@/components/pricing/pricing-comparison-table";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { StarterSourceComparison } from "@/components/starters/starter-source-comparison";
import { StarterProImplementation } from "@/components/starters/starter-pro-readiness";

const metadata: Metadata = {
  title: "Next.js SaaS Pricing",
  description:
    "Compare templates, Starter Free and Starter Pro Web, Mobile and Fullstack source licences, with secure checkout and purchase recovery.",
  alternates: {
    canonical: "/pricing",
    languages: localizedAlternates("pricing", "en").languages,
  },

  openGraph: {
    locale: "en_US",
    alternateLocale: "fr_FR",
    title: "Next.js SaaS Pricing",
    description:
      "Compare templates, Starter Free, and Starter Pro for modern Next.js SaaS products with auth, secure checkout, purchase recovery, dashboards, and production-ready architecture.",
    url: "/pricing",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Pricing",
    description:
      "Compare PyColors products for building and launching modern SaaS applications faster.",
    images: ["/seo/twitter-main.png"],
  },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const INTERNAL = {
  buildVsBuy: "/compare/build-vs-buy",
  templateNaAi: "/templates/na-ai-landing",
  starterFree: "/starters/free",
  starterPro: "/starters/pro",
  docsStarterPro: "/docs/starter-pro",
  license: "/license",
  terms: "/terms",
} as const;

const PRICING = {
  naAiLanding: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
  starterFree: STARTER_FREE_PRICE_LABEL,
  starterPro: PRODUCT_DISPLAY["starter-pro"].priceLabel,
} as const;

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY["starter-pro"],
      canonicalPath: "/starters/pro",
      description:
        "Production-ready Next.js SaaS starter with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, and launch-ready SaaS architecture.",
    }),
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY["starter-pro-mobile"],
      canonicalPath: "/starters/mobile",
      description: STARTER_PRO_MOBILE_PREVIEW.description,
    }),
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY["starter-pro-fullstack"],
      canonicalPath: "/starters/fullstack",
      description: STARTER_PRO_MOBILE_PREVIEW.bundle.description,
    }),
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY["na-ai-landing"],
      canonicalPath: "/templates/na-ai-landing",
      description:
        "Premium AI and SaaS landing page template built for modern Next.js product launches.",
    }),
  ],
};

// Existing public Starter Pro captures; provenance and scope are recorded in the PR.
const starterProScreenshots = [
  {
    src: "/images/starters/pro/auth-indigo-2x.png",
    width: 2880,
    height: 2000,
    title: "Sign-in screen",
    guide: "/docs/starter-pro/auth",
    guideLabel: "Explore auth flows",
    alt: "Starter Pro sign-in screen with email, password, Google and GitHub options",
    caption:
      "Start with an account entry screen: email and password fields, provider buttons, and a password recovery link.",
  },
  {
    src: "/images/starters/pro/project-work-coral-2x.png",
    width: 2880,
    height: 2000,
    title: "Project work",
    guide: "/docs/starter-pro/what-is-included",
    guideLabel: "Explore the included workflows",
    alt: "Starter Pro project with assigned tasks, due dates and a discussion",
    caption:
      "Adapt a persisted workspace workflow with assigned tasks, due dates, comments and archiving.",
  },
] as const;

const offers = [
  {
    id: "na-ai-landing",
    name: "NA-AI Landing",
    category: "Launch a landing page",
    description:
      "A focused AI/SaaS marketing template to present your product and validate your offer.",
    price: PRICING.naAiLanding,
    payment: "One-time payment",
    features: [
      "Full landing page source code",
      "Next.js, React and Tailwind CSS",
      "Responsive marketing sections",
      "SEO-ready frontend page",
      "Commercial usage rights",
    ],
    scope: "Frontend template. No auth, billing or database integration.",
    href: INTERNAL.templateNaAi,
    link: "Explore NA-AI Landing",
  },
  {
    id: "starter-free",
    name: "Starter Free",
    category: "Validate your app idea",
    description:
      "A runnable SaaS frontend to explore dashboards, settings and product workflows.",
    price: PRICING.starterFree,
    payment: "Public repository",
    features: [
      "Full SaaS frontend source code",
      "Next.js, React and Tailwind CSS",
      "Dashboard and settings screens",
      "Mocked auth and billing flows",
      "Responsive app layouts",
    ],
    scope: "Demo data and mocked flows. Add your own backend integrations.",
    href: INTERNAL.starterFree,
    link: "Explore Starter Free",
  },
  {
    id: "starter-pro",
    name: "Starter Pro",
    category: "Build your SaaS business",
    description:
      "Connected accounts, workspaces, billing and project workflows, with automated checks and buyer guides.",
    price: PRICING.starterPro,
    payment: "One-time payment · Complete source licence",
    features: [
      "Full Starter Pro source code",
      "Better Auth, revocable sessions and profile editing",
      "Stripe billing and tested webhook reconciliation",
      "Workspaces, project tasks and discussions",
      "FR/EN, Customize and browser regressions",
      "Validated ZIP, diagnostics and restore drill",
    ],
    scope:
      "Personal billing; configurable quotas are uncapped by default. Configure providers and operations for your deployment.",
    href: INTERNAL.starterPro,
    link: "Explore Starter Pro",
  },
] as const;

const sourceOffers = [
  {
    id: "starter-pro",
    name: "Starter Pro Web",
    stack: "Next.js · Web",
    description: "A connected foundation for your Web application.",
    artwork: "/images/starters/pro/concepts/delivery-case-test-v1.png",
    features: [
      "Web application interface",
      "Better Auth, revocable sessions and profile editing",
      "Stripe billing and tested webhook reconciliation",
      "Configuration, schema and setup guides",
    ],
    action: "Explore Starter Pro",
  },
  {
    id: "starter-pro-mobile",
    name: "Starter Pro Mobile",
    stack: STARTER_PRO_MOBILE_PREVIEW.stack,
    description: "Native iOS and Android, with a compatible backend.",
    artwork: "/images/starters/pro/concepts/connected-workspace-test-v1.png",
    features: [
      "Native iOS and Android source",
      "React Native · Expo",
      "Compatible backend source",
      "Configuration, schema and setup guides",
    ],
    action: STARTER_PRO_MOBILE_PREVIEW.action,
  },
  {
    id: "starter-pro-fullstack",
    name: "Starter Pro Fullstack",
    stack: STARTER_PRO_MOBILE_PREVIEW.bundle.stack,
    description: "Web and Mobile, built around the same accounts and data.",
    artwork: "/images/starters/pro/concepts/source-stack-test-v1.png",
    features: [
      "Web application interface",
      "Native iOS and Android source",
      "Same accounts and data",
      "Configuration, schema and setup guides",
    ],
    action: STARTER_PRO_MOBILE_PREVIEW.bundle.action,
  },
] as const;

// Decorative metaphors, kept distinct from the genuine product evidence below.
const offerArtwork = {
  "na-ai-landing": "/images/marketing/concepts/product-launch-v1.webp",
  "starter-free": "/images/starters/pro/concepts/workflow-path-test-v1.png",
  "starter-pro": "/images/marketing/concepts/modular-platform-v1.webp",
} as const;

const faqs = [
  {
    question: "Should I buy NA-AI Landing or Starter Pro?",
    answer:
      "Choose NA-AI Landing when you need a polished frontend marketing page. Choose Starter Pro when you need real authentication, Stripe billing, protected routes, database foundations, and SaaS app wiring.",
  },
  {
    question: "Is NA-AI Landing a full SaaS app?",
    answer:
      "No. NA-AI Landing is a frontend marketing template. It focuses on the public landing page, not authentication, billing, database, or backend logic.",
  },
  {
    question: "Is Starter Pro production-ready?",
    answer:
      "Yes. Starter Pro is designed as a real SaaS foundation with authentication, secure Stripe checkout, protected app architecture, database foundations, purchase recovery, and commercial product surfaces already wired.",
  },
  {
    question: "Why should I buy Starter Pro instead of building it myself?",
    answer: (
      <>
        <SiteText
          text={
            "Because auth, billing, protected routes, account flows, webhook synchronization, and delivery/recovery flows are repeated work that can delay launch. Starter Pro helps you skip that foundation work and focus on your product. For the longer version, read the"
          }
        />
        {<SiteText text={" "} />}
        <Link
          href={INTERNAL.buildVsBuy}
          className="font-medium text-foreground underline underline-offset-4"
        >
          <SiteText text={"build vs buy comparison"} />
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can I use PyColors products for commercial projects?",
    answer:
      "Yes. NA-AI Landing and Starter Pro permit unlimited end products under their respective licenses. Starter Pro covers one licensed individual or legal entity; a client needs their own license to access the Starter Pro source. Open-source packages follow their repository licenses.",
  },
  {
    question: "How do I receive access after purchase?",
    answer:
      "After payment is confirmed and the order is processed, PyColors sends an access link to the checkout email. The confirmation page guides you through the next steps; payment confirmation and inbox delivery are separate steps.",
  },
  {
    question: "What if I do not receive the access email?",
    answer:
      "Use the purchase recovery page with the same email address used at checkout. PyColors can resend the access link for eligible orders.",
  },
  {
    question: "Do I get future Starter Pro updates?",
    answer:
      "Your purchase includes the delivered version and future releases of the included products, subject to continued product availability. Release notes and setup guides explain the changes; you apply updates to your own application.",
  },
  {
    question: "What support is included with Starter Pro?",
    answer: PURCHASE_SUPPORT_SUMMARY,
  },
  {
    question: "What if Starter Pro setup fails locally?",
    answer:
      "Start with Getting Started and the environment variable docs. Check Node.js version, dependencies, database connection, and Stripe test keys first. Email support can help with eligible setup issues.",
  },
  {
    question: "What is the refund policy?",
    answer: DIGITAL_REFUND_SUMMARY,
  },
  {
    question: "Does the Starter Pro licence include implementation?",
    answer: `The ${PRICING.starterPro} one-time purchase covers the complete source licence. Assisted setup and business adaptations are separate engagements, quoted with written deliverables and acceptance criteria.`,
  },
] as const;

export default function PricingPage() {
  const tSite = useCopy();

  return (
    <Container
      className={`marketing-page-intro ${styles.page} pb-12 pt-20 sm:pb-16 sm:pt-24`}
    >
      <JsonLd id="pricing-products-jsonld" data={pricingJsonLd} />
      <main id="content" tabIndex={-1} className="w-full min-w-0">
        <MarketingBreadcrumb route="/pricing" />
        <PageHero
          variant="compact"
          maxWidth="5xl"
          align="left"
          contentClassName={styles.heroContent}
          badges={[{ label: "Pricing", variant: "outline" }]}
          title={tSite("One foundation. Your next product.")}
          description={tSite(
            "Choose Web, native Mobile, or both. Get the source code, keep control of your application, and build on a connected foundation.",
          )}
          className={`${styles.heroPanel} pb-10 sm:pb-12`}
        />

        <nav
          aria-label={tSite("Pricing sections")}
          className={`${styles.sectionNav} mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 py-3 text-sm`}
        >
          {[
            ["#pricing-offers", "Starter Pro"],
            ["#source-licences", "Compare source licences"],
            ["#other-products", "Other starting points"],
            ["#pricing-preview", "Product preview"],
            ["#implementation", "Services"],
            ["#pricing-faq", "FAQ"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={cn(
                "inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground",
                focusRing,
              )}
            >
              {tSite(label)}
            </a>
          ))}
        </nav>

        <section
          id="pricing-offers"
          aria-label={tSite("Choose a PyColors product")}
          className={styles.sourceOffers}
        >
          <div className={styles.purchaseDetails}>
            <span>
              <PackageCheck aria-hidden="true" />
              {tSite("Complete source licence")}
            </span>
            <span>
              <Check aria-hidden="true" />
              {tSite("One-time payment · VAT included")}
            </span>
            <span>
              <ShieldCheck aria-hidden="true" />
              {tSite("Secure Stripe checkout")}
            </span>
          </div>
          <div className={styles.sourceGrid}>
            {sourceOffers.map((offer) => {
              const product = PRODUCT_DISPLAY[offer.id];
              return (
                <article
                  key={offer.id}
                  data-offer={offer.id}
                  aria-labelledby={`source-${offer.id}-heading`}
                  className={styles.sourceCard}
                >
                  <div className={styles.sourceArtwork} aria-hidden="true">
                    <Image
                      src={offer.artwork}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 44vw, 90vw"
                      className={styles.conceptImage}
                    />
                  </div>
                  <header className={styles.sourceSummary}>
                    <p className={styles.sourceStack}>{tSite(offer.stack)}</p>
                    <h2 id={`source-${offer.id}-heading`}>
                      {tSite(offer.name)}
                    </h2>
                    <p className={styles.sourceDescription}>
                      {tSite(offer.description)}
                    </p>
                  </header>
                  <div className={styles.sourcePrice}>
                    <p>{product.priceLabel}</p>
                    <span>{tSite("One-time payment · VAT included")}</span>
                  </div>
                  <ul className={styles.sourceFeatures}>
                    {offer.features.map((feature) => (
                      <MarketingCheckItem key={feature}>
                        {tSite(feature)}
                      </MarketingCheckItem>
                    ))}
                  </ul>
                  <div className={styles.sourceAction}>
                    {offer.id === "starter-pro" ? (
                      <BuyStarterProButton
                        label={tSite("Buy Starter Pro — {value0}", {
                          value0: product.priceLabel,
                        })}
                      />
                    ) : (
                      <BuyProductButton
                        productSlug={offer.id}
                        locale={tSite.locale}
                        label={tSite("Buy {value0} — {value1}", {
                          value0: tSite(product.name),
                          value1: product.priceLabel,
                        })}
                      />
                    )}
                    <Link
                      href={product.href}
                      className={cn(styles.sourceLink, focusRing)}
                    >
                      {tSite(offer.action)}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <p className={styles.sourceNote}>
            {tSite(
              "Source code for your own deployment. Hosting and third-party services are configured and paid by you.",
            )}
          </p>
        </section>

        <div className={styles.sourceComparison}>
          <StarterSourceComparison />
        </div>

        <section
          id="other-products"
          aria-labelledby="other-products-heading"
          className={styles.otherProducts}
        >
          <header className={styles.otherHeading}>
            <p>{tSite("Other starting points")}</p>
            <h2 id="other-products-heading">
              {tSite("Start with a page. Or explore for free.")}
            </h2>
            <span>
              {tSite(
                "A focused landing template or a frontend to try before choosing your app foundation.",
              )}
            </span>
          </header>
          <div className={styles.otherGrid}>
            {offers
              .filter((offer) => offer.id !== "starter-pro")
              .map((offer) => (
                <article
                  key={offer.id}
                  aria-labelledby={`${offer.id}-heading`}
                  data-offer={offer.id}
                  className={styles.offer}
                >
                  <div className={styles.offerArtwork} aria-hidden="true">
                    <Image
                      src={offerArtwork[offer.id]}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 200px, (min-width: 768px) 44vw, 90vw"
                      className={styles.conceptImage}
                    />
                  </div>
                  <header className={styles.offerSummary}>
                    <p className={styles.offerEyebrow}>
                      {tSite(offer.category)}
                    </p>
                    <h3
                      id={`${offer.id}-heading`}
                      className={styles.offerTitle}
                    >
                      {tSite(offer.name)}
                    </h3>
                    <p className={styles.offerDescription}>
                      {tSite(offer.description)}
                    </p>
                  </header>
                  <div className={styles.offerPrice}>
                    <p className={styles.priceValue}>{tSite(offer.price)}</p>
                    <p>{tSite(offer.payment)}</p>
                  </div>
                  <div className={styles.offerAction}>
                    {offer.id === "na-ai-landing" ? (
                      <BuyProductButton
                        productSlug="na-ai-landing"
                        label={tSite("Buy NA-AI Landing — {value0}", {
                          value0: PRICING.naAiLanding,
                        })}
                        variant="outline"
                        fullWidth
                      />
                    ) : (
                      <Button
                        size="lg"
                        asChild
                        variant="outline"
                        className="w-full rounded-md"
                      >
                        <Link href={INTERNAL.starterFree}>
                          {tSite("Open Starter Free")}
                        </Link>
                      </Button>
                    )}
                  </div>
                  <p className={styles.offerScope}>{tSite(offer.scope)}</p>
                  <Link
                    href={offer.href}
                    className={cn(styles.offerLink, focusRing)}
                  >
                    {tSite(offer.link)}
                  </Link>
                </article>
              ))}
          </div>
        </section>

        <MarketingSectionShell
          divider="pattern"
          id="pricing-comparison"
          width="full"
          className={cn("scroll-mt-20", styles.comparisonSection)}
          aria-labelledby="pricing-comparison-heading"
        >
          <MarketingSectionHeader
            titleId="pricing-comparison-heading"
            className={styles.chapterHeading}
            eyebrow={tSite("Side by side")}
            title={tSite("Compare the template and Web starting points")}
            description={tSite(
              "Compare the landing template, frontend demonstration and Web foundation. The source-licence comparison above distinguishes Web, Mobile and Fullstack.",
            )}
          />
          <PricingComparisonTable />
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href={INTERNAL.buildVsBuy}
              className={cn(
                "inline-flex min-h-11 items-center underline underline-offset-4",
                focusRing,
              )}
            >
              {tSite("Compare building vs buying")}
            </Link>
            <Link
              href={INTERNAL.docsStarterPro}
              className={cn(
                "inline-flex min-h-11 items-center underline underline-offset-4",
                focusRing,
              )}
            >
              {tSite("Read Starter Pro docs")}
            </Link>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="pricing-preview"
          width="full"
          className={cn(
            "scroll-mt-20 border-t border-border-subtle",
            styles.previewSection,
          )}
          aria-labelledby="pricing-product-preview-heading"
        >
          <MarketingSectionHeader
            titleId="pricing-product-preview-heading"
            className={styles.chapterHeading}
            eyebrow={tSite("Inside Starter Pro")}
            title={tSite("See the screens you can build on")}
            description={tSite(
              "Existing Starter Pro interface captures, shown in the light theme. These previews show included screens, not proof of a live deployment, a completed payment, or a verified integration.",
            )}
            action={
              <Button asChild variant="outline" className="rounded-md">
                <Link href="/demo">{tSite("Explore the demos")}</Link>
              </Button>
            }
          />
          <div
            className={cn("grid gap-6 md:grid-cols-2", styles.screenshotGrid)}
          >
            {starterProScreenshots.map((screenshot) => (
              <figure
                key={screenshot.src}
                className={cn("min-w-0 space-y-4", styles.screenshotCard)}
              >
                <a
                  href={screenshot.src}
                  aria-label={tSite("View {value0} screenshot at full size", {
                    value0: tSite(screenshot.title).toLocaleLowerCase(
                      tSite.locale,
                    ),
                  })}
                  className={cn(
                    "block overflow-hidden rounded-lg border border-border-subtle bg-surface",
                    focusRing,
                  )}
                >
                  <ProductPreviewWindow label={tSite(screenshot.title)}>
                    <Image
                      src={screenshot.src}
                      alt={tSite(screenshot.alt)}
                      quality={100}
                      width={screenshot.width}
                      height={screenshot.height}
                      sizes="(min-width: 1440px) 680px, (min-width: 768px) calc(50vw - 32px), calc(100vw - 32px)"
                      className="h-auto w-full"
                    />
                  </ProductPreviewWindow>
                </a>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {tSite(screenshot.title)}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {tSite(screenshot.caption)}
                  </p>
                  <div className={styles.screenActions}>
                    <Link
                      href={screenshot.guide}
                      className={styles.screenGuide}
                    >
                      {tSite(screenshot.guideLabel)}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                    <Link href="/demo" className={styles.screenDemo}>
                      {tSite("Explore the demos")}
                    </Link>
                  </div>
                  <a
                    href={screenshot.src}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-md text-sm font-medium text-foreground underline underline-offset-4",
                      focusRing,
                    )}
                  >
                    {tSite("View ")}
                    {tSite(screenshot.title).toLocaleLowerCase(
                      tSite.locale,
                    )}{" "}
                    {tSite(" at full size")}
                  </a>
                </figcaption>
              </figure>
            ))}
            <article
              aria-labelledby="pricing-future-mobile-title"
              className={styles.futureMobile}
            >
              <div className={styles.futureMobileArt} aria-hidden="true">
                <Image
                  src="/images/marketing/concepts/modular-platform-v1.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, 90vw"
                  className="object-contain"
                />
              </div>
              <div className={styles.futureMobileContent}>
                <Badge variant="outline">
                  {tSite(STARTER_PRO_MOBILE_PREVIEW.status)}
                </Badge>
                <h3 id="pricing-future-mobile-title">
                  {tSite(STARTER_PRO_MOBILE_PREVIEW.name)}
                </h3>
                <p className={styles.mobileStack}>
                  {tSite(STARTER_PRO_MOBILE_PREVIEW.stack)}
                </p>
                <p>{tSite(STARTER_PRO_MOBILE_PREVIEW.description)}</p>
                <Link
                  href={STARTER_PRO_MOBILE_PREVIEW.href}
                  className={styles.screenGuide}
                >
                  {tSite(STARTER_PRO_MOBILE_PREVIEW.action)}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
          <div
            role="group"
            aria-labelledby="pricing-all-products-preview-heading"
            className={styles.productProof}
          >
            <h3 id="pricing-all-products-preview-heading">
              {tSite("Product preview")}
            </h3>
            <div className={styles.productProofGrid}>
              {offers.map((offer) => (
                <figure
                  key={offer.id}
                  aria-labelledby={`pricing-proof-${offer.id}`}
                  className={styles.productProofCard}
                >
                  <p id={`pricing-proof-${offer.id}`}>{tSite(offer.name)}</p>
                  <ProductPreviewWindow label={tSite(offer.name)}>
                    <ProductPreviewMedia
                      product={offer.id}
                      sizes="(min-width: 1280px) 355px, (min-width: 1024px) 31vw, (min-width: 768px) 48vw, 90vw"
                    />
                  </ProductPreviewWindow>
                  <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
                    {tSite(PRODUCT_PREVIEW_MEDIA[offer.id].caption)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </MarketingSectionShell>

        <StarterProImplementation />
        <MarketingFaqSection
          id="pricing-faq"
          width="full"
          className="scroll-mt-20"
          aria-labelledby="pricing-faq-heading"
        >
          <MarketingFaq
            titleId="pricing-faq-heading"
            eyebrow={tSite("Before you choose")}
            title={tSite("Your questions, answered.")}
            description={tSite(
              "Product fit, purchase access, updates and support.",
            )}
            items={faqs}
          />
        </MarketingFaqSection>

        <section
          aria-labelledby="pricing-help-heading"
          className={cn(
            "flex flex-col gap-6 border-t border-border-subtle py-8 sm:flex-row sm:items-center sm:justify-between",
            styles.helpPanel,
          )}
        >
          <div>
            <h2
              id="pricing-help-heading"
              className="text-lg font-semibold tracking-normal"
            >
              {tSite("Still deciding where to start?")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {tSite(
                "Explore the free frontend or try the demo before choosing your foundation.",
              )}
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 rounded-md">
            <Link href={INTERNAL.starterFree}>
              {tSite("Explore Starter Free")}
            </Link>
          </Button>
        </section>
        <p className="border-t border-border-subtle pt-6 text-xs leading-6 text-muted-foreground">
          {tSite("Legal scope and usage terms are governed by")}
          {tSite(" ")}
          <Link
            href={INTERNAL.license}
            className={cn("underline underline-offset-4", focusRing)}
          >
            {tSite("the license")}
          </Link>
          {tSite(" ")}
          {tSite("and")}
          {tSite(" ")}
          <Link
            href={INTERNAL.terms}
            className={cn("underline underline-offset-4", focusRing)}
          >
            {tSite("terms")}
          </Link>
          .
        </p>
      </main>
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/pricing", locale);
}

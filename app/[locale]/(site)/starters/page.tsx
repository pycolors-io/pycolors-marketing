import { StarterSourceComparison } from "@/components/starters/starter-source-comparison";
import { StarterSourceOffers } from "@/components/starters/starter-source-offers";
import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { MarketingHeroBand } from "@/components/marketing/hero-band";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  FileCode2,
  Layers3,
  Monitor,
  Smartphone,
} from "lucide-react";

import { Badge, cn } from "@pycolors/ui";
import Image from "next/image";
import { SiteButton as Button } from "@/components/site-button";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { ProductPreviewMedia } from "@/components/marketing/product-preview-media";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { StarterComparisonTable } from "@/components/starters/starter-comparison-table";
import styles from "@/components/starters/starters-index.module.css";

const metadata: Metadata = {
  title: "SaaS Starters for Next.js",

  description:
    "Production-ready SaaS starters for Next.js. Validate your product with Starter Free, then upgrade to Starter Pro for authentication, Stripe billing, Prisma, PostgreSQL, and launch-ready architecture.",

  alternates: {
    canonical: "/starters",
  },

  openGraph: {
    title: "SaaS Starters for Next.js — PyColors",
    description:
      "Validate your SaaS product with Starter Free. Upgrade to Starter Pro for authentication, Stripe billing, Prisma, PostgreSQL, and production-ready foundations.",
    url: "/starters",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "SaaS Starters for Next.js — PyColors",
    description:
      "Production-ready SaaS starters built for modern Next.js products.",
    images: ["/seo/twitter-main.png"],
  },
};

const demoUrl = "https://starter-demo.pycolors.io";
const repositoryUrl = "https://github.com/pycolors-io/pycolors-starter-free";

const sourceOverview = [
  {
    slug: "starter-pro",
    name: "Starter Pro Web",
    scope: "Web and installable PWA",
    guide: "Open Getting Started",
    image: "/images/starters/pro/concepts/workflow-path-test-v1.png",
    icon: Monitor,
  },
  {
    slug: "starter-pro-mobile",
    name: "Starter Pro Mobile",
    scope: "Native iOS and Android source",
    guide: "Mobile setup guide",
    image: "/images/starters/pro/concepts/connected-workspace-test-v1.png",
    icon: Smartphone,
  },
  {
    slug: "starter-pro-fullstack",
    name: "Starter Pro Fullstack",
    scope: "Web and native iOS/Android",
    guide: "Fullstack setup guide",
    image: "/images/starters/pro/concepts/source-stack-test-v1.png",
    icon: Layers3,
  },
] as const;

const offers = [
  {
    slug: "free",
    name: "Starter Free",
    label: "Validate your interface",
    description:
      "Explore the screens. Shape your workflows. Make the product your own.",
    price: STARTER_FREE_PRICE_LABEL,
    access: "Public repository",
    priceNote: "Clone the source and start building your UI.",
    previewId: "starter-free",
    scope: "UI with mock data",
    highlights: [
      "Dashboard, projects and settings screens",
      "Auth and billing interface examples",
      "Responsive layouts with PyColors UI",
      "Mock data; no backend setup required",
    ],
    setup:
      "No real accounts, payments or database. Add those integrations when your product needs them.",
  },
  {
    slug: "na-ai",
    name: "NA-AI Landing",
    label: "Launch a landing page",
    description:
      "A focused AI/SaaS marketing template to present your product and validate your offer.",
    price: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
    access: "One-time payment · VAT included",
    priceNote: "Full landing page source code",
    previewId: "na-ai-landing",
    scope: "Frontend template. No auth, billing or database integration.",
    highlights: [
      "Next.js, React and Tailwind CSS",
      "Responsive marketing sections",
      "SEO-ready frontend page",
      "Commercial usage rights",
    ],
    setup: "Frontend template. No auth, billing or database integration.",
  },
] as const;

type StarterOffer = (typeof offers)[number];

function StarterOfferCard({ offer }: Readonly<{ offer: StarterOffer }>) {
  const tSite = useCopy();

  const isFree = offer.slug === "free";
  const href = isFree ? "/starters/free" : "/templates/na-ai-landing";
  return (
    <article
      aria-labelledby={`starter-${offer.slug}-title`}
      className={cn(
        "flex min-w-0 flex-col overflow-hidden border border-border-subtle bg-background md:row-span-3 md:grid md:grid-rows-subgrid",
        styles.offerCard,
      )}
    >
      <div className={cn("p-5 sm:p-7", styles.offerHeader, styles.freeHeader)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground">
            {tSite(offer.label)}
          </p>
          <Badge
            variant="outline"
            className={cn(
              "rounded-[5px] border-border-subtle bg-background/70 text-[11px]",
              styles.offerBadge,
            )}
          >
            {tSite(isFree ? "Frontend starter" : "Landing page template")}
          </Badge>
        </div>
        <h3
          id={`starter-${offer.slug}-title`}
          className="mt-5 font-brand text-[22px] font-semibold leading-snug tracking-subheading sm:text-2xl"
        >
          {tSite(offer.name)}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground md:min-h-14">
          {tSite(offer.description)}
        </p>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={styles.offerPrice}>{tSite(offer.price)}</span>
          <span className="text-xs text-muted-foreground">
            {tSite(offer.access)}
          </span>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {tSite(offer.priceNote)}
        </p>
      </div>

      <figure
        className={cn(
          "border-y border-border-subtle px-5 pt-5 sm:px-7 sm:pt-7",
          styles.previewStage,
          styles.freePreviewStage,
        )}
      >
        <Link
          href={href}
          className={cn(
            "group relative block overflow-hidden rounded-t-[4px] border border-b-0 border-border-subtle bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            styles.previewLink,
          )}
          aria-label={tSite("Explore the {value0} preview", {
            value0: offer.name,
          })}
        >
          <ProductPreviewMedia
            product={offer.previewId}
            sizes="(min-width: 1280px) 540px, (min-width: 768px) 43vw, 90vw"
            className="rounded-b-none border-0"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-[5px] border border-border-subtle bg-background text-foreground shadow-sm transition-colors group-hover:bg-surface-muted"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
        <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">
            {tSite(offer.scope)}
          </span>
          <span>
            {tSite(
              isFree
                ? "Dashboard preview · Sample data"
                : "Illustrative content",
            )}
          </span>
        </figcaption>
      </figure>

      <div className={cn("flex flex-1 flex-col p-5 sm:p-7", styles.offerBody)}>
        <p className="text-xs font-medium text-foreground">
          {tSite("What you start with")}
        </p>
        <ul
          aria-label={tSite("{value0} highlights", { value0: offer.name })}
          className="mt-4 space-y-3"
        >
          {offer.highlights.map((highlight) => (
            <MarketingCheckItem key={highlight} className={styles.checkItem}>
              {tSite(highlight)}
            </MarketingCheckItem>
          ))}
        </ul>
        <p className="mb-6 mt-5 border-t border-border-subtle pt-4 text-xs leading-6 text-muted-foreground">
          {tSite(offer.setup)}
        </p>
        <div
          className={cn(
            "mt-auto grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2",
            styles.offerActions,
          )}
        >
          <Button
            asChild
            variant="outline"
            className={cn(
              "h-auto rounded-[5px] shadow-none",
              styles.exploreAction,
            )}
          >
            <Link href={href}>
              {tSite("Explore ")}
              {tSite(offer.name)}
            </Link>
          </Button>
          {!isFree ? (
            <BuyProductButton
              productSlug="na-ai-landing"
              label={tSite("Buy NA-AI Landing — {value0}", {
                value0: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
              })}
              variant="outline"
            />
          ) : (
            <Button asChild variant="ghost" className="h-auto rounded-[5px]">
              <a href={repositoryUrl} target="_blank" rel="noreferrer noopener">
                {tSite("View source on GitHub")}
                {tSite("  ")}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                <span className="sr-only">
                  {" "}
                  {tSite(" (opens in a new tab)")}
                </span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function StartersPage() {
  const tSite = useCopy();

  return (
    <main
      id="content"
      tabIndex={-1}
      className={cn(
        "bg-background text-foreground focus:outline-none",
        styles.page,
      )}
    >
      <MarketingHeroBand tone="cool">
        <Container className={`marketing-page-intro ${styles.heroContainer}`}>
          <MarketingBreadcrumb route="/starters" />
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              contentClassName="mx-0 max-w-3xl"
              actionsClassName={styles.heroActions}
              badges={[{ label: "SaaS starters", variant: "outline" }]}
              title={tSite("The foundation for your next product.")}
              description={tSite(
                "Build for the Web, iOS or Android. Choose your source, inspect the guides and make it your product.",
              )}
              actions={
                <>
                  <Button
                    size="lg"
                    asChild
                    className="site-primary-action rounded-[5px] shadow-none"
                  >
                    <Link href="#choose-starter">
                      {tSite("Find your starting point")}
                      {tSite("  ")}
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    variant="outline"
                    className={styles.heroSecondary}
                  >
                    <a href={demoUrl} target="_blank" rel="noreferrer noopener">
                      {tSite("Try the Starter Free demo")}
                      {tSite("  ")}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                      <span className="sr-only">
                        {" "}
                        {tSite(" (opens in a new tab)")}
                      </span>
                    </a>
                  </Button>
                </>
              }
              extra={
                <MarketingPillList
                  aria-label={tSite("Target platforms")}
                  className={styles.heroPlatforms}
                >
                  {["Web", "iOS", "Android"].map((technology) => (
                    <MarketingPill key={technology} className="bg-background">
                      {technology}
                    </MarketingPill>
                  ))}
                </MarketingPillList>
              }
            />
            <section
              aria-labelledby="starter-source-overview-title"
              className={styles.sourceOverview}
            >
              <p className={styles.sourceOverviewEyebrow}>
                {tSite("Source licences")}
              </p>
              <h2 id="starter-source-overview-title">
                {tSite("Web, Mobile, or both.")}
              </h2>
              <ul className={styles.sourceOverviewList}>
                {sourceOverview.map((option) => {
                  const product = PRODUCT_DISPLAY[option.slug];
                  const Icon = option.icon;
                  return (
                    <li key={option.slug}>
                      <Link
                        href={product.href}
                        className={styles.sourceOverviewProduct}
                      >
                        <span
                          className={styles.sourceOverviewArt}
                          aria-hidden="true"
                        >
                          <Image
                            src={option.image}
                            alt=""
                            fill
                            sizes="(min-width: 640px) 80px, 56px"
                          />
                        </span>
                        <div>
                          <h3>{tSite(option.name)}</h3>
                          <p className={styles.sourceOverviewScope}>
                            <Icon aria-hidden="true" />
                            {tSite(option.scope)}
                          </p>
                        </div>
                        <span className={styles.sourceOverviewPrice}>
                          {product.priceLabel}
                        </span>
                      </Link>
                      <Link
                        href={product.docsHref}
                        className={styles.sourceOverviewGuide}
                      >
                        {tSite(option.guide)}
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.sourceOverviewNote}>
                <p>{tSite("One-time payment · VAT included")}</p>
                <p>{tSite("Concept illustrations")}</p>
              </div>
            </section>
          </div>
        </Container>
      </MarketingHeroBand>
      <Container className="pb-16">
        <MarketingSectionShell
          id="choose-starter"
          aria-labelledby="choose-starter-title"
          width="full"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            align="left"
            titleId="choose-starter-title"
            title={tSite("Choose the source your product needs.")}
            description={tSite("Choose by what you need to build next.")}
            action={
              <Link href="#source-licences" className={styles.textLink}>
                {tSite("Compare source licences")}{" "}
                <ArrowDown className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <StarterSourceOffers />
        </MarketingSectionShell>

        <div className={styles.sourceComparison}>
          <StarterSourceComparison />
          <Link href="#compare-starters" className={styles.textLink}>
            {tSite("Compare Free with the Web foundation.")}
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <MarketingSectionShell
          id="explore-starters"
          aria-labelledby="explore-starters-title"
          width="full"
        >
          <MarketingSectionHeader
            align="left"
            titleId="explore-starters-title"
            title={tSite("Explore lighter starting points.")}
            description={tSite(
              "Starter Free to validate your screens. NA-AI Landing to present your product.",
            )}
          />
          <div className="grid items-stretch gap-5 md:grid-cols-2 md:grid-rows-[auto_auto_1fr] md:gap-y-0">
            {offers.map((offer) => (
              <StarterOfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="compare-starters"
          aria-labelledby="compare-starters-title"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="compare-starters-title"
            title={tSite("Compare Free with the Web foundation.")}
            description={tSite(
              "Free frontend and Web integration foundations, side by side.",
            )}
            action={
              <Link href="/pricing" className={styles.textLink}>
                {tSite("All products & pricing")}{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <StarterComparisonTable />
        </MarketingSectionShell>

        <MarketingSectionShell
          aria-labelledby="starter-next-steps-title"
          width="full"
          className="border-t border-border-subtle pb-0"
        >
          <div className={styles.resources}>
            <MarketingSectionHeader
              align="left"
              titleId="starter-next-steps-title"
              title={tSite("Your next step, documented.")}
              description={tSite(
                "Inspect the setup, plan the transition and make the interface your own.",
              )}
            />
            <div className="grid gap-3 md:grid-cols-3">
              <MarketingResourceCard
                href="/docs/starter"
                title={tSite("Start with the docs")}
                description={tSite(
                  "Get oriented in the starter structure and local setup.",
                )}
                meta={
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="size-3.5" aria-hidden="true" />
                    {tSite("Getting started")}
                  </span>
                }
                className={styles.resourceCard}
              />
              <MarketingResourceCard
                href="/docs/starter/upgrade"
                title={tSite("Plan your move to Pro")}
                description={tSite(
                  "Understand which UI work carries over and which integrations to configure.",
                )}
                meta={
                  <span className="inline-flex items-center gap-2">
                    <FileCode2 className="size-3.5" aria-hidden="true" />
                    {tSite("Free → Pro")}
                  </span>
                }
                className={styles.resourceCard}
              />
              <MarketingResourceCard
                href="/tools/theme-builder"
                title={tSite("Make it your brand")}
                description={tSite(
                  "Explore colors and typography, then copy your theme tokens.",
                )}
                meta={
                  <span className="inline-flex items-center gap-2">
                    <Code2 className="size-3.5" aria-hidden="true" />
                    {tSite("Theme Builder")}
                  </span>
                }
                className={styles.resourceCard}
              />
            </div>
          </div>
        </MarketingSectionShell>
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
  return localizePageMetadata(metadata, "/starters", locale);
}

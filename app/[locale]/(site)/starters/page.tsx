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
} from "lucide-react";

import { Badge, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
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

const sourcePrice = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const demoUrl = "https://starter-demo.pycolors.io";
const repositoryUrl = "https://github.com/pycolors-io/pycolors-starter-free";

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
    slug: "pro",
    name: "Starter Pro",
    label: "Connect your product",
    description:
      "Build on authentication, billing and database foundations. Focus on your product logic.",
    price: sourcePrice,
    access: "One-time payment",
    priceNote:
      "Complete source licence. Implementation services are quoted separately.",
    previewId: "starter-pro",
    scope: "Auth, billing & data foundations",
    highlights: [
      "Auth.js credentials and Google/GitHub OAuth",
      "Stripe Checkout, portal and webhooks",
      "Prisma + PostgreSQL foundations",
      "Protected routes and installable PWA",
    ],
    setup:
      "Configure your providers, database and Stripe, then validate before deployment. Source ZIP delivered by claim email.",
  },
] as const;

type StarterOffer = (typeof offers)[number];

function StarterOfferCard({ offer }: Readonly<{ offer: StarterOffer }>) {
  const tSite = useCopy();

  const isPro = offer.slug === "pro";
  return (
    <article
      aria-labelledby={`starter-${offer.slug}-title`}
      className="flex min-w-0 flex-col overflow-hidden rounded-[5px] border border-border-subtle bg-background md:row-span-3 md:grid md:grid-rows-subgrid"
    >
      <div className={cn("p-5 sm:p-7", isPro && styles.proHeader)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground">
            {tSite(offer.label)}
          </p>
          <Badge
            variant="outline"
            className="rounded-[5px] border-border-subtle bg-background/70 text-[11px]"
          >
            {tSite(isPro ? "Integration foundations" : "Frontend starter")}
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
          <span className="text-3xl font-semibold tracking-[-0.04em]">
            {tSite(offer.price)}
          </span>
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
        )}
      >
        <Link
          href={`/starters/${offer.slug}`}
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
          <span>{tSite("Dashboard preview · Sample data")}</span>
        </figcaption>
      </figure>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
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
        <div className="mt-auto grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-[5px] shadow-none"
          >
            <Link href={`/starters/${offer.slug}`}>
              {tSite("Explore ")}
              {tSite(offer.name)}
            </Link>
          </Button>
          {isPro ? (
            <BuyStarterProButton
              label={tSite("Buy Starter Pro")}
              loadingLabel={tSite("Opening checkout…")}
              className="shadow-none hover:shadow-none"
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
      className="bg-background text-foreground focus:outline-none"
    >
      <Container className="pb-16 pt-24 sm:pt-28">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-3xl"
          badges={[{ label: "SaaS starters", variant: "outline" }]}
          title={tSite("A head start for your next SaaS.")}
          description={tSite(
            "Start with a considered interface. Choose Free to validate your screens, or Pro when you're ready to connect real accounts, billing and data. Both start with Next.js and PyColors UI.",
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
                className="rounded-[5px] shadow-none"
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
            <MarketingPillList aria-label={tSite("Shared starter stack")}>
              {["Next.js", "React", "TypeScript", "Tailwind CSS"].map(
                (technology) => (
                  <MarketingPill key={technology} className="bg-background">
                    {tSite(technology)}
                  </MarketingPill>
                ),
              )}
            </MarketingPillList>
          }
        />

        <MarketingSectionShell
          divider="pattern"
          id="choose-starter"
          aria-labelledby="choose-starter-title"
          width="full"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            align="left"
            titleId="choose-starter-title"
            title={tSite("Two starting points. One design foundation.")}
            description={tSite("Choose by what you need to build next.")}
            action={
              <Link href="#compare-starters" className={styles.textLink}>
                {tSite("Compare every capability")}{" "}
                <ArrowDown className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid items-stretch gap-5 md:grid-cols-2 md:grid-rows-[auto_auto_1fr] md:gap-y-0">
            {offers.map((offer) => (
              <StarterOfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2.5 text-xs leading-6 text-muted-foreground">
            <Code2 className="mt-1 size-4 shrink-0" aria-hidden="true" />
            {tSite(
              "Both starters share PyColors UI and design tokens. Pro adds integration foundations; you own the configuration, product logic and deployment.",
            )}
          </p>
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
            title={tSite("Know exactly what you're starting with.")}
            description={tSite(
              "The screens, integrations and setup work, side by side.",
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
          <div
            className={cn(
              "rounded-[5px] border border-border-subtle p-5 sm:p-8",
              styles.resources,
            )}
          >
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
                className="bg-background shadow-none hover:shadow-none"
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
                className="bg-background shadow-none hover:shadow-none"
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
                className="bg-background shadow-none hover:shadow-none"
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

import Image from "next/image";
import Link from "next/link";
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
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { StarterComparisonTable } from "@/components/starters/starter-comparison-table";
import styles from "@/components/starters/starters-index.module.css";

export const metadata: Metadata = {
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

const launchPrice = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const regularPrice = PRODUCT_DISPLAY["starter-pro"].regularPriceLabel;
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
    image: "/images/starters/free/dashboard-free-page-pycolors.png",
    imageAlt:
      "Starter Free dashboard with navigation, sample metrics and activity",
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
    price: launchPrice,
    access: "One-time payment",
    priceNote: `Current launch price. Regular price planned at ${regularPrice}.`,
    image: "/images/starters/pro/dashboard-pycolors.png",
    imageAlt:
      "Starter Pro dashboard with workspace navigation, sample metrics and product activity",
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
  const isPro = offer.slug === "pro";
  return (
    <article
      aria-labelledby={`starter-${offer.slug}-title`}
      className="flex min-w-0 flex-col overflow-hidden rounded-[5px] border border-border-subtle bg-background md:row-span-3 md:grid md:grid-rows-subgrid"
    >
      <div className={cn("p-5 sm:p-7", isPro && styles.proHeader)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground">
            {offer.label}
          </p>
          <Badge
            variant="outline"
            className="rounded-[5px] border-border-subtle bg-background/70 text-[11px]"
          >
            {isPro ? "Integration foundations" : "Frontend starter"}
          </Badge>
        </div>
        <h3
          id={`starter-${offer.slug}-title`}
          className="mt-5 font-brand text-[22px] font-semibold leading-snug tracking-subheading sm:text-2xl"
        >
          {offer.name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground md:min-h-14">
          {offer.description}
        </p>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-3xl font-semibold tracking-[-0.04em]">
            {offer.price}
          </span>
          <span className="text-xs text-muted-foreground">{offer.access}</span>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {offer.priceNote}
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
            "group relative block aspect-[16/10] overflow-hidden rounded-t-[4px] border border-b-0 border-border-subtle bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            styles.previewLink,
          )}
          aria-label={`Explore the ${offer.name} preview`}
        >
          <Image
            src={offer.image}
            alt={offer.imageAlt}
            fill
            sizes="(min-width: 1280px) 540px, (min-width: 768px) 43vw, 90vw"
            className="object-cover object-top"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-[5px] border border-border-subtle bg-background text-foreground shadow-sm transition-colors group-hover:bg-surface-muted"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
        <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">{offer.scope}</span>
          <span>Dashboard preview · Sample data</span>
        </figcaption>
      </figure>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <p className="text-xs font-medium text-foreground">
          What you start with
        </p>
        <ul aria-label={`${offer.name} highlights`} className="mt-4 space-y-3">
          {offer.highlights.map((highlight) => (
            <MarketingCheckItem key={highlight} className={styles.checkItem}>
              {highlight}
            </MarketingCheckItem>
          ))}
        </ul>
        <p className="mb-6 mt-5 border-t border-border-subtle pt-4 text-xs leading-6 text-muted-foreground">
          {offer.setup}
        </p>
        <div className="mt-auto grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-[5px] shadow-none"
          >
            <Link href={`/starters/${offer.slug}`}>
              Explore {offer.name}
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          </Button>
          {isPro ? (
            <BuyStarterProButton
              label="Buy Starter Pro"
              loadingLabel="Opening checkout…"
              className="shadow-none hover:shadow-none"
            />
          ) : (
            <Button asChild variant="ghost" className="h-auto rounded-[5px]">
              <a href={repositoryUrl} target="_blank" rel="noreferrer noopener">
                View source on GitHub{" "}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function StartersPage() {
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
          title="A head start for your next SaaS."
          description="Start with a considered interface. Choose Free to validate your screens, or Pro when you're ready to connect real accounts, billing and data. Both start with Next.js and PyColors UI."
          actions={
            <>
              <Button
                size="lg"
                asChild
                className="site-primary-action rounded-[5px] shadow-none"
              >
                <Link href="#choose-starter">
                  Find your starting point{" "}
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
                  Try the Starter Free demo{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </>
          }
          extra={
            <MarketingPillList aria-label="Shared starter stack">
              {["Next.js", "React", "TypeScript", "Tailwind CSS"].map(
                (technology) => (
                  <MarketingPill key={technology} className="bg-background">
                    {technology}
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
            title="Two starting points. One design foundation."
            description="Choose by what you need to build next."
            action={
              <Link href="#compare-starters" className={styles.textLink}>
                Compare every capability{" "}
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
            Both starters share PyColors UI and design tokens. Pro adds
            integration foundations; you own the configuration, product logic
            and deployment.
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
            title="Know exactly what you're starting with."
            description="The screens, integrations and setup work, side by side."
            action={
              <Link href="/pricing" className={styles.textLink}>
                All products & pricing{" "}
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
              title="Your next step, documented."
              description="Inspect the setup, plan the transition and make the interface your own."
            />
            <div className="grid gap-3 md:grid-cols-3">
              <MarketingResourceCard
                href="/docs/starter"
                title="Start with the docs"
                description="Get oriented in the starter structure and local setup."
                meta={
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="size-3.5" aria-hidden="true" />
                    Getting started
                  </span>
                }
                className="bg-background shadow-none hover:shadow-none"
              />
              <MarketingResourceCard
                href="/docs/starter/upgrade"
                title="Plan your move to Pro"
                description="Understand which UI work carries over and which integrations to configure."
                meta={
                  <span className="inline-flex items-center gap-2">
                    <FileCode2 className="size-3.5" aria-hidden="true" />
                    Free → Pro
                  </span>
                }
                className="bg-background shadow-none hover:shadow-none"
              />
              <MarketingResourceCard
                href="/tools/theme-builder"
                title="Make it your brand"
                description="Explore colors and typography, then copy your theme tokens."
                meta={
                  <span className="inline-flex items-center gap-2">
                    <Code2 className="size-3.5" aria-hidden="true" />
                    Theme Builder
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

import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  CreditCard,
  Database,
  Download,
  ExternalLink,
  FileText,
  Lock,
  KeyRound,
  Layers3,
  Mail,
  Rocket,
  ShieldCheck,
  Smartphone,
  UserRound,
  Webhook,
} from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { starterProBuyerFaqs } from "@/lib/products/starter-pro-buyer-faq";
import { Container } from "@/components/container";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import {
  MarketingCheckItem,
  type MarketingCheckItemProps,
} from "@/components/marketing/check-item";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingFaq } from "@/components/marketing/faq";
import { JsonLd, generateProductOfferJsonLd } from "@/components/seo/json-ld";
import { StarterProCarousel } from "@/components/starters/starter-pro-carousel";
import { StarterProFoundations } from "@/components/starters/starter-pro-foundations";
import { StarterComparisonTable } from "@/components/starters/starter-comparison-table";
import styles from "@/components/starters/starter-pro.module.css";
import detailStyles from "@/components/marketing/detail-card.module.css";

export const metadata: Metadata = {
  title: "Next.js SaaS Starter with Auth & Billing",
  description:
    "Next.js SaaS starter source code with Auth.js, Stripe billing and Prisma. Configure your providers, build your product and validate before launch.",
  alternates: {
    canonical: "/starters/pro",
  },

  openGraph: {
    title: "Next.js SaaS Starter with Auth & Billing — PyColors",
    description:
      "Next.js SaaS starter source code with Auth.js, Stripe billing and Prisma. Configure your providers, build your product and validate before launch.",
    url: "/starters/pro",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Starter with Auth & Billing — PyColors",
    description:
      "Next.js SaaS starter source code with Auth.js, Stripe billing and Prisma. Configure your providers, build your product and validate before launch.",
    images: ["/seo/twitter-main.png"],
  },
};

const launchPrice = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const regularPrice = PRODUCT_DISPLAY["starter-pro"].regularPriceLabel;

const starterProJsonLd = generateProductOfferJsonLd({
  product: PRODUCT_DISPLAY["starter-pro"],
  canonicalPath: "/starters/pro",
  description:
    "Next.js SaaS starter source code with Auth.js, Stripe billing and Prisma. Configure your providers, build your product and validate before launch.",
});

const INTERNAL = {
  buildVsBuy: "/compare/build-vs-buy",
  pricing: "/pricing",
  starterFree: "/starters/free",
  docsStarterPro: "/docs/starter-pro",
  docsGettingStarted: "/docs/starter-pro/getting-started",
  docsWhatIsIncluded: "/docs/starter-pro/what-is-included",
  docsDelivery: "/docs/starter-pro/delivery",
  docsPurchaseRecovery: "/docs/starter-pro/purchase-recovery",
  docsBillingTesting: "/docs/starter-pro/billing-testing",
  docsProductionChecklist: "/docs/starter-pro/production-checklist",
  docsDeployment: "/docs/starter-pro/deployment",
  docsAuth: "/docs/starter-pro/auth",
  docsBilling: "/docs/starter-pro/billing",
  docsBackend: "/docs/starter-pro/backend",
  ordersRecover: "/orders/recover",
  docsPwa: "/docs/starter-pro/pwa",
  docsPwaSetup: "/docs/starter-pro/pwa-setup",
  docsPwaChecklist: "/docs/starter-pro/pwa-production-checklist",
  changelog: "/changelog",
  roadmap: "/roadmap",
  license: "/license",
  terms: "/terms",
} as const;

const EXTERNAL = {
  starterDemo: "https://starter-demo.pycolors.io",
} as const;

const stackItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Auth.js",
  "Prisma",
  "PostgreSQL",
  "Stripe",
  "Vercel",
  "PWA",
] as const;

const postPurchaseDetails = [
  {
    title: "Your downloadable package",
    description:
      "Your secure access link unlocks a Starter Pro ZIP with the full source code, documentation, and production checklist.",
    icon: Download,
    links: [
      {
        href: INTERNAL.docsWhatIsIncluded,
        label: "Review everything included",
      },
      {
        href: INTERNAL.docsDelivery,
        label: "Review delivery",
      },
    ],
  },
  {
    title: "Claim email and purchase recovery",
    description:
      "Missing the purchase email or using an expired link? Request a fresh access link with the email used at checkout. Eligible purchases can be recovered without creating an account or buying again.",
    icon: Mail,
    links: [
      {
        href: INTERNAL.ordersRecover,
        label: "Open purchase recovery",
      },
      {
        href: INTERNAL.docsPurchaseRecovery,
        label: "Read the recovery guide",
      },
    ],
  },
  {
    title: "Updates and access support",
    description:
      "Future Starter Pro updates are included at no additional cost for existing buyers, subject to continued product availability. Purchase and access-recovery support is available. No response-time SLA is promised.",
    icon: ShieldCheck,
    links: [
      {
        href: INTERNAL.changelog,
        label: "Review release history",
      },
    ],
  },
  {
    title: "Commercial license and setup",
    description:
      "Use Starter Pro for personal and commercial applications and modify the source for your own products. Redistribution, resale, sublicensing, or repackaging as a competing template or product is not permitted. The repository license remains authoritative. Setup requires dependencies, PostgreSQL, and environment variables for auth, billing, and email.",
    icon: FileText,
    links: [
      {
        href: INTERNAL.license,
        label: "Review the license",
      },
      {
        href: INTERNAL.docsGettingStarted,
        label: "Review setup",
      },
    ],
  },
] as const;

const setupSteps = [
  {
    title: "Prepare your local environment",
    description:
      "Download and unzip the source, install dependencies and connect a local PostgreSQL database. Follow the requirements in your downloaded release.",
    href: INTERNAL.docsGettingStarted,
    link: "Getting started",
  },
  {
    title: "Configure your integrations",
    description:
      "Set up your authentication providers, email sender and Stripe test environment. Check sign-in, checkout and webhook handling with your own configuration.",
    href: INTERNAL.docsBillingTesting,
    link: "Billing test guide",
  },
  {
    title: "Build and validate your product",
    description:
      "Adapt the screens, connect your domain data and complete the production checklist before you deploy. You own the product logic and operation of your app.",
    href: INTERNAL.docsProductionChecklist,
    link: "Production checklist",
  },
] as const;

const docResourceCards = [
  {
    title: "See what is included",
    description: "Review the complete Starter Pro package before buying.",
    href: INTERNAL.docsWhatIsIncluded,
    cta: "Review scope",
    icon: FileText,
  },
  {
    title: "Review setup",
    description:
      "Check local installation, environment setup, and the first run.",
    href: INTERNAL.docsGettingStarted,
    cta: "Open setup guide",
    icon: Rocket,
  },
  {
    title: "Production checklist",
    description:
      "Confirm auth, billing, backend, delivery, and release readiness.",
    href: INTERNAL.docsProductionChecklist,
    cta: "Open checklist",
    icon: ShieldCheck,
  },
  {
    title: "Deployment guide",
    description:
      "Prepare the Starter Pro foundation for a production deployment.",
    href: INTERNAL.docsDeployment,
    cta: "Review deployment",
    icon: Download,
  },
  {
    title: "Billing guide",
    description:
      "Understand subscriptions, checkout, customer portal, and billing states.",
    href: INTERNAL.docsBilling,
    cta: "Review billing",
    icon: CreditCard,
  },
  {
    title: "Authentication guide",
    description:
      "Review sign-in, sessions, OAuth, reset password, and protected access.",
    href: INTERNAL.docsAuth,
    cta: "Review auth",
    icon: Lock,
  },
] as const;

const heroScreenshots = [
  {
    title: "Dashboard",
    label: "Dashboard",
    description: "Navigation, workspace summary and example metric cards.",
    alt: "Starter Pro dashboard with navigation, workspace cards and demonstration metrics",
    image: "/images/starters/pro/dashboard-pycolors.png",
    annotation:
      "The sidebar groups projects, admin, billing and settings. Summary cards give you a dashboard layout to adapt. Displayed revenue, users and activity are demonstration data, not customer results.",
  },
  {
    title: "Authentication",
    label: "Authentication",
    description: "Email sign-in, provider choices and password recovery.",
    alt: "Starter Pro sign-in screen with email, password, Google and GitHub options",
    image: "/images/starters/pro/auth-pycolors.png",
    annotation:
      "The right-hand form combines email and password fields, Google and GitHub buttons, password recovery and account creation. Configure your own provider credentials before using these options.",
  },
  {
    title: "Billing",
    label: "Billing",
    description: "Plan summary, invoice area and billing portal actions.",
    alt: "Starter Pro billing screen showing a demonstration trial plan and an empty invoice table",
    image: "/images/starters/pro/billing-pycolors.png",
    annotation:
      "Plan details, renewal information and an invoice table show the billing layout you can build on. The trial subscription and figures are demonstration fixtures, not evidence of a payment or a verified Stripe integration.",
  },
  {
    title: "Pricing example",
    label: "Pricing example",
    description: "An example SaaS offer with features and trial actions.",
    alt: "Starter Pro example SaaS pricing page with feature lists and trial buttons",
    image: "/images/starters/pro/pricing-pycolors.png",
    annotation:
      "The sample page groups an offer, feature lists and trial actions. Its subscription price and trial terms are examples for your own SaaS, not the purchase terms for the Starter Pro source package.",
  },
  {
    title: "Offline fallback",
    label: "Offline fallback",
    description: "A connection message with reload and dashboard actions.",
    alt: "Starter Pro offline screen with reload and dashboard links",
    image: "/images/starters/pro/pwa-pycolors.png",
    annotation:
      "The connection message explains the offline state. Reload and dashboard actions give users a route back to the app. This fallback does not mean every feature works offline.",
  },
] as const;

const includedGroups = [
  {
    title: "Authentication & access",
    icon: Lock,
    technology: "Auth.js",
    flow: [
      { title: "Sign in", detail: "Email or OAuth", icon: KeyRound },
      { title: "Session", detail: "Auth.js", icon: UserRound },
      { title: "Access", detail: "Protected routes", icon: ShieldCheck },
    ],
    setupNote: "Configure your OAuth credentials and email sender.",
    description: "Give accounts and sessions a clear foundation.",
    href: INTERNAL.docsAuth,
    link: "Authentication guide",
    items: [
      "Email/password authentication",
      "Google and GitHub OAuth",
      "Email verification",
      "Reset password flow",
      "Session management",
      "Protected routes",
    ],
  },
  {
    title: "Billing & subscriptions",
    icon: CreditCard,
    technology: "Stripe",
    flow: [
      { title: "Checkout", detail: "Stripe Checkout", icon: CreditCard },
      { title: "Webhook", detail: "Subscription events", icon: Webhook },
      { title: "Plan", detail: "Product access", icon: Layers3 },
    ],
    setupNote:
      "Connect your Stripe account and validate webhooks in test mode.",
    description: "Connect subscriptions to your application.",
    href: INTERNAL.docsBilling,
    link: "Billing guide",
    items: [
      "Secure Stripe Checkout integration",
      "Stripe billing portal",
      "Invoices and billing history UI",
      "Webhook synchronization with Prisma",
      "Subscription lifecycle handling",
      "Plan gating and feature access control",
    ],
  },
  {
    title: "Application & mobile",
    icon: Smartphone,
    technology: "Responsive + PWA",
    description: "Build on a responsive product interface.",
    href: INTERNAL.docsPwa,
    link: "PWA guide",
    items: [
      "Dashboard, settings, billing and admin UI",
      "Installable PWA with manifest, icons and screenshots",
      "Standalone mode and offline fallback",
    ],
  },
  {
    title: "Source & architecture",
    icon: Code2,
    technology: "Next.js + TypeScript",
    description: "Inspect the code and adapt it to your product.",
    href: INTERNAL.docsWhatIsIncluded,
    link: "Included source",
    items: [
      "Full Next.js App Router source code",
      "Strict TypeScript configuration",
      "Tailwind CSS foundation",
    ],
  },
  {
    title: "Data & configuration",
    icon: Database,
    technology: "Prisma + PostgreSQL",
    description: "Organize persistence, forms and configuration.",
    href: INTERNAL.docsBackend,
    link: "Backend guide",
    items: [
      "Prisma schema and PostgreSQL setup",
      "Zod validation and React Hook Form integration",
      "Environment configuration foundations",
    ],
  },
  {
    title: "Delivery & ownership",
    icon: Download,
    technology: "Source + License",
    description: "Understand your package and access path.",
    href: INTERNAL.docsDelivery,
    link: "Delivery guide",
    items: [
      "Access recovery for your Starter Pro purchase",
      "Starter Pro ZIP delivery via claim email",
      "Commercial usage rights",
    ],
  },
] as const;

const textLink =
  "inline-flex min-h-11 items-center gap-2 rounded-[5px] text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const sectionClass = "scroll-mt-24 border-t border-border-subtle";

function StarterProPreviews() {
  return (
    <MarketingSectionShell
      id="product-preview"
      width="full"
      className="scroll-mt-24"
      aria-labelledby="starter-pro-previews-title"
    >
      <MarketingSectionHeader
        titleId="starter-pro-previews-title"
        align="left"
        eyebrow="Inside Starter Pro"
        title="Inspect the screens you can build on"
        description="Explore the dashboard, account flows and billing interface. Each preview shows the foundation you can adapt to your product."
        action={
          <a
            href={EXTERNAL.starterDemo}
            target="_blank"
            rel="noreferrer noopener"
            className={`${textLink} text-xs`}
          >
            Try the Starter Free demo
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        }
      />
      <StarterProCarousel
        slides={heroScreenshots.map((screenshot, index) => ({
          title: screenshot.title,
          content: (
            <figure className="grid h-full min-w-0 lg:grid-cols-[minmax(0,1fr)_19rem]">
              <div
                className={`${styles.stage} flex min-w-0 items-center border-b border-border-subtle p-3 sm:p-6 lg:border-b-0 lg:border-r`}
              >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[3px] border border-border-subtle bg-white shadow-sm">
                  <Image
                    src={screenshot.image}
                    alt={screenshot.alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1280px) 860px, (min-width: 1024px) 65vw, 95vw"
                    className={`${styles.media} object-cover object-top`}
                  />
                </div>
              </div>
              <figcaption className="overflow-hidden bg-background p-5 sm:p-7">
                <div className={`${styles.caption} flex h-full flex-col`}>
                  <p className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                    <span className="font-mono">0{index + 1} / 05</span>
                    <span>Interface preview</span>
                  </p>
                  <h3 className="mt-6 text-xl font-semibold tracking-subheading">
                    {screenshot.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-foreground">
                    {screenshot.description}
                  </p>
                  <p className="mt-5 border-t border-border-subtle pt-5 text-xs leading-6 text-muted-foreground">
                    {screenshot.annotation}
                  </p>
                  <p className="mt-auto pt-6 text-[11px] text-muted-foreground">
                    Light theme · Demonstration data
                  </p>
                </div>
              </figcaption>
            </figure>
          ),
        }))}
      />
      <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">
        Existing Starter Pro captures in the light theme, including
        demonstration data. These interface previews do not demonstrate a
        completed payment, a verified integration, or a live production
        deployment.
      </p>
    </MarketingSectionShell>
  );
}

function StarterProCheckItem({ children, className }: MarketingCheckItemProps) {
  return (
    <MarketingCheckItem className={`${styles.checkItem} ${className ?? ""}`}>
      {children}
    </MarketingCheckItem>
  );
}

export default function StarterProPage() {
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <JsonLd id="starter-pro-product-jsonld" data={starterProJsonLd} />
      <Container className="pb-16 pt-24 sm:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0 max-w-3xl"
            badges={[{ label: "Starter Pro", variant: "outline" }]}
            title="The foundation for your next SaaS."
            description="Auth.js, Stripe billing, Prisma and protected routes in one Next.js starter. Configure your providers, build your product logic and validate the integrations before launch."
            actions={
              <>
                <div className="lg:hidden">
                  <BuyStarterProButton
                    fullWidth={false}
                    className="w-full sm:w-auto"
                  />
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-[5px]"
                >
                  <a href="#product-preview">
                    Explore the product{" "}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Link
                  href={INTERNAL.docsStarterPro}
                  className={`${textLink} justify-center sm:px-2`}
                >
                  Read the docs{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </>
            }
            extra={
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                <StarterProCheckItem>Full source code</StarterProCheckItem>
                <StarterProCheckItem>
                  Commercial usage rights
                </StarterProCheckItem>
              </ul>
            }
          />
          <section
            aria-labelledby="starter-pro-offer-heading"
            className={`${styles.stage} overflow-hidden rounded-[5px] border border-border-subtle`}
          >
            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="starter-pro-offer-heading"
                  className="text-sm font-semibold"
                >
                  Starter Pro
                </h2>
                <span className="text-xs text-muted-foreground">
                  Source code license
                </span>
              </div>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-brand text-5xl font-semibold tracking-tight">
                  {launchPrice}
                </span>
                <span className="text-xs text-muted-foreground">
                  One-time payment
                </span>
              </p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Current launch price. Regular price planned at {regularPrice}.
              </p>
              <ul className="my-6 space-y-3">
                <StarterProCheckItem>
                  Auth, billing and database foundations
                </StarterProCheckItem>
                <StarterProCheckItem>
                  Full source, docs and production checklist
                </StarterProCheckItem>
                <StarterProCheckItem>
                  ZIP access through your claim email
                </StarterProCheckItem>
              </ul>
              <BuyStarterProButton />
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Access follows payment confirmation and delivery processing.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 border-t border-border-subtle px-6 py-2 sm:px-7">
              <a href="#purchase" className={`${textLink} text-xs`}>
                Purchase & delivery{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
              <Link
                href={INTERNAL.license}
                className={`${textLink} text-xs text-muted-foreground`}
              >
                License terms
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
          <MarketingPillList aria-label="Starter Pro technology stack">
            {stackItems.map((item) => (
              <MarketingPill
                key={item}
                className="border-transparent bg-transparent px-0 pr-3 text-muted-foreground"
              >
                {item}
              </MarketingPill>
            ))}
          </MarketingPillList>
          <Link
            href={INTERNAL.docsWhatIsIncluded}
            className={`${textLink} shrink-0 text-xs`}
          >
            Explore the stack{" "}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <nav
          aria-label="Starter Pro sections"
          className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-b border-border-subtle pb-3"
        >
          {[
            ["#product-preview", "Product preview"],
            ["#included", "What’s included"],
            ["#purchase", "Purchase & delivery"],
            ["#free-vs-pro", "Free vs Pro"],
            ["#setup", "Getting started"],
            ["#buyer-faq", "FAQ"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`${textLink} text-xs text-muted-foreground`}
            >
              {label}
            </a>
          ))}
        </nav>

        <StarterProPreviews />

        <MarketingSectionShell
          id="included"
          width="full"
          className={sectionClass}
          aria-labelledby="included-heading"
        >
          <StarterProFoundations
            introduction={
              <>
                <MarketingSectionHeader
                  titleId="included-heading"
                  align="left"
                  eyebrow="What’s included"
                  title="The recurring work, already connected."
                  description="Start with the account, billing and application foundations. Inspect what is included, understand the setup, then build your product."
                  action={
                    <Link
                      href={INTERNAL.docsWhatIsIncluded}
                      className={textLink}
                    >
                      See everything included
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  }
                  className="mb-8"
                />
                <nav
                  aria-label="Review Starter Pro before buying"
                  className={styles.foundationEvidence}
                >
                  {[
                    {
                      icon: Code2,
                      title: "Source scope",
                      detail: "Explore the included package",
                      href: INTERNAL.docsWhatIsIncluded,
                    },
                    {
                      icon: BookOpen,
                      title: "Setup guide",
                      detail: "Review tools and configuration",
                      href: INTERNAL.docsGettingStarted,
                    },
                    {
                      icon: ShieldCheck,
                      title: "Production checklist",
                      detail: "Understand your launch steps",
                      href: INTERNAL.docsProductionChecklist,
                    },
                  ].map(({ icon: Icon, title, detail, href }) => (
                    <Link
                      key={title}
                      href={href}
                      className="group flex min-w-0 items-center gap-3 rounded-[5px] p-4 transition-colors hover:bg-surface-muted/30 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:p-5"
                    >
                      <Icon
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-medium text-foreground">
                          {title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                          {detail}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </nav>
              </>
            }
          >
            {includedGroups
              .filter((group) => "flow" in group)
              .map(
                (
                  {
                    title,
                    description,
                    icon: Icon,
                    items,
                    href,
                    link,
                    technology,
                    flow,
                    setupNote,
                  },
                  index,
                ) => (
                  <article
                    key={title}
                    data-foundation-card=""
                    className={`${styles.featuredFoundation} ${detailStyles.surface} flex min-w-0 flex-col`}
                  >
                    <div className={styles.foundationReveal}>
                      <div className="px-5 pt-6 sm:px-8 sm:pt-8">
                        <div className="flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-[5px] border border-border-subtle bg-background text-foreground">
                              <Icon className="size-4" aria-hidden="true" />
                            </span>
                            <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                              CORE INTEGRATION
                            </span>
                          </span>
                          <span
                            className="font-mono text-[11px] text-muted-foreground"
                            aria-hidden="true"
                          >
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="mt-6 text-[22px] font-semibold tracking-subheading sm:text-2xl">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {description}
                        </p>
                      </div>
                      <div
                        className={`${detailStyles.preview} mx-5 mt-6 rounded-[5px] border border-border-subtle sm:mx-8`}
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3">
                          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                            Integration overview
                          </span>
                          <span className="font-mono text-[11px] text-foreground">
                            {technology}
                          </span>
                        </div>
                        <ol
                          aria-label={`${title} flow overview`}
                          className={styles.foundationFlow}
                        >
                          {flow.map(
                            ({ title: step, detail, icon: StepIcon }) => (
                              <li
                                key={step}
                                className="relative min-w-0 text-center"
                              >
                                <span className={styles.foundationNode}>
                                  <StepIcon
                                    className="size-[18px]"
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="mt-3 block text-xs font-medium">
                                  {step}
                                </span>
                                <span className="mt-1 block text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                                  {detail}
                                </span>
                              </li>
                            ),
                          )}
                        </ol>
                      </div>
                      <div className="px-5 pb-6 pt-7 sm:px-8 sm:pb-8">
                        <p className="mb-4 text-[11px] font-medium text-foreground">
                          Included in the source
                        </p>
                        <ul className={styles.foundationPoints}>
                          {items.map((item) => (
                            <StarterProCheckItem
                              key={item}
                              className="text-[13px]"
                            >
                              {item}
                            </StarterProCheckItem>
                          ))}
                        </ul>
                      </div>
                      <div
                        className={`${detailStyles.footer} mt-auto border-t border-border-subtle px-5 py-4 sm:px-8`}
                      >
                        <p className="text-xs leading-6 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Your setup.
                          </span>{" "}
                          {setupNote}
                        </p>
                        <Link
                          href={href}
                          className={`${textLink} group mt-1 w-full justify-between text-xs`}
                        >
                          {link}
                          <ArrowUpRight
                            className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                ),
              )}

            {includedGroups
              .filter((group) => !("flow" in group))
              .map(
                (
                  {
                    title,
                    description,
                    icon: Icon,
                    items,
                    href,
                    link,
                    technology,
                  },
                  index,
                ) => (
                  <article
                    key={title}
                    data-foundation-card=""
                    className={`${styles.supportingFoundation} flex min-w-0 flex-col bg-background`}
                  >
                    <div className={`${styles.foundationReveal} p-5 sm:p-8`}>
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <span className="grid size-10 place-items-center rounded-[5px] border border-border-subtle bg-surface-muted/20">
                          <Icon
                            className="size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </span>
                        <span
                          className="font-mono text-[11px] text-muted-foreground"
                          aria-hidden="true"
                        >
                          0{index + 3}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <h3 className="text-lg font-semibold tracking-normal">
                          {title}
                        </h3>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {technology}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {description}
                      </p>
                      <ul className="mb-6 mt-6 space-y-3">
                        {items.map((item) => (
                          <StarterProCheckItem
                            key={item}
                            className="text-[13px]"
                          >
                            {item}
                          </StarterProCheckItem>
                        ))}
                      </ul>
                      <Link
                        href={href}
                        className={`${textLink} group mt-auto justify-between border-t border-border-subtle pt-4 text-xs`}
                      >
                        {link}
                        <ArrowUpRight
                          className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                ),
              )}
          </StarterProFoundations>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">
            The PWA layer includes an offline fallback. Auth, billing and admin
            data stay online-first. Review the{" "}
            <Link
              href={INTERNAL.docsPwaSetup}
              className="underline underline-offset-4"
            >
              PWA setup
            </Link>{" "}
            and{" "}
            <Link
              href={INTERNAL.docsPwaChecklist}
              className="underline underline-offset-4"
            >
              release checklist
            </Link>{" "}
            for your environment.
          </p>
          <div className="mt-8 grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-2">
            <div className="p-6 sm:p-7">
              <h3 className="text-sm font-semibold">
                A fit for products with accounts and billing.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                SaaS products, client applications and internal tools that need
                authentication, subscriptions and protected account areas.
              </p>
              <Link
                href={INTERNAL.starterFree}
                className={`${textLink} mt-3 text-xs`}
              >
                Still exploring? Start with Free{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div
              className={`${styles.stage} border-t border-border-subtle p-6 sm:p-7 lg:border-l lg:border-t-0`}
            >
              <h3 className="text-sm font-semibold">You bring the product.</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Build your own domain models, onboarding, business workflows and
                branding. Configure the providers and validate your complete
                customer journey before launch.
              </p>
              <Link
                href={INTERNAL.docsProductionChecklist}
                className={`${textLink} mt-3 text-xs`}
              >
                Review your launch responsibilities{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="purchase"
          width="full"
          className={sectionClass}
          aria-labelledby="purchase-heading"
        >
          <MarketingSectionHeader
            titleId="purchase-heading"
            align="left"
            eyebrow="Purchase & delivery"
            title="What you receive after purchase"
            description="A source package you can inspect and adapt, with a clear path to download it and recover access."
          />
          <div className="overflow-hidden rounded-[5px] border border-border-subtle">
            <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)]">
              <div
                className={`${styles.stage} flex flex-col border-b border-border-subtle p-6 sm:p-8 lg:border-b-0 lg:border-r`}
              >
                <div className="mb-7 flex items-center justify-between gap-4">
                  <Download
                    className="size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    SOURCE PACKAGE
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-subheading">
                  From checkout to your code.
                </h3>
                <ol className="mt-7 space-y-6">
                  {[
                    {
                      title: "Payment confirmed",
                      detail:
                        "Complete checkout with the email you want to use for access.",
                    },
                    {
                      title: "Claim email",
                      detail:
                        "Once delivery is processed, open the secure access link sent to your checkout email.",
                    },
                    {
                      title: "Download the ZIP",
                      detail:
                        "Unzip the source and follow the included documentation to set up your app.",
                    },
                  ].map((step, index) => (
                    <li key={step.title} className="flex items-start gap-4">
                      <span className="grid size-7 shrink-0 place-items-center rounded-[5px] border border-border-subtle bg-background/50 font-mono text-[11px] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium leading-7">
                          {step.title}
                        </p>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto pt-8">
                  <p className="text-xs leading-6 text-muted-foreground">
                    Already purchased?
                  </p>
                  <Link
                    href={INTERNAL.ordersRecover}
                    className={`${textLink} text-xs`}
                  >
                    Recover your access{" "}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="grid gap-px bg-border-subtle md:grid-cols-2">
                {postPurchaseDetails.map(
                  ({ title, description, icon: Icon, links }) => (
                    <div
                      key={title}
                      className="flex flex-col bg-background p-6 sm:p-7"
                    >
                      <Icon
                        className="mb-5 size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold leading-6">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {description}
                      </p>
                      <div className="mt-auto flex flex-col items-start gap-1 pt-4">
                        {links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`${textLink} text-xs`}
                          >
                            {link.label}{" "}
                            <ArrowRight
                              className="size-3.5 shrink-0"
                              aria-hidden="true"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-border-subtle px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm">
                {launchPrice} · One-time payment · Full source code
              </p>
              <p className="text-xs leading-6 text-muted-foreground">
                Legal scope and usage terms are governed by{" "}
                <Link
                  href={INTERNAL.license}
                  className="underline underline-offset-4"
                >
                  /license
                </Link>{" "}
                and{" "}
                <Link
                  href={INTERNAL.terms}
                  className="underline underline-offset-4"
                >
                  /terms
                </Link>
                .
              </p>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="free-vs-pro"
          width="full"
          className={sectionClass}
          aria-labelledby="comparison-heading"
        >
          <MarketingSectionHeader
            titleId="comparison-heading"
            align="left"
            eyebrow="Free vs Pro"
            title="Choose the starting point your product needs."
            description="Explore the interface with Free. Move to Pro when authentication, billing and database integration become the next implementation step."
          />
          <StarterComparisonTable />
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href={INTERNAL.pricing} className={textLink}>
              Compare all products{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={INTERNAL.buildVsBuy} className={textLink}>
              Read the build vs buy comparison{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="setup"
          width="full"
          className={sectionClass}
          aria-labelledby="setup-heading"
        >
          <MarketingSectionHeader
            titleId="setup-heading"
            align="left"
            eyebrow="Getting started"
            title="Your source. Your environment. Your product."
            description="Follow the documentation from your first local run to a validated customer flow. Setup depends on your environment and the providers you choose."
          />
          <div className="grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <ol className="divide-y divide-border-subtle">
              {setupSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex items-start gap-4 p-6 sm:gap-5 sm:p-7"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-[5px] border border-border-subtle font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold leading-8">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                    <Link
                      href={step.href}
                      className={`${textLink} mt-2 text-xs`}
                    >
                      {step.link}{" "}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
            <div
              className={`${styles.stage} flex flex-col border-t border-border-subtle p-6 sm:p-8 lg:border-l lg:border-t-0`}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Configuration checklist
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-subheading">
                Prepare the services your app will use.
              </h3>
              <dl className="mt-6 divide-y divide-border-subtle">
                {[
                  [
                    "Runtime",
                    "Node.js and pnpm versions from your downloaded release.",
                  ],
                  [
                    "Database",
                    "A local PostgreSQL database and Prisma configuration.",
                  ],
                  [
                    "Auth & email",
                    "Provider credentials, session configuration and an email sender.",
                  ],
                  [
                    "Payments",
                    "A Stripe test environment and webhook configuration.",
                  ],
                ].map(([term, detail]) => (
                  <div key={term} className="py-4 first:pt-0">
                    <dt className="text-xs font-semibold">{term}</dt>
                    <dd className="mt-1 text-xs leading-6 text-muted-foreground">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href={INTERNAL.docsGettingStarted}
                className={`${textLink} mt-auto pt-4 text-xs`}
              >
                Review setup{" "}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="starter-pro-docs"
          width="full"
          className={sectionClass}
          aria-labelledby="docs-heading"
        >
          <MarketingSectionHeader
            titleId="docs-heading"
            align="left"
            eyebrow="Documentation"
            title="Inspect the details before you decide."
            description="Review the scope, understand the integrations and prepare your first deployment."
          />
          <div className="grid gap-px overflow-hidden rounded-[5px] border border-border-subtle bg-border-subtle md:grid-cols-2 lg:grid-cols-3">
            {docResourceCards.map(
              ({ title, description, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 bg-background p-6 transition-colors hover:bg-surface-muted/40 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring sm:p-7"
                >
                  <Icon
                    className="mt-1 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Link>
              ),
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href={INTERNAL.changelog} className={`${textLink} text-xs`}>
              View changelog{" "}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link href={INTERNAL.roadmap} className={`${textLink} text-xs`}>
              View roadmap{" "}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>

        <section
          id="buyer-faq"
          aria-labelledby="buyer-faq-heading"
          className="scroll-mt-24 border-t border-border-subtle py-14 sm:py-16"
        >
          <MarketingFaq
            titleId="buyer-faq-heading"
            title="Questions buyers ask before paying"
            description="Check setup, access, usage terms and the steps you still own before buying."
            items={starterProBuyerFaqs}
          />
        </section>

        <section
          aria-labelledby="starter-pro-next-step"
          className={`${styles.stage} flex flex-col gap-6 rounded-[5px] border border-border-subtle p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between`}
        >
          <div className="max-w-2xl">
            <h2
              id="starter-pro-next-step"
              className="text-2xl font-semibold tracking-heading"
            >
              Start from the foundation. Build your product.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Review the source, configure your providers and make Starter Pro
              your own.
            </p>
          </div>
          <div className="shrink-0">
            <BuyStarterProButton
              fullWidth={false}
              className="w-full lg:w-auto"
            />
          </div>
        </section>
      </Container>
    </main>
  );
}

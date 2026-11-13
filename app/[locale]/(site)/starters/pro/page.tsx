import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { localizedAlternates } from "@/lib/i18n/routes";
import { ProDemoLink } from "@/components/marketing/pro-demo-link";
import { proDemoUrl } from "@/lib/pro-demo-url";
import { Link } from "@/lib/i18n/navigation";
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
  Info,
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
import { STARTER_PRO_UPDATES_SUMMARY } from "@/lib/products/commercial-policy";
import { Container } from "@/components/container";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import effects from "@/components/marketing/product-light.module.css";
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
import { StarterProIncludedDialog } from "@/components/starters/starter-pro-included-dialog";
import { StarterProCarousel } from "@/components/starters/starter-pro-carousel";
import { StarterProTour } from "@/components/starters/starter-pro-tour";
import { StarterProFoundations } from "@/components/starters/starter-pro-foundations";
import { StarterProSectionNav } from "@/components/starters/starter-pro-section-nav";
import {
  StarterProReadiness,
  StarterProImplementation,
} from "@/components/starters/starter-pro-readiness";
import { StarterComparisonTable } from "@/components/starters/starter-comparison-table";
import styles from "@/components/starters/starter-pro.module.css";
import { StarterProReference } from "@/components/starters/starter-pro-reference";
import { SiteText } from "@/components/site-text";

const metadata: Metadata = {
  title: "Next.js SaaS Starter with Auth & Billing",
  description:
    "Next.js SaaS source with workspaces, project tasks, Auth.js and Stripe, plus isolated ZIP validation, operational checks and buyer guides.",
  alternates: {
    canonical: "/starters/pro",
    languages: localizedAlternates("starterPro", "en").languages,
  },

  openGraph: {
    locale: "en_US",
    alternateLocale: "fr_FR",
    title: "Next.js SaaS Starter with Auth & Billing — PyColors",
    description:
      "Next.js SaaS source with workspaces, project tasks, Auth.js and Stripe, plus isolated ZIP validation, operational checks and buyer guides.",
    url: "/starters/pro",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Starter with Auth & Billing — PyColors",
    description:
      "Next.js SaaS source with workspaces, project tasks, Auth.js and Stripe, plus isolated ZIP validation, operational checks and buyer guides.",
    images: ["/seo/twitter-main.png"],
  },
};

const sourcePrice = PRODUCT_DISPLAY["starter-pro"].priceLabel;

const starterProJsonLd = generateProductOfferJsonLd({
  product: PRODUCT_DISPLAY["starter-pro"],
  canonicalPath: "/starters/pro",
  description:
    "Next.js SaaS source with workspaces, project tasks, Auth.js and Stripe, plus isolated ZIP validation, operational checks and buyer guides.",
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
    tone: "gold",
    artwork: "/images/starters/pro/concepts/delivery-case-test-v1.png",
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
    tone: "neutral",
    artwork: "/images/starters/pro/concepts/recovery-loop-test-v1.png",
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
    tone: "lilac",
    artwork: "/images/starters/pro/concepts/source-stack-test-v1.png",
    description: (
      <>
        <SiteText text={STARTER_PRO_UPDATES_SUMMARY} />{" "}
        <SiteText text="Installation assistance and reproducible starter bugs follow the support scope and period of your offer. Tailored implementation is quoted separately. No response-time SLA is promised." />
      </>
    ),
    icon: ShieldCheck,
    links: [
      {
        href: INTERNAL.changelog,
        label: "Review release history",
      },
      {
        href: "/docs/starter-pro/implementation-support",
        label: "Review support and implementation scope",
      },
    ],
  },
  {
    title: "Commercial license and setup",
    tone: "neutral",
    artwork: "/images/starters/pro/concepts/workflow-path-test-v1.png",
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
    tone: "neutral",
    description:
      "Download and unzip the source, install dependencies and connect a local PostgreSQL database. Follow the requirements in your downloaded release.",
    href: INTERNAL.docsGettingStarted,
    link: "Getting started",
  },
  {
    title: "Configure your integrations",
    tone: "gold",
    description:
      "Set up your authentication providers, email sender and Stripe test environment. Check sign-in, checkout and webhook handling with your own configuration.",
    href: INTERNAL.docsBillingTesting,
    link: "Billing test guide",
  },
  {
    title: "Build and validate your product",
    tone: "neutral",
    description:
      "Adapt the screens, connect your domain data and complete the production checklist before you deploy. You own the product logic and operation of your app.",
    href: INTERNAL.docsProductionChecklist,
    link: "Production checklist",
  },
] as const;

const docResourceCards = [
  {
    title: "See what is included",
    tone: "ink",
    description: "Review the complete Starter Pro package before buying.",
    href: INTERNAL.docsWhatIsIncluded,
    cta: "Review scope",
    icon: FileText,
  },
  {
    title: "Review setup",
    tone: "neutral",
    description:
      "Check local installation, environment setup, and the first run.",
    href: INTERNAL.docsGettingStarted,
    cta: "Open setup guide",
    icon: Rocket,
  },
  {
    title: "Production checklist",
    tone: "gold",
    description:
      "Confirm auth, billing, backend, delivery, and release readiness.",
    href: INTERNAL.docsProductionChecklist,
    cta: "Open checklist",
    icon: ShieldCheck,
  },
  {
    title: "Deployment guide",
    tone: "neutral",
    description:
      "Prepare the Starter Pro foundation for a production deployment.",
    href: INTERNAL.docsDeployment,
    cta: "Review deployment",
    icon: Download,
  },
  {
    title: "Billing guide",
    tone: "cobalt",
    description:
      "Understand subscriptions, checkout, customer portal, and billing states.",
    href: INTERNAL.docsBilling,
    cta: "Review billing",
    icon: CreditCard,
  },
  {
    title: "Authentication guide",
    tone: "neutral",
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
    description: "Saved workspace metrics, a weekly chart and team roles.",
    alt: "Starter Pro dashboard with saved project counts, weekly chart and workspace team",
    image: "/images/starters/pro/dashboard-pycolors-2x.png",
    palette: "PyColors",
    annotation:
      "Project counts, weekly creation history and team roles come from a seeded PostgreSQL workspace. These captures use demonstration data, not customer results.",
  },
  {
    title: "Authentication",
    label: "Authentication",
    description: "Email sign-in, provider choices and password recovery.",
    alt: "Starter Pro sign-in screen with email, password, Google and GitHub options",
    image: "/images/starters/pro/auth-indigo-2x.png",
    palette: "Indigo Ledger",
    annotation:
      "The right-hand form combines email and password fields, Google and GitHub buttons, password recovery and account creation. Configure your own provider credentials before using these options.",
  },
  {
    title: "Billing",
    label: "Billing",
    description: "Plan summary, invoice area and billing portal actions.",
    alt: "Starter Pro billing screen showing a synthetic subscription, billing status and sample invoices",
    image: "/images/starters/pro/billing-emerald-2x.png",
    palette: "Emerald Console",
    annotation:
      "Personal billing connects subscriptions, invoices and the customer portal. The seeded plan and figures are not evidence of a payment or a verified Stripe integration. Organization-owned billing needs a separate extension.",
  },
  {
    title: "Pricing example",
    label: "Pricing example",
    description: "An example SaaS offer with features and trial actions.",
    alt: "Starter Pro example SaaS pricing page with feature lists and trial buttons",
    image: "/images/starters/pro/pricing-cyan-2x.png",
    palette: "Arctic Cyan",
    annotation:
      "The SaaS plan catalog uses the configured Stripe price and server-side entitlements. Values shown in this synthetic test workspace are not the purchase terms for the Starter Pro source package. Resource caps are configurable and uncapped by default.",
  },
  {
    title: "Project work",
    label: "Project work",
    description: "Assigned tasks, calendar due dates and project discussions.",
    alt: "Starter Pro project with assigned tasks, due dates and a task discussion",
    image: "/images/starters/pro/project-work-coral-2x.png",
    palette: "Coral Signal",
    annotation:
      "Tasks, responsible members and comments persist in the selected workspace. Archived projects remain readable and reject work changes until restored. This is an adaptable business example, not a complete project-management product.",
  },
] as const;

const includedGroups = [
  {
    title: "Authentication & access",
    tone: "neutral",
    artwork: "/images/starters/pro/concepts/recovery-loop-test-v1.png",
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
      "Server-revocable sessions and guarded account lifecycle",
      "Protected routes",
    ],
  },
  {
    title: "Billing & subscriptions",
    tone: "cobalt",
    artwork: "/images/starters/pro/concepts/billing-loops-test-v1.png",
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
      "Transactional webhook reconciliation and safe retries",
      "Subscription lifecycle handling",
      "Plan gating and feature access control",
    ],
  },
  {
    title: "Application & mobile",
    tone: "ink",
    artwork: "/images/starters/pro/concepts/connected-workspace-test-v1.png",
    icon: Smartphone,
    technology: "Responsive + PWA",
    description: "Build on a responsive product interface.",
    href: INTERNAL.docsPwa,
    link: "PWA guide",
    items: [
      "Dashboard, profile, notifications and workspace administration",
      "English/French, Customize and responsive loading states",
      "Installable PWA with manifest, icons and screenshots",
      "Standalone mode and offline fallback",
    ],
  },
  {
    title: "Data & configuration",
    tone: "gold",
    artwork: "/images/starters/pro/concepts/workflow-path-test-v1.png",
    icon: Database,
    technology: "Prisma + PostgreSQL",
    description: "Organize persistence, forms and configuration.",
    href: INTERNAL.docsBackend,
    link: "Backend guide",
    items: [
      "Prisma schema and PostgreSQL setup",
      "Workspace roles, invitations, projects, tasks and comments",
      "Zod-validated actions and centralized product configuration",
      "Health probes, diagnostic and restore-drill commands",
    ],
  },
  {
    title: "Source & architecture",
    tone: "ink",
    artwork: "/images/starters/pro/concepts/source-stack-test-v1.png",
    icon: Code2,
    technology: "Next.js + TypeScript",
    description: "Inspect the code and adapt it to your product.",
    href: INTERNAL.docsWhatIsIncluded,
    link: "Included source",
    items: [
      "Full Next.js App Router source code and guided onboarding",
      "Strict TypeScript configuration",
      "Tailwind CSS foundation",
    ],
  },
  {
    title: "Delivery & ownership",
    tone: "neutral",
    artwork: "/images/starters/pro/concepts/delivery-case-test-v1.png",
    icon: Download,
    technology: "Source + License",
    description: "Understand your package and access path.",
    href: INTERNAL.docsDelivery,
    link: "Delivery guide",
    items: [
      "Access recovery for your Starter Pro purchase",
      "Validated standalone ZIP with source revision and file inventory",
      "Setup, customization, upgrades and support guides",
      "Commercial usage rights",
    ],
  },
] as const;

const textLink = `${styles.textLink} inline-flex min-h-11 items-center gap-2 rounded-[5px] text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`;
const sectionClass = "scroll-mt-24 border-t border-border-subtle";

function StarterProPreviews() {
  const tSite = useCopy();

  return (
    <MarketingSectionShell
      id="product-preview"
      width="full"
      className={`${styles.mediaSection} ${styles.previewSection} scroll-mt-24`}
      aria-labelledby="starter-pro-previews-title"
    >
      <MarketingSectionHeader
        className={styles.showcaseHeader}
        titleId="starter-pro-previews-title"
        align="left"
        eyebrow={tSite("Inside Starter Pro")}
        title={tSite("Inspect the screens you can build on")}
        description={tSite(
          "Explore the dashboard, account flows and billing interface. Each preview shows the foundation you can adapt to your product.",
        )}
        action={
          proDemoUrl() ? (
            <ProDemoLink appearance="text">
              {tSite("Open the Pro demo")}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </ProDemoLink>
          ) : (
            <Link href="/demo" className={`${textLink} text-xs`}>
              {tSite("Compare the demos")}
            </Link>
          )
        }
      />
      <StarterProCarousel
        slides={heroScreenshots.map((screenshot, index) => ({
          title: tSite(screenshot.title),
          content: (
            <figure className={styles.previewFigure}>
              <div className={styles.previewStage}>
                <div className={styles.previewScreen}>
                  <Image
                    src={screenshot.image}
                    alt={tSite(screenshot.alt)}
                    fill
                    loading="lazy"
                    quality={100}
                    sizes="(min-width: 1440px) 1200px, (min-width: 1024px) 83vw, 92vw"
                    className={`${styles.media} object-cover object-top`}
                  />
                </div>
              </div>
              <figcaption
                className={`${styles.previewCaption} ${styles.caption}`}
              >
                <div className={styles.previewTitle}>
                  <p className={styles.previewEyebrow}>
                    <span className={styles.previewNumber}>
                      {tSite(String(index + 1).padStart(2, "0"))}
                    </span>
                    <span>{tSite(screenshot.palette)}</span>
                  </p>
                  <h3>{tSite(screenshot.title)}</h3>
                </div>
                <div className={styles.previewExplanation}>
                  <p>{tSite(screenshot.description)}</p>
                  <p className={styles.previewTheme}>
                    {tSite("Light theme · Demonstration data")}
                  </p>
                </div>
                <p className={styles.previewAnnotation}>
                  <Info className="size-4 shrink-0" aria-hidden="true" />
                  <span>{tSite(screenshot.annotation)}</span>
                </p>
              </figcaption>
            </figure>
          ),
        }))}
      />
      <p className={styles.previewDisclaimer}>
        {tSite(
          "Existing Starter Pro captures in the light theme, including demonstration data. These interface previews do not demonstrate a completed payment, a verified integration, or a live production deployment.",
        )}
      </p>
    </MarketingSectionShell>
  );
}

/** Static, local SVG artwork; each placement owns its gradient references. */
function StarterProWaves({ id }: Readonly<{ id: string }>) {
  return (
    <svg
      data-starter-pro-waves=""
      className={styles.waves}
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-spectrum`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--starter-pro-wave-start)" />
          <stop offset="0.16" stopColor="var(--starter-pro-sun)" />
          <stop offset="0.38" stopColor="var(--starter-pro-wave-middle)" />
          <stop offset="0.58" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--starter-pro-wave-end)" />
        </linearGradient>
        <clipPath id={`${id}-ribbon-clip`}>
          <path d="M-140 490C160 520 350 290 670 295S1120 450 1580 130L1580 620H-140Z" />
        </clipPath>
      </defs>
      <path
        d="M-140 490C160 520 350 290 670 295S1120 450 1580 130L1580 620H-140Z"
        fill={`url(#${id}-spectrum)`}
      />
      <g clipPath={`url(#${id}-ribbon-clip)`} className={styles.waveContours}>
        {Array.from({ length: 12 }, (_, index) => (
          <path
            key={index}
            d={`M-140 ${490 + index * 13}C160 ${520 + index * 11} 350 ${290 + index * 10} 670 ${295 + index * 10}S1120 ${450 + index * 7} 1580 ${130 + index * 12}`}
          />
        ))}
      </g>
    </svg>
  );
}

function StarterProHeroPreview() {
  const tSite = useCopy();
  const dashboard = heroScreenshots[0];

  return (
    <figure
      className={`${styles.heroShowcase} ${effects.glassSurface} ${effects.previewEntry}`}
      aria-labelledby="starter-pro-hero-preview-title"
    >
      <div className={`${styles.heroChrome} ${effects.glassChrome}`}>
        <span className="flex items-center gap-2 font-medium">
          <Layers3 className="size-4 text-primary" aria-hidden="true" />
          {tSite("Starter Pro")}
        </span>
        <span className={styles.previewLocation}>
          <span className={styles.windowDots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span id="starter-pro-hero-preview-title">{tSite("Dashboard")}</span>
        </span>
      </div>
      <div className={styles.heroImage}>
        <Image
          src={dashboard.image}
          alt={tSite(dashboard.alt)}
          fill
          loading="eager"
          fetchPriority="high"
          quality={100}
          sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, 90vw"
          className={`${styles.heroLight} object-contain object-top`}
        />
        <Image
          src="/images/starters/pro/dashboard-dark-pycolors-2x.png"
          alt={tSite(dashboard.alt)}
          fill
          loading="eager"
          fetchPriority="high"
          quality={100}
          sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, 90vw"
          className={`${styles.heroDark} object-contain object-top`}
        />
      </div>
      <figcaption className={styles.heroCaption}>
        <p>{tSite(dashboard.annotation)}</p>
        <a href="#product-preview" className={`${textLink} text-xs`}>
          {tSite("Product preview")}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}

function StarterProCheckItem({ children, className }: MarketingCheckItemProps) {
  const tSite = useCopy();

  return (
    <MarketingCheckItem className={`${styles.checkItem} ${className ?? ""}`}>
      {tSite(children)}
    </MarketingCheckItem>
  );
}

export default function StarterProPage() {
  const tSite = useCopy();

  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${styles.productPage} bg-background text-foreground`}
    >
      <JsonLd id="starter-pro-product-jsonld" data={starterProJsonLd} />
      <div className={styles.productBar}>
        <Container className={styles.productBarInner}>
          <span className={styles.productIdentity}>
            <Layers3 className="size-4 text-primary" aria-hidden="true" />
            {tSite("Starter Pro")}
          </span>
          <StarterProSectionNav
            items={[
              ["#product-tour", "Product tour"],
              ["#product-preview", "Product preview"],
              ["#built-with-pycolors", "Built with Starter Pro"],
              ["#readiness", "Validation & workflows"],
              ["#implementation", "Scoped implementation"],
              ["#included", "What’s included"],
              ["#purchase", "Purchase & delivery"],
              ["#free-vs-pro", "Free vs Pro"],
              ["#setup", "Getting started"],
              ["#buyer-faq", "FAQ"],
            ].map(([href, label]) => ({ href, label: tSite(label) }))}
          />
        </Container>
      </div>
      <Container className={styles.pageFrame}>
        <div className={styles.hero}>
          <div className={styles.heroAtmosphere} aria-hidden="true">
            <StarterProWaves id="starter-pro-atmosphere-waves" />
          </div>
          <MarketingBreadcrumb route="/starters/pro" />
          <div className={styles.heroGrid}>
            <PageHero
              variant="compact"
              align="left"
              maxWidth="3xl"
              className={`${styles.heroCopy} ${effects.copyEntry}`}
              contentClassName={styles.heroContent}
              actionsClassName={styles.heroActions}
              extraClassName={styles.heroExtra}
              badges={[{ label: "Starter Pro", variant: "outline" }]}
              title={tSite("The foundation for your next SaaS.")}
              description={tSite(
                "Accounts, workspaces, billing and a real project workflow in one Next.js codebase. Start with connected foundations, inspect their checks and adapt the product to your market.",
              )}
              actions={
                <>
                  <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                    <BuyStarterProButton
                      fullWidth={false}
                      className={`${effects.primaryAction} w-full sm:w-auto`}
                    />
                    <span className={styles.demoAction}>
                      <ProDemoLink />
                    </span>
                  </div>
                  <div className={styles.heroSecondary}>
                    <a href="#product-tour" className={textLink}>
                      {tSite("Watch the product tour")}
                      <ArrowDown className="size-3.5" aria-hidden="true" />
                    </a>
                    <Link href={INTERNAL.docsStarterPro} className={textLink}>
                      {tSite("Read the docs")}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </>
              }
              extra={
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  <StarterProCheckItem>
                    {tSite("Full source code")}
                  </StarterProCheckItem>
                  <StarterProCheckItem>
                    {tSite("Commercial usage rights")}
                  </StarterProCheckItem>
                </ul>
              }
            />
            <div className={`${styles.heroVisual} ${effects.visual}`}>
              <div className={styles.heroArtwork} aria-hidden="true">
                <StarterProWaves id="starter-pro-hero-waves" />
              </div>
              <StarterProHeroPreview />
              <div className={styles.heroCompanion} aria-hidden="true">
                <div className={styles.heroCompanionTitle}>
                  <Code2 focusable="false" />
                  <span>{tSite("Full source code")}</span>
                </div>
                <div className={styles.heroConnections}>
                  {[
                    { label: "Auth.js", icon: Lock },
                    { label: "Prisma", icon: Database },
                    { label: "Stripe", icon: CreditCard },
                  ].map(({ label, icon: Icon }) => (
                    <span key={label}>
                      <Icon focusable="false" />
                      {tSite(label)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.stackStrip} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}
        >
          <MarketingPillList aria-label={tSite("Starter Pro technology stack")}>
            {stackItems.map((item) => (
              <MarketingPill
                key={item}
                className="border-transparent bg-transparent px-0 pr-3 text-muted-foreground"
              >
                {tSite(item)}
              </MarketingPill>
            ))}
          </MarketingPillList>
          <Link
            href={INTERNAL.docsWhatIsIncluded}
            className={`${textLink} shrink-0 text-xs`}
          >
            {tSite("Explore the stack")}
            {tSite(" ")}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.waveDivider} aria-hidden="true">
          <StarterProWaves id="starter-pro-tour-waves" />
        </div>

        <div className={styles.softBand}>
          <StarterProTour />
          <StarterProPreviews />
        </div>
        <div className={styles.referenceBand}>
          <StarterProReference />
        </div>
        <div className={styles.workflowBand}>
          <StarterProReadiness />
        </div>
        <div className={styles.servicesBand}>
          <StarterProImplementation />
        </div>

        <MarketingSectionShell
          id="included"
          width="full"
          className={`${sectionClass} ${styles.includedSection}`}
          aria-labelledby="included-heading"
        >
          <StarterProFoundations
            labels={includedGroups.map((group) => tSite(group.title))}
            introduction={
              <>
                <MarketingSectionHeader
                  titleId="included-heading"
                  align="center"
                  className={styles.bodyHeading}
                  eyebrow={tSite("What’s included")}
                  title={tSite("The recurring work, already connected.")}
                  description={tSite(
                    "Start with the account, billing and application foundations. Inspect what is included, understand the setup, then build your product.",
                  )}
                  action={
                    <Link
                      href={INTERNAL.docsWhatIsIncluded}
                      className={textLink}
                    >
                      {tSite("See everything included")}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  }
                />
                <nav
                  aria-label={tSite("Review Starter Pro before buying")}
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
                          {tSite(title)}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                          {tSite(detail)}
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
            {includedGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article
                  key={group.title}
                  data-foundation-card=""
                  data-card-art=""
                  data-card-tone={group.tone}
                  aria-labelledby={`foundation-${index}-title`}
                  className={styles.foundationTile}
                >
                  <div className={styles.foundationTileHeader}>
                    <span
                      aria-hidden="true"
                      className={styles.foundationTileNumber}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.foundationTileTechnology}>
                      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                      {tSite(group.technology)}
                    </span>
                  </div>
                  <div
                    className={`${styles.foundationConcept} ${styles.foundationArtConcept}`}
                    aria-hidden="true"
                  >
                    <div className={styles.foundationSculpture}>
                      <Image
                        src={group.artwork}
                        alt=""
                        fill
                        loading="lazy"
                        quality={75}
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 420px, 80vw"
                        className={styles.productIllustration}
                      />
                    </div>
                  </div>
                  <div className={styles.foundationTileCopy}>
                    <h3 id={`foundation-${index}-title`}>
                      {tSite(group.title)}
                    </h3>
                    <p>{tSite(group.description)}</p>
                    <Button
                      asChild
                      variant="outline"
                      className={styles.foundationTileAction}
                    >
                      <Link href={group.href}>
                        {tSite(group.link)}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </Button>
                    <StarterProIncludedDialog
                      title={tSite(group.title)}
                      description={tSite(group.description)}
                      technology={tSite(group.technology)}
                      artwork={group.artwork}
                      href={group.href}
                      guide={tSite(group.link)}
                    >
                      <ul className="space-y-3">
                        {group.items.map((item) => (
                          <StarterProCheckItem
                            key={item}
                            className="text-[13px]"
                          >
                            {tSite(item)}
                          </StarterProCheckItem>
                        ))}
                      </ul>
                      {"flow" in group ? (
                        <>
                          <p className={styles.foundationFlowLabel}>
                            {tSite("Integration overview")}
                          </p>
                          <ol
                            className={styles.foundationTileFlow}
                            aria-label={tSite("{value0} flow overview", {
                              value0: group.title,
                            })}
                          >
                            {group.flow.map(
                              ({ title, detail, icon: StepIcon }) => (
                                <li key={title}>
                                  <StepIcon
                                    className="size-4"
                                    aria-hidden="true"
                                  />
                                  <span>{tSite(title)}</span>
                                  <span>{tSite(detail)}</span>
                                </li>
                              ),
                            )}
                          </ol>
                          <p className={styles.foundationTileSetup}>
                            <strong>{tSite("Your setup.")}</strong>
                            {tSite(" ")}
                            {tSite(group.setupNote)}
                          </p>
                        </>
                      ) : null}
                    </StarterProIncludedDialog>
                  </div>
                </article>
              );
            })}
          </StarterProFoundations>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">
            {tSite(
              "The PWA layer includes an offline fallback. Auth, billing and admin data stay online-first. Review the",
            )}
            {tSite(" ")}
            <Link
              href={INTERNAL.docsPwaSetup}
              className="underline underline-offset-4"
            >
              {tSite("PWA setup")}
            </Link>
            {tSite(" ")}
            {tSite("and")}
            {tSite(" ")}
            <Link
              href={INTERNAL.docsPwaChecklist}
              className="underline underline-offset-4"
            >
              {tSite("release checklist")}
            </Link>
            {tSite(" ")}
            {tSite("for your environment.")}
          </p>
          <div className={`${styles.productFit} mt-8 grid lg:grid-cols-2`}>
            <div className="p-6 sm:p-7">
              <h3 className="text-sm font-semibold">
                {tSite("A fit for products with accounts and billing.")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {tSite(
                  "SaaS products, client applications and internal tools that need authentication, subscriptions and protected account areas.",
                )}
              </p>
              <Link
                href={INTERNAL.starterFree}
                className={`${textLink} mt-3 text-xs`}
              >
                {tSite("Still exploring? Start with Free")}
                {tSite(" ")}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div
              className={`${styles.stage} border-t border-border-subtle p-6 sm:p-7 lg:border-l lg:border-t-0`}
            >
              <h3 className="text-sm font-semibold">
                {tSite("You bring the product.")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {tSite(
                  "Build your own domain models, onboarding, business workflows and branding. Configure the providers and validate your complete customer journey before launch.",
                )}
              </p>
              <Link
                href={INTERNAL.docsProductionChecklist}
                className={`${textLink} mt-3 text-xs`}
              >
                {tSite("Review your launch responsibilities")}
                {tSite(" ")}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="purchase"
          width="full"
          className={`${sectionClass} ${styles.purchaseSection}`}
          aria-labelledby="purchase-heading"
        >
          <MarketingSectionHeader
            titleId="purchase-heading"
            align="center"
            className={styles.bodyHeading}
            eyebrow={tSite("Purchase & delivery")}
            title={tSite("What you receive after purchase")}
            description={tSite(
              "A source package you can inspect and adapt, with a clear path to download it and recover access.",
            )}
          />
          <section
            aria-labelledby="starter-pro-offer-heading"
            className={styles.offer}
          >
            <div className={styles.offerBody}>
              <div className={styles.offerIntro}>
                <div className="flex items-center justify-between gap-3">
                  <h3
                    id="starter-pro-offer-heading"
                    className="text-sm font-semibold"
                  >
                    {tSite("Starter Pro")}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {tSite("Source code license")}
                  </span>
                </div>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-brand text-5xl font-semibold tracking-tight">
                    {tSite(sourcePrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {tSite("One-time payment")}
                  </span>
                </p>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  {tSite(
                    "Complete source licence. Provider costs and implementation services are separate.",
                  )}
                </p>
              </div>
              <div className={styles.offerDetails}>
                <ul className="space-y-3">
                  <StarterProCheckItem>
                    {tSite(
                      "Accounts, workspaces, billing and project workflows",
                    )}
                  </StarterProCheckItem>
                  <StarterProCheckItem>
                    {tSite(
                      "Validated ZIP, setup guides and operational checks",
                    )}
                  </StarterProCheckItem>
                  <StarterProCheckItem>
                    {tSite("ZIP access through your claim email")}
                  </StarterProCheckItem>
                </ul>
              </div>
              <div className={styles.offerActions}>
                <BuyStarterProButton className={effects.primaryAction} />
                <span className={styles.demoAction}>
                  <ProDemoLink />
                </span>
                {proDemoUrl() ? (
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    {tSite(
                      "Try projects, tasks, discussions, a workspace dashboard and simulated member invitations. Each visitor gets a private, temporary workspace.",
                    )}
                  </p>
                ) : null}
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  {tSite(
                    "Access follows payment confirmation and delivery processing.",
                  )}
                </p>
              </div>
            </div>
            <div
              className={`${styles.offerFooter} flex flex-wrap items-center justify-between gap-x-4 border-t border-border-subtle`}
            >
              <a href="#purchase" className={`${textLink} text-xs`}>
                {tSite("Purchase & delivery")}
                {tSite(" ")}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
              <Link
                href={INTERNAL.license}
                className={`${textLink} text-xs text-muted-foreground`}
              >
                {tSite("License terms")}
              </Link>
            </div>
          </section>
          <div className={styles.purchasePanel}>
            <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)]">
              <div
                className={`${styles.deliveryPath} flex flex-col border-b border-border-subtle p-6 sm:p-8 lg:border-b-0 lg:border-r`}
              >
                <div className="mb-7 flex items-center justify-between gap-4">
                  <Download
                    className="size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {tSite("SOURCE PACKAGE")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-subheading">
                  {tSite("From checkout to your code.")}
                </h3>
                <ol className={`${styles.deliveryTimeline} mt-7 space-y-6`}>
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
                        0{tSite(index + 1)}
                      </span>
                      <div>
                        <p className="text-sm font-medium leading-7">
                          {tSite(step.title)}
                        </p>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          {tSite(step.detail)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto pt-8">
                  <p className="text-xs leading-6 text-muted-foreground">
                    {tSite("Already purchased?")}
                  </p>
                  <Link
                    href={INTERNAL.ordersRecover}
                    className={`${textLink} text-xs`}
                  >
                    {tSite("Recover your access")}
                    {tSite(" ")}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className={`${styles.purchaseGrid} grid md:grid-cols-2`}>
                {postPurchaseDetails.map(
                  ({
                    title,
                    tone,
                    artwork,
                    description,
                    icon: Icon,
                    links,
                  }) => (
                    <div
                      key={title}
                      data-card-tone={tone}
                      data-card-art=""
                      className={`${styles.purchaseCard} flex flex-col bg-background p-6 sm:p-7`}
                    >
                      <div
                        className={styles.purchaseCardArtwork}
                        aria-hidden="true"
                      >
                        <Image
                          src={artwork}
                          alt=""
                          fill
                          loading="lazy"
                          quality={75}
                          sizes="(min-width: 1024px) 280px, (min-width: 768px) 40vw, 86vw"
                          className={styles.productIllustration}
                        />
                      </div>
                      <Icon
                        className={`${styles.purchaseFallbackIcon} mb-5 size-4 text-muted-foreground`}
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold leading-6">
                        {tSite(title)}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {tSite(description)}
                      </p>
                      <div className="mt-auto flex flex-col items-start gap-1 pt-4">
                        {links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`${textLink} text-xs`}
                          >
                            {tSite(link.label)}
                            {tSite(" ")}
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
            <div
              className={`${styles.purchaseFooter} flex flex-col gap-3 border-t border-border-subtle px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between`}
            >
              <p className="text-sm">
                {tSite(sourcePrice)}{" "}
                {tSite(" · One-time payment · Full source code")}
              </p>
              <p className="text-xs leading-6 text-muted-foreground">
                {tSite("Legal scope and usage terms are governed by")}
                {tSite(" ")}
                <Link
                  href={INTERNAL.license}
                  className="underline underline-offset-4"
                >
                  {tSite("/license")}
                </Link>
                {tSite(" ")}
                {tSite("and")}
                {tSite(" ")}
                <Link
                  href={INTERNAL.terms}
                  className="underline underline-offset-4"
                >
                  {tSite("/terms")}
                </Link>
                .
              </p>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="free-vs-pro"
          width="full"
          className={`${sectionClass} ${styles.comparisonSection}`}
          aria-labelledby="comparison-heading"
        >
          <MarketingSectionHeader
            titleId="comparison-heading"
            align="center"
            className={styles.comparisonHeading}
            eyebrow={tSite("Free vs Pro")}
            title={tSite("Choose the starting point your product needs.")}
            description={tSite(
              "Explore the interface with Free. Move to Pro when authentication, billing and database integration become the next implementation step.",
            )}
          />
          <div className={styles.comparisonSurface}>
            <StarterComparisonTable />
          </div>
          <div className={styles.comparisonResources}>
            <Link href={INTERNAL.pricing} className={textLink}>
              {tSite("Compare all products")}
              {tSite(" ")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={INTERNAL.buildVsBuy} className={textLink}>
              {tSite("Read the build vs buy comparison")}
              {tSite(" ")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="setup"
          width="full"
          className={`${sectionClass} ${styles.setupSection}`}
          aria-labelledby="setup-heading"
        >
          <MarketingSectionHeader
            titleId="setup-heading"
            align="center"
            className={styles.bodyHeading}
            eyebrow={tSite("Getting started")}
            title={tSite("Your source. Your environment. Your product.")}
            description={tSite(
              "Follow the documentation from your first local run to a validated customer flow. Setup depends on your environment and the providers you choose.",
            )}
          />
          <div
            className={`${styles.setupPanel} grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]`}
          >
            <ol className={styles.setupSteps}>
              {setupSteps.map((step, index) => (
                <li
                  key={step.title}
                  data-card-tone={step.tone}
                  className={`${styles.setupStep} flex items-start gap-4 p-6 sm:gap-5 sm:p-7`}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-[5px] border border-border-subtle font-mono text-xs text-muted-foreground">
                    0{tSite(index + 1)}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold leading-8">
                      {tSite(step.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {tSite(step.description)}
                    </p>
                    <Link
                      href={step.href}
                      className={`${textLink} mt-2 text-xs`}
                    >
                      {tSite(step.link)}
                      {tSite(" ")}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
            <div
              data-card-tone="cobalt"
              data-card-art=""
              className={`${styles.configurationPanel} flex flex-col p-6 sm:p-8`}
            >
              <div className={styles.configurationArtwork} aria-hidden="true">
                <Image
                  src="/images/starters/pro/concepts/workflow-path-test-v1.png"
                  alt=""
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(min-width: 1024px) 400px, 86vw"
                  className={styles.productIllustration}
                />
              </div>
              <div className={styles.serviceOrbit} aria-hidden="true">
                <svg
                  className={styles.orbitConnections}
                  viewBox="0 0 400 130"
                  preserveAspectRatio="none"
                  focusable="false"
                >
                  <path d="M20 85C110 20 250 110 380 45" />
                </svg>
                {[Code2, Database, Lock, CreditCard].map((Icon, index) => (
                  <span key={index}>
                    <Icon focusable="false" />
                  </span>
                ))}
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {tSite("Configuration checklist")}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-subheading">
                {tSite("Prepare the services your app will use.")}
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
                    <dt className="text-xs font-semibold">{tSite(term)}</dt>
                    <dd className="mt-1 text-xs leading-6 text-muted-foreground">
                      {tSite(detail)}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href={INTERNAL.docsGettingStarted}
                className={`${textLink} mt-auto pt-4 text-xs`}
              >
                {tSite("Review setup")}
                {tSite(" ")}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="starter-pro-docs"
          width="full"
          className={`${sectionClass} ${styles.docsSection}`}
          aria-labelledby="docs-heading"
        >
          <MarketingSectionHeader
            titleId="docs-heading"
            align="center"
            className={styles.bodyHeading}
            eyebrow={tSite("Documentation")}
            title={tSite("Inspect the details before you decide.")}
            description={tSite(
              "Review the scope, understand the integrations and prepare your first deployment.",
            )}
          />
          <div
            className={`${styles.resourceGrid} grid md:grid-cols-2 lg:grid-cols-3`}
          >
            {docResourceCards.map(
              ({ title, tone, description, href, cta, icon: Icon }, index) => (
                <Link
                  key={href}
                  data-card-tone={tone}
                  href={href}
                  className={`${styles.resourceCard} group flex items-start gap-4 p-6 transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:p-7`}
                >
                  <Icon
                    className="mt-1 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className={styles.resourceIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold">{tSite(title)}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {tSite(description)}
                    </p>
                  </div>
                  <span className={styles.resourceCta}>
                    {tSite(cta)}
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </Link>
              ),
            )}
          </div>
          <div className={styles.docsResources}>
            <Link href={INTERNAL.changelog} className={`${textLink} text-xs`}>
              {tSite("View changelog")}
              {tSite(" ")}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link href={INTERNAL.roadmap} className={`${textLink} text-xs`}>
              {tSite("View roadmap")}
              {tSite(" ")}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>

        <section
          id="buyer-faq"
          aria-labelledby="buyer-faq-heading"
          className={styles.faqSection}
        >
          <MarketingFaq
            titleId="buyer-faq-heading"
            className={styles.buyerFaqLayout}
            title={tSite("Questions buyers ask before paying")}
            description={tSite(
              "Check setup, access, usage terms and the steps you still own before buying.",
            )}
            items={starterProBuyerFaqs}
          />
        </section>

        <section
          aria-labelledby="starter-pro-next-step"
          className={`${styles.closingCta} flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between`}
        >
          <div className={styles.closingArtwork} aria-hidden="true">
            <StarterProWaves id="starter-pro-closing-waves" />
          </div>
          <div className="max-w-2xl">
            <h2
              id="starter-pro-next-step"
              className="text-2xl font-semibold tracking-heading"
            >
              {tSite("Start from the foundation. Build your product.")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tSite(
                "Review the source, configure your providers and make Starter Pro your own.",
              )}
            </p>
          </div>
          <div className="shrink-0">
            <BuyStarterProButton
              fullWidth={false}
              className={`${effects.primaryAction} w-full lg:w-auto`}
            />
          </div>
        </section>
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
  return localizePageMetadata(metadata, "/starters/pro", locale);
}

import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  LayoutDashboard,
  Lock,
  Mail,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WifiOff,
} from "lucide-react";

import { Badge, Button, Card, CardContent, CardHeader } from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { starterProBuyerFaqs } from "@/lib/products/starter-pro-buyer-faq";

import { Container } from "@/components/container";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { JsonLd, generateProductOfferJsonLd } from "@/components/seo/json-ld";
import { StarterComparisonTable } from "@/components/starters/starter-comparison-table";

export const metadata: Metadata = {
  title: "Next.js SaaS Starter with Auth & Billing",
  description:
    "Production-ready Next.js SaaS starter with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, OAuth, and launch-ready SaaS architecture already wired.",
  alternates: {
    canonical: "/starters/pro",
  },

  openGraph: {
    title: "Next.js SaaS Starter with Auth & Billing — PyColors",
    description:
      "Launch a real SaaS faster with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, OAuth, and production-ready foundations already wired.",
    url: "/starters/pro",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Starter with Auth & Billing — PyColors",
    description:
      "Production-ready SaaS starter built for modern Next.js applications and faster product launches.",
    images: ["/seo/twitter-main.png"],
  },
};

const launchPrice = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const regularPrice = PRODUCT_DISPLAY["starter-pro"].regularPriceLabel;

const starterProJsonLd = generateProductOfferJsonLd({
  product: PRODUCT_DISPLAY["starter-pro"],
  canonicalPath: "/starters/pro",
  description:
    "Production-ready Next.js SaaS starter with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, and launch-ready SaaS architecture.",
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

const coreFeatures = [
  {
    title: "Real authentication already wired",
    description:
      "Email/password auth, Google and GitHub OAuth, email verification, password reset, sessions, protected routes, and account foundations are already included.",
    icon: Lock,
  },
  {
    title: "Stripe billing already integrated",
    description:
      "Secure Stripe checkout, billing portal, invoices, webhook synchronization, subscription lifecycle handling, and billing-aware UI states are part of the foundation.",
    icon: CreditCard,
  },
  {
    title: "Protected SaaS app architecture",
    description:
      "Protected routes, account areas, settings, billing flows, app shell, and scalable product structure are shaped for a real SaaS product.",
    icon: LayoutDashboard,
  },
  {
    title: "PWA-ready app experience",
    description:
      "Manifest, standalone mode, professional icons, dashboard screenshots, mobile-safe viewport handling, and offline fallback foundations are included to make the product feel more mature.",
    icon: Smartphone,
  },
  {
    title: "Built to reduce launch friction",
    description:
      "Starter Pro removes repeated foundation work across auth, billing, Prisma, delivery, and protected app structure so you can focus on product logic, onboarding, customers, and growth.",
    icon: Rocket,
  },
  {
    title: "Built for long-term SaaS evolution",
    description:
      "Starter Pro is structured to support real product growth with reusable patterns, typed boundaries, scalable routing, protected surfaces, and maintainable architecture.",
    icon: GitBranch,
  },
] as const;

const trustItems = [
  {
    title: "Production-shaped scope",
    description:
      "Focused on the expensive SaaS wiring behind the UI: auth, billing, database, protected flows, purchase recovery, and account structure.",
    icon: Code2,
  },
  {
    title: "Production-minded engineering",
    description:
      "Typed foundations, reusable patterns, maintainable architecture, and production-oriented decisions backed by CI and focused tests.",
    icon: ShieldCheck,
  },
  {
    title: "Documentation-first",
    description:
      "Starter Pro is supported by implementation docs so buyers understand what is included, how commerce works, and how to extend it.",
    icon: Mail,
  },
  {
    title: "PWA-ready without risky caching",
    description:
      "The PWA layer improves installability and mobile perception while keeping auth, billing, and admin data online-first.",
    icon: WifiOff,
  },
  {
    title: "App-quality product polish",
    description:
      "Responsive layouts, standalone-ready PWA foundations, mobile-safe surfaces, loading states, empty states, and production-shaped UX patterns.",
    icon: Smartphone,
  },
  {
    title: "Actively maintained",
    description:
      "PyColors ships with changelog updates, public mirrors, roadmap direction, and a long-term ecosystem vision.",
    icon: GitBranch,
  },
] as const;

const stackItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
  "Stripe",
  "Vercel",
  "PWA",
] as const;

const includedChecklist = [
  "Full Starter Pro source code",
  "Production-ready Next.js App Router architecture",
  "Strict TypeScript setup",
  "Tailwind CSS foundation",
  "Email/password authentication",
  "Google and GitHub OAuth",
  "Email verification",
  "Reset password flow",
  "Session management",
  "Protected routes",
  "Secure Stripe Checkout integration",
  "Stripe billing portal",
  "Invoices and billing history UI",
  "Webhook synchronization with Prisma",
  "Subscription lifecycle handling",
  "Purchase recovery flow",
  "Download delivery foundations",
  "Dashboard, settings, billing, and admin surfaces",
  "Plan gating and feature access control",
  "Installable PWA foundation",
  "Standalone mode and manifest setup",
  "Professional PWA icons and screenshots",
  "Offline fallback route",
  "Prisma schema and PostgreSQL setup",
  "Zod validation and React Hook Form integration",
  "Environment configuration foundations",
  "Commercial usage rights",
] as const;

const postPurchaseDeliverables = [
  "Starter Pro ZIP",
  "Full source code",
  "Next.js App Router",
  "Strict TypeScript",
  "Tailwind CSS",
  "Auth.js foundations",
  "Stripe billing foundations",
  "Prisma + PostgreSQL",
  "PWA-ready foundations",
  "Documentation",
  "Production checklist",
  "Commercial license",
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

const first30MinutesSteps = [
  {
    step: "01",
    title: "Receive claim email",
    description:
      "Your claim email should arrive shortly after payment with your secure access link. Missing it? Use purchase recovery to resend your access link.",
  },
  {
    step: "02",
    title: "Download source code",
    description:
      "Open the access link in your claim email, download the package, and unzip it before setup.",
  },
  {
    step: "03",
    title: "Install dependencies",
    description:
      "Follow Getting Started to install packages and configure local environment variables.",
  },
  {
    step: "04",
    title: "Run locally",
    description:
      "Start the app, connect PostgreSQL, and confirm auth and billing foundations load.",
  },
  {
    step: "05",
    title: "Start building",
    description:
      "Replace demo product logic with your own onboarding, pricing, and customer flows.",
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

const perfectFor = [
  "SaaS founders",
  "Freelancers",
  "Agencies",
  "Startup teams",
  "Internal business tools",
] as const;

const notIdealFor = ["Static websites", "Landing pages only", "Blogs"] as const;

const stillBuildItems = [
  "your product logic",
  "your AI features",
  "your business workflows",
  "your branding",
  "your domain models",
] as const;

const purchaseTrustItems = [
  {
    title: "Inspect what you get",
    description:
      "Full Starter Pro source code, setup documentation, and a production checklist. You configure your own providers and build your product logic.",
    href: INTERNAL.docsWhatIsIncluded,
    label: "Review included source and scope",
    icon: Code2,
  },
  {
    title: "Know how delivery works",
    description:
      "Once payment is confirmed and delivery is processed, use the access link sent to your checkout email to download the ZIP.",
    href: INTERNAL.docsDelivery,
    label: "Follow payment-to-ZIP delivery",
    icon: Download,
  },
  {
    title: "Recover missing access",
    description:
      "Missing email or expired link? Follow the recovery steps with your checkout email. If payment is uncertain, contact purchase support before paying again.",
    href: INTERNAL.docsPurchaseRecovery,
    label: "Review access recovery steps",
    icon: Mail,
  },
] as const;

const starterProPreviews = [
  {
    title: "Sign-in screen",
    alt: "Starter Pro sign-in screen with email, password, Google and GitHub options",
    src: "/images/starters/pro/auth-pycolors.png",
    width: 3456,
    height: 1928,
    annotations: [
      {
        title: "Email and password form",
        description:
          "The right-hand form groups sign-in fields and a password-recovery link, giving you an account entry screen to adapt to your product.",
      },
      {
        title: "Provider choices and account creation",
        description:
          "Google and GitHub buttons sit above the email fields, with an account-creation link below the form. Configure your own provider credentials before using these options.",
      },
    ],
  },
  {
    title: "Offline fallback",
    alt: "Starter Pro offline screen with reload and dashboard links",
    src: "/images/starters/pro/pwa-pycolors.png",
    width: 3456,
    height: 1926,
    annotations: [
      {
        title: "A clear connection state",
        description:
          "The offline message explains why the app cannot load, giving users a useful destination when their connection drops.",
      },
      {
        title: "A route back to the app",
        description:
          "Reload and dashboard actions provide recovery paths. This fallback screen does not mean every feature works offline.",
      },
    ],
  },
] as const;

function StarterProPreviews() {
  return (
    <section
      aria-labelledby="starter-pro-previews-title"
      className="px-4 pb-14 sm:px-6"
    >
      <Container>
        <MarketingSectionHeader
          titleId="starter-pro-previews-title"
          eyebrow="Inside Starter Pro"
          title="Inspect the screens you can build on"
          description="Existing Starter Pro captures in the light theme. These interface previews do not demonstrate a completed payment, a verified integration, or a live production deployment."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {starterProPreviews.map((preview) => (
            <figure
              key={preview.title}
              className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface"
            >
              <Image
                src={preview.src}
                alt={preview.alt}
                width={preview.width}
                height={preview.height}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full border-b border-border-subtle"
              />
              <figcaption className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold">{preview.title}</h3>
                <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm marker:font-semibold marker:text-primary">
                  {preview.annotations.map((annotation) => (
                    <li key={annotation.title} className="pl-1">
                      <p className="font-medium">{annotation.title}</p>
                      <p className="mt-1 leading-6 text-muted-foreground">
                        {annotation.description}
                      </p>
                    </li>
                  ))}
                </ol>
                <a
                  href={preview.src}
                  className="mt-5 inline-flex rounded-sm text-sm font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  View {preview.title.toLowerCase()} at full size
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <MarketingFeatureCard
      title={title}
      description={description}
      icon={<Icon className="h-5 w-5" />}
    />
  );
}

function DocResourceCard({
  title,
  description,
  href,
  cta,
  icon: Icon,
}: {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <MarketingFeatureCard
      title={title}
      description={description}
      icon={<Icon className="h-4 w-4" />}
      action={
        <Button
          asChild
          variant="outline"
          className="h-10 rounded-[5px] text-sm font-medium"
        >
          <Link href={href}>
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      }
    />
  );
}

export default function StarterProPage() {
  return (
    <main className="bg-background text-foreground">
      <JsonLd id="starter-pro-product-jsonld" data={starterProJsonLd} />
      <Container className="py-18">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: "Starter Pro",
              variant: "secondary",
            },
            {
              label: `Launch price ${launchPrice}`,
              variant: "outline",
              icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
            },
            {
              label: `${regularPrice} regular price`,
              variant: "outline",
            },
          ]}
          title="Stop rebuilding auth, billing, and app foundations. Start closer to launch."
          subtitle="A production-ready Next.js SaaS starter with the commerce layer, protected architecture, and PWA-ready app experience already shaped."
          description="Starter Pro gives you Auth.js authentication, secure Stripe checkout, purchase recovery, protected app architecture, Prisma foundations, installable PWA foundations, and launch-ready SaaS surfaces so you can focus on your product instead of repeated setup work."
          actions={
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <BuyStarterProButton />

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <a
                  href={EXTERNAL.starterDemo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Try the live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href={INTERNAL.pricing}>View pricing</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href={INTERNAL.docsGettingStarted}>Review setup</Link>
              </Button>
            </div>
          }
          pills={[
            "One-time payment",
            "Secure claim email",
            "Commercial usage",
            "Commerce-ready",
            "PWA-ready",
          ]}
          extra={
            <ul className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
              <MarketingCheckItem>Full source code</MarketingCheckItem>
              <MarketingCheckItem>Real auth wired</MarketingCheckItem>
              <MarketingCheckItem>Stripe billing wired</MarketingCheckItem>
              <MarketingCheckItem>Protected SaaS app</MarketingCheckItem>
              <MarketingCheckItem>PWA-ready foundation</MarketingCheckItem>
            </ul>
          }
        />
      </Container>

      <StarterProPreviews />
      <section className="border-t border-border-subtle">
        <Container className="py-10 lg:py-12">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="After purchase"
              title="What you receive after purchase"
              description="A clear path from payment to source access, with recovery, license, update, support, and setup expectations stated before checkout."
            />

            <Card className="mt-8 rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight">
                Included in your Starter Pro package
              </h3>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {postPurchaseDeliverables.map((item) => (
                  <MarketingCheckItem key={item}>{item}</MarketingCheckItem>
                ))}
              </ul>
            </Card>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {postPurchaseDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                  >
                    <CardContent className="p-6 sm:p-7">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted text-primary">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>

                        <div>
                          <h3 className="text-base font-semibold tracking-tight">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                            {item.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4"
                              >
                                {link.label}
                                <ArrowRight
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-10 lg:py-12">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="First 30 minutes"
              title="What happens right after you buy"
              description="A practical timeline from checkout to a running local project."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {first30MinutesSteps.map((item) => (
                <Card
                  key={item.step}
                  className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                >
                  <CardContent className="p-5">
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {item.step}
                      </div>

                      <div className="text-sm font-medium text-foreground">
                        {item.title}
                      </div>

                      <p className="text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Why it exists"
              title="Most SaaS starters stop at UI. Starter Pro wires the expensive part."
              description="The hardest repeated work is rarely the landing page. It is auth, billing, protected routes, account flows, database synchronization, purchase recovery, delivery, PWA-ready app polish, and the small decisions needed before a SaaS can charge customers."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {coreFeatures.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Product proof"
              title="A SaaS foundation built around the parts buyers actually pay for."
              description="The visual product preview is already handled above. This section explains why Starter Pro is valuable: it removes the expensive foundations that slow real SaaS launches."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                title="Auth is already wired"
                description="Email/password, OAuth, verification, recovery, sessions, and protected routes are included."
                icon={Lock}
              />

              <FeatureCard
                title="Billing is already wired"
                description="Secure Stripe Checkout, billing portal, invoices, webhooks, purchase recovery, and subscription states are included."
                icon={CreditCard}
              />

              <FeatureCard
                title="App structure is ready"
                description="Dashboard, settings, account areas, admin surfaces, and protected SaaS routing are shaped."
                icon={LayoutDashboard}
              />

              <FeatureCard
                title="PWA polish is included"
                description="Installable app behavior, standalone mode, icons, screenshots, and offline fallback foundations."
                icon={Smartphone}
              />
            </div>

            <Card className="mt-6 rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  Starter Pro is not positioned as a screenshot gallery. It is
                  positioned as a shortcut to the commercial SaaS layer:
                  authentication, billing, purchase recovery, protected
                  architecture, database foundations, and app-quality polish.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="h-10 shrink-0 rounded-[5px] text-sm font-medium"
                >
                  <Link href={INTERNAL.docsWhatIsIncluded}>
                    See what is included
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-10 lg:py-12">
          <div className="mx-auto max-w-6xl rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="outline">PWA-ready</Badge>
                  <Badge variant="secondary">Included in Starter Pro</Badge>
                </div>

                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  A more app-like SaaS experience, without risky offline
                  shortcuts.
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Starter Pro includes manifest setup, standalone mode,
                  professional icons, install screenshots, mobile-safe viewport
                  handling, and an offline fallback while keeping auth, billing,
                  and admin data online-first.
                </p>

                <MarketingPillList aria-label="PWA capabilities">
                  <MarketingPill>Installable</MarketingPill>
                  <MarketingPill>Standalone mode</MarketingPill>
                  <MarketingPill>Offline fallback</MarketingPill>
                  <MarketingPill>Mobile-ready</MarketingPill>
                </MarketingPillList>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-[5px] text-sm font-medium"
                >
                  <Link href={INTERNAL.docsPwaSetup}>Review PWA setup</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-[5px] text-sm font-medium"
                >
                  <Link href={INTERNAL.docsPwaChecklist}>
                    Release checklist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <MarketingSectionHeader
                align="left"
                eyebrow="What you actually get"
                title="A complete SaaS foundation you can own, modify, and launch from."
                description="Starter Pro is designed to reduce repeated implementation cost. You still build your product, but you do not start from a blank auth, billing, database, and protected app setup."
              />

              <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {includedChecklist.map((item) => (
                    <MarketingCheckItem key={item}>{item}</MarketingCheckItem>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Built with Starter Pro"
              title="Use the foundation for real SaaS products, not only demos."
              description="Starter Pro gives you the production layer underneath many common SaaS directions. You still build the product, but you do not start from blank auth, billing, account, and app foundations."
            />
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-border-subtle bg-surface-muted"
                >
                  Who is this for?
                </Badge>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                  Best for builders who need a SaaS foundation now.
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Perfect for
                    </p>
                    <ul className="mt-4 grid gap-3">
                      {perfectFor.map((item) => (
                        <MarketingCheckItem key={item}>
                          {item}
                        </MarketingCheckItem>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Not ideal for
                    </p>
                    <ul className="mt-4 grid gap-3">
                      {notIdealFor.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                          <span className="leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface p-6 shadow-soft sm:p-7">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                >
                  What you still build
                </Badge>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                  Your product stays yours.
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Starter Pro provides the production foundation. You still
                  build the parts that make your business unique.
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {stillBuildItems.map((item) => (
                    <MarketingCheckItem key={item}>{item}</MarketingCheckItem>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Trust"
              title="Built to feel like a serious product foundation."
              description="Early buyers need confidence. Starter Pro makes the scope, stack, maintenance, and production intent explicit."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {trustItems.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>

            <Card className="mt-6 rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Built with the stack developers already trust
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Modern SaaS foundations using familiar production tools.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <MarketingPillList aria-label="Starter Pro technology stack">
                    {stackItems.map((item) => (
                      <MarketingPill key={item}>{item}</MarketingPill>
                    ))}
                  </MarketingPillList>
                </div>
              </div>
            </Card>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-[5px] text-sm font-medium"
              >
                <Link href={INTERNAL.changelog}>View changelog</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-10 rounded-[5px] text-sm font-medium"
              >
                <Link href={INTERNAL.roadmap}>View roadmap</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <section id="free-vs-pro" className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <MarketingSectionHeader
                align="left"
                eyebrow="Free vs Pro"
                title="Starter Free validates the surface. Starter Pro wires the business."
                description="Use Free to explore product UX. Move to Pro when auth, billing, protected architecture, and database foundations become the bottleneck."
              />

              <StarterComparisonTable />
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <BuyStarterProButton
                fullWidth={false}
                label={`Move to Starter Pro — ${launchPrice}`}
              />
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-[5px] text-sm font-medium"
              >
                <a
                  href={EXTERNAL.starterDemo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Try the Starter Free demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="max-w-xl text-center text-xs leading-6 text-muted-foreground">
                Choose Pro when the cost of rebuilding the foundation is higher
                than the price of skipping it. For a slower decision, read the{" "}
                <Link
                  href={INTERNAL.buildVsBuy}
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  build vs buy comparison
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Card className="relative overflow-hidden rounded-[5px] border border-pro-border bg-pro-surface shadow-medium">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

              <CardHeader className="space-y-6 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold">Starter Pro</p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Built for developers serious about launching.
                    </p>
                  </div>

                  <Badge className="rounded-[5px]">Best launch path</Badge>
                </div>

                <div className="flex items-end gap-3">
                  <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {launchPrice}
                  </span>

                  <div className="pb-1 text-sm text-muted-foreground">
                    <span className="mr-2 line-through">{regularPrice}</span>{" "}
                    one-time payment
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <ul className="grid gap-3 sm:grid-cols-2">
                  <MarketingCheckItem>
                    Full Starter Pro source code
                  </MarketingCheckItem>
                  <MarketingCheckItem>
                    Real authentication included
                  </MarketingCheckItem>
                  <MarketingCheckItem>
                    Stripe billing included
                  </MarketingCheckItem>
                  <MarketingCheckItem>
                    Protected architecture included
                  </MarketingCheckItem>
                  <MarketingCheckItem>
                    Prisma + PostgreSQL foundation
                  </MarketingCheckItem>
                  <MarketingCheckItem>
                    Commercial usage rights
                  </MarketingCheckItem>
                </ul>

                <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4 text-sm leading-7 text-muted-foreground">
                  Current launch price:{" "}
                  <span className="font-medium text-foreground">
                    {launchPrice}
                  </span>
                  . Regular price planned at{" "}
                  <span className="font-medium text-foreground">
                    {regularPrice}
                  </span>
                  . One-time payment with a claim email sent shortly after
                  purchase.
                </div>

                <ul
                  aria-label="Before buying Starter Pro"
                  className="grid gap-4 md:grid-cols-3"
                >
                  {purchaseTrustItems.map((item) => (
                    <li key={item.href}>
                      <MarketingFeatureCard
                        title={item.title}
                        description={item.description}
                        icon={<item.icon className="h-4 w-4" />}
                        className="p-4 shadow-none"
                        action={
                          <Link
                            href={item.href}
                            className="rounded-sm text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                          >
                            {item.label}
                          </Link>
                        }
                      />
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${launchPrice}`}
                  />

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-11 rounded-[5px] px-6 text-sm font-medium"
                  >
                    <a
                      href={EXTERNAL.starterDemo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Try the live demo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-11 rounded-[5px] px-6 text-sm font-medium"
                  >
                    <Link href={INTERNAL.docsGettingStarted}>Review setup</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
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
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Documentation"
              title="Read before you buy, ship faster after you do"
              description="Starter Pro is documentation-first. These guides answer the questions buyers ask before and after checkout."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {docResourceCards.map((item) => (
                <DocResourceCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section id="buyer-faq" className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <MarketingSectionHeader
              eyebrow="FAQ"
              title="Questions buyers ask before paying"
              description="Check setup, access, usage terms, and the steps you still own before buying."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {starterProBuyerFaqs.map((faq) => (
                <Card
                  key={faq.question}
                  className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                >
                  <CardContent className="p-6">
                    <h3 className="text-base font-medium">{faq.question}</h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {faq.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4"
                          >
                            {link.label}
                            <ArrowRight
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[5px] border border-pro-border bg-pro-surface px-6 py-10 shadow-medium sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="rounded-[5px] border-pro-border bg-pro-surface-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
              >
                Final decision
              </Badge>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start from the SaaS foundation. Spend your time on the product.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Buy Starter Pro when authentication, billing, protected routes,
                PWA-ready app foundations, and SaaS infrastructure should
                already be handled.
              </p>

              <MarketingPillList
                align="center"
                aria-label="Starter Pro purchase details"
              >
                <MarketingPill>Launch price {launchPrice}</MarketingPill>
                <MarketingPill>One-time payment</MarketingPill>
                <MarketingPill>Secure claim email</MarketingPill>
                <MarketingPill>Commercial usage</MarketingPill>
                <MarketingPill>PWA-ready</MarketingPill>
              </MarketingPillList>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <BuyStarterProButton
                  fullWidth={false}
                  label={`Buy Starter Pro — ${launchPrice}`}
                />

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <a
                    href={EXTERNAL.starterDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Try the live demo
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterFree}>
                    Compare with Starter Free
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

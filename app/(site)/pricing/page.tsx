import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BadgeCheck,
  Check,
  Code2,
  CreditCard,
  Database,
  GitBranch,
  LayoutTemplate,
  Lock,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from '@/lib/products/public-catalog';

import { Container } from '@/components/container';
import {
  JsonLd,
  generateProductOfferJsonLd,
} from '@/components/seo/json-ld';
import { PageHero } from '@/components/marketing/page-hero';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { BuyProductButton } from '@/components/pricing/buy-product-button';

export const metadata: Metadata = {
  title: 'Next.js SaaS Pricing',
  description:
    'Compare PyColors products for modern Next.js SaaS applications: premium templates, Starter Free for UX validation, and Starter Pro with Auth.js, secure Stripe checkout, Prisma, purchase recovery, and production-ready foundations.',
  alternates: {
    canonical: '/pricing',
  },

  openGraph: {
    title: 'Next.js SaaS Pricing',
    description:
      'Compare templates, Starter Free, and Starter Pro for modern Next.js SaaS products with auth, secure checkout, purchase recovery, dashboards, and production-ready architecture.',
    url: '/pricing',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Pricing',
    description:
      'Compare PyColors products for building and launching modern SaaS applications faster.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  buildVsBuy: '/compare/build-vs-buy',
  templateNaAi: '/templates/na-ai-landing',
  starterFree: '/starters/free',
  starterPro: '/starters/pro',
  docsStarterPro: '/docs/starter-pro',
  docsBilling: '/docs/starter-pro/billing',
  docsBackend: '/docs/starter-pro/backend',
  roadmap: '/roadmap',
  changelog: '/changelog',
  license: '/license',
  terms: '/terms',
} as const;

const PRICING = {
  naAiLanding: PRODUCT_DISPLAY['na-ai-landing'].priceLabel,
  starterFree: STARTER_FREE_PRICE_LABEL,
  starterProLaunch: PRODUCT_DISPLAY['starter-pro'].priceLabel,
  starterProRegular: PRODUCT_DISPLAY['starter-pro'].regularPriceLabel,
} as const;

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY['starter-pro'],
      canonicalPath: '/starters/pro',
      description:
        'Production-ready Next.js SaaS starter with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, and launch-ready SaaS architecture.',
    }),
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY['na-ai-landing'],
      canonicalPath: '/templates/na-ai-landing',
      description:
        'Premium AI and SaaS landing page template built for modern Next.js product launches.',
    }),
  ],
};

const starterProIncludes = [
  'Full Starter Pro source code',
  'Production-ready Next.js App Router architecture',
  'Strict TypeScript setup',
  'Tailwind CSS foundation',

  'Installable PWA foundations',
  'Standalone mode + offline fallback page',

  'Email and password authentication',
  'Google and GitHub OAuth',
  'Email verification and reset password',
  'Session management and protected routes',
  'Secure Stripe Checkout integration',
  'Billing portal flow',
  'Subscription lifecycle handling',
  'Purchase recovery flow',
  'Download delivery foundations',
  'Invoices and billing history UI',
  'Webhook synchronization with Prisma',
  'Dashboard, settings, billing, and admin surfaces',
  'Plan gating and feature access control',
  'Protected app architecture',
  'Prisma schema + PostgreSQL setup',
  'Zod validation and React Hook Form integration',
  'Environment configuration ready',
  'Commercial usage rights',
] as const;

const comparisonRows = [
  {
    feature: 'Focused marketing page',
    template: 'Included',
    free: 'No',
    pro: 'No',
  },
  {
    feature: 'Product-shaped SaaS UI',
    template: 'Landing only',
    free: 'Included',
    pro: 'Included',
  },
  {
    feature: 'Dashboard, settings, billing screens',
    template: 'No',
    free: 'Included',
    pro: 'Included + production wiring',
  },
  {
    feature: 'Auth screens and UX',
    template: 'No',
    free: 'Included',
    pro: 'Included + real auth',
  },
  {
    feature: 'Email/password auth',
    template: 'No',
    free: 'Mock/demo only',
    pro: 'Included',
  },
  {
    feature: 'Google and GitHub OAuth',
    template: 'No',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Protected routes and sessions',
    template: 'No',
    free: 'Partial',
    pro: 'Included',
  },
  {
    feature: 'Stripe Checkout',
    template: 'No',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Billing portal',
    template: 'No',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Webhooks + Prisma sync',
    template: 'No',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Database foundation',
    template: 'No',
    free: 'No',
    pro: 'Prisma + PostgreSQL',
  },
  {
    feature: 'Commercial usage',
    template: 'Included',
    free: 'Review license',
    pro: 'Included',
  },
  {
    feature: 'Best for',
    template: 'Launching a polished landing page',
    free: 'Exploring and validating UX',
    pro: 'Launching and charging faster',
  },
  {
    feature: 'PWA-ready app experience',
    template: 'No',
    free: 'Basic',
    pro: 'Included',
  },
] as const;

const trustItems = [
  {
    icon: Code2,
    title: 'Production-shaped architecture',
    description:
      'Built around real SaaS flows: protected app structure, account surfaces, billing states, purchase recovery, and scalable foundations.',
  },
  {
    icon: CreditCard,
    title: 'Stripe billing included',
    description:
      'Secure checkout, billing portal, invoices, subscription lifecycle, webhook synchronization, and purchase recovery are part of the paid foundation.',
  },
  {
    icon: Lock,
    title: 'Real authentication flows',
    description:
      'Email/password, OAuth, verification, password reset, sessions, and protected routes are already wired.',
  },
  {
    icon: GitBranch,
    title: 'Actively maintained',
    description:
      'PyColors ships with public releases, mirror repositories, changelog updates, roadmap direction, and documentation-first product thinking.',
  },
] as const;

const stackItems = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Prisma',
  'PostgreSQL',
  'Stripe',
  'Vercel',
] as const;

const faqs = [
  {
    question: 'Should I buy NA-AI Landing or Starter Pro?',
    answer:
      'Choose NA-AI Landing when you need a polished frontend marketing page. Choose Starter Pro when you need real authentication, Stripe billing, protected routes, database foundations, and SaaS app wiring.',
  },
  {
    question: 'Is NA-AI Landing a full SaaS app?',
    answer:
      'No. NA-AI Landing is a frontend marketing template. It focuses on the public landing page, not authentication, billing, database, or backend logic.',
  },
  {
    question: 'Is Starter Pro production-ready?',
    answer:
      'Yes. Starter Pro is designed as a real SaaS foundation with authentication, secure Stripe checkout, protected app architecture, database foundations, purchase recovery, and commercial product surfaces already wired.',
  },
  {
    question:
      'Why should I buy Starter Pro instead of building it myself?',
    answer: (
      <>
        Because auth, billing, protected routes, account flows,
        webhook synchronization, and delivery/recovery flows are
        repeated work that can delay launch. Starter Pro helps you skip
        that foundation work and focus on your product. For the longer
        version, read the{' '}
        <Link
          href={INTERNAL.buildVsBuy}
          className="font-medium text-foreground underline underline-offset-4"
        >
          build vs buy comparison
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Can I use PyColors products for commercial projects?',
    answer:
      'Yes. Paid PyColors products include commercial usage rights. You should still review the license and terms before using them in production.',
  },
  {
    question: 'How do I receive access after purchase?',
    answer:
      'After checkout completes, PyColors sends access to the email used during purchase. The checkout success page also guides you through the next steps.',
  },
  {
    question: 'What if I do not receive the access email?',
    answer:
      'Use the purchase recovery page with the same email address used at checkout. PyColors can resend the access link for eligible orders.',
  },
  {
    question: 'Do I get future Starter Pro updates?',
    answer:
      'Yes. Your one-time Starter Pro purchase includes future product releases. Major changes follow semantic versioning, with release notes in the changelog and docs.',
  },
  {
    question: 'What support is included with Starter Pro?',
    answer:
      'Starter Pro includes email support for purchase access, setup questions, and product scope. It is not unlimited custom development or consulting.',
  },
  {
    question: 'What if Starter Pro setup fails locally?',
    answer:
      'Start with Getting Started and the environment variable docs. Check Node.js version, dependencies, database connection, and Stripe test keys first. Email support can help with eligible setup issues.',
  },
  {
    question: 'What is the refund policy?',
    answer:
      'PyColors paid products are digital goods with immediate access after checkout. Refunds may be limited unless required by applicable law. Review the terms before purchase.',
  },
  {
    question: `Will the Starter Pro price stay at ${PRICING.starterProLaunch}?`,
    answer:
      `No. ${PRICING.starterProLaunch} is the current launch price. The regular price is planned at ${PRICING.starterProRegular} as the product matures and more production features are added.`,
  },
] as const;

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
}: {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly action?: React.ReactNode;
  readonly align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mb-8 space-y-3',
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="rounded-[5px] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2 className="text-balance font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {align === 'left' && action ? (
        <div className="shrink-0">{action}</div>
      ) : null}
    </div>
  );
}

function CheckItem({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
      <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface">
        <Check className="h-3 w-3 text-foreground" />
      </span>
      <span className="leading-6">{children}</span>
    </li>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardHeader className="space-y-4">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>

        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function FaqCard({
  question,
  answer,
}: {
  readonly question: string;
  readonly answer: React.ReactNode;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">
          {question}
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          {answer}
        </p>
      </div>
    </Card>
  );
}

export default function PricingPage() {
  return (
    <Container className="py-18">
      <JsonLd id="pricing-products-jsonld" data={pricingJsonLd} />
      <div className="mx-auto max-w-6xl">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Pricing',
              variant: 'secondary',
            },
            {
              label: `NA-AI Landing ${PRICING.naAiLanding}`,
              variant: 'outline',
              icon: (
                <LayoutTemplate
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: `Starter Pro ${PRICING.starterProLaunch}`,
              variant: 'outline',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
          ]}
          title="Choose the right PyColors product for your launch."
          subtitle="Start with a template, validate with Starter Free, or buy Starter Pro when the SaaS foundation should already be wired."
          description="PyColors gives you a simple product ladder: focused templates for fast marketing pages, Starter Free for product-surface validation, and Starter Pro for real authentication, Stripe billing, protected routes, and production-ready SaaS foundations."
          actions={
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <BuyProductButton
                productSlug="na-ai-landing"
                label={`Buy NA-AI Landing — ${PRICING.naAiLanding}`}
                fullWidth={false}
                variant="outline"
              />

              <BuyStarterProButton
                label={`Buy Starter Pro — ${PRICING.starterProLaunch}`}
              />

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href={INTERNAL.starterFree}>
                  Explore Starter Free
                </Link>
              </Button>
            </div>
          }
          pills={[
            'One-time payment',
            'Instant access',
            'Commercial usage',
            'PWA-ready',
            'Built for real launches',
          ]}
          extraClassName="mx-auto max-w-6xl"
          extra={
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="rounded-[5px] text-[11px]"
                    >
                      Fast launch
                    </Badge>

                    <h2 className="mt-4 text-lg font-semibold tracking-tight">
                      NA-AI Landing
                    </h2>

                    <div className="mt-2 text-3xl font-semibold tracking-tight">
                      {PRICING.naAiLanding}
                    </div>
                  </div>

                  <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  A premium AI/SaaS landing page template for
                  launching and validating your offer quickly.
                </p>

                <ul className="mt-5 space-y-2">
                  <CheckItem>Full source code</CheckItem>
                  <CheckItem>Commercial usage</CheckItem>
                  <CheckItem>SEO-ready frontend page</CheckItem>
                </ul>

                <div className="mt-6 grid gap-2">
                  <BuyProductButton
                    productSlug="na-ai-landing"
                    label={`Buy NA-AI Landing — ${PRICING.naAiLanding}`}
                    size="sm"
                    fullWidth
                    className="h-10"
                  />

                  <Button
                    asChild
                    variant="outline"
                    className="h-10 w-full rounded-[5px] text-sm font-medium"
                  >
                    <Link href={INTERNAL.templateNaAi}>
                      View details
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="rounded-[5px] text-[11px]"
                    >
                      Validate first
                    </Badge>

                    <h2 className="mt-4 text-lg font-semibold tracking-tight">
                      Starter Free
                    </h2>

                    <div className="mt-2 text-3xl font-semibold tracking-tight">
                      {PRICING.starterFree}
                    </div>
                  </div>

                  <Zap className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Explore product surfaces, dashboards, settings, and
                  SaaS UX before committing to production wiring.
                </p>

                <ul className="mt-5 space-y-2">
                  <CheckItem>Frontend-first SaaS surface</CheckItem>
                  <CheckItem>Mocked app flows</CheckItem>
                  <CheckItem>Good for validation</CheckItem>
                </ul>

                <Button
                  asChild
                  variant="outline"
                  className="mt-6 h-10 w-full rounded-[5px] text-sm font-medium"
                >
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>
              </Card>

              <Card className="relative overflow-hidden rounded-[5px] border border-pro-border bg-pro-surface p-6 shadow-medium">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="rounded-[5px] text-[11px]">
                        Best launch path
                      </Badge>
                    </div>

                    <h2 className="mt-4 text-lg font-semibold tracking-tight">
                      Starter Pro
                    </h2>

                    <div className="mt-2 flex items-end gap-3">
                      <span className="text-4xl font-semibold tracking-tight">
                        {PRICING.starterProLaunch}
                      </span>

                      <span className="pb-1 text-sm text-muted-foreground">
                        <span className="mr-2 line-through">
                          {PRICING.starterProRegular}
                        </span>
                        launch
                      </span>
                    </div>
                  </div>

                  <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Stop rebuilding authentication, Stripe billing,
                  protected routes, and SaaS account foundations from
                  scratch.
                </p>

                <ul className="mt-5 grid gap-2">
                  <CheckItem>Real authentication</CheckItem>
                  <CheckItem>Stripe billing</CheckItem>
                  <CheckItem>Protected app architecture</CheckItem>
                </ul>

                <div className="mt-6 grid gap-2">
                  <BuyStarterProButton
                    fullWidth
                    label={`Buy Starter Pro — ${PRICING.starterProLaunch}`}
                  />

                  <Button
                    asChild
                    variant="outline"
                    className="h-10 w-full rounded-[5px] text-sm font-medium"
                  >
                    <Link href={INTERNAL.starterPro}>
                      Explore Starter Pro
                    </Link>
                  </Button>

                  <p className="text-center text-xs leading-6 text-muted-foreground">
                    Not sure yet? Read the{' '}
                    <Link
                      href={INTERNAL.buildVsBuy}
                      className="font-medium text-foreground underline underline-offset-4"
                    >
                      build vs buy comparison
                    </Link>
                    .
                  </p>
                </div>
              </Card>
            </div>
          }
        />

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Trust"
            title="Built to feel like a serious SaaS foundation, not another UI kit."
            description="When there are no testimonials yet, trust comes from clarity: real scope, real architecture, real billing flows, active maintenance, and visible product thinking."
            align="center"
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          <Card className="mt-6 rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Built with the stack developers already trust
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Modern SaaS foundations using familiar production
                  tools.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {stackItems.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Decision"
            title="Choose by stage, not by feature count."
            description="Templates launch the offer. Starter Free validates the SaaS surface. Starter Pro wires the business layer when you are ready to charge."
            align="center"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={LayoutTemplate}
              title="Use templates to launch"
              description="Choose a template when you need a polished landing page, clear offer, and fast path to a public launch."
            />

            <FeatureCard
              icon={Zap}
              title="Use Free to validate"
              description="Choose Starter Free when you are still exploring product shape, layout, UX direction, and SaaS patterns."
            />

            <FeatureCard
              icon={Rocket}
              title="Use Pro to charge faster"
              description="Choose Starter Pro when auth, billing, sessions, protected routes, and database foundations become the bottleneck."
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Starter Pro"
            title="What you are actually buying"
            description="A pricing page should make the value obvious. Starter Pro is not just screens. It is the SaaS foundation behind the screens."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href={INTERNAL.docsStarterPro}>
                  Read Starter Pro docs
                </Link>
              </Button>
            }
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
              <div className="space-y-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-[5px] text-[11px]">
                      Paid foundation
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-[5px] text-[11px]"
                    >
                      Launch price {PRICING.starterProLaunch}
                    </Badge>
                  </div>

                  <h3 className="mt-4 font-brand text-2xl font-semibold tracking-tight">
                    The business layer developers keep rebuilding
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                    Authentication, billing, protected app structure,
                    database foundations, account flows, and SaaS UI
                    surfaces are already shaped so your next work can
                    be product-specific.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Included in Starter Pro
                  </p>

                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {starterProIncludes.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-[5px] border border-pro-border bg-pro-surface p-6 shadow-medium">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <CardHeader className="space-y-5 px-0 pt-0">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold tracking-tight">
                      Buy Starter Pro
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      The faster path from validated surface to
                      monetizable SaaS.
                    </p>
                  </div>

                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex items-end gap-3">
                  <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {PRICING.starterProLaunch}
                  </span>

                  <div className="pb-1 text-sm text-muted-foreground">
                    <span className="mr-2 line-through">
                      {PRICING.starterProRegular}
                    </span>
                    one-time
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-0 pb-0">
                <div className="grid gap-4">
                  <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-medium">Best for</p>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Indie hackers, freelancers, product engineers,
                      and technical founders who want to stop
                      rebuilding the same SaaS foundation before
                      charging customers.
                    </p>
                  </div>

                  <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-medium">
                      Why it is worth paying for
                    </p>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      The cost is lower than the time usually spent
                      wiring auth, billing, protected flows, Stripe
                      webhooks, recovery flows, account pages, and
                      database synchronization from scratch.
                    </p>
                  </div>

                  <div className="rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted p-4">
                    <p className="text-sm leading-7 text-muted-foreground">
                      Current launch price:{' '}
                      <span className="font-medium text-foreground">
                        {PRICING.starterProLaunch}
                      </span>
                      . Regular price planned at{' '}
                      <span className="font-medium text-foreground">
                        {PRICING.starterProRegular}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <BuyStarterProButton
                    label={`Buy Starter Pro — ${PRICING.starterProLaunch}`}
                  />

                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'h-10 rounded-[5px] text-sm font-medium',
                      focusRing,
                    )}
                  >
                    <Link href={INTERNAL.docsBilling}>
                      Review billing docs
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Comparison"
            title="Templates launch the page. Free validates the product. Pro wires the business."
            description="Make the decision simple: choose the product that matches your current bottleneck."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href={INTERNAL.docsBackend}>
                  Explore backend docs
                </Link>
              </Button>
            }
          />

          <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface p-2 shadow-soft sm:p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[34%]">Feature</TableHead>
                  <TableHead className="w-[22%]">
                    NA-AI Landing
                  </TableHead>
                  <TableHead className="w-[22%]">
                    Starter Free
                  </TableHead>
                  <TableHead className="w-[22%]">
                    Starter Pro
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium">
                      {row.feature}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {row.template}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {row.free}
                    </TableCell>

                    <TableCell className="font-medium text-foreground">
                      {row.pro}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="mt-8 flex flex-col items-center gap-3">
            <BuyStarterProButton
              fullWidth={false}
              label={`Move to Starter Pro — ${PRICING.starterProLaunch}`}
            />

            <p className="text-center text-xs text-muted-foreground">
              Choose Pro when the cost of rebuilding the foundation is
              higher than the price of skipping it.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Proof of seriousness"
            title="A maintained product ecosystem, not a one-off template."
            description="For early buyers, trust comes from product discipline: docs, changelog, roadmap, clear scope, and an active ecosystem."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={ShieldCheck}
              title="Clear product scope"
              description="PyColors explains what is included, what is wired, and where each product stops so you can make a clean buying decision."
            />

            <FeatureCard
              icon={Database}
              title="Real SaaS infrastructure"
              description="Starter Pro includes database, billing, protected app structure, and lifecycle flows instead of only static screens."
            />

            <FeatureCard
              icon={Mail}
              title="Documentation-first"
              description="Docs, release notes, and implementation guidance are part of the product experience, not an afterthought."
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className={cn(
                'h-10 rounded-[5px] text-sm font-medium',
                focusRing,
              )}
            >
              <Link href={INTERNAL.changelog}>View changelog</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className={cn(
                'h-10 rounded-[5px] text-sm font-medium',
                focusRing,
              )}
            >
              <Link href={INTERNAL.roadmap}>View roadmap</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="FAQ"
            title="Remove the objections before the checkout click."
            description="The job of pricing is not only to show a number. It should make the decision feel safe, clear, and obvious."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {faqs.map((faq) => (
              <FaqCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>

        <section className="pt-4">
          <Card className="relative overflow-hidden rounded-[5px] border border-pro-border-subtle bg-pro-surface px-6 py-8 shadow-medium sm:px-8 sm:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-pro-border bg-pro-surface-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Final decision
                </Badge>

                <h2 className="text-balance font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
                  Launch the page. Validate the surface. Wire the
                  business when it matters.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Use NA-AI Landing for a polished marketing page,
                  Starter Free to explore the product surface, and
                  Starter Pro when auth, billing, protected routes,
                  and the SaaS business layer should already be
                  handled.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>NA-AI Landing {PRICING.naAiLanding}</Pill>
                  <Pill>Starter Pro {PRICING.starterProLaunch}</Pill>
                  <Pill>One-time payment</Pill>
                  <Pill>Instant access</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-65">
                <BuyStarterProButton
                  label={`Buy Starter Pro — ${PRICING.starterProLaunch}`}
                />

                <BuyProductButton
                  productSlug="na-ai-landing"
                  label={`Buy NA-AI Landing — ${PRICING.naAiLanding}`}
                  variant="outline"
                  fullWidth
                />
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Legal scope and usage terms are governed by{' '}
            <Link
              href={INTERNAL.license}
              className="underline underline-offset-4"
            >
              /license
            </Link>{' '}
            and{' '}
            <Link
              href={INTERNAL.terms}
              className="underline underline-offset-4"
            >
              /terms
            </Link>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}

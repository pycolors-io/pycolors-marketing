import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
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
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
} from '@pycolors/ui';
import { PRODUCT_DISPLAY } from '@/lib/products/public-catalog';

import { Container } from '@/components/container';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';
import {
  JsonLd,
  generateProductOfferJsonLd,
} from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter with Auth & Billing',
  description:
    'Production-ready Next.js SaaS starter with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, OAuth, and launch-ready SaaS architecture already wired.',
  alternates: {
    canonical: '/starters/pro',
  },

  openGraph: {
    title: 'Next.js SaaS Starter with Auth & Billing — PyColors',
    description:
      'Launch a real SaaS faster with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, OAuth, and production-ready foundations already wired.',
    url: '/starters/pro',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Starter with Auth & Billing — PyColors',
    description:
      'Production-ready SaaS starter built for modern Next.js applications and faster product launches.',
    images: ['/seo/twitter-main.png'],
  },
};

const launchPrice = PRODUCT_DISPLAY['starter-pro'].priceLabel;
const regularPrice = PRODUCT_DISPLAY['starter-pro'].regularPriceLabel;

const starterProJsonLd = generateProductOfferJsonLd({
  product: PRODUCT_DISPLAY['starter-pro'],
  canonicalPath: '/starters/pro',
  description:
    'Production-ready Next.js SaaS starter with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, and launch-ready SaaS architecture.',
});

const INTERNAL = {
  buildVsBuy: '/compare/build-vs-buy',
  pricing: '/pricing',
  starterFree: '/starters/free',
  docsStarterPro: '/docs/starter-pro',
  docsGettingStarted: '/docs/starter-pro/getting-started',
  docsWhatIsIncluded: '/docs/starter-pro/what-is-included',
  docsDelivery: '/docs/starter-pro/delivery',
  docsBillingTesting: '/docs/starter-pro/billing-testing',
  docsProductionChecklist: '/docs/starter-pro/production-checklist',
  docsAuth: '/docs/starter-pro/auth',
  docsBilling: '/docs/starter-pro/billing',
  docsBackend: '/docs/starter-pro/backend',
  ordersRecover: '/orders/recover',
  docsPwa: '/docs/starter-pro/pwa',
  docsPwaSetup: '/docs/starter-pro/pwa-setup',
  docsPwaChecklist: '/docs/starter-pro/pwa-production-checklist',
  changelog: '/changelog',
  roadmap: '/roadmap',
  license: '/license',
  terms: '/terms',
} as const;

const EXTERNAL = {
  starterDemo: 'https://starter-demo.pycolors.io',
} as const;

const coreFeatures = [
  {
    title: 'Real authentication already wired',
    description:
      'Email/password auth, Google and GitHub OAuth, email verification, password reset, sessions, protected routes, and account foundations are already included.',
    icon: Lock,
  },
  {
    title: 'Stripe billing already integrated',
    description:
      'Secure Stripe checkout, billing portal, invoices, webhook synchronization, subscription lifecycle handling, and billing-aware UI states are part of the foundation.',
    icon: CreditCard,
  },
  {
    title: 'Protected SaaS app architecture',
    description:
      'Protected routes, account areas, settings, billing flows, app shell, and scalable product structure are shaped for a real SaaS product.',
    icon: LayoutDashboard,
  },
  {
    title: 'PWA-ready app experience',
    description:
      'Manifest, standalone mode, professional icons, dashboard screenshots, mobile-safe viewport handling, and offline fallback foundations are included to make the product feel more mature.',
    icon: Smartphone,
  },
  {
    title: 'Built to reduce launch friction',
    description:
      'Starter Pro removes repeated foundation work across auth, billing, Prisma, delivery, and protected app structure so you can focus on product logic, onboarding, customers, and growth.',
    icon: Rocket,
  },
  {
    title: 'Built for long-term SaaS evolution',
    description:
      'Starter Pro is structured to support real product growth with reusable patterns, typed boundaries, scalable routing, protected surfaces, and maintainable architecture.',
    icon: GitBranch,
  },
] as const;

const trustItems = [
  {
    title: 'Production-shaped scope',
    description:
      'Focused on the expensive SaaS wiring behind the UI: auth, billing, database, protected flows, purchase recovery, and account structure.',
    icon: Code2,
  },
  {
    title: 'Production-minded engineering',
    description:
      'Typed foundations, reusable patterns, maintainable architecture, and production-oriented decisions backed by CI and focused tests.',
    icon: ShieldCheck,
  },
  {
    title: 'Documentation-first',
    description:
      'Starter Pro is supported by implementation docs so buyers understand what is included, how commerce works, and how to extend it.',
    icon: Mail,
  },
  {
    title: 'PWA-ready without risky caching',
    description:
      'The PWA layer improves installability and mobile perception while keeping auth, billing, and admin data online-first.',
    icon: WifiOff,
  },
  {
    title: 'App-quality product polish',
    description:
      'Responsive layouts, standalone-ready PWA foundations, mobile-safe surfaces, loading states, empty states, and production-shaped UX patterns.',
    icon: Smartphone,
  },
  {
    title: 'Actively maintained',
    description:
      'PyColors ships with changelog updates, public mirrors, roadmap direction, and a long-term ecosystem vision.',
    icon: GitBranch,
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
  'PWA',
] as const;

const includedChecklist = [
  'Full Starter Pro source code',
  'Production-ready Next.js App Router architecture',
  'Strict TypeScript setup',
  'Tailwind CSS foundation',
  'Email/password authentication',
  'Google and GitHub OAuth',
  'Email verification',
  'Reset password flow',
  'Session management',
  'Protected routes',
  'Secure Stripe Checkout integration',
  'Stripe billing portal',
  'Invoices and billing history UI',
  'Webhook synchronization with Prisma',
  'Subscription lifecycle handling',
  'Purchase recovery flow',
  'Download delivery foundations',
  'Dashboard, settings, billing, and admin surfaces',
  'Plan gating and feature access control',
  'Installable PWA foundation',
  'Standalone mode and manifest setup',
  'Professional PWA icons and screenshots',
  'Offline fallback route',
  'Prisma schema and PostgreSQL setup',
  'Zod validation and React Hook Form integration',
  'Environment configuration foundations',
  'Commercial usage rights',
] as const;

const postPurchaseDeliverables = [
  'Starter Pro ZIP',
  'Full source code',
  'Next.js App Router',
  'TypeScript',
  'Tailwind CSS',
  'Authentication',
  'Stripe Billing',
  'Organizations',
  'Documentation',
  'Production Checklist',
  'Commercial License',
  'Future updates',
] as const;

const first30MinutesSteps = [
  {
    step: '01',
    title: 'Receive claim email',
    description:
      'Your claim email arrives at your payment email with your access link. Missing it? Use purchase recovery to resend your access link.',
  },
  {
    step: '02',
    title: 'Download source code',
    description:
      'Open the access link in your claim email, download the package, and unzip it before setup.',
  },
  {
    step: '03',
    title: 'Install dependencies',
    description:
      'Follow Getting Started to install packages and configure local environment variables.',
  },
  {
    step: '04',
    title: 'Run locally',
    description:
      'Start the app, connect PostgreSQL, and confirm auth and billing foundations load.',
  },
  {
    step: '05',
    title: 'Start building',
    description:
      'Replace demo product logic with your own onboarding, pricing, and customer flows.',
  },
] as const;

const docResourceCards = [
  {
    title: 'Getting Started',
    description:
      'Install Starter Pro, configure the environment, and run the project locally.',
    href: INTERNAL.docsGettingStarted,
    cta: 'Read guide',
    icon: Rocket,
  },
  {
    title: 'What is Included',
    description:
      'See what is already wired, what is mocked, and what you still build yourself.',
    href: INTERNAL.docsWhatIsIncluded,
    cta: 'Review scope',
    icon: FileText,
  },
  {
    title: 'Delivery',
    description:
      'Understand secure access, download flow, and what happens after checkout.',
    href: INTERNAL.docsDelivery,
    cta: 'Read delivery docs',
    icon: Download,
  },
  {
    title: 'Billing Testing',
    description:
      'Validate Stripe Checkout, webhooks, and subscription flows before launch.',
    href: INTERNAL.docsBillingTesting,
    cta: 'Test billing',
    icon: CreditCard,
  },
  {
    title: 'Production Checklist',
    description:
      'Confirm auth, billing, backend, and release readiness before going live.',
    href: INTERNAL.docsProductionChecklist,
    cta: 'Open checklist',
    icon: ShieldCheck,
  },
] as const;

const comparisonRows = [
  {
    label: 'Product surface',
    free: 'Included',
    pro: 'Production-ready',
  },
  {
    label: 'Dashboard foundation',
    free: 'Included',
    pro: 'Ready after checkout',
  },
  {
    label: 'Authentication',
    free: 'Included',
    pro: 'Production-ready',
  },
  {
    label: 'Protected app access',
    free: 'Requires building',
    pro: 'Ready after checkout',
  },
  {
    label: 'Stripe Billing',
    free: 'Requires building',
    pro: 'Production-ready',
  },
  {
    label: 'Customer portal',
    free: 'Requires building',
    pro: 'Included',
  },
  {
    label: 'Organizations',
    free: 'Example surface',
    pro: 'Included foundation',
  },
  {
    label: 'Settings and account management',
    free: 'Included',
    pro: 'Production-ready',
  },
  {
    label: 'Mobile / PWA polish',
    free: 'Requires building',
    pro: 'Included',
  },
  {
    label: 'Delivery after purchase',
    free: 'Open-source repo',
    pro: 'Instant ZIP delivery',
  },
  {
    label: 'Commercial usage',
    free: 'Review license',
    pro: 'Included',
  },
  {
    label: 'Best use case',
    free: 'Validate UX',
    pro: 'Launch and charge',
  },
] as const;

const purchaseTrustItems = [
  'One-time payment',
  'Secure Stripe checkout',
  'Instant ZIP delivery',
  'Future updates',
  'Purchase recovery',
] as const;

const faqs = [
  {
    question: 'What do I get after purchase?',
    answer:
      'You receive the full Starter Pro source code with authentication, Stripe billing, protected app flows, Prisma foundations, and launch-ready SaaS surfaces already wired.',
  },
  {
    question: 'Is Starter Pro production-ready?',
    answer:
      'Yes. Starter Pro is designed as a real SaaS foundation, not a static UI demo. You still need to add your own product logic, but the repeated business layer is already shaped.',
  },
  {
    question: 'Is Stripe already integrated?',
    answer:
      'Yes. Stripe Checkout, billing portal, invoices, webhook synchronization, and subscription lifecycle flows are included.',
  },
  {
    question: 'Can I use it commercially?',
    answer:
      'Yes. Starter Pro includes commercial usage rights. Review the license and terms before production use.',
  },
  {
    question: 'Does Starter Pro include PWA support?',
    answer:
      'Yes. Starter Pro includes a PWA-ready foundation with manifest metadata, standalone mode, professional icons, install screenshots, service worker registration, and an offline fallback route. Auth, billing, and admin data intentionally remain online-first.',
  },
  {
    question: 'Why buy Starter Pro instead of using Starter Free?',
    answer:
      'Starter Free helps you validate product shape. Starter Pro removes the auth, billing, database, and protected architecture bottlenecks that slow real SaaS launches.',
  },
  {
    question: 'Do I get future Starter Pro updates?',
    answer:
      'Yes. Your one-time purchase includes future Starter Pro releases. Major changes follow semantic versioning, with release notes in the changelog and Starter Pro docs.',
  },
  {
    question: 'What support is included?',
    answer:
      'Starter Pro includes email support for purchase access, setup questions, and product scope. It is not unlimited custom development or consulting.',
  },
  {
    question: 'What if local setup fails?',
    answer:
      'Start with Getting Started and the environment variable docs. Check Node.js version, dependencies, database connection, and Stripe test keys first. Email support can help with eligible setup issues.',
  },
  {
    question: 'What if I do not receive my purchase email?',
    answer:
      'Use the purchase recovery page with the same email address used at checkout. PyColors can resend the secure access link for eligible orders.',
  },
  {
    question: 'What is the refund policy?',
    answer:
      'Starter Pro is a digital product with immediate access after checkout. Refunds may be limited unless required by applicable law. Review the terms before purchase.',
  },
  // {
  //   question: 'Will the price stay at 199 €?',
  //   answer:
  //     'No. 199 € is the current launch price. The regular price is planned at 299 € as Starter Pro matures and more production features are added.',
  // },
] as const;
function StarterProHeroCarousel() {
  const heroScreenshots = [
    {
      title: 'Authentication',
      label: 'Authentication',
      description: 'Production-ready authentication already wired.',
      image: '/images/starters/pro/auth-pycolors.png',
    },
    {
      title: 'Stripe Billing',
      label: 'Stripe Billing',
      description: 'Subscriptions and customer portal included.',
      image: '/images/starters/pro/billing-pycolors.png',
    },
    {
      title: 'Pricing and Organizations',
      label: 'Organizations',
      description: 'Multi-tenant and plan-aware product structure.',
      image: '/images/starters/pro/pricing-pycolors.png',
    },
    {
      title: 'Mobile / PWA',
      label: 'Mobile / PWA',
      description: 'Installable app polish for a more credible SaaS.',
      // image: '/images/starters/pro/pwa-mobile-pycolors.png',
      image: '/images/starters/pro/pwa-pycolors.png',
    },
  ] as const;

  return (
    <section className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="group overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium">
          <div className="flex items-center justify-between border-b border-border-subtle bg-surface-muted/80 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="text-xs font-medium text-foreground">
                Starter Pro
              </span>
            </div>

            <div className="absolute left-1/2 hidden -translate-x-1/2 sm:block">
              <div className="overflow-hidden rounded-full border border-border-subtle bg-background/70 px-5 py-1.5">
                <div className="relative h-4 w-[220px]">
                  {heroScreenshots.map((screenshot, index) => (
                    <span
                      key={screenshot.title}
                      className="absolute inset-0 flex animate-hero-label items-center justify-center opacity-0 whitespace-nowrap text-center text-[10px] font-medium tracking-wide text-muted-foreground"
                      style={{ animationDelay: `${index * 5}s` }}
                    >
                      {screenshot.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-green-500/70" />

              <span className="text-[11px] text-muted-foreground">
                Production-ready
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/10] min-h-[320px] overflow-hidden bg-background sm:min-h-[420px] lg:min-h-[520px] xl:min-h-[600px]">
            {heroScreenshots.map((screenshot, index) => (
              <div
                key={screenshot.title}
                className="absolute inset-0 animate-hero-fade opacity-0"
                style={{ animationDelay: `${index * 5}s` }}
              >
                <Image
                  src={screenshot.image}
                  alt={`${screenshot.title} Starter Pro preview`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover object-top"
                />

                <div className="absolute left-4 bottom-4 z-10 max-w-xs rounded-[5px] border border-border-subtle bg-background/85 px-4 py-3 shadow-soft backdrop-blur-md sm:left-5 sm:bottom-5">
                  <p className="text-sm font-medium text-foreground">
                    {screenshot.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/35 to-transparent" />

            <div className="absolute bottom-4 right-4 z-20 hidden items-center gap-1.5 rounded-full border border-border-subtle bg-background/70 px-2.5 py-2 backdrop-blur-md sm:flex">
              {heroScreenshots.map((screenshot, index) => (
                <span
                  key={screenshot.title}
                  className="relative h-1.5 w-6 overflow-hidden rounded-full bg-muted"
                >
                  <span
                    className="absolute inset-y-0 left-0 animate-carousel-progress rounded-full bg-foreground/70"
                    style={{ animationDelay: `${index * 5}s` }}
                  />
                </span>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: 'center' | 'left';
}) {
  return (
    <div
      className={cn(
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl text-left',
      )}
    >
      {eyebrow ? (
        <Badge
          variant="outline"
          className="rounded-[5px] border-border-subtle bg-surface-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
        >
          {eyebrow}
        </Badge>
      ) : null}

      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
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
    <li className="flex items-start gap-3 text-sm text-muted-foreground">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface">
        <Check className="h-3.5 w-3.5 text-foreground" />
      </span>
      <span className="leading-6">{children}</span>
    </li>
  );
}

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
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
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardHeader className="space-y-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>

        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
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
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">
              {title}
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-10 rounded-[5px] text-sm font-medium"
          >
            <Link href={href}>
              {cta}
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StarterProPage() {
  return (
    <main className="bg-background text-foreground">
      <JsonLd
        id="starter-pro-product-jsonld"
        data={starterProJsonLd}
      />
      <Container className="py-18">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Starter Pro',
              variant: 'secondary',
            },
            {
              label: `Launch price ${launchPrice}`,
              variant: 'outline',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: `${regularPrice} regular price`,
              variant: 'outline',
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
                <Link href={INTERNAL.docsStarterPro}>Read docs</Link>
              </Button>
            </div>
          }
          pills={[
            'One-time payment',
            'Instant access',
            'Commercial usage',
            'Commerce-ready',
            'PWA-ready',
          ]}
          extra={
            <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
              <CheckItem>Full source code</CheckItem>
              <CheckItem>Real auth wired</CheckItem>
              <CheckItem>Stripe billing wired</CheckItem>
              <CheckItem>Protected SaaS app</CheckItem>
              <CheckItem>PWA-ready foundation</CheckItem>
            </div>
          }
        />
      </Container>

      <StarterProHeroCarousel />
      <section className="border-t border-border-subtle">
        <Container className="py-10 lg:py-12">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="After purchase"
              title="What you receive after purchase"
              description="A tangible Starter Pro package: ZIP delivery, source code, docs, checklist, license, and future releases."
            />

            <Card className="mt-8 rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {postPurchaseDeliverables.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-10 lg:py-12">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
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
            <SectionHeading
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
            <SectionHeading
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
                  Starter Pro is not positioned as a screenshot
                  gallery. It is positioned as a shortcut to the
                  commercial SaaS layer: authentication, billing,
                  purchase recovery, protected architecture, database
                  foundations, and app-quality polish.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="h-10 shrink-0 rounded-[5px] text-sm font-medium"
                >
                  <Link href={INTERNAL.docsStarterPro}>
                    Explore the docs
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
                  <Badge variant="secondary">
                    Included in Starter Pro
                  </Badge>
                </div>

                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  A more app-like SaaS experience, without risky
                  offline shortcuts.
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Starter Pro includes manifest setup, standalone
                  mode, professional icons, install screenshots,
                  mobile-safe viewport handling, and an offline
                  fallback while keeping auth, billing, and admin data
                  online-first.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>Installable</Pill>
                  <Pill>Standalone mode</Pill>
                  <Pill>Offline fallback</Pill>
                  <Pill>Mobile-ready</Pill>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-[5px] text-sm font-medium"
                >
                  <Link href={INTERNAL.docsPwa}>Read PWA docs</Link>
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
              <SectionHeading
                align="left"
                eyebrow="What you actually get"
                title="A complete SaaS foundation you can own, modify, and launch from."
                description="Starter Pro is designed to reduce repeated implementation cost. You still build your product, but you do not start from a blank auth, billing, database, and protected app setup."
              />

              <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {includedChecklist.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
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
            <SectionHeading
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
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeading
                align="left"
                eyebrow="Free vs Pro"
                title="Starter Free validates the surface. Starter Pro wires the business."
                description="Use Free to explore product UX. Move to Pro when auth, billing, protected architecture, and database foundations become the bottleneck."
              />

              <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="px-5 py-4 font-medium">
                        Feature
                      </th>
                      <th className="px-5 py-4 font-medium">
                        Starter Free
                      </th>
                      <th className="px-5 py-4 font-medium">
                        Starter Pro
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr
                        key={row.label}
                        className={cn(
                          index !== comparisonRows.length - 1 &&
                            'border-b border-border-subtle',
                        )}
                      >
                        <td className="px-5 py-4 font-medium">
                          {row.label}
                        </td>

                        <td className="px-5 py-4 text-muted-foreground">
                          {row.free}
                        </td>

                        <td className="px-5 py-4 font-medium">
                          {row.pro}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                  Try the live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="max-w-xl text-center text-xs leading-6 text-muted-foreground">
                Choose Pro when the cost of rebuilding the foundation
                is higher than the price of skipping it. For a slower
                decision, read the{' '}
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
                    <p className="text-xl font-semibold">
                      Starter Pro
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Built for developers serious about launching.
                    </p>
                  </div>

                  <Badge className="rounded-[5px]">
                    Best launch path
                  </Badge>
                </div>

                <div className="flex items-end gap-3">
                  <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {launchPrice}
                  </span>

                  <div className="pb-1 text-sm text-muted-foreground">
                    <span className="mr-2 line-through">
                      {regularPrice}
                    </span>{' '}
                    one-time payment
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <ul className="grid gap-3 sm:grid-cols-2">
                  <CheckItem>Full Starter Pro source code</CheckItem>
                  <CheckItem>Real authentication included</CheckItem>
                  <CheckItem>Stripe billing included</CheckItem>
                  <CheckItem>
                    Protected architecture included
                  </CheckItem>
                  <CheckItem>
                    Prisma + PostgreSQL foundation
                  </CheckItem>
                  <CheckItem>Commercial usage rights</CheckItem>
                </ul>

                <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4 text-sm leading-7 text-muted-foreground">
                  Current launch price:{' '}
                  <span className="font-medium text-foreground">
                    {launchPrice}
                  </span>
                  . Regular price planned at{' '}
                  <span className="font-medium text-foreground">
                    {regularPrice}
                  </span>
                  . One-time payment with instant delivery after
                  purchase.
                </div>

                <div className="rounded-[5px] border border-border-subtle bg-background/60 p-4">
                  <div className="flex flex-wrap gap-2">
                    {purchaseTrustItems.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-[5px] border border-border-subtle bg-surface px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        <Check
                          className="h-3.5 w-3.5 text-foreground"
                          aria-hidden="true"
                        />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

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
                    <Link href={INTERNAL.docsStarterPro}>
                      Read docs
                    </Link>
                  </Button>
                </div>
              </CardContent>
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
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
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
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions buyers ask before paying"
              description="Reduce friction, increase trust, and make the decision easier before checkout."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <Card
                  key={faq.question}
                  className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                >
                  <CardContent className="p-6">
                    <h3 className="text-base font-medium">
                      {faq.question}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
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
                Start from the SaaS foundation. Spend your time on the
                product.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Buy Starter Pro when authentication, billing,
                protected routes, PWA-ready app foundations, and SaaS
                infrastructure should already be handled.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Pill>Launch price {launchPrice}</Pill>
                <Pill>One-time payment</Pill>
                <Pill>Instant access</Pill>
                <Pill>Commercial usage</Pill>
                <Pill>PWA-ready</Pill>
              </div>

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

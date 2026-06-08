import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Check,
  Code2,
  CreditCard,
  Database,
  Download,
  GitBranch,
  LayoutDashboard,
  Lock,
  Mail,
  MonitorSmartphone,
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

import { Container } from '@/components/container';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

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

const launchPrice = '199 €';
const regularPrice = '299 €';

const INTERNAL = {
  pricing: '/pricing',
  starterFree: '/starters/free',
  docsStarterPro: '/docs/starter-pro',
  docsAuth: '/docs/starter-pro/auth',
  docsBilling: '/docs/starter-pro/billing',
  docsBackend: '/docs/starter-pro/backend',
  docsPwa: '/docs/starter-pro/pwa',
  docsPwaSetup: '/docs/starter-pro/pwa-setup',
  docsPwaChecklist: '/docs/starter-pro/pwa-production-checklist',
  changelog: '/changelog',
  roadmap: '/roadmap',
  license: '/license',
  terms: '/terms',
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
      'Checkout, billing portal, invoices, webhook synchronization, subscription lifecycle handling, and billing-aware UI states are part of the foundation.',
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
      'Starter Pro removes repeated foundation work so you can focus on product logic, onboarding, positioning, customers, and growth.',
    icon: Rocket,
  },
  {
    title: 'Built for long-term SaaS evolution',
    description:
      'Starter Pro is structured to support real product growth with reusable patterns, typed boundaries, scalable routing, protected surfaces, and maintainable architecture.',
    icon: GitBranch,
  },
] as const;

const includedItems = [
  {
    title: 'Full Starter Pro source code',
    description:
      'Get the complete codebase and adapt it to your own commercial SaaS product.',
    icon: Download,
  },
  {
    title: 'Auth foundation',
    description:
      'Real authentication flows with providers, protected sessions, verification, and recovery flows.',
    icon: ShieldCheck,
  },
  {
    title: 'Billing foundation',
    description:
      'Stripe Checkout, portal, invoices, lifecycle logic, and webhook synchronization.',
    icon: CreditCard,
  },
  {
    title: 'Database foundation',
    description:
      'Prisma and PostgreSQL foundations ready for real product data and SaaS growth.',
    icon: Database,
  },
  {
    title: 'PWA foundation',
    description:
      'Installable app metadata, icons, screenshots, standalone behavior, and offline-ready routing.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Production-oriented architecture',
    description:
      'Structured routing, reusable SaaS patterns, typed server boundaries, and maintainable foundations designed for serious products.',
    icon: ShieldCheck,
  },
] as const;

const trustItems = [
  {
    title: 'Production-shaped scope',
    description:
      'Focused on the expensive SaaS wiring behind the UI: auth, billing, database, protected flows, and account structure.',
    icon: Code2,
  },
  {
    title: 'Production-minded engineering',
    description:
      'Typed foundations, reusable patterns, maintainable architecture, and production-oriented decisions designed to reduce long-term technical debt.',
    icon: ShieldCheck,
  },
  {
    title: 'Documentation-first',
    description:
      'Starter Pro is supported by implementation docs so buyers understand what is included and how to extend it.',
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
      'PyColors ships with changelog updates, roadmap direction, and a long-term ecosystem vision.',
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
  'Stripe Checkout integration',
  'Stripe billing portal',
  'Invoices and billing history UI',
  'Webhook synchronization with Prisma',
  'Subscription lifecycle handling',
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

const comparisonRows = [
  {
    label: 'Product-shaped SaaS UI',
    free: 'Included',
    pro: 'Included',
  },
  {
    label: 'Dashboard, settings, billing screens',
    free: 'Included',
    pro: 'Included + production wiring',
  },
  {
    label: 'Auth UX screens',
    free: 'Included',
    pro: 'Included + real auth',
  },
  {
    label: 'Email/password auth',
    free: 'Mock/demo only',
    pro: 'Included',
  },
  {
    label: 'OAuth providers',
    free: 'No',
    pro: 'Google + GitHub',
  },
  {
    label: 'Protected routes and sessions',
    free: 'Partial',
    pro: 'Included',
  },
  {
    label: 'Stripe Checkout',
    free: 'No',
    pro: 'Included',
  },
  {
    label: 'Billing portal',
    free: 'No',
    pro: 'Included',
  },
  {
    label: 'Webhook sync',
    free: 'No',
    pro: 'Included',
  },
  {
    label: 'Database foundation',
    free: 'No',
    pro: 'Prisma + PostgreSQL',
  },
  {
    label: 'PWA manifest and standalone mode',
    free: 'No',
    pro: 'Included',
  },
  {
    label: 'Offline fallback foundation',
    free: 'No',
    pro: 'Included baseline',
  },
  {
    label: 'Commercial usage',
    free: 'Review license',
    pro: 'Included',
  },
  {
    label: 'Best use case',
    free: 'Validate UX',
    pro: 'Launch and charge faster',
  },
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
      label: 'Production Auth',
      image: '/images/starters/pro/auth-pycolors.png',
    },
    {
      title: 'Billing',
      label: 'Stripe Billing',
      image: '/images/starters/pro/billing-pycolors.png',
    },
    {
      title: 'Pricing',
      label: 'Pricing System',
      image: '/images/starters/pro/pricing-pycolors.png',
    },
    {
      title: 'PWA',
      label: 'Installable PWA',
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

export default function StarterProPage() {
  return (
    <main className="bg-background text-foreground">
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
          subtitle="A production-ready Next.js SaaS starter with the business layer and PWA-ready app experience already shaped."
          description="Starter Pro gives you real authentication, Stripe billing, protected app architecture, Prisma foundations, installable PWA foundations, and launch-ready SaaS surfaces so you can focus on your product instead of repeated setup work."
          actions={
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <BuyStarterProButton />

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
            'Built for real SaaS',
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
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why it exists"
              title="Most SaaS starters stop at UI. Starter Pro wires the expensive part."
              description="The hardest repeated work is rarely the landing page. It is auth, billing, protected routes, account flows, database synchronization, PWA-ready app polish, and all the small decisions needed before a SaaS can charge customers."
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
                description="Stripe Checkout, billing portal, invoices, webhooks, and subscription states are included."
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
                  protected architecture, database foundations, and
                  app-quality polish.
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
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="After purchase"
              title="What you get immediately"
              description="Clear scope, instant delivery, and real SaaS foundations already wired."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {includedItems.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <BuyStarterProButton
                fullWidth={false}
                label={`Buy Starter Pro — ${launchPrice}`}
              />
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
              <p className="max-w-xl text-center text-xs leading-6 text-muted-foreground">
                Choose Pro when the cost of rebuilding the foundation
                is higher than the price of skipping it.
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

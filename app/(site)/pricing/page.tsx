import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BadgeCheck,
  Check,
  Code2,
  CreditCard,
  Database,
  GitBranch,
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
import { Container } from '@/components/container';
import { PageHero } from '@/components/marketing/page-hero';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'Pricing | PyColors',
  description:
    'Start free or buy Starter Pro to launch a real SaaS faster with authentication, Stripe billing, protected routes, and production-ready foundations already wired.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing | PyColors',
    description:
      'Start free or buy Starter Pro to launch faster with real auth, real billing, and a stronger SaaS foundation.',
    url: '/pricing',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | PyColors',
    description:
      'Start free or buy Starter Pro to launch faster with real auth, real billing, and a stronger SaaS foundation.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
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
  starterFree: 'Free',
  starterProLaunch: '199 €',
  starterProRegular: '299 €',
} as const;

const starterProIncludes = [
  'Full Starter Pro source code',
  'Production-ready Next.js App Router architecture',
  'Strict TypeScript setup',
  'Tailwind CSS foundation',
  'Email and password authentication',
  'Google and GitHub OAuth',
  'Email verification and reset password',
  'Session management and protected routes',
  'Stripe Checkout integration',
  'Billing portal flow',
  'Subscription lifecycle handling',
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
    feature: 'Product-shaped SaaS UI',
    free: 'Included',
    pro: 'Included',
  },
  {
    feature: 'Dashboard, settings, billing screens',
    free: 'Included',
    pro: 'Included + production wiring',
  },
  {
    feature: 'Auth screens and UX',
    free: 'Included',
    pro: 'Included + real auth',
  },
  {
    feature: 'Email/password auth',
    free: 'Mock/demo only',
    pro: 'Included',
  },
  {
    feature: 'Google and GitHub OAuth',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Protected routes and sessions',
    free: 'Partial',
    pro: 'Included',
  },
  {
    feature: 'Stripe Checkout',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Billing portal',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Webhooks + Prisma sync',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Database foundation',
    free: 'No',
    pro: 'Prisma + PostgreSQL',
  },
  {
    feature: 'Commercial usage',
    free: 'Review license',
    pro: 'Included',
  },
  {
    feature: 'Best for',
    free: 'Exploring and validating UX',
    pro: 'Launching and charging faster',
  },
] as const;

const trustItems = [
  {
    icon: Code2,
    title: 'Production-shaped architecture',
    description:
      'Built around real SaaS flows: protected app structure, account surfaces, billing states, and scalable foundations.',
  },
  {
    icon: CreditCard,
    title: 'Stripe billing included',
    description:
      'Checkout, billing portal, invoices, subscription lifecycle, and webhook synchronization are part of the paid foundation.',
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
      'PyColors ships with public releases, changelog updates, roadmap direction, and documentation-first product thinking.',
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
    question: 'Is Starter Pro production-ready?',
    answer:
      'Yes. Starter Pro is designed as a real SaaS foundation with authentication, billing, protected app architecture, database foundations, and commercial product surfaces already wired.',
  },
  {
    question: 'Why should I buy this instead of building it myself?',
    answer:
      'Because auth, billing, protected routes, account flows, and webhook synchronization are repeated work that can delay launch. Starter Pro helps you skip that foundation work and focus on your product.',
  },
  {
    question: 'Is the backend included?',
    answer:
      'Yes. Starter Pro includes the foundation for authentication, billing, Prisma, PostgreSQL, protected routes, and business wiring needed for a real SaaS product.',
  },
  {
    question: 'Can I use Starter Pro for a commercial project?',
    answer:
      'Yes. Starter Pro includes commercial usage rights. You should still review the license and terms before using it in production.',
  },
  {
    question: 'Should I start with Starter Free or Starter Pro?',
    answer:
      'Use Starter Free if you are validating the product surface. Choose Starter Pro if you already know you need real auth, Stripe billing, protected app structure, and a faster launch path.',
  },
  {
    question: 'Will the price stay at 199 €?',
    answer:
      'No. 199 € is the current launch price. The regular price is planned at 299 € as the product matures and more production features are added.',
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
  readonly answer: string;
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
      <div className="mx-auto max-w-6xl">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Pricing',
              variant: 'secondary',
            },
            {
              label: `Launch price ${PRICING.starterProLaunch}`,
              variant: 'outline',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: `${PRICING.starterProRegular} regular price`,
              variant: 'outline',
            },
          ]}
          title="Launch faster with the SaaS foundation already wired."
          subtitle="Start free to explore. Upgrade when auth, billing, and protected architecture become the bottleneck."
          description="Starter Pro gives you the expensive SaaS wiring developers rebuild again and again: real authentication, Stripe billing, protected routes, Prisma foundations, and production-shaped app surfaces."
          actions={
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
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
            'Built for real SaaS',
          ]}
          extraClassName="mx-auto max-w-5xl"
          extra={
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
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

                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Explore the product surface, UI direction,
                  dashboards, settings, and SaaS patterns before
                  committing to the paid business wiring.
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
                      <Badge
                        variant="outline"
                        className="rounded-[5px] border-pro-border-subtle text-[11px]"
                      >
                        Save repeated setup time
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
                        </span>{' '}
                        launch price
                      </span>
                    </div>
                  </div>

                  <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Buy Starter Pro when you want to stop rebuilding
                  authentication, Stripe billing, protected routes,
                  and SaaS account foundations from scratch.
                </p>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  <CheckItem>Real authentication</CheckItem>
                  <CheckItem>Stripe billing</CheckItem>
                  <CheckItem>Protected app</CheckItem>
                  <CheckItem>Prisma foundation</CheckItem>
                </ul>

                <div className="mt-6 space-y-3">
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${PRICING.starterProLaunch}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    One-time payment · Instant access after purchase ·
                    Commercial usage included
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
            title="The only choice is Free vs Pro."
            description="Starter Free is for exploring the product surface. Starter Pro is for developers who want the business layer already handled."
            align="center"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Use Free to validate"
              description="Choose Starter Free when you are still exploring product shape, layout, UX direction, and SaaS patterns."
            />

            <FeatureCard
              icon={Lock}
              title="Upgrade when wiring slows you down"
              description="Move to Starter Pro when auth, billing, sessions, protected routes, and database foundations become the bottleneck."
            />

            <FeatureCard
              icon={Rocket}
              title="Launch with less repeated work"
              description="Starter Pro gives you the commercial foundation so you can focus on product logic, onboarding, customers, and growth."
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
                      webhooks, account pages, and database
                      synchronization from scratch.
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
            title="Free validates the surface. Pro wires the business."
            description="Make the upgrade obvious: Free helps you see the product. Pro helps you ship, protect, bill, and launch."
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
                  <TableHead className="w-[42%]">Feature</TableHead>
                  <TableHead className="w-[29%]">
                    Starter Free
                  </TableHead>
                  <TableHead className="w-[29%]">
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
            title="A maintained product, not a one-off template."
            description="For early buyers, trust comes from product discipline: docs, changelog, roadmap, clear scope, and an active ecosystem."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={ShieldCheck}
              title="Clear product scope"
              description="Starter Pro explains what is included, what is wired, and where the foundation stops so you can make a clean buying decision."
            />

            <FeatureCard
              icon={Database}
              title="Real SaaS infrastructure"
              description="The paid foundation includes database, billing, protected app structure, and lifecycle flows instead of only static screens."
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
                  Stop rebuilding the SaaS foundation. Start building
                  the product.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Use Starter Free to explore the surface. Buy Starter
                  Pro when auth, billing, protected routes, and the
                  business layer should already be handled.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>Launch price {PRICING.starterProLaunch}</Pill>
                  <Pill>One-time payment</Pill>
                  <Pill>Instant access</Pill>
                  <Pill>Commercial usage</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[260px]">
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
                  <Link href={INTERNAL.starterFree}>
                    Explore Starter Free
                  </Link>
                </Button>
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

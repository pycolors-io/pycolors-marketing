import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Check,
  CreditCard,
  Database,
  Lock,
  Rocket,
  Shield,
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
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title:
    'Upgrade to Starter Pro — Auth, Billing & SaaS Foundations | PyColors',
  description:
    'Upgrade from Starter Free to Starter Pro and get real authentication, Stripe billing, protected routes, Prisma foundations, and production-ready SaaS wiring.',
  alternates: {
    canonical: 'https://pycolors.io/upgrade',
  },
  openGraph: {
    title:
      'Upgrade to Starter Pro — Auth, Billing & SaaS Foundations | PyColors',
    description:
      'Move from product-surface validation to a production-ready SaaS foundation with authentication, billing, protected routes, and database foundations already wired.',
    url: 'https://pycolors.io/upgrade',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upgrade to Starter Pro | PyColors',
    description:
      'Stop rebuilding auth and billing. Upgrade to a production-ready SaaS foundation.',
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
  pricing: '/pricing',
  roadmap: '/roadmap',
  changelog: '/changelog',
  license: '/license',
  terms: '/terms',
} as const;

const PRICING = {
  launch: '199 €',
  regular: '299 €',
} as const;

const valueCards = [
  {
    title: 'Reduce time-to-revenue',
    description:
      'Starter Pro removes the repeated work between a validated SaaS surface and the moment you can safely charge customers.',
    icon: Zap,
  },
  {
    title: 'Launch with stronger foundations',
    description:
      'Auth, billing, protected routes, account flows, and database structure are already shaped for a real SaaS product.',
    icon: Shield,
  },
  {
    title: 'Focus on product, not plumbing',
    description:
      'Spend more time on product logic, onboarding, positioning, customers, and growth — less time wiring generic SaaS infrastructure.',
    icon: Sparkles,
  },
] as const;

const unlockedLayers = [
  {
    title: 'Real authentication',
    description:
      'Email/password auth, Google and GitHub OAuth, verification, password reset, sessions, protected routes, and account foundations.',
    icon: Lock,
  },
  {
    title: 'Stripe billing foundation',
    description:
      'Checkout, billing portal, invoices, subscription state, lifecycle handling, and webhook synchronization with Prisma.',
    icon: CreditCard,
  },
  {
    title: 'Protected SaaS architecture',
    description:
      'Protected routes, app shell, account areas, settings, billing screens, plan-aware UI states, and scalable product structure.',
    icon: Database,
  },
  {
    title: 'Production-shaped baseline',
    description:
      'Environment configuration, Prisma schema, PostgreSQL foundations, Zod validation, reusable server patterns, and launch-ready structure.',
    icon: Rocket,
  },
] as const;

const proofPoints = [
  'Email/password authentication',
  'Google and GitHub OAuth',
  'Email verification flow',
  'Forgot and reset password',
  'Session management',
  'Protected routes',
  'Connected accounts foundations',
  'Provider disconnect safeguards',
  'Stripe Checkout',
  'Stripe billing portal',
  'Webhook synchronization',
  'Invoices and billing history',
  'Subscription lifecycle handling',
  'Plan-aware UI states',
  'Prisma + PostgreSQL foundations',
  'Commercial usage rights',
] as const;

const comparisonRows = [
  {
    capability: 'Product-shaped SaaS UI',
    free: 'Included',
    pro: 'Included',
  },
  {
    capability: 'Dashboard, settings, billing screens',
    free: 'Included',
    pro: 'Included + production wiring',
  },
  {
    capability: 'Auth screens and UX',
    free: 'Included',
    pro: 'Included + real auth',
  },
  {
    capability: 'Email/password authentication',
    free: 'Mock/demo only',
    pro: 'Included',
  },
  {
    capability: 'Google and GitHub OAuth',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Protected routes and sessions',
    free: 'Partial',
    pro: 'Included',
  },
  {
    capability: 'Stripe Checkout',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Billing portal',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Webhooks + Prisma sync',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Database foundation',
    free: 'No',
    pro: 'Prisma + PostgreSQL',
  },
  {
    capability: 'Best use case',
    free: 'Validate UX',
    pro: 'Launch and charge faster',
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
    question: 'Who should upgrade to Starter Pro?',
    answer:
      'Upgrade when the bottleneck is no longer UI speed but business wiring: authentication, billing, protected routes, database foundations, and launch readiness.',
  },
  {
    question:
      'What is the biggest difference between Starter Free and Starter Pro?',
    answer:
      'Starter Free helps you validate product shape. Starter Pro wires the revenue-critical and security-critical foundations that usually slow real SaaS launches down.',
  },
  {
    question: 'Is Starter Pro production-ready?',
    answer:
      'Yes. Starter Pro is designed as a real SaaS foundation. You still need to add your product-specific logic, but auth, billing, protected app structure, and database foundations are already shaped.',
  },
  {
    question: 'Will I still need to build things myself?',
    answer:
      'Yes. You still build your unique workflows, features, onboarding, and product logic. Starter Pro removes repeated foundation work so you can focus on what differentiates the business.',
  },
  {
    question: 'What does the launch offer include?',
    answer:
      'The launch offer gives you commercial access to Starter Pro at 199 € instead of the planned regular price of 299 €, with the core auth, billing, protected app, and database foundations included.',
  },
  {
    question: 'Where do I find the legal and usage scope?',
    answer:
      'The commercial overview lives on /pricing. Legal scope and product usage are governed by /license and /terms.',
  },
] as const;

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
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
            className="rounded-[5px] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
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

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-colors hover:border-border hover:bg-surface-elevated">
      <CardHeader className="space-y-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
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

export default function UpgradePage() {
  return (
    <main className="bg-background text-foreground">
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
          <PageHero
            maxWidth="5xl"
            badges={[
              {
                label: 'Upgrade to Starter Pro',
                variant: 'secondary',
              },
              {
                label: `Launch offer ${PRICING.launch}`,
                variant: 'outline',
                icon: (
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ),
              },
              {
                label: `${PRICING.regular} regular price`,
                variant: 'outline',
              },
            ]}
            title="Starter Free validates the product."
            subtitle="Starter Pro wires the business."
            description="Upgrade when authentication, Stripe billing, protected routes, database foundations, and SaaS account flows should already be handled. Starter Pro turns a product-shaped surface into a stronger foundation for launching and charging faster."
            actions={
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <BuyStarterProButton
                  fullWidth={false}
                  label={`Buy Starter Pro — ${PRICING.launch}`}
                />

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.docsStarterPro}>
                    Read Starter Pro docs
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.pricing}>Compare pricing</Link>
                </Button>
              </div>
            }
            pills={[
              'Real authentication',
              'Stripe billing',
              'Protected app',
              'Prisma foundation',
              'Commercial usage',
            ]}
            extraClassName="mx-auto max-w-5xl"
            extra={
              <Card className="mt-10 overflow-hidden rounded-[5px] border border-pro-border bg-pro-surface shadow-medium">
                <CardContent className="p-0">
                  <div className="grid divide-y divide-pro-border-subtle lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                    {[
                      {
                        label: 'Current launch price',
                        value: PRICING.launch,
                        description: `Regular price planned at ${PRICING.regular}`,
                      },
                      {
                        label: 'Best for',
                        value: 'Real SaaS launch',
                        description:
                          'When auth and billing should not delay you',
                      },
                      {
                        label: 'Delivery',
                        value: 'Instant access',
                        description:
                          'One-time payment with commercial usage',
                      },
                    ].map((item) => (
                      <div key={item.label} className="p-5 sm:p-6">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-2 text-xl font-semibold tracking-tight">
                          {item.value}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            }
          />

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Why upgrade"
              title="The upgrade is not more UI. It is less launch friction."
              description="Starter Free is useful when you are still shaping the product. Starter Pro becomes valuable when the same foundation work starts blocking revenue."
              align="center"
            />

            <div className="grid gap-4 md:grid-cols-3">
              {valueCards.map((item) => (
                <ValueCard key={item.title} {...item} />
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="What you unlock"
              title="The layers that usually slow serious SaaS launches down."
              description="Starter Pro is valuable because it gives you a stronger baseline for the parts that are expensive to rebuild repeatedly."
              action={
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn('rounded-[5px]', focusRing)}
                >
                  <Link href={INTERNAL.docsBackend}>
                    Explore technical docs
                  </Link>
                </Button>
              }
            />

            <div className="grid gap-4 md:grid-cols-2">
              {unlockedLayers.map((item) => (
                <ValueCard key={item.title} {...item} />
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Product proof"
              title="Core foundations already exist."
              description="The upgrade should feel like leverage, not risk. Starter Pro makes the production-critical scope explicit."
            />

            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-[1fr_0.9fr]">
                  <div className="p-6 sm:p-7">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <Badge className="rounded-[5px]">
                        Included foundations
                      </Badge>

                      <Badge
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        Production-shaped scope
                      </Badge>
                    </div>

                    <ul className="grid gap-3 sm:grid-cols-2">
                      {proofPoints.map((item) => (
                        <CheckItem key={item}>{item}</CheckItem>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border-subtle bg-surface-muted/50 p-6 sm:p-7 lg:border-l lg:border-t-0">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-subtle bg-background">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
                      Built to reduce purchase anxiety.
                    </h3>

                    <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                      <p>
                        You are not buying a vague roadmap. You are
                        buying an accelerator for the layers that
                        repeatedly delay SaaS launches.
                      </p>

                      <p>
                        The value is in the foundation: auth flows,
                        billing flows, subscription state, invoices,
                        protected architecture, and product structure.
                      </p>

                      <p>
                        That makes Starter Pro a leverage purchase,
                        not another template gamble.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Free vs Pro"
              title="Keep Free for exploration. Choose Pro for launch readiness."
              description="Do not think of Pro as more screens. Think of it as less uncertainty and less repeated engineering work."
              action={
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn('rounded-[5px]', focusRing)}
                >
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>
              }
            />

            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface p-2 shadow-soft sm:p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[34%]">
                      Capability
                    </TableHead>
                    <TableHead className="w-[33%]">
                      Starter Free
                    </TableHead>
                    <TableHead className="w-[33%]">
                      Starter Pro
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {comparisonRows.map((row) => (
                    <TableRow key={row.capability}>
                      <TableCell className="font-medium">
                        {row.capability}
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
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Pricing logic"
              title="One serious upgrade. No unnecessary pricing confusion."
              description="This page exists to make the Starter Pro decision obvious when the business layer becomes the bottleneck."
              align="center"
            />

            <div className="mx-auto max-w-3xl">
              <Card className="relative overflow-hidden rounded-[5px] border border-pro-border bg-pro-surface p-6 shadow-medium sm:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <CardHeader className="space-y-5 px-0 pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xl font-semibold">
                        Starter Pro
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        The faster path from validated surface to
                        monetizable SaaS.
                      </p>
                    </div>

                    <Badge className="rounded-[5px] px-3 py-1 text-xs font-medium">
                      Launch offer
                    </Badge>
                  </div>

                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                      {PRICING.launch}
                    </span>

                    <div className="pb-1 text-sm text-muted-foreground">
                      <span className="mr-2 line-through">
                        {PRICING.regular}
                      </span>
                      one-time payment
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8 px-0 pb-0">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                      <p className="text-sm font-medium">
                        What you get
                      </p>

                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li>Real auth foundations</li>
                        <li>Stripe billing foundations</li>
                        <li>Protected app architecture</li>
                        <li>Commercial usage rights</li>
                      </ul>
                    </div>

                    <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                      <p className="text-sm font-medium">
                        What you avoid
                      </p>

                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li>Rebuilding OAuth and sessions</li>
                        <li>Rewiring checkout and webhooks</li>
                        <li>Fragile billing state</li>
                        <li>Delayed launch foundations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <BuyStarterProButton
                      fullWidth={false}
                      label={`Buy Starter Pro — ${PRICING.launch}`}
                    />

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className={cn(
                        'h-11 rounded-[5px] px-6 text-sm font-medium',
                        focusRing,
                      )}
                    >
                      <Link href={INTERNAL.docsBilling}>
                        Review billing docs
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs leading-6 text-muted-foreground">
                    Keep the first purchase decision simple. Starter
                    Pro is the primary commercial upgrade when the
                    business layer becomes the bottleneck.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-6 sm:p-7">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <Badge
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      Production-ready stack
                    </Badge>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                      Built with modern SaaS foundations.
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Starter Pro uses a focused, production-shaped
                      stack for authentication, billing, database
                      workflows, deployment, and scalable product
                      development.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
                    {stackItems.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="FAQ"
              title="Answer the objections before they cost the sale."
              description="Most upgrade friction comes from ambiguity. The page should make the scope, value, and next step obvious."
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
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-pro-border bg-pro-surface-muted px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
                  >
                    Final decision
                  </Badge>

                  <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    Upgrade when auth and billing should no longer
                    slow the business down.
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Starter Free is still the right move when you are
                    exploring. Starter Pro is the right move when you
                    are serious about launching with the business
                    layer already handled.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Pill>Revenue-focused upgrade</Pill>
                    <Pill>Production-ready baseline</Pill>
                    <Pill>Built for real SaaS</Pill>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:min-w-60">
                  <BuyStarterProButton
                    label={`Upgrade to Starter Pro — ${PRICING.launch}`}
                  />

                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'h-11 rounded-[5px] text-sm font-medium',
                      focusRing,
                    )}
                  >
                    <Link href={INTERNAL.starterFree}>
                      Open Starter Free
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Legal scope and usage terms are governed by{' '}
              <Link
                href={INTERNAL.pricing}
                className="underline underline-offset-4"
              >
                /pricing
              </Link>
              ,{' '}
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
    </main>
  );
}

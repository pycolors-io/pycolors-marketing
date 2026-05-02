import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BadgeCheck,
  Check,
  CreditCard,
  Lock,
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
    'Start free or buy Starter Pro to launch a real SaaS faster with authentication, Stripe billing, and a production-ready foundation already built.',
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
    feature: 'UI and app surfaces',
    free: 'Included',
    pro: 'Included',
  },
  {
    feature: 'Auth screens and UX',
    free: 'Included',
    pro: 'Included + wired',
  },
  {
    feature: 'Real email/password auth',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Google and GitHub OAuth',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Real Stripe billing',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Webhook and billing sync',
    free: 'No',
    pro: 'Included',
  },
  {
    feature: 'Protected app architecture',
    free: 'Partial',
    pro: 'Included',
  },
  {
    feature: 'Best for',
    free: 'Exploring product shape',
    pro: 'Launching faster',
  },
] as const;

const faqs = [
  {
    question: 'Which option should I choose first?',
    answer:
      'Choose Starter Pro if you already know authentication, billing, and protected app foundations are the work slowing you down. Choose Starter Free if you are still exploring product shape and UX direction.',
  },
  {
    question: 'What do I get with Starter Pro?',
    answer:
      'You get the full Starter Pro source code and the production-ready SaaS foundations already wired: authentication, Stripe billing, protected app structure, account flows, and launch-ready foundations.',
  },
  {
    question: 'Is Starter Pro built for a real commercial SaaS?',
    answer:
      'Yes. Starter Pro is designed to become the base of a real SaaS product, not just a UI showcase or demo repository.',
  },
  {
    question: 'Why buy Starter Pro instead of building it myself?',
    answer:
      'Because the most expensive time loss usually happens in auth, billing, protected flows, and business wiring. Starter Pro helps you skip that repeated setup and move faster toward launch.',
  },
  {
    question: 'Do I still need to build my own product features?',
    answer:
      'Yes. Starter Pro removes repeated foundation work so you can focus on your own product logic, onboarding, workflows, positioning, and growth.',
  },
  {
    question: 'Where can I review the product scope and legal terms?',
    answer:
      'You can review the implementation docs on /docs/starter-pro, and the legal scope on /license and /terms.',
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
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Pricing',
              variant: 'secondary',
            },
            {
              label: `Launch offer ${PRICING.starterProLaunch}`,
              variant: 'outline',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: 'One clear paid path',
              variant: 'outline',
            },
          ]}
          title="Start free or buy the faster path to launch."
          subtitle="Starter Free helps you explore. Starter Pro helps you ship and charge sooner."
          description="Starter Pro gives you real authentication, real Stripe billing, protected app structure, and a production-ready SaaS foundation without rebuilding the same business layer again."
          actions={
            <>
              <BuyStarterProButton
                fullWidth={false}
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
            </>
          }
          pills={[
            'Real auth included',
            'Stripe billing included',
            'One-time payment',
            'Built for SaaS launch',
          ]}
          extraClassName="mx-auto max-w-5xl"
          extra={
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="rounded-[5px] text-[11px]"
                    >
                      Free entry point
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
                  Best when you want to validate UX, explore product
                  direction, and move fast before paying for business
                  wiring.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="mt-5 h-10 w-full rounded-[5px] text-sm font-medium"
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
                        Main offer
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-[5px] border-pro-border-subtle text-[11px]"
                      >
                        Best launch choice
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
                        launch price
                      </span>
                    </div>
                  </div>

                  <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Best when auth, billing, protected app foundations,
                  and time-to-launch are now the real bottlenecks.
                </p>

                <div className="mt-5 space-y-3">
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${PRICING.starterProLaunch}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    One-time payment · Instant access after purchase
                  </p>
                </div>
              </Card>
            </div>
          }
        />

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="The simple path"
            title="Keep the decision easy"
            description="Starter Free is the exploration layer. Starter Pro is the paid layer for people ready to launch faster."
            align="center"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Use Free to explore product shape"
              description="Choose Starter Free when speed of exploration matters more than real auth, real billing, and business infrastructure."
            />

            <FeatureCard
              icon={Lock}
              title="Buy Pro when auth and billing slow you down"
              description="Once product direction is clear, rebuilding secure auth and billing yourself usually costs more than the upgrade."
            />

            <FeatureCard
              icon={Rocket}
              title="Launch sooner with the paid layer"
              description="Starter Pro removes repeated foundation work so you can focus on product logic, onboarding, and growth."
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Starter Pro"
            title="What you are actually paying for"
            description="Starter Pro wins when the buyer immediately understands the leverage: less repeated setup, less fragile wiring, and a faster path to a real SaaS launch."
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
                      Primary commercial offer
                    </Badge>
                    <Badge
                      variant="outline"
                      className="rounded-[5px] text-[11px]"
                    >
                      Launch price {PRICING.starterProLaunch}
                    </Badge>
                  </div>

                  <h3 className="mt-4 font-brand text-2xl font-semibold tracking-tight">
                    Starter Pro
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                    A production-ready SaaS foundation for developers
                    who want real authentication, real billing,
                    protected app structure, and a shorter path to
                    launch.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    What you get
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
                      The faster path from product-shaped starter to
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
                    one-time price
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-0 pb-0">
                <div className="grid gap-4">
                  <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-medium">Best for</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Indie hackers, freelancers, and technical
                      founders who want to stop rebuilding auth and
                      billing before charging customers.
                    </p>
                  </div>

                  <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-medium">
                      Why it converts
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      It removes the work that most often delays
                      launch: authentication, billing, protected
                      flows, subscription logic, and fragile SaaS
                      wiring.
                    </p>
                  </div>

                  <div className="rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted p-4">
                    <p className="text-sm leading-7 text-muted-foreground">
                      One-time payment. Instant delivery after
                      purchase. Built for developers who want to
                      launch faster instead of wiring the same
                      business layer again.
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
            title="Compare the only decision that matters right now"
            description="Do not create too many premium choices too early. The real decision is simple: stay on Free or move to Pro."
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
                    <TableCell className="text-muted-foreground">
                      {row.pro}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="mt-8 flex justify-center">
            <BuyStarterProButton
              fullWidth={false}
              label={`Move to Starter Pro — ${PRICING.starterProLaunch}`}
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="FAQ"
            title="Remove buying friction before it blocks the click"
            description="A pricing page should answer the objections that stop the purchase."
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
                  Final CTA
                </Badge>

                <h2 className="text-balance font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
                  Explore for free or buy the upgrade that gets you to
                  launch faster.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Keep the decision simple. Use Starter Free to
                  explore. Buy Starter Pro when you want the business
                  layer already handled.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>One clear paid path</Pill>
                  <Pill>Real SaaS foundations</Pill>
                  <Pill>Built to launch faster</Pill>
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

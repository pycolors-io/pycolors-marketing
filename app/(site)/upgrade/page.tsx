import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BadgeCheck,
  Check,
  CreditCard,
  Database,
  Lock,
  Rocket,
  Shield,
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
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'Upgrade to Starter Pro | PyColors',
  description:
    'Upgrade from Starter Free to Starter Pro and get real authentication, real billing, protected app foundations, and a production-ready SaaS baseline.',
  alternates: { canonical: '/upgrade' },
  openGraph: {
    title: 'Upgrade to Starter Pro | PyColors',
    description:
      'Stop rebuilding auth and billing. Upgrade to a production-ready SaaS foundation.',
    url: '/upgrade',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upgrade to Starter Pro | PyColors',
    description:
      'From product-shaped UI to a real SaaS foundation with authentication, billing, and scalable architecture.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  home: '/',
  starters: '/starters',
  starterFree: '/starters/free',
  docsStarterPro: '/docs/starter-pro',
  docsBilling: '/docs/saas-pro/billing',
  docsBackend: '/docs/saas-pro/backend',
  access: '/access',
  license: '/license',
  terms: '/terms',
} as const;

const PRICING = {
  launch: '199 €',
  regular: '299 €',
} as const;

const included = [
  {
    title: 'Authentication that is actually usable in production',
    description:
      'Email and password, Google and GitHub OAuth, email verification, password reset, password change, connected accounts, safer provider disconnect, and rate limiting foundations.',
    icon: Lock,
  },
  {
    title: 'Billing that gets you to monetization faster',
    description:
      'Stripe Checkout, billing portal flow, invoices, subscription sync, webhook handling, and plan-aware app foundations already wired.',
    icon: CreditCard,
  },
  {
    title: 'Protected app and data foundations',
    description:
      'App, auth, and billing domains are clearly separated so the starter can grow into a real commercial SaaS instead of collapsing into glue code.',
    icon: Database,
  },
  {
    title: 'A stronger baseline for launch and scale',
    description:
      'Settings architecture, protected routes, reusable server patterns, Prisma-backed structure, and production-shaped navigation ready to extend.',
    icon: Rocket,
  },
] as const;

const proofPoints = [
  'Credentials authentication',
  'Google and GitHub OAuth',
  'Email verification flow',
  'Forgot and reset password',
  'In-session password change',
  'Connected accounts management',
  'Safer provider disconnect protection',
  'Auth rate limiting',
  'Stripe Checkout integration',
  'Billing portal flow',
  'Webhook sync with Prisma',
  'Invoices and subscription state',
] as const;

const comparisonRows = [
  {
    capability: 'Landing, app shell, settings UI',
    free: 'Included',
    pro: 'Included',
  },
  {
    capability: 'Auth screens and flows UI',
    free: 'Included',
    pro: 'Included + wired',
  },
  {
    capability: 'Email/password auth',
    free: 'Mock / surface only',
    pro: 'Real',
  },
  {
    capability: 'Google and GitHub OAuth',
    free: 'No',
    pro: 'Real',
  },
  {
    capability: 'Email verification and reset password',
    free: 'No',
    pro: 'Real',
  },
  {
    capability: 'Stripe Checkout and billing portal',
    free: 'UI only',
    pro: 'Real',
  },
  {
    capability: 'Webhooks, invoices, subscriptions',
    free: 'No',
    pro: 'Real',
  },
  {
    capability: 'Plan gating foundations',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Protected app architecture',
    free: 'Partial',
    pro: 'Production-shaped',
  },
  {
    capability: 'Time-to-revenue',
    free: 'Longer path',
    pro: 'Faster path',
  },
] as const;

const faqs = [
  {
    question: 'Who should upgrade to Starter Pro?',
    answer:
      'Upgrade when the bottleneck is no longer UI speed but business wiring: authentication, billing, protected routes, security flows, and launch readiness.',
  },
  {
    question: 'What is the biggest difference between Free and Pro?',
    answer:
      'Starter Free helps you validate product shape. Starter Pro handles the revenue-critical and security-critical foundations that usually slow real SaaS launches down.',
  },
  {
    question: 'Is this meant for a real commercial SaaS?',
    answer:
      'Yes. Starter Pro is designed to become the base of a real product, not just a demo repository or a UI showcase.',
  },
  {
    question: 'Will I still need to build things myself?',
    answer:
      'Yes. You still build your unique product logic, workflows, and market-specific features. Starter Pro removes repeated foundation work so you can focus on what differentiates your business.',
  },
  {
    question: 'What does the launch offer include?',
    answer:
      'The launch offer gives you commercial access to Starter Pro at 199 € instead of 299 €, with the core auth, billing, and protected app foundations already wired.',
  },
  {
    question: 'Where do I find the legal and usage scope?',
    answer:
      'Use /access for the commercial overview and /license and /terms for the governing legal scope.',
  },
] as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
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
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mb-6 space-y-3',
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            {eyebrow}
          </Badge>
        ) : null}
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {align === 'left' && action ? (
        <div className="sm:self-start">{action}</div>
      ) : null}
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted-foreground">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-background">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span>{children}</span>
    </li>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-2xl border">
      <CardHeader className="space-y-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
          <Icon className="h-5 w-5" />
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
  question: string;
  answer: string;
}) {
  return (
    <Card className="rounded-2xl border p-5">
      <div className="space-y-2">
        <div className="text-sm font-medium">{question}</div>
        <p className="text-sm leading-7 text-muted-foreground">
          {answer}
        </p>
      </div>
    </Card>
  );
}

export default function UpgradePage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: INTERNAL.home },
              { label: 'Upgrade', href: '/upgrade' },
            ]}
          />
        </div>

        <section className="relative overflow-hidden rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full px-3 py-1 text-xs font-medium">
                  Upgrade to Starter Pro
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 text-xs font-medium"
                >
                  Launch offer {PRICING.launch}
                </Badge>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Your UI is no longer the bottleneck.{' '}
                <span className="block text-muted-foreground">
                  Auth and billing are.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                Starter Free helps you move fast on product shape.
                Starter Pro is the upgrade for when you want the
                business layer already handled: real authentication,
                real Stripe billing, protected app foundations, and a
                stronger production baseline.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BuyStarterProButton
                  fullWidth={false}
                  label={`Buy Starter Pro — ${PRICING.launch}`}
                />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.docsStarterPro}>
                    Read Starter Pro docs
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill>Real auth</Pill>
                <Pill>Real billing</Pill>
                <Pill>Protected app structure</Pill>
                <Pill>Plan gating foundations</Pill>
                <Pill>Faster time-to-revenue</Pill>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                <CheckItem>
                  Keep the product-shaped UX direction from Free
                </CheckItem>
                <CheckItem>
                  Stop rebuilding Stripe and auth from scratch
                </CheckItem>
                <CheckItem>
                  Launch from a stronger commercial baseline
                </CheckItem>
                <CheckItem>
                  Focus your time on product, customers, and growth
                </CheckItem>
              </ul>
            </div>

            <div>
              <Card className="rounded-[28px] border-2 shadow-lg shadow-black/5">
                <CardHeader className="space-y-5 pb-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xl font-semibold">
                        Starter Pro
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The upgrade for developers who want to launch
                        a real SaaS faster.
                      </p>
                    </div>
                    <Badge className="rounded-full px-3 py-1 text-xs font-medium">
                      Best
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
                      launch price
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {[
                      'Full Starter Pro source code',
                      'Authentication system already wired',
                      'Stripe billing foundations included',
                      'Protected app architecture included',
                      'Commercial access to Starter Pro',
                      'Built for real SaaS products',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <BuyStarterProButton label="Buy Starter Pro" />

                  <p className="text-xs leading-6 text-muted-foreground">
                    Built for developers, indie hackers, freelancers,
                    and technical founders who do not want to lose
                    weeks rebuilding the same infrastructure before
                    charging their first customers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Core message"
            title="Starter Free proves the surface. Starter Pro wires the business."
            description="This page should not read like a feature dump. It should make the buying decision obvious: stay on Free when you are still exploring, upgrade to Pro when the cost of wiring auth and billing yourself becomes higher than the price of the product."
            align="center"
          />

          <div className="grid gap-6 md:grid-cols-3">
            <ValueCard
              icon={Zap}
              title="Reduce time-to-revenue"
              description="The point of the upgrade is not more interface polish. It is removing the repeated work that stands between your product and its first paying users."
            />
            <ValueCard
              icon={Shield}
              title="Launch with more confidence"
              description="Authentication, billing, security-sensitive flows, and protected app patterns are the layers that create launch anxiety when they are still incomplete."
            />
            <ValueCard
              icon={Sparkles}
              title="Focus on what actually differentiates you"
              description="Your value is in your product, your workflow, your insight, and your positioning. Not in spending more weekends rebuilding OAuth and checkout flows."
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="What you unlock"
            title="The upgrade gives you the layers that usually slow serious SaaS launches down"
            description="Starter Pro is valuable because it removes expensive implementation work in the areas that are hardest to get right quickly."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={focusRing}
              >
                <Link href={INTERNAL.docsBackend}>
                  Explore technical docs
                </Link>
              </Button>
            }
          />

          <div className="grid gap-6 md:grid-cols-2">
            {included.map((item) => (
              <ValueCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Already built"
            title="This is not a promise page. Core foundations already exist."
            description="Ultra-conversion requires credibility. Show that Starter Pro is not speculative: major pieces are already implemented."
          />

          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    Implemented
                  </Badge>
                  <p className="text-sm font-medium">
                    Production-critical systems already in place
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {proofPoints.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-5">
                <h3 className="text-base font-medium">
                  What this means for the buyer
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>
                    You are not buying a vague roadmap. You are buying
                    an accelerator for the exact layers that
                    repeatedly delay SaaS launches.
                  </p>
                  <p>
                    The upgrade is credible because the foundation is
                    already there: auth flows, billing flows,
                    subscription state, invoices, rate limiting,
                    protected app architecture, and the product
                    structure needed to extend it.
                  </p>
                  <p>
                    This reduces purchase anxiety and makes the offer
                    feel like leverage, not risk.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Free vs Pro"
            title="Keep Free for exploration. Choose Pro when you want a shorter path to revenue."
            description="Do not frame Pro as more stuff. Frame it as less friction, less uncertainty, and less repeated engineering work."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={focusRing}
              >
                <Link href={INTERNAL.starterFree}>
                  Open Starter Free
                </Link>
              </Button>
            }
          />

          <Card className="rounded-[28px] border p-4 sm:p-6">
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
                    <TableCell className="text-muted-foreground">
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
            title="One serious upgrade offer. No unnecessary pricing confusion."
            description="The upgrade page should convert to Starter Pro first. This page exists to make that decision obvious."
            align="center"
          />

          <div className="mx-auto max-w-3xl">
            <Card className="rounded-[28px] border-2 shadow-xl shadow-black/5">
              <CardHeader className="space-y-5 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold">
                      Upgrade to Starter Pro
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      The fastest path from product-shaped starter to
                      a monetizable SaaS baseline.
                    </p>
                  </div>
                  <Badge className="rounded-full px-3 py-1 text-xs font-medium">
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
                    one-time price
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border p-4">
                    <p className="text-sm font-medium">
                      What you get
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>Real auth foundations</li>
                      <li>Real Stripe billing</li>
                      <li>Protected app architecture</li>
                      <li>Commercial access to Starter Pro</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border p-4">
                    <p className="text-sm font-medium">
                      What you avoid
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>Rebuilding OAuth and sessions</li>
                      <li>Rewiring Checkout and webhooks</li>
                      <li>Patchwork billing logic</li>
                      <li>Fragile launch foundations</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <BuyStarterProButton
                    fullWidth={false}
                    label="Buy Starter Pro now"
                  />
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className={cn(
                      'h-11 rounded-xl px-6 text-sm font-medium',
                      focusRing,
                    )}
                  >
                    <Link href={INTERNAL.docsBilling}>
                      Review billing docs
                    </Link>
                  </Button>
                </div>

                <p className="text-xs leading-6 text-muted-foreground">
                  Keep the first purchase decision simple. Starter Pro
                  is the primary commercial upgrade when the business
                  layer becomes the bottleneck.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="FAQ"
            title="Answer the objections before they cost you the sale"
            description="Most upgrade friction comes from ambiguity. Be direct and remove uncertainty."
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
          <Card className="rounded-[32px] border bg-card px-6 py-8 shadow-lg shadow-black/5 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
                >
                  Final CTA
                </Badge>
                <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  Start with Free. Upgrade when building the business
                  layer starts wasting your time.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Starter Free is still the right move when you are
                  exploring. Starter Pro is the right move when you
                  are serious about launching and do not want auth and
                  billing to keep delaying the business.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Pill>Revenue-focused upgrade</Pill>
                  <Pill>Production-ready baseline</Pill>
                  <Pill>Built for real SaaS</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[240px]">
                <BuyStarterProButton label="Upgrade to Starter Pro" />
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    'h-11 rounded-xl text-sm font-medium',
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
              href={INTERNAL.access}
              className="underline underline-offset-4"
            >
              /access
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
  );
}

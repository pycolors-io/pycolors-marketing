import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BadgeCheck,
  Check,
  CreditCard,
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
  title: 'Pricing | PyColors',
  description:
    'Choose the right PyColors offer for your SaaS. Start free, or buy Starter Pro for real authentication, real billing, and a production-ready SaaS foundation.',
  alternates: { canonical: '/access' },
  openGraph: {
    title: 'Pricing | PyColors',
    description:
      'Start free or buy Starter Pro for real auth, real billing, and a faster path to revenue.',
    url: '/access',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | PyColors',
    description:
      'Start free or buy Starter Pro for real auth, real billing, and a stronger SaaS baseline.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  home: '/',
  starterFree: '/starters/free',
  starters: '/starters',
  upgrade: '/upgrade',
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
  'Email and password authentication',
  'Google and GitHub OAuth',
  'Email verification and reset password',
  'Connected accounts and provider safety flows',
  'Stripe Checkout integration',
  'Billing portal flow',
  'Subscription-ready billing architecture',
  'Webhook synchronization with Prisma',
  'Protected app and plan gating foundations',
  'Commercial access to Starter Pro',
] as const;

const comparisonRows = [
  {
    feature: 'Landing and app surfaces',
    free: 'Included',
    pro: 'Included',
  },
  {
    feature: 'Auth screens and UX',
    free: 'Included',
    pro: 'Included + wired',
  },
  {
    feature: 'Real auth providers and sessions',
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
    pro: 'Production-shaped',
  },
  {
    feature: 'Best use case',
    free: 'Validate product shape',
    pro: 'Launch faster',
  },
] as const;

const faqs = [
  {
    question: 'Which offer should I buy first?',
    answer:
      'Starter Pro. It is the main commercial offer and the shortest path from a product-shaped starter to a real monetizable SaaS baseline.',
  },
  {
    question:
      'Should I start with Starter Free or buy Starter Pro directly?',
    answer:
      'Start with Free when you are still exploring product shape. Buy Starter Pro directly when you already know auth, billing, and protected app foundations are work you do not want to rebuild yourself.',
  },
  {
    question: 'Why is Starter Pro the main focus here?',
    answer:
      'Because the first pricing page should reduce buying friction, not create more choices. Starter Pro is the clearest first paid decision.',
  },
  {
    question: 'Is Starter Pro for real commercial SaaS products?',
    answer:
      'Yes. It is designed to become the base of a real SaaS, not a demo repo or a UI-only showcase.',
  },
  {
    question: 'Do I still need to build my own features?',
    answer:
      'Yes. Starter Pro removes repeated foundation work so you can focus on your actual product logic, domain workflows, onboarding, and growth.',
  },
  {
    question: 'Where do I find the legal scope?',
    answer:
      'The governing scope is defined by the relevant product page, checkout flow, and the PyColors legal pages such as /license and /terms.',
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

function FeatureCard({
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

export default function AccessPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: INTERNAL.home },
              { label: 'Pricing', href: '/access' },
            ]}
          />
        </div>

        <section className="relative overflow-hidden rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full px-3 py-1 text-xs font-medium">
                  Pricing
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 text-xs font-medium"
                >
                  Starter Pro launch offer {PRICING.starterProLaunch}
                </Badge>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Ship faster.{' '}
                <span className="block text-muted-foreground">
                  Charge sooner.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                Starter Free helps you validate product shape. Starter
                Pro gives you real authentication, real Stripe
                billing, and a production-ready SaaS foundation
                without rebuilding the same business layer again.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BuyStarterProButton fullWidth={false} />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterFree}>
                    Start with Starter Free
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill>Clear first offer</Pill>
                <Pill>Real auth and billing</Pill>
                <Pill>Faster time-to-revenue</Pill>
                <Pill>Built for SaaS</Pill>
              </div>
            </div>

            <div>
              <div className="grid gap-4">
                <Card className="rounded-[28px] border p-6 shadow-lg shadow-black/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="rounded-full"
                        >
                          Free entry point
                        </Badge>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold">
                        Starter Free
                      </h2>
                      <div className="mt-2 text-3xl font-semibold tracking-tight">
                        {PRICING.starterFree}
                      </div>
                    </div>
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Best when you want to validate UX, explore product
                    direction, and move quickly before paying for
                    business wiring.
                  </p>

                  <div className="mt-5">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-xl"
                    >
                      <Link href={INTERNAL.starterFree}>
                        Open Starter Free
                      </Link>
                    </Button>
                  </div>
                </Card>

                <Card className="rounded-[28px] border-2 p-6 shadow-xl shadow-black/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="rounded-full">
                          Main offer
                        </Badge>
                        <Badge
                          variant="outline"
                          className="rounded-full"
                        >
                          Best choice
                        </Badge>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold">
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
                    <BadgeCheck className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Best when you already know the real bottleneck is
                    auth, billing, protected app foundations, and
                    getting to monetization faster.
                  </p>

                  <div className="mt-5">
                    <BuyStarterProButton />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Recommended path"
            title="Do not overcomplicate the first buying decision"
            description="This page should not make buyers think too hard. Starter Free is the entry point. Starter Pro is the primary paid offer."
            align="center"
          />

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Start free when you are still shaping the product"
              description="Use Starter Free when speed of exploration matters more than business wiring. It is the right entry point for early product decisions."
            />
            <FeatureCard
              icon={Lock}
              title="Buy Starter Pro when auth and billing become the bottleneck"
              description="Once product direction is clear, the cost of rebuilding auth and billing yourself usually exceeds the price of the upgrade."
            />
            <FeatureCard
              icon={Rocket}
              title="Use the paid layer when you want to launch sooner"
              description="Starter Pro is designed to reduce repeated setup work so you can focus on product logic, onboarding, and growth."
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Starter Pro"
            title="The first paid offer should feel like leverage, not complexity"
            description="Starter Pro wins when the buyer immediately understands what they are paying to avoid: repeated setup, fragile wiring, and weeks lost before launch."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={focusRing}
              >
                <Link href={INTERNAL.docsStarterPro}>
                  Read Starter Pro docs
                </Link>
              </Button>
            }
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-[28px] border p-6 sm:p-7">
              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full">
                      Primary commercial offer
                    </Badge>
                    <Badge variant="outline" className="rounded-full">
                      Launch price {PRICING.starterProLaunch}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    Starter Pro
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                    A production-ready SaaS foundation for developers
                    who want real authentication, real billing,
                    protected app architecture, and a shorter path to
                    launch.
                  </p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {starterProIncludes.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="rounded-[28px] border-2 p-6 shadow-xl shadow-black/5">
              <CardHeader className="space-y-5 px-0 pt-0">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold">
                      Buy Starter Pro
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      The shortest path from product-shaped starter to
                      a monetizable SaaS baseline.
                    </p>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
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
                  <div className="rounded-2xl border p-4">
                    <p className="text-sm font-medium">Best for</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Indie hackers, freelancers, and technical
                      founders who want to stop rebuilding the same
                      auth and billing foundations before charging
                      customers.
                    </p>
                  </div>

                  <div className="rounded-2xl border p-4">
                    <p className="text-sm font-medium">
                      Why it converts
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      It saves time where the time loss is most
                      expensive: authentication, billing,
                      security-sensitive flows, and protected product
                      structure.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <BuyStarterProButton />
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'h-11 rounded-xl text-sm font-medium',
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
            eyebrow="What changes"
            title="Starter Free helps you explore. Starter Pro helps you launch."
            description="That difference should be obvious before the user even reaches the comparison table."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              icon={Sparkles}
              title="Starter Free"
              description="Use it to validate UX, explore routes, test screens, and shape the product surface without committing to business wiring yet."
            />
            <FeatureCard
              icon={Shield}
              title="Starter Pro"
              description="Use it when you want real auth, real Stripe billing, stronger protected architecture, and less launch uncertainty."
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Comparison"
            title="Compare the only levels that matter right now"
            description="Avoid presenting too many premium choices too early. Compare the real decision: stay free or buy Starter Pro."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={focusRing}
              >
                <Link href={INTERNAL.docsBackend}>
                  Explore backend docs
                </Link>
              </Button>
            }
          />

          <Card className="rounded-[28px] border p-4 sm:p-6">
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
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="FAQ"
            title="Remove buying friction before it appears"
            description="A pricing page should answer the objections that stop the click."
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
                  Start with Free or buy the upgrade that gets you to
                  revenue faster.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Keep the choice simple. Explore with Starter Free.
                  Buy Starter Pro when you want the business layer
                  handled and the path to launch shortened.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Pill>Simple first decision</Pill>
                  <Pill>Real SaaS foundations</Pill>
                  <Pill>Conversion-focused pricing</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[240px]">
                <BuyStarterProButton />
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

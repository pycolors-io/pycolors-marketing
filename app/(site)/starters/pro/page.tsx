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
  Rocket,
  ShieldCheck,
  Sparkles,
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
  title:
    'Starter Pro — Next.js SaaS starter with auth and billing | PyColors',
  description:
    'Starter Pro is a production-ready Next.js SaaS starter with real authentication, Stripe billing, protected app architecture, Prisma foundations, and launch-ready SaaS flows already wired.',
  openGraph: {
    title:
      'Starter Pro — Next.js SaaS starter with auth and billing | PyColors',
    description:
      'Launch a real SaaS faster with authentication, Stripe billing, protected app architecture, and production-ready foundations already built.',
    url: 'https://pycolors.io/starters/pro',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Starter Pro — Next.js SaaS starter with auth and billing | PyColors',
    description:
      'Launch a real SaaS faster with authentication, Stripe billing, protected app architecture, and production-ready foundations already built.',
    images: ['/seo/twitter-main.png'],
  },
  alternates: {
    canonical: 'https://pycolors.io/starters/pro',
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
  changelog: '/changelog',
  roadmap: '/roadmap',
  license: '/license',
  terms: '/terms',
} as const;

const screenshots = [
  {
    title: 'Authentication flow',
    description:
      'Real sign-in, account access, verification, and protected session flows.',
    image: '/images/starters/pro-auth-pycolors.png',
    href: INTERNAL.docsAuth,
  },
  {
    title: 'Billing foundation',
    description:
      'Stripe-oriented pricing, billing states, invoices, and customer portal entrypoints.',
    image: '/images/starters/pro-billing-pycolors.png',
    href: INTERNAL.docsBilling,
  },
  {
    title: 'Protected app surface',
    description:
      'Dashboard, settings, account areas, and protected product structure.',
    image: '/images/starters/pro-dashboard-pycolors.png',
    href: INTERNAL.docsBackend,
  },
] as const;

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
    title: 'Built to reduce launch friction',
    description:
      'Starter Pro removes repeated foundation work so you can focus on product logic, onboarding, positioning, customers, and growth.',
    icon: Rocket,
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
] as const;

const trustItems = [
  {
    title: 'Production-shaped scope',
    description:
      'Focused on the expensive SaaS wiring behind the UI: auth, billing, database, protected flows, and account structure.',
    icon: Code2,
  },
  {
    title: 'Documentation-first',
    description:
      'Starter Pro is supported by implementation docs so buyers understand what is included and how to extend it.',
    icon: Mail,
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
    question: 'Why buy Starter Pro instead of using Starter Free?',
    answer:
      'Starter Free helps you validate product shape. Starter Pro removes the auth, billing, database, and protected architecture bottlenecks that slow real SaaS launches.',
  },
  {
    question: 'Will the price stay at 199 €?',
    answer:
      'No. 199 € is the current launch price. The regular price is planned at 299 € as Starter Pro matures and more production features are added.',
  },
] as const;

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

function ScreenshotCard({
  title,
  description,
  image,
  href,
}: {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly href: string;
}) {
  return (
    <Card className="group overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-all hover:border-border hover:bg-surface-elevated">
      <div className="border-b border-border-subtle bg-surface-muted px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-foreground">
            {title}
          </p>

          <span className="text-[11px] text-muted-foreground">
            Pro surface
          </span>
        </div>
      </div>

      <div className="relative aspect-16/10 overflow-hidden border-b border-border-subtle bg-background">
        <Image
          src={image}
          alt={`${title} screenshot`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            {title}
          </p>

          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="rounded-[5px]"
        >
          <Link href={href}>View implementation details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function StarterProPage() {
  return (
    <main className="bg-background text-foreground">
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
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
            title="Stop rebuilding auth and billing. Start closer to launch."
            subtitle="A production-ready Next.js SaaS starter with the business layer already wired."
            description="Starter Pro gives you real authentication, Stripe billing, protected app architecture, Prisma foundations, and launch-ready SaaS surfaces so you can focus on your product instead of repeated setup work."
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
                  <Link href={INTERNAL.docsStarterPro}>
                    Read docs
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
            extraClassName="mx-auto max-w-6xl"
            extra={
              <>
                <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
                  <CheckItem>Full source code</CheckItem>
                  <CheckItem>Real auth wired</CheckItem>
                  <CheckItem>Stripe billing wired</CheckItem>
                  <CheckItem>Protected SaaS app</CheckItem>
                </div>

                <div className="mx-auto mt-12 max-w-6xl">
                  <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium">
                    <div className="border-b border-border-subtle bg-surface-muted px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-xs font-medium">
                            Starter Pro
                          </span>
                        </div>

                        <span className="text-[11px] text-muted-foreground">
                          Protected SaaS foundation
                        </span>
                      </div>
                    </div>

                    <div className="group relative aspect-video overflow-hidden bg-background">
                      <Image
                        src="/images/starters/starter-pro-pycolors-hero.png"
                        alt="Starter Pro protected SaaS dashboard preview"
                        fill
                        priority
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.012]"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.14),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/50 to-transparent" />
                    </div>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </Container>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why it exists"
              title="Most SaaS starters stop at UI. Starter Pro wires the expensive part."
              description="The hardest repeated work is rarely the landing page. It is auth, billing, protected routes, account flows, database synchronization, and all the small decisions needed before a SaaS can charge customers."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
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
              title="Focused screenshots for the business layer."
              description="Starter Pro should not feel like a screenshot gallery. It shows the surfaces that matter most when a SaaS becomes real: auth, billing, and protected application structure."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {screenshots.map((screenshot) => (
                <ScreenshotCard
                  key={screenshot.title}
                  title={screenshot.title}
                  description={screenshot.description}
                  image={screenshot.image}
                  href={screenshot.href}
                />
              ))}
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
                protected routes, and SaaS infrastructure should
                already be handled.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Pill>Launch price {launchPrice}</Pill>
                <Pill>One-time payment</Pill>
                <Pill>Instant access</Pill>
                <Pill>Commercial usage</Pill>
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

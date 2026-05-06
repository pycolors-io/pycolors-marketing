import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Check,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  LayoutTemplate,
  Lock,
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
  title: 'Starters | PyColors',
  description:
    'Production-first SaaS starters built on PyColors UI. Start free to validate your SaaS surface, then upgrade to Starter Pro for real authentication, Stripe billing, protected architecture, and launch-ready foundations.',
  alternates: { canonical: '/starters' },
  openGraph: {
    title: 'Starters | PyColors',
    description:
      'Start free to validate your SaaS surface. Upgrade to Starter Pro when auth, billing, and protected architecture become the bottleneck.',
    url: '/starters',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starters | PyColors',
    description:
      'Validate first with Starter Free. Launch faster with Starter Pro.',
    images: ['/seo/twitter-main.png'],
  },
};

const INTERNAL = {
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
  pricing: '/pricing',
  starterFree: '/starters/free',
  starterPro: '/starters/pro',
  docsStarter: '/docs/starter',
  docsUpgrade: '/docs/starter/upgrade',
  upgrade: '/upgrade',
} as const;

const EXTERNAL = {
  starterDemo: 'https://starter-demo.pycolors.io',
} as const;

const launchPrice = '199 €';
const regularPrice = '299 €';

const cardClass =
  'rounded-[5px] border border-border-subtle bg-surface text-surface-foreground shadow-soft';

const proCardClass =
  'rounded-[5px] border border-pro-border bg-pro-surface text-surface-foreground shadow-medium';

const platformCardClass =
  'rounded-[5px] border border-platform-border-subtle bg-surface text-surface-foreground shadow-soft';

const primaryButtonClass =
  'h-11 rounded-[5px] bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-brand-primary-hover';

const starterFreeHighlights = [
  'Production-shaped SaaS screens',
  'Auth UX and account surfaces',
  'Dashboard, CRUD, settings, billing',
  'Mocked by design',
  'No backend required',
  'Fast product validation',
] as const;

const starterProHighlights = [
  'Real authentication',
  'Google and GitHub OAuth',
  'Stripe Checkout',
  'Billing portal and webhooks',
  'Protected app architecture',
  'Prisma + PostgreSQL foundation',
] as const;

const comparison = [
  {
    cap: 'Product surface',
    free: 'Realistic SaaS screens and flows',
    pro: 'Same surface with production wiring',
  },
  {
    cap: 'Authentication',
    free: 'Screens, UX states, placeholders',
    pro: 'Email/password, OAuth, sessions, protected routes',
  },
  {
    cap: 'Billing',
    free: 'Billing screens and upgrade entrypoints',
    pro: 'Stripe Checkout, portal, webhooks, invoices',
  },
  {
    cap: 'Backend',
    free: 'Frontend-first with mock sources',
    pro: 'Prisma, PostgreSQL, env foundations, integrations',
  },
  {
    cap: 'Best for',
    free: 'Validation, demos, product direction',
    pro: 'Launch, revenue, customer onboarding',
  },
];

const journey = [
  {
    title: 'Explore',
    heading: 'See the product surface',
    text: 'Open the demo and understand the screens, flows, and UX direction before wiring infrastructure.',
    href: INTERNAL.starterFree,
    cta: 'Open Starter Free',
    tone: 'success',
    external: false,
  },
  {
    title: 'Validate',
    heading: 'Adapt the UX',
    text: 'Use the free starter to test positioning, navigation, dashboard structure, billing entrypoints, and product credibility.',
    href: EXTERNAL.starterDemo,
    cta: 'View live demo',
    external: true,
    tone: 'platform',
  },
  {
    title: 'Decide',
    heading: 'Measure the blocker',
    text: 'When auth, billing, sessions, protected routes, and database foundations become the bottleneck, move to Pro.',
    href: INTERNAL.pricing,
    cta: 'View pricing',
    tone: 'default',
    external: false,
  },
  {
    title: 'Launch',
    heading: 'Buy the business layer',
    text: 'Starter Pro helps you skip repeated SaaS wiring and focus on product logic, customers, onboarding, and growth.',
    href: INTERNAL.starterPro,
    cta: 'Explore Pro',
    tone: 'pro',
    external: false,
  },
] as const;

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
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
            className="rounded-[5px] border-border-subtle bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
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

function ResourceCard({
  icon,
  title,
  description,
  href,
  cta,
  tone = 'default',
}: {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
  readonly tone?: 'default' | 'platform' | 'success' | 'pro';
}) {
  return (
    <Card
      className={cn(
        tone === 'platform' ? platformCardClass : cardClass,
        tone === 'success' &&
          'rounded-[5px] border-success-border-subtle bg-surface text-surface-foreground shadow-soft',
        tone === 'pro' &&
          'rounded-[5px] border-pro-border-subtle bg-surface text-surface-foreground shadow-soft',
      )}
    >
      <CardContent className="p-5">
        <div className="space-y-4">
          <div
            className={cn(
              'inline-flex size-9 items-center justify-center rounded-[5px] border text-muted-foreground',
              tone === 'platform'
                ? 'border-platform-border-subtle bg-platform-surface-muted text-platform'
                : tone === 'success'
                  ? 'border-success-border-subtle bg-success-surface-muted text-success'
                  : tone === 'pro'
                    ? 'border-pro-border-subtle bg-pro-surface-muted text-primary'
                    : 'border-border-subtle bg-surface-muted',
            )}
          >
            {icon}
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
            size="lg"
            variant="outline"
            className={cn(
              'h-11 rounded-[5px] px-5 text-sm font-medium',
              tone === 'platform' && 'border-platform-border-subtle',
              tone === 'success' && 'border-success-border-subtle',
              tone === 'pro' && 'border-pro-border-subtle',
            )}
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

function StarterCard({
  badge,
  title,
  subtitle,
  description,
  highlights,
  primaryAction,
  secondaryAction,
  pro = false,
}: {
  readonly badge: React.ReactNode;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly primaryAction: React.ReactNode;
  readonly secondaryAction?: React.ReactNode;
  readonly pro?: boolean;
}) {
  return (
    <Card className={cn(pro ? proCardClass : cardClass, 'p-6')}>
      <CardHeader className="space-y-4 px-0 pt-0">
        <div className="space-y-3">
          <div>{badge}</div>

          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-0 pb-0">
        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        <ul className="grid gap-2 sm:grid-cols-2">
          {highlights.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row">
          {primaryAction}
          {secondaryAction}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StartersPage() {
  return (
    <main className="bg-background text-foreground">
      <Container className="py-18">
        <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-112 w-md -translate-x-1/2 rounded-[5px] bg-primary/10 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <PageHero
            maxWidth="5xl"
            badges={[
              {
                label: 'Starter Free available',
                variant: 'secondary',
                icon: (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                ),
              },
              {
                label: `Starter Pro ${launchPrice}`,
                variant: 'outline',
              },
              {
                label: `${regularPrice} regular price`,
                variant: 'outline',
              },
            ]}
            title="Start free. Upgrade when launch friction appears."
            subtitle="Validate the SaaS surface first. Buy the business layer when auth, billing, and protected architecture become the bottleneck."
            description="PyColors starters give you a clear path: use Starter Free to explore product UX, dashboards, settings, billing screens, and CRUD flows. Move to Starter Pro when you need real authentication, Stripe billing, Prisma foundations, protected routes, and a faster path to revenue."
            actions={
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Button
                  asChild
                  size="lg"
                  className={primaryButtonClass}
                >
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>

                <BuyStarterProButton
                  variant="outline"
                  label={`Buy Starter Pro — ${launchPrice}`}
                />

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.pricing}>View pricing</Link>
                </Button>
              </div>
            }
            pills={[
              'Validation-first',
              'Production-shaped UX',
              'Real upgrade path',
              'Auth + billing in Pro',
              'Built on PyColors UI',
            ]}
            extra={
              <div className="mx-auto grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
                <CheckItem>Free validates UX</CheckItem>
                <CheckItem>Pro wires auth</CheckItem>
                <CheckItem>Pro wires billing</CheckItem>
                <CheckItem>Pro accelerates launch</CheckItem>
              </div>
            }
          />

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Choose your layer"
              title="Use the starter that matches your current bottleneck."
              description="Do not buy complexity too early. Start with the surface if you need validation. Move to Pro when repeated SaaS wiring blocks launch."
              align="center"
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <StarterCard
                badge={
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-[5px] border-success-border-subtle bg-success-surface-muted text-success"
                    >
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                      Free
                    </Badge>
                    <Badge
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      Validate first
                    </Badge>
                  </div>
                }
                title="Starter Free"
                subtitle="For validating product shape before backend complexity."
                description="A production-shaped SaaS surface with auth screens, dashboard, CRUD patterns, settings, billing entrypoints, and B2B member management. Mocked by design so you can move fast without infrastructure overhead."
                highlights={starterFreeHighlights}
                primaryAction={
                  <Button
                    asChild
                    size="lg"
                    className={primaryButtonClass}
                  >
                    <Link href={INTERNAL.starterFree}>
                      Open Starter Free
                    </Link>
                  </Button>
                }
                secondaryAction={
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-[5px] px-6 text-sm font-medium"
                  >
                    <a
                      href={EXTERNAL.starterDemo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Live demo
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                }
              />

              <StarterCard
                pro
                badge={
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="gap-2 rounded-[5px] border-pro-border-subtle bg-pro-surface-muted text-primary">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      Pro
                    </Badge>
                    <Badge className="rounded-[5px] border-pro-border-subtle bg-pro-surface-muted text-muted-foreground">
                      Best launch path
                    </Badge>
                  </div>
                }
                title="Starter Pro"
                subtitle="For launching faster with real auth and billing."
                description="Move from product-shaped starter to a real commercial SaaS baseline with authentication, Stripe billing, webhook synchronization, protected app foundations, Prisma, PostgreSQL, and stronger launch-ready architecture."
                highlights={starterProHighlights}
                primaryAction={
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${launchPrice}`}
                  />
                }
                secondaryAction={
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-[5px] border-pro-border-subtle px-6 text-sm font-medium"
                  >
                    <Link href={INTERNAL.starterPro}>
                      Explore Starter Pro
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                }
              />
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Free vs Pro"
              title="Free validates the surface. Pro wires the business."
              description="Pro is not just more screens. It is less repeated engineering work between your product idea and your first customers."
              action={
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.pricing}>See pricing</Link>
                </Button>
              }
            />

            <Card className={cn(cardClass, 'p-6 sm:p-7')}>
              <div className="overflow-hidden rounded-[5px] border border-border-subtle">
                <div className="grid grid-cols-1 bg-surface-muted sm:grid-cols-3">
                  <div className="border-b border-border-subtle px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                    Capability
                  </div>
                  <div className="border-b border-border-subtle px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                    Starter Free
                  </div>
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground">
                    Starter Pro
                  </div>
                </div>

                {comparison.map((row) => (
                  <div
                    key={row.cap}
                    className="grid grid-cols-1 sm:grid-cols-3"
                  >
                    <div className="border-t border-border-subtle px-4 py-3 text-sm font-medium text-foreground">
                      {row.cap}
                    </div>
                    <div className="border-t border-border-subtle px-4 py-3 text-sm text-muted-foreground sm:border-l">
                      {row.free}
                    </div>
                    <div className="border-t border-border-subtle px-4 py-3 text-sm font-medium text-foreground sm:border-l">
                      {row.pro}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className={primaryButtonClass}
                >
                  <Link href={INTERNAL.starterFree}>
                    Start with Free
                  </Link>
                </Button>

                <BuyStarterProButton
                  fullWidth={false}
                  label={`Buy Starter Pro — ${launchPrice}`}
                />
              </div>
            </Card>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Builder journey"
              title="A simple path from validation to launch."
              description="The ecosystem is designed to reduce decision fatigue: explore the product surface, validate the UX, then upgrade when infrastructure becomes the real blocker."
              align="center"
            />

            <div className="grid gap-4 lg:grid-cols-4">
              {journey.map((item, index) => (
                <Card
                  key={item.title}
                  className={cn(
                    cardClass,
                    'p-5',
                    item.tone === 'platform' &&
                      'border-platform-border-subtle',
                    item.tone === 'success' &&
                      'border-success-border-subtle',
                    item.tone === 'pro' && 'border-pro-border-subtle',
                  )}
                >
                  <div className="space-y-3">
                    <div
                      className={cn(
                        'text-xs font-medium text-muted-foreground',
                        item.tone === 'platform' && 'text-platform',
                        item.tone === 'success' && 'text-success',
                        item.tone === 'pro' && 'text-primary',
                      )}
                    >
                      {index + 1}. {item.title}
                    </div>

                    <div className="text-sm font-medium text-foreground">
                      {item.heading}
                    </div>

                    <p className="text-sm leading-7 text-muted-foreground">
                      {item.text}
                    </p>

                    <div className="pt-3">
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className={cn(
                          'h-11 rounded-[5px] px-5 text-sm font-medium',
                          item.tone === 'platform' &&
                            'border-platform-border-subtle',
                          item.tone === 'success' &&
                            'border-success-border-subtle',
                          item.tone === 'pro' &&
                            'border-pro-border-subtle',
                        )}
                      >
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {item.cta}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        ) : (
                          <Link href={item.href}>{item.cta}</Link>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Developer platform"
              title="Use the ecosystem to understand the product logic first."
              description="The starter becomes more valuable when it is connected to guides, examples, and patterns instead of treated like an isolated repository."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <ResourceCard
                tone="platform"
                icon={
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                }
                title="Guides"
                description="Learn how SaaS products structure dashboards, auth, billing, team systems, project and admin surfaces."
                href={INTERNAL.guides}
                cta="Read guides"
              />

              <ResourceCard
                icon={
                  <LayoutTemplate
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                }
                title="UI Patterns"
                description="Explore production-shaped interface patterns before choosing how your own product should feel."
                href={INTERNAL.patterns}
                cta="Browse patterns"
              />

              <ResourceCard
                tone="success"
                icon={
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                }
                title="Examples"
                description="Study real SaaS surface directions and what is already available today through Starter Free."
                href={INTERNAL.examples}
                cta="See examples"
              />
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Why Pro exists"
              title="Starter Pro is for the work that delays revenue."
              description="The expensive part is not drawing another dashboard. It is wiring the secure business layer correctly enough to launch and charge customers."
              align="center"
            />

            <div className="grid gap-4 md:grid-cols-3">
              <ResourceCard
                tone="pro"
                icon={<Lock className="h-4 w-4" aria-hidden="true" />}
                title="Authentication"
                description="Email/password auth, OAuth providers, sessions, account flows, and protected routes already wired."
                href={INTERNAL.starterPro}
                cta="Review Pro"
              />

              <ResourceCard
                tone="pro"
                icon={
                  <CreditCard
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                }
                title="Billing"
                description="Stripe Checkout, billing portal, invoices, webhook synchronization, and subscription lifecycle flows."
                href={INTERNAL.starterPro}
                cta="Review billing"
              />

              <ResourceCard
                tone="pro"
                icon={
                  <LayoutDashboard
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                }
                title="Protected app"
                description="Protected app architecture, account areas, settings, billing-aware surfaces, and launch-ready foundations."
                href={INTERNAL.starterPro}
                cta="Review architecture"
              />
            </div>
          </section>

          <section className="mt-10">
            <Card className={cn(proCardClass, 'p-6 sm:p-8')}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                  >
                    Final decision
                  </Badge>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    Start with the surface. Buy Pro when the business
                    layer matters.
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Use Starter Free now to validate UX. Move to
                    Starter Pro when you want real authentication,
                    Stripe billing, protected architecture, and the
                    path to revenue shortened.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Pill>Free validates UX</Pill>
                    <Pill>Pro wires auth</Pill>
                    <Pill>Pro wires billing</Pill>
                    <Pill>Launch price {launchPrice}</Pill>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:min-w-64">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-[5px] px-6 text-sm font-medium"
                  >
                    <Link href={INTERNAL.starterFree}>
                      Open Starter Free
                    </Link>
                  </Button>

                  <BuyStarterProButton
                    label={`Buy Starter Pro — ${launchPrice}`}
                  />
                </div>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Starter docs live under{' '}
              <Link
                href={INTERNAL.docsStarter}
                className="font-mono text-foreground underline underline-offset-4"
              >
                {INTERNAL.docsStarter}
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}

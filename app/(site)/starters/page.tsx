import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  LayoutTemplate,
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
    'Production-first SaaS starters built on PyColors UI. Validate your SaaS surface first, then upgrade to real authentication, Stripe billing, and launch-ready foundations.',
  alternates: { canonical: '/starters' },
  openGraph: {
    title: 'Starters | PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for validation first and launch-ready upgrades later.',
    url: '/starters',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starters | PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for validation first and launch-ready upgrades later.',
    images: ['/seo/twitter-main.png'],
  },
};

const INTERNAL = {
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
  access: '/pricing',
  starterFree: '/starters/free',
  starterPro: '/starters/pro',
  docsStarter: '/docs/starter',
  docsUpgrade: '/docs/starter/upgrade-to-pro',
  upgrade: '/upgrade',
} as const;

const EXTERNAL = {
  starterDemo: 'https://starter-demo.pycolors.io',
} as const;

const cardClass =
  'rounded-[5px] border border-border-subtle bg-surface text-surface-foreground shadow-soft';

const proCardClass =
  'rounded-[5px] border border-pro-border bg-surface text-surface-foreground shadow-soft';

const platformCardClass =
  'rounded-[5px] border border-platform-border-subtle bg-surface text-surface-foreground shadow-soft';

const primaryButtonClass =
  'h-11 rounded-[5px] bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-brand-primary-hover';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
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
        'mb-7 space-y-3',
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className="space-y-2">
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
        <div className="shrink-0 sm:self-start">{action}</div>
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
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
  tone?: 'default' | 'platform' | 'success';
}) {
  return (
    <Card
      className={cn(
        tone === 'platform' ? platformCardClass : cardClass,
        tone === 'success' &&
          'rounded-[5px] border-success-border-subtle bg-surface text-surface-foreground shadow-soft',
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
  pills,
  primaryAction,
  secondaryAction,
  pro = false,
}: {
  badge: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  pills: string[];
  primaryAction: React.ReactNode;
  secondaryAction?: React.ReactNode;
  pro?: boolean;
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

        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className={cn(
                'inline-flex items-center rounded-[5px] border px-2.5 py-1 text-xs',
                pro
                  ? 'border-pro-border-subtle bg-pro-surface-muted text-muted-foreground'
                  : 'border-border-subtle bg-surface-muted text-muted-foreground',
              )}
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {primaryAction}
          {secondaryAction}
        </div>
      </CardContent>
    </Card>
  );
}

const comparison = [
  {
    cap: 'Auth',
    free: 'Screens, UX states, and navigation flows',
    pro: 'Auth.js, sessions, providers, protected routes',
  },
  {
    cap: 'Billing',
    free: 'Billing surface and pricing entrypoints',
    pro: 'Stripe checkout, portal, webhooks, invoices',
  },
  {
    cap: 'Backend',
    free: 'Frontend-first with mock sources',
    pro: 'Production foundations and integration contracts',
  },
  {
    cap: 'Best for',
    free: 'Validation, demos, product direction',
    pro: 'Launch, revenue, customer onboarding',
  },
];

const journey = [
  {
    title: 'Learn',
    heading: 'Understand SaaS products',
    text: 'Read guides explaining dashboards, auth, billing, team systems, and admin surfaces.',
    href: INTERNAL.guides,
    cta: 'Read guides',
  },
  {
    title: 'Explore',
    heading: 'Study real interfaces',
    text: 'Browse patterns and examples to understand what a credible product surface should feel like.',
    href: INTERNAL.examples,
    cta: 'See examples',
  },
  {
    title: 'Validate',
    heading: 'Run the product surface',
    text: 'Use Starter Free to validate product shape before investing time into backend infrastructure.',
    href: INTERNAL.starterFree,
    cta: 'Open Starter Free',
  },
  {
    title: 'Launch',
    heading: 'Upgrade when wiring blocks you',
    text: 'Move to Starter Pro when authentication, billing, and protected foundations slow progress.',
    href: INTERNAL.starterPro,
    cta: 'Explore Pro',
  },
];

export default function StartersPage() {
  return (
    <main className="bg-background text-foreground">
      <Container className="py-18">
        <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-[5px] bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <PageHero
            badges={[
              {
                label: 'Starter Free available',
                variant: 'secondary',
                icon: (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                ),
              },
              {
                label: 'Starter Pro available',
                variant: 'outline',
              },
              {
                label: 'Built on PyColors UI',
                variant: 'outline',
              },
            ]}
            title="Validate your SaaS faster."
            subtitle="Launch serious when the business layer matters."
            description="Start with a credible product surface: dashboard, CRUD screens, settings, billing entrypoints, and auth UX. Upgrade when you need real authentication, Stripe billing, protected architecture, and a faster path to revenue."
            actions={
              <>
                <Button
                  asChild
                  size="lg"
                  className={primaryButtonClass}
                >
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterPro}>
                    View Starter Pro
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.access}>View pricing</Link>
                </Button>
              </>
            }
            pills={[
              'Next.js App Router',
              'Tailwind v4',
              'Production-shaped UX',
              'Validation-first',
              'Upgrade path included',
            ]}
            extra={
              <p className="text-xs text-muted-foreground">
                Starter docs live under{' '}
                <Link
                  href={INTERNAL.docsStarter}
                  className="font-mono text-foreground underline underline-offset-4"
                >
                  {INTERNAL.docsStarter}
                </Link>
                .
              </p>
            }
          />

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="How to use starters"
              title="Start with the layer you actually need"
              description="Do not buy complexity too early. Validate the product surface first. Move to the business layer when auth, billing, and protected foundations become the real blocker."
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
                      Frontend-first
                    </Badge>
                  </div>
                }
                title="Starter Free"
                subtitle="The entry point for validating product shape."
                description="A production-shaped SaaS surface with auth screens, dashboard, CRUD patterns, settings, billing entrypoints, and B2B member management — mocked by design so you can move fast without backend overhead."
                pills={[
                  'Mock data',
                  'Layouts and states',
                  'Ready to adapt',
                ]}
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
                      Commercial baseline
                    </Badge>
                  </div>
                }
                title="Starter Pro"
                subtitle="The upgrade when auth and billing become the real bottleneck."
                description="Move from product-shaped starter to a real commercial SaaS baseline with authentication, Stripe billing, webhook synchronization, protected app foundations, and stronger launch-ready architecture."
                pills={[
                  'Auth wired',
                  'Billing wired',
                  'Protected foundations',
                ]}
                primaryAction={
                  <BuyStarterProButton
                    fullWidth={false}
                    label="Buy Starter Pro — 199 €"
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
              eyebrow="Developer platform"
              title="Use the ecosystem to understand the product logic first"
              description="The starter becomes more valuable when it is connected to patterns, examples, and guides instead of treated like an isolated repository."
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
              eyebrow="Free vs Pro"
              title="Free validates the surface. Pro accelerates the business layer."
              description="Do not think of Pro as more screens. Think of it as less repeated engineering work between your product and revenue."
              action={
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.access}>See pricing</Link>
                </Button>
              }
            />

            <Card className={cn(cardClass, 'p-6 sm:p-7')}>
              <div className="overflow-hidden rounded-[5px] border border-border-subtle">
                <div className="grid grid-cols-1 bg-surface sm:grid-cols-3">
                  <div className="border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                    Capability
                  </div>
                  <div className="border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
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
                    <div className="border-t border-border px-4 py-3 text-sm font-medium text-foreground">
                      {row.cap}
                    </div>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:border-l">
                      {row.free}
                    </div>
                    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:border-l">
                      {row.pro}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                <span className="text-foreground">/starter-pro</span>{' '}
                explains the product.
                <span className="text-foreground">
                  {' '}
                  /upgrade
                </span>{' '}
                explains when to move.
                <span className="text-foreground">
                  {' '}
                  /pricing
                </span>{' '}
                defines the pricing decision.
              </p>
            </Card>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Builder journey"
              title="From learning SaaS products to shipping your own"
              description="The ecosystem is designed to reduce decision fatigue: understand, validate, then upgrade only when the next layer is truly needed."
            />

            <div className="grid gap-4 lg:grid-cols-4">
              {journey.map((item, index) => (
                <Card
                  key={item.title}
                  className={cn(
                    cardClass,
                    'p-5',
                    index === 0 && 'border-platform-border-subtle',
                    index === 2 && 'border-success-border-subtle',
                    index === 3 && 'border-pro-border-subtle',
                  )}
                >
                  <div className="space-y-2">
                    <div
                      className={cn(
                        'text-xs text-muted-foreground',
                        index === 0 && 'text-platform',
                        index === 2 && 'text-success',
                        index === 3 && 'text-primary',
                      )}
                    >
                      {item.title}
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
                          index === 0 &&
                            'border-platform-border-subtle',
                          index === 2 &&
                            'border-success-border-subtle',
                          index === 3 && 'border-pro-border-subtle',
                        )}
                      >
                        <Link href={item.href}>{item.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <Card className={cn(cardClass, 'p-6 sm:p-7')}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Start free. Upgrade when the business layer
                    matters.
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    Use Starter Free now to validate UX. Move to
                    Starter Pro when you want the foundation wired and
                    the path to revenue shortened.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-[5px] border border-success-border-subtle bg-success-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
                      Progressive adoption
                    </span>
                    <span className="rounded-[5px] border border-platform-border-subtle bg-platform-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
                      Stable UI system
                    </span>
                    <span className="rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
                      Real upgrade path
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className={primaryButtonClass}
                  >
                    <Link href={INTERNAL.starterFree}>
                      Open Starter Free
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-[5px] border-pro-border-subtle px-6 text-sm font-medium"
                  >
                    <Link href={INTERNAL.upgrade}>
                      See upgrade path
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Building in public. Shipping product-shaped SaaS
              foundations.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}

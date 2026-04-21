import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  BadgeCheck,
  BookOpen,
  ExternalLink,
  LayoutTemplate,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';
import { Container } from '@/components/container';
import { NpmBadges } from '@/components/npm-badges';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: 'Starter Free | PyColors',
  description:
    'Starter Free gives you a production-shaped SaaS surface with auth UX, dashboard, CRUD screens, settings, billing entrypoints, and B2B management — mocked by design, ready to validate and later upgrade.',
  alternates: { canonical: '/starters/free' },
  openGraph: {
    title: 'Starter Free | PyColors',
    description:
      'A production-shaped Next.js SaaS starter with real screens and UX contracts — mocked by design, ready to validate and upgrade later.',
    url: '/starters/free',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starter Free | PyColors',
    description:
      'A production-shaped Next.js SaaS starter with real screens and UX contracts — mocked by design, ready to validate and upgrade later.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const EXTERNAL = {
  demo: 'https://starter-demo.pycolors.io',
  repo: 'https://github.com/pycolors-io/pycolors-starter-free',
} as const;

const INTERNAL = {
  starters: '/starters',
  ui: '/ui',
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
  docs: '/docs/starter',
  docsUpgrade: '/docs/starter/upgrade-to-pro',
  upgrade: '/upgrade',
  pricing: '/pricing',
  starterPro: '/starters/pro',
  roadmap: '/roadmap',
} as const;

const productSurfaces = [
  {
    title: '/login + /register + /forgot',
    badge: 'Auth UX',
    subtitle:
      'The mandatory entry point of any SaaS — with clean states, clear flows, and no provider lock-in.',
    points: [
      'Email and password surface',
      'OAuth placeholder entrypoint',
      'Forgot password flow',
      'Loading, error, and success states',
    ],
    why: 'You validate the UX contract now and keep full freedom on how you wire auth later.',
    href: `${EXTERNAL.demo}/login`,
  },
  {
    title: '/dashboard',
    badge: 'First impression',
    subtitle:
      'The screen that makes your product feel credible on first load.',
    points: [
      'Header with product context',
      'KPI placeholders',
      'Primary next actions',
      'Structured empty states',
    ],
    why: 'A strong dashboard makes your SaaS feel real before backend work even starts.',
    href: `${EXTERNAL.demo}/dashboard`,
  },
  {
    title: '/projects',
    badge: 'Core entity',
    subtitle:
      'A realistic CRUD surface for your main business object.',
    points: [
      'Table list',
      'Create, edit, delete',
      'Empty state',
      'Row actions and dialogs',
    ],
    why: 'Every SaaS has a central entity. You can rename the domain later, but the product pattern already works.',
    href: `${EXTERNAL.demo}/projects`,
  },
  {
    title: '/settings',
    badge: 'Maturity',
    subtitle:
      'The section that turns a mock product into something people trust.',
    points: [
      'Profile, organization, security',
      'Password and session placeholders',
      'Danger zone surface',
    ],
    why: 'Without settings, a SaaS feels incomplete. This adds maturity from day one.',
    href: `${EXTERNAL.demo}/settings`,
  },
  {
    title: '/billing',
    badge: 'Monetization',
    subtitle:
      'Billing entrypoints and subscription surfaces — mocked by design, ready to wire.',
    points: [
      'Current plan state',
      'Upgrade and downgrade actions',
      'Portal entrypoint placeholder',
      'Subscription status surface',
    ],
    why: 'You can validate monetization UX before wiring Stripe.',
    href: `${EXTERNAL.demo}/billing`,
  },
  {
    title: '/admin',
    badge: 'B2B-ready',
    subtitle:
      'A team and roles surface that makes the starter feel company-ready.',
    points: [
      'Members table',
      'Owner and member roles',
      'Invitation surface',
    ],
    why: 'B2B credibility matters. This proves you are building beyond a solo dashboard toy.',
    href: `${EXTERNAL.demo}/admin`,
  },
] as const;

const comparisonRows = [
  {
    capability: 'Product-shaped UI surfaces',
    free: 'Included',
    pro: 'Included',
  },
  {
    capability: 'Auth UX screens and states',
    free: 'Included',
    pro: 'Included + wired',
  },
  {
    capability: 'Dashboard, CRUD, settings, admin',
    free: 'Included',
    pro: 'Included + extended',
  },
  {
    capability: 'Real auth providers and sessions',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Real Stripe billing',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Webhooks and billing sync',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Protected app architecture',
    free: 'Surface only',
    pro: 'Production-shaped',
  },
  {
    capability: 'Best use case',
    free: 'Validate the product surface',
    pro: 'Launch faster',
  },
] as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function TrustPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {label}
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

function ProductFeatureCard({
  title,
  subtitle,
  points,
  why,
  href,
  badge,
}: {
  title: string;
  subtitle: string;
  points: readonly string[];
  why: string;
  href: string;
  badge?: string;
}) {
  return (
    <Card className="rounded-2xl border">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-medium">{title}</div>
            {badge ? (
              <Badge variant="outline" className="text-xs">
                {badge}
              </Badge>
            ) : null}
          </div>

          <p className="text-sm leading-7 text-muted-foreground">
            {subtitle}
          </p>

          <ul className="space-y-1 text-sm text-muted-foreground">
            {points.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>

          <p className="text-xs leading-6 text-muted-foreground">
            <span className="text-foreground">Why it matters:</span>{' '}
            {why}
          </p>

          <div className="pt-1">
            <Button asChild size="sm" variant="outline">
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${title} in the live demo`}
              >
                View in demo
                <ExternalLink
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ResourceCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Card className="rounded-2xl border">
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-muted/30 text-muted-foreground">
            {icon}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">{title}</div>
            <p className="text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="pt-1">
            <Button asChild size="sm" variant="outline">
              <Link href={href}>{cta}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StarterFreePage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <PageHero
          badges={[
            {
              label: 'Starter Free',
              variant: 'secondary',
              icon: (
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ),
            },
            {
              label: 'Production-shaped',
              variant: 'outline',
            },
            {
              label: 'Free entry point',
              variant: 'outline',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
          ]}
          title="Validate the SaaS surface before wiring the business layer."
          subtitle="Starter Free helps you move fast on product shape."
          description="Starter Free gives you a production-shaped SaaS surface out of the box: auth UX, dashboard, CRUD screens, settings, billing entrypoints, and B2B member management — mocked by design so you can validate faster before auth, billing, and backend become the real bottleneck."
          actions={
            <>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <a
                  href={EXTERNAL.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open the Starter Free live demo"
                >
                  Open live demo
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <a
                  href={EXTERNAL.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open the Starter Free repository on GitHub"
                >
                  Get the repo
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href={INTERNAL.upgrade}>
                  When should I upgrade?
                </Link>
              </Button>
            </>
          }
          pills={[
            'Next.js App Router',
            'Tailwind v4',
            'PyColors UI',
            'Mock data · no backend',
            'Upgrade-ready when wiring matters',
          ]}
          extraClassName="mx-auto max-w-6xl"
          extra={
            <>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground">
                Use Starter Free to validate the product now. Move to
                Starter Pro when auth, billing, and the business layer
                start slowing you down.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Designed for fast validation</span>
                <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
                <span>No backend required</span>
                <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
                <span>Clear upgrade path to Pro</span>
              </div>

              <div className="mx-auto mt-12 max-w-6xl">
                <div className="relative overflow-hidden rounded-[28px] border bg-background/70 p-3 shadow-2xl shadow-black/10 backdrop-blur sm:p-4">
                  <div className="rounded-[22px] border bg-muted/30 p-2 sm:p-3">
                    <div className="mb-3 flex items-center justify-between px-1 sm:px-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                      </div>

                      <div className="rounded-full border px-3 py-1 text-[11px] text-muted-foreground">
                        Starter Free preview
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[18px] border bg-card">
                      <div className="relative aspect-video w-full bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_40%)]">
                        <Image
                          src="/images/starters/starter-free-hero-pycolors.png"
                          alt="Starter Free dashboard preview"
                          fill
                          priority
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/10 to-transparent" />
                </div>
              </div>
            </>
          }
        />

        <section className="py-12 sm:py-14 lg:py-16">
          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-2">
                    <Sparkles
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why Starter Free exists
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  Starter Free is the entry point of the PyColors
                  ecosystem. Its job is simple: help you validate the
                  product surface before you spend time wiring
                  authentication, billing, backend contracts, and
                  deployment infrastructure.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-60 sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.guides}>Guides</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.patterns}>UI Patterns</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.upgrade}>Upgrade path</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-medium">
                    Built on PyColors UI
                  </div>
                  <Badge variant="outline" className="text-xs">
                    @pycolors/ui
                  </Badge>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">
                  Starter Free ships with the PyColors UI primitives
                  you already publish: buttons, cards, badges,
                  dialogs, sheets, tabs, toasts, tables, pagination,
                  skeletons, empty states, and an accessible password
                  input.
                </p>

                <div className="pt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <NpmBadges packageName="@pycolors/ui" size="sm" />
                    <span className="text-xs text-muted-foreground">
                      Open source · versioned · product-oriented
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.ui}>Explore UI</Link>
                    </Button>

                    <Button asChild size="sm" variant="outline">
                      <a
                        href="https://www.npmjs.com/package/@pycolors/ui"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        npm
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section id="included" className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="What you get"
            title="Not just components. A product-shaped SaaS surface."
            description="Starter Free gives you a realistic product shell you can run, inspect, and adapt before backend wiring."
            action={
              <Button asChild size="sm" variant="outline">
                <a
                  href={EXTERNAL.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open the live demo"
                >
                  Open demo
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {productSurfaces.map((surface) => (
              <ProductFeatureCard
                key={surface.title}
                title={surface.title}
                badge={surface.badge}
                subtitle={surface.subtitle}
                points={surface.points}
                why={surface.why}
                href={surface.href}
              />
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Learn before you wire"
            title="Starter Free works even better when connected to the rest of the ecosystem"
            description="Use the free starter to validate product shape, then explore guides, patterns, and the upgrade path to make your next move obvious."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <ResourceCard
              icon={
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              }
              title="Guides"
              description="Read focused SaaS guides covering dashboards, auth, billing, teams, admin systems, and product structure."
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
              description="Move from primitives to production-shaped product surfaces built for real SaaS workflows."
              href={INTERNAL.patterns}
              cta="Browse patterns"
            />

            <ResourceCard
              icon={
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              }
              title="Upgrade path"
              description="See when Starter Free stops being enough and when Starter Pro becomes the right move."
              href={INTERNAL.upgrade}
              cta="See upgrade"
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Mocked on purpose"
            title="Validate structure and credibility before infrastructure"
            description="Starter Free is frontend-first so you can explore product, navigation, and UX contracts without setting up a database, API, or auth provider."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-2xl border p-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  No backend required
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Data is mocked so you can validate layouts,
                  navigation, product states, and flows without
                  backend setup.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Mock data</Pill>
                  <Pill>No DB</Pill>
                  <Pill>No API</Pill>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border p-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Keep the surface, change the wiring
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  The goal is progressive adoption: keep the screens
                  and UX contracts, then plug your auth, billing, and
                  data layer when you are ready.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Provider-agnostic</Pill>
                  <Pill>Stripe-ready</Pill>
                  <Pill>Backend-agnostic</Pill>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Free vs Pro"
            title="Starter Free validates the surface. Starter Pro wires the business."
            description="Starter Free helps you move fast now. Upgrade explains when the transition becomes the right move. Pricing is where you buy."
            action={
              <BuyStarterProButton
                fullWidth={false}
                label="Buy Starter Pro — 199 €"
              />
            }
          />

          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">Free</Badge>
                  <Badge variant="outline">Starter Pro</Badge>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">
                  Start with a credible product surface today. Move to
                  Upgrade when you want to evaluate the transition.
                  Buy Starter Pro when you are ready for auth,
                  billing, and launch-ready foundations.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <TrustPill label="No lock-in" />
                  <TrustPill label="Progressive adoption" />
                  <TrustPill label="Upgrade-ready" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:items-end">
                <Button asChild variant="outline">
                  <Link href={INTERNAL.docsUpgrade}>
                    Migration guide
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href={INTERNAL.upgrade}>See Upgrade</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href={INTERNAL.pricing}>View pricing</Link>
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">
                      Capability
                    </TableHead>
                    <TableHead className="w-[35%]">
                      Starter Free
                    </TableHead>
                    <TableHead className="w-[35%]">
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

              <p className="mt-3 text-xs text-muted-foreground">
                Starter Free is the entry point. Upgrade is the
                transition page. Starter Pro is the shortest path to a
                monetizable SaaS baseline.
              </p>
            </div>
          </Card>
        </section>

        <section className="py-10 sm:py-12">
          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  Quick start
                </h2>
                <p className="text-sm text-muted-foreground">
                  Clone the repo, run the starter locally, and inspect
                  real SaaS screens in minutes.
                </p>

                <p className="text-xs text-muted-foreground">
                  Fast path: run → open dashboard → inspect surfaces →
                  adapt the product copy → wire later.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <TrustPill label="Next.js App Router" />
                  <TrustPill label="PNPM" />
                  <TrustPill label="Mock data only" />
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={EXTERNAL.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open repository
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <Button asChild size="sm" variant="secondary">
                    <a
                      href={EXTERNAL.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open live demo
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="w-full sm:max-w-md">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-2 w-2 rounded-full bg-rose-500"
                        aria-hidden="true"
                      />
                      <span
                        className="inline-flex h-2 w-2 rounded-full bg-amber-500"
                        aria-hidden="true"
                      />
                      <span
                        className="inline-flex h-2 w-2 rounded-full bg-emerald-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-xs text-muted-foreground">
                        terminal
                      </span>
                    </div>

                    <a
                      href={EXTERNAL.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Open the Starter Free repository on GitHub"
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                        focusRing,
                      )}
                    >
                      GitHub
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  <div className="px-4 py-4">
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`git clone https://github.com/pycolors-io/pycolors-starter-free.git
cd pycolors-starter-free
pnpm install
pnpm dev`}</pre>

                    <div className="mt-3 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                      Then open{' '}
                      <span className="font-mono text-foreground">
                        http://localhost:3000
                      </span>
                    </div>

                    <div className="mt-3 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                      Docs:{' '}
                      <Link
                        href={INTERNAL.docs}
                        className="font-mono text-foreground underline underline-offset-4"
                      >
                        {INTERNAL.docs}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="pt-4">
          <Card className="rounded-[32px] border bg-card px-6 py-8 shadow-lg shadow-black/5 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  Start with the surface. Move to Upgrade when wiring
                  becomes the bottleneck.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Open the demo, clone the repo, and validate your
                  SaaS surface now. When auth, billing, and the
                  business layer start blocking launch, go to Upgrade,
                  then move to Starter Pro.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Real screens</Pill>
                  <Pill>Clear states</Pill>
                  <Pill>Clear upgrade path</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[240px]">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.upgrade}>
                    See Upgrade
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <BuyStarterProButton label="Buy Starter Pro — 199 €" />
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Follow the setup guide in the docs →{' '}
            <Link
              href={INTERNAL.docs}
              className="font-mono text-foreground underline underline-offset-4"
            >
              /docs/starter
            </Link>
          </p>
        </section>
      </div>
    </Container>
  );
}

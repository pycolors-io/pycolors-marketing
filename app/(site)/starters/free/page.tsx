import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  BadgeCheck,
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
    'Production-shaped SaaS starter built for fast product validation. Real screens, realistic UX contracts, mocked by design, ready to wire.',
  alternates: { canonical: '/starters/free' },
  openGraph: {
    title: 'Starter Free | PyColors',
    description:
      'Validate your SaaS UX before backend complexity. Production-shaped Next.js starter with auth UX, dashboard, CRUD, settings, billing and admin surfaces.',
    url: '/starters/free',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starter Free | PyColors',
    description: 'Validate your SaaS UX before backend complexity.',
    images: ['/seo/twitter-main.png'],
  },
};

const EXTERNAL = {
  demo: 'https://starter-demo.pycolors.io',
  repo: 'https://github.com/pycolors-io/pycolors-starter-free',
} as const;

const INTERNAL = {
  docs: '/docs/starter',
  pricing: '/pricing',
  starterPro: '/starters/pro',
  guides: '/guides',
  patterns: '/ui/patterns',
  examples: '/examples',
  ui: '/ui',
  docsUpgrade: '/docs/starter/upgrade',
} as const;

const productSurfaces = [
  {
    title: '/login + /register',
    badge: 'Auth UX',
    subtitle:
      'Production-shaped authentication flows designed to make your SaaS feel real from day one.',
    points: [
      'Email/password UX',
      'OAuth placeholders',
      'Forgot password flow',
      'Error and loading states',
    ],
    href: `${EXTERNAL.demo}/login`,
  },
  {
    title: '/dashboard',
    badge: 'Product credibility',
    subtitle:
      'A structured dashboard designed to create immediate product confidence.',
    points: [
      'KPI placeholders',
      'Structured sections',
      'Action hierarchy',
      'Empty states',
    ],
    href: `${EXTERNAL.demo}/dashboard`,
  },
  {
    title: '/projects',
    badge: 'CRUD surface',
    subtitle:
      'Production-shaped CRUD patterns adapted to modern SaaS products.',
    points: ['Tables', 'Dialogs', 'Actions', 'Entity flows'],
    href: `${EXTERNAL.demo}/projects`,
  },
  {
    title: '/settings',
    badge: 'Trust',
    subtitle:
      'Settings surfaces that make your product feel mature and credible.',
    points: [
      'Security sections',
      'Profile management',
      'Danger zones',
      'Session placeholders',
    ],
    href: `${EXTERNAL.demo}/settings`,
  },
  {
    title: '/billing',
    badge: 'Monetization',
    subtitle:
      'Billing entrypoints and subscription UX designed before Stripe wiring.',
    points: [
      'Current plan state',
      'Upgrade actions',
      'Subscription states',
      'Portal placeholders',
    ],
    href: `${EXTERNAL.demo}/billing`,
  },
  {
    title: '/admin',
    badge: 'B2B-ready',
    subtitle: 'Company-ready team management and member flows.',
    points: [
      'Members',
      'Roles',
      'Invitations',
      'Permissions placeholders',
    ],
    href: `${EXTERNAL.demo}/admin`,
  },
] as const;

const comparisonRows = [
  {
    capability: 'Production-shaped UI',
    free: 'Included',
    pro: 'Included',
  },
  {
    capability: 'Auth UX',
    free: 'Mocked',
    pro: 'Fully wired',
  },
  {
    capability: 'Dashboard + CRUD',
    free: 'Included',
    pro: 'Extended',
  },
  {
    capability: 'Real authentication',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Stripe billing',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Webhooks',
    free: 'No',
    pro: 'Included',
  },
  {
    capability: 'Best use case',
    free: 'Validate UX',
    pro: 'Launch faster',
  },
] as const;

function SurfaceCard({
  title,
  subtitle,
  badge,
  points,
  href,
}: {
  title: string;
  subtitle: string;
  badge: string;
  points: readonly string[];
  href: string;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-colors hover:border-border">
      <CardContent className="p-6">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-medium text-foreground">
              {title}
            </div>

            <Badge
              variant="outline"
              className="rounded-[5px] border-platform-border-subtle bg-platform-muted text-[11px]"
            >
              {badge}
            </Badge>
          </div>

          <p className="text-sm leading-7 text-muted-foreground">
            {subtitle}
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {points.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-[5px]"
          >
            <a href={href} target="_blank" rel="noreferrer noopener">
              View surface
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProofPill({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="outline" className="rounded-[5px]">
      {children}
    </Badge>
  );
}

export default function StarterFreePage() {
  return (
    <Container className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <PageHero
          badges={[
            {
              label: 'Starter Free',
              variant: 'secondary',
            },
            {
              label: 'Production-shaped',
              variant: 'outline',
            },
            {
              label: 'Free entry point',
              variant: 'outline',
              icon: <Sparkles className="h-3.5 w-3.5" />,
            },
          ]}
          title="Validate your SaaS before backend complexity."
          subtitle="A production-shaped Next.js SaaS starter designed for fast validation."
          description="Starter Free gives you realistic SaaS surfaces out of the box: auth UX, dashboard, CRUD flows, settings, billing entrypoints, and B2B management — mocked by design so you can focus on product shape before infrastructure."
          actions={
            <>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[5px] px-6"
              >
                <a
                  href={EXTERNAL.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open live demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-[5px] px-6"
              >
                <a
                  href={EXTERNAL.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Get repository
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-11 rounded-[5px] px-6"
              >
                <Link href={INTERNAL.docs}>Read documentation</Link>
              </Button>
            </>
          }
          pills={[
            'Next.js App Router',
            'Tailwind v4',
            'Production-shaped UX',
            'Mocked by design',
            'Upgrade-ready',
          ]}
          extraClassName="mx-auto max-w-6xl"
          extra={
            <div className="mx-auto mt-12 max-w-6xl">
              <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium">
                <div className="border-b border-border-subtle bg-surface-muted px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                    </div>

                    <div className="rounded-[5px] border border-border-subtle px-3 py-1 text-[11px] text-muted-foreground">
                      Starter Free preview
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video w-full bg-background">
                  <Image
                    src="/images/starters/starter-free-hero-pycolors.png"
                    alt="Starter Free preview"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          }
        />

        <section className="py-16">
          <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface shadow-soft">
            <CardContent className="p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl space-y-3">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                  >
                    Why Starter Free exists
                  </Badge>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    Validate the product first.
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Most developers lose time wiring infrastructure
                    before validating if the product actually feels
                    credible. Starter Free reverses the process.
                  </p>

                  <p className="text-sm leading-7 text-muted-foreground">
                    You validate navigation, UX contracts, dashboard
                    structure, billing surfaces, and onboarding before
                    backend complexity slows momentum.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href={INTERNAL.guides}>Guides</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href={INTERNAL.patterns}>UI Patterns</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-10 sm:py-12">
          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-[5px] border-platform-border-subtle bg-platform-muted"
                    >
                      Built on PyColors UI
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      @pycolors/ui
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-balance text-2xl font-semibold tracking-tight">
                      A real UI foundation for serious SaaS products.
                    </h2>

                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      Starter Free is powered by the same design
                      system, semantic tokens, and product surfaces
                      used across the entire PyColors ecosystem.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    Buttons, dialogs, sheets, tables, pagination,
                    empty states, auth flows, settings screens, and
                    dashboard patterns already share a consistent
                    product language built for modern SaaS
                    applications.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <ProofPill>Accessible primitives</ProofPill>
                    <ProofPill>Production-shaped UX</ProofPill>
                    <ProofPill>Tailwind v4</ProofPill>
                    <ProofPill>Next.js App Router</ProofPill>
                    <ProofPill>Semantic tokens</ProofPill>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-5">
                    <NpmBadges packageName="@pycolors/ui" size="sm" />

                    <span className="text-xs text-muted-foreground">
                      Open source · versioned · actively maintained
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-[5px] border-platform-border-subtle bg-platform-muted"
            >
              Included surfaces
            </Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Production-shaped SaaS surfaces.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Not just UI components. Real product flows designed to
              make your SaaS feel credible immediately.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {productSurfaces.map((surface) => (
              <SurfaceCard
                key={surface.title}
                title={surface.title}
                badge={surface.badge}
                subtitle={surface.subtitle}
                points={surface.points}
                href={surface.href}
              />
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-[5px] border-platform-border-subtle bg-platform-muted"
            >
              Ecosystem
            </Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Learn, adapt, then wire.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Starter Free works best as the first layer of a larger
              product system: docs, guides, examples, patterns, and
              Pro wiring.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: 'Guides',
                description:
                  'Understand SaaS flows, auth, billing, dashboards, teams, and product structure.',
                href: INTERNAL.guides,
                cta: 'Read guides',
              },
              {
                icon: LayoutTemplate,
                title: 'UI Patterns',
                description:
                  'Move from primitives to reusable product surfaces designed for real SaaS workflows.',
                href: INTERNAL.patterns,
                cta: 'Browse patterns',
              },
              {
                icon: Sparkles,
                title: 'Examples',
                description:
                  'Explore realistic screens and product directions already available in Starter Free.',
                href: INTERNAL.examples,
                cta: 'See examples',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-colors hover:border-border"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="inline-flex size-9 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted text-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href={item.href}>{item.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-[5px] border-success-border-subtle bg-success-muted"
            >
              Upgrade path
            </Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Starter Free validates the UX.
              <br />
              Starter Pro wires the business.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Start with fast validation. Upgrade when authentication,
              billing, and production architecture become your
              bottleneck.
            </p>
          </div>

          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Capability</TableHead>
                    <TableHead>Starter Free</TableHead>
                    <TableHead>Starter Pro</TableHead>
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
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <BuyStarterProButton
              label="Upgrade to Starter Pro"
              fullWidth={false}
            />

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-[5px] px-6"
            >
              <Link href={INTERNAL.docsUpgrade}>
                Read upgrade guide
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-3">
                  <Badge variant="outline" className="rounded-[5px]">
                    Quick start
                  </Badge>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    Clone, run, inspect, adapt.
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Run Starter Free locally, inspect the screens,
                    adapt the product copy, then wire your own stack
                    or upgrade to Starter Pro when the business layer
                    matters.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <ProofPill>pnpm</ProofPill>
                    <ProofPill>No database</ProofPill>
                    <ProofPill>No API required</ProofPill>
                    <ProofPill>Mock data</ProofPill>
                  </div>
                </div>

                <div className="w-full lg:max-w-md">
                  <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-background">
                    <div className="flex items-center justify-between border-b border-border-subtle bg-surface-muted px-4 py-2">
                      <span className="text-xs text-muted-foreground">
                        terminal
                      </span>

                      <a
                        href={EXTERNAL.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-[5px] text-xs text-muted-foreground transition-colors hover:text-foreground',
                        )}
                      >
                        GitHub
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="p-4">
                      <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`git clone https://github.com/pycolors-io/pycolors-starter-free.git
cd pycolors-starter-free
pnpm install
pnpm dev`}</pre>

                      <div className="mt-3 rounded-[5px] border border-border-subtle bg-surface-muted px-3 py-2 text-xs text-muted-foreground">
                        Then open{' '}
                        <span className="font-mono text-foreground">
                          http://localhost:3000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="pt-6">
          <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface shadow-medium">
            <CardContent className="p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Start with the product surface.
                    <br />
                    Upgrade when infrastructure matters.
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Starter Free helps you move fast without backend
                    overhead. Starter Pro helps you launch with real
                    authentication, billing, and production-ready
                    architecture already wired.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:min-w-60">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-[5px] px-6"
                  >
                    <a
                      href={EXTERNAL.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open live demo
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <BuyStarterProButton />
                </div>
              </div>
            </CardContent>
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

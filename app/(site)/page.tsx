import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Eye,
  Sparkles,
} from 'lucide-react';

import { JsonLd } from '@/components/seo/json-ld';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from '@pycolors/ui';
import { Container } from '@/components/container';
import { UI_VERSION } from '@/lib/version';
import { NpmBadges } from '@/components/npm-badges';
import { generateBreadcrumbJsonLd } from '@/lib/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: {
    absolute: 'PyColors',
  },
  description:
    'PyColors helps developers ship credible SaaS products faster with guides, patterns, examples, Starter Free, and Starter Pro.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PyColors',
    description:
      'Build a credible SaaS faster with guides, patterns, examples, Starter Free, and Starter Pro.',
    url: '/',
    siteName: 'PyColors',
    images: ['/seo/og-main.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors',
    description:
      'Build a credible SaaS faster with guides, patterns, examples, Starter Free, and Starter Pro.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const EXTERNAL = {
  starterRepo: 'https://github.com/pycolors-io/pycolors-starter-free',
  starterDemo: 'https://starter-demo.pycolors.io',
} as const;

const INTERNAL = {
  starterFree: '/starters/free',
  starterPro: '/starters/pro',
  pricing: '/pricing',
  starterDocs: '/docs/starter',
  starterUpgradeDocs: '/docs/starter/upgrade',
  ui: '/ui',
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
  uiDocs: '/docs/ui',
  roadmap: '/roadmap',
  changelog: '/changelog',
  openSource: '/open-source',
  license: '/license',
  terms: '/terms',
  privacy: '/privacy',
} as const;

const launchPrice = '199 €';

const starterSurfaces = [
  {
    title: '/login + /register',
    desc: 'Auth UX with clean loading, error, and success states.',
    tag: 'Auth',
  },
  {
    title: '/dashboard',
    desc: 'A credible first screen with KPIs, structure, and next actions.',
    tag: 'Core',
  },
  {
    title: '/projects',
    desc: 'A core entity surface with tables, CRUD dialogs, and empty states.',
    tag: 'CRUD',
  },
  {
    title: '/settings',
    desc: 'Profile, organization, security, and danger-zone patterns.',
    tag: 'Settings',
  },
  {
    title: '/billing',
    desc: 'Billing entrypoints and subscription surfaces designed for monetization.',
    tag: 'Billing',
  },
  {
    title: '/admin',
    desc: 'Members, roles, and invitations UI for stronger B2B credibility.',
    tag: 'B2B',
  },
] as const;

const trustItems = [
  {
    title: 'Clear product scope',
    description:
      'Starter Free validates the SaaS surface. Starter Pro wires real auth, billing, protected routes, and backend foundations.',
  },
  {
    title: 'Built with trusted tools',
    description:
      'Next.js App Router, TypeScript, Tailwind, Prisma, PostgreSQL, Stripe, and Vercel-oriented foundations.',
  },
  {
    title: 'Documentation-first',
    description:
      'Guides, patterns, examples, docs, changelog, and roadmap support the product instead of leaving buyers guessing.',
  },
] as const;

function Stat({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="rounded-[5px] border border-border-subtle bg-surface px-4 py-3 shadow-soft">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Pill({ label }: { readonly label: string }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
      {label}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'center',
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

      {action ? (
        <div
          className={
            align === 'center' ? 'flex justify-center' : 'shrink-0'
          }
        >
          {action}
        </div>
      ) : null}
    </div>
  );
}

function ProductCard({
  title,
  description,
  href,
  badge,
  eyebrow,
  cta,
  highlight = false,
}: {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly badge: string;
  readonly eyebrow: string;
  readonly cta: string;
  readonly highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        'flex h-full flex-col justify-between rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft transition-colors hover:border-border',
        highlight &&
          'border-pro-border-subtle bg-pro-surface shadow-medium',
      )}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {eyebrow}
          </span>
          <Badge
            variant={highlight ? 'secondary' : 'outline'}
            className="rounded-[5px] text-xs"
          >
            {badge}
          </Badge>
        </div>

        <h3 className="text-lg font-semibold tracking-tight">
          {title}
        </h3>

        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-5">
        <Button
          asChild
          className="w-full rounded-[5px]"
          variant={highlight ? 'default' : 'outline'}
        >
          <Link href={href}>{cta}</Link>
        </Button>
      </div>
    </Card>
  );
}

function StepCard({
  step,
  title,
  description,
  href,
  cta,
  highlight = false,
}: {
  readonly step: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
  readonly highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        'rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft',
        highlight && 'border-pro-border-subtle bg-pro-surface',
      )}
    >
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {step}
        </div>

        <div className="text-sm font-medium">{title}</div>

        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        <Button
          asChild
          size="sm"
          variant={highlight ? 'default' : 'outline'}
          className="rounded-[5px]"
        >
          <Link href={href}>{cta}</Link>
        </Button>
      </div>
    </Card>
  );
}

export default function HomePage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { label: 'Home', href: '/' },
  ]);

  return (
    <>
      <JsonLd id="home-breadcrumb" data={breadcrumb} />

      <Container className="py-18">
        <div className="mx-auto w-full max-w-6xl">
          <PageHero
            maxWidth="4xl"
            badges={[
              {
                label: 'Starter Free available now',
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
                label: 'Product-first SaaS ecosystem',
                variant: 'outline',
                icon: (
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ),
              },
            ]}
            title="Build a credible SaaS faster."
            subtitle="Validate the product surface first. Wire the business when it matters."
            description="PyColors helps developers move from product idea to credible SaaS faster: guides to understand the logic, patterns to structure the interface, Starter Free to validate the product surface, and Starter Pro to launch with auth and billing already wired."
            actions={
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterFree}>
                    Start with Starter Free
                    <ArrowRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <BuyStarterProButton />

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <a
                    href={EXTERNAL.starterDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open the Starter Free live demo"
                  >
                    View live demo
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            }
            pills={[
              'Next.js App Router',
              'Tailwind v4',
              'Docs-first',
              'Production-shaped UX',
              'Launch-oriented',
            ]}
            extraClassName="mx-auto max-w-3xl"
            extra={
              <div className="grid w-full gap-3 sm:grid-cols-3">
                <Stat label="UI baseline" value={`v${UI_VERSION}`} />
                <Stat label="Starter Free" value="Runnable today" />
                <Stat label="Path" value="Free → Pro" />
              </div>
            }
          />
          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="The ecosystem"
              title="A focused path from idea to launch-ready SaaS"
              description="PyColors is not just components. It is a product path built around learning, validating, and launching faster."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ProductCard
                title="Guides"
                badge="Learn"
                eyebrow="Knowledge layer"
                description="Understand dashboards, auth, billing, teams, admin systems, and product structure before implementation."
                href={INTERNAL.guides}
                cta="Read guides"
              />

              <ProductCard
                title="Patterns"
                badge="Structure"
                eyebrow="Interface layer"
                description="Move from primitives to production-shaped surfaces designed for real SaaS workflows."
                href={INTERNAL.patterns}
                cta="Browse patterns"
              />

              <ProductCard
                title="Starter Free"
                badge="Free"
                eyebrow="Validation layer"
                description="Run a credible SaaS surface with auth UX, dashboard, CRUD, settings, billing, and admin flows."
                href={INTERNAL.starterFree}
                cta="Open Starter Free"
                highlight
              />

              <ProductCard
                title="Starter Pro"
                badge="Paid"
                eyebrow="Launch layer"
                description="Upgrade when real authentication, Stripe billing, and protected app architecture become the blocker."
                href={INTERNAL.starterPro}
                cta="See Starter Pro"
                highlight
              />
            </div>
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
                        The path
                      </Badge>

                      <Badge
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        Free → Pro
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-balance text-2xl font-semibold tracking-tight">
                        Keep the decision simple.
                      </h2>

                      <p className="max-w-md text-sm leading-7 text-muted-foreground">
                        Start with Starter Free when you need speed
                        and validation. Move to Starter Pro when
                        wiring auth, billing, and protected flows
                        becomes the bottleneck.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <p className="text-sm leading-7 text-muted-foreground">
                      PyColors helps builders avoid wasting time on
                      the wrong layer too early. Validate the product
                      first. Pay for the business wiring when the
                      product is ready to launch.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Pill label="No backend required to start" />
                      <Pill label="Mocked by design" />
                      <Pill label="Upgrade-ready" />
                      <Pill label="Real auth in Pro" />
                      <Pill label="Stripe billing in Pro" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-5">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.guides}>Guides</Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.patterns}>Patterns</Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.pricing}>Pricing</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section className="py-10 sm:py-12">
            <SectionHeader
              eyebrow="Foundation"
              title="PyColors UI is the base layer of the ecosystem"
              description="Use it independently or as the foundation for patterns, examples, Starter Free, and the broader product path."
            />

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="rounded-[5px]">
                  Open source
                </Badge>

                <Badge variant="outline" className="rounded-[5px]">
                  npm package
                </Badge>
              </div>

              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                PyColors UI gives you the primitives. Patterns give
                you product logic. Starter Free gives you a runnable
                SaaS surface. Starter Pro gives you the business layer
                when the product becomes real.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <NpmBadges packageName="@pycolors/ui" size="sm" />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.ui}>Explore UI system</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.patterns}>UI patterns</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.uiDocs}>UI docs</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.openSource}>Open source</Link>
                </Button>
              </div>
            </div>
          </section>
          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Starter Free"
              title="Start building today"
              description="Run Starter Free locally and explore a credible SaaS surface before wiring backend, auth, or billing."
            />

            <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-6 sm:p-7">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="rounded-[5px]"
                      >
                        Starter Free
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        Clone → install → run
                      </Badge>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight">
                      Validate the product surface before
                      infrastructure.
                    </h2>

                    <p className="text-sm leading-7 text-muted-foreground">
                      Starter Free gives you auth UX, dashboard, CRUD,
                      settings, billing entrypoints, and admin flows
                      with mock data — so you can validate the product
                      before backend complexity slows you down.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Pill label="Mock data" />
                      <Pill label="No database" />
                      <Pill label="No API required" />
                      <Pill label="Upgrade-ready" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.starterFree}>
                          Starter Free details
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <a
                          href={EXTERNAL.starterDemo}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Open live demo
                          <Eye
                            className="ml-2 h-4 w-4"
                            aria-hidden="true"
                          />
                        </a>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.starterDocs}>
                          Starter docs
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-background">
                    <div className="flex items-center justify-between border-b border-border-subtle bg-surface-muted px-4 py-2">
                      <span className="text-xs text-muted-foreground">
                        terminal
                      </span>

                      <a
                        href={EXTERNAL.starterRepo}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Open the Starter Free repository on GitHub"
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-[5px] text-xs text-muted-foreground transition-colors hover:text-foreground',
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
              </CardContent>
            </Card>
          </section>
          <section
            id="what-you-get"
            className="py-12 sm:py-14 lg:py-16"
          >
            <SectionHeader
              eyebrow="Product surfaces"
              title="What Starter Free gives you"
              description="Not feature noise. Product surfaces users expect on day one."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {starterSurfaces.map((surface) => (
                <Card
                  key={surface.title}
                  className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium">
                        {surface.title}
                      </div>

                      <Badge
                        variant="outline"
                        className="rounded-[5px] text-xs"
                      >
                        {surface.tag}
                      </Badge>
                    </div>

                    <p className="text-sm leading-7 text-muted-foreground">
                      {surface.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-background shadow-soft">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-border-subtle p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />

                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Built for SaaS products
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-lg text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    Start simple.
                    <br />
                    Upgrade when the business layer matters.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                    PyColors gives developers a clearer path from
                    product validation to production-ready SaaS
                    foundations.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill label="Starter Free" />
                    <Pill label="Starter Pro" />
                    <Pill label="Auth" />
                    <Pill label="Billing" />
                  </div>
                </div>

                <div className="divide-y divide-border-subtle">
                  {trustItems.map((item) => (
                    <div
                      key={item.title}
                      className="px-6 py-5 transition-colors hover:bg-surface-muted/30"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>

                      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-border-subtle bg-surface-muted/20 px-6 py-4">
                <Pill label="Auth.js" />
                <Pill label="Stripe" />
                <Pill label="Protected routes" />
                <Pill label="Docs-first" />
                <Pill label="Public roadmap" />
              </div>
            </Card>
          </section>
          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Upgrade path"
              title="Starter Free validates the product. Starter Pro wires the business."
              description="Starter Free is the surface. Starter Pro is the upgrade when auth, billing, backend, and protected flows become the bottleneck."
              action={
                <Button asChild className="rounded-[5px]">
                  <Link href={INTERNAL.starterPro}>
                    Explore Starter Pro
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              }
              align="left"
            />

            <Card className="rounded-[5px] border border-border-subtle bg-surface p-4 shadow-soft sm:p-6">
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
                  <TableRow>
                    <TableCell className="font-medium">
                      Auth
                    </TableCell>
                    <TableCell>Screens + UX states</TableCell>
                    <TableCell>
                      Providers + sessions + protected routes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Billing
                    </TableCell>
                    <TableCell>Billing UI + entrypoints</TableCell>
                    <TableCell>
                      Stripe Checkout + portal + webhooks
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Backend
                    </TableCell>
                    <TableCell>
                      Frontend-only + mock sources
                    </TableCell>
                    <TableCell>
                      Production foundations + API contracts
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild className="rounded-[5px]">
                  <Link href={INTERNAL.starterPro}>
                    See Starter Pro
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.pricing}>View pricing</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.starterUpgradeDocs}>
                    Read migration guide
                  </Link>
                </Button>
              </div>
            </Card>
          </section>
          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Workflow"
              title="Adopt progressively, without lock-in"
              description="Move from education to validation to production without rewriting everything."
            />

            <div className="grid gap-4 lg:grid-cols-4">
              <StepCard
                step="Step 01"
                title="Learn with Guides"
                description="Understand dashboards, auth, billing, teams, and admin systems."
                href={INTERNAL.guides}
                cta="Read guides"
              />

              <StepCard
                step="Step 02"
                title="Explore Patterns"
                description="Study production-shaped surfaces before deciding how your product should feel."
                href={INTERNAL.patterns}
                cta="Browse patterns"
              />

              <StepCard
                step="Step 03"
                title="Validate with Free"
                description="Run a credible SaaS surface locally and prove the UX before wiring the business layer."
                href={INTERNAL.starterFree}
                cta="Open Free"
                highlight
              />

              <StepCard
                step="Step 04"
                title="Upgrade to Pro"
                description="Move to Starter Pro when auth, billing, backend, and delivery become the blocker."
                href={INTERNAL.pricing}
                cta="View pricing"
                highlight
              />
            </div>
          </section>
          <section className="py-12 sm:py-14 lg:py-16">
            <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-6 sm:p-7">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-3">
                    <Badge
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      Built in public
                    </Badge>

                    <h3 className="text-2xl font-semibold tracking-tight">
                      Structured for the long term.
                    </h3>

                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                      Public roadmap, changelog, open source
                      foundations, guides, examples, patterns, and a
                      docs-first workflow.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href={INTERNAL.changelog}>Changelog</Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href={INTERNAL.roadmap}>Roadmap</Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href={INTERNAL.openSource}>
                        Open source
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[5px]"
              >
                <Link href={INTERNAL.license}>License</Link>
              </Button>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[5px]"
              >
                <Link href={INTERNAL.terms}>Terms</Link>
              </Button>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[5px]"
              >
                <Link href={INTERNAL.privacy}>Privacy</Link>
              </Button>
            </div>
          </section>
          <section className="pt-4">
            <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface px-6 py-8 shadow-medium sm:px-8 sm:py-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                  >
                    Next step
                  </Badge>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    Start with Free today. Upgrade when your SaaS
                    becomes real.
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Learn the product logic, validate the UX with
                    Starter Free, then move to Starter Pro when you
                    want the business layer handled.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Pill label="Guides first" />
                    <Pill label="Starter Free today" />
                    <Pill label="Starter Pro when ready" />
                    <Pill label={`Launch price ${launchPrice}`} />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:min-w-60">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'h-11 rounded-[5px] text-sm font-medium',
                      focusRing,
                    )}
                  >
                    <Link href={INTERNAL.starterFree}>
                      Start with Starter Free
                    </Link>
                  </Button>

                  <BuyStarterProButton
                    label={`Buy Starter Pro — ${launchPrice}`}
                  />
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </>
  );
}

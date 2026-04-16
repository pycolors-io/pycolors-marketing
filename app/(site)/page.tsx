import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Eye,
  Layers3,
  Sparkles,
} from 'lucide-react';

import { JsonLd } from '@/components/seo/json-ld';
import {
  Badge,
  Button,
  Card,
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
  naAiBuy:
    'https://pycolors.gumroad.com/l/na-ai-nextjs-landing?layout=profile',
  naAiDemo: 'https://na-ai-landing-template.vercel.app',
} as const;

const INTERNAL = {
  starters: '/starters',
  starterFree: '/starters/free',
  starterPro: '/starter-pro',
  upgrade: '/upgrade',
  access: '/access',
  starterDocs: '/docs/starter',
  starterUpgradeDocs: '/docs/starter/upgrade-to-pro',
  ui: '/ui',
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
  uiDocs: '/docs/ui',
  templates: '/templates',
  templateNaAi: '/templates/na-ai',
  roadmap: '/roadmap',
  changelog: '/changelog',
  openSource: '/open-source',
  license: '/license',
  terms: '/terms',
  privacy: '/privacy',
} as const;

const starterSurfaces = [
  {
    title: '/login + /register + /forgot',
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
    desc: 'A core entity surface with table, CRUD dialogs, and empty states.',
    tag: 'CRUD',
  },
  {
    title: '/settings',
    desc: 'Profile, organization, security, and danger-zone patterns.',
    tag: 'Settings',
  },
  {
    title: '/billing',
    desc: 'Billing entrypoints and subscription surfaces designed to evolve toward real monetization.',
    tag: 'Billing',
  },
  {
    title: '/admin',
    desc: 'Members, roles, and invitations UI for stronger B2B product credibility.',
    tag: 'B2B',
  },
] as const;

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
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
  align = 'center',
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
      {align === 'center' && action ? (
        <div className="flex justify-center">{action}</div>
      ) : null}
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
  href,
  cta,
  variant = 'outline',
}: {
  step: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  variant?: 'default' | 'outline' | 'secondary';
}) {
  return (
    <Card className="rounded-2xl p-5">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">{step}</div>
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>
        <div className="pt-2">
          <Button asChild size="sm" variant={variant}>
            <Link href={href}>{cta}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ProductCard({
  title,
  description,
  href,
  badge,
  badgeVariant = 'secondary',
  cta,
  ctaVariant = 'default',
  eyebrow,
}: {
  title: string;
  description: string;
  href: string;
  badge?: string;
  badgeVariant?: 'secondary' | 'outline';
  cta: string;
  ctaVariant?: 'default' | 'outline' | 'secondary';
  eyebrow?: string;
}) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl p-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {eyebrow ? (
            <span className="text-xs text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}
          {badge ? (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          ) : null}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">
            {title}
          </h3>

          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Button asChild className="w-full" variant={ctaVariant}>
          <Link href={href}>{cta}</Link>
        </Button>
      </div>
    </Card>
  );
}

function PricingPreviewCard({
  title,
  price,
  badge,
  description,
  href,
  cta,
  footnote,
  highlight = false,
}: {
  title: string;
  price: string;
  badge?: string;
  description: string;
  href: string;
  cta: string;
  footnote?: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        'flex h-full flex-col justify-between rounded-2xl p-6',
        highlight && 'border-foreground/15 shadow-sm shadow-black/5',
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight">
            {title}
          </h3>
          {badge ? (
            <Badge
              variant={highlight ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {badge}
            </Badge>
          ) : null}
        </div>

        <div className="text-3xl font-semibold tracking-tight">
          {price}
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        {footnote ? (
          <p className="text-xs leading-6 text-muted-foreground">
            {footnote}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <Button
          asChild
          className="w-full"
          variant={highlight ? 'default' : 'outline'}
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

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <section className="relative overflow-hidden rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

            <div className="mx-auto max-w-4xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Starter Free available now
                </Badge>
                <Badge variant="outline">Open-core</Badge>
                <Badge variant="outline" className="gap-1.5">
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Product-first SaaS ecosystem
                </Badge>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Build a credible SaaS faster.{' '}
                <span className="block text-muted-foreground">
                  Learn the product, validate the UX, then wire the
                  business.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                PyColors is a production-shaped SaaS ecosystem: guides
                to learn the product logic, patterns and examples to
                explore real interfaces, Starter Free to validate
                quickly, and Starter Pro to move faster when
                authentication, billing, and delivery become the real
                bottleneck.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterFree}>
                    Start with Starter Free
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <BuyStarterProButton
                  fullWidth={false}
                  label="Buy Starter Pro — 199 €"
                />

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <a
                    href={EXTERNAL.starterDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open the Starter Free live demo"
                  >
                    View live demo
                    <Eye
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </div>

              <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-3 mx-auto">
                <Stat label="UI baseline" value={`v${UI_VERSION}`} />
                <Stat
                  label="Starter Free"
                  value="Real screens · Runnable today"
                />
                <Stat
                  label="Path"
                  value="Guides → Patterns → Free → Pro"
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <TrustPill label="Next.js App Router" />
                <TrustPill label="Tailwind v4" />
                <TrustPill label="Tokens-first" />
                <TrustPill label="Docs-first workflow" />
                <TrustPill label="Launch-oriented" />
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="The ecosystem"
              title="Four layers that turn isolated UI work into a real SaaS path"
              description="PyColors is designed as a progression from understanding product logic to validating the product surface and upgrading when the business layer matters."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ProductCard
                title="Guides"
                badge="Learn"
                badgeVariant="outline"
                eyebrow="Knowledge layer"
                description="Learn the product logic behind dashboards, auth, billing, teams, admin systems, and real SaaS UX."
                href={INTERNAL.guides}
                cta="Read guides"
                ctaVariant="outline"
              />

              <ProductCard
                title="Patterns"
                badge="Explore"
                badgeVariant="outline"
                eyebrow="Interface layer"
                description="Move from primitives to production-shaped product surfaces built for real SaaS workflows."
                href={INTERNAL.patterns}
                cta="Browse patterns"
                ctaVariant="outline"
              />

              <ProductCard
                title="Examples"
                badge="Showcase"
                badgeVariant="outline"
                eyebrow="Product layer"
                description="Explore real SaaS interface directions and what is already available today through Starter Free."
                href={INTERNAL.examples}
                cta="See examples"
                ctaVariant="outline"
              />

              <ProductCard
                title="Starter Free"
                badge="Free"
                badgeVariant="secondary"
                eyebrow="Runnable layer"
                description="A production-shaped SaaS surface with auth UX, dashboard, CRUD, settings, billing entrypoints, and admin flows."
                href={INTERNAL.starterFree}
                cta="Open Starter Free"
                ctaVariant="secondary"
              />
            </div>
          </section>

          <section className="py-8 sm:py-12">
            <Card className="rounded-[28px] p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="gap-2">
                      <Layers3
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      The path
                    </Badge>
                  </div>

                  <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                    PyColors is built as a progression: learn with
                    guides, explore with patterns and examples,
                    validate with Starter Free, then move to Starter
                    Pro when auth, billing, secure delivery, and
                    backend foundations become the blocker to launch.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:min-w-[240px] sm:justify-end">
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.guides}>Guides</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.patterns}>Patterns</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.access}>Pricing</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <section className="py-8 sm:py-12">
            <SectionHeader
              eyebrow="Foundation"
              title="PyColors UI is the base layer of the ecosystem"
              description="Use it independently or as the foundation for patterns, examples, Starter Free, and the broader product path."
            />

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary">Open source</Badge>
                <Badge variant="outline">npm package</Badge>
              </div>

              <p className="max-w-xl text-sm text-muted-foreground leading-7">
                PyColors UI gives you the primitives. Patterns give
                you product logic. Starter Free gives you a runnable
                SaaS surface. Starter Pro gives you the business layer
                when the product becomes real.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <NpmBadges packageName="@pycolors/ui" size="sm" />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.ui}>Explore UI system</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.patterns}>UI patterns</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.uiDocs}>UI docs</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.openSource}>Open source</Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <Card className="rounded-[28px] p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Starter Free
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Clone → install → run
                    </Badge>
                  </div>

                  <h2 className="text-lg font-semibold tracking-tight">
                    Start building today
                  </h2>
                  <p className="text-sm text-muted-foreground leading-7">
                    Run Starter Free locally and explore a credible
                    SaaS surface before wiring backend, auth, or
                    billing.
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Fast path: run → open dashboard → inspect surfaces
                    → adapt your product copy → wire later.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <TrustPill label="Instant UI surface" />
                    <TrustPill label="Mock data" />
                    <TrustPill label="No backend required" />
                    <TrustPill label="Upgrade-ready" />
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={INTERNAL.starterFree}>
                        Starter Free details
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
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
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.starterDocs}>
                        Read starter docs
                      </Link>
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
                        href={EXTERNAL.starterRepo}
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
                          href={INTERNAL.starterDocs}
                          className="font-mono text-foreground underline underline-offset-4"
                        >
                          {INTERNAL.starterDocs}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Prefer a hosted preview?</span>
                    <a
                      href={EXTERNAL.starterDemo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-sm underline-offset-4 hover:text-foreground hover:underline',
                        focusRing,
                      )}
                    >
                      Open live demo
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section id="what-you-get" className="py-10 sm:py-14">
            <SectionHeader
              eyebrow="Starter Free"
              title="What you get with Starter Free"
              description="Not feature noise. Product surfaces users expect on day one."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {starterSurfaces.map((s) => (
                <Card key={s.title} className="rounded-2xl p-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium">
                        {s.title}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {s.tag}
                      </Badge>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mx-auto mt-6 w-full">
              <Card className="rounded-[28px] p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <BadgeCheck
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>

                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      Built on PyColors UI
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      Starter Free ships with the same PyColors UI
                      primitives you can use independently: buttons,
                      cards, badges, dialogs, sheets, tabs, toasts,
                      tables, pagination, skeletons, empty states, and
                      an accessible password input.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={INTERNAL.ui}>
                          Explore PyColors UI
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href={INTERNAL.patterns}>
                          Browse UI patterns
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href={INTERNAL.starterDocs}>
                          Read starter docs
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <SectionHeader
              eyebrow="Learn. Explore. Build."
              title="The fastest path is not guessing. It is understanding the product surface first."
              description="Education, exploration, validation, then monetization."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <ProductCard
                title="Guides"
                badge="Knowledge"
                badgeVariant="outline"
                eyebrow="Learn the logic"
                description="Read focused SaaS guides covering dashboards, auth, billing, teams, admin systems, and product structure."
                href={INTERNAL.guides}
                cta="Read guides"
                ctaVariant="outline"
              />

              <ProductCard
                title="Examples"
                badge="Showcase"
                badgeVariant="outline"
                eyebrow="Explore interfaces"
                description="See real SaaS surface directions and how PyColors is designed to support modern product workflows."
                href={INTERNAL.examples}
                cta="Explore examples"
                ctaVariant="outline"
              />

              <ProductCard
                title="Pricing"
                badge="Decision page"
                badgeVariant="outline"
                eyebrow="Choose your path"
                description="Understand the free entry point, Starter Pro, and the logic behind upgrading when business wiring starts to matter."
                href={INTERNAL.access}
                cta="View pricing"
                ctaVariant="secondary"
              />
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <SectionHeader
              eyebrow="Upgrade path"
              title="Starter Free validates the product. Starter Pro wires the business."
              description="Starter Free is the surface. Starter Pro is the upgrade when auth, billing, backend, and delivery become the bottleneck."
              action={
                <Button asChild variant="secondary">
                  <Link href={INTERNAL.upgrade}>
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

            <Card className="rounded-[28px] p-6 sm:p-7">
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
                <Button asChild variant="secondary">
                  <Link href={INTERNAL.starterPro}>
                    See Starter Pro
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={INTERNAL.access}>View pricing</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={INTERNAL.starterUpgradeDocs}>
                    Read migration guide
                  </Link>
                </Button>
              </div>
            </Card>
          </section>

          <section className="py-10 sm:py-14">
            <SectionHeader
              eyebrow="Pricing preview"
              title="A premium ecosystem shaped around leverage, not clutter"
              description="Start free, upgrade to Starter Pro when the business layer matters, and expand into other premium assets when they fit your workflow."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <PricingPreviewCard
                title="Starter Free"
                price="Free"
                badge="Available now"
                description="A production-shaped SaaS surface for validating product direction quickly."
                href={INTERNAL.starterFree}
                cta="Open Starter Free"
                footnote="Best entry point for product exploration and UX validation."
              />

              <PricingPreviewCard
                title="Starter Pro"
                price="199 €"
                badge="Main offer"
                description="A launch-ready SaaS foundation with real auth, real billing, backend foundations, and secure delivery."
                href={INTERNAL.access}
                cta="View Starter Pro pricing"
                footnote="Best choice when the business layer becomes the blocker."
                highlight
              />

              <PricingPreviewCard
                title="Templates"
                price="From 49 €"
                badge="Complementary"
                description="Premium frontend assets for teams who want polished marketing or product surfaces faster."
                href={INTERNAL.templates}
                cta="Browse templates"
                footnote="A complementary layer, not the main entry point."
              />
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <div className="mx-auto w-full">
              <Card className="rounded-[28px] p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="gap-2">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Featured premium template
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Available today
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        49 $
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight">
                      NA-AI — Premium Landing Page
                    </h3>

                    <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                      A premium landing page template for AI and SaaS
                      products with real sections, pricing toggle,
                      integrations, dark/light mode, and polished
                      production UI.
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Frontend-only by design. A fast path for
                      shipping a polished marketing surface.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:min-w-[220px] sm:items-end">
                    <Button asChild className={cn(focusRing)}>
                      <Link href={INTERNAL.templateNaAi}>
                        View NA-AI details
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="secondary"
                      className={cn(focusRing)}
                    >
                      <a
                        href={EXTERNAL.naAiBuy}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Buy NA-AI on Gumroad (opens in a new tab)"
                      >
                        Get it on Gumroad
                        <ExternalLink
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>

                    <a
                      href={EXTERNAL.naAiDemo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn(
                        'mt-1 inline-flex items-center rounded-sm text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline',
                        focusRing,
                      )}
                    >
                      View live demo
                      <Eye
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </Card>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Templates are a complementary premium layer. Starter
                Free remains the main entry point, and Starter Pro
                remains the main upgrade path for business wiring.
              </p>

              <div className="mt-3 flex justify-center">
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.templates}>
                    Browse all templates
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <SectionHeader
              eyebrow="Workflow"
              title="Adopt progressively, without lock-in"
              description="Move from education to validation to production without rewriting everything."
            />

            <div className="grid gap-4 lg:grid-cols-4">
              <StepCard
                step="Step 01"
                title="Learn with Guides"
                description="Understand the product logic behind dashboards, auth, billing, teams, and admin systems."
                href={INTERNAL.guides}
                cta="Read guides"
                variant="outline"
              />

              <StepCard
                step="Step 02"
                title="Explore Patterns & Examples"
                description="Study production-shaped surfaces before deciding how your product should feel."
                href={INTERNAL.examples}
                cta="See examples"
                variant="outline"
              />

              <StepCard
                step="Step 03"
                title="Validate with Starter Free"
                description="Run a credible SaaS surface locally and prove the UX before wiring the business layer."
                href={INTERNAL.starterFree}
                cta="Open Starter Free"
                variant="secondary"
              />

              <StepCard
                step="Step 04"
                title="Upgrade when wiring slows you down"
                description="Move to Starter Pro when auth, billing, backend, and delivery become the blocker."
                href={INTERNAL.access}
                cta="View pricing"
                variant="outline"
              />
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <Card className="rounded-[28px] p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Built in public. Structured for the long term.
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Public roadmap, changelog, open source
                    foundations, guides, examples, patterns, and a
                    docs-first workflow.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href={INTERNAL.guides}>Guides</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href={INTERNAL.examples}>Examples</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href={INTERNAL.changelog}>Changelog</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href={INTERNAL.roadmap}>Roadmap</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.openSource}>Open source</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.license}>License</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.terms}>Terms</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.privacy}>Privacy</Link>
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              PyColors is designed to compound over time — not to
              chase trends.
            </p>
          </section>

          <section className="pt-4">
            <Card className="rounded-[32px] border bg-card px-6 py-8 shadow-lg shadow-black/5 sm:px-8 sm:py-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Start with Free today. Upgrade when your SaaS
                    becomes real.{' '}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Learn the product logic, validate the UX with
                    Starter Free, then move to Starter Pro when you
                    want the business layer handled.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <TrustPill label="Guides first" />
                    <TrustPill label="Starter Free today" />
                    <TrustPill label="Starter Pro when ready" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:min-w-[240px]">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'h-11 rounded-xl text-sm font-medium',
                      focusRing,
                    )}
                  >
                    <Link href="/starters/free">
                      {' '}
                      Start with Starter Free
                    </Link>
                  </Button>
                  <BuyStarterProButton />
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </>
  );
}

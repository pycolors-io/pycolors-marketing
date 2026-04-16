import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ExternalLink,
  Eye,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Layers3,
} from 'lucide-react';

import { JsonLd } from '@/components/seo/json-ld';
import {
  Button,
  Card,
  Badge,
  cn,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@pycolors/ui';
import { Container } from '@/components/container';
import { UI_VERSION } from '@/lib/version';
import { NpmBadges } from '@/components/npm-badges';
import { generateBreadcrumbJsonLd } from '@/lib/seo/breadcrumb';

export const metadata: Metadata = {
  title: {
    absolute: 'PyColors',
  },
  description:
    'Build a credible SaaS faster with guides, patterns, Starter Free, and a premium upgrade path for business wiring.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PyColors',
    description:
      'Build a credible SaaS faster with guides, patterns, Starter Free, and a premium upgrade path for business wiring.',
    url: '/',
    siteName: 'PyColors',
    images: ['/seo/og-main.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors',
    description:
      'Build a credible SaaS faster with guides, patterns, Starter Free, and a premium upgrade path for business wiring.',
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
  upgrade: '/upgrade',
  waitlist: '/waitlist',
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
    desc: 'Billing entrypoints and subscription surfaces — mocked by design.',
    tag: 'Billing',
  },
  {
    title: '/admin',
    desc: 'Members, roles, and invitations UI for B2B product credibility.',
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
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 text-center sm:mb-7">
      <div className="space-y-1">
        <h2 className="font-brand text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
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
    <Card className="p-5">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">{step}</div>
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm leading-relaxed text-muted-foreground">
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
    <Card className="flex h-full flex-col justify-between p-6">
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
          <h3 className="font-brand text-lg font-semibold tracking-tight">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
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
        'flex h-full flex-col justify-between p-6',
        highlight && 'border-foreground/15 shadow-sm',
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="font-brand text-lg font-semibold tracking-tight">
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

        <div className="font-brand text-3xl font-semibold tracking-tight">
          {price}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {footnote ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
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

      <Container className="py-20 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* HERO */}
          <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Built in public
                </Badge>
                <Badge variant="outline">Open-core</Badge>
                <Badge variant="outline" className="gap-1.5">
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Starter Free available now
                </Badge>
              </div>

              <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Build a credible SaaS faster.
                <span className="block font-bold">
                  Learn the product. Validate the UX. Wire the
                  business when it matters.
                </span>
              </h1>

              <p className="max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                PyColors is a production-shaped SaaS ecosystem: guides
                to learn the product logic, patterns and examples to
                explore real interfaces, Starter Free to validate
                fast, and a premium path for the business layer when
                you scale.
              </p>

              <p className="max-w-3xl text-balance text-xs text-muted-foreground">
                Starter Free is available today. PRO, pricing,
                included scope, and launch packaging may evolve before
                public release. Use{' '}
                <span className="text-foreground">/access</span> and{' '}
                <span className="text-foreground">/upgrade</span> for
                current offer direction.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href={INTERNAL.starterFree}>
                    Start with Starter Free
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href={INTERNAL.access}>
                    View Access
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button asChild variant="outline">
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

                <Button asChild variant="outline">
                  <Link
                    href={INTERNAL.guides}
                    className={cn(focusRing)}
                  >
                    Browse guides
                  </Link>
                </Button>
              </div>

              <div className="mt-2 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                <Stat label="UI baseline" value={`v${UI_VERSION}`} />
                <Stat
                  label="Starter Free"
                  value="Real screens · Mocked by design"
                />
                <Stat
                  label="Ecosystem path"
                  value="Guides → Patterns → Starter → PRO"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <TrustPill label="Next.js App Router" />
                <TrustPill label="Tailwind v4" />
                <TrustPill label="Tokens-first" />
                <TrustPill label="Docs-first workflow" />
                <TrustPill label="Clear upgrade path" />
              </div>
            </div>
          </header>

          {/* ECOSYSTEM */}
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="The PyColors ecosystem"
              description="Four layers that turn isolated UI work into a production-shaped SaaS path."
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
                description="Explore real SaaS interface directions and what is already available today with Starter Free."
                href={INTERNAL.examples}
                cta="See examples"
                ctaVariant="outline"
              />

              <ProductCard
                title="Starter Free"
                badge="Free"
                badgeVariant="secondary"
                eyebrow="Runnable layer"
                description="A production-shaped SaaS surface: auth UX, dashboard, CRUD, settings, billing entrypoints, and admin."
                href={INTERNAL.starterFree}
                cta="Open Starter Free"
                ctaVariant="secondary"
              />
            </div>
          </section>

          {/* PATH */}
          <section className="py-8 sm:py-12">
            <Card className="p-6 sm:p-7">
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

                  <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    PyColors is built as a progression: learn with
                    guides, study patterns and examples, validate the
                    product surface with Starter Free, then move to
                    premium access when authentication, billing,
                    backend foundations, and premium product patterns
                    become the bottleneck.
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
                    <Link href={INTERNAL.access}>Access</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* UI SYSTEM */}
          <section className="py-8 sm:py-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary">Open source</Badge>
                <Badge variant="outline">npm package</Badge>
              </div>

              <p className="max-w-xl text-sm text-muted-foreground">
                PyColors UI powers the Starters, Templates, and the
                wider ecosystem. Use it independently or as the base
                layer for patterns, examples, and production-ready
                SaaS surfaces.
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

          {/* STARTER FREE QUICKSTART */}
          <section className="py-10 sm:py-14">
            <Card className="p-6 sm:p-7">
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

                  <h2 className="font-brand text-lg font-semibold tracking-tight">
                    Start building today
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Run Starter Free locally and explore a credible
                    SaaS UI surface before wiring backend, auth, or
                    billing.
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Fast path: run → open dashboard → inspect surfaces
                    → adapt the copy → wire later.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <TrustPill label="Instant UI surface" />
                    <TrustPill label="Mock data" />
                    <TrustPill label="No backend" />
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

          {/* WHAT YOU GET */}
          <section id="what-you-get" className="py-10 sm:py-14">
            <SectionHeader
              title="What you get with Starter Free"
              description="Not feature noise. Product surfaces users expect on day one."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {starterSurfaces.map((s) => (
                <Card key={s.title} className="p-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium">
                        {s.title}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {s.tag}
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mx-auto mt-6 w-full">
              <Card className="p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <BadgeCheck
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>

                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      Built on PyColors UI (already included)
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Starter Free ships with the PyColors UI
                      primitives you’ve published: buttons, cards,
                      badges, dialogs, sheets, tabs, toasts, tables,
                      pagination, skeletons, empty states, and an
                      accessible password input.
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

          {/* LEARN / EXPLORE / BUILD */}
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="Learn. Explore. Build."
              description="The fastest path is not guessing. It is understanding the product surface first."
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
                title="Access"
                badge="Pricing"
                badgeVariant="outline"
                eyebrow="Choose your path"
                description="Understand the free entry point, the premium upgrade path, and the long-term All-In access direction."
                href={INTERNAL.access}
                cta="View access"
                ctaVariant="secondary"
              />
            </div>
          </section>

          {/* UPGRADE MENTAL MODEL */}
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="Free validates UX. PRO wires the business."
              description="Starter Free is the surface. PRO is the upgrade path when auth, billing, backend, and deployment become the bottleneck."
              action={
                <Button asChild variant="secondary">
                  <Link href={INTERNAL.upgrade}>
                    Explore Upgrade to PRO
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              }
            />

            <Card className="p-6 sm:p-7">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">
                      Capability
                    </TableHead>
                    <TableHead className="w-[35%]">Free</TableHead>
                    <TableHead className="w-[35%]">
                      PRO (coming)
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
                    <TableCell>
                      Billing UI + mocked entrypoints
                    </TableCell>
                    <TableCell>
                      Stripe subscriptions + portal + webhooks
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
                  <Link href={INTERNAL.upgrade}>See PRO scope</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={INTERNAL.access}>View access</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={INTERNAL.starterUpgradeDocs}>
                    Read migration guide
                  </Link>
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                The product promise is stable: Starter Free validates
                the product surface. PRO wires the business layer.
                Specific pricing, included scope, and launch packaging
                may evolve before release.
              </p>
            </Card>
          </section>

          {/* PRICING PREVIEW */}
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="Pricing preview"
              description="Premium pricing aligned with time saved, setup avoided, and faster monetization."
              action={
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.access}>View access</Link>
                </Button>
              }
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <PricingPreviewCard
                title="UI PRO"
                price="€129"
                badge="Coming"
                description="Premium SaaS patterns built on top of the PyColors UI baseline."
                href={INTERNAL.waitlist}
                cta="Notify me"
                footnote="Commercial scope, updates, and included materials depend on the offer available at launch."
              />

              <PricingPreviewCard
                title="Starter PRO"
                price="€299"
                badge="Coming"
                description="The wired upgrade path for builders who want the business layer handled."
                href={INTERNAL.waitlist}
                cta="Join waitlist"
                footnote="This direction reflects intended positioning, not a final legal or commercial commitment."
              />

              <PricingPreviewCard
                title="All-In Access"
                price="€349"
                badge="Recommended"
                description="The long-term premium offer for builders who want the full PyColors SaaS stack."
                href={INTERNAL.waitlist}
                cta="Get early access"
                footnote="Included products, updates, and future premium drops depend on the scope explicitly included in the final purchased offer."
                highlight
              />
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pricing, included scope, and launch packaging may evolve
              before public release. See{' '}
              <Link
                href={INTERNAL.access}
                className="text-foreground underline underline-offset-4"
              >
                /access
              </Link>{' '}
              for current offer direction.
            </p>
          </section>

          {/* FEATURED TEMPLATE */}
          <section className="py-10 sm:py-14">
            <div className="mx-auto w-full">
              <Card className="p-6 sm:p-7">
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
                        $49
                      </span>
                    </div>

                    <h3 className="font-brand text-lg font-semibold tracking-tight">
                      NA-AI — Premium Landing Page
                    </h3>

                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                      Premium landing page template for AI and SaaS
                      products — real sections, pricing toggle,
                      integrations, dark/light mode, and clean
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
                Templates are a complementary premium layer inside the
                ecosystem. Starter Free remains the main entry point,
                while PRO defines the upgrade path for business
                wiring.
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

          {/* WORKFLOW */}
          <section className="py-10 sm:py-14">
            <SectionHeader
              title="How it fits your workflow"
              description="Adopt progressively — no rewrites, no lock-in, clear path from education to validation to production."
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
                description="Move to premium access when auth, billing, backend, and deployment become the blocker."
                href={INTERNAL.access}
                cta="View access"
                variant="outline"
              />
            </div>
          </section>

          {/* TRUST */}
          <section className="py-10 sm:py-14">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h3 className="font-brand text-lg font-semibold tracking-tight">
                    Built in public. Shipped with discipline.
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Public roadmap, changelog, waitlist, guides,
                    examples, patterns, docs-first workflow.
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
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              PyColors is designed to last — not to chase trends.
            </p>
          </section>

          {/* FINAL CTA */}
          <section className="py-10 sm:py-14">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h3 className="font-brand text-lg font-semibold tracking-tight">
                    Start with Free today. Upgrade when your SaaS
                    becomes real.
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn the product logic, validate the UX with
                    Starter Free, then join the premium path when you
                    want.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <TrustPill label="Guides first" />
                    <TrustPill label="Free today" />
                    <TrustPill label="PRO later" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={INTERNAL.starterFree}>
                      Start with Starter Free
                    </Link>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link href={INTERNAL.waitlist}>
                      Join PRO waitlist
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </>
  );
}

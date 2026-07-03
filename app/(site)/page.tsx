import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  Code2,
  CreditCard,
  Database,
  ExternalLink,
  Eye,
  GitBranch,
  LayoutTemplate,
  Lock,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';

import { JsonLd } from '@/components/seo/json-ld';
import { Badge, Button, Card, CardContent, cn } from '@pycolors/ui';
import { PRODUCT_DISPLAY } from '@/lib/products/public-catalog';
import { Container } from '@/components/container';
import { UI_VERSION } from '@/lib/version';
import { NpmBadges } from '@/components/npm-badges';
import { generateBreadcrumbJsonLd } from '@/lib/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: {
    absolute:
      'Next.js SaaS UI System, Templates & Starters · PyColors',
  },
  description:
    'PyColors helps developers build and launch modern Next.js SaaS products faster with premium templates, a production-ready UI system, Starter Free, and Starter Pro with Auth.js, Prisma, Stripe commerce, secure delivery, purchase recovery, and SaaS architecture.',
  alternates: {
    canonical: 'https://pycolors.io',
  },

  openGraph: {
    title: 'Next.js SaaS UI System, Templates & Starters · PyColors',

    description:
      'Production-ready Next.js SaaS foundations including premium templates, UI systems, Starter Free, and Starter Pro with authentication, Stripe commerce, Prisma, secure delivery, purchase recovery, and protected app architecture.',
    url: 'https://pycolors.io',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS UI System, Templates & Starters · PyColors',
    description:
      'Build modern SaaS products faster with premium templates, a production-ready UI system, Starter Free, and Starter Pro commerce foundations.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const EXTERNAL = {
  starterRepo: 'https://github.com/pycolors-io/pycolors-starter-free',
  starterDemo: 'https://starter-demo.pycolors.io',
  naAiDemo: 'https://na-ai.pycolors.io',
} as const;

const INTERNAL = {
  templates: '/templates',
  templateNaAi: '/templates/na-ai-landing',
  starterFree: '/starters/free',
  starterPro: '/starters/pro',
  pricing: '/pricing',
  starterDocs: '/docs/starter',
  starterUpgradeDocs: '/docs/starter/upgrade',
  starterProPwaDocs: '/docs/starter-pro/pwa',
  ui: '/ui',
  patterns: '/ui/patterns',
  examples: '/ui/examples',
  guides: '/guides',
  uiDocs: '/docs/ui',
  roadmap: '/roadmap',
  changelog: '/changelog',
  openSource: '/open-source',
  license: '/license',
  terms: '/terms',
  privacy: '/privacy',
} as const;

const pricing = {
  templateNaAi: PRODUCT_DISPLAY['na-ai-landing'].priceLabel,
  starterPro: PRODUCT_DISPLAY['starter-pro'].priceLabel,
} as const;

const productCards = [
  {
    title: 'NA-AI Landing',
    eyebrow: 'Template',
    badge: pricing.templateNaAi,
    description:
      'A premium AI/SaaS landing page template for launching and validating your offer quickly.',
    href: INTERNAL.templateNaAi,
    cta: 'View template',
    icon: LayoutTemplate,
    tone: 'platform',
  },
  {
    title: 'PyColors UI',
    eyebrow: 'UI system',
    badge: `v${UI_VERSION}`,
    description:
      'Production-ready React primitives, semantic tokens, and SaaS-oriented UI foundations.',
    href: INTERNAL.ui,
    cta: 'Explore UI',
    icon: Code2,
    tone: 'default',
  },
  {
    title: 'Starter Free',
    eyebrow: 'Validation layer',
    badge: 'Free',
    description:
      'A runnable SaaS surface with auth UX, dashboard, CRUD, settings, billing, and admin flows.',
    href: INTERNAL.starterFree,
    cta: 'Open Starter Free',
    icon: Zap,
    tone: 'success',
  },
  {
    title: 'Starter Pro',
    eyebrow: 'Launch layer',
    badge: pricing.starterPro,
    description:
      'A production-ready SaaS foundation with Auth.js, Stripe checkout, Prisma, protected routes, purchase recovery, and PWA-ready app foundations.',
    href: INTERNAL.starterPro,
    cta: 'See Starter Pro',
    icon: Rocket,
    tone: 'pro',
  },
] as const;

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
    title: 'Clear product ladder',
    description:
      'Templates launch the page. Starter Free validates the product surface. Starter Pro wires the business layer and commerce flow.',
    icon: GitBranch,
  },
  {
    title: 'Built with trusted tools',
    description:
      'Next.js App Router, TypeScript, Tailwind, Auth.js, Prisma, PostgreSQL, Stripe, and Vercel-oriented foundations.',
    icon: Code2,
  },
  {
    title: 'Production-shaped scope',
    description:
      'PyColors focuses on real SaaS flows: auth, billing, secure checkout, purchase recovery, dashboards, protected routes, and product UX.',
    icon: ShieldCheck,
  },
  {
    title: 'App-ready polish',
    description:
      'Starter Pro adds installable Progressive Web App foundations, standalone behavior, mobile-safe surfaces, and offline fallback routing.',
    icon: MonitorSmartphone,
  },
] as const;

const proFoundation = [
  {
    title: 'Real authentication',
    description:
      'Email/password, OAuth providers, sessions, verification, reset password, and protected access.',
    icon: Lock,
  },
  {
    title: 'Stripe billing',
    description:
      'Secure checkout, portal, invoices, subscription lifecycle, webhook synchronization, and purchase recovery.',
    icon: CreditCard,
  },
  {
    title: 'Database foundation',
    description:
      'Prisma and PostgreSQL foundations ready for real product data and SaaS workflows.',
    icon: Database,
  },
  {
    title: 'PWA-ready foundation',
    description:
      'Manifest, standalone mode, installable app behavior, professional icons, and offline fallback foundations.',
    icon: Smartphone,
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

function ProductCard({
  title,
  description,
  href,
  badge,
  eyebrow,
  cta,
  icon: Icon,
  tone,
}: {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly badge: string;
  readonly eyebrow: string;
  readonly cta: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly tone: 'default' | 'platform' | 'success' | 'pro';
}) {
  return (
    <Card
      className={cn(
        'group flex h-full flex-col justify-between rounded-[5px] border bg-surface p-6 shadow-soft transition-all hover:border-border hover:bg-surface-elevated',
        tone === 'pro' && 'border-pro-border-subtle bg-pro-surface',
        tone === 'platform' &&
          'border-platform-border-subtle bg-platform-muted/40',
        tone === 'success' &&
          'border-success-border-subtle bg-success-muted/40',
        tone === 'default' && 'border-border-subtle',
      )}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {eyebrow}
            </span>
            <Badge
              variant={tone === 'pro' ? 'secondary' : 'outline'}
              className="rounded-[5px] text-xs"
            >
              {badge}
            </Badge>
          </div>

          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] border border-border-subtle bg-surface">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button
          asChild
          className="w-full rounded-[5px]"
          variant={tone === 'pro' ? 'default' : 'outline'}
        >
          <Link href={href}>
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function FeatureRow({
  title,
  description,
  icon: Icon,
}: {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="px-6 py-5 transition-colors hover:bg-surface-muted/30">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </span>

        <div>
          <p className="text-sm font-medium text-foreground">
            {title}
          </p>

          <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
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
        'rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border',
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
          <Link href={href}>
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
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
            maxWidth="5xl"
            badges={[
              {
                label: `NA-AI Landing ${pricing.templateNaAi}`,
                variant: 'secondary',
                icon: (
                  <LayoutTemplate
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ),
              },
              {
                label: `Starter Pro ${pricing.starterPro}`,
                variant: 'outline',
                icon: (
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ),
              },
              {
                label: 'Product-first SaaS ecosystem',
                variant: 'outline',
              },
            ]}
            title="Ship credible SaaS products faster."
            subtitle="Start with a template, validate the surface, then wire the business layer."
            description="PyColors helps developers move from idea to launch with a clear product ladder: premium templates for fast marketing pages, PyColors UI for consistent interfaces, Starter Free for validation, and Starter Pro for real auth, billing, PWA-ready app foundations, and protected SaaS architecture."
            actions={
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.templateNaAi}>
                    View NA-AI Landing
                    <ArrowRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <BuyStarterProButton
                  label={`Buy Starter Pro — ${pricing.starterPro}`}
                />

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
                  >
                    Try the live demo
                    <ExternalLink
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.pricing}>
                    Compare products
                  </Link>
                </Button>
              </div>
            }
            pills={[
              'Premium templates',
              'Open-source UI',
              'Starter Free',
              'Starter Pro',
              'PWA-ready',
              'Built for real launches',
            ]}
            extraClassName="mx-auto max-w-5xl"
            extra={
              <div className="grid w-full gap-3 sm:grid-cols-3">
                <Stat label="Template" value="NA-AI Landing" />
                <Stat label="UI baseline" value={`v${UI_VERSION}`} />
                <Stat
                  label="Product path"
                  value="Template → Free → Pro"
                />
              </div>
            }
          />

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Product ladder"
              title="Choose the right PyColors product for your stage."
              description="PyColors is not a random component kit. It is a product ecosystem designed to help you launch faster without rebuilding the same SaaS foundations."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productCards.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </section>

          <section className="py-10 sm:py-12">
            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-border-subtle p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />

                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Built for SaaS builders
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-lg text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    Launch the page.
                    <br />
                    Validate the surface.
                    <br />
                    Wire the business when it matters.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                    PyColors keeps the decision simple: buy the page
                    when you need speed, use Starter Free when you
                    need validation, and upgrade to Starter Pro when
                    the product is ready to charge customers.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill label={`Templates from ${pricing.templateNaAi}`} />
                    <Pill label="Starter Free" />
                    <Pill label={`Starter Pro ${pricing.starterPro}`} />
                  </div>
                </div>

                <div className="divide-y divide-border-subtle">
                  {trustItems.map((item) => (
                    <FeatureRow key={item.title} {...item} />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-border-subtle bg-surface-muted/20 px-6 py-4">
                <Pill label="Next.js" />
                <Pill label="TypeScript" />
                <Pill label="Tailwind v4" />
                <Pill label="Stripe" />
                <Pill label="Prisma" />
                <Pill label="Docs-first" />
              </div>
            </Card>
          </section>

          <section className="py-10 sm:py-12">
            <SectionHeader
              eyebrow="Template"
              title="Start with a polished AI/SaaS landing page."
              description="NA-AI Landing is the fastest commercial entry point into PyColors: a premium frontend template designed to help you validate and sell the offer quickly."
              action={
                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href={INTERNAL.templates}>
                    Browse templates
                  </Link>
                </Button>
              }
              align="left"
            />

            <Card className="overflow-hidden rounded-[5px] border border-platform-border-subtle bg-platform-muted/30 shadow-soft">
              <CardContent className="p-6 sm:p-7">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-[5px] border-platform-border-subtle bg-platform-muted"
                      >
                        NA-AI Landing
                      </Badge>

                      <Badge
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        {pricing.templateNaAi} launch price
                      </Badge>
                    </div>

                    <h2 className="text-balance text-2xl font-semibold tracking-tight">
                      A premium marketing page for AI, analytics, and
                      SaaS products.
                    </h2>

                    <p className="text-sm leading-7 text-muted-foreground">
                      Use NA-AI Landing when you need the commercial
                      surface before the full product: hero, features,
                      pricing, FAQ, testimonials, charts, SEO
                      foundations, and responsive UI.
                    </p>

                    <ul className="grid gap-2">
                      <CheckItem>Full source code</CheckItem>
                      <CheckItem>Commercial usage</CheckItem>
                      <CheckItem>SEO-ready frontend page</CheckItem>
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      <Button asChild className="rounded-[5px]">
                        <Link href={INTERNAL.templateNaAi}>
                          View NA-AI Landing
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <a
                          href={EXTERNAL.naAiDemo}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Live demo
                          <ExternalLink
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
                    <div className="grid gap-3">
                      {[
                        ['Best for', 'AI/SaaS landing pages'],
                        ['Price', pricing.templateNaAi],
                        ['Delivery', 'Instant access'],
                        ['Scope', 'Frontend marketing layer'],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-4 rounded-[5px] border border-border-subtle bg-background px-4 py-3"
                        >
                          <span className="text-xs text-muted-foreground">
                            {label}
                          </span>
                          <span className="text-sm font-medium">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="py-10 sm:py-12">
            <SectionHeader
              eyebrow="Foundation"
              title="PyColors UI is the base layer of the ecosystem."
              description="Use it independently or as the foundation for patterns, examples, templates, Starter Free, and Starter Pro."
            />

            <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-6 sm:p-7">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-[5px] border-platform-border-subtle bg-platform-muted"
                      >
                        @pycolors/ui
                      </Badge>

                      <Badge
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        Open source
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-balance text-2xl font-semibold tracking-tight">
                        Consistent product foundations from the start.
                      </h2>

                      <p className="text-sm leading-7 text-muted-foreground">
                        PyColors UI gives you the primitives, semantic
                        tokens, and conventions used across the
                        ecosystem.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <p className="text-sm leading-7 text-muted-foreground">
                      Templates give you focused pages. Patterns give
                      you reusable product surfaces. Starter Free
                      gives you a runnable SaaS shell. Starter Pro
                      wires the business layer.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <NpmBadges
                        packageName="@pycolors/ui"
                        size="sm"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-5">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.ui}>Explore UI</Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.patterns}>
                          UI patterns
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href={INTERNAL.uiDocs}>UI docs</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Starter Free"
              title="Validate the product surface before infrastructure."
              description="Starter Free gives you a credible SaaS surface before backend complexity slows you down."
              action={
                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <a
                    href={EXTERNAL.starterDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open live demo
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              }
              align="left"
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
                      Explore real SaaS surfaces without a database or
                      API.
                    </h2>

                    <p className="text-sm leading-7 text-muted-foreground">
                      Auth UX, dashboard, CRUD, settings, billing
                      entrypoints, and admin flows are already shaped
                      with mock data so you can validate the product
                      before wiring the business layer.
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
              title="What Starter Free gives you."
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
            <SectionHeader
              eyebrow="Starter Pro"
              title="Starter Free validates the product. Starter Pro wires the business."
              description="Upgrade when auth, billing, backend, protected routes, PWA-ready app foundations, and SaaS infrastructure become the bottleneck."
              action={
                <Button asChild className="rounded-[5px]">
                  <Link href={INTERNAL.starterPro}>
                    Explore Starter Pro
                    <ArrowRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              }
              align="left"
            />

            <Card className="overflow-hidden rounded-[5px] border border-pro-border bg-pro-surface shadow-medium">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-pro-border-subtle p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <Badge className="rounded-[5px]">
                    Launch price {pricing.starterPro}
                  </Badge>

                  <h2 className="mt-5 max-w-lg text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    Stop rebuilding auth, billing, and protected SaaS
                    and app foundations.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                    Starter Pro gives you the expensive business layer
                    developers rebuild again and again, plus PWA-ready
                    app foundations that improve product credibility.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <BuyStarterProButton
                      fullWidth={false}
                      label={`Buy Starter Pro — ${pricing.starterPro}`}
                    />

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <a
                        href={EXTERNAL.starterDemo}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Try the live demo
                        <ExternalLink
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href={INTERNAL.pricing}>
                        View pricing
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-pro-border-subtle">
                  {proFoundation.map((item) => (
                    <FeatureRow key={item.title} {...item} />
                  ))}
                </div>
              </div>
            </Card>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              eyebrow="Workflow"
              title="Adopt progressively, without lock-in."
              description="Move from a public offer to product validation to production wiring without rebuilding everything."
            />

            <div className="grid gap-4 lg:grid-cols-4">
              <StepCard
                step="Step 01"
                title="Launch the offer"
                description="Use a template when you need a polished public page and a faster path to validation."
                href={INTERNAL.templateNaAi}
                cta="View template"
              />

              <StepCard
                step="Step 02"
                title="Build consistent UI"
                description="Use PyColors UI and patterns to keep product surfaces coherent as the app grows."
                href={INTERNAL.ui}
                cta="Explore UI"
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
                description="Move to Starter Pro when auth, billing, backend, PWA, and delivery become the blocker."
                href={INTERNAL.pricing}
                cta="View pricing"
                highlight
              />
            </div>
          </section>

          <section className="py-12 sm:py-14 lg:py-16">
            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-0">
                <div className="grid divide-y divide-border-subtle lg:grid-cols-[0.9fr_1.1fr] lg:divide-x lg:divide-y-0">
                  <div className="p-6 sm:p-7">
                    <Badge
                      variant="outline"
                      className="rounded-[5px] text-[11px]"
                    >
                      Product discipline
                    </Badge>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                      A growing ecosystem designed to help SaaS
                      builders ship faster.
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      PyColors is structured around clear product
                      scope, public releases, documentation, reusable
                      UI foundations, and a progressive path from
                      template to production-ready SaaS.
                    </p>
                  </div>

                  <div className="grid divide-y divide-border-subtle">
                    {[
                      {
                        title: 'Public roadmap',
                        description:
                          'See what is planned next across templates, UI, starters, and production features.',
                        href: INTERNAL.roadmap,
                        label: 'Roadmap',
                      },
                      {
                        title: 'Changelog',
                        description:
                          'Follow product improvements, releases, pricing changes, and ecosystem updates.',
                        href: INTERNAL.changelog,
                        label: 'Changelog',
                      },
                      {
                        title: 'Open-source foundation',
                        description:
                          'PyColors UI provides the reusable primitives behind the ecosystem.',
                        href: INTERNAL.openSource,
                        label: 'Open source',
                      },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-center justify-between gap-5 px-6 py-5 transition-colors hover:bg-surface-muted/50 sm:px-7"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.title}
                          </p>

                          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>

                        <span className="hidden shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:inline-flex">
                          {item.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ))}
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
            <Card className="relative overflow-hidden rounded-[5px] border border-pro-border-subtle bg-pro-surface px-6 py-8 shadow-medium sm:px-8 sm:py-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                  >
                    Next step
                  </Badge>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    Start with the right layer. Upgrade when the
                    business becomes real.
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Buy a template for the marketing page, use Starter
                    Free for product validation, and move to Starter
                    Pro when auth, billing, protected app, and
                    PWA-ready foundations should already be handled.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Pill
                      label={`Template ${pricing.templateNaAi}`}
                    />
                    <Pill label="Starter Free" />
                    <Pill
                      label={`Starter Pro ${pricing.starterPro}`}
                    />
                    <Pill label="Instant access" />
                    <Pill label="PWA-ready" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:min-w-60">
                  <BuyStarterProButton
                    label={`Buy Starter Pro — ${pricing.starterPro}`}
                  />

                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'h-11 rounded-[5px] text-sm font-medium',
                      focusRing,
                    )}
                  >
                    <a
                      href={EXTERNAL.starterDemo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Try the live demo
                      <ExternalLink
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'h-11 rounded-[5px] text-sm font-medium',
                      focusRing,
                    )}
                  >
                    <Link href={INTERNAL.templateNaAi}>
                      View NA-AI Landing
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

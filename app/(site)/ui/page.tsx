import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  CreditCard,
  ExternalLink,
  Layers3,
  LayoutDashboard,
  Lock,
  Rocket,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { UI_VERSION, formatVersion } from '@/lib/version';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { NpmBadges } from '@/components/npm-badges';
import { PageHero } from '@/components/marketing/page-hero';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'UI | PyColors',
  description:
    'PyColors UI is a documentation-first design system built to help developers ship real SaaS products faster with semantic tokens, accessible primitives, and product-shaped UI foundations.',
  alternates: { canonical: '/ui' },
  openGraph: {
    title: 'UI | PyColors',
    description:
      'A premium UI foundation built to help developers ship real SaaS products faster.',
    url: '/ui',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI | PyColors',
    description:
      'A premium UI foundation built to help developers ship real SaaS products faster.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const launchPrice = '199 €';

function Pill({ label }: { readonly label: string }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-3 py-1 text-xs text-muted-foreground">
      {label}
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

function Stat({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="rounded-[5px] border border-border-subtle bg-surface px-4 py-4 shadow-soft">
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl space-y-3">
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
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className="shrink-0 sm:self-start">{action}</div>
      ) : null}
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft transition-colors hover:border-border">
      <div className="space-y-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight">
            {title}
          </h3>
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

function SurfaceCard({
  title,
  tag,
  desc,
  href,
  cta,
  isExternal = false,
}: {
  readonly title: string;
  readonly tag: string;
  readonly desc: string;
  readonly href: string;
  readonly cta: string;
  readonly isExternal?: boolean;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-foreground">
            {title}
          </div>
          <Badge
            variant="outline"
            className="rounded-[5px] border-platform-border-subtle bg-platform-muted text-[11px]"
          >
            {tag}
          </Badge>
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          {desc}
        </p>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="rounded-[5px]"
        >
          {isExternal ? (
            <a href={href} target="_blank" rel="noreferrer noopener">
              {cta}
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </a>
          ) : (
            <Link href={href}>
              {cta}
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          )}
        </Button>
      </div>
    </Card>
  );
}

function ComponentCard({
  name,
  desc,
  href,
}: {
  readonly name: string;
  readonly desc: string;
  readonly href: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border hover:bg-surface-elevated',
        focusRing,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-semibold text-foreground">
            {name}
          </div>

          <span className="inline-flex rounded-[5px] border border-success-border-subtle bg-success-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-success">
            Stable
          </span>
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          {desc}
        </p>

        <div className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
          Open docs →
        </div>
      </div>
    </Link>
  );
}

const proofPoints = [
  {
    title: 'Built for real product surfaces',
    description:
      'PyColors UI is designed for auth flows, dashboards, settings, billing entrypoints, admin patterns, and the screens users actually judge.',
    icon: Layers3,
  },
  {
    title: 'Docs-first by design',
    description:
      'Preview, usage, code, and props are structured to reduce friction and help developers move faster from idea to implementation.',
    icon: Sparkles,
  },
  {
    title: 'Connected to a SaaS funnel',
    description:
      'Use the UI as the foundation, Starter Free as the product surface, and Starter Pro when auth and billing become the bottleneck.',
    icon: Rocket,
  },
] as const;

const surfaces = [
  {
    title: 'Auth flows',
    tag: 'Trust',
    desc: 'Login, register, forgot-password, and user-facing states that feel product-ready from the start.',
    href: '/starters/free',
    cta: 'See in Starter Free',
    isExternal: false,
  },
  {
    title: 'Settings surface',
    tag: 'Credibility',
    desc: 'Profile, security, sessions, and danger-zone structures that make products feel mature and trustworthy.',
    href: 'https://starter-demo.pycolors.io/settings',
    cta: 'View settings surface',
    isExternal: true,
  },
  {
    title: 'Billing entrypoints',
    tag: 'Monetization',
    desc: 'Upgrade surfaces, plan states, and monetization-oriented UI ready to evolve into real billing flows.',
    href: '/docs/starter-pro/billing',
    cta: 'Read billing docs',
    isExternal: false,
  },
  {
    title: 'CRUD + data screens',
    tag: 'Workflow',
    desc: 'Tables, dialogs, sheets, pagination, empty states, and loading states for real product workflows.',
    href: '/docs/ui/table',
    cta: 'Open Table docs',
    isExternal: false,
  },
  {
    title: 'Admin / members',
    tag: 'B2B-ready',
    desc: 'Members, invitations, and role-oriented interfaces that most UI libraries never show in context.',
    href: 'https://starter-demo.pycolors.io/admin',
    cta: 'See admin surface',
    isExternal: true,
  },
  {
    title: 'Upgrade moment',
    tag: 'Decision',
    desc: 'Understand when UI stops being enough and when auth, billing, backend, and protected product flows become the real bottleneck.',
    href: '/starters/pro',
    cta: 'See Starter Pro',
    isExternal: false,
  },
] as const;

const components = [
  {
    name: 'Dialog',
    desc: 'Accessible modal primitives for product flows.',
    href: '/docs/ui/dialog',
  },
  {
    name: 'Sheet',
    desc: 'Slide-over panels for settings, actions, and contextual UI.',
    href: '/docs/ui/sheet',
  },
  {
    name: 'Dropdown Menu',
    desc: 'Stateful menus, groups, submenus, and shortcuts.',
    href: '/docs/ui/dropdown-menu',
  },
  {
    name: 'Tabs',
    desc: 'Segmented navigation with flexible styling and states.',
    href: '/docs/ui/tabs',
  },
  {
    name: 'Toast',
    desc: 'Accessible feedback notifications with variants.',
    href: '/docs/ui/toast',
  },
  {
    name: 'Table',
    desc: 'Composable table primitives for CRUD-oriented products.',
    href: '/docs/ui/table',
  },
] as const;

export default function UiPage() {
  const versionLabel = formatVersion(UI_VERSION);

  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: `${versionLabel} · stable baseline`,
              variant: 'secondary',
              icon: (
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              ),
            },
            {
              label: 'Open source',
              variant: 'outline',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: 'SaaS-oriented',
              variant: 'outline',
            },
          ]}
          title="A UI foundation that leads to real SaaS products."
          subtitle="Build credible interfaces first. Validate with Starter Free. Upgrade when auth and billing become the bottleneck."
          description="PyColors UI gives developers a serious foundation for product-shaped interfaces: accessible primitives, semantic tokens, consistent states, and documentation that connects naturally to Starter Free and Starter Pro."
          actions={
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/docs/ui">
                  Browse components
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/starters/free">See Starter Free</Link>
              </Button>

              <BuyStarterProButton />
            </div>
          }
          extra={
            <>
              <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                <Stat label="Current version" value={versionLabel} />
                <Stat label="Workflow" value="UI → Free → Pro" />
                <Stat label="Goal" value="SaaS launch path" />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <Pill label="Semantic tokens" />
                <Pill label="Accessible primitives" />
                <Pill label="Product states" />
                <Pill label="Starter-ready" />
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://github.com/pycolors-io/pycolors-ui"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open the PyColors UI repository on GitHub"
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
            </>
          }
        />

        <section className="py-14 sm:py-16 lg:py-20">
          <Card className="rounded-[5px] border border-border-subtle bg-surface p-7 shadow-soft">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-[5px]">
                  @pycolors/ui
                </Badge>
                <Badge variant="secondary" className="rounded-[5px]">
                  Foundation layer
                </Badge>
              </div>

              <div className="space-y-3">
                <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  The open-source layer that proves the quality of the
                  whole PyColors ecosystem.
                </h2>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  PyColors UI should make the product feel credible
                  before the backend is finished. It creates the
                  visual and interaction baseline used by the docs,
                  Starter Free, and Starter Pro.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                  <p className="text-sm font-medium text-foreground">
                    Use UI directly
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Browse docs, install the package, and build
                    consistent SaaS interfaces faster.
                  </p>
                </div>

                <div className="rounded-[5px] border border-platform-border-subtle bg-platform-muted p-4">
                  <p className="text-sm font-medium text-foreground">
                    Validate with Free
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    See the UI inside auth flows, settings,
                    dashboards, billing screens, and admin surfaces.
                  </p>
                </div>

                <div className="rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted p-4">
                  <p className="text-sm font-medium text-foreground">
                    Upgrade with Pro
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Move to real auth, Stripe billing, protected
                    routes, Prisma, and launch-ready SaaS foundations.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <NpmBadges packageName="@pycolors/ui" size="sm" />
                <span className="text-xs text-muted-foreground">
                  Versioned · documented · actively maintained
                </span>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            eyebrow="Why this matters"
            title="A UI system should shorten the path to a credible product."
            description="The value is not only in components. The value is in making the product feel coherent, trustworthy, and ready to evolve."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proofPoints.map((item) => (
              <ValueCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            eyebrow="What you can ship"
            title="Real product surfaces, not isolated component demos."
            description="This is where PyColors becomes more valuable than a generic UI kit: the components are shown inside SaaS flows."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((item) => (
              <SurfaceCard
                key={item.title}
                title={item.title}
                tag={item.tag}
                desc={item.desc}
                href={item.href}
                cta={item.cta}
                isExternal={item.isExternal}
              />
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            eyebrow="Component proof"
            title={`A stronger baseline in ${versionLabel}`}
            description="Enough depth to start quickly, enough quality to support real product work."
            action={
              <Button
                asChild
                variant="outline"
                className="rounded-[5px]"
              >
                <Link href="/docs/ui">See all components</Link>
              </Button>
            }
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <ComponentCard
                key={component.name}
                name={component.name}
                desc={component.desc}
                href={component.href}
              />
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <Card className="rounded-[5px] border border-border-subtle bg-surface p-7 shadow-soft sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-success-border-subtle bg-success-muted"
                >
                  Conversion path
                </Badge>

                <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  UI gives trust. Starter Free validates. Starter Pro
                  launches.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  The page should not stop at open source. It should
                  make the commercial path obvious without forcing the
                  buyer too early.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                  <Layers3 className="h-4 w-4 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">
                    1. Build UI
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Use primitives, tokens, docs, and product
                    patterns.
                  </p>
                </div>

                <div className="rounded-[5px] border border-success-border-subtle bg-success-muted p-4">
                  <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">
                    2. Validate UX
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Use Starter Free to test dashboards, settings, and
                    flows.
                  </p>
                </div>

                <div className="rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted p-4">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">
                    3. Launch Pro
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Buy Pro when auth, billing, and protected routes
                    block launch.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row ">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Button asChild className="h-11 rounded-[5px] px-6">
                  <Link href="/docs/ui">
                    Browse components
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-[5px] px-6"
                >
                  <Link href="/starters/free">Open Starter Free</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface p-7 shadow-medium sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl space-y-4">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-pro-border bg-pro-surface-muted px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
                >
                  Next step
                </Badge>

                <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  Start with UI. Move to Pro when the business layer
                  becomes the blocker.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  PyColors UI creates the product language. Starter
                  Pro turns that product surface into a stronger SaaS
                  baseline with real authentication, Stripe billing,
                  and protected architecture.
                </p>

                <ul className="grid gap-2 sm:grid-cols-2">
                  <CheckItem>Real authentication in Pro</CheckItem>
                  <CheckItem>Stripe billing in Pro</CheckItem>
                  <CheckItem>Protected routes in Pro</CheckItem>
                  <CheckItem>Prisma foundation in Pro</CheckItem>
                </ul>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-65">
                <Button asChild className="rounded-[5px]">
                  <Link href="/docs/ui">
                    Browse components
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href="/starters/free">
                    Start with Starter Free
                  </Link>
                </Button>

                <BuyStarterProButton
                  label={`Buy Starter Pro — ${launchPrice}`}
                />
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Building in public. Shipping a real SaaS foundation layer
            by layer.
          </p>
        </section>
      </div>
    </Container>
  );
}

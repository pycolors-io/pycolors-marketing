import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  ExternalLink,
  Layers3,
  Rocket,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { UI_VERSION, formatVersion } from '@/lib/version';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { NpmBadges } from '@/components/npm-badges';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: 'UI | PyColors',
  description:
    'PyColors UI is a documentation-first design system built to help developers ship real SaaS products faster — with semantic tokens, accessible primitives, and product-shaped UI foundations.',
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

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-3 py-1 text-xs text-muted-foreground">
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
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
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
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

      {action ? <div className="sm:self-start">{action}</div> : null}
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
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
  title: string;
  tag: string;
  desc: string;
  href: string;
  cta: string;
  isExternal?: boolean;
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

        <div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-[5px]"
          >
            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
              >
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
      </div>
    </Card>
  );
}

function ComponentCard({
  name,
  desc,
  href,
}: {
  name: string;
  desc: string;
  href: string;
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
      'PyColors UI is designed for auth flows, dashboard states, settings, billing entrypoints, admin patterns, and the screens users actually judge.',
    icon: Layers3,
  },
  {
    title: 'Docs-first by design',
    description:
      'Preview, usage, code, and props are structured to reduce friction and help developers move faster from idea to implementation.',
    icon: Sparkles,
  },
  {
    title: 'A clearer path to launch',
    description:
      'The UI layer gives you speed now. Starter Free proves the product surface. Upgrade helps you decide when the business layer starts to matter.',
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
    href: '/upgrade',
    cta: 'Read upgrade guide',
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
          ]}
          title="A premium UI foundation for real SaaS products."
          subtitle="Start with the interface. Validate the product. Upgrade when wiring starts to matter."
          description="PyColors UI gives developers a clearer starting point for product-shaped interfaces: accessible primitives, semantic tokens, and documentation that supports real implementation work instead of just showcasing components."
          actions={
            <>
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

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/upgrade">
                  When should I upgrade?
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </>
          }
          extra={
            <>
              <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                <Stat label="Current version" value={versionLabel} />
                <Stat
                  label="Workflow"
                  value="UI → Starter Free → Upgrade"
                />
                <Stat
                  label="Positioning"
                  value="Open source → SaaS system"
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <Pill label="Semantic tokens" />
                <Pill label="Accessible primitives" />
                <Pill label="Product states included" />
                <Pill label="SaaS-oriented" />
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
                  A better starting point than rebuilding product UI
                  from scratch.
                </h2>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  PyColors UI is built for the work that usually gets
                  repeated badly: states, consistency, accessible
                  interactions, documentation, and product surfaces
                  that need to feel credible early.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                  <p className="text-sm font-medium text-foreground">
                    Use the UI directly
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Browse the docs, install the package, copy a
                    component, and start building the screen you
                    actually need.
                  </p>
                </div>

                <div className="rounded-[5px] border border-platform-border-subtle bg-platform-muted p-4">
                  <p className="text-sm font-medium text-foreground">
                    See it inside a product
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Starter Free shows how the UI behaves inside auth
                    flows, settings, data screens, admin surfaces, and
                    real product states.
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
            description="The value is not just in the components. The value is in moving faster toward something users can trust."
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

          <div className="mt-6 text-sm text-muted-foreground">
            Most developers do not need a full SaaS backend on day
            one.
            <br />
            The real challenge is knowing when the UI is no longer the
            bottleneck.
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            eyebrow="What you can ship"
            title="Real product surfaces, not just component demos."
            description="This is where PyColors becomes more credible than a generic UI kit."
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
            title={`A strong baseline in ${versionLabel}`}
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

          <div className="mt-5 text-xs text-muted-foreground">
            Patterns, starters, and future premium product surfaces
            are tracked through the{' '}
            <Link
              href="/roadmap"
              className={cn(
                'rounded-[5px] underline underline-offset-4 hover:text-foreground',
                focusRing,
              )}
            >
              roadmap
            </Link>
            .
          </div>
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
                  Build the UI first. Decide later when to upgrade.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  PyColors UI is the foundation. Starter Free proves
                  the experience. Upgrade helps you decide when the
                  business layer becomes the real blocker.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill label="Docs-first" />
                  <Pill label="Open source" />
                  <Pill label="Product-oriented" />
                  <Pill label="Launch-aware" />
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-[260px]">
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

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href="/upgrade">See Upgrade</Link>
                </Button>
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

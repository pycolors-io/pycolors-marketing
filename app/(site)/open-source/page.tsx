import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
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
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Open-Source SaaS UI & Developer Tools',
  description:
    'Explore the open-source foundations behind PyColors: SaaS UI systems, semantic tokens, Starter Free, TypeScript tooling, ESLint configs, and production-shaped developer infrastructure.',
  alternates: {
    canonical: '/open-source',
  },

  openGraph: {
    title: 'Open-Source SaaS UI & Developer Tools',
    description:
      'Discover the open-core foundations behind PyColors across UI systems, tokens, SaaS starters, developer tooling, and production-ready Next.js infrastructure.',
    url: '/open-source',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Open-Source SaaS UI & Developer Tools',
    description:
      'Open-core foundations for modern SaaS products: UI systems, starters, tokens, and developer tooling.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

type Repo = {
  name: string;
  description: string;
  href: string;
  badge?: string;
  category:
    | 'Core foundations'
    | 'Developer tooling'
    | 'Starters'
    | 'Website';
};

const repos: Repo[] = [
  {
    category: 'Core foundations',
    name: 'pycolors-ui',
    description:
      'Documentation-first UI system built on semantic tokens and Radix primitives — optimized for real SaaS screens.',
    href: 'https://github.com/pycolors-io/pycolors-ui',
    badge: 'UI system',
  },
  {
    category: 'Core foundations',
    name: 'pycolors-tokens',
    description:
      'Semantic design tokens powering consistent theming across apps, templates, and starters.',
    href: 'https://github.com/pycolors-io/pycolors-tokens',
    badge: 'Tokens',
  },
  {
    category: 'Developer tooling',
    name: 'pycolors-eslint-config',
    description:
      'Shared ESLint configs for scalable TypeScript + Next.js codebases with strong defaults.',
    href: 'https://github.com/pycolors-io/pycolors-eslint-config',
    badge: 'DX',
  },
  {
    category: 'Developer tooling',
    name: 'pycolors-typescript-config',
    description:
      'Shared TypeScript configs to keep projects strict, predictable, and aligned as they grow.',
    href: 'https://github.com/pycolors-io/pycolors-typescript-config',
    badge: 'DX',
  },
  {
    category: 'Starters',
    name: 'pycolors-starter-free',
    description:
      'Frontend-only SaaS starter demo: auth UX, dashboards, CRUD patterns, settings, billing surfaces, and admin UI — mocked by design, ready to wire.',
    href: 'https://github.com/pycolors-io/pycolors-starter-free',
    badge: 'Free',
  },
  {
    category: 'Website',
    name: 'pycolors-marketing',
    description:
      'The marketing + docs site built with Next.js and Fumadocs — public mirror of the ecosystem website.',
    href: 'https://github.com/pycolors-io/pycolors-marketing',
    badge: 'Site',
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
      {children}
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
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <h2 className="font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Card className="h-full rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border">
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-[5px] text-xs"
            >
              {repo.category}
            </Badge>

            {repo.badge ? (
              <Badge
                variant="secondary"
                className="rounded-[5px] text-xs"
              >
                {repo.badge}
              </Badge>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold tracking-tight">
              {repo.name}
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {repo.description}
            </p>
          </div>
        </div>

        <a
          href={repo.href}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            'inline-flex w-fit items-center gap-1.5 rounded-[5px] border border-border-subtle px-3 py-2 text-xs font-medium',
            'transition-colors hover:border-border hover:bg-accent/20 hover:text-foreground',
            focusRing,
          )}
          aria-label={`Open ${repo.name} on GitHub`}
        >
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </Card>
  );
}

function ModelCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex  items-center justify-center text-primary">
          {icon}
        </span>

        <div className="space-y-1">
          <div className="text-sm font-medium">{title}</div>

          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function OpenSourcePage() {
  const core = repos.filter(
    (repo) => repo.category === 'Core foundations',
  );
  const tooling = repos.filter(
    (repo) => repo.category === 'Developer tooling',
  );
  const starters = repos.filter(
    (repo) => repo.category === 'Starters',
  );
  const website = repos.filter((repo) => repo.category === 'Website');

  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Open Source', href: '/open-source' },
            ]}
          />
        </div>

        <header className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="secondary"
              className="gap-2 rounded-[5px]"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              Built in public
            </Badge>

            <Badge variant="outline" className="rounded-[5px]">
              Open-core
            </Badge>

            <Badge variant="outline" className="rounded-[5px]">
              Trust + adoption
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Open-source foundations behind PyColors.
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
              PyColors is built as an open-core SaaS ecosystem: UI
              system, tokens, starters, and developer tooling designed
              to help developers ship credible SaaS products faster.
            </p>

            <p className="mx-auto max-w-3xl text-balance text-xs leading-6 text-muted-foreground">
              Open-source is the foundation layer. Premium products
              exist to accelerate execution when auth, billing,
              delivery, and production wiring become the bottleneck.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-[5px]">
              <Link href="/ui">
                Explore UI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/starters/free">Try Starter Free</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Pill>Open foundations</Pill>
            <Pill>Docs-first</Pill>
            <Pill>Weekly shipping</Pill>
            <Pill>Free → Pro path</Pill>
          </div>
        </header>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="Why open-source"
            description="Open-source is the trust layer of PyColors. It lets developers inspect the foundations, adopt progressively, and upgrade only when premium acceleration creates real leverage."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <ModelCard
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Trust"
              description="See the foundations. Inspect the primitives, tokens, tooling, and starter structure before you commit."
            />

            <ModelCard
              icon={<GitBranch className="h-4 w-4" />}
              title="Adoption"
              description="Clone, run, test, and evaluate quickly. Start with the open layer before choosing a paid path."
            />

            <ModelCard
              icon={<Sparkles className="h-4 w-4" />}
              title="Velocity"
              description="Production-shaped foundations reduce repeated setup work and keep your product direction coherent."
            />
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Open-core strategy"
            description="The ecosystem stays clear: open foundations for adoption, premium acceleration for builders who want to move faster."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[5px]"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            }
          />

          <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-[5px] text-xs"
              >
                Transparent model
              </Badge>

              <Badge
                variant="secondary"
                className="rounded-[5px] text-xs"
              >
                Open foundations → paid acceleration
              </Badge>

              <Pill>Adopt progressively</Pill>
            </div>

            <div className="overflow-hidden rounded-[5px] border border-border-subtle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Open-source foundation
                    </TableHead>
                    <TableHead className="w-1/2">
                      Premium acceleration
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          PyColors UI + Tokens
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Stable primitives, semantic theming, and
                          docs-first usage.
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Premium product surfaces
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Higher-level SaaS patterns, starters, and
                          production-focused assets.
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Starter Free
                        </div>
                        <div className="text-sm text-muted-foreground">
                          A runnable SaaS surface with mocked data —
                          built to validate UX fast.
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Starter Pro
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Real auth, Stripe billing, protected app
                          structure, delivery, and backend
                          foundations.
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Developer tooling
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Shared ESLint and TypeScript configs to keep
                          projects aligned.
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Future premium layers
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Blocks, templates, stronger SaaS
                          foundations, and commercial acceleration.
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 space-y-2 text-xs leading-6 text-muted-foreground">
              <p>
                Public repositories are governed by their repository
                licenses. Premium products, commercial access, private
                releases, and brand assets remain subject to separate
                commercial terms.
              </p>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="Repositories"
            description="Public repositories you can inspect, clone, and use today. Each one maps to a clear role in the PyColors ecosystem."
          />

          <div className="space-y-6">
            <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-sm font-semibold">
                    Foundations
                  </div>
                  <p className="text-sm text-muted-foreground">
                    UI, tokens, and tooling that power the ecosystem.
                  </p>
                </div>

                <Badge
                  variant="secondary"
                  className="rounded-[5px] text-xs"
                >
                  Core
                </Badge>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {core.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}

                {tooling.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </Card>

            <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-sm font-semibold">
                    Products
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Runnable entry points and the public website.
                  </p>
                </div>

                <Badge
                  variant="secondary"
                  className="rounded-[5px] text-xs"
                >
                  Adoption
                </Badge>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {starters.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}

                {website.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="pt-4">
          <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <Badge variant="outline" className="rounded-[5px]">
                  Recommended path
                </Badge>

                <h2 className="font-brand text-2xl font-semibold tracking-tight">
                  Start open. Validate fast. Upgrade when it matters.
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  Use PyColors UI as the foundation, Starter Free to
                  validate the product surface, and Starter Pro when
                  real authentication, billing, and protected app
                  architecture become the bottleneck.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>UI → foundation</Pill>
                  <Pill>Starter Free → validation</Pill>
                  <Pill>Starter Pro → business layer</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-60">
                <Button asChild className="rounded-[5px]">
                  <Link href="/starters/free">Starter Free</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href="/starters/pro">Starter Pro</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href="/pricing">Pricing</Link>
                </Button>
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Built in public. Shipping weekly.
          </p>
        </section>
      </div>
    </Container>
  );
}

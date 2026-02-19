import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ExternalLink,
  ArrowRight,
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

export const metadata: Metadata = {
  title: 'Open Source',
  description:
    'PyColors is built in public. Explore the open-source foundations behind PyColors UI, tokens, starters, and developer tooling.',
  alternates: { canonical: '/open-source' },
  openGraph: {
    title: 'Open Source · PyColors',
    description:
      'Explore PyColors open-source foundations: UI system, tokens, starters, and developer tooling — built for shipping real SaaS.',
    url: '/open-source',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source · PyColors',
    description:
      'Explore PyColors open-source foundations: UI system, tokens, starters, and developer tooling — built for shipping real SaaS.',
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
      'Semantic design tokens powering consistent theming (light/dark) across apps, templates, and starters.',
    href: 'https://github.com/pycolors-io/pycolors-tokens',
    badge: 'Tokens',
  },
  {
    category: 'Developer tooling',
    name: 'pycolors-eslint-config',
    description:
      'Shared ESLint configs for scalable TypeScript + Next.js codebases with sane defaults.',
    href: 'https://github.com/pycolors-io/pycolors-eslint-config',
    badge: 'DX',
  },
  {
    category: 'Developer tooling',
    name: 'pycolors-typescript-config',
    description:
      'Shared TS configs (strict, predictable) to keep projects aligned as they grow.',
    href: 'https://github.com/pycolors-io/pycolors-typescript-config',
    badge: 'DX',
  },
  {
    category: 'Starters',
    name: 'pycolors-starter-free',
    description:
      'Frontend-only SaaS starter demo: layouts, dashboards, data UI patterns, auth screens — mocked by design, ready to wire.',
    href: 'https://github.com/pycolors-io/pycolors-starter-free',
    badge: 'Free',
  },
  {
    category: 'Website',
    name: 'pycolors-marketing',
    description:
      'The marketing + docs site (Next.js + Fumadocs) — read-only mirror synced from the monorepo.',
    href: 'https://github.com/pycolors-io/pycolors-marketing',
    badge: 'Site',
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
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
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="sm:self-start">{action}</div> : null}
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {repo.category}
            </Badge>
            {repo.badge ? (
              <Badge variant="secondary" className="text-xs">
                {repo.badge}
              </Badge>
            ) : null}
          </div>

          <div className="text-sm font-medium">{repo.name}</div>
          <p
            className={cn(
              'text-sm text-muted-foreground leading-relaxed',
              'line-clamp-2 min-h-16',
            )}
          >
            {repo.description}
          </p>
        </div>

        <a
          href={repo.href}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold',
            'transition-colors hover:bg-accent hover:text-accent-foreground',
            focusRing,
          )}
          aria-label={`Open ${repo.name} on GitHub (opens in a new tab)`}
        >
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </Card>
  );
}

export default function OpenSourcePage() {
  const core = repos.filter((r) => r.category === 'Core foundations');
  const tooling = repos.filter(
    (r) => r.category === 'Developer tooling',
  );
  const starters = repos.filter((r) => r.category === 'Starters');
  const website = repos.filter((r) => r.category === 'Website');

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl">
            {/* HERO */}
            <header className="flex flex-col items-center gap-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Built in public
                </Badge>
                <Badge variant="outline">Open by default</Badge>
                <Pill>Trust + adoption</Pill>
              </div>

              <div className="space-y-4">
                <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  Open-source foundations
                  <span className="block font-bold">
                    behind PyColors.
                  </span>
                </h1>

                <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                  PyColors is built as an ecosystem: UI system,
                  tokens, starters, and developer tooling — designed
                  to help you ship real SaaS faster with predictable
                  foundations.
                </p>

                <p className="mx-auto max-w-2xl text-balance text-xs text-muted-foreground">
                  This page centralizes the public repos. Product
                  pages stay focused; open-source stays discoverable.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/ui">
                    Explore UI{' '}
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/starters/free">Try Starter Free</Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/docs">Read the docs</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <Pill>Open core</Pill>
                <Pill>Docs-first</Pill>
                <Pill>Shipping weekly</Pill>
                <Pill>Stable foundations</Pill>
              </div>
            </header>

            {/* WHY OPEN SOURCE */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Why open-source"
                description="Open-source is a trust layer and an adoption path — without breaking a product-focused marketing funnel."
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <ShieldCheck
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Trust</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        See the foundations. No magic, no black boxes
                        — predictable primitives you can rely on.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <GitBranch
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        Adoption
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Clone, run, and evaluate quickly. Start with
                        UI, then templates, then starter foundations.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Sparkles
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        Velocity
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Production patterns reduce guesswork. You ship
                        screens faster and stay consistent as you
                        scale.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* OPEN CORE MODEL */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="Open core model"
                description="The ecosystem is open-source first. Commercial layers come later (templates + Starter Pro) — without lock-in."
              />

              <Card className="p-6">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Transparency
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Upgrade path stays clean
                  </Badge>
                  <Pill>Open foundations → paid acceleration</Pill>
                </div>

                <div className="w-full overflow-hidden rounded-xl border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">
                          Open-source (available now)
                        </TableHead>
                        <TableHead className="w-1/2">
                          Commercial (planned / evolving)
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
                              Stable primitives, docs-first workflow,
                              predictable theming.
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Premium templates
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Paid-ready layouts, marketing pages,
                              dashboards — zero design debt.
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Starter Free (frontend-only)
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Real SaaS surface with mocked data —
                              ready to wire later.
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Starter Pro (wired foundation)
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Auth + billing wired, production data
                              layer, more blocks, upgrade-ready
                              packaging.
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
                              ESLint + TS configs to keep projects
                              aligned as they grow.
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Advanced blocks
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Higher-level product blocks and
                              workflows (planned).
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  The goal: adopt progressively (UI → templates →
                  starter) with a clean path to paid acceleration when
                  you want it.
                </div>
              </Card>
            </section>

            {/* REPOSITORIES */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Repositories"
                description="Public repos you can clone today. Each one maps to a clear role in the ecosystem."
              />

              {/* Foundations */}
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      Foundations
                    </div>
                    <p className="text-sm text-muted-foreground">
                      UI + tokens + tooling that power the ecosystem.
                    </p>
                  </div>
                  <Badge variant="default" className="text-xs">
                    Core
                  </Badge>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        Core foundations
                      </div>
                      <Badge variant="outline" className="text-xs">
                        UI + tokens
                      </Badge>
                    </div>
                    {core.map((repo) => (
                      <RepoCard key={repo.name} repo={repo} />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        Developer tooling
                      </div>
                      <Badge variant="outline" className="text-xs">
                        DX
                      </Badge>
                    </div>
                    {tooling.map((repo) => (
                      <RepoCard key={repo.name} repo={repo} />
                    ))}
                  </div>
                </div>
              </Card>

              {/* Products */}
              <Card className="mt-6 p-6 sm:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      Products
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Starter demos and the marketing website.
                    </p>
                  </div>
                  <Badge variant="default" className="text-xs">
                    Adoption
                  </Badge>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        Starters
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Demo starter
                      </Badge>
                    </div>
                    {starters.map((repo) => (
                      <RepoCard key={repo.name} repo={repo} />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        Website
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Marketing + docs
                      </Badge>
                    </div>
                    {website.map((repo) => (
                      <RepoCard key={repo.name} repo={repo} />
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* NEXT STEPS */}
            <section className="mx-auto mt-10 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Recommended path
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Start with UI foundations, validate the starter
                      surface, then follow the roadmap for what’s
                      next.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>UI → docs-first</Pill>
                      <Pill>Starter Free → evaluate UX</Pill>
                      <Pill>Roadmap → planned upgrades</Pill>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href="/ui"> UI</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/starters/free">Starter Free</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="/roadmap">Roadmap</Link>
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
      </main>
    </div>
  );
}

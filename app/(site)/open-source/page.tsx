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
      'The marketing + docs site (Next.js + Fumadocs) — public mirror of the ecosystem website.',
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
              'min-h-16 text-sm leading-relaxed text-muted-foreground',
              'line-clamp-3',
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
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {icon}
        </span>
        <div className="space-y-1">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
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

                <p className="mx-auto max-w-3xl text-balance text-xs text-muted-foreground">
                  Open-source is the foundation layer of the PyColors
                  open-core strategy. Premium products exist to
                  accelerate execution, not to create lock-in.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/ui">
                    Explore UI
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
                  <Link href="/access">View Access</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <Pill>Open core</Pill>
                <Pill>Docs-first</Pill>
                <Pill>Shipping weekly</Pill>
                <Pill>Stable foundations</Pill>
                <Pill>Premium path stays clear</Pill>
              </div>
            </header>

            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Why open-source"
                description="Open-source is a trust layer, an adoption path, and the foundation of the PyColors open-core strategy."
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <ModelCard
                  icon={
                    <ShieldCheck
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  }
                  title="Trust"
                  description="See the foundations. No black boxes, no vague promises — predictable primitives and product surfaces you can inspect."
                />

                <ModelCard
                  icon={
                    <GitBranch
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  }
                  title="Adoption"
                  description="Clone, run, and evaluate quickly. Start with the open layer before deciding whether premium acceleration is worth it."
                />

                <ModelCard
                  icon={
                    <Sparkles
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  }
                  title="Velocity"
                  description="Production-shaped foundations reduce guesswork. You ship faster and keep consistency as the product grows."
                />
              </div>
            </section>

            <section className="py-8 sm:py-10">
              <SectionHeader
                title="Open-core strategy"
                description="The ecosystem is open-source first. Commercial layers exist to accelerate execution, not to blur ownership or licensing boundaries."
                action={
                  <Button asChild size="sm" variant="outline">
                    <Link href="/upgrade">See Upgrade to PRO</Link>
                  </Button>
                }
              />

              <Card className="p-6 sm:p-7">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Transparency
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Open foundations → paid acceleration
                  </Badge>
                  <Pill>Adopt progressively</Pill>
                </div>

                <div className="w-full overflow-hidden rounded-xl border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">
                          Open-source (available now)
                        </TableHead>
                        <TableHead className="w-1/2">
                          Premium acceleration (planned / evolving)
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
                              UI PRO
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Premium product patterns and
                              higher-level SaaS surfaces.
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
                              A real SaaS surface with mocked data —
                              built to validate UX fast.
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Starter PRO
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Auth, billing, backend foundations, and
                              deployment guidance.
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
                              Shared linting and TypeScript configs to
                              keep codebases aligned.
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              All-In Access
                            </div>
                            <div className="text-sm text-muted-foreground">
                              The premium long-term path for builders
                              who want the full ecosystem.
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <p>
                    The goal is simple: inspect the foundations
                    openly, adopt progressively, and upgrade only when
                    the next layer creates real leverage.
                  </p>
                  <p>
                    Public repositories are governed by their
                    respective repository licenses. Premium products,
                    commercial access, private releases, and brand
                    assets remain subject to separate commercial
                    terms.
                  </p>
                </div>
              </Card>
            </section>

            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Repositories"
                description="Public repos you can clone today. Each one maps to a clear role in the ecosystem."
              />

              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      Foundations
                    </div>
                    <p className="text-sm text-muted-foreground">
                      UI, tokens, and tooling that power the
                      ecosystem.
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

              <Card className="mt-6 p-6 sm:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      Products
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Runnable entry points and the public website.
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
                        Main entry point
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

            <section className="mx-auto mt-10 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Recommended path
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Start with open foundations, validate the
                      starter surface, then move to premium access
                      only when leverage matters.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>UI → foundation</Pill>
                      <Pill>Starter Free → validate UX</Pill>
                      <Pill>Access → premium path</Pill>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href="/ui">UI</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/starters/free">Starter Free</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="/access">Access</Link>
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

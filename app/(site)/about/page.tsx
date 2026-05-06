import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Rocket,
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
  title: 'About',
  description:
    'Learn what PyColors is, why it exists, and how the ecosystem helps developers learn, validate, and ship real SaaS products faster.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About · PyColors',
    description:
      'Learn what PyColors is, why it exists, and how the ecosystem helps developers learn, validate, and ship real SaaS products faster.',
    url: '/about',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About · PyColors',
    description:
      'Learn what PyColors is, why it exists, and how the ecosystem helps developers learn, validate, and ship real SaaS products faster.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

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
        <span className="mt-0.5 inline-flex   text-primary">
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

export default function AboutPage() {
  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
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
              About
            </Badge>

            <Badge variant="outline" className="rounded-[5px]">
              Docs-first ecosystem
            </Badge>

            <Badge variant="outline" className="rounded-[5px]">
              Built for shipping
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              PyColors helps developers ship credible SaaS products
              faster.
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
              PyColors is a docs-first open-core SaaS ecosystem: UI
              foundations, product patterns, examples, starters, and a
              premium path designed to help builders learn the product
              logic, validate credible interfaces, and move toward
              real business wiring when it matters.
            </p>

            <p className="mx-auto max-w-3xl text-balance text-xs leading-6 text-muted-foreground">
              Created by Patrice Parny, founder of PyColors. The goal
              is not to ship random assets. The goal is to build a
              system that compounds over time.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-[5px]">
              <Link href="/guides">
                Explore guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/starters/free">Starter Free</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/open-source">Open source</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Pill>Docs-first</Pill>
            <Pill>Tokens-first UI</Pill>
            <Pill>Production patterns</Pill>
            <Pill>Open core</Pill>
            <Pill>Free → Pro path</Pill>
          </div>
        </header>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="Why PyColors exists"
            description="PyColors was created to solve a product problem, not just a component problem."
          />

          <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              <div className="space-y-3">
                <Badge variant="outline" className="rounded-[5px]">
                  Product-first
                </Badge>

                <h2 className="text-balance text-2xl font-semibold tracking-tight">
                  The hard part is not only UI. It is turning UI into
                  a product people can trust.
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  In many UI codebases, the hardest part is not
                  creating a new button or card. The real difficulty
                  appears later: inconsistent spacing, weak token
                  systems, unclear variants, poor documentation, and
                  product screens that never feel fully coherent.
                </p>

                <p>
                  PyColors starts with stable UI foundations, but it
                  does not stop there. It extends toward patterns,
                  examples, starters, and premium acceleration so
                  builders can move from isolated UI work to a more
                  complete SaaS product path.
                </p>

                <p>
                  <span className="font-medium text-foreground">
                    PyColors UI is the foundation.
                  </span>{' '}
                  The rest of the ecosystem is built on top of it so
                  the product can grow without losing coherence.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Core principles"
            description="The ecosystem is opinionated by design: clarity, consistency, and production constraints first."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <ModelCard
              icon={
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              }
              title="Documentation-first"
              description="Learn the logic, inspect the pattern, and move quickly toward implementation with fewer hidden decisions."
            />

            <ModelCard
              icon={
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              }
              title="Production constraints"
              description="Accessible defaults, semantic tokens, stable variants, and SaaS-oriented product surfaces."
            />

            <ModelCard
              icon={
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              }
              title="Quality over noise"
              description="Fewer moving parts, better finished. A baseline you can trust instead of disconnected assets."
            />
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="How the ecosystem works"
            description="PyColors is structured as a progression, not as a random collection of pages."
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
                Progression
              </Badge>

              <Badge
                variant="secondary"
                className="rounded-[5px] text-xs"
              >
                Learn → Explore → Validate → Launch
              </Badge>

              <Pill>Adopt progressively</Pill>
            </div>

            <div className="overflow-hidden rounded-[5px] border border-border-subtle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Stage</TableHead>
                    <TableHead className="w-1/4">
                      What it means
                    </TableHead>
                    <TableHead className="w-1/4">
                      Where to go
                    </TableHead>
                    <TableHead className="w-1/4">
                      Why it matters
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Learn
                    </TableCell>
                    <TableCell>
                      Understand real SaaS product logic.
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/guides"
                        className="underline underline-offset-4"
                      >
                        Guides
                      </Link>
                    </TableCell>
                    <TableCell>
                      Reduce guesswork before building.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Explore
                    </TableCell>
                    <TableCell>
                      Study credible UI patterns and examples.
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/ui/patterns"
                        className="underline underline-offset-4"
                      >
                        Patterns
                      </Link>{' '}
                      /{' '}
                      <Link
                        href="/examples"
                        className="underline underline-offset-4"
                      >
                        Examples
                      </Link>
                    </TableCell>
                    <TableCell>
                      Move from primitives to product surfaces.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Validate
                    </TableCell>
                    <TableCell>
                      Run a credible SaaS surface locally.
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/starters/free"
                        className="underline underline-offset-4"
                      >
                        Starter Free
                      </Link>
                    </TableCell>
                    <TableCell>
                      Prove the UX before backend complexity.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Launch
                    </TableCell>
                    <TableCell>
                      Upgrade when wiring becomes the blocker.
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/starters/pro"
                        className="underline underline-offset-4"
                      >
                        Starter Pro
                      </Link>{' '}
                      /{' '}
                      <Link
                        href="/pricing"
                        className="underline underline-offset-4"
                      >
                        Pricing
                      </Link>
                    </TableCell>
                    <TableCell>
                      Add real auth, billing, and protected
                      foundations when the product becomes serious.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="What exists today — and what comes next"
            description="The ecosystem is built in public and shipped progressively."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Today
                </div>

                <p className="text-sm leading-7 text-muted-foreground">
                  PyColors already includes UI foundations, guides,
                  patterns, examples, Starter Free, documentation, and
                  a clear Starter Pro path — all structured as one
                  coherent ecosystem designed to help developers learn
                  faster and build better SaaS products.
                </p>

                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className={cn('rounded-[5px]', focusRing)}
                  >
                    <Link href="/changelog">
                      View changelog
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Rocket className="h-4 w-4 text-primary" />
                  Next
                </div>

                <p className="text-sm leading-7 text-muted-foreground">
                  The next layer focuses on stronger premium
                  acceleration: more proof, better conversion,
                  stronger Starter Pro documentation, deeper backend
                  foundations, and future product surfaces built on
                  the same open foundation.
                </p>

                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className={cn('rounded-[5px]', focusRing)}
                  >
                    <Link href="/roadmap">
                      View roadmap
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
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
                  Learn the logic. Validate the surface. Upgrade when
                  the business layer matters.
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  Start with the knowledge layer, validate with
                  Starter Free, then move to Starter Pro when real
                  authentication, billing, and protected architecture
                  become the bottleneck.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>Guides → learn</Pill>
                  <Pill>Starter Free → validate</Pill>
                  <Pill>Starter Pro → launch</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-60">
                <Button asChild className="rounded-[5px]">
                  <Link href="/guides">Guides</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href="/starters/free">Starter Free</Link>
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
            Built in public. Structured to compound.
          </p>
        </section>
      </div>
    </Container>
  );
}

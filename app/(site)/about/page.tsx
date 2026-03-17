import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Sparkles,
  Rocket,
  ShieldCheck,
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

export default function AboutPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ]}
          />
        </div>

        <header className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
              About
            </Badge>
            <Badge variant="outline">Docs-first ecosystem</Badge>
            <Pill>Built for shipping</Pill>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              PyColors is built to help developers
              <span className="block font-bold">
                ship real SaaS products faster.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              PyColors is a docs-first open-core SaaS ecosystem: UI
              foundations, product patterns, examples, starters, and a
              premium path designed to help builders learn the product
              logic, validate credible interfaces, and move toward
              real business wiring when it matters.
            </p>

            <p className="mx-auto max-w-3xl text-balance text-xs text-muted-foreground">
              Created by Patrice Parny, founder of PyColors. The goal
              is not to ship random assets. The goal is to build a
              system that compounds.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/guides">
                Explore guides
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/starters/free">Starter Free</Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/open-source">Open source</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Pill>Docs-first</Pill>
            <Pill>Tokens-first UI</Pill>
            <Pill>Production patterns</Pill>
            <Pill>Open core</Pill>
            <Pill>Clear upgrade path</Pill>
          </div>
        </header>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Why PyColors exists"
            description="PyColors was created to solve a product problem, not just a component problem."
          />

          <Card className="p-6 sm:p-7">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                In many UI codebases, the hardest part is not creating
                a new button or card. The real difficulty appears
                later: inconsistent spacing, weak token systems,
                unclear variants, poor documentation, and product
                screens that never feel fully coherent.
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground">
                PyColors is the answer to that problem. It starts with
                stable UI foundations, but it does not stop there. It
                extends toward patterns, examples, starters, and
                premium acceleration so builders can move from
                isolated UI work to a more complete SaaS product path.
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  PyColors UI is the foundation.
                </span>{' '}
                The rest of the ecosystem is built on top of it so the
                product can grow without losing coherence.
              </p>
            </div>
          </Card>
        </section>

        <section className="py-8 sm:py-10">
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
              description="Learn the logic, inspect the pattern, and move quickly toward implementation."
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

        <section className="py-8 sm:py-10">
          <SectionHeader
            title="How the ecosystem works"
            description="PyColors is structured as a progression, not as a random collection of pages."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/access">View Access</Link>
              </Button>
            }
          />

          <Card className="p-6 sm:p-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Progression
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Learn → Explore → Validate → Scale
              </Badge>
              <Pill>Adopt progressively</Pill>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-border">
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
                      Scale
                    </TableCell>
                    <TableCell>
                      Upgrade when wiring becomes the blocker.
                    </TableCell>
                    <TableCell>
                      <Link
                        href="/upgrade"
                        className="underline underline-offset-4"
                      >
                        Upgrade
                      </Link>{' '}
                      /{' '}
                      <Link
                        href="/access"
                        className="underline underline-offset-4"
                      >
                        Access
                      </Link>
                    </TableCell>
                    <TableCell>
                      Add leverage when the product becomes serious.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </section>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="What exists today — and what comes next"
            description="The ecosystem is built in public and shipped progressively."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Today
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  PyColors already includes UI foundations, guides,
                  patterns, examples, Starter Free, documentation, and
                  a clear premium direction — all structured as one
                  coherent ecosystem designed to help developers learn
                  faster and build better SaaS products.
                </p>
                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href="/changelog">
                      View changelog
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Rocket className="h-4 w-4" aria-hidden="true" />
                  Next
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The next layer focuses on premium acceleration: UI
                  PRO, Starter PRO, and broader ecosystem access —
                  without breaking the open foundation underneath.
                </p>
                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href="/roadmap">
                      View roadmap
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Recommended path
                </h2>
                <p className="text-sm text-muted-foreground">
                  Start with the knowledge layer, validate with
                  Starter Free, then move to premium access only when
                  leverage matters.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Guides → learn the logic</Pill>
                  <Pill>Starter Free → validate UX</Pill>
                  <Pill>Access → premium path</Pill>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/guides">Guides</Link>
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
            Built in public. Structured to compound.
          </p>
        </section>
      </div>
    </Container>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  Sparkles,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Access',
  description:
    'Choose how you want to build with PyColors. Start with the free SaaS starter and upgrade when your product becomes real.',
  alternates: { canonical: '/access' },
  openGraph: {
    title: 'Access · PyColors',
    description:
      'Choose how you want to build with PyColors. Start free, then upgrade to production wiring and premium access.',
    url: '/access',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Access · PyColors',
    description:
      'Choose how you want to build with PyColors. Start free, then upgrade to production wiring and premium access.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  starterFree: '/starters/free',
  starters: '/starters',
  upgrade: '/upgrade',
  waitlist: '/waitlist',
  roadmap: '/roadmap',
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
} as const;

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

function PremiumPlanCard({
  title,
  price,
  badge,
  description,
  points,
  cta,
  href,
  variant = 'outline',
  highlight = false,
  eyebrow,
}: {
  title: string;
  price: string;
  badge?: string;
  description: string;
  points: string[];
  cta: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary';
  highlight?: boolean;
  eyebrow?: string;
}) {
  return (
    <Card
      className={cn(
        'relative flex h-full flex-col justify-between overflow-hidden p-6',
        highlight && 'border-foreground/15 shadow-sm',
      )}
    >
      {highlight ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-foreground/90" />
      ) : null}

      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {eyebrow ? (
              <span className="text-xs text-muted-foreground">
                {eyebrow}
              </span>
            ) : null}

            {badge ? (
              <Badge
                variant={highlight ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {badge}
              </Badge>
            ) : null}
          </div>

          <div className="space-y-1">
            <h3 className="font-brand text-lg font-semibold tracking-tight">
              {title}
            </h3>

            <div className="font-brand text-3xl font-semibold tracking-tight">
              {price}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground">
          {points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Button asChild className="w-full" variant={variant}>
          <Link href={href}>{cta}</Link>
        </Button>
      </div>
    </Card>
  );
}

export default function AccessPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            {/* HERO */}
            <header className="flex flex-col items-center gap-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Access
                </Badge>
                <Badge variant="outline">Pricing direction</Badge>

                <Link
                  href={INTERNAL.starters}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                    focusRing,
                  )}
                >
                  Back to Starters
                </Link>
              </div>

              <div className="space-y-4">
                <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  Choose how you want to build with PyColors.
                </h1>

                <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                  Start with Starter Free to validate your SaaS
                  product surface quickly. Upgrade when
                  authentication, billing, backend foundations, and
                  premium patterns become worth paying for.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href={INTERNAL.starterFree}>
                    Start with Starter Free
                  </Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href={INTERNAL.upgrade}>
                    Explore Upgrade to PRO
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href={INTERNAL.waitlist}>
                    Join PRO waitlist
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <Pill>Free entry point</Pill>
                <Pill>Premium upgrade path</Pill>
                <Pill>Bundle-first strategy</Pill>
                <Pill>Built for SaaS</Pill>
              </div>
            </header>

            {/* ACCESS PHILOSOPHY */}
            <section className="py-8 sm:py-10">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="gap-2">
                        <Layers3
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Access philosophy
                      </Badge>
                    </div>

                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      PyColors is structured as a path, not a hard
                      paywall. Start with a credible free surface,
                      upgrade when the business layer becomes the
                      bottleneck, and move to All-In when long-term
                      leverage matters more than piecemeal decisions.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.examples}>Examples</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.patterns}>
                        UI Patterns
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.guides}>Guides</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* STARTER FREE */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Start here"
                description="Starter Free is the entry point. Use it to validate your SaaS product surface before paying for wiring or premium patterns."
              />

              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">
                        Available today
                      </Badge>
                      <Badge variant="outline">Starter Free</Badge>
                      <Badge variant="outline">Entry point</Badge>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-brand text-xl font-semibold tracking-tight sm:text-2xl">
                        Starter Free
                      </h2>

                      <div className="font-brand text-3xl font-semibold tracking-tight">
                        Free
                      </div>

                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        A production-shaped SaaS surface for
                        validating product UX and shipping screens
                        quickly — with auth UX, dashboard, CRUD
                        patterns, billing entrypoints, settings, and
                        admin member surfaces.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Pill>Auth UX (mocked)</Pill>
                      <Pill>Dashboard</Pill>
                      <Pill>CRUD patterns</Pill>
                      <Pill>Billing entrypoints</Pill>
                      <Pill>Admin UI</Pill>
                    </div>
                  </div>

                  <div className="flex min-w-[240px] flex-col gap-2">
                    <Button asChild>
                      <Link href={INTERNAL.starterFree}>
                        Start with Free
                      </Link>
                    </Button>

                    <Button asChild variant="secondary">
                      <Link href={INTERNAL.starters}>
                        Explore Starters
                      </Link>
                    </Button>

                    <Button asChild variant="outline">
                      <Link href={INTERNAL.upgrade}>
                        See Upgrade path
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* PREMIUM ACCESS */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Premium access"
                description="Three upgrade paths, depending on whether your bottleneck is design leverage, business wiring, or long-term ecosystem value."
                action={
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.roadmap}>Track roadmap</Link>
                  </Button>
                }
              />

              <div className="grid gap-4 lg:grid-cols-3">
                <PremiumPlanCard
                  title="UI PRO"
                  price="€129"
                  badge="Coming"
                  eyebrow="Premium layer"
                  description="Premium SaaS patterns built on top of the PyColors UI baseline."
                  points={[
                    'Advanced SaaS patterns',
                    'Billing and settings screens',
                    'Admin and analytics layouts',
                    'Higher-signal product blocks',
                    'Premium UI usage direction',
                  ]}
                  cta="Join waitlist"
                  href={INTERNAL.waitlist}
                />

                <PremiumPlanCard
                  title="Starter PRO"
                  price="€249"
                  badge="Coming"
                  eyebrow="Business layer"
                  description="Production wiring for builders who want the business layer handled."
                  points={[
                    'Authentication providers',
                    'Stripe billing direction',
                    'Backend foundations',
                    'Database and contracts',
                    'Deployment guidance',
                  ]}
                  cta="Join waitlist"
                  href={INTERNAL.waitlist}
                />

                <PremiumPlanCard
                  title="All-In Access"
                  price="€349"
                  badge="Recommended"
                  eyebrow="Anchor offer"
                  description="The long-term premium offer for builders who want the full PyColors ecosystem."
                  points={[
                    'UI PRO included',
                    'Starter PRO included',
                    'Future premium drops',
                    'Best long-term value',
                    'Built as the anchor offer',
                  ]}
                  cta="Get early access"
                  href={INTERNAL.waitlist}
                  variant="default"
                  highlight
                />
              </div>
            </section>

            {/* RECOMMENDATION */}
            <section className="py-8 sm:py-10">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="gap-2">
                        <BadgeCheck
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Recommendation
                      </Badge>
                    </div>

                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      If you are still shaping the product, start with
                      Starter Free. If you already know you want the
                      full PyColors path, All-In Access is designed to
                      be the strongest long-term decision.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="sm">
                      <Link href={INTERNAL.starterFree}>
                        Start Free
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                      <Link href={INTERNAL.waitlist}>
                        Join All-In waitlist
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* COMPARISON */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Compare access levels"
                description="Same ecosystem. Different depth of leverage."
              />

              <Card className="p-6 sm:p-7">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>Starter Free</TableHead>
                      <TableHead>UI PRO</TableHead>
                      <TableHead>Starter PRO</TableHead>
                      <TableHead>All-In</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        UI primitives
                      </TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">
                        SaaS UI patterns
                      </TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">
                        Auth wiring
                      </TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">
                        Billing wiring
                      </TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">
                        Backend foundations
                      </TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>✔</TableCell>
                      <TableCell>✔</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">
                        Future premium updates
                      </TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>✔</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <p className="mt-3 text-xs text-muted-foreground">
                  Starter Free remains the entry point. Premium access
                  is designed to reduce time-to-revenue as your
                  product becomes real.
                </p>
              </Card>
            </section>

            {/* HOW TO CHOOSE */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="How to choose"
                description="You do not need everything on day one. Pick the access level that matches your current bottleneck."
              />

              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Option 01
                    </div>
                    <div className="text-sm font-medium">
                      Start with Free
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Best when you want to validate UX, ship screens,
                      and stay flexible while the product is still
                      taking shape.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Option 02
                    </div>
                    <div className="text-sm font-medium">
                      Upgrade selectively
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Choose UI PRO if design system patterns matter
                      more first. Choose Starter PRO if business
                      wiring becomes the real cost center.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Option 03
                    </div>
                    <div className="text-sm font-medium">
                      Go All-In
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Best for long-term builders who want the full
                      PyColors path and the strongest value over time.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mx-auto mt-10 w-full max-w-6xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Start free now. Upgrade when leverage matters.
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      The best entry point is Starter Free. The best
                      premium path is the one that removes your next
                      bottleneck.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Starter Free</Pill>
                      <Pill>PRO path</Pill>
                      <Pill>All-In strategy</Pill>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href={INTERNAL.starterFree}>
                        Start with Free
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
      </main>
    </div>
  );
}

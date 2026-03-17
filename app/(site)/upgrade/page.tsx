import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  CreditCard,
  Database,
  Rocket,
  Shield,
  Layers3,
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
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Upgrade to PRO',
  description:
    'Upgrade from Starter Free to a wired SaaS foundation: real auth, real billing, backend foundations, and deployment-ready guidance.',
  alternates: { canonical: '/upgrade' },
  openGraph: {
    title: 'Upgrade to PRO · PyColors',
    description:
      'Starter Free validates UX. PRO wires the business: auth, billing, backend foundations, and deployment.',
    url: '/upgrade',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upgrade to PRO · PyColors',
    description:
      'Starter Free validates UX. PRO wires the business: auth, billing, backend foundations, and deployment.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  starters: '/starters',
  starterFree: '/starters/free',
  docsStarter: '/docs/saas-starter',
  docsUpgrade: '/docs/saas-starter/upgrade-to-pro',
  roadmap: '/roadmap',
  ui: '/ui',
  access: '/access',
  waitlist: '/waitlist',
  license: '/license',
  terms: '/terms',
} as const;

const PRICING = {
  uiPro: '€129',
  starterPro: '€249',
  allIn: '€349',
} as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
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

function ProPillarCard({
  icon: Icon,
  title,
  subtitle,
  points,
  why,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  points: string[];
  why: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="text-sm font-medium">{title}</div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>

          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {points.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-muted-foreground">
            <span className="text-foreground">Why it matters:</span>{' '}
            {why}
          </p>
        </div>
      </div>
    </Card>
  );
}

function PricingCard({
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
  footnote,
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
  footnote?: string;
}) {
  return (
    <Card
      className={cn(
        'relative p-6',
        highlight && 'border-foreground/15 shadow-sm',
      )}
    >
      {highlight ? (
        <div className="absolute inset-x-0 top-0 h-1 bg-foreground/90" />
      ) : null}

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            {eyebrow ? (
              <div className="text-xs text-muted-foreground">
                {eyebrow}
              </div>
            ) : null}
            <div className="text-sm font-medium">{title}</div>
          </div>

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

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <ul className="space-y-1 text-sm text-muted-foreground">
          {points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>

        {footnote ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {footnote}
          </p>
        ) : null}

        <div className="pt-2">
          <Button
            asChild
            className={cn('w-full', focusRing)}
            variant={variant}
          >
            <Link href={href}>{cta}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="space-y-2">
        <div className="text-sm font-medium">{question}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </Card>
  );
}

export default function UpgradePage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Upgrade', href: '/upgrade' },
            ]}
          />
        </div>
        <header className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
              PRO (coming)
            </Badge>
            <Badge variant="outline">Business wiring</Badge>

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
              From prototype to real SaaS.
              <span className="block font-bold">
                Wire the business layer.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Starter Free helps you validate UX and ship
              production-shaped screens fast. Upgrade to PRO when you
              want the critical wiring handled: auth, billing, backend
              foundations, and deployment guidance.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={INTERNAL.waitlist}>
                Get early access to PRO
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href={INTERNAL.starterFree}>
                Start with Starter Free
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href={INTERNAL.docsUpgrade}>
                Read migration guide
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Pill>Auth</Pill>
            <Pill>Billing</Pill>
            <Pill>Backend foundations</Pill>
            <Pill>Deploy guidance</Pill>
            <Pill>Rolling release plan</Pill>
          </div>

          <p className="max-w-3xl text-balance text-xs text-muted-foreground">
            PRO is not public yet. This page defines the product
            direction and pricing structure, not a final legal or
            delivery commitment. The applicable commercial scope will
            be defined on the relevant access page, checkout flow,
            invoice, or order form at launch.
          </p>
        </header>

        <section className="py-10 sm:py-12">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-2">
                    <Layers3
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why PRO exists
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  PRO does not exist to add random complexity. It
                  exists to remove the most expensive part of shipping
                  a real SaaS: authentication, billing, backend
                  contracts, and launch readiness. Starter Free proves
                  the product surface. PRO upgrades the operational
                  layer underneath.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.access}>View Access</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.starterFree}>
                    Starter Free
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="The upgrade path"
            description="Free helps you validate and ship screens. PRO reduces the time and risk of wiring the business layer."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.starterFree}>
                  Compare with Starter Free
                </Link>
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">Starter Free</Badge>
                  <Badge variant="outline">Available today</Badge>
                </div>

                <div className="text-sm font-medium">
                  Validate UX and product shape
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use real routes, layouts, auth screens, CRUD
                  surfaces, settings, billing entrypoints, and admin
                  UI to validate your product structure before
                  touching backend infrastructure.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <TrustPill label="Mock data" />
                  <TrustPill label="Frontend-only" />
                  <TrustPill label="Fast evaluation" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">Upgrade to PRO</Badge>
                  <Badge variant="secondary">Coming</Badge>
                </div>

                <div className="text-sm font-medium">
                  Wire revenue-critical foundations
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upgrade when auth, billing, backend contracts, and
                  launch readiness become the bottleneck. PRO exists
                  to remove glue code, repeated setup, and production
                  uncertainty.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <TrustPill label="Less setup overhead" />
                  <TrustPill label="Faster monetization" />
                  <TrustPill label="Stronger production baseline" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="included" className="py-10 sm:py-12">
          <SectionHeader
            title="What PRO unlocks"
            description="Not more UI for the sake of UI. The wiring that turns a product-shaped starter into a real SaaS foundation."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.docsUpgrade}>
                  Technical migration guide
                </Link>
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <ProPillarCard
              icon={Shield}
              title="Real authentication"
              subtitle="Keep the auth UX from Starter Free, but replace placeholders with a production-ready auth foundation."
              points={[
                'Provider wiring',
                'Sessions + protected routes',
                'Role groundwork / RBAC direction',
                'Auth flows beyond placeholders',
              ]}
              why="Auth is the first production blocker in most SaaS projects. It needs to feel integrated, not bolted on."
            />

            <ProPillarCard
              icon={CreditCard}
              title="Real billing"
              subtitle="Turn your billing surfaces into actual monetization flows with a production-minded subscription engine."
              points={[
                'Stripe Checkout foundations',
                'Billing portal integration',
                'Subscription state handling',
                'Webhook and plan sync direction',
              ]}
              why="Billing is the shortest path from product to revenue, and one of the most painful layers to wire cleanly."
            />

            <ProPillarCard
              icon={Database}
              title="Backend foundations"
              subtitle="Move from mock sources to a structure that supports SaaS data modeling, contracts, and future scalability."
              points={[
                'Backend-aligned foundations',
                'Production-minded data contracts',
                'Organization / membership groundwork',
                'Cleaner path away from local mocks',
              ]}
              why="Without backend foundations, the UI remains credible but incomplete. This is where the product becomes operational."
            />

            <ProPillarCard
              icon={Rocket}
              title="Deployment guidance"
              subtitle="Launch with more confidence using environment, release, and production-readiness guidance."
              points={[
                'Environment setup direction',
                'Operational checklist',
                'Safer launch workflow',
                'Less trial-and-error before go-live',
              ]}
              why="A product is not launched when the UI is ready. It’s launched when setup, wiring, and operations stop breaking confidence."
            />
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Free vs PRO"
            description="Same product direction. Different level of wiring."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.starterFree}>
                  Open Starter Free
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
                  <TableHead className="w-[35%]">
                    Free (today)
                  </TableHead>
                  <TableHead className="w-[35%]">
                    PRO (coming)
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Authentication
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Screens + UX states
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Providers + sessions + protected routes
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    Billing
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Billing UI + mocked entrypoints
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Stripe-ready monetization flows
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    Data layer
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Mock sources
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Production-minded contracts and foundations
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    Organizations
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Single-org UI surface
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Multi-tenant direction and org foundations
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    Deployment
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Local-first exploration
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Launch guidance + production checklist
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    Outcome
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Validate UX and ship screens
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Reduce time-to-revenue
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <p className="mt-3 text-xs text-muted-foreground">
              The product promise is stable: Free validates the
              product surface. PRO wires the business layer. Specific
              commercial scope, included materials, update access, and
              launch terms depend on the offer available at purchase
              time.
            </p>
          </Card>
        </section>

        <section className="py-8 sm:py-10">
          <SectionHeader
            title="Shipping plan"
            description="PRO ships in phases so each release creates value before the full bundle exists."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.roadmap}>View roadmap</Link>
              </Button>
            }
          />

          <Card className="p-6 sm:p-7">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                  Phase
                </div>
                <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                  Scope
                </div>
                <div className="bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground">
                  Why it matters
                </div>
              </div>

              {[
                {
                  phase: 'Phase 01',
                  scope: 'Billing foundations',
                  why: 'Shortest path to monetization',
                },
                {
                  phase: 'Phase 02',
                  scope: 'Auth foundations',
                  why: 'Security + product credibility',
                },
                {
                  phase: 'Phase 03',
                  scope: 'Backend foundations',
                  why: 'Operational SaaS structure',
                },
                {
                  phase: 'Phase 04',
                  scope: 'Deploy guidance',
                  why: 'Launch confidence',
                },
              ].map((row) => (
                <div
                  key={row.phase}
                  className="grid grid-cols-1 sm:grid-cols-3"
                >
                  <div className="border-t border-border px-4 py-3 text-sm font-medium">
                    {row.phase}
                  </div>
                  <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:border-l">
                    {row.scope}
                  </div>
                  <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:border-l">
                    {row.why}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Roadmap tracks delivery order. This page defines the
              strategic destination, not a guaranteed release
              contract.
            </p>
          </Card>
        </section>

        <section className="py-8 sm:py-10">
          <SectionHeader
            title="Pricing direction"
            description="Premium pricing aligned with time saved, setup avoided, and faster monetization."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.access}>View Access</Link>
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <PricingCard
              title="UI PRO"
              price={PRICING.uiPro}
              badge="Coming"
              eyebrow="Premium layer"
              description="Premium SaaS patterns built on top of the UI baseline."
              points={[
                'Advanced product patterns',
                'Higher-signal premium blocks',
                'Designed for builders who already have wiring',
              ]}
              footnote="Commercial usage, update rights, and included materials depend on the offer scope available at launch."
              cta="Notify me"
              href={INTERNAL.waitlist}
              variant="outline"
            />

            <PricingCard
              title="Starter PRO"
              price={PRICING.starterPro}
              badge="Coming"
              eyebrow="Business layer"
              description="The wired upgrade path for builders who want business-critical foundations handled."
              points={[
                'Auth direction',
                'Billing direction',
                'Backend + deploy foundations',
              ]}
              footnote="This offer is intended as a commercial product license, not a transfer of product ownership or resale rights."
              cta="Join waitlist"
              href={INTERNAL.waitlist}
              variant="outline"
            />

            <PricingCard
              title="All-In Access"
              price={PRICING.allIn}
              badge="Recommended"
              eyebrow="Anchor offer"
              description="The long-term premium offer: Starter PRO + future UI PRO + selected future drops."
              points={[
                'Best strategic value',
                'Designed as the anchor offer',
                'Made for long-term builders',
                'Includes products within offer scope',
              ]}
              footnote="Included products, update access, and future premium drops are limited to the scope explicitly included in the offer purchased at checkout."
              cta="Get early access"
              href={INTERNAL.waitlist}
              variant="default"
              highlight
            />
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <SectionHeader
            title="FAQ"
            description="Short answers to the questions that block upgrades."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <FaqCard
              question="Is PRO available today?"
              answer={
                <>
                  Not yet. Starter Free is available now. PRO is a
                  defined offer with a phased delivery path.
                </>
              }
            />

            <FaqCard
              question="Why create the Upgrade page before PRO is fully shipped?"
              answer={
                <>
                  Because the offer must be clear before the build is
                  complete. This page defines the promise, pricing
                  direction, and upgrade path.
                </>
              }
            />

            <FaqCard
              question="Can I use Starter Free in production?"
              answer={
                <>
                  Yes, but you will wire auth, billing, data, and
                  operational setup yourself. Free is ideal when you
                  want speed and flexibility first.
                </>
              }
            />

            <FaqCard
              question="What actually changes when I upgrade?"
              answer={
                <>
                  The UI direction stays consistent. What changes is
                  the depth of wiring: auth, billing, backend
                  foundations, and launch guidance.
                </>
              }
            />

            <FaqCard
              question="Will PRO force a rewrite?"
              answer={
                <>
                  The intent is progressive adoption. Keep the screens
                  and UX contracts, then move to a stronger business
                  layer underneath.
                </>
              }
            />

            <FaqCard
              question="Where should I go for the legal scope?"
              answer={
                <>
                  Use{' '}
                  <Link
                    href={INTERNAL.access}
                    className="font-mono text-foreground underline underline-offset-4"
                  >
                    /access
                  </Link>{' '}
                  for the commercial overview and{' '}
                  <Link
                    href={INTERNAL.license}
                    className="font-mono text-foreground underline underline-offset-4"
                  >
                    /license
                  </Link>{' '}
                  and{' '}
                  <Link
                    href={INTERNAL.terms}
                    className="font-mono text-foreground underline underline-offset-4"
                  >
                    /terms
                  </Link>{' '}
                  for the governing usage and legal terms.
                </>
              }
            />
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-5xl">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Start with Free. Upgrade when wiring becomes the
                  bottleneck.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Use Starter Free to validate your SaaS UX now. Join
                  PRO if you want a faster path to auth, billing,
                  backend foundations, and launch-ready structure.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Business wiring</Pill>
                  <Pill>Premium path</Pill>
                  <Pill>Revenue-focused upgrade</Pill>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={INTERNAL.waitlist}>
                    Join PRO waitlist
                  </Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Offer page first. Delivery phased. Direction stays
            consistent.
          </p>
        </section>
      </div>
    </Container>
  );
}

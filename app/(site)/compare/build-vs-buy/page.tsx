import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  Clock,
  Code2,
  CreditCard,
  Database,
  GitBranch,
  Lock,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';
import { PRODUCT_DISPLAY } from '@pycolors/core-config/products/public-catalog';

import { Container } from '@/components/container';
import { PageHero } from '@/components/marketing/page-hero';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'Build vs Buy a Next.js SaaS Starter',
  description:
    'Compare building a Next.js SaaS starter from scratch with buying PyColors Starter Pro. Understand time, cost, scope, tradeoffs, and when each path makes sense.',
  alternates: {
    canonical: '/compare/build-vs-buy',
  },
  openGraph: {
    title: 'Build vs Buy a Next.js SaaS Starter',
    description:
      'A sober comparison of building SaaS foundations yourself versus using PyColors Starter Pro for auth, billing, protected routes, Prisma, and launch-ready structure.',
    url: '/compare/build-vs-buy',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build vs Buy a Next.js SaaS Starter',
    description:
      'Compare the tradeoffs of building SaaS foundations from scratch versus starting with PyColors Starter Pro.',
    images: ['/seo/twitter-main.png'],
  },
};

const starterProPrice = PRODUCT_DISPLAY['starter-pro'].priceLabel;

const scratchItems = [
  'You need unusual architecture, custom infrastructure, or internal platform constraints.',
  'The starter itself is part of your product advantage and needs full ownership from day one.',
  'You have enough engineering time to build, test, document, and maintain the foundation.',
  'You want every auth, billing, data, and deployment decision to match an existing team standard.',
] as const;

const buyItems = [
  'You want to start from a working SaaS foundation instead of a blank repository.',
  'You need authentication, Stripe billing, protected routes, Prisma, and product surfaces shaped together.',
  'You value faster validation more than full control over every early technical decision.',
  'You are comfortable adapting an opinionated foundation to your own product requirements.',
] as const;

const comparisonRows = [
  {
    factor: 'Initial setup',
    scratch:
      'You choose and wire every package, route, model, and integration.',
    pro: 'Starter Pro starts with the core SaaS wiring already shaped.',
  },
  {
    factor: 'Auth and account flows',
    scratch:
      'Requires provider setup, sessions, verification, reset flows, and protected route decisions.',
    pro: 'Includes Auth.js foundations, OAuth, credentials, verification, reset, sessions, and protected routes.',
  },
  {
    factor: 'Billing foundation',
    scratch:
      'Requires checkout, portal, webhook handling, subscription state, invoices, and recovery paths.',
    pro: 'Includes Stripe checkout, billing portal, webhook sync, invoices, lifecycle handling, and recovery surfaces.',
  },
  {
    factor: 'Time profile',
    scratch:
      'Often measured in focused engineering weeks before the product-specific work is stable.',
    pro: 'Moves repeated foundation work earlier so product-specific work can start sooner.',
  },
  {
    factor: 'Cost profile',
    scratch:
      'Lower cash cost, higher engineering cost, and more maintenance responsibility.',
    pro: `${starterProPrice} launch price, plus the time needed to review, adapt, and maintain it.`,
  },
  {
    factor: 'Control',
    scratch:
      'Maximum control over architecture, naming, dependencies, and tradeoffs.',
    pro: 'Practical control after purchase, with an existing structure to adapt rather than invent.',
  },
] as const;

const includedItems = [
  {
    title: 'Authentication foundation',
    description:
      'Email/password auth, Google and GitHub OAuth, verification, password reset, sessions, and protected routes.',
    icon: Lock,
  },
  {
    title: 'Stripe billing foundation',
    description:
      'Checkout, billing portal, invoices, subscription lifecycle handling, webhook synchronization, and recovery paths.',
    icon: CreditCard,
  },
  {
    title: 'Database and backend baseline',
    description:
      'Prisma, PostgreSQL foundations, typed boundaries, validation patterns, and production-oriented server structure.',
    icon: Database,
  },
  {
    title: 'Product-shaped surfaces',
    description:
      'Dashboard, settings, billing, admin, protected app structure, and documentation that make the starter easier to evaluate.',
    icon: Code2,
  },
] as const;

const risks = [
  {
    title: 'Buying is not a substitute for product judgment',
    description:
      'Starter Pro gives you a foundation. You still need to design onboarding, pricing, product logic, support flows, and customer experience.',
  },
  {
    title: 'Opinionated structure means adaptation work',
    description:
      'You should expect to read the code, remove what you do not need, and align naming, flows, and architecture with your product.',
  },
  {
    title: 'Building still wins for unusual constraints',
    description:
      'If your product requires a very specific infrastructure, auth model, billing model, or compliance posture, building from scratch can be the better path.',
  },
] as const;

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-border-subtle py-12"
    >
      <div className="mb-7 max-w-3xl space-y-3">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="rounded-[5px] border-border-subtle bg-background/60"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2 className="font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}

function DecisionCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly string[];
}) {
  return (
    <Card className="h-full rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-success"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function BuildVsBuyComparisonPage() {
  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Compare', href: '/compare/build-vs-buy' },
              {
                label: 'Build vs Buy',
                href: '/compare/build-vs-buy',
              },
            ]}
          />
        </div>

        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Comparison',
              icon: <GitBranch className="h-3.5 w-3.5" />,
            },
            {
              label: 'Starter Pro',
              variant: 'secondary',
              icon: <ShieldCheck className="h-3.5 w-3.5" />,
            },
          ]}
          title="Build a SaaS starter from scratch or buy Starter Pro?"
          description="A practical comparison for developers deciding whether to assemble auth, billing, protected routes, database structure, and launch-ready SaaS foundations themselves, or start from PyColors Starter Pro and adapt it."
          actions={
            <>
              <BuyStarterProButton
                fullWidth={false}
                label={`Buy Starter Pro — ${starterProPrice}`}
              />

              <Button
                asChild
                variant="outline"
                className="rounded-[5px]"
              >
                <Link href="/starters/pro">
                  View Starter Pro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          }
          pills={[
            'No magic claims',
            'No fake ROI math',
            'Auth + billing focus',
            'Developer-first tradeoffs',
          ]}
        />

        <div className="mt-12">
          <Section
            id="build-from-scratch"
            eyebrow="Option one"
            title="When building from scratch makes sense"
            description="Building your own foundation is often the right decision when control matters more than speed."
          >
            <DecisionCard
              title="Choose scratch when the foundation is strategic"
              description="A custom build gives you maximum ownership over architecture, naming, dependencies, deployment assumptions, and internal standards."
              items={scratchItems}
            />
          </Section>

          <Section
            id="buy-starter-pro"
            eyebrow="Option two"
            title="When buying Starter Pro makes sense"
            description="Starter Pro is best treated as acceleration: a working foundation to inspect, adapt, and ship from."
          >
            <DecisionCard
              title="Choose Starter Pro when repeated setup is the bottleneck"
              description="Starter Pro is designed for teams and solo builders who would rather spend early energy on product-specific work than recurring SaaS plumbing."
              items={buyItems}
            />
          </Section>

          <Section
            id="cost-time-comparison"
            eyebrow="Cost and time"
            title="Cost and time comparison"
            description="The exact numbers depend on your experience, stack, and quality bar. The useful question is where you want to spend engineering attention."
          >
            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factor</TableHead>
                    <TableHead>Build from scratch</TableHead>
                    <TableHead>Buy Starter Pro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonRows.map((row) => (
                    <TableRow key={row.factor}>
                      <TableCell className="font-medium text-foreground">
                        {row.factor}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.scratch}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.pro}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              This comparison is directional, not a guarantee. Starter
              Pro reduces repeated foundation work, but every serious
              product still needs review, customization, testing, and
              maintenance.
            </p>
          </Section>

          <Section
            id="included"
            eyebrow="Included scope"
            title="What Starter Pro includes"
            description="The value is not a longer feature list. It is that the core SaaS pieces are shaped together in one Next.js foundation."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {includedItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-background">
                        <Icon
                          className="h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Section>

          <Section
            id="risks-tradeoffs"
            eyebrow="Tradeoffs"
            title="Risks and tradeoffs"
            description="A credible build-vs-buy decision should include the downsides of both paths."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {risks.map((risk) => (
                <Card
                  key={risk.title}
                  className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft"
                >
                  <TriangleAlert
                    className="h-5 w-5 text-warning"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    {risk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {risk.description}
                  </p>
                </Card>
              ))}
            </div>
          </Section>

          <section className="border-t border-border-subtle py-12">
            <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface p-6 shadow-medium sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-3">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                  >
                    Practical acceleration
                  </Badge>

                  <h2 className="font-brand text-2xl font-semibold tracking-tight">
                    Start from a real SaaS foundation, then make it
                    yours.
                  </h2>

                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    Starter Pro is for builders who want auth, billing,
                    protected routes, database foundations, and product
                    surfaces already connected enough to evaluate,
                    adapt, and ship from.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${starterProPrice}`}
                  />

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/docs/starter-pro">Read the docs</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-6 flex items-center gap-2 text-xs leading-6 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Best next step: inspect the Starter Pro scope, then
                decide whether the saved setup work is worth the
                adaptation work for your product.
              </span>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}

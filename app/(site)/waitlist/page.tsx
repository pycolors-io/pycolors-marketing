import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'PRO Waitlist',
  description:
    'Join the PyColors PRO waitlist to get early access to Starter PRO, pricing updates, and future All-In access.',
  alternates: { canonical: '/waitlist' },
  openGraph: {
    title: 'PRO Waitlist · PyColors',
    description:
      'Join the PyColors PRO waitlist to get early access to Starter PRO, pricing updates, and future All-In access.',
    url: '/waitlist',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRO Waitlist · PyColors',
    description:
      'Join the PyColors PRO waitlist to get early access to Starter PRO, pricing updates, and future All-In access.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  upgrade: '/upgrade',
  access: '/access',
  starters: '/starters',
  starterFree: '/starters/free',
  roadmap: '/roadmap',
  docsUpgrade: '/docs/saas-starter/upgrade-to-pro',
} as const;

const WAITLIST_URL = 'https://tally.so/r/RG4Wr4';

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

function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="p-5">
      <div className="space-y-2">
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}

function PricingPreviewCard({
  title,
  price,
  badge,
  description,
  highlight = false,
}: {
  title: string;
  price: string;
  badge?: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        'relative p-5',
        highlight && 'border-foreground/15 shadow-sm',
      )}
    >
      {highlight ? (
        <div className="absolute inset-x-0 top-0 h-1 bg-foreground/90" />
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-medium">{title}</div>
          {badge ? (
            <Badge
              variant={highlight ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {badge}
            </Badge>
          ) : null}
        </div>

        <div className="font-brand text-2xl font-semibold tracking-tight">
          {price}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
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

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl">
            {/* HERO */}
            <header className="flex flex-col items-center gap-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Waitlist open
                </Badge>
                <Badge variant="outline">PRO (coming)</Badge>

                <Link
                  href={INTERNAL.upgrade}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                    focusRing,
                  )}
                >
                  Back to Upgrade
                </Link>
              </div>

              <div className="space-y-4">
                <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  Join the PRO waitlist.
                  <span className="block font-bold">
                    Be first when the business layer ships.
                  </span>
                </h1>

                <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                  Starter Free helps you validate UX and ship
                  production-shaped screens fast. PRO is the premium
                  upgrade path for auth, billing, backend foundations,
                  and deployment guidance.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <Pill>Early access</Pill>
                <Pill>Pricing updates</Pill>
                <Pill>Launch notifications</Pill>
                <Pill>Bundle-first visibility</Pill>
              </div>
            </header>

            {/* PRIMARY CTA */}
            <section className="py-12 sm:py-16">
              <Card className="p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <Badge variant="outline" className="gap-2">
                        <Sparkles
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Early audience
                      </Badge>
                    </div>

                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      The waitlist is where PyColors captures serious
                      product intent. Join to stay close to Starter
                      PRO, pricing decisions, and the long-term All-In
                      direction.
                    </p>
                  </div>

                  <Button size="lg" asChild>
                    <a
                      href={WAITLIST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get early access to PyColors PRO"
                    >
                      Join the PRO waitlist
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    Be first to hear about Starter PRO, pricing
                    updates, and All-In Access.
                  </p>
                </div>
              </Card>
            </section>

            {/* WHY JOIN NOW */}
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
                        Why join now
                      </Badge>
                    </div>

                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      The waitlist is not just a notification form. It
                      signals interest around a premium SaaS offer
                      before the full release is public. That helps
                      shape pricing, packaging, and shipping priority
                      with real demand.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:min-w-[240px] sm:justify-end">
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.access}>View Access</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.upgrade}>Review PRO</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* WHAT YOU'LL GET */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="What you’ll get"
                description="The waitlist exists to capture intent and keep future buyers informed."
                action={
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.upgrade}>
                      Review the offer
                    </Link>
                  </Button>
                }
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <BenefitCard
                  title="Early access"
                  description="Be among the first to know when Starter PRO becomes available."
                />
                <BenefitCard
                  title="Pricing updates"
                  description="Get notified as founding pricing and packaging become concrete."
                />
                <BenefitCard
                  title="Bundle visibility"
                  description="See how Starter PRO, UI PRO, and All-In Access evolve as a coherent premium ecosystem."
                />
                <BenefitCard
                  title="Shipping progress"
                  description="Stay close to the phased rollout without having to manually track every update."
                />
              </div>
            </section>

            {/* WHY THIS EXISTS */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="Why this waitlist exists"
                description="Starter Free already gives you the product surface. PRO exists for the wiring that slows serious builders down."
                action={
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.starterFree}>
                      Start with Free
                    </Link>
                  </Button>
                }
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Starter Free</Badge>
                    </div>
                    <div className="text-sm font-medium">
                      Validate UX now
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Use a production-shaped SaaS surface with auth
                      UX, dashboard, CRUD screens, settings, billing
                      entrypoints, and B2B admin patterns.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <TrustPill label="Mock data" />
                      <TrustPill label="Frontend-first" />
                      <TrustPill label="Fast evaluation" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">PRO</Badge>
                    </div>
                    <div className="text-sm font-medium">
                      Wire the business later
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Upgrade when authentication, billing, backend
                      foundations, and deployment guidance become the
                      limiting factor in your time-to-revenue.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <TrustPill label="Auth" />
                      <TrustPill label="Billing" />
                      <TrustPill label="Backend foundations" />
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* PRICING PREVIEW */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="Pricing preview"
                description="Show the pricing direction early so the future premium positioning feels intentional."
                action={
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.roadmap}>
                      Track delivery
                    </Link>
                  </Button>
                }
              />

              <div className="grid gap-4 lg:grid-cols-3">
                <PricingPreviewCard
                  title="UI PRO"
                  price="€129"
                  badge="Later"
                  description="Premium SaaS patterns built on top of the PyColors UI baseline."
                />
                <PricingPreviewCard
                  title="Starter PRO"
                  price="€249"
                  badge="Coming"
                  description="The wired upgrade path for builders who want the business layer handled."
                />
                <PricingPreviewCard
                  title="All-In Access"
                  price="€349"
                  badge="Recommended"
                  description="The long-term premium offer for builders who want the full PyColors SaaS stack."
                  highlight
                />
              </div>
            </section>

            {/* FAQ */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="FAQ"
                description="Short answers to the questions that block signups."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <FaqCard
                  question="Is PRO available today?"
                  answer={
                    <>
                      Not yet. The waitlist is here so interested
                      builders can get notified as the offer ships.
                    </>
                  }
                />

                <FaqCard
                  question="Why join now?"
                  answer={
                    <>
                      To stay close to the launch, see pricing
                      evolution, and capture early-access updates
                      without checking manually.
                    </>
                  }
                />

                <FaqCard
                  question="What happens after I join?"
                  answer={
                    <>
                      You’ll be part of the early audience for Starter
                      PRO, pricing announcements, and future All-In
                      positioning.
                    </>
                  }
                />

                <FaqCard
                  question="Can I still use Starter Free now?"
                  answer={
                    <>
                      Yes. Starter Free is the current entry point.
                      The waitlist is for the future premium upgrade
                      path.
                    </>
                  }
                />

                <FaqCard
                  question="Does the waitlist guarantee purchase?"
                  answer={
                    <>
                      No. It signals interest and keeps you informed.
                      The actual commercial offer stays defined by the
                      upgrade and access pages.
                    </>
                  }
                />

                <FaqCard
                  question="Where should I look for the official offer?"
                  answer={
                    <>
                      Use{' '}
                      <Link
                        href={INTERNAL.upgrade}
                        className="font-mono text-foreground underline underline-offset-4"
                      >
                        /upgrade
                      </Link>{' '}
                      for the upgrade promise and{' '}
                      <Link
                        href={INTERNAL.access}
                        className="font-mono text-foreground underline underline-offset-4"
                      >
                        /access
                      </Link>{' '}
                      for pricing and packaging direction.
                    </>
                  }
                />
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mx-auto mt-10 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Join now. Build with Free in the meantime.
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Keep using Starter Free to validate your product
                      surface, and join the waitlist to stay close to
                      the premium upgrade path.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Free today</Pill>
                      <Pill>PRO later</Pill>
                      <Pill>Clear upgrade path</Pill>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <a
                        href={WAITLIST_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join PRO waitlist
                      </a>
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
                Waitlist first. Offer stays clear. Delivery can
                evolve.
              </p>
            </section>
          </div>
        </Container>
      </main>
    </div>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Check,
  CreditCard,
  Download,
  LayoutDashboard,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
} from '@pycolors/ui';

import { Container } from '@/components/container';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title:
    'Starter Pro — Next.js SaaS starter with auth and billing | PyColors',
  description:
    'Starter Pro is a production-ready Next.js SaaS starter with real authentication, real Stripe billing, protected app structure, and launch-ready foundations already wired.',
  openGraph: {
    title:
      'Starter Pro — Next.js SaaS starter with auth and billing | PyColors',
    description:
      'Launch a real SaaS faster with authentication, Stripe billing, protected app structure, and production-ready foundations already built.',
    url: 'https://pycolors.io/starters/pro',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Starter Pro — Next.js SaaS starter with auth and billing | PyColors',
    description:
      'Launch a real SaaS faster with authentication, Stripe billing, protected app structure, and production-ready foundations already built.',
    images: ['/seo/twitter-main.png'],
  },
  alternates: {
    canonical: 'https://pycolors.io/starters/pro',
  },
};

const launchPrice = '199 €';
const regularPrice = '299 €';

const coreFeatures = [
  {
    title: 'Real authentication already built',
    description:
      'Email/password auth, Google and GitHub OAuth, email verification, password reset, sessions, account linking, and production-ready auth foundations.',
    icon: Lock,
  },
  {
    title: 'Stripe billing already integrated',
    description:
      'Checkout, billing portal, invoices, webhook synchronization, and subscription lifecycle handling are already wired.',
    icon: CreditCard,
  },
  {
    title: 'Protected SaaS app architecture',
    description:
      'Protected routes, account structure, settings, billing-aware flows, and scalable SaaS foundations included.',
    icon: LayoutDashboard,
  },
  {
    title: 'Built to launch real products',
    description:
      'Starter Pro is shaped for real SaaS execution, not just interface demos or generic boilerplates.',
    icon: Rocket,
  },
] as const;

const includedItems = [
  {
    title: 'Full Starter Pro source code',
    description:
      'Own the complete codebase and adapt it to your own SaaS product.',
    icon: Download,
  },
  {
    title: 'Production auth flows',
    description:
      'Real authentication flows with protected sessions and provider support.',
    icon: ShieldCheck,
  },
  {
    title: 'Production billing flows',
    description:
      'Real monetization foundations already connected to Stripe.',
    icon: CreditCard,
  },
  {
    title: 'Launch-ready structure',
    description:
      'A scalable baseline focused on faster execution and reduced rewrite risk.',
    icon: LayoutDashboard,
  },
] as const;

const comparisonRows = [
  { label: 'UI and app surfaces', free: 'Included', pro: 'Included' },
  { label: 'Auth UX screens', free: 'Included', pro: 'Included' },
  { label: 'Real authentication', free: 'No', pro: 'Included' },
  { label: 'OAuth providers', free: 'No', pro: 'Included' },
  { label: 'Stripe billing', free: 'No', pro: 'Included' },
  { label: 'Webhook sync', free: 'No', pro: 'Included' },
  {
    label: 'Protected architecture',
    free: 'Partial',
    pro: 'Included',
  },
  {
    label: 'Best use case',
    free: 'Validate UX',
    pro: 'Launch faster',
  },
] as const;

const faqs = [
  {
    question: 'What do I get after purchase?',
    answer:
      'You receive the full Starter Pro source code with authentication, billing, protected app flows, and launch-ready SaaS foundations already wired.',
  },
  {
    question: 'Is Starter Pro production-ready?',
    answer:
      'Starter Pro is designed as a real SaaS foundation intended to accelerate production launches and reduce repeated setup work.',
  },
  {
    question: 'Is Stripe already integrated?',
    answer:
      'Yes. Stripe Checkout, billing portal, invoices, webhook synchronization, and subscription lifecycle flows are already included.',
  },
  {
    question: 'Can I use it commercially?',
    answer:
      'Yes. Starter Pro is built to become the foundation of your own commercial SaaS product.',
  },
  {
    question: 'Why buy Starter Pro instead of using Starter Free?',
    answer:
      'Starter Free validates product shape faster. Starter Pro removes the backend, auth, and billing bottlenecks that slow real launches.',
  },
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <Badge
          variant="outline"
          className="rounded-[5px] border-border-subtle bg-surface-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
        >
          {eyebrow}
        </Badge>
      ) : null}

      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted-foreground">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface">
        <Check className="h-3.5 w-3.5" />
      </span>

      <span>{children}</span>
    </li>
  );
}

export default function StarterProPage() {
  return (
    <main className="bg-background text-foreground">
      <Container className="py-20 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <PageHero
            badges={[
              {
                label: 'Starter Pro',
                variant: 'secondary',
              },
              {
                label: 'Launch-ready',
                variant: 'outline',
              },
              {
                label: `Launch offer ${launchPrice}`,
                variant: 'outline',
                icon: (
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ),
              },
            ]}
            title="Launch a real SaaS faster with auth and billing already built."
            subtitle="Skip repetitive setup work and start from a production-ready SaaS baseline."
            description="Starter Pro gives you real authentication, real Stripe billing, protected SaaS structure, and launch-ready account foundations already wired."
            actions={
              <>
                <BuyStarterProButton
                  fullWidth={false}
                  label={`Buy Starter Pro — ${launchPrice}`}
                />

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href="/docs/starter-pro">Read docs</Link>
                </Button>
              </>
            }
            pills={[
              'Real auth included',
              'Stripe billing included',
              'Protected app architecture',
              'Production-ready SaaS baseline',
            ]}
            extraClassName="mx-auto max-w-6xl"
            extra={
              <>
                <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
                  <CheckItem>Full source code included</CheckItem>
                  <CheckItem>Production auth already wired</CheckItem>
                  <CheckItem>Stripe monetization included</CheckItem>
                  <CheckItem>
                    Built for commercial SaaS products
                  </CheckItem>
                </div>

                <div className="mx-auto mt-12 max-w-6xl">
                  <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium">
                    <div className="border-b border-border-subtle bg-surface-muted px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />

                          <span className="text-xs font-medium">
                            Starter Pro
                          </span>
                        </div>

                        <span className="text-[11px] text-muted-foreground">
                          Production SaaS preview
                        </span>
                      </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden bg-background">
                      <Image
                        src="/images/starters/starter-pro-hero-pycolors.png"
                        alt="Starter Pro dashboard preview"
                        fill
                        priority
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </Container>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="What you get"
              title="Everything needed to move faster toward a real SaaS launch"
              description="Starter Pro focuses on the layers that repeatedly slow developers down before launch."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {coreFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={feature.title}
                    className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                  >
                    <CardHeader className="space-y-4">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
                        <Icon className="h-5 w-5" />
                      </div>

                      <CardTitle className="text-xl">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="After purchase"
              title="What you get immediately"
              description="No vague promises. Real launch-ready SaaS foundations already wired."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {includedItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                  >
                    <CardHeader className="space-y-4">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
                        <Icon className="h-5 w-5" />
                      </div>

                      <CardTitle className="text-lg">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-pro-border bg-pro-surface-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
                >
                  Included in Starter Pro
                </Badge>

                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  The core SaaS foundation
                </h3>

                <ul className="mt-5 space-y-3">
                  <CheckItem>Full Starter Pro source code</CheckItem>
                  <CheckItem>
                    Real email/password authentication
                  </CheckItem>
                  <CheckItem>Google and GitHub OAuth</CheckItem>
                  <CheckItem>
                    Email verification and reset password
                  </CheckItem>
                  <CheckItem>Stripe Checkout integration</CheckItem>
                  <CheckItem>Billing portal and invoices</CheckItem>
                </ul>
              </div>

              <div>
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-success-border-subtle bg-success-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
                >
                  Also included
                </Badge>

                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  Launch-ready product structure
                </h3>

                <ul className="mt-5 space-y-3">
                  <CheckItem>Webhook sync with Prisma</CheckItem>
                  <CheckItem>Protected app structure</CheckItem>
                  <CheckItem>Settings foundations</CheckItem>
                  <CheckItem>Launch-ready SaaS baseline</CheckItem>
                  <CheckItem>Commercial usage rights</CheckItem>
                  <CheckItem>
                    Documentation on pycolors.io/docs
                  </CheckItem>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHeading
                  eyebrow="Free vs Pro"
                  title="Starter Free explores. Starter Pro launches."
                  description="Use Free to validate product UX faster. Move to Pro when auth, billing, and protected architecture become the bottleneck."
                />
              </div>

              <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="px-5 py-4 font-medium">
                        Feature
                      </th>
                      <th className="px-5 py-4 font-medium">
                        Starter Free
                      </th>
                      <th className="px-5 py-4 font-medium">
                        Starter Pro
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr
                        key={row.label}
                        className={cn(
                          index !== comparisonRows.length - 1 &&
                            'border-b border-border-subtle',
                        )}
                      >
                        <td className="px-5 py-4">{row.label}</td>

                        <td className="px-5 py-4 text-muted-foreground">
                          {row.free}
                        </td>

                        <td className="px-5 py-4 font-medium">
                          {row.pro}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <BuyStarterProButton
                fullWidth={false}
                label={`Move to Starter Pro — ${launchPrice}`}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Card className="rounded-[5px] border border-pro-border bg-pro-surface shadow-medium">
              <CardHeader className="space-y-6 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold">
                      Starter Pro
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Built for developers serious about launching.
                    </p>
                  </div>

                  <Badge className="rounded-[5px]">
                    Best launch offer
                  </Badge>
                </div>

                <div className="flex items-end gap-3">
                  <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {launchPrice}
                  </span>

                  <div className="pb-1 text-sm text-muted-foreground">
                    <span className="mr-2 line-through">
                      {regularPrice}
                    </span>
                    one-time payment
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <ul className="grid gap-3 sm:grid-cols-2">
                  <CheckItem>Full Starter Pro source code</CheckItem>
                  <CheckItem>Real authentication included</CheckItem>
                  <CheckItem>Stripe billing included</CheckItem>
                  <CheckItem>
                    Protected architecture included
                  </CheckItem>
                  <CheckItem>Commercial usage rights</CheckItem>
                  <CheckItem>Launch-ready SaaS baseline</CheckItem>
                </ul>

                <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4 text-sm text-muted-foreground">
                  One-time payment. Instant delivery after purchase.
                  Built for developers who want to stop rebuilding
                  SaaS infrastructure repeatedly.
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${launchPrice}`}
                  />

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-11 rounded-[5px] px-6 text-sm font-medium"
                  >
                    <Link href="/docs/starter-pro">Read docs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions buyers ask before paying"
              description="Reduce friction. Increase trust. Make the decision easier."
            />

            <div className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <Card
                  key={faq.question}
                  className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                >
                  <CardContent className="p-6">
                    <h3 className="text-base font-medium">
                      {faq.question}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[5px] border border-pro-border bg-pro-surface px-6 py-10 shadow-medium sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="rounded-[5px] border-pro-border bg-pro-surface-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
              >
                Ready to launch
              </Badge>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start from the SaaS foundation that gets you to market
                faster.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Buy Starter Pro and focus your time on product logic,
                onboarding, growth, and customers instead of
                rebuilding auth and billing infrastructure again.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <BuyStarterProButton
                  fullWidth={false}
                  label={`Buy Starter Pro — ${launchPrice}`}
                />

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[5px] px-6 text-sm font-medium"
                >
                  <Link href="/starters/free">
                    Compare with Starter Free
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

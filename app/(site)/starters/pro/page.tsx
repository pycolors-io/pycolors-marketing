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

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type IncludedItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type ComparisonRow = {
  label: string;
  free: boolean | string;
  pro: boolean | string;
};

type Faq = {
  question: string;
  answer: string;
};

const launchPrice = '199 €';
const regularPrice = '299 €';

const coreFeatures: Feature[] = [
  {
    title: 'Real authentication already built',
    description:
      'Email and password, Google and GitHub OAuth, email verification, reset password, account linking, and safer provider handling are already wired.',
    icon: Lock,
  },
  {
    title: 'Stripe billing already integrated',
    description:
      'Checkout, billing portal, webhook synchronization, invoices, and subscription state handling are already included.',
    icon: CreditCard,
  },
  {
    title: 'Protected app structure included',
    description:
      'Protected routes, billing-aware pages, settings foundations, and a cleaner app structure help you move faster with less rewrite risk.',
    icon: LayoutDashboard,
  },
  {
    title: 'Built to launch a real SaaS',
    description:
      'Starter Pro is shaped for a real commercial product, not just a UI demo. You start from a stronger base and spend your time on product logic and customers.',
    icon: Rocket,
  },
];

const includedItems: IncludedItem[] = [
  {
    title: 'Full Starter Pro source code',
    description:
      'Get the complete codebase so you can start building your own SaaS immediately.',
    icon: Download,
  },
  {
    title: 'Real auth flows',
    description:
      'Email/password auth, OAuth, email verification, reset password, and account foundations are included.',
    icon: ShieldCheck,
  },
  {
    title: 'Real Stripe billing',
    description:
      'Checkout, portal, invoices, webhook sync, and subscription lifecycle foundations are already wired.',
    icon: CreditCard,
  },
  {
    title: 'Protected app architecture',
    description:
      'Protected pages, settings surfaces, and app-level structure are already in place.',
    icon: LayoutDashboard,
  },
];

const comparisonRows: ComparisonRow[] = [
  { label: 'UI and app surfaces', free: true, pro: true },
  { label: 'Auth screens and UX', free: true, pro: true },
  { label: 'Real email/password auth', free: false, pro: true },
  { label: 'Google and GitHub OAuth', free: false, pro: true },
  {
    label: 'Email verification and password reset',
    free: false,
    pro: true,
  },
  { label: 'Stripe Checkout', free: false, pro: true },
  { label: 'Billing portal and invoices', free: false, pro: true },
  { label: 'Webhook sync with Prisma', free: false, pro: true },
  { label: 'Protected user flows', free: 'Partial', pro: true },
  {
    label: 'Best for',
    free: 'Exploring product shape',
    pro: 'Launching faster',
  },
];

const faqs: Faq[] = [
  {
    question: 'What do I get after purchase?',
    answer:
      'You get the full Starter Pro source code, plus the production-ready SaaS foundations already wired: authentication, Stripe billing, protected app structure, and launch-ready account flows.',
  },
  {
    question:
      'Is Starter Pro a real product foundation or just a boilerplate?',
    answer:
      'Starter Pro is built as a production-ready SaaS foundation. It is designed to help you ship a real commercial product faster, not just preview a UI.',
  },
  {
    question: 'Is Stripe already integrated?',
    answer:
      'Yes. Stripe Checkout, billing portal flow, invoices, webhook synchronization, and subscription lifecycle foundations are already included.',
  },
  {
    question: 'Can I use Starter Pro for a commercial SaaS?',
    answer:
      'Yes. Starter Pro is designed to become the base of a real SaaS product that you adapt to your own business logic and product direction.',
  },
  {
    question: 'What still needs to be built by me?',
    answer:
      'Your product-specific logic, domain workflows, onboarding, positioning, and growth system. Starter Pro removes repeated setup work so you can focus on what makes your SaaS valuable.',
  },
  {
    question:
      'Why buy Starter Pro instead of just using Starter Free?',
    answer:
      'Starter Free helps you explore product shape and UX faster. Starter Pro is the right choice when real auth, real billing, and a launch-ready app foundation become the bottleneck.',
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mx-auto max-w-3xl space-y-4',
        align === 'left' ? 'text-left' : 'text-center',
      )}
    >
      {eyebrow ? (
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
        >
          {eyebrow}
        </Badge>
      ) : null}

      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted-foreground">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-background">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function StarterProPage() {
  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'PyColors Starter Pro',
            description:
              'Production-ready Next.js SaaS starter with real authentication, Stripe billing, protected app structure, and launch-ready foundations.',
            brand: {
              '@type': 'Brand',
              name: 'PyColors',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              price: '199',
              availability: 'https://schema.org/InStock',
              url: 'https://pycolors.io/starters/pro',
            },
          }),
        }}
      />

      <Container className="py-20 sm:py-20 lg:py-24">
        <PageHero
          maxWidth="4xl"
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
          subtitle="Skip the slow setup and start from a production-ready Next.js SaaS foundation."
          description="Starter Pro gives you real authentication, real Stripe billing, protected app structure, and launch-ready account foundations so you can ship, validate, and charge sooner."
          actions={
            <>
              <BuyStarterProButton
                fullWidth={false}
                label={`Buy Starter Pro — ${launchPrice}`}
              />

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/docs/starter-pro">Read the docs</Link>
              </Button>
            </>
          }
          pills={[
            'Real auth included',
            'Stripe billing included',
            'Built to launch faster',
          ]}
          extraClassName="mx-auto max-w-6xl"
          extra={
            <>
              <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
                <CheckItem>Full source code after purchase</CheckItem>
                <CheckItem>
                  Authentication flows already wired
                </CheckItem>
                <CheckItem>
                  Stripe billing already integrated
                </CheckItem>
                <CheckItem>
                  Built for a real commercial SaaS
                </CheckItem>
              </div>

              <div className="mx-auto mt-12 max-w-6xl">
                <div className="relative overflow-hidden rounded-[28px] border bg-background/70 p-3 shadow-2xl shadow-black/10 backdrop-blur sm:p-4">
                  <div className="rounded-[22px] border bg-muted/30 p-2 sm:p-3">
                    <div className="mb-3 flex items-center justify-between px-1 sm:px-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                      </div>

                      <div className="rounded-full border bg-background/80 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
                        Starter Pro preview
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[20px] border bg-background">
                      <div className="relative aspect-video w-full bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.12),transparent_40%)]">
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

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/10 to-transparent" />
                </div>
              </div>
            </>
          }
        />
      </Container>

      <section className="border-b">
        <Container className="py-16 sm:py-16 lg:py-20 mx-auto w-full max-w-7xl ">
          <SectionHeading
            eyebrow="What you get"
            title="Everything needed to move faster toward a real SaaS launch"
            description="Starter Pro is focused on the parts that repeatedly slow developers down before launch: auth, billing, protected architecture, and production-ready app structure."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="rounded-2xl border"
                >
                  <CardHeader className="space-y-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
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
        </Container>
      </section>

      <section className="border-b">
        <Container className="py-16 sm:py-16 lg:py-20  max-w-4xl ">
          <SectionHeading
            eyebrow="After purchase"
            title="What you get immediately"
            description="No vague promise. You get the actual SaaS foundation needed to ship faster and stop rebuilding the same layers again."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {includedItems.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="rounded-2xl border">
                  <CardHeader className="space-y-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
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
          <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border bg-muted/20 p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  Included in Starter Pro
                </h3>
                <ul className="mt-4 space-y-3">
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
                <h3 className="text-lg font-semibold tracking-tight">
                  Also included
                </h3>
                <ul className="mt-4 space-y-3">
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

      <section className="border-b">
        <Container className="py-16 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              align="left"
              eyebrow="Free vs Pro"
              title="Starter Free helps you explore. Starter Pro helps you launch."
              description="Use Free to validate product shape faster. Move to Pro when real authentication, real billing, and protected user flows become the bottleneck."
            />

            <div className="overflow-hidden rounded-3xl border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-5 py-4 font-medium">Feature</th>
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
                          'border-b',
                      )}
                    >
                      <td className="px-5 py-4 text-foreground">
                        {row.label}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {typeof row.free === 'boolean'
                          ? row.free
                            ? 'Yes'
                            : 'No'
                          : row.free}
                      </td>
                      <td className="px-5 py-4 font-medium text-foreground">
                        {typeof row.pro === 'boolean'
                          ? row.pro
                            ? 'Yes'
                            : 'No'
                          : row.pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <BuyStarterProButton
              fullWidth={false}
              label={`Move to Starter Pro — ${launchPrice}`}
            />
          </div>
        </Container>
      </section>

      <section className="border-b">
        <Container className="py-16 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Pricing"
            title="One clear offer for developers ready to launch faster"
            description="Starter Pro is the main offer for developers who want to stop rebuilding auth and billing and start shipping a monetizable SaaS sooner."
          />

          <div className="mx-auto mt-12 max-w-3xl">
            <Card className="rounded-[28px] border-2 shadow-xl shadow-black/5">
              <CardHeader className="space-y-6 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold">
                      Starter Pro
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Best for developers who want a faster path to
                      launch.
                    </p>
                  </div>

                  <Badge className="rounded-full px-3 py-1 text-xs font-medium">
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
                    one-time launch price
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <ul className="grid gap-3 sm:grid-cols-2">
                  <CheckItem>Full Starter Pro source code</CheckItem>
                  <CheckItem>Real authentication included</CheckItem>
                  <CheckItem>Stripe billing included</CheckItem>
                  <CheckItem>
                    Protected app foundations included
                  </CheckItem>
                  <CheckItem>Commercial usage included</CheckItem>
                  <CheckItem>Built to launch faster</CheckItem>
                </ul>

                <div className="rounded-2xl border bg-muted/20 p-4 text-sm text-muted-foreground">
                  One-time payment. Instant delivery after purchase.
                  Built for developers who want to launch faster
                  without rebuilding auth and billing from scratch.
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
                    className="h-11 rounded-xl px-6 text-sm font-medium"
                  >
                    <Link href="/docs/starter-pro">
                      Read the docs
                    </Link>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Start from a serious SaaS base and keep your time
                  focused on product logic, onboarding, customers, and
                  growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-b">
        <Container className="py-16 sm:py-16 lg:py-20 max-w-5xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions buyers ask before paying"
            description="Answer the objections clearly. The goal is to reduce friction and make the buying decision easier."
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question} className="rounded-2xl border">
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
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-16 lg:py-24">
          <div className="rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
              >
                Ready to buy
              </Badge>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start from the SaaS foundation that gets you to launch
                faster.
              </h2>

              <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
                Buy Starter Pro now and move faster toward a real
                product with authentication, billing, and protected
                app structure already built.
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
                  className="h-11 rounded-xl px-6 text-sm font-medium"
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

import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CreditCard,
  LayoutDashboard,
  Lock,
  Rocket,
  Shield,
  Zap,
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
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title:
    'Starter Pro — Production-ready Next.js SaaS starter | PyColors',
  description:
    'Starter Pro is a production-ready Next.js SaaS starter with real authentication, real Stripe billing, protected app architecture, and scalable foundations already wired.',
  openGraph: {
    title:
      'Starter Pro — Production-ready Next.js SaaS starter | PyColors',
    description:
      'Real authentication, real Stripe billing, protected app architecture, and scalable SaaS foundations already wired.',
    url: 'https://pycolors.io/starters/pro',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Starter Pro — Production-ready Next.js SaaS starter | PyColors',
    description:
      'Ship a real SaaS faster with authentication, billing, protected app structure, and scalable foundations already wired.',
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

const features: Feature[] = [
  {
    title: 'Real authentication flows',
    description:
      'Email and password, Google and GitHub OAuth, email verification, password reset, account linking, and safer provider management are already wired.',
    icon: Lock,
  },
  {
    title: 'Stripe billing already wired',
    description:
      'Checkout, billing portal flow, webhook synchronization, invoices, subscription state handling, and monetization foundations are already in place.',
    icon: CreditCard,
  },
  {
    title: 'Protected app architecture',
    description:
      'Protected routes, billing-aware pages, settings foundations, and scalable app structure reduce launch friction and future rewrites.',
    icon: LayoutDashboard,
  },
  {
    title: 'Built to become a real SaaS',
    description:
      'Starter Pro is structured for commercial products, not just screenshots: cleaner domain boundaries, Prisma-backed foundations, and stronger product evolution paths.',
    icon: Rocket,
  },
];

const comparisonRows: ComparisonRow[] = [
  { label: 'Landing and app surfaces', free: true, pro: true },
  { label: 'Auth screens and UX', free: true, pro: true },
  { label: 'Real email/password auth', free: false, pro: true },
  { label: 'Google & GitHub OAuth', free: false, pro: true },
  {
    label: 'Email verification and reset password',
    free: false,
    pro: true,
  },
  { label: 'Stripe Checkout integration', free: false, pro: true },
  { label: 'Billing portal and invoices', free: false, pro: true },
  { label: 'Webhook sync with Prisma', free: false, pro: true },
  { label: 'Plan gating foundations', free: false, pro: true },
  { label: 'Protected app architecture', free: 'Partial', pro: true },
  {
    label: 'Best use case',
    free: 'Validate product shape',
    pro: 'Launch faster',
  },
];

const faqs: Faq[] = [
  {
    question:
      'Is Starter Pro a real product foundation or just a boilerplate?',
    answer:
      'Starter Pro is built as a production-shaped SaaS foundation. It includes real auth flows, real Stripe billing, protected app structure, settings patterns, and a stronger commercial baseline.',
  },
  {
    question: 'Who is Starter Pro for?',
    answer:
      'It is for developers, indie hackers, freelancers, and technical founders who want to ship faster without rebuilding authentication, billing, and app foundations from scratch.',
  },
  {
    question: 'Is Stripe already integrated?',
    answer:
      'Yes. Stripe Checkout, billing portal flow, webhook synchronization, invoices, and monetization-ready foundations are already included.',
  },
  {
    question: 'Can I use it for a commercial SaaS?',
    answer:
      'Yes. Starter Pro is designed to become the base of a real commercial SaaS product, not just a demo project or UI showcase.',
  },
  {
    question: 'What do I still need to build myself?',
    answer:
      'Your unique product logic, domain workflows, onboarding, positioning, and growth. Starter Pro removes repeated foundation work so you can focus on what makes your business valuable.',
  },
  {
    question:
      'Why buy Starter Pro instead of starting from Starter Free?',
    answer:
      'Starter Free is ideal when you are still exploring product shape. Starter Pro is the right move when auth, billing, and protected app foundations are already the bottleneck and you want to launch sooner.',
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
              'Production-ready Next.js SaaS starter with authentication, billing, protected app structure, and scalable architecture.',
            brand: {
              '@type': 'Brand',
              name: 'PyColors',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: '199',
              availability: 'https://schema.org/InStock',
              url: 'https://pycolors.io/access',
            },
          }),
        }}
      />

      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-20 sm:px-8 sm:py-24 lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:py-28">
          <div className="max-w-2xl flex-1">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge className="rounded-full px-3 py-1 text-xs font-medium">
                Starter Pro
              </Badge>
              <p className="text-sm text-muted-foreground">
                Launch offer{' '}
                <span className="font-semibold text-foreground">
                  {launchPrice}
                </span>{' '}
                instead of{' '}
                <span className="line-through">{regularPrice}</span>
              </p>
            </div>

            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Ship the product.{' '}
              <span className="text-muted-foreground">
                Skip the repeated foundation work.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Starter Pro is a production-ready Next.js SaaS starter
              with real authentication, real Stripe billing, protected
              app structure, and scalable foundations already wired so
              you can launch sooner and focus on the part customers
              actually pay for.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                <Link href="/access">View pricing</Link>
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <CheckItem>
                Authentication flows already wired
              </CheckItem>
              <CheckItem>Stripe billing already integrated</CheckItem>
              <CheckItem>
                Protected app and settings foundations
              </CheckItem>
              <CheckItem>
                Built to become a real commercial SaaS
              </CheckItem>
            </ul>
          </div>

          <div className="flex-1">
            <div className="relative mx-auto max-w-2xl rounded-[28px] border bg-card p-3 shadow-2xl shadow-black/5">
              <div className="rounded-[22px] border bg-background p-4 sm:p-5">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm font-medium">
                      Starter Pro Preview
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Production-shaped SaaS surface
                    </p>
                  </div>

                  <Badge variant="outline" className="rounded-full">
                    Built to monetize
                  </Badge>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        Revenue dashboard
                      </p>
                      <Zap className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        ['MRR', '$3,420'],
                        ['Trials', '28'],
                        ['Active', '142'],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-xl border bg-muted/30 p-3"
                        >
                          <p className="text-xs text-muted-foreground">
                            {label}
                          </p>
                          <p className="mt-2 text-lg font-semibold">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl border bg-muted/20 p-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Billing health</span>
                        <span>Synced with Stripe</span>
                      </div>
                      <div className="mt-4 h-28 rounded-xl border border-dashed bg-background" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Authentication
                        </p>
                      </div>
                      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <li>Email and password</li>
                        <li>Google and GitHub OAuth</li>
                        <li>Email verification</li>
                        <li>Password reset</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border p-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Billing</p>
                      </div>
                      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <li>Checkout flow</li>
                        <li>Billing portal</li>
                        <li>Invoices</li>
                        <li>Webhook sync</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <SectionHeading
            eyebrow="Why Starter Pro"
            title="You do not need another starter. You need one that actually gets you to launch."
            description="Most SaaS starters still leave you rebuilding auth, billing, and protected app foundations. Starter Pro is built to remove that repeated implementation cost so you can spend your time on product, positioning, and customers."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Stop rebuilding the same infrastructure',
                description:
                  'Authentication, billing, protected pages, settings flows, and product foundations are already structured for you.',
              },
              {
                title: 'Reduce time-to-revenue',
                description:
                  'Less time wiring auth and billing means more time shipping the product customers will actually pay for.',
              },
              {
                title: 'Launch with more credibility',
                description:
                  'Real billing flows, real auth, and a cleaner foundation help you launch something serious from day one.',
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-2xl border">
                <CardHeader>
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
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <SectionHeading
            eyebrow="What you get"
            title="Everything essential to launch a real SaaS foundation"
            description="Starter Pro is focused on the parts that repeatedly slow developers down before launch: auth, billing, protected architecture, and reusable product foundations."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((feature) => {
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
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              align="left"
              eyebrow="Free vs Pro"
              title="Starter Free helps you explore. Starter Pro helps you launch."
              description="Keep Free as the entry point. Convert with Pro when you want real authentication, real monetization, and a stronger commercial baseline."
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
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <SectionHeading
            eyebrow="Pricing"
            title="One serious offer. One clear buying decision."
            description="Do not dilute the launch with too many choices. Starter Pro is the main offer for developers who want to move from product-shaped starter to monetizable SaaS foundation."
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
                      Production-ready Next.js SaaS starter for
                      developers who want to launch faster.
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
                  <CheckItem>Authentication flows included</CheckItem>
                  <CheckItem>Stripe billing included</CheckItem>
                  <CheckItem>
                    Protected app foundations included
                  </CheckItem>
                  <CheckItem>
                    Commercial access to Starter Pro
                  </CheckItem>
                  <CheckItem>Built for real SaaS products</CheckItem>
                </ul>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <BuyStarterProButton fullWidth={false} />
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

                <div className="rounded-2xl border bg-muted/20 p-4 text-sm text-muted-foreground">
                  Built for developers, indie hackers, freelancers,
                  and technical founders who care about shipping
                  revenue faster without rebuilding the same
                  foundation again.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <SectionHeading
            eyebrow="Why buy now"
            title="A faster launch is only valuable if it removes the right work"
            description="Starter Pro is not about saving a few hours of UI work. It is about removing the repeated implementation cost of auth, billing, and protected app foundations so you can focus on the part customers pay for."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Developer ROI',
                body: 'Avoid losing weeks on repeated infrastructure work and move directly into product features, onboarding, positioning, and growth.',
              },
              {
                title: 'Business ROI',
                body: 'A product becomes sellable faster when login, billing, and protected flows already exist in a clean foundation.',
              },
              {
                title: 'Architectural ROI',
                body: 'You start from a structure that can grow into a real SaaS instead of a fragile demo that becomes expensive to refactor later.',
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-2xl border">
                <CardHeader>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-muted/30">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <CardTitle className="pt-4 text-lg">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions buyers will have before they pay"
            description="Answer the objections directly. The goal is to reduce friction, not hide it."
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
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
              >
                Ready to launch
              </Badge>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start from the foundation that gets you to revenue
                faster.
              </h2>

              <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
                Buy Starter Pro now, launch with a stronger base, and
                keep your time focused on product, customers, and
                growth instead of rebuilding the same infrastructure
                again.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <BuyStarterProButton
                  fullWidth={false}
                  label={`Get Starter Pro — ${launchPrice}`}
                />

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href="/upgrade">Compare Free vs Pro</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

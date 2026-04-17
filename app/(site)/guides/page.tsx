import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Layers3,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card, CardContent, cn } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'Guides | PyColors',
  description:
    'SaaS building guides for developers. Learn how to design and ship production-ready SaaS products with clearer product surfaces, stronger UX, and better system design.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Guides | PyColors',
    description:
      'SaaS building guides for developers. Learn how to design and ship production-ready SaaS products with clearer product surfaces, stronger UX, and better system design.',
    url: '/guides',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides | PyColors',
    description:
      'SaaS building guides for developers. Learn how to design and ship production-ready SaaS products with clearer product surfaces, stronger UX, and better system design.',
    images: ['/seo/twitter-main.png'],
  },
};

type Guide = {
  title: string;
  description: string;
  href: string;
  category: string;
};

const guides: Guide[] = [
  {
    title: 'What a production-ready SaaS starter should include',
    description:
      'The essential product surfaces and foundations that make a SaaS starter genuinely useful, without unnecessary complexity.',
    href: '/guides/production-ready-saas-starter',
    category: 'Foundations',
  },
  {
    title: 'How to build a SaaS with Next.js',
    description:
      'Architecture, product surface, authentication, billing, and deployment basics.',
    href: '/guides/build-saas-nextjs',
    category: 'Foundations',
  },
  {
    title: 'SaaS dashboard design patterns',
    description:
      'How modern SaaS dashboards are structured: KPIs, activity feeds, hierarchy, and actions.',
    href: '/guides/saas-dashboard-design',
    category: 'Product UX',
  },
  {
    title: 'Authentication flows for SaaS',
    description:
      'Login, register, password reset, OAuth, sessions, and protected product access.',
    href: '/guides/saas-auth-flows',
    category: 'Auth',
  },
  {
    title: 'SaaS billing UX best practices',
    description:
      'Plans, usage metrics, invoices, upgrade flows, and billing trust patterns.',
    href: '/guides/saas-billing-ux',
    category: 'Billing',
  },
  {
    title: 'Team & organization systems',
    description:
      'How SaaS products structure organizations, members, roles, invitations, and collaboration.',
    href: '/guides/saas-organizations',
    category: 'B2B',
  },
  {
    title: 'Admin panels for SaaS products',
    description:
      'Moderation tools, operational queues, audit logs, roles, and admin workflows.',
    href: '/guides/saas-admin-panels',
    category: 'Operations',
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
  eyebrow,
  title,
  description,
  action,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mb-6 space-y-3',
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {align === 'left' && action ? (
        <div className="sm:self-start">{action}</div>
      ) : null}
    </div>
  );
}

function GuideCard({ title, description, href, category }: Guide) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border">
      <CardContent className="p-6">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold tracking-tight">
                {title}
              </h3>

              <p className="text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full"
            >
              <Link href={href}>
                Read guide
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GuidesPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Guides', href: '/guides' },
            ]}
          />
        </div>

        <section className="relative overflow-hidden rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

          <div className="mx-auto max-w-4xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <BookOpen
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Guides
              </Badge>
              <Badge variant="outline">SaaS knowledge base</Badge>
              <Badge variant="outline" className="gap-1.5">
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Product-first
              </Badge>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              SaaS building guides for developers.{' '}
              <span className="block text-muted-foreground">
                Learn how stronger products are structured before you
                build them.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Learn how modern SaaS products are designed and
              structured — from dashboards and authentication to
              billing, team systems, admin workflows, and
              production-ready product foundations.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              The guides are educational on purpose: they help you
              understand the product logic first, so your UI, starter,
              and monetization decisions become clearer.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Start with Starter Free
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/examples">Explore Examples</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/ui/patterns">Browse UI Patterns</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Pill>Architecture</Pill>
              <Pill>Auth</Pill>
              <Pill>Billing</Pill>
              <Pill>B2B systems</Pill>
              <Pill>Admin UX</Pill>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-2">
                    <Layers3
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why these guides exist
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  PyColors is not only a UI library or a starter. It
                  is a system for building SaaS products with stronger
                  structure, clearer UX, and less rework. These guides
                  explain the product patterns behind that system so
                  you can make better product decisions before
                  implementation complexity takes over.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/access">View pricing</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/starter-pro">See Starter Pro</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Browse guides"
            title="Focused guides for the surfaces and systems that matter most in SaaS"
            description="These guides are designed to help developers think more clearly about product structure before moving into implementation."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/docs/saas-starter">Starter docs</Link>
              </Button>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.title} {...guide} />
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="How the guides fit the PyColors path"
            title="The guides are educational on purpose"
            description="They help you understand the product logic before you choose the interface patterns, starter path, or business wiring."
            align="center"
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Learn the product logic
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Use the guides to understand how strong SaaS
                  products structure dashboards, auth, billing,
                  settings, and operations.
                </p>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Explore patterns and examples
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Move from concepts to real interfaces with examples
                  and UI patterns built around the same product
                  surfaces.
                </p>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Build with Starter Free, upgrade with Starter Pro
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Start with a production-shaped SaaS surface today,
                  then move to Starter Pro when auth, billing, and
                  backend wiring become the blocker.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <Card className="rounded-[32px] border p-7 shadow-lg shadow-black/5 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-md space-y-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  Build your SaaS faster with PyColors
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Use Starter Free to validate a real SaaS product
                  surface now, then move to Starter Pro when the
                  business layer needs to be wired.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/starters/free">Starter Free</Link>
                </Button>

                <BuyStarterProButton
                  fullWidth={false}
                  label="Starter Pro — 199 €"
                />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}

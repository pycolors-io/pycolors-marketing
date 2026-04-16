import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Layers3,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'SaaS building guides for developers. Learn how to design and ship production-ready SaaS products with clearer product surfaces, stronger UX, and better system design.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Guides · PyColors',
    description:
      'SaaS building guides for developers. Learn how to design and ship production-ready SaaS products with clearer product surfaces, stronger UX, and better system design.',
    url: '/guides',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides · PyColors',
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

const guides = [
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

function GuideCard({ title, description, href, category }: Guide) {
  return (
    <Card className="flex h-full flex-col justify-between p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-brand text-base font-semibold tracking-tight">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
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
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
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
        {/* HERO */}
        <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Guides
            </Badge>
            <Badge variant="outline">SaaS knowledge base</Badge>
            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Product-first
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              SaaS building guides
              <span className="block font-bold">
                for developers who want to ship better products.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Learn how modern SaaS products are designed and
              structured — from dashboards and authentication to
              billing, team systems, and admin surfaces.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/starters/free">
                Start with Starter Free
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/examples">Explore Examples</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/ui/patterns">Browse UI Patterns</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Pill>Architecture</Pill>
            <Pill>Auth</Pill>
            <Pill>Billing</Pill>
            <Pill>B2B systems</Pill>
            <Pill>Admin UX</Pill>
          </div>
        </header>

        {/* INTRO STRIP */}
        <section className="py-4 sm:py-6">
          <Card className="p-6 sm:p-7">
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

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  PyColors is not only a UI library or a starter. It
                  is a system for building SaaS products with stronger
                  structure, clearer UX, and less rework. These guides
                  explain the product patterns behind that system.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/access">View Access</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/upgrade">Explore PRO</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* GRID */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Browse guides"
            description="Focused guides for the product surfaces and systems that matter most in SaaS."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/docs/starter">Starter docs</Link>
              </Button>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.title} {...guide} />
            ))}
          </div>
        </section>

        {/* MENTAL MODEL */}
        <section className="py-8 sm:py-10">
          <SectionHeader
            title="How these guides fit the PyColors path"
            description="The guides are educational on purpose — they help you understand the product logic before you wire the business layer."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Learn the product logic
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use the guides to understand how strong SaaS
                  products structure dashboards, auth, billing,
                  settings, and operations.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Explore patterns and examples
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Move from concepts to real interfaces with examples
                  and UI patterns built around the same product
                  surfaces.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Build with Starter Free
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Start with a production-shaped SaaS surface today,
                  then upgrade when auth, billing, and backend wiring
                  become the bottleneck.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-20">
          <Card className="p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <h2 className="font-brand text-lg font-semibold tracking-tight">
                Build your SaaS faster with PyColors
              </h2>

              <p className="text-sm text-muted-foreground">
                Use Starter Free to explore a real SaaS product
                surface now, then move to PRO when the business layer
                needs to be wired.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/starters/free">Starter Free</Link>
              </Button>

              <Button asChild variant="secondary">
                <Link href="/waitlist">Join PRO waitlist</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}

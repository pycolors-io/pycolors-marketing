import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

import { GuidePageShell } from '@/components/guides/guide-page-shell';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'How to build a SaaS with Next.js',
  description:
    'Learn how to build a modern SaaS with Next.js: product surface, architecture, authentication, billing, dashboards, and team systems.',
  alternates: { canonical: '/guides/build-saas-nextjs' },
  openGraph: {
    title: 'How to build a SaaS with Next.js · PyColors',
    description:
      'Learn how to build a modern SaaS with Next.js: product surface, architecture, authentication, billing, dashboards, and team systems.',
    url: '/guides/build-saas-nextjs',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to build a SaaS with Next.js · PyColors',
    description:
      'Learn how to build a modern SaaS with Next.js: product surface, architecture, authentication, billing, dashboards, and team systems.',
    images: ['/seo/twitter-main.png'],
  },
};

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-border/60 py-10 sm:py-12"
    >
      <div className="mb-5 space-y-1 sm:mb-6">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>

        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

function ChecklistCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card className="p-5">
      <div className="space-y-3">
        <div className="text-sm font-medium">{title}</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'why-nextjs', label: 'Why Next.js' },
  { id: 'product-surface', label: 'Product surface' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'billing', label: 'Billing' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'organizations', label: 'Teams & organizations' },
  { id: 'common-mistakes', label: 'Common mistakes' },
  { id: 'build-order', label: 'Build order' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuideBuildSaaSNextjsPage() {
  return (
    <GuidePageShell
      title="How to build a SaaS with Next.js"
      description="Learn the core product surfaces and architectural decisions behind a modern SaaS built with Next.js — from authentication and billing to dashboards, settings, and team systems."
      toc={toc}
    >
      <div>
        <section
          id="overview"
          className="scroll-mt-28 py-10 sm:py-12"
        >
          <div className="space-y-6">
            <Alert>
              <AlertTitle>Core idea</AlertTitle>
              <AlertDescription>
                The fastest way to build a SaaS is to define the
                product surface first, then wire the business layer
                once the UX is credible and validated.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ChecklistCard
                title="Product surface"
                items={['Auth', 'Dashboard', 'CRUD', 'Settings']}
              />
              <ChecklistCard
                title="Business layer"
                items={[
                  'Billing',
                  'Subscriptions',
                  'Roles',
                  'Organizations',
                ]}
              />
              <ChecklistCard
                title="Architecture"
                items={[
                  'App Router',
                  'Feature routes',
                  'Shared UI',
                  'Scalable structure',
                ]}
              />
              <ChecklistCard
                title="Upgrade path"
                items={[
                  'Start with Free',
                  'Validate UX',
                  'Upgrade later',
                  'Scale safely',
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              If you want to see how these product surfaces look in
              practice, explore the{' '}
              <Link
                href="/examples"
                className="text-foreground underline underline-offset-4"
              >
                examples
              </Link>{' '}
              or browse the{' '}
              <Link
                href="/ui/patterns"
                className="text-foreground underline underline-offset-4"
              >
                UI patterns
              </Link>{' '}
              before starting with{' '}
              <Link
                href="/starters/free"
                className="text-foreground underline underline-offset-4"
              >
                Starter Free
              </Link>
              .
            </p>
          </div>
        </section>

        <Section
          id="why-nextjs"
          title="Why Next.js works well for SaaS"
          description="Next.js gives SaaS builders a strong balance between product UX, routing, and production flexibility."
        >
          <p>
            Next.js is a strong fit for SaaS because it combines
            application routing, server capabilities, and deployment
            ergonomics in a single framework.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Why teams choose it"
              items={[
                'App Router for product structure',
                'Server and client composition',
                'Good deployment ergonomics',
                'Strong ecosystem and adoption',
              ]}
            />
            <ChecklistCard
              title="Why it matters for SaaS"
              items={[
                'Clear route architecture',
                'Good fit for auth and protected pages',
                'Works well with dashboards and settings',
                'Easy path from MVP to production',
              ]}
            />
          </div>

          <p>
            For PyColors, this matters because the product surface
            maps naturally to SaaS routes like dashboard, billing,
            settings, and admin — which makes the transition from a
            mocked UI baseline to a real product much smoother.
          </p>
        </Section>

        <Section
          id="product-surface"
          title="1. Define the core SaaS product surface"
          description="Before backend complexity, define what users actually interact with."
        >
          <p>
            Most SaaS products share the same key screens and flows.
            Before you think about infrastructure, define the product
            surface your users expect on day one.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Core surfaces"
              items={[
                'Login / register / forgot password',
                'Dashboard overview',
                'Main entity list and CRUD',
                'Settings and account management',
              ]}
            />
            <ChecklistCard
              title="Business-critical surfaces"
              items={[
                'Billing and subscription pages',
                'Team and organization management',
                'Role / permission surfaces',
                'Upgrade and empty states',
              ]}
            />
          </div>

          <p>
            These are not optional extras. They are the interfaces
            that make a SaaS feel credible and complete. A product
            that only has a dashboard and no settings, billing, or
            account flows usually feels unfinished.
          </p>
        </Section>

        <Section
          id="architecture"
          title="2. Choose the right frontend architecture"
          description="A clear route structure makes the product easier to evolve."
        >
          <p>
            With Next.js App Router, you can structure the product
            around routes that map directly to user-facing product
            surfaces.
          </p>

          <Card className="p-4">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`app/
  login/
  register/
  dashboard/
  projects/
  billing/
  settings/
  admin/`}</pre>
          </Card>

          <p>
            This structure keeps the product understandable as it
            grows, especially when features, data, and permissions
            become more complex.
          </p>

          <p>
            It also makes collaboration easier. Teams can reason about
            the product as a set of surfaces instead of as a pile of
            disconnected pages and components.
          </p>
        </Section>

        <Section
          id="authentication"
          title="3. Implement authentication"
          description="Authentication is the entry point of every SaaS."
        >
          <p>
            A professional SaaS typically needs more than a single
            login form. It needs a complete auth experience and a
            coherent route protection strategy.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flow</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Login</TableCell>
                <TableCell>
                  Main entry point for returning users
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Register
                </TableCell>
                <TableCell>
                  First conversion point for new users
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Password reset
                </TableCell>
                <TableCell>
                  Essential trust and recovery flow
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">OAuth</TableCell>
                <TableCell>
                  Reduces friction for fast onboarding
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Authentication should also define session handling and
            route protection for the rest of the product. This is one
            of the biggest reasons teams eventually need a stronger
            upgrade path than a purely mocked starter.
          </p>
        </Section>

        <Section
          id="billing"
          title="4. Add billing and subscriptions"
          description="Billing is where the product becomes a business."
        >
          <p>
            If your SaaS charges users, billing is not a small
            feature. It is part of the product itself.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Common billing surfaces"
              items={[
                'Plan selection',
                'Upgrade / downgrade',
                'Usage metrics',
                'Invoice history',
              ]}
            />
            <ChecklistCard
              title="Business-critical wiring"
              items={[
                'Checkout flow',
                'Subscription state',
                'Portal access',
                'Webhook handling',
              ]}
            />
          </div>

          <p>
            Stripe is the most common billing platform for SaaS
            startups and developer products, but the UX still needs to
            be designed carefully. Billing should feel integrated into
            the product, not bolted on as an afterthought.
          </p>
        </Section>

        <Section
          id="dashboard"
          title="5. Build the dashboard experience"
          description="The dashboard is often the first post-login impression."
        >
          <p>
            A good SaaS dashboard helps users understand where they
            are, what matters now, and what to do next.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Block</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  KPI cards
                </TableCell>
                <TableCell>Show key signals at a glance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Recent activity
                </TableCell>
                <TableCell>
                  Adds context and product credibility
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Quick actions
                </TableCell>
                <TableCell>
                  Reduce time to first useful action
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Empty states
                </TableCell>
                <TableCell>
                  Guide users when no data exists yet
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This is why so many modern SaaS products start by
            polishing the dashboard before deep backend complexity.
            The dashboard is where product credibility is often won or
            lost.
          </p>
        </Section>

        <Section
          id="organizations"
          title="6. Add team and organization systems"
          description="Team systems turn a solo app into a B2B-capable product."
        >
          <p>
            Many SaaS products eventually support multiple users
            inside one organization. Even if you start simple, it
            helps to anticipate this structure early.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Team system basics"
              items={[
                'Invite members',
                'Assign roles',
                'Manage membership state',
                'Handle owner vs member views',
              ]}
            />
            <ChecklistCard
              title="Scale considerations"
              items={[
                'Organization switching',
                'Permission patterns',
                'Billing per seat',
                'Audit and admin surfaces',
              ]}
            />
          </div>

          <p>
            This is especially important for B2B SaaS. A product that
            cannot model teams, permissions, and organizations will
            hit its ceiling quickly once real customers arrive.
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title="Common mistakes when building a SaaS"
          description="Most teams do not fail on features. They fail on structure, sequencing, and product credibility."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Typical mistakes"
              items={[
                'Starting backend complexity too early',
                'No clear dashboard structure',
                'Billing added too late',
                'Weak settings and account UX',
              ]}
            />
            <ChecklistCard
              title="Better approach"
              items={[
                'Define the product surface first',
                'Use production-shaped routes early',
                'Design auth and billing from the start',
                'Keep a clean upgrade path for real wiring',
              ]}
            />
          </div>

          <p>
            Many teams spend weeks on backend detail while the product
            still has unclear screens and weak user flows. In
            practice, a better sequencing strategy usually creates
            more momentum and less rework.
          </p>
        </Section>

        <Section
          id="build-order"
          title="Recommended build order"
          description="A practical order helps reduce rework and keeps momentum high."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phase</TableHead>
                <TableHead>Focus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Phase 1</TableCell>
                <TableCell>
                  Auth UX, dashboard, core entity, settings
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 2</TableCell>
                <TableCell>
                  Billing surface, team management, empty states
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 3</TableCell>
                <TableCell>
                  Authentication provider, sessions, route protection
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 4</TableCell>
                <TableCell>
                  Stripe billing, backend contracts, production setup
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This sequence is one of the reasons a production-shaped
            starter is so useful. It lets you validate the product
            surface before the business layer becomes the bottleneck.
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>Mental model to keep</AlertTitle>
            <AlertDescription>
              Build the product surface first. Then wire
              authentication, billing, and backend foundations once
              the UX is stable. This is the fastest path to a real
              SaaS with less rework.
            </AlertDescription>
          </Alert>
        </section>

        <section
          id="next-steps"
          className="scroll-mt-28 border-t border-border/60 py-8 sm:py-10"
        >
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Build your SaaS faster with PyColors
                </h2>
                <p className="text-sm text-muted-foreground">
                  Starter Free gives you a production-shaped SaaS
                  surface now. PRO is the upgrade path when the
                  business layer needs to be wired.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/starters/free">
                    Start with Starter Free
                  </Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/upgrade">
                    Explore PRO
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </GuidePageShell>
  );
}

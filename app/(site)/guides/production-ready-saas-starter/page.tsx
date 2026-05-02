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
  title:
    'What a Production-Ready SaaS Starter Should Actually Include',
  description:
    'A practical guide to what a production-ready SaaS starter should include: auth, layout, settings, billing entry points, dashboard structure, and a coherent UI foundation.',
  alternates: {
    canonical: '/guides/production-ready-saas-starter',
  },
  openGraph: {
    title:
      'What a Production-Ready SaaS Starter Should Actually Include · PyColors',
    description:
      'A practical guide to what a production-ready SaaS starter should include: auth, layout, settings, billing entry points, dashboard structure, and a coherent UI foundation.',
    url: '/guides/production-ready-saas-starter',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'What a Production-Ready SaaS Starter Should Actually Include · PyColors',
    description:
      'A practical guide to what a production-ready SaaS starter should include: auth, layout, settings, billing entry points, dashboard structure, and a coherent UI foundation.',
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
      className="scroll-mt-28 border-t border-border-subtle py-10 sm:py-12"
    >
      <div className="mb-6 space-y-2">
        <h2 className="font-brand text-xl font-semibold tracking-tight">
          {title}
        </h2>

        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
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
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
      <div className="space-y-3">
        <div className="text-sm font-medium text-foreground">
          {title}
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'goal', label: 'The goal of a starter' },
  { id: 'auth', label: 'Authentication surfaces' },
  { id: 'layout', label: 'Application layout' },
  { id: 'dashboard', label: 'Dashboard structure' },
  { id: 'settings', label: 'Settings architecture' },
  { id: 'billing', label: 'Billing entry points' },
  { id: 'design-system', label: 'Design system foundation' },
  { id: 'backend', label: 'Minimal backend assumptions' },
  { id: 'exclude', label: 'What should not be included' },
  { id: 'mental-model', label: 'Mental model' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuideProductionReadySaaSStarterPage() {
  return (
    <GuidePageShell
      title="What a Production-Ready SaaS Starter Should Actually Include"
      description="A practical breakdown of the product surfaces and architectural foundations that make a SaaS starter genuinely useful — without unnecessary complexity."
      toc={toc}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        {
          label:
            'What a Production-Ready SaaS Starter Should Actually Include',
          href: '/guides/production-ready-saas-starter',
        },
      ]}
    >
      <div>
        <section
          id="overview"
          className="scroll-mt-28 py-10 sm:py-12"
        >
          <div className="space-y-6">
            <Alert className="rounded-[5px] border border-pro-border-subtle bg-pro-surface shadow-soft">
              <AlertTitle>Core idea</AlertTitle>
              <AlertDescription>
                A production-ready SaaS starter is not valuable
                because it includes more features. It is valuable
                because it reduces repetitive setup work and gives
                developers a credible product surface from day one.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ChecklistCard
                title="Core surfaces"
                items={[
                  'Authentication',
                  'Dashboard',
                  'Settings',
                  'Billing entry points',
                ]}
              />
              <ChecklistCard
                title="Product credibility"
                items={[
                  'Real layout structure',
                  'Consistent UI',
                  'Clear hierarchy',
                  'Useful defaults',
                ]}
              />
              <ChecklistCard
                title="Architecture"
                items={[
                  'Simple route model',
                  'Scalable composition',
                  'Minimal assumptions',
                  'Clean upgrade path',
                ]}
              />
              <ChecklistCard
                title="What to avoid"
                items={[
                  'Premature abstraction',
                  'Fake flexibility',
                  'Generic dashboards',
                  'Speculative complexity',
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              If you want the more opinionated version of this topic,
              read{' '}
              <Link
                href="/blog/why-i-stopped-overengineering-saas-starters"
                className="text-foreground underline underline-offset-4"
              >
                Why I Stopped Overengineering SaaS Starters
              </Link>
              . This guide is the structured, evergreen version.
            </p>
          </div>
        </section>

        <Section
          id="goal"
          title="The goal of a SaaS starter"
          description="A starter should help you ship faster, not simulate infinite flexibility."
        >
          <p>
            Most SaaS starters fail because they try to feel complete
            instead of trying to be useful.
          </p>

          <p>
            A strong starter should reduce the distance between
            cloning a repository and shipping a real product surface.
            That means focusing on the product areas that teams build
            again and again:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What a starter should do"
              items={[
                'Remove repetitive setup work',
                'Provide strong product defaults',
                'Offer realistic product surfaces',
                'Stay easy to extend',
              ]}
            />
            <ChecklistCard
              title="What a starter should not do"
              items={[
                'Solve every future use case',
                'Maximize configuration everywhere',
                'Add enterprise complexity too early',
                'Pretend generic UI equals product value',
              ]}
            />
          </div>

          <p>
            The best mental model is simple: a starter is a
            production-shaped foundation, not a framework for every
            possible SaaS.
          </p>
        </Section>

        <Section
          id="auth"
          title="1. Authentication surfaces"
          description="Authentication is one of the first foundations every SaaS needs."
        >
          <p>
            A production-ready starter should already account for the
            main auth flows that real products need.
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
                <TableCell className="font-medium">Sign in</TableCell>
                <TableCell>
                  Main entry point for returning users
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sign up</TableCell>
                <TableCell>
                  First conversion surface for new users
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Password reset
                </TableCell>
                <TableCell>
                  Essential recovery and trust flow
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Protected app area
                </TableCell>
                <TableCell>
                  Makes the product surface feel coherent after login
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This does not mean the starter must include every advanced
            auth edge case. It means the user-facing auth surface
            should already feel serious and complete.
          </p>

          <p>
            Related guide:{' '}
            <Link
              href="/guides/saas-auth-flows"
              className="text-foreground underline underline-offset-4"
            >
              Authentication flows for SaaS
            </Link>
          </p>
        </Section>

        <Section
          id="layout"
          title="2. Application layout"
          description="Layout is part of product structure, not just visual polish."
        >
          <p>
            A real starter should give developers a coherent layout
            system for the public site and the authenticated app.
          </p>

          <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`app/
  (marketing)/
  login/
  register/
  dashboard/
  settings/
  billing/
  ...`}</pre>
          </Card>

          <p>
            Good layout structure makes it easier to evolve the
            product without rebuilding the shell later. This matters a
            lot once settings, billing, admin, and team flows start
            expanding.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What to include"
              items={[
                'Public marketing layout',
                'Authenticated app shell',
                'Clear top-level navigation',
                'Settings-ready sub-navigation',
              ]}
            />
            <ChecklistCard
              title="What to avoid"
              items={[
                'Over-abstracted layout engines',
                'Too many shells too early',
                'Generic page wrappers everywhere',
                'Speculative enterprise navigation',
              ]}
            />
          </div>
        </Section>

        <Section
          id="dashboard"
          title="3. Dashboard structure"
          description="Dashboards should create product credibility, not fill space."
        >
          <p>
            One of the fastest ways to weaken a starter is to include
            a generic dashboard that looks polished but says nothing.
          </p>

          <p>
            A production-ready starter should include a dashboard
            structure that supports real product logic:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Useful dashboard blocks"
              items={[
                'Overview area',
                'Recent activity',
                'Quick actions',
                'Meaningful empty states',
              ]}
            />
            <ChecklistCard
              title="Weak dashboard patterns"
              items={[
                'Random KPI cards',
                'Placeholder charts with no context',
                'Fake activity feeds',
                'Visually busy but structurally empty layouts',
              ]}
            />
          </div>

          <p>
            The goal is not visual complexity. The goal is product
            clarity.
          </p>

          <p>
            Related guide:{' '}
            <Link
              href="/guides/saas-dashboard-design"
              className="text-foreground underline underline-offset-4"
            >
              SaaS dashboard design patterns
            </Link>
          </p>
        </Section>

        <Section
          id="settings"
          title="4. Settings architecture"
          description="Settings are one of the most stable and valuable surfaces in SaaS."
        >
          <p>
            Settings often look secondary, but they are one of the
            most important parts of a serious SaaS starter.
          </p>

          <p>A strong settings structure should account for:</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Core settings surfaces"
              items={['Profile', 'Account', 'Security', 'Billing']}
            />
            <ChecklistCard
              title="Why it matters"
              items={[
                'Creates long-term structure',
                'Reduces future refactors',
                'Makes the app feel complete',
                'Supports upgrade paths later',
              ]}
            />
          </div>

          <p>
            Even when the business layer is still minimal, these
            surfaces help the product feel credible much earlier.
          </p>
        </Section>

        <Section
          id="billing"
          title="5. Billing entry points"
          description="Billing is where the product starts behaving like a business."
        >
          <p>
            You do not always need a fully wired billing engine on day
            one, but you do need the right product surfaces.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Surface</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Pricing entry points
                </TableCell>
                <TableCell>Show upgrade path clearly</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Billing settings
                </TableCell>
                <TableCell>
                  Give the app a business-ready structure
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Subscription surfaces
                </TableCell>
                <TableCell>
                  Prepare for recurring revenue logic
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Trust patterns
                </TableCell>
                <TableCell>
                  Plans, invoices, state, and transparency
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This is one of the key differences between a UI demo and a
            product-shaped starter.
          </p>

          <p>
            Related guide:{' '}
            <Link
              href="/guides/saas-billing-ux"
              className="text-foreground underline underline-offset-4"
            >
              SaaS billing UX best practices
            </Link>
          </p>
        </Section>

        <Section
          id="design-system"
          title="6. Design system foundation"
          description="A starter without a coherent UI foundation slows down every future decision."
        >
          <p>
            A production-ready starter should not just include pages.
            It should include a reusable UI system that makes product
            work faster and more coherent.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Useful foundation"
              items={[
                'Buttons, cards, inputs',
                'Layout consistency',
                'Typography system',
                'Dark mode readiness',
              ]}
            />
            <ChecklistCard
              title="Why it matters"
              items={[
                'Faster iteration',
                'Cleaner composition',
                'Better consistency',
                'Lower design debt',
              ]}
            />
          </div>

          <p>
            This is where PyColors becomes more than a starter. The UI
            layer helps developers move from raw implementation to
            clearer product surfaces faster.
          </p>

          <p>
            Explore:{' '}
            <Link
              href="/ui/patterns"
              className="text-foreground underline underline-offset-4"
            >
              UI patterns
            </Link>
          </p>
        </Section>

        <Section
          id="backend"
          title="7. Minimal backend assumptions"
          description="A starter should leave room for growth without forcing unnecessary complexity."
        >
          <p>
            A good starter should support real product evolution, but
            it should not hardcode speculative complexity.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Healthy assumptions"
              items={[
                'Clear route structure',
                'Simple contracts',
                'Composable UI and product sections',
                'Upgradeable business layer',
              ]}
            />
            <ChecklistCard
              title="Bad assumptions"
              items={[
                'Microservice-style complexity too early',
                'Unused feature modules',
                'Premature domain abstraction',
                'Enterprise scaffolding with no demand',
              ]}
            />
          </div>

          <p>
            The right balance is to make future extension possible,
            without paying the cost of complexity before it is needed.
          </p>
        </Section>

        <Section
          id="exclude"
          title="What should not be included"
          description="Knowing what to remove is just as important as knowing what to keep."
        >
          <p>
            The most common mistake in SaaS starters is adding things
            that look advanced but do not create leverage.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Usually unnecessary too early"
              items={[
                'Fake enterprise modules',
                'Excessive configurability',
                'Generic dashboards',
                'Abstractions without repeated use cases',
              ]}
            />
            <ChecklistCard
              title="Better focus"
              items={[
                'Authentication surface',
                'Settings architecture',
                'Billing entry points',
                'Coherent layout and UI system',
              ]}
            />
          </div>

          <p>
            This is exactly why simplifying the starter often makes it
            more useful, not less.
          </p>

          <p>
            Related article:{' '}
            <Link
              href="/blog/why-i-stopped-overengineering-saas-starters"
              className="text-foreground underline underline-offset-4"
            >
              Why I Stopped Overengineering SaaS Starters
            </Link>
          </p>
        </Section>

        <section
          id="mental-model"
          className="scroll-mt-28 border-t border-border-subtle py-8 sm:py-10"
        >
          <Alert className="rounded-[5px] border border-pro-border-subtle bg-pro-surface shadow-soft">
            <AlertTitle>Mental model to keep</AlertTitle>
            <AlertDescription>
              If a feature does not help developers ship faster,
              improve clarity, or strengthen product structure, it
              probably does not belong in the starter yet.
            </AlertDescription>
          </Alert>
        </section>

        <section
          id="next-steps"
          className="scroll-mt-28 border-t border-border-subtle py-8 sm:py-10"
        >
          <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface p-6 shadow-medium sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Start from a stronger foundation
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Use Starter Free to begin with a production-shaped
                  SaaS surface. Upgrade when billing, auth wiring, and
                  deeper business logic become the bottleneck.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-[5px]">
                  <Link href="/starters/free">
                    Start with Starter Free
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <Link href="/starters/pro">
                    Explore Starter Pro
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

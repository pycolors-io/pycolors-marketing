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
  title: 'SaaS dashboard design patterns',
  description:
    'Learn how to design a modern SaaS dashboard: layout, information hierarchy, KPI cards, tables, activity feeds, filters, empty states, and common mistakes.',
  alternates: { canonical: '/guides/saas-dashboard-design' },
  openGraph: {
    title: 'SaaS dashboard design patterns · PyColors',
    description:
      'Learn how to design a modern SaaS dashboard: layout, information hierarchy, KPI cards, tables, activity feeds, filters, empty states, and common mistakes.',
    url: '/guides/saas-dashboard-design',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS dashboard design patterns · PyColors',
    description:
      'Learn how to design a modern SaaS dashboard: layout, information hierarchy, KPI cards, tables, activity feeds, filters, empty states, and common mistakes.',
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
  { id: 'why-dashboards-matter', label: 'Why dashboards matter' },
  { id: 'dashboard-goals', label: 'Dashboard goals' },
  { id: 'layout-structure', label: 'Layout structure' },
  { id: 'information-hierarchy', label: 'Information hierarchy' },
  { id: 'kpi-cards', label: 'KPI cards' },
  { id: 'tables-and-activity', label: 'Tables & activity' },
  { id: 'filters-and-search', label: 'Filters & search' },
  { id: 'empty-states', label: 'Empty states' },
  { id: 'common-mistakes', label: 'Common mistakes' },
  { id: 'build-order', label: 'Build order' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuideSaaSDashboardDesignPage() {
  return (
    <GuidePageShell
      title="SaaS dashboard design patterns"
      description="Learn the core patterns behind a modern SaaS dashboard — from layout and information hierarchy to KPI cards, tables, activity feeds, filters, and empty states."
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
                A SaaS dashboard should help users understand the
                current state of the product quickly, see what matters
                now, and take the next useful action with minimal
                friction.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ChecklistCard
                title="Primary role"
                items={[
                  'Summarize product state',
                  'Highlight key signals',
                  'Reduce navigation friction',
                  'Guide next actions',
                ]}
              />
              <ChecklistCard
                title="Common blocks"
                items={[
                  'KPI cards',
                  'Recent activity',
                  'Tables and lists',
                  'Quick actions',
                ]}
              />
              <ChecklistCard
                title="UX goals"
                items={[
                  'Fast comprehension',
                  'Visual clarity',
                  'Prioritized information',
                  'Strong empty states',
                ]}
              />
              <ChecklistCard
                title="PyColors path"
                items={[
                  'Study real examples',
                  'Use production-shaped patterns',
                  'Start with Starter Free',
                  'Upgrade when needed',
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              If you want to see how these dashboard patterns look in
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
          id="why-dashboards-matter"
          title="Why SaaS dashboards matter"
          description="The dashboard is often the first real product experience after login."
        >
          <p>
            In most SaaS products, the dashboard is where users decide
            whether the product feels trustworthy, useful, and
            organized. It is not just a summary page. It is the screen
            that frames the product.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What a good dashboard creates"
              items={[
                'Immediate credibility',
                'Fast product comprehension',
                'Clear status awareness',
                'A sense of momentum',
              ]}
            />
            <ChecklistCard
              title="What a weak dashboard causes"
              items={[
                'Confusion',
                'Low perceived product maturity',
                'Too much navigation',
                'Missed opportunities for action',
              ]}
            />
          </div>

          <p>
            This is why many successful SaaS products invest heavily
            in dashboard UX early. It is one of the highest-leverage
            screens in the product.
          </p>
        </Section>

        <Section
          id="dashboard-goals"
          title="Define the goal of the dashboard"
          description="Not every dashboard needs to do the same thing."
        >
          <p>
            Before designing blocks, decide what your dashboard is
            supposed to optimize for. Different products need
            different dashboard priorities.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dashboard type</TableHead>
                <TableHead>Main goal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Analytics product
                </TableCell>
                <TableCell>
                  Surface metrics, trends, and reports quickly
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Project management SaaS
                </TableCell>
                <TableCell>
                  Show active work, deadlines, and collaboration
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  AI SaaS product
                </TableCell>
                <TableCell>
                  Show usage, credits, prompts, and account state
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  B2B admin platform
                </TableCell>
                <TableCell>
                  Show organization health, members, and actions
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            A dashboard becomes much easier to design once its main
            job is explicit. Otherwise, it often turns into a crowded
            page full of weak signals.
          </p>
        </Section>

        <Section
          id="layout-structure"
          title="Use a clear layout structure"
          description="A strong dashboard usually has a predictable visual flow."
        >
          <p>
            The most common SaaS dashboard pattern is a vertical flow
            with a few high-value zones: header, KPI summary, main
            content, and recent activity or secondary context.
          </p>

          <Card className="p-4">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`Dashboard
├─ Header / context
├─ KPI cards
├─ Main content area
│  ├─ Primary table / chart / list
│  └─ Quick actions
└─ Secondary context
   ├─ Activity feed
   └─ Empty states / guidance`}</pre>
          </Card>

          <p>
            This kind of structure works because it mirrors how users
            scan: first the context, then the signals, then the place
            where they can act.
          </p>
        </Section>

        <Section
          id="information-hierarchy"
          title="Create a strong information hierarchy"
          description="The dashboard should make importance visually obvious."
        >
          <p>
            Dashboard design is mostly about deciding what deserves
            the most visual weight. If everything feels equally
            important, the page feels noisy and users do not know
            where to focus.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="High-priority content"
              items={[
                'Current account or organization context',
                'Core product KPIs',
                'Critical alerts or blockers',
                'Main table, chart, or list',
              ]}
            />
            <ChecklistCard
              title="Secondary content"
              items={[
                'Activity feed',
                'Tips and guidance',
                'Secondary actions',
                'Less important status blocks',
              ]}
            />
          </div>

          <p>
            Good hierarchy often matters more than visual decoration.
            A simple dashboard with strong prioritization will
            outperform a beautiful but noisy one.
          </p>
        </Section>

        <Section
          id="kpi-cards"
          title="Design KPI cards carefully"
          description="KPI cards are one of the most common dashboard building blocks."
        >
          <p>
            KPI cards work best when they show a signal that is
            useful, current, and easy to compare. They should help
            users understand the product state quickly, not just
            decorate the screen.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Good KPI card traits</TableHead>
                <TableHead>Weak KPI card traits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Clear label and value</TableCell>
                <TableCell>Vague title or no context</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Supports a decision or action</TableCell>
                <TableCell>
                  Looks impressive but changes nothing
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Easy to scan and compare</TableCell>
                <TableCell>
                  Too much detail inside a small card
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Consistent formatting</TableCell>
                <TableCell>Inconsistent units and styles</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            A few useful KPI cards are stronger than a wall of
            mediocre numbers. Most SaaS dashboards improve when the
            number of KPI cards is reduced and their quality
            increases.
          </p>
        </Section>

        <Section
          id="tables-and-activity"
          title="Use tables, lists, and activity feeds with intent"
          description="Not all dashboard content should be cards."
        >
          <p>
            Tables and activity feeds often carry the real operational
            value of the dashboard. KPI cards create quick awareness,
            but tables and lists usually support the actual work.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Great uses for tables"
              items={[
                'Projects or resources overview',
                'Recent invoices or transactions',
                'Team member lists',
                'Moderation or admin work queues',
              ]}
            />
            <ChecklistCard
              title="Great uses for activity feeds"
              items={[
                'Recent system events',
                'User actions',
                'Alerts and notifications',
                'Context around ongoing work',
              ]}
            />
          </div>

          <p>
            The key is to avoid turning the dashboard into a duplicate
            of a full data page. The dashboard should surface just
            enough detail to support the next action.
          </p>
        </Section>

        <Section
          id="filters-and-search"
          title="Add filters and search only when they reduce friction"
          description="Controls should simplify the experience, not overwhelm it."
        >
          <p>
            Filters and search are useful when the dashboard helps
            users inspect a changing dataset. They are harmful when
            they clutter the layout before users even understand the
            page.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Use filters when"
              items={[
                'Users need multiple views of the same data',
                'The table or chart is central to the workflow',
                'Time ranges matter',
                'Comparisons are useful',
              ]}
            />
            <ChecklistCard
              title="Avoid overloading when"
              items={[
                'The dashboard is mostly high-level',
                'The page already feels dense',
                'The data set is still small',
                'A dedicated data page exists elsewhere',
              ]}
            />
          </div>

          <p>
            A dashboard should feel light enough to scan quickly. If
            advanced filtering is essential, it may belong on a
            dedicated page rather than in the landing dashboard.
          </p>
        </Section>

        <Section
          id="empty-states"
          title="Design empty states as part of the dashboard"
          description="A great dashboard still works when no data exists yet."
        >
          <p>
            Many SaaS products fail here. The dashboard looks decent
            with mock data, but once a real new user signs in, the
            page becomes empty, awkward, or confusing.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Strong empty states"
              items={[
                'Explain what is missing',
                'Suggest the next action',
                'Keep the page visually balanced',
                'Reduce first-use anxiety',
              ]}
            />
            <ChecklistCard
              title="Weak empty states"
              items={[
                'Blank cards and empty tables',
                'No obvious next step',
                'Unclear labels',
                'Too much placeholder noise',
              ]}
            />
          </div>

          <p>
            Good empty states are part of dashboard design, not an
            afterthought. They are especially important for onboarding
            and trial conversion.
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title="Common mistakes in SaaS dashboard design"
          description="Most dashboard problems come from priority mistakes, not missing features."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Typical mistakes"
              items={[
                'Too many KPI cards',
                'No clear primary action',
                'Crowded layouts with weak hierarchy',
                'Tables that belong on another page',
              ]}
            />
            <ChecklistCard
              title="Better approach"
              items={[
                'Prioritize a few key signals',
                'Make next actions obvious',
                'Use hierarchy to guide scanning',
                'Keep detailed workflows on dedicated pages',
              ]}
            />
          </div>

          <p>
            A dashboard should not try to do everything. It should
            help users understand the product state, not replace the
            rest of the application.
          </p>
        </Section>

        <Section
          id="build-order"
          title="Recommended build order for dashboard UI"
          description="A practical order keeps the dashboard useful early and extensible later."
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
                  Header, page context, and primary action
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 2</TableCell>
                <TableCell>
                  KPI cards and one main table or chart
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 3</TableCell>
                <TableCell>
                  Activity feed, secondary actions, and alerts
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 4</TableCell>
                <TableCell>
                  Filters, search, and stronger empty states
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This sequence makes it easier to ship a dashboard that
            already feels credible before the entire product is fully
            wired.
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>Mental model to keep</AlertTitle>
            <AlertDescription>
              A great SaaS dashboard does not show everything. It
              shows the right signals, provides the right context, and
              makes the next useful action easy to take.
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
                  Build your dashboard faster with PyColors
                </h2>
                <p className="text-sm text-muted-foreground">
                  Starter Free gives you a production-shaped dashboard
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

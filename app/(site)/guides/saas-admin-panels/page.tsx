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
  title: 'Admin panels for SaaS products',
  description:
    'Learn how to design admin panels for SaaS products: moderation tools, roles, permissions, audit logs, operational workflows, and common admin UX mistakes.',
  alternates: { canonical: '/guides/saas-admin-panels' },
  openGraph: {
    title: 'Admin panels for SaaS products · PyColors',
    description:
      'Learn how to design admin panels for SaaS products: moderation tools, roles, permissions, audit logs, operational workflows, and common admin UX mistakes.',
    url: '/guides/saas-admin-panels',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin panels for SaaS products · PyColors',
    description:
      'Learn how to design admin panels for SaaS products: moderation tools, roles, permissions, audit logs, operational workflows, and common admin UX mistakes.',
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
  { id: 'why-admin-panels-matter', label: 'Why admin panels matter' },
  { id: 'core-admin-jobs', label: 'Core admin jobs' },
  { id: 'layout-and-hierarchy', label: 'Layout & hierarchy' },
  { id: 'tables-and-queues', label: 'Tables & queues' },
  { id: 'moderation-actions', label: 'Moderation actions' },
  { id: 'roles-and-permissions', label: 'Roles & permissions' },
  { id: 'audit-logs', label: 'Audit logs' },
  { id: 'destructive-actions', label: 'Destructive actions' },
  { id: 'common-mistakes', label: 'Common mistakes' },
  { id: 'build-order', label: 'Build order' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuideSaaSAdminPanelsPage() {
  return (
    <GuidePageShell
      title="Admin panels for SaaS products"
      description="Learn the core UX and product patterns behind admin panels in SaaS — from moderation tools and operational queues to roles, permissions, audit logs, and destructive actions."
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
                An admin panel is not just a back office screen. In
                SaaS, it is an operational system for support,
                moderation, permissions, and product safety.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ChecklistCard
                title="Core surfaces"
                items={[
                  'Operational tables',
                  'Moderation actions',
                  'Permissions',
                  'Audit logs',
                ]}
              />
              <ChecklistCard
                title="Business goals"
                items={[
                  'Support operations',
                  'Reduce risk',
                  'Protect product integrity',
                  'Handle exceptions safely',
                ]}
              />
              <ChecklistCard
                title="System concerns"
                items={[
                  'Access control',
                  'Action history',
                  'Safe destructive actions',
                  'Escalation workflows',
                ]}
              />
              <ChecklistCard
                title="PyColors path"
                items={[
                  'Start with Free',
                  'Validate admin UX',
                  'Upgrade for real wiring',
                  'Scale safely',
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              If you want to see how admin surfaces fit into a real
              SaaS product, explore the{' '}
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
          id="why-admin-panels-matter"
          title="Why admin panels matter in SaaS"
          description="Operations, moderation, and support need a product surface too."
        >
          <p>
            Many SaaS teams focus on the customer-facing product
            first, but once users, billing events, invitations,
            permissions, and edge cases start to grow, the team itself
            needs a reliable operational interface.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What strong admin panels create"
              items={[
                'Faster support workflows',
                'Clear moderation processes',
                'Safer product operations',
                'Better trust inside the team',
              ]}
            />
            <ChecklistCard
              title="What weak admin panels cause"
              items={[
                'Manual support chaos',
                'Permission mistakes',
                'Poor visibility on actions',
                'Higher operational risk',
              ]}
            />
          </div>

          <p>
            Admin UX is often invisible to customers, but it still
            influences product quality, team speed, and operational
            trust.
          </p>
        </Section>

        <Section
          id="core-admin-jobs"
          title="Define the core jobs of the admin panel"
          description="Admin panels should support specific operational workflows, not generic complexity."
        >
          <p>
            Before designing the UI, define what administrators
            actually need to do. Most SaaS admin panels revolve around
            a small set of recurring operational jobs.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin job</TableHead>
                <TableHead>Main purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  User management
                </TableCell>
                <TableCell>
                  Inspect, support, suspend, or restore accounts
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Content moderation
                </TableCell>
                <TableCell>
                  Review flagged entities and take action safely
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Operational support
                </TableCell>
                <TableCell>
                  Resolve exceptions and edge-case account states
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Permission control
                </TableCell>
                <TableCell>
                  Manage who can access what inside the system
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            A good admin panel feels focused because it is built
            around real operational jobs instead of generic “admin”
            features.
          </p>
        </Section>

        <Section
          id="layout-and-hierarchy"
          title="Use strong layout and hierarchy in admin screens"
          description="Admin interfaces should prioritize clarity, traceability, and confidence."
        >
          <p>
            Admin panels are often denser than customer-facing
            screens, but they still need strong hierarchy. The user
            should always know what the current entity is, what its
            state is, and what actions are safe to take next.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Useful admin layout zones"
              items={[
                'Entity header and current state',
                'Primary table or queue',
                'Detail panel or side sheet',
                'Action history or audit context',
              ]}
            />
            <ChecklistCard
              title="Why hierarchy matters"
              items={[
                'Reduces action mistakes',
                'Improves scanning under pressure',
                'Makes moderation faster',
                'Improves operational trust',
              ]}
            />
          </div>

          <p>
            An admin panel does not need to look minimal. It needs to
            feel organized under operational load.
          </p>
        </Section>

        <Section
          id="tables-and-queues"
          title="Design tables and queues for operational work"
          description="Admin panels often revolve around lists, tables, and review queues."
        >
          <p>
            In most SaaS admin systems, the main work happens inside a
            queue: users to review, invoices to inspect, flags to
            resolve, invitations to track, or support cases to handle.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Useful admin table traits</TableHead>
                <TableHead>Weak admin table traits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Strong status visibility</TableCell>
                <TableCell>Hidden or ambiguous states</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Filters that support workflows</TableCell>
                <TableCell>Filters added without real need</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Clear action entrypoints</TableCell>
                <TableCell>
                  Important actions buried in menus
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stable row hierarchy</TableCell>
                <TableCell>Dense, hard-to-scan layouts</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Admin tables should help operators decide quickly and act
            safely. Their job is operational clarity, not visual
            flair.
          </p>
        </Section>

        <Section
          id="moderation-actions"
          title="Treat moderation actions as high-risk UX"
          description="Suspend, delete, block, approve, and restore actions need more care than standard CRUD."
        >
          <p>
            Moderation actions are different from ordinary editing
            actions. They often change visibility, access, or product
            state in ways that affect users directly.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Strong moderation UX"
              items={[
                'Clear current status',
                'Action consequences explained',
                'Confirmation for high-impact actions',
                'Context before committing changes',
              ]}
            />
            <ChecklistCard
              title="Weak moderation UX"
              items={[
                'Ambiguous labels',
                'No consequence explanation',
                'No recovery path',
                'Actions too easy to trigger accidentally',
              ]}
            />
          </div>

          <p>
            Admin actions should feel deliberate. In moderation flows,
            the UI should reduce operator mistakes, not merely expose
            the available actions.
          </p>
        </Section>

        <Section
          id="roles-and-permissions"
          title="Connect admin panels to roles and permissions"
          description="Admin access should be controlled and meaningful."
        >
          <p>
            Not every operator should see the same panel or the same
            actions. Admin panels should respect role boundaries just
            as carefully as the rest of the product.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Good permission-aware admin UX"
              items={[
                'Restricted actions by role',
                'Clear ownership boundaries',
                'Visible but safe limits',
                'Consistent system behavior',
              ]}
            />
            <ChecklistCard
              title="Weak permission UX"
              items={[
                'Every admin sees everything',
                'Roles with no real effect',
                'Hidden failures after clicks',
                'Unclear action availability',
              ]}
            />
          </div>

          <p>
            Permissions should be visible in behavior, not just in a
            role label somewhere else in the system.
          </p>
        </Section>

        <Section
          id="audit-logs"
          title="Use audit logs to create operational trust"
          description="If actions matter, the system should record them clearly."
        >
          <p>
            Audit logs are one of the most important trust layers in
            an admin system. They help teams understand what happened,
            who acted, and when a sensitive state changed.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit log signal</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Actor</TableCell>
                <TableCell>
                  Identifies who performed the action
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Action</TableCell>
                <TableCell>
                  Shows what changed in the system
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Timestamp
                </TableCell>
                <TableCell>
                  Gives operational sequence and context
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Entity</TableCell>
                <TableCell>
                  Connects the action to the affected object
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Logs do not need to be flashy. They need to be reliable,
            readable, and useful during support or incident review.
          </p>
        </Section>

        <Section
          id="destructive-actions"
          title="Design destructive actions with extra care"
          description="Delete, revoke, suspend, and block actions should feel safe and intentional."
        >
          <p>
            Destructive actions are among the most dangerous
            interactions in an admin panel. They should be visually
            distinct, context-aware, and supported by confirmation
            patterns when necessary.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Good destructive-action UX"
              items={[
                'Clear visual distinction',
                'Action consequence explained',
                'Confirmation when needed',
                'Reversible path when possible',
              ]}
            />
            <ChecklistCard
              title="Common destructive-action mistakes"
              items={[
                'Weak or generic labels',
                'No explanation of impact',
                'No status update after action',
                'Too many dangerous actions grouped together',
              ]}
            />
          </div>

          <p>
            These patterns are especially important when multiple
            admins or support operators are working quickly under
            pressure.
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title="Common mistakes in SaaS admin panels"
          description="Most admin UX problems come from weak operational thinking, not a lack of features."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Typical mistakes"
              items={[
                'Treating admin as generic CRUD',
                'Weak status visibility',
                'No meaningful audit trail',
                'Overloading the interface with low-value controls',
              ]}
            />
            <ChecklistCard
              title="Better approach"
              items={[
                'Design around real admin jobs',
                'Prioritize operational clarity',
                'Separate safe and dangerous actions',
                'Use logs and permissions as trust layers',
              ]}
            />
          </div>

          <p>
            A good admin panel feels reliable because it reflects the
            real work operators need to do, with the right amount of
            context and guardrails.
          </p>
        </Section>

        <Section
          id="build-order"
          title="Recommended build order for admin panels"
          description="A practical order helps teams ship admin UX without turning it into an unstructured control surface."
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
                  Primary table or queue with clear status columns
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 2</TableCell>
                <TableCell>
                  Entity detail view and safe operational actions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 3</TableCell>
                <TableCell>
                  Roles, permissions, and guarded destructive actions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 4</TableCell>
                <TableCell>
                  Audit logs, escalation flows, and real backend
                  wiring
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This sequence helps teams validate the operational surface
            first, then introduce the deeper control and traceability
            layers later.
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>Mental model to keep</AlertTitle>
            <AlertDescription>
              A strong admin panel is an operational product inside
              the product. It should help the team act confidently,
              reduce mistakes, and preserve trust when handling
              sensitive workflows.
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
                  Build your admin panel faster with PyColors
                </h2>
                <p className="text-sm text-muted-foreground">
                  Starter Free gives you a production-shaped admin
                  surface now. PRO is the upgrade path when
                  permissions, moderation flows, and real operational
                  wiring need to be handled.
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

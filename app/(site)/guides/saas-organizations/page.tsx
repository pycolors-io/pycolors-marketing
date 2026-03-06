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
  title: 'Team & organization systems for SaaS',
  description:
    'Learn how to design team and organization systems for SaaS: members, roles, invitations, org switching, permissions, seat billing, and common UX mistakes.',
  alternates: { canonical: '/guides/saas-organizations' },
  openGraph: {
    title: 'Team & organization systems for SaaS · PyColors',
    description:
      'Learn how to design team and organization systems for SaaS: members, roles, invitations, org switching, permissions, seat billing, and common UX mistakes.',
    url: '/guides/saas-organizations',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team & organization systems for SaaS · PyColors',
    description:
      'Learn how to design team and organization systems for SaaS: members, roles, invitations, org switching, permissions, seat billing, and common UX mistakes.',
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
  { id: 'why-org-systems-matter', label: 'Why org systems matter' },
  { id: 'core-model', label: 'Core model' },
  { id: 'members-and-roles', label: 'Members & roles' },
  { id: 'invitations', label: 'Invitations' },
  { id: 'org-switching', label: 'Org switching' },
  { id: 'permissions', label: 'Permissions' },
  { id: 'seat-billing', label: 'Seat billing' },
  { id: 'common-mistakes', label: 'Common mistakes' },
  { id: 'build-order', label: 'Build order' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuideSaaSOrganizationsPage() {
  return (
    <GuidePageShell
      title="Team & organization systems for SaaS"
      description="Learn the core UX and product patterns behind team and organization systems in SaaS — from members, roles, and invitations to org switching, permissions, and seat billing."
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
                Team and organization systems turn a solo product into
                a B2B-capable SaaS. They define who belongs where, who
                can do what, and how collaboration actually works
                inside the product.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ChecklistCard
                title="Core surfaces"
                items={[
                  'Members',
                  'Roles',
                  'Invitations',
                  'Organization settings',
                ]}
              />
              <ChecklistCard
                title="Business goals"
                items={[
                  'Support collaboration',
                  'Enable B2B accounts',
                  'Clarify ownership',
                  'Scale account structure',
                ]}
              />
              <ChecklistCard
                title="System concerns"
                items={[
                  'Permissions',
                  'Org switching',
                  'Seat billing',
                  'Account boundaries',
                ]}
              />
              <ChecklistCard
                title="PyColors path"
                items={[
                  'Start with Free',
                  'Validate the team UX',
                  'Upgrade for real wiring',
                  'Scale safely',
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              If you want to see how team systems fit into a real SaaS
              surface, explore the{' '}
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
          id="why-org-systems-matter"
          title="Why team and organization systems matter"
          description="B2B SaaS products quickly outgrow a single-user account model."
        >
          <p>
            Many SaaS products start with one user and one account,
            but real teams need a structure that can represent
            ownership, collaboration, permissions, and billing
            boundaries.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What strong org systems create"
              items={[
                'Clear collaboration model',
                'Better B2B credibility',
                'Cleaner account boundaries',
                'A path to multi-user growth',
              ]}
            />
            <ChecklistCard
              title="What weak org systems cause"
              items={[
                'Confusion around ownership',
                'Permission conflicts',
                'Messy invite flows',
                'A ceiling on real customer usage',
              ]}
            />
          </div>

          <p>
            Team systems are not just an admin feature. They are part
            of the core product model for many serious SaaS
            businesses.
          </p>
        </Section>

        <Section
          id="core-model"
          title="Define the core organization model first"
          description="The product needs a clear mental model before the UI becomes coherent."
        >
          <p>
            Before building screens, define how your product thinks
            about users, organizations, memberships, and ownership.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Main role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">User</TableCell>
                <TableCell>
                  Individual identity across the product
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Organization
                </TableCell>
                <TableCell>
                  Shared workspace or account boundary
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Membership
                </TableCell>
                <TableCell>
                  Relationship between user and organization
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Role</TableCell>
                <TableCell>
                  Permission level inside the organization
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            If this model is unclear, the UI usually becomes confusing
            too. Good team UX starts with a clear account structure.
          </p>
        </Section>

        <Section
          id="members-and-roles"
          title="Make members and roles easy to understand"
          description="Users should immediately understand who belongs to the organization and what each person can do."
        >
          <p>
            The members screen is one of the clearest trust surfaces
            in a B2B SaaS product. It should make the team structure
            feel controlled and transparent.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Strong members UX"
              items={[
                'Clear member list',
                'Visible role labels',
                'Obvious ownership state',
                'Simple management actions',
              ]}
            />
            <ChecklistCard
              title="Weak members UX"
              items={[
                'Ambiguous roles',
                'No ownership clarity',
                'Too many hidden actions',
                'Unclear status for invited users',
              ]}
            />
          </div>

          <p>
            Role labels should mean something concrete. “Owner,”
            “Admin,” and “Member” should feel distinct in both
            language and behavior.
          </p>
        </Section>

        <Section
          id="invitations"
          title="Treat invitations as a first-class flow"
          description="Invitations are a growth mechanic and a trust flow at the same time."
        >
          <p>
            Inviting teammates is often the moment a single-user
            account becomes a real team workspace. That means the
            invitation UX should feel smooth and dependable.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Good invitation UX"
              items={[
                'Simple invite input',
                'Role selected clearly',
                'Visible invitation status',
                'Easy resend or revoke paths',
              ]}
            />
            <ChecklistCard
              title="Common invite problems"
              items={[
                'No status visibility',
                'Unclear role on invite',
                'No recovery path',
                'Too much friction for simple invites',
              ]}
            />
          </div>

          <p>
            Invitations should not feel like backend administration.
            They should feel like a natural product action that
            expands the team.
          </p>
        </Section>

        <Section
          id="org-switching"
          title="Handle organization switching carefully"
          description="Multi-org UX can become confusing quickly if the current context is not obvious."
        >
          <p>
            When a user belongs to multiple organizations, the product
            needs a clear way to indicate the current workspace and
            make switching safe and understandable.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>UX need</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Current org visibility
                </TableCell>
                <TableCell>Prevents context confusion</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Safe switching flow
                </TableCell>
                <TableCell>
                  Reduces accidental actions in the wrong org
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Consistent layout behavior
                </TableCell>
                <TableCell>Keeps navigation predictable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Clear empty and loading states
                </TableCell>
                <TableCell>
                  Avoids disorientation after switch
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Org switching is not only a dropdown problem. It affects
            navigation, permissions, billing visibility, and user
            trust.
          </p>
        </Section>

        <Section
          id="permissions"
          title="Design permissions as product behavior, not just labels"
          description="Roles should change what users can actually do and see."
        >
          <p>
            Permissions become meaningful when they shape the real
            product experience. A role system that exists only in the
            members table but not in product behavior feels fake.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Useful permission outcomes"
              items={[
                'Restricted actions',
                'Different admin surfaces',
                'Protected settings',
                'Clear ownership boundaries',
              ]}
            />
            <ChecklistCard
              title="Weak permission systems"
              items={[
                'Roles with no visible impact',
                'Inconsistent access control',
                'Confusing hidden actions',
                'No explanation of limits',
              ]}
            />
          </div>

          <p>
            Good permission design connects role labels, available
            actions, and product feedback in a consistent way.
          </p>
        </Section>

        <Section
          id="seat-billing"
          title="Connect team systems with seat billing carefully"
          description="Seats, members, and subscription state often influence one another."
        >
          <p>
            In many B2B SaaS products, adding members changes cost.
            That means team UX and billing UX cannot be designed in
            isolation.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Important seat-billing signals"
              items={[
                'Current seat count',
                'Seat limit or plan implications',
                'Next billing effect',
                'Clear add-member expectations',
              ]}
            />
            <ChecklistCard
              title="Common seat-billing issues"
              items={[
                'Hidden cost implications',
                'No seat context in invite flow',
                'Weak billing-state visibility',
                'Confusion around active vs invited users',
              ]}
            />
          </div>

          <p>
            If adding teammates affects billing, users should
            understand that before the action feels irreversible.
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title="Common mistakes in team and organization systems"
          description="Most problems come from unclear product models and weak trust signals."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Typical mistakes"
              items={[
                'No clear ownership model',
                'Roles without product impact',
                'Weak invite-state visibility',
                'Confusing organization switching',
              ]}
            />
            <ChecklistCard
              title="Better approach"
              items={[
                'Define the account model early',
                'Keep role labels meaningful',
                'Make membership states visible',
                'Connect team UX to billing and permissions',
              ]}
            />
          </div>

          <p>
            Team systems often fail when they are treated as a thin
            admin layer instead of as a real product system with
            multiple user states and business implications.
          </p>
        </Section>

        <Section
          id="build-order"
          title="Recommended build order for team systems"
          description="A practical sequence helps teams ship collaboration UX without unnecessary complexity."
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
                  Members list, ownership, and basic roles
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 2</TableCell>
                <TableCell>
                  Invitation flow and status states
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 3</TableCell>
                <TableCell>
                  Permissions and protected admin actions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 4</TableCell>
                <TableCell>
                  Org switching, seat billing, and real backend wiring
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This order helps teams validate the collaboration surface
            first, then wire the more sensitive account and permission
            logic later.
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>Mental model to keep</AlertTitle>
            <AlertDescription>
              Team and organization systems are not just account
              utilities. They define collaboration, permissions,
              billing boundaries, and product trust for real B2B SaaS
              usage.
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
                  Build your team systems faster with PyColors
                </h2>
                <p className="text-sm text-muted-foreground">
                  Starter Free gives you a production-shaped members
                  and admin surface now. PRO is the upgrade path when
                  permissions, organizations, and real account wiring
                  need to be handled.
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

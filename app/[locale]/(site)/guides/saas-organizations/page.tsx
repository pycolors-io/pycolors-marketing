import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";

import { GuidePageShell } from "@/components/guides/guide-page-shell";
import {
  GuideSection as Section,
  GuideCallout as Alert,
  GuideCalloutTitle as AlertTitle,
  GuideCalloutDescription as AlertDescription,
  GuideNextSteps,
  GuideChecklistCard as ChecklistCard,
} from "@/components/guides/guide-content";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pycolors/ui";

const metadata: Metadata = {
  title: "Team & Organization Architecture for SaaS Applications",
  description:
    "Learn how modern SaaS team and organization systems are designed across memberships, roles, invitations, permissions, organization switching, seat billing, and production-ready collaboration UX.",
  alternates: {
    canonical: "/guides/saas-organizations",
  },

  openGraph: {
    title: "Team & Organization Architecture for SaaS Applications",
    description:
      "A practical guide to SaaS organization architecture covering memberships, roles, invitations, permissions, org switching, seat billing, and production-ready collaboration systems.",
    url: "/guides/saas-organizations",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Team & Organization Architecture for SaaS Applications",
    description:
      "Learn how modern SaaS collaboration systems are designed across memberships, permissions, org switching, and seat billing.",
    images: ["/seo/twitter-main.png"],
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "why-org-systems-matter", label: "Why org systems matter" },
  { id: "core-model", label: "Core model" },
  { id: "members-and-roles", label: "Members & roles" },
  { id: "invitations", label: "Invitations" },
  { id: "org-switching", label: "Org switching" },
  { id: "permissions", label: "Permissions" },
  { id: "seat-billing", label: "Seat billing" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "build-order", label: "Build order" },
  { id: "next-steps", label: "Next steps" },
];

export default function GuideSaaSOrganizationsPage() {
  const tSite = useCopy();

  return (
    <GuidePageShell
      title={tSite("Team & organization systems for SaaS")}
      description={tSite(
        "Learn the core UX and product patterns behind team and organization systems in SaaS — from members, roles, and invitations to org switching, permissions, and seat billing.",
      )}
      toc={toc}
      tags={["Next.js", "B2B"]}
      documentation={{
        title: "Workspace members block",
        href: "/docs/blocks/account/workspace-members",
      }}
      relatedGuides={[
        {
          title: "Authentication flows for SaaS",
          href: "/guides/saas-auth-flows",
        },
        {
          title: "Admin panels for SaaS products",
          href: "/guides/saas-admin-panels",
        },
      ]}
    >
      <div>
        <section id="overview" className="scroll-mt-28 py-10 sm:py-12">
          <div className="space-y-6">
            <Alert>
              <AlertTitle>{tSite("Core idea")}</AlertTitle>
              <AlertDescription>
                {tSite(
                  "Team and organization systems turn a solo product into a B2B-capable SaaS. They define who belongs where, who can do what, and how collaboration actually works inside the product.",
                )}
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2">
              <ChecklistCard
                title={tSite("Core surfaces")}
                items={[
                  "Members",
                  "Roles",
                  "Invitations",
                  "Organization settings",
                ]}
              />
              <ChecklistCard
                title={tSite("Business goals")}
                items={[
                  "Support collaboration",
                  "Enable B2B accounts",
                  "Clarify ownership",
                  "Scale account structure",
                ]}
              />
              <ChecklistCard
                title={tSite("System concerns")}
                items={[
                  "Permissions",
                  "Org switching",
                  "Seat billing",
                  "Account boundaries",
                ]}
              />
              <ChecklistCard
                title={tSite("PyColors path")}
                items={[
                  "Start with Free",
                  "Validate the team UX",
                  "Upgrade for real wiring",
                  "Scale safely",
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {tSite(
                "If you want to see how team systems fit into a real SaaS surface, explore the",
              )}
              {tSite(" ")}
              <Link
                href="/ui/examples"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("examples")}
              </Link>
              {tSite(" ")}
              {tSite("or browse the")}
              {tSite(" ")}
              <Link
                href="/ui/patterns"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("UI patterns")}
              </Link>
              {tSite(" ")}
              {tSite("before starting with")}
              {tSite(" ")}
              <Link
                href="/starters/free"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("Starter Free")}
              </Link>
              .
            </p>
          </div>
        </section>

        <Section
          id="why-org-systems-matter"
          title={tSite("Why team and organization systems matter")}
          description={tSite(
            "B2B SaaS products quickly outgrow a single-user account model.",
          )}
        >
          <p>
            {tSite(
              "Many SaaS products start with one user and one account, but real teams need a structure that can represent ownership, collaboration, permissions, and billing boundaries.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What strong org systems create")}
              items={[
                "Clear collaboration model",
                "Better B2B credibility",
                "Cleaner account boundaries",
                "A path to multi-user growth",
              ]}
            />
            <ChecklistCard
              title={tSite("What weak org systems cause")}
              items={[
                "Confusion around ownership",
                "Permission conflicts",
                "Messy invite flows",
                "A ceiling on real customer usage",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Team systems are not just an admin feature. They are part of the core product model for many serious SaaS businesses.",
            )}
          </p>
        </Section>

        <Section
          id="core-model"
          title={tSite("Define the core organization model first")}
          description={tSite(
            "The product needs a clear mental model before the UI becomes coherent.",
          )}
        >
          <p>
            {tSite(
              "Before building screens, define how your product thinks about users, organizations, memberships, and ownership.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Entity")}</TableHead>
                <TableHead>{tSite("Main role")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{tSite("User")}</TableCell>
                <TableCell>
                  {tSite("Individual identity across the product")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Organization")}
                </TableCell>
                <TableCell>
                  {tSite("Shared workspace or account boundary")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Membership")}
                </TableCell>
                <TableCell>
                  {tSite("Relationship between user and organization")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{tSite("Role")}</TableCell>
                <TableCell>
                  {tSite("Permission level inside the organization")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "If this model is unclear, the UI usually becomes confusing too. Good team UX starts with a clear account structure.",
            )}
          </p>
        </Section>

        <Section
          id="members-and-roles"
          title={tSite("Make members and roles easy to understand")}
          description={tSite(
            "Users should immediately understand who belongs to the organization and what each person can do.",
          )}
        >
          <p>
            {tSite(
              "The members screen is one of the clearest trust surfaces in a B2B SaaS product. It should make the team structure feel controlled and transparent.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Strong members UX")}
              items={[
                "Clear member list",
                "Visible role labels",
                "Obvious ownership state",
                "Simple management actions",
              ]}
            />
            <ChecklistCard
              title={tSite("Weak members UX")}
              items={[
                "Ambiguous roles",
                "No ownership clarity",
                "Too many hidden actions",
                "Unclear status for invited users",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Role labels should mean something concrete. “Owner,” “Admin,” and “Member” should feel distinct in both language and behavior.",
            )}
          </p>
        </Section>

        <Section
          id="invitations"
          title={tSite("Treat invitations as a first-class flow")}
          description={tSite(
            "Invitations are a growth mechanic and a trust flow at the same time.",
          )}
        >
          <p>
            {tSite(
              "Inviting teammates is often the moment a single-user account becomes a real team workspace. That means the invitation UX should feel smooth and dependable.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Good invitation UX")}
              items={[
                "Simple invite input",
                "Role selected clearly",
                "Visible invitation status",
                "Easy resend or revoke paths",
              ]}
            />
            <ChecklistCard
              title={tSite("Common invite problems")}
              items={[
                "No status visibility",
                "Unclear role on invite",
                "No recovery path",
                "Too much friction for simple invites",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Invitations should not feel like backend administration. They should feel like a natural product action that expands the team.",
            )}
          </p>
        </Section>

        <Section
          id="org-switching"
          title={tSite("Handle organization switching carefully")}
          description={tSite(
            "Multi-org UX can become confusing quickly if the current context is not obvious.",
          )}
        >
          <p>
            {tSite(
              "When a user belongs to multiple organizations, the product needs a clear way to indicate the current workspace and make switching safe and understandable.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("UX need")}</TableHead>
                <TableHead>{tSite("Why it matters")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Current org visibility")}
                </TableCell>
                <TableCell>{tSite("Prevents context confusion")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Safe switching flow")}
                </TableCell>
                <TableCell>
                  {tSite("Reduces accidental actions in the wrong org")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Consistent layout behavior")}
                </TableCell>
                <TableCell>{tSite("Keeps navigation predictable")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Clear empty and loading states")}
                </TableCell>
                <TableCell>
                  {tSite("Avoids disorientation after switch")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Org switching is not only a dropdown problem. It affects navigation, permissions, billing visibility, and user trust.",
            )}
          </p>
        </Section>

        <Section
          id="permissions"
          title={tSite(
            "Design permissions as product behavior, not just labels",
          )}
          description={tSite(
            "Roles should change what users can actually do and see.",
          )}
        >
          <p>
            {tSite(
              "Permissions become meaningful when they shape the real product experience. A role system that exists only in the members table but not in product behavior feels fake.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Useful permission outcomes")}
              items={[
                "Restricted actions",
                "Different admin surfaces",
                "Protected settings",
                "Clear ownership boundaries",
              ]}
            />
            <ChecklistCard
              title={tSite("Weak permission systems")}
              items={[
                "Roles with no visible impact",
                "Inconsistent access control",
                "Confusing hidden actions",
                "No explanation of limits",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Good permission design connects role labels, available actions, and product feedback in a consistent way.",
            )}
          </p>
        </Section>

        <Section
          id="seat-billing"
          title={tSite("Connect team systems with seat billing carefully")}
          description={tSite(
            "Seats, members, and subscription state often influence one another.",
          )}
        >
          <p>
            {tSite(
              "In many B2B SaaS products, adding members changes cost. That means team UX and billing UX cannot be designed in isolation.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Important seat-billing signals")}
              items={[
                "Current seat count",
                "Seat limit or plan implications",
                "Next billing effect",
                "Clear add-member expectations",
              ]}
            />
            <ChecklistCard
              title={tSite("Common seat-billing issues")}
              items={[
                "Hidden cost implications",
                "No seat context in invite flow",
                "Weak billing-state visibility",
                "Confusion around active vs invited users",
              ]}
            />
          </div>

          <p>
            {tSite(
              "If adding teammates affects billing, users should understand that before the action feels irreversible.",
            )}
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title={tSite("Common mistakes in team and organization systems")}
          description={tSite(
            "Most problems come from unclear product models and weak trust signals.",
          )}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Typical mistakes")}
              items={[
                "No clear ownership model",
                "Roles without product impact",
                "Weak invite-state visibility",
                "Confusing organization switching",
              ]}
            />
            <ChecklistCard
              title={tSite("Better approach")}
              items={[
                "Define the account model early",
                "Keep role labels meaningful",
                "Make membership states visible",
                "Connect team UX to billing and permissions",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Team systems often fail when they are treated as a thin admin layer instead of as a real product system with multiple user states and business implications.",
            )}
          </p>
        </Section>

        <Section
          id="build-order"
          title={tSite("Recommended build order for team systems")}
          description={tSite(
            "A practical sequence helps teams ship collaboration UX without unnecessary complexity.",
          )}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Phase")}</TableHead>
                <TableHead>{tSite("Focus")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 1")}
                </TableCell>
                <TableCell>
                  {tSite("Members list, ownership, and basic roles")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 2")}
                </TableCell>
                <TableCell>
                  {tSite("Invitation flow and status states")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 3")}
                </TableCell>
                <TableCell>
                  {tSite("Permissions and protected admin actions")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 4")}
                </TableCell>
                <TableCell>
                  {tSite(
                    "Org switching, seat billing, and real backend wiring",
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "This order helps teams validate the collaboration surface first, then wire the more sensitive account and permission logic later.",
            )}
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>{tSite("Mental model to keep")}</AlertTitle>
            <AlertDescription>
              {tSite(
                "Team and organization systems are not just account utilities. They define collaboration, permissions, billing boundaries, and product trust for real B2B SaaS usage.",
              )}
            </AlertDescription>
          </Alert>
        </section>

        <GuideNextSteps
          title={tSite("Build your team systems faster with PyColors")}
        />
      </div>
    </GuidePageShell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/guides/saas-organizations", locale);
}

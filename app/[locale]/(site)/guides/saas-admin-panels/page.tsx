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
  title: "Admin Panel Architecture for SaaS Applications",
  description:
    "Learn how to design admin panels for SaaS applications with moderation tools, permissions, audit logs, operational queues, destructive actions, and production-ready admin UX patterns.",
  alternates: {
    canonical: "/guides/saas-admin-panels",
  },

  openGraph: {
    title: "Admin Panel Architecture for SaaS Applications",
    description:
      "A practical guide to SaaS admin panel architecture covering moderation systems, operational workflows, permissions, audit logs, and production-ready admin UX.",
    url: "/guides/saas-admin-panels",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Admin Panel Architecture for SaaS Applications",
    description:
      "Learn how modern SaaS admin panels are designed across moderation, permissions, operational queues, and audit systems.",
    images: ["/seo/twitter-main.png"],
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "why-admin-panels-matter", label: "Why admin panels matter" },
  { id: "core-admin-jobs", label: "Core admin jobs" },
  { id: "layout-and-hierarchy", label: "Layout & hierarchy" },
  { id: "tables-and-queues", label: "Tables & queues" },
  { id: "moderation-actions", label: "Moderation actions" },
  { id: "roles-and-permissions", label: "Roles & permissions" },
  { id: "audit-logs", label: "Audit logs" },
  { id: "destructive-actions", label: "Destructive actions" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "build-order", label: "Build order" },
  { id: "next-steps", label: "Next steps" },
];

export default function GuideSaaSAdminPanelsPage() {
  const tSite = useCopy();

  return (
    <GuidePageShell
      title={tSite("Admin panels for SaaS products")}
      description={tSite(
        "Learn the core UX and product patterns behind admin panels in SaaS — from moderation tools and operational queues to roles, permissions, audit logs, and destructive actions.",
      )}
      toc={toc}
      tags={["Next.js", "Operations"]}
      documentation={{
        title: "Audit log block",
        href: "/docs/blocks/account/audit-log",
      }}
      relatedGuides={[
        {
          title: "Team & organization systems for SaaS",
          href: "/guides/saas-organizations",
        },
        {
          title: "SaaS dashboard design patterns",
          href: "/guides/saas-dashboard-design",
        },
      ]}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
        {
          label: "Admin panels for SaaS products",
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
                  "An admin panel is not just a back office screen. In SaaS, it is an operational system for support, moderation, permissions, and product safety.",
                )}
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2">
              <ChecklistCard
                title={tSite("Core surfaces")}
                items={[
                  "Operational tables",
                  "Moderation actions",
                  "Permissions",
                  "Audit logs",
                ]}
              />
              <ChecklistCard
                title={tSite("Business goals")}
                items={[
                  "Support operations",
                  "Reduce risk",
                  "Protect product integrity",
                  "Handle exceptions safely",
                ]}
              />
              <ChecklistCard
                title={tSite("System concerns")}
                items={[
                  "Access control",
                  "Action history",
                  "Safe destructive actions",
                  "Escalation workflows",
                ]}
              />
              <ChecklistCard
                title={tSite("PyColors path")}
                items={[
                  "Start with Free",
                  "Validate admin UX",
                  "Upgrade for real wiring",
                  "Scale safely",
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {tSite(
                "If you want to see how admin surfaces fit into a real SaaS product, explore the",
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
          id="why-admin-panels-matter"
          title={tSite("Why admin panels matter in SaaS")}
          description={tSite(
            "Operations, moderation, and support need a product surface too.",
          )}
        >
          <p>
            {tSite(
              "Many SaaS teams focus on the customer-facing product first, but once users, billing events, invitations, permissions, and edge cases start to grow, the team itself needs a reliable operational interface.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What strong admin panels create")}
              items={[
                "Faster support workflows",
                "Clear moderation processes",
                "Safer product operations",
                "Better trust inside the team",
              ]}
            />
            <ChecklistCard
              title={tSite("What weak admin panels cause")}
              items={[
                "Manual support chaos",
                "Permission mistakes",
                "Poor visibility on actions",
                "Higher operational risk",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Admin UX is often invisible to customers, but it still influences product quality, team speed, and operational trust.",
            )}
          </p>
        </Section>

        <Section
          id="core-admin-jobs"
          title={tSite("Define the core jobs of the admin panel")}
          description={tSite(
            "Admin panels should support specific operational workflows, not generic complexity.",
          )}
        >
          <p>
            {tSite(
              "Before designing the UI, define what administrators actually need to do. Most SaaS admin panels revolve around a small set of recurring operational jobs.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Admin job")}</TableHead>
                <TableHead>{tSite("Main purpose")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("User management")}
                </TableCell>
                <TableCell>
                  {tSite("Inspect, support, suspend, or restore accounts")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Content moderation")}
                </TableCell>
                <TableCell>
                  {tSite("Review flagged entities and take action safely")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Operational support")}
                </TableCell>
                <TableCell>
                  {tSite("Resolve exceptions and edge-case account states")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Permission control")}
                </TableCell>
                <TableCell>
                  {tSite("Manage who can access what inside the system")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "A good admin panel feels focused because it is built around real operational jobs instead of generic “admin” features.",
            )}
          </p>
        </Section>

        <Section
          id="layout-and-hierarchy"
          title={tSite("Use strong layout and hierarchy in admin screens")}
          description={tSite(
            "Admin interfaces should prioritize clarity, traceability, and confidence.",
          )}
        >
          <p>
            {tSite(
              "Admin panels are often denser than customer-facing screens, but they still need strong hierarchy. The user should always know what the current entity is, what its state is, and what actions are safe to take next.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Useful admin layout zones")}
              items={[
                "Entity header and current state",
                "Primary table or queue",
                "Detail panel or side sheet",
                "Action history or audit context",
              ]}
            />
            <ChecklistCard
              title={tSite("Why hierarchy matters")}
              items={[
                "Reduces action mistakes",
                "Improves scanning under pressure",
                "Makes moderation faster",
                "Improves operational trust",
              ]}
            />
          </div>

          <p>
            {tSite(
              "An admin panel does not need to look minimal. It needs to feel organized under operational load.",
            )}
          </p>
        </Section>

        <Section
          id="tables-and-queues"
          title={tSite("Design tables and queues for operational work")}
          description={tSite(
            "Admin panels often revolve around lists, tables, and review queues.",
          )}
        >
          <p>
            {tSite(
              "In most SaaS admin systems, the main work happens inside a queue: users to review, invoices to inspect, flags to resolve, invitations to track, or support cases to handle.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Useful admin table traits")}</TableHead>
                <TableHead>{tSite("Weak admin table traits")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{tSite("Strong status visibility")}</TableCell>
                <TableCell>{tSite("Hidden or ambiguous states")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{tSite("Filters that support workflows")}</TableCell>
                <TableCell>
                  {tSite("Filters added without real need")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{tSite("Clear action entrypoints")}</TableCell>
                <TableCell>
                  {tSite("Important actions buried in menus")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{tSite("Stable row hierarchy")}</TableCell>
                <TableCell>{tSite("Dense, hard-to-scan layouts")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Admin tables should help operators decide quickly and act safely. Their job is operational clarity, not visual flair.",
            )}
          </p>
        </Section>

        <Section
          id="moderation-actions"
          title={tSite("Treat moderation actions as high-risk UX")}
          description={tSite(
            "Suspend, delete, block, approve, and restore actions need more care than standard CRUD.",
          )}
        >
          <p>
            {tSite(
              "Moderation actions are different from ordinary editing actions. They often change visibility, access, or product state in ways that affect users directly.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Strong moderation UX")}
              items={[
                "Clear current status",
                "Action consequences explained",
                "Confirmation for high-impact actions",
                "Context before committing changes",
              ]}
            />
            <ChecklistCard
              title={tSite("Weak moderation UX")}
              items={[
                "Ambiguous labels",
                "No consequence explanation",
                "No recovery path",
                "Actions too easy to trigger accidentally",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Admin actions should feel deliberate. In moderation flows, the UI should reduce operator mistakes, not merely expose the available actions.",
            )}
          </p>
        </Section>

        <Section
          id="roles-and-permissions"
          title={tSite("Connect admin panels to roles and permissions")}
          description={tSite(
            "Admin access should be controlled and meaningful.",
          )}
        >
          <p>
            {tSite(
              "Not every operator should see the same panel or the same actions. Admin panels should respect role boundaries just as carefully as the rest of the product.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Good permission-aware admin UX")}
              items={[
                "Restricted actions by role",
                "Clear ownership boundaries",
                "Visible but safe limits",
                "Consistent system behavior",
              ]}
            />
            <ChecklistCard
              title={tSite("Weak permission UX")}
              items={[
                "Every admin sees everything",
                "Roles with no real effect",
                "Hidden failures after clicks",
                "Unclear action availability",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Permissions should be visible in behavior, not just in a role label somewhere else in the system.",
            )}
          </p>
        </Section>

        <Section
          id="audit-logs"
          title={tSite("Use audit logs to create operational trust")}
          description={tSite(
            "If actions matter, the system should record them clearly.",
          )}
        >
          <p>
            {tSite(
              "Audit logs are one of the most important trust layers in an admin system. They help teams understand what happened, who acted, and when a sensitive state changed.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Audit log signal")}</TableHead>
                <TableHead>{tSite("Why it matters")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{tSite("Actor")}</TableCell>
                <TableCell>
                  {tSite("Identifies who performed the action")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{tSite("Action")}</TableCell>
                <TableCell>
                  {tSite("Shows what changed in the system")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Timestamp")}
                </TableCell>
                <TableCell>
                  {tSite("Gives operational sequence and context")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{tSite("Entity")}</TableCell>
                <TableCell>
                  {tSite("Connects the action to the affected object")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Logs do not need to be flashy. They need to be reliable, readable, and useful during support or incident review.",
            )}
          </p>
        </Section>

        <Section
          id="destructive-actions"
          title={tSite("Design destructive actions with extra care")}
          description={tSite(
            "Delete, revoke, suspend, and block actions should feel safe and intentional.",
          )}
        >
          <p>
            {tSite(
              "Destructive actions are among the most dangerous interactions in an admin panel. They should be visually distinct, context-aware, and supported by confirmation patterns when necessary.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Good destructive-action UX")}
              items={[
                "Clear visual distinction",
                "Action consequence explained",
                "Confirmation when needed",
                "Reversible path when possible",
              ]}
            />
            <ChecklistCard
              title={tSite("Common destructive-action mistakes")}
              items={[
                "Weak or generic labels",
                "No explanation of impact",
                "No status update after action",
                "Too many dangerous actions grouped together",
              ]}
            />
          </div>

          <p>
            {tSite(
              "These patterns are especially important when multiple admins or support operators are working quickly under pressure.",
            )}
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title={tSite("Common mistakes in SaaS admin panels")}
          description={tSite(
            "Most admin UX problems come from weak operational thinking, not a lack of features.",
          )}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Typical mistakes")}
              items={[
                "Treating admin as generic CRUD",
                "Weak status visibility",
                "No meaningful audit trail",
                "Overloading the interface with low-value controls",
              ]}
            />
            <ChecklistCard
              title={tSite("Better approach")}
              items={[
                "Design around real admin jobs",
                "Prioritize operational clarity",
                "Separate safe and dangerous actions",
                "Use logs and permissions as trust layers",
              ]}
            />
          </div>

          <p>
            {tSite(
              "A good admin panel feels reliable because it reflects the real work operators need to do, with the right amount of context and guardrails.",
            )}
          </p>
        </Section>

        <Section
          id="build-order"
          title={tSite("Recommended build order for admin panels")}
          description={tSite(
            "A practical order helps teams ship admin UX without turning it into an unstructured control surface.",
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
                  {tSite("Primary table or queue with clear status columns")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 2")}
                </TableCell>
                <TableCell>
                  {tSite("Entity detail view and safe operational actions")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 3")}
                </TableCell>
                <TableCell>
                  {tSite("Roles, permissions, and guarded destructive actions")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 4")}
                </TableCell>
                <TableCell>
                  {tSite(
                    "Audit logs, escalation flows, and real backend wiring",
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "This sequence helps teams validate the operational surface first, then introduce the deeper control and traceability layers later.",
            )}
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>{tSite("Mental model to keep")}</AlertTitle>
            <AlertDescription>
              {tSite(
                "A strong admin panel is an operational product inside the product. It should help the team act confidently, reduce mistakes, and preserve trust when handling sensitive workflows.",
              )}
            </AlertDescription>
          </Alert>
        </section>

        <GuideNextSteps
          title={tSite("Build your admin panel faster with PyColors")}
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
  return localizePageMetadata(metadata, "/guides/saas-admin-panels", locale);
}

import { Badge, Button, Input } from "@pycolors/ui";

import { AuditLogPanel } from "@/content/blocks/account/audit-log";
import { WorkspaceInvitationsPanel } from "@/content/blocks/account/workspace-invitations";
import { WorkspaceMembersPanel } from "@/content/blocks/account/workspace-members";
import { ResponsiveSidebar } from "@/content/blocks/app-shells/responsive-sidebar";
import { PasswordRecoveryPanel } from "@/content/blocks/auth/password-recovery";
import { SignInPanel } from "@/content/blocks/auth/sign-in";
import { SignUpPanel } from "@/content/blocks/auth/sign-up";
import { BillingOverviewPanel } from "@/content/blocks/commerce/billing-overview";
import { InvoiceHistoryPanel } from "@/content/blocks/commerce/invoice-history";
import { PaymentMethodPanel } from "@/content/blocks/commerce/payment-method";
import { PricingPlans } from "@/content/blocks/commerce/pricing-plans";
import { EmptyStatePanel } from "@/content/blocks/feedback/empty-state-panel";
import {
  CatalogDataTablePreview,
  CatalogSettingsPanelPreview,
} from "@/components/marketing/blocks/catalog-client-previews";

function AuthFormPreview({ submitLabel }: Readonly<{ submitLabel: string }>) {
  return (
    <div className="space-y-3">
      <Input
        disabled
        label="Email"
        placeholder="you@example.com"
        type="email"
      />
      <Input
        disabled
        label="Password"
        placeholder="••••••••"
        type="password"
      />
      <Button className="w-full" disabled type="button">
        {submitLabel}
      </Button>
    </div>
  );
}

function RecoveryFormPreview() {
  return (
    <div className="space-y-3">
      <Input
        disabled
        label="Email"
        placeholder="you@example.com"
        type="email"
      />
      <Button className="w-full" disabled type="button">
        Send recovery link
      </Button>
    </div>
  );
}

export function BlockCatalogPreview({
  blockId,
}: Readonly<{ blockId: string }>) {
  switch (blockId) {
    case "responsive-sidebar":
      return (
        <ResponsiveSidebar
          activeItemId="overview"
          brand={<span className="font-semibold">Acme</span>}
          contentId="catalog-responsive-sidebar-content"
          headerTitle="Workspace"
          items={[
            { id: "overview", label: "Overview", href: "#" },
            { id: "projects", label: "Projects", href: "#" },
            { id: "billing", label: "Billing", href: "#" },
          ]}
          mobileDescription="Workspace navigation"
          mobileTitle="Acme"
          navigationLabel="Workspace navigation"
          sidebarFooter={
            <span className="text-xs text-muted-foreground">
              Starter workspace
            </span>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground">Projects</p>
              <p className="mt-2 text-2xl font-semibold">12</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="mt-2 text-2xl font-semibold">9</p>
            </div>
          </div>
        </ResponsiveSidebar>
      );

    case "sign-in":
      return (
        <SignInPanel
          description="Use your workspace account to continue."
          footer="Application-owned authentication behavior."
          form={<AuthFormPreview submitLabel="Sign in" />}
          title="Welcome back"
        />
      );

    case "sign-up":
      return (
        <SignUpPanel
          consent="By continuing, users accept your application terms."
          description="Create a workspace account."
          form={<AuthFormPreview submitLabel="Create account" />}
          title="Create your account"
        />
      );

    case "password-recovery":
      return (
        <PasswordRecoveryPanel
          description="Enter the account email to continue."
          form={<RecoveryFormPreview />}
          help="Recovery delivery remains application-owned."
          title="Recover your account"
        />
      );

    case "pricing-plans":
      return (
        <PricingPlans
          className="max-w-none"
          description="Consumer-owned plan copy and actions."
          plans={[
            {
              id: "starter",
              name: "Starter",
              description: "For a focused SaaS launch.",
              price: "€29",
              priceSuffix: "/mo",
              features: [
                { id: "projects", label: "3 projects" },
                { id: "support", label: "Email support" },
              ],
              action: (
                <Button disabled size="sm" type="button">
                  Choose Starter
                </Button>
              ),
            },
            {
              id: "scale",
              name: "Scale",
              description: "For growing product teams.",
              price: "€79",
              priceSuffix: "/mo",
              highlight: "Popular",
              features: [
                { id: "projects", label: "Unlimited projects" },
                { id: "support", label: "Priority support" },
              ],
              action: (
                <Button disabled size="sm" type="button" variant="outline">
                  Choose Scale
                </Button>
              ),
            },
          ]}
          title="Plans"
        />
      );

    case "billing-overview":
      return (
        <BillingOverviewPanel
          billingLabel="Billing"
          billingValue="Monthly"
          description="Subscription details supplied by the application."
          planLabel="Plan"
          planValue="Pro"
          renewalLabel="Renews"
          renewalValue="24 September 2026"
          statusLabel="Status"
          statusValue={<Badge variant="success">Active</Badge>}
          title="Billing"
        />
      );

    case "payment-method":
      return (
        <PaymentMethodPanel
          description="Payment details supplied by the application."
          expiryLabel="Expires"
          expiryValue="09/29"
          methodLabel="Card"
          methodValue="Visa •••• 4242"
          status={<Badge variant="success">Default</Badge>}
          title="Payment method"
        />
      );

    case "invoice-history":
      return (
        <InvoiceHistoryPanel
          description="Invoices supplied by the application."
          invoices={[
            {
              id: "invoice-1",
              date: "1 Sep 2026",
              amount: "€79.00",
              status: <Badge variant="success">Paid</Badge>,
            },
            {
              id: "invoice-2",
              date: "1 Aug 2026",
              amount: "€79.00",
              status: <Badge variant="success">Paid</Badge>,
            },
          ]}
          title="Invoices"
        />
      );

    case "settings-panel":
      return <CatalogSettingsPanelPreview />;

    case "workspace-members":
      return (
        <WorkspaceMembersPanel
          description="Current members supplied by the application."
          heading="Workspace members"
          id="catalog-workspace-members"
          members={[
            {
              id: "member-1",
              name: "Alex Morgan",
              secondaryText: "alex@example.com",
              role: "Owner",
              status: "Active",
            },
            {
              id: "member-2",
              name: "Sam Rivera",
              secondaryText: "sam@example.com",
              role: "Editor",
              status: "Active",
            },
          ]}
        />
      );

    case "workspace-invitations":
      return (
        <WorkspaceInvitationsPanel
          description="Pending invitations supplied by the application."
          heading="Invitations"
          id="catalog-workspace-invitations"
          invitations={[
            {
              id: "invite-1",
              recipient: "lee@example.com",
              role: "Editor",
              status: "Pending",
              sentAt: "2026-09-14T09:00:00Z",
              sentAtLabel: "14 Sep 2026",
            },
            {
              id: "invite-2",
              recipient: "maya@example.com",
              role: "Viewer",
              status: "Pending",
              sentAt: "2026-09-13T09:00:00Z",
              sentAtLabel: "13 Sep 2026",
            },
          ]}
        />
      );

    case "audit-log":
      return (
        <AuditLogPanel
          description="Recent workspace activity supplied by the application."
          events={[
            {
              id: "event-1",
              actor: "Alex Morgan",
              action: "updated",
              target: "workspace settings",
              occurredAt: "2026-09-15T08:30:00Z",
              occurredAtLabel: "Today, 08:30",
            },
            {
              id: "event-2",
              actor: "Sam Rivera",
              action: "invited",
              target: "a workspace member",
              occurredAt: "2026-09-14T16:10:00Z",
              occurredAtLabel: "Yesterday, 16:10",
            },
          ]}
          heading="Recent activity"
          id="catalog-audit-log"
        />
      );

    case "data-table":
      return <CatalogDataTablePreview />;

    case "empty-state-panel":
      return (
        <EmptyStatePanel
          description="Create the first project when your application is ready."
          heading="Projects"
          id="catalog-empty-state"
          title="No projects yet"
        />
      );

    default:
      return null;
  }
}

import { Button, Input } from "@pycolors/ui";

import { WorkspaceMembersPanel } from "@/content/blocks/account/workspace-members";
import { PasswordRecoveryPanel } from "@/content/blocks/auth/password-recovery";
import { SignInPanel } from "@/content/blocks/auth/sign-in";
import { SignUpPanel } from "@/content/blocks/auth/sign-up";
import { PricingPlans } from "@/content/blocks/commerce/pricing-plans";
import { EmptyStatePanel } from "@/content/blocks/feedback/empty-state-panel";
import {
  AuditLogExample,
  BillingOverviewExample,
  InvoiceHistoryExample,
  PaymentMethodExample,
  ResponsiveSidebarExample,
  WorkspaceInvitationsExample,
} from "@/components/docs/blocks/canonical-examples";
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

export function BlockCatalogPreview({ blockId }: Readonly<{ blockId: string }>) {
  switch (blockId) {
    case "responsive-sidebar":
      return <ResponsiveSidebarExample />;

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
      return <BillingOverviewExample />;

    case "payment-method":
      return <PaymentMethodExample />;

    case "invoice-history":
      return <InvoiceHistoryExample />;

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
      return <WorkspaceInvitationsExample />;

    case "audit-log":
      return <AuditLogExample />;

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

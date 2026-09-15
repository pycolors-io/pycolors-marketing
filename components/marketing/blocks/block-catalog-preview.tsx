import {
  PasswordRecoveryExample,
  SignInExample,
  SignUpExample,
} from "@/components/docs/blocks/auth-examples";
import {
  AuditLogExample,
  BillingOverviewExample,
  InvoiceHistoryExample,
  PaymentMethodExample,
  ResponsiveSidebarExample,
  WorkspaceInvitationsExample,
} from "@/components/docs/blocks/canonical-examples";
import { DataTableExample } from "@/components/docs/blocks/data-table-example";
import { EmptyStatePanelExample } from "@/components/docs/blocks/empty-state-panel-example";
import { PricingPlansExample } from "@/components/docs/blocks/pricing-plans-example";
import { SettingsPanelExample } from "@/components/docs/blocks/settings-panel-example";
import { WorkspaceMembersExample } from "@/components/docs/blocks/workspace-members-example";

export function BlockCatalogPreview({
  blockId,
}: Readonly<{ blockId: string }>) {
  switch (blockId) {
    case "responsive-sidebar":
      return <ResponsiveSidebarExample />;
    case "sign-in":
      return <SignInExample />;
    case "sign-up":
      return <SignUpExample />;
    case "password-recovery":
      return <PasswordRecoveryExample />;
    case "pricing-plans":
      return <PricingPlansExample />;
    case "billing-overview":
      return <BillingOverviewExample />;
    case "payment-method":
      return <PaymentMethodExample />;
    case "invoice-history":
      return <InvoiceHistoryExample />;
    case "settings-panel":
      return <SettingsPanelExample />;
    case "workspace-members":
      return <WorkspaceMembersExample />;
    case "workspace-invitations":
      return <WorkspaceInvitationsExample />;
    case "audit-log":
      return <AuditLogExample />;
    case "data-table":
      return <DataTableExample />;
    case "empty-state-panel":
      return <EmptyStatePanelExample />;
    default:
      return null;
  }
}

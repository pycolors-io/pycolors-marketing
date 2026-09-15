"use client";

import * as React from "react";

import { ResponsiveSidebar } from "@/content/blocks/app-shells/responsive-sidebar";
import { AuditLogPanel } from "@/content/blocks/account/audit-log";
import { WorkspaceInvitationsPanel } from "@/content/blocks/account/workspace-invitations";
import { BillingOverviewPanel } from "@/content/blocks/commerce/billing-overview";
import { InvoiceHistoryPanel } from "@/content/blocks/commerce/invoice-history";
import { PaymentMethodPanel } from "@/content/blocks/commerce/payment-method";

const actionClassName =
  "inline-flex min-h-9 items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const primaryActionClassName =
  "inline-flex min-h-9 items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const statusClassName =
  "inline-flex items-center rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground";

function usePreviewId(prefix: string) {
  return `${prefix}-${React.useId().replaceAll(":", "")}`;
}

function DemoAction({
  label,
  selectedLabel = "Selected locally",
  primary = false,
}: Readonly<{
  label: string;
  selectedLabel?: string;
  primary?: boolean;
}>) {
  const [selected, setSelected] = React.useState(false);

  return (
    <button
      aria-pressed={selected}
      className={primary ? primaryActionClassName : actionClassName}
      onClick={() => setSelected((value) => !value)}
      type="button"
    >
      {selected ? selectedLabel : label}
    </button>
  );
}

export function ResponsiveSidebarExample() {
  const contentId = usePreviewId("responsive-sidebar-preview");

  return (
    <div className="not-prose overflow-hidden rounded-lg border border-border">
      <ResponsiveSidebar
        activeItemId="overview"
        brand={<strong className="text-sm">Northstar</strong>}
        className="min-h-[30rem] [&_[data-slot=responsive-sidebar-desktop]]:h-[30rem]"
        contentId={contentId}
        headerActions={
          <DemoAction
            label="New project"
            primary
            selectedLabel="Project action selected"
          />
        }
        headerTitle={<strong>Overview</strong>}
        items={[
          { id: "overview", label: "Overview", href: `#${contentId}` },
          {
            id: "projects",
            label: "Projects",
            href: `#${contentId}`,
            badge: "4",
          },
        ]}
        mobileDescription="Choose a fictional workspace destination."
        mobileTitle="Workspace navigation"
        navigationLabel="Preview workspace navigation"
        sidebarFooter={<span className="text-xs">Fictional workspace</span>}
      >
        <div className="space-y-3 p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">
            Canonical application shell with consumer-owned navigation and page
            content.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-medium">Projects</p>
              <p className="mt-1 text-2xl font-semibold">4</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-medium">Environment</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Interactive local preview
              </p>
            </div>
          </div>
        </div>
      </ResponsiveSidebar>
    </div>
  );
}

export function BillingOverviewExample() {
  return (
    <div className="not-prose">
      <BillingOverviewPanel
        billingLabel="Billing"
        billingValue="Monthly"
        description="Fictional values supplied by the preview consumer."
        paymentLabel="Payment method"
        paymentValue="Visa ending in 4242"
        planLabel="Plan"
        planValue="Growth example"
        primaryAction={
          <DemoAction
            label="Manage billing"
            primary
            selectedLabel="Billing action selected"
          />
        }
        renewalLabel="Renews"
        renewalValue="October 15"
        secondaryAction={
          <DemoAction label="View plans" selectedLabel="Plans selected" />
        }
        statusLabel="Status"
        statusValue="Active"
        title="Billing"
      />
    </div>
  );
}

export function PaymentMethodExample() {
  return (
    <div className="not-prose">
      <PaymentMethodPanel
        contactLabel="Billing contact"
        contactValue="billing@example.com"
        description="Redacted fictional payment details for presentation only."
        expiryLabel="Expires"
        expiryValue="10 / 28"
        methodLabel="Method"
        methodValue="Visa ending in 4242"
        primaryAction={
          <DemoAction
            label="Update payment method"
            primary
            selectedLabel="Update selected locally"
          />
        }
        status={<span className={statusClassName}>Default</span>}
        title="Payment method"
      />
    </div>
  );
}

export function InvoiceHistoryExample() {
  return (
    <div className="not-prose">
      <InvoiceHistoryPanel
        description="Fictional records supplied by the preview consumer."
        invoices={[
          {
            id: "invoice-example-1",
            date: "September 1, 2026",
            amount: "$49.00",
            status: <span className={statusClassName}>Paid</span>,
            action: (
              <DemoAction
                label="View invoice"
                selectedLabel="Invoice selected"
              />
            ),
          },
          {
            id: "invoice-example-2",
            date: "August 1, 2026",
            amount: "$49.00",
            status: <span className={statusClassName}>Paid</span>,
          },
        ]}
        title="Invoice history"
      />
    </div>
  );
}

export function AuditLogExample() {
  const id = usePreviewId("audit-log-preview");

  return (
    <div className="not-prose">
      <AuditLogPanel
        actions={
          <DemoAction
            label="Export view"
            selectedLabel="Export selected locally"
          />
        }
        description="Fictional workspace events supplied by the preview consumer."
        events={[
          {
            id: "event-1",
            actor: "Alex Morgan",
            action: "updated",
            target: "workspace settings",
            occurredAt: "2026-09-15T08:30:00Z",
            occurredAtLabel: "15 September 2026, 08:30 UTC",
            details: "Changed the workspace display name.",
          },
          {
            id: "event-2",
            actor: "Sam Lee",
            action: "reviewed",
            target: "billing access",
            occurredAt: "2026-09-14T16:10:00Z",
            occurredAtLabel: "14 September 2026, 16:10 UTC",
          },
        ]}
        heading="Recent activity"
        id={id}
      />
    </div>
  );
}

export function WorkspaceInvitationsExample() {
  const id = usePreviewId("workspace-invitations-preview");

  return (
    <div className="not-prose">
      <WorkspaceInvitationsPanel
        actions={
          <DemoAction
            label="Invite member"
            primary
            selectedLabel="Invite action selected"
          />
        }
        description="Fictional invitations supplied by the preview consumer."
        heading="Pending invitations"
        id={id}
        invitations={[
          {
            id: "invite-1",
            recipient: "sam@example.com",
            secondaryText: "Example recipient",
            role: "Editor",
            status: "Pending",
            sentAt: "2026-09-15T09:00:00Z",
            sentAtLabel: "15 September 2026",
            expiresAt: "2026-09-22T09:00:00Z",
            expiresAtLabel: "22 September 2026",
            actions: (
              <DemoAction
                label="Revoke invitation"
                selectedLabel="Revoke selected locally"
              />
            ),
          },
        ]}
      />
    </div>
  );
}

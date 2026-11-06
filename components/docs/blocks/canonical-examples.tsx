"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";

export { ResponsiveSidebarExample } from "./responsive-sidebar-example";
import { AuditLogPanel } from "@/content/blocks/account/audit-log";
import { WorkspaceInvitationsPanel } from "@/content/blocks/account/workspace-invitations";
import { BillingOverviewPanel } from "@/content/blocks/commerce/billing-overview";
import { InvoiceHistoryPanel } from "@/content/blocks/commerce/invoice-history";
import { PaymentMethodPanel } from "@/content/blocks/commerce/payment-method";

const actionClassName =
  "inline-flex min-h-11 sm:min-h-10 items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const primaryActionClassName =
  "inline-flex min-h-11 sm:min-h-10 items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
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
  const tSite = useCopy();

  const [selected, setSelected] = React.useState(false);

  return (
    <button
      aria-pressed={selected}
      className={primary ? primaryActionClassName : actionClassName}
      onClick={() => setSelected((value) => !value)}
      type="button"
    >
      {tSite(selected ? selectedLabel : label)}
    </button>
  );
}

export function BillingOverviewExample() {
  const tSite = useCopy();

  return (
    <div className="not-prose mx-auto max-w-3xl">
      <BillingOverviewPanel
        billingLabel={tSite("Billing")}
        billingValue={tSite("Monthly")}
        description={tSite(
          "Your plan, renewal date and payment details. Fictional demo data.",
        )}
        paymentLabel={tSite("Payment method")}
        paymentValue={tSite("Visa ending in 4242")}
        planLabel={tSite("Plan")}
        planValue={tSite("Growth example")}
        primaryAction={
          <DemoAction
            label={tSite("Manage billing")}
            primary
            selectedLabel={tSite("Billing action selected")}
          />
        }
        renewalLabel={tSite("Renews")}
        renewalValue={tSite("October 15")}
        secondaryAction={
          <DemoAction
            label={tSite("View plans")}
            selectedLabel={tSite("Plans selected")}
          />
        }
        statusLabel={tSite("Status")}
        statusValue={
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-success"
            />
            {tSite("Active")}
          </span>
        }
        title={tSite("Billing")}
      />
    </div>
  );
}

export function PaymentMethodExample() {
  const tSite = useCopy();

  return (
    <div className="not-prose mx-auto max-w-3xl">
      <PaymentMethodPanel
        contactLabel={tSite("Billing contact")}
        contactValue="billing@example.com"
        description={tSite(
          "The payment method used for your workspace. Fictional demo data.",
        )}
        expiryLabel={tSite("Expires")}
        expiryValue="10 / 28"
        methodLabel={tSite("Method")}
        methodValue={tSite("Visa ending in 4242")}
        primaryAction={
          <DemoAction
            label={tSite("Update payment method")}
            primary
            selectedLabel={tSite("Update selected locally")}
          />
        }
        status={<span className={statusClassName}>{tSite("Default")}</span>}
        title={tSite("Payment method")}
      />
    </div>
  );
}

export function InvoiceHistoryExample() {
  const tSite = useCopy();

  return (
    <div className="not-prose mx-auto max-w-4xl">
      <InvoiceHistoryPanel
        dateLabel={tSite("Date")}
        amountLabel={tSite("Amount")}
        statusLabel={tSite("Status")}
        actionLabel={tSite("Action")}
        emptyState={tSite("No invoices yet.")}
        description={tSite(
          "A clear record of your workspace billing. Fictional demo invoices.",
        )}
        invoices={[
          {
            id: "invoice-example-1",
            date: tSite("September 1, 2026"),
            amount: tSite("$49.00"),
            status: (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-success/25 bg-success/5 px-2 py-1 text-xs">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-success"
                />
                {tSite("Paid")}
              </span>
            ),
            action: (
              <DemoAction
                label={tSite("View invoice")}
                selectedLabel={tSite("Invoice selected")}
              />
            ),
          },
          {
            id: "invoice-example-2",
            date: tSite("August 1, 2026"),
            amount: tSite("$49.00"),
            status: (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-success/25 bg-success/5 px-2 py-1 text-xs">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-success"
                />
                {tSite("Paid")}
              </span>
            ),
          },
        ]}
        title={tSite("Invoice history")}
      />
    </div>
  );
}

export function AuditLogExample() {
  const tSite = useCopy();

  const id = usePreviewId("audit-log-preview");

  return (
    <div className="not-prose">
      <AuditLogPanel
        actions={
          <DemoAction
            label={tSite("Export view")}
            selectedLabel={tSite("Export selected locally")}
          />
        }
        description={tSite(
          "Fictional workspace events supplied by the preview consumer.",
        )}
        events={[
          {
            id: "event-1",
            actor: "Alex Morgan",
            action: tSite("updated"),
            target: tSite("workspace settings"),
            occurredAt: "2026-09-15T08:30:00Z",
            occurredAtLabel: tSite("15 September 2026, 08:30 UTC"),
            details: tSite("Changed the workspace display name."),
          },
          {
            id: "event-2",
            actor: "Sam Lee",
            action: tSite("reviewed"),
            target: tSite("billing access"),
            occurredAt: "2026-09-14T16:10:00Z",
            occurredAtLabel: tSite("14 September 2026, 16:10 UTC"),
          },
        ]}
        heading={tSite("Recent activity")}
        id={id}
      />
    </div>
  );
}

export function WorkspaceInvitationsExample() {
  const tSite = useCopy();

  const id = usePreviewId("workspace-invitations-preview");

  return (
    <div className="not-prose">
      <WorkspaceInvitationsPanel
        roleLabel={tSite("Role")}
        statusLabel={tSite("Status")}
        sentLabel={tSite("Sent")}
        expiresLabel={tSite("Expires")}
        actions={
          <DemoAction
            label={tSite("Invite member")}
            primary
            selectedLabel={tSite("Invite action selected")}
          />
        }
        description={tSite(
          "Fictional invitations supplied by the preview consumer.",
        )}
        heading={tSite("Pending invitations")}
        id={id}
        invitations={[
          {
            id: "invite-1",
            recipient: "sam@example.com",
            secondaryText: tSite("Example recipient"),
            role: tSite("Editor"),
            status: tSite("Pending"),
            sentAt: "2026-09-15T09:00:00Z",
            sentAtLabel: tSite("15 September 2026"),
            expiresAt: "2026-09-22T09:00:00Z",
            expiresAtLabel: tSite("22 September 2026"),
            actions: (
              <DemoAction
                label={tSite("Revoke invitation")}
                selectedLabel={tSite("Revoke selected locally")}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

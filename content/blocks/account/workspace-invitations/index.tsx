import * as React from "react";
import { Badge, EmptyState, cn } from "@pycolors/ui";

export interface WorkspaceInvitation {
  /** Stable identity, unique within this panel; used as the React key. */
  id: string;
  recipient: string;
  secondaryText?: string;
  /** Display text only. The application owns role validation and authorization. */
  role: string;
  /** Consumer-defined invitation state such as Pending, Accepted, or Expired. */
  status: string;
  sentAt: string;
  sentAtLabel: string;
  expiresAt?: string;
  expiresAtLabel?: string;
  actions?: React.ReactNode;
}

export interface WorkspaceInvitationsPanelProps {
  /** Stable HTML id, unique across the consuming page. */
  id: string;
  heading: string;
  description?: string;
  invitations: readonly WorkspaceInvitation[];
  actions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

function InvitationActions({ children }: { children?: React.ReactNode }) {
  if (!React.Children.toArray(children).some((child) => child !== "")) {
    return null;
  }

  return (
    <div
      data-slot="workspace-invitations-actions"
      className="flex min-w-0 flex-wrap items-center gap-2 [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:break-words"
    >
      {children}
    </div>
  );
}

export function WorkspaceInvitationsPanel({
  id,
  heading,
  description,
  invitations,
  actions,
  emptyTitle = "No invitations to display",
  emptyDescription,
  className,
}: WorkspaceInvitationsPanelProps) {
  const headingId = `${id}-heading`;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      data-slot="workspace-invitations-panel"
      className={cn(
        "min-w-0 rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="min-w-0 space-y-1">
          <h2 id={headingId} className="break-words text-base font-semibold">
            {heading}
          </h2>
          {description ? (
            <p
              id={descriptionId}
              className="break-words text-sm text-muted-foreground"
            >
              {description}
            </p>
          ) : null}
        </div>
        <InvitationActions>{actions}</InvitationActions>
      </div>

      {invitations.length > 0 ? (
        <ul
          role="list"
          aria-labelledby={headingId}
          className="divide-y divide-border"
        >
          {invitations.map((invitation) => (
            <li
              key={invitation.id}
              data-slot="workspace-invitation"
              className="flex min-w-0 flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-3">
                <div className="min-w-0 space-y-1">
                  <h3 className="break-words text-sm font-medium">
                    {invitation.recipient}
                  </h3>
                  {invitation.secondaryText ? (
                    <p className="break-words text-sm text-muted-foreground">
                      {invitation.secondaryText}
                    </p>
                  ) : null}
                </div>

                <dl className="flex min-w-0 flex-wrap gap-x-6 gap-y-3">
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-muted-foreground">Role</dt>
                    <dd className="min-w-0 break-words text-sm">
                      {invitation.role}
                    </dd>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-muted-foreground">Status</dt>
                    <dd className="min-w-0">
                      <Badge
                        variant="outline"
                        className="h-auto max-w-full whitespace-normal break-words"
                      >
                        {invitation.status}
                      </Badge>
                    </dd>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-muted-foreground">Sent</dt>
                    <dd className="min-w-0 break-words text-sm">
                      <time dateTime={invitation.sentAt}>
                        {invitation.sentAtLabel}
                      </time>
                    </dd>
                  </div>
                  {invitation.expiresAt && invitation.expiresAtLabel ? (
                    <div className="min-w-0 space-y-1">
                      <dt className="text-xs text-muted-foreground">Expires</dt>
                      <dd className="min-w-0 break-words text-sm">
                        <time dateTime={invitation.expiresAt}>
                          {invitation.expiresAtLabel}
                        </time>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <InvitationActions>{invitation.actions}</InvitationActions>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          ariaLive="off"
          className="min-w-0 break-words rounded-none border-0 p-6 sm:p-8"
        />
      )}
    </section>
  );
}

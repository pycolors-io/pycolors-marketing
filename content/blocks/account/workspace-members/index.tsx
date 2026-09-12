import * as React from "react";
import { Badge, EmptyState, cn } from "@pycolors/ui";

export interface WorkspaceMember {
  /** Stable identity, unique within this panel; used as the React key. */
  id: string;
  name: string;
  secondaryText?: string;
  /** Display text only. The application owns authorization. */
  role: string;
  status: string;
  actions?: React.ReactNode;
}

export interface WorkspaceMembersPanelProps {
  /** Stable HTML id, unique across the consuming page. */
  id: string;
  heading: string;
  description?: string;
  members: readonly WorkspaceMember[];
  actions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

function MemberActions({ children }: { children?: React.ReactNode }) {
  if (!React.Children.toArray(children).some((child) => child !== "")) {
    return null;
  }

  return (
    <div
      data-slot="workspace-members-actions"
      className="flex min-w-0 flex-wrap items-center gap-2 [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:break-words"
    >
      {children}
    </div>
  );
}

export function WorkspaceMembersPanel({
  id,
  heading,
  description,
  members,
  actions,
  emptyTitle = "No members to display",
  emptyDescription,
  className,
}: WorkspaceMembersPanelProps) {
  const headingId = `${id}-heading`;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      data-slot="workspace-members-panel"
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
        <MemberActions>{actions}</MemberActions>
      </div>

      {members.length > 0 ? (
        <ul role="list" aria-labelledby={headingId} className="divide-y divide-border">
          {members.map((member) => (
            <li
              key={member.id}
              data-slot="workspace-member"
              className="flex min-w-0 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="min-w-0 flex-1 space-y-3">
                <div className="min-w-0 space-y-1">
                  <h3 className="break-words text-sm font-medium">
                    {member.name}
                  </h3>
                  {member.secondaryText ? (
                    <p className="break-words text-sm text-muted-foreground">
                      {member.secondaryText}
                    </p>
                  ) : null}
                </div>
                <dl className="flex min-w-0 flex-wrap gap-x-6 gap-y-2">
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-muted-foreground">Role</dt>
                    <dd className="min-w-0 break-words text-sm">{member.role}</dd>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-muted-foreground">Status</dt>
                    <dd className="min-w-0">
                      <Badge
                        variant="outline"
                        className="h-auto max-w-full whitespace-normal break-words"
                      >
                        {member.status}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </div>
              <MemberActions>{member.actions}</MemberActions>
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

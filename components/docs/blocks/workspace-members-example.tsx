"use client";

import * as React from "react";
import { Button } from "@pycolors/ui";
import Link from "next/link";

import {
  WorkspaceMembersPanel,
  type WorkspaceMember,
} from "@/content/blocks/account/workspace-members";

const sampleMembers: readonly WorkspaceMember[] = [
  {
    id: "alex",
    name: "Alex Morgan",
    secondaryText: "alex@example.com",
    role: "Workspace owner",
    status: "Active example",
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    role: "Project observer",
    status: "Awaiting review example",
  },
  {
    id: "casey",
    name: "Casey Park — a deliberately long fictional member name for a narrow workspace",
    secondaryText: "casey.long.example.address@example.com",
    role: "External collaborator with a deliberately long role label",
    status: "Unavailable example action",
  },
];

export function WorkspaceMembersExample() {
  const exampleId = React.useId();
  const [empty, setEmpty] = React.useState(false);
  const [showActions, setShowActions] = React.useState(true);
  const [selectedName, setSelectedName] = React.useState<string | null>(null);
  const members = empty
    ? []
    : sampleMembers.map((member) => ({
        ...member,
        actions: showActions ? (
          <Button
            type="button"
            variant="outline"
            disabled={member.id === "casey"}
            aria-label={`View example details for ${member.name}`}
            onClick={() => setSelectedName(member.name)}
          >
            View example details
          </Button>
        ) : undefined,
      }));

  return (
    <div className="w-full min-w-0 space-y-6">
      <p className="text-sm text-muted-foreground">
        Fictional local example. No invitations, permission changes, requests or
        emails are sent. Nothing is saved. Actions only select a sample member.
      </p>
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <label
            className="block text-sm font-medium"
            htmlFor={`${exampleId}-state`}
          >
            Example state
          </label>
          <span className="relative inline-grid min-w-24 max-w-full">
            <select
              id={`${exampleId}-state`}
              value={empty ? "empty" : "populated"}
              onChange={(event) => {
                setEmpty(event.target.value === "empty");
                setSelectedName(null);
              }}
              className="h-11 w-full min-w-0 appearance-none truncate rounded-[5px] border border-input bg-background py-2 pl-3 pr-9 text-base leading-5 text-foreground shadow-xs outline-none transition-colors hover:border-border focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm motion-reduce:transition-none"
            >
              <option value="populated">Sample members</option>
              <option value="empty">Empty workspace</option>
            </select>
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
              fill="none"
              className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            >
              <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <label
          htmlFor={`${exampleId}-actions`}
          className="flex min-h-11 items-center gap-2 text-sm"
        >
          <input
            id={`${exampleId}-actions`}
            type="checkbox"
            checked={showActions}
            onChange={(event) => {
              setShowActions(event.target.checked);
              setSelectedName(null);
            }}
            className="size-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          Show example actions
        </label>
      </div>
      <WorkspaceMembersPanel
        id={`${exampleId}-members`}
        heading="Example workspace members"
        description="Names, roles, statuses and actions are supplied by this demo, not inferred by the Block."
        members={members}
        actions={
          showActions ? (
            <Button asChild variant="outline">
              <Link href="/docs/ui/installation">Read UI setup</Link>
            </Button>
          ) : undefined
        }
        emptyTitle="No example members"
        emptyDescription="Your application chooses what to offer next. This demo has no invitation service."
      />
      <p
        role="status"
        aria-live="polite"
        className="text-sm text-muted-foreground"
      >
        {selectedName
          ? `Selected example member: ${selectedName}. No data was changed.`
          : "No example member selected."}
      </p>
    </div>
  );
}

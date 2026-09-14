import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  WorkspaceInvitationsPanel,
  type WorkspaceInvitation,
} from "../../content/blocks/account/workspace-invitations";

const invitations: readonly WorkspaceInvitation[] = Object.freeze([
  Object.freeze({
    id: "invite-alex",
    recipient: "alex@example.com",
    secondaryText: "Product workspace",
    role: "Editor",
    status: "Pending",
    sentAt: "2026-09-14T10:00:00.000Z",
    sentAtLabel: "September 14, 2026 at 10:00",
    expiresAt: "2026-09-21T10:00:00.000Z",
    expiresAtLabel: "September 21, 2026 at 10:00",
  }),
  Object.freeze({
    id: "invite-jordan",
    recipient: "jordan@example.com",
    role: "Viewer",
    status: "Accepted",
    sentAt: "2026-09-13T09:30:00.000Z",
    sentAtLabel: "September 13, 2026 at 09:30",
  }),
]);

const props = {
  id: "workspace-invites",
  heading: "Workspace invitations",
  invitations,
};

describe("WorkspaceInvitationsPanel", () => {
  it("renders a named region, invitation list and semantic timestamps", () => {
    render(
      <WorkspaceInvitationsPanel
        {...props}
        description="People invited to this workspace."
      />,
    );

    const panel = screen.getByRole("region", {
      name: "Workspace invitations",
    });
    expect(panel).toHaveAccessibleDescription(
      "People invited to this workspace.",
    );
    const list = within(panel).getByRole("list", {
      name: "Workspace invitations",
    });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(panel).getByText("alex@example.com")).toBeVisible();
    expect(within(panel).getByText("Editor")).toBeVisible();
    expect(within(panel).getByText("Pending")).toBeVisible();
    expect(
      within(panel).getByText("September 14, 2026 at 10:00"),
    ).toHaveAttribute("datetime", "2026-09-14T10:00:00.000Z");
    expect(
      within(panel).getByText("September 21, 2026 at 10:00"),
    ).toHaveAttribute("datetime", "2026-09-21T10:00:00.000Z");
  });

  it("preserves consumer controls, callbacks, refs and focus", () => {
    const onClick = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <WorkspaceInvitationsPanel
        {...props}
        actions={<a href="/workspace/invite">Invite another person</a>}
        invitations={[
          {
            ...invitations[0]!,
            actions: (
              <button ref={ref} type="button" onClick={onClick}>
                Resend invitation
              </button>
            ),
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Invite another person" }),
    ).toHaveAttribute("href", "/workspace/invite");
    const button = screen.getByRole("button", { name: "Resend invitation" });
    expect(ref.current).toBe(button);
    button.focus();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
  });

  it("omits optional secondary text, expiry and actions cleanly", () => {
    const { container } = render(
      <WorkspaceInvitationsPanel
        {...props}
        invitations={[invitations[1]!]}
      />,
    );

    const row = screen.getByRole("listitem");
    expect(within(row).queryByText("Product workspace")).toBeNull();
    expect(within(row).queryByText("Expires")).toBeNull();
    expect(
      container.querySelector('[data-slot="workspace-invitations-actions"]'),
    ).toBeNull();
  });

  it("renders a consumer-owned empty state without unsolicited announcements", () => {
    const { container } = render(
      <WorkspaceInvitationsPanel
        {...props}
        invitations={[]}
        emptyTitle="No pending invitations"
        emptyDescription="Invite someone when you are ready."
      />,
    );

    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByText("No pending invitations")).toBeVisible();
    expect(screen.getByText("Invite someone when you are ready.")).toBeVisible();
    expect(container.querySelector("[aria-live]")).toBeNull();
  });

  it("keeps ids unique across repeated panels", () => {
    const { container } = render(
      <>
        <WorkspaceInvitationsPanel {...props} />
        <WorkspaceInvitationsPanel
          {...props}
          id="other-workspace-invites"
          heading="Other workspace invitations"
        />
      </>,
    );

    const ids = Array.from(
      container.querySelectorAll("[id]"),
      (element) => element.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("preserves long content and gives root class overrides precedence", () => {
    const recipient = "very-long-recipient-address-".repeat(12);
    const { container } = render(
      <WorkspaceInvitationsPanel
        {...props}
        className="rounded-none bg-muted"
        invitations={[
          {
            ...invitations[0]!,
            recipient,
            status: "Consumer-defined invitation status ".repeat(8),
          },
        ]}
      />,
    );

    const panel = screen.getByRole("region", {
      name: "Workspace invitations",
    });
    expect(panel).toHaveClass("min-w-0", "rounded-none", "bg-muted");
    expect(panel).not.toHaveClass("rounded-xl", "bg-card");
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(
      recipient,
    );
    expect(container.querySelector('[data-slot="badge"]')).toHaveClass(
      "h-auto",
      "whitespace-normal",
    );
  });

  it("has no axe violations in representative populated and empty states", async () => {
    const { container, rerender } = render(
      <WorkspaceInvitationsPanel {...props} />,
    );
    expect((await axe(container)).violations).toEqual([]);

    rerender(<WorkspaceInvitationsPanel {...props} invitations={[]} />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

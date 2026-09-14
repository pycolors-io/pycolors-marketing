import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  AuditLogPanel,
  type AuditLogEvent,
} from "../../content/blocks/account/audit-log";

const events: readonly AuditLogEvent[] = Object.freeze([
  Object.freeze({
    id: "evt-1",
    actor: "Alex Morgan",
    action: "updated",
    target: "Workspace settings",
    occurredAt: "2026-09-14T10:00:00.000Z",
    occurredAtLabel: "September 14, 2026 at 10:00",
  }),
  Object.freeze({
    id: "evt-2",
    actor: "Jordan Lee",
    action: "viewed",
    target: "Audit history",
    occurredAt: "2026-09-14T09:30:00.000Z",
    occurredAtLabel: "September 14, 2026 at 09:30",
  }),
]);

const props = {
  id: "audit",
  heading: "Audit log",
  events,
};

describe("AuditLogPanel", () => {
  it("renders a named region, ordered events and semantic timestamps", () => {
    render(
      <AuditLogPanel {...props} description="Recent workspace activity." />,
    );

    const panel = screen.getByRole("region", { name: "Audit log" });
    expect(panel).toHaveAccessibleDescription("Recent workspace activity.");
    const list = within(panel).getByRole("list", { name: "Audit log" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(panel).getByText("Alex Morgan")).toBeVisible();
    expect(within(panel).getByText("Workspace settings")).toBeVisible();
    expect(
      within(panel).getByText("September 14, 2026 at 10:00"),
    ).toHaveAttribute("datetime", "2026-09-14T10:00:00.000Z");
  });

  it("preserves consumer controls, callbacks and focus", () => {
    const onClick = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <AuditLogPanel
        {...props}
        filters={<input aria-label="Filter activity" />}
        actions={<a href="/audit/export">Export</a>}
        events={[
          {
            ...events[0]!,
            actions: (
              <button ref={ref} type="button" onClick={onClick}>
                View details
              </button>
            ),
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "Filter activity" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Export" })).toHaveAttribute(
      "href",
      "/audit/export",
    );
    const button = screen.getByRole("button", { name: "View details" });
    expect(ref.current).toBe(button);
    button.focus();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
  });

  it("omits optional slots cleanly and renders the consumer-owned empty state", () => {
    const { container } = render(
      <AuditLogPanel
        {...props}
        events={[]}
        emptyTitle="No recorded activity"
        emptyDescription="Events will appear here when supplied by your app."
      />,
    );

    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByText("No recorded activity")).toBeVisible();
    expect(
      screen.getByText("Events will appear here when supplied by your app."),
    ).toBeVisible();
    expect(
      container.querySelector('[data-slot="audit-log-filters"]'),
    ).toBeNull();
    expect(
      container.querySelector('[data-slot="audit-log-actions"]'),
    ).toBeNull();
  });

  it("keeps ids unique across repeated panels", () => {
    const { container } = render(
      <>
        <AuditLogPanel {...props} />
        <AuditLogPanel
          {...props}
          id="secondary-audit"
          heading="Other audit log"
        />
      </>,
    );

    const ids = Array.from(
      container.querySelectorAll("[id]"),
      (element) => element.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no axe violations in representative populated and empty states", async () => {
    const { container, rerender } = render(<AuditLogPanel {...props} />);
    expect((await axe(container)).violations).toEqual([]);

    rerender(<AuditLogPanel {...props} events={[]} />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import { WorkspaceMembersExample } from "../../components/docs/blocks/workspace-members-example";
import {
  WorkspaceMembersPanel,
  type WorkspaceMember,
} from "../../content/blocks/account/workspace-members";

const members: readonly WorkspaceMember[] = Object.freeze([
  Object.freeze({
    id: "alex",
    name: "Alex Morgan",
    secondaryText: "alex@example.com",
    role: "Custom observer role",
    status: "Consumer-defined status",
  }),
  Object.freeze({
    id: "jordan",
    name: "Jordan Lee",
    role: "Workspace owner",
    status: "Active",
  }),
]);

const props = { id: "team", heading: "Workspace members", members };

describe("WorkspaceMembersPanel", () => {
  it("composes a named section, coherent headings and labelled member details", () => {
    const { container } = render(
      <WorkspaceMembersPanel {...props} description="People in this workspace." />,
    );
    const panel = screen.getByRole("region", { name: props.heading });
    expect(panel).toHaveAccessibleDescription("People in this workspace.");
    const heading = within(panel).getByRole("heading", { level: 2 });
    expect(panel).toHaveAttribute("aria-labelledby", heading.id);
    const list = within(panel).getByRole("list", { name: props.heading });
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(within(rows[0]!).getByRole("heading", { level: 3 })).toHaveTextContent("Alex Morgan");
    expect(within(rows[0]!).getByText("alex@example.com")).toBeVisible();
    expect(within(rows[0]!).getByText("Role")).toBeVisible();
    expect(within(rows[0]!).getByText("Custom observer role")).toBeVisible();
    expect(within(rows[0]!).getByText("Status")).toBeVisible();
    expect(within(rows[0]!).getByText("Consumer-defined status")).toBeVisible();
    expect(within(rows[1]!).getByRole("heading", { level: 3 })).toHaveTextContent("Jordan Lee");
    expect(rows[1]!.querySelector("p")).toBeNull();
    expect(container.querySelector("[aria-live]")).toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("preserves consumer elements, callbacks, refs, native links and focus", () => {
    const onClick = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();
    const action = <button ref={ref} type="button" onClick={onClick}>View Alex</button>;
    const data = [{ ...members[0]!, actions: action }];
    const { rerender } = render(
      <WorkspaceMembersPanel
        {...props}
        members={data}
        actions={<a href="/workspace-guide">Workspace guide</a>}
      />,
    );
    const button = screen.getByRole("button", { name: "View Alex" });
    expect(ref.current).toBe(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/workspace-guide");
    button.focus();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
    rerender(<WorkspaceMembersPanel {...props} members={data} heading="Updated team" />);
    expect(ref.current).toBe(button);
    expect(button).toHaveFocus();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses stable member keys and follows consumer reordering without changing data", () => {
    const action = <button type="button">View Alex</button>;
    const alex = { ...members[0]!, actions: action };
    const { rerender } = render(<WorkspaceMembersPanel {...props} members={[alex, members[1]!]} />);
    const button = screen.getByRole("button", { name: "View Alex" });
    button.focus();
    rerender(<WorkspaceMembersPanel {...props} members={[members[1]!, alex]} />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual(["Jordan Lee", "Alex Morgan"]);
    expect(screen.getByRole("button", { name: "View Alex" })).toBe(button);
    expect(button).toHaveFocus();
    expect(members.map((member) => member.id)).toEqual(["alex", "jordan"]);
  });

  it("preserves disabled controls and consumer-owned non-submitting button types", () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <WorkspaceMembersPanel
          {...props}
          actions={<button disabled type="button" onClick={onClick}>Unavailable</button>}
          members={[{ ...members[0]!, actions: <button type="button">View member</button> }]}
        />
      </form>,
    );
    const disabled = screen.getByRole("button", { name: "Unavailable" });
    expect(disabled).toBeDisabled();
    fireEvent.click(disabled);
    fireEvent.click(screen.getByRole("button", { name: "View member" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it.each([undefined, null, false, [], ""])("omits absent section and member action groups (%s)", (actions) => {
    const { container } = render(
      <WorkspaceMembersPanel {...props} actions={actions} members={[{ ...members[0]!, actions }]} />,
    );
    expect(container.querySelector('[data-slot="workspace-members-actions"]')).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("keeps a remaining action unchanged when empty siblings are provided", () => {
    render(<WorkspaceMembersPanel {...props} actions={[null, <a key="guide" href="/guide">Guide</a>, false]} />);
    expect(screen.getByRole("link", { name: "Guide" })).toHaveAttribute("href", "/guide");
  });

  it("renders an empty state without a list or unsolicited announcements and preserves section actions", () => {
    const { container, rerender } = render(<WorkspaceMembersPanel {...props} members={[]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("No members to display");
    expect(screen.queryByRole("list")).toBeNull();
    expect(container.querySelector("[aria-live]")).toBeNull();
    rerender(
      <WorkspaceMembersPanel
        {...props}
        members={[]}
        emptyTitle="No people in this team"
        emptyDescription="Choose your next step."
        actions={<a href="/guide">Read team guide</a>}
      />,
    );
    expect(screen.getByText("Choose your next step.")).toBeVisible();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("No people in this team");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/guide");
  });

  it("keeps IDs unique across panels, including panels containing the same member IDs", () => {
    const { container } = render(<><WorkspaceMembersPanel {...props} description="First team" /><WorkspaceMembersPanel {...props} id="other-team" heading="Other members" description="Second team" /></>);
    const ids = Array.from(container.querySelectorAll("[id]"), (element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const name of [props.heading, "Other members"]) {
      const region = screen.getByRole("region", { name });
      expect(region).toHaveAttribute("aria-labelledby", within(region).getByRole("heading", { level: 2 }).id);
    }
  });

  it("preserves long text and gives root class overrides precedence", () => {
    const name = "Long member name ".repeat(20);
    const { container } = render(<WorkspaceMembersPanel {...props} className="rounded-none bg-muted" members={[{ ...members[0]!, name }]} />);
    const panel = screen.getByRole("region", { name: props.heading });
    expect(panel).toHaveClass("min-w-0", "rounded-none", "bg-muted");
    expect(panel).not.toHaveClass("rounded-xl", "bg-card");
    expect(panel).not.toHaveAttribute("aria-describedby");
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(name);
    expect(container.querySelector('[data-slot="badge"]')).toHaveClass("h-auto", "whitespace-normal");
  });

  it("has no axe violations in representative populated and empty compositions", async () => {
    const { container, rerender } = render(<WorkspaceMembersPanel {...props} actions={<a href="/guide">Team guide</a>} />);
    expect((await axe(container)).violations).toEqual([]);
    rerender(<WorkspaceMembersPanel {...props} members={[]} />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("WorkspaceMembersExample", () => {
  it("exercises the real canonical Block with fictional local actions and stable focus", () => {
    render(<WorkspaceMembersExample />);
    expect(screen.getByText(/Fictional local example/)).toBeVisible();
    expect(screen.getByRole("link", { name: "Read UI setup" })).toHaveAttribute("href", "/docs/ui/installation");
    const button = screen.getByRole("button", { name: "View example details for Alex Morgan" });
    button.focus();
    fireEvent.click(button);
    expect(button).toHaveFocus();
    expect(screen.getByRole("status")).toHaveTextContent("Selected example member: Alex Morgan. No data was changed.");
    const disabled = screen.getByRole("button", { name: /View example details for Casey Park/ });
    expect(disabled).toBeDisabled();
    fireEvent.click(disabled);
    expect(screen.getByRole("status")).toHaveTextContent("Selected example member: Alex Morgan.");

    const state = screen.getByRole("combobox", { name: "Example state" });
    state.focus();
    fireEvent.change(state, { target: { value: "empty" } });
    expect(state).toHaveFocus();
    expect(screen.getByText("No example members")).toBeVisible();
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("No example member selected.");
    fireEvent.change(state, { target: { value: "populated" } });
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    const actions = screen.getByRole("checkbox", { name: "Show example actions" });
    actions.focus();
    fireEvent.click(actions);
    expect(actions).toHaveFocus();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("keeps repeated demos independent and their IDs unique", () => {
    const { container } = render(<><section aria-label="First demo"><WorkspaceMembersExample /></section><section aria-label="Second demo"><WorkspaceMembersExample /></section></>);
    const first = within(screen.getByRole("region", { name: "First demo" }));
    const second = within(screen.getByRole("region", { name: "Second demo" }));
    fireEvent.click(first.getByRole("button", { name: "View example details for Alex Morgan" }));
    expect(first.getByRole("status")).toHaveTextContent("Selected example member: Alex Morgan.");
    expect(second.getByRole("status")).toHaveTextContent("No example member selected.");
    const ids = Array.from(container.querySelectorAll("[id]"), (element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no axe violations in its initial state", async () => {
    const { container } = render(<WorkspaceMembersExample />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

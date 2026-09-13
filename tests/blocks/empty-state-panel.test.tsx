import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import { EmptyStatePanelExample } from "../../components/docs/blocks/empty-state-panel-example";
import { EmptyStatePanel } from "../../content/blocks/feedback/empty-state-panel/index";

const content = {
  id: "projects",
  heading: "Projects",
  title: "Start your first project",
  description: "Add a project when you are ready.",
};

describe("EmptyStatePanel", () => {
  it("composes a named section and coherent headings without a live region", () => {
    const { container } = render(<EmptyStatePanel {...content} />);
    const panel = screen.getByRole("region", { name: "Projects" });
    expect(within(panel).getByRole("heading", { level: 2 })).toHaveTextContent(
      "Projects",
    );
    expect(within(panel).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Start your first project",
    );
    expect(within(panel).getByText(content.description)).toBeVisible();
    expect(panel).toHaveAttribute("id", "projects");
    expect(container.querySelector("[aria-live]")).toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("keeps unique consumer IDs and heading associations across rerenders", () => {
    const first = <EmptyStatePanel {...content} />;
    const { container, rerender } = render(
      <>
        {first}
        <EmptyStatePanel {...content} id="reports" heading="Reports" />
      </>,
    );
    const ids = Array.from(container.querySelectorAll("[id]"), (el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const name of ["Projects", "Reports"]) {
      const region = screen.getByRole("region", { name });
      const heading = within(region).getByRole("heading", { level: 2 });
      expect(region).toHaveAttribute("aria-labelledby", heading.id);
    }
    rerender(
      <>
        <EmptyStatePanel {...content} id="reports" heading="Reports" />
        {first}
      </>,
    );
    expect(screen.getByRole("region", { name: "Projects" })).toHaveAttribute(
      "aria-labelledby",
      "projects-heading",
    );
  });

  it("preserves consumer controls, refs, callbacks, destinations and focus", () => {
    const onCreate = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();
    const actions = {
      primaryAction: (
        <button onClick={onCreate} ref={ref} type="button">
          Create project
        </button>
      ),
      secondaryAction: <a href="/project-guide">Read project guide</a>,
    };
    const { rerender } = render(<EmptyStatePanel {...content} {...actions} />);
    const button = screen.getByRole("button", { name: "Create project" });
    expect(ref.current).toBe(button);
    expect(onCreate).not.toHaveBeenCalled();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/project-guide");
    button.focus();
    fireEvent.click(button);
    expect(onCreate).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
    rerender(
      <EmptyStatePanel
        {...content}
        {...actions}
        title="Your workspace is empty"
      />,
    );
    expect(ref.current).toBe(button);
    expect(button).toHaveFocus();
    expect(onCreate).toHaveBeenCalledOnce();
  });

  it("keeps disabled actions disabled and never submits a surrounding form", () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <EmptyStatePanel
          {...content}
          primaryAction={
            <button disabled onClick={onClick} type="button">
              Unavailable
            </button>
          }
          secondaryAction={<button type="button">Read instructions</button>}
        />
      </form>,
    );
    const button = screen.getByRole("button", { name: "Unavailable" });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    fireEvent.click(screen.getByRole("button", { name: "Read instructions" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("leaves first-use and no-results transitions entirely to the consumer", () => {
    const clear = vi.fn();
    const { rerender } = render(<EmptyStatePanel {...content} />);
    rerender(
      <EmptyStatePanel
        {...content}
        title="No matching projects"
        primaryAction={
          <button onClick={clear} type="button">
            Clear filters
          </button>
        }
      />,
    );
    const button = screen.getByRole("button", { name: "Clear filters" });
    button.focus();
    fireEvent.click(button);
    expect(clear).toHaveBeenCalledOnce();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "No matching projects",
    );
    expect(button).toHaveFocus();
  });

  it.each([undefined, null, false, []])(
    "omits an absent action group (%s)",
    (action) => {
      const { container } = render(
        <EmptyStatePanel
          id="minimal"
          heading="Activity"
          title="No activity"
          primaryAction={action}
        />,
      );
      expect(
        container.querySelector('[data-slot="empty-state-panel-actions"]'),
      ).toBeNull();
      expect(container.querySelector("p")).toBeNull();
      expect(screen.queryByRole("button")).toBeNull();
    },
  );

  it("supports only a secondary action and removes the group when cleared", () => {
    const { container, rerender } = render(
      <EmptyStatePanel
        {...content}
        secondaryAction={<a href="/guide">Read the guide</a>}
      />,
    );
    expect(screen.getByRole("link", { name: "Read the guide" })).toBeVisible();
    rerender(<EmptyStatePanel {...content} />);
    expect(
      container.querySelector('[data-slot="empty-state-panel-actions"]'),
    ).toBeNull();
  });

  it("keeps decorative artwork out of the accessible tree", () => {
    render(
      <EmptyStatePanel
        {...content}
        icon={<svg role="img" aria-label="Decorative folder" />}
      />,
    );
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByRole("heading", { level: 3 })).toBeVisible();
  });

  it.each([
    ["polite", "status"],
    ["assertive", "alert"],
  ] as const)("delegates opt-in %s announcements once", (ariaLive, role) => {
    const { container, rerender } = render(
      <EmptyStatePanel {...content} ariaLive={ariaLive} />,
    );
    expect(screen.getByRole(role)).toHaveAttribute("aria-live", ariaLive);
    expect(container.querySelectorAll("[aria-live]")).toHaveLength(1);
    rerender(<EmptyStatePanel {...content} ariaLive="off" />);
    expect(container.querySelector("[aria-live]")).toBeNull();
  });

  it("preserves long content and gives consumer classes precedence", () => {
    const title = "Long project title ".repeat(20);
    render(
      <EmptyStatePanel
        {...content}
        title={title}
        className="rounded-none bg-muted"
      />,
    );
    const panel = screen.getByRole("region", { name: "Projects" });
    expect(panel).toHaveClass("rounded-none", "bg-muted", "min-w-0");
    expect(panel).not.toHaveClass("rounded-xl", "bg-card");
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(title);
  });

  it("has no axe violations for a representative composition", async () => {
    const { container } = render(
      <EmptyStatePanel
        {...content}
        primaryAction={<button type="button">Create project</button>}
        secondaryAction={<a href="/guide">Read project guide</a>}
      />,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("EmptyStatePanelExample", () => {
  it("demonstrates both local journeys and owns focus after replacement", () => {
    render(<EmptyStatePanelExample />);
    const scenario = screen.getByRole("combobox", { name: "Example scenario" });
    expect(screen.getByText(/Fictional local example/)).toBeVisible();
    expect(screen.getByRole("link", { name: "Read UI setup" })).toHaveAttribute(
      "href",
      "/docs/ui/installation",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Show sample project" }),
    );
    expect(
      screen.getByText("Launch checklist — fictional sample"),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Example projects" }),
    ).toHaveFocus();

    const reset = screen.getByRole("button", { name: "Reset example" });
    reset.focus();
    fireEvent.click(reset);
    expect(reset).toHaveFocus();
    expect(
      screen.queryByText("Launch checklist — fictional sample"),
    ).toBeNull();
    scenario.focus();
    fireEvent.change(scenario, { target: { value: "no-results" } });
    expect(scenario).toHaveFocus();
    expect(screen.getByText("No projects match your filters")).toBeVisible();
    fireEvent.click(
      screen.getByRole("button", { name: "Clear example filters" }),
    );
    expect(
      screen.getByText("Launch checklist — fictional sample"),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Example projects" }),
    ).toHaveFocus();
  });

  it("keeps repeated demos independent with unique IDs", () => {
    const { container } = render(
      <>
        <EmptyStatePanelExample />
        <EmptyStatePanelExample />
      </>,
    );
    const ids = Array.from(container.querySelectorAll("[id]"), (el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    fireEvent.click(
      screen.getAllByRole("button", { name: "Show sample project" })[0]!,
    );
    expect(
      screen.getAllByText("Launch checklist — fictional sample"),
    ).toHaveLength(1);
    expect(
      screen.getAllByRole("button", { name: "Show sample project" }),
    ).toHaveLength(1);
  });

  it("has no axe violations in the initial demonstration", async () => {
    const { container } = render(<EmptyStatePanelExample />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

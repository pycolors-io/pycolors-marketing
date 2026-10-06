import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { renderToString } from "react-dom/server";
import { SaasShowcase } from "../../components/marketing/showcase/saas-showcase";
import { showcaseProjects } from "../../components/marketing/showcase/showcase-fixtures";

const openProject = (name: string) =>
  screen.getByRole("button", { name: `Open ${name}` });
const filter = (name: string) =>
  fireEvent.mouseDown(screen.getByRole("tab", { name }), {
    button: 0,
    ctrlKey: false,
  });

function detail(name: string) {
  return screen.getByRole("region", { name });
}

describe("public Project readiness workspace", () => {
  it("explains workspace totals and exposes each project's review coverage", () => {
    render(<SaasShowcase />);
    const totals = screen.getByLabelText("Workspace totals");
    expect(
      within(totals).getByText("Projects").nextElementSibling,
    ).toHaveTextContent("3");
    expect(
      within(totals).getByText("Active").nextElementSibling,
    ).toHaveTextContent("2");
    expect(
      within(totals).getByText("In review").nextElementSibling,
    ).toHaveTextContent("1");
    expect(openProject("Customer portal")).toHaveAccessibleDescription(
      "1 of 3 reviewed",
    );
    expect(openProject("Team workspace")).toHaveAccessibleDescription(
      "2 of 3 reviewed",
    );
    filter("Active");
    expect(screen.getByText("2 shown")).toBeVisible();
    expect(
      within(screen.getByLabelText("Workspace totals")).getByText("Projects")
        .nextElementSibling,
    ).toHaveTextContent("3");
  });

  it("derives the next review area from the selected project's remaining work", () => {
    render(<SaasShowcase />);
    for (const [name, next, remaining] of [
      ["Customer portal", "Empty states", "2 remaining"],
      ["Team workspace", "Settings layout", "1 remaining"],
      ["Help center", "Navigation", "2 remaining"],
    ]) {
      fireEvent.click(openProject(name));
      const panel = detail(name);
      expect(panel).toHaveTextContent(remaining);
      expect(
        within(panel).getByText("Next area to review").parentElement,
      ).toHaveTextContent(next);
    }
    filter("Archived");
    expect(screen.queryByText("Next area to review")).not.toBeInTheDocument();
  });

  it("renders the approved deterministic projects and initial review without JavaScript", () => {
    const html = renderToString(<SaasShowcase />);
    for (const project of showcaseProjects)
      expect(html).toContain(project.name);
    expect(html).toContain("Selected project");
    expect(html).toContain("Synthetic demo data");
    render(<SaasShowcase />);
    expect(screen.getAllByRole("row")).toHaveLength(4);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    expect(openProject("Customer portal")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      within(detail("Customer portal")).getAllByText("Reviewed"),
    ).toHaveLength(1);
    expect(
      within(detail("Customer portal")).getAllByText("To review"),
    ).toHaveLength(2);
    expect(
      screen.getByText(/nothing is saved and no backend is connected/),
    ).toBeVisible();
  });

  it("selects real detail content and announces selection without moving focus", () => {
    render(<SaasShowcase />);
    const team = openProject("Team workspace");
    team.focus();
    fireEvent.click(team);
    expect(team).toHaveFocus();
    expect(team).toHaveAttribute("aria-pressed", "true");
    expect(openProject("Customer portal")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(detail("Team workspace")).toHaveAttribute(
      "id",
      team.getAttribute("aria-controls"),
    );
    expect(
      within(detail("Team workspace")).getAllByText("Reviewed"),
    ).toHaveLength(2);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Team workspace selected.",
    );
  });

  it("preserves a matching selection, falls back when filtered out, and restores All", () => {
    render(<SaasShowcase />);
    fireEvent.click(openProject("Team workspace"));
    filter("Active");
    expect(openProject("Team workspace")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.queryByRole("button", { name: "Open Help center" }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
    filter("All");
    fireEvent.click(openProject("Help center"));
    filter("Active");
    expect(openProject("Customer portal")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    filter("All");
    expect(openProject("Help center")).toBeVisible();
  });

  it("shows the archived empty state and recovers selection and focus", () => {
    render(<SaasShowcase />);
    filter("Archived");
    expect(screen.getByRole("tab", { name: "Archived" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "No archived projects" }),
    ).toBeVisible();
    expect(detail("No project selected")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Show all projects" }));
    expect(screen.getByRole("tab", { name: "All" })).toHaveFocus();
    expect(openProject("Customer portal")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("row")).toHaveLength(4);
  });

  it("keeps selection and focus when switching between table and board layouts", () => {
    render(<SaasShowcase />);
    fireEvent.click(openProject("Team workspace"));
    const board = screen.getByRole("button", { name: "Board" });
    board.focus();
    fireEvent.click(board);
    expect(board).toHaveFocus();
    expect(board).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Projects board" })).toBeVisible();
    expect(openProject("Team workspace")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(openProject("Team workspace")).toHaveAccessibleDescription(
      "2 of 3 areas reviewed",
    );
    const help = openProject("Help center");
    help.focus();
    fireEvent.click(help);
    expect(help).toHaveFocus();
    expect(detail("Help center")).toHaveAttribute(
      "id",
      help.getAttribute("aria-controls"),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Help center selected.",
    );
    const table = screen.getByRole("button", { name: "Table" });
    table.focus();
    fireEvent.click(table);
    expect(table).toHaveFocus();
    expect(screen.getByRole("table", { name: "Projects" })).toBeVisible();
    expect(
      screen.queryByRole("list", { name: "Projects board" }),
    ).not.toBeInTheDocument();
    expect(openProject("Help center")).toHaveAttribute("aria-pressed", "true");
  });

  it("filters board projects and preserves the layout after empty-state recovery", () => {
    render(<SaasShowcase />);
    fireEvent.click(screen.getByRole("button", { name: "Board" }));
    fireEvent.click(openProject("Help center"));
    filter("Active");
    const board = screen.getByRole("list", { name: "Projects board" });
    expect(within(board).getAllByRole("button")).toHaveLength(2);
    expect(within(board).getByText("No projects in this view.")).toBeVisible();
    expect(openProject("Customer portal")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    filter("Archived");
    expect(
      screen.queryByRole("list", { name: "Projects board" }),
    ).not.toBeInTheDocument();
    expect(detail("No project selected")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Show all projects" }));
    expect(screen.getByRole("tab", { name: "All" })).toHaveFocus();
    expect(screen.getByRole("button", { name: "Board" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      within(screen.getByRole("list", { name: "Projects board" })).getAllByRole(
        "button",
      ),
    ).toHaveLength(3);
    expect(openProject("Customer portal")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("supports Radix arrow/Home/End keyboard filtering", async () => {
    render(<SaasShowcase />);
    screen.getByRole("tab", { name: "All" }).focus();
    await act(async () => {
      fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    });
    await waitFor(() =>
      expect(screen.getByRole("tab", { name: "Active" })).toHaveFocus(),
    );
    expect(screen.getByRole("tab", { name: "Active" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await act(async () => {
      fireEvent.keyDown(document.activeElement!, { key: "End" });
    });
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: "No archived projects" }),
      ).toBeVisible(),
    );
    await act(async () => {
      fireEvent.keyDown(document.activeElement!, { key: "Home" });
    });
    await waitFor(() =>
      expect(screen.getByRole("tab", { name: "All" })).toHaveFocus(),
    );
    expect(openProject("Customer portal")).toBeVisible();
  });

  it("does not fetch or persist while exercising every state", () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const storage = vi.spyOn(Storage.prototype, "setItem");
    try {
      render(<SaasShowcase />);
      for (const project of showcaseProjects)
        fireEvent.click(openProject(project.name));
      fireEvent.click(screen.getByRole("button", { name: "Board" }));
      for (const project of showcaseProjects)
        fireEvent.click(openProject(project.name));
      filter("Active");
      filter("Archived");
      fireEvent.click(
        screen.getByRole("button", { name: "Show all projects" }),
      );
      expect(fetch).not.toHaveBeenCalled();
      expect(storage).not.toHaveBeenCalled();
    } finally {
      fetch.mockRestore();
      storage.mockRestore();
    }
  });

  it.each([
    ["Table", "All"],
    ["Table", "Active"],
    ["Table", "Archived"],
    ["Board", "All"],
    ["Board", "Active"],
    ["Board", "Archived"],
  ])(
    "has no automated accessibility violations in %s / %s",
    async (layout, name) => {
      const { container } = render(<SaasShowcase />);
      fireEvent.click(screen.getByRole("button", { name: layout }));
      filter(name);
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});

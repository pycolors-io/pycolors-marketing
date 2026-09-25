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

  it.each(["All", "Active", "Archived"])(
    "has no automated accessibility violations in %s",
    async (name) => {
      const { container } = render(<SaasShowcase />);
      filter(name);
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});

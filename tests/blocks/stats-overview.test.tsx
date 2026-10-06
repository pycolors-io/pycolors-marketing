import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
  StatsOverview,
  type OverviewMetric,
} from "../../content/blocks/data/stats-overview";

const metrics: readonly OverviewMetric[] = [
  {
    id: "projects",
    label: "Active projects",
    value: "24",
    change: { label: "Up 4 from August", tone: "positive" },
  },
  {
    id: "overdue",
    label: "Overdue tasks",
    value: "7",
    change: { label: "Up 3 from August", tone: "negative" },
    description: "Past their due date",
  },
  { id: "members", label: "Team members", value: "Unavailable" },
];

describe("StatsOverview", () => {
  it("associates metrics, values and comparison text without relying on color", () => {
    render(
      <StatsOverview
        id="stats"
        heading="Workspace overview"
        headingLevel={3}
        periodLabel="September 2026"
        metrics={metrics}
      />,
    );
    const region = screen.getByRole("region", { name: "Workspace overview" });
    expect(within(region).getByRole("heading", { level: 3 })).toBeVisible();
    expect(within(region).getByText("September 2026")).toBeVisible();
    for (const metric of metrics) {
      const term = within(region).getByText(metric.label, { selector: "dt" });
      expect(term.parentElement).toHaveTextContent(metric.value);
      if (metric.change)
        expect(term.parentElement).toHaveTextContent(metric.change.label);
    }
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("preserves metric identity on reorder and updates values", () => {
    const { rerender } = render(
      <StatsOverview id="stats" heading="Overview" metrics={metrics} />,
    );
    const original = screen.getByText("Active projects").parentElement;
    rerender(
      <StatsOverview
        id="stats"
        heading="Overview"
        metrics={[metrics[2], metrics[1], { ...metrics[0], value: "25" }]}
      />,
    );
    expect(screen.getByText("Active projects").parentElement).toBe(original);
    expect(original).toHaveTextContent("25");
  });

  it("handles empty content, consumer overrides and independent instances", async () => {
    const { container } = render(
      <>
        <StatsOverview
          id="empty"
          heading="Project metrics"
          metrics={[]}
          emptyMessage="Choose a reporting period."
          className="text-primary"
        />
        <StatsOverview
          id="other"
          heading="Team metrics"
          metrics={[metrics[2]]}
        />
      </>,
    );
    expect(screen.getByText("Choose a reporting period.")).toBeVisible();
    expect(screen.getByRole("region", { name: "Project metrics" })).toHaveClass(
      "text-primary",
    );
    expect(container.querySelectorAll("dl")).toHaveLength(1);
    expect(
      new Set([...container.querySelectorAll("[id]")].map((node) => node.id))
        .size,
    ).toBe(4);
    expect(
      await axe(container, { rules: { "color-contrast": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});

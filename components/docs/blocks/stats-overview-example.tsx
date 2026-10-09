import { StatsOverview } from "@/content/blocks/data/stats-overview";

export function StatsOverviewExample({
  headingLevel = 3,
}: Readonly<{ headingLevel?: 2 | 3 | 4 | 5 | 6 }>) {
  return (
    <StatsOverview
      id="demo-workspace-overview"
      heading="Workspace overview"
      headingLevel={headingLevel}
      description="A snapshot of your team's progress. Fictional demo data."
      periodLabel="September 1–30, 2026"
      metrics={[
        {
          id: "projects",
          label: "Active projects",
          value: "24",
          change: { label: "Up 4 from August", tone: "positive" },
          description: "Across all workspace teams",
        },
        {
          id: "members",
          label: "Team members",
          value: "12",
          change: { label: "Up 2 from August", tone: "neutral" },
          description: "Members with workspace access",
        },
        {
          id: "completion",
          label: "Tasks completed",
          value: "186",
          change: { label: "Up 18% from August", tone: "positive" },
          description: "Completed during September",
        },
        {
          id: "overdue",
          label: "Overdue tasks",
          value: "7",
          change: { label: "Up 3 from August", tone: "negative" },
          description: "Past their planned due date",
        },
      ]}
    />
  );
}

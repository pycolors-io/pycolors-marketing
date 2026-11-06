import { useCopy } from "@/lib/i18n/use-copy";
import { StatsOverview } from "@/content/blocks/data/stats-overview";

export function StatsOverviewExample({
  headingLevel = 3,
}: Readonly<{ headingLevel?: 2 | 3 | 4 | 5 | 6 }>) {
  const tSite = useCopy();

  return (
    <StatsOverview
      id="demo-workspace-overview"
      heading={tSite("Workspace overview")}
      headingLevel={headingLevel}
      description={tSite(
        "A snapshot of your team's progress. Fictional demo data.",
      )}
      periodLabel={tSite("September 1–30, 2026")}
      metrics={[
        {
          id: "projects",
          label: tSite("Active projects"),
          value: "24",
          change: { label: tSite("Up 4 from August"), tone: "positive" },
          description: tSite("Across all workspace teams"),
        },
        {
          id: "members",
          label: tSite("Team members"),
          value: "12",
          change: { label: tSite("Up 2 from August"), tone: "neutral" },
          description: tSite("Members with workspace access"),
        },
        {
          id: "completion",
          label: tSite("Tasks completed"),
          value: "186",
          change: { label: tSite("Up 18% from August"), tone: "positive" },
          description: tSite("Completed during September"),
        },
        {
          id: "overdue",
          label: tSite("Overdue tasks"),
          value: "7",
          change: { label: tSite("Up 3 from August"), tone: "negative" },
          description: tSite("Past their planned due date"),
        },
      ]}
    />
  );
}

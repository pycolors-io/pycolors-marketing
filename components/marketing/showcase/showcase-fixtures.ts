/** Marketing-owned interface review fixtures, not Starter or customer data. */
export const showcaseProjects = [
  {
    id: "customer-portal",
    name: "Customer portal",
    status: "Active",
    areas: [
      { name: "Navigation", reviewed: true },
      { name: "Empty states", reviewed: false },
      { name: "Settings layout", reviewed: false },
    ],
  },
  {
    id: "team-workspace",
    name: "Team workspace",
    status: "Active",
    areas: [
      { name: "Navigation", reviewed: true },
      { name: "Empty states", reviewed: true },
      { name: "Settings layout", reviewed: false },
    ],
  },
  {
    id: "help-center",
    name: "Help center",
    status: "Review",
    areas: [
      { name: "Navigation", reviewed: false },
      { name: "Empty states", reviewed: false },
      { name: "Settings layout", reviewed: true },
    ],
  },
] as const;

export type ShowcaseProjectId = (typeof showcaseProjects)[number]["id"];
export type ShowcaseFilter = "all" | "active" | "archived";

export function projectsForFilter(filter: ShowcaseFilter) {
  return showcaseProjects.filter(
    (project) =>
      filter === "all" || (filter === "active" && project.status === "Active"),
  );
}

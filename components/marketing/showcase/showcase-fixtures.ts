/** Marketing-owned interface review fixtures, not Starter or customer data. */
export const showcaseProjects = [
  {
    id: "customer-portal",
    name: "Customer portal",
    status: "Active",
    description:
      "An account area for customers to navigate their workspace and manage settings.",
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
    description:
      "A shared workspace for teams to find projects and keep their settings organized.",
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
    description:
      "A self-service help experience with clear navigation and useful empty states.",
    areas: [
      { name: "Navigation", reviewed: false },
      { name: "Empty states", reviewed: false },
      { name: "Settings layout", reviewed: true },
    ],
  },
] as const;

export const showcaseAreaDescriptions = {
  Navigation:
    "Check how people find key screens and return to their workspace.",
  "Empty states": "Check that empty views explain what to do next.",
  "Settings layout":
    "Check that related controls are grouped and clearly labelled.",
} as const;

export type ShowcaseProjectId = (typeof showcaseProjects)[number]["id"];
export type ShowcaseFilter = "all" | "active" | "archived";

export function projectsForFilter(filter: ShowcaseFilter) {
  return showcaseProjects.filter(
    (project) =>
      filter === "all" || (filter === "active" && project.status === "Active"),
  );
}

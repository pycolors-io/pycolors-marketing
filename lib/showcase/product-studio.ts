/** PyColors-owned reference, using the existing demo fixtures. No customer evidence. */
export const productStudio = {
  name: "Product studio",
  href: "/showcase/product-studio",
  label: "Reference implementation by PyColors",
  disclosure:
    "Built by PyColors with Starter Pro. Fictional projects, people and activity; this is a reference implementation, not a customer success story.",
  summary:
    "A shared workspace for planning a product release, assigning work and keeping review notes with the task.",
  images: {
    dashboard: {
      light: "/images/showcase/product-studio/dashboard-light.png",
      dark: "/images/showcase/product-studio/dashboard-dark.png",
      alt: "Product studio dashboard with fictional projects, workspace activity and a project creation chart",
    },
    project: {
      light: "/images/showcase/product-studio/project-light.png",
      dark: "/images/showcase/product-studio/project-dark.png",
      alt: "Launch checklist project with fictional assigned tasks, due dates and a task discussion",
    },
  },
  workflow: [
    {
      title: "Define the work",
      task: "Define acceptance criteria",
      description:
        "Give the project a description and an owner. Record the expected outcome in the first task and mark it complete when the scope is agreed.",
    },
    {
      title: "Coordinate delivery",
      task: "Build the first delivery",
      description:
        "Assign a workspace member, set a due date and move the task into progress. Keep implementation notes in its discussion.",
    },
    {
      title: "Review the release",
      task: "Review and prepare release",
      description:
        "Record review notes before completing the task. Update the project status separately and archive it when the work is finished.",
    },
  ],
} as const;

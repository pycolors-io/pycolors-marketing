// Navigation metadata only; Block implementations remain in content/blocks.
export const BLOCKS_CATALOG = [
  {
    id: "app-shells/responsive-sidebar",
    title: "Responsive sidebar",
    category: "Application shells",
    description:
      "An application shell with desktop navigation, a mobile Sheet and a consumer-owned router adapter. Keep your brand, navigation and page content in your application.",
    href: "/docs/blocks/app-shells/responsive-sidebar",
  },
  {
    id: "data/data-table",
    title: "Data table",
    category: "Data & records",
    description:
      "Typed columns, loading, empty and error states, optional row actions and controlled pagination. Add a next step to an empty table without handing over your data layer.",
    href: "/docs/blocks/data/data-table",
  },
  {
    id: "account/settings-panel",
    title: "Settings panel",
    category: "Account & workspace",
    description:
      "A controlled settings form with labelled fields, validation messages and submission feedback. Your application owns values, validation and persistence.",
    href: "/docs/blocks/account/settings-panel",
  },
  {
    id: "commerce/pricing-plans",
    title: "Pricing plans",
    category: "Commerce",
    description:
      "Compare offers with clear prices, billing terms, features and consumer-owned actions. Request a billing-period change without handing over pricing or payment logic.",
    href: "/docs/blocks/commerce/pricing-plans",
  },
  {
    id: "feedback/empty-state-panel",
    title: "Empty state panel",
    category: "Feedback & states",
    description:
      "Give an empty section a clear next step, from first use to no matching results. Keep content, native actions, state and focus under your application's control.",
    href: "/docs/blocks/feedback/empty-state-panel",
  },
  {
    id: "account/workspace-members",
    title: "Workspace members",
    category: "Account & workspace",
    description:
      "Present workspace members with readable role and status labels and native actions. Keep identities, permissions, member changes and focus under your application's control.",
    href: "/docs/blocks/account/workspace-members",
  },
] as const;

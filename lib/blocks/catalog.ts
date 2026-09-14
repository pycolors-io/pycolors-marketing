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
    id: "auth/sign-in",
    title: "Sign in",
    category: "Authentication",
    description:
      "Present credentials, provider actions, errors and recovery links without moving authentication state or session behavior into the Block.",
    href: "/docs/blocks/auth/sign-in",
  },
  {
    id: "auth/sign-up",
    title: "Sign up",
    category: "Authentication",
    description:
      "Compose account creation, provider actions and consent copy while keeping validation, account persistence and authentication consumer-owned.",
    href: "/docs/blocks/auth/sign-up",
  },
  {
    id: "auth/password-recovery",
    title: "Password recovery",
    category: "Authentication",
    description:
      "Present a recovery form, status, errors and help content while your application owns reset tokens, email delivery and password updates.",
    href: "/docs/blocks/auth/password-recovery",
  },
  {
    id: "data/data-table",
    title: "Data table",
    category: "Data & records",
    description:
      "Search, filter, sort and paginate records with a clear path out of empty results. Reuse controlled query and page-size controls while keeping your data layer and row actions.",
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
    id: "commerce/billing-overview",
    title: "Billing overview",
    category: "Commerce",
    description:
      "Summarize plan, billing cadence, status, renewal and payment details while your application remains the source of truth for billing state and actions.",
    href: "/docs/blocks/commerce/billing-overview",
  },
  {
    id: "commerce/payment-method",
    title: "Payment method",
    category: "Commerce",
    description:
      "Present a payment method, expiry, billing contact and status with consumer-owned actions and no hidden provider or payment mutation behavior.",
    href: "/docs/blocks/commerce/payment-method",
  },
  {
    id: "commerce/invoice-history",
    title: "Invoice history",
    category: "Commerce",
    description:
      "Show invoice dates, amounts, statuses and row actions in a readable table while retrieval, documents and authorization stay application-owned.",
    href: "/docs/blocks/commerce/invoice-history",
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
  {
    id: "account/workspace-invitations",
    title: "Workspace invitations",
    category: "Account & workspace",
    description:
      "Present invitation recipients, roles, status, sent and expiry dates with consumer-owned actions while delivery, tokens and membership mutations remain application-owned.",
    href: "/docs/blocks/account/workspace-invitations",
  },
  {
    id: "account/audit-log",
    title: "Audit log",
    category: "Account & workspace",
    description:
      "Present ordered workspace activity, timestamps, details, filters and actions while event collection, retention, permissions and audit integrity remain application-owned.",
    href: "/docs/blocks/account/audit-log",
  },
] as const;

// Service engagements use a written quote, independently of source checkout.
export const STARTER_PRO_SERVICES = {
  setup: {
    id: "guided-setup",
    title: "Guided setup",
    priceLabel: "From 3,000 €",
    description:
      "A defined starting point for your team, built on the complete Starter Pro foundation.",
    features: [
      "Branding and provider configuration for an agreed environment",
      "Validation of a sign-in, workspace and project journey",
      "Configuration notes and a handover session",
    ],
    scope:
      "Initial setup with agreed acceptance checks. Business-specific features and ongoing operations are scoped separately.",
    action: "Request a setup quote",
  },
  adaptation: {
    id: "business-adaptation",
    title: "Business adaptation",
    priceLabel: "From 5,000 €",
    description:
      "Adapt the shared foundation to a named workflow, integration or product requirement.",
    features: [
      "A workflow with written deliverables and acceptance criteria",
      "Agreed interface, data and integration changes",
      "Validation, operating notes and a documented handover",
    ],
    scope:
      "Quoted by complexity and scope. Larger engagements can exceed 10,000 €; ongoing operation requires its own agreement.",
    action: "Discuss a business adaptation",
  },
} as const;

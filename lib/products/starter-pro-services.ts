// Service engagements use a written quote, independently of source checkout.
export const STARTER_PRO_SERVICES = {
  setup: {
    id: "guided-setup",
    title: "Guided setup",
    priceLabel: "From 3,000 €",
    href: "/request-a-quote?service=guided-setup",
    description:
      "Configure one agreed environment, connect your providers and verify the first user journey.",
    highlights: [
      "Branding, sign-in, email and billing configuration",
      "Account, workspace and project checks",
      "Operating notes and a handover session",
    ],
    features: [
      "A discovery brief and setup checklist for one agreed environment",
      "Branding and configuration of your email, sign-in and billing providers",
      "Validation of an agreed account, workspace and project journey",
      "Readiness checks and operating notes for your team",
      "A handover session with follow-up defined in the quote",
    ],
    deliverable:
      "A configured environment, validation checklist and handover notes.",
    scope:
      "Business-specific development, existing customer-data migrations, hosting and ongoing operation are quoted separately.",
    action: "Request a setup quote",
  },
  adaptation: {
    id: "business-adaptation",
    title: "Business adaptation",
    priceLabel: "From 7,500 €",
    href: "/request-a-quote?service=business-adaptation",
    description:
      "Implement a defined business workflow or integration, with written acceptance criteria and validation.",
    highlights: [
      "Agreed interface, API and data model changes",
      "Permissions and regression checks",
      "Recorded validation and documented handover",
    ],
    features: [
      "Discovery and written acceptance criteria for a prioritized workflow",
      "Agreed interface, API, data model and integration changes",
      "Permission checks and regressions for the new workflow",
      "Validation in an agreed environment with recorded results",
      "A documented handover and explicitly scoped follow-up",
    ],
    deliverable:
      "An implemented workflow, validation results and handover notes.",
    scope:
      "The quote defines the workflow and integration boundaries. Larger engagements can exceed 10,000 €; hosting and ongoing operation are separate.",
    action: "Discuss a business adaptation",
  },
} as const;

interface BuyerFaq {
  readonly question: string;
  readonly answer: string;
  readonly links: readonly {
    readonly href: string;
    readonly label: string;
  }[];
}

// Keep offer, license, support, and delivery policy in their existing sources.
// These answers explain the next buyer action; they do not define new terms.
export const starterProBuyerFaqs = [
  {
    question: "What should I prepare before local setup?",
    answer:
      "Review the Node.js and pnpm requirements in your downloaded release, prepare a local PostgreSQL database, and follow the environment guide for the integrations you want to test. Buying the source code does not provision your database, email sender, OAuth apps, or Stripe account.",
    links: [
      {
        href: "/docs/starter-pro/getting-started",
        label: "Review setup prerequisites",
      },
      {
        href: "/docs/starter-pro/environment-variables",
        label: "Review environment configuration",
      },
    ],
  },
  {
    question: "How long before I can start?",
    answer:
      "After payment, use the secure link in your claim email to download and unzip Starter Pro, then follow Getting started. Payment confirmation and email delivery are separate steps. The first 30 minutes guide provides suggested checkpoints, not a setup-time or email-delivery guarantee.",
    links: [
      {
        href: "/docs/starter-pro/getting-started",
        label: "Follow the first-session guide",
      },
    ],
  },
  {
    question: "What happens after payment?",
    answer:
      "Stripe redirects you to the confirmation flow. Once payment is confirmed and delivery is processed, use the access link sent to the checkout email to download the ZIP. If payment is uncertain, contact purchase support before paying again; recovery does not complete an unpaid checkout.",
    links: [
      {
        href: "/docs/starter-pro/delivery",
        label: "Review delivery and access",
      },
      {
        href: "/orders/support",
        label: "Contact purchase support",
      },
    ],
  },
  {
    question: "Do I own the source code?",
    answer:
      "Starter Pro includes the full source code under a commercial license. You may inspect and modify it for your own personal or commercial applications.",
    links: [{ href: "/license", label: "Read the authoritative license" }],
  },
  {
    question: "Can I use it commercially?",
    answer:
      "Yes. Starter Pro includes commercial usage rights under the PyColors license.",
    links: [{ href: "/license", label: "Review commercial usage terms" }],
  },
  {
    question: "Can I use it for client projects?",
    answer:
      "Use is permitted for personal and commercial applications. Review the repository license for the authoritative client-work and source-access terms.",
    links: [
      { href: "/license", label: "Review client-work and source-access terms" },
    ],
  },
  {
    question: "Can I customize everything?",
    answer:
      "You may modify the source for your own products, including the UI, routes, copy, branding, product logic, and domain models.",
    links: [
      {
        href: "/docs/starter-pro/what-is-included",
        label: "Inspect the included foundation",
      },
    ],
  },
  {
    question: "What will I still need to build?",
    answer:
      "Your unique product logic, AI features, business workflows, branding, and domain models. Starter Pro provides the production foundation.",
    links: [
      {
        href: "/docs/starter-pro/what-is-included",
        label: "Review included scope and boundaries",
      },
    ],
  },
  {
    question: "Is Starter Pro production-ready?",
    answer:
      "Starter Pro provides auth, billing, protected routes, database foundations, and launch-oriented product surfaces. You still need to configure your own environment and providers, validate the integrations, and complete the production checklist. A local first run is not a production launch, and buying the source code does not deploy or operate your SaaS.",
    links: [
      {
        href: "/docs/starter-pro/production-checklist",
        label: "Review the production checklist",
      },
      {
        href: "/docs/starter-pro/deployment",
        label: "Review deployment responsibilities",
      },
    ],
  },
  {
    question: "Is Stripe already integrated?",
    answer:
      "Stripe Checkout, customer portal, invoices, webhooks, and subscription lifecycle flows are included. You still configure your own Stripe environment and validate billing in test mode before using production credentials. A rendered billing page alone does not validate payments.",
    links: [
      {
        href: "/docs/starter-pro/billing",
        label: "Review billing configuration",
      },
      {
        href: "/docs/starter-pro/billing-testing",
        label: "Follow billing test scenarios",
      },
    ],
  },
  {
    question: "Do I get future Starter Pro updates?",
    answer:
      "Future Starter Pro updates are included at no additional cost for existing buyers, subject to continued product availability.",
    links: [{ href: "/changelog", label: "Review release history" }],
  },
  {
    question: "What if local setup fails?",
    answer:
      "Start with the setup and environment documentation. Purchase and access-recovery support is available. No response-time SLA is promised.",
    links: [
      {
        href: "/docs/starter-pro/local-development",
        label: "Check local development setup",
      },
      {
        href: "/docs/starter-pro/getting-started",
        label: "Find the last successful setup checkpoint",
      },
    ],
  },
  {
    question: "What if I do not receive my purchase email?",
    answer:
      "Check spam, then use purchase recovery with the checkout email. The confirmation does not prove an email arrived. If recovery still fails, contact support@pycolors.com with your purchase email and product name before buying again.",
    links: [
      { href: "/orders/recover", label: "Recover purchase access" },
      {
        href: "/docs/starter-pro/purchase-recovery",
        label: "Troubleshoot missing or expired access",
      },
      { href: "/orders/support", label: "Contact purchase support" },
    ],
  },
  {
    question: "What is the refund policy?",
    answer:
      "Starter Pro is a digital product delivered through a claim email after purchase. Refunds may be limited unless required by applicable law. Review the terms before purchase.",
    links: [{ href: "/terms", label: "Read the terms before purchase" }],
  },
] as const satisfies readonly BuyerFaq[];

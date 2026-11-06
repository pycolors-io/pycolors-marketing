import { STARTER_PRO_SERVICES } from "./starter-pro-services";

export const CUSTOM_SOFTWARE_SERVICE = {
  id: "custom-product",
  title: "Custom software",
  priceLabel: "Scoped proposal",
  href: "/request-a-quote?service=custom-product",
  description:
    "A SaaS application, dashboard or business tool shaped around your users and workflows.",
  deliverable:
    "An agreed product scope, implemented workflows, validation results and a documented handover.",
  action: "Describe your project",
  example: { href: "/showcase/product-studio" },
} as const;

/** Enquiries include custom projects; Starter Pro price cards retain their two engagements. */
export const QUOTE_SERVICES = [
  CUSTOM_SOFTWARE_SERVICE,
  ...Object.values(STARTER_PRO_SERVICES),
] as const;

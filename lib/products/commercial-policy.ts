// Shared buyer-facing summaries. Keep these aligned with the product LICENSE
// files, /license and /terms whenever the commercial offer changes.
export const LEGAL_REVISION = {
  date: "2026-11-05",
  label: "November 5, 2026",
} as const;

export const LEGAL_CONTACT_EMAIL = "contact@pycolors.com";

// Public company identifiers checked against the official enterprise API and
// VIES on 2026-11-05. Keep private tax records and contact data out of this file.
export const LEGAL_COMPANY = {
  name: "Py Colors SASU",
  email: LEGAL_CONTACT_EMAIL,
  addressLine1: "6 rue d’Armaillé",
  postalCode: "75017 Paris",
  country: "France",
  siren: "918 239 864",
  siret: "918 239 864 00013",
  registration: "918 239 864 RCS Paris",
  vatNumber: "FR17918239864",
} as const;

export const NA_AI_USAGE_SUMMARY =
  "One NA-AI Landing purchase permits unlimited personal, commercial, and client end products. You may customize and deploy the template, but may not resell, redistribute, or publish the template source as a standalone product.";

export const STARTER_PRO_USAGE_SUMMARY =
  "One Starter Pro license covers one individual or legal entity and unlimited end products. Team members within the licensed organization may use the source. Client applications are permitted; a client needs their own license to access the Starter Pro source code.";

export const STARTER_PRO_UPDATES_SUMMARY =
  "Future Starter Pro updates are included at no additional cost for existing buyers, subject to continued product availability.";

export const PURCHASE_SUPPORT_SUMMARY =
  "Email support covers purchase access, recovery, product scope, and setup questions on a reasonable-effort basis. No response-time SLA is promised. Custom development, deployment, consulting, and ongoing operation of your product are not included.";

export const DIGITAL_REFUND_SUMMARY =
  "Digital delivery does not automatically remove consumer withdrawal or conformity rights. Eligibility depends on applicable law and any valid digital-content consent. Read the terms for withdrawal conditions and how to request a refund or report a product problem.";

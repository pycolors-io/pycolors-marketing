/** Informational preview only; no saleable product, checkout or entitlement. */
export const STARTER_PRO_MOBILE_PREVIEW = {
  name: "Starter Pro Mobile",
  href: "/starters/mobile",
  status: "Coming soon",
  stack: "React Native · Expo",
  priceLabel: "249 €",
  priceQualifier: "Proposed extension",
  description:
    "A proposed native extension for Starter Pro, built with React Native and Expo. Final scope, availability and terms are to be announced.",
  action: "Explore Starter Pro Mobile",
  bundle: {
    name: "Starter Pro Fullstack",
    stack: "Web + Mobile + shared API",
    href: "/starters/mobile#platforms",
    action: "Explore Starter Pro Fullstack",
    status: "Coming soon",
    priceLabel: "499 €",
    priceQualifier: "Bundle to test",
    description:
      "A proposed bundle for Web, Mobile and a shared API. Final scope, availability and terms will be announced before sale.",
  },
} as const;

import { PRODUCT_DISPLAY } from "./public-catalog";

/** Buyer-facing scope. The commerce API validates availability and prices. */
export const STARTER_PRO_MOBILE_PREVIEW = {
  ...PRODUCT_DISPLAY["starter-pro-mobile"],
  status: "Source licence",
  stack: "React Native · Expo",
  priceQualifier: "One-time payment · VAT included",
  description:
    "Native iOS and Android source with a compatible backend, configuration, database schema and setup guides. No Web purchase is required.",
  action: "Explore Starter Pro Mobile",
  bundle: {
    ...PRODUCT_DISPLAY["starter-pro-fullstack"],
    stack: "Web + Mobile + shared API",
    action: "Explore Starter Pro Fullstack",
    status: "Source licence",
    priceQualifier: "One-time payment · VAT included",
    description:
      "Web, native iOS and Android, and a shared API source. Use the same accounts and data across your Web and Mobile applications.",
  },
} as const;

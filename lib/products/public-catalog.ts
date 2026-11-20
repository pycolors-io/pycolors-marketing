import { PRODUCT_DISPLAY as SOURCE_PRODUCTS } from "./public-catalog.generated";
export {
  COMMERCE_TERMS_VERSION,
  STARTER_FREE_PRICE_LABEL,
  UPGRADE_DISPLAY,
} from "./public-catalog.generated";

// Route metadata is app-owned; prices and names come from the canonical snapshot.
export const PRODUCT_DISPLAY = {
  "starter-pro": {
    ...SOURCE_PRODUCTS["starter-pro"],
    href: "/starters/pro",
    docsHref: "/docs/starter-pro/getting-started",
  },
  "starter-pro-mobile": {
    ...SOURCE_PRODUCTS["starter-pro-mobile"],
    href: "/starters/mobile",
    docsHref: "/docs/starter-pro/mobile",
  },
  "starter-pro-fullstack": {
    ...SOURCE_PRODUCTS["starter-pro-fullstack"],
    href: "/starters/fullstack",
    docsHref: "/docs/starter-pro/fullstack",
  },
  "na-ai-landing": {
    ...SOURCE_PRODUCTS["na-ai-landing"],
    href: "/templates/na-ai-landing",
    docsHref: "/templates/na-ai-landing",
  },
} as const;

export type PublicProductSlug = keyof typeof PRODUCT_DISPLAY;
export type PublicProductDisplay = (typeof PRODUCT_DISPLAY)[PublicProductSlug];

export function getPublicProduct(slug: string | null | undefined) {
  return slug && Object.hasOwn(PRODUCT_DISPLAY, slug)
    ? PRODUCT_DISPLAY[slug as PublicProductSlug]
    : undefined;
}

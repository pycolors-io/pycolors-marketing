export const PRODUCT_DISPLAY = {
  'starter-pro': {
    slug: 'starter-pro',
    name: 'PyColors Starter Pro',
    price: '199',
    currency: 'EUR',
    priceLabel: '199 €',
    regularPriceLabel: '299 €',
  },

  'na-ai-landing': {
    slug: 'na-ai-landing',
    name: 'NA-AI — AI Analytics Landing Page',
    price: '49',
    currency: 'EUR',
    priceLabel: '49 €',
    regularPriceLabel: '79 €',
  },
} as const;

export const STARTER_FREE_PRICE_LABEL = 'Free' as const;

export type PublicProductSlug = keyof typeof PRODUCT_DISPLAY;
export type PublicProductDisplay =
  (typeof PRODUCT_DISPLAY)[PublicProductSlug];

import type {
  BaseLayoutProps,
  LinkItemType,
} from 'fumadocs-ui/layouts/shared';
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from '@pycolors/core-config/products/public-catalog';

export type PrimaryNavItem = {
  label: string;
  href: string;
};

export type ProductMenuGroupItem = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type ProductMenuGroup = {
  title: string;
  items: ProductMenuGroupItem[];
};

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
];

export const PRODUCT_MENU_GROUPS: ProductMenuGroup[] = [
  {
    title: 'Starters',
    items: [
      {
        label: 'Starter Pro',
        href: '/starters/pro',
        description: 'Launch with auth and billing',
        badge: PRODUCT_DISPLAY['starter-pro'].priceLabel,
      },
      {
        label: 'Starter Free',
        href: '/starters/free',
        description: 'Validate product UX fast',
        badge: STARTER_FREE_PRICE_LABEL,
      },
      {
        label: 'Compare Starters',
        href: '/starters',
        description: 'Choose the right SaaS foundation',
      },
    ],
  },
  {
    title: 'Templates',
    items: [
      {
        label: 'All templates',
        href: '/templates',
        description: 'Browse premium Next.js templates',
      },
      {
        label: 'NA-AI Landing',
        href: '/templates/na-ai-landing',
        description: 'AI/SaaS landing page template',
        badge: PRODUCT_DISPLAY['na-ai-landing'].priceLabel,
      },
    ],
  },
  {
    title: 'UI system',
    items: [
      {
        label: 'UI Library',
        href: '/ui',
        description: 'Production-ready primitives',
      },
      {
        label: 'Patterns',
        href: '/ui/patterns',
        description: 'SaaS product patterns',
      },
      {
        label: 'Examples',
        href: '/ui/examples',
        description: 'See components in context',
      },
    ],
  },
];

/**
 * Optional: if we later re-enable Fumadocs built-in navigation.
 */
export const layoutLinks: LinkItemType[] = PRIMARY_NAV_ITEMS.map(
  (item) => ({
    type: 'main',
    text: item.label,
    url: item.href,
    active: 'nested-url',
  }),
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: false,
      transparentMode: 'none',
    },
    searchToggle: { enabled: false },
    themeSwitch: { enabled: false },
  };
}

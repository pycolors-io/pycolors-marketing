import type {
  BaseLayoutProps,
  LinkItemType,
} from 'fumadocs-ui/layouts/shared';

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
  { label: 'Products', href: '/products' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
];

export const PRODUCT_MENU_GROUPS: ProductMenuGroup[] = [
  {
    title: 'Starters',
    items: [
      {
        label: 'Compare Starters',
        href: '/starters',
      },
      {
        label: 'Starter Free',
        href: '/starters/free',
        // badge: 'Free',
      },
      {
        label: 'Starter Pro',
        href: '/starters/pro',
        // badge: 'Pro',
      },
    ],
  },
  {
    title: 'UI system',
    items: [
      {
        label: 'UI Library',
        href: '/ui',
      },
      {
        label: 'Patterns',
        href: '/ui/patterns',
      },
      {
        label: 'Examples',
        href: '/ui/examples',
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
    // links: layoutLinks,
  };
}

import type {
  BaseLayoutProps,
  LinkItemType,
} from 'fumadocs-ui/layouts/shared';

export type PrimaryNavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { label: 'UI', href: '/ui' },
  { label: 'Templates', href: '/templates' },
  { label: 'Starters', href: '/starters' },
  { label: 'Documentation', href: '/docs' },
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

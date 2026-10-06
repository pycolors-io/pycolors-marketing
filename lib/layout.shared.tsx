import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import {
  Boxes,
  Layers3,
  LayoutTemplate,
  Package2,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";

export type PrimaryNavItem = {
  label: string;
  href: string;
};

export type ProductMenuGroupItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  documentation: {
    href: string;
    description: string;
    label?: string;
  };
};

export type ProductMenuGroup = {
  title: string;
  items: ProductMenuGroupItem[];
};

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Theme Builder", href: "/tools/theme-builder" },
  { label: "Guides", href: "/guides" },
  { label: "Blog", href: "/blog" },
];

export const PRODUCT_MENU_GROUPS: ProductMenuGroup[] = [
  {
    title: "Build your interface",
    items: [
      {
        label: "UI Library",
        href: "/ui",
        description: "React primitives for your product interface.",
        icon: Package2,
        documentation: {
          href: "/docs/ui",
          description: "Install and use React primitives.",
        },
      },
      {
        label: "Blocks",
        href: "/blocks",
        description: "Preview and copy application patterns.",
        icon: Boxes,
        documentation: {
          href: "/docs/blocks",
          description: "Compose application screens and flows.",
        },
      },
    ],
  },
  {
    title: "Start your application",
    items: [
      {
        label: "Starter Free",
        href: "/starters/free",
        description: "Explore SaaS screens with mocked auth and billing.",
        icon: Layers3,
        badge: STARTER_FREE_PRICE_LABEL,
        documentation: {
          href: "/docs/starter",
          description: "Set up the frontend SaaS starter.",
        },
      },
      {
        label: PRODUCT_DISPLAY["starter-pro"].name,
        href: "/starters/pro",
        description:
          "Auth.js and Stripe foundations to configure for your SaaS.",
        icon: Rocket,
        badge: PRODUCT_DISPLAY["starter-pro"].priceLabel,
        documentation: {
          label: "Starter Pro",
          href: "/docs/starter-pro",
          description: "Configure auth, billing and backend services.",
        },
      },
    ],
  },
  {
    title: "Design and launch",
    items: [
      {
        label: "Theme Builder",
        href: "/tools/theme-builder",
        description: "Generate and preview light and dark CSS tokens.",
        icon: Sparkles,
        documentation: {
          label: "Design system",
          href: "/docs/design-system",
          description: "Understand colors, tokens and themes.",
        },
      },
      {
        label: PRODUCT_DISPLAY["na-ai-landing"].name,
        href: "/templates/na-ai-landing",
        description:
          "A Next.js landing page template for AI and SaaS products.",
        icon: LayoutTemplate,
        badge: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
        documentation: {
          label: "NA-AI Landing",
          href: "/docs/templates/na-ai-landing",
          description: "Customize and deploy your landing page.",
        },
      },
    ],
  },
];

export const DOCS_MENU_GROUPS = PRODUCT_MENU_GROUPS.map((group) => ({
  title: group.title,
  items: group.items.map((item) => ({
    label: item.documentation.label ?? item.label,
    href: item.documentation.href,
    description: item.documentation.description,
    icon: item.icon,
  })),
}));

export const PRODUCT_MENU_SECONDARY_ITEMS: PrimaryNavItem[] = [
  { label: "Compare Starters", href: "/starters" },
  { label: "All templates", href: "/templates" },
  { label: "UI examples", href: "/ui/examples" },
  { label: "Pricing", href: "/pricing" },
];

// Primary destinations already listed as products/secondary links need no
// duplicate mobile entry. Documentation-specific links are supplied by callers.
export const RESOURCE_NAV_ITEMS: PrimaryNavItem[] = [
  ...PRIMARY_NAV_ITEMS.filter(
    (item) =>
      ![
        ...PRODUCT_MENU_GROUPS.flatMap((group) => group.items),
        ...PRODUCT_MENU_SECONDARY_ITEMS,
      ].some((product) => product.href === item.href),
  ),
  { label: "Changelog", href: "/changelog" },
  { label: "GitHub", href: "https://github.com/pycolors" },
];

/**
 * Optional: if we later re-enable Fumadocs built-in navigation.
 */
export const layoutLinks: LinkItemType[] = PRIMARY_NAV_ITEMS.map((item) => ({
  type: "main",
  text: item.label,
  url: item.href,
  active: "nested-url",
}));

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: false,
      transparentMode: "none",
    },
    searchToggle: { enabled: false },
    themeSwitch: { enabled: false },
  };
}

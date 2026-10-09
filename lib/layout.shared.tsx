import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import {
  Boxes,
  BookOpen,
  History,
  Layers3,
  LayoutTemplate,
  Package2,
  PanelsTopLeft,
  Newspaper,
  Map,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { UI_EXPLORER_URL } from "@/lib/docs/ui-explorer";
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

export type PrimaryMenu = "products" | "resources";

export const PRIMARY_NAV_ITEMS: (
  PrimaryNavItem | { label: string; menu: PrimaryMenu }
)[] = [
  { label: "Products", menu: "products" },
  { label: "Docs", href: "/docs" },
  { label: "Resources", menu: "resources" },
  { label: "Pricing", href: "/pricing" },
];

const PRODUCT_FAMILIES: ProductMenuGroup[] = [
  {
    title: "Build your interface",
    items: [
      {
        label: "UI Library",
        href: "/ui",
        description: "React primitives for your interface.",
        icon: Package2,
        documentation: {
          href: "/docs/ui",
          description: "Install and use React primitives.",
        },
      },
      {
        label: "Blocks",
        href: "/blocks",
        description: "Reusable application patterns.",
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
        description: "SaaS screens with mocked flows.",
        icon: Layers3,
        badge: STARTER_FREE_PRICE_LABEL,
        documentation: {
          href: "/docs/starter",
          description: "Set up the frontend SaaS starter.",
        },
      },
      {
        label: "Starter Pro",
        href: "/starters/pro",
        description: "Auth.js and Stripe foundations.",
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
        description: "Preview and export color tokens.",
        icon: Sparkles,
        documentation: {
          label: "Design system",
          href: "/docs/design-system",
          description: "Understand colors, tokens and themes.",
        },
      },
      {
        label: "NA-AI Landing",
        href: "/templates/na-ai-landing",
        description: "Landing page for AI and SaaS.",
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

// The shared global menu groups products by starting point in both contexts.
const products = PRODUCT_FAMILIES.flatMap((group) => group.items);

export const PRODUCT_MENU_GROUPS: ProductMenuGroup[] = [
  {
    title: "Build your interface",
    items: products.filter((item) =>
      ["/ui", "/blocks", "/tools/theme-builder"].includes(item.href),
    ),
  },
  {
    title: "Launch your product",
    items: products.filter((item) =>
      ["/starters/free", "/starters/pro", "/templates/na-ai-landing"].includes(
        item.href,
      ),
    ),
  },
];

export const PRODUCT_MENU_SECONDARY_ITEMS: PrimaryNavItem[] = [
  { label: "Compare Starters", href: "/starters" },
  { label: "All templates", href: "/templates" },
];

export const MOBILE_BROWSE_NAV_ITEMS: PrimaryNavItem[] = [
  ...PRODUCT_MENU_SECONDARY_ITEMS,
  { label: "UI examples", href: "/ui/examples" },
  { label: "Pricing", href: "/pricing" },
];

export const RESOURCE_MENU_ITEMS = [
  {
    label: "UI Explorer",
    href: UI_EXPLORER_URL,
    description: "Try components, variants and interactions.",
    icon: PanelsTopLeft,
  },
  {
    label: "Guides",
    href: "/guides",
    description: "Practical steps for building with PyColors.",
    icon: BookOpen,
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Notes on interfaces, products and development.",
    icon: Newspaper,
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "Follow the latest product updates.",
    icon: History,
  },
  {
    label: "Roadmap",
    href: "/roadmap",
    description: "See what is planned and in progress.",
    icon: Map,
  },
] satisfies (PrimaryNavItem & { description: string; icon: LucideIcon })[];

export const GITHUB_NAV_ITEM: PrimaryNavItem = {
  label: "GitHub",
  href: "https://github.com/pycolors",
};

// Mobile navigation also includes direct access to Docs and supplied docs links.
export const RESOURCE_NAV_ITEMS: PrimaryNavItem[] = [
  { label: "Docs", href: "/docs" },
  ...RESOURCE_MENU_ITEMS,
  GITHUB_NAV_ITEM,
];

/**
 * Optional: if we later re-enable Fumadocs built-in navigation.
 */
export const layoutLinks: LinkItemType[] = PRIMARY_NAV_ITEMS.flatMap((item) =>
  "href" in item
    ? [
        {
          type: "main" as const,
          text: item.label,
          url: item.href,
          active: "nested-url" as const,
        },
      ]
    : [],
);

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

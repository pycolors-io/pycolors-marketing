import { cn } from "@pycolors/ui";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumb";
import { useCopy } from "@/lib/i18n/use-copy";
import { localizedHref } from "@/lib/i18n/routing";

const home = { label: "Home", href: "/" } as const;
const starters = { label: "Starters", href: "/starters" } as const;
const pro = { label: "Starter Pro", href: "/starters/pro" } as const;
const ui = { label: "PyColors UI", href: "/ui" } as const;

/** Explicit public routes only: never derive labels or URLs from request data. */
const trails = {
  "/blocks": [{ label: "Blocks", href: "/blocks" }],
  "/blog": [{ label: "Blog", href: "/blog" }],
  "/contact": [{ label: "Contact", href: "/contact" }],
  "/demo": [{ label: "Demos", href: "/demo" }],
  "/guides": [{ label: "Guides", href: "/guides" }],
  "/pricing": [{ label: "Pricing", href: "/pricing" }],
  "/request-a-quote": [
    { label: "Services", href: "/services" },
    { label: "Request a quote", href: "/request-a-quote" },
  ],
  "/services": [{ label: "Services", href: "/services" }],
  "/showcase/product-studio": [
    pro,
    { label: "Product studio", href: "/showcase/product-studio" },
  ],
  "/starters": [starters],
  "/starters/free": [
    starters,
    { label: "Starter Free", href: "/starters/free" },
  ],
  "/starters/mobile": [
    starters,
    { label: "Starter Pro Mobile", href: "/starters/mobile" },
  ],
  "/starters/pro": [starters, pro],
  "/starters/pro/faq": [
    starters,
    pro,
    { label: "Starter Pro FAQ", href: "/starters/pro/faq" },
  ],
  "/starters/pro/implementation-example": [
    pro,
    { label: "Example delivery", href: "/starters/pro/implementation-example" },
  ],
  "/templates": [{ label: "Templates", href: "/templates" }],
  "/tools/theme-builder": [
    { label: "Theme Builder", href: "/tools/theme-builder" },
  ],
  "/ui": [ui],
  "/ui/examples": [ui, { label: "UI examples", href: "/ui/examples" }],
  "/ui/patterns": [ui, { label: "UI patterns", href: "/ui/patterns" }],
  "/upgrade": [starters, { label: "Upgrade to Pro", href: "/upgrade" }],
} as const satisfies Record<string, readonly BreadcrumbItem[]>;

export type MarketingBreadcrumbRoute = keyof typeof trails;

export function getMarketingBreadcrumbItems(
  route: string,
): BreadcrumbItem[] | null {
  if (!Object.hasOwn(trails, route)) return null;
  return [home, ...trails[route as MarketingBreadcrumbRoute]];
}

const pagesWithBreadcrumbJsonLd = new Set<MarketingBreadcrumbRoute>([
  "/showcase/product-studio",
  "/starters/pro/implementation-example",
]);

/** Server-owned placement keeps each page's hero and local navigation intact. */
export function MarketingBreadcrumb({
  route,
  className,
}: Readonly<{ route: MarketingBreadcrumbRoute; className?: string }>) {
  const locale = useCopy().locale;
  const items = getMarketingBreadcrumbItems(route);
  if (!items) return null;
  return (
    <Breadcrumb
      items={items.map((item) => ({
        ...item,
        href: localizedHref(item.href, locale),
      }))}
      renderJsonLd={!pagesWithBreadcrumbJsonLd.has(route)}
      className={cn("mb-6 sm:mb-8", className)}
    />
  );
}

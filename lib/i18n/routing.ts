import { defineRouting } from "next-intl/routing";
export const locales = ["en", "fr"] as const;
export type SiteLocale = (typeof locales)[number];
export const localizedPathnames: Record<string, { en: string; fr: string }> = {
  "/pricing": { en: "/pricing", fr: "/tarifs" },
  "/request-a-quote": { en: "/request-a-quote", fr: "/demande-de-devis" },
  "/request-a-quote/template": {
    en: "/request-a-quote/template",
    fr: "/demande-de-devis/modele",
  },
  "/about": { en: "/about", fr: "/a-propos" },
  "/license": { en: "/license", fr: "/licence" },
  "/terms": { en: "/terms", fr: "/conditions" },
  "/privacy": { en: "/privacy", fr: "/confidentialite" },
};
export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
  pathnames: localizedPathnames,
});
export function isLocale(value: unknown): value is SiteLocale {
  return value === "en" || value === "fr";
}
export function localizedHref(href: string, locale: SiteLocale): string {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    /^\/(?:api|_next|_vercel)(?:\/|$)/.test(href)
  )
    return href;
  const match = href.match(/^([^?#]*)(.*)$/)!;
  let pathname = match[1]!.replace(/^\/(?:fr|en)(?=\/|$)/, "") || "/";
  const localizedFeed = /^\/blog\/(?:feed\.json|rss\.xml)$/.test(pathname);
  const taxonomyPage = /^\/blog\/(?:categories|tags)\//.test(pathname);
  const asset =
    /\.(?:png|jpe?g|webp|avif|gif|svg|ico|pdf|zip|woff2?|ttf|mp4|webm|css|[cm]?jsx?|tsx?|map|json|xml|txt|mdx?)$/i.test(
      pathname,
    );
  if (asset && !localizedFeed && !taxonomyPage) return pathname + match[2];
  for (const [internal, paths] of Object.entries(localizedPathnames))
    if (pathname === paths.fr || pathname === paths.en) {
      pathname = internal;
      break;
    }
  const path = localizedPathnames[pathname]?.[locale] ?? pathname;
  return `${locale === "fr" ? "/fr" : ""}${path === "/" && locale === "fr" ? "" : path}${match[2]}`;
}

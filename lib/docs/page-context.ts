import { SITE_URL } from "@/lib/seo/website";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";

export function docsPageContext(pathname: string | null, locale: SiteLocale) {
  const path = (pathname ?? "/docs").replace(/^\/(?:en|fr)(?=\/|$)/, "");
  const docsPath =
    path === "/docs" || path.startsWith("/docs/") ? path : "/docs";
  const slug = docsPath.slice("/docs".length).replace(/^\//, "");
  return {
    url: new URL(localizedHref(docsPath, locale), SITE_URL).href,
    markdownUrl:
      "/api/docs/markdown?" + new URLSearchParams({ slug, locale }).toString(),
  };
}

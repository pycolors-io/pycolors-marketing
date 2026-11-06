import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/website";

export type SiteLocale = "en" | "fr";
/** Compatibility names for existing acquisition metadata; general routing lives in routing.ts. */
export const LOCALIZED_ROUTES = {
  home: { en: "/", fr: "/fr" },
  starterPro: { en: "/starters/pro", fr: "/fr/starters/pro" },
  pricing: { en: "/pricing", fr: "/fr/tarifs" },
  quote: { en: "/request-a-quote", fr: "/fr/demande-de-devis" },
} as const;
export type LocalizedPage = keyof typeof LOCALIZED_ROUTES;

export function findLocalizedPage(pathname: string): LocalizedPage | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  return (Object.keys(LOCALIZED_ROUTES) as LocalizedPage[]).find((key) =>
    Object.values(LOCALIZED_ROUTES[key]).some((value) => value === path),
  );
}
export function localizedAlternates(page: LocalizedPage, locale: SiteLocale) {
  const routes = LOCALIZED_ROUTES[page];
  return {
    canonical: routes[locale],
    languages: {
      en: `${SITE_URL}${routes.en}`,
      fr: `${SITE_URL}${routes.fr}`,
      "x-default": `${SITE_URL}${routes.en}`,
    },
  };
}
export function frenchMetadata(
  page: LocalizedPage,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(page, "fr"),
    openGraph: {
      type: "website",
      siteName: "PyColors",
      title,
      description,
      url: LOCALIZED_ROUTES[page].fr,
      locale: "fr_FR",
      alternateLocale: "en_US",
      images: ["/seo/og-main.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/seo/twitter-main.png"],
    },
  };
}

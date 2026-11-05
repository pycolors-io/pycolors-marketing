import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/website";
import { getCopy } from "./server-copy";
import { isLocale, localizedHref } from "./routing";

export async function localizePageMetadata(
  source: Metadata,
  pathname: string,
  candidate: unknown,
): Promise<Metadata> {
  const locale = isLocale(candidate) ? candidate : "en";
  const t = await getCopy(locale);
  const canonical = `${SITE_URL}${localizedHref(pathname, locale)}`;
  const translateTitle = (value: Metadata["title"]): Metadata["title"] => {
    if (typeof value === "string") return t(value);
    if (!value) return value;
    if ("absolute" in value) return { ...value, absolute: t(value.absolute) };
    return { ...value, default: t(value.default) };
  };
  const title = translateTitle(source.title);
  const description =
    typeof source.description === "string"
      ? t(source.description)
      : source.description;
  const languages = {
    en: `${SITE_URL}${localizedHref(pathname, "en")}`,
    fr: `${SITE_URL}${localizedHref(pathname, "fr")}`,
    "x-default": `${SITE_URL}${localizedHref(pathname, "en")}`,
  };
  const privatePage =
    typeof source.robots === "object" && source.robots?.index === false;
  return {
    ...source,
    title,
    description,
    alternates: {
      ...source.alternates,
      canonical:
        locale === "en"
          ? (source.alternates?.canonical ?? canonical)
          : canonical,
      ...(privatePage ? {} : { languages }),
    },
    openGraph: {
      ...source.openGraph,
      title:
        typeof source.openGraph?.title === "string"
          ? t(source.openGraph.title)
          : (title ?? undefined),
      description:
        typeof source.openGraph?.description === "string"
          ? t(source.openGraph.description)
          : (description ?? undefined),
      url: locale === "en" ? (source.openGraph?.url ?? canonical) : canonical,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
    },
    twitter: {
      ...source.twitter,
      title:
        typeof source.twitter?.title === "string"
          ? t(source.twitter.title)
          : (title ?? undefined),
      description:
        typeof source.twitter?.description === "string"
          ? t(source.twitter.description)
          : (description ?? undefined),
    },
  };
}

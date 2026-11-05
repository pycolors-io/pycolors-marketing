import { getLocale, getTranslations } from "next-intl/server";
import { createCopy } from "./copy-core";
import { isLocale, type SiteLocale } from "./routing";
export async function getCopy(requestedLocale?: SiteLocale) {
  const locale = requestedLocale ?? (await getLocale());
  const resolved = isLocale(locale) ? locale : "en";
  return createCopy(
    resolved,
    await getTranslations({ locale: resolved, namespace: "site" }),
  );
}

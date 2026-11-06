import { getRequestConfig } from "next-intl/server";
import * as rootParams from "next/root-params";
import { isLocale } from "@/lib/i18n/routing";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
export default getRequestConfig(async ({ locale: override }) => {
  const candidate = override ?? (await rootParams.locale());
  const locale = isLocale(candidate) ? candidate : "en";
  return { locale, timeZone: "UTC", messages: locale === "fr" ? fr : en };
});

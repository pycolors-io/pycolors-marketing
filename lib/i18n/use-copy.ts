import { useLocale, useTranslations } from "next-intl";
import { createCopy } from "./copy-core";
import { isLocale } from "./routing";
export function useCopy() {
  const locale = useLocale();
  return createCopy(isLocale(locale) ? locale : "en", useTranslations("site"));
}

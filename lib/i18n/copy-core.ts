import { localizedHref, type SiteLocale } from "./routing";

export function messageKey(value: string): string {
  const text = value.replace(/\s+/g, " ").trim();
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
  }
  return `m${(hash >>> 0).toString(16)}`;
}

export interface CopyTranslator {
  (key: string): string;
  has(key: string): boolean;
  raw?(key: string): unknown;
}

type CopyValues = Record<string, string | number | Date>;

/** Localize presentation copy; never pass identifiers, code or customer data. */
export function createCopy(locale: SiteLocale, translate: CopyTranslator) {
  function copy<T>(value: T, values?: CopyValues): T {
    if (Array.isArray(value))
      return value.map((item: unknown) => copy(item)) as T;
    if (typeof value !== "string") return value;
    const normalized = value.replace(/\s+/g, " ").trim();
    const key = messageKey(normalized);
    let output: string = value;
    if (locale === "fr" && normalized && translate.has(key)) {
      const translated = translate.raw ? translate.raw(key) : translate(key);
      if (typeof translated === "string") {
        output = `${/^\s/.test(value) ? " " : ""}${translated}${/\s$/.test(value) ? " " : ""}`;
      }
    }
    if (values) {
      output = output.replace(/\{(\w+)\}/g, (match, name: string) =>
        Object.hasOwn(values, name) ? String(values[name]) : match,
      );
    }
    return output as T;
  }
  return Object.assign(copy, {
    href: (href: string) => localizedHref(href, locale),
    locale,
  });
}

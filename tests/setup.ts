import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom has no media-query API; individual tests can override the preference.
if (typeof window !== "undefined") {
  window.matchMedia ??= (media: string): MediaQueryList => ({
    media,
    matches: false,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => true,
  });
}

afterEach(() => {
  cleanup();
});

vi.mock("@/lib/i18n/use-copy", () => ({
  useCopy: () =>
    Object.assign(
      function identity<T>(
        value: T,
        values?: Record<string, string | number | Date>,
      ) {
        return (
          typeof value === "string" && values
            ? value.replace(/\{(\w+)\}/g, (match, key: string) =>
                Object.hasOwn(values, key) ? String(values[key]) : match,
              )
            : value
        ) as T;
      },
      { href: (href: string) => href, locale: "en" },
    ),
}));
vi.mock("@/lib/i18n/server-copy", () => ({
  getCopy: async () =>
    Object.assign(
      function identity<T>(
        value: T,
        values?: Record<string, string | number | Date>,
      ) {
        return (
          typeof value === "string" && values
            ? value.replace(/\{(\w+)\}/g, (match, key: string) =>
                Object.hasOwn(values, key) ? String(values[key]) : match,
              )
            : value
        ) as T;
      },
      { href: (href: string) => href, locale: "en" },
    ),
}));

vi.mock("@/lib/i18n/navigation", async () => {
  const nativeLink = await import("next/link");
  const navigation = await import("next/navigation");
  return {
    Link: nativeLink.default,
    usePathname: () => navigation.usePathname(),
    useRouter: () => navigation.useRouter(),
  };
});

vi.mock("next-intl", async (importOriginal) => {
  const original = await importOriginal<typeof import("next-intl")>();
  return { ...original, useLocale: () => "en" };
});

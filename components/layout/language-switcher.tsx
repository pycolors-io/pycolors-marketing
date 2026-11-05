"use client";
import { usePathname } from "next/navigation";
import {
  findLocalizedPage,
  LOCALIZED_ROUTES,
  type SiteLocale,
} from "@/lib/i18n/routes";

export function LanguageSwitcher({ locale = "en" }: { locale?: SiteLocale }) {
  const path = usePathname() ?? "/";
  const page = findLocalizedPage(path);
  const target = locale === "en" ? "fr" : "en";
  const href = LOCALIZED_ROUTES[page ?? "home"][target];
  const label =
    target === "fr" ? (page ? "Français" : "Français — accueil") : "English";
  // A document navigation also switches between the two language root layouts.
  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      onClick={(event) => {
        if (page === "quote") {
          const service = new URLSearchParams(window.location.search).get(
            "service",
          );
          if (service === "guided-setup" || service === "business-adaptation")
            event.currentTarget.href = `${href}?service=${service}`;
        }
      }}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:min-h-8"
    >
      {target.toUpperCase()}
    </a>
  );
}

"use client";

import { useEffect } from "react";
import { trackMoneyPathEvent } from "@/lib/analytics";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";

const destinations = [
  "/starters/free",
  "/starters/pro",
  "/starters/mobile",
  "/starters/fullstack",
  "/pricing",
] as const;

export function DocsCommercialLinks({
  page,
  locale,
}: {
  page: string;
  locale: SiteLocale;
}) {
  useEffect(() => {
    const paths = new Set(
      destinations.map((path) => localizedHref(path, locale)),
    );
    const source = localizedHref(page, locale);
    function trackClick(event: MouseEvent) {
      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.origin !== window.location.origin
      )
        return;
      const destination = link.pathname.replace(/\/$/, "");
      if (paths.has(destination)) {
        trackMoneyPathEvent({
          event: "docs_commercial_link_clicked",
          page: source,
          destination,
        });
      }
    }

    document.addEventListener("click", trackClick, true);
    return () => document.removeEventListener("click", trackClick, true);
  }, [locale, page]);

  return null;
}

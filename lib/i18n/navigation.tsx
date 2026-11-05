"use client";
import NextLink from "next/link";
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from "next/navigation";
import { useLocale } from "next-intl";
import type { ComponentProps } from "react";
import { isLocale, localizedHref } from "./routing";

export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const candidate = useLocale();
  const locale = isLocale(candidate) ? candidate : "en";
  const target =
    typeof href === "string"
      ? localizedHref(href, locale)
      : {
          ...href,
          pathname:
            typeof href.pathname === "string"
              ? localizedHref(href.pathname, locale)
              : href.pathname,
        };
  return <NextLink href={target} {...props} />;
}
export function usePathname() {
  const path = useNextPathname();
  return path ? localizedHref(path, "en") : path;
}
export function useRouter() {
  const router = useNextRouter();
  const candidate = useLocale();
  const locale = isLocale(candidate) ? candidate : "en";
  return {
    ...router,
    push: (href: string, options?: Parameters<typeof router.push>[1]) =>
      router.push(localizedHref(href, locale), options),
    replace: (href: string, options?: Parameters<typeof router.replace>[1]) =>
      router.replace(localizedHref(href, locale), options),
  };
}

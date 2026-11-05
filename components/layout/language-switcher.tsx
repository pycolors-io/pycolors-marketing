"use client";

import { useState, type MouseEvent } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@pycolors/ui";
import { useCopy } from "@/lib/i18n/use-copy";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";
import styles from "./language-switcher.module.css";

const LANGUAGES = [
  { locale: "en", label: "English", code: "EN" },
  { locale: "fr", label: "Français", code: "FR" },
] as const;

export function LanguageSwitcher({
  variant = "header",
}: Readonly<{ variant?: "header" | "footer" }>) {
  const tSite = useCopy();
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
  const current = locale === "fr" ? LANGUAGES[1] : LANGUAGES[0];
  const [open, setOpen] = useState(false);
  const [suffix, setSuffix] = useState("");

  function onOpenChange(nextOpen: boolean) {
    if (nextOpen) setSuffix(window.location.search + window.location.hash);
    setOpen(nextOpen);
  }

  function onLanguageClick(
    event: MouseEvent<HTMLAnchorElement>,
    target: SiteLocale,
  ) {
    event.currentTarget.href =
      localizedHref(pathname, target) +
      window.location.search +
      window.location.hash;
    if (
      target === current.locale &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={tSite("Language: {value0}", { value0: current.label })}
          data-variant={variant}
          className={styles.trigger}
        >
          <Languages aria-hidden="true" className="size-3.5 shrink-0" />
          <span lang={current.locale}>
            {variant === "footer" ? current.label : current.code}
          </span>
          <ChevronDown aria-hidden="true" className={styles.chevron} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={variant === "footer" ? "top" : "bottom"}
        sideOffset={8}
        collisionPadding={12}
        className={styles.content}
      >
        {LANGUAGES.map((language) => {
          const selected = language.locale === current.locale;
          return (
            <DropdownMenuItem key={language.locale} asChild>
              <a
                href={localizedHref(pathname, language.locale) + suffix}
                hrefLang={language.locale}
                lang={language.locale}
                aria-current={selected ? "page" : undefined}
                data-native-navigation=""
                onClick={(event) => onLanguageClick(event, language.locale)}
                className={styles.item}
              >
                <span>{language.label}</span>
                <span aria-hidden="true" className={styles.code}>
                  {language.code}
                </span>
                <span aria-hidden="true" className={styles.indicator}>
                  {selected ? <Check className="size-3.5" /> : null}
                </span>
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

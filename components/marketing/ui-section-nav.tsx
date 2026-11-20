"use client";

import type { ReactNode } from "react";
import { BookOpen, Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@pycolors/ui";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import styles from "./ui-section-nav.module.css";

const destinations = [
  { id: "overview", label: "Overview", href: "/ui" },
  { id: "blocks", label: "Blocks", href: "/blocks" },
  { id: "themes", label: "Theme Builder", href: "/tools/theme-builder" },
  { id: "patterns", label: "Patterns", href: "/ui/patterns" },
  { id: "examples", label: "Examples", href: "/ui/examples" },
  { id: "docs", label: "Documentation", href: "/docs/ui" },
] as const;

/** One compact page switcher; documentation stays one click away. */
export function UiSectionNav({
  active,
  breadcrumb,
}: Readonly<{
  active: (typeof destinations)[number]["id"];
  breadcrumb?: ReactNode;
}>) {
  const tSite = useCopy();
  const current =
    destinations.find((item) => item.id === active) ?? destinations[0];
  const docsHref = active === "blocks" ? "/docs/blocks" : "/docs/ui";

  return (
    <div className={styles.header}>
      {breadcrumb ? (
        <div className={styles.breadcrumb}>{breadcrumb}</div>
      ) : null}
      <nav aria-label={tSite("PyColors UI navigation")} className={styles.nav}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={styles.trigger}
              aria-label={tSite("Browse PyColors UI: {value0}", {
                value0: tSite(current.label),
              })}
            >
              <span className={styles.current}>{tSite(current.label)}</span>
              <ChevronDown className={styles.chevron} aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={8}
            collisionPadding={16}
            className={styles.menu}
          >
            <DropdownMenuLabel className={styles.label}>
              {tSite("PyColors UI")}
            </DropdownMenuLabel>
            {destinations.map((item) => (
              <DropdownMenuItem key={item.id} asChild>
                <Link
                  href={item.id === "docs" ? docsHref : item.href}
                  aria-current={active === item.id ? "page" : undefined}
                  className={styles.item}
                >
                  <span>{tSite(item.label)}</span>
                  {active === item.id ? <Check aria-hidden="true" /> : null}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href={docsHref}
          className={styles.docs}
          aria-label={tSite("Documentation")}
          aria-current={active === "docs" ? "page" : undefined}
        >
          <BookOpen aria-hidden="true" />
          <span>{tSite("Documentation")}</span>
        </Link>
      </nav>
    </div>
  );
}

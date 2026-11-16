"use client";

import { Link } from "@/lib/i18n/navigation";
import { Logo } from "./logo";
import styles from "./docs/docs-design.module.css";

export function DocsLogo() {
  return (
    <span className={styles.headerLogo}>
      <Logo />
      <span className={styles.headerSection}>
        <span aria-hidden="true" className="text-muted-foreground/60">
          /
        </span>
        <Link
          href="/docs"
          className="inline-flex min-h-11 items-center rounded px-0.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
        >
          Docs
        </Link>
      </span>
    </span>
  );
}

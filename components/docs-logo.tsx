"use client";

import { Logo } from "./logo";
import styles from "./docs/docs-design.module.css";

export function DocsLogo() {
  return (
    <span className={styles.headerLogo}>
      <Logo variant="docs" />
    </span>
  );
}

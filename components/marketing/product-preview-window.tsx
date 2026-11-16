import type { ReactNode } from "react";
import { PanelsTopLeft } from "lucide-react";
import styles from "./product-preview-window.module.css";

export function ProductPreviewWindow({
  label,
  children,
}: Readonly<{ label: string; children: ReactNode }>) {
  return (
    <div className={styles.frame}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.controls}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.address}>{label}</span>
        <PanelsTopLeft className={styles.sidebar} />
      </div>
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@pycolors/ui";
import styles from "./hero-band.module.css";

type MarketingHeroBandProps = Readonly<{
  children: ReactNode;
  tone?: "cool" | "warm";
  className?: string;
}>;

/** A full-width atmosphere around server-rendered, caller-owned hero content. */
export function MarketingHeroBand({
  children,
  tone = "cool",
  className,
}: MarketingHeroBandProps) {
  return (
    <div className={cn(styles.band, className)} data-marketing-hero={tone}>
      <div className={styles.atmosphere} aria-hidden="true">
        <svg
          viewBox="0 0 1600 600"
          preserveAspectRatio="xMidYMid slice"
          className={styles.waves}
          focusable="false"
        >
          <path
            className={styles.ribbon}
            d="M-180 580C180 225 400 650 770 360S1220 80 1780 225V680H-180Z"
          />
          <path
            className={styles.ribbonSoft}
            d="M-180 650C230 290 490 710 880 410S1330 140 1780 265V680H-180Z"
          />
          <g className={styles.contours}>
            {Array.from({ length: 12 }, (_, index) => (
              <path
                key={index}
                d={`M-180 ${520 + index * 11}C180 ${165 + index * 11} 400 ${590 + index * 11} 770 ${300 + index * 11}S1220 ${20 + index * 11} 1780 ${165 + index * 11}`}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

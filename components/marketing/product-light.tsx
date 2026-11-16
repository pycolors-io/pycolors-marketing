import { MARKETING_BRAND } from "@/lib/brand-identity";
import styles from "./product-light.module.css";

/** Original decorative interface layers, never a customer record or product capture. */
export function ProductLight({
  idPrefix,
}: {
  readonly idPrefix: "home" | "starter-pro";
}) {
  const flow = `${idPrefix}-product-light-flow`;
  const surface = `${idPrefix}-product-light-surface`;

  return (
    <div
      className={styles.illustration}
      aria-hidden="true"
      data-product-light={idPrefix}
    >
      <svg viewBox="0 0 840 560" fill="none" focusable="false">
        <defs>
          <linearGradient
            id={flow}
            x1="0"
            y1="400"
            x2="840"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--primary)" />
            <stop offset="0.55" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--product-light-accent)" />
          </linearGradient>
          <linearGradient id={surface} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--background)" stopOpacity="0.98" />
            <stop offset="1" stopColor="var(--background)" stopOpacity="0.88" />
          </linearGradient>
        </defs>
        <path
          d="M0 230 840 8v214L0 444Z"
          fill={`url(#${flow})`}
          opacity="0.76"
        />
        <path
          d="m0 442 840-222v76L0 518Z"
          fill={`url(#${flow})`}
          opacity="0.22"
        />
        <path
          d="m28 227 782-207M18 462l804-213"
          stroke="var(--primary-foreground)"
          strokeOpacity="0.35"
        />
        <g stroke="var(--primary)" strokeWidth="1.5">
          <path
            d="M180 98h91c28 0 28-55 57-55h72M490 48h67c30 0 24 60 56 60h52"
            strokeDasharray="4 6"
            opacity="0.55"
          />
          <circle cx="271" cy="98" r="4" fill="var(--background)" />
          <circle cx="557" cy="48" r="4" fill="var(--background)" />
        </g>
        <g transform="translate(82 35) rotate(-6 96 48)">
          <rect
            x="2"
            y="5"
            width="192"
            height="94"
            rx="5"
            fill="var(--foreground)"
            opacity="0.04"
          />
          <rect
            width="192"
            height="94"
            rx="5"
            fill={`url(#${surface})`}
            stroke="var(--product-light-border)"
          />
          <rect
            x="17"
            y="18"
            width="42"
            height="42"
            rx="5"
            fill="var(--primary)"
          />
          <path
            d={MARKETING_BRAND.mark.path}
            transform="translate(26 26) scale(0.92)"
            fill="var(--primary-foreground)"
          />
          <rect
            x="74"
            y="23"
            width="92"
            height="5"
            rx="2.5"
            fill="var(--foreground)"
            opacity="0.4"
          />
          <rect
            x="74"
            y="38"
            width="66"
            height="4"
            rx="2"
            fill="var(--foreground)"
            opacity="0.12"
          />
          <path
            d="M18 76h24m9 0h47m10 0h64"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>
        <g transform="translate(326 2) rotate(3 110 46)">
          <rect
            x="2"
            y="5"
            width="218"
            height="94"
            rx="5"
            fill="var(--foreground)"
            opacity="0.04"
          />
          <rect
            width="218"
            height="94"
            rx="5"
            fill={`url(#${surface})`}
            stroke="var(--product-light-border)"
          />
          <path
            d="m24 30 18-10 18 10-18 10Zm0 11 18 10 18-10m-36 11 18 10 18-10"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="80"
            y="24"
            width="107"
            height="5"
            rx="2.5"
            fill="var(--foreground)"
            opacity="0.4"
          />
          <rect
            x="80"
            y="39"
            width="76"
            height="4"
            rx="2"
            fill="var(--foreground)"
            opacity="0.12"
          />
          <rect
            x="80"
            y="59"
            width="30"
            height="12"
            rx="3"
            fill="var(--primary)"
            opacity="0.14"
          />
          <rect
            x="118"
            y="59"
            width="30"
            height="12"
            rx="3"
            fill="var(--product-light-accent)"
            opacity="0.18"
          />
          <rect
            x="156"
            y="59"
            width="30"
            height="12"
            rx="3"
            fill="var(--primary)"
            opacity="0.08"
          />
        </g>
        <g transform="translate(610 47) rotate(-5 94 48)">
          <rect
            x="2"
            y="5"
            width="188"
            height="96"
            rx="5"
            fill="var(--foreground)"
            opacity="0.04"
          />
          <rect
            width="188"
            height="96"
            rx="5"
            fill={`url(#${surface})`}
            stroke="var(--product-light-border)"
          />
          <path
            d="M39 40h108"
            stroke="var(--product-light-border)"
            strokeWidth="2"
          />
          {[24, 78, 132].map((x) => (
            <g key={x} transform={`translate(${x} 25)`}>
              <rect
                width="30"
                height="30"
                rx="5"
                fill="var(--primary)"
                fillOpacity="0.1"
                stroke="var(--primary)"
                strokeOpacity="0.3"
              />
              <path
                d="M10 11h10m-10 5h7m-7 5h10"
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          ))}
          <path
            d="M24 74h42m12 0h42m12 0h30"
            stroke="var(--foreground)"
            strokeOpacity="0.18"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

import localFont from "next/font/local";

// Keep logo builds independent of Google Fonts' query-bearing download URLs.
export const wordmarkFont = localFont({
  src: "../public/fonts/plus-jakarta-sans/latin.woff2",
  weight: "700 800",
  style: "normal",
  display: "swap",
});

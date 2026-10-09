import localFont from "next/font/local";

export const geistSans = localFont({
  src: "../public/fonts/geist/Geist-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-geist-sans",
});

export const geistMono = localFont({
  src: "../public/fonts/geist/GeistMono-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-geist-mono",
});

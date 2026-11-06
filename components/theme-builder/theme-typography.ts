import {
  APPEARANCE_FONTS,
  type AppearanceFont,
} from "@/lib/appearance-contract";

export type ThemeFont = AppearanceFont;

export const THEME_FONTS: readonly ThemeFont[] = APPEARANCE_FONTS;

export const DEFAULT_THEME_FONT = THEME_FONTS[0]!;

/** Typography is an independent artifact; the color engine owns color exports. */
export function createTypographyCss(font: ThemeFont): string {
  const fontFace = font.asset
    ? `/* Save the font file to public${font.asset} first. */
@font-face {
  font-family: "${font.label}";
  src: url("${font.asset}") format("woff2");
  font-style: normal;
  font-weight: ${font.weight};
  font-display: swap;
}

`
    : "";

  return `${fontFace}:root {
  --font-sans: ${font.family};
  --font-brand: var(--font-sans);
}

body {
  font-family: var(--font-sans);
}
`;
}

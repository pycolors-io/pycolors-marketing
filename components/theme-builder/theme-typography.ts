export type ThemeFont = Readonly<{
  id: string;
  label: string;
  family: string;
  previewFamily: string;
  asset?: string;
  weight?: string;
  license?: string;
}>;

const sansFallback =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

export const THEME_FONTS: readonly ThemeFont[] = [
  {
    id: "mona-sans",
    label: "Mona Sans",
    family: `"Mona Sans", ${sansFallback}`,
    previewFamily: `"Mona Sans", ${sansFallback}`,
    asset: "/fonts/Mona-Sans.var.woff2",
    weight: "200 900",
  },
  {
    id: "plus-jakarta-sans",
    label: "Plus Jakarta Sans",
    family: `"Plus Jakarta Sans", ${sansFallback}`,
    previewFamily: `"PyColors Preview Jakarta", ${sansFallback}`,
    asset: "/fonts/plus-jakarta-sans/latin.woff2",
    weight: "200 800",
    license: "/fonts/plus-jakarta-sans/OFL.txt",
  },
  {
    id: "system-sans",
    label: "System Sans",
    family: sansFallback,
    previewFamily: sansFallback,
  },
  {
    id: "system-mono",
    label: "System Mono",
    family: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
    previewFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
  },
];

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

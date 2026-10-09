export type SitePalette = "pycolors" | "monochrome";

export const SITE_PALETTE_STORAGE_KEY = "pycolors:site-palette:v1";

export function resolveSitePalette(value: string | null): SitePalette {
  return value === "monochrome" ? "monochrome" : "pycolors";
}

// Static, trusted script: apply the saved palette before the body can paint.
// If storage is unavailable, the server-rendered PyColors default stays active.
export const SITE_PALETTE_INIT_SCRIPT = `try{document.documentElement.dataset.sitePalette=localStorage.getItem(${JSON.stringify(SITE_PALETTE_STORAGE_KEY)})==="monochrome"?"monochrome":"pycolors"}catch{}`;

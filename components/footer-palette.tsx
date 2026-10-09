"use client";

import { useSyncExternalStore } from "react";
import {
  resolveSitePalette,
  SITE_PALETTE_STORAGE_KEY,
  type SitePalette,
} from "@/lib/site-palette";
import styles from "./footer.module.css";

const PALETTE_CHANGE_EVENT = "pycolors:site-palette-change";
const OPTIONS = [
  { value: "pycolors", label: "PyColors" },
  { value: "monochrome", label: "Monochrome" },
] as const;

function getPalette() {
  return resolveSitePalette(
    document.documentElement.getAttribute("data-site-palette"),
  );
}

function getServerPalette() {
  return null;
}

function subscribe(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== null && event.key !== SITE_PALETTE_STORAGE_KEY) return;
    document.documentElement.dataset.sitePalette = resolveSitePalette(
      event.newValue,
    );
    onChange();
  }

  window.addEventListener(PALETTE_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(PALETTE_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setPalette(palette: SitePalette) {
  document.documentElement.dataset.sitePalette = palette;
  try {
    window.localStorage.setItem(SITE_PALETTE_STORAGE_KEY, palette);
  } catch {
    // The current page can still switch when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(PALETTE_CHANGE_EVENT));
}

export function FooterPalette() {
  const palette = useSyncExternalStore(subscribe, getPalette, getServerPalette);

  return (
    <div role="group" aria-label="Site palette" className={styles.palette}>
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          title={label}
          aria-pressed={palette === value}
          disabled={palette === null}
          onClick={() => setPalette(value)}
        >
          <span
            aria-hidden="true"
            data-palette-swatch={value}
            className={styles.paletteSwatch}
          />
          <span className={styles.paletteLabel}>{label}</span>
        </button>
      ))}
    </div>
  );
}

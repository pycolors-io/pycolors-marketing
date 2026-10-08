"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "fumadocs-ui/provider/base";
import { FooterPalette } from "./footer-palette";
import styles from "./footer.module.css";

const OPTIONS = [
  { value: "light", label: "Light theme", shortLabel: "Light", icon: Sun },
  { value: "dark", label: "Dark theme", shortLabel: "Dark", icon: Moon },
  {
    value: "system",
    label: "System theme",
    shortLabel: "System",
    icon: Monitor,
  },
] as const;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function AppearanceControls() {
  const { theme, setTheme } = useTheme();
  // The server cannot know the saved preference. Keep the same three controls
  // during hydration, then reveal the selected state without a layout shift.
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div className={styles.preferences}>
      <FooterPalette />
      <div role="group" aria-label="Color theme" className={styles.appearance}>
        {OPTIONS.map(({ value, label, shortLabel, icon: Icon }) => (
          <button
            key={value}
            type="button"
            aria-label={label}
            title={label}
            aria-pressed={mounted && theme === value}
            disabled={!mounted}
            onClick={() => setTheme(value)}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            <span className={styles.appearanceLabel} aria-hidden="true">
              {shortLabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Shared settings area for the marketing and documentation mobile sheets. */
export function MobileMenuAppearance() {
  return (
    <section aria-label="Appearance" className="mb-3 space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Appearance</p>
      <AppearanceControls />
    </section>
  );
}

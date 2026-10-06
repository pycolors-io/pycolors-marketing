"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "fumadocs-ui/provider/base";
import styles from "./footer.module.css";

const OPTIONS = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
  { value: "system", label: "System theme", icon: Monitor },
] as const;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function FooterAppearance() {
  const { theme, setTheme } = useTheme();
  // The server cannot know the saved preference. Keep the same three controls
  // during hydration, then reveal the selected state without a layout shift.
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div role="group" aria-label="Color theme" className={styles.appearance}>
      {OPTIONS.map(({ value, label, icon: Icon }) => (
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
        </button>
      ))}
    </div>
  );
}

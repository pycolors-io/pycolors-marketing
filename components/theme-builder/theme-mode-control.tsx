import type { ThemeMode } from "@pycolors/color-engine";

type ThemeModeControlProps = Readonly<{
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}>;

const MODE_OPTIONS: readonly ThemeMode[] = ["light", "dark"];

export function ThemeModeControl({ value, onChange }: ThemeModeControlProps) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-medium text-foreground">
        Preview mode
      </legend>
      <div className="grid grid-cols-2 gap-2" role="radiogroup">
        {MODE_OPTIONS.map((mode) => {
          const inputId = `theme-builder-mode-${mode}`;
          const selected = value === mode;

          return (
            <div key={mode} className="relative">
              <input
                id={inputId}
                name="theme-builder-preview-mode"
                type="radio"
                value={mode}
                checked={selected}
                onChange={() => onChange(mode)}
                className="peer sr-only"
              />
              <label
                htmlFor={inputId}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
              >
                {mode === "light" ? "Light" : "Dark"}
              </label>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        Current preview: {value === "light" ? "Light" : "Dark"}.
      </p>
    </fieldset>
  );
}

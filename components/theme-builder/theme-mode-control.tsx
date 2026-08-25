import type { ThemeMode } from "@pycolors/color-engine";

type ThemeModeControlProps = Readonly<{
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}>;

const MODE_OPTIONS: readonly ThemeMode[] = ["light", "dark"];

export function ThemeModeControl({ value, onChange }: ThemeModeControlProps) {
  return (
    <fieldset className="grid gap-1.5">
      <legend className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Preview mode
      </legend>
      <div
        className="grid grid-cols-2 gap-1 rounded-[5px] border border-border-subtle bg-surface-muted p-1"
        role="radiogroup"
      >
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
                className="flex min-h-9 cursor-pointer items-center justify-center rounded-[4px] border border-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground peer-checked:border-border peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-soft peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
              >
                {mode === "light" ? "Light" : "Dark"}
              </label>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-muted-foreground" aria-live="polite">
        Current preview: {value === "light" ? "Light" : "Dark"}.
      </p>
    </fieldset>
  );
}

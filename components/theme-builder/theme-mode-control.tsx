import type { ThemeMode } from "@pycolors/color-engine";

type ThemeModeControlProps = Readonly<{
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}>;

const MODE_OPTIONS: readonly ThemeMode[] = ["light", "dark"];

export function ThemeModeControl({ value, onChange }: ThemeModeControlProps) {
  return (
    <fieldset className="shrink-0">
      <legend className="sr-only">Preview mode</legend>
      <div
        className="grid h-8 grid-cols-2 gap-0.5 rounded-[4px] border border-border-subtle bg-surface-muted p-0.5"
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
                className="flex h-7 cursor-pointer items-center justify-center rounded-[3px] border border-transparent px-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground peer-checked:border-border peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
              >
                {mode === "light" ? "Light" : "Dark"}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

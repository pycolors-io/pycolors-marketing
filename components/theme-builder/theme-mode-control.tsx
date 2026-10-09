import type { ThemeMode } from "@pycolors/color-engine";

type ThemeModeControlProps = Readonly<{
  idPrefix?: string;
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}>;

const MODE_OPTIONS: readonly ThemeMode[] = ["light", "dark"];

export function ThemeModeControl({
  idPrefix = "theme-builder-mode",
  value,
  onChange,
}: ThemeModeControlProps) {
  return (
    <fieldset className="shrink-0">
      <legend className="sr-only">Preview mode</legend>
      <div
        className="grid h-10 grid-cols-2 gap-0.5 rounded-[5px] border border-border-subtle bg-surface-muted p-0.5"
        role="radiogroup"
        aria-label="Preview mode"
      >
        {MODE_OPTIONS.map((mode) => {
          const inputId = `${idPrefix}-${mode}`;
          const selected = value === mode;

          return (
            <div key={mode} className="relative">
              <input
                id={inputId}
                name={idPrefix}
                type="radio"
                value={mode}
                checked={selected}
                onChange={() => onChange(mode)}
                className="peer sr-only"
              />
              <label
                htmlFor={inputId}
                className="flex h-full min-h-8 cursor-pointer items-center justify-center rounded-[3px] border border-transparent px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground peer-checked:border-border/60 peer-checked:bg-background peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 motion-reduce:transition-none"
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

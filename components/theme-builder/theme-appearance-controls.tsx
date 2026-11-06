import { useId } from "react";
import {
  APPEARANCE_OPTIONS,
  type AppearancePreferences,
} from "@/lib/appearance-contract";

type Props = Readonly<{
  value: AppearancePreferences;
  mode: "light" | "dark";
  dashboard: boolean;
  onChange: (update: Partial<AppearancePreferences>) => void;
}>;
const selectClass =
  "mt-2 min-h-10 w-full min-w-0 rounded-[4px] border border-border-subtle bg-background px-2.5 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring max-sm:min-h-11";

export function ThemeAppearanceControls({
  value,
  mode,
  dashboard,
  onChange,
}: Props) {
  const id = useId();
  function choice<K extends keyof AppearancePreferences>(
    key: K,
    label: string,
  ) {
    return (
      <div key={key}>
        <label htmlFor={`${id}-${key}`} className="text-xs font-medium">
          {label}
        </label>
        <select
          id={`${id}-${key}`}
          className={selectClass}
          value={value[key]}
          onChange={(event) => {
            const selected = APPEARANCE_OPTIONS[key].find(
              (option) => option.value === event.target.value,
            );
            if (selected) onChange({ [key]: selected.value });
          }}
        >
          {APPEARANCE_OPTIONS[key].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  const sidebarMode =
    value.sidebar === "expanded"
      ? "expanded"
      : value.sidebarCollapse === "icons"
        ? "icons"
        : "hidden";
  return (
    <div className="mt-5 space-y-5">
      <fieldset>
        <legend className="text-sm font-medium">Radius</legend>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {APPEARANCE_OPTIONS.radius.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={value.radius === option.value}
              onClick={() => onChange({ radius: option.value })}
              className={`min-h-8 rounded-[3px] border border-border-subtle px-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring max-sm:min-h-11 ${value.radius === option.value ? "bg-foreground text-background" : "hover:bg-surface-muted"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
      {dashboard ? (
        <details className="border-t border-border-subtle pt-5">
          <summary className="cursor-pointer text-sm font-medium">
            Dashboard preview
          </summary>
          <div className="mt-4 space-y-4">
            {choice("scale", "Interface scale")}
            {choice("density", "Density")}
            {choice("width", "Content width")}
            <div>
              <label
                htmlFor={`${id}-sidebar-mode`}
                className="text-xs font-medium"
              >
                Sidebar
              </label>
              <select
                id={`${id}-sidebar-mode`}
                className={selectClass}
                value={sidebarMode}
                onChange={(event) => {
                  const mode = event.target.value;
                  if (mode === "expanded") onChange({ sidebar: "expanded" });
                  else if (mode === "icons" || mode === "hidden")
                    onChange({ sidebar: "collapsed", sidebarCollapse: mode });
                }}
              >
                <option value="expanded">Expanded</option>
                <option value="icons">Icons</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
            {choice("sidebarVariant", "Sidebar style")}
            {choice(
              mode === "light" ? "sidebarLight" : "sidebarDark",
              "Sidebar background",
            )}
            {choice("header", "Header")}
            {choice("canvas", "Canvas")}
            {choice("motion", "Motion")}
          </div>
        </details>
      ) : null}
    </div>
  );
}

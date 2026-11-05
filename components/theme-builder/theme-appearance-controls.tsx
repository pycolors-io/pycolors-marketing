import { useCopy } from "@/lib/i18n/use-copy";
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
  const tSite = useCopy();

  const id = useId();
  function choice<K extends keyof AppearancePreferences>(
    key: K,
    label: string,
  ) {
    return (
      <div key={key}>
        <label htmlFor={`${id}-${key}`} className="text-xs font-medium">
          {tSite(label)}
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
              {tSite(option.label)}
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
        <legend className="text-sm font-medium">{tSite("Radius")}</legend>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {APPEARANCE_OPTIONS.radius.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={value.radius === option.value}
              onClick={() => onChange({ radius: option.value })}
              className={`min-h-8 rounded-[3px] border border-border-subtle px-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring max-sm:min-h-11 ${value.radius === option.value ? "bg-foreground text-background" : "hover:bg-surface-muted"}`}
            >
              {tSite(option.label)}
            </button>
          ))}
        </div>
      </fieldset>
      {dashboard ? (
        <details className="border-t border-border-subtle pt-5">
          <summary className="cursor-pointer text-sm font-medium">
            {tSite("Dashboard preview")}
          </summary>
          <div className="mt-4 space-y-4">
            {tSite(choice("scale", "Interface scale"))}
            {tSite(choice("density", "Density"))}
            {tSite(choice("width", "Content width"))}
            <div>
              <label
                htmlFor={`${id}-sidebar-mode`}
                className="text-xs font-medium"
              >
                {tSite("Sidebar")}
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
                <option value="expanded">{tSite("Expanded")}</option>
                <option value="icons">{tSite("Icons")}</option>
                <option value="hidden">{tSite("Hidden")}</option>
              </select>
            </div>
            {tSite(choice("sidebarVariant", "Sidebar style"))}
            {tSite(
              choice(
                mode === "light" ? "sidebarLight" : "sidebarDark",
                "Sidebar background",
              ),
            )}
            {tSite(choice("header", "Header"))}
            {tSite(choice("canvas", "Canvas"))}
            {tSite(choice("motion", "Motion"))}
          </div>
        </details>
      ) : null}
    </div>
  );
}

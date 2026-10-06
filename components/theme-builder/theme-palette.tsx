import {
  SCALE_STEPS,
  SEMANTIC_ROLES,
  type ScaleStep,
  type SemanticRole,
  type ThemeMode,
  type ThemeModeResult,
} from "@pycolors/color-engine";
import { cn } from "@pycolors/ui";
import { CopyButton } from "./copy-button";
import styles from "./theme-preview.module.css";

export type ThemePaletteSelection =
  | Readonly<{ type: "scale"; family: "accent" | "neutral"; step: ScaleStep }>
  | Readonly<{ type: "semantic"; role: SemanticRole }>;

const ROLE_GROUPS = [
  { label: "Surfaces", roles: ["background", "card", "popover", "muted"] },
  {
    label: "Actions",
    roles: ["primary", "secondary", "accent", "destructive"],
  },
  {
    label: "Borders & focus",
    roles: ["border", "border-subtle", "input", "ring"],
  },
  {
    label: "Text",
    roles: [
      "foreground",
      "muted-foreground",
      "primary-foreground",
      "destructive-foreground",
    ],
  },
] as const satisfies readonly {
  label: string;
  roles: readonly SemanticRole[];
}[];

export function ThemePalette({
  theme,
  mode,
  selection,
  onSelect,
}: Readonly<{
  theme: ThemeModeResult;
  mode: ThemeMode;
  selection: ThemePaletteSelection;
  onSelect: (selection: ThemePaletteSelection) => void;
}>) {
  const selected =
    selection.type === "semantic"
      ? theme.semantic[selection.role]
      : theme.scales[selection.family][selection.step];
  const selectedLabel =
    selection.type === "semantic"
      ? `--${selection.role}`
      : `${selection.family === "accent" ? "Accent" : "Neutral"} · Shade ${selection.step}`;
  const matchingRoles = SEMANTIC_ROLES.filter(
    (role) => theme.semantic[role].srgbHex === selected.srgbHex,
  );

  return (
    <section
      aria-label="Theme palette"
      className={`${styles.preview} min-w-0 bg-background text-foreground`}
    >
      <header className="border-b border-border-subtle p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Your color palette
          </h2>
          <span className="rounded-full border border-border-subtle px-2.5 py-1 text-xs">
            {mode === "light" ? "Light" : "Dark"} mode
          </span>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Explore your accent and neutral shades. Select a color to inspect or
          copy it.
        </p>
      </header>

      <div className="space-y-6 p-5 sm:p-6">
        {(["accent", "neutral"] as const).map((family) => (
          <fieldset key={family} className="min-w-0">
            <legend className="mb-3 text-sm font-medium">
              {family === "accent" ? "Accent" : "Neutral"}{" "}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                12 generated shades
              </span>
            </legend>
            <div className={styles.paletteScale}>
              {SCALE_STEPS.map((step) => {
                const color = theme.scales[family][step];
                const active =
                  selection.type === "scale" &&
                  selection.family === family &&
                  selection.step === step;
                return (
                  <button
                    key={step}
                    type="button"
                    aria-label={`${family === "accent" ? "Accent" : "Neutral"} shade ${step}, ${color.srgbHex}`}
                    aria-pressed={active}
                    onClick={() => onSelect({ type: "scale", family, step })}
                    className="group min-w-0 rounded-[5px] text-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span
                      className={cn(
                        "block h-12 rounded-[4px] border border-black/10 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none",
                        active &&
                          "ring-2 ring-foreground ring-offset-2 ring-offset-background",
                      )}
                      style={{ backgroundColor: color.srgbHex }}
                    />
                    <span className="mt-2 block text-xs tabular-nums text-muted-foreground">
                      {step}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <section
          aria-label="Selected color"
          className="rounded-[5px] border border-border-subtle p-4"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="size-11 shrink-0 rounded-[4px] border border-black/10"
              style={{ backgroundColor: selected.srgbHex }}
            />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Selected color · {mode === "light" ? "Light" : "Dark"}
              </p>
              <h3 className="mt-1 break-words text-sm font-medium">
                {selectedLabel}
              </h3>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {(
              [
                ["HEX", selected.srgbHex],
                ["OKLCH", selected.oklch],
              ] as const
            ).map(([format, value]) => (
              <div
                key={format}
                className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2"
              >
                <div className="min-w-0 space-y-1">
                  <p className="text-[11px] text-muted-foreground">{format}</p>
                  <code className="block select-all break-all text-xs leading-5">
                    {value}
                  </code>
                </div>
                <CopyButton
                  value={value}
                  label={`Copy ${format}`}
                  className="flex-col items-end gap-1"
                  buttonClassName="min-h-10 rounded-[5px]"
                  statusClassName="min-h-4 max-w-56 text-right"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {matchingRoles.length > 0
              ? `Used by ${matchingRoles.map((role) => `--${role}`).join(", ")}.`
              : "A generated shade. It is not assigned to a named color role in this mode."}
          </p>
        </section>

        <section aria-labelledby="theme-palette-roles-heading">
          <h3 id="theme-palette-roles-heading" className="text-sm font-medium">
            Colors by purpose
          </h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Use these named roles in your app. They come directly from your
            exported theme.
          </p>
          <div className={`${styles.paletteRoles} mt-4`}>
            {ROLE_GROUPS.map((group) => (
              <fieldset key={group.label} className="min-w-0">
                <legend className="mb-2 text-xs font-medium">
                  {group.label}
                </legend>
                <div className="space-y-1">
                  {group.roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      aria-label={`Inspect ${role}`}
                      aria-pressed={
                        selection.type === "semantic" && selection.role === role
                      }
                      onClick={() => onSelect({ type: "semantic", role })}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-2 rounded-[5px] border px-2 text-left text-xs outline-none hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
                        selection.type === "semantic" && selection.role === role
                          ? "border-foreground bg-surface-muted"
                          : "border-transparent",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="size-5 shrink-0 rounded-[3px] border border-black/10"
                        style={{
                          backgroundColor: theme.semantic[role].srgbHex,
                        }}
                      />
                      <span className="min-w-0 break-words">{role}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

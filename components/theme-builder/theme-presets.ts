import {
  buildContrastResult,
  hexToSrgb,
  srgbToOklch,
  toSerializedColor,
  type SerializedThemeResult,
  type SemanticTokenMap,
  type ThemeWarning,
} from "@pycolors/color-engine";
import {
  APPEARANCE_PALETTES,
  APPEARANCE_ROLES,
  type AppearancePalette,
} from "@/lib/appearance-contract";

export const THEME_BUILDER_PRESETS = APPEARANCE_PALETTES;
export function findThemePreset(id: string) {
  return THEME_BUILDER_PRESETS.find((preset) => preset.value === id);
}
/** Keep the engine's primitive scales; the shared, reviewed semantic snapshots
 * make a named preset identical in the builder, its exports and Starter Pro. */
export function applyPresetTokens(
  theme: SerializedThemeResult,
  id: AppearancePalette,
): SerializedThemeResult {
  const preset = findThemePreset(id);
  if (!preset) throw new Error("Unknown theme preset.");
  const modes = { ...theme.modes };
  for (const mode of ["light", "dark"] as const) {
    const semantic = Object.fromEntries(
      APPEARANCE_ROLES.map((role) => {
        const srgb = hexToSrgb(preset.modes[mode][role]);
        return [role, toSerializedColor(srgbToOklch(srgb), srgb)];
      }),
    ) as SemanticTokenMap;
    const selected =
      mode === "light" &&
      theme.input.lightBackgroundColor !== preset.draft.lightBackgroundColor
        ? { ...semantic, background: theme.modes.light.semantic.background }
        : semantic;
    modes[mode] = { scales: theme.modes[mode].scales, semantic: selected };
  }
  const contrasts = theme.contrasts.map((pair) =>
    buildContrastResult(
      pair.mode,
      pair.foregroundRole,
      pair.backgroundRole,
      modes[pair.mode].semantic[pair.foregroundRole],
      modes[pair.mode].semantic[pair.backgroundRole],
      pair.target.usage,
    ),
  );
  const warnings: ThemeWarning[] = theme.warnings.filter(
    (warning) =>
      warning.code === "gamut-mapped" || warning.code === "input-normalized",
  );
  for (const pair of contrasts)
    if (pair.status === "fail")
      warnings.push({
        code: "contrast-below-target",
        severity: "warning",
        mode: pair.mode,
        role: pair.backgroundRole,
        usage: pair.target.usage,
        message: `${pair.foregroundRole} on ${pair.backgroundRole} measures ${pair.ratio.toFixed(2)}:1, below the ${pair.target.minimumRatio}:1 ${pair.target.usage} target in ${pair.mode} mode. Review the theme in context.`,
      });
  return { ...theme, modes, contrasts, warnings };
}

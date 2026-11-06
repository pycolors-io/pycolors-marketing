import {
  SEMANTIC_ROLES,
  type SerializedThemeResult,
  type ThemeMode,
} from "@pycolors/color-engine";
import {
  type AppearancePreferences,
  type AppearancePalette,
  type AppAppearanceConfig,
  type AppearanceColors,
  APPEARANCE_PALETTES,
} from "@/lib/appearance-contract";
import type { ThemeFile } from "./theme-file";

/** A developer-owned config file, not executable content imported into the browser. */
export function createStarterProAppearanceFile(
  theme: SerializedThemeResult,
  appearance: AppearancePreferences,
  presetId: AppearancePalette | null,
  mode: ThemeMode,
): ThemeFile {
  const modeColors = (mode: ThemeMode): AppearanceColors["light"] =>
    Object.fromEntries<string>(
      SEMANTIC_ROLES.map((role) => [
        role,
        theme.modes[mode].semantic[role].srgbHex,
      ]),
    ) as AppearanceColors["light"];
  const colors: AppearanceColors = {
    light: modeColors("light"),
    dark: modeColors("dark"),
  };
  const preset = APPEARANCE_PALETTES.find((item) => item.value === presetId);
  const exactPreset =
    preset &&
    (["light", "dark"] as const).every((mode) =>
      SEMANTIC_ROLES.every(
        (role) => preset.modes[mode][role] === colors[mode][role],
      ),
    );
  const config: AppAppearanceConfig = {
    palette: exactPreset ? preset.value : "custom",
    mode,
    preferences: appearance,
    colors: exactPreset ? null : colors,
  };
  return {
    fileName: "appearance.ts",
    mediaType: "text/typescript",
    content: `import type { AppAppearanceConfig } from "../lib/appearance-contract";\n\n/** Generated with PyColors Theme Builder. Replace config/appearance.ts.\n * Browser preferences remain in control; Customize → Reset restores these defaults. */\nexport const appearanceConfig: AppAppearanceConfig = ${JSON.stringify(config, null, 2)};\n`,
  };
}

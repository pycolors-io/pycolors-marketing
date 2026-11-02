import {
  APPEARANCE_DEFAULTS,
  parseAppearancePreferences,
  type AppearancePreferences,
} from "@/lib/appearance-contract";
import {
  restoreThemeBuilderState,
  type ThemeBuilderDraft,
  type ThemeBuilderState,
} from "./theme-builder-state";
import { findThemePreset } from "./theme-presets";
import { THEME_FONTS, type ThemeFont } from "./theme-typography";
import type { ThemeFile } from "./theme-file";

export const MAX_THEME_CONFIGURATION_BYTES = 16 * 1024;
export const THEME_CONFIGURATION_SIZE_ERROR =
  "Choose a file created with Save configuration (16 KB maximum). Color-token exports cannot be reopened. Your theme has not changed.";
const CONFIGURATION_FORMAT = "pycolors-theme-builder";
export type RestoredThemeConfiguration = Readonly<{
  state: ThemeBuilderState;
  font: ThemeFont;
  appearance: AppearancePreferences;
}>;
type ConfigurationResult =
  | Readonly<{ ok: true; value: RestoredThemeConfiguration }>
  | Readonly<{ ok: false; message: string }>;
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function createThemeConfigurationFile(
  state: ThemeBuilderState,
  font: ThemeFont,
  appearance: AppearancePreferences = APPEARANCE_DEFAULTS,
): ThemeFile {
  if (Object.keys(state.fieldErrors).length > 0 || state.generationError)
    throw new Error(
      "Finish the highlighted fields before saving a configuration.",
    );
  const preferences = parseAppearancePreferences({
    ...appearance,
    font: font.id,
  });
  if (!preferences)
    throw new Error("Choose a supported font and appearance settings.");
  return {
    fileName: `${state.generatedTheme.input.slug ?? "pycolors-theme"}.pycolors-theme.json`,
    mediaType: "application/json",
    content: `${JSON.stringify({ format: CONFIGURATION_FORMAT, version: 2, theme: state.draft, presetId: state.presetId, fontId: font.id, previewMode: state.previewMode, appearance: preferences }, null, 2)}\n`,
  };
}

/** Accept legacy v1 files. Only validated inputs and known preferences cross this boundary. */
export function parseThemeConfiguration(content: string): ConfigurationResult {
  if (
    new TextEncoder().encode(content).byteLength > MAX_THEME_CONFIGURATION_BYTES
  )
    return { ok: false, message: THEME_CONFIGURATION_SIZE_ERROR };
  let parsed: unknown;
  try {
    parsed = JSON.parse(content.replace(/^\uFEFF/u, ""));
  } catch {
    return {
      ok: false,
      message:
        "This file is not valid JSON. Choose a file created with Save configuration.",
    };
  }
  if (!isRecord(parsed) || parsed.format !== CONFIGURATION_FORMAT)
    return {
      ok: false,
      message:
        "Choose a file created with Save configuration. Color-token exports cannot be reopened as configurations.",
    };
  if (parsed.version !== 1 && parsed.version !== 2)
    return {
      ok: false,
      message:
        "This configuration version is not supported. Your current theme has not changed.",
    };
  const fields = parsed.theme;
  if (
    !isRecord(fields) ||
    typeof fields.brandColor !== "string" ||
    typeof fields.name !== "string" ||
    typeof fields.neutralColor !== "string" ||
    typeof fields.lightBackgroundColor !== "string"
  )
    return {
      ok: false,
      message: "This configuration is missing valid theme settings.",
    };
  if (parsed.previewMode !== "light" && parsed.previewMode !== "dark")
    return {
      ok: false,
      message: "The configuration must select a light or dark preview.",
    };
  const fontId =
    parsed.version === 1
      ? parsed.fontId === "system-sans"
        ? "system"
        : parsed.fontId === "system-mono"
          ? "mono"
          : parsed.fontId
      : parsed.fontId;
  const font = THEME_FONTS.find((item) => item.id === fontId);
  if (!font)
    return {
      ok: false,
      message: "This configuration selects an unsupported font.",
    };
  const appearance =
    parsed.version === 1
      ? parseAppearancePreferences({ ...APPEARANCE_DEFAULTS, font: font.id })
      : parseAppearancePreferences(parsed.appearance);
  if (!appearance || appearance.font !== font.id)
    return {
      ok: false,
      message: "This configuration contains unsupported appearance settings.",
    };
  const draft: ThemeBuilderDraft = {
    brandColor: fields.brandColor,
    name: fields.name,
    neutralColor: fields.neutralColor,
    lightBackgroundColor: fields.lightBackgroundColor,
  };
  const preset =
    parsed.version === 2 && typeof parsed.presetId === "string"
      ? findThemePreset(parsed.presetId)
      : undefined;
  if (
    parsed.version === 2 &&
    parsed.presetId !== null &&
    (!preset ||
      !(["brandColor", "neutralColor"] as const).every(
        (key) => draft[key].toLowerCase() === preset.draft[key],
      ))
  )
    return {
      ok: false,
      message: "The saved preset does not match its theme colors.",
    };
  const restored = restoreThemeBuilderState(
    draft,
    parsed.previewMode,
    preset?.value ?? null,
  );
  if (!restored.ok) return restored;
  return { ok: true, value: { state: restored.state, font, appearance } };
}

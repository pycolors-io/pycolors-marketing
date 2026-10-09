import {
  restoreThemeBuilderState,
  type ThemeBuilderDraft,
  type ThemeBuilderState,
} from "./theme-builder-state";
import { THEME_FONTS, type ThemeFont } from "./theme-typography";
import type { ThemeFile } from "./theme-file";

export const MAX_THEME_CONFIGURATION_BYTES = 16 * 1024;
export const THEME_CONFIGURATION_SIZE_ERROR =
  "Choose a file created with Save configuration (16 KB maximum). Color-token exports cannot be reopened. Your theme has not changed.";
const CONFIGURATION_FORMAT = "pycolors-theme-builder";

export type RestoredThemeConfiguration = Readonly<{
  state: ThemeBuilderState;
  font: ThemeFont;
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
): ThemeFile {
  if (Object.keys(state.fieldErrors).length > 0 || state.generationError) {
    throw new Error(
      "Finish the highlighted fields before saving a configuration.",
    );
  }
  return {
    fileName: `${state.generatedTheme.input.slug ?? "pycolors-theme"}.pycolors-theme.json`,
    mediaType: "application/json",
    content: `${JSON.stringify(
      {
        format: CONFIGURATION_FORMAT,
        version: 1,
        theme: state.draft,
        fontId: font.id,
        previewMode: state.previewMode,
      },
      null,
      2,
    )}\n`,
  };
}

/** Import only validated inputs. Never trust executable content or generated tokens. */
export function parseThemeConfiguration(content: string): ConfigurationResult {
  if (content.length > MAX_THEME_CONFIGURATION_BYTES) {
    return {
      ok: false,
      message: THEME_CONFIGURATION_SIZE_ERROR,
    };
  }
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
  if (!isRecord(parsed) || parsed.format !== CONFIGURATION_FORMAT) {
    return {
      ok: false,
      message:
        "Choose a file created with Save configuration. Color-token exports cannot be reopened as configurations.",
    };
  }
  if (parsed.version !== 1) {
    return {
      ok: false,
      message:
        "This configuration version is not supported. Your current theme has not changed.",
    };
  }
  const fields = parsed.theme;
  if (
    !isRecord(fields) ||
    typeof fields.brandColor !== "string" ||
    typeof fields.name !== "string" ||
    typeof fields.neutralColor !== "string" ||
    typeof fields.lightBackgroundColor !== "string"
  ) {
    return {
      ok: false,
      message: "This configuration is missing valid theme settings.",
    };
  }
  if (parsed.previewMode !== "light" && parsed.previewMode !== "dark") {
    return {
      ok: false,
      message: "The configuration must select a light or dark preview.",
    };
  }
  const font = THEME_FONTS.find((item) => item.id === parsed.fontId);
  if (!font) {
    return {
      ok: false,
      message: "This configuration selects an unsupported font.",
    };
  }
  // Pick known fields instead of spreading untrusted JSON into application state.
  const draft: ThemeBuilderDraft = {
    brandColor: fields.brandColor,
    name: fields.name,
    neutralColor: fields.neutralColor,
    lightBackgroundColor: fields.lightBackgroundColor,
  };
  const restored = restoreThemeBuilderState(draft, parsed.previewMode);
  if (!restored.ok) return restored;
  return { ok: true, value: { state: restored.state, font } };
}

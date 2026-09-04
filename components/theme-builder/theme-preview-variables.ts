import { SEMANTIC_ROLES, type ThemeModeResult } from "@pycolors/color-engine";

/** Build the complete generated custom-property set for one preview root. */
export function createThemePreviewVariables(
  mode: ThemeModeResult,
): Record<string, string> {
  return Object.fromEntries(
    SEMANTIC_ROLES.map((role) => [`--${role}`, mode.semantic[role].srgbHex]),
  );
}

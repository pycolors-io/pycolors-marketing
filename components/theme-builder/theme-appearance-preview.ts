import {
  APPEARANCE_RADII,
  type AppearancePreferences,
} from "@/lib/appearance-contract";
export function appearancePreviewVariables(
  value: AppearancePreferences,
): Record<string, string> {
  return {
    "--preview-radius": APPEARANCE_RADII[value.radius],
    "--radius": APPEARANCE_RADII[value.radius],
    "--preview-scale": String(Number(value.scale) / 100),
  };
}

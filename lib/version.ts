export const APP_VERSION = '1.1.0' as const;
export const APP_MAJOR = 'v1' as const;

export function formatVersion(v = APP_VERSION) {
  return `v${v}`;
}

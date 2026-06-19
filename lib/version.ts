export const APP_VERSION = '1.17.1' as const;
export const UI_VERSION = '1.1.1' as const;

export const APP_VERSION_TAG = `v${APP_VERSION}` as const;
export const APP_MAJOR = 'v1' as const;

export function formatVersion(v: string = UI_VERSION) {
  return `v${v}`;
}

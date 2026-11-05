export const PRIVACY_CONSENT_KEY = "pycolors_privacy_consent";
export const PRIVACY_SETTINGS_EVENT = "pycolors:privacy-settings";
export type PrivacyConsent = "accepted" | "denied";

export function readPrivacyConsent(): PrivacyConsent | null {
  try {
    const value = globalThis.localStorage.getItem(PRIVACY_CONSENT_KEY);
    return value === "accepted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function storePrivacyConsent(value: PrivacyConsent) {
  try {
    globalThis.localStorage.setItem(PRIVACY_CONSENT_KEY, value);
  } catch {
    // The choice still applies in this page when persistent storage is blocked.
  }
}

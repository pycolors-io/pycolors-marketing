import { PRIVACY_CONSENT_KEY } from '@/components/privacy/consent-gated-gtm';

type MoneyPathEventName =
  | 'buy_clicked'
  | 'checkout_redirect_started'
  | 'checkout_redirect_failed'
  | 'checkout_success_viewed'
  | 'claim_page_viewed'
  | 'recovery_page_viewed';

type MoneyPathEvent = {
  readonly event: MoneyPathEventName;
  readonly productSlug?: string | null;
  readonly productName?: string | null;
  readonly page?: string;
  readonly status?: string | null;
};

type DataLayerWindow = Window & {
  dataLayer?: MoneyPathEvent[];
};

export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return (
      window.localStorage.getItem(PRIVACY_CONSENT_KEY) === 'accepted'
    );
  } catch {
    return false;
  }
}

export function trackMoneyPathEvent(event: MoneyPathEvent) {
  if (!hasAnalyticsConsent()) {
    return;
  }

  try {
    const targetWindow = window as DataLayerWindow;
    targetWindow.dataLayer = targetWindow.dataLayer ?? [];
    targetWindow.dataLayer.push(event);
  } catch {
    // Analytics must never interrupt checkout or recovery flows.
  }
}

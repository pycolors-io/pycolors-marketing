'use client';

import * as React from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'pycolors_privacy_consent';

type ConsentEvent = CustomEvent<{
  value: 'accepted' | 'denied';
}>;

export function ConsentGatedGtm({
  gtmId,
}: {
  readonly gtmId?: string;
}) {
  const [hasConsent, setHasConsent] = React.useState(false);

  React.useEffect(() => {
    if (!gtmId) return;

    setHasConsent(globalThis.localStorage.getItem(CONSENT_KEY) === 'accepted');

    function handleConsent(event: Event) {
      const consentEvent = event as ConsentEvent;
      setHasConsent(consentEvent.detail.value === 'accepted');
    }

    globalThis.addEventListener(
      'pycolors:privacy-consent',
      handleConsent,
    );

    return () => {
      globalThis.removeEventListener(
        'pycolors:privacy-consent',
        handleConsent,
      );
    };
  }, [gtmId]);

  if (!gtmId || !hasConsent) {
    return null;
  }

  return (
    <Script
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
}

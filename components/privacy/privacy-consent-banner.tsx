'use client';

import * as React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

import { Button, cn } from '@pycolors/ui';

const CONSENT_KEY = 'pycolors_privacy_consent';

type ConsentValue = 'accepted' | 'denied';

export function PrivacyConsentBanner() {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    if (!globalThis.localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const saveConsent = React.useCallback((value: ConsentValue) => {
    globalThis.localStorage.setItem(CONSENT_KEY, value);

    globalThis.dispatchEvent(
      new CustomEvent('pycolors:privacy-consent', {
        detail: { value },
      }),
    );

    setVisible(false);
  }, []);

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 w-full max-w-110 px-4 sm:px-0">
      <div
        role="alertdialog"
        aria-labelledby="privacy-consent-title"
        aria-describedby="privacy-consent-description"
        className={cn(
          'pointer-events-auto relative overflow-hidden rounded-[5px]',
          'border border-border-subtle bg-background/92 backdrop-blur-xl',
          'shadow-soft',
          'animate-in fade-in slide-in-from-bottom-4 duration-500',
        )}
      >
        <button
          type="button"
          aria-label="Close privacy banner"
          onClick={() => saveConsent('denied')}
          className={cn(
            'absolute right-3 top-3 inline-flex size-7 items-center justify-center',
            'rounded-[4px] text-muted-foreground/70 transition-colors',
            'hover:bg-muted hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="p-5">
          <div className="pr-8">
            <p
              id="privacy-consent-title"
              className="font-brand text-[13px] font-semibold tracking-tight text-foreground"
            >
              Your privacy
            </p>

            <p
              id="privacy-consent-description"
              className="mt-2 text-sm leading-6 text-muted-foreground"
            >
              PyColors uses essential cookies to run the site and
              optional analytics to improve product experience,
              performance, and documentation quality.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-border-subtle pt-4">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="h-7 rounded-[4px] px-2.5 text-[11px] font-medium"
                onClick={() => saveConsent('accepted')}
              >
                Accept all
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-7 rounded-[4px] px-2.5 text-[11px] font-medium"
                onClick={() => saveConsent('denied')}
              >
                Deny
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-border"
              />

              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

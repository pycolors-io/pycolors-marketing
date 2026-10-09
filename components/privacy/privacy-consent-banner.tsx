"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";

const CONSENT_KEY = "pycolors_privacy_consent";

type ConsentValue = "accepted" | "denied";

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
      new CustomEvent("pycolors:privacy-consent", {
        detail: { value },
      }),
    );

    setVisible(false);
  }, []);

  if (!mounted || !visible) {
    return null;
  }

  return (
    <section
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 p-4 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-96",
        "max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-lg border border-border bg-background text-foreground shadow-soft",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200",
      )}
    >
      <h2
        id="privacy-consent-title"
        className="text-[13px] font-semibold leading-5"
      >
        Cookie preferences
      </h2>
      <p
        id="privacy-consent-description"
        className="mt-1.5 text-[13px] leading-5 text-muted-foreground"
      >
        Essential cookies keep PyColors working. Optional analytics help us
        improve the site and documentation.
      </p>
      <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
        {[
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex min-h-8 items-center rounded-sm underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none max-sm:min-h-11 [@media(pointer:coarse)]:min-h-11"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => saveConsent("denied")}
        >
          Reject optional
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => saveConsent("accepted")}
        >
          Accept optional
        </Button>
      </div>
    </section>
  );
}

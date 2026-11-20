"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

import { cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import {
  PRIVACY_SETTINGS_EVENT,
  readPrivacyConsent,
  storePrivacyConsent,
  type PrivacyConsent,
} from "@/lib/privacy-consent";

import styles from "./privacy-consent-banner.module.css";

export function PrivacyConsentSettings() {
  const tSite = useCopy();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        globalThis.dispatchEvent(new Event(PRIVACY_SETTINGS_EVENT))
      }
    >
      {tSite("Manage cookie preferences")}
    </Button>
  );
}

export function PrivacyConsentBanner({
  locale = "en",
}: {
  locale?: "en" | "fr";
}) {
  const fr = locale === "fr";
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const rejectRef = React.useRef<HTMLButtonElement>(null);
  const returnFocus = React.useRef<HTMLElement | null>(null);
  const focusRequested = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);

    if (!readPrivacyConsent()) {
      setVisible(true);
    }
    function openPreferences() {
      returnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      focusRequested.current = true;
      setVisible(true);
    }
    globalThis.addEventListener(PRIVACY_SETTINGS_EVENT, openPreferences);
    return () =>
      globalThis.removeEventListener(PRIVACY_SETTINGS_EVENT, openPreferences);
  }, []);

  React.useEffect(() => {
    if (visible && focusRequested.current) {
      focusRequested.current = false;
      rejectRef.current?.focus();
    }
  }, [visible]);

  const saveConsent = React.useCallback((value: PrivacyConsent) => {
    const previouslyAccepted = readPrivacyConsent() === "accepted";
    storePrivacyConsent(value);

    globalThis.dispatchEvent(
      new CustomEvent("pycolors:privacy-consent", {
        detail: { value },
      }),
    );

    setVisible(false);
    returnFocus.current?.focus();
    returnFocus.current = null;
    if (value === "denied" && previouslyAccepted) {
      // Removing Next's Script component cannot stop tags already executed.
      globalThis.location.reload();
    }
  }, []);

  if (!mounted || !visible) {
    return null;
  }

  return (
    <section
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
      className={cn(
        styles.banner,
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200",
      )}
    >
      <div className={styles.heading}>
        <span className={styles.icon} aria-hidden="true">
          <ShieldCheck focusable="false" />
        </span>
        <h2 id="privacy-consent-title">
          {fr ? "Préférences de confidentialité" : "Cookie preferences"}
        </h2>
      </div>
      <p id="privacy-consent-description" className={styles.description}>
        {fr
          ? "Le stockage essentiel assure le fonctionnement de PyColors. Les balises Google facultatives se chargent après votre accord. Vercel Web Analytics est distinct ; consultez notre politique de confidentialité pour les détails."
          : "Essential storage keeps PyColors working. Optional Google tags load only after acceptance. Vercel Web Analytics is separate; see Privacy for details."}
      </p>
      <div className={styles.policies}>
        {[
          { label: fr ? "Confidentialité" : "Privacy", href: "/privacy" },
          { label: fr ? "Conditions" : "Terms", href: "/terms" },
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
      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          className={styles.choice}
          ref={rejectRef}
          onClick={() => saveConsent("denied")}
        >
          {fr ? "Refuser les facultatifs" : "Reject optional"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className={styles.choice}
          onClick={() => saveConsent("accepted")}
        >
          {fr ? "Accepter les facultatifs" : "Accept optional"}
        </Button>
      </div>
    </section>
  );
}

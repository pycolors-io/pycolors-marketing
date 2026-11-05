"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";
import styles from "./purchase-support.module.css";

export function SupportEmail({
  email,
  label = "Support email",
  copyLabel = "Copy support email",
}: Readonly<{ email: string; label?: string; copyLabel?: string }>) {
  const tSite = useCopy();

  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const [copying, setCopying] = useState(false);

  async function copyEmail() {
    setCopying(true);
    setStatus("idle");
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className={styles.emailPanel}>
      <div className={styles.emailRow}>
        <div className="min-w-0">
          <p className={styles.emailLabel}>{tSite(label)}</p>
          <a href={`mailto:${email}`} className={styles.email}>
            {tSite(email)}
          </a>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={styles.copyButton}
          aria-label={tSite(copyLabel)}
          title={tSite(copyLabel)}
          disabled={copying}
          onClick={copyEmail}
        >
          {status === "copied" ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>
      <p role="status" aria-live="polite" className={styles.copyStatus}>
        {tSite(
          status === "copied"
            ? "Email address copied."
            : status === "error"
              ? "Copy unavailable. Select the address to copy it."
              : "Copy the address to use your preferred email service.",
        )}
      </p>
    </div>
  );
}

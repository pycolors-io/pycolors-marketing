"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleAlert,
  LoaderCircle,
  Mail,
  MailCheck,
  RefreshCcw,
} from "lucide-react";
import { Button, Input } from "@pycolors/ui";

import {
  recoverCommerceAccess,
  RECOVERY_FAILURE_MESSAGE,
} from "@/lib/api/client";
import {
  PRODUCT_DISPLAY,
  type PublicProductSlug,
} from "@/lib/products/public-catalog";
import { trackMoneyPathEvent } from "@/lib/analytics";
import styles from "./purchase-recovery.module.css";

export function PurchaseRecoveryForm() {
  const [productSlug, setProductSlug] = React.useState<PublicProductSlug | "">(
    "",
  );
  const submitting = React.useRef(false);
  const confirmationRef = React.useRef<HTMLDivElement>(null);
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    trackMoneyPathEvent({
      event: "recovery_page_viewed",
      page: "/orders/recover",
      status: "viewed",
    });
  }, []);

  React.useEffect(() => {
    if (done) confirmationRef.current?.focus({ preventScroll: true });
  }, [done]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !productSlug) return;
    submitting.current = true;

    try {
      setIsLoading(true);
      setError(null);
      await recoverCommerceAccess({ email, productSlug });
      setDone(true);
    } catch {
      setError(RECOVERY_FAILURE_MESSAGE);
    } finally {
      submitting.current = false;
      setIsLoading(false);
    }
  }

  return (
    <section
      aria-labelledby="recovery-form-heading"
      className={styles.formPanel}
    >
      <div className={styles.formContent}>
        <div className={styles.formHeading}>
          <span className={styles.formIcon}>
            <RefreshCcw className="size-5" aria-hidden="true" />
          </span>
          <span className={styles.eyebrow}>Your purchase details</span>
        </div>
        <h2 id="recovery-form-heading">
          {done ? "Check your email" : "Resend your access link"}
        </h2>
        <p className={styles.description}>
          Use the email from checkout and the product you purchased.
        </p>

        <div className={styles.formStage}>
          {done ? (
            <div
              ref={confirmationRef}
              role="status"
              aria-live="polite"
              tabIndex={-1}
              className={styles.confirmation}
            >
              <span className={styles.confirmationIcon}>
                <MailCheck className="size-6" aria-hidden="true" />
              </span>
              <h3>Recovery request received</h3>
              <p>
                If eligible purchase access is found and the request can be
                processed, we send a new claim email. This confirmation does not
                verify a purchase or email delivery. Check your inbox and spam
                folder.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                  id="recovery-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  label="Purchase email"
                  helperText="Use the same email address you used during checkout."
                  placeholder="you@example.com"
                  size="lg"
                  leftIcon={<Mail className="size-4" aria-hidden="true" />}
                  className={styles.emailInput}
                />

                <div className={styles.productField}>
                  <label htmlFor="recovery-product">Product</label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="recovery-product"
                      name="productSlug"
                      required
                      disabled={isLoading}
                      value={productSlug}
                      aria-describedby="recovery-product-help"
                      onChange={(event) => {
                        const value = event.target.value;
                        setProductSlug(
                          Object.hasOwn(PRODUCT_DISPLAY, value)
                            ? (value as PublicProductSlug)
                            : "",
                        );
                      }}
                      className={styles.productSelect}
                    >
                      <option value="" disabled>
                        Select your product
                      </option>
                      {Object.values(PRODUCT_DISPLAY).map((product) => (
                        <option key={product.slug} value={product.slug}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </div>
                  <p id="recovery-product-help">
                    Choose the product whose access you want to recover.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className={styles.submitButton}
                >
                  {isLoading ? "Sending..." : "Resend access link"}
                  {isLoading ? (
                    <LoaderCircle
                      className="size-4 animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRight className="size-4" aria-hidden="true" />
                  )}
                </Button>
              </form>
              {error ? (
                <div role="alert" className={styles.error}>
                  <CircleAlert
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">{error}</p>
                    <p>
                      Check your connection and try again later. If the error
                      continues, contact support before making another purchase.
                    </p>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
      <div className={styles.formFooter}>
        <p>
          Repeated requests may be temporarily limited. If you have tried
          several times, wait at least 30 minutes before trying again, or
          contact support.
        </p>
        <Link
          href="/docs/starter-pro/purchase-recovery"
          className={styles.textLink}
        >
          <BookOpen className="size-4 shrink-0" aria-hidden="true" />
          Starter Pro purchase recovery guide
          <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

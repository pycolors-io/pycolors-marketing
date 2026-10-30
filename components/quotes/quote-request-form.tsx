"use client";

import * as React from "react";
import Link from "next/link";
import { CircleAlert, LoaderCircle, Check, ChevronDown } from "lucide-react";
import { Input, Textarea } from "@pycolors/ui";
import { SiteButton } from "@/components/site-button";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
import {
  QUOTE_BUDGETS,
  quoteService,
  type QuoteField,
  type QuoteRequest,
  type QuoteService,
} from "@/lib/quotes/quote-request";
import {
  QuoteSubmissionError,
  submitQuoteRequest,
} from "@/lib/quotes/submit-quote-request";
import styles from "./quote-request.module.css";

const fieldErrors: Record<QuoteField, string> = {
  name: "Enter a name between 2 and 100 characters.",
  email: "Enter a valid email address.",
  company: "Keep the company name under 120 characters.",
  service: "Choose a service.",
  budget: "Choose a budget range or To be scoped.",
  timeline: "Keep the timeline under 100 characters.",
  brief: "Describe your project in 40–4,000 characters.",
};

export function QuoteRequestForm({
  initialService = "",
}: {
  initialService?: QuoteService | "";
}) {
  const [busy, setBusy] = React.useState(false);
  const [reference, setReference] = React.useState("");
  const [attemptId, setAttemptId] = React.useState("");
  const [error, setError] = React.useState<QuoteSubmissionError | null>(null);
  const inFlight = React.useRef(false);
  const request = React.useRef<{ fingerprint: string; id: string } | null>(
    null,
  );
  const controller = React.useRef<AbortController | null>(null);
  const confirmation = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => () => controller.current?.abort(), []);
  React.useEffect(() => {
    if (reference) confirmation.current?.focus();
  }, [reference]);
  React.useEffect(() => {
    if (!busy && error?.fields[0])
      document.getElementById(`quote-${error.fields[0]}`)?.focus();
  }, [busy, error]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const service = quoteService(value("service"));
    const budget = value("budget");
    if (!service || !Object.hasOwn(QUOTE_BUDGETS, budget)) return;
    const fields = {
      name: value("name"),
      email: value("email").toLowerCase(),
      company: value("company"),
      service,
      budget: budget as QuoteRequest["budget"],
      timeline: value("timeline"),
      brief: value("brief"),
      website: value("website"),
    };
    const fingerprint = JSON.stringify(fields);
    const attempt =
      request.current?.fingerprint === fingerprint
        ? request.current
        : { fingerprint, id: crypto.randomUUID() };
    request.current = attempt;
    inFlight.current = true;
    setBusy(true);
    setError(null);
    setAttemptId(attempt.id);
    controller.current = new AbortController();
    try {
      const accepted = await submitQuoteRequest(
        { ...fields, requestId: attempt.id },
        controller.current.signal,
      );
      request.current = null;
      setReference(accepted);
    } catch (failure) {
      setError(
        failure instanceof QuoteSubmissionError
          ? failure
          : new QuoteSubmissionError(),
      );
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  const hint = (field: QuoteField) =>
    error?.fields.includes(field) ? `quote-${field}-error` : undefined;
  const message = (field: QuoteField) =>
    hint(field) ? (
      <p id={hint(field)} className={styles.fieldError}>
        {fieldErrors[field]}
      </p>
    ) : null;
  if (reference)
    return (
      <div
        ref={confirmation}
        role="status"
        tabIndex={-1}
        className={styles.confirmation}
      >
        <Check className="size-6" aria-hidden="true" />
        <h2>Request submitted.</h2>
        <p>
          Your request has been sent to PyColors. We’ll use your email to
          discuss the scope before preparing a written quote.
        </p>
        <div className={styles.reference}>
          <span>Request reference</span>
          <code>{reference}</code>
        </div>
        <p>
          Keep this reference for any follow-up. The scope, final price and
          commitments will be agreed in writing.
        </p>
        <SiteButton asChild variant="outline">
          <Link href="/pricing">Back to pricing</Link>
        </SiteButton>
      </div>
    );
  return (
    <section className={styles.panel} aria-labelledby="quote-form-heading">
      <div className={styles.formHeader}>
        <span className={styles.eyebrow}>Your project</span>
        <h2 id="quote-form-heading">Let’s define the next step.</h2>
        <p>Share the essentials. Company and timeline are optional.</p>
      </div>
      <form
        method="post"
        onSubmit={handleSubmit}
        aria-labelledby="quote-form-heading"
        aria-busy={busy}
      >
        <fieldset disabled={busy} className={styles.fields}>
          <legend className="sr-only">Project brief</legend>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="quote-name">Name</label>
              <Input
                id="quote-name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                className={styles.control}
                error={hint("name") ? fieldErrors.name : undefined}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-email">Email</label>
              <Input
                id="quote-email"
                name="email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                maxLength={254}
                className={styles.control}
                error={hint("email") ? fieldErrors.email : undefined}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-company">
              Company <span>(optional)</span>
            </label>
            <Input
              id="quote-company"
              name="company"
              autoComplete="organization"
              maxLength={120}
              className={styles.control}
              error={hint("company") ? fieldErrors.company : undefined}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="quote-service">Service</label>
              <div className={styles.select}>
                <select
                  id="quote-service"
                  name="service"
                  required
                  defaultValue={initialService}
                  className={styles.control}
                  aria-invalid={Boolean(hint("service"))}
                  aria-describedby={hint("service")}
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {Object.values(STARTER_PRO_SERVICES).map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </div>
              {message("service")}
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-budget">Indicative budget</label>
              <div className={styles.select}>
                <select
                  id="quote-budget"
                  name="budget"
                  required
                  defaultValue=""
                  className={styles.control}
                  aria-invalid={Boolean(hint("budget"))}
                  aria-describedby={hint("budget")}
                >
                  <option value="" disabled>
                    Choose a range
                  </option>
                  {Object.entries(QUOTE_BUDGETS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </div>
              {message("budget")}
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-timeline">
              Desired timeline <span>(optional)</span>
            </label>
            <Input
              id="quote-timeline"
              name="timeline"
              maxLength={100}
              placeholder="Next quarter, or flexible"
              className={styles.control}
              error={hint("timeline") ? fieldErrors.timeline : undefined}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-brief">What would you like to build?</label>
            <Textarea
              id="quote-brief"
              name="brief"
              required
              minLength={40}
              maxLength={4000}
              rows={5}
              className={`${styles.control} ${styles.brief}`}
              error={hint("brief") ? fieldErrors.brief : undefined}
              aria-describedby="quote-brief-help"
            />
            <p id="quote-brief-help" className={styles.help}>
              Describe the workflow, users and outcome. Keep passwords, API keys
              and customer data out of your brief.
            </p>
          </div>
          <div className={styles.trap} aria-hidden="true">
            <label htmlFor="quote-website">Leave this field empty</label>
            <input
              id="quote-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <p className={styles.privacy}>
            We use these details to review your request and contact you about
            this project. Read our{" "}
            <Link href="/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>
            .
          </p>
          <SiteButton
            type="submit"
            size="lg"
            className="site-primary-action w-full"
          >
            {busy && (
              <LoaderCircle
                className="size-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            )}
            {busy ? "Submitting your brief…" : "Request a quote"}
          </SiteButton>
        </fieldset>
      </form>
      {error && (
        <div role="alert" className={styles.error}>
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          <div>
            <p>
              {error.fields.length
                ? "Review the highlighted fields."
                : error.rateLimited
                  ? "Too many requests. Please wait 15 minutes before trying again."
                  : "We couldn’t confirm your submission. Your brief is still here; you can retry."}
            </p>
            <p>
              If you need help,{" "}
              <a href="mailto:contact@pycolors.com?subject=Starter%20Pro%20quote%20request">
                email PyColors
              </a>
              {attemptId ? (
                <>
                  {" "}
                  and include reference <code>{attemptId}</code>
                </>
              ) : null}
              .
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

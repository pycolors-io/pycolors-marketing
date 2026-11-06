"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { Link } from "@/lib/i18n/navigation";
import { CircleAlert, LoaderCircle, Check, ChevronDown } from "lucide-react";
import { Input, Textarea } from "@pycolors/ui";
import { SiteButton } from "@/components/site-button";
import { QUOTE_SERVICES } from "@/lib/products/project-services";
import {
  QUOTE_BUDGETS,
  QUOTE_PROJECT_TYPES,
  QUOTE_PROJECT_STAGES,
  quoteService,
  type QuoteField,
  type QuoteRequest,
  type QuoteService,
} from "@/lib/quotes/quote-request";
import {
  QuoteSubmissionError,
  submitQuoteRequest,
} from "@/lib/quotes/submit-quote-request";
import { QUOTE_COPY } from "@/lib/i18n/quote-copy";
import styles from "./quote-request.module.css";

function RequiredIndicator() {
  return <span aria-hidden="true" className={styles.requiredIndicator} />;
}

export function QuoteRequestForm({
  initialService = "",
  locale: requestedLocale,
}: {
  initialService?: QuoteService | "";
  locale?: "en" | "fr";
}) {
  const tSite = useCopy();

  const locale = requestedLocale ?? tSite.locale;
  const copy = QUOTE_COPY[locale];
  const fieldErrors = copy.fields;
  const services = QUOTE_SERVICES;
  const budgets =
    locale === "fr"
      ? {
          "3k-5k": "3 000–5 000 €",
          "5k-10k": "5 000–10 000 €",
          "10k-20k": "10 000–20 000 €",
          "20k-plus": "20 000 € ou plus",
          "to-define": "À définir",
        }
      : QUOTE_BUDGETS;
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
    if (!busy && error?.fields[0]) {
      const field = document.getElementById(`quote-${error.fields[0]}`);
      const details = field?.closest("details");
      if (details instanceof HTMLDetailsElement) details.open = true;
      field?.focus();
    }
  }, [busy, error]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const service = quoteService(value("service"));
    const budget = value("budget");
    const projectType = value("projectType");
    const projectStage = value("projectStage");
    if (!service || !Object.hasOwn(QUOTE_BUDGETS, budget)) return;
    if (
      projectType &&
      !QUOTE_PROJECT_TYPES.some((option) => option === projectType)
    )
      return;
    if (
      projectStage &&
      !QUOTE_PROJECT_STAGES.some((option) => option === projectStage)
    )
      return;
    const fields = {
      name: value("name"),
      email: value("email").toLowerCase(),
      company: value("company"),
      service,
      budget: budget as QuoteRequest["budget"],
      timeline: value("timeline"),
      brief: value("brief"),
      website: value("website"),
      locale,
      projectType: projectType as QuoteRequest["projectType"],
      projectStage: projectStage as QuoteRequest["projectStage"],
      audience: value("audience"),
      features: value("features"),
      assets: value("assets"),
      successCriteria: value("successCriteria"),
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
        <h2>{copy.successTitle}</h2>
        <p>{copy.successBody}</p>
        <div className={styles.reference}>
          <span>{copy.reference}</span>
          <code>{reference}</code>
        </div>
        <p>{copy.successNote}</p>
        <SiteButton asChild variant="outline">
          <Link href={locale === "fr" ? "/fr/tarifs" : "/pricing"}>
            {copy.back}
          </Link>
        </SiteButton>
      </div>
    );
  return (
    <section className={styles.panel} aria-labelledby="quote-form-heading">
      <div className={styles.formHeader}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h2 id="quote-form-heading">{copy.heading}</h2>
        <p>{copy.intro}</p>
      </div>
      <form
        method="post"
        onSubmit={handleSubmit}
        aria-labelledby="quote-form-heading"
        aria-busy={busy}
      >
        <fieldset disabled={busy} className={styles.fields}>
          <legend className="sr-only">{copy.legend}</legend>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="quote-name">
                {copy.name}
                <RequiredIndicator />
              </label>
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
              <label htmlFor="quote-email">
                {copy.email}
                <RequiredIndicator />
              </label>
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
              {copy.company} <span>{copy.optional}</span>
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
              <label htmlFor="quote-service">
                {copy.service}
                <RequiredIndicator />
              </label>
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
                    {copy.servicePlaceholder}
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {tSite(service.title)}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </div>
              {tSite(message("service"))}
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-budget">
                {copy.budget}
                <RequiredIndicator />
              </label>
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
                    {copy.budgetPlaceholder}
                  </option>
                  {Object.entries(budgets).map(([key, label]) => (
                    <option key={key} value={key}>
                      {tSite(label)}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </div>
              {tSite(message("budget"))}
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-timeline">
              {copy.timeline} <span>{copy.optional}</span>
            </label>
            <Input
              id="quote-timeline"
              name="timeline"
              maxLength={100}
              placeholder={copy.timelinePlaceholder}
              className={styles.control}
              error={hint("timeline") ? fieldErrors.timeline : undefined}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-brief">
              {copy.brief}
              <RequiredIndicator />
            </label>
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
              {copy.briefHelp}
            </p>
          </div>
          <details className={styles.details}>
            <summary>
              <span>
                {copy.detailsTitle}{" "}
                <span className={styles.optional}>{copy.optional}</span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className={styles.detailsChevron}
              />
            </summary>
            <div className={styles.detailsFields}>
              <p className={styles.help}>{copy.detailsHelp}</p>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="quote-projectType">{copy.projectType}</label>
                  <div className={styles.select}>
                    <select
                      id="quote-projectType"
                      name="projectType"
                      defaultValue=""
                      className={styles.control}
                      aria-invalid={Boolean(hint("projectType"))}
                      aria-describedby={hint("projectType")}
                    >
                      <option value="">{copy.undecided}</option>
                      {QUOTE_PROJECT_TYPES.map((value) => (
                        <option key={value} value={value}>
                          {copy.projectTypes[value]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" />
                  </div>
                  {message("projectType")}
                </div>
                <div className={styles.field}>
                  <label htmlFor="quote-projectStage">
                    {copy.projectStage}
                  </label>
                  <div className={styles.select}>
                    <select
                      id="quote-projectStage"
                      name="projectStage"
                      defaultValue=""
                      className={styles.control}
                      aria-invalid={Boolean(hint("projectStage"))}
                      aria-describedby={hint("projectStage")}
                    >
                      <option value="">{copy.undecided}</option>
                      {QUOTE_PROJECT_STAGES.map((value) => (
                        <option key={value} value={value}>
                          {copy.projectStages[value]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" />
                  </div>
                  {message("projectStage")}
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="quote-audience">{copy.audience}</label>
                <Input
                  id="quote-audience"
                  name="audience"
                  maxLength={240}
                  placeholder={copy.audiencePlaceholder}
                  className={styles.control}
                  error={hint("audience") ? fieldErrors.audience : undefined}
                />
              </div>
              {(
                [
                  {
                    field: "features",
                    label: copy.features,
                    placeholder: copy.featuresPlaceholder,
                    maxLength: 1000,
                  },
                  {
                    field: "assets",
                    label: copy.assets,
                    placeholder: copy.assetsPlaceholder,
                    maxLength: 800,
                  },
                  {
                    field: "successCriteria",
                    label: copy.successCriteria,
                    placeholder: copy.successPlaceholder,
                    maxLength: 600,
                  },
                ] as const
              ).map(({ field, label, placeholder, maxLength }) => (
                <div key={field} className={styles.field}>
                  <label htmlFor={`quote-${field}`}>{label}</label>
                  <Textarea
                    id={`quote-${field}`}
                    name={field}
                    rows={3}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={`${styles.control} ${styles.detailTextarea}`}
                    error={hint(field) ? fieldErrors[field] : undefined}
                  />
                </div>
              ))}
            </div>
          </details>
          <div className={styles.trap} aria-hidden="true">
            <label htmlFor="quote-website">{copy.trap}</label>
            <input
              id="quote-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <p className={styles.privacy}>
            {copy.privacy}
            {tSite(" ")}
            <Link
              href="/privacy"
              hrefLang={locale}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.privacyLink}
              <span className="sr-only"> {copy.newTab}</span>
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
            {busy ? copy.submitting : copy.submit}
          </SiteButton>
        </fieldset>
      </form>
      {error && (
        <div role="alert" className={styles.error}>
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          <div>
            <p>
              {error.tooLarge
                ? copy.tooLarge
                : error.fields.length
                  ? copy.validation
                  : error.rateLimited
                    ? copy.rateLimited
                    : copy.failed}
            </p>
            <p>
              {copy.help}
              {tSite(" ")}
              <a href="mailto:contact@pycolors.com?subject=Starter%20Pro%20quote%20request">
                {copy.emailSupport}
              </a>
              {attemptId ? (
                <>
                  {tSite(" ")}
                  {copy.includeReference} <code>{attemptId}</code>
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

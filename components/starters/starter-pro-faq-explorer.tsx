"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { Input } from "@pycolors/ui";
import { MarketingFaq } from "@/components/marketing/faq";
import { SiteButton } from "@/components/site-button";
import { starterProBuyerFaqs } from "@/lib/products/starter-pro-buyer-faq";
import {
  filterStarterProFaqs,
  starterProFaqTopics,
  type StarterProFaqFilter,
} from "@/lib/products/starter-pro-faq-search";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/** Answers render on the server; search controls enhance them after hydration. */
export function StarterProFaqExplorer() {
  const id = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<StarterProFaqFilter>("all");
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const results = filterStarterProFaqs(query, topic);
  const hasFilters = query.length > 0 || topic !== "all";
  const titleId = `${id}-title`;
  const resultsId = `${id}-results`;

  function resetFilters() {
    setQuery("");
    setTopic("all");
    searchRef.current?.focus();
  }

  return (
    <section aria-labelledby={titleId} className="min-w-0 space-y-8">
      <fieldset
        disabled={!hydrated}
        className="min-w-0 space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6"
      >
        <legend className="sr-only">Search and filter buyer questions</legend>
        <Input
          ref={searchRef}
          id={`${id}-search`}
          label="Search Starter Pro questions"
          helperText="Try setup, Stripe, client projects, or purchase email."
          type="search"
          size="lg"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={!hydrated}
          maxLength={160}
          autoComplete="off"
          spellCheck={false}
          aria-controls={resultsId}
          className="min-w-0 [&_input]:min-w-0"
        />
        <div
          role="group"
          aria-label="Filter questions by topic"
          className="flex flex-wrap gap-2"
        >
          <SiteButton
            type="button"
            variant={topic === "all" ? "default" : "outline"}
            aria-pressed={topic === "all"}
            aria-controls={resultsId}
            onClick={() => setTopic("all")}
            className="min-h-11"
          >
            All topics
          </SiteButton>
          {starterProFaqTopics.map((item) => (
            <SiteButton
              key={item.id}
              type="button"
              variant={topic === item.id ? "default" : "outline"}
              aria-pressed={topic === item.id}
              aria-controls={resultsId}
              onClick={() => setTopic(item.id)}
              className="min-h-11"
            >
              {item.label}
            </SiteButton>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Search filters these answers on this page only.
          </p>
          <SiteButton
            type="button"
            variant="ghost"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="min-h-11"
          >
            Reset filters
          </SiteButton>
        </div>
      </fieldset>

      <noscript>
        All answers are available below without JavaScript. Search and topic
        filters require JavaScript; open any question to read its answer.
      </noscript>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="text-sm text-muted-foreground"
      >
        {results.length} of {starterProBuyerFaqs.length} questions
      </p>

      <div id={resultsId}>
        {results.length > 0 ? (
          <MarketingFaq
            title="Find your answer"
            titleId={titleId}
            description="The same buyer answers as the Starter Pro overview, with links to the next useful step."
            items={results}
          />
        ) : (
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 id={titleId} className="text-xl font-semibold text-foreground">
              No matching questions
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Try fewer words, select another topic, or reset the filters above.
              The setup, purchase support, and recovery links below remain
              available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

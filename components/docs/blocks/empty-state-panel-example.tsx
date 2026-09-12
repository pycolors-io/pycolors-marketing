"use client";

import * as React from "react";
import { Button } from "@pycolors/ui";

import { EmptyStatePanel } from "@/content/blocks/feedback/empty-state-panel";

export function EmptyStatePanelExample() {
  const exampleId = React.useId();
  const [scenario, setScenario] = React.useState("first-use");
  const [showSample, setShowSample] = React.useState(false);
  const resultsHeading = React.useRef<HTMLHeadingElement>(null);
  const noResults = scenario === "no-results";

  // This demo, not the Block, owns focus after replacing its action controls.
  React.useEffect(() => {
    if (showSample) resultsHeading.current?.focus();
  }, [showSample]);

  return (
    <div className="w-full min-w-0 space-y-6">
      <p className="text-sm text-muted-foreground">
        Fictional local example. No project is created, request sent or data
        saved. The controls only change the preview below.
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor={exampleId}>
            Example scenario
          </label>
          <select
            id={exampleId}
            value={scenario}
            onChange={(event) => {
              setScenario(event.target.value);
              setShowSample(false);
            }}
            className="min-h-11 max-w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="first-use">First use</option>
            <option value="no-results">No matching results</option>
          </select>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowSample(false)}
        >
          Reset example
        </Button>
      </div>

      {showSample ? (
        <section
          aria-labelledby={`${exampleId}-results`}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h2
            id={`${exampleId}-results`}
            ref={resultsHeading}
            tabIndex={-1}
            className="text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Example projects
          </h2>
          <ul className="mt-4 list-disc pl-5 text-sm">
            <li>Launch checklist — fictional sample</li>
          </ul>
        </section>
      ) : (
        <EmptyStatePanel
          id={`${exampleId}-projects`}
          heading="Example projects"
          title={noResults ? "No projects match your filters" : "Start a project"}
          description={
            noResults
              ? "Clear the example filters to show the fictional project. Your application would own the real query and results."
              : "Give your workspace its first project. This preview only reveals a fictional sample; it does not create a record."
          }
          primaryAction={
            <Button type="button" onClick={() => setShowSample(true)}>
              {noResults ? "Clear example filters" : "Show sample project"}
            </Button>
          }
          secondaryAction={
            <Button asChild variant="outline">
              <a href="/docs/ui/installation">Read UI setup</a>
            </Button>
          }
        />
      )}

      <details className="space-y-4">
        <summary className="cursor-pointer text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          No-action and disabled-action examples
        </summary>
        <EmptyStatePanel
          id={`${exampleId}-activity`}
          heading="Example activity"
          title="Nothing to show yet"
          description="There is no useful action to offer here. Omit both actions rather than showing a disabled placeholder."
        />
        <EmptyStatePanel
          id={`${exampleId}-reports`}
          heading="Example reports with a longer workspace heading"
          title="Your report workspace is waiting for its first entry"
          description="This intentionally longer description demonstrates content wrapping. A disabled control is presentation only, never proof of a permission or a substitute for server-side authorization."
          primaryAction={
            <Button disabled type="button">
              Unavailable in this example
            </Button>
          }
        />
      </details>
    </div>
  );
}

"use client";

import * as React from "react";
import type { DataTableQuery } from "./types";

export function DataTableQueryControls({
  query,
}: Readonly<{ query: DataTableQuery }>) {
  const { filters, label = "Record filters", reset, search, summary } = query;
  const hasFilters = React.Children.toArray(filters).some(
    (node) => node !== "",
  );
  const hasSummary = React.Children.toArray(summary).some(
    (node) => node !== "",
  );

  return (
    <div
      aria-label={label}
      className="min-w-0 space-y-3"
      data-slot="data-table-query"
      role="group"
    >
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label
          className="flex min-w-0 flex-1 flex-col gap-1 text-sm"
          data-slot="data-table-search-label"
        >
          <span className="text-muted-foreground">{search.label}</span>
          <input
            autoComplete="off"
            className="min-h-11 sm:min-h-10 w-full min-w-0 rounded-md border border-border bg-background px-3 py-1 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            data-slot="data-table-search"
            disabled={search.disabled}
            onChange={(event) => {
              if (!search.disabled) {
                search.onValueChange(event.currentTarget.value);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                event.preventDefault();
              }
            }}
            placeholder={search.placeholder}
            ref={search.inputRef}
            type="search"
            value={search.value}
          />
        </label>
        {hasFilters ? (
          <div
            className="flex min-w-0 flex-wrap items-end gap-3"
            data-slot="data-table-filters"
          >
            {filters}
          </div>
        ) : null}
        {reset ? (
          <button
            className="inline-flex min-h-11 sm:min-h-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 py-1 text-sm font-medium text-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            data-slot="data-table-query-reset"
            disabled={reset.disabled}
            onClick={reset.onReset}
            type="button"
          >
            {reset.label}
          </button>
        ) : null}
      </div>
      {hasSummary ? (
        <div
          className="text-sm leading-6 text-muted-foreground"
          data-slot="data-table-query-summary"
        >
          {summary}
        </div>
      ) : null}
    </div>
  );
}

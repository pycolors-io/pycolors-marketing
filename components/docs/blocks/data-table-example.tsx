"use client";

import { SiteText } from "@/components/site-text";
import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { Badge, Button } from "@pycolors/ui";

import {
  DataTable,
  type DataTableColumn,
  type DataTableSort,
} from "@/content/blocks/data/data-table";

type ExampleRecord = Readonly<{
  id: string;
  label: string;
  state: "Available" | "Paused";
  updated: string;
}>;

const pages = [
  [
    {
      id: "record-001",
      label: "Northwind",
      state: "Available",
      updated: "Today",
    },
    {
      id: "record-002",
      label: "Contoso",
      state: "Paused",
      updated: "Yesterday",
    },
  ],
  [
    {
      id: "record-003",
      label: "Fabrikam",
      state: "Available",
      updated: "2 days ago",
    },
    {
      id: "record-004",
      label: "Adventure Works",
      state: "Available",
      updated: "3 days ago",
    },
  ],
  [
    {
      id: "record-005",
      label: "Tailspin",
      state: "Paused",
      updated: "Last week",
    },
    {
      id: "record-006",
      label: "Wide World Importers",
      state: "Available",
      updated: "Last week",
    },
  ],
] as const satisfies readonly (readonly ExampleRecord[])[];

const columns = [
  {
    id: "label",
    header: "Record",
    cell: (record) => (
      <span className="font-medium">{<SiteText text={record.label} />}</span>
    ),
  },
  {
    id: "state",
    header: "State",
    cell: (record) => (
      <Badge variant={record.state === "Available" ? "success" : "muted"}>
        {<SiteText text={record.state} />}
      </Badge>
    ),
  },
  {
    id: "updated",
    header: "Updated",
    cell: (record) => (
      <span className="text-muted-foreground">
        {<SiteText text={record.updated} />}
      </span>
    ),
  },
] satisfies readonly DataTableColumn<ExampleRecord>[];

export function DataTableExample() {
  const tSite = useCopy();

  const [page, setPage] = React.useState(1);
  const [inspectedRecord, setInspectedRecord] = React.useState<string>();
  const rows = pages[page - 1];
  const firstVisibleRecord = (page - 1) * 2 + 1;

  return (
    <div className="not-prose space-y-3">
      <DataTable
        caption={tSite("Example records")}
        columns={columns.map((column) => ({
          ...column,
          header: tSite(column.header),
        }))}
        emptyDescription={tSite("Add a record to begin.")}
        emptyTitle={tSite("No records")}
        getRowId={(record) => record.id}
        pagination={{
          previousLabel: tSite("Previous page"),
          nextLabel: tSite("Next page"),
          morePagesLabel: tSite("More pages"),
          navigationLabel: tSite("Example record pages"),
          onPageChange: setPage,
          page,
          summary: tSite("Showing {value0}–{value1} of 6", {
            value0: firstVisibleRecord,
            value1: firstVisibleRecord + rows.length - 1,
          }),
          totalPages: pages.length,
        }}
        renderRowActions={(record) => (
          <Button
            aria-label={tSite("Inspect {value0}", { value0: record.label })}
            onClick={() => setInspectedRecord(record.label)}
            size="sm"
            type="button"
            variant="outline"
          >
            {tSite("Inspect")}
          </Button>
        )}
        rowActionsLabel={tSite("Record actions")}
        rows={rows}
      />

      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {tSite(
          inspectedRecord
            ? tSite("Selected {value0}.", { value0: inspectedRecord })
            : null,
        )}
      </p>
    </div>
  );
}

export function DataTableEmptyExample({
  filtered = false,
}: Readonly<{ filtered?: boolean }>) {
  const tSite = useCopy();

  const [hasResults, setHasResults] = React.useState(false);
  const resetRef = React.useRef<HTMLButtonElement>(null);

  function showSampleRecords() {
    setHasResults(true);
    resetRef.current?.focus();
  }

  return (
    <div className="not-prose space-y-3">
      <DataTable
        caption={tSite(
          filtered ? "Filtered sample records" : "New sample workspace",
        )}
        columns={columns.map((column) => ({
          ...column,
          header: tSite(column.header),
        }))}
        emptyAction={
          <Button onClick={showSampleRecords} size="sm" type="button">
            {tSite(filtered ? "Clear sample filter" : "Add sample records")}
          </Button>
        }
        emptyDescription={tSite(
          filtered
            ? "No sample records match this filter."
            : "Start with sample records to explore this table.",
        )}
        emptyTitle={tSite(filtered ? "No matching records" : "No records yet")}
        getRowId={(record) => record.id}
        rows={hasResults ? pages[0] : []}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {tSite(
            hasResults
              ? "Two sample records are displayed. Nothing was saved."
              : "Interactive example only. No request is sent or data saved.",
          )}
        </p>
        <Button
          onClick={() => setHasResults(false)}
          ref={resetRef}
          size="sm"
          type="button"
          variant="outline"
        >
          {tSite("Reset example")}
        </Button>
      </div>
    </div>
  );
}

const sortableColumns = columns.map((column) => ({
  ...column,
  sortable: column.id === "label" || column.id === "state",
}));

export function DataTableSortingExample() {
  const tSite = useCopy();

  const [sort, setSort] = React.useState<DataTableSort | null>(null);
  const [page, setPage] = React.useState(1);
  const records = pages.flat();

  // This consumer orders the full dataset before selecting a page.
  if (sort) {
    records.sort((left, right) => {
      const leftValue = sort.columnId === "state" ? left.state : left.label;
      const rightValue = sort.columnId === "state" ? right.state : right.label;
      const comparison = leftValue.localeCompare(rightValue, "en");
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }

  function changeSort(nextSort: DataTableSort | null) {
    setSort(nextSort);
    setPage(1);
  }

  return (
    <div className="not-prose space-y-3">
      <DataTable
        caption={tSite("Sortable sample records")}
        columns={sortableColumns.map((column) => ({
          ...column,
          header: tSite(column.header),
        }))}
        emptyTitle={tSite("No sample records")}
        getRowId={(record) => record.id}
        pagination={{
          previousLabel: tSite("Previous page"),
          nextLabel: tSite("Next page"),
          morePagesLabel: tSite("More pages"),
          navigationLabel: tSite("Sorted sample record pages"),
          onPageChange: setPage,
          page,
          summary: tSite("Page {value0} of {value1}", {
            value0: page,
            value1: pages.length,
          }),
          totalPages: pages.length,
        }}
        rows={records.slice((page - 1) * 2, page * 2)}
        sorting={{
          ascendingLabel: tSite("Sort ascending"),
          descendingLabel: tSite("Sort descending"),
          onSortChange: changeSort,
          value: sort,
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {tSite(
            sort
              ? tSite("Ordered by {value0}, {value1}.", {
                  value0: tSite(sort.columnId === "state" ? "state" : "record"),
                  value1: tSite(
                    sort.direction === "asc" ? "ascending" : "descending",
                  ),
                })
              : "Original sample order.",
          )}
          {tSite(" ")}
          {tSite("Local example only. No request is sent or data saved.")}
        </p>
        <Button
          onClick={() => changeSort(null)}
          size="sm"
          type="button"
          variant="outline"
        >
          {tSite("Reset sort")}
        </Button>
      </div>
    </div>
  );
}

export function DataTablePageSizeExample() {
  const tSite = useCopy();

  const [size, setSize] = React.useState(2);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<DataTableSort | null>(null);
  const records = pages.flat();

  // Sorting and slicing belong to this consumer, never to the Block.
  if (sort) {
    records.sort((left, right) => {
      const leftValue = sort.columnId === "state" ? left.state : left.label;
      const rightValue = sort.columnId === "state" ? right.state : right.label;
      const comparison = leftValue.localeCompare(rightValue, "en");
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }

  const totalPages = Math.ceil(records.length / size);
  const start = (page - 1) * size;
  const visibleRows = records.slice(start, start + size);

  return (
    <div className="not-prose space-y-3">
      <DataTable
        caption={tSite("Adjustable sample records")}
        columns={sortableColumns.map((column) => ({
          ...column,
          header: tSite(column.header),
        }))}
        emptyTitle={tSite("No sample records")}
        getRowId={(record) => record.id}
        pageSize={{
          label: tSite("Rows per page"),
          onPageSizeChange: (nextSize) => {
            setSize(nextSize);
            setPage(1);
          },
          options: [2, 3, 6],
          value: size,
        }}
        pagination={{
          previousLabel: tSite("Previous page"),
          nextLabel: tSite("Next page"),
          morePagesLabel: tSite("More pages"),
          navigationLabel: tSite("Adjustable sample record pages"),
          onPageChange: setPage,
          page,
          totalPages,
        }}
        rows={visibleRows}
        sorting={{
          ascendingLabel: tSite("Sort ascending"),
          descendingLabel: tSite("Sort descending"),
          onSortChange: (nextSort) => {
            setSort(nextSort);
            setPage(1);
          },
          value: sort,
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {tSite("Showing ")}
          {tSite(start + 1)}–{tSite(start + visibleRows.length)} {tSite(" of ")}
          {tSite(records.length)}
          {tSite(". Local example only. No request is sent or data saved.")}
        </p>
        <Button
          onClick={() => {
            setSize(2);
            setPage(1);
            setSort(null);
          }}
          size="sm"
          type="button"
          variant="outline"
        >
          {tSite("Reset table")}
        </Button>
      </div>
    </div>
  );
}

export function DataTableQueryExample() {
  const tSite = useCopy();

  const [search, setSearch] = React.useState("");
  const [stateFilter, setStateFilter] = React.useState("all");
  const [sort, setSort] = React.useState<DataTableSort | null>(null);
  const [size, setSize] = React.useState(2);
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<string>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const term = search.trim().toLocaleLowerCase("en");

  // The consumer filters the full dataset, then sorts, then selects a page.
  const matching = pages.flat().filter((record) => {
    return (
      record.label.toLocaleLowerCase("en").includes(term) &&
      (stateFilter === "all" || record.state === stateFilter)
    );
  });
  if (sort) {
    matching.sort((left, right) => {
      const leftValue = sort.columnId === "state" ? left.state : left.label;
      const rightValue = sort.columnId === "state" ? right.state : right.label;
      const comparison = leftValue.localeCompare(rightValue, "en");
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }
  const totalPages = Math.max(1, Math.ceil(matching.length / size));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * size;
  const visibleRows = matching.slice(start, start + size);

  function resetFilters() {
    setSearch("");
    setStateFilter("all");
    setPage(1);
    inputRef.current?.focus();
  }

  return (
    <div className="not-prose space-y-3">
      <DataTable
        caption={tSite("Searchable sample records")}
        columns={sortableColumns.map((column) => ({
          ...column,
          header: tSite(column.header),
        }))}
        emptyDescription={tSite(
          "Change your search or reset the filters above.",
        )}
        emptyTitle={tSite("No matching records")}
        getRowId={(record) => record.id}
        pageSize={{
          label: tSite("Rows per page"),
          value: size,
          options: [2, 3, 6],
          onPageSizeChange: (nextSize) => {
            setSize(nextSize);
            setPage(1);
          },
        }}
        pagination={{
          previousLabel: tSite("Previous page"),
          nextLabel: tSite("Next page"),
          morePagesLabel: tSite("More pages"),
          navigationLabel: tSite("Searchable sample record pages"),
          page: currentPage,
          totalPages,
          onPageChange: setPage,
        }}
        query={{
          label: tSite("Sample record filters"),
          search: {
            label: tSite("Search records"),
            value: search,
            placeholder: tSite("Search by record name"),
            inputRef,
            onValueChange: (value) => {
              setSearch(value);
              setPage(1);
            },
          },
          filters: (
            <label className="flex min-w-0 flex-col gap-1 text-sm">
              <span className="text-muted-foreground">{tSite("State")}</span>
              <span className="relative inline-grid min-w-24 max-w-full">
                <select
                  className="h-11 w-full min-w-0 appearance-none truncate rounded-[5px] border border-input bg-background py-2 pl-3 pr-9 text-base leading-5 text-foreground shadow-xs outline-none transition-colors hover:border-border focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm motion-reduce:transition-none"
                  onChange={(event) => {
                    setStateFilter(event.currentTarget.value);
                    setPage(1);
                  }}
                  value={stateFilter}
                >
                  <option value="all">{tSite("All states")}</option>
                  <option value="Available">{tSite("Available")}</option>
                  <option value="Paused">{tSite("Paused")}</option>
                </select>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
                >
                  <path
                    d="m4 6 4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
          ),
          reset: { label: tSite("Reset filters"), onReset: resetFilters },
          summary: (
            <p aria-live="polite" role="status">
              {tSite("Showing ")}
              {tSite(matching.length === 0 ? 0 : start + 1)}–
              {tSite(start + visibleRows.length)} {tSite(" of ")}
              {tSite(matching.length)} {tSite(" matching records.")}
            </p>
          ),
        }}
        renderRowActions={(record) => (
          <Button
            aria-label={tSite("Inspect {value0}", { value0: record.label })}
            onClick={() => setSelected(record.label)}
            size="sm"
            type="button"
            variant="outline"
          >
            {tSite("Inspect")}
          </Button>
        )}
        rowActionsLabel={tSite("Record actions")}
        rows={visibleRows}
        sorting={{
          ascendingLabel: tSite("Sort ascending"),
          descendingLabel: tSite("Sort descending"),
          value: sort,
          onSortChange: (nextSort) => {
            setSort(nextSort);
            setPage(1);
          },
        }}
      />
      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {tSite(
          selected
            ? tSite("Selected {value0} locally. Nothing was saved.", {
                value0: selected,
              })
            : null,
        )}
      </p>
      <p className="text-sm text-muted-foreground">
        {tSite("Local example only. No request is sent or data saved.")}
      </p>
    </div>
  );
}

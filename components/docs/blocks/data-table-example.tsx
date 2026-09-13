"use client";

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
    cell: (record) => <span className="font-medium">{record.label}</span>,
  },
  {
    id: "state",
    header: "State",
    cell: (record) => (
      <Badge variant={record.state === "Available" ? "success" : "muted"}>
        {record.state}
      </Badge>
    ),
  },
  {
    id: "updated",
    header: "Updated",
    cell: (record) => (
      <span className="text-muted-foreground">{record.updated}</span>
    ),
  },
] satisfies readonly DataTableColumn<ExampleRecord>[];

export function DataTableExample() {
  const [page, setPage] = React.useState(1);
  const [inspectedRecord, setInspectedRecord] = React.useState<string>();
  const rows = pages[page - 1];
  const firstVisibleRecord = (page - 1) * 2 + 1;

  return (
    <div className="not-prose space-y-3">
      <DataTable
        caption="Example records"
        columns={columns}
        emptyDescription="Add a record to begin."
        emptyTitle="No records"
        getRowId={(record) => record.id}
        pagination={{
          navigationLabel: "Example record pages",
          onPageChange: setPage,
          page,
          summary: `Showing ${firstVisibleRecord}–${firstVisibleRecord + rows.length - 1} of 6`,
          totalPages: pages.length,
        }}
        renderRowActions={(record) => (
          <Button
            aria-label={`Inspect ${record.label}`}
            onClick={() => setInspectedRecord(record.label)}
            size="sm"
            type="button"
            variant="outline"
          >
            Inspect
          </Button>
        )}
        rowActionsLabel="Record actions"
        rows={rows}
      />

      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {inspectedRecord ? `Selected ${inspectedRecord}.` : null}
      </p>
    </div>
  );
}

export function DataTableEmptyExample({
  filtered = false,
}: Readonly<{ filtered?: boolean }>) {
  const [hasResults, setHasResults] = React.useState(false);
  const resetRef = React.useRef<HTMLButtonElement>(null);

  function showSampleRecords() {
    setHasResults(true);
    resetRef.current?.focus();
  }

  return (
    <div className="not-prose space-y-3">
      <DataTable
        caption={filtered ? "Filtered sample records" : "New sample workspace"}
        columns={columns}
        emptyAction={
          <Button onClick={showSampleRecords} size="sm" type="button">
            {filtered ? "Clear sample filter" : "Add sample records"}
          </Button>
        }
        emptyDescription={
          filtered
            ? "No sample records match this filter."
            : "Start with sample records to explore this table."
        }
        emptyTitle={filtered ? "No matching records" : "No records yet"}
        getRowId={(record) => record.id}
        rows={hasResults ? pages[0] : []}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {hasResults
            ? "Two sample records are displayed. Nothing was saved."
            : "Interactive example only. No request is sent or data saved."}
        </p>
        <Button
          onClick={() => setHasResults(false)}
          ref={resetRef}
          size="sm"
          type="button"
          variant="outline"
        >
          Reset example
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
        caption="Sortable sample records"
        columns={sortableColumns}
        emptyTitle="No sample records"
        getRowId={(record) => record.id}
        pagination={{
          navigationLabel: "Sorted sample record pages",
          onPageChange: setPage,
          page,
          summary: `Page ${page} of ${pages.length}`,
          totalPages: pages.length,
        }}
        rows={records.slice((page - 1) * 2, page * 2)}
        sorting={{ onSortChange: changeSort, value: sort }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {sort
            ? `Ordered by ${sort.columnId === "state" ? "state" : "record"}, ${sort.direction === "asc" ? "ascending" : "descending"}.`
            : "Original sample order."}{" "}
          Local example only. No request is sent or data saved.
        </p>
        <Button
          onClick={() => changeSort(null)}
          size="sm"
          type="button"
          variant="outline"
        >
          Reset sort
        </Button>
      </div>
    </div>
  );
}

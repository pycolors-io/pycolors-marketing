"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
  cn,
} from "@pycolors/ui";

import { DataTableQueryControls } from "./query-controls";
import {
  DataTablePageSizeControls,
  DataTablePaginationControls,
  hasValidPagination,
} from "./pagination";
import type { DataTableProps } from "./types";

export type {
  DataTableColumn,
  DataTableSort,
  DataTableSorting,
  DataTablePageSize,
  DataTablePagination,
  DataTableQuery,
  DataTableState,
  DataTableProps,
} from "./types";

/**
 * A source-copy record table with consumer-owned columns, rows, states,
 * actions, query and sorting requests, and controlled page navigation and size.
 */
export function DataTable<Row>({
  caption,
  className,
  columns,
  emptyAction,
  emptyDescription,
  emptyTitle,
  getRowId,
  pagination,
  pageSize,
  query,
  renderRowActions,
  rowActionsLabel = "Actions",
  rows,
  sorting,
  state,
}: DataTableProps<Row>) {
  const hasRowActions = Boolean(renderRowActions);
  const effectiveColumnCount = Math.max(
    1,
    columns.length + (hasRowActions ? 1 : 0),
  );
  const loadingLabel = state?.status === "loading" ? state.label : undefined;
  const status = state?.status ?? "ready";
  const showEmptyAction =
    status === "ready" && rows.length === 0 && Boolean(emptyAction);
  const showPagination =
    status === "ready" && rows.length > 0 && hasValidPagination(pagination);

  return (
    <div
      className={cn("min-w-0 space-y-4 rounded-[5px] bg-background", className)}
      data-slot="data-table"
    >
      {query ? <DataTableQueryControls query={query} /> : null}

      <Table className="min-w-max" data-slot="data-table-table">
        <TableCaption>{caption}</TableCaption>

        <TableHeader className="bg-muted/20 text-xs">
          <TableRow>
            {columns.map((column) => {
              const controller = column.sortable ? sorting : undefined;
              const direction =
                controller?.value?.columnId === column.id
                  ? controller.value.direction
                  : undefined;
              const nextDirection = direction === "asc" ? "desc" : "asc";

              return (
                <TableHead
                  aria-sort={
                    direction === "asc"
                      ? "ascending"
                      : direction === "desc"
                        ? "descending"
                        : undefined
                  }
                  className={column.headerClassName}
                  data-column-id={column.id}
                  key={column.id}
                >
                  {controller ? (
                    <button
                      className="inline-flex min-h-11 sm:min-h-10 w-full cursor-pointer items-center gap-2 rounded-sm text-left font-medium outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      data-slot="data-table-sort-button"
                      disabled={status !== "ready"}
                      onClick={() =>
                        controller.onSortChange({
                          columnId: column.id,
                          direction: nextDirection,
                        })
                      }
                      type="button"
                    >
                      {column.header}
                      <span aria-hidden="true">
                        {direction === "asc"
                          ? "▲"
                          : direction === "desc"
                            ? "▼"
                            : "♢"}
                      </span>
                      <span className="sr-only">
                        :{" "}
                        {nextDirection === "asc"
                          ? (controller.ascendingLabel ?? "Sort ascending")
                          : (controller.descendingLabel ?? "Sort descending")}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
            {hasRowActions ? (
              <TableHead
                className="text-right"
                data-slot="data-table-actions-header"
              >
                {rowActionsLabel}
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>

        <TableBody>
          {status === "loading" ? (
            <TableLoading
              ariaLive={loadingLabel ? "off" : undefined}
              colSpan={effectiveColumnCount}
            />
          ) : state?.status === "error" ? (
            <TableRow className="hover:bg-transparent">
              <TableCell className="p-4" colSpan={effectiveColumnCount}>
                <Alert ariaLive="assertive" variant="destructive">
                  <AlertTitle>{state.title}</AlertTitle>
                  {state.description ? (
                    <AlertDescription>{state.description}</AlertDescription>
                  ) : null}
                  {state.action ? (
                    <div className="mt-3" data-slot="data-table-error-action">
                      {state.action}
                    </div>
                  ) : null}
                </Alert>
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableEmpty
              colSpan={effectiveColumnCount}
              description={emptyDescription}
              title={emptyTitle}
            />
          ) : (
            rows.map((row) => {
              const rowId = getRowId(row);

              return (
                <TableRow
                  data-row-id={String(rowId)}
                  data-slot="data-table-row"
                  key={rowId}
                >
                  {columns.map((column) => (
                    <TableCell
                      className={column.cellClassName}
                      data-column-id={column.id}
                      key={column.id}
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
                  {renderRowActions ? (
                    <TableCell
                      className="text-right"
                      data-slot="data-table-actions-cell"
                    >
                      {renderRowActions(row)}
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {showEmptyAction ? (
        <div
          className="flex min-w-0 flex-wrap justify-center gap-2"
          data-slot="data-table-empty-action"
        >
          {emptyAction}
        </div>
      ) : null}

      {loadingLabel ? (
        <span
          aria-atomic="true"
          aria-live="polite"
          className="sr-only"
          data-slot="data-table-loading-label"
          role="status"
        >
          {loadingLabel}
        </span>
      ) : null}

      {status === "ready" && rows.length > 0 && pageSize ? (
        <DataTablePageSizeControls pageSize={pageSize} />
      ) : null}

      {showPagination ? (
        <DataTablePaginationControls pagination={pagination} />
      ) : null}
    </div>
  );
}

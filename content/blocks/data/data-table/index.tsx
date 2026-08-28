"use client";

import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
  buildPaginationRange,
  cn,
} from "@pycolors/ui";

export type DataTableColumn<Row> = Readonly<{
  id: string;
  header: React.ReactNode;
  cell: (row: Row) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}>;

export type DataTablePagination = Readonly<{
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  navigationLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  summary?: React.ReactNode;
}>;

export type DataTableState =
  | Readonly<{ status?: "ready" }>
  | Readonly<{ status: "loading"; label?: string }>
  | Readonly<{
      status: "error";
      title: string;
      description?: string;
      action?: React.ReactNode;
    }>;

export type DataTableProps<Row> = Readonly<{
  caption: string;
  columns: readonly DataTableColumn<Row>[];
  rows: readonly Row[];
  getRowId: (row: Row) => React.Key;
  state?: DataTableState;
  emptyTitle: string;
  emptyDescription?: string;
  renderRowActions?: (row: Row) => React.ReactNode;
  rowActionsLabel?: string;
  pagination?: DataTablePagination;
  className?: string;
}>;

function hasValidPagination(
  pagination: DataTablePagination | undefined,
): pagination is DataTablePagination {
  if (!pagination) return false;

  return (
    Number.isSafeInteger(pagination.page) &&
    Number.isSafeInteger(pagination.totalPages) &&
    pagination.totalPages > 1 &&
    pagination.page >= 1 &&
    pagination.page <= pagination.totalPages
  );
}

function DataTablePaginationControls({
  pagination,
}: Readonly<{ pagination: DataTablePagination }>) {
  const {
    navigationLabel = "Table pagination",
    nextLabel = "Next page",
    onPageChange,
    page,
    previousLabel = "Previous page",
    summary,
    totalPages,
  } = pagination;
  const tokens = buildPaginationRange({ page, totalPages });

  const requestPage = (nextPage: number) => {
    if (
      Number.isSafeInteger(nextPage) &&
      nextPage >= 1 &&
      nextPage <= totalPages &&
      nextPage !== page
    ) {
      onPageChange(nextPage);
    }
  };

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3",
        "sm:flex-row sm:items-center sm:justify-between",
      )}
      data-slot="data-table-pagination"
    >
      {summary ? (
        <div
          className="text-sm text-muted-foreground"
          data-slot="data-table-pagination-summary"
        >
          {summary}
        </div>
      ) : (
        <span aria-hidden="true" />
      )}

      <Pagination
        aria-label={navigationLabel}
        className="w-auto justify-start sm:justify-end"
      >
        <PaginationContent className="!m-0 !max-w-none !p-0 [&>li]:!m-0 [&>li]:!p-0 [&>li]:before:hidden">
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              label={previousLabel}
              onClick={() => requestPage(page - 1)}
            />
          </PaginationItem>

          {tokens.map((token) =>
            token.type === "ellipsis" ? (
              <PaginationItem key={token.key}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={token.value}>
                <PaginationLink
                  aria-label={`Page ${token.value}`}
                  disabled={token.value === page}
                  isActive={token.value === page}
                  onClick={() => requestPage(token.value)}
                >
                  {token.value}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              disabled={page === totalPages}
              label={nextLabel}
              onClick={() => requestPage(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

/**
 * A source-copy record table with consumer-owned columns, rows, states,
 * actions, and controlled page navigation.
 */
export function DataTable<Row>({
  caption,
  className,
  columns,
  emptyDescription,
  emptyTitle,
  getRowId,
  pagination,
  renderRowActions,
  rowActionsLabel = "Actions",
  rows,
  state,
}: DataTableProps<Row>) {
  const hasRowActions = Boolean(renderRowActions);
  const effectiveColumnCount = Math.max(
    1,
    columns.length + (hasRowActions ? 1 : 0),
  );
  const loadingLabel = state?.status === "loading" ? state.label : undefined;
  const status = state?.status ?? "ready";
  const showPagination =
    status === "ready" && rows.length > 0 && hasValidPagination(pagination);

  return (
    <div className={cn("min-w-0 space-y-4", className)} data-slot="data-table">
      <Table className="min-w-max" data-slot="data-table-table">
        <TableCaption>{caption}</TableCaption>

        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                className={column.headerClassName}
                data-column-id={column.id}
                key={column.id}
              >
                {column.header}
              </TableHead>
            ))}
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

      {showPagination ? (
        <DataTablePaginationControls pagination={pagination} />
      ) : null}
    </div>
  );
}

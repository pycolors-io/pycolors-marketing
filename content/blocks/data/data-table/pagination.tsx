"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  buildPaginationRange,
  cn,
} from "@pycolors/ui";
import type { DataTablePageSize, DataTablePagination } from "./types";

export function hasValidPagination(
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

export function DataTablePageSizeControls({
  pageSize,
}: Readonly<{ pageSize: DataTablePageSize }>) {
  const { label = "Rows per page", onPageSizeChange, value } = pageSize;
  const options = [
    ...new Set(
      pageSize.options.filter((size) => Number.isSafeInteger(size) && size > 0),
    ),
  ];

  if (options.length < 2 || !options.includes(value)) return null;

  return (
    <label
      className="flex min-w-0 flex-wrap items-center gap-2 text-sm"
      data-slot="data-table-page-size"
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="relative inline-grid min-w-24 max-w-full">
        <select
          className="h-11 w-full min-w-0 appearance-none truncate rounded-[5px] border border-input bg-background py-2 pl-3 pr-9 text-base leading-5 text-foreground shadow-xs outline-none transition-colors hover:border-border focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm motion-reduce:transition-none"
          data-slot="data-table-page-size-select"
          onChange={(event) => {
            const nextSize = Number(event.currentTarget.value);
            if (nextSize !== value && options.includes(nextSize)) {
              onPageSizeChange(nextSize);
            }
          }}
          value={String(value)}
        >
          {options.map((size) => (
            <option key={size} value={String(size)}>
              {size}
            </option>
          ))}
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
  );
}

export function DataTablePaginationControls({
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
          className="text-sm leading-6 text-muted-foreground"
          data-slot="data-table-pagination-summary"
        >
          {summary}
        </div>
      ) : (
        <span aria-hidden="true" />
      )}

      <Pagination
        aria-label={navigationLabel}
        className="w-auto justify-start sm:justify-end [&_button]:min-h-11 sm:[&_button]:min-h-10"
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

import type * as React from "react";

export type DataTableColumn<Row> = Readonly<{
  id: string;
  header: React.ReactNode;
  cell: (row: Row) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  sortable?: boolean;
}>;

export type DataTableSort = Readonly<{
  columnId: string;
  direction: "asc" | "desc";
}>;

export type DataTableSorting = Readonly<{
  value: DataTableSort | null;
  onSortChange: (sort: DataTableSort) => void;
  ascendingLabel?: string;
  descendingLabel?: string;
}>;

export type DataTablePageSize = Readonly<{
  value: number;
  options: readonly number[];
  onPageSizeChange: (pageSize: number) => void;
  label?: string;
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

export type DataTableQuery = Readonly<{
  label?: string;
  search: Readonly<{
    value: string;
    label: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
  }>;
  filters?: React.ReactNode;
  reset?: Readonly<{
    label: string;
    onReset: () => void;
    disabled?: boolean;
  }>;
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
  emptyAction?: React.ReactNode;
  renderRowActions?: (row: Row) => React.ReactNode;
  rowActionsLabel?: string;
  pagination?: DataTablePagination;
  pageSize?: DataTablePageSize;
  sorting?: DataTableSorting;
  query?: DataTableQuery;
  className?: string;
}>;

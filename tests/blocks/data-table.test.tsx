import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "../../content/blocks/data/data-table/index";
import dataTableSource from "../../content/blocks/data/data-table/index.tsx?raw";

type ExampleRow = Readonly<{
  id: string;
  label: string;
  state: "Available" | "Paused";
}>;

const rows = [
  { id: "record-alpha", label: "Alpha", state: "Available" },
  { id: "record-beta", label: "Beta", state: "Paused" },
] as const satisfies readonly ExampleRow[];

const columns = [
  {
    id: "label",
    header: "Label",
    cell: (row) => <strong>{row.label}</strong>,
    cellClassName: "font-medium",
  },
  {
    id: "state",
    header: "State",
    cell: (row) => row.state,
  },
] satisfies readonly DataTableColumn<ExampleRow>[];

const baseProps = {
  caption: "Available records",
  columns,
  emptyDescription: "Add a record to continue.",
  emptyTitle: "No records",
  getRowId: (row) => row.id,
  rows,
} satisfies DataTableProps<ExampleRow>;

function renderTable(overrides: Partial<DataTableProps<ExampleRow>> = {}) {
  const props = { ...baseProps, ...overrides } as DataTableProps<ExampleRow>;
  return render(<DataTable {...props} />);
}

describe("DataTable", () => {
  it("renders typed consumer rows with semantic table structure and a caption", () => {
    const { container } = renderTable();

    expect(
      screen.getByRole("table", { name: "Available records" }),
    ).toBeInTheDocument();
    expect(container.querySelector("thead")).not.toBeNull();
    expect(container.querySelector("tbody")).not.toBeNull();
    expect(screen.getByRole("columnheader", { name: "Label" })).toHaveAttribute(
      "scope",
      "col",
    );
    expect(screen.getByRole("columnheader", { name: "State" })).toHaveAttribute(
      "scope",
      "col",
    );
    expect(screen.getByRole("cell", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Paused" })).toBeInTheDocument();
  });

  it("uses stable consumer row IDs when records are reordered", () => {
    const { container, rerender } = renderTable();
    const alphaRow = container.querySelector('[data-row-id="record-alpha"]');

    expect(alphaRow).not.toBeNull();

    rerender(<DataTable {...baseProps} rows={[...rows].reverse()} />);

    expect(container.querySelector('[data-row-id="record-alpha"]')).toBe(
      alphaRow,
    );
    expect(
      container.querySelector('[data-row-id="record-beta"]'),
    ).not.toBeNull();
  });

  it("renders the loading state across all effective columns without stale rows or pagination", () => {
    const { container } = renderTable({
      pagination: { page: 1, totalPages: 3, onPageChange: vi.fn() },
      renderRowActions: (row) => (
        <button type="button">Inspect {row.label}</button>
      ),
      state: { status: "loading", label: "Loading available records" },
    });

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading available records");
    expect(status).toHaveClass("sr-only");
    expect(screen.getByText("Loading…").closest("td")).toHaveAttribute(
      "colspan",
      "3",
    );
    expect(container).not.toHaveTextContent("Alpha");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders consumer-owned empty copy across all columns and suppresses pagination", () => {
    const { container } = renderTable({
      pagination: { page: 1, totalPages: 3, onPageChange: vi.fn() },
      rows: [],
    });

    expect(screen.getByText("No records")).toBeInTheDocument();
    expect(screen.getByText("Add a record to continue.")).toBeInTheDocument();
    expect(container.querySelector("td")).toHaveAttribute("colspan", "2");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders one full-width accessible error with an optional consumer action", () => {
    const retry = vi.fn();
    const { container } = renderTable({
      pagination: { page: 1, totalPages: 3, onPageChange: vi.fn() },
      state: {
        status: "error",
        title: "Records could not be loaded",
        description: "Check the connection and try again.",
        action: (
          <button onClick={retry} type="button">
            Try again
          </button>
        ),
      },
    });

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Records could not be loaded");
    expect(alert).toHaveTextContent("Check the connection and try again.");
    expect(alert.closest("td")).toHaveAttribute("colspan", "2");
    expect(container).not.toHaveTextContent("Alpha");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it("adds exactly one labelled actions column and leaves behavior consumer-owned", () => {
    const inspect = vi.fn();
    const { container } = renderTable({
      renderRowActions: (row) => (
        <button onClick={() => inspect(row.id)} type="button">
          Inspect {row.label}
        </button>
      ),
      rowActionsLabel: "Record actions",
    });

    expect(
      screen.getByRole("columnheader", { name: "Record actions" }),
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-slot="data-table-actions-cell"]'),
    ).toHaveLength(rows.length);

    const action = screen.getByRole("button", { name: "Inspect Alpha" });
    action.focus();
    expect(action).toHaveFocus();
    fireEvent.click(action);
    expect(inspect).toHaveBeenCalledWith("record-alpha");
  });

  it("renders bounded controlled pagination with current-page semantics and stable focus", () => {
    const onPageChange = vi.fn();
    renderTable({
      pagination: {
        navigationLabel: "Record pages",
        nextLabel: "Next records",
        onPageChange,
        page: 2,
        previousLabel: "Previous records",
        summary: "Showing 3–4 of 6",
        totalPages: 3,
      },
    });

    const pagination = screen.getByRole("navigation", {
      name: "Record pages",
    });
    const currentPage = within(pagination).getByRole("button", {
      name: "Page 2",
    });
    const next = within(pagination).getByRole("button", {
      name: "Next records",
    });

    expect(currentPage).toHaveAttribute("aria-current", "page");
    expect(currentPage).toBeDisabled();
    expect(
      within(pagination).getByRole("button", { name: "Previous records" }),
    ).not.toBeDisabled();
    expect(next).not.toBeDisabled();
    expect(screen.getByText("Showing 3–4 of 6")).toBeInTheDocument();

    next.focus();
    fireEvent.click(next);
    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(next).toHaveFocus();

    fireEvent.click(within(pagination).getByRole("button", { name: "Page 1" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(onPageChange).not.toHaveBeenCalledWith(0);
    expect(onPageChange).not.toHaveBeenCalledWith(4);
  });

  it("suppresses invalid, out-of-range, and single-page pagination", () => {
    const onPageChange = vi.fn();
    const { rerender } = renderTable({
      pagination: { page: 0, totalPages: 3, onPageChange },
    });

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    rerender(
      <DataTable
        {...baseProps}
        pagination={{ page: 4, totalPages: 3, onPageChange }}
      />,
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    rerender(
      <DataTable
        {...baseProps}
        pagination={{ page: 1.5, totalPages: 3, onPageChange }}
      />,
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    rerender(
      <DataTable
        {...baseProps}
        pagination={{ page: 1, totalPages: 1, onPageChange }}
      />,
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("preserves responsive table overflow and a stacking pagination composition", () => {
    const { container } = renderTable({
      pagination: {
        page: 1,
        totalPages: 3,
        onPageChange: vi.fn(),
        summary: "Showing 1–2 of 6",
      },
    });

    expect(container.firstElementChild).toHaveClass("min-w-0");
    expect(screen.getByRole("table").parentElement).toHaveClass(
      "w-full",
      "overflow-auto",
    );
    expect(
      container.querySelector('[data-slot="data-table-pagination"]'),
    ).toHaveClass("flex-col", "sm:flex-row");
    expect(
      container.querySelector('[data-slot="pagination-content"]'),
    ).toHaveClass("!m-0", "!max-w-none", "!p-0", "[&>li]:before:hidden");
  });

  it("has no detectable accessibility violations in a representative ready state", async () => {
    const { container } = renderTable({
      pagination: {
        page: 1,
        totalPages: 3,
        onPageChange: vi.fn(),
      },
      renderRowActions: (row) => (
        <button aria-label={`Inspect ${row.label}`} type="button">
          Inspect
        </button>
      ),
    });

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });

  it("keeps canonical source on approved public and Block-local imports", () => {
    const source = dataTableSource;

    expect(source).toContain('from "react"');
    expect(source).toContain('from "@pycolors/ui"');
    expect(source).not.toMatch(/@pycolors\/ui\//u);
    expect(source).not.toMatch(/@pycolors\/(?!ui["'])/u);
    expect(source).not.toMatch(/from ["'](?:next|@tanstack|lucide-react)/u);
    expect(source).not.toMatch(/starter-free|starter-pro/iu);
    expect(source).not.toMatch(/registry\.json|registry\/|\bcli\b/iu);
    expect(source).not.toMatch(/\b(?:backend|billing|authentication)\b/iu);
    expect(source).not.toMatch(/\bany\b/u);
  });
});

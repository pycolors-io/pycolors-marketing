import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  DataTable,
  type DataTableColumn,
  type DataTablePageSize,
  type DataTableProps,
  type DataTableState,
} from "../../content/blocks/data/data-table/index";
import { DataTablePageSizeExample } from "../../components/docs/blocks/data-table-example";

type Row = Readonly<{ id: string; label: string }>;

const rows = Object.freeze([
  { id: "charlie", label: "Charlie" },
  { id: "alpha", label: "Alpha" },
  { id: "bravo", label: "Bravo" },
]);

const columns = [
  { id: "label", header: "Label", cell: (row) => row.label, sortable: true },
] satisfies readonly DataTableColumn<Row>[];

const baseProps = {
  caption: "Consumer records",
  columns,
  emptyTitle: "No records",
  getRowId: (row) => row.id,
  rows,
} satisfies DataTableProps<Row>;

function controller(overrides: Partial<DataTablePageSize> = {}) {
  return {
    value: 2,
    options: [2, 3, 6],
    onPageSizeChange: vi.fn(),
    ...overrides,
  } satisfies DataTablePageSize;
}

function visibleLabels(table: HTMLElement) {
  return Array.from(table.querySelectorAll("tbody tr")).map(
    (row) => row.querySelector("td")?.textContent,
  );
}

describe("DataTable page size", () => {
  it("preserves tables that omit the controller", () => {
    const { container } = render(<DataTable {...baseProps} />);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="data-table-page-size"]'),
    ).toBeNull();
    expect(visibleLabels(screen.getByRole("table"))).toEqual([
      "Charlie",
      "Alpha",
      "Bravo",
    ]);
  });

  it("labels the native control and filters options without mutating or sorting them", () => {
    const options = Object.freeze([
      6,
      2,
      6,
      0,
      -1,
      1.5,
      Number.NaN,
      Infinity,
      Number.MAX_SAFE_INTEGER + 1,
      3,
    ]);
    const before = [...options];
    const pageSize = controller({ options });
    render(<DataTable {...baseProps} pageSize={pageSize} />);
    const select = screen.getByRole("combobox", { name: "Rows per page" });

    expect(select.tagName).toBe("SELECT");
    expect(screen.getByLabelText("Rows per page")).toBe(select);
    expect(select).toHaveValue("2");
    expect(
      within(select)
        .getAllByRole("option")
        .map((option) => option.getAttribute("value")),
    ).toEqual(["6", "2", "3"]);
    expect(options).toEqual(before);
    expect(pageSize.onPageSizeChange).not.toHaveBeenCalled();
    expect(screen.getByRole("table").parentElement).not.toContainElement(select);
    expect(select.closest("label")).toHaveClass("min-w-0", "flex-wrap");
    expect(select).toHaveClass("bg-background", "focus-visible:ring-2");
  });

  it("requests a numeric size without changing supplied rows, sorting, page or value", () => {
    const pageSize = controller();
    const onPageChange = vi.fn();
    const onSortChange = vi.fn();
    render(
      <DataTable
        {...baseProps}
        pageSize={pageSize}
        pagination={{ page: 2, totalPages: 4, onPageChange }}
        sorting={{ value: { columnId: "label", direction: "asc" }, onSortChange }}
      />,
    );
    const select = screen.getByRole("combobox");
    select.focus();
    fireEvent.change(select, { target: { value: "6" } });

    expect(pageSize.onPageSizeChange).toHaveBeenCalledOnce();
    expect(pageSize.onPageSizeChange).toHaveBeenCalledWith(6);
    expect(select).toHaveValue("2");
    expect(select).toHaveFocus();
    expect(visibleLabels(screen.getByRole("table"))).toEqual([
      "Charlie",
      "Alpha",
      "Bravo",
    ]);
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("columnheader")).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    expect(onPageChange).not.toHaveBeenCalled();
    expect(onSortChange).not.toHaveBeenCalled();
  });

  it("does not request an unchanged, missing or disallowed option", () => {
    const pageSize = controller();
    render(<DataTable {...baseProps} pageSize={pageSize} />);
    const select = screen.getByRole("combobox");
    for (const value of ["2", "", "0", "-1", "1.5", "7", "NaN"]) {
      fireEvent.change(select, { target: { value } });
    }
    expect(pageSize.onPageSizeChange).not.toHaveBeenCalled();
    expect(select).toHaveValue("2");
  });

  it.each([0, -1, 1.5, Number.NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, 7])(
    "hides an invalid or unknown current size (%s) without effects",
    (value) => {
      const pageSize = controller({ value });
      render(<DataTable {...baseProps} pageSize={pageSize} />);
      expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
      expect(pageSize.onPageSizeChange).not.toHaveBeenCalled();
    },
  );

  it.each([
    { options: [] },
    { options: [2] },
    { options: [2, 2] },
    { options: [0, -1, Number.NaN] },
  ])(
    "hides configurations with fewer than two valid choices: $options",
    ({ options }) => {
      const pageSize = controller({ options });
      render(<DataTable {...baseProps} pageSize={pageSize} />);
      expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
      expect(pageSize.onPageSizeChange).not.toHaveBeenCalled();
    },
  );

  it.each([
    { status: "loading", label: "Loading records" },
    { status: "error", title: "Records unavailable" },
  ] satisfies DataTableState[])("hides the control during $status", (state) => {
    const pageSize = controller();
    render(<DataTable {...baseProps} pageSize={pageSize} state={state} />);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(pageSize.onPageSizeChange).not.toHaveBeenCalled();
  });

  it("preserves empty actions and hides the control for empty results", () => {
    render(
      <DataTable
        {...baseProps}
        emptyAction={<button type="button">Add record</button>}
        pageSize={controller()}
        rows={[]}
      />,
    );
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByText("No records")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add record" })).toBeInTheDocument();
  });

  it("works without pagination and remains available on a single page", () => {
    const pageSize = controller();
    const { rerender } = render(<DataTable {...baseProps} pageSize={pageSize} />);
    const select = screen.getByRole("combobox");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    rerender(
      <DataTable
        {...baseProps}
        pageSize={pageSize}
        pagination={{ page: 1, totalPages: 1, onPageChange: vi.fn() }}
      />,
    );
    expect(screen.getByRole("combobox")).toBe(select);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    fireEvent.change(select, { target: { value: "3" } });
    expect(pageSize.onPageSizeChange).toHaveBeenCalledOnce();
    expect(pageSize.onPageSizeChange).toHaveBeenCalledWith(3);
  });

  it("accepts consumer updates without replacing focused controls or keyed rows", () => {
    const pageSize = controller();
    const { container, rerender } = render(
      <DataTable {...baseProps} pageSize={pageSize} />,
    );
    const select = screen.getByRole("combobox");
    const row = container.querySelector('[data-row-id="alpha"]');
    select.focus();
    rerender(
      <DataTable
        {...baseProps}
        pageSize={{ ...pageSize, value: 6, options: [6, 3, 2] }}
        rows={[...rows].reverse()}
      />,
    );
    expect(screen.getByRole("combobox")).toBe(select);
    expect(select).toHaveValue("6");
    expect(select).toHaveFocus();
    expect(container.querySelector('[data-row-id="alpha"]')).toBe(row);
    expect(pageSize.onPageSizeChange).not.toHaveBeenCalled();
  });

  it("localizes the visible label and does not submit or add a named form field", () => {
    const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const pageSize = controller({ label: "Lignes par page" });
    render(
      <form onSubmit={submit}>
        <DataTable {...baseProps} pageSize={pageSize} />
      </form>,
    );
    const select = screen.getByRole("combobox", { name: "Lignes par page" });
    expect(screen.getByLabelText("Lignes par page")).toBe(select);
    expect(select).not.toHaveAttribute("name");
    fireEvent.change(select, { target: { value: "3" } });
    expect(pageSize.onPageSizeChange).toHaveBeenCalledOnce();
    expect(pageSize.onPageSizeChange).toHaveBeenCalledWith(3);
    expect(submit).not.toHaveBeenCalled();
  });

  it("keeps repeated table controls independent without label collisions", () => {
    const first = controller();
    const second = controller({ value: 3 });
    render(
      <>
        <DataTable {...baseProps} pageSize={first} />
        <DataTable {...baseProps} caption="Other records" pageSize={second} />
      </>,
    );
    const selects = screen.getAllByRole("combobox", { name: "Rows per page" });
    expect(selects).toHaveLength(2);
    expect(selects[0].closest("label")).not.toBe(selects[1].closest("label"));
    fireEvent.change(selects[1], { target: { value: "6" } });
    expect(first.onPageSizeChange).not.toHaveBeenCalled();
    expect(second.onPageSizeChange).toHaveBeenCalledOnce();
    expect(second.onPageSizeChange).toHaveBeenCalledWith(6);
    expect(selects[0]).toHaveValue("2");
    expect(selects[1]).toHaveValue("3");
  });

  it("has no detectable structural accessibility violations", async () => {
    const { container } = render(
      <DataTable
        {...baseProps}
        pageSize={controller()}
        pagination={{ page: 1, totalPages: 2, onPageChange: vi.fn() }}
      />,
    );
    expect(
      await axe(container, { rules: { "color-contrast": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});

describe("DataTablePageSizeExample", () => {
  it("resets the page on size changes and sorts the full dataset before slicing", () => {
    render(<DataTablePageSizeExample />);
    const table = screen.getByRole("table", { name: "Adjustable sample records" });
    const select = screen.getByRole("combobox", { name: "Rows per page" });
    expect(visibleLabels(table)).toEqual(["Northwind", "Contoso"]);

    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(visibleLabels(table)).toEqual(["Fabrikam", "Adventure Works"]);
    select.focus();
    fireEvent.change(select, { target: { value: "3" } });
    expect(visibleLabels(table)).toEqual(["Northwind", "Contoso", "Fabrikam"]);
    expect(screen.getByText(/Showing 1–3 of 6/)).toBeInTheDocument();
    expect(select).toHaveFocus();
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Record.*Sort ascending/ }),
    );
    expect(visibleLabels(table)).toEqual([
      "Adventure Works",
      "Contoso",
      "Fabrikam",
    ]);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();

    fireEvent.change(select, { target: { value: "6" } });
    expect(visibleLabels(table)).toEqual([
      "Adventure Works",
      "Contoso",
      "Fabrikam",
      "Northwind",
      "Tailspin",
      "Wide World Importers",
    ]);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(select).toHaveValue("6");
    expect(screen.getByText(/Showing 1–6 of 6/)).toBeInTheDocument();
    expect(screen.getByText(/No request is sent or data saved/)).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "2" } });
    expect(visibleLabels(table)).toEqual(["Adventure Works", "Contoso"]);
    fireEvent.click(screen.getByRole("button", { name: "Reset table" }));
    expect(visibleLabels(table)).toEqual(["Northwind", "Contoso"]);
    expect(select).toHaveValue("2");
    expect(table.querySelector("[aria-sort]")).toBeNull();
  });

  it("does not mutate shared records or another mounted example", () => {
    const { container } = render(
      <>
        <DataTablePageSizeExample />
        <DataTablePageSizeExample />
      </>,
    );
    const tables = screen.getAllByRole("table");
    const controls = screen.getAllByRole("combobox");
    fireEvent.click(
      within(tables[0]).getByRole("button", { name: /Record.*Sort ascending/ }),
    );
    fireEvent.change(controls[0], { target: { value: "6" } });
    expect(visibleLabels(tables[0])).toHaveLength(6);
    expect(visibleLabels(tables[1])).toEqual(["Northwind", "Contoso"]);
    expect(controls[1]).toHaveValue("2");
    expect(
      container.querySelectorAll('[data-slot="data-table-page-size"]'),
    ).toHaveLength(2);
  });
});

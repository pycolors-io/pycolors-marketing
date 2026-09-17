import * as React from "react";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
  type DataTableQuery,
  type DataTableState,
} from "../../content/blocks/data/data-table/index";
import { DataTableQueryExample } from "../../components/docs/blocks/data-table-example";

type Row = Readonly<{ id: string; label: string }>;

const rows = [
  { id: "alpha", label: "Alpha" },
  { id: "beta", label: "Beta" },
] as const satisfies readonly Row[];
const columns = [
  { id: "label", header: "Record", cell: (row) => row.label, sortable: true },
] satisfies readonly DataTableColumn<Row>[];
const baseProps = {
  caption: "Test records",
  columns,
  emptyTitle: "No matching records",
  getRowId: (row) => row.id,
  rows,
} satisfies DataTableProps<Row>;
const emptySlots = [
  { name: "missing", slot: undefined },
  { name: "null", slot: null },
  { name: "false", slot: false },
  { name: "empty string", slot: "" },
  { name: "empty array", slot: [] },
  { name: "empty children", slot: [null, false, ""] },
];

function createQuery(overrides: Partial<DataTableQuery> = {}): DataTableQuery {
  return {
    search: { label: "Search records", value: "", onValueChange: vi.fn() },
    reset: { label: "Reset filters", onReset: vi.fn() },
    ...overrides,
  };
}

function visibleLabels(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll('tbody td[data-column-id="label"]'),
    (cell) => cell.textContent,
  );
}

describe("DataTable query controls", () => {
  it("preserves tables when query is omitted", () => {
    const { container } = render(<DataTable {...baseProps} />);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    expect(visibleLabels(container)).toEqual(["Alpha", "Beta"]);
    expect(screen.getByRole("table", { name: "Test records" })).toBeVisible();
  });

  it("labels search outside the table scroller", () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const query = createQuery({
      label: "Record search options",
      search: {
        label: "Find records",
        value: "Alpha",
        placeholder: "Enter a name",
        onValueChange: vi.fn(),
        inputRef,
      },
      summary: 0,
    });
    const { container } = render(<DataTable {...baseProps} query={query} />);
    const group = screen.getByRole("group", { name: "Record search options" });
    const controls = within(group);
    const input = controls.getByRole("searchbox", { name: "Find records" });
    const table = screen.getByRole("table");
    const summary = group.querySelector(
      '[data-slot="data-table-query-summary"]',
    );

    expect(screen.getByLabelText("Find records")).toBe(input);
    expect(inputRef.current).toBe(input);
    expect(input).toHaveValue("Alpha");
    expect(input).toHaveAttribute("placeholder", "Enter a name");
    expect(input).toHaveClass("focus-visible:ring-2", "min-w-0");
    expect(table.parentElement).not.toContainElement(input);
    expect(container.firstElementChild?.firstElementChild).toBe(group);
    expect(summary).toHaveTextContent("0");
    expect(controls.queryByRole("status")).not.toBeInTheDocument();
    expect(group).not.toHaveAttribute("aria-live");
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("forwards raw requests without changing table state", () => {
    const onValueChange = vi.fn();
    const onReset = vi.fn();
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    const onSortChange = vi.fn();
    const query = createQuery({
      search: { label: "Search records", value: "", onValueChange },
      reset: { label: "Reset filters", onReset },
    });
    const { container } = render(
      <DataTable
        {...baseProps}
        pageSize={{ value: 2, options: [2, 10], onPageSizeChange }}
        pagination={{ page: 2, totalPages: 3, onPageChange }}
        query={query}
        sorting={{
          value: { columnId: "label", direction: "desc" },
          onSortChange,
        }}
      />,
    );
    const input = screen.getByRole("searchbox");
    input.focus();
    fireEvent.change(input, { target: { value: "  ÉTÉ & Beta  " } });
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith("  ÉTÉ & Beta  ");
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();

    const reset = screen.getByRole("button", { name: "Reset filters" });
    reset.focus();
    fireEvent.click(reset);
    const size = screen.getByRole("combobox", { name: "Rows per page" });
    const page = screen.getByRole("button", { name: "Page 2" });
    const sortedHeader = container.querySelector("th[aria-sort]");
    expect(onReset).toHaveBeenCalledOnce();
    expect(reset).toHaveFocus();
    expect(visibleLabels(container)).toEqual(["Alpha", "Beta"]);
    expect(size).toHaveValue("2");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(sortedHeader).toHaveAttribute("aria-sort", "descending");
    expect(onPageChange).not.toHaveBeenCalled();
    expect(onPageSizeChange).not.toHaveBeenCalled();
    expect(onSortChange).not.toHaveBeenCalled();
  });

  it("preserves controlled input across async transitions", () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const query = createQuery({
      search: {
        label: "Search records",
        value: "Al",
        onValueChange: vi.fn(),
        inputRef,
      },
    });
    const { rerender } = render(<DataTable {...baseProps} query={query} />);
    const input = screen.getByRole("searchbox");
    input.focus();
    const states: readonly DataTableState[] = [
      { status: "loading", label: "Loading records" },
      { status: "error", title: "Could not load records" },
      { status: "ready" },
    ];
    for (const state of states) {
      const props = { ...baseProps, query, rows: [], state };
      rerender(<DataTable {...props} />);
      const reset = screen.getByRole("button", { name: "Reset filters" });
      expect(screen.getByRole("searchbox")).toBe(input);
      expect(inputRef.current).toBe(input);
      expect(input).toHaveValue("Al");
      expect(input).toHaveFocus();
      expect(input).not.toBeDisabled();
      expect(reset).not.toBeDisabled();
    }
    rerender(
      <DataTable
        {...baseProps}
        query={{ ...query, search: { ...query.search, value: "Beta" } }}
      />,
    );
    expect(input).toHaveValue("Beta");
    expect(input).toHaveFocus();
  });

  it("respects explicit search and reset disabled flags", () => {
    const onValueChange = vi.fn();
    const onReset = vi.fn();
    const query = createQuery({
      search: {
        label: "Search records",
        value: "Alpha",
        onValueChange,
        disabled: true,
      },
      reset: { label: "Reset filters", onReset, disabled: true },
    });
    render(<DataTable {...baseProps} query={query} />);
    const input = screen.getByRole("searchbox");
    const reset = screen.getByRole("button", { name: "Reset filters" });
    expect(input).toBeDisabled();
    expect(reset).toBeDisabled();
    fireEvent.change(input, { target: { value: "Beta" } });
    fireEvent.click(reset);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  it("preserves consumer filter controls and native behavior", () => {
    const onFilter = vi.fn();
    const selectRef = React.createRef<HTMLSelectElement>();
    const filters = (
      <>
        <label>
          State
          <select defaultValue="all" onChange={onFilter} ref={selectRef}>
            <option value="all">All states</option>
            <option value="paused">Paused</option>
          </select>
        </label>
        <a href="/records/help">Filter help</a>
        <button disabled type="button">
          Unavailable filter
        </button>
      </>
    );
    const query = createQuery({ filters });
    const { rerender } = render(<DataTable {...baseProps} query={query} />);
    const select = screen.getByRole("combobox", { name: "State" });
    const help = screen.getByRole("link", { name: "Filter help" });
    const disabled = screen.getByRole("button", {
      name: "Unavailable filter",
    });
    expect(selectRef.current).toBe(select);
    expect(help).toHaveAttribute("href", "/records/help");
    expect(disabled).toBeDisabled();
    select.focus();
    fireEvent.change(select, { target: { value: "paused" } });
    expect(onFilter).toHaveBeenCalledOnce();
    rerender(<DataTable {...baseProps} query={query} rows={[]} />);
    expect(screen.getByRole("combobox", { name: "State" })).toBe(select);
    expect(select).toHaveValue("paused");
    expect(select).toHaveFocus();
  });

  it.each(emptySlots)("omits empty slots ($name)", ({ slot }) => {
    const query = createQuery({
      filters: slot,
      summary: slot,
      reset: undefined,
    });
    const { container } = render(<DataTable {...baseProps} query={query} />);
    const filters = container.querySelector('[data-slot="data-table-filters"]');
    const summary = container.querySelector(
      '[data-slot="data-table-query-summary"]',
    );
    const reset = screen.queryByRole("button", { name: "Reset filters" });
    expect(filters).toBeNull();
    expect(summary).toBeNull();
    expect(reset).not.toBeInTheDocument();
  });

  it("prevents form submission without intercepting composition", () => {
    const onSubmit = vi.fn();
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <DataTable {...baseProps} query={createQuery()} />
      </form>,
    );
    const input = screen.getByRole("searchbox");
    const enter = createEvent.keyDown(input, {
      key: "Enter",
      isComposing: false,
    });
    fireEvent(input, enter);
    expect(enter.defaultPrevented).toBe(true);
    const composing = createEvent.keyDown(input, {
      key: "Enter",
      isComposing: true,
    });
    fireEvent(input, composing);
    expect(composing.defaultPrevented).toBe(false);
    for (const key of ["Escape", "Tab", "ArrowDown"]) {
      const event = createEvent.keyDown(input, { key });
      fireEvent(input, event);
      expect(event.defaultPrevented).toBe(false);
    }
    const reset = screen.getByRole("button", { name: "Reset filters" });
    expect(reset).toHaveAttribute("type", "button");
    fireEvent.click(reset);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("isolates repeated instances with localized labels", () => {
    const firstChange = vi.fn();
    const secondChange = vi.fn();
    const firstQuery = createQuery({
      label: "Premier tableau",
      search: {
        label: "Rechercher",
        value: "Alpha",
        onValueChange: firstChange,
      },
    });
    const secondQuery = createQuery({
      label: "Second tableau",
      search: {
        label: "Rechercher",
        value: "Beta",
        onValueChange: secondChange,
      },
    });
    render(
      <>
        <DataTable {...baseProps} query={firstQuery} />
        <DataTable {...baseProps} query={secondQuery} />
      </>,
    );
    const firstGroup = screen.getByRole("group", { name: "Premier tableau" });
    const secondGroup = screen.getByRole("group", { name: "Second tableau" });
    const first = within(firstGroup).getByLabelText("Rechercher");
    const second = within(secondGroup).getByLabelText("Rechercher");
    expect(first).not.toBe(second);
    expect(first).toHaveValue("Alpha");
    expect(second).toHaveValue("Beta");
    fireEvent.change(second, { target: { value: "Gamma" } });
    expect(secondChange).toHaveBeenCalledExactlyOnceWith("Gamma");
    expect(firstChange).not.toHaveBeenCalled();
  });

  it.each([false, true])("passes axe with empty=%s", async (empty) => {
    const query = createQuery({
      summary: empty ? "0 matching records" : "2 matching records",
    });
    const { container } = render(
      <DataTable {...baseProps} query={query} rows={empty ? [] : rows} />,
    );
    const result = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(result).toHaveNoViolations();
  });
});

describe("DataTableQueryExample", () => {
  it("searches all records and recovers without losing focus", () => {
    const { container } = render(<DataTableQueryExample />);
    const input = screen.getByRole("searchbox", { name: "Search records" });
    expect(visibleLabels(container)).toEqual(["Northwind", "Contoso"]);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(visibleLabels(container)).toEqual(["Fabrikam", "Adventure Works"]);
    input.focus();
    fireEvent.change(input, { target: { value: "  WOrLD  " } });
    expect(input).toHaveValue("  WOrLD  ");
    expect(input).toHaveFocus();
    expect(visibleLabels(container)).toEqual(["Wide World Importers"]);
    const found = screen.getByText("Showing 1–1 of 1 matching records.");
    expect(found).toBeVisible();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "State" }), {
      target: { value: "Paused" },
    });
    expect(visibleLabels(container)).toEqual([]);
    expect(screen.getByText("No matching records")).toBeVisible();
    const empty = screen.getByText("Showing 0–0 of 0 matching records.");
    const size = screen.queryByRole("combobox", { name: "Rows per page" });
    expect(empty).toBeVisible();
    expect(size).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByRole("searchbox")).toBe(input);
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    expect(screen.getByRole("combobox", { name: "State" })).toHaveValue("all");
    expect(visibleLabels(container)).toEqual(["Northwind", "Contoso"]);
  });

  it("coordinates filters, sort, page resets and page size", () => {
    const { container } = render(<DataTableQueryExample />);
    const ascending = /^Record\s*:\s*Sort ascending$/;
    const descending = /^Record\s*:\s*Sort descending$/;
    fireEvent.click(screen.getByRole("button", { name: ascending }));
    const size = screen.getByRole("combobox", { name: "Rows per page" });
    fireEvent.change(size, { target: { value: "3" } });
    expect(visibleLabels(container)).toEqual([
      "Adventure Works",
      "Contoso",
      "Fabrikam",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(visibleLabels(container)).toEqual([
      "Northwind",
      "Tailspin",
      "Wide World Importers",
    ]);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "o" },
    });
    expect(visibleLabels(container)).toEqual([
      "Adventure Works",
      "Contoso",
      "Northwind",
    ]);
    const matches = screen.getByText("Showing 1–3 of 4 matching records.");
    expect(matches).toBeVisible();
    fireEvent.change(screen.getByRole("combobox", { name: "State" }), {
      target: { value: "Available" },
    });
    expect(visibleLabels(container)).toEqual([
      "Adventure Works",
      "Northwind",
      "Wide World Importers",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    const retainedSize = screen.getByRole("combobox", {
      name: "Rows per page",
    });
    const sortedHeader = container.querySelector("th[aria-sort]");
    expect(retainedSize).toHaveValue("3");
    expect(sortedHeader).toHaveAttribute("aria-sort", "ascending");
    expect(visibleLabels(container)).toEqual([
      "Adventure Works",
      "Contoso",
      "Fabrikam",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(screen.getByRole("button", { name: descending }));
    expect(visibleLabels(container)).toEqual([
      "Wide World Importers",
      "Tailspin",
      "Northwind",
    ]);
    const ordered = screen.getByText("Showing 1–3 of 6 matching records.");
    expect(ordered).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.change(retainedSize, { target: { value: "2" } });
    expect(visibleLabels(container)).toEqual([
      "Wide World Importers",
      "Tailspin",
    ]);
    const resized = screen.getByText("Showing 1–2 of 6 matching records.");
    expect(resized).toBeVisible();
  });

  it("keeps local actions truthful and sample records immutable", () => {
    const first = render(<DataTableQueryExample />);
    fireEvent.click(screen.getByRole("button", { name: "Inspect Northwind" }));
    const selected = screen.getByText(
      "Selected Northwind locally. Nothing was saved.",
    );
    expect(selected).toBeVisible();
    const ascending = /^Record\s*:\s*Sort ascending$/;
    fireEvent.click(screen.getByRole("button", { name: ascending }));
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "missing" },
    });
    first.unmount();
    const second = render(<DataTableQueryExample />);
    expect(visibleLabels(second.container)).toEqual(["Northwind", "Contoso"]);
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(second.container.querySelector("th[aria-sort]")).toBeNull();
  });
});

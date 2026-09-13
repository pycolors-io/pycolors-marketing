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
  it("preserves the table without introducing controls when query is omitted", () => {
    const { container } = render(<DataTable {...baseProps} />);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    expect(visibleLabels(container)).toEqual(["Alpha", "Beta"]);
    expect(screen.getByRole("table", { name: "Test records" })).toBeVisible();
  });

  it("renders a labelled native search outside the table scroller", () => {
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
    const input = within(group).getByRole("searchbox", { name: "Find records" });
    const table = screen.getByRole("table");

    expect(screen.getByLabelText("Find records")).toBe(input);
    expect(inputRef.current).toBe(input);
    expect(input).toHaveValue("Alpha");
    expect(input).toHaveAttribute("placeholder", "Enter a name");
    expect(input).toHaveClass("focus-visible:ring-2", "min-w-0");
    expect(table.parentElement).not.toContainElement(input);
    expect(container.firstElementChild?.firstElementChild).toBe(group);
    expect(
      group.querySelector('[data-slot="data-table-query-summary"]'),
    ).toHaveTextContent("0");
    expect(within(group).queryByRole("status")).not.toBeInTheDocument();
    expect(group).not.toHaveAttribute("aria-live");
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("forwards raw requests without changing rows, sorting, size or page state", () => {
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
    expect(onReset).toHaveBeenCalledOnce();
    expect(reset).toHaveFocus();
    expect(visibleLabels(container)).toEqual(["Alpha", "Beta"]);
    expect(
      screen.getByRole("combobox", { name: "Rows per page" }),
    ).toHaveValue("2");
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(container.querySelector("th[aria-sort]")).toHaveAttribute(
      "aria-sort",
      "descending",
    );
    expect(onPageChange).not.toHaveBeenCalled();
    expect(onPageSizeChange).not.toHaveBeenCalled();
    expect(onSortChange).not.toHaveBeenCalled();
  });

  it("preserves controlled values, DOM identity and the ref across state transitions", () => {
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
      rerender(
        <DataTable {...baseProps} query={query} rows={[]} state={state} />,
      );
      expect(screen.getByRole("searchbox")).toBe(input);
      expect(inputRef.current).toBe(input);
      expect(input).toHaveValue("Al");
      expect(input).toHaveFocus();
      expect(input).not.toBeDisabled();
      expect(
        screen.getByRole("button", { name: "Reset filters" }),
      ).not.toBeDisabled();
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
    render(
      <DataTable
        {...baseProps}
        query={createQuery({
          search: {
            label: "Search records",
            value: "Alpha",
            onValueChange,
            disabled: true,
          },
          reset: { label: "Reset filters", onReset, disabled: true },
        })}
      />,
    );
    const input = screen.getByRole("searchbox");
    const reset = screen.getByRole("button", { name: "Reset filters" });
    expect(input).toBeDisabled();
    expect(reset).toBeDisabled();
    fireEvent.change(input, { target: { value: "Beta" } });
    fireEvent.click(reset);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  it("preserves consumer filter controls, refs, links and callbacks", () => {
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
    const { rerender } = render(
      <DataTable {...baseProps} query={createQuery({ filters })} />,
    );
    const select = screen.getByRole("combobox", { name: "State" });
    expect(selectRef.current).toBe(select);
    expect(screen.getByRole("link", { name: "Filter help" })).toHaveAttribute(
      "href",
      "/records/help",
    );
    expect(
      screen.getByRole("button", { name: "Unavailable filter" }),
    ).toBeDisabled();
    select.focus();
    fireEvent.change(select, { target: { value: "paused" } });
    expect(onFilter).toHaveBeenCalledOnce();
    rerender(
      <DataTable {...baseProps} query={createQuery({ filters })} rows={[]} />,
    );
    expect(screen.getByRole("combobox", { name: "State" })).toBe(select);
    expect(select).toHaveValue("paused");
    expect(select).toHaveFocus();
  });

  it.each([undefined, null, false, "", [], [null, false, ""]])(
    "omits empty filter and summary slots (%j)",
    (slot) => {
      const { container } = render(
        <DataTable
          {...baseProps}
          query={createQuery({
            filters: slot,
            summary: slot,
            reset: undefined,
          })}
        />,
      );
      expect(
        container.querySelector('[data-slot="data-table-filters"]'),
      ).toBeNull();
      expect(
        container.querySelector('[data-slot="data-table-query-summary"]'),
      ).toBeNull();
      expect(
        screen.queryByRole("button", { name: "Reset filters" }),
      ).not.toBeInTheDocument();
    },
  );

  it("keeps native reset non-submitting and only prevents non-composition Enter", () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) =>
      event.preventDefault(),
    );
    render(
      <form onSubmit={onSubmit}>
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

  it("isolates repeated instances and supports consumer-localized labels", () => {
    const firstChange = vi.fn();
    const secondChange = vi.fn();
    render(
      <>
        <DataTable
          {...baseProps}
          query={createQuery({
            label: "Premier tableau",
            search: {
              label: "Rechercher",
              value: "Alpha",
              onValueChange: firstChange,
            },
          })}
        />
        <DataTable
          {...baseProps}
          query={createQuery({
            label: "Second tableau",
            search: {
              label: "Rechercher",
              value: "Beta",
              onValueChange: secondChange,
            },
          })}
        />
      </>,
    );
    const first = within(
      screen.getByRole("group", { name: "Premier tableau" }),
    ).getByLabelText("Rechercher");
    const second = within(
      screen.getByRole("group", { name: "Second tableau" }),
    ).getByLabelText("Rechercher");
    expect(first).not.toBe(second);
    expect(first).toHaveValue("Alpha");
    expect(second).toHaveValue("Beta");
    fireEvent.change(second, { target: { value: "Gamma" } });
    expect(secondChange).toHaveBeenCalledExactlyOnceWith("Gamma");
    expect(firstChange).not.toHaveBeenCalled();
  });

  it.each([false, true])(
    "has no structural axe violations with empty=%s",
    async (empty) => {
      const { container } = render(
        <DataTable
          {...baseProps}
          query={createQuery({
            summary: empty ? "0 matching records" : "2 matching records",
          })}
          rows={empty ? [] : rows}
        />,
      );
      const result = await axe(container, {
        rules: { "color-contrast": { enabled: false } },
      });
      expect(result).toHaveNoViolations();
    },
  );
});

describe("DataTableQueryExample", () => {
  it("searches the full dataset, intersects filters and recovers without losing focus", () => {
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
    expect(
      screen.getByText("Showing 1–1 of 1 matching records."),
    ).toBeVisible();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "State" }), {
      target: { value: "Paused" },
    });
    expect(visibleLabels(container)).toEqual([]);
    expect(screen.getByText("No matching records")).toBeVisible();
    expect(
      screen.getByText("Showing 0–0 of 0 matching records."),
    ).toBeVisible();
    expect(
      screen.queryByRole("combobox", { name: "Rows per page" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByRole("searchbox")).toBe(input);
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    expect(screen.getByRole("combobox", { name: "State" })).toHaveValue("all");
    expect(visibleLabels(container)).toEqual(["Northwind", "Contoso"]);
  });

  it("filters before sorting and slicing, resetting page but retaining sort and size", () => {
    const { container } = render(<DataTableQueryExample />);
    fireEvent.click(
      screen.getByRole("button", { name: /^Record\s*:\s*Sort ascending$/ }),
    );
    fireEvent.change(screen.getByRole("combobox", { name: "Rows per page" }), {
      target: { value: "3" },
    });
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
    expect(
      screen.getByText("Showing 1–3 of 4 matching records."),
    ).toBeVisible();
    fireEvent.change(screen.getByRole("combobox", { name: "State" }), {
      target: { value: "Available" },
    });
    expect(visibleLabels(container)).toEqual([
      "Adventure Works",
      "Northwind",
      "Wide World Importers",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(
      screen.getByRole("combobox", { name: "Rows per page" }),
    ).toHaveValue("3");
    expect(container.querySelector("th[aria-sort]")).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    expect(visibleLabels(container)).toEqual([
      "Adventure Works",
      "Contoso",
      "Fabrikam",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(
      screen.getByRole("button", { name: /^Record\s*:\s*Sort descending$/ }),
    );
    expect(visibleLabels(container)).toEqual([
      "Wide World Importers",
      "Tailspin",
      "Northwind",
    ]);
    expect(
      screen.getByText("Showing 1–3 of 6 matching records."),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Rows per page" }), {
      target: { value: "2" },
    });
    expect(visibleLabels(container)).toEqual([
      "Wide World Importers",
      "Tailspin",
    ]);
    expect(
      screen.getByText("Showing 1–2 of 6 matching records."),
    ).toBeVisible();
  });

  it("keeps local actions truthful and the original dataset unchanged across mounts", () => {
    const first = render(<DataTableQueryExample />);
    fireEvent.click(screen.getByRole("button", { name: "Inspect Northwind" }));
    expect(
      screen.getByText("Selected Northwind locally. Nothing was saved."),
    ).toBeVisible();
    fireEvent.click(
      screen.getByRole("button", { name: /^Record\s*:\s*Sort ascending$/ }),
    );
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

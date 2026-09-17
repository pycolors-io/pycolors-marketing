import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
  type DataTableState,
} from "../../content/blocks/data/data-table/index";
import { DataTableSortingExample } from "../../components/docs/blocks/data-table-example";

interface RecordRow {
  readonly id: string;
  readonly label: string;
  readonly state: string;
}

const rows: readonly RecordRow[] = Object.freeze([
  Object.freeze({ id: "beta", label: "Beta", state: "Paused" }),
  Object.freeze({ id: "alpha", label: "Alpha", state: "Available" }),
]);

const columns = [
  {
    id: "label",
    header: "Label",
    cell: (row) => row.label,
    sortable: true,
    headerClassName: "text-foreground",
  },
  {
    id: "state",
    header: "State",
    cell: (row) => row.state,
    sortable: true,
  },
  {
    id: "notes",
    header: "Notes",
    cell: () => "Read only",
    sortable: false,
  },
] satisfies readonly DataTableColumn<RecordRow>[];

const baseProps = {
  caption: "Consumer records",
  columns,
  emptyTitle: "No records",
  getRowId: (row) => row.id,
  rows,
} satisfies DataTableProps<RecordRow>;

function renderTable(overrides: Partial<DataTableProps<RecordRow>> = {}) {
  return render(<DataTable {...baseProps} {...overrides} />);
}

function labelOrder(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll('tbody [data-column-id="label"]'),
    (cell) => cell.textContent,
  );
}

describe("DataTable controlled sorting", () => {
  it("preserves plain headers when the optional controller is absent", () => {
    const { container } = renderTable();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(0);
    expect(screen.getByRole("columnheader", { name: "Label" })).toHaveAttribute(
      "scope",
      "col",
    );
    expect(labelOrder(container)).toEqual(["Beta", "Alpha"]);
  });

  it("requires column opt-in even when the controller is present", () => {
    const onSortChange = vi.fn();
    const { container } = renderTable({
      columns: columns.map((column) => ({ ...column, sortable: undefined })),
      sorting: {
        value: { columnId: "label", direction: "asc" },
        onSortChange,
      },
    });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(0);
    expect(onSortChange).not.toHaveBeenCalled();
  });

  it("requests ascending order without mutating consumer data", () => {
    const onSortChange = vi.fn();
    const onPageChange = vi.fn();
    const { container } = renderTable({
      pagination: { page: 2, totalPages: 3, onPageChange },
      sorting: { value: null, onSortChange },
    });
    const button = screen.getByRole("button", {
      name: /^Label.*Sort ascending$/,
    });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(onSortChange).toHaveBeenCalledTimes(2);
    expect(onSortChange).toHaveBeenNthCalledWith(1, {
      columnId: "label",
      direction: "asc",
    });
    expect(onSortChange).toHaveBeenNthCalledWith(2, {
      columnId: "label",
      direction: "asc",
    });
    expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(0);
    expect(labelOrder(container)).toEqual(["Beta", "Alpha"]);
    expect(rows.map((row) => row.id)).toEqual(["beta", "alpha"]);
    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it.each([
    ["asc", "descending", "ascending", "desc", "▲"],
    ["desc", "ascending", "descending", "asc", "▼"],
  ] as const)(
    "reflects supplied %s order and requests %s order",
    (direction, nextLabel, ariaSort, nextDirection, glyph) => {
      const onSortChange = vi.fn();
      const { container } = renderTable({
        sorting: { value: { columnId: "label", direction }, onSortChange },
      });
      const button = screen.getByRole("button", {
        name: new RegExp(`^Label.*Sort ${nextLabel}$`),
      });

      expect(button.closest("th")).toHaveAttribute("aria-sort", ariaSort);
      expect(button.closest("th")).toHaveAttribute("scope", "col");
      expect(button.closest("th")).toHaveClass("text-foreground");
      expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(1);
      expect(within(button).getByText(glyph)).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(
        screen.getByRole("columnheader", { name: "Notes" }),
      ).not.toContainElement(button);
      fireEvent.click(button);
      expect(onSortChange).toHaveBeenCalledExactlyOnceWith({
        columnId: "label",
        direction: nextDirection,
      });
      expect(labelOrder(container)).toEqual(["Beta", "Alpha"]);
    },
  );

  it("moves the annotation only when the consumer accepts a new column", () => {
    const onSortChange = vi.fn();
    const { container, rerender } = renderTable({
      sorting: {
        value: { columnId: "label", direction: "desc" },
        onSortChange,
      },
    });
    const stateButton = screen.getByRole("button", {
      name: /^State.*Sort ascending$/,
    });
    fireEvent.click(stateButton);

    expect(onSortChange).toHaveBeenCalledExactlyOnceWith({
      columnId: "state",
      direction: "asc",
    });
    expect(stateButton.closest("th")).not.toHaveAttribute("aria-sort");

    rerender(
      <DataTable
        {...baseProps}
        sorting={{
          value: { columnId: "state", direction: "asc" },
          onSortChange,
        }}
      />,
    );
    expect(stateButton.closest("th")).toHaveAttribute("aria-sort", "ascending");
    expect(
      container.querySelector('th[data-column-id="label"]'),
    ).not.toHaveAttribute("aria-sort");
    expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(1);

    rerender(
      <DataTable {...baseProps} sorting={{ value: null, onSortChange }} />,
    );
    expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(0);
    expect(stateButton).toHaveAccessibleName(/Sort ascending$/);
  });

  it.each(["missing", "notes"])(
    "ignores a supplied sort for the unavailable column %s",
    (columnId) => {
      const onSortChange = vi.fn();
      const { container } = renderTable({
        sorting: { value: { columnId, direction: "desc" }, onSortChange },
      });

      expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(0);
      expect(screen.getAllByRole("button")).toHaveLength(2);
      expect(
        within(screen.getByRole("columnheader", { name: "Notes" })).queryByRole(
          "button",
        ),
      ).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: /^Label/ }));
      expect(onSortChange).toHaveBeenCalledExactlyOnceWith({
        columnId: "label",
        direction: "asc",
      });
    },
  );

  it.each([
    { status: "loading", label: "Loading records" },
    { status: "error", title: "Records unavailable" },
  ] satisfies readonly DataTableState[])(
    "disables header requests in the $status state",
    (state) => {
      const onSortChange = vi.fn();
      renderTable({ state, sorting: { value: null, onSortChange } });

      for (const button of screen.getAllByRole("button")) {
        expect(button).toBeDisabled();
        fireEvent.click(button);
      }
      expect(onSortChange).not.toHaveBeenCalled();
      expect(
        screen.queryByRole("cell", { name: "Beta" }),
      ).not.toBeInTheDocument();
    },
  );

  it("allows sorting requests for a ready empty result", () => {
    const onSortChange = vi.fn();
    const { container } = renderTable({
      rows: [],
      sorting: { value: null, onSortChange },
    });
    const button = screen.getByRole("button", { name: /^Label/ });

    expect(button).not.toBeDisabled();
    expect(screen.getByText("No records").closest("td")).toHaveAttribute(
      "colspan",
      "3",
    );
    fireEvent.click(button);
    expect(onSortChange).toHaveBeenCalledExactlyOnceWith({
      columnId: "label",
      direction: "asc",
    });
    expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(0);
  });

  it("preserves native form safety, identity and focus", () => {
    const onSortChange = vi.fn();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const { container, rerender } = render(
      <form onSubmit={onSubmit}>
        <DataTable {...baseProps} sorting={{ value: null, onSortChange }} />
      </form>,
    );
    const button = screen.getByRole("button", { name: /^Label/ });
    const betaRow = container.querySelector('[data-row-id="beta"]');

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("focus-visible:ring-2");
    expect(button).toHaveClass("focus-visible:ring-ring");
    expect(button).not.toHaveAttribute("tabindex", "-1");
    button.focus();
    fireEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(button).toHaveFocus();

    rerender(
      <form onSubmit={onSubmit}>
        <DataTable
          {...baseProps}
          columns={[...columns].reverse()}
          rows={[...rows].reverse()}
          sorting={{
            value: { columnId: "label", direction: "asc" },
            onSortChange,
          }}
        />
      </form>,
    );
    expect(screen.getByRole("button", { name: /^Label/ })).toBe(button);
    expect(button).toHaveFocus();
    expect(container.querySelector('[data-row-id="beta"]')).toBe(betaRow);
    expect(labelOrder(container)).toEqual(["Alpha", "Beta"]);
  });

  it("localizes next-action labels and retains the header", () => {
    const onSortChange = vi.fn();
    const sorting = {
      value: null,
      onSortChange,
      ascendingLabel: "Trier par ordre croissant",
      descendingLabel: "Trier par ordre décroissant",
    };
    const { rerender } = renderTable({ sorting });

    expect(
      screen.getByRole("button", {
        name: /^Label.*Trier par ordre croissant$/,
      }),
    ).toHaveTextContent("Label");
    rerender(
      <DataTable
        {...baseProps}
        sorting={{
          ...sorting,
          value: { columnId: "label", direction: "asc" },
        }}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: /^Label.*Trier par ordre décroissant$/,
      }),
    ).toHaveTextContent("Label");
  });

  it.each([null, { columnId: "label", direction: "asc" }] as const)(
    "has no detected structural accessibility violations with sort %j",
    async (value) => {
      const { container } = renderTable({
        sorting: { value, onSortChange: vi.fn() },
      });
      const result = await axe(container, {
        rules: { "color-contrast": { enabled: false } },
      });
      expect(result).toHaveNoViolations();
    },
  );

  it("isolates sorting controllers across repeated tables", () => {
    const firstChange = vi.fn();
    const secondChange = vi.fn();
    render(
      <>
        <DataTable
          {...baseProps}
          sorting={{ value: null, onSortChange: firstChange }}
        />
        <DataTable
          {...baseProps}
          caption="Other records"
          sorting={{ value: null, onSortChange: secondChange }}
        />
      </>,
    );
    const table = screen.getByRole("table", { name: "Other records" });
    fireEvent.click(within(table).getByRole("button", { name: /^Label/ }));
    expect(firstChange).not.toHaveBeenCalled();
    expect(secondChange).toHaveBeenCalledExactlyOnceWith({
      columnId: "label",
      direction: "asc",
    });
  });
});

describe("DataTableSortingExample", () => {
  it("sorts before paging and explicitly resets the page", () => {
    const { container } = render(<DataTableSortingExample />);
    expect(labelOrder(container)).toEqual(["Northwind", "Contoso"]);
    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(labelOrder(container)).toEqual(["Fabrikam", "Adventure Works"]);

    const sortButton = screen.getByRole("button", { name: /^Record/ });
    sortButton.focus();
    fireEvent.click(sortButton);
    expect(sortButton).toHaveFocus();
    expect(labelOrder(container)).toEqual(["Adventure Works", "Contoso"]);
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(labelOrder(container)).toEqual(["Fabrikam", "Northwind"]);
    fireEvent.click(sortButton);
    expect(labelOrder(container)).toEqual(["Wide World Importers", "Tailspin"]);
    expect(sortButton.closest("th")).toHaveAttribute("aria-sort", "descending");

    const reset = screen.getByRole("button", { name: "Reset sort" });
    reset.focus();
    fireEvent.click(reset);
    expect(reset).toHaveFocus();
    expect(labelOrder(container)).toEqual(["Northwind", "Contoso"]);
    expect(container.querySelectorAll("th[aria-sort]")).toHaveLength(0);
    expect(screen.getByText(/Local example only/)).toBeInTheDocument();
  });

  it("supports a second column without mutating sample data", () => {
    const { container, unmount } = render(<DataTableSortingExample />);
    fireEvent.click(screen.getByRole("button", { name: /^State/ }));
    expect(labelOrder(container)).toEqual(["Northwind", "Fabrikam"]);
    fireEvent.click(screen.getByRole("button", { name: /^State/ }));
    expect(labelOrder(container)).toEqual(["Contoso", "Tailspin"]);
    unmount();

    const fresh = render(<DataTableSortingExample />);
    expect(labelOrder(fresh.container)).toEqual(["Northwind", "Contoso"]);
  });
});

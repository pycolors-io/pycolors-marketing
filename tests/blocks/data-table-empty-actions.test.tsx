import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  DataTable,
  type DataTableProps,
} from "../../content/blocks/data/data-table/index";

type RecordRow = Readonly<{ id: string; label: string }>;

const rows = [{ id: "sample-1", label: "Sample record" }] as const;
const baseProps = {
  caption: "Records",
  columns: [{ id: "label", header: "Record", cell: (row) => row.label }],
  emptyDescription: "Create a record or change your filters.",
  emptyTitle: "No records",
  getRowId: (row) => row.id,
  rows: [],
} satisfies DataTableProps<RecordRow>;

const actionSelector = '[data-slot="data-table-empty-action"]';

describe("DataTable empty actions", () => {
  it("preserves the existing empty table when no action is supplied", () => {
    const { container, rerender } = render(<DataTable {...baseProps} />);

    expect(screen.getByRole("table", { name: "Records" })).toBeInTheDocument();
    expect(screen.getByText("No records")).toBeInTheDocument();
    expect(container.querySelector(actionSelector)).toBeNull();

    rerender(<DataTable {...baseProps} emptyAction={null} />);
    expect(container.querySelector(actionSelector)).toBeNull();
    rerender(<DataTable {...baseProps} emptyAction={false} />);
    expect(container.querySelector(actionSelector)).toBeNull();
  });

  it("renders a focusable consumer action without invoking it on render", () => {
    const create = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();
    const { container } = render(
      <DataTable
        {...baseProps}
        emptyAction={
          <button onClick={create} ref={ref} type="button">
            Create first record
          </button>
        }
        pagination={{ page: 1, totalPages: 3, onPageChange: vi.fn() }}
        renderRowActions={() => <button type="button">Inspect</button>}
      />,
    );

    const action = screen.getByRole("button", { name: "Create first record" });
    expect(create).not.toHaveBeenCalled();
    expect(ref.current).toBe(action);
    expect(container.querySelector("tbody td")).toHaveAttribute("colspan", "2");
    expect(action.closest("table")).toBeNull();
    expect(container.querySelector(actionSelector)).toHaveClass(
      "min-w-0",
      "flex-wrap",
      "justify-center",
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    action.focus();
    expect(action).toHaveFocus();
    fireEvent.click(action);
    expect(create).toHaveBeenCalledOnce();
    expect(action).toHaveFocus();
    expect(screen.queryByText("Sample record")).not.toBeInTheDocument();
  });

  it("hides empty actions for populated, loading and error states", () => {
    const emptyAction = <button type="button">Clear filters</button>;
    const { container, rerender } = render(
      <DataTable {...baseProps} emptyAction={emptyAction} rows={rows} />,
    );
    expect(container.querySelector(actionSelector)).toBeNull();

    rerender(
      <DataTable
        {...baseProps}
        emptyAction={emptyAction}
        state={{ status: "loading" }}
      />,
    );
    expect(container.querySelector(actionSelector)).toBeNull();
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(
      <DataTable
        {...baseProps}
        emptyAction={emptyAction}
        state={{
          status: "error",
          title: "Could not load records",
          action: <button type="button">Retry request</button>,
        }}
      />,
    );
    expect(container.querySelector(actionSelector)).toBeNull();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry request" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Clear filters" })).toBeNull();

    rerender(
      <DataTable
        {...baseProps}
        emptyAction={emptyAction}
        state={{ status: "ready" }}
      />,
    );
    expect(screen.getByRole("button", { name: "Clear filters" })).toBeVisible();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("lets the consumer recover filtered results without owning filters", () => {
    function FilteredRecords() {
      const [filtered, setFiltered] = React.useState(true);
      return (
        <DataTable
          {...baseProps}
          emptyAction={
            <button onClick={() => setFiltered(false)} type="button">
              Clear filters
            </button>
          }
          emptyTitle="No matching records"
          rows={filtered ? [] : rows}
        />
      );
    }

    const { container } = render(<FilteredRecords />);
    expect(screen.getByText("No matching records")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByRole("cell", { name: "Sample record" })).toBeVisible();
    expect(container.querySelector(actionSelector)).toBeNull();
    expect(screen.queryByText("No matching records")).toBeNull();
  });

  it("preserves consumer link semantics and accessible names", () => {
    render(
      <DataTable
        {...baseProps}
        emptyAction={<a href="/records/new">Create a record</a>}
      />,
    );
    const link = screen.getByRole("link", { name: "Create a record" });
    expect(link).toHaveAttribute("href", "/records/new");
    link.focus();
    expect(link).toHaveFocus();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("preserves a disabled action and does not submit a surrounding form", () => {
    const create = vi.fn();
    const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <DataTable
          {...baseProps}
          emptyAction={
            <>
              <button disabled onClick={create} type="button">
                Create record
              </button>
              <button type="button">Secondary action</button>
            </>
          }
        />
      </form>,
    );
    const disabled = screen.getByRole("button", { name: "Create record" });
    expect(disabled).toBeDisabled();
    fireEvent.click(disabled);
    fireEvent.click(screen.getByRole("button", { name: "Secondary action" }));
    expect(create).not.toHaveBeenCalled();
    expect(submit).not.toHaveBeenCalled();
  });

  it("has no detectable accessibility violations with an empty action", async () => {
    const { container } = render(
      <DataTable
        {...baseProps}
        emptyAction={<button type="button">Create first record</button>}
      />,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});

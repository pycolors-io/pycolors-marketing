import type { ComponentProps, ComponentType } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getMDXComponents } from "@/mdx-components";

const Table = getMDXComponents().table as ComponentType<
  ComponentProps<"table">
>;

describe("documentation table keyboard access", () => {
  it("allows the scroll region to receive focus without changing the table semantics", () => {
    render(
      <Table>
        <thead>
          <tr>
            <th>Foundation</th>
            <th>Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tasks</td>
            <td>Assigned work</td>
          </tr>
        </tbody>
      </Table>,
    );
    const region = screen.getByRole("region", { name: "Scrollable table" });
    region.focus();
    expect(region).toHaveFocus();
    expect(region).toContainElement(screen.getByRole("table"));
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });

  it("retains a supplied accessible table name and native properties", () => {
    render(
      <Table aria-label="Workflow model mapping" data-testid="mapping">
        <tbody>
          <tr>
            <td>Project</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(
      screen.getByRole("region", { name: "Workflow model mapping" }),
    ).toContainElement(
      screen.getByRole("table", { name: "Workflow model mapping" }),
    );
    expect(screen.getByTestId("mapping")).toHaveAttribute(
      "aria-label",
      "Workflow model mapping",
    );
  });
});

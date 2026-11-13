import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { DocsFeedback } from "../../components/docs/docs-feedback";
function Feedback() {
  return (
    <main>
      <h1>Button documentation</h1>
      <DocsFeedback pageTitle="Button" pageUrl="/docs/ui/button" />
    </main>
  );
}
describe("documentation feedback", () => {
  it("offers a clear rating and prepares feedback for the existing contact channel", () => {
    render(<Feedback />);
    expect(
      screen.queryByRole("link", { name: "Share feedback by email" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Partly" }));
    expect(screen.getByRole("button", { name: "Partly" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const comment = "Explain loading & focus?\nThe example needs a label.";
    fireEvent.change(
      screen.getByLabelText("What could we clarify? (optional)"),
      { target: { value: comment } },
    );
    const href = screen
      .getByRole("link", { name: "Share feedback by email" })
      .getAttribute("href")!;
    expect(href).toMatch(/^mailto:contact@pycolors\.com\?/);
    const query = new URLSearchParams(href.split("?")[1]);
    expect(query.get("subject")).toBe("Documentation feedback: Button");
    expect(query.get("body")).toContain("https://pycolors.io/docs/ui/button");
    expect(query.get("body")).toContain("Helpful: Partly");
    expect(query.get("body")).toContain(comment);
    expect(
      screen.getByText(/Review the message before sending/),
    ).toBeInTheDocument();
  });
  it("updates a rating without claiming a message was sent", () => {
    render(<Feedback />);
    fireEvent.click(screen.getByRole("button", { name: "No" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes" }));
    expect(screen.getByRole("button", { name: "No" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "Yes" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const href = screen
      .getByRole("link", { name: "Share feedback by email" })
      .getAttribute("href")!;
    expect(new URLSearchParams(href.split("?")[1]).get("body")).toContain(
      "Helpful: Yes",
    );
    expect(
      screen.queryByText(/feedback sent|feedback saved/i),
    ).not.toBeInTheDocument();
  });
  it("keeps its form and choices accessible", async () => {
    const { container } = render(<Feedback />);
    fireEvent.click(screen.getByRole("button", { name: "No" }));
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { OnboardingChecklist } from "../../content/blocks/account/onboarding-checklist";
import { OnboardingChecklistExample } from "../../components/docs/blocks/onboarding-checklist-example";

describe("OnboardingChecklist", () => {
  it("derives progress from consumer state and preserves action semantics", () => {
    const action = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const steps = [
      { id: "workspace", title: "Workspace", complete: true },
      {
        id: "project",
        title: "Project",
        complete: false,
        action: (
          <button type="button" ref={ref} onClick={action}>
            Create project
          </button>
        ),
      },
      {
        id: "team",
        title: "Team",
        complete: false,
        action: <a href="/team">Open team</a>,
      },
    ];
    const { rerender } = render(
      <OnboardingChecklist id="setup" heading="Setup" steps={steps} />,
    );
    expect(screen.getByRole("progressbar", { name: "Setup" })).toHaveAttribute(
      "value",
      "1",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute("max", "3");
    fireEvent.click(screen.getByRole("button", { name: "Create project" }));
    expect(action).toHaveBeenCalledOnce();
    expect(ref.current).toBe(screen.getByRole("button"));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/team");
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "1");
    rerender(
      <OnboardingChecklist
        id="setup"
        heading="Setup"
        steps={[...steps]
          .reverse()
          .map((step) => ({ ...step, complete: true }))}
      />,
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "3");
    expect(screen.getAllByText("Completed")).toHaveLength(3);
    expect(ref.current).toBe(screen.getByRole("button"));
  });

  it("preserves disabled actions and supports an empty localized checklist", () => {
    const action = vi.fn();
    const { rerender } = render(
      <OnboardingChecklist
        id="setup"
        heading="Setup"
        steps={[
          {
            id: "one",
            title: "First step",
            complete: false,
            action: (
              <button type="button" disabled onClick={action}>
                Continue
              </button>
            ),
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(action).not.toHaveBeenCalled();
    rerender(
      <OnboardingChecklist
        id="setup"
        heading="Configuration"
        headingLevel={3}
        steps={[]}
        emptyMessage="Aucune étape."
      />,
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Configuration",
    );
    expect(screen.getByText("Aucune étape.")).toBeVisible();
  });

  it("keeps demo focus while completing, undoing and resetting local steps", async () => {
    const { container } = render(<OnboardingChecklistExample />);
    const action = screen.getByRole("button", {
      name: "Complete set up your first project",
    });
    action.focus();
    fireEvent.click(action);
    expect(action).toHaveFocus();
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "2");
    expect(screen.getByRole("status")).toHaveTextContent(
      "2 of 3 steps completed locally",
    );
    fireEvent.click(action);
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "1");
    fireEvent.click(screen.getByRole("button", { name: "Reset checklist" }));
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "1");
    expect(
      await axe(container, { rules: { "color-contrast": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});

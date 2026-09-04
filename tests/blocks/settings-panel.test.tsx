import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  SettingsPanel,
  type SettingsPanelProps,
  type SettingsPanelSection,
} from "../../content/blocks/account/settings-panel/index";
import settingsPanelSource from "../../content/blocks/account/settings-panel/index.tsx?raw";

const profileChanged = vi.fn();
const workspaceChanged = vi.fn();

const sections = [
  {
    id: "profile",
    title: "Profile",
    description: "Choose how your name appears to collaborators.",
    fields: [
      {
        id: "display-name",
        name: "displayName",
        label: "Display name",
        value: "Alex Morgan",
        description: "Shown across shared workspaces.",
        autoComplete: "name",
        required: true,
        onValueChange: profileChanged,
      },
      {
        id: "bio",
        kind: "textarea",
        name: "bio",
        label: "Profile note",
        value: "Product designer",
        rows: 3,
        onValueChange: vi.fn(),
      },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Keep the shared workspace identity recognizable.",
    fields: [
      {
        id: "workspace-name",
        name: "workspaceName",
        label: "Workspace name",
        value: "Northstar",
        onValueChange: workspaceChanged,
      },
    ],
  },
] as const satisfies readonly SettingsPanelSection[];

const baseProps = {
  description:
    "Update the profile and workspace details your product displays.",
  onSubmit: vi.fn<React.FormEventHandler<HTMLFormElement>>((event) =>
    event.preventDefault(),
  ),
  sections,
  submitLabel: "Save settings",
  title: "Account settings",
} satisfies SettingsPanelProps;

describe("SettingsPanel", () => {
  it("renders generic consumer-owned sections, fields, and semantic structure", () => {
    const { container } = render(<SettingsPanel {...baseProps} />);

    expect(
      screen.getByRole("region", { name: "Account settings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("form", { name: "Account settings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Profile" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Workspace" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Display name/u)).toHaveValue("Alex Morgan");
    expect(screen.getByLabelText("Profile note")).toHaveValue(
      "Product designer",
    );
    expect(screen.getByLabelText("Workspace name")).toHaveValue("Northstar");
    expect(container).not.toHaveTextContent("PyColors");
  });

  it("keeps values controlled and delegates changes to the consumer", () => {
    render(<SettingsPanel {...baseProps} />);

    const displayName = screen.getByLabelText(/Display name/u);
    const workspaceName = screen.getByLabelText("Workspace name");

    fireEvent.change(displayName, { target: { value: "Jordan Lee" } });
    fireEvent.change(workspaceName, { target: { value: "Atlas" } });

    expect(profileChanged).toHaveBeenCalledWith("Jordan Lee");
    expect(workspaceChanged).toHaveBeenCalledWith("Atlas");
    expect(displayName).toHaveValue("Alex Morgan");
    expect(workspaceName).toHaveValue("Northstar");
  });

  it("preserves the native, keyboard-reachable submission boundary", () => {
    const onSubmit = vi.fn<React.FormEventHandler<HTMLFormElement>>((event) =>
      event.preventDefault(),
    );
    render(<SettingsPanel {...baseProps} onSubmit={onSubmit} />);

    const submit = screen.getByRole("button", { name: "Save settings" });
    const form = screen.getByRole("form", { name: "Account settings" });

    submit.focus();
    expect(submit).toHaveFocus();
    expect(submit).toHaveAttribute("type", "submit");
    fireEvent.keyDown(submit, { key: "Enter", code: "Enter" });
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("associates consumer-owned descriptions and validation errors", () => {
    render(
      <SettingsPanel
        {...baseProps}
        sections={[
          {
            id: "profile",
            title: "Profile",
            fields: [
              {
                id: "display-name",
                name: "displayName",
                label: "Display name",
                value: "",
                description: "Shown across shared workspaces.",
                error: "Enter a display name.",
                onValueChange: vi.fn(),
              },
            ],
          },
        ]}
      />,
    );

    const field = screen.getByLabelText(/Display name/u);
    const error = screen.getByText("Enter a display name.");

    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAttribute("aria-errormessage", error.id);
    expect(field).toHaveAttribute("aria-describedby", error.id);
    expect(error).toHaveAttribute("role", "alert");
    expect(error).toHaveTextContent("Enter a display name.");
    expect(screen.queryByText("Shown across shared workspaces.")).toBeNull();
  });

  it("renders consumer-owned success and error feedback with appropriate urgency", () => {
    const { rerender } = render(
      <SettingsPanel
        {...baseProps}
        feedback={{
          status: "success",
          title: "Settings saved",
          description: "Your visible details are up to date.",
        }}
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Settings saved");

    rerender(
      <SettingsPanel
        {...baseProps}
        feedback={{
          status: "error",
          title: "Settings were not saved",
          description: "Review the fields and try again.",
        }}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Settings were not saved",
    );
  });

  it("exposes submitting and disabled states without taking ownership of them", () => {
    const onSubmit = vi.fn<React.FormEventHandler<HTMLFormElement>>();
    render(
      <SettingsPanel
        {...baseProps}
        onSubmit={onSubmit}
        submitting
        submittingLabel="Saving account settings…"
      />,
    );

    expect(
      screen.getByRole("form", { name: "Account settings" }),
    ).toHaveAttribute("aria-busy", "true");
    expect(screen.getByLabelText(/Display name/u)).toBeDisabled();
    expect(screen.getByLabelText("Workspace name")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Saving account settings…" }),
    ).toBeDisabled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("keeps narrow layouts stackable and applies wider composition progressively", () => {
    const { container } = render(<SettingsPanel {...baseProps} />);
    const root = container.querySelector('[data-slot="settings-panel"]');
    const section = container.querySelector(
      '[data-slot="settings-panel-section"]',
    );
    const fields = section?.querySelector(".sm\\:grid-cols-2");
    const textareaField = container.querySelector('[data-field-id="bio"]');
    const actions = container.querySelector(
      '[data-slot="settings-panel-actions"]',
    );

    expect(root).toHaveClass("min-w-0");
    expect(section).toHaveClass(
      "grid",
      "min-w-0",
      "md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)]",
    );
    expect(fields).toHaveClass("min-w-0", "sm:grid-cols-2");
    expect(textareaField).toHaveClass("min-w-0", "sm:col-span-2");
    expect(actions).toHaveClass("flex-col", "sm:flex-row");
    expect(
      within(actions as HTMLElement).getByRole("button", {
        name: "Save settings",
      }),
    ).toHaveClass("w-full", "sm:w-auto");
  });

  it("has no detectable accessibility violations in a representative state", async () => {
    const { container } = render(
      <SettingsPanel
        {...baseProps}
        feedback={{ status: "success", title: "Settings saved" }}
      />,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });

  it("keeps canonical source on approved public imports and UI-only behavior", () => {
    const source = settingsPanelSource;

    expect(source).toContain('from "react"');
    expect(source).toContain('from "@pycolors/ui"');
    expect(source).not.toMatch(/@pycolors\/ui\//u);
    expect(source).not.toMatch(/@pycolors\/(?!ui["'])/u);
    expect(source).not.toMatch(
      /from ["'](?:next|lucide-react|react-hook-form)/u,
    );
    expect(source).not.toMatch(/starter-free|starter-pro/iu);
    expect(source).not.toMatch(/registry\.json|registry\/|\bcli\b/iu);
    expect(source).not.toMatch(
      /\b(?:backend|billing|password|session|authentication|authorization|stripe|database|fetch)\b/iu,
    );
    expect(source).not.toMatch(/\bany\b/u);
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { TemplateColorPreview } from "@/components/templates/template-color-preview";

const appearance = vi.hoisted(() => ({ resolvedTheme: "light" }));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => appearance }));
const previews = [
  { mode: "dark", label: "Dark", content: <p>Dark screenshot</p> },
  { mode: "light", label: "Light", content: <p>Light screenshot</p> },
] as const;

beforeEach(() => {
  appearance.resolvedTheme = "light";
});

describe("Template appearance preview", () => {
  it("follows the site theme and permits manual comparison until the theme changes", () => {
    const { rerender } = render(<TemplateColorPreview previews={previews} />);
    expect(screen.getByRole("tab", { name: "Light" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Dark" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Dark screenshot");
    rerender(<TemplateColorPreview previews={previews} />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Dark screenshot");
    appearance.resolvedTheme = "dark";
    rerender(<TemplateColorPreview previews={previews} />);
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Light" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Light screenshot");
    appearance.resolvedTheme = "light";
    rerender(<TemplateColorPreview previews={previews} />);
    appearance.resolvedTheme = "dark";
    rerender(<TemplateColorPreview previews={previews} />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Dark screenshot");
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });
  it("keeps the active tab and panel accessible", async () => {
    const { container } = render(<TemplateColorPreview previews={previews} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

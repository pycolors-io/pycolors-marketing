import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeQuality } from "@/components/theme-builder/theme-quality";
import { createThemeBuilderState } from "@/components/theme-builder/theme-builder-state";

describe("Color readability", () => {
  it("explains every failed check in the correct mode and retains its technical evidence", () => {
    const theme = createThemeBuilderState().generatedTheme;
    render(<ThemeQuality theme={theme} />);
    expect(screen.getByText("6 checks need review")).toBeVisible();
    fireEvent.click(screen.getByText("Color readability"));
    expect(
      screen.getByText("28 of 34 checks meet their contrast target."),
    ).toBeVisible();
    const light = within(
      screen.getByRole("region", { name: "Light mode readability" }),
    );
    const dark = within(
      screen.getByRole("region", { name: "Dark mode readability" }),
    );
    expect(light.getByText("15 passed · 2 to review")).toBeVisible();
    expect(dark.getByText("13 passed · 4 to review")).toBeVisible();
    expect(light.getAllByRole("listitem")).toHaveLength(2);
    expect(dark.getAllByRole("listitem")).toHaveLength(4);
    expect(dark.getByText("Text on destructive buttons")).toBeVisible();
    expect(dark.getByText("Keyboard focus outline")).toBeVisible();
    expect(
      light.getByText(/Decorative dividers can stay subtle/),
    ).toBeVisible();
    expect(screen.getByText(/--destructive-foreground/)).not.toBeVisible();
    fireEvent.click(screen.getByText("Technical details"));
    for (const check of theme.contrasts.filter(
      (item) => item.status === "fail",
    )) {
      const tokens = screen.getAllByText(
        `--${check.foregroundRole} / --${check.backgroundRole}`,
      );
      tokens.forEach((element) => expect(element).toBeVisible());
      screen
        .getAllByText(
          `Measured ${check.ratio.toFixed(2)}:1 · Target ${check.target.minimumRatio}:1`,
        )
        .forEach((element) => expect(element).toBeVisible());
    }
  });

  it("keeps the scope of a passing result clear without suggesting whole-app certification", () => {
    const generated = createThemeBuilderState().generatedTheme;
    const theme = {
      ...generated,
      contrasts: generated.contrasts.filter((check) => check.status === "pass"),
      warnings: [],
    };
    render(<ThemeQuality theme={theme} />);
    expect(
      screen.getByText("All checked colors meet their targets"),
    ).toBeVisible();
    fireEvent.click(screen.getByText("Color readability"));
    expect(
      screen.getAllByText("No contrast issues in the checked colors."),
    ).toHaveLength(2);
    expect(screen.queryByText(/checks need review/)).not.toBeInTheDocument();
    expect(screen.getByText(/not every state of your interface/)).toBeVisible();
    expect(
      screen.queryByText(/For precise adjustments/),
    ).not.toBeInTheDocument();
  });
});

import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BlockShowcaseTabs } from "../../components/marketing/blocks/block-showcase-tabs";

vi.mock("fumadocs-ui/components/dynamic-codeblock", () => ({
  DynamicCodeBlock: ({ code }: { code: string }) => (
    <pre data-testid="highlighted-source">{code}</pre>
  ),
}));

const source =
  'import { Button } from "@pycolors/ui";\nexport const Action = () => <Button>Save</Button>;';
function Demo() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count {count}</button>;
}
function showcase() {
  return render(
    <BlockShowcaseTabs
      preview={<Demo />}
      previewHref="/blocks/data/stats-overview/preview"
      source={source}
    />,
  );
}
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Block showcase", () => {
  it("defers highlighting, preserves demo state across tabs and resets explicitly", () => {
    showcase();
    expect(screen.queryByTestId("highlighted-source")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Count 0" }));
    const preview = screen.getByRole("tab", { name: "Preview" });
    preview.focus();
    fireEvent.keyDown(preview, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Code" })).toHaveFocus();
    expect(screen.getByTestId("highlighted-source")).toHaveTextContent("Save");
    fireEvent.keyDown(screen.getByRole("tab", { name: "Code" }), {
      key: "Home",
    });
    expect(screen.getByRole("button", { name: "Count 1" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Reset preview" }));
    expect(screen.getByRole("button", { name: "Count 0" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Mobile preview" }));
    expect(
      screen.getByRole("button", { name: "Mobile preview" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("copies the complete source and offers manual selection on clipboard failure", async () => {
    const writeText = vi
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("Denied"));
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    showcase();
    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Complete source copied.",
      ),
    );
    expect(writeText).toHaveBeenCalledWith(source);
    fireEvent.click(screen.getByRole("button", { name: "Copied" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Select the code below and copy it manually.",
      ),
    );
    expect(screen.getByTestId("highlighted-source").textContent).toBe(source);
  });
});

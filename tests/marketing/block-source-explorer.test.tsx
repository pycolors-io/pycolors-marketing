import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { BlockSourceExplorer } from "../../components/marketing/blocks/block-source-explorer";
import type { BlockSource } from "../../lib/blocks/source";

const { downloadBlockSource } = vi.hoisted(() => ({
  downloadBlockSource: vi.fn(),
}));

vi.mock("../../lib/blocks/download", () => ({ downloadBlockSource }));

vi.mock("fumadocs-ui/components/dynamic-codeblock", () => ({
  DynamicCodeBlock: ({ code, lang }: { code: string; lang: string }) => (
    <pre data-testid="source" data-language={lang}>
      {code}
    </pre>
  ),
}));

const source: BlockSource = {
  directory: "src/components/blocks/example",
  files: [
    {
      path: "index.tsx",
      language: "tsx",
      content: 'export { Item } from "./parts/item";\n',
    },
    {
      path: "parts/item.tsx",
      language: "tsx",
      content: "export const Item = () => <span>Item</span>;\n",
    },
    {
      path: "styles.css",
      language: "css",
      content: ".item { color: var(--foreground); }\n",
    },
  ],
};

afterEach(() => {
  vi.unstubAllGlobals();
  downloadBlockSource.mockReset();
});

describe("Block source explorer", () => {
  it("shows the full folder structure by default even for a single file", () => {
    render(
      <BlockSourceExplorer
        source={{ ...source, files: [source.files[0]] }}
        active
      />,
    );
    expect(
      screen.getByRole("navigation", { name: "Block source files" }),
    ).toBeInTheDocument();
    for (const folder of ["src", "components", "blocks", "example"]) {
      expect(
        screen.getByRole("button", { name: folder, exact: true }),
      ).toHaveAttribute("aria-expanded", "true");
    }
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByTestId("source").textContent).toBe(
      source.files[0].content,
    );
    const toggle = screen.getByRole("button", { name: "Files" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Block source files" }),
    ).toHaveAttribute("id", toggle.getAttribute("aria-controls"));
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Block source files" }),
    ).not.toBeInTheDocument();
    fireEvent.click(toggle);
    expect(
      screen.getByRole("navigation", { name: "Block source files" }),
    ).toBeInTheDocument();
  });

  it("selects nested files and copies only the selected contents", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<BlockSourceExplorer source={source} active />);
    const navigation = screen.getByRole("navigation", {
      name: "Block source files",
    });
    const nestedFile = within(navigation).getByRole("button", {
      name: "parts/item.tsx",
    });
    nestedFile.focus();
    expect(nestedFile).toHaveFocus();
    fireEvent.click(nestedFile);
    expect(nestedFile).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("source").textContent).toBe(
      source.files[1].content,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy file" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "parts/item.tsx copied.",
      ),
    );
    expect(writeText).toHaveBeenCalledExactlyOnceWith(source.files[1].content);

    fireEvent.change(screen.getByRole("combobox", { name: "Source file" }), {
      target: { value: "styles.css" },
    });
    expect(
      within(navigation).getByRole("button", { name: "styles.css" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("source")).toHaveAttribute(
      "data-language",
      "css",
    );
    expect(screen.getByRole("status")).not.toHaveTextContent("copied.");
    expect(screen.getByTestId("source").textContent).toBe(
      source.files[2].content,
    );
  });

  it("ignores a pending copy result after switching files", async () => {
    let resolveCopy: (() => void) | undefined;
    const writeText = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveCopy = resolve;
        }),
    );
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<BlockSourceExplorer source={source} active />);
    fireEvent.click(screen.getByRole("button", { name: "Copy file" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Source file" }), {
      target: { value: "styles.css" },
    });
    resolveCopy?.();
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "keeping this folder structure",
      ),
    );
    expect(
      screen.queryByRole("button", { name: "File copied" }),
    ).not.toBeInTheDocument();
  });

  it("preserves file selection when code is hidden and highlighted again", () => {
    const { rerender } = render(<BlockSourceExplorer source={source} active />);
    fireEvent.change(screen.getByRole("combobox", { name: "Source file" }), {
      target: { value: "styles.css" },
    });
    rerender(<BlockSourceExplorer source={source} active={false} />);
    expect(screen.queryByTestId("source")).not.toBeInTheDocument();
    rerender(<BlockSourceExplorer source={source} active />);
    expect(screen.getByTestId("source").textContent).toBe(
      source.files[2].content,
    );
  });

  it("downloads the whole block once while preserving the selected file", async () => {
    render(<BlockSourceExplorer source={source} active />);
    fireEvent.change(screen.getByRole("combobox", { name: "Source file" }), {
      target: { value: "parts/item.tsx" },
    });
    const download = screen.getByRole("button", {
      name: "Download complete block as ZIP",
    });
    fireEvent.click(download);
    expect(download).toBeDisabled();
    expect(download).toHaveAttribute("aria-busy", "true");
    fireEvent.click(download);
    await waitFor(() => expect(download).toBeEnabled());
    expect(downloadBlockSource).toHaveBeenCalledExactlyOnceWith(source);
    expect(screen.getByRole("status")).toHaveTextContent(
      "ZIP download requested.",
    );
    expect(screen.getByTestId("source").textContent).toBe(
      source.files[1].content,
    );
    expect(download).toHaveTextContent("Download ZIP");
  });

  it("offers a retry and file copying when a download fails", async () => {
    downloadBlockSource.mockImplementationOnce(() => {
      throw new Error("Download unavailable");
    });
    render(<BlockSourceExplorer source={source} active />);
    const download = screen.getByRole("button", {
      name: "Download complete block as ZIP",
    });
    fireEvent.click(download);
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Download could not start. Try again or copy each file.",
      ),
    );
    expect(download).toBeEnabled();
    expect(screen.getByRole("button", { name: "Copy file" })).toBeEnabled();
    fireEvent.click(download);
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "ZIP download requested.",
      ),
    );
  });

  it("has no detectable structural accessibility violations", async () => {
    const { container } = render(
      <BlockSourceExplorer source={source} active />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

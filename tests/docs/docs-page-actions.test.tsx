import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { DocsPageActions } from "../../components/docs/docs-page-actions";
const clipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
afterEach(() => {
  vi.unstubAllGlobals();
  if (clipboard) Object.defineProperty(navigator, "clipboard", clipboard);
  else Reflect.deleteProperty(navigator, "clipboard");
});
function mockClipboard(writeText = vi.fn().mockResolvedValue(undefined)) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  return writeText;
}
const markdownUrl = "/api/docs/markdown?slug=ui/button&locale=en";
describe("documentation page actions", () => {
  it("copies the actual Markdown, with an accessible success message", async () => {
    const write = mockClipboard();
    const fetchPage = vi
      .fn()
      .mockResolvedValue(new Response("# Button\nPublic API."));
    vi.stubGlobal("fetch", fetchPage);
    render(<DocsPageActions markdownUrl={markdownUrl} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy page" }));
    await waitFor(() =>
      expect(write).toHaveBeenCalledWith("# Button\nPublic API."),
    );
    expect(fetchPage).toHaveBeenCalledWith(
      markdownUrl,
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Page copied as Markdown.",
    );
  });
  it("keeps a native Markdown link and an actionable fallback when a request fails", async () => {
    const write = mockClipboard();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Not found", { status: 404 })),
    );
    render(<DocsPageActions markdownUrl={markdownUrl} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy page" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Open the Markdown view",
      ),
    );
    expect(write).not.toHaveBeenCalled();
    const link = screen.getByRole("link", { name: /View as Markdown/ });
    expect(link).toHaveAttribute("href", markdownUrl);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("handles blocked clipboard access without claiming a copy succeeded", async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error("blocked")));
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("# Button")));
    render(<DocsPageActions markdownUrl={markdownUrl} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy page" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copy unavailable."),
    );
    expect(
      screen.queryByRole("button", { name: "Copied" }),
    ).not.toBeInTheDocument();
  });
  it("has no detectable accessibility violations", async () => {
    const { container } = render(<DocsPageActions markdownUrl={markdownUrl} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

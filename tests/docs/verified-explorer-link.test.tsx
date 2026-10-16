import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VerifiedExplorerLink } from "../../components/docs/verified-explorer-link";

const storyId = "components-ai-message--default";
const href = `https://ui.pycolors.io/?path=/story/${storyId}`;
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe("Explorer publication boundary", () => {
  it.each([{}, { entries: {} }, { entries: { [storyId]: { type: "docs" } } }])(
    "keeps the working inline preview when the story is absent",
    async (catalog) => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({ ok: true, json: async () => catalog }),
      );
      render(<VerifiedExplorerLink href={href} storyId={storyId} />);
      await act(async () => {});
      expect(screen.getByRole("link")).toHaveAttribute("href", "#preview");
      expect(
        screen.queryByRole("link", { name: /Open interactive/ }),
      ).toBeNull();
    },
  );
  it("exposes the exact link only after the published catalog confirms a story", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ entries: { [storyId]: { type: "story" } } }),
      }),
    );
    render(<VerifiedExplorerLink href={href} storyId={storyId} />);
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /Open interactive/ }),
      ).toHaveAttribute("href", href),
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://ui.pycolors.io/index.json",
      expect.objectContaining({ credentials: "omit" }),
    );
  });
  it("keeps the preview usable when the catalog fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<VerifiedExplorerLink href={href} storyId={storyId} />);
    await act(async () => {});
    expect(screen.getByRole("link")).toHaveAttribute("href", "#preview");
  });
  it("aborts the request when the page unmounts", () => {
    const fetcher = vi.fn(() => new Promise(() => {}));
    vi.stubGlobal("fetch", fetcher);
    const { unmount } = render(
      <VerifiedExplorerLink href={href} storyId={storyId} />,
    );
    const signal = (
      fetcher.mock.calls[0] as unknown as [string, RequestInit]
    )[1].signal;
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});

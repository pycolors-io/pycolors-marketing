import { afterEach, describe, expect, it, vi } from "vitest";
import { downloadBlockSource } from "../../lib/blocks/download";
import type { BlockSource } from "../../lib/blocks/source";

const source: BlockSource = {
  directory: "src/components/blocks/example",
  files: [{ path: "index.tsx", language: "tsx", content: "export {};\n" }],
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Block browser download", () => {
  it.each([false, true])(
    "cleans up the link and URL when click throws: %s",
    (fails) => {
      vi.useFakeTimers();
      const createObjectURL = vi.fn().mockReturnValue("blob:block-source");
      const revokeObjectURL = vi.fn();
      vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
      const click = vi
        .spyOn(HTMLAnchorElement.prototype, "click")
        .mockImplementation(function (this: HTMLAnchorElement) {
          expect(this).toHaveAttribute("download", "pycolors-example.zip");
          expect(this).toHaveAttribute("href", "blob:block-source");
          expect(this).toBeInTheDocument();
          if (fails) throw new Error("Browser rejected download");
        });

      if (fails) {
        expect(() => downloadBlockSource(source)).toThrow(
          "Browser rejected download",
        );
      } else {
        downloadBlockSource(source);
      }
      expect(click).toHaveBeenCalledOnce();
      const blob = createObjectURL.mock.calls[0]?.[0] as Blob;
      expect(blob.type).toBe("application/zip");
      expect(blob.size).toBeGreaterThan(0);
      expect(document.querySelector("a[download]")).toBeNull();
      expect(revokeObjectURL).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1000);
      expect(revokeObjectURL).toHaveBeenCalledExactlyOnceWith(
        "blob:block-source",
      );
    },
  );
});

import { describe, expect, it } from "vitest";
import { docsPageContext } from "../../lib/docs/page-context";
describe("documentation page context", () => {
  it.each(["/docs/ui/button", "/fr/docs/ui/button"])(
    "uses a canonical localized URL for %s",
    (path) => {
      const page = docsPageContext(path, "fr");
      expect(page.url).toBe("https://pycolors.io/fr/docs/ui/button");
      expect(page.markdownUrl).toBe(
        "/api/docs/markdown?slug=ui%2Fbutton&locale=fr",
      );
    },
  );
  it.each([null, "/pricing"])(
    "defaults non-docs locations to the documentation home",
    (path) => {
      expect(docsPageContext(path, "en").url).toBe("https://pycolors.io/docs");
    },
  );
});

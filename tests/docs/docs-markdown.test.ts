// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "../../app/api/docs/markdown/route";
const docs = vi.hoisted(() => ({ getPage: vi.fn(), getLLMText: vi.fn() }));
vi.mock("@/lib/source", () => ({
  source: { getPage: docs.getPage },
  getLLMText: docs.getLLMText,
}));
beforeEach(() => {
  vi.resetAllMocks();
  docs.getLLMText.mockResolvedValue(
    "# Button\n\nPublic component documentation.",
  );
});
describe("public Markdown documentation", () => {
  it.each(["en", "fr"])(
    "serves the requested article in %s with a Markdown content type",
    async (locale) => {
      const page = { url: "/docs/ui/button" };
      docs.getPage.mockReturnValue(page);
      const response = await GET(
        new Request(
          "https://pycolors.io/api/docs/markdown?slug=ui/button&locale=" +
            locale,
        ),
      );
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
      expect(await response.text()).toBe(
        "# Button\n\nPublic component documentation.",
      );
      expect(docs.getPage).toHaveBeenCalledWith(["ui", "button"], locale);
      expect(docs.getLLMText).toHaveBeenCalledWith(page);
    },
  );
  it("supports the documentation home and returns 404 for missing articles", async () => {
    docs.getPage
      .mockReturnValueOnce({ url: "/docs" })
      .mockReturnValueOnce(undefined);
    expect(
      (await GET(new Request("https://pycolors.io/api/docs/markdown"))).status,
    ).toBe(200);
    expect(docs.getPage).toHaveBeenCalledWith([], "en");
    expect(
      (
        await GET(
          new Request("https://pycolors.io/api/docs/markdown?slug=missing"),
        )
      ).status,
    ).toBe(404);
  });
  it.each([
    "slug=../package.json",
    "slug=/ui/button",
    "slug=ui//button",
    "slug=ui%5Cbutton",
    "slug=ui/button&locale=de",
    "slug=" + "a".repeat(251),
  ])("rejects invalid documentation requests: %s", async (query) => {
    const response = await GET(
      new Request("https://pycolors.io/api/docs/markdown?" + query),
    );
    expect(response.status).toBe(404);
    expect(docs.getPage).not.toHaveBeenCalled();
    expect(docs.getLLMText).not.toHaveBeenCalled();
  });
});

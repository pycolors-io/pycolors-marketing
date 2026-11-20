import { getLLMText, source } from "@/lib/source";

/** Public documentation only, using the same source and locales as the Docs. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";
  const slug = searchParams.get("slug") ?? "";
  if (
    (locale !== "en" && locale !== "fr") ||
    slug.length > 250 ||
    (slug && !/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(slug))
  ) {
    return new Response("Documentation page not found", { status: 404 });
  }
  const page = source.getPage(slug ? slug.split("/") : [], locale);
  if (!page)
    return new Response("Documentation page not found", { status: 404 });
  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

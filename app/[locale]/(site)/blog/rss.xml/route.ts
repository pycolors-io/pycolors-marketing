import { isLocale, localizedHref } from "@/lib/i18n/routing";
import { getCopy } from "@/lib/i18n/server-copy";
import { getAllPosts } from "@/lib/blog/utils";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/seo/website";

export const revalidate = 3600;

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: candidate } = await params;
  const locale = isLocale(candidate) ? candidate : "en";
  const t = await getCopy(locale);
  const posts = getAllPosts(locale);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${post.url}`;

      return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <description>${escapeXml(post.description)}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <author>${escapeXml(post.author)}</author>
        ${post.tags
          .map((tag) => `<category>${escapeXml(tag)}</category>`)
          .join("\n")}
      </item>
      `;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>${SITE_NAME} Blog</title>
<link>${SITE_URL}${localizedHref("/blog", locale)}</link>
<description>${escapeXml(t(SITE_DESCRIPTION))}</description>
<language>${locale}</language>

${items}

</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

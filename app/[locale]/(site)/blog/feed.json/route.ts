import { isLocale, localizedHref } from "@/lib/i18n/routing";
import { getCopy } from "@/lib/i18n/server-copy";
import { getAllPosts } from "@/lib/blog/utils";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/seo/website";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: candidate } = await params;
  const locale = isLocale(candidate) ? candidate : "en";
  const t = await getCopy(locale);
  const posts = getAllPosts(locale);

  const items = posts.map((post) => ({
    id: `${SITE_URL}${post.url}`,
    url: `${SITE_URL}${post.url}`,
    title: post.title,
    content_text: post.description,
    date_published: new Date(post.date).toISOString(),
    tags: post.tags,
    authors: [
      {
        name: post.author,
      },
    ],
  }));

  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: `${SITE_NAME} Blog`,
    home_page_url: `${SITE_URL}${localizedHref("/blog", locale)}`,
    feed_url: `${SITE_URL}${localizedHref("/blog/feed.json", locale)}`,
    description: t(SITE_DESCRIPTION),
    items,
  };

  return Response.json(feed);
}

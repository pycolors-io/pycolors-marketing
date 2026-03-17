import { getAllPosts } from '@/lib/blog/utils';
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
} from '@/lib/seo/website';

export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();

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
    version: 'https://jsonfeed.org/version/1',
    title: `${SITE_NAME} Blog`,
    home_page_url: `${SITE_URL}/blog`,
    feed_url: `${SITE_URL}/blog/feed.json`,
    description: SITE_DESCRIPTION,
    items,
  };

  return Response.json(feed);
}

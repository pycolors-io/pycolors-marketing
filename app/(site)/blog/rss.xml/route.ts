import { getAllPosts } from '@/lib/blog/utils';
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
} from '@/lib/seo/website';

export const revalidate = 3600;

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  const posts = getAllPosts();

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
          .join('\n')}
      </item>
      `;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>${SITE_NAME} Blog</title>
<link>${SITE_URL}/blog</link>
<description>${SITE_DESCRIPTION}</description>
<language>en</language>

${items}

</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

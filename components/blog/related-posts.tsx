import { BlogList } from '@/components/blog/blog-list';
import { BlogPost } from '@/types/blog';

type RelatedPostsProps = {
  posts: BlogPost[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return <BlogList posts={posts} />;
}

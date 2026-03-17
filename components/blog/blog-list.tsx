import { ArticleCard } from '@/components/blog/article-card';
import { BlogPost } from '@/types/blog';

type BlogListProps = {
  posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <ArticleCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

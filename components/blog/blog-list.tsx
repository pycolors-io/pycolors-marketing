import { useCopy } from "@/lib/i18n/use-copy";
import { ArticleCard } from "@/components/blog/article-card";
import { BlogPost } from "@/types/blog";

type BlogListProps = {
  readonly posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  const tSite = useCopy();

  if (posts.length === 0) {
    return (
      <div className="rounded-[5px] border border-border-subtle bg-surface p-6 text-sm text-muted-foreground shadow-soft">
        {tSite("No articles found yet.")}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <ArticleCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

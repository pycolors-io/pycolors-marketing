import Link from 'next/link';
import { Badge } from '@pycolors/ui';
import { normalizeTaxonomy } from '@/lib/blog/utils';

type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link key={tag} href={`/blog/tags/${normalizeTaxonomy(tag)}`}>
          <Badge
            variant="secondary"
            className="transition-opacity hover:opacity-80"
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

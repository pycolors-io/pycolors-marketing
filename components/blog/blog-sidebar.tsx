import Link from 'next/link';
import { Layers3 } from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { normalizeTaxonomy } from '@/lib/blog/utils';

type BlogSidebarProps = {
  categories: string[];
  tags: string[];
};

export function BlogSidebar({ categories, tags }: BlogSidebarProps) {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Categories
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/categories/${normalizeTaxonomy(category)}`}
              >
                <Badge variant="outline">{category}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Popular tags</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 12).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${normalizeTaxonomy(tag)}`}
              >
                <Badge variant="secondary">{tag}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-brand text-sm font-semibold tracking-tight">
              Build with PyColors
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Move from technical insight to real implementation with
              the PyColors product ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href="/starters/free">Starter Free</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/upgrade">Explore PRO</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

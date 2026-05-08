import Link from 'next/link';
import { ArrowRight, Layers3, Sparkles, Tags } from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { normalizeTaxonomy } from '@/lib/blog/utils';

type BlogSidebarProps = {
  readonly categories: string[];
  readonly tags: string[];
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function SidebarSection({
  icon: Icon,
  title,
  children,
}: {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          </div>

          <p className="font-brand text-sm font-semibold tracking-tight">
            {title}
          </p>
        </div>

        {children}
      </div>
    </Card>
  );
}

export function BlogSidebar({ categories, tags }: BlogSidebarProps) {
  return (
    <aside className="space-y-4">
      <SidebarSection icon={Layers3} title="Categories">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              asChild
              variant="outline"
              className="rounded-[5px] border-border-subtle bg-surface-muted text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Link
                href={`/blog/categories/${normalizeTaxonomy(category)}`}
                className={cn(focusRing)}
              >
                {category}
              </Link>
            </Badge>
          ))}
        </div>
      </SidebarSection>

      <SidebarSection icon={Tags} title="Popular tags">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 12).map((tag) => (
            <Badge
              key={tag}
              asChild
              variant="secondary"
              className="rounded-[5px] border border-border-subtle bg-surface-muted text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Link
                href={`/blog/tags/${normalizeTaxonomy(tag)}`}
                className={cn(focusRing)}
              >
                {tag}
              </Link>
            </Badge>
          ))}
        </div>
      </SidebarSection>

      <Card className="relative overflow-hidden rounded-[5px] border border-pro-border-subtle bg-pro-surface p-5 shadow-medium">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="space-y-4">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-[5px] border-pro-border bg-pro-surface-muted text-[11px]"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Build with PyColors
          </Badge>

          <div className="space-y-2">
            <h3 className="font-brand text-base font-semibold tracking-tight">
              Move from insight to implementation.
            </h3>

            <p className="text-sm leading-7 text-muted-foreground">
              Use the blog to understand the decisions, Starter Free
              to validate the surface, and Starter Pro when auth and
              billing become the bottleneck.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              asChild
              size="sm"
              className={cn('rounded-[5px]', focusRing)}
            >
              <Link href="/starters/free">
                Starter Free
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              className={cn('rounded-[5px]', focusRing)}
            >
              <Link href="/starters/pro">Explore Starter Pro</Link>
            </Button>
          </div>
        </div>
      </Card>
    </aside>
  );
}

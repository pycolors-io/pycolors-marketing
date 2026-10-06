import Link from "next/link";
import { Badge } from "@pycolors/ui";
import { normalizeTaxonomy } from "@/lib/blog/utils";

type TagListProps = { readonly tags: string[] };

export function TagList({ tags }: TagListProps) {
  const uniqueTags = [
    ...new Map(
      tags
        .filter((tag) => tag.trim())
        .map((tag) => [normalizeTaxonomy(tag), tag.trim()]),
    ).entries(),
  ];
  if (uniqueTags.length === 0) return null;
  return (
    <nav aria-label="Article tags" className="flex flex-wrap gap-x-2">
      {uniqueTags.map(([slug, tag]) => (
        <Link
          key={slug}
          href={`/blog/tags/${slug}`}
          className="group inline-flex min-h-11 max-w-full items-center rounded-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Badge
            variant="outline"
            size="sm"
            className="h-auto min-h-7 max-w-full border-border-subtle bg-background px-2.5 py-1 leading-5 text-muted-foreground group-hover:border-border group-hover:bg-surface-muted/60 group-hover:text-foreground"
          >
            <span className="wrap-anywhere">{tag}</span>
          </Badge>
        </Link>
      ))}
    </nav>
  );
}

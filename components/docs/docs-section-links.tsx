import { ArrowDownRight } from "lucide-react";

type SectionLink = Readonly<{ title: string; href: string }>;

export function DocsSectionLinks({
  items,
  label = "Jump to section",
}: {
  readonly items: readonly SectionLink[];
  readonly label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={label} className="not-prose flex flex-wrap gap-2">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border-subtle bg-card px-3 text-xs font-medium text-foreground no-underline transition-colors hover:border-border hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
        >
          {item.title}
          <ArrowDownRight
            className="size-3.5 text-muted-foreground"
            aria-hidden="true"
          />
        </a>
      ))}
    </nav>
  );
}

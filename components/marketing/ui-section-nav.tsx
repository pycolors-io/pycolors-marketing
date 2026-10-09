import Link from "next/link";
import { cn } from "@pycolors/ui";

const destinations = [
  { id: "overview", label: "UI overview", href: "/ui" },
  { id: "blocks", label: "Blocks", href: "/blocks" },
  { id: "themes", label: "Theme Builder", href: "/tools/theme-builder" },
  { id: "patterns", label: "Patterns", href: "/ui/patterns" },
  { id: "examples", label: "Examples", href: "/ui/examples" },
  { id: "docs", label: "Documentation", href: "/docs/ui" },
] as const;

export function UiSectionNav({
  active,
}: Readonly<{ active: (typeof destinations)[number]["id"] }>) {
  return (
    <nav
      aria-label="PyColors UI navigation"
      className="mb-8 flex flex-wrap gap-x-1 gap-y-1 border-b border-border-subtle pb-3"
    >
      {destinations.map((item) => (
        <Link
          key={item.id}
          href={
            item.id === "docs" && active === "blocks"
              ? "/docs/blocks"
              : item.href
          }
          aria-current={active === item.id ? "page" : undefined}
          className={cn(
            "inline-flex min-h-10 items-center rounded-[5px] px-3 text-xs font-medium transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            active === item.id
              ? "bg-surface-muted text-foreground"
              : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

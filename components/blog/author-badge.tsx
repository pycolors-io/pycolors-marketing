import { useCopy } from "@/lib/i18n/use-copy";
type AuthorBadgeProps = { readonly name: string };

export function AuthorBadge({ name }: AuthorBadgeProps) {
  const tSite = useCopy();

  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-muted/40 text-xs font-medium"
      >
        {tSite(initials)}
      </div>
      <div>
        <p className="text-sm font-medium">{tSite(name)}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {tSite(name === "Patrice Parny" ? "Founder of PyColors" : "Author")}
        </p>
      </div>
    </div>
  );
}

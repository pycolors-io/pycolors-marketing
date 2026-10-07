import { ExternalLink } from "lucide-react";
import { getUiExplorerUrl } from "@/lib/docs/ui-explorer";

export function UiExplorerLink({
  slug,
}: {
  readonly slug?: readonly string[];
}) {
  const href = getUiExplorerUrl(slug);
  if (!href) return null;

  return (
    <div className="mb-8 rounded-lg border border-border-subtle bg-muted/20 text-sm">
      <a
        href={href}
        className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 font-medium leading-6 text-foreground transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
      >
        Open interactive example in PyColors UI Explorer
        <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
}

import { VerifiedExplorerLink } from "@/components/docs/verified-explorer-link";
import { ExternalLink } from "lucide-react";
import { getUiExplorerUrl } from "@/lib/docs/ui-explorer";
import { DocsSectionLinks } from "@/components/docs/docs-section-links";

const componentSections = [
  { title: "Preview", href: "#preview" },
  { title: "Usage", href: "#basic-usage" },
  { title: "API", href: "#api" },
  { title: "Accessibility", href: "#accessibility" },
] as const;

export function UiExplorerLink({
  slug,
  toc = [],
}: {
  readonly slug?: readonly string[];
  readonly toc?: readonly { url: string }[];
}) {
  const href = getUiExplorerUrl(slug);
  if (!href) return null;
  const sections = componentSections.filter((section) =>
    toc.some((item) => item.url === section.href),
  );

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <DocsSectionLinks items={sections} label="Component sections" />
      {slug?.[1] &&
      ["ai-message", "ai-message-actions", "ai-conversation"].includes(
        slug[1],
      ) ? (
        <VerifiedExplorerLink
          href={href}
          storyId={new URL(href).searchParams
            .get("path")!
            .replace("/story/", "")}
        />
      ) : (
        <a
          href={href}
          aria-label="Open interactive example in PyColors UI Explorer"
          className="inline-flex min-h-10 items-center gap-2 rounded-md px-1 text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
        >
          Open in UI Explorer
          <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

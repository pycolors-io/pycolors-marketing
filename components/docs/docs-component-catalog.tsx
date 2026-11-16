import { useCopy } from "@/lib/i18n/use-copy";
import design from "./docs-article.module.css";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, FormInput, Layers3, PanelsTopLeft } from "lucide-react";

const groups = [
  {
    title: "Forms & actions",
    description: "Collect input and trigger actions.",
    icon: FormInput,
    components: [
      ["Button", "button"],
      ["Input", "input"],
      ["Textarea", "textarea"],
      ["AIComposer", "ai-composer"],
      ["AIMessageActions", "ai-message-actions"],
      ["Checkbox", "checkbox"],
      ["PasswordInput", "password-input"],
      ["DropdownMenu", "dropdown-menu"],
    ],
  },
  {
    title: "Content & feedback",
    description: "Structure content and explain state.",
    icon: Layers3,
    components: [
      ["Card", "card"],
      ["AIMessage", "ai-message"],
      ["Badge", "badge"],
      ["Alert", "alert"],
      ["Toast", "toast"],
      ["EmptyState", "empty-state"],
      ["Skeleton", "skeleton"],
    ],
  },
  {
    title: "Layout & navigation",
    description: "Organize views, data, and overlays.",
    icon: PanelsTopLeft,
    components: [
      ["Dialog", "dialog"],
      ["Sheet", "sheet"],
      ["Tabs", "tabs"],
      ["Table", "table"],
      ["Pagination", "pagination"],
      ["Separator", "separator"],
      ["AIConversation", "ai-conversation"],
    ],
  },
] as const;

export function DocsComponentCatalog() {
  const tSite = useCopy();

  return (
    <nav
      aria-label={tSite("Component reference")}
      className="not-prose grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr))]"
    >
      {groups.map(({ title, description, icon: Icon, components }) => (
        <div
          key={title}
          className={`${design.catalogCard} overflow-hidden border border-border-subtle`}
        >
          <div className="border-b border-border-subtle bg-surface-muted p-5">
            <Icon className="mb-4 size-4 text-primary" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-foreground">
              {tSite(title)}
            </h3>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              {tSite(description)}
            </p>
          </div>
          <ul className="m-0 list-none p-2">
            {components.map(([name, slug]) => (
              <li key={slug}>
                <Link
                  href={`/docs/ui/${slug}`}
                  className="group flex min-h-11 items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-foreground no-underline transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
                >
                  {tSite(name)}
                  <ArrowUpRight
                    className="size-3.5 shrink-0 text-muted-foreground/60 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

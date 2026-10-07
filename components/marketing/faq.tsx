import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@pycolors/ui";
import { MarketingSectionHeader } from "./section-header";
import styles from "./faq.module.css";

export type MarketingFaqItem = Readonly<{
  question: string;
  answer: ReactNode;
  links?: readonly Readonly<{ href: string; label: string }>[];
}>;

export type MarketingFaqProps = Readonly<{
  title: string;
  titleId: string;
  description?: string;
  eyebrow?: string;
  items: readonly MarketingFaqItem[];
  className?: string;
}>;

/**
 * Marketing-only FAQ composition. The caller owns the section and its width.
 * Native disclosures keep answers server-rendered and independently openable.
 */
export function MarketingFaq({
  title,
  titleId,
  description,
  eyebrow = "FAQ",
  items,
  className,
}: MarketingFaqProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16",
        className,
      )}
    >
      <MarketingSectionHeader
        titleId={titleId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="left"
        className="mb-0 self-start"
      />
      <div className="min-w-0 divide-y divide-border-subtle border-y border-border-subtle">
        {items.map((item) => (
          <details key={item.question} className={cn("group", styles.item)}>
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-md py-5 text-sm font-medium text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "shrink-0 text-muted-foreground group-open:text-foreground",
                  styles.indicator,
                )}
              >
                <ChevronDown className="size-4" />
              </span>
            </summary>
            <div className={styles.content}>
              <div className="pb-6 pr-7 text-sm leading-7 text-muted-foreground">
                <div>{item.answer}</div>
                {item.links?.length ? (
                  <ul className="mt-3 space-y-1">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 items-center gap-2 rounded-md py-2 font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                          {link.label}
                          <ArrowRight
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

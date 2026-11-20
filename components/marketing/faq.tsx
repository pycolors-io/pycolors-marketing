import { useCopy } from "@/lib/i18n/use-copy";
import type { ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@pycolors/ui";
import { MarketingSectionHeader } from "./section-header";
import {
  MarketingSectionShell,
  type MarketingSectionShellProps,
} from "./section-shell";
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

/** The same full-width FAQ chapter as the Starter Pro overview. */
export function MarketingFaqSection({
  className,
  ...props
}: MarketingSectionShellProps) {
  return (
    <MarketingSectionShell
      {...props}
      className={cn(styles.section, className)}
    />
  );
}

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
  const tSite = useCopy();

  return (
    <div className={cn(styles.root, className)}>
      <MarketingSectionHeader
        titleId={titleId}
        eyebrow={tSite(eyebrow)}
        title={tSite(title)}
        description={tSite(description)}
        align="center"
        className={styles.heading}
      />
      <div className={styles.list}>
        {items.map((item) => (
          <details key={item.question} className={cn("group", styles.item)}>
            <summary className={styles.summary}>
              <span>{tSite(item.question)}</span>
              <span aria-hidden="true" className={styles.indicator}>
                <ChevronDown className="size-4" />
              </span>
            </summary>
            <div className={styles.content}>
              <div className={styles.answer}>
                <div>{tSite(item.answer)}</div>
                {item.links?.length ? (
                  <ul className="mt-3 space-y-1">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 items-center gap-2 rounded-md py-2 font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                          {tSite(link.label)}
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

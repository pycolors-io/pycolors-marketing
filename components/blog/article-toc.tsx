"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, ChevronDown, List } from "lucide-react";
import styles from "./blog-article.module.css";

type ArticleTocItem = { url: string; title: ReactNode };

/** Track the heading at the reading line, including through long code blocks. */
export function ArticleToc({ items }: { readonly items: ArticleTocItem[] }) {
  const [activeUrl, setActiveUrl] = useState(items[0]?.url);
  const mobileDetails = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const headings = items.flatMap((item) => {
      const element = document.getElementById(
        decodeURIComponent(item.url.slice(1)),
      );
      return element ? [{ url: item.url, element }] : [];
    });
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      let current = headings[0]?.url;
      for (const heading of headings) {
        if (heading.element.getBoundingClientRect().top > 112) break;
        current = heading.url;
      }
      setActiveUrl(current);
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [items]);

  if (items.length === 0) return null;
  const links = (
    <ol className="space-y-0.5">
      {items.map((item, index) => (
        <li key={item.url}>
          <Link
            href={item.url}
            aria-current={activeUrl === item.url ? "location" : undefined}
            className={styles.tocLink}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              setActiveUrl(item.url);
              if (mobileDetails.current) mobileDetails.current.open = false;
            }}
          >
            <span aria-hidden="true" className={styles.tocNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <div
        className={`${styles.tocPanel} hidden overflow-hidden rounded-[5px] border border-border-subtle lg:block`}
      >
        <div
          className={`${styles.tocHeader} flex items-center gap-3 border-b border-border-subtle p-4`}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-background">
            <List
              className="size-3.5 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
          <div>
            <p className="text-xs font-medium">On this page</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {items.length} {items.length === 1 ? "section" : "sections"}
            </p>
          </div>
        </div>
        <nav
          aria-label="On this page"
          className="max-h-[calc(100dvh-18rem)] overflow-y-auto overscroll-contain p-2"
        >
          {links}
        </nav>
        <div className="border-t border-border-subtle px-4 py-1">
          <Link
            href="#article-title"
            className="flex min-h-11 items-center justify-between gap-3 rounded-[5px] text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <details
        ref={mobileDetails}
        className={`${styles.mobileToc} ${styles.tocPanel} rounded-[5px] border border-border-subtle lg:hidden`}
      >
        <summary
          className={`${styles.tocHeader} flex min-h-14 cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`}
        >
          <List className="size-4" aria-hidden="true" />
          On this page
          <span
            className="ml-auto font-mono text-[11px] font-normal text-muted-foreground"
            aria-label={`${items.length} sections`}
          >
            {String(items.length).padStart(2, "0")}
          </span>
          <ChevronDown
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
        </summary>
        <nav
          aria-label="On this page"
          className="max-h-[60dvh] overflow-y-auto border-t border-border-subtle p-2"
        >
          {links}
        </nav>
      </details>
    </>
  );
}

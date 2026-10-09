"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import styles from "./guide-article.module.css";

export type TocItem = { id: string; label: string };

/** Native section links with a progressively enhanced reading position. */
export function OnThisPageInline({ items }: Readonly<{ items: TocItem[] }>) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const mobileDetails = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (items.some((item) => item.id === id)) setActiveId(id);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    const visible = new Set<string>();
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) visible.add(entry.target.id);
                else visible.delete(entry.target.id);
              }
              const current = items.find((item) => visible.has(item.id));
              if (current) setActiveId(current.id);
            },
            // A small inset beyond the 96px anchor offset excludes the
            // previous section when its bottom touches the reading line.
            { rootMargin: "-100px 0px 0px 0px", threshold: 0 },
          );
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer?.observe(section);
    }
    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, [items]);
  const links = (
    <ol className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
            className={styles.tocLink}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              setActiveId(item.id);
              if (mobileDetails.current) mobileDetails.current.open = false;
            }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <div className="hidden lg:block">
        <p className="mb-4 flex items-center gap-2 text-xs font-medium">
          <List className="size-3.5 text-muted-foreground" aria-hidden="true" />{" "}
          On this page
        </p>
        <nav
          aria-label="On this page"
          className="max-h-[calc(100dvh-10rem)] overflow-y-auto overscroll-contain border-l border-border-subtle pr-2"
        >
          {links}
        </nav>
      </div>
      <details
        ref={mobileDetails}
        className={`${styles.mobileToc} rounded-[5px] border border-border-subtle lg:hidden`}
      >
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <List className="size-4 text-muted-foreground" aria-hidden="true" />{" "}
          On this page{" "}
          <ChevronDown
            className="ml-auto size-4 text-muted-foreground"
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

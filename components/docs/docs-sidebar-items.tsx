"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "fumadocs-core/framework";
import type * as PageTree from "fumadocs-core/page-tree";
import {
  SidebarItem,
  useFolderDepth,
} from "fumadocs-ui/components/sidebar/base";
import { Badge } from "@pycolors/ui";

import { DAY_IN_MS, isNewDoc } from "@/lib/docs/new-article";

type PublicationDates = Readonly<Record<string, string>>;
const PublicationsContext = createContext<{
  dates: PublicationDates;
  today: number | null;
}>({ dates: {}, today: null });

const getToday = () => Math.floor(Date.now() / DAY_IN_MS) * DAY_IN_MS;
// Cached HTML must never advertise an expired badge before hydration.
const getServerToday = () => null;

function subscribeToDayChange(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;

  function refresh() {
    clearTimeout(timer);
    onChange();
    // At most 24 hours: safely below the browser's signed 32-bit timer limit.
    timer = setTimeout(refresh, getToday() + DAY_IN_MS - Date.now());
  }

  refresh();
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", refresh);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("focus", refresh);
    document.removeEventListener("visibilitychange", refresh);
  };
}

/** One clock for the entire sidebar; the page tree and article titles stay intact. */
export function DocsSidebarPublications({
  dates,
  children,
}: {
  dates: PublicationDates;
  children: ReactNode;
}) {
  const today = useSyncExternalStore(
    subscribeToDayChange,
    getToday,
    getServerToday,
  );
  const value = useMemo(() => ({ dates, today }), [dates, today]);

  return (
    <PublicationsContext.Provider value={value}>
      {children}
    </PublicationsContext.Provider>
  );
}

export function DocsSidebarItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname();
  const depth = useFolderDepth();
  const active = item.url.replace(/\/$/, "") === pathname.replace(/\/$/, "");

  return (
    <SidebarItem
      href={item.url}
      external={item.external}
      icon={item.icon}
      active={active}
      aria-current={active ? "page" : undefined}
      className="relative flex items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring [&_svg]:size-4 [&_svg]:shrink-0"
      style={{ paddingInlineStart: `calc(${2 + 3 * depth} * var(--spacing))` }}
    >
      <span className="min-w-0 flex-1 wrap-anywhere">{item.name}</span>{" "}
      {!item.external && <DocsNewArticleBadge href={item.url} />}
    </SidebarItem>
  );
}

/** Shared by the desktop tree and the mobile list of documentation pages. */
export function DocsNewArticleBadge({ href }: { href: string }) {
  const { dates, today } = useContext(PublicationsContext);
  const publishedAt = dates[href];
  if (!publishedAt) return null;
  const isNew = today !== null && isNewDoc(publishedAt, today);

  return (
    <Badge
      variant="outline"
      size="sm"
      className="shrink-0 rounded-[4px] border-primary/20 bg-primary/[0.06] px-1.5 text-[10px] leading-none text-primary transition-none"
      // Keep its footprint; current badges inherit the navigation's visibility.
      style={{ visibility: isNew ? undefined : "hidden" }}
      aria-hidden={isNew ? undefined : true}
      title={`Published ${publishedAt} · New for 30 days`}
    >
      New
    </Badge>
  );
}

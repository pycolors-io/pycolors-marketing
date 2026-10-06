"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Layers3,
  Menu,
} from "lucide-react";
import {
  FullSearchTrigger as LargeSearchToggle,
  SearchTrigger,
} from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { ThemeSwitch as ThemeToggle } from "fumadocs-ui/layouts/shared/slots/theme-switch";

import { Container } from "@/components/container";
import {
  Button,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  cn,
} from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { DocsLogo } from "@/components/docs-logo";
import { DOCS_MENU_GROUPS } from "@/lib/layout.shared";
import { DocsNewArticleBadge } from "@/components/docs/docs-sidebar-items";

type DocsLink = Readonly<{
  label: string;
  href: string;
}>;

type DocsHeaderProps = Readonly<{
  docsLinks?: DocsLink[];
}>;

const templatePriceLabel = PRODUCT_DISPLAY["na-ai-landing"].priceLabel;
const starterProPriceLabel = PRODUCT_DISPLAY["starter-pro"].priceLabel;

type DocsNavItem = Readonly<{
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
}>;

const DOCS_RESOURCE_ITEMS: DocsNavItem[] = [
  {
    label: "Documentation overview",
    href: "/docs",
    icon: BookOpen,
    description: "Find your starting point.",
  },
  {
    label: "Patterns",
    href: "/docs/patterns",
    icon: Layers3,
    description: "Apply shared product conventions.",
  },
];

const DOCS_NAV_ITEMS = [
  ...DOCS_MENU_GROUPS.flatMap((group) => group.items),
  ...DOCS_RESOURCE_ITEMS,
];
const DOCS_PRIMARY_ITEMS = DOCS_MENU_GROUPS.flatMap((group) =>
  group.items.filter((item) => item.href !== "/docs/design-system"),
);

const FEATURED_DOCS_HREFS = [
  "/docs/getting-started",
  "/docs/templates/na-ai-landing/project-structure",
  "/docs/starter/upgrade",
  "/docs/starter-pro/what-is-included",
  "/docs/starter-pro/billing",
  "/docs/starter-pro/backend",
] as const;

// Keep the query aligned with the xl header utilities: the docs links and search
// need more room than the Marketing header's smaller set of controls.
const DESKTOP_NAV_QUERY = "(min-width: 80rem)";
const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function getMostSpecificActiveHref(pathname: string | null, hrefs: string[]) {
  if (!pathname) return null;
  return (
    hrefs
      .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
      .sort((a, b) => b.length - a.length)[0] ?? null
  );
}

export function DocsHeader({ docsLinks = [] }: DocsHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDocsOpen, setIsDocsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const openBtnRef = React.useRef<HTMLButtonElement>(null);
  const docsButtonRef = React.useRef<HTMLButtonElement>(null);
  const docsMenuRef = React.useRef<HTMLDivElement>(null);
  const docsMenuId = `docs-menu-${React.useId()}`;
  const activeHref = getMostSpecificActiveHref(
    pathname,
    DOCS_NAV_ITEMS.map((item) => item.href),
  );
  const activeDocHref = getMostSpecificActiveHref(
    pathname,
    docsLinks.map((item) => item.href),
  );
  const isPrimarySection = DOCS_PRIMARY_ITEMS.some(
    (item) => item.href === activeHref,
  );
  const curated = FEATURED_DOCS_HREFS.flatMap((href) =>
    docsLinks.filter((item) => item.href === href),
  );
  const featuredDocsLinks =
    curated.length > 0 ? curated : docsLinks.slice(0, 8);

  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsDocsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV_QUERY);
    const onResize = () => {
      setIsMenuOpen(false);
      setIsDocsOpen(false);
      if (
        !media.matches &&
        docsMenuRef.current?.contains(document.activeElement)
      ) {
        openBtnRef.current?.focus({ preventScroll: true });
      }
    };
    media.addEventListener("change", onResize);
    return () => media.removeEventListener("change", onResize);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!isDocsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !docsMenuRef.current?.contains(event.target)
      ) {
        setIsDocsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isDocsOpen]);

  function onNavigate(event: React.MouseEvent<HTMLAnchorElement>) {
    if (
      event.button === 0 &&
      !event.defaultPrevented &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      event.currentTarget.target !== "_blank"
    ) {
      setIsDocsOpen(false);
      setIsMenuOpen(false);
    }
  }

  function sectionLinks(items: readonly DocsNavItem[]) {
    return items.map((item) => {
      const Icon = item.icon;
      const isCurrent = activeHref === item.href;
      return (
        <li key={item.href} className="min-w-0">
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-start gap-3 rounded-[5px] p-3 text-sm transition-colors motion-reduce:transition-none hover:bg-surface-muted",
              isCurrent && "bg-surface-muted",
              focusRing,
            )}
          >
            <Icon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-primary"
            />
            <span className="min-w-0">
              <span className="block font-semibold text-foreground">
                {item.label}
              </span>{" "}
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                {item.description}
              </span>
            </span>
          </Link>
        </li>
      );
    });
  }

  function documentationSections() {
    return (
      <>
        <div className="grid gap-6 sm:grid-cols-3">
          {DOCS_MENU_GROUPS.map((group) => (
            <div key={group.title} className="min-w-0">
              <p className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
                {group.title}
              </p>
              <ul aria-label={group.title} className="space-y-1">
                {sectionLinks(group.items)}
              </ul>
            </div>
          ))}
        </div>
        <ul
          aria-label="Documentation resources"
          className="mt-4 grid gap-1 border-t border-border-subtle pt-4 sm:grid-cols-2"
        >
          {sectionLinks(DOCS_RESOURCE_ITEMS)}
        </ul>
      </>
    );
  }

  function docLinks(items: DocsLink[], showNew = false) {
    return items.map((item) => (
      <li key={item.href} className="min-w-0">
        <Link
          href={item.href}
          onClick={onNavigate}
          aria-current={activeDocHref === item.href ? "page" : undefined}
          className={cn(
            "flex min-h-11 items-center justify-between gap-3 rounded-[5px] px-3 py-2 text-sm text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-surface-muted hover:text-foreground",
            activeDocHref === item.href && "bg-surface-muted text-foreground",
            focusRing,
          )}
        >
          <span className="min-w-0 break-words">{item.label}</span>{" "}
          <span className="inline-flex shrink-0 items-center gap-2">
            {showNew && <DocsNewArticleBadge href={item.href} />}
            <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
          </span>
        </Link>
      </li>
    ));
  }

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200 motion-reduce:transition-none",
          scrolled
            ? "border-b border-border-subtle bg-background/88 backdrop-blur-xl"
            : "border-b border-border-subtle/60 bg-background/78 backdrop-blur-md",
        )}
      >
        <div className="relative z-10 mx-auto max-w-fd-container">
          <a
            href="#content"
            className={cn(
              "sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] rounded-[5px] border border-border-subtle bg-background px-3 py-2 text-sm",
              focusRing,
            )}
          >
            Skip to content
          </a>
          <Container>
            <div className="flex h-16 items-center gap-3">
              <div className="flex shrink-0 items-center gap-3">
                <DocsLogo />
              </div>
              <nav
                aria-label="Documentation"
                className="ml-4 hidden flex-1 items-center gap-1 text-[13px] font-medium xl:flex"
              >
                <div
                  ref={docsMenuRef}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setIsDocsOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (isDocsOpen && event.key === "Escape") {
                      event.preventDefault();
                      setIsDocsOpen(false);
                      docsButtonRef.current?.focus();
                    }
                  }}
                >
                  <button
                    ref={docsButtonRef}
                    type="button"
                    aria-expanded={isDocsOpen}
                    aria-controls={docsMenuId}
                    onClick={() => setIsDocsOpen((open) => !open)}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-[5px] px-3 py-2 text-[13px] text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                      ((activeHref && !isPrimarySection) || isDocsOpen) &&
                        "bg-surface-muted text-foreground",
                      focusRing,
                    )}
                  >
                    Docs
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "ml-1.5 size-3.5",
                        isDocsOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    id={docsMenuId}
                    hidden={!isDocsOpen}
                    className="absolute inset-x-4 top-full mx-auto mt-2 max-h-[calc(100dvh-5rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-[5px] border border-border-subtle bg-background shadow-medium"
                  >
                    <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-6 p-5">
                      <nav
                        aria-label="Documentation sections"
                        className="min-w-0"
                      >
                        {documentationSections()}
                      </nav>
                      {featuredDocsLinks.length > 0 && (
                        <div className="min-w-0 border-l border-border-subtle pl-4">
                          <p className="px-3 pb-2 text-sm font-semibold text-muted-foreground">
                            Quick links
                          </p>
                          <ul aria-label="Quick documentation links">
                            {docLinks(featuredDocsLinks)}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle bg-surface px-5 py-2">
                      <Link
                        href="/pricing"
                        onClick={onNavigate}
                        className={cn(
                          "flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 rounded-[5px] px-3 py-2 text-sm hover:bg-surface",
                          focusRing,
                        )}
                      >
                        <span className="font-medium text-foreground">
                          View pricing
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Templates from {templatePriceLabel} · Starter Pro from{" "}
                          {starterProPriceLabel}
                        </span>
                        <ChevronRight
                          aria-hidden="true"
                          className="size-3.5 shrink-0 text-muted-foreground"
                        />
                      </Link>
                      <Link
                        href="/tools/theme-builder"
                        onClick={onNavigate}
                        className={cn(
                          "inline-flex min-h-11 items-center gap-2 rounded-[5px] px-3 py-2 text-sm text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                          focusRing,
                        )}
                      >
                        Open Theme Builder
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
                {DOCS_PRIMARY_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-[5px] px-3 py-2 text-[13px] text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                      activeHref === item.href &&
                        "bg-surface-muted text-foreground",
                      focusRing,
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="hidden items-center gap-2 xl:flex">
                <LargeSearchToggle
                  className={cn(
                    "w-36 rounded-[5px] text-foreground 2xl:w-44",
                    focusRing,
                  )}
                />
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-[5px] px-3.5 text-[13px] font-medium"
                >
                  <Link href="/starters/pro">
                    Explore Pro
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-[8px] xl:hidden">
                <SearchTrigger
                  className={cn(
                    "relative z-10 size-[44px] shrink-0 rounded-[5px] text-foreground",
                    focusRing,
                  )}
                />
                <SheetTrigger asChild>
                  <button
                    ref={openBtnRef}
                    type="button"
                    aria-label="Open documentation menu"
                    className={cn(
                      "inline-flex size-[44px] shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface",
                      focusRing,
                    )}
                  >
                    <Menu aria-hidden="true" className="size-4" />
                  </button>
                </SheetTrigger>
              </div>
            </div>
          </Container>
        </div>
      </header>
      <SheetContent
        aria-modal="true"
        aria-describedby={undefined}
        // Override the app's generic dialog offset locally, as in SiteHeader.
        style={{ top: 0, borderRadius: 0 }}
        onCloseAutoFocus={(event) => {
          if (window.matchMedia(DESKTOP_NAV_QUERY).matches) {
            event.preventDefault();
            docsButtonRef.current?.focus({ preventScroll: true });
          }
        }}
        className="inset-0 flex h-dvh w-full flex-col gap-0 overflow-hidden border-0 bg-background p-0 shadow-none transition-none [&>button]:right-3 [&>button]:top-2.5 [&>button]:flex [&>button]:size-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-[5px]"
      >
        <div className="flex min-h-16 shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-border-subtle py-2 pl-4 pr-16">
          <SheetTitle className="min-w-0 flex-1 basis-32 text-base">
            Documentation
          </SheetTitle>
          <ThemeToggle
            mode="light-dark"
            className="inline-flex min-h-11 shrink-0 items-center rounded-[5px] border border-border-subtle bg-surface-muted px-1"
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <nav aria-label="Documentation navigation">
            {documentationSections()}
          </nav>
          {docsLinks.length > 0 && (
            <>
              <nav
                aria-label="Quick documentation links"
                className="mt-4 border-t border-border-subtle pt-4"
              >
                <p className="px-3 pb-2 text-sm font-semibold text-muted-foreground">
                  Quick links
                </p>
                <ul>{docLinks(featuredDocsLinks)}</ul>
              </nav>
              <details className="group mt-4 border-t border-border-subtle pt-2">
                <summary
                  className={cn(
                    "flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-[5px] px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden",
                    focusRing,
                  )}
                >
                  All documentation pages
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 group-open:rotate-180"
                  />
                </summary>
                <nav aria-label="All documentation links">
                  <ul>{docLinks(docsLinks, true)}</ul>
                </nav>
              </details>
            </>
          )}
          <nav
            aria-label="PyColors tools and pricing"
            className="mt-4 flex flex-wrap gap-1 border-t border-border-subtle pt-4"
          >
            {[
              { label: "Pricing", href: "/pricing" },
              { label: "Theme Builder", href: "/tools/theme-builder" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-[5px] px-3 py-2 text-sm text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                  focusRing,
                )}
              >
                {item.label}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="shrink-0 border-t border-border-subtle px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
          <Button
            asChild
            className="h-auto min-h-11 w-full whitespace-normal rounded-[5px] py-3 text-center"
          >
            <Link href="/starters/pro" onClick={onNavigate}>
              Explore Starter Pro
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

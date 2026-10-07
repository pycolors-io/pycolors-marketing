"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { ThemeSwitch as ThemeToggle } from "fumadocs-ui/layouts/shared/slots/theme-switch";

import { Container } from "@/components/container";
import {
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  cn,
} from "@pycolors/ui";
import {
  PRIMARY_NAV_ITEMS,
  PRODUCT_MENU_GROUPS,
  PRODUCT_MENU_SECONDARY_ITEMS,
  RESOURCE_NAV_ITEMS,
  type PrimaryNavItem,
} from "@/lib/layout.shared";
import { Logo } from "../logo";

type SiteHeaderProps = Readonly<{ docsLinks?: PrimaryNavItem[] }>;

// Keep this media query aligned with the header's lg responsive utilities.
const DESKTOP_NAV_QUERY = "(min-width: 64rem)";
const productHrefs = [
  ...PRODUCT_MENU_GROUPS.flatMap((group) => group.items),
  ...PRODUCT_MENU_SECONDARY_ITEMS,
].map((item) => item.href);
const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function getMostSpecificActiveHref(pathname: string | null, hrefs: string[]) {
  if (!pathname) return null;
  return (
    hrefs
      .filter(
        (href) =>
          href.startsWith("/") &&
          (pathname === href || pathname.startsWith(`${href}/`)),
      )
      .sort((a, b) => b.length - a.length)[0] ?? null
  );
}

function isSameTabNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    event.currentTarget.target !== "_blank"
  );
}

type NavigationContentProps = Readonly<{
  activeHref: string | null;
  onNavigate: React.MouseEventHandler<HTMLAnchorElement>;
}>;

function ProductGroups({ activeHref, onNavigate }: NavigationContentProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      {PRODUCT_MENU_GROUPS.map((group) => (
        <div key={group.title} className="min-w-0">
          <p className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
            {group.title}
          </p>
          <ul aria-label={group.title} className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const current = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group flex gap-3 rounded-md p-3 transition-colors motion-reduce:transition-none hover:bg-surface-muted",
                      current && "bg-surface-muted",
                      focusRing,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold leading-6 text-foreground">
                          {item.label}
                        </span>
                        {item.badge ? (
                          <Badge
                            variant="outline"
                            className="h-auto shrink-0 rounded-md px-2 py-0.5 text-xs leading-5"
                          >
                            {item.badge}
                          </Badge>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function NavigationLinks({
  items,
  activeHref,
  onNavigate,
}: NavigationContentProps & Readonly<{ items: PrimaryNavItem[] }>) {
  return (
    <ul className="flex flex-wrap gap-1">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            target={item.href.startsWith("https://") ? "_blank" : undefined}
            rel={
              item.href.startsWith("https://")
                ? "noreferrer noopener"
                : undefined
            }
            aria-current={activeHref === item.href ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-surface-muted hover:text-foreground",
              activeHref === item.href && "bg-surface-muted text-foreground",
              focusRing,
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader({ docsLinks = [] }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProductsOpen, setIsProductsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const productsRef = React.useRef<HTMLDivElement>(null);
  const productsButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileButtonRef = React.useRef<HTMLButtonElement>(null);
  const productsId = `products-menu-${React.useId()}`;
  const resources = [...RESOURCE_NAV_ITEMS, ...docsLinks].filter(
    (item, index, all) =>
      all.findIndex((candidate) => candidate.href === item.href) === index,
  );
  const activeProductHref = getMostSpecificActiveHref(pathname, productHrefs);
  const activePrimaryHref = getMostSpecificActiveHref(
    pathname,
    PRIMARY_NAV_ITEMS.map((item) => item.href),
  );
  const activeMobileHref = getMostSpecificActiveHref(pathname, [
    ...productHrefs,
    ...resources.map((item) => item.href),
  ]);

  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV_QUERY);
    const onResize = () => {
      setIsMenuOpen(false);
      setIsProductsOpen(false);
      if (
        !media.matches &&
        productsRef.current?.contains(document.activeElement)
      ) {
        mobileButtonRef.current?.focus({ preventScroll: true });
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
    if (!isProductsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !productsRef.current?.contains(event.target)
      ) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isProductsOpen]);

  function onNavigate(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isSameTabNavigation(event)) {
      setIsProductsOpen(false);
      setIsMenuOpen(false);
    }
  }

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200 motion-reduce:transition-none",
          scrolled
            ? "border-b border-border-subtle bg-background/88 backdrop-blur-xl"
            : "border-b border-transparent bg-background/70 backdrop-blur-md",
        )}
      >
        <div className="relative z-10">
          <a
            href="#content"
            className={cn(
              "sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] rounded-md border border-border-subtle bg-background px-3 py-2 text-sm",
              focusRing,
            )}
          >
            Skip to content
          </a>
          <Container>
            <div className="flex h-16 items-center gap-3">
              <div className="flex shrink-0 items-center gap-3">
                <Logo />
              </div>
              <nav
                aria-label="Primary"
                className="ml-4 hidden flex-1 items-center gap-1 text-[13px] font-medium lg:flex"
              >
                <div
                  ref={productsRef}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setIsProductsOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (isProductsOpen && event.key === "Escape") {
                      event.preventDefault();
                      setIsProductsOpen(false);
                      productsButtonRef.current?.focus();
                    }
                  }}
                >
                  <button
                    ref={productsButtonRef}
                    type="button"
                    aria-expanded={isProductsOpen}
                    aria-controls={productsId}
                    onClick={() => setIsProductsOpen((open) => !open)}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-surface-muted hover:text-foreground",
                      (isProductsOpen ||
                        (activeProductHref && !activePrimaryHref)) &&
                        "bg-surface-muted text-foreground",
                      focusRing,
                    )}
                  >
                    Products
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "ml-1.5 size-3.5",
                        isProductsOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    id={productsId}
                    hidden={!isProductsOpen}
                    className="absolute inset-x-4 top-full mx-auto mt-2 max-h-[calc(100dvh-5rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-md border border-border-subtle bg-background shadow-medium"
                  >
                    <div className="p-5">
                      <ProductGroups
                        activeHref={activeProductHref}
                        onNavigate={onNavigate}
                      />
                    </div>
                    <div className="border-t border-border-subtle bg-surface px-5 py-2">
                      <NavigationLinks
                        items={PRODUCT_MENU_SECONDARY_ITEMS}
                        activeHref={activeProductHref}
                        onNavigate={onNavigate}
                      />
                    </div>
                  </div>
                </div>
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={
                      activePrimaryHref === item.href ? "page" : undefined
                    }
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-surface-muted hover:text-foreground",
                      activePrimaryHref === item.href &&
                        "bg-surface-muted text-foreground",
                      focusRing,
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="hidden items-center gap-2 lg:flex">
                <Button
                  asChild
                  size="sm"
                  className="h-9 rounded-md px-4 text-[13px] font-medium"
                >
                  <Link href="/starters/pro">
                    Explore Pro
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="ml-auto flex items-center gap-2 lg:hidden">
                <SheetTrigger asChild>
                  <button
                    type="button"
                    ref={mobileButtonRef}
                    aria-label="Open navigation menu"
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-md border border-border-subtle bg-surface",
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
        // The app's generic dialog CSS adds an offset and rounded corners.
        // This navigation sheet must cover the viewport at every text size.
        style={{ top: 0, borderRadius: 0 }}
        aria-modal="true"
        aria-describedby={undefined}
        onCloseAutoFocus={(event) => {
          if (window.matchMedia(DESKTOP_NAV_QUERY).matches) {
            event.preventDefault();
            productsButtonRef.current?.focus({ preventScroll: true });
          }
        }}
        className="inset-0 flex h-dvh w-full flex-col gap-0 overflow-hidden border-0 bg-background p-0 shadow-none transition-none [&>button]:right-3 [&>button]:top-2.5 [&>button]:flex [&>button]:size-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-md"
      >
        <div className="flex min-h-16 shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-border-subtle py-2 pl-4 pr-16">
          <SheetTitle className="min-w-0 flex-1 basis-32 text-base">
            Explore PyColors
          </SheetTitle>
          <ThemeToggle
            mode="light-dark"
            className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-border-subtle bg-surface-muted px-1"
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          <nav aria-label="Products">
            <ProductGroups
              activeHref={activeMobileHref}
              onNavigate={onNavigate}
            />
          </nav>
          <nav
            aria-label="Compare and browse"
            className="mt-5 border-t border-border-subtle pt-3"
          >
            <NavigationLinks
              items={PRODUCT_MENU_SECONDARY_ITEMS}
              activeHref={activeMobileHref}
              onNavigate={onNavigate}
            />
          </nav>
          <nav
            aria-label="Resources"
            className="mt-4 border-t border-border-subtle pt-4"
          >
            <p className="mb-1 px-3 text-sm font-semibold text-muted-foreground">
              Resources
            </p>
            <NavigationLinks
              items={resources}
              activeHref={activeMobileHref}
              onNavigate={onNavigate}
            />
          </nav>
        </div>
        <div className="shrink-0 border-t border-border-subtle px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
          <Button
            asChild
            className="h-auto min-h-11 w-full whitespace-normal rounded-md py-3 text-center"
          >
            <Link href="/starters/pro" onClick={onNavigate}>
              Explore Pro
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

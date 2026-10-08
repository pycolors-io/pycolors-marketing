"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { MobileMenuAppearance } from "@/components/appearance-controls";
import { FooterPalette as SitePalettePicker } from "@/components/footer-palette";

import { Container } from "@/components/container";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  cn,
} from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import {
  GITHUB_NAV_ITEM,
  MOBILE_BROWSE_NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
  PRODUCT_MENU_GROUPS,
  PRODUCT_MENU_SECONDARY_ITEMS,
  RESOURCE_MENU_ITEMS,
  RESOURCE_NAV_ITEMS,
  type PrimaryMenu,
  type PrimaryNavItem,
} from "@/lib/layout.shared";
import { Logo } from "../logo";
import { useHeaderDisclosure } from "./use-header-disclosure";
import styles from "./header-disclosure.module.css";

type SiteHeaderProps = Readonly<{
  docsLinks?: PrimaryNavItem[];
  logo?: React.ReactNode;
  desktopActions?: React.ReactNode;
  mobileActions?: React.ReactNode;
  secondaryNavigation?: React.ReactNode;
  onMobileMenuOpen?: () => void;
}>;

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
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-3">
      {PRODUCT_MENU_GROUPS.map((group) => (
        <div key={group.title} className="min-w-0">
          <p className="mb-2 px-2.5 text-[11px] leading-4 font-medium tracking-[0.06em] text-muted-foreground uppercase">
            {group.title}
          </p>
          <ul aria-label={group.title} className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const current = activeHref === item.href;
              return (
                <li key={item.href} className="min-w-0">
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group/product-link flex min-h-11 items-start gap-2.5 rounded-md px-2.5 py-2.5 text-[13px] leading-5 transition-colors motion-reduce:transition-none hover:bg-surface-muted/60",
                      current && "bg-surface-muted/60",
                      focusRing,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={cn(
                        "mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover/product-link:text-primary motion-reduce:transition-none",
                        current && "text-primary",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-foreground">
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="ml-auto shrink-0 text-[11px] leading-4 font-normal text-muted-foreground tabular-nums">
                            {item.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 font-normal text-muted-foreground">
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
              "inline-flex min-h-11 items-center gap-2 rounded-md px-2.5 py-2 text-[13px] leading-5 text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-surface-muted/60 hover:text-foreground lg:min-h-10 [@media(pointer:coarse)]:min-h-11",
              activeHref === item.href && "bg-surface-muted/60 text-foreground",
              focusRing,
            )}
          >
            {item.label}
            {item.href.startsWith("https://") && (
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-3.5"
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function DesktopNavigationMenu({
  menu,
  label,
  open,
  active,
  onOpenChange,
  triggerRef,
  children,
}: Readonly<{
  menu: PrimaryMenu;
  label: string;
  open: boolean;
  active: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
}>) {
  const { rootRef, panelRef, rootProps, triggerProps } = useHeaderDisclosure({
    open,
    onOpenChange,
    triggerRef,
    desktopQuery: DESKTOP_NAV_QUERY,
  });
  const panelId = `${menu}-menu-${React.useId()}`;

  return (
    <div
      ref={rootRef}
      className="relative flex h-16 items-center"
      {...rootProps}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        {...triggerProps}
        className={cn(
          "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-surface-muted/60 hover:text-foreground",
          (open || active) && "bg-surface-muted/60 text-foreground",
          focusRing,
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            "ml-1.5 size-3 transition-transform duration-150 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className={cn(
          "absolute left-0 top-full mt-2 max-h-[calc(100dvh-5rem)] max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-md border border-border-subtle bg-background shadow-soft",
          menu === "products" ? "w-[45rem]" : "w-[22rem]",
          styles.panel,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ResourceLinks({ activeHref, onNavigate }: NavigationContentProps) {
  return (
    <ul aria-label="Learning and product updates" className="space-y-0.5 p-2">
      {RESOURCE_MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        const current = activeHref === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={cn(
                "group/resource-link flex min-h-11 items-start gap-2.5 rounded-md px-3 py-2.5 transition-colors motion-reduce:transition-none hover:bg-surface-muted/60",
                current && "bg-surface-muted/60",
                focusRing,
              )}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn(
                  "mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover/resource-link:text-primary motion-reduce:transition-none",
                  current && "text-primary",
                )}
              />
              <span className="min-w-0">
                <span className="block text-[13px] leading-5 font-medium text-foreground">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-5 font-normal text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader({
  docsLinks = [],
  logo = <Logo />,
  desktopActions,
  mobileActions,
  secondaryNavigation,
  onMobileMenuOpen,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<PrimaryMenu | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const desktopNavRef = React.useRef<HTMLElement>(null);
  const productsButtonRef = React.useRef<HTMLButtonElement>(null);
  const resourcesButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileButtonRef = React.useRef<HTMLButtonElement>(null);
  const resources = [...RESOURCE_NAV_ITEMS, ...docsLinks].filter(
    (item, index, all) =>
      all.findIndex((candidate) => candidate.href === item.href) === index,
  );
  const activeProductHref = getMostSpecificActiveHref(pathname, productHrefs);
  const activePrimaryHref = getMostSpecificActiveHref(
    pathname,
    PRIMARY_NAV_ITEMS.flatMap((item) => ("href" in item ? [item.href] : [])),
  );
  const activeResourceHref = getMostSpecificActiveHref(
    pathname,
    RESOURCE_MENU_ITEMS.map((item) => item.href),
  );
  const activeMobileHref = getMostSpecificActiveHref(pathname, [
    ...productHrefs,
    ...MOBILE_BROWSE_NAV_ITEMS.map((item) => item.href),
    ...resources.map((item) => item.href),
  ]);

  React.useEffect(() => {
    setIsMenuOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  React.useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV_QUERY);
    const onResize = () => {
      setIsMenuOpen(false);
      setOpenMenu(null);
      if (
        !media.matches &&
        desktopNavRef.current?.contains(document.activeElement)
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

  function onNavigate(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isSameTabNavigation(event)) {
      setOpenMenu(null);
      setIsMenuOpen(false);
    }
  }

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <header
        className={cn(
          "site-frame fixed inset-x-0 top-0 z-50 border-b border-border-subtle transition-colors duration-200 motion-reduce:transition-none",
          scrolled
            ? "bg-background/88 backdrop-blur-xl"
            : "bg-background/78 backdrop-blur-md",
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
              <div className="flex shrink-0 items-center gap-3 lg:min-w-40">
                {logo}
              </div>
              <nav
                ref={desktopNavRef}
                aria-label="Primary"
                className="ml-4 hidden flex-1 items-center gap-1 text-[13px] font-medium lg:flex"
              >
                {PRIMARY_NAV_ITEMS.map((item) =>
                  "href" in item ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={
                        activePrimaryHref === item.href ? "page" : undefined
                      }
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-surface-muted/60 hover:text-foreground",
                        activePrimaryHref === item.href &&
                          "bg-surface-muted/60 text-foreground",
                        focusRing,
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <DesktopNavigationMenu
                      key={item.menu}
                      menu={item.menu}
                      label={item.label}
                      open={openMenu === item.menu}
                      active={
                        item.menu === "products"
                          ? Boolean(activeProductHref && !activePrimaryHref)
                          : Boolean(activeResourceHref)
                      }
                      triggerRef={
                        item.menu === "products"
                          ? productsButtonRef
                          : resourcesButtonRef
                      }
                      onOpenChange={(open) =>
                        setOpenMenu((current) =>
                          open
                            ? item.menu
                            : current === item.menu
                              ? null
                              : current,
                        )
                      }
                    >
                      {item.menu === "products" ? (
                        <>
                          <div className="px-5 py-4">
                            <ProductGroups
                              activeHref={activeProductHref}
                              onNavigate={onNavigate}
                            />
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-border-subtle bg-surface/60 px-5 py-2">
                            <NavigationLinks
                              items={PRODUCT_MENU_SECONDARY_ITEMS}
                              activeHref={activeProductHref}
                              onNavigate={onNavigate}
                            />
                            <div className="ml-auto shrink-0">
                              <SitePalettePicker />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <ResourceLinks
                            activeHref={activeResourceHref}
                            onNavigate={onNavigate}
                          />
                          <div className="border-t border-border-subtle bg-surface/60 px-2 py-1">
                            <NavigationLinks
                              items={[GITHUB_NAV_ITEM]}
                              activeHref={null}
                              onNavigate={onNavigate}
                            />
                          </div>
                        </>
                      )}
                    </DesktopNavigationMenu>
                  ),
                )}
              </nav>
              <div className="hidden items-center gap-2 lg:flex">
                {desktopActions}
                <Button
                  asChild
                  size="default"
                  className="site-primary-action rounded-md font-medium"
                >
                  <Link href="/starters/pro">
                    Explore Pro
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
                {mobileActions}
                <SheetTrigger asChild>
                  <button
                    type="button"
                    ref={mobileButtonRef}
                    aria-label="Open navigation menu"
                    onClick={onMobileMenuOpen}
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
        {secondaryNavigation}
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
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <nav aria-label="Products">
            <ProductGroups
              activeHref={activeMobileHref}
              onNavigate={onNavigate}
            />
          </nav>
          <nav
            aria-label="Compare and browse"
            className="mt-4 border-t border-border-subtle pt-3"
          >
            <NavigationLinks
              items={MOBILE_BROWSE_NAV_ITEMS}
              activeHref={activeMobileHref}
              onNavigate={onNavigate}
            />
          </nav>
          <nav
            aria-label="Resources"
            className="mt-4 border-t border-border-subtle pt-4"
          >
            <p className="mb-2 px-2.5 text-[11px] leading-4 font-medium tracking-[0.06em] text-muted-foreground uppercase">
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
          <MobileMenuAppearance />
          <Button
            asChild
            className="site-primary-action h-auto w-full whitespace-normal rounded-md text-center"
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

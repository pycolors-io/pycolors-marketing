'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  ChevronDown,
  ChevronRight,
  FileText,
  Github,
  Layers3,
  LayoutTemplate,
  Menu,
  Package2,
  Rocket,
  Sparkles,
  X,
} from 'lucide-react';
import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';
import { Container } from '@/components/container';

import { Button, cn } from '@pycolors/ui';
import {
  PRIMARY_NAV_ITEMS,
  PRODUCT_MENU_GROUPS,
} from '@/lib/layout.shared';
import { Logo } from '../logo';

type DocsLink = {
  label: string;
  href: string;
};

interface SiteHeaderProps {
  docsLinks?: DocsLink[];
}

type MobileMenuItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
};

type MobileMenuSection = {
  title: string;
  items: MobileMenuItem[];
};

const HEADER_HEIGHT = 64;

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function matchPathname(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isProductsActive(pathname: string | null) {
  if (!pathname) return false;

  return PRODUCT_MENU_GROUPS.some((group) =>
    group.items.some((item) => matchPathname(pathname, item.href)),
  );
}

function getMostSpecificActiveHref(
  pathname: string | null,
  hrefs: string[],
) {
  if (!pathname) return null;

  const matches = hrefs.filter(
    (href) => pathname === href || pathname.startsWith(`${href}/`),
  );

  matches.sort((a, b) => b.length - a.length);

  return matches[0] ?? null;
}

function getActiveProductHref(pathname: string | null) {
  const allItems = PRODUCT_MENU_GROUPS.flatMap(
    (group) => group.items,
  );
  return getMostSpecificActiveHref(
    pathname,
    allItems.map((item) => item.href),
  );
}

const PRODUCT_MENU_META: Record<
  string,
  {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
  }
> = {
  '/starters': {
    icon: Boxes,
    description: 'Choose the right entry point',
  },
  '/starters/free': {
    icon: Sparkles,
    description: 'Validate product shape fast',
  },
  '/starters/pro': {
    icon: Rocket,
    description: 'Auth, billing, and real SaaS foundations',
  },
  '/ui': {
    icon: Layers3,
    description: 'Components and primitives',
  },
  '/ui/patterns': {
    icon: LayoutTemplate,
    description: 'SaaS product surfaces',
  },
  '/ui/examples': {
    icon: BookOpen,
    description: 'Real UI usage in context',
  },
};

function ProductPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
      {children}
    </span>
  );
}

export function SiteHeader({ docsLinks = [] }: SiteHeaderProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProductsOpen, setIsProductsOpen] = React.useState(false);

  const openBtnRef = React.useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = React.useRef<HTMLAnchorElement>(null);
  const mobileNavRef = React.useRef<HTMLDialogElement>(null);
  const productsMenuRef = React.useRef<HTMLDivElement>(null);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeProductsMenu = React.useCallback(() => {
    setIsProductsOpen(false);
  }, []);

  React.useEffect(() => {
    closeMenu();
    closeProductsMenu();
  }, [pathname, closeMenu, closeProductsMenu]);

  const activeHref = React.useMemo(() => {
    if (!pathname) return null;

    const matches = PRIMARY_NAV_ITEMS.filter((item) =>
      matchPathname(pathname, item.href),
    );

    matches.sort((a, b) => b.href.length - a.href.length);
    return matches[0]?.href ?? null;
  }, [pathname]);

  const activeProductHref = React.useMemo(
    () => getActiveProductHref(pathname),
    [pathname],
  );

  const isProductsCurrent = React.useMemo(
    () => isProductsActive(pathname),
    [pathname],
  );

  React.useEffect(() => {
    if (!isProductsOpen) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node | null;
      if (!productsMenuRef.current?.contains(target)) {
        closeProductsMenu();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeProductsMenu();
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isProductsOpen, closeProductsMenu]);

  React.useEffect(() => {
    if (!isMenuOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        openBtnRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab') return;

      const container = mobileNavRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(','),
        ),
      ).filter(
        (element) =>
          !element.hasAttribute('disabled') &&
          element.getAttribute('aria-hidden') !== 'true',
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  React.useEffect(() => {
    if (!isMenuOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;

    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousOverflow = body.style.overflow;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      mobileNavRef.current?.focus();
      firstMobileLinkRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => {
      window.clearTimeout(timer);

      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      body.style.overflow = previousOverflow;

      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  const mobileSections = React.useMemo<MobileMenuSection[]>(() => {
    const productItems: MobileMenuItem[] =
      PRODUCT_MENU_GROUPS.flatMap((group) =>
        group.items.map((item) => ({
          label: item.label,
          href: item.href,
          badge: item.badge,
          icon: PRODUCT_MENU_META[item.href]?.icon ? (
            React.createElement(PRODUCT_MENU_META[item.href].icon, {
              'aria-hidden': true,
              className: 'h-4 w-4',
            })
          ) : (
            <Package2 aria-hidden="true" className="h-4 w-4" />
          ),
        })),
      );

    const resourceItems: MobileMenuItem[] = [
      {
        label: 'Docs',
        href: '/docs',
        icon: <BookOpen aria-hidden="true" className="h-4 w-4" />,
      },
      {
        label: 'Blog',
        href: '/blog',
        icon: <FileText aria-hidden="true" className="h-4 w-4" />,
      },
      ...docsLinks.map((doc) => ({
        label: doc.label,
        href: doc.href,
        icon: <ChevronRight aria-hidden="true" className="h-4 w-4" />,
      })),
    ];

    const proofItems: MobileMenuItem[] = [
      {
        label: 'GitHub',
        href: 'https://github.com/pycolors',
        icon: <Github aria-hidden="true" className="h-4 w-4" />,
      },
      {
        label: 'Pricing',
        href: '/pricing',
        icon: <Sparkles aria-hidden="true" className="h-4 w-4" />,
      },
      {
        label: 'Changelog',
        href: '/changelog',
        icon: <ChevronRight aria-hidden="true" className="h-4 w-4" />,
      },
    ];

    return [
      { title: 'Products', items: productItems },
      { title: 'Resources', items: resourceItems },
      { title: 'Proof', items: proofItems },
    ];
  }, [docsLinks]);

  const mobileActiveHref = React.useMemo(() => {
    const allMobileHrefs = mobileSections.flatMap((section) =>
      section.items
        .filter((item) => item.href.startsWith('/'))
        .map((item) => item.href),
    );

    return getMostSpecificActiveHref(pathname, allMobileHrefs);
  }, [pathname, mobileSections]);

  const showDocsSearch =
    pathname === '/docs' || pathname.startsWith('/docs/');

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-background/55 backdrop-blur-md',
        )}
      >
        <a
          href="#content"
          className={cn(
            'sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60]',
            'rounded-md border border-border bg-background px-3 py-2 text-sm',
            focusRing,
          )}
        >
          Skip to content
        </a>
        <Container>
          <section className="flex h-16 items-center gap-3">
            <div className="flex shrink-0 items-center gap-3">
              <Logo />
            </div>

            <nav
              aria-label="Primary"
              className="ml-4 hidden flex-1 items-center gap-1 text-sm font-medium md:flex"
            >
              <div ref={productsMenuRef} className="relative">
                <button
                  type="button"
                  aria-expanded={isProductsOpen}
                  aria-haspopup="menu"
                  aria-controls="products-menu"
                  onClick={() => setIsProductsOpen((prev) => !prev)}
                  className={cn(
                    'inline-flex items-center rounded-xl px-3 py-2 transition-all duration-200',
                    'text-muted-foreground hover:bg-accent/40 hover:text-foreground',
                    isProductsCurrent &&
                      'bg-accent/40 text-foreground',
                    isProductsOpen &&
                      'bg-accent/40 text-foreground shadow-sm',
                    focusRing,
                  )}
                >
                  Products
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'ml-1.5 h-4 w-4 transition-transform duration-200',
                      isProductsOpen && 'rotate-180',
                    )}
                  />
                </button>

                <div
                  id="products-menu"
                  role="menu"
                  aria-label="Products"
                  className={cn(
                    'absolute left-0 top-full mt-4 w-[640px] origin-top-left overflow-hidden rounded-[28px] border border-border/70 bg-background shadow-2xl shadow-black/10 backdrop-blur-2xl transition-all duration-200',
                    isProductsOpen
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-2 opacity-0',
                  )}
                >
                  <div className="p-3">
                    <div className="grid gap-2 md:grid-cols-2">
                      {PRODUCT_MENU_GROUPS.map((group) => (
                        <div key={group.title} className="space-y-2">
                          {group.items.map((item) => {
                            const isCurrent =
                              activeProductHref === item.href;
                            const meta = PRODUCT_MENU_META[item.href];
                            const Icon = meta?.icon ?? Package2;

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                role="menuitem"
                                className={cn(
                                  'group flex items-start gap-3 rounded-[20px] border border-transparent px-3 py-3 transition-all duration-200',
                                  isCurrent
                                    ? 'bg-accent/50 shadow-sm'
                                    : 'hover:bg-accent/30',
                                  focusRing,
                                )}
                              >
                                <span
                                  className={cn(
                                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-border/60 bg-muted/20 transition-colors',
                                    isCurrent && 'bg-background',
                                  )}
                                >
                                  <Icon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </span>

                                <span className="min-w-0 flex-1">
                                  <span className="flex items-center justify-between gap-3">
                                    <span className="truncate text-sm font-semibold tracking-tight text-foreground">
                                      {item.label}
                                    </span>

                                    {item.badge ? (
                                      <span className="inline-flex shrink-0 rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground">
                                        {item.badge}
                                      </span>
                                    ) : null}
                                  </span>

                                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                    {meta?.description ?? ''}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/70 bg-muted/10 px-3 py-2.5">
                    <Link
                      href="/pricing"
                      className={cn(
                        'group flex items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-accent/30',
                        focusRing,
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground">
                          New
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          Starter Pro launch offer · 199 €
                        </span>
                      </span>

                      <ChevronRight
                        className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {PRIMARY_NAV_ITEMS.filter(
                (item) => item.label !== 'Products',
              ).map((item) => {
                const isCurrent = activeHref === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={cn(
                      'rounded-xl px-3 py-2 transition-all duration-200',
                      'text-muted-foreground hover:bg-accent/40 hover:text-foreground',
                      isCurrent && 'bg-accent/40 text-foreground',
                      focusRing,
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              {showDocsSearch ? (
                <LargeSearchToggle className="w-48 xl:w-56" />
              ) : null}

              {/* <ThemeToggle
                mode="light-dark"
                className="inline-flex h-9 items-center rounded-full border-none px-1"
              /> */}

              <Button
                asChild
                size="sm"
                className="h-10 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/starters/pro">
                  Get Starter Pro
                  {/* <ArrowRight
                    aria-hidden="true"
                    className="ml-1 h-4 w-4"
                  /> */}
                </Link>
              </Button>
            </div>

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <ThemeToggle
                mode="light-dark"
                className="inline-flex h-9 items-center rounded-full border px-1"
              />

              <button
                ref={openBtnRef}
                type="button"
                onClick={toggleMenu}
                aria-label={
                  isMenuOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/80',
                  focusRing,
                )}
              >
                {isMenuOpen ? (
                  <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Menu aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
            </div>
          </section>
        </Container>
      </header>

      {isMenuOpen && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            style={{ top: HEADER_HEIGHT }}
          />

          <dialog
            ref={mobileNavRef}
            id="mobile-navigation"
            open
            aria-labelledby="mobile-navigation-title"
            className={cn(
              'fixed inset-x-0 z-50 m-0 flex w-screen max-w-none flex-col overflow-hidden border-t border-border bg-background p-0 text-inherit md:hidden',
              'backdrop:hidden',
            )}
            style={{
              top: HEADER_HEIGHT,
              height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
            }}
          >
            <h2 id="mobile-navigation-title" className="sr-only">
              Mobile navigation
            </h2>

            <div
              className={cn(
                'min-h-0 flex-1 overflow-y-auto overscroll-contain',
                '[-webkit-overflow-scrolling:touch]',
              )}
            >
              <div className="px-4 pb-6 pt-4">
                <div className="flex min-w-0 flex-col gap-6 pb-6">
                  <div className="rounded-[24px] border border-border/60 bg-muted/20 p-4">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-foreground">
                        PyColors
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <ProductPill>Products</ProductPill>
                        <ProductPill>Pricing</ProductPill>
                        <ProductPill>Docs</ProductPill>
                      </div>
                    </div>
                  </div>

                  {mobileSections.map((section, sectionIndex) => (
                    <section
                      key={section.title}
                      className="rounded-[24px] border border-border/60 bg-muted/20 p-3"
                    >
                      <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {section.title}
                      </p>

                      <nav
                        aria-label={section.title}
                        className="flex flex-col gap-1"
                      >
                        {section.items.map((item, itemIndex) => {
                          const isCurrent =
                            item.href.startsWith('/') &&
                            mobileActiveHref === item.href;
                          const isExternal =
                            item.href.startsWith('http');

                          return (
                            <Link
                              key={`${section.title}-${item.href}-${item.label}`}
                              href={item.href}
                              ref={
                                sectionIndex === 0 && itemIndex === 0
                                  ? firstMobileLinkRef
                                  : undefined
                              }
                              aria-current={
                                isCurrent ? 'page' : undefined
                              }
                              target={
                                isExternal ? '_blank' : undefined
                              }
                              rel={
                                isExternal
                                  ? 'noreferrer noopener'
                                  : undefined
                              }
                              onClick={closeMenu}
                              className={cn(
                                'group flex items-center justify-between rounded-2xl px-3 py-3 transition-all duration-200',
                                isCurrent
                                  ? 'bg-accent text-foreground shadow-sm'
                                  : 'text-muted-foreground hover:bg-background hover:text-foreground',
                                focusRing,
                              )}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background"
                                >
                                  {item.icon}
                                </span>

                                <span className="truncate text-sm font-medium">
                                  {item.label}
                                </span>
                              </span>

                              <span className="flex items-center gap-2">
                                {item.badge ? (
                                  <span className="inline-flex rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground">
                                    {item.badge}
                                  </span>
                                ) : null}

                                <ChevronRight
                                  aria-hidden="true"
                                  className="h-4 w-4 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                              </span>
                            </Link>
                          );
                        })}
                      </nav>
                    </section>
                  ))}

                  <div className="rounded-[24px] border border-border/60 bg-muted/20 p-4">
                    <p className="text-sm font-semibold text-foreground">
                      Why PyColors
                    </p>

                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        • Build from product surfaces, not isolated UI
                      </li>
                      <li>• Validate fast with Starter Free</li>
                      <li>
                        • Upgrade when the business layer matters
                      </li>
                    </ul>

                    {showDocsSearch ? (
                      <div className="mt-4">
                        <LargeSearchToggle className="w-full" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-background/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 backdrop-blur">
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center rounded-xl"
                >
                  <Link href="/starters/free" onClick={closeMenu}>
                    Starter Free
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full justify-center rounded-xl shadow-sm"
                >
                  <Link href="/starters/pro" onClick={closeMenu}>
                    Get Starter Pro
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-2 h-4 w-4"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}

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

type SiteHeaderProps = Readonly<{
  docsLinks?: DocsLink[];
}>;

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
    description: 'Compare Free and Pro',
  },
  '/starters/free': {
    icon: Sparkles,
    description: 'Validate product UX fast',
  },
  '/starters/pro': {
    icon: Rocket,
    description: 'Launch with auth and billing',
  },
  '/ui': {
    icon: Layers3,
    description: 'Tokens and primitives',
  },
  '/ui/patterns': {
    icon: LayoutTemplate,
    description: 'Production-shaped SaaS surfaces',
  },
  '/ui/examples': {
    icon: BookOpen,
    description: 'See usage in context',
  },
};

function ProductPill({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="inline-flex rounded-[5px] border border-border-subtle bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {children}
    </span>
  );
}

export function SiteHeader({ docsLinks = [] }: SiteHeaderProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProductsOpen, setIsProductsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const openBtnRef = React.useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = React.useRef<HTMLAnchorElement>(null);
  const mobileNavRef = React.useRef<HTMLDialogElement>(null);
  const productsMenuRef = React.useRef<HTMLDivElement>(null);
  const closeProductsTimeoutRef = React.useRef<number | null>(null);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const openProductsMenu = React.useCallback(() => {
    if (closeProductsTimeoutRef.current) {
      window.clearTimeout(closeProductsTimeoutRef.current);
    }

    setIsProductsOpen(true);
  }, []);

  const closeProductsMenu = React.useCallback(() => {
    if (closeProductsTimeoutRef.current) {
      window.clearTimeout(closeProductsTimeoutRef.current);
    }

    setIsProductsOpen(false);
  }, []);

  const closeProductsMenuWithDelay = React.useCallback(() => {
    closeProductsTimeoutRef.current = window.setTimeout(() => {
      setIsProductsOpen(false);
    }, 140);
  }, []);

  React.useEffect(() => {
    closeMenu();
    closeProductsMenu();
  }, [pathname, closeMenu, closeProductsMenu]);

  React.useEffect(() => {
    return () => {
      if (closeProductsTimeoutRef.current) {
        window.clearTimeout(closeProductsTimeoutRef.current);
      }
    };
  }, []);

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
      if (event.key === 'Escape') closeProductsMenu();
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
              className: 'h-3.5 w-3.5',
            })
          ) : (
            <Package2 aria-hidden="true" className="h-3.5 w-3.5" />
          ),
        })),
      );

    const resourceItems: MobileMenuItem[] = [
      {
        label: 'Docs',
        href: '/docs',
        icon: <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />,
      },
      {
        label: 'Guides',
        href: '/guides',
        icon: <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />,
      },
      {
        label: 'Blog',
        href: '/blog',
        icon: <FileText aria-hidden="true" className="h-3.5 w-3.5" />,
      },
      ...docsLinks.map((doc) => ({
        label: doc.label,
        href: doc.href,
        icon: (
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
        ),
      })),
    ];

    const proofItems: MobileMenuItem[] = [
      {
        label: 'GitHub',
        href: 'https://github.com/pycolors',
        icon: <Github aria-hidden="true" className="h-3.5 w-3.5" />,
      },
      {
        label: 'Pricing',
        href: '/pricing',
        icon: <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />,
      },
      {
        label: 'Changelog',
        href: '/changelog',
        icon: (
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
        ),
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

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border-subtle bg-background/88 backdrop-blur-xl'
            : 'border-b border-transparent bg-background/70 backdrop-blur-md',
        )}
      >
        <div className="relative z-10 mx-auto max-w-fd-container">
          <a
            href="#content"
            className={cn(
              'sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60]',
              'rounded-[5px] border border-border-subtle bg-background px-3 py-2 text-sm',
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
                className="ml-4 hidden flex-1 items-center gap-1 text-[13px] font-medium md:flex"
              >
                <div
                  ref={productsMenuRef}
                  className="relative"
                  onMouseEnter={openProductsMenu}
                  onMouseLeave={closeProductsMenuWithDelay}
                >
                  <button
                    type="button"
                    aria-expanded={isProductsOpen}
                    aria-haspopup="menu"
                    aria-controls="products-menu"
                    onClick={() => setIsProductsOpen((prev) => !prev)}
                    onFocus={openProductsMenu}
                    className={cn(
                      'inline-flex items-center rounded-[5px] px-3 py-1.5 text-[13px] transition-colors duration-200',
                      'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                      (isProductsCurrent || isProductsOpen) &&
                        'bg-surface-muted text-foreground',
                      focusRing,
                    )}
                  >
                    Products
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'ml-1.5 h-3.5 w-3.5 transition-transform duration-200',
                        isProductsOpen && 'rotate-180',
                      )}
                    />
                  </button>

                  <div className="absolute left-0 top-full h-3 w-[40rem]" />

                  <div
                    id="products-menu"
                    role="menu"
                    aria-label="Products"
                    onMouseEnter={openProductsMenu}
                    className={cn(
                      'absolute left-0 top-[calc(100%+0.5rem)] w-[40rem] origin-top-left overflow-hidden rounded-[5px]',
                      'border border-border-subtle bg-background shadow-medium backdrop-blur-xl transition-all duration-150',
                      isProductsOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-1 opacity-0',
                    )}
                  >
                    <div className="p-2.5">
                      <div className="grid gap-2 md:grid-cols-2">
                        {PRODUCT_MENU_GROUPS.map((group) => (
                          <div
                            key={group.title}
                            className="space-y-1"
                          >
                            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                              {group.title}
                            </p>

                            {group.items.map((item) => {
                              const isCurrent =
                                activeProductHref === item.href;
                              const meta =
                                PRODUCT_MENU_META[item.href];
                              const Icon = meta?.icon ?? Package2;

                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  role="menuitem"
                                  className={cn(
                                    'group flex items-start gap-2.5 rounded-[5px] border border-transparent px-2.5 py-2.5 transition-colors duration-150',
                                    isCurrent
                                      ? 'border-border-subtle bg-surface-muted'
                                      : 'hover:bg-surface-muted',
                                    focusRing,
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface transition-colors duration-150',
                                      'group-hover:bg-background',
                                      isCurrent && 'bg-background',
                                    )}
                                  >
                                    <Icon
                                      className={cn(
                                        'h-3.5 w-3.5 text-muted-foreground transition-colors duration-150',
                                        'group-hover:text-primary',
                                        isCurrent && 'text-primary',
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>

                                  <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-2">
                                      <span className="truncate text-[13px] font-medium text-foreground">
                                        {item.label}
                                      </span>

                                      {item.badge ? (
                                        <span className="inline-flex shrink-0 rounded-[5px] border border-border-subtle bg-surface px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                                          {item.badge}
                                        </span>
                                      ) : null}
                                    </span>

                                    {meta?.description ? (
                                      <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                                        {meta.description}
                                      </span>
                                    ) : null}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border-subtle bg-surface-muted px-2.5 py-2">
                      <Link
                        href="/pricing"
                        className={cn(
                          'group flex items-center justify-between rounded-[5px] px-2.5 py-2 text-[13px] transition-colors hover:bg-surface',
                          focusRing,
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            See pricing
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Starter Pro from 199 €
                          </span>
                        </span>

                        <ChevronRight
                          className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
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
                        'rounded-[5px] px-3 py-1.5 text-[13px] transition-colors duration-200',
                        'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                        isCurrent &&
                          'bg-surface-muted text-foreground',
                        focusRing,
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <Button
                  asChild
                  size="sm"
                  className="h-9 rounded-[5px] px-4 text-[13px] font-medium"
                >
                  <Link href="/starters/pro">
                    Explore Pro
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    />
                  </Link>
                </Button>
              </div>

              <div className="ml-auto flex items-center gap-2 md:hidden">
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
                    'inline-flex h-9 w-9 items-center justify-center rounded-[5px] border border-border-subtle bg-surface',
                    focusRing,
                  )}
                >
                  {isMenuOpen ? (
                    <X aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Menu aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </div>
            </section>
          </Container>
        </div>
      </header>

      {isMenuOpen ? (
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
              'fixed inset-x-0 z-50 m-0 flex w-screen max-w-none flex-col overflow-hidden border-t border-border-subtle bg-background p-0 text-inherit md:hidden',
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
                <div className="space-y-5">
                  <div className="rounded-[5px] border border-border-subtle bg-surface p-4 shadow-soft">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold tracking-tight text-foreground">
                          PyColors
                        </p>

                        <p className="text-sm leading-6 text-muted-foreground">
                          Build faster with product-shaped starters,
                          UI primitives, and production-ready SaaS
                          foundations.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <ProductPill>Products</ProductPill>
                        <ProductPill>Pricing</ProductPill>
                        <ProductPill>Docs</ProductPill>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-3">
                        <span className="text-xs font-medium text-muted-foreground">
                          Theme
                        </span>

                        <ThemeToggle
                          mode="light-dark"
                          className="inline-flex h-9 items-center rounded-[5px] border border-border-subtle bg-surface-muted px-1 shadow-soft"
                        />
                      </div>
                    </div>
                  </div>

                  {mobileSections.map((section, sectionIndex) => (
                    <section
                      key={section.title}
                      className="border-t border-border-subtle pt-4"
                    >
                      <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
                                'group flex items-center justify-between rounded-[5px] px-2.5 py-2 text-sm transition-colors duration-150',
                                isCurrent
                                  ? 'bg-surface-muted text-foreground'
                                  : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                                focusRing,
                              )}
                            >
                              <span className="flex min-w-0 items-center gap-2.5">
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface transition-colors',
                                    isCurrent && 'bg-background',
                                  )}
                                >
                                  {item.icon}
                                </span>

                                <span className="truncate text-[13px] font-medium">
                                  {item.label}
                                </span>
                              </span>

                              <span className="flex items-center gap-2">
                                {item.badge ? (
                                  <span className="inline-flex rounded-[5px] border border-border-subtle bg-surface px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                                    {item.badge}
                                  </span>
                                ) : null}

                                <ChevronRight
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5 opacity-50 transition-transform duration-150 group-hover:translate-x-0.5"
                                />
                              </span>
                            </Link>
                          );
                        })}
                      </nav>
                    </section>
                  ))}

                  <section className="border-t border-border-subtle pt-4">
                    <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Why PyColors
                    </p>

                    <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                      <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                        <li>
                          Build from product surfaces, not isolated
                          UI.
                        </li>
                        <li>Validate fast with Starter Free.</li>
                        <li>
                          Upgrade when the business layer matters.
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div className="border-t border-border-subtle bg-background/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 backdrop-blur">
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center rounded-[5px]"
                >
                  <Link href="/starters/free" onClick={closeMenu}>
                    Starter Free
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full justify-center rounded-[5px] shadow-soft"
                >
                  <Link href="/starters/pro" onClick={closeMenu}>
                    Explore Starter Pro
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
      ) : null}
    </>
  );
}

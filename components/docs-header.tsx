'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Layers3,
  Menu,
  Rocket,
  Sparkles,
  X,
} from 'lucide-react';
import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';

import { Container } from '@/components/container';
import { Button, cn } from '@pycolors/ui';
import { Logo } from '@/components/logo';

type DocsLink = Readonly<{
  label: string;
  href: string;
}>;

type DocsHeaderProps = Readonly<{
  docsLinks?: DocsLink[];
}>;

type DocsNavItem = Readonly<{
  label: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
}>;

const DOCS_NAV_ITEMS: DocsNavItem[] = [
  {
    label: 'Docs',
    href: '/docs',
    icon: BookOpen,
    description: 'Start here',
  },
  {
    label: 'UI',
    href: '/docs/ui',
    icon: Layers3,
    description: 'Primitives and tokens',
  },
  {
    label: 'Starter',
    href: '/docs/starter',
    icon: Sparkles,
    description: 'Validate fast',
  },
  {
    label: 'Starter Pro',
    href: '/docs/starter-pro',
    icon: Rocket,
    description: 'Production foundations',
  },
];

const FEATURED_DOCS_HREFS = [
  '/docs/starter/installation',
  '/docs/guides',
  '/docs/starter/project-structure',
  '/docs/starter/first-feature',
  '/docs/starter-pro',
  '/docs/starter-pro/upgrade-from-free',
  '/docs/patterns',
  '/docs/starter/upgrade-to-pro',
  '/docs/starter-pro/what-is-included',
] as const;

const HEADER_HEIGHT = 64;

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

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

export function DocsHeader({ docsLinks = [] }: DocsHeaderProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDocsOpen, setIsDocsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const openBtnRef = React.useRef<HTMLButtonElement>(null);
  const mobileNavRef = React.useRef<HTMLDialogElement>(null);
  const firstMobileLinkRef = React.useRef<HTMLAnchorElement>(null);
  const docsMenuRef = React.useRef<HTMLDivElement>(null);
  const closeDocsTimeoutRef = React.useRef<number | null>(null);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const openDocsMenu = React.useCallback(() => {
    if (closeDocsTimeoutRef.current) {
      window.clearTimeout(closeDocsTimeoutRef.current);
    }

    setIsDocsOpen(true);
  }, []);

  const closeDocsMenu = React.useCallback(() => {
    if (closeDocsTimeoutRef.current) {
      window.clearTimeout(closeDocsTimeoutRef.current);
    }

    setIsDocsOpen(false);
  }, []);

  const closeDocsMenuWithDelay = React.useCallback(() => {
    closeDocsTimeoutRef.current = window.setTimeout(() => {
      setIsDocsOpen(false);
    }, 160);
  }, []);

  React.useEffect(() => {
    closeMenu();
    closeDocsMenu();
  }, [pathname, closeMenu, closeDocsMenu]);

  React.useEffect(() => {
    return () => {
      if (closeDocsTimeoutRef.current) {
        window.clearTimeout(closeDocsTimeoutRef.current);
      }
    };
  }, []);

  const activeHref = React.useMemo(() => {
    return getMostSpecificActiveHref(
      pathname,
      DOCS_NAV_ITEMS.map((item) => item.href),
    );
  }, [pathname]);

  const featuredDocsLinks = React.useMemo(() => {
    const curated = FEATURED_DOCS_HREFS.map((href) =>
      docsLinks.find((item) => item.href === href),
    ).filter(Boolean) as DocsLink[];

    return curated.length > 0 ? curated : docsLinks.slice(0, 7);
  }, [docsLinks]);

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

  React.useEffect(() => {
    if (!isDocsOpen) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node | null;

      if (!docsMenuRef.current?.contains(target)) {
        closeDocsMenu();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeDocsMenu();
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isDocsOpen, closeDocsMenu]);

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

  return (
    <>
      <header
        className={cn(
          'w-full border-b transition-colors duration-200',
          scrolled
            ? 'border-border/60 bg-background/85 backdrop-blur-xl'
            : 'border-border/50 bg-background',
        )}
      >
        <div className="relative z-10 mx-auto max-w-fd-container">
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
                aria-label="Documentation"
                className="ml-4 hidden flex-1 items-center gap-1 text-[13px] font-medium md:flex"
              >
                <div
                  ref={docsMenuRef}
                  className="relative"
                  onMouseEnter={openDocsMenu}
                  onMouseLeave={closeDocsMenuWithDelay}
                >
                  <button
                    type="button"
                    aria-expanded={isDocsOpen}
                    aria-haspopup="menu"
                    aria-controls="docs-menu"
                    onClick={() => setIsDocsOpen((prev) => !prev)}
                    onFocus={openDocsMenu}
                    className={cn(
                      'inline-flex items-center rounded-md px-3 py-1.5 text-[13px] transition-colors duration-150',
                      'text-muted-foreground hover:bg-accent/20 hover:text-foreground',
                      activeHref === '/docs' &&
                        'bg-accent/25 text-foreground',
                      isDocsOpen && 'bg-accent/25 text-foreground',
                      focusRing,
                    )}
                  >
                    Docs
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'ml-1.5 h-3.5 w-3.5 transition-transform duration-150',
                        isDocsOpen && 'rotate-180',
                      )}
                    />
                  </button>

                  <div className="absolute left-0 top-full h-3 w-[38rem]" />

                  <div
                    id="docs-menu"
                    role="menu"
                    aria-label="Documentation menu"
                    onMouseEnter={openDocsMenu}
                    className={cn(
                      'absolute left-0 top-[calc(100%+0.5rem)] w-[38rem] origin-top-left overflow-hidden rounded-xl border border-border/70 bg-background shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-150',
                      isDocsOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-1 opacity-0',
                    )}
                  >
                    <div className="grid gap-3 p-3 md:grid-cols-[0.95fr_1.05fr]">
                      <div className="space-y-1">
                        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Sections
                        </p>

                        {DOCS_NAV_ITEMS.map((item) => {
                          const Icon = item.icon ?? BookOpen;
                          const isCurrent = activeHref === item.href;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              className={cn(
                                'group flex items-start gap-2.5 rounded-lg px-2.5 py-2.5 transition-colors duration-150',
                                isCurrent
                                  ? 'bg-accent/35 text-foreground'
                                  : 'text-muted-foreground hover:bg-accent/20 hover:text-foreground',
                                focusRing,
                              )}
                            >
                              <span
                                className={cn(
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background/70 transition-all duration-150',
                                  'group-hover:border-border group-hover:bg-background group-hover:shadow-sm',
                                  isCurrent &&
                                    'border-border bg-background shadow-sm',
                                )}
                              >
                                <Icon
                                  aria-hidden="true"
                                  className={cn(
                                    'h-3.5 w-3.5 text-muted-foreground transition-all duration-150',
                                    'group-hover:scale-105 group-hover:text-foreground',
                                    isCurrent && 'text-foreground',
                                  )}
                                />
                              </span>

                              <span className="min-w-0">
                                <span className="block truncate text-[13px] font-medium">
                                  {item.label}
                                </span>

                                {item.description ? (
                                  <span className="mt-0.5 block truncate text-[11px] leading-4 text-muted-foreground">
                                    {item.description}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="space-y-1">
                        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Quick links
                        </p>

                        <div className="max-h-60 overflow-auto pr-1">
                          {featuredDocsLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              className={cn(
                                'group flex items-center justify-between rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-150',
                                'text-muted-foreground hover:bg-accent/20 hover:text-foreground',
                                focusRing,
                              )}
                            >
                              <span className="truncate">
                                {item.label}
                              </span>

                              <ChevronRight
                                className="h-3 w-3 opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-60"
                                aria-hidden="true"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border/60 bg-muted/10 px-2.5 py-2">
                      <Link
                        href="/pricing"
                        className={cn(
                          'group flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] transition-colors hover:bg-accent/20',
                          focusRing,
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="inline-flex shrink-0 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                            Pro
                          </span>

                          <span className="font-medium text-foreground">
                            View pricing
                          </span>

                          <span className="hidden text-[11px] text-muted-foreground lg:inline">
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

                {DOCS_NAV_ITEMS.slice(1).map((item) => {
                  const isCurrent = activeHref === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={cn(
                        'rounded-md px-3 py-1.5 text-[13px] transition-colors duration-150',
                        'text-muted-foreground hover:bg-accent/20 hover:text-foreground',
                        isCurrent && 'bg-accent/25 text-foreground',
                        focusRing,
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <LargeSearchToggle className="w-44 xl:w-52" />

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-md px-3.5 text-[13px] font-medium"
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
                <ThemeToggle
                  mode="light-dark"
                  className="inline-flex h-9 items-center rounded-md border px-1"
                />

                <button
                  ref={openBtnRef}
                  type="button"
                  onClick={toggleMenu}
                  aria-label={
                    isMenuOpen
                      ? 'Close documentation menu'
                      : 'Open documentation menu'
                  }
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-docs-navigation"
                  className={cn(
                    'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/80',
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
            aria-label="Close documentation menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            style={{ top: HEADER_HEIGHT }}
          />

          <dialog
            ref={mobileNavRef}
            id="mobile-docs-navigation"
            open
            aria-labelledby="mobile-docs-navigation-title"
            className={cn(
              'fixed inset-x-0 z-50 m-0 flex w-screen max-w-none flex-col overflow-hidden border-t border-border bg-background p-0 text-inherit',
              'backdrop:hidden',
            )}
            style={{
              top: HEADER_HEIGHT,
              height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
            }}
          >
            <h2 id="mobile-docs-navigation-title" className="sr-only">
              Mobile documentation navigation
            </h2>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
              <div className="space-y-4 px-4 pb-6 pt-4">
                <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">
                      PyColors Docs
                    </p>

                    <p className="text-sm leading-6 text-muted-foreground">
                      Browse UI, patterns, Starter Free, and Starter
                      Pro documentation.
                    </p>

                    <div className="pt-1">
                      <LargeSearchToggle className="w-full" />
                    </div>
                  </div>
                </div>

                <nav
                  aria-label="Documentation navigation"
                  className="flex flex-col gap-1.5"
                >
                  {DOCS_NAV_ITEMS.map((item, index) => {
                    const isCurrent = activeHref === item.href;
                    const Icon = item.icon ?? BookOpen;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        ref={
                          index === 0 ? firstMobileLinkRef : undefined
                        }
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={closeMenu}
                        className={cn(
                          'group flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-2.5 text-sm transition-colors duration-150',
                          isCurrent
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:bg-background hover:text-foreground',
                          focusRing,
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className={cn(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background/70 transition-colors',
                              isCurrent && 'bg-background',
                            )}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>

                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-medium">
                              {item.label}
                            </span>

                            {item.description ? (
                              <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                                {item.description}
                              </span>
                            ) : null}
                          </span>
                        </span>

                        <ChevronRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    );
                  })}
                </nav>

                {docsLinks.length > 0 ? (
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                    <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      All docs
                    </p>

                    <nav
                      aria-label="All documentation links"
                      className="flex max-h-[18rem] flex-col gap-1 overflow-auto pr-1"
                    >
                      {docsLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className={cn(
                            'rounded-md px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-background hover:text-foreground',
                            focusRing,
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-border bg-background/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 backdrop-blur">
              <Button
                asChild
                className="w-full justify-center rounded-md"
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
          </dialog>
        </div>
      ) : null}
    </>
  );
}

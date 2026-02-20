'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

import { Container } from '@/components/container';
import { cn } from '@pycolors/ui';
import { UI_VERSION, APP_VERSION } from '@/lib/version';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const CURRENT_YEAR = new Date().getFullYear();

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

const GROUPS: Array<{
  title: string;
  links: FooterLink[];
}> = [
  {
    title: 'Product',
    links: [
      { label: 'UI', href: '/ui' },
      { label: 'Templates', href: '/templates' },
      { label: 'Starters', href: '/starters' },
      { label: 'Docs', href: '/docs' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Components', href: '/docs/ui' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'License', href: '/license' },
      { label: 'About', href: '/about' },
      { label: 'Open Source', href: '/open-source' },
    ],
  },
];

const EXTERNAL: FooterLink[] = [
  {
    label: 'PyColors UI',
    href: 'https://github.com/pycolors-io/pycolors-ui',
    external: true,
    ariaLabel: 'Open PyColors UI repository on GitHub',
  },
  {
    label: 'Starter Free',
    href: 'https://github.com/pycolors-io/pycolors-starter-free',
    external: true,
    ariaLabel: 'Open PyColors Starter Free repository on GitHub',
  },
  {
    label: 'Website',
    href: 'https://github.com/pycolors-io/pycolors-marketing',
    external: true,
    ariaLabel: 'Open PyColors marketing website repository on GitHub',
  },
  {
    label: 'Gumroad',
    href: 'https://pycolors.gumroad.com',
    external: true,
    ariaLabel: 'Open PyColors on Gumroad (opens in a new tab)',
  },
];

function FooterLinkItem(link: FooterLink) {
  if (link.external) {
    return (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={
          link.ariaLabel ?? `${link.label} (opens in a new tab)`
        }
        className={cn(
          'inline-flex items-center gap-1 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
          focusRing,
        )}
      >
        {link.label}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      key={link.label}
      href={link.href}
      className={cn(
        'rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
        focusRing,
      )}
    >
      {link.label}
    </Link>
  );
}

function getFooterBrand(pathname: string | null) {
  if (!pathname)
    return { label: 'PyColors', suffix: `v${APP_VERSION}` };

  if (pathname === '/ui' || pathname.startsWith('/ui/')) {
    return {
      label: 'PyColors',
      suffix: `UI System · v${UI_VERSION}`,
    };
  }

  if (pathname === '/starters' || pathname.startsWith('/starters/')) {
    return {
      label: 'PyColors',
      suffix: 'Starters · Free demo available',
    };
  }

  if (
    pathname === '/templates' ||
    pathname.startsWith('/templates/')
  ) {
    return { label: 'PyColors', suffix: 'Templates · Premium-ready' };
  }

  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return { label: 'PyColors', suffix: 'Docs · Docs-first' };
  }

  return { label: 'PyColors', suffix: `v${APP_VERSION}` };
}

export function Footer() {
  const pathname = usePathname();
  const brand = getFooterBrand(pathname);

  return (
    <footer className="border-t border-border bg-background">
      <Container className="mx-auto max-w-6xl">
        <div className="py-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="font-brand text-lg font-semibold tracking-tight">
                    PyColors
                  </div>
                  <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                    Ship real SaaS in days, not months — with a
                    predictable UI system, production templates, and
                    starter foundations.
                  </p>
                </div>

                <nav
                  className="flex flex-wrap gap-x-5 gap-y-2"
                  aria-label="External links"
                >
                  {EXTERNAL.map(FooterLinkItem)}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-7 lg:flex lg:justify-end relative Z-10">
              <div className="grid gap-8 sm:grid-cols-3">
                {GROUPS.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <div className="text-sm font-medium text-foreground">
                      {group.title}
                    </div>
                    <nav
                      className="flex flex-col gap-2.5"
                      aria-label={`${group.title} links`}
                    >
                      {group.links.map(FooterLinkItem)}
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="text-xs text-muted-foreground">
              © {CURRENT_YEAR} {brand.label} · {brand.suffix}
            </div>

            <div className="text-[11px] text-muted-foreground">
              UI primitives are open source · Pro layers ship
              progressively.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

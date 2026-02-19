'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

import { Container } from '@/components/container';
import { cn, Button, Badge } from '@pycolors/ui';
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
    label: 'UI library',
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
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
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
    // Important: you already have Starter Free live, so don't say "Coming soon" here.
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
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Brand + CTA */}
            <div className="lg:col-span-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">Built in public</Badge>
                  <Badge variant="outline">Production-first</Badge>
                </div>

                <div className="space-y-1">
                  <div className="font-brand text-base font-semibold tracking-tight">
                    PyColors
                  </div>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Ship real SaaS in days, not months — with a
                    predictable UI system, production templates, and
                    starter foundations.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/starters/free">
                      Open Starter Free demo
                    </Link>
                  </Button>

                  <Button asChild size="sm" variant="outline">
                    <Link href="/ui">Explore UI</Link>
                  </Button>
                </div>

                <div className="pt-2">
                  <nav
                    className="flex flex-wrap gap-x-4 gap-y-2"
                    aria-label="External links"
                  >
                    {EXTERNAL.map(FooterLinkItem)}
                  </nav>
                </div>
              </div>
            </div>

            {/* Link groups */}
            <div className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
              {GROUPS.map((group) => (
                <div key={group.title} className="space-y-3">
                  <div className="text-xs font-medium text-foreground">
                    {group.title}
                  </div>
                  <nav
                    className="flex flex-col gap-2"
                    aria-label={`${group.title} links`}
                  >
                    {group.links.map(FooterLinkItem)}
                  </nav>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="text-[11px] text-muted-foreground">
              © {CURRENT_YEAR} {brand.label} · {brand.suffix}
            </div>

            <div className="text-[11px] text-muted-foreground">
              UI primitives are open-source · Pro layers ship
              progressively.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

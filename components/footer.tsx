'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

import { Container } from '@/components/container';
import { cn } from '@pycolors/ui';
import { APP_VERSION } from '@/lib/version';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const CURRENT_YEAR = new Date().getFullYear();

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

const links: FooterLink[] = [
  // Product navigation
  { label: 'Starters', href: '/starters' },
  { label: 'Templates', href: '/templates' },
  { label: 'UI', href: '/ui' },
  { label: 'Docs', href: '/docs' },

  // Explore
  { label: 'Components', href: '/docs/ui' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Roadmap', href: '/roadmap' },

  // Trust
  { label: 'License', href: '/license' },
  { label: 'About', href: '/about' },

  // External
  {
    label: 'GitHub',
    href: 'https://github.com/pycolors-io/pycolors-ui',
    external: true,
    ariaLabel: 'Open PyColors UI on GitHub (opens in a new tab)',
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
  if (!pathname) {
    return {
      label: 'PyColors.io',
      suffix: `UI · v${APP_VERSION}`,
    };
  }

  if (pathname === '/ui' || pathname.startsWith('/ui/')) {
    return {
      label: 'PyColors.io',
      suffix: `UI · v${APP_VERSION}`,
    };
  }

  if (pathname === '/starters' || pathname.startsWith('/starters/')) {
    return {
      label: 'PyColors.io',
      suffix: 'SaaS Starter · Coming soon',
    };
  }

  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return {
      label: 'PyColors.io',
      suffix: 'Docs · Docs-first',
    };
  }

  return {
    label: 'PyColors.io',
    suffix: `v${APP_VERSION}`,
  };
}

export function Footer() {
  const pathname = usePathname();
  const brand = getFooterBrand(pathname);

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <nav
            className="flex flex-wrap justify-center gap-x-4 gap-y-2"
            aria-label="Footer navigation"
          >
            {links.map(FooterLinkItem)}
          </nav>

          <div className="text-[11px] text-muted-foreground">
            © {CURRENT_YEAR} {brand.label} · {brand.suffix}
          </div>
        </div>
      </Container>
    </footer>
  );
}

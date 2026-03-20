'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, cn } from '@pycolors/ui';
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
    title: 'Start',
    links: [
      { label: 'Starter Free', href: '/starters/free' },
      { label: 'Access', href: '/access' },
      { label: 'Upgrade to PRO', href: '/upgrade' },
      { label: 'PRO Waitlist', href: '/waitlist' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Guides', href: '/guides' },
      { label: 'Blog', href: '/blog' },
      { label: 'Patterns', href: '/ui/patterns' },
      { label: 'Examples', href: '/examples' },
      { label: 'Starter docs', href: '/docs/saas-starter' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'UI System', href: '/ui' },
      { label: 'Starters', href: '/starters' },
      { label: 'Templates', href: '/templates' },
      { label: 'UI Docs', href: '/docs/ui' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'License', href: '/license' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Open Source', href: '/open-source' },
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
          'inline-flex items-center gap-1 rounded-sm text-xs leading-5 text-muted-foreground transition-colors hover:text-foreground',
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
        'inline-block rounded-sm text-xs leading-5 text-muted-foreground transition-colors hover:text-foreground',
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
      label: 'PyColors',
      suffix: `v${APP_VERSION}`,
      context:
        'Production-shaped SaaS ecosystem. Built to help developers ship product surfaces faster and move toward a premium, production-ready SaaS foundation.',
    };
  }

  if (
    pathname === '/ui/patterns' ||
    pathname.startsWith('/ui/patterns')
  ) {
    return {
      label: 'PyColors',
      suffix: 'Patterns · SaaS surfaces',
      context:
        'Move from primitives to production-shaped product patterns.',
    };
  }

  if (pathname === '/ui' || pathname.startsWith('/ui/')) {
    return {
      label: 'PyColors',
      suffix: `UI System · v${UI_VERSION}`,
      context: 'A predictable UI foundation for real SaaS products.',
    };
  }

  if (pathname === '/examples' || pathname.startsWith('/examples')) {
    return {
      label: 'PyColors',
      suffix: 'Examples · Product showcase',
      context: 'See real SaaS surfaces and product directions.',
    };
  }

  if (pathname === '/guides' || pathname.startsWith('/guides')) {
    return {
      label: 'PyColors',
      suffix: 'Guides · SaaS knowledge base',
      context: 'Learn the product logic behind modern SaaS systems.',
    };
  }

  if (pathname === '/access' || pathname.startsWith('/access')) {
    return {
      label: 'PyColors',
      suffix: 'Access · Pricing direction',
      context:
        'Choose the path that matches your current bottleneck.',
    };
  }

  if (pathname === '/starters' || pathname.startsWith('/starters/')) {
    return {
      label: 'PyColors',
      suffix: 'Starters · Free available',
      context: 'Validate UX first, wire the business layer later.',
    };
  }

  if (pathname === '/upgrade' || pathname.startsWith('/upgrade')) {
    return {
      label: 'PyColors',
      suffix: 'PRO · Coming soon',
      context: 'Upgrade when wiring becomes the bottleneck.',
    };
  }

  if (pathname === '/waitlist' || pathname.startsWith('/waitlist')) {
    return {
      label: 'PyColors',
      suffix: 'Waitlist · Early access',
      context: 'Join the premium path before launch.',
    };
  }

  if (
    pathname === '/templates' ||
    pathname.startsWith('/templates/')
  ) {
    return {
      label: 'PyColors',
      suffix: 'Templates · Premium-ready',
      context: 'Ship polished surfaces faster.',
    };
  }

  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return {
      label: 'PyColors',
      suffix: 'Docs · Docs-first',
      context: 'Structure before complexity.',
    };
  }

  if (pathname === '/about' || pathname.startsWith('/about')) {
    return {
      label: 'PyColors',
      suffix: 'About · Ecosystem vision',
      context:
        'Built for learning, validating, and shipping real SaaS products.',
    };
  }

  if (
    pathname === '/open-source' ||
    pathname.startsWith('/open-source')
  ) {
    return {
      label: 'PyColors',
      suffix: 'Open Source · Public foundations',
      context: 'Open foundations first. Premium acceleration later.',
    };
  }

  return {
    label: 'PyColors',
    suffix: `v${APP_VERSION}`,
    context:
      'Production-shaped SaaS ecosystem. Built to help developers ship product surfaces faster and move toward a premium, production-ready SaaS foundation.',
  };
}

export function Footer() {
  const pathname = usePathname();
  const brand = getFooterBrand(pathname);

  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <Container className="mx-auto max-w-6xl lg:px-0">
        <div className="py-10 sm:py-12">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:pr-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="font-brand text-lg font-semibold tracking-tight">
                    {brand.label}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {brand.suffix}
                  </div>

                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {brand.context}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    UI v{UI_VERSION}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    App v{APP_VERSION}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Built in public
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">
                    Company
                  </div>

                  <nav
                    className="flex flex-wrap gap-x-4 gap-y-2"
                    aria-label="Company links"
                  >
                    {COMPANY_LINKS.map(FooterLinkItem)}
                  </nav>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 items-start gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {GROUPS.map((group) => (
                  <div
                    key={group.title}
                    className="min-w-0 space-y-3"
                  >
                    <div className="text-sm font-medium text-foreground">
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
          </div>

          <div className="mt-8 border-t border-border/60 pt-6">
            <nav
              className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
              aria-label="External links"
            >
              {EXTERNAL.map(FooterLinkItem)}
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="text-xs text-muted-foreground">
              © {CURRENT_YEAR} PyColors · {brand.suffix}
            </div>

            <div className="text-[11px] text-muted-foreground">
              Learn the product logic · Validate with Starter Free ·
              Upgrade when wiring matters
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

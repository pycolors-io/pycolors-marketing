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
      { label: 'Starter Pro', href: '/starters/pro' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Upgrade', href: '/upgrade' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Guides', href: '/guides' },
      { label: 'Patterns', href: '/ui/patterns' },
      { label: 'Examples', href: '/examples' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'UI System', href: '/ui' },
      { label: 'Starters', href: '/starters' },
      { label: 'Templates', href: '/templates' },
      { label: 'Starter docs', href: '/docs/starter' },
      { label: 'Starter Pro docs', href: '/docs/starter-pro' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
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
        'Production-first SaaS ecosystem built to help developers validate product surfaces first, then move toward real business wiring and launch-ready foundations.',
    };
  }

  if (
    pathname === '/starters/pro' ||
    pathname.startsWith('/starters/pro')
  ) {
    return {
      label: 'PyColors',
      suffix: 'Starter Pro · Launch-ready foundation',
      context:
        'Move from product-shaped validation to real auth, real billing, and a stronger SaaS baseline.',
    };
  }

  if (pathname === '/starters' || pathname.startsWith('/starters/')) {
    return {
      label: 'PyColors',
      suffix: 'Starters · Validation first',
      context:
        'Start with a credible product surface now, then upgrade when the business layer becomes the real bottleneck.',
    };
  }

  if (pathname === '/pricing' || pathname.startsWith('/pricing')) {
    return {
      label: 'PyColors',
      suffix: 'Pricing · Clear upgrade path',
      context:
        'Choose the path that matches your current bottleneck: validate with Free or move faster with Starter Pro.',
    };
  }

  if (pathname === '/upgrade' || pathname.startsWith('/upgrade')) {
    return {
      label: 'PyColors',
      suffix: 'Upgrade · Free to Pro',
      context:
        'Understand when Starter Free reaches its limit and when Starter Pro becomes the better business decision.',
    };
  }

  if (
    pathname === '/ui/patterns' ||
    pathname.startsWith('/ui/patterns')
  ) {
    return {
      label: 'PyColors',
      suffix: 'Patterns · Product surfaces',
      context:
        'Move from primitives to production-shaped SaaS patterns built for real product workflows.',
    };
  }

  if (pathname === '/ui' || pathname.startsWith('/ui/')) {
    return {
      label: 'PyColors',
      suffix: `UI System · v${UI_VERSION}`,
      context:
        'A predictable UI foundation for building real SaaS products with more consistency and less friction.',
    };
  }

  if (pathname === '/examples' || pathname.startsWith('/examples')) {
    return {
      label: 'PyColors',
      suffix: 'Examples · Product direction',
      context:
        'Explore real product directions and production-shaped SaaS surfaces.',
    };
  }

  if (pathname === '/guides' || pathname.startsWith('/guides')) {
    return {
      label: 'PyColors',
      suffix: 'Guides · SaaS knowledge base',
      context:
        'Learn the product logic behind auth, billing, dashboards, team systems, and modern SaaS structure.',
    };
  }

  if (
    pathname === '/templates' ||
    pathname.startsWith('/templates/')
  ) {
    return {
      label: 'PyColors',
      suffix: 'Templates · Premium surfaces',
      context:
        'Ship polished product surfaces faster with reusable premium building blocks.',
    };
  }

  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return {
      label: 'PyColors',
      suffix: 'Docs · Docs-first workflow',
      context:
        'Structure before complexity. Learn the system before wiring the product.',
    };
  }

  if (pathname === '/about' || pathname.startsWith('/about')) {
    return {
      label: 'PyColors',
      suffix: 'About · Ecosystem vision',
      context:
        'Built for developers who want to learn, validate, and ship real SaaS products with more leverage.',
    };
  }

  if (
    pathname === '/open-source' ||
    pathname.startsWith('/open-source')
  ) {
    return {
      label: 'PyColors',
      suffix: 'Open Source · Public foundations',
      context:
        'Open foundations first. Premium acceleration when the business layer matters.',
    };
  }

  return {
    label: 'PyColors',
    suffix: `v${APP_VERSION}`,
    context:
      'Production-first SaaS ecosystem built to help developers validate product surfaces first, then move toward real business wiring and launch-ready foundations.',
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
                    Product-first
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
              Validate with Starter Free · Launch faster with Starter
              Pro
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { Badge, Button, cn } from '@pycolors/ui';
import {
  OnThisPageInline,
  type TocItem,
} from './on-this-page-inline';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumb';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

type GuidePageShellProps = {
  badge?: string;
  title: string;
  description: string;
  tags?: string[];
  toc: TocItem[];
  children: ReactNode;
  breadcrumb?: BreadcrumbItem[];
};

export function GuidePageShell({
  badge = 'Guide',
  title,
  description,
  tags = ['Next.js', 'SaaS'],
  toc,
  children,
  breadcrumb,
}: GuidePageShellProps) {
  const defaultBreadcrumb: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
    { label: title, href: '#' },
  ];

  const items =
    breadcrumb && breadcrumb.length > 0
      ? breadcrumb
      : defaultBreadcrumb;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Breadcrumb className="mb-6" items={items} />
            </div>

            <div className="mb-8">
              <Button asChild variant="outline" size="sm">
                <Link href="/guides" className={cn(focusRing)}>
                  <ArrowLeft
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Back to Guides
                </Link>
              </Button>
            </div>

            <header className="mb-10 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{badge}</Badge>
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  {title}
                </h1>

                <p className="max-w-3xl text-balance text-sm text-muted-foreground sm:text-base">
                  {description}
                </p>
              </div>
            </header>

            <div className="mb-10">
              <OnThisPageInline items={toc} />
            </div>

            <div className="space-y-10">{children}</div>
          </div>
        </Container>
      </main>
    </div>
  );
}

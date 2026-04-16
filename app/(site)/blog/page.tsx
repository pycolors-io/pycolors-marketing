import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  PenTool,
} from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BlogList } from '@/components/blog/blog-list';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getFeaturedPosts,
} from '@/lib/blog/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles from PyColors about SaaS architecture, product UX, Next.js, design systems, and production-ready implementation decisions.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog · PyColors',
    description:
      'Technical articles from PyColors about SaaS architecture, product UX, Next.js, design systems, and production-ready implementation decisions.',
    url: '/blog',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog · PyColors',
    description:
      'Technical articles from PyColors about SaaS architecture, product UX, Next.js, design systems, and production-ready implementation decisions.',
    images: ['/seo/twitter-main.png'],
  },
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="sm:self-start">{action}</div> : null}
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts(3);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
            ]}
          />
        </div>

        <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Blog
            </Badge>
            <Badge variant="outline">Technical writing</Badge>
            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Product-first
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Technical articles for developers
              <span className="block font-bold">
                building real SaaS products with better structure.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Real implementation notes, architecture decisions, UX
              tradeoffs, and lessons learned while building PyColors.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/starters/free">
                Start with Starter Free
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/guides">Browse Guides</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/ui/patterns">Browse UI Patterns</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Pill>Next.js</Pill>
            <Pill>SaaS Architecture</Pill>
            <Pill>Billing</Pill>
            <Pill>Design Systems</Pill>
            <Pill>Product UX</Pill>
          </div>
        </header>

        <section className="py-4 sm:py-6">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-2">
                    <PenTool
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why this blog exists
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  This blog turns real implementation work into useful
                  technical content. The goal is not generic
                  tutorials. The goal is to document concrete
                  decisions around SaaS architecture, product
                  surfaces, UI systems, and production-ready
                  tradeoffs.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/guides">View Guides</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/upgrade">Explore PRO</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {featuredPosts.length > 0 ? (
          <section className="py-10 sm:py-12">
            <SectionHeader
              title="Featured articles"
              description="Start with the highest-signal articles connected to real product and engineering decisions."
              action={
                <Button asChild size="sm" variant="outline">
                  <Link href="/starters">Explore Starters</Link>
                </Button>
              }
            />

            <BlogList posts={featuredPosts} />
          </section>
        ) : null}

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Latest articles"
            description="Focused content for the product surfaces and implementation decisions that matter most."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/docs/starter">Starter docs</Link>
              </Button>
            }
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <BlogList posts={posts} />
            <BlogSidebar categories={categories} tags={tags} />
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <SectionHeader
            title="How the blog fits the PyColors path"
            description="The blog builds authority, clarifies the product logic, and naturally bridges education to implementation."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Learn from real decisions
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use articles to understand how strong SaaS products
                  are structured across auth, billing, UI systems,
                  settings, and dashboard surfaces.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Move from concept to pattern
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Connect the article logic to examples, guides, and
                  reusable UI patterns built around the same product
                  surfaces.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Build faster with PyColors
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Start with Starter Free, then move to PRO or
                  advanced blocks when architecture and business
                  wiring become the bottleneck.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-20">
          <Card className="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-md space-y-2">
              <h2 className="font-brand text-lg font-semibold tracking-tight">
                Turn reading into implementation leverage
              </h2>

              <p className="text-sm text-muted-foreground">
                Use the blog to understand the reasoning, then use
                PyColors to ship the product surface faster.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/starters/free">Starter Free</Link>
              </Button>

              <Button asChild variant="secondary">
                <Link href="/upgrade">Explore PRO</Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/guides">Read Guides</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}

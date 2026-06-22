import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  PenTool,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card, CardContent, cn } from '@pycolors/ui';
import { PRODUCT_DISPLAY } from '@pycolors/core-config/products/public-catalog';
import { Container } from '@/components/container';
import { BlogList } from '@/components/blog/blog-list';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { PageHero } from '@/components/marketing/page-hero';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getFeaturedPosts,
} from '@/lib/blog/utils';

const starterProPriceLabel = PRODUCT_DISPLAY['starter-pro'].priceLabel;

export const metadata: Metadata = {
  title: 'Next.js SaaS Engineering Blog',
  description:
    'Technical articles about Next.js SaaS architecture, authentication, billing systems, UI engineering, design systems, product UX, and production-ready implementation decisions.',
  alternates: {
    canonical: '/blog',
  },

  openGraph: {
    title: 'Next.js SaaS Engineering Blog',
    description:
      'Technical writing from PyColors about SaaS architecture, UI systems, billing flows, product UX, and production-ready Next.js engineering.',
    url: '/blog',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Engineering Blog',
    description:
      'Technical articles about SaaS architecture, UI systems, billing, product UX, and modern Next.js engineering.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  readonly title: string;
  readonly description?: string;
  readonly action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <h2 className="font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {step}
        </div>

        <div className="text-sm font-medium">{title}</div>

        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts(3);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Blog',
              variant: 'secondary',
              icon: (
                <BookOpen
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: 'Technical writing',
              variant: 'outline',
            },
            {
              label: 'Product-first',
              variant: 'outline',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
          ]}
          title="Technical articles for developers"
          subtitle="building real SaaS products with better structure."
          description="The PyColors blog turns real product work into useful technical content: SaaS architecture, Next.js decisions, design systems, billing, product surfaces, and production-ready implementation tradeoffs."
          actions={
            <>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Start with Starter Free
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/guides">Browse Guides</Link>
              </Button>

              <BuyStarterProButton
                fullWidth={false}
                label={`Buy Starter Pro — ${starterProPriceLabel}`}
              />
            </>
          }
          pills={[
            'Next.js',
            'SaaS Architecture',
            'Billing',
            'Design Systems',
            'Product UX',
          ]}
        />

        <section className="py-10 sm:py-12">
          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="gap-2 rounded-[5px]"
                    >
                      <PenTool
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      Why this blog exists
                    </Badge>
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Real implementation work turned into durable
                    technical content.
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className="text-sm leading-7 text-muted-foreground">
                    This blog is not built for generic tutorials. It
                    documents concrete decisions around SaaS
                    architecture, product surfaces, UI systems,
                    business wiring, and production-ready tradeoffs
                    while building the PyColors ecosystem.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Pill>Product engineering</Pill>
                    <Pill>Architecture notes</Pill>
                    <Pill>Conversion lessons</Pill>
                    <Pill>Docs-first thinking</Pill>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-4">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn('rounded-[5px]', focusRing)}
                    >
                      <Link href="/guides">View Guides</Link>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn('rounded-[5px]', focusRing)}
                    >
                      <Link href="/ui/patterns">Browse Patterns</Link>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn('rounded-[5px]', focusRing)}
                    >
                      <Link href="/upgrade">Explore Upgrade</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {featuredPosts.length > 0 ? (
          <section className="py-12 sm:py-14 lg:py-16">
            <SectionHeader
              title="Featured articles"
              description="Start with the highest-signal articles connected to real product and engineering decisions."
              action={
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn('rounded-[5px]', focusRing)}
                >
                  <Link href="/starters">Explore Starters</Link>
                </Button>
              }
            />

            <BlogList posts={featuredPosts} />
          </section>
        ) : null}

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="Latest articles"
            description="Focused content for the product surfaces and implementation decisions that matter most."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href="/docs/starter">Starter docs</Link>
              </Button>
            }
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <BlogList posts={posts} />
            <BlogSidebar categories={categories} tags={tags} />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="How the blog fits the PyColors path"
            description="The blog builds authority, clarifies the product logic, and naturally bridges education to implementation."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <StepCard
              step="Step 01"
              title="Learn from real decisions"
              description="Use articles to understand how strong SaaS products are structured across auth, billing, UI systems, settings, and dashboard surfaces."
            />

            <StepCard
              step="Step 02"
              title="Move from concept to pattern"
              description="Connect the article logic to examples, guides, and reusable UI patterns built around the same product surfaces."
            />

            <StepCard
              step="Step 03"
              title="Build faster with PyColors"
              description="Start with Starter Free, then move to Starter Pro when architecture, authentication, billing, and business wiring become the bottleneck."
            />
          </div>
        </section>

        <section className="pt-4">
          <Card className="rounded-[5px] border border-border-subtle bg-surface px-6 py-8 shadow-soft sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <Badge variant="outline" className="rounded-[5px]">
                  Next step
                </Badge>

                <h2 className="font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
                  Turn reading into implementation leverage.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Use the blog to understand the reasoning, then use
                  PyColors to ship the product surface faster.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>Read the logic</Pill>
                  <Pill>Validate with Free</Pill>
                  <Pill>Upgrade when ready</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-60">
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    'h-11 rounded-[5px] text-sm font-medium',
                    focusRing,
                  )}
                >
                  <Link href="/starters/free">Starter Free</Link>
                </Button>

                <BuyStarterProButton />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}

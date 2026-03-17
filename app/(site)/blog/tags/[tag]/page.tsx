import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Hash, Sparkles } from 'lucide-react';

import { Badge, Button, Card, EmptyState } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BlogList } from '@/components/blog/blog-list';
import {
  getAllTags,
  getPostsByTag,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

type PageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: normalizeTaxonomy(tag),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const tags = getAllTags();

  const matchedTag = tags.find(
    (item) => normalizeTaxonomy(item) === tag,
  );

  if (!matchedTag) {
    return {
      title: 'Tag not found',
    };
  }

  return {
    title: `${matchedTag} Articles`,
    description: `Technical articles from PyColors tagged with ${matchedTag}.`,
    alternates: {
      canonical: `/blog/tags/${tag}`,
    },
    openGraph: {
      title: `${matchedTag} · Blog · PyColors`,
      description: `Technical articles from PyColors tagged with ${matchedTag}.`,
      url: `/blog/tags/${tag}`,
      images: ['/seo/og-main.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${matchedTag} · Blog · PyColors`,
      description: `Technical articles from PyColors tagged with ${matchedTag}.`,
      images: ['/seo/twitter-main.png'],
    },
  };
}

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

export default async function BlogTagPage({ params }: PageProps) {
  const { tag } = await params;

  const tags = getAllTags();
  const matchedTag = tags.find(
    (item) => normalizeTaxonomy(item) === tag,
  );

  if (!matchedTag) {
    notFound();
  }

  const posts = getPostsByTag(matchedTag);

  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: matchedTag, href: `/blog/tags/${tag}` },
            ]}
          />
        </div>

        <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <Hash className="h-3.5 w-3.5" aria-hidden="true" />
              Tag
            </Badge>
            <Badge variant="outline">{matchedTag}</Badge>
            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Technical writing
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {matchedTag}
              <span className="block font-bold">tag archive.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Explore articles that reference the same implementation
              topic, framework, or product concept.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/blog">
                Back to Blog
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
              <Link href="/starters/free">Starter Free</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Pill>{matchedTag}</Pill>
            <Pill>Product-first</Pill>
            <Pill>Technical</Pill>
            <Pill>SaaS</Pill>
          </div>
        </header>

        <section className="py-4 sm:py-6">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">Why this tag exists</Badge>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Tags help connect related technical ideas across
                  categories, so readers can follow a narrower topic
                  through multiple article angles and implementation
                  contexts.
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

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Articles with this tag"
            description="A narrower set of articles linked by the same technical topic."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/blog">All articles</Link>
              </Button>
            }
          />

          {posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <EmptyState
              title="No posts yet"
              description="This tag exists, but no article is published yet."
            />
          )}
        </section>
      </div>
    </Container>
  );
}

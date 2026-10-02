import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { Container } from "@/components/container";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pycolors/ui";
import { Breadcrumb } from "@/components/seo/breadcrumb";

export const metadata: Metadata = {
  title: "Open-Source SaaS UI & Developer Tools",
  description:
    "Explore the open-source foundations behind PyColors: SaaS UI systems, semantic tokens, Starter Free, TypeScript tooling, ESLint configs, and production-shaped developer infrastructure.",
  alternates: {
    canonical: "/open-source",
  },

  openGraph: {
    title: "Open-Source SaaS UI & Developer Tools",
    description:
      "Discover the open-core foundations behind PyColors across UI systems, tokens, SaaS starters, developer tooling, and production-ready Next.js infrastructure.",
    url: "/open-source",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Open-Source SaaS UI & Developer Tools",
    description:
      "Open-core foundations for modern SaaS products: UI systems, starters, tokens, and developer tooling.",
    images: ["/seo/twitter-main.png"],
  },
};

type Repo = {
  name: string;
  description: string;
  href: string;
  badge?: string;
  category: "Core foundations" | "Developer tooling" | "Starters" | "Website";
};

const repos: Repo[] = [
  {
    category: "Core foundations",
    name: "pycolors-ui",
    description:
      "Documentation-first UI system built on semantic tokens and Radix primitives — optimized for real SaaS screens.",
    href: "https://github.com/pycolors-io/pycolors-ui",
    badge: "UI system",
  },
  {
    category: "Core foundations",
    name: "pycolors-tokens",
    description:
      "Semantic design tokens powering consistent theming across apps, templates, and starters.",
    href: "https://github.com/pycolors-io/pycolors-tokens",
    badge: "Tokens",
  },
  {
    category: "Developer tooling",
    name: "pycolors-eslint-config",
    description:
      "Shared ESLint configs for scalable TypeScript + Next.js codebases with strong defaults.",
    href: "https://github.com/pycolors-io/pycolors-eslint-config",
    badge: "DX",
  },
  {
    category: "Developer tooling",
    name: "pycolors-typescript-config",
    description:
      "Shared TypeScript configs to keep projects strict, predictable, and aligned as they grow.",
    href: "https://github.com/pycolors-io/pycolors-typescript-config",
    badge: "DX",
  },
  {
    category: "Starters",
    name: "pycolors-starter-free",
    description:
      "Frontend-only SaaS starter demo: auth UX, dashboards, CRUD patterns, settings, billing surfaces, and admin UI — mocked by design, ready to wire.",
    href: "https://github.com/pycolors-io/pycolors-starter-free",
    badge: "Free",
  },
  {
    category: "Website",
    name: "pycolors-marketing",
    description:
      "The marketing + docs site built with Next.js and Fumadocs — public mirror of the ecosystem website.",
    href: "https://github.com/pycolors-io/pycolors-marketing",
    badge: "Site",
  },
];

export default function OpenSourcePage() {
  const core = repos.filter((repo) => repo.category === "Core foundations");
  const tooling = repos.filter((repo) => repo.category === "Developer tooling");
  const starters = repos.filter((repo) => repo.category === "Starters");
  const website = repos.filter((repo) => repo.category === "Website");

  return (
    <main id="content" tabIndex={-1}>
      <Container className="pb-10 pt-20 sm:pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Open Source", href: "/open-source" },
              ]}
            />
          </div>

          <PageHero
            variant="compact"
            badges={[
              { label: "Built in public", variant: "secondary" },
              { label: "Open-core", variant: "outline" },
              { label: "Trust + adoption", variant: "outline" },
            ]}
            title="Open-source foundations behind PyColors."
            description="PyColors is built as an open-core SaaS ecosystem: UI system, tokens, starters, and developer tooling designed to help developers ship credible SaaS products faster."
            actions={
              <>
                <MarketingLinkButton>
                  <Link href="/ui">
                    Explore UI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/starters/free">Try Starter Free</Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </MarketingLinkButton>
              </>
            }
            extra={
              <>
                <p className="mx-auto max-w-3xl text-sm leading-7 text-muted-foreground">
                  Open-source is the foundation layer. Premium products exist to
                  accelerate execution when auth, billing, delivery, and
                  production wiring become the bottleneck.
                </p>
                <MarketingPillList align="center" className="mt-4">
                  <MarketingPill>Open foundations</MarketingPill>
                  <MarketingPill>Docs-first</MarketingPill>
                  <MarketingPill>Weekly shipping</MarketingPill>
                  <MarketingPill>Free → Pro path</MarketingPill>
                </MarketingPillList>
              </>
            }
          />

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="open-source-why-open-source"
          >
            <MarketingSectionHeader
              align="left"
              titleId="open-source-why-open-source"
              title="Why open-source"
              description="Open-source is the trust layer of PyColors. It lets developers inspect the foundations, adopt progressively, and upgrade only when premium acceleration creates real leverage."
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <MarketingFeatureCard
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Trust"
                description="See the foundations. Inspect the primitives, tokens, tooling, and starter structure before you commit."
              />

              <MarketingFeatureCard
                icon={<GitBranch className="h-4 w-4" />}
                title="Adoption"
                description="Clone, run, test, and evaluate quickly. Start with the open layer before choosing a paid path."
              />

              <MarketingFeatureCard
                icon={<Sparkles className="h-4 w-4" />}
                title="Velocity"
                description="Production-shaped foundations reduce repeated setup work and keep your product direction coherent."
              />
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="open-source-open-core-strategy"
          >
            <MarketingSectionHeader
              align="left"
              titleId="open-source-open-core-strategy"
              title="Open-core strategy"
              description="The ecosystem stays clear: open foundations for adoption, premium acceleration for builders who want to move faster."
              action={
                <MarketingLinkButton variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </MarketingLinkButton>
              }
            />

            <div>
              <MarketingPillList className="mb-4">
                <MarketingPill>Transparent model</MarketingPill>

                <MarketingPill>
                  Open foundations → paid acceleration
                </MarketingPill>

                <MarketingPill>Adopt progressively</MarketingPill>
              </MarketingPillList>

              <div className="[&>div]:focus-visible:outline-2 [&>div]:focus-visible:outline-offset-4 [&>div]:focus-visible:outline-ring">
                <Table
                  className="min-w-[28rem]"
                  aria-label="Open-core strategy"
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">
                        Open-source foundation
                      </TableHead>
                      <TableHead className="w-1/2">
                        Premium acceleration
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            PyColors UI + Tokens
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Stable primitives, semantic theming, and docs-first
                            usage.
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            Premium product surfaces
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Higher-level SaaS patterns, starters, and
                            production-focused assets.
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            Starter Free
                          </div>
                          <div className="text-sm text-muted-foreground">
                            A runnable SaaS surface with mocked data — built to
                            validate UX fast.
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Starter Pro</div>
                          <div className="text-sm text-muted-foreground">
                            Real auth, Stripe billing, protected app structure,
                            delivery, and backend foundations.
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            Developer tooling
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Shared ESLint and TypeScript configs to keep
                            projects aligned.
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            Future premium layers
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Blocks, templates, stronger SaaS foundations, and
                            commercial acceleration.
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 space-y-2 text-xs leading-6 text-muted-foreground">
                <p>
                  Public repositories are governed by their repository licenses.
                  Premium products, commercial access, private releases, and
                  brand assets remain subject to separate commercial terms.
                </p>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="open-source-repositories"
          >
            <MarketingSectionHeader
              align="left"
              titleId="open-source-repositories"
              title="Repositories"
              description="Public repositories you can inspect, clone, and use today. Each one maps to a clear role in the PyColors ecosystem."
            />

            <div className="space-y-6">
              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Foundations</h3>
                    <p className="text-sm text-muted-foreground">
                      UI, tokens, and tooling that power the ecosystem.
                    </p>
                  </div>

                  <Badge variant="secondary" className="rounded-[5px] text-xs">
                    Core
                  </Badge>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {[...core, ...tooling].map((repo) => (
                    <MarketingResourceCard
                      key={repo.name}
                      title={repo.name}
                      headingLevel={4}
                      href={repo.href}
                      description={repo.description}
                      meta={
                        <>
                          <MarketingPillList>
                            <MarketingPill>{repo.category}</MarketingPill>
                            {repo.badge ? (
                              <MarketingPill>{repo.badge}</MarketingPill>
                            ) : null}
                          </MarketingPillList>
                          <span className="mt-3 block">GitHub</span>
                        </>
                      }
                      className="break-words"
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Products</h3>
                    <p className="text-sm text-muted-foreground">
                      Runnable entry points and the public website.
                    </p>
                  </div>

                  <Badge variant="secondary" className="rounded-[5px] text-xs">
                    Adoption
                  </Badge>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {[...starters, ...website].map((repo) => (
                    <MarketingResourceCard
                      key={repo.name}
                      title={repo.name}
                      headingLevel={4}
                      href={repo.href}
                      description={repo.description}
                      meta={
                        <>
                          <MarketingPillList>
                            <MarketingPill>{repo.category}</MarketingPill>
                            {repo.badge ? (
                              <MarketingPill>{repo.badge}</MarketingPill>
                            ) : null}
                          </MarketingPillList>
                          <span className="mt-3 block">GitHub</span>
                        </>
                      }
                      className="break-words"
                    />
                  ))}
                </div>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell spacing="compact">
            <div className="mb-4">
              <Badge variant="outline" className="rounded-[5px]">
                Recommended path
              </Badge>
            </div>
            <MarketingCtaPanel
              title="Start open. Validate fast. Upgrade when it matters."
              description="Use PyColors UI as the foundation, Starter Free to validate the product surface, and Starter Pro when real authentication, billing, and protected app architecture become the bottleneck."
              actions={
                <>
                  <MarketingPillList className="mb-5">
                    <MarketingPill>UI → foundation</MarketingPill>
                    <MarketingPill>Starter Free → validation</MarketingPill>
                    <MarketingPill>Starter Pro → business layer</MarketingPill>
                  </MarketingPillList>
                  <MarketingActionGroup>
                    <MarketingLinkButton>
                      <Link href="/starters/free">Starter Free</Link>
                    </MarketingLinkButton>
                    <MarketingLinkButton variant="outline">
                      <Link href="/starters/pro">Starter Pro</Link>
                    </MarketingLinkButton>
                    <MarketingLinkButton variant="outline">
                      <Link href="/pricing">Pricing</Link>
                    </MarketingLinkButton>
                  </MarketingActionGroup>
                </>
              }
            />

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Built in public. Shipping weekly.
            </p>
          </MarketingSectionShell>
        </div>
      </Container>
    </main>
  );
}

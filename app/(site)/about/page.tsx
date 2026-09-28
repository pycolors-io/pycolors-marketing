import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
import { Container } from "@/components/container";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pycolors/ui";
import { Breadcrumb } from "@/components/seo/breadcrumb";

export const metadata: Metadata = {
  title: "About PyColors",
  description:
    "Learn how PyColors helps developers build credible SaaS products faster with production-ready UI systems, SaaS starters, patterns, and documentation-first workflows.",
  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About PyColors — Premium SaaS UI System & Starters",
    description:
      "Learn how PyColors helps developers build credible SaaS products faster with production-ready UI systems, SaaS starters, patterns, and documentation-first workflows.",
    url: "/about",
    siteName: "PyColors",
    images: ["/seo/og-main.png"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About PyColors — Premium SaaS UI System & Starters",
    description:
      "Learn how PyColors helps developers build credible SaaS products faster with production-ready UI systems, SaaS starters, patterns, and documentation-first workflows.",
    images: ["/seo/twitter-main.png"],
  },
};

export default function AboutPage() {
  return (
    <main id="content" tabIndex={-1}>
      <Container className="pb-10 pt-20 sm:pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
              ]}
            />
          </div>

          <PageHero
            variant="compact"
            badges={[
              { label: "About", variant: "secondary" },
              { label: "Docs-first ecosystem", variant: "outline" },
              { label: "Built for shipping", variant: "outline" },
            ]}
            title="PyColors helps developers ship credible SaaS products faster."
            description="PyColors is a docs-first open-core SaaS ecosystem: UI foundations, product patterns, examples, starters, and a premium path designed to help builders learn the product logic, validate credible interfaces, and move toward real business wiring when it matters."
            actions={
              <>
                <MarketingLinkButton>
                  <Link href="/guides">
                    Explore guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/starters/free">Starter Free</Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/open-source">Open source</Link>
                </MarketingLinkButton>
              </>
            }
            extra={
              <>
                <p className="mx-auto max-w-3xl text-sm leading-7 text-muted-foreground">
                  Created by Patrice Parny, founder of PyColors. The goal is not
                  to ship random assets. The goal is to build a system that
                  compounds over time.
                </p>
                <MarketingPillList align="center" className="mt-4">
                  <MarketingPill>Docs-first</MarketingPill>
                  <MarketingPill>Tokens-first UI</MarketingPill>
                  <MarketingPill>Production patterns</MarketingPill>
                  <MarketingPill>Open core</MarketingPill>
                  <MarketingPill>Free → Pro path</MarketingPill>
                </MarketingPillList>
              </>
            }
          />

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="about-why-pycolors-exists"
          >
            <MarketingSectionHeader
              align="left"
              titleId="about-why-pycolors-exists"
              title="Why PyColors exists"
              description="PyColors was created to solve a product problem, not just a component problem."
            />

            <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                <div className="space-y-3">
                  <Badge variant="outline" className="rounded-[5px]">
                    Product-first
                  </Badge>

                  <h3 className="text-balance text-2xl font-semibold tracking-tight">
                    The hard part is not only UI. It is turning UI into a
                    product people can trust.
                  </h3>
                </div>

                <div className="space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>
                    In many UI codebases, the hardest part is not creating a new
                    button or card. The real difficulty appears later:
                    inconsistent spacing, weak token systems, unclear variants,
                    poor documentation, and product screens that never feel
                    fully coherent.
                  </p>

                  <p>
                    PyColors starts with stable UI foundations, but it does not
                    stop there. It extends toward patterns, examples, starters,
                    and premium acceleration so builders can move from isolated
                    UI work to a more complete SaaS product path.
                  </p>

                  <p>
                    <span className="font-medium text-foreground">
                      PyColors UI is the foundation.
                    </span>{" "}
                    The rest of the ecosystem is built on top of it so the
                    product can grow without losing coherence.
                  </p>
                </div>
              </div>
            </Card>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="about-core-principles"
          >
            <MarketingSectionHeader
              align="left"
              titleId="about-core-principles"
              title="Core principles"
              description="The ecosystem is opinionated by design: clarity, consistency, and production constraints first."
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <MarketingFeatureCard
                icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
                title="Documentation-first"
                description="Learn the logic, inspect the pattern, and move quickly toward implementation with fewer hidden decisions."
              />

              <MarketingFeatureCard
                icon={<BadgeCheck className="h-4 w-4" aria-hidden="true" />}
                title="Production constraints"
                description="Accessible defaults, semantic tokens, stable variants, and SaaS-oriented product surfaces."
              />

              <MarketingFeatureCard
                icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
                title="Quality over noise"
                description="Fewer moving parts, better finished. A baseline you can trust instead of disconnected assets."
              />
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="about-how-the-ecosystem-works"
          >
            <MarketingSectionHeader
              align="left"
              titleId="about-how-the-ecosystem-works"
              title="How the ecosystem works"
              description="PyColors is structured as a progression, not as a random collection of pages."
              action={
                <MarketingLinkButton variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </MarketingLinkButton>
              }
            />

            <div>
              <MarketingPillList className="mb-4">
                <MarketingPill>Progression</MarketingPill>

                <MarketingPill>
                  Learn → Explore → Validate → Launch
                </MarketingPill>

                <MarketingPill>Adopt progressively</MarketingPill>
              </MarketingPillList>

              <div className="[&>div]:focus-visible:outline-2 [&>div]:focus-visible:outline-offset-4 [&>div]:focus-visible:outline-ring">
                <Table
                  className="min-w-[36rem]"
                  aria-label="How the ecosystem works"
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4">Stage</TableHead>
                      <TableHead className="w-1/4">What it means</TableHead>
                      <TableHead className="w-1/4">Where to go</TableHead>
                      <TableHead className="w-1/4">Why it matters</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Learn</TableCell>
                      <TableCell>Understand real SaaS product logic.</TableCell>
                      <TableCell>
                        <Link
                          href="/guides"
                          className="underline underline-offset-4"
                        >
                          Guides
                        </Link>
                      </TableCell>
                      <TableCell>Reduce guesswork before building.</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Explore</TableCell>
                      <TableCell>
                        Study credible UI patterns and examples.
                      </TableCell>
                      <TableCell>
                        <Link
                          href="/ui/patterns"
                          className="underline underline-offset-4"
                        >
                          Patterns
                        </Link>{" "}
                        /{" "}
                        <Link
                          href="/examples"
                          className="underline underline-offset-4"
                        >
                          Examples
                        </Link>
                      </TableCell>
                      <TableCell>
                        Move from primitives to product surfaces.
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Validate</TableCell>
                      <TableCell>
                        Run a credible SaaS surface locally.
                      </TableCell>
                      <TableCell>
                        <Link
                          href="/starters/free"
                          className="underline underline-offset-4"
                        >
                          Starter Free
                        </Link>
                      </TableCell>
                      <TableCell>
                        Prove the UX before backend complexity.
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Launch</TableCell>
                      <TableCell>
                        Upgrade when wiring becomes the blocker.
                      </TableCell>
                      <TableCell>
                        <Link
                          href="/starters/pro"
                          className="underline underline-offset-4"
                        >
                          Starter Pro
                        </Link>{" "}
                        /{" "}
                        <Link
                          href="/pricing"
                          className="underline underline-offset-4"
                        >
                          Pricing
                        </Link>
                      </TableCell>
                      <TableCell>
                        Add real auth, billing, and protected foundations when
                        the product becomes serious.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="about-what-exists-today-and-what-comes-next"
          >
            <MarketingSectionHeader
              align="left"
              titleId="about-what-exists-today-and-what-comes-next"
              title="What exists today — and what comes next"
              description="The ecosystem is built in public and shipped progressively."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <MarketingFeatureCard
                title="Today"
                icon={<ShieldCheck className="h-4 w-4 text-primary" />}
                description="PyColors already includes UI foundations, guides, patterns, examples, Starter Free, documentation, and a clear Starter Pro path — all structured as one coherent ecosystem designed to help developers learn faster and build better SaaS products."
                action={
                  <MarketingLinkButton variant="outline">
                    <Link href="/changelog">
                      View changelog
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </MarketingLinkButton>
                }
              />

              <MarketingFeatureCard
                title="Next"
                icon={<Rocket className="h-4 w-4 text-primary" />}
                description="The next layer focuses on stronger premium acceleration: more proof, better conversion, stronger Starter Pro documentation, deeper backend foundations, and future product surfaces built on the same open foundation."
                action={
                  <MarketingLinkButton variant="outline">
                    <Link href="/roadmap">
                      View roadmap
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </MarketingLinkButton>
                }
              />
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell spacing="compact">
            <div className="mb-4">
              <Badge variant="outline" className="rounded-[5px]">
                Recommended path
              </Badge>
            </div>
            <MarketingCtaPanel
              title="Learn the logic. Validate the surface. Upgrade when the business layer matters."
              description="Start with the knowledge layer, validate with Starter Free, then move to Starter Pro when real authentication, billing, and protected architecture become the bottleneck."
              actions={
                <>
                  <MarketingPillList className="mb-5">
                    <MarketingPill>Guides → learn</MarketingPill>
                    <MarketingPill>Starter Free → validate</MarketingPill>
                    <MarketingPill>Starter Pro → launch</MarketingPill>
                  </MarketingPillList>
                  <MarketingActionGroup>
                    <MarketingLinkButton>
                      <Link href="/guides">Guides</Link>
                    </MarketingLinkButton>
                    <MarketingLinkButton variant="outline">
                      <Link href="/starters/free">Starter Free</Link>
                    </MarketingLinkButton>
                    <MarketingLinkButton variant="outline">
                      <Link href="/pricing">Pricing</Link>
                    </MarketingLinkButton>
                  </MarketingActionGroup>
                </>
              }
            />

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Built in public. Structured to compound.
            </p>
          </MarketingSectionShell>
        </div>
      </Container>
    </main>
  );
}

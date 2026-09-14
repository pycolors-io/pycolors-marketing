import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CreditCard,
  FileText,
  LogIn,
  MessageSquare,
  PackageCheck,
  PanelLeft,
  Settings2,
  Table2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/container";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { BLOCKS_CATALOG } from "@/lib/blocks/catalog";

const title = "PyColors Blocks — Copyable React application patterns";
const description =
  "Explore navigation, authentication, data, settings, pricing, empty states and workspace patterns. Preview each PyColors Block, copy its source and keep control of your application code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blocks" },
  openGraph: {
    title,
    description,
    url: "/blocks",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const linkClassName =
  "inline-flex min-h-11 items-center gap-2 rounded-[5px] text-sm font-medium underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const categoryIcons: Record<
  (typeof BLOCKS_CATALOG)[number]["category"],
  LucideIcon
> = {
  "Application shells": PanelLeft,
  Authentication: LogIn,
  "Data & records": Table2,
  "Account & workspace": Settings2,
  Commerce: CreditCard,
  "Feedback & states": MessageSquare,
};

const adoptionSteps = [
  {
    title: "Configure the UI",
    description:
      "Set up the public UI package, tokens and semantic styles in your application before copying a Block.",
    icon: Boxes,
    href: "/docs/ui/installation",
    cta: "UI installation",
  },
  {
    title: "Copy the source",
    description:
      "Open the Block guide and copy its complete source directory into a location your application owns. Keep local files together.",
    icon: FileText,
    href: "/docs/blocks",
    cta: "Source-copy instructions",
  },
  {
    title: "Connect and validate",
    description:
      "Supply your own data, actions and routes. Run your tests and build, then check keyboard behavior, narrow layouts and both themes in your application.",
    icon: PackageCheck,
  },
] as const;

const ownershipItems = [
  {
    title: "Own the source and its updates",
    description:
      "There is no Blocks npm package, Registry installer or CLI in this workflow. The copy lives in your application, and there are no automatic updates or synchronization. Review future canonical changes deliberately before adopting them.",
    icon: FileText,
  },
  {
    title: "Keep your application behavior",
    description:
      "Blocks provide interface composition, not authentication, billing, data fetching or persistence. Those responsibilities stay with your application. The examples use consumer-owned content and do not connect a backend for you.",
    icon: Workflow,
  },
] as const;

export default function BlocksPage() {
  return (
    <main id="content" tabIndex={-1}>
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
          <PageHero
            maxWidth="5xl"
            badges={[
              {
                label: "PyColors Blocks",
                variant: "secondary",
                icon: <Boxes className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: "Manual source copy", variant: "outline" },
            ]}
            title="Start from a pattern. Keep ownership of the code."
            subtitle="Reusable React sections for your application screens."
            description="PyColors Blocks compose public PyColors UI primitives into application patterns. Choose navigation, authentication, records, settings, pricing, empty states or workspace patterns, then connect the composition to your own product."
            actions={
              <MarketingActionGroup align="center">
                <MarketingLinkButton>
                  <Link href="#catalog">
                    Explore the Blocks
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/docs/blocks">Read the source-copy guide</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            }
            pills={[
              `${BLOCKS_CATALOG.length} documented Blocks`,
              "Consumer-owned behavior",
              "Public UI primitives",
            ]}
          />
        </div>
      </Container>

      <MarketingSectionShell
        id="catalog"
        aria-labelledby="blocks-catalog-title"
        width="full"
        className="scroll-mt-24 border-t border-border-subtle py-16 lg:py-20"
      >
        <Container>
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              align="left"
              eyebrow="Available patterns"
              title="Choose a Block for your next screen"
              titleId="blocks-catalog-title"
              description="Each card opens the existing documentation, with an example, the canonical source location, supported behavior and integration guidance."
            />
            <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BLOCKS_CATALOG.map((block) => {
                const Icon = categoryIcons[block.category];

                return (
                  <MarketingResourceCard
                    key={block.id}
                    title={block.title}
                    description={block.description}
                    href={block.href}
                    meta={
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface text-muted-foreground">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>{block.category}</span>
                      </div>
                    }
                    headingLevel={3}
                    className="min-w-0 p-6 sm:p-7"
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </MarketingSectionShell>

      <MarketingSectionShell
        aria-labelledby="blocks-adoption-title"
        width="full"
        className="border-t border-border-subtle bg-surface-muted/30 py-16 lg:py-20"
      >
        <Container>
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="How it works"
              title="From an example to code you own"
              titleId="blocks-adoption-title"
              description="Copy one pattern into an existing application. You do not need to adopt a complete Starter to use a Block."
            />
            <ol
              aria-label="Block integration steps"
              className="grid list-none gap-4 p-0 md:grid-cols-3"
              role="list"
            >
              {adoptionSteps.map((step, index) => (
                <li key={step.title} className="min-w-0">
                  <MarketingFeatureCard
                    title={step.title}
                    description={step.description}
                    icon={<step.icon className="h-5 w-5" />}
                    meta={
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {index + 1} of {adoptionSteps.length}
                      </span>
                    }
                    action={
                      "href" in step ? (
                        <Link className={linkClassName} href={step.href}>
                          {step.cta}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ) : undefined
                    }
                  />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </MarketingSectionShell>

      <MarketingSectionShell
        aria-labelledby="blocks-ownership-title"
        width="full"
        className="border-t border-border-subtle py-16 lg:py-20"
      >
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <MarketingSectionHeader
              align="left"
              eyebrow="Clear ownership"
              title="Source you control, not a managed dependency"
              titleId="blocks-ownership-title"
              description="Reuse the interface composition without handing over your application architecture or data layer."
            />
            <div className="grid min-w-0 gap-4">
              {ownershipItems.map((item) => (
                <MarketingFeatureCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={<item.icon className="h-5 w-5" />}
                />
              ))}
            </div>
          </div>
        </Container>
      </MarketingSectionShell>

      <MarketingSectionShell
        aria-labelledby="blocks-starters-title"
        width="full"
        className="border-t border-border-subtle py-16 lg:py-20"
      >
        <Container>
          <div className="mx-auto max-w-6xl">
            <MarketingCtaPanel
              align="center"
              title="Need an application foundation instead?"
              titleId="blocks-starters-title"
              description="Use Blocks when you want one pattern in an existing app. Explore Starter Free and Starter Pro when you need a broader starting point, and compare what each includes."
              actions={
                <MarketingActionGroup align="center">
                  <MarketingLinkButton>
                    <Link href="/starters">
                      Compare Starters
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </MarketingLinkButton>
                  <MarketingLinkButton variant="outline">
                    <Link href="/docs/blocks">Continue with Blocks</Link>
                  </MarketingLinkButton>
                </MarketingActionGroup>
              }
            />
          </div>
        </Container>
      </MarketingSectionShell>
    </main>
  );
}

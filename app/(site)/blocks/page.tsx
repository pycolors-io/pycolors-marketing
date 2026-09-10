import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
} from "@/components/marketing/cta-panel";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { BLOCKS_CATALOG } from "@/lib/blocks/catalog";

const title = "PyColors Blocks — Copyable React application patterns";
const description =
  "Explore the responsive sidebar, data table and settings panel. Preview each PyColors Block, copy its source and keep control of your application code.";

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
  "inline-flex min-h-11 items-center justify-center rounded-[5px] px-3 py-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const adoptionSteps = [
  {
    title: "Configure the UI",
    description:
      "Set up the public UI package, tokens and semantic styles in your application before copying a Block.",
    href: "/docs/ui/installation",
    cta: "UI installation",
  },
  {
    title: "Copy the source",
    description:
      "Open the Block guide and copy its complete source directory into a location your application owns. Keep local files together.",
    href: "/docs/blocks",
    cta: "Source-copy instructions",
  },
  {
    title: "Connect and validate",
    description:
      "Supply your own data, actions and routes. Run your tests and build, then check keyboard behavior, narrow layouts and both themes in your application.",
  },
] as const;

const ownershipParagraphs = [
  "There is no Blocks npm package, Registry installer or CLI in this workflow. The copy lives in your application, and there are no automatic updates or synchronization. Review future canonical changes deliberately before adopting them.",
  "Blocks provide interface composition, not authentication, billing, data fetching or persistence. Those responsibilities stay with your application. The examples use consumer-owned content and do not connect a backend for you.",
] as const;

export default function BlocksPage() {
  return (
    <main id="content" tabIndex={-1}>
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
          <PageHero
            badges={[
              { label: "PyColors Blocks", variant: "outline" },
              { label: "Manual source copy", variant: "secondary" },
            ]}
            title="Start from a pattern. Keep ownership of the code."
            description="PyColors Blocks compose public PyColors UI primitives into application patterns. Choose a sidebar, a record table or a settings form, then connect it to your own product."
            actions={
              <>
                <Link className={linkClassName} href="#catalog">
                  Explore the Blocks
                </Link>
                <Link className={linkClassName} href="/docs/blocks">
                  Read the source-copy guide
                </Link>
              </>
            }
            pills={[
              `${BLOCKS_CATALOG.length} documented Blocks`,
              "Consumer-owned behavior",
              "Public UI primitives",
            ]}
          />

          <MarketingSectionShell
            id="catalog"
            aria-labelledby="blocks-catalog-title"
            className="scroll-mt-24"
          >
            <MarketingSectionHeader
              align="left"
              title="Choose a Block for your next screen"
              titleId="blocks-catalog-title"
              description="Each card opens the existing documentation, with an example, the canonical source location, supported behavior and integration guidance."
            />
            <div className="grid min-w-0 gap-4 md:grid-cols-3">
              {BLOCKS_CATALOG.map((block) => (
                <MarketingResourceCard
                  key={block.id}
                  title={block.title}
                  description={block.description}
                  href={block.href}
                  meta={block.category}
                  headingLevel={3}
                  className="min-w-0"
                />
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell aria-labelledby="blocks-adoption-title">
            <MarketingSectionHeader
              align="left"
              title="From an example to code you own"
              titleId="blocks-adoption-title"
              description="Copy one pattern into an existing application. You do not need to adopt a complete Starter to use a Block."
            />
            <ol className="grid list-decimal gap-8 pl-5 md:grid-cols-3">
              {adoptionSteps.map((step) => (
                <li key={step.title} className="min-w-0 space-y-3 pl-1">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                  {"href" in step ? (
                    <Link className={linkClassName} href={step.href}>
                      {step.cta}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ol>
          </MarketingSectionShell>

          <MarketingSectionShell
            aria-labelledby="blocks-ownership-title"
            width="reading"
            spacing="compact"
          >
            <MarketingSectionHeader
              align="left"
              title="Source you control, not a managed dependency"
              titleId="blocks-ownership-title"
            />
            <div className="space-y-4 text-sm leading-7 text-muted-foreground">
              {ownershipParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell aria-labelledby="blocks-starters-title">
            <MarketingCtaPanel
              title="Need an application foundation instead?"
              titleId="blocks-starters-title"
              description="Use Blocks when you want one pattern in an existing app. Explore Starter Free and Starter Pro when you need a broader starting point, and compare what each includes."
              actions={
                <MarketingActionGroup>
                  <Link className={linkClassName} href="/starters">
                    Compare Starters
                  </Link>
                  <Link className={linkClassName} href="/docs/blocks">
                    Continue with Blocks
                  </Link>
                </MarketingActionGroup>
              }
            />
          </MarketingSectionShell>
        </div>
      </Container>
    </main>
  );
}

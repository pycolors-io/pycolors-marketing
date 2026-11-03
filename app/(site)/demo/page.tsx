import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Play, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { ProDemoLink } from "@/components/marketing/pro-demo-link";
import { SiteButton as Button } from "@/components/site-button";
import { proDemoUrl } from "@/lib/pro-demo-url";

export const metadata: Metadata = {
  title: "SaaS starter demos",
  description:
    "Explore the Starter Free interface and Starter Pro workspace journeys. Compare demo behavior before choosing your SaaS foundation.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "Try the PyColors starters",
    description:
      "Two starting points. Explore the interface, then discover connected workspace workflows.",
    url: "/demo",
  },
};

const demos = [
  {
    id: "free",
    title: "Starter Free",
    label: "Frontend demo",
    description:
      "Explore SaaS screens, shape the interface and see the foundation you can connect to your own backend.",
    light: "/images/starters/free/product-preview/dashboard-light.png",
    dark: "/images/starters/free/product-preview/dashboard-dark.png",
    features: [
      "Dashboard, projects and account screens",
      "Demo data and client-side interactions",
      "No real accounts, database or payments",
    ],
  },
  {
    id: "pro",
    title: "Starter Pro",
    label: "Workspace journeys",
    description:
      "Discover connected project and team workflows in a private workspace, with a clearly labelled Free-to-Pro preview.",
    light: "/images/starters/pro/dashboard-pycolors.png",
    dark: "/images/starters/pro/dashboard-dark-pycolors.png",
    features: [
      "Dashboard and projects with saved workspace changes",
      "Simulated invitations, joining and member roles",
      "Free → Pro preview without a real payment",
    ],
  },
] as const;

export default function DemoPage() {
  const livePro = Boolean(proDemoUrl());
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <Container className="pb-12 pt-24 sm:pb-14 sm:pt-28">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[{ label: "Product demos", variant: "outline" }]}
          title="Try the interface. Choose your foundation."
          description="Start with the interface, or explore connected workspace workflows. See how Free and Pro behave before choosing what to build on."
        />
      </Container>
      <MarketingSectionShell
        width="full"
        spacing="compact"
        aria-label="Choose a starter demo"
      >
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            {demos.map((demo, index) => (
              <article
                key={demo.id}
                aria-labelledby={`demo-${demo.id}-title`}
                className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface/30"
              >
                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="font-mono text-[10px] tracking-widest text-muted-foreground"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {demo.label}
                    </span>
                  </div>
                  <h2
                    id={`demo-${demo.id}-title`}
                    className="mt-5 text-2xl font-semibold tracking-tight"
                  >
                    {demo.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                    {demo.description}
                  </p>
                </div>
                <figure className="border-y border-border-subtle bg-surface-muted/30">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={demo.light}
                      alt={`${demo.title} workspace with fictional data, light theme`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-left-top dark:hidden"
                    />
                    <Image
                      src={demo.dark}
                      alt={`${demo.title} workspace with fictional data, dark theme`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="hidden object-cover object-left-top dark:block"
                    />
                  </div>
                  <figcaption className="border-t border-border-subtle px-5 py-2.5 text-[11px] text-muted-foreground sm:px-7">
                    Example interface · Fictional data
                  </figcaption>
                </figure>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <ul className="space-y-3">
                    {demo.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm leading-6"
                      >
                        <Check
                          className="mt-1 size-3.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <div className="flex flex-wrap items-center gap-3">
                      {demo.id === "free" ? (
                        <Button asChild size="lg" variant="outline">
                          <a href="https://starter-demo.pycolors.io/">
                            Open Free demo
                            <ArrowUpRight
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          </a>
                        </Button>
                      ) : livePro ? (
                        <ProDemoLink>
                          Open Pro demo
                          <ArrowUpRight
                            className="size-3.5"
                            aria-hidden="true"
                          />
                        </ProDemoLink>
                      ) : (
                        <Button asChild size="lg">
                          <Link href="/starters/pro#product-tour">
                            <Play className="size-3.5" aria-hidden="true" />
                            Watch Pro tour
                          </Link>
                        </Button>
                      )}
                      <Link
                        href={`/starters/${demo.id}`}
                        className="inline-flex min-h-11 items-center text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      >
                        {demo.title} details
                      </Link>
                    </div>
                    <p className="mt-4 min-h-12 text-xs leading-6 text-muted-foreground">
                      {demo.id === "free"
                        ? "Frontend only. Connect your own services when you are ready."
                        : livePro
                          ? "No signup. A private workspace for two hours. Use fictitious information only."
                          : "Explore Pro in the product tour while the interactive demo is unavailable."}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-5 border-t border-border-subtle pt-7 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex max-w-2xl items-start gap-3">
              <ShieldCheck
                className="mt-1 size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="text-xs leading-6 text-muted-foreground">
                Demo invitations and plan upgrades are simulations. No payment
                details are requested. Purchasing the Starter Pro source licence
                is a separate step on its product page.
              </p>
            </div>
            <Link
              href="/starters"
              className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Compare Free and Pro
            </Link>
          </div>
        </Container>
      </MarketingSectionShell>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  LayoutDashboard,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { ProDemoLink } from "@/components/marketing/pro-demo-link";
import { SiteButton as Button } from "@/components/site-button";
import { proDemoUrl } from "@/lib/pro-demo-url";

export const metadata: Metadata = {
  title: "SaaS starter demos",
  description:
    "Try the PyColors starters. Explore the Free interface or create a private Starter Pro workspace to test projects, collaboration and a simulated upgrade.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "Try the PyColors starters",
    description:
      "Explore the interface and connected workspace journeys before choosing your SaaS foundation.",
    url: "/demo",
  },
};

const journeys = [
  {
    title: "Discover the dashboard",
    description:
      "Explore the charts, create a project and see your workspace activity update.",
    action: "Explore dashboard",
    destination: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Collaborate with a team",
    description:
      "Simulate an invitation, add a fictitious teammate and explore member roles.",
    action: "Explore team workflows",
    destination: "/admin",
    icon: Users,
  },
  {
    title: "Try Free → Pro",
    description:
      "Review and confirm a plan preview. No card, charge or subscription is created.",
    action: "Preview Free → Pro",
    destination: "/billing",
    icon: CreditCard,
  },
] as const;

function DemoCapture({
  product,
  light,
  dark,
  sizes,
  aspectRatio = "36 / 25",
}: Readonly<{
  product: string;
  light: string;
  dark: string;
  sizes: string;
  aspectRatio?: string;
}>) {
  return (
    <div
      className="relative overflow-hidden rounded-sm border border-border-subtle bg-background"
      style={{ aspectRatio }}
    >
      <Image
        src={light}
        alt={`${product} dashboard with fictional data, light theme`}
        fill
        sizes={sizes}
        className="object-contain dark:hidden"
      />
      <Image
        src={dark}
        alt={`${product} dashboard with fictional data, dark theme`}
        fill
        sizes={sizes}
        className="hidden object-contain dark:block"
      />
    </div>
  );
}

export default function DemoPage() {
  const livePro = Boolean(proDemoUrl());
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <Container className="pb-10 pt-24 sm:pb-12 sm:pt-28">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[{ label: "Product demos", variant: "outline" }]}
          title="See it work. Make it yours."
          description="Open the demos, explore the workflows and find the right starting point for your product."
        />
      </Container>

      <MarketingSectionShell
        width="full"
        spacing="compact"
        divider="pattern"
        aria-label="Choose a starter demo"
      >
        <Container>
          <article
            aria-labelledby="demo-pro-title"
            className="overflow-hidden rounded-md border border-border-subtle bg-surface"
          >
            <div className="grid min-w-0 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground">
                  <span className="font-mono uppercase tracking-widest">
                    Connected workspace
                  </span>
                  <span aria-hidden="true">/</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full ${livePro ? "bg-primary" : "bg-muted-foreground"}`}
                    />
                    {livePro ? "Interactive demo" : "Product tour"}
                  </span>
                </div>
                <h2
                  id="demo-pro-title"
                  className="mt-5 font-brand text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Starter Pro
                </h2>
                <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">
                  Create projects, explore team permissions and preview an
                  upgrade. Your saved workspace changes stay private for two
                  hours.
                </p>
                <dl className="mt-7 grid grid-cols-3 gap-3 border-y border-border-subtle py-4 text-xs">
                  {[
                    ["Access", "No signup"],
                    ["Session", "2 hours"],
                    ["Payments", "Simulated"],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-0 space-y-2">
                      <dt className="text-[11px] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                  {livePro ? (
                    <ProDemoLink variant="default">
                      Open Pro demo
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </ProDemoLink>
                  ) : (
                    <Button asChild size="lg">
                      <Link href="/starters/pro#product-tour">
                        <Play className="size-3.5" aria-hidden="true" />
                        Watch Pro tour
                      </Link>
                    </Button>
                  )}
                  <Button asChild size="lg" variant="outline">
                    <Link href="/starters/pro">Starter Pro details</Link>
                  </Button>
                </div>
                <p className="mt-4 text-xs leading-6 text-muted-foreground">
                  {livePro
                    ? "Use fictitious information only. No email or payment is sent."
                    : "Explore Starter Pro in the product tour."}
                </p>
              </div>
              <figure className="flex min-w-0 flex-col justify-center gap-3 border-t border-border-subtle bg-surface-muted/40 p-4 sm:p-6 lg:border-l lg:border-t-0">
                <div
                  aria-hidden="true"
                  className="flex items-center justify-between gap-3 text-[10px] text-muted-foreground"
                >
                  <span className="font-mono">WORKSPACE / OVERVIEW</span>
                  <LayoutDashboard className="size-3.5" />
                </div>
                <DemoCapture
                  product="Starter Pro"
                  light="/images/starters/pro/demo-dashboard-light.png"
                  dark="/images/starters/pro/demo-dashboard-dark.png"
                  sizes="(min-width: 1440px) 720px, (min-width: 1024px) 55vw, 100vw"
                />
                <figcaption className="text-[11px] leading-5 text-muted-foreground">
                  Example workspace · Fictional data
                </figcaption>
              </figure>
            </div>

            <section
              aria-labelledby="demo-journeys-title"
              className="border-t border-border-subtle"
            >
              <div className="px-6 pt-6 sm:px-8 lg:px-10">
                <h3 id="demo-journeys-title" className="text-sm font-semibold">
                  Three ways to explore
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                  Each journey opens the same private workspace experience.
                </p>
              </div>
              <ol className="grid divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
                {journeys.map((journey, index) => (
                  <li
                    key={journey.destination}
                    className="flex min-w-0 flex-col p-6 sm:p-8 lg:px-10 lg:py-7"
                  >
                    <div className="flex items-center justify-between gap-3 text-muted-foreground">
                      <journey.icon className="size-4" aria-hidden="true" />
                      <span
                        className="font-mono text-[10px]"
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <h4 className="mt-4 text-sm font-medium">
                      {journey.title}
                    </h4>
                    <p className="mb-3 mt-2 text-xs leading-6 text-muted-foreground">
                      {journey.description}
                    </p>
                    {livePro ? (
                      <div className="mt-auto">
                        <ProDemoLink
                          appearance="text"
                          destination={journey.destination}
                        >
                          {journey.action}
                          <ArrowUpRight className="size-3" aria-hidden="true" />
                        </ProDemoLink>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          </article>

          <article
            aria-labelledby="demo-free-title"
            className="mt-8 grid min-w-0 overflow-hidden rounded-md border border-border-subtle bg-surface lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Frontend foundation
              </p>
              <h2
                id="demo-free-title"
                className="mt-4 font-brand text-2xl font-semibold tracking-tight"
              >
                Starter Free
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Explore the interface, appearance controls and SaaS screens.
                Connect your own backend when you are ready.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Dashboard, projects and account screens",
                  "Demo data and client-side interactions",
                  "No real accounts, database or payments",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs leading-6"
                  >
                    <Check
                      className="mt-1 size-3.5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="outline">
                  <a href="https://starter-demo.pycolors.io/">
                    Open Free demo
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </Button>
                <Link
                  href="/starters/free"
                  className="inline-flex min-h-11 items-center text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Starter Free details
                </Link>
              </div>
            </div>
            <figure className="flex min-w-0 flex-col justify-center gap-3 border-t border-border-subtle bg-surface-muted/40 p-4 sm:p-6 lg:border-l lg:border-t-0">
              <DemoCapture
                product="Starter Free"
                light="/images/starters/free/product-preview/dashboard-light.png"
                dark="/images/starters/free/product-preview/dashboard-dark.png"
                sizes="(min-width: 1440px) 540px, (min-width: 1024px) 40vw, 100vw"
                aspectRatio="8 / 5"
              />
              <figcaption className="text-[11px] leading-5 text-muted-foreground">
                Frontend demo · Fictional data
              </figcaption>
            </figure>
          </article>

          <div className="mt-8 flex flex-col gap-5 border-t border-border-subtle pt-7 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex max-w-2xl items-start gap-3">
              <ShieldCheck
                className="mt-1 size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="text-xs leading-6 text-muted-foreground">
                Invitations and plan upgrades are simulations. No card details
                are requested. The Starter Pro source licence is purchased
                separately.
              </p>
            </div>
            <Link
              href="/starters"
              className="inline-flex min-h-11 shrink-0 items-center text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Compare Free and Pro
            </Link>
          </div>
        </Container>
      </MarketingSectionShell>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteButton } from "@/components/site-button";
import { StarterProFaqExplorer } from "@/components/starters/starter-pro-faq-explorer";

const title = "Starter Pro FAQ";
const description =
  "Find Starter Pro answers about setup, included features, purchase access, licensing and refunds, with links to documentation and support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/starters/pro/faq" },
  openGraph: {
    title: `${title} — PyColors`,
    description,
    url: "/starters/pro/faq",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — PyColors`,
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const nextSteps = [
  {
    title: "Prepare local setup",
    description: "Follow the prerequisites and checkpoints for your release.",
    href: "/docs/starter-pro/getting-started",
    label: "Read the setup guide",
  },
  {
    title: "Purchase or access question?",
    description:
      "Use the existing support route for a purchase or access issue.",
    href: "/orders/support",
    label: "Contact purchase support",
  },
  {
    title: "Missing your access link?",
    description: "Open purchase recovery using the email used at checkout.",
    href: "/orders/recover",
    label: "Recover purchase access",
  },
] as const;

export default function StarterProFaqPage() {
  return (
    <main className="py-14 sm:py-20">
      <Container>
        <PageHero
          variant="compact"
          align="left"
          maxWidth="5xl"
          title="Starter Pro questions, answered."
          description="Find an answer before choosing Starter Pro or setting up your purchase. Browse by topic, search the existing buyer answers, and follow the relevant documentation."
          actions={
            <>
              <SiteButton asChild>
                <Link href="/starters/pro">Explore Starter Pro</Link>
              </SiteButton>
              <SiteButton asChild variant="outline">
                <Link href="/pricing">View pricing</Link>
              </SiteButton>
            </>
          }
        />

        <div className="mx-auto mt-12 max-w-5xl">
          <StarterProFaqExplorer />

          <section
            aria-labelledby="faq-next-steps"
            className="mt-14 border-t border-border pt-10"
          >
            <h2
              id="faq-next-steps"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Need a next step?
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {nextSteps.map((step) => (
                <li
                  key={step.href}
                  className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-medium text-foreground">{step.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                  <SiteButton
                    asChild
                    variant="outline"
                    className="mt-5 min-h-11"
                  >
                    <Link href={step.href}>{step.label}</Link>
                  </SiteButton>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  FolderKanban,
  MessageSquare,
  Users,
} from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { ProductStudioCapture } from "@/components/marketing/product-studio-capture";
import { ProDemoLink } from "@/components/marketing/pro-demo-link";
import { SiteButton } from "@/components/site-button";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { productStudio } from "@/lib/showcase/product-studio";

const title = "Product studio — a Starter Pro reference by PyColors";
const description =
  "Explore a PyColors-built reference workspace: release planning, assigned tasks and review discussions. Real Starter Pro captures, fictional data and a live demo.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: productStudio.href },
  openGraph: {
    title,
    description,
    url: productStudio.href,
    type: "website",
    images: [
      {
        url: productStudio.images.dashboard.light,
        width: 1440,
        height: 1100,
        alt: productStudio.images.dashboard.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [productStudio.images.dashboard.light],
  },
};
const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function ProductStudioPage() {
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <JsonLd
        id="product-studio-breadcrumb"
        data={generateBreadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Starter Pro", href: "/starters/pro" },
          { label: productStudio.name, href: productStudio.href },
        ])}
      />
      <Container className="pb-10 pt-20 sm:pb-14 sm:pt-24">
        <Link
          href="/starters/pro#built-with-pycolors"
          className={`${linkClass} mb-8 text-xs text-muted-foreground`}
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to Starter Pro
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr] lg:items-end lg:gap-16">
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0"
            badges={[{ label: productStudio.label, variant: "outline" }]}
            title="From a release plan to shared delivery."
            description={productStudio.summary}
            actions={
              <>
                <ProDemoLink destination="/projects">
                  Try the project workflow
                </ProDemoLink>
                <SiteButton asChild variant="ghost" size="lg">
                  <Link href="/docs/starter-pro/recipes/client-tracking">
                    Read the adaptation recipe
                  </Link>
                </SiteButton>
              </>
            }
          />
          <dl className="divide-y divide-border-subtle border-y border-border-subtle text-xs">
            {[
              ["Example", productStudio.name],
              ["Built by", "PyColors"],
              ["Foundation", "Starter Pro"],
              ["Data", "Fictional demo fixtures"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-4">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-6 text-muted-foreground">
          {productStudio.disclosure}
        </p>
        <figure className="mt-8">
          <ProductStudioCapture priority />
          <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">
            Product studio · Workspace overview. Unedited application capture
            with fictional data, shown in the PyColors palette.
          </figcaption>
        </figure>
      </Container>
      <Container>
        <MarketingSectionShell
          width="full"
          aria-labelledby="studio-workflow-heading"
        >
          <MarketingSectionHeader
            titleId="studio-workflow-heading"
            eyebrow="The scenario"
            title="One release. A clear path through the work."
            description="A small product team needs to agree the scope, assign delivery and keep its review notes in context. The Launch checklist project demonstrates that flow."
            align="left"
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {productStudio.workflow.map((step, i) => (
              <li
                key={step.title}
                className="min-w-0 border-t border-border-subtle pt-5"
              >
                <span
                  className="font-mono text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
                <p className="mt-4 border-l-2 border-primary/30 pl-3 text-xs leading-6">
                  {step.task}
                </p>
              </li>
            ))}
          </ol>
          <figure className="mt-10">
            <ProductStudioCapture view="project" />
            <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">
              Launch checklist · Assigned tasks, calendar due dates and task
              discussion. Unedited application capture with fictional data.
            </figcaption>
          </figure>
        </MarketingSectionShell>
        <MarketingSectionShell
          width="full"
          aria-labelledby="studio-foundation-heading"
        >
          <MarketingSectionHeader
            titleId="studio-foundation-heading"
            eyebrow="What powers the example"
            title="Use the connected foundation. Shape the business rules."
            align="left"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-base font-semibold">
                Already in the starter
              </h3>
              <ul className="mt-5 space-y-5">
                {[
                  {
                    icon: Users,
                    title: "A shared workspace",
                    description:
                      "Accounts and membership determine access to the workspace. Project assignees identify responsibility; they do not restrict visibility.",
                  },
                  {
                    icon: FolderKanban,
                    title: "Persistent project work",
                    description:
                      "Projects, task status, assignees and due dates are saved in PostgreSQL. Archive a project to pause task and comment changes.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Discussion in context",
                    description:
                      "Comments stay with a task. Workspace permissions govern moderation, and activity records useful workspace events.",
                  },
                ].map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-border-subtle bg-surface">
                      <Icon
                        className="size-4 text-muted-foreground"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h4 className="text-sm font-medium">{title}</h4>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <aside
              className="self-start rounded-sm border border-border-subtle bg-surface p-6 sm:p-8"
              aria-labelledby="studio-adapt-heading"
            >
              <h3 id="studio-adapt-heading" className="text-base font-semibold">
                Where your product begins
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                This example manages internal work. A customer portal,
                contractual approval, automated reminders or a support SLA needs
                additional data, permissions and behavior.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The starter supplies the reusable project workflow. The recipe
                explains how to adapt it to client engagements without
                presenting a finished CRM.
              </p>
              <Link
                href="/docs/starter-pro/recipes/client-tracking"
                className={`${linkClass} mt-4`}
              >
                Follow the client tracking recipe
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </MarketingSectionShell>
        <MarketingSectionShell
          width="full"
          aria-labelledby="studio-try-heading"
        >
          <div className="grid gap-8 rounded-sm border border-border-subtle bg-surface p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Inspect it yourself
              </p>
              <h2
                id="studio-try-heading"
                className="mt-4 font-brand text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Try the workflow. Then make it yours.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Open Projects, choose Launch checklist and explore its tasks and
                discussion. The demo starts with the same scenario; your private
                workspace and dates may differ from the captures. Use Customize
                to change the palette, font and sidebar style.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ProDemoLink destination="/projects">
                  Open the live demo
                </ProDemoLink>
                <SiteButton asChild variant="ghost" size="lg">
                  <Link href="/starters/pro#purchase">Explore Starter Pro</Link>
                </SiteButton>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Before you explore</h3>
              <ul className="mt-4 space-y-3 text-xs leading-6 text-muted-foreground">
                {[
                  "No signup; private access lasts two hours.",
                  "Projects, tasks and comments are saved during the session.",
                  "Invitations and billing are simulations. No email or payment is sent.",
                  "Demo records are fictional and are cleaned up after expiry.",
                ].map((text) => (
                  <li key={text} className="flex gap-2">
                    <Check
                      className="mt-1 size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}

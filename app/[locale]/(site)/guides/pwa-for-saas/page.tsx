import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import type { Metadata } from "next";

import { Badge } from "@pycolors/ui";

import { GuidePageShell } from "@/components/guides/guide-page-shell";
import {
  GuideSection as Section,
  GuideCallout as Alert,
  GuideCalloutTitle as AlertTitle,
  GuideCalloutDescription as AlertDescription,
  GuideNextSteps,
} from "@/components/guides/guide-content";

import { Callout } from "fumadocs-ui/components/callout";
import { File, Files, Folder } from "fumadocs-ui/components/files";

import {
  Blocks,
  CheckCircle2,
  Download,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  WifiOff,
  Zap,
} from "lucide-react";

import { DocsFeatureGrid } from "@/components/docs/docs-feature-grid";
import { DocsDecisionGrid } from "@/components/docs/docs-decision-grid";
import { DocsConceptTabs } from "@/components/docs/docs-concept-tabs";
import { DocsLinks } from "@/components/docs/docs-links";
import { PreferAvoid } from "@/components/docs/prefer-avoid";

const metadata: Metadata = {
  title: "Why PWA Foundations Matter for Modern SaaS",
  description:
    "Learn why installability, standalone mode, offline resilience, and app-like UX improve SaaS credibility — and how to approach PWA architecture without overengineering.",

  alternates: {
    canonical: "/guides/pwa-for-saas",
  },

  openGraph: {
    title: "Why PWA Foundations Matter for Modern SaaS",
    description:
      "Learn how installability, standalone mode, mobile-safe layouts, and offline resilience improve modern SaaS credibility.",
    url: "/guides/pwa-for-saas",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Why PWA Foundations Matter for Modern SaaS",
    description:
      "A production-oriented guide to PWA architecture for SaaS products.",
    images: ["/seo/twitter-main.png"],
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "why-pwas-are-returning", label: "Why PWAs are returning" },
  {
    id: "why-most-saas-feel-like-websites",
    label: "Why SaaS still feels like websites",
  },
  { id: "what-actually-matters", label: "What actually matters" },
  { id: "correct-mental-model", label: "Correct mental model" },
  { id: "what-to-avoid", label: "What to avoid" },
  { id: "starter-pro-approach", label: "Starter Pro approach" },
  { id: "project-structure", label: "Project structure" },
  { id: "production-checklist", label: "Production checklist" },
  { id: "final-takeaway", label: "Final takeaway" },
  { id: "next-steps", label: "Next steps" },
];

export default function GuidePwaForSaasPage() {
  const tSite = useCopy();

  return (
    <GuidePageShell
      title={tSite("Why PWA foundations matter for modern SaaS")}
      description={tSite(
        "Learn how installability, standalone mode, offline resilience, and mobile-safe UX improve SaaS credibility without overengineering.",
      )}
      toc={toc}
      tags={["Next.js", "PWA"]}
      documentation={{
        title: "PWA documentation",
        href: "/docs/starter-pro/pwa",
      }}
      relatedGuides={[
        {
          title: "SaaS dashboard design patterns",
          href: "/guides/saas-dashboard-design",
        },
        {
          title: "How to build a SaaS with Next.js",
          href: "/guides/build-saas-nextjs",
        },
      ]}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
        {
          label: "Why PWA foundations matter for modern SaaS",
          href: "/guides/pwa-for-saas",
        },
      ]}
    >
      <div>
        <section id="overview" className="scroll-mt-28 py-10 sm:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{tSite("Guide")}</Badge>
              <Badge>{tSite("PWA")}</Badge>
              <Badge variant="secondary">{tSite("Starter Pro")}</Badge>
            </div>

            <Alert>
              <AlertTitle>{tSite("Core idea")}</AlertTitle>
              <AlertDescription>
                {tSite(
                  "The real value of a PWA is not replacing native apps. The real value is improving SaaS credibility, resilience, installability, and app-like UX.",
                )}
              </AlertDescription>
            </Alert>

            <p>
              {tSite(
                "Modern SaaS applications increasingly use PWA foundations to create stronger mobile experiences, standalone app behavior, and more resilient product surfaces.",
              )}
            </p>
          </div>
        </section>

        <Section
          id="why-pwas-are-returning"
          title={tSite("Why PWAs are returning")}
          description={tSite(
            "Modern browser capabilities changed the conversation.",
          )}
        >
          <p>
            {tSite(
              "PWAs are becoming relevant again because the web platform is significantly stronger today than it was a few years ago.",
            )}
          </p>

          <DocsFeatureGrid
            columns={2}
            tone="platform"
            items={[
              {
                title: "Installability",
                description:
                  "Modern browsers now provide strong install flows and standalone experiences.",
                icon: Download,
              },
              {
                title: "Standalone mode",
                description:
                  "Products can now feel more application-oriented instead of temporary webpages.",
                icon: MonitorSmartphone,
              },
              {
                title: "Offline resilience",
                description:
                  "Fallback pages and resilient navigation improve reliability.",
                icon: WifiOff,
              },
              {
                title: "Mobile-safe UX",
                description:
                  "Viewport-fit handling and safe-area support improve mobile credibility.",
                icon: Smartphone,
              },
            ]}
          />
        </Section>

        <Section
          id="why-most-saas-feel-like-websites"
          title={tSite("Why most SaaS still feels like websites")}
          description={tSite(
            "Many products technically work on mobile but still feel temporary.",
          )}
        >
          <DocsDecisionGrid
            columns={2}
            tone="platform"
            items={[
              {
                eyebrow: "Problem",
                title: "No installability",
                description:
                  "No manifest, screenshots, or standalone behavior.",
                icon: Download,
                items: [
                  "no install flow",
                  "no app icons",
                  "no screenshots",
                  "weak persistence",
                ],
              },
              {
                eyebrow: "Problem",
                title: "Weak mobile UX",
                description:
                  "Safe-area and viewport issues reduce product quality perception.",
                icon: Smartphone,
                items: [
                  "layout jumps",
                  "unsafe viewport handling",
                  "weak standalone behavior",
                  "browser chrome conflicts",
                ],
              },
            ]}
          />
        </Section>

        <Section
          id="what-actually-matters"
          title={tSite("What actually matters")}
          description={tSite(
            "Good SaaS PWAs are usually simpler than expected.",
          )}
        >
          <DocsConceptTabs
            items={[
              {
                value: "Manifest",
                title: "Structured installability",
                icon: Download,
                description: (
                  <>
                    {tSite("A modern SaaS PWA should include:")}
                    <ul className="mt-3 space-y-1">
                      <li>{tSite("• app manifest")}</li>
                      <li>{tSite("• professional icons")}</li>
                      <li>{tSite("• standalone mode")}</li>
                      <li>{tSite("• screenshots")}</li>
                    </ul>
                  </>
                ),
              },
              {
                value: "Offline",
                title: "Safe offline handling",
                icon: WifiOff,
                description: (
                  <>
                    {tSite("Lightweight offline support is often enough:")}
                    <ul className="mt-3 space-y-1">
                      <li>{tSite("• offline route")}</li>
                      <li>{tSite("• resilient navigation")}</li>
                      <li>{tSite("• graceful fallback behavior")}</li>
                    </ul>
                  </>
                ),
              },
              {
                value: "UX",
                title: "Mobile-safe UX",
                icon: Smartphone,
                description: (
                  <>
                    {tSite("Most credibility gains come from:")}
                    <ul className="mt-3 space-y-1">
                      <li>{tSite("• viewport-fit handling")}</li>
                      <li>{tSite("• safe-area support")}</li>
                      <li>{tSite("• standalone consistency")}</li>
                    </ul>
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section
          id="correct-mental-model"
          title={tSite("Correct mental model")}
          description={tSite("Offline UX should not replace backend truth.")}
        >
          <Callout type="warning" title={tSite("Important")}>
            {tSite(
              "A serious SaaS should never treat cached frontend state as authoritative business truth.",
            )}
          </Callout>

          <p>
            {tSite(
              "PWA architecture should improve resilience and mobile UX — not redefine authentication, billing, permissions, or backend state ownership.",
            )}
          </p>
        </Section>

        <Section
          id="what-to-avoid"
          title={tSite("What to avoid")}
          description={tSite(
            "Most dangerous PWA patterns come from overengineering.",
          )}
        >
          <PreferAvoid
            preferTitle="Healthy PWA foundations"
            avoidTitle="Dangerous PWA patterns"
            prefer={[
              "lightweight service workers",
              "safe offline fallback pages",
              "mobile-safe viewport handling",
              "progressive enhancement",
            ]}
            avoid={[
              "offline auth as source of truth",
              "aggressive billing caching",
              "overengineered service workers",
              "trying to replace native apps",
            ]}
          />
        </Section>

        <Section
          id="starter-pro-approach"
          title={tSite("How Starter Pro approaches PWAs")}
          description={tSite(
            "Starter Pro intentionally keeps the PWA layer production-safe.",
          )}
        >
          <p>{tSite("Starter Pro focuses on:")}</p>

          <ul className="space-y-1">
            <li>{tSite("• installability")}</li>
            <li>{tSite("• standalone mode")}</li>
            <li>{tSite("• offline fallback")}</li>
            <li>{tSite("• mobile-safe UX")}</li>
            <li>{tSite("• production-safe architecture")}</li>
          </ul>
        </Section>

        <Section
          id="project-structure"
          title={tSite("Typical PWA structure")}
          description={tSite(
            "Starter Pro keeps the PWA structure intentionally understandable.",
          )}
        >
          <Files>
            <Folder name="app" defaultOpen>
              <File name="manifest.ts" />
              <File name="offline/page.tsx" />
              <File name="layout.tsx" />
            </Folder>

            <Folder name="components" defaultOpen>
              <Folder name="pwa" defaultOpen>
                <File name="pwa-register.tsx" />
              </Folder>
            </Folder>

            <Folder name="public" defaultOpen>
              <Folder name="pwa" defaultOpen>
                <File name="icon-192.png" />
                <File name="icon-512.png" />
                <File name="maskable-icon-512.png" />
                <File name="dashboard-desktop.png" />
                <File name="dashboard-mobile.png" />
              </Folder>

              <File name="sw.js" />
              <File name="favicon.ico" />
              <File name="apple-icon.png" />
            </Folder>
          </Files>
        </Section>

        <Section
          id="production-checklist"
          title={tSite("Production checklist")}
          description={tSite("Validate the fundamentals before shipping.")}
        >
          <DocsDecisionGrid
            columns={2}
            tone="success"
            items={[
              {
                eyebrow: "Installability",
                title: "Manifest validation",
                description:
                  "Ensure your PWA meets installability requirements",
                icon: CheckCircle2,
                items: [
                  "valid manifest",
                  "professional icons",
                  "maskable icon",
                  "screenshots",
                ],
              },
              {
                eyebrow: "Operations",
                title: "Production discipline",
                description: "Validate critical aspects before shipping",
                icon: ShieldCheck,
                items: [
                  "cache review",
                  "offline validation",
                  "auth verification",
                  "billing verification",
                ],
              },
            ]}
          />
        </Section>

        <Section
          id="final-takeaway"
          title={tSite("Final takeaway")}
          description={tSite(
            "The future of SaaS PWAs is probably simpler than expected.",
          )}
        >
          <p>
            {tSite("The best SaaS PWAs are usually the most disciplined ones.")}
          </p>

          <p>
            {tSite(
              "Not maximum complexity. Just enough application behavior to improve product credibility and resilience.",
            )}
          </p>
        </Section>

        <GuideNextSteps
          title={tSite("Explore Starter Pro PWA foundations")}
          description={tSite(
            "Review the installable app foundations in Starter Pro, then follow the setup and production checklist for your environment.",
          )}
          primary={{ href: "/docs/starter-pro/pwa", label: "PWA docs" }}
        />

        <section className="border-t border-border/60 py-8 sm:py-10">
          <DocsLinks
            variant="grid"
            items={[
              {
                title: "Starter Pro PWA documentation",
                href: "/docs/starter-pro/pwa",
                description:
                  "Understand the installable app foundations included in Starter Pro.",
                icon: Smartphone,
              },
              {
                title: "PWA setup",
                href: "/docs/starter-pro/pwa-setup",
                description:
                  "Configure manifest, icons, service worker, screenshots, and metadata.",
                icon: Zap,
              },
              {
                title: "PWA production checklist",
                href: "/docs/starter-pro/pwa-production-checklist",
                description: "Validate installability and release readiness.",
                icon: ShieldCheck,
              },
              {
                title: "Explore Starter Pro",
                href: "/starters/pro",
                description:
                  "Production-ready SaaS foundations with authentication, billing, dashboard architecture, and PWA support.",
                icon: Blocks,
              },
            ]}
          />
        </section>
      </div>
    </GuidePageShell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/guides/pwa-for-saas", locale);
}

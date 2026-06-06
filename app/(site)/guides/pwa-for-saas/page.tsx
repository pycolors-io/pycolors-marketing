import Link from 'next/link';
import type { Metadata } from 'next';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
} from '@pycolors/ui';

import { GuidePageShell } from '@/components/guides/guide-page-shell';

import { Callout } from 'fumadocs-ui/components/callout';
import { File, Files, Folder } from 'fumadocs-ui/components/files';

import {
  Blocks,
  CheckCircle2,
  Download,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  WifiOff,
  Zap,
} from 'lucide-react';

import { DocsFeatureGrid } from '@/components/docs/docs-feature-grid';
import { DocsDecisionGrid } from '@/components/docs/docs-decision-grid';
import { DocsConceptTabs } from '@/components/docs/docs-concept-tabs';
import { DocsLinks } from '@/components/docs/docs-links';
import { PreferAvoid } from '@/components/docs/prefer-avoid';

export const metadata: Metadata = {
  title: 'Why PWA Foundations Matter for Modern SaaS',
  description:
    'Learn why installability, standalone mode, offline resilience, and app-like UX improve SaaS credibility — and how to approach PWA architecture without overengineering.',

  alternates: {
    canonical: '/guides/pwa-for-saas',
  },

  openGraph: {
    title: 'Why PWA Foundations Matter for Modern SaaS',
    description:
      'Learn how installability, standalone mode, mobile-safe layouts, and offline resilience improve modern SaaS credibility.',
    url: '/guides/pwa-for-saas',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Why PWA Foundations Matter for Modern SaaS',
    description:
      'A production-oriented guide to PWA architecture for SaaS products.',
    images: ['/seo/twitter-main.png'],
  },
};

function Section({
  id,
  title,
  description,
  children,
}: Readonly<{
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}>) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-border/60 py-10 sm:py-12"
    >
      <div className="mb-5 space-y-1 sm:mb-6">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>

        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'why-pwas-are-returning', label: 'Why PWAs are returning' },
  {
    id: 'why-most-saas-feel-like-websites',
    label: 'Why SaaS still feels like websites',
  },
  { id: 'what-actually-matters', label: 'What actually matters' },
  { id: 'correct-mental-model', label: 'Correct mental model' },
  { id: 'what-to-avoid', label: 'What to avoid' },
  { id: 'starter-pro-approach', label: 'Starter Pro approach' },
  { id: 'project-structure', label: 'Project structure' },
  { id: 'production-checklist', label: 'Production checklist' },
  { id: 'final-takeaway', label: 'Final takeaway' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuidePwaForSaasPage() {
  return (
    <GuidePageShell
      title="Why PWA foundations matter for modern SaaS"
      description="Learn how installability, standalone mode, offline resilience, and mobile-safe UX improve SaaS credibility without overengineering."
      toc={toc}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        {
          label: 'Why PWA foundations matter for modern SaaS',
          href: '/guides/pwa-for-saas',
        },
      ]}
    >
      <div>
        <section
          id="overview"
          className="scroll-mt-28 py-10 sm:py-12"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Guide</Badge>
              <Badge>PWA</Badge>
              <Badge variant="secondary">Starter Pro</Badge>
            </div>

            <Alert>
              <AlertTitle>Core idea</AlertTitle>
              <AlertDescription>
                The real value of a PWA is not replacing native apps.
                The real value is improving SaaS credibility,
                resilience, installability, and app-like UX.
              </AlertDescription>
            </Alert>

            <p>
              Modern SaaS applications increasingly use PWA
              foundations to create stronger mobile experiences,
              standalone app behavior, and more resilient product
              surfaces.
            </p>
          </div>
        </section>

        <Section
          id="why-pwas-are-returning"
          title="Why PWAs are returning"
          description="Modern browser capabilities changed the conversation."
        >
          <p>
            PWAs are becoming relevant again because the web platform
            is significantly stronger today than it was a few years
            ago.
          </p>

          <DocsFeatureGrid
            columns={2}
            tone="platform"
            items={[
              {
                title: 'Installability',
                description:
                  'Modern browsers now provide strong install flows and standalone experiences.',
                icon: Download,
              },
              {
                title: 'Standalone mode',
                description:
                  'Products can now feel more application-oriented instead of temporary webpages.',
                icon: MonitorSmartphone,
              },
              {
                title: 'Offline resilience',
                description:
                  'Fallback pages and resilient navigation improve reliability.',
                icon: WifiOff,
              },
              {
                title: 'Mobile-safe UX',
                description:
                  'Viewport-fit handling and safe-area support improve mobile credibility.',
                icon: Smartphone,
              },
            ]}
          />
        </Section>

        <Section
          id="why-most-saas-feel-like-websites"
          title="Why most SaaS still feels like websites"
          description="Many products technically work on mobile but still feel temporary."
        >
          <DocsDecisionGrid
            columns={2}
            tone="platform"
            items={[
              {
                eyebrow: 'Problem',
                title: 'No installability',
                description:
                  'No manifest, screenshots, or standalone behavior.',
                icon: Download,
                items: [
                  'no install flow',
                  'no app icons',
                  'no screenshots',
                  'weak persistence',
                ],
              },
              {
                eyebrow: 'Problem',
                title: 'Weak mobile UX',
                description:
                  'Safe-area and viewport issues reduce product quality perception.',
                icon: Smartphone,
                items: [
                  'layout jumps',
                  'unsafe viewport handling',
                  'weak standalone behavior',
                  'browser chrome conflicts',
                ],
              },
            ]}
          />
        </Section>

        <Section
          id="what-actually-matters"
          title="What actually matters"
          description="Good SaaS PWAs are usually simpler than expected."
        >
          <DocsConceptTabs
            items={[
              {
                value: 'Manifest',
                title: 'Structured installability',
                icon: Download,
                description: (
                  <>
                    A modern SaaS PWA should include:
                    <ul className="mt-3 space-y-1">
                      <li>• app manifest</li>
                      <li>• professional icons</li>
                      <li>• standalone mode</li>
                      <li>• screenshots</li>
                    </ul>
                  </>
                ),
              },
              {
                value: 'Offline',
                title: 'Safe offline handling',
                icon: WifiOff,
                description: (
                  <>
                    Lightweight offline support is often enough:
                    <ul className="mt-3 space-y-1">
                      <li>• offline route</li>
                      <li>• resilient navigation</li>
                      <li>• graceful fallback behavior</li>
                    </ul>
                  </>
                ),
              },
              {
                value: 'UX',
                title: 'Mobile-safe UX',
                icon: Smartphone,
                description: (
                  <>
                    Most credibility gains come from:
                    <ul className="mt-3 space-y-1">
                      <li>• viewport-fit handling</li>
                      <li>• safe-area support</li>
                      <li>• standalone consistency</li>
                    </ul>
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section
          id="correct-mental-model"
          title="Correct mental model"
          description="Offline UX should not replace backend truth."
        >
          <Callout type="warning" title="Important">
            A serious SaaS should never treat cached frontend state as
            authoritative business truth.
          </Callout>

          <p>
            PWA architecture should improve resilience and mobile UX —
            not redefine authentication, billing, permissions, or
            backend state ownership.
          </p>
        </Section>

        <Section
          id="what-to-avoid"
          title="What to avoid"
          description="Most dangerous PWA patterns come from overengineering."
        >
          <PreferAvoid
            preferTitle="Healthy PWA foundations"
            avoidTitle="Dangerous PWA patterns"
            prefer={[
              'lightweight service workers',
              'safe offline fallback pages',
              'mobile-safe viewport handling',
              'progressive enhancement',
            ]}
            avoid={[
              'offline auth as source of truth',
              'aggressive billing caching',
              'overengineered service workers',
              'trying to replace native apps',
            ]}
          />
        </Section>

        <Section
          id="starter-pro-approach"
          title="How Starter Pro approaches PWAs"
          description="Starter Pro intentionally keeps the PWA layer production-safe."
        >
          <p>Starter Pro focuses on:</p>

          <ul className="space-y-1">
            <li>• installability</li>
            <li>• standalone mode</li>
            <li>• offline fallback</li>
            <li>• mobile-safe UX</li>
            <li>• production-safe architecture</li>
          </ul>
        </Section>

        <Section
          id="project-structure"
          title="Typical PWA structure"
          description="Starter Pro keeps the PWA structure intentionally understandable."
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
          title="Production checklist"
          description="Validate the fundamentals before shipping."
        >
          <DocsDecisionGrid
            columns={2}
            tone="success"
            items={[
              {
                eyebrow: 'Installability',
                title: 'Manifest validation',
                description:
                  'Ensure your PWA meets installability requirements',
                icon: CheckCircle2,
                items: [
                  'valid manifest',
                  'professional icons',
                  'maskable icon',
                  'screenshots',
                ],
              },
              {
                eyebrow: 'Operations',
                title: 'Production discipline',
                description:
                  'Validate critical aspects before shipping',
                icon: ShieldCheck,
                items: [
                  'cache review',
                  'offline validation',
                  'auth verification',
                  'billing verification',
                ],
              },
            ]}
          />
        </Section>

        <Section
          id="final-takeaway"
          title="Final takeaway"
          description="The future of SaaS PWAs is probably simpler than expected."
        >
          <p>
            The best SaaS PWAs are usually the most disciplined ones.
          </p>

          <p>
            Not maximum complexity. Just enough application behavior
            to improve product credibility and resilience.
          </p>
        </Section>

        <section
          id="next-steps"
          className="scroll-mt-28 border-t border-border/60 py-8 sm:py-10"
        >
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Explore Starter Pro PWA foundations
                </h2>

                <p className="text-sm text-muted-foreground">
                  Discover the installable app architecture included
                  in Starter Pro.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/docs/starter-pro/pwa">PWA docs</Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/starters/pro">
                    Explore Starter Pro
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <DocsLinks
            variant="grid"
            items={[
              {
                title: 'Starter Pro PWA documentation',
                href: '/docs/starter-pro/pwa',
                description:
                  'Understand the installable app foundations included in Starter Pro.',
                icon: Smartphone,
              },
              {
                title: 'PWA setup',
                href: '/docs/starter-pro/pwa-setup',
                description:
                  'Configure manifest, icons, service worker, screenshots, and metadata.',
                icon: Zap,
              },
              {
                title: 'PWA production checklist',
                href: '/docs/starter-pro/pwa-production-checklist',
                description:
                  'Validate installability and release readiness.',
                icon: ShieldCheck,
              },
              {
                title: 'Explore Starter Pro',
                href: '/starters/pro',
                description:
                  'Production-ready SaaS foundations with authentication, billing, dashboard architecture, and PWA support.',
                icon: Blocks,
              },
            ]}
          />
        </section>
      </div>
    </GuidePageShell>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Check, LockKeyhole } from "lucide-react";
import { Button } from "@pycolors/ui";

import { Container } from "@/components/container";
import { UiSectionNav } from "@/components/marketing/ui-section-nav";
import { PageHero } from "@/components/marketing/page-hero";
import { ThemeBuilder } from "@/components/theme-builder/theme-builder";
import {
  THEME_BUILDER_DESCRIPTION,
  THEME_BUILDER_PATH,
  THEME_BUILDER_TITLE,
} from "@/components/theme-builder/theme-builder-launch";

export const metadata: Metadata = {
  title: { absolute: THEME_BUILDER_TITLE },
  description: THEME_BUILDER_DESCRIPTION,
  alternates: {
    canonical: THEME_BUILDER_PATH,
  },
  openGraph: {
    title: THEME_BUILDER_TITLE,
    description: THEME_BUILDER_DESCRIPTION,
    url: THEME_BUILDER_PATH,
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: THEME_BUILDER_TITLE,
    description: THEME_BUILDER_DESCRIPTION,
    images: ["/seo/twitter-main.png"],
  },
};

export default function ThemeBuilderPage() {
  return (
    <main id="content" className="bg-background text-foreground">
      <Container className="pt-24 pb-8 sm:pt-28 sm:pb-10">
        <UiSectionNav active="themes" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <PageHero
            variant="compact"
            align="left"
            badges={[{ label: "Theme Builder", variant: "outline" }]}
            title="Your brand. Your theme."
            description="Turn your brand color into a complete light and dark theme. Try it on real PyColors components, then take the tokens into your app."
            contentClassName="mx-0 max-w-2xl"
          />
          <Button
            asChild
            variant="outline"
            className="min-h-11 w-fit shrink-0 rounded-[5px]"
          >
            <Link href="/docs/ui/theming">
              <BookOpen aria-hidden="true" />
              Theming guide
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Check className="size-3.5" aria-hidden="true" />
            Free, no account needed
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="size-3.5" aria-hidden="true" />
            Light and dark included
          </span>
          <span className="inline-flex items-center gap-2">
            <LockKeyhole className="size-3.5" aria-hidden="true" />
            Your colors stay in your browser
          </span>
        </div>
      </Container>

      <Container className="pb-12 lg:pb-16">
        <ThemeBuilder />
      </Container>

      <section className="border-t border-border-subtle">
        <Container className="py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <section aria-labelledby="theme-builder-integration-heading">
              <p className="text-xs font-medium text-muted-foreground">
                From preview to product
              </p>
              <h2
                id="theme-builder-integration-heading"
                className="mt-2 text-xl font-semibold tracking-tight"
              >
                Make it part of your app.
              </h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                <li>
                  Install <code>@pycolors/tokens</code> and import{" "}
                  <code>@pycolors/tokens/tokens.css</code> once in your global
                  stylesheet.
                </li>
                <li>
                  Paste your generated overrides after that import. Keep the
                  existing Tailwind v4 <code>@theme inline</code> bridge.
                </li>
                <li>
                  Use semantic utilities and public <code>@pycolors/ui</code>{" "}
                  imports, then check your screens in both modes.
                </li>
              </ol>
              <Link
                href="/docs/ui/theming"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Read the theming guide
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </section>
            <section
              aria-labelledby="theme-builder-limitations-heading"
              className="border-t border-border-subtle pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
            >
              <p className="text-xs font-medium text-muted-foreground">
                Before you ship
              </p>
              <h2
                id="theme-builder-limitations-heading"
                className="mt-2 text-xl font-semibold tracking-tight"
              >
                Review it in context.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Theme Builder is contrast-aware, not an accessibility
                certification. Review generated values in the real interface
                before shipping.
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li>Brand perception across your product and audience.</li>
                <li>Complete component and page context.</li>
                <li>Color-vision deficiencies and non-color cues.</li>
                <li>States communicated only by color.</li>
                <li>Real focus, hover, and disabled contexts.</li>
              </ul>
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}

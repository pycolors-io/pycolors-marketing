import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@pycolors/ui";

import { Container } from "@/components/container";
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
    <main
      id="content"
      className="relative overflow-hidden py-10 sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-112 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary),transparent_94%),transparent_62%)]"
      />
      <Container className="relative max-w-7xl">
        <section className="max-w-4xl border-b border-border-subtle pb-9 sm:pb-11">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-[5px] border-pro-border-subtle bg-pro-surface-muted px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary"
            >
              Theme Builder
            </Badge>
            <Badge
              variant="outline"
              className="rounded-[5px] border-border-subtle bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              Free · client-side
            </Badge>
          </div>
          <h1 className="mt-5 font-brand text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
            Build a PyColors theme from your brand colors
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Free, client-side, PyColors-compatible theme generation for
            production-shaped SaaS interfaces.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>Light + dark semantic tokens</span>
            <span aria-hidden="true">•</span>
            <span>Real PyColors UI preview</span>
            <span aria-hidden="true">•</span>
            <span>Local-only generation</span>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
            It runs locally in your browser. No account is required, and theme
            inputs or generated tokens are not persisted or transmitted.
          </p>
        </section>

        <div className="mt-8 sm:mt-10">
          <ThemeBuilder />
        </div>

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <section
            aria-labelledby="theme-builder-integration-heading"
            className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft sm:p-6"
          >
            <div className="space-y-3">
              <h2
                id="theme-builder-integration-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Apply generated overrides in the supported order
              </h2>
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                <li>
                  Install and use <code>@pycolors/tokens</code>.
                </li>
                <li>
                  Import <code>@pycolors/tokens/tokens.css</code> once in your
                  global stylesheet.
                </li>
                <li>
                  Place the generated CSS overrides after that token import.
                </li>
                <li>
                  Keep application code on semantic utilities and public{" "}
                  <code>@pycolors/ui</code> imports.
                </li>
                <li>
                  Verify the complete interface in both light and dark modes.
                </li>
              </ol>
              <p className="text-sm leading-6 text-muted-foreground">
                The generated overrides use the existing Tailwind v4{" "}
                <code>@theme inline</code> bridge in the token package; they do
                not create a second Tailwind theme contract. Read the{" "}
                <Link
                  href="/docs/ui/theming"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  theming guide
                </Link>{" "}
                for the supported integration boundary.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="theme-builder-limitations-heading"
            className="rounded-[5px] border border-warning/35 bg-surface p-5 shadow-soft sm:p-6"
          >
            <div className="space-y-3">
              <h2
                id="theme-builder-limitations-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Review the generated theme in context
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Theme Builder is contrast-aware, not an accessibility
                certification. Review generated values in the real interface
                before shipping.
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                <li>Brand perception across your product and audience.</li>
                <li>Complete component and page context.</li>
                <li>Color-vision deficiencies and non-color cues.</li>
                <li>States communicated only by color.</li>
                <li>Real focus, hover, and disabled contexts.</li>
              </ul>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/container";
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
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
          <PageHero
            align="center"
            maxWidth="5xl"
            badges={[
              { label: "Theme Builder", variant: "outline" },
              { label: "Free · client-side", variant: "outline" },
            ]}
            title="Build a PyColors theme from your brand colors"
            description="Free, client-side, PyColors-compatible theme generation for production-shaped SaaS interfaces."
            pills={[
              "Light + dark semantic tokens",
              "Real PyColors UI preview",
              "Local-only generation",
            ]}
            extra={
              <p className="mx-auto max-w-3xl text-sm leading-6 text-muted-foreground">
                It runs locally in your browser. No account is required, and
                theme inputs or generated tokens are not persisted or
                transmitted.
              </p>
            }
            className="bg-transparent px-0 py-12 sm:px-0 sm:py-14 lg:px-0 lg:py-16"
            badgesClassName="gap-2"
            extraClassName="mt-6"
          />
        </div>
      </Container>

      <section className="border-t border-border-subtle">
        <Container className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <ThemeBuilder />
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
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
                  <code>@theme inline</code> bridge in the token package; they
                  do not create a second Tailwind theme contract. Read the{" "}
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
      </section>
    </main>
  );
}

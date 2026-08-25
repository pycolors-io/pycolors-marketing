import type { Metadata } from "next";

import { Container } from "@/components/container";
import { ThemeBuilder } from "@/components/theme-builder/theme-builder";

export const metadata: Metadata = {
  title: "Theme Builder",
  description:
    "Generate a contrast-aware PyColors theme from deterministic brand inputs in your browser.",
};

export default function ThemeBuilderPage() {
  return (
    <main className="py-12 sm:py-16 lg:py-20">
      <Container className="max-w-6xl">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Theme Builder
          </p>
          <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Explore a PyColors theme from your brand.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Adjust deterministic inputs locally to inspect light and dark
            semantic values. The output is contrast-aware and should still be
            reviewed in your product context.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <ThemeBuilder />
        </div>
      </Container>
    </main>
  );
}

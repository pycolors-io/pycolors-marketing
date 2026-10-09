import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2 } from "lucide-react";
import { cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";

import styles from "./docs-home.module.css";

export function DocsHome({ children }: Readonly<{ children: ReactNode }>) {
  return <div className={cn("not-prose", styles.home)}>{children}</div>;
}

export function DocsHomeHero({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <header className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>PyColors Documentation</p>
        <h1>Build your next product with PyColors.</h1>
        <p className={styles.description}>
          Add your first component, compose a screen, or set up a complete
          application. Start here and build one step at a time.
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button asChild size="lg" className="site-primary-action gap-2">
            <Link href="/docs/getting-started">Get started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/docs/ui">
              <Code2 className="size-4" aria-hidden="true" />
              Browse components
            </Link>
          </Button>
        </div>
      </div>
      <div className={styles.quickstart} aria-label="UI quick start">
        {children}
      </div>
    </header>
  );
}

type DocsHomeSectionProps = Readonly<{
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}>;

export function DocsHomeSection({
  id,
  title,
  description,
  children,
}: DocsHomeSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.sectionHeading}>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export function DocsHomeHelp() {
  return (
    <aside className={styles.help} aria-label="Find your starting point">
      <BookOpen
        className="size-5 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">
          Not sure where to start?
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          See how the library, blocks, and starters fit your project.
        </p>
      </div>
      <Link
        href="/docs/getting-started#choose-your-starting-point"
        className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-sm text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        Find your starting point
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}

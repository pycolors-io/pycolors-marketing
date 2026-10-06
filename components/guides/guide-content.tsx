import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Button, cn } from "@pycolors/ui";
import styles from "./guide-article.module.css";

export function GuideSection({
  id,
  title,
  description,
  children,
}: Readonly<{
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-border-subtle py-10 sm:py-12"
    >
      <div className="mb-6 space-y-3">
        <h2
          id={`${id}-title`}
          className="font-brand text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-6 text-[15px] leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function GuideChecklistCard({
  title,
  items,
}: Readonly<{ title: string; items: string[] }>) {
  return (
    <div className="rounded-[5px] border border-border-subtle bg-background p-5 sm:p-6">
      <p className="text-sm font-semibold leading-6 text-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground/60"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GuideCallout({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <aside
      role="note"
      className={cn(
        styles.callout,
        "rounded-[5px] border border-border-subtle p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </aside>
  );
}

export function GuideCalloutTitle({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
      <Lightbulb
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

export function GuideCalloutDescription({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="text-sm leading-7 text-muted-foreground">{children}</div>
  );
}

export function GuideNextSteps({
  title,
  description,
  primary,
}: Readonly<{
  title: string;
  description?: string;
  primary?: { href: string; label: string };
}>) {
  return (
    <section
      id="next-steps"
      aria-labelledby="next-steps-title"
      className="scroll-mt-24 border-t border-border-subtle py-10 sm:py-12"
    >
      <div
        className={`${styles.nextSteps} rounded-[5px] border border-border-subtle p-6 sm:p-8`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          From understanding to implementation
        </p>
        <h2
          id="next-steps-title"
          className="mt-4 font-brand text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description ??
            "Explore the interface in Starter Free. Starter Pro adds auth, billing and database foundations; configure your providers and build the logic specific to your product."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-h-11 rounded-[5px] px-5"
          >
            <Link href={primary?.href ?? "/starters/free"}>
              {primary?.label ?? "Start with Starter Free"}
            </Link>
          </Button>
          <Link
            href="/starters/pro"
            className={`${styles.textLink} justify-center sm:px-2`}
          >
            Explore Starter Pro{" "}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

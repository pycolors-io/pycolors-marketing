import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Palette,
  Rocket,
  Layers3,
  type LucideIcon,
} from "lucide-react";
import { Badge, Button, Card } from "@pycolors/ui";
import type { BlogCTA } from "@/types/blog";
import styles from "./blog-article.module.css";

type ArticleCTAProps = { readonly cta?: BlogCTA };

const variantContent: Record<
  NonNullable<BlogCTA["variant"]>,
  { badge: string; Icon: LucideIcon; title: string; description: string }
> = {
  free: {
    badge: "Starter Free",
    Icon: Rocket,
    title: "Explore the interface behind the ideas.",
    description:
      "Start with the dashboard, settings and product UI. Starter Free uses mocked authentication and billing data so you can explore the interface first.",
  },
  pro: {
    badge: "Starter Pro",
    Icon: Layers3,
    title: "Start with the connected foundation.",
    description:
      "Explore the Auth.js, Prisma and Stripe foundation, with documentation to configure the services for your own product.",
  },
  blocks: {
    badge: "Advanced Blocks",
    Icon: Blocks,
    title: "Put the pattern into your product.",
    description:
      "Explore reusable product sections for dashboards, settings and everyday SaaS workflows, built with PyColors UI.",
  },
  "theme-builder": {
    badge: "Theme Builder",
    Icon: Palette,
    title: "Try your brand with semantic tokens",
    description:
      "Explore your brand color in a light and dark preview, review the results, and copy the supported theme overrides.",
  },
};

export function ArticleCTA({ cta }: ArticleCTAProps) {
  if (!cta) return null;
  const { badge, Icon, title, description } =
    variantContent[cta.variant ?? "free"];
  return (
    <Card
      className={`${styles.nextStep} rounded-lg border-border-subtle p-6 shadow-none sm:p-8`}
    >
      <Badge
        variant="outline"
        className="mb-5 w-fit gap-1.5 border-border-subtle bg-background text-[11px]"
      >
        <Icon className="size-3" aria-hidden="true" />
        {badge}
      </Badge>
      <h2 className="max-w-xl text-balance font-brand text-xl font-semibold leading-snug tracking-heading sm:text-2xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button
          asChild
          className="site-primary-action h-auto min-h-11 max-w-full whitespace-normal rounded-md px-5 py-2 text-sm"
        >
          <Link href={cta.href}>
            <span className="min-w-0 wrap-anywhere">{cta.label}</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        </Button>
        <Link
          href="/guides"
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Read Guides
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

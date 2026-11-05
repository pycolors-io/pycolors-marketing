import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { ProductStudioCapture } from "@/components/marketing/product-studio-capture";
import { SiteButton } from "@/components/site-button";
import { productStudio } from "@/lib/showcase/product-studio";

/** One owned reference until independently verified customer cases are available. */
export function ProductStudioReference() {
  const tSite = useCopy();

  return (
    <MarketingSectionShell
      id="built-with-pycolors"
      width="full"
      aria-labelledby="product-studio-reference-heading"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {tSite("Built with Starter Pro")}
          </p>
          <h2
            id="product-studio-reference-heading"
            className="mt-4 text-balance font-brand text-[28px] font-semibold leading-tight tracking-heading sm:text-[32px] lg:text-4xl"
          >
            {tSite("A working example. A foundation to adapt.")}
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-muted-foreground">
            {tSite(productStudio.summary)}
          </p>
          <dl className="my-6 divide-y divide-border-subtle border-y border-border-subtle text-xs">
            {[
              ["Project", productStudio.name],
              ["Created by", "PyColors"],
              ["Type", "Reference implementation"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3"
              >
                <dt className="text-muted-foreground">{tSite(label)}</dt>
                <dd className="font-medium">{tSite(value)}</dd>
              </div>
            ))}
          </dl>
          <SiteButton asChild variant="outline" size="lg">
            <Link href={productStudio.href}>
              {tSite("Explore the reference")}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </SiteButton>
          <p className="mt-4 max-w-lg text-xs leading-6 text-muted-foreground">
            {tSite(productStudio.disclosure)}
          </p>
        </div>
        <Link
          href={productStudio.href}
          aria-label={tSite("View the Product studio reference implementation")}
          className="min-w-0 rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ProductStudioCapture sizes="(min-width: 1536px) 740px, (min-width: 1024px) 53vw, 95vw" />
        </Link>
      </div>
    </MarketingSectionShell>
  );
}

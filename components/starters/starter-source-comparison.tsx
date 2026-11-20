import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";

const products = [
  { slug: "starter-pro", name: "Starter Pro Web", href: "/starters/pro" },
  {
    slug: "starter-pro-mobile",
    name: "Starter Pro Mobile",
    href: "/starters/mobile",
  },
  {
    slug: "starter-pro-fullstack",
    name: "Starter Pro Fullstack",
    href: "/starters/fullstack",
  },
] as const;

const rows = [
  {
    label: "Web application interface",
    values: ["Included", "Not included", "Included"],
  },
  {
    label: "Native iOS and Android source",
    values: ["Not included", "Included", "Included"],
  },
  {
    label: "Compatible backend source",
    values: ["Included", "Included", "Shared Web backend"],
  },
  {
    label: "Web and Mobile accounts and data",
    values: ["Web application", "Mobile application", "Same accounts and data"],
  },
  {
    label: "Configuration, schema and setup guides",
    values: ["Included", "Included", "Included"],
  },
  {
    label: "Hosting and provider accounts",
    values: ["Configured by you", "Configured by you", "Configured by you"],
  },
] as const;

export function StarterSourceComparison() {
  const tSite = useCopy();
  return (
    <section
      id="source-licences"
      aria-labelledby="source-licences-heading"
      className="my-10 min-w-0 scroll-mt-20"
    >
      <h2
        id="source-licences-heading"
        className="font-brand text-2xl font-semibold tracking-tight"
      >
        {tSite("Compare Starter Pro source licences")}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        {tSite(
          "Each offer is a one-time source licence. Prices include VAT. You configure, validate and operate your own application and third-party services.",
        )}
      </p>
      <div
        role="region"
        aria-label={tSite(
          "Source licence comparison, scroll horizontally for all columns",
        )}
        tabIndex={0}
        className="mt-6 overflow-x-auto rounded-md border border-border-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            {tSite("Compare Starter Pro Web, Mobile and Fullstack")}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="p-4 font-medium">
                {tSite("Included source")}
              </th>
              {products.map((product) => (
                <th
                  key={product.slug}
                  scope="col"
                  className="p-4 align-top font-medium"
                >
                  <span className="block">{tSite(product.name)}</span>
                  <span className="mt-2 block text-lg">
                    {PRODUCT_DISPLAY[product.slug].priceLabel}
                  </span>
                  <Link
                    href={product.href}
                    className="mt-2 inline-flex min-h-11 items-center rounded-sm text-xs font-normal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {tSite("Explore source")}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-border-subtle">
                <th scope="row" className="p-4 font-medium">
                  {tSite(row.label)}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={products[index].slug}
                    className="p-4 text-muted-foreground"
                  >
                    {tSite(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {tSite(
          "Already own Web or Mobile? Open your verified purchase access link to check a Fullstack upgrade. Purchase recovery can send a fresh access link; an email address alone does not grant an upgrade.",
        )}
      </p>
      <Link
        href="/orders/recover"
        className="mt-2 inline-flex min-h-11 items-center rounded-sm text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
      >
        {tSite("Recover purchase access")}
      </Link>
    </section>
  );
}

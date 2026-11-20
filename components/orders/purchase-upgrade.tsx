import { useCopy } from "@/lib/i18n/use-copy";
import type { VerifiedPurchaseUpgrade } from "@/lib/api/claim-contract";
import { BuyProductButton } from "@/components/pricing/buy-product-button";

export function PurchaseUpgrade({
  upgrade,
  token,
}: Readonly<{ upgrade: VerifiedPurchaseUpgrade; token: string }>) {
  const tSite = useCopy();
  const amount = new Intl.NumberFormat(tSite.locale, {
    style: "currency",
    currency: upgrade.currency.toUpperCase(),
  }).format(upgrade.amountTotal / 100);
  return (
    <section
      aria-labelledby="purchase-upgrade-heading"
      className="mt-6 rounded-md border border-border-subtle p-5"
    >
      <h2 id="purchase-upgrade-heading" className="text-lg font-semibold">
        {tSite("Upgrade your verified purchase to Fullstack")}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {tSite(
          "Add Web and Mobile source with a shared API. This offer is based on the original order verified by your access link. Your existing purchase access remains available.",
        )}
      </p>
      <p className="mt-3 text-sm font-medium">
        {tSite("One-time upgrade — {value0}, VAT included", { value0: amount })}
      </p>
      <div className="mt-4">
        {upgrade.available ? (
          <BuyProductButton
            productSlug={upgrade.targetProductSlug}
            upgradeToken={token}
            upgradeAvailable={upgrade.available}
            locale={tSite.locale}
            label={tSite("Upgrade to Fullstack — {value0}", { value0: amount })}
          />
        ) : (
          <p role="status" className="text-sm text-muted-foreground">
            {tSite(
              "Checkout is currently unavailable. Please try again later or contact purchase support.",
            )}
          </p>
        )}
      </div>
    </section>
  );
}

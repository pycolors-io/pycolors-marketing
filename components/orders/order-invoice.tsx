import { FileDown } from "lucide-react";
import { getCopy } from "@/lib/i18n/server-copy";
import { SiteButton } from "@/components/site-button";
import { Link } from "@/lib/i18n/navigation";

export async function OrderInvoice({
  endpoint,
  retryHref,
}: {
  endpoint: string;
  retryHref: string;
}) {
  const tSite = await getCopy();
  let status: unknown;
  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    });
    if (response.ok) status = (await response.json()).status;
  } catch {
    // The product download remains usable during billing provider outages.
  }
  if (status === "available")
    return (
      <SiteButton asChild variant="outline">
        <a
          href={endpoint + "?download=1&locale=" + tSite.locale}
          referrerPolicy="no-referrer"
        >
          <FileDown aria-hidden="true" />
          {tSite("Download invoice PDF")}
        </a>
      </SiteButton>
    );
  return (
    <div className="space-y-2 text-sm">
      <p role="status" className="text-muted-foreground">
        {status === "legacy"
          ? tSite(
              "This order has no linked invoice. Contact purchase support if you need a billing document.",
            )
          : status === "pending"
            ? tSite(
                "Your invoice is being prepared. You can already download your product.",
              )
            : tSite("Your invoice is temporarily unavailable.")}
      </p>
      {status !== "legacy" && (
        <a className="underline underline-offset-4" href={retryHref}>
          {tSite("Check invoice again")}
        </a>
      )}
      {status !== "legacy" && <span aria-hidden="true"> · </span>}
      <Link
        href={status === "legacy" ? "/orders/support" : "/orders/recover"}
        className="underline underline-offset-4"
      >
        {status === "legacy"
          ? tSite("Purchase support")
          : tSite("Recover access")}
      </Link>
    </div>
  );
}

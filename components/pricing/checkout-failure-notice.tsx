import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";

export function CheckoutFailureNotice({
  locale: requestedLocale,
}: {
  locale?: "en" | "fr";
}) {
  const tSite = useCopy();

  const fr = (requestedLocale ?? tSite.locale) === "fr";
  return (
    <div role="alert" className="max-w-md space-y-2 text-sm leading-6">
      <p className="font-medium text-destructive">
        {fr
          ? "Le paiement n’a pas pu être ouvert."
          : "Checkout could not be opened."}
      </p>
      <p className="text-muted-foreground">
        {fr
          ? "Réessayez plus tard. Si vous avez déjà tenté un paiement ou si vous ignorez s’il a abouti, contactez l’assistance avant de payer à nouveau."
          : "Please try again later. If you already attempted a payment or are unsure whether it completed, contact support before paying again."}
      </p>
      <Link
        href="/orders/support"
        className="inline-block font-medium text-foreground underline underline-offset-4"
      >
        {fr ? "Contacter l’assistance achat" : "Contact purchase support"}
      </Link>
    </div>
  );
}

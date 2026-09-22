import Link from "next/link";

export function CheckoutFailureNotice() {
  return (
    <div role="alert" className="max-w-md space-y-2 text-sm leading-6">
      <p className="font-medium text-destructive">
        Checkout could not be opened.
      </p>
      <p className="text-muted-foreground">
        Please try again later. If you already attempted a payment or are unsure
        whether it completed, contact support before paying again.
      </p>
      <Link
        href="/orders/support"
        className="inline-block font-medium text-foreground underline underline-offset-4"
      >
        Contact purchase support
      </Link>
    </div>
  );
}

"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { LoaderCircle } from "lucide-react";

import { cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";

import { useProductCheckout } from "./use-product-checkout";
import { useCheckoutAvailability } from "./use-checkout-availability";

import { CheckoutFailureNotice } from "./checkout-failure-notice";

type BuyProductButtonProps = {
  productSlug: string;
  locale?: "en" | "fr";
  className?: string;
  fullWidth?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  label: string;
  loadingLabel?: string;
  trustText?: string;
  showTrustText?: boolean;
  customerEmail?: string;
  upgradeToken?: string;
  /** Only used with a server-verified original-order upgrade quote. */
  upgradeAvailable?: boolean;
};

export function BuyProductButton({
  productSlug,
  className,
  locale: requestedLocale,
  fullWidth = true,
  size = "lg",
  variant = "default",
  label,
  loadingLabel = "Redirecting to secure checkout...",
  trustText = "One-time payment · Access after payment and order processing",
  showTrustText = false,
  customerEmail,
  upgradeToken,
  upgradeAvailable,
}: Readonly<BuyProductButtonProps>) {
  const tSite = useCopy();
  const locale = requestedLocale ?? tSite.locale;

  const productName =
    productSlug in PRODUCT_DISPLAY
      ? PRODUCT_DISPLAY[productSlug as keyof typeof PRODUCT_DISPLAY].name
      : null;

  const { handleBuy, isLoading, hasError } = useProductCheckout({
    productSlug,
    productName,
    email: customerEmail,
    upgradeToken,
    locale,
  });
  const { status: productAvailability, retry: retryAvailability } =
    useCheckoutAvailability(productSlug);
  const availability = upgradeToken
    ? upgradeAvailable === true
      ? "available"
      : "unavailable"
    : productAvailability;

  return (
    <div className={cn("space-y-2", fullWidth && "w-full")}>
      <Button
        type="button"
        onClick={handleBuy}
        disabled={isLoading || availability !== "available"}
        size={size}
        variant={variant}
        className={cn(
          "group h-auto max-w-full whitespace-normal rounded-md font-medium cursor-pointer",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          fullWidth && "w-full",
          variant === "default" && [
            "site-primary-action",
            "border border-transparent",
            "bg-primary text-primary-foreground",
            "hover:bg-brand-primary-hover",
          ],
          variant === "outline" && [
            "border border-border-subtle",
            "bg-background",
            "hover:bg-surface-muted",
          ],
          variant === "secondary" && [
            "border border-border-subtle",
            "bg-surface-muted",
            "hover:bg-surface",
          ],
          className,
        )}
        aria-busy={isLoading || availability === "checking"}
        aria-live="polite"
      >
        {isLoading ? (
          <>
            <LoaderCircle
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />

            {tSite(loadingLabel)}
          </>
        ) : (
          <>
            {availability === "checking" ? (
              <LoaderCircle
                className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : null}
            {label}
          </>
        )}
      </Button>

      {showTrustText ? (
        <p className="text-xs text-muted-foreground">{tSite(trustText)}</p>
      ) : null}

      {hasError ? <CheckoutFailureNotice locale={locale} /> : null}
      {availability === "unavailable" ? (
        <div role="status" className="text-xs text-muted-foreground">
          <p>
            {tSite(
              "Checkout is currently unavailable. Please try again later or contact purchase support.",
            )}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={retryAvailability}
          >
            {tSite("Check checkout availability")}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

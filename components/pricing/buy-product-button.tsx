"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";

import { Button, cn } from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";

import { useProductCheckout } from "./use-product-checkout";

import { CheckoutFailureNotice } from "./checkout-failure-notice";

type BuyProductButtonProps = {
  productSlug: string;
  className?: string;
  fullWidth?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  label: string;
  loadingLabel?: string;
  trustText?: string;
  showTrustText?: boolean;
  customerEmail?: string;
};

export function BuyProductButton({
  productSlug,
  className,
  fullWidth = true,
  size = "lg",
  variant = "default",
  label,
  loadingLabel = "Redirecting to secure checkout...",
  trustText = "One-time payment · Instant access after purchase",
  showTrustText = false,
  customerEmail,
}: Readonly<BuyProductButtonProps>) {
  const productName =
    productSlug in PRODUCT_DISPLAY
      ? PRODUCT_DISPLAY[productSlug as keyof typeof PRODUCT_DISPLAY].name
      : null;

  const { handleBuy, isLoading, hasError } = useProductCheckout({
    productSlug,
    productName,
    email: customerEmail,
  });

  return (
    <div className={cn("space-y-2", fullWidth && "w-full")}>
      <Button
        type="button"
        onClick={handleBuy}
        disabled={isLoading}
        size={size}
        variant={variant}
        className={cn(
          "group h-auto min-h-11 max-w-full whitespace-normal rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          fullWidth && "w-full",
          variant === "default" && [
            "border border-transparent",
            "bg-primary text-primary-foreground",
            "shadow-soft",
            "hover:bg-brand-primary-hover",
            "hover:shadow-medium",
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
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <>
            <LoaderCircle
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />

            {loadingLabel}
          </>
        ) : (
          <>
            {label}

            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </>
        )}
      </Button>

      {showTrustText ? (
        <p className="text-xs text-muted-foreground">{trustText}</p>
      ) : null}

      {hasError ? <CheckoutFailureNotice /> : null}
    </div>
  );
}

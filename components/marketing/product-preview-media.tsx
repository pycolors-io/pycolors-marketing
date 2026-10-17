import Image from "next/image";
import { cn } from "@pycolors/ui";
import {
  PRODUCT_PREVIEW_MEDIA,
  type ProductPreviewId,
} from "@/lib/products/product-preview-media";

type ProductPreviewMediaProps = Readonly<{
  product: ProductPreviewId;
  className?: string;
  sizes?: string;
  priority?: boolean;
}>;

/**
 * Static images follow the site's Tailwind dark class, including manual
 * theme selection. Only one version is visibly presented at a time.
 */
export function ProductPreviewMedia({
  product,
  className,
  sizes = "(min-width: 1280px) 520px, (min-width: 768px) 43vw, 95vw",
  priority = false,
}: ProductPreviewMediaProps) {
  const media = PRODUCT_PREVIEW_MEDIA[product];

  return (
    <div
      data-product-preview={product}
      className={cn(
        "relative isolate aspect-[16/10] w-full overflow-hidden rounded-[5px] border border-border-subtle bg-surface-muted/60 p-2 sm:p-3",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-12 size-44 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative size-full overflow-hidden rounded-[3px] border border-border-subtle bg-background shadow-sm">
        <Image
          src={media.light}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain object-top dark:hidden"
        />
        <Image
          src={media.dark}
          alt={media.alt}
          fill
          sizes={sizes}
          className="hidden object-contain object-top dark:block"
        />
      </div>
    </div>
  );
}

import { useCopy } from "@/lib/i18n/use-copy";
import { SITE_URL } from "@/lib/seo/website";
import type { PublicProductDisplay } from "@/lib/products/public-catalog";

import { toAbsoluteUrl } from "@/lib/seo/website";

type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

export function JsonLd({ id, data }: JsonLdProps) {
  const t = useCopy();
  const textKeys = new Set([
    "name",
    "headline",
    "description",
    "text",
    "articleSection",
  ]);
  const urlKeys = new Set(["url", "item", "mainEntityOfPage"]);
  function localize(value: unknown, key = ""): unknown {
    if (Array.isArray(value))
      return value.map((item: unknown) => localize(item, key));
    if (value && typeof value === "object") {
      if (
        "@type" in value &&
        ["Organization", "Person", "Brand", "ImageObject"].includes(
          String(value["@type"]),
        )
      )
        return value;
      return Object.fromEntries(
        Object.entries(value).map(([name, child]) => [
          name,
          localize(child, name),
        ]),
      );
    }
    if (typeof value === "string") {
      if (textKeys.has(key)) return t(value);
      if (
        urlKeys.has(key) &&
        value.startsWith(SITE_URL) &&
        !value.includes("#organization")
      ) {
        return SITE_URL + t.href(value.slice(SITE_URL.length) || "/");
      }
    }
    return value;
  }
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localize(data)).replace(/</g, "\\u003c"),
      }}
    />
  );
}

type ProductOfferJsonLdInput = {
  readonly product: PublicProductDisplay;
  readonly canonicalPath: string;
  readonly description: string;
};

export function generateProductOfferJsonLd({
  product,
  canonicalPath,
  description,
}: ProductOfferJsonLdInput) {
  const url = toAbsoluteUrl(canonicalPath);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
    url,
    brand: {
      "@type": "Brand",
      name: "PyColors",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      url,
    },
  };
}

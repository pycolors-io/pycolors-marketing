import type { PublicProductDisplay } from '@pycolors/core-config/products/public-catalog';

import { toAbsoluteUrl } from '@/lib/seo/website';

type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
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
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    url,
    brand: {
      '@type': 'Brand',
      name: 'PyColors',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      url,
    },
  };
}

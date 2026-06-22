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
};

function parseEuroPriceLabel(priceLabel: string) {
  const normalized = priceLabel.trim();
  const match = normalized.match(/^(\d+(?:[.,]\d{1,2})?)\s*€$/);

  if (!match) {
    throw new Error(`Unsupported product price label: ${priceLabel}`);
  }

  return {
    price: match[1].replace(',', '.'),
    priceCurrency: 'EUR',
  };
}

export function generateProductOfferJsonLd({
  product,
  canonicalPath,
}: ProductOfferJsonLdInput) {
  const { price, priceCurrency } = parseEuroPriceLabel(product.priceLabel);
  const url = toAbsoluteUrl(canonicalPath);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    url,
    brand: {
      '@type': 'Brand',
      name: 'PyColors',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      url,
    },
  };
}

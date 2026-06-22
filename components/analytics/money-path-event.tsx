'use client';

import * as React from 'react';

import { trackMoneyPathEvent } from '@/lib/analytics';

type MoneyPathPageEventProps = {
  readonly event:
    | 'checkout_success_viewed'
    | 'claim_page_viewed'
    | 'recovery_page_viewed';
  readonly productSlug?: string | null;
  readonly productName?: string | null;
  readonly page: string;
  readonly status?: string | null;
};

export function MoneyPathPageEvent({
  event,
  productSlug,
  productName,
  page,
  status,
}: MoneyPathPageEventProps) {
  React.useEffect(() => {
    trackMoneyPathEvent({
      event,
      productSlug,
      productName,
      page,
      status,
    });
  }, [event, page, productName, productSlug, status]);

  return null;
}

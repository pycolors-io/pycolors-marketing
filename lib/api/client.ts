const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_API_BASE_URL.');
}

type ApiErrorResponse = {
  error?: string;
};

async function parseJson<T>(response: Response): Promise<T | null> {
  return (await response.json().catch(() => null)) as T | null;
}

export async function createCheckoutSession(input: {
  productSlug: string;
  email?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await parseJson<{
    url?: string;
    error?: string;
  }>(response);

  if (!response.ok || !data?.url) {
    throw new Error(
      data?.error ?? 'Unable to create checkout session.',
    );
  }

  return data.url;
}

/**
 * Legacy helper kept for backward compatibility.
 */
export function createStarterProCheckout(input?: { email?: string }) {
  return createCheckoutSession({
    productSlug: 'starter-pro',
    email: input?.email,
  });
}

export async function recoverCommerceAccess(input: {
  email: string;
}) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/orders/recover`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );

  const data = await parseJson<ApiErrorResponse>(response);

  if (!response.ok) {
    throw new Error(data?.error ?? 'Unable to recover order access.');
  }

  return data;
}

/**
 * Legacy helper kept for backward compatibility.
 */
export function recoverStarterProAccess(input: { email: string }) {
  return recoverCommerceAccess(input);
}

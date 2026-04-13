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

export async function createStarterProCheckout(input?: {
  email?: string;
}) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/checkout/starter-pro`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input ?? {}),
    },
  );

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

export async function recoverStarterProAccess(input: {
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

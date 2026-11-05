import {
  QUOTE_FIELDS,
  type QuoteField,
  type QuoteRequest,
} from "./quote-request";

export class QuoteSubmissionError extends Error {
  constructor(
    readonly fields: readonly QuoteField[] = [],
    readonly rateLimited = false,
    readonly tooLarge = false,
  ) {
    super("Unable to confirm quote submission.");
  }
}

export async function submitQuoteRequest(
  input: QuoteRequest,
  signal?: AbortSignal,
): Promise<string> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timeout = setTimeout(abort, 30_000);
  signal?.addEventListener("abort", abort, { once: true });
  if (signal?.aborted) abort();
  let rejectAbort: () => void = () => {};
  const interrupted = new Promise<never>((_, reject) => {
    rejectAbort = () => reject(new QuoteSubmissionError());
    controller.signal.addEventListener("abort", rejectAbort, { once: true });
    if (controller.signal.aborted) rejectAbort();
  });
  try {
    return await Promise.race([
      interrupted,
      (async () => {
        controller.signal.throwIfAborted();
        const base = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!base) throw new QuoteSubmissionError();
        const body = JSON.stringify(input);
        if (new TextEncoder().encode(body).byteLength > 16_384)
          throw new QuoteSubmissionError([], false, true);
        const response = await fetch(`${base}/api/v1/quotes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          signal: controller.signal,
        });
        const data: unknown = await response.json();
        controller.signal.throwIfAborted();
        if (!response.ok) {
          const fields =
            data &&
            typeof data === "object" &&
            "fields" in data &&
            Array.isArray(data.fields)
              ? data.fields.filter(
                  (value): value is QuoteField =>
                    typeof value === "string" &&
                    QUOTE_FIELDS.some((field) => field === value),
                )
              : [];
          throw new QuoteSubmissionError(
            fields,
            response.status === 429,
            response.status === 413,
          );
        }
        if (
          response.status !== 202 ||
          !data ||
          typeof data !== "object" ||
          Array.isArray(data) ||
          !("ok" in data) ||
          data.ok !== true ||
          !("reference" in data) ||
          data.reference !== input.requestId
        ) {
          throw new QuoteSubmissionError();
        }
        return input.requestId;
      })(),
    ]);
  } catch (error) {
    throw error instanceof QuoteSubmissionError
      ? error
      : new QuoteSubmissionError();
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
    controller.signal.removeEventListener("abort", rejectAbort);
  }
}

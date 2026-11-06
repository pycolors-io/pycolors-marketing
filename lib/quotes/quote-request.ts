export const QUOTE_BUDGETS = {
  "3k-5k": "3,000–5,000 €",
  "5k-10k": "5,000–10,000 €",
  "10k-20k": "10,000–20,000 €",
  "20k-plus": "20,000 € or more",
  "to-define": "To be scoped",
} as const;
export const QUOTE_FIELDS = [
  "name",
  "email",
  "company",
  "service",
  "budget",
  "timeline",
  "brief",
] as const;
export type QuoteField = (typeof QUOTE_FIELDS)[number];
export type QuoteService = "guided-setup" | "business-adaptation";
export type QuoteRequest = {
  requestId: string;
  name: string;
  email: string;
  company: string;
  service: QuoteService;
  budget: keyof typeof QUOTE_BUDGETS;
  timeline: string;
  brief: string;
  website: string;
};
export function quoteService(value: unknown): QuoteService | "" {
  return value === "guided-setup" || value === "business-adaptation"
    ? value
    : "";
}

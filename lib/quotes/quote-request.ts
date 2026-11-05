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
  "projectType",
  "projectStage",
  "audience",
  "features",
  "assets",
  "successCriteria",
] as const;
export const QUOTE_PROJECT_TYPES = [
  "saas",
  "client-portal",
  "internal-tool",
  "other",
] as const;
export const QUOTE_PROJECT_STAGES = ["new", "existing", "redesign"] as const;
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
  locale?: "en" | "fr";
  projectType?: (typeof QUOTE_PROJECT_TYPES)[number] | "";
  projectStage?: (typeof QUOTE_PROJECT_STAGES)[number] | "";
  audience?: string;
  features?: string;
  assets?: string;
  successCriteria?: string;
};
export function quoteService(value: unknown): QuoteService | "" {
  return value === "guided-setup" || value === "business-adaptation"
    ? value
    : "";
}

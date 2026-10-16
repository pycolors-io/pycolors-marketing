import { starterProBuyerFaqs } from "./starter-pro-buyer-faq";

export const starterProFaqTopics = [
  { id: "setup", label: "Setup & launch" },
  { id: "scope", label: "Features & updates" },
  { id: "purchase", label: "Purchase & access" },
  { id: "license", label: "License & refunds" },
] as const;

export type StarterProFaqTopic = (typeof starterProFaqTopics)[number]["id"];
export type StarterProFaqFilter = StarterProFaqTopic | "all";
type StarterProFaqQuestion = (typeof starterProBuyerFaqs)[number]["question"];

// Classify canonical questions without copying answers or commercial terms.
// Adding or renaming a question requires an explicit topic decision here.
const topicByQuestion = {
  "What should I prepare before local setup?": "setup",
  "How long before I can start?": "setup",
  "What happens after payment?": "purchase",
  "Do I own the source code?": "license",
  "Can I use it commercially?": "license",
  "Can I use it for client projects?": "license",
  "Can I customize everything?": "scope",
  "What will I still need to build?": "scope",
  "Is Starter Pro production-ready?": "setup",
  "Is Stripe already integrated?": "setup",
  "Do I get future Starter Pro updates?": "scope",
  "What if local setup fails?": "setup",
  "What if I do not receive my purchase email?": "purchase",
  "What is the refund policy?": "license",
} as const satisfies Record<StarterProFaqQuestion, StarterProFaqTopic>;

export function getStarterProFaqTopic(question: StarterProFaqQuestion) {
  return topicByQuestion[question];
}

function normalizeSearchText(value: string): string {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
}

/** Literal, all-word matching; preserves canonical objects and source order. */
export function filterStarterProFaqs(
  query = "",
  topic: StarterProFaqFilter = "all",
) {
  const terms = normalizeSearchText(query).trim().split(/\s+/u).filter(Boolean);

  return starterProBuyerFaqs.filter((faq) => {
    if (topic !== "all" && getStarterProFaqTopic(faq.question) !== topic) {
      return false;
    }

    const labels = faq.links.map((link) => link.label);
    const text = normalizeSearchText(
      [faq.question, faq.answer, ...labels].join(" "),
    );

    return terms.every((term) => text.includes(term));
  });
}

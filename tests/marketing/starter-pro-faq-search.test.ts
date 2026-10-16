import { describe, expect, it } from "vitest";
import { starterProBuyerFaqs } from "../../lib/products/starter-pro-buyer-faq";
import {
  filterStarterProFaqs,
  getStarterProFaqTopic,
  starterProFaqTopics,
} from "../../lib/products/starter-pro-faq-search";

describe("Starter Pro FAQ search", () => {
  it("preserves canonical objects and order for empty queries", () => {
    const results = filterStarterProFaqs("  \n\t ");

    expect(results).toEqual(starterProBuyerFaqs);
    results.forEach((faq, index) => {
      expect(faq).toBe(starterProBuyerFaqs[index]);
    });
  });

  it("classifies each question into exactly one discoverable topic", () => {
    const ids = starterProFaqTopics.map((topic) => topic.id);
    const classified = starterProFaqTopics.flatMap((topic) =>
      filterStarterProFaqs("", topic.id),
    );

    expect(new Set(ids).size).toBe(ids.length);
    expect(classified).toHaveLength(starterProBuyerFaqs.length);
    expect(new Set(classified).size).toBe(starterProBuyerFaqs.length);
    for (const faq of starterProBuyerFaqs) {
      expect(ids).toContain(getStarterProFaqTopic(faq.question));
    }
  });

  it("matches case, accents, whitespace and multiple literal words", () => {
    const results = filterStarterProFaqs("  STRÍPE \n integrated  ");

    expect(results.map((faq) => faq.question)).toEqual([
      "Is Stripe already integrated?",
    ]);
  });

  it("searches answers and useful link labels, not just questions", () => {
    expect(filterStarterProFaqs("PostgreSQL").length).toBeGreaterThan(0);
    expect(
      filterStarterProFaqs("last successful setup checkpoint").map(
        (faq) => faq.question,
      ),
    ).toEqual(["What if local setup fails?"]);
  });

  it("combines the topic and query rather than showing either match", () => {
    expect(filterStarterProFaqs("Stripe", "license")).toEqual([]);
    const purchases = filterStarterProFaqs("", "purchase");
    expect(purchases.map((faq) => faq.question)).toEqual([
      "What happens after payment?",
      "What if I do not receive my purchase email?",
    ]);
  });

  it.each(["[", ".*", "<script>", "no-such-faq-727"])(
    "treats %s as text rather than an expression or markup",
    (query) => {
      expect(filterStarterProFaqs(query)).toEqual([]);
    },
  );

  it("does not mutate canonical answers while searching", () => {
    const before = JSON.stringify(starterProBuyerFaqs);

    filterStarterProFaqs("email", "purchase");
    filterStarterProFaqs("setup");
    filterStarterProFaqs("", "license");

    expect(JSON.stringify(starterProBuyerFaqs)).toBe(before);
    expect(filterStarterProFaqs()).toEqual(starterProBuyerFaqs);
  });
});

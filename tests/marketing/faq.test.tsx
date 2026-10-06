import * as React from "react";
import Link from "next/link";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { MarketingFaq } from "../../components/marketing/faq";
import { starterProBuyerFaqs } from "../../lib/products/starter-pro-buyer-faq";
import PricingPage from "../../app/(site)/pricing/page";
import StarterProPage from "../../app/(site)/starters/pro/page";
import TemplatePage from "../../app/(site)/templates/na-ai-landing/page";
import UpgradePage from "../../app/(site)/upgrade/page";

vi.mock("@/lib/api/client", () => ({
  createStarterProCheckout: vi.fn(),
  createCheckoutSession: vi.fn(),
}));

describe("MarketingFaq", () => {
  it("renders rich answers in the server HTML without requiring JavaScript", () => {
    const html = renderToStaticMarkup(
      <MarketingFaq
        title="Before you buy"
        titleId="faq-title"
        items={[
          {
            question: "What do I receive?",
            answer: (
              <p>
                Source code and{" "}
                <Link href="/docs/starter-pro">setup documentation</Link>.
              </p>
            ),
          },
        ]}
      />,
    );
    expect(html).toContain("Source code and");
    expect(html).toContain('href="/docs/starter-pro"');
    expect(html).toContain("<summary");
    expect(html).not.toContain("<script");
  });

  it("lets readers open multiple answers independently and keeps buyer links intact", async () => {
    const { container } = render(
      <section aria-labelledby="buyer-questions">
        <MarketingFaq
          title="Buyer questions"
          titleId="buyer-questions"
          items={starterProBuyerFaqs}
        />
      </section>,
    );
    const rows = Array.from(container.querySelectorAll("details"));
    expect(rows).toHaveLength(starterProBuyerFaqs.length);
    expect(rows.every((row) => !row.open)).toBe(true);
    expect((await axe(container)).violations).toEqual([]);

    for (const [index, faq] of starterProBuyerFaqs.entries()) {
      const row = rows[index]!;
      const summary = row.querySelector("summary")!;
      expect(summary).toHaveTextContent(faq.question);
      summary.focus();
      expect(summary).toHaveFocus();
      fireEvent.click(summary);
      expect(row.open).toBe(true);
      expect(within(row).getByText(faq.answer)).toBeVisible();
      for (const link of faq.links) {
        expect(
          within(row).getByRole("link", { name: link.label }),
        ).toHaveAttribute("href", link.href);
      }
    }
    expect(rows.every((row) => row.open)).toBe(true);
    expect((await axe(container)).violations).toEqual([]);
    fireEvent.click(rows[0]!.querySelector("summary")!);
    expect(rows[0]!.open).toBe(false);
    expect(rows[1]!.open).toBe(true);
  });
});

describe("Marketing FAQ integration", () => {
  it.each([
    { Page: PricingPage, title: "Your questions, answered.", count: 12 },
    {
      Page: StarterProPage,
      title: "Questions buyers ask before paying",
      count: 14,
    },
    { Page: TemplatePage, title: "Questions before buying", count: 4 },
    { Page: UpgradePage, title: "Clear scope. Clear decision.", count: 6 },
  ])(
    "keeps every question accessible on $title",
    async ({ Page, title, count }) => {
      render(<Page />);
      const region = screen.getByRole("region", { name: title });
      expect(
        within(region).getByRole("heading", { level: 2, name: title }),
      ).toBeVisible();
      const rows = region.querySelectorAll("details");
      expect(rows).toHaveLength(count);
      for (const row of rows) {
        const summary = row.querySelector("summary")!;
        expect(summary.textContent?.trim()).not.toBe("");
        expect(row.open).toBe(false);
        fireEvent.click(summary);
        expect(row.open).toBe(true);
      }
      expect((await axe(region)).violations).toEqual([]);
    },
  );
});

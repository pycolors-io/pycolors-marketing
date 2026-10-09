import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import TermsPage, { metadata } from "@/app/(site)/terms/page";

describe("Terms of Service page", () => {
  it("preserves SEO, the revision date and company details", () => {
    const { container } = render(<TermsPage />);
    expect(metadata.alternates?.canonical).toBe("/terms");
    expect(metadata.openGraph?.url).toBe("/terms");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    expect(
      screen.getByRole("complementary", { name: "Terms document information" }),
    ).toHaveTextContent("October 6, 2026");
    expect(container.querySelector("time")).toHaveAttribute(
      "datetime",
      "2026-10-06",
    );
    const company = screen.getByRole("region", { name: "1. Who we are" });
    expect(company).toHaveTextContent(
      "Py Colors SASU, located at 6 rue d’Armaillé, 75017 Paris, France.",
    );
    expect(
      within(company).getByRole("link", { name: "contact@pycolors.com" }),
    ).toHaveAttribute("href", "mailto:contact@pycolors.com");
    const breadcrumb = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(
      breadcrumb.itemListElement.map((item: { item: string }) => item.item),
    ).toEqual(["https://pycolors.io/", "https://pycolors.io/terms"]);
  });

  it("makes all nineteen sections reachable through a keyboard-scrollable contents list", () => {
    render(<TermsPage />);
    const toc = screen.getByRole("navigation", { name: "Terms sections" });
    expect(toc).toHaveAttribute("tabindex", "0");
    expect(toc).toHaveAccessibleDescription(
      "Scroll to browse all 19 sections.",
    );
    const links = within(toc).getAllByRole("link");
    expect(links).toHaveLength(19);
    links.forEach((link, index) => {
      const target = document.getElementById(
        link.getAttribute("href")!.slice(1),
      )!;
      expect(target).toHaveAccessibleName();
      expect(
        within(target).getByRole("heading", { level: 2 }),
      ).toHaveTextContent(`${index + 1}. `);
      expect(target).toBeVisible();
    });
    expect(
      within(
        screen.getByRole("navigation", { name: "Find a topic in the terms" }),
      )
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["#terms-categories", "#terms-payments", "#terms-license"]);
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("preserves delivery, consumer rights, liability and governing-law qualifications", () => {
    render(<TermsPage />);
    const delivery = screen.getByRole("region", {
      name: "10. Digital delivery, refunds, and cancellations",
    });
    expect(delivery).toHaveTextContent(
      "Digital delivery does not automatically remove this right.",
    );
    expect(delivery).toHaveTextContent(
      "Nothing in these Terms excludes mandatory consumer rights that cannot be waived under applicable law.",
    );
    expect(delivery).toHaveTextContent(
      "14 days from conclusion of the contract",
    );
    expect(delivery).toHaveTextContent("expressly consented in advance");
    expect(delivery).toHaveTextContent(
      "acknowledged that you will lose your withdrawal right",
    );
    expect(delivery).toHaveTextContent(
      "confirmation of that agreement has been provided on a durable medium",
    );
    expect(delivery).toHaveTextContent(
      "Accepting these Terms alone is not that separate consent.",
    );
    expect(delivery).toHaveTextContent("No explanation is required");
    expect(delivery).toHaveTextContent("reimbursement is due within 14 days");
    expect(delivery).toHaveTextContent("I hereby notify you that I withdraw");
    expect(
      screen.getByRole("region", {
        name: "15. Product responsibilities and consumer guarantees",
      }),
    ).toHaveTextContent("within two years");
    expect(
      screen.getByRole("region", {
        name: "14. Availability and product changes",
      }),
    ).toHaveTextContent(
      "does not by itself reduce the rights agreed for an existing purchase",
    );
    expect(
      screen.getByRole("region", { name: "16. Limitation of liability" }),
    ).toHaveTextContent("during the twelve months preceding the event");
    expect(
      screen.getByRole("region", {
        name: "18. Governing law and international use",
      }),
    ).toHaveTextContent("governed by the laws of France");
    expect(
      screen.getByRole("region", { name: "19. Changes to these Terms" }),
    ).toHaveTextContent(
      "additional or more specific terms for the relevant product",
    );
    expect(
      within(
        screen.getByRole("region", { name: "2. Scope of these Terms" }),
      ).getAllByRole("listitem"),
    ).toHaveLength(7);
    expect(
      within(
        screen.getByRole("region", { name: "12. Acceptable use" }),
      ).getAllByRole("listitem"),
    ).toHaveLength(7);
  });

  it("keeps contact and related policies reachable without invalid links", () => {
    render(<TermsPage />);
    const contact = screen.getByRole("region", {
      name: "Product, billing, or license question?",
    });
    expect(
      within(contact).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "mailto:contact@pycolors.com");
    expect(
      within(screen.getByRole("navigation", { name: "Related pages" }))
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["/license", "/pricing", "/privacy"]);
    for (const link of within(screen.getByRole("main")).getAllByRole("link")) {
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (href.startsWith("#"))
        expect(document.getElementById(href.slice(1))).not.toBeNull();
      if (href.startsWith("/docs/")) {
        const docPath = href.slice("/docs/".length).split("#")[0]!;
        expect(
          existsSync(resolve("content/docs", `${docPath}.mdx`)),
          href,
        ).toBe(true);
      } else if (href.startsWith("/"))
        expect(
          existsSync(
            resolve("app/(site)", href.slice(1).split("#")[0]!, "page.tsx"),
          ),
          href,
        ).toBe(true);
    }
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<TermsPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

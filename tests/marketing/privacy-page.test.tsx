import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import PrivacyPage, { metadata } from "@/app/(site)/privacy/page";

const sections = [
  ["controller", "1. Controller"],
  ["scope", "2. What this policy covers"],
  ["data", "3. Data we may collect"],
  ["collection", "4. How we collect data"],
  ["purposes", "5. Why we use personal data"],
  ["legal-bases", "6. Legal bases"],
  ["cookies", "7. Cookies and analytics"],
  ["payments", "8. Payments and commerce providers"],
  ["delivery", "9. Digital delivery and downloads"],
  ["email", "10. Email communications"],
  ["sharing", "11. Data sharing"],
  ["transfers", "12. International data transfers"],
  ["retention", "13. Retention"],
  ["security", "14. Security"],
  ["rights", "15. Your rights"],
  ["children", "16. Children"],
  ["changes", "17. Changes to this policy"],
] as const;

describe("Privacy Policy page", () => {
  it("preserves SEO, the original policy revision, and controller details", () => {
    const { container } = render(<PrivacyPage />);
    expect(metadata.alternates?.canonical).toBe("/privacy");
    expect(metadata.openGraph?.url).toBe("/privacy");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Privacy Policy",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const information = screen.getByRole("complementary", {
      name: "Privacy document information",
    });
    expect(information).toHaveTextContent("May 14, 2026");
    expect(information.querySelector("time")).toHaveAttribute(
      "datetime",
      "2026-05-14",
    );
    const controller = screen.getByRole("region", { name: "1. Controller" });
    expect(controller).toHaveTextContent(
      "Py Colors SASU, 6 rue d’Armaillé, 75017 Paris, France.",
    );
    expect(
      within(controller).getByRole("link", { name: "contact@pycolors.io" }),
    ).toHaveAttribute("href", "mailto:contact@pycolors.io");
    const breadcrumb = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(
      breadcrumb.itemListElement.map((item: { item: string }) => item.item),
    ).toEqual(["https://pycolors.io/", "https://pycolors.io/privacy"]);
  });

  it("makes every policy section visible and reachable from a keyboard-scrollable contents list", () => {
    render(<PrivacyPage />);
    const toc = screen.getByRole("navigation", { name: "Privacy sections" });
    expect(toc).toHaveAttribute("tabindex", "0");
    expect(toc).toHaveAccessibleDescription(
      "Scroll to browse all 17 sections.",
    );
    const links = within(toc).getAllByRole("link");
    expect(links).toHaveLength(sections.length);
    sections.forEach(([id, title], index) => {
      const section = screen.getByRole("region", { name: title });
      expect(section).toHaveAttribute("id", `privacy-${id}`);
      expect(section).toHaveAttribute("tabindex", "-1");
      expect(section).toBeVisible();
      expect(
        within(section).getByRole("heading", { level: 2 }),
      ).toHaveTextContent(title);
      expect(links[index]).toHaveAttribute("href", `#privacy-${id}`);
    });
    const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(document.querySelector("details")).toBeNull();
  });

  it("preserves qualifications about consent, payments, retention, security, and individual rights", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole("region", { name: "7. Cookies and analytics" }),
    ).toHaveTextContent(
      "Where legally required, optional analytics or non-essential cookies should only be activated after appropriate consent.",
    );
    expect(
      screen.getByRole("region", {
        name: "8. Payments and commerce providers",
      }),
    ).toHaveTextContent(
      "PyColors does not store full payment card numbers on its servers.",
    );
    expect(
      screen.getByRole("region", { name: "11. Data sharing" }),
    ).toHaveTextContent(
      "We do not sell personal data in the ordinary meaning of that term.",
    );
    expect(
      screen.getByRole("region", { name: "12. International data transfers" }),
    ).toHaveTextContent(
      "Where required, PyColors aims to rely on appropriate transfer mechanisms such as contractual safeguards provided by the relevant vendor.",
    );
    expect(
      screen.getByRole("region", { name: "13. Retention" }),
    ).toHaveTextContent("only for as long as reasonably necessary");
    expect(
      screen.getByRole("region", { name: "14. Security" }),
    ).toHaveTextContent(
      "No method of transmission or storage is completely secure.",
    );
    const rights = screen.getByRole("region", { name: "15. Your rights" });
    expect(rights).toHaveTextContent(
      "Depending on your location, you may have rights such as access, correction, deletion, restriction, objection, portability, and withdrawal of consent where consent is the basis for processing.",
    );
    expect(rights).toHaveTextContent(
      "You may also have the right to lodge a complaint with a data protection authority.",
    );
    expect(within(rights).getByRole("link")).toHaveAttribute(
      "href",
      "mailto:contact@pycolors.io",
    );
  });

  it("provides real topic, contact, and legal destinations without changing consent controls", () => {
    const { container } = render(<PrivacyPage />);
    const topics = screen.getByRole("navigation", {
      name: "Find a topic in the privacy policy",
    });
    expect(
      within(topics)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["#privacy-data", "#privacy-cookies", "#privacy-rights"]);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (href.startsWith("#"))
        expect(container.querySelector(href)).toHaveAttribute("tabindex", "-1");
    }
    expect(
      screen.getByRole("link", { name: "Read the policy" }),
    ).toHaveAttribute("href", "#privacy-document");
    expect(
      within(screen.getByRole("navigation", { name: "Related legal pages" }))
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/terms", "/license"]);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<PrivacyPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import LicensePage, { metadata } from "@/app/(site)/license/page";

describe("License page", () => {
  it("preserves metadata, document date, publisher and a reachable main landmark", () => {
    const { container } = render(<LicensePage />);
    expect(metadata.alternates?.canonical).toBe("/license");
    expect(metadata.openGraph?.url).toBe("/license");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const info = screen.getByRole("complementary", {
      name: "License document information",
    });
    expect(info).toHaveTextContent("October 6, 2026");
    expect(info).toHaveTextContent("Py Colors SASU");
    expect(container.querySelector("time")).toHaveAttribute(
      "datetime",
      "2026-10-06",
    );
    const breadcrumb = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(
      breadcrumb.itemListElement.map((item: { item: string }) => item.item),
    ).toEqual(["https://pycolors.io/", "https://pycolors.io/license"]);
  });

  it("links all nine terms and the three product entry points to labelled destinations", () => {
    render(<LicensePage />);
    const toc = screen.getByRole("navigation", { name: "License sections" });
    expect(within(toc).getAllByRole("link")).toHaveLength(9);
    const products = screen.getByRole("navigation", {
      name: "Find your product license",
    });
    expect(within(products).getAllByRole("link")).toHaveLength(3);
    for (const link of [
      ...within(toc).getAllByRole("link"),
      ...within(products).getAllByRole("link"),
    ]) {
      expect(
        document.getElementById(link.getAttribute("href")!.slice(1)),
      ).toHaveAccessibleName();
    }
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("makes the actual product rights, support limits and existing purchase protections explicit", () => {
    render(<LicensePage />);
    const names = [
      "1. Open-source packages and public repositories",
      "2. Starter Free",
      "3. Premium templates",
      "4. Starter Pro",
      "5. Restrictions across paid products",
      "6. Updates, access, and support",
    ];
    const counts = [5, 5, 6, 6, 6, 5];
    names.forEach((name, i) => {
      const region = screen.getByRole("region", { name });
      expect(within(region).getAllByRole("listitem")).toHaveLength(counts[i]!);
      expect(region).toBeVisible();
    });
    expect(screen.getByRole("region", { name: names[2] })).toHaveTextContent(
      "unlimited personal, commercial, and client end products",
    );
    expect(screen.getByRole("region", { name: names[3] })).toHaveTextContent(
      "one individual or legal entity and unlimited end products",
    );
    expect(screen.getByRole("region", { name: names[5] })).toHaveTextContent(
      "No response-time SLA is promised",
    );
    expect(
      screen.getByRole("region", { name: "7. License priority" }),
    ).toHaveTextContent(
      "this summary does not cancel a specific commitment made for your purchase",
    );
    expect(
      screen.getByRole("region", {
        name: "8. Your product and third-party code",
      }),
    ).toHaveTextContent(
      "You retain your rights in the original code, content, data, and branding you create.",
    );
  });

  it("retains the summary limits and keeps license priority nearby", () => {
    render(<LicensePage />);
    const summary = screen.getByRole("region", {
      name: "Simple commercial summary",
    });
    expect(within(summary).getAllByRole("listitem")).toHaveLength(8);
    expect(
      within(summary).getByRole("heading", { name: "Allowed" }),
    ).toBeVisible();
    expect(
      within(summary).getByRole("heading", { name: "Not allowed" }),
    ).toBeVisible();
    expect(summary).toHaveTextContent("Use for permitted client work");
    expect(summary).toHaveTextContent(
      "This summary describes the current products. Keep the license and terms supplied with your purchase; earlier rights and mandatory consumer protections remain applicable.",
    );
    expect(
      within(summary).getByRole("link", { name: "Read license priority" }),
    ).toHaveAttribute("href", "#license-priority");
  });

  it("matches the delivered product licenses on project counts and client source access", () => {
    render(<LicensePage />);
    const templateLicense = readFileSync(
      resolve("../na-ai-landing/LICENSE"),
      "utf8",
    );
    const proLicense = readFileSync(resolve("../starter-pro/LICENSE"), "utf8");
    expect(templateLicense).toContain("unlimited commercial end products");
    expect(proLicense).toContain("Create unlimited end products");
    expect(proLicense).toContain("Each client must obtain their own license");
    const template = screen.getByRole("region", {
      name: "3. Premium templates",
    });
    const pro = screen.getByRole("region", { name: "4. Starter Pro" });
    expect(template).toHaveTextContent(
      "unlimited personal, commercial, and client end products",
    );
    expect(template).not.toHaveTextContent("for one end product");
    expect(template).toHaveTextContent("same final project");
    expect(pro).toHaveTextContent(
      "a client needs their own license to access the Starter Pro source code",
    );
    expect(pro).toHaveTextContent("outside the licensed entity");
  });

  it("preserves contact details, legal links and valid anchors without nested controls", () => {
    render(<LicensePage />);
    const contact = screen.getByRole("region", { name: "9. Contact" });
    expect(
      within(contact).getByRole("link", { name: "contact@pycolors.com" }),
    ).toHaveAttribute("href", "mailto:contact@pycolors.com");
    expect(contact).toHaveTextContent(
      "PyColors licensing is operated by Py Colors SASU.",
    );
    const related = screen.getByRole("navigation", { name: "Related pages" });
    expect(
      within(related)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/terms", "/privacy", "/pricing"]);
    for (const link of within(screen.getByRole("main")).getAllByRole("link")) {
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (href.startsWith("#"))
        expect(document.getElementById(href.slice(1))).not.toBeNull();
      if (href.startsWith("/"))
        expect(
          existsSync(
            resolve("app/(site)", href.slice(1).split("#")[0]!, "page.tsx"),
          ),
          href,
        ).toBe(true);
    }
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<LicensePage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

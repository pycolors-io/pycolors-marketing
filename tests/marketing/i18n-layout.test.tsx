import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import HomePage from "@/app/[locale]/(site)/page";
import PricingPage from "@/app/[locale]/(site)/pricing/page";
import StarterProPage from "@/app/[locale]/(site)/starters/pro/page";
import DemoPage from "@/app/[locale]/(site)/demo/page";
import { ThemeInputs } from "@/components/theme-builder/theme-inputs";
import { createThemeBuilderState } from "@/components/theme-builder/theme-builder-state";
import { QuoteRequestForm } from "@/components/quotes/quote-request-form";
import { QUOTE_COPY } from "@/lib/i18n/quote-copy";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import { createCopy, messageKey } from "@/lib/i18n/copy-core";
import { filterStarterProFaqs } from "@/lib/products/starter-pro-faq-search";
import { STARTER_PRO_UPDATES_SUMMARY } from "@/lib/products/commercial-policy";

vi.hoisted(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.test";
});
vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
vi.unmock("@/lib/i18n/navigation");
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));
vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

function structure(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll("main, section, article, h1, h2, h3"),
    (node) => ({
      tag: node.tagName,
      id: node.id,
      className: node.className,
    }),
  );
}

describe("shared English and French Marketing layouts", () => {
  it("renders the French demo heading without corrupted characters", () => {
    render(
      <NextIntlClientProvider locale="fr" timeZone="UTC" messages={fr}>
        <DemoPage />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Ça marche. Faites-le vôtre.",
    );
  });
  it("translates field hints in Theme Builder", () => {
    render(
      <NextIntlClientProvider locale="fr" timeZone="UTC" messages={fr}>
        <ThemeInputs
          draft={createThemeBuilderState().draft}
          errors={{}}
          onFieldChange={vi.fn()}
        />
      </NextIntlClientProvider>,
    );
    expect(
      screen.getByText("Votre couleur principale · #RRGGBB"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Facultatif · inclus dans votre export"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Optional · derives from your brand"),
    ).not.toBeInTheDocument();
  });
  it("translates commercial copy composed from shared policy text", () => {
    const { container } = render(
      <NextIntlClientProvider locale="fr" timeZone="UTC" messages={fr}>
        <StarterProPage />
      </NextIntlClientProvider>,
    );
    expect(container).not.toHaveTextContent(STARTER_PRO_UPDATES_SUMMARY);
    expect(container).toHaveTextContent(
      "Les futures mises à jour de Starter Pro sont incluses sans frais supplémentaires",
    );
    expect(container).toHaveTextContent(
      "Les adaptations spécifiques font l’objet d’un devis distinct.",
    );
  });
  it("keeps the existing French form copy and links to the French privacy page", () => {
    render(
      <NextIntlClientProvider locale="fr" timeZone="UTC" messages={fr}>
        <QuoteRequestForm />
      </NextIntlClientProvider>,
    );
    expect(screen.getByLabelText(QUOTE_COPY.fr.budget)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: QUOTE_COPY.fr.submit }),
    ).toBeInTheDocument();
    const privacy = screen.getByRole("link", {
      name: new RegExp(QUOTE_COPY.fr.privacyLink),
    });
    expect(privacy).toHaveAttribute("href", "/fr/confidentialite");
    expect(privacy).toHaveAttribute("hreflang", "fr");
  });
  it.each([
    ["home", HomePage],
    ["pricing", PricingPage],
  ] as const)(
    "keeps the same blocks, hierarchy and grids on %s",
    (_name, Page) => {
      const english = render(
        <NextIntlClientProvider locale="en" timeZone="UTC" messages={en}>
          <Page />
        </NextIntlClientProvider>,
      );
      const expected = structure(english.container);
      const originalHeading =
        english.container.querySelector("h1")?.textContent;
      english.unmount();
      const french = render(
        <NextIntlClientProvider locale="fr" timeZone="UTC" messages={fr}>
          <Page />
        </NextIntlClientProvider>,
      );
      expect(structure(french.container)).toEqual(expected);
      expect(french.container.querySelector("h1")?.textContent).not.toBe(
        originalHeading,
      );
      expect(french.container.textContent).not.toContain("{value");
      if (_name === "pricing") {
        expect(french.container).not.toHaveTextContent(
          "Revocable sessions & workspace roles",
        );
        expect(french.container).toHaveTextContent(
          "Sessions révocables et rôles dans l’espace de travail",
        );
      }
    },
  );

  it("searches the translated FAQ without changing canonical question identities", () => {
    const translate = Object.assign(
      (id: string) => fr.site[id as keyof typeof fr.site],
      {
        has: (id: string) => Object.hasOwn(fr.site, id),
        raw: (id: string) => fr.site[id as keyof typeof fr.site],
      },
    );
    const t = createCopy("fr", translate);
    const question = "What happens after payment?";
    expect(t(question)).not.toBe(question);
    expect(
      filterStarterProFaqs("paiement", "all", t).some(
        (item) => item.question === question,
      ),
    ).toBe(true);
    expect(Object.keys(en.site).sort()).toEqual(Object.keys(fr.site).sort());
    expect(t("Buy Starter Pro — {value0}", { value0: "299 €" })).toBe(
      "Acheter Starter Pro — 299 €",
    );
    expect(messageKey(" Buy Starter Pro — {value0} ")).toBe(
      messageKey("Buy Starter Pro — {value0}"),
    );
  });
});

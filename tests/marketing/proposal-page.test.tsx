import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { axe } from "vitest-axe";
import ProposalPage, {
  generateMetadata,
} from "@/app/[locale]/(site)/request-a-quote/template/page";
import fr from "@/messages/fr.json";

vi.unmock("@/lib/i18n/use-copy");
vi.unmock("next-intl");
vi.mock("@/lib/i18n/server-copy", async () => {
  const { createCopy } = await import("@/lib/i18n/copy-core");
  const { createTranslator } = await import("next-intl");
  const { default: french } = await import("@/messages/fr.json");
  return {
    getCopy: async (locale: "en" | "fr" = "en") =>
      createCopy(
        locale,
        createTranslator<Record<string, Record<string, string>>, "site">({
          locale,
          messages: locale === "fr" ? french : { site: {} },
          namespace: "site",
        }),
      ),
  };
});

describe("proposal web preview", () => {
  it.each(["en", "fr"] as const)(
    "shows the complete %s document, an editable download and a real print action",
    async (locale) => {
      const view = render(
        <NextIntlClientProvider
          locale={locale}
          messages={locale === "fr" ? fr : { site: {} }}
          timeZone="UTC"
        >
          {await ProposalPage({ params: Promise.resolve({ locale }) })}
        </NextIntlClientProvider>,
      );
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      const hero = screen.getByRole("heading", { level: 1 }).closest("header")!;
      const projectLink = within(hero).getByRole("link", {
        name:
          locale === "fr" ? "Décrire votre projet" : "Describe your project",
      });
      expect(projectLink).toHaveAttribute(
        "href",
        "/request-a-quote?service=custom-product",
      );
      expect(
        within(hero).getByRole("link", {
          name:
            locale === "fr"
              ? "Parcourir la proposition"
              : "Explore the proposal",
        }),
      ).toHaveAttribute("href", "#proposal-document");
      const document = screen.getByRole("article");
      expect(
        within(document).getAllByRole("heading", { level: 3 }),
      ).toHaveLength(10);
      expect(within(document).getAllByRole("table")).toHaveLength(4);
      expect(within(document).getAllByRole("columnheader")).toHaveLength(21);
      expect(document).not.toHaveTextContent("**");
      expect(document).toHaveTextContent(
        locale === "fr" ? "Modèle vierge" : "Blank template",
      );
      expect(document).toHaveAttribute("id", "proposal-document");
      expect(
        within(document).getByText(
          locale === "fr"
            ? "Une structure indicative. PyColors prépare la proposition finale pour votre mission, puis l’examine avec vous."
            : "An illustrative outline. PyColors prepares the final proposal for your engagement and reviews it with you.",
        ),
      ).toBeVisible();
      const download = within(document).getByRole("link", {
        name:
          locale === "fr"
            ? "Télécharger le modèle Word"
            : "Download Word template",
      });
      expect(download).toHaveAttribute(
        "href",
        locale === "fr"
          ? "/fr/demande-de-devis/modele/word"
          : "/request-a-quote/template/word",
      );
      expect(download).toHaveAttribute("download");
      expect(hero).not.toContainElement(download);
      const contents = screen.getByRole("navigation", {
        name:
          locale === "fr" ? "Sommaire de la proposition" : "Proposal contents",
      });
      for (const link of within(contents).getAllByRole("link"))
        expect(
          view.container.querySelector(link.getAttribute("href")!),
        ).toBeTruthy();
      const print = vi.spyOn(window, "print").mockImplementation(() => {});
      fireEvent.click(
        screen.getByRole("button", {
          name:
            locale === "fr"
              ? "Imprimer / Enregistrer en PDF"
              : "Print / Save PDF",
        }),
      );
      expect(print).toHaveBeenCalledOnce();
      print.mockRestore();
      expect((await axe(view.container)).violations).toEqual([]);
    },
  );
  it("keeps the blank template out of search results", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "fr" }),
    });
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(metadata.alternates?.canonical).toBe(
      "https://pycolors.io/fr/demande-de-devis/modele",
    );
  });
});

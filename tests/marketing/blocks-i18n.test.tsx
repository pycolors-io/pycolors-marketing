import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { BlockCatalogPreview } from "@/components/marketing/blocks/block-catalog-preview";
import fr from "@/messages/fr.json";
import clientKeys from "@/messages/client-keys.json";
import { BLOCK_CATEGORIES, BLOCKS_CATALOG } from "@/lib/blocks/catalog";
import { messageKey } from "@/lib/i18n/copy-core";

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
const messages = {
  site: Object.fromEntries(
    clientKeys.map((key) => [key, fr.site[key as keyof typeof fr.site]]),
  ),
};
function preview(blockId: string) {
  return render(
    <NextIntlClientProvider
      locale="fr"
      timeZone="UTC"
      messages={blockId === "stats-overview" ? fr : messages}
    >
      <BlockCatalogPreview blockId={blockId} />
    </NextIntlClientProvider>,
  );
}

describe("French block demonstrations", () => {
  it("covers every catalogue title, category and description in French", () => {
    const copy = [
      ...BLOCK_CATEGORIES.map((category) => category.label),
      ...BLOCKS_CATALOG.flatMap((block) => [block.title, block.description]),
    ];
    for (const text of copy) {
      const translated = fr.site[messageKey(text) as keyof typeof fr.site];
      expect(translated, text).toBeTruthy();
      if (text !== "Commerce") expect(translated, text).not.toBe(text);
    }
  });
  it.each([
    ["sign-in", "Se connecter", "Sign in"],
    ["sign-up", "Créer votre compte", "Create your account"],
    ["password-recovery", "Récupérer votre compte", "Recover your account"],
    ["invoice-history", "Montant", "September 1, 2026"],
    ["workspace-members", "Actif · Exemple", "Active example"],
    ["workspace-invitations", "En attente", "Example recipient"],
    ["pricing-plans", "/ mois", "/ month"],
    [
      "empty-state-panel",
      "Ajoutez un premier projet",
      "Give your workspace its first project",
    ],
  ])(
    "localizes %s defaults and supplied data",
    (block, translated, english) => {
      const view = preview(block);
      expect(view.container).toHaveTextContent(translated);
      expect(view.container).not.toHaveTextContent(english);
    },
  );
  it("translates metric labels and checklist states with the actual client catalogue", () => {
    const stats = preview("stats-overview");
    expect(stats.container).not.toHaveTextContent("Active projects");
    expect(stats.container).not.toHaveTextContent("Across all workspace teams");
    stats.unmount();
    const checklist = preview("onboarding-checklist");
    expect(checklist.container).toHaveTextContent("Terminé");
    expect(checklist.container).toHaveTextContent("À faire");
    expect(checklist.container).not.toHaveTextContent(
      "Give your team a shared place to work.",
    );
  });
  it("translates filters, table headings and pagination without changing filter values", () => {
    const view = preview("data-table");
    expect(view.container).not.toHaveTextContent("Search records");
    expect(view.container).not.toHaveTextContent("Rows per page");
    expect(
      screen.getByRole("button", { name: "Page suivante" }),
    ).toHaveTextContent("Page suivante");
    expect(
      screen.getByPlaceholderText("Rechercher par nom"),
    ).toBeInTheDocument();
    const select = screen.getByRole("combobox", { name: /État|Statut/ });
    fireEvent.change(select, { target: { value: "Available" } });
    expect(select).toHaveValue("Available");
    fireEvent.change(screen.getByPlaceholderText("Rechercher par nom"), {
      target: { value: "zzzz" },
    });
    expect(view.container).toHaveTextContent(
      "Aucun enregistrement correspondant",
    );
    expect(view.container).not.toHaveTextContent("No matching records");
  });
  it("translates chat copy and response states while preserving a typed message", async () => {
    vi.useFakeTimers();
    try {
      const view = preview("ai-chat");
      expect(
        screen.getByText("Sur quoi travaillez-vous ?"),
      ).toBeInTheDocument();
      fireEvent.change(screen.getByPlaceholderText("Écrivez un message…"), {
        target: { value: "Mon message personnel, sans transformation." },
      });
      fireEvent.click(
        screen.getByRole("button", { name: "Envoyer le message" }),
      );
      expect(view.container).toHaveTextContent(
        "Mon message personnel, sans transformation.",
      );
      expect(view.container).toHaveTextContent("En attente d’une réponse…");
      await act(async () => vi.advanceTimersByTime(10000));
      expect(view.container).not.toHaveTextContent(
        "Ready for your next message.",
      );
      expect(view.container).toHaveTextContent(
        "Prêt pour votre prochain message.",
      );
    } finally {
      vi.useRealTimers();
    }
  });
  it("keeps the agent review and confirmation in French", async () => {
    vi.useFakeTimers();
    try {
      const view = preview("ai-chat");
      fireEvent.click(screen.getByRole("button", { name: /agent.*démo/i }));
      fireEvent.click(
        screen.getByRole("button", { name: "Envoyer le message" }),
      );
      expect(
        screen.getByRole("heading", { name: "Définition de l’agent" }),
      ).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Nom de l’agent/), {
        target: { value: "Mon assistant" },
      });
      fireEvent.click(
        screen.getByRole("button", { name: "Confirmer la définition" }),
      );
      await act(async () => vi.advanceTimersByTime(1000));
      expect(view.container).toHaveTextContent("Définition créée localement");
      expect(
        screen.getByRole("button", { name: "Copier le JSON" }),
      ).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});

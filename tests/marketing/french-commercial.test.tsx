import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { FrenchHeader } from "@/components/layout/french-header";
import {
  FrenchHome,
  FrenchStarterPro,
  FrenchPricing,
} from "@/components/marketing/french-commercial-pages";
import { QuoteRequestForm } from "@/components/quotes/quote-request-form";
import {
  findLocalizedPage,
  frenchMetadata,
  LOCALIZED_ROUTES,
  localizedAlternates,
} from "@/lib/i18n/routes";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import sitemap from "@/app/sitemap";
const route = vi.hoisted(() => ({ pathname: "/fr/tarifs" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("next/link", () => ({
  default: (props: React.ComponentProps<"a">) => <a {...props} />,
}));
vi.mock("@/lib/source", () => ({ source: { getPages: () => [] } }));
vi.mock("@/lib/blog/utils", () => ({
  getAllPosts: () => [],
  getAllCategories: () => [],
  getAllTags: () => [],
  normalizeTaxonomy: (value: string) => value,
}));
vi.mock("fumadocs-ui/provider/base", () => ({
  useTheme: () => ({ theme: "system", setTheme: vi.fn() }),
}));
vi.mock("@/lib/api/client", () => ({ createCheckoutSession: vi.fn() }));
const requestId = "00000000-0000-4000-8000-000000000001";
beforeEach(() => {
  route.pathname = "/fr/tarifs";
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
  vi.spyOn(crypto, "randomUUID").mockReturnValue(requestId);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
function fillFrenchQuote() {
  fireEvent.change(screen.getByLabelText("Nom"), {
    target: { value: "Équipe de test" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "qa@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Budget indicatif"), {
    target: { value: "5k-10k" },
  });
  fireEvent.change(screen.getByLabelText("Que souhaitez-vous construire ?"), {
    target: {
      value:
        "Nous souhaitons un parcours de validation des projets avec responsables, échéances et commentaires.",
    },
  });
}
describe("French commercial journey", () => {
  it("publishes reciprocal language links and self canonicals for exactly four real translations", () => {
    const entries = sitemap();
    expect(
      entries.filter((entry) => new URL(entry.url).pathname.startsWith("/fr")),
    ).toHaveLength(4);
    for (const [key, paths] of Object.entries(LOCALIZED_ROUTES)) {
      const page = key as keyof typeof LOCALIZED_ROUTES;
      expect(findLocalizedPage(paths.en)).toBe(page);
      expect(findLocalizedPage(`${paths.fr}/`)).toBe(page);
      for (const locale of ["en", "fr"] as const) {
        const metadata = localizedAlternates(page, locale);
        expect(metadata.canonical).toBe(paths[locale]);
        expect(metadata.languages).toEqual({
          en: `https://pycolors.io${paths.en}`,
          fr: `https://pycolors.io${paths.fr}`,
          "x-default": `https://pycolors.io${paths.en}`,
        });
        const url = `https://pycolors.io${paths[locale] === "/" ? "" : paths[locale]}`;
        expect(
          entries.find((entry) => entry.url === url)?.alternates?.languages,
        ).toEqual(metadata.languages);
      }
      const metadata = frenchMetadata(
        page,
        "Un titre français",
        "Une description française",
      );
      expect(metadata.openGraph).toMatchObject({
        locale: "fr_FR",
        url: paths.fr,
        description: "Une description française",
      });
    }
    expect(findLocalizedPage("/docs/starter-pro")).toBeUndefined();
    expect(findLocalizedPage("/fr/docs")).toBeUndefined();
    expect(findLocalizedPage("/pricing-extra")).toBeUndefined();
  });
  it("links to the equivalent page and clearly names a home fallback for untranslated English pages", () => {
    const view = render(<LanguageSwitcher locale="fr" />);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/pricing",
    );
    route.pathname = "/docs";
    view.rerender(<LanguageSwitcher />);
    expect(
      screen.getByRole("link", { name: "Français — accueil" }),
    ).toHaveAttribute("href", "/fr");
  });
  it("provides a keyboard accessible French mobile menu and closes it on navigation", async () => {
    render(<FrenchHeader />);
    fireEvent.click(
      screen.getByRole("button", { name: "Ouvrir le menu de navigation" }),
    );
    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByRole("button", { name: "Fermer le menu" }),
    ).toBeVisible();
    expect(
      within(dialog).getByRole("link", { name: "Documentation · EN" }),
    ).toHaveAttribute("href", "/docs/starter-pro");
    expect(await axe(dialog)).toHaveNoViolations();
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  for (const [name, Component] of [
    ["home", FrenchHome],
    ["starter", FrenchStarterPro],
    ["pricing", FrenchPricing],
  ] as const) {
    it(`renders the ${name} page with one heading, usable links and accessible content`, async () => {
      const { container } = render(<Component />);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("main")).toHaveAttribute("id", "content");
      expect(
        container.querySelectorAll('a[href^="/fr/demande-de-devis"]'),
      ).not.toHaveLength(0);
      expect(await axe(container)).toHaveNoViolations();
      if (name !== "home")
        expect(container.textContent).toContain(
          PRODUCT_DISPLAY["starter-pro"].priceLabel,
        );
    });
  }
  it("submits a French brief through the existing API and confirms in French without a real email", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        Response.json({ ok: true, reference: requestId }, { status: 202 }),
      );
    vi.stubGlobal("fetch", fetchMock);
    render(<QuoteRequestForm locale="fr" initialService="guided-setup" />);
    fillFrenchQuote();
    fireEvent.submit(
      screen.getByRole("form", { name: "Définissons la prochaine étape." }),
    );
    const confirmation = await screen.findByRole("status");
    expect(confirmation).toHaveTextContent("Demande envoyée.");
    expect(confirmation).toHaveFocus();
    expect(
      within(confirmation).getByRole("link", { name: "Retour aux tarifs" }),
    ).toHaveAttribute("href", "/fr/tarifs");
    const body = JSON.parse(fetchMock.mock.calls[0]![1]!.body as string);
    expect(body).toMatchObject({
      service: "guided-setup",
      budget: "5k-10k",
      requestId,
    });
    expect(body.brief).toContain("Nous souhaitons");
  });
  it("keeps the French brief and reports rate limiting in French", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ ok: false }, { status: 429 })),
    );
    render(
      <QuoteRequestForm locale="fr" initialService="business-adaptation" />,
    );
    fillFrenchQuote();
    fireEvent.submit(
      screen.getByRole("form", { name: "Définissons la prochaine étape." }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Patientez 15 minutes",
    );
    expect(
      (
        screen.getByLabelText(
          "Que souhaitez-vous construire ?",
        ) as HTMLTextAreaElement
      ).value,
    ).toContain("Nous souhaitons");
  });
});

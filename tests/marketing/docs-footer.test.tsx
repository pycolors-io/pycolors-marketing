import * as React from "react";
import Link from "next/link";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { DocsFooter } from "@/components/docs-footer";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";

const localeState = vi.hoisted(() => ({ value: "en" as "en" | "fr" }));
vi.mock("@/lib/i18n/use-copy", async () => {
  const { createCopy } = await import("../../lib/i18n/copy-core");
  const french = (await import("../../messages/fr.json")).default
    .site as Record<string, string>;
  return {
    useCopy: () =>
      createCopy(
        localeState.value,
        Object.assign((key: string) => french[key] ?? key, {
          has: (key: string) => Object.hasOwn(french, key),
          raw: (key: string) => french[key],
        }),
      ),
  };
});

const preference = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
const navigation = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => preference }));
vi.mock("next/navigation", () => ({
  useRouter: () => navigation,
  usePathname: () => "/docs",
}));
vi.mock("@/components/logo", () => ({
  Logo: ({ variant }: { variant?: "default" | "docs" }) => (
    <Link href={variant === "docs" ? "/docs" : "/"}>
      {variant === "docs" ? "PyColors Docs" : "PyColors"}
    </Link>
  ),
}));

beforeEach(() => {
  preference.setTheme.mockClear();
  navigation.push.mockClear();
  window.history.replaceState(null, "", "/docs");
});

afterEach(() => {
  localeState.value = "en";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

describe("documentation footer", () => {
  it("uses the shared site footer with product, resource, comparison, and support destinations", () => {
    render(<DocsFooter />);
    const footer = screen.getByRole("contentinfo", {
      name: "PyColors site footer",
    });
    expect(
      within(footer).getByRole("button", { name: "Language: English" }),
    ).toHaveTextContent("English");
    for (const title of [
      "Products",
      "UI",
      "Blocks",
      "Design System",
      "Starter Free",
      "Starter Pro",
      "Templates",
      "Guides",
      "Registry",
      "Resources",
      "Compare",
      "Company",
    ]) {
      const nav = within(footer).getByRole("navigation", {
        name: `Footer ${title}`,
      });
      expect(
        within(nav).getByRole("heading", { name: title, level: 2 }),
      ).toBeVisible();
      expect(within(nav).getByRole("list")).toBeVisible();
    }
    expect(
      within(footer).getByRole("link", { name: "PyColors" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(footer).queryByRole("region", {
        name: "Your next product starts here.",
      }),
    ).not.toBeInTheDocument();
    expect(
      within(footer).getByText(
        "Components, templates, and SaaS starters. Built to work together.",
      ),
    ).toBeVisible();
    expect(
      within(footer).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
    const resources = within(footer).getByRole("navigation", {
      name: "Footer Resources",
    });
    expect(
      within(resources).getByRole("link", { name: "Documentation" }),
    ).toHaveAttribute("href", "/docs");
    const explorer = within(footer).getByRole("link", { name: "UI Explorer" });
    expect(explorer).toHaveAttribute("href", "https://ui.pycolors.io/");
    expect(explorer).toHaveAttribute("target", "_blank");
    expect(explorer).toHaveAttribute("rel", "noopener noreferrer");
    expect(explorer).toHaveAccessibleDescription("Opens in a new tab");
    for (const link of within(footer).getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("button,a")).toBeNull();
      if (href === "/docs" || href.startsWith("/docs/")) {
        const path = href.slice("/docs".length);
        expect(
          existsSync(resolve(`content/docs${path}/index.mdx`)) ||
            existsSync(resolve(`content/docs${path}.mdx`)),
          href,
        ).toBe(true);
      } else if (href.startsWith("/")) {
        expect(
          existsSync(resolve("app/[locale]/(site)", href.slice(1), "page.tsx")),
          href,
        ).toBe(true);
      }
    }
  });

  it("localizes directory navigation and keeps the mobile product marked coming soon", () => {
    localeState.value = "fr";
    render(<DocsFooter />);
    const registry = screen.getByRole("navigation", {
      name: "Pied de page : Registre de composants",
    });
    expect(
      within(registry).getByRole("heading", {
        name: "Registre de composants",
        level: 2,
      }),
    ).toBeVisible();
    expect(
      within(registry).getByRole("link", { name: "Mises à jour" }),
    ).toHaveAttribute("href", "/docs/registry/updates");
    const ui = screen.getByRole("navigation", { name: "Pied de page : UI" });
    expect(
      within(ui).getByRole("link", { name: "Voir tous les composants" }),
    ).toHaveAttribute("href", "/docs/ui");
    const pro = screen.getByRole("navigation", {
      name: "Pied de page : Starter Pro",
    });
    expect(
      within(pro).getByRole("link", { name: "Déploiement" }),
    ).toHaveAttribute("href", "/docs/starter-pro/deployment");
    expect(
      within(pro).getByRole("link", { name: "Tous les guides Starter Pro" }),
    ).toHaveAttribute("href", "/docs/starter-pro");
    const products = screen.getByRole("navigation", {
      name: "Pied de page : Produits",
    });
    expect(
      within(products).getByRole("link", {
        name: "Application mobile React Native · Bientôt disponible",
      }),
    ).toHaveAttribute("href", "/starters/mobile");
  });

  it("shares theme controls and animated navigation while exposing support and release information", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.stubGlobal("scrollY", 1400);
    render(<DocsFooter />);
    const themes = screen.getByRole("group", { name: "Color theme" });
    const palettes = screen.getByRole("group", { name: "Site palette" });
    expect(
      within(palettes).getByRole("button", { name: "PyColors" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      within(palettes).getByRole("button", { name: "Monochrome" }),
    ).toBeEnabled();
    expect(within(themes).getAllByRole("button")).toHaveLength(3);
    fireEvent.click(
      within(themes).getByRole("button", { name: "Light theme" }),
    );
    expect(preference.setTheme).toHaveBeenCalledWith("light");
    expect(
      screen.getByRole("link", { name: "Purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("link", { name: "Recover purchase" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(
      screen.getByRole("link", {
        name: `Release history: UI ${UI_VERSION}, Tokens ${TOKENS_VERSION}`,
      }),
    ).toHaveAttribute("href", "/changelog");
    const repos = screen.getByRole("navigation", {
      name: "PyColors on GitHub",
    });
    for (const link of within(repos).getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
    fireEvent.click(screen.getByRole("link", { name: "Contact" }));
    expect(scroll).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    expect(navigation.push).toHaveBeenCalledExactlyOnceWith("/contact", {
      scroll: false,
    });
  });

  it("returns keyboard focus to the docs article when reselecting its current page", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.stubGlobal("scrollY", 1400);
    window.history.replaceState(null, "", "/docs");
    render(
      <>
        <article id="nd-page">UI documentation</article>
        <DocsFooter />
      </>,
    );
    const link = screen.getByRole("link", { name: "Documentation" });
    link.focus();
    fireEvent.click(link);
    expect(screen.getByRole("article")).toHaveFocus();
    expect(navigation.push).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<DocsFooter />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

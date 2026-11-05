import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { createCopy, messageKey } from "@/lib/i18n/copy-core";
import { localizedHref } from "@/lib/i18n/routing";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import fr from "@/messages/fr.json";

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
const route = vi.hoisted(() => ({ path: "/fr/tarifs" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.path }));
afterEach(() => {
  route.path = "/fr/tarifs";
  window.history.replaceState(null, "", "/");
});
describe("whole-site locale foundations", () => {
  it("preserves route identity, query and anchors in each language", () => {
    expect(localizedHref("/pricing?view=pro#implementation", "fr")).toBe(
      "/fr/tarifs?view=pro#implementation",
    );
    expect(localizedHref("/fr/confidentialite", "en")).toBe("/privacy");
    expect(localizedHref("/docs/starter-pro", "fr")).toBe(
      "/fr/docs/starter-pro",
    );
    expect(localizedHref("https://ui.pycolors.io", "fr")).toBe(
      "https://ui.pycolors.io",
    );
    expect(localizedHref("/api/search?query=button", "fr")).toBe(
      "/api/search?query=button",
    );
  });
  it("opens an accessible language menu and preserves the current page, query and anchor", async () => {
    window.history.replaceState(null, "", "/fr/tarifs?plan=pro#implementation");
    render(
      <NextIntlClientProvider locale="fr" timeZone="UTC" messages={fr}>
        <LanguageSwitcher />
      </NextIntlClientProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Langue : Français" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const menu = await screen.findByRole("menu", { name: "Langue : Français" });
    expect(screen.getByRole("menuitem", { name: "English" })).toHaveAttribute(
      "href",
      "/pricing?plan=pro#implementation",
    );
    expect(screen.getByRole("menuitem", { name: "English" })).toHaveAttribute(
      "hreflang",
      "en",
    );
    expect(screen.getByRole("menuitem", { name: "Français" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    fireEvent.keyDown(menu, { key: "Escape" });
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
  it("shows the complete language name in the footer and closes when reselecting it", async () => {
    render(
      <NextIntlClientProvider locale="fr" timeZone="UTC" messages={fr}>
        <LanguageSwitcher variant="footer" />
      </NextIntlClientProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Langue : Français" });
    expect(trigger).toHaveTextContent("Français");
    fireEvent.keyDown(trigger, { key: "Enter" });
    fireEvent.click(await screen.findByRole("menuitem", { name: "Français" }));
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "false"),
    );
  });
  it("localizes dotted blog topics and feeds while preserving public assets", () => {
    expect(localizedHref("/blog/categories/next.js", "fr")).toBe(
      "/fr/blog/categories/next.js",
    );
    expect(localizedHref("/fr/blog/tags/next.js", "en")).toBe(
      "/blog/tags/next.js",
    );
    expect(localizedHref("/blog/feed.json", "fr")).toBe("/fr/blog/feed.json");
    expect(localizedHref("/fr/blog/rss.xml", "en")).toBe("/blog/rss.xml");
    expect(localizedHref("/llms-full.txt", "fr")).toBe("/llms-full.txt");
    expect(localizedHref("/registry.json", "fr")).toBe("/registry.json");
    expect(localizedHref("/images/preview.png?width=1200", "fr")).toBe(
      "/images/preview.png?width=1200",
    );
  });
  it("localizes presentation text while keeping whitespace and nontext values", () => {
    const key = messageKey("Open documentation");
    const translate = Object.assign(
      (id: string) => (id === key ? "Ouvrir la documentation" : id),
      { has: (id: string) => id === key },
    );
    const t = createCopy("fr", translate);
    expect(t(" Open documentation ")).toBe(" Ouvrir la documentation ");
    const node = <strong>Technical identifier</strong>;
    expect(t(node)).toBe(node);
    expect(t(42)).toBe(42);
  });
});

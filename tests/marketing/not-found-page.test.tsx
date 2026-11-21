import type { ReactNode } from "react";
import NextLink from "next/link";
import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import NotFound from "@/components/marketing/not-found-page";
import LocaleNotFound from "@/app/[locale]/not-found";
import GlobalNotFound from "@/app/global-not-found";
import { createCopy, messageKey } from "@/lib/i18n/copy-core";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

const localeState = vi.hoisted(() => ({ value: "en" as SiteLocale }));

vi.mock("@/lib/i18n/use-copy", () => ({
  useCopy: () => copyFor(localeState.value),
}));
vi.mock("@/lib/i18n/navigation", () => ({
  Link: (props: React.ComponentProps<typeof NextLink>) => (
    <NextLink
      {...props}
      href={
        typeof props.href === "string"
          ? localizedHref(props.href, localeState.value)
          : props.href
      }
    />
  ),
}));
vi.mock("@/components/layout/site-header", async () => {
  const { Logo } = await import("@/components/logo");
  return {
    SiteHeader: () => (
      <header>
        <Logo />
      </header>
    ),
  };
});
vi.mock("@/components/footer", () => ({
  Footer: () => <footer>PyColors</footer>,
}));
vi.mock("@/components/layout/root-document", () => ({
  baseMetadata: { title: "PyColors" },
  RootDocument: ({
    children,
    locale = "en",
  }: {
    children: ReactNode;
    locale?: string;
  }) => (
    <div data-testid="root-document" data-document-locale={locale}>
      {children}
    </div>
  ),
}));

function copyFor(locale: SiteLocale) {
  const messages: Record<string, string> = locale === "fr" ? fr.site : en.site;
  return createCopy(
    locale,
    Object.assign((key: string) => messages[key] ?? key, {
      has: (key: string) => Object.hasOwn(messages, key),
    }),
  );
}

beforeEach(() => vi.stubGlobal("fetch", vi.fn()));
afterEach(() => vi.unstubAllGlobals());

describe("Marketing 404 recovery", () => {
  it.each(["en", "fr"] as const)(
    "offers clear native recovery destinations in %s without initiating a purchase",
    async (locale) => {
      localeState.value = locale;
      const t = copyFor(locale);
      const { container } = render(<NotFound />);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "content");
      expect(main).toHaveAttribute("tabindex", "-1");
      main.focus();
      expect(main).toHaveFocus();
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: t("This page isn’t here."),
        }),
      ).toBeVisible();
      expect(
        screen.getByText(t("404 · Page not found").replace(/\s+/g, " ").trim()),
      ).toBeVisible();
      expect(screen.getByRole("banner")).toBeVisible();
      expect(screen.getByRole("contentinfo")).toBeVisible();
      expect(screen.getByRole("link", { name: "PyColors" })).toHaveAttribute(
        "href",
        locale === "fr" ? "/fr" : "/",
      );

      for (const [label, href, frenchHref] of [
        ["Back to home", "/", "/fr"],
        ["Compare starters", "/starters", "/fr/starters"],
        ["Products", "/pricing", "/fr/tarifs"],
        ["Documentation", "/docs", "/fr/docs"],
        ["Recover purchase access", "/orders/recover", "/fr/orders/recover"],
        ["Purchase support", "/orders/support", "/fr/orders/support"],
        ["Contact PyColors", "/contact", "/fr/contact"],
      ]) {
        const link = within(main).getByRole("link", {
          name: t(label!),
        });
        expect(link).toHaveAttribute(
          "href",
          locale === "fr" ? frenchHref : href,
        );
        expect(link.querySelector("a,button")).toBeNull();
        link.focus();
        expect(link).toHaveFocus();
      }
      const destinations = screen.getByRole("navigation", {
        name: t("Find your next step."),
      });
      expect(within(destinations).getAllByRole("link")).toHaveLength(3);
      expect(within(main).getAllByRole("link")).toHaveLength(7);
      expect(main.querySelector("button,form,input")).toBeNull();
      expect(fetch).not.toHaveBeenCalled();
      expect((await axe(container)).violations).toEqual([]);

      if (locale === "fr") {
        for (const text of [
          "This page isn’t here.",
          "The link may have changed. These pages will help you find what you need.",
          "Back to home",
          "Find your next step.",
          "Compare source licences and find your starting point.",
          "Find setup guides and answers for your project.",
          "Get a fresh access link using the email from your purchase.",
          "Still need help?",
        ]) {
          const key = messageKey(text);
          expect(en.site[key as keyof typeof en.site]).toBe(text);
          expect(fr.site[key as keyof typeof fr.site]).toBeTruthy();
          expect(t(text)).not.toBe(text);
          expect(within(main).getByText(t(text))).toBeVisible();
        }
      }
    },
  );

  it("keeps the shared localized fallback and the standalone global document", () => {
    expect(LocaleNotFound).toBe(NotFound);
    localeState.value = "en";
    render(<GlobalNotFound />);
    expect(screen.getByTestId("root-document")).toHaveAttribute(
      "data-document-locale",
      "en",
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "This page isn’t here.",
    );
  });
});

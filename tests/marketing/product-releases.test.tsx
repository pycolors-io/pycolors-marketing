import * as React from "react";
import NextLink from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, within, cleanup } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ProductReleasesPage from "@/app/[locale]/(site)/product-releases/page";
import { DOCUMENTED_PRODUCT_RELEASES } from "@/lib/products/product-releases";
import { PRODUCT_COMPONENT_VERSIONS } from "@/lib/products/public-catalog.generated";
import { createCopy, messageKey } from "@/lib/i18n/copy-core";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

const localeState = vi.hoisted(() => ({ value: "en" as SiteLocale }));

vi.mock("@/lib/i18n/server-copy", () => ({
  getCopy: async () => copyFor(localeState.value),
}));
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

function copyFor(locale: SiteLocale) {
  const messages: Record<string, string> = locale === "fr" ? fr.site : en.site;
  return createCopy(
    locale,
    Object.assign((key: string) => messages[key] ?? key, {
      has: (key: string) => Object.hasOwn(messages, key),
    }),
  );
}

function articleFor(slug: string) {
  const article = document.querySelector(`[data-product-release="${slug}"]`);
  expect(article).not.toBeNull();
  return within(article as HTMLElement);
}

function frenchFor(original: string) {
  const key = messageKey(original);
  const english: Record<string, string> = en.site;
  const french: Record<string, string> = fr.site;
  expect(english[key], `English catalogue: ${original}`).toBe(original);
  expect(french[key], `French catalogue: ${original}`).toBeTruthy();
  return french[key]!;
}

describe("Product releases hub", () => {
  it("projects documented source package versions with their included components", async () => {
    localeState.value = "en";
    const { container } = render(await ProductReleasesPage());
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(DOCUMENTED_PRODUCT_RELEASES.map((release) => release.slug)).toEqual([
      "starter-pro",
      "starter-pro-mobile",
      "starter-pro-fullstack",
      "na-ai-landing",
    ]);
    for (const [slug, version, components] of [
      ["starter-pro", PRODUCT_COMPONENT_VERSIONS.web, ["Web", "Backend"]],
      [
        "starter-pro-mobile",
        PRODUCT_COMPONENT_VERSIONS.web,
        ["Mobile", "Backend"],
      ],
      [
        "starter-pro-fullstack",
        PRODUCT_COMPONENT_VERSIONS.web,
        ["Web", "Mobile", "Backend"],
      ],
      ["na-ai-landing", PRODUCT_COMPONENT_VERSIONS.naAi, ["Template"]],
    ] as const) {
      const article = articleFor(slug);
      expect(article.getByText("Source package version")).toBeVisible();
      expect(article.getByText("Included components")).toBeVisible();
      const definitions = article.getAllByRole("definition");
      expect(definitions).toHaveLength(2);
      expect(definitions[0]).toHaveTextContent(`v${version}`);
      expect(definitions[1]).toHaveTextContent(components.join(" · "));
      expect(article.getAllByText(/^v\d+\.\d+\.\d+/)).toHaveLength(1);
    }
    expect(
      screen.getByText(
        /manifest in your downloaded package identifies the version and components you received/,
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Recover purchase access" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(screen.queryByRole("button", { name: /buy/i })).toBeNull();
    expect(container.innerHTML).not.toMatch(
      /(?:acct|price|prod|cs_live|cs_test)_|whsec_|BLOB_|\.blob\.vercel-storage|\/api\/v1\/downloads/,
    );
  });

  it("links only to existing public notes and guides", () => {
    const docsDirectory = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../content/docs",
    );
    for (const release of DOCUMENTED_PRODUCT_RELEASES)
      for (const link of release.links) {
        expect(link.href.startsWith("/docs/")).toBe(true);
        const relative = link.href.slice("/docs/".length);
        expect(
          existsSync(path.join(docsDirectory, `${relative}.mdx`)),
          link.href,
        ).toBe(true);
        expect(
          existsSync(path.join(docsDirectory, `${relative}.fr.mdx`)),
          link.href,
        ).toBe(true);
      }
  });

  it("renders the documented package versions and included components in French", async () => {
    cleanup();
    localeState.value = "fr";
    render(await ProductReleasesPage());
    const expected = "Know your version. Plan your update.";
    const key = messageKey(expected);
    expect(en.site[key as keyof typeof en.site]).toBe(expected);
    const translated = fr.site[key as keyof typeof fr.site];
    expect(translated).toBeTruthy();
    expect(translated).not.toBe(expected);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      translated,
    );
    expect(
      screen.getByRole("link", {
        name: copyFor("fr")("Recover purchase access"),
      }),
    ).toHaveAttribute("href", "/fr/orders/recover");
    for (const release of DOCUMENTED_PRODUCT_RELEASES) {
      expect(
        articleFor(release.slug).getByRole("heading", {
          name: frenchFor(release.name),
        }),
      ).toBeVisible();
      expect(
        articleFor(release.slug).getByText(frenchFor(release.description)),
      ).toBeVisible();
      expect(
        articleFor(release.slug).getByText(frenchFor("Source package version")),
      ).toBeVisible();
      expect(
        articleFor(release.slug).getByText(frenchFor("Included components")),
      ).toBeVisible();
      const definitions = articleFor(release.slug).getAllByRole("definition");
      expect(definitions).toHaveLength(2);
      expect(definitions[0]).toHaveTextContent(`v${release.packageVersion}`);
      expect(definitions[1]).toHaveTextContent(
        release.includedComponents.map(frenchFor).join(" · "),
      );
      expect(
        articleFor(release.slug).getAllByText(/^v\d+\.\d+\.\d+/),
      ).toHaveLength(1);
      for (const link of release.links)
        expect(
          articleFor(release.slug).getByRole("link", {
            name: frenchFor(link.label),
          }),
        ).toHaveAttribute("href", `/fr${link.href}`);
    }
  });
});

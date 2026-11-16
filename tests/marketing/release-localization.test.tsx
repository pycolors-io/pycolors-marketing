import * as React from "react";
import NextLink from "next/link";
import { cleanup, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ChangelogPage from "@/app/[locale]/(site)/changelog/page";
import RoadmapPage from "@/app/[locale]/(site)/roadmap/page";
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

function copyFor(locale: SiteLocale) {
  const messages: Record<string, string> = fr.site;
  return createCopy(
    locale,
    Object.assign((key: string) => messages[key] ?? key, {
      has: (key: string) => Object.hasOwn(messages, key),
    }),
  );
}

// Release data is translated dynamically at render time, beyond the literal
// call sites inspected by i18n:check. Require real catalogue entries as well
// as observing the translated page so an English fallback cannot pass.
function frenchFor(original: string) {
  const text = original.replace(/\s+/g, " ").trim();
  const key = messageKey(text);
  const english: Record<string, string> = en.site;
  const french: Record<string, string> = fr.site;
  expect(english[key], `English catalogue: ${text}`).toBe(text);
  expect(french[key], `French catalogue: ${text}`).toBeTruthy();
  return french[key]!;
}

function releaseHistory() {
  return within(
    screen.getByRole("list", {
      name: copyFor(localeState.value)("Release history"),
    }),
  )
    .getAllByRole("article")
    .map((article) => ({
      article,
      id: article.id,
      date: article.querySelector("time")!.getAttribute("datetime"),
    }));
}

describe("Marketing v1.33.0 localized release contract", () => {
  it("renders every new release benefit in French with the same dates, history and guide destination", () => {
    localeState.value = "en";
    render(<ChangelogPage />);
    const history = releaseHistory();
    const latest = history[0]!.article;
    const guideLink = within(latest).getByRole("link", {
      name: "Read the implementation guides",
    });
    const messages = [
      within(latest).getByRole("heading", { level: 2 }).textContent!,
      latest.querySelector("p")!.textContent!,
      ...Array.from(
        latest.querySelectorAll("h3, li"),
        (node) => node.textContent!,
      ),
      guideLink.textContent!,
    ].map(frenchFor);
    expect(history[0]!.date).toBe("2026-11-13");
    expect(within(latest).getByText("v1.33.0", { exact: true })).toBeVisible();
    expect(guideLink).toHaveAttribute("href", "/blog");

    cleanup();
    localeState.value = "fr";
    render(<ChangelogPage />);
    const localizedHistory = releaseHistory();
    expect(localizedHistory.map(({ id, date }) => ({ id, date }))).toEqual(
      history.map(({ id, date }) => ({ id, date })),
    );
    const localizedLatest = localizedHistory[0]!.article;
    messages.forEach((message) =>
      expect(localizedLatest).toHaveTextContent(message),
    );
    expect(localizedLatest.querySelector("time")).toHaveTextContent(
      new Intl.DateTimeFormat("fr", {
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "short",
        timeZone: "UTC",
      }).format(new Date("2026-11-13T00:00:00Z")),
    );
    expect(
      within(localizedLatest).getByRole("link", {
        name: frenchFor("Read the implementation guides"),
      }),
    ).toHaveAttribute("href", "/fr/blog");
  });

  it("translates the November milestone and release row while preserving pending work", () => {
    localeState.value = "en";
    render(<RoadmapPage />);
    const title = "PyColors Marketing v1.33.0";
    const row = screen
      .getByRole("heading", { level: 3, name: title })
      .closest("li")!;
    const milestone = screen.getByText(
      /PyColors Marketing v1\.33\.0, dated 13 November 2026/,
    );
    const messages = [
      title,
      row.querySelector("p")!.textContent!,
      milestone.textContent!,
    ].map(frenchFor);
    const pending = ["Now", "Next"].flatMap((status) =>
      within(screen.getByRole("list", { name: `${status} roadmap items` }))
        .getAllByRole("listitem")
        .map((item) => ({
          title: within(item).getByRole("heading", { level: 3 }).textContent!,
          status,
        })),
    );
    expect(pending).toHaveLength(8);

    cleanup();
    localeState.value = "fr";
    render(<RoadmapPage />);
    const localizedRow = screen
      .getByRole("heading", { level: 3, name: frenchFor(title) })
      .closest("li")!;
    messages
      .slice(0, 2)
      .forEach((message) => expect(localizedRow).toHaveTextContent(message));
    expect(screen.getByText(messages[2]!)).toBeVisible();
    expect(within(localizedRow).getByRole("link")).toHaveAttribute(
      "href",
      "/fr/changelog",
    );
    const copy = copyFor("fr");
    for (const item of pending) {
      const activeRow = screen
        .getByRole("heading", {
          level: 3,
          name: copy(item.title).replace(/\s+/g, " ").trim(),
        })
        .closest("li")!;
      expect(
        within(activeRow).getByText(copy(item.status), { exact: true }),
      ).toBeVisible();
      expect(
        within(activeRow).queryByText(copy("Shipped"), { exact: true }),
      ).toBeNull();
    }
  });
});

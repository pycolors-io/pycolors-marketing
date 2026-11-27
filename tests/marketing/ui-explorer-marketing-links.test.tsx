import type { ComponentProps } from "react";
import NextLink from "next/link";
import { render, screen, within } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import UiPage from "@/app/[locale]/(site)/ui/page";
import ExamplesPage from "@/app/[locale]/(site)/ui/examples/page";
import StarterFreePage from "@/app/[locale]/(site)/starters/free/page";
import { createCopy, messageKey } from "@/lib/i18n/copy-core";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

const localeState = vi.hoisted(() => ({ value: "en" as SiteLocale }));

vi.hoisted(() =>
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com"),
);
vi.mock("@/lib/i18n/use-copy", () => ({
  useCopy: () => copyFor(localeState.value),
}));
vi.mock("@/lib/i18n/navigation", () => ({
  Link: (props: ComponentProps<typeof NextLink>) => (
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
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));

function copyFor(locale: SiteLocale) {
  const messages: Record<string, string> = locale === "fr" ? fr.site : en.site;
  return createCopy(
    locale,
    Object.assign((key: string) => messages[key] ?? key, {
      has: (key: string) => Object.hasOwn(messages, key),
    }),
  );
}

function expectExplorerLink(link: HTMLElement, href: string) {
  expect(link).toBeVisible();
  expect(link).toHaveAttribute("href", href);
  expect(link).toHaveAttribute("target", "_blank");
  expect(link.getAttribute("rel")?.split(/\s+/)).toEqual(
    expect.arrayContaining(["noopener", "noreferrer"]),
  );
  const announcement = copyFor(localeState.value)("Opens in a new tab");
  expect(link).toHaveAttribute("aria-description", announcement);
  expect(link).toHaveAccessibleDescription(announcement);
  expect(new URL(link.getAttribute("href")!).origin).toBe(
    "https://ui.pycolors.io",
  );
  expect(new URL(link.getAttribute("href")!).pathname).toBe("/");
  expect(link.querySelector("a,button")).toBeNull();
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
  // Radix measures the checkbox's native input in the real UI preview.
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  );
});
afterEach(() => {
  localeState.value = "en";
  vi.unstubAllGlobals();
});
afterAll(() => vi.unstubAllEnvs());

it("registers Explorer navigation and its new-tab announcement in both catalogues", () => {
  const english: Record<string, string> = en.site;
  const french: Record<string, string> = fr.site;
  for (const source of [
    "Explore components",
    "Try {value0} in UI Explorer",
    "Open UI Explorer",
    "Opens in a new tab",
  ]) {
    const key = messageKey(source);
    expect(english[key], source).toBe(source);
    expect(french[key], source).toBeTruthy();
    expect(french[key], source).not.toBe(source);
    expect(french[key]!.match(/\{value\d+\}/g) ?? [], source).toEqual(
      source.match(/\{value\d+\}/g) ?? [],
    );
  }
});

describe.each(["en", "fr"] as const)(
  "%s marketing links to the public UI Explorer",
  (locale) => {
    beforeEach(() => {
      localeState.value = locale;
    });

    it("keeps installation first and offers Explorer beside the local UI preview", () => {
      render(<UiPage />);
      const copy = copyFor(locale);
      const hero = within(
        screen.getByRole("heading", { level: 1 }).closest("section")!,
      );
      const install = hero.getByRole("link", { name: copy("Start building") });
      expect(install).toHaveAttribute(
        "href",
        localizedHref("/docs/ui/installation", locale),
      );
      const explorer = hero.getByRole("link", {
        name: copy("Explore components"),
      });
      expectExplorerLink(explorer, "https://ui.pycolors.io/");
      const preview = hero.getByRole("link", {
        name: copy("Try the components"),
      });
      expect(preview).toHaveAttribute("href", "#ui-preview");
      expect(document.getElementById("ui-preview")).not.toBeNull();
      expect(hero.getAllByRole("link")).toEqual([install, explorer, preview]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("links related primitives to their public stories while keeping the Starter demo routes", () => {
      render(<ExamplesPage />);
      const copy = copyFor(locale);
      const components = within(document.getElementById("example-components")!);
      for (const [label, slug] of [
        ["Table", "table"],
        ["Input", "input"],
        ["Card", "card"],
      ] as const) {
        const explorer = components.getByRole("link", {
          name: copy("Try {value0} in UI Explorer", {
            value0: copy(label),
          }),
        });
        expectExplorerLink(
          explorer,
          `https://ui.pycolors.io/?path=/story/components-${slug}--default`,
        );
        expect(
          components.getByRole("link", { name: copy(label) }),
        ).toHaveAttribute("href", localizedHref(`/docs/ui/${slug}`, locale));
      }
      const demoLinks = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          'main a[href^="https://starter-demo.pycolors.io/"]',
        ),
      );
      const demoScreens = [
        ["Dashboard", "/dashboard"],
        ["Projects", "/projects"],
        ["Auth", "/login"],
        ["Settings", "/settings"],
        ["Billing", "/billing"],
        ["Admin", "/admin"],
      ] as const;
      expect(demoLinks.map((link) => link.getAttribute("href")).sort()).toEqual(
        demoScreens
          .map(([, route]) => `https://starter-demo.pycolors.io${route}`)
          .sort(),
      );
      for (const [label, route] of demoScreens) {
        const link = demoLinks.find(
          (candidate) =>
            candidate.getAttribute("href") ===
            `https://starter-demo.pycolors.io${route}`,
        )!;
        expect(link).toHaveAttribute(
          "aria-label",
          copy("Try {value0} demo (opens in a new tab)", {
            value0: copy(label).toLocaleLowerCase(locale),
          }),
        );
        expect(link).toHaveAttribute("target", "_blank");
      }
      expect(
        screen.getByRole("link", {
          name: copy("Try {value0} demo (opens in a new tab)", {
            value0: copy("Dashboard").toLocaleLowerCase(locale),
          }),
        }),
      ).toHaveAttribute("href", "https://starter-demo.pycolors.io/dashboard");
      expect(screen.getByRole("main")).toHaveTextContent(
        copy(
          "Light-theme captures with sample data. Authentication, payments and permissions are mocked.",
        ),
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("offers the component Explorer in Starter Free without replacing its repository or app demo", () => {
      render(<StarterFreePage />);
      const copy = copyFor(locale);
      const included = within(document.getElementById("included")!);
      expectExplorerLink(
        included.getByRole("link", { name: copy("Open UI Explorer") }),
        "https://ui.pycolors.io/",
      );
      const hero = within(
        screen.getByRole("heading", { level: 1 }).closest("section")!,
      );
      const repository = hero.getByRole("link", {
        name: copy("Get Starter Free"),
      });
      expect(repository).toHaveAttribute(
        "href",
        "https://github.com/pycolors-io/pycolors-starter-free",
      );
      const demo = hero.getByRole("link", { name: copy("Open live demo") });
      expect(demo).toHaveAttribute("href", "https://starter-demo.pycolors.io");
      expect(demo).not.toHaveAccessibleName(/UI Explorer/);
      expect(hero.getAllByRole("link")).toEqual([repository, demo]);
      expect(hero.queryByRole("link", { name: /UI Explorer/ })).toBeNull();
      expect(fetch).not.toHaveBeenCalled();
    });
  },
);

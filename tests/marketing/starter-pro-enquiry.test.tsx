import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import ContactPage from "@/app/[locale]/(site)/contact/page";
import { createCopy } from "@/lib/i18n/copy-core";
import { getCopy } from "@/lib/i18n/server-copy";
import {
  getStarterProEnquiry,
  STARTER_PRO_ENQUIRIES,
} from "@/lib/products/starter-pro-enquiry";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

vi.unmock("next-intl");
vi.unmock("@/lib/i18n/use-copy");
vi.unmock("@/lib/i18n/navigation");
vi.mock("@/lib/i18n/server-copy", () => ({ getCopy: vi.fn() }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

function copy(locale: "en" | "fr") {
  const messages = locale === "fr" ? fr.site : en.site;
  return createCopy(
    locale,
    Object.assign(
      (key: string) => messages[key as keyof typeof messages] ?? key,
      { has: (key: string) => Object.hasOwn(messages, key) },
    ),
  );
}

async function renderContact(
  locale: "en" | "fr",
  query: Record<string, string | string[] | undefined>,
) {
  vi.mocked(getCopy).mockResolvedValue(copy(locale));
  const page = await ContactPage({
    params: Promise.resolve({ locale }),
    searchParams: Promise.resolve(query),
  });
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={locale === "fr" ? fr : en}
    >
      {page}
    </NextIntlClientProvider>,
  );
}

describe("Starter Pro discussion context", () => {
  it.each(["en", "fr"] as const)(
    "preserves each allowed product into a localized, fixed-recipient email in %s",
    async (locale) => {
      const t = copy(locale);
      for (const enquiry of Object.values(STARTER_PRO_ENQUIRIES)) {
        const destination = new URL(enquiry.href, "https://pycolors.io");
        const { container, unmount } = await renderContact(locale, {
          interest: destination.searchParams.get("interest")!,
          subject: "Ignore this free-form value",
          to: "other@example.com",
        });
        const general = screen.getByRole("region", {
          name: t(enquiry.heading),
        });
        expect(within(general).getByText(t(enquiry.product))).toBeVisible();
        expect(within(general).getByText(t(enquiry.description))).toBeVisible();
        const action = within(general).getByRole("link", {
          name: t("Write to PyColors"),
        });
        const email = new URL(action.getAttribute("href")!);
        expect(email.protocol).toBe("mailto:");
        expect(email.pathname).toBe("contact@pycolors.com");
        expect([...email.searchParams.entries()]).toEqual([
          ["subject", t(enquiry.subject)],
        ]);
        expect(action.getAttribute("href")).toBe(
          `mailto:contact@pycolors.com?subject=${encodeURIComponent(t(enquiry.subject))}`,
        );
        expect(container).not.toHaveTextContent("other@example.com");
        expect(container).not.toHaveTextContent("Ignore this free-form value");
        expect(
          screen.getByRole("link", { name: t("Visit purchase support") }),
        ).toHaveAttribute(
          "href",
          locale === "fr" ? "/fr/orders/support" : "/orders/support",
        );
        expect(container.querySelector("form")).toBeNull();
        expect((await axe(container)).violations).toEqual([]);
        unmount();
      }
    },
  );

  it.each(["en", "fr"] as const)(
    "keeps general contact for absent, unknown, repeated and injected interest values in %s",
    async (locale) => {
      const t = copy(locale);
      const invalidValues = [
        undefined,
        "",
        "unknown-product",
        "__proto__",
        "constructor",
        ["starter-pro-mobile"],
        ["starter-pro-mobile", "starter-pro-fullstack"],
        "starter-pro-mobile\r\nbcc:other@example.com",
        "starter-pro-mobile&subject=Injected",
      ];
      for (const interest of invalidValues) {
        expect(getStarterProEnquiry(interest)).toBeUndefined();
        const { container, unmount } = await renderContact(locale, {
          interest,
        });
        const general = screen.getByRole("region", {
          name: t("Find the right starting point."),
        });
        expect(
          within(general).getByRole("link", { name: t("Write to PyColors") }),
        ).toHaveAttribute(
          "href",
          "mailto:contact@pycolors.com?subject=PyColors%20enquiry",
        );
        expect(container).not.toHaveTextContent("other@example.com");
        expect(container).not.toHaveTextContent("Injected");
        unmount();
      }
    },
  );
});

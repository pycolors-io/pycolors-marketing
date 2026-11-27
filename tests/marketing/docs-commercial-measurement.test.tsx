import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DocsCommercialLinks } from "@/components/analytics/docs-commercial-links";
import { MoneyPathPageEvent } from "@/components/analytics/money-path-event";
import { storePrivacyConsent } from "@/lib/privacy-consent";

const browser = window as Window & { dataLayer?: unknown[] };

afterEach(() => {
  cleanup();
  localStorage.clear();
  delete browser.dataLayer;
});

describe("consented commercial events", () => {
  it.each([
    ["en", "/pricing", "/docs/starter/upgrade"],
    ["fr", "/fr/tarifs", "/fr/docs/starter/upgrade"],
  ] as const)("records only public paths in %s", (locale, pricing, page) => {
    storePrivacyConsent("accepted");
    const { unmount } = render(
      <>
        <DocsCommercialLinks locale={locale} page="/docs/starter/upgrade" />
        <a
          href={pricing + "/?ref=private#source-licences"}
          onClick={(e) => e.preventDefault()}
        >
          <span>pricing</span>
        </a>
        <a
          href={"https://outside.example" + pricing}
          onClick={(e) => e.preventDefault()}
        >
          external
        </a>
        <a
          href="/orders/claim?token=private"
          onClick={(e) => e.preventDefault()}
        >
          claim
        </a>
      </>,
    );
    for (const text of ["pricing", "external", "claim"])
      fireEvent.click(screen.getByText(text));
    expect(browser.dataLayer).toEqual([
      { event: "docs_commercial_link_clicked", page, destination: pricing },
    ]);
    unmount();
    render(
      <a href={pricing} onClick={(e) => e.preventDefault()}>
        another page
      </a>,
    );
    fireEvent.click(screen.getByText("another page"));
    expect(browser.dataLayer).toHaveLength(1);
  });

  it.each([null, "denied", "accepted"] as const)(
    "respects %s consent on navigation and checkout return",
    (consent) => {
      if (consent) storePrivacyConsent(consent);
      render(
        <>
          <DocsCommercialLinks page="/docs" locale="en" />
          <a href="/starters/mobile" onClick={(e) => e.preventDefault()}>
            Mobile
          </a>
          <MoneyPathPageEvent
            event="checkout_cancel_viewed"
            page="/checkout/cancel"
          />
        </>,
      );
      fireEvent.click(screen.getByText("Mobile"));
      if (consent === "accepted") {
        expect(browser.dataLayer).toEqual([
          { event: "checkout_cancel_viewed", page: "/checkout/cancel" },
          {
            event: "docs_commercial_link_clicked",
            page: "/docs",
            destination: "/starters/mobile",
          },
        ]);
      } else {
        expect(browser.dataLayer).toBeUndefined();
      }
    },
  );
});

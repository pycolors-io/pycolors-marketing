import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  PrivacyConsentBanner,
  PrivacyConsentSettings,
} from "@/components/privacy/privacy-consent-banner";
import { ConsentGatedGtm } from "@/components/privacy/consent-gated-gtm";

vi.mock("next/script", () => ({
  default: () => <div data-testid="optional-analytics" />,
}));

const consentKey = "pycolors_privacy_consent";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("privacy consent banner", () => {
  it("offers two clear choices and policy links without interrupting page focus", () => {
    const { rerender } = render(
      <>
        <button type="button">Browse components</button>
      </>,
    );
    const pageAction = screen.getByRole("button", {
      name: "Browse components",
    });
    pageAction.focus();
    rerender(
      <>
        <button type="button">Browse components</button>
        <PrivacyConsentBanner />
      </>,
    );
    const banner = screen.getByRole("region", { name: "Cookie preferences" });
    expect(pageAction).toHaveFocus();
    expect(banner).toHaveAccessibleDescription(/Optional Google tags/);
    expect(within(banner).getAllByRole("button")).toHaveLength(2);
    expect(
      within(banner).getByRole("link", { name: "Privacy" }),
    ).toHaveAttribute("href", "/privacy");
    expect(within(banner).getByRole("link", { name: "Terms" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(localStorage.getItem(consentKey)).toBeNull();
  });

  it.each(["accepted", "denied"])("respects a saved %s choice", (value) => {
    localStorage.setItem(consentKey, value);
    render(<PrivacyConsentBanner />);
    expect(
      screen.queryByRole("region", { name: "Cookie preferences" }),
    ).not.toBeInTheDocument();
    expect(localStorage.getItem(consentKey)).toBe(value);
  });

  it.each([
    ["Accept optional", "accepted"],
    ["Reject optional", "denied"],
  ])(
    "persists %s and preserves the existing GTM consent gate",
    (label, value) => {
      const dispatch = vi.spyOn(globalThis, "dispatchEvent");
      const { unmount } = render(
        <>
          <ConsentGatedGtm gtmId="GTM-TEST" />
          <PrivacyConsentBanner />
        </>,
      );
      expect(
        screen.queryByTestId("optional-analytics"),
      ).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: label }));
      expect(localStorage.getItem(consentKey)).toBe(value);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "pycolors:privacy-consent",
          detail: { value },
        }),
      );
      expect(
        screen.queryByRole("region", { name: "Cookie preferences" }),
      ).not.toBeInTheDocument();
      if (value === "accepted") {
        expect(screen.getByTestId("optional-analytics")).toBeInTheDocument();
      } else {
        expect(
          screen.queryByTestId("optional-analytics"),
        ).not.toBeInTheDocument();
      }
      unmount();
      render(<PrivacyConsentBanner />);
      expect(
        screen.queryByRole("region", { name: "Cookie preferences" }),
      ).not.toBeInTheDocument();
    },
  );

  it.each(["accepted", "denied"])(
    "can reopen a saved %s choice, reject it and return focus",
    (value) => {
      localStorage.setItem(consentKey, value);
      const reload = vi.fn();
      vi.stubGlobal("location", { reload });
      render(
        <>
          <PrivacyConsentSettings />
          <ConsentGatedGtm gtmId="GTM-TEST" />
          <PrivacyConsentBanner />
        </>,
      );
      const manage = screen.getByRole("button", {
        name: "Manage cookie preferences",
      });
      manage.focus();
      fireEvent.click(manage);
      const reject = screen.getByRole("button", { name: "Reject optional" });
      expect(reject).toHaveFocus();
      fireEvent.click(reject);
      expect(localStorage.getItem(consentKey)).toBe("denied");
      expect(
        screen.queryByTestId("optional-analytics"),
      ).not.toBeInTheDocument();
      expect(manage).toHaveFocus();
      expect(reload).toHaveBeenCalledTimes(value === "accepted" ? 1 : 0);
    },
  );

  it("keeps a usable in-page choice when browser storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    render(
      <>
        <ConsentGatedGtm gtmId="GTM-TEST" />
        <PrivacyConsentBanner />
      </>,
    );
    expect(screen.queryByTestId("optional-analytics")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Accept optional" }));
    expect(screen.getByTestId("optional-analytics")).toBeInTheDocument();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<PrivacyConsentBanner />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

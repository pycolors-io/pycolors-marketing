import * as React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { HeadManagerContext } from "next/dist/shared/lib/head-manager-context.shared-runtime";
import { RootDocument } from "@/components/layout/root-document";

vi.mock("@/app/fonts", () => ({
  geistSans: { variable: "font-geist" },
  geistMono: { variable: "font-mono" },
}));
vi.mock("fumadocs-ui/provider/next", () => ({
  RootProvider: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@vercel/analytics/react", () => ({ Analytics: () => null }));
vi.mock("@/components/privacy/privacy-consent-banner", () => ({
  PrivacyConsentBanner: () => null,
}));
vi.mock("@/components/privacy/consent-gated-gtm", () => ({
  ConsentGatedGtm: () => null,
}));

describe("locale root document", () => {
  it("can remount without an executable native-script React warning", async () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const frame = document.createElement("iframe");
    document.body.append(frame);
    const root = createRoot(frame.contentDocument!);
    try {
      await act(async () => {
        root.render(
          <HeadManagerContext.Provider value={{ appDir: true }}>
            <RootDocument locale="fr">
              <main>Contenu français</main>
            </RootDocument>
          </HeadManagerContext.Provider>,
        );
      });
      expect(frame.contentDocument!.documentElement.lang).toBe("fr");
      expect(
        frame.contentDocument!.querySelector(
          'script[type="application/ld+json"]',
        ),
      ).toBeTruthy();
      expect(error.mock.calls.flat().join(" ")).not.toContain(
        "Encountered a script tag",
      );
    } finally {
      await act(async () => root.unmount());
      frame.remove();
      error.mockRestore();
    }
  });
});

import { act } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { describe, expect, it, vi } from "vitest";
import { DocsFrameworkProvider } from "@/components/docs/docs-framework-provider";
import { createCopy } from "@/lib/i18n/copy-core";
import type { SiteLocale } from "@/lib/i18n/routing";

const navigation = vi.hoisted(() => ({
  pathname: "/en/docs/ui/button",
  locale: "en" as SiteLocale,
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  usePathname: () => navigation.pathname,
  useParams: () => ({ locale: navigation.locale, slug: ["ui", "button"] }),
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));
vi.mock("@/lib/i18n/use-copy", () => ({
  useCopy: () =>
    createCopy(
      navigation.locale,
      Object.assign((key: string) => key, { has: () => false }),
    ),
}));

function Fixture({ href }: { href: string }) {
  return (
    <DocsFrameworkProvider>
      <DocsLayout
        tree={{
          name: "Docs",
          children: [
            {
              type: "folder",
              name: "UI Library",
              children: [{ type: "page", name: "Button", url: href }],
            },
          ],
        }}
        tabs={false}
        nav={{ enabled: false }}
        sidebar={{ collapsible: false }}
        searchToggle={{ enabled: false }}
        themeSwitch={{ enabled: false }}
      >
        <article>Button documentation</article>
      </DocsLayout>
    </DocsFrameworkProvider>
  );
}

describe("localized Docs framework", () => {
  it.each([
    ["en", "/en/docs/ui/button", "/docs/ui/button"],
    ["fr", "/fr/docs/ui/button", "/fr/docs/ui/button"],
  ] as const)(
    "hydrates the active %s folder across the locale rewrite",
    async (locale, serverPath, browserPath) => {
      navigation.locale = locale;
      navigation.pathname = serverPath;
      const container = document.createElement("div");
      container.innerHTML = renderToString(<Fixture href={browserPath} />);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      let root: ReturnType<typeof hydrateRoot> | undefined;
      try {
        const serverLink = container.querySelector(`a[href="${browserPath}"]`);
        expect(serverLink).not.toBeNull();
        expect(serverLink).toHaveAttribute("data-active", "true");
        expect(
          container.querySelector('[aria-expanded="true"]'),
        ).not.toBeNull();
        navigation.pathname = browserPath;
        await act(async () => {
          root = hydrateRoot(container, <Fixture href={browserPath} />, {
            onRecoverableError,
          });
        });
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(container.querySelector(`a[href="${browserPath}"]`)).toBe(
          serverLink,
        );
        expect(serverLink).toHaveAttribute("data-active", "true");
      } finally {
        if (root) await act(async () => root!.unmount());
        container.remove();
      }
    },
  );
});

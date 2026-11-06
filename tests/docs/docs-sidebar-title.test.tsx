import { render, screen } from "@testing-library/react";
import Link from "next/link";
import { FrameworkProvider } from "fumadocs-core/framework";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { describe, expect, it, vi } from "vitest";
import { DocsSidebarNavTitle } from "@/components/docs/docs-sidebar-items";

describe("custom documentation identity", () => {
  it("retains named header and article links without an empty default home link", () => {
    render(
      <FrameworkProvider
        usePathname={() => "/docs/starter-pro/release-readiness"}
        useParams={() => ({})}
        useRouter={() => ({ push: vi.fn(), refresh: vi.fn() })}
      >
        <DocsLayout
          tree={{
            name: "Documentation",
            children: [
              {
                type: "page",
                name: "Validation guide",
                url: "/docs/starter-pro/release-readiness",
              },
            ],
          }}
          tabs={false}
          nav={{
            component: (
              <header>
                <Link href="/docs">PyColors Docs</Link>
              </header>
            ),
          }}
          sidebar={{ collapsible: false }}
          searchToggle={{ enabled: false }}
          themeSwitch={{ enabled: false }}
          slots={{ navTitle: DocsSidebarNavTitle }}
        >
          <main>
            <h1>Validation and release readiness</h1>
          </main>
        </DocsLayout>
      </FrameworkProvider>,
    );

    expect(screen.getByRole("link", { name: "PyColors Docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(
      screen.getAllByRole("link", { name: "Validation guide" }).length,
    ).toBeGreaterThan(0);
    for (const link of screen.getAllByRole("link"))
      expect(link).toHaveAccessibleName();
    expect(document.querySelector('a[href="/"]')).toBeNull();
  });
});

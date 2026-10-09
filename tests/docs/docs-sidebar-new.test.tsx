import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { FrameworkProvider } from "fumadocs-core/framework";
import {
  SidebarFolder,
  SidebarFolderLink,
  SidebarProvider,
} from "fumadocs-ui/components/sidebar/base";

import {
  DocsSidebarItem,
  DocsSidebarPublications,
} from "@/components/docs/docs-sidebar-items";
import { DAY_IN_MS, isNewDoc } from "@/lib/docs/new-article";

const publishedAt = "2026-09-25";
const publication = Date.parse(`${publishedAt}T00:00:00Z`);
const expiration = publication + 30 * DAY_IN_MS;
const dates = {
  "/docs/ui/storybook": publishedAt,
  "/docs/ui": publishedAt,
  "https://example.com": publishedAt,
};

function Fixture() {
  return (
    <FrameworkProvider
      usePathname={() => "/docs/ui/storybook/"}
      useParams={() => ({})}
      useRouter={() => ({ push: vi.fn(), refresh: vi.fn() })}
    >
      <DocsSidebarPublications dates={dates}>
        <SidebarProvider>
          <nav aria-label="Documentation">
            <SidebarFolder defaultOpen>
              <SidebarFolderLink href="/docs/ui">UI Library</SidebarFolderLink>
              <DocsSidebarItem
                item={{
                  type: "page",
                  name: "Storybook",
                  url: "/docs/ui/storybook",
                }}
              />
              <DocsSidebarItem
                item={{
                  type: "page",
                  name: "Installation",
                  url: "/docs/ui/installation",
                }}
              />
              <DocsSidebarItem
                item={{
                  type: "page",
                  name: "External",
                  url: "https://example.com",
                  external: true,
                }}
              />
            </SidebarFolder>
          </nav>
        </SidebarProvider>
      </DocsSidebarPublications>
    </FrameworkProvider>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime("2026-10-06T12:00:00Z");
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("docs publication window", () => {
  it.each([
    [undefined, publication, false],
    ["", publication, false],
    ["not-a-date", publication, false],
    ["2026-02-30", publication, false],
    ["2026-9-25", publication, false],
    [publishedAt, publication - 1, false],
    [publishedAt, publication, true],
    [publishedAt, expiration - 1, true],
    [publishedAt, expiration, false],
    [publishedAt, expiration + DAY_IN_MS, false],
  ])("evaluates %s at %s as %s", (date, now, expected) => {
    expect(isNewDoc(date, now)).toBe(expected);
  });
});

describe("docs sidebar New badge", () => {
  it("marks only dated article links and preserves native navigation and current state", () => {
    render(<Fixture />);
    const link = screen.getByRole("link", {
      name: "Storybook New",
      current: "page",
    });
    expect(link).toHaveAttribute("href", "/docs/ui/storybook");
    expect(link).toHaveAttribute("data-active", "true");
    expect(screen.getByText("New")).toHaveAttribute("data-slot", "badge");
    expect(screen.getByText("New")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "UI Library" }),
    ).not.toHaveTextContent("New");
    expect(
      screen.getByRole("link", { name: "Installation" }),
    ).not.toHaveTextContent("New");
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getAllByText("New")).toHaveLength(1);
    act(() => link.focus());
    expect(link).toHaveFocus();
  });

  it("expires at midnight after 30 days while preserving the badge footprint and link", () => {
    vi.setSystemTime(expiration - 1000);
    render(<Fixture />);
    const link = screen.getByRole("link", { name: "Storybook New" });
    const badge = screen.getByText("New");
    expect(badge).toBeVisible();
    act(() => vi.advanceTimersByTime(1000));
    expect(badge).not.toBeVisible();
    expect(badge).toHaveStyle({ visibility: "hidden" });
    expect(badge).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link", { name: "Storybook" })).toBe(link);
    expect(link).toContainElement(badge);
  });

  it("shows future publications only when their UTC publication day arrives", () => {
    vi.setSystemTime(publication - 1000);
    render(<Fixture />);
    expect(screen.getByText("New")).not.toBeVisible();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("New")).toBeVisible();
  });

  it.each(["focus", "visibilitychange"])(
    "refreshes a suspended tab on %s",
    (event) => {
      render(<Fixture />);
      vi.setSystemTime(expiration + DAY_IN_MS);
      fireEvent(event === "focus" ? window : document, new Event(event));
      expect(screen.getByText("New")).not.toBeVisible();
    },
  );

  it("hydrates old cached HTML without advertising an expired badge or mismatch", async () => {
    const html = renderToString(<Fixture />);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    expect(container.querySelector('[data-slot="badge"]')).not.toBeVisible();
    vi.setSystemTime(expiration + DAY_IN_MS);
    const onRecoverableError = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(container, <Fixture />, { onRecoverableError });
    });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "Storybook" })).toBeVisible();
    expect(screen.getByText("New")).not.toBeVisible();
    act(() => root.unmount());
    container.remove();
  });

  it("cleans the clock and revisit listeners on unmount", () => {
    const windowRemove = vi.spyOn(window, "removeEventListener");
    const documentRemove = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<Fixture />);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    expect(windowRemove).toHaveBeenCalledWith("focus", expect.any(Function));
    expect(documentRemove).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function),
    );
  });

  it("keeps the sidebar accessible with visible and expired badges", async () => {
    // axe requires real timers; hold just the wall clock at each boundary.
    vi.useRealTimers();
    const now = vi.spyOn(Date, "now").mockReturnValue(publication + DAY_IN_MS);
    const { container } = render(<Fixture />);
    expect((await axe(container)).violations).toEqual([]);
    now.mockReturnValue(expiration);
    fireEvent.focus(window);
    expect((await axe(container)).violations).toEqual([]);
  });
});

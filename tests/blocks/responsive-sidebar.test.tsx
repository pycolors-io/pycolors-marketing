import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import {
  ResponsiveSidebar,
  type ResponsiveSidebarProps,
} from "../../content/blocks/app-shells/responsive-sidebar/index";
import responsiveSidebarSource from "../../content/blocks/app-shells/responsive-sidebar/index.tsx?raw";

const items = [
  {
    id: "overview",
    label: "Overview",
    href: "/overview",
    icon: <span>O</span>,
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    badge: "4",
  },
] as const;

const baseProps = {
  activeItemId: "overview",
  brand: <strong>Northstar</strong>,
  contentId: "workspace-content",
  headerActions: <button type="button">Invite member</button>,
  headerTitle: <h1>Workspace overview</h1>,
  items,
  mobileDescription: "Choose a workspace destination.",
  mobileTitle: "Workspace navigation",
  navigationLabel: "Primary workspace navigation",
  sidebarFooter: <span>Signed in as Alex</span>,
} satisfies Omit<ResponsiveSidebarProps, "children">;

function renderSidebar(props: Partial<ResponsiveSidebarProps> = {}) {
  return render(
    <ResponsiveSidebar {...baseProps} {...props}>
      <section aria-label="Workspace content">Consumer content</section>
    </ResponsiveSidebar>,
  );
}

describe("ResponsiveSidebar", () => {
  it("renders the minimal consumer-owned shell and landmarks", () => {
    const { container } = render(
      <ResponsiveSidebar
        brand="Acme"
        items={[]}
        mobileTitle="Application navigation"
        navigationLabel="Application navigation"
      >
        Account content
      </ResponsiveSidebar>,
    );

    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Application navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Account content");
    expect(container).not.toHaveTextContent("PyColors");
    expect(container).not.toHaveTextContent("Starter");
  });

  it("composes desktop navigation, active state, header, actions, footer, and content", () => {
    const { container } = renderSidebar();

    const desktop = container.querySelector(
      '[data-slot="responsive-sidebar-desktop"]',
    );
    const trigger = screen.getByRole("button", { name: "Open navigation" });

    expect(desktop).toHaveClass("hidden", "md:flex", "h-dvh", "w-64");
    expect(trigger).toHaveClass("md:hidden", "focus-visible:ring-[3px]");
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: /Projects.*4/u }),
    ).not.toHaveAttribute("aria-current");
    expect(screen.getByText("Workspace overview")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Invite member" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Signed in as Alex")).toBeInTheDocument();
    expect(screen.getByText("Consumer content")).toBeInTheDocument();
  });

  it("connects the skip link to the focusable main landmark", () => {
    renderSidebar({ skipToContentLabel: "Skip workspace navigation" });

    const skipLink = screen.getByRole("link", {
      name: "Skip workspace navigation",
    });
    const main = screen.getByRole("main");

    expect(skipLink).toHaveAttribute("href", "#workspace-content");
    expect(skipLink.className).toContain("focus:not-sr-only");
    expect(main).toHaveAttribute("id", "workspace-content");
    expect(main).toHaveAttribute("tabindex", "-1");
  });

  it("opens an accessible mobile Sheet and closes it after navigation", async () => {
    renderSidebar();
    const trigger = screen.getByRole("button", { name: "Open navigation" });

    fireEvent.click(trigger);

    const sheet = await screen.findByRole("dialog", {
      name: "Workspace navigation",
    });
    expect(sheet).toHaveAccessibleDescription(
      "Choose a workspace destination.",
    );
    expect(
      within(sheet).getByRole("navigation", {
        name: "Primary workspace navigation",
      }),
    ).toBeInTheDocument();
    expect(sheet).toContainElement(document.activeElement as HTMLElement);

    const projectLink = within(sheet).getByRole("link", {
      name: /Projects.*4/u,
    });
    projectLink.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    });
    fireEvent.click(projectLink);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("preserves public Sheet Escape and close-button behavior", async () => {
    renderSidebar();
    const trigger = screen.getByRole("button", { name: "Open navigation" });

    fireEvent.click(trigger);
    await screen.findByRole("dialog", { name: "Workspace navigation" });
    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });

    fireEvent.click(trigger);
    const sheet = await screen.findByRole("dialog", {
      name: "Workspace navigation",
    });
    fireEvent.click(within(sheet).getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("renders consumer groups and delegates router navigation through renderLink", async () => {
    const renderLink = vi.fn<NonNullable<ResponsiveSidebarProps["renderLink"]>>(
      ({ active, children, className, item, onNavigate }) => (
        <a
          aria-current={active ? "page" : undefined}
          className={className}
          data-router-link={item.id}
          href={item.href}
          onClick={(event) => {
            event.preventDefault();
            onNavigate();
          }}
        >
          {children}
        </a>
      ),
    );

    renderSidebar({
      groups: [
        {
          id: "manage",
          label: "Manage",
          items: [{ id: "settings", label: "Settings", href: "/settings" }],
        },
      ],
      renderLink,
    });

    expect(screen.getByRole("group", { name: "Manage" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "data-router-link",
      "overview",
    );

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    const sheet = await screen.findByRole("dialog", {
      name: "Workspace navigation",
    });
    fireEvent.click(within(sheet).getByRole("link", { name: "Settings" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(renderLink).toHaveBeenCalled();
  });

  it("has no detectable accessibility violations in the open mobile composition", async () => {
    renderSidebar();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    await screen.findByRole("dialog", { name: "Workspace navigation" });

    const results = await axe(document.body, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });

  it("keeps canonical source on approved public and Block-local imports", () => {
    const source = responsiveSidebarSource;

    expect(source).toContain('from "react"');
    expect(source).toContain('from "@pycolors/ui"');
    expect(source).not.toMatch(/@pycolors\/ui\//u);
    expect(source).not.toMatch(/@pycolors\/(?!ui["'])/u);
    expect(source).not.toMatch(/from ["'](?:next|lucide-react)/u);
    expect(source).not.toMatch(/starter-free|starter-pro|billing|auth\//iu);
  });
});

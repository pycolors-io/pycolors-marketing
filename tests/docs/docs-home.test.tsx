import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import {
  DocsHome,
  DocsHomeAI,
  DocsHomeHero,
  DocsHomeQuickstart,
  DocsHomeExample,
  DocsHomePaths,
  DocsHomeResources,
  DocsHomeUpdates,
} from "../../components/docs/docs-home";
import { DocsContextCopy } from "../../components/docs/docs-context-copy";
import {
  LATEST_MARKETING_RELEASE,
  MARKETING_RELEASE_HREF,
} from "../../lib/marketing-release";
const localeState = vi.hoisted(() => ({ value: "en" as "en" | "fr" }));
vi.mock("@/lib/i18n/use-copy", async () => {
  const { createCopy } = await import("../../lib/i18n/copy-core");
  const french = (await import("../../messages/fr.json")).default
    .site as Record<string, string>;
  return {
    useCopy: () =>
      createCopy(
        localeState.value,
        Object.assign((key: string) => french[key] ?? key, {
          has: (key: string) => Object.hasOwn(french, key),
          raw: (key: string) => french[key],
        }),
      ),
  };
});
vi.mock("fumadocs-ui/layouts/shared/slots/search-trigger", () => ({
  FullSearchTrigger: (props: React.ComponentProps<"button">) => (
    <button type="button" {...props}>
      Search
    </button>
  ),
}));
vi.mock("next/navigation", () => ({ usePathname: () => "/docs" }));
const descriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
afterEach(() => {
  vi.unstubAllGlobals();
  localeState.value = "en";
  if (descriptor) Object.defineProperty(navigator, "clipboard", descriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});
function Home() {
  return (
    <main>
      <DocsHome>
        <DocsHomeHero>
          <DocsHomeQuickstart>
            <Tabs items={["Install UI", "Run Starter Free", "Set up Pro"]}>
              <Tab value="Install UI">
                pnpm add @pycolors/ui @pycolors/tokens
              </Tab>
              <Tab value="Run Starter Free">
                git clone
                https://github.com/pycolors-io/pycolors-starter-free.git
              </Tab>
              <Tab value="Set up Pro">pnpm install --frozen-lockfile</Tab>
            </Tabs>
          </DocsHomeQuickstart>
        </DocsHomeHero>
        <DocsHomePaths />
        <DocsHomeExample />
        <DocsHomeAI />
        <DocsHomeResources />
        <DocsHomeUpdates />
      </DocsHome>
    </main>
  );
}
describe("documentation home", () => {
  it.each(["en", "fr"] as const)(
    "shows four update entries and the announced site release in %s",
    (locale) => {
      localeState.value = locale;
      render(<DocsHomeUpdates />);
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(4);
      const release = links.find(
        (link) => link.getAttribute("href") === MARKETING_RELEASE_HREF,
      )!;
      expect(release).toBeDefined();
      expect(release).toHaveTextContent(
        `Site & Docs ${LATEST_MARKETING_RELEASE.version}`,
      );
      expect(release.querySelector("time")).toHaveAttribute(
        "datetime",
        LATEST_MARKETING_RELEASE.dateISO,
      );
      expect(release.querySelector("time")).toHaveTextContent(
        locale === "fr" ? "27 nov. 2026" : "Nov 27, 2026",
      );
      expect(links.map((link) => link.getAttribute("href"))).toEqual([
        "/changelog",
        "/docs/design-system/tokens",
        MARKETING_RELEASE_HREF,
        "/roadmap",
      ]);
    },
  );

  it("localizes product descriptions and guide navigation in French", () => {
    localeState.value = "fr";
    const { container } = render(
      <DocsHome>
        <DocsHomeHero />
        <DocsHomePaths />
        <DocsHomeResources />
      </DocsHome>,
    );
    expect(
      screen.getByText("Composants et références d’API."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Connexion, sessions et routes protégées."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Construisez avec PyColors.",
      }),
    ).toBeInTheDocument();
    expect(container).not.toHaveTextContent("Components and API references.");
    expect(container).not.toHaveTextContent("Sign-in, sessions");
  });
  it("provides real product and guide destinations for native source", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", {
        name: /Starter Pro Mobile/,
      }),
    ).toHaveAttribute("href", "/docs/starter-pro/mobile");
    for (const link of screen.getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      expect(link).toHaveAccessibleName();
      if (!href.startsWith("/docs")) continue;
      const path = href.slice(6).split("#")[0];
      expect(
        existsSync(resolve("content/docs", path + ".mdx")) ||
          existsSync(resolve("content/docs", path, "index.mdx")),
        href,
      ).toBe(true);
    }
  });
  it("offers six clear documentation entry points with real destinations", () => {
    render(<Home />);
    const navigation = screen.getByRole("navigation", {
      name: "Explore the documentation",
    });
    const links = within(navigation).getAllByRole("link");
    expect(links).toHaveLength(6);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/docs/ui",
      "/docs/blocks",
      "/docs/starter",
      "/docs/starter-pro/getting-started",
      "/docs/templates",
      "/docs/design-system",
    ]);
  });
  it("keeps all three setup paths usable inside the hero", () => {
    render(<Home />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("header")!;
    const setup = within(hero).getByRole("region", {
      name: "Choose your quick start",
    });
    expect(within(setup).getByRole("tabpanel")).toHaveTextContent(
      "pnpm add @pycolors/ui",
    );
    fireEvent.keyDown(
      within(setup).getByRole("tab", { name: "Run Starter Free" }),
      { key: "Enter" },
    );
    expect(within(setup).getByRole("tabpanel")).toHaveTextContent(
      "git clone https://github.com/pycolors-io/pycolors-starter-free.git",
    );
    fireEvent.keyDown(within(setup).getByRole("tab", { name: "Set up Pro" }), {
      key: "Enter",
    });
    expect(within(setup).getByRole("tabpanel")).toHaveTextContent(
      "pnpm install --frozen-lockfile",
    );
  });
  it("expands and collapses the agent brief while preserving complete copied context", () => {
    render(<Home />);
    const preview = screen.getByLabelText("AI context to copy");
    const expand = screen.getByRole("button", { name: "Show more" });
    expect(expand).toHaveAttribute("aria-expanded", "false");
    expect(preview).not.toHaveTextContent(
      "https://pycolors.io/docs/ui/installation",
    );
    fireEvent.click(expand);
    expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(preview).toHaveTextContent(
      "https://pycolors.io/docs/ui/installation",
    );
    fireEvent.click(screen.getByRole("button", { name: "Show less" }));
    expect(screen.getByRole("button", { name: "Show more" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
  it("shows a public component with its matching example and documentation destination", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Button" })).toHaveAttribute(
      "href",
      "/docs/ui/button",
    );
    expect(
      screen.getByRole("link", { name: "Read the Button guide" }),
    ).toHaveAttribute("href", "/docs/ui/button");
    const source = screen.getByLabelText("Button example source code");
    expect(source).toHaveTextContent('import { Button } from "@pycolors/ui";');
    expect(source).toHaveTextContent('<a href="/docs/ui/button">Button</a>');
    expect(source).toHaveAttribute("tabindex", "0");
  });
  it("opens contextual AI help directly from the home hero", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("# PyColors Documentation")),
    );
    render(<Home />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("header")!;
    fireEvent.click(
      within(hero).getByRole("button", { name: "Use with my AI" }),
    );
    expect(
      screen.getByRole("dialog", { name: "Your question. The right context." }),
    ).toBeInTheDocument();
    expect(screen.getByText(/paste it into your AI tool/)).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Copy question and context" }),
      ).toBeEnabled(),
    );
  });
  it("copies a usable agent brief with public guide URLs and repository boundaries", async () => {
    const write = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: write },
    });
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Copy AI context" }));
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    const context = write.mock.calls[0]![0] as string;
    expect(context).toContain("https://pycolors.io/docs/ui/installation");
    expect(context).toContain("instructions and permissions");
    expect(context).not.toContain("localhost");
    expect(screen.getByRole("status")).toHaveTextContent("Context copied.");
  });
  it("keeps the agent context selectable if clipboard access is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    render(
      <DocsContextCopy context="Public documentation and project conventions." />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy AI context" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("copy it manually"),
    );
    expect(screen.getByLabelText("AI context to copy")).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByLabelText("AI context to copy")).toHaveTextContent(
      "Public documentation and project conventions.",
    );
  });
  it("expands the complete brief for manual selection when copying fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    render(
      <DocsContextCopy
        context={"Project instructions.\n\nhttps://pycolors.io/docs/ui"}
        collapsible
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy AI context" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("copy it manually"),
    );
    expect(screen.getByLabelText("AI context to copy")).toHaveTextContent(
      "https://pycolors.io/docs/ui",
    );
    expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
  it("has no detectable accessibility violations", async () => {
    const { container } = render(<Home />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

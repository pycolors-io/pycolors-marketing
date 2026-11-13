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
import {
  DocsHome,
  DocsHomeAI,
  DocsHomeHero,
  DocsHomeExample,
  DocsHomePaths,
  DocsHomeResources,
  DocsHomeUpdates,
} from "../../components/docs/docs-home";
import { DocsContextCopy } from "../../components/docs/docs-context-copy";
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
const descriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
afterEach(() => {
  localeState.value = "en";
  if (descriptor) Object.defineProperty(navigator, "clipboard", descriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});
function Home() {
  return (
    <main>
      <DocsHome>
        <DocsHomeHero />
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
        name: "Tout pour construire avec PyColors.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Rechercher dans la documentation" }),
    ).toBeInTheDocument();
    expect(container).not.toHaveTextContent("Components and API references.");
    expect(container).not.toHaveTextContent("Sign-in, sessions");
  });
  it("provides real product and guide destinations while marking mobile as coming soon", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", {
        name: /React Native mobile app · Coming soon/,
      }),
    ).toHaveAttribute("href", "/roadmap");
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
  it("offers four clear documentation entry points with real destinations", () => {
    render(<Home />);
    const navigation = screen.getByRole("navigation", {
      name: "Explore the documentation",
    });
    const links = within(navigation).getAllByRole("link");
    expect(links).toHaveLength(4);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/docs/ui",
      "/docs/blocks",
      "/docs/getting-started#choose-your-starting-point",
      "/docs/templates",
    ]);
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
  it("has no detectable accessibility violations", async () => {
    const { container } = render(<Home />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

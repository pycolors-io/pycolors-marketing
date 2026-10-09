import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { axe } from "vitest-axe";
import ExamplesPage, { metadata } from "@/app/(site)/ui/examples/page";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";

vi.hoisted(() =>
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com"),
);
vi.mock("@/lib/api/checkout-navigation", () => ({
  navigateToCheckout: vi.fn(),
}));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("fetch", vi.fn());
  window.history.replaceState(null, "", "/ui/examples");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

const routes = [
  ["Dashboard", "/dashboard", "/docs/blocks/data/stats-overview"],
  ["Projects", "/projects", "/docs/blocks/data/data-table"],
  ["Auth", "/login", "/docs/starter/auth-concept"],
  ["Settings", "/settings", "/docs/blocks/account/settings-panel"],
  ["Billing", "/billing", "/docs/starter/billing-concept"],
  ["Admin", "/admin", "/docs/blocks/account/workspace-members"],
] as const;
const commands =
  "git clone https://github.com/pycolors-io/pycolors-starter-free.git\ncd pycolors-starter-free\npnpm install\npnpm dev";

describe("UI Examples page", () => {
  it("keeps canonical discovery routes, the active tab and a usable skip destination", () => {
    render(<ExamplesPage />);
    expect(metadata.alternates?.canonical).toBe("/ui/examples");
    expect(metadata.openGraph?.url).toBe("/ui/examples");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const nav = screen.getByRole("navigation", {
      name: "PyColors UI navigation",
    });
    expect(within(nav).getByRole("link", { name: "Examples" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(nav.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
    expect(
      screen.getByRole("link", { name: "Explore the screens" }),
    ).toHaveAttribute("href", "#example-screens");
    expect(document.getElementById("example-screens")).toHaveAccessibleName(
      "One application. Six everyday workflows.",
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("connects six real screenshots to their matching demo and scope documentation", () => {
    render(<ExamplesPage />);
    expect(screen.getAllByRole("tab")).toHaveLength(routes.length);
    for (const [label, route, docs] of routes) {
      fireEvent.mouseDown(screen.getByRole("tab", { name: label }), {
        button: 0,
        ctrlKey: false,
      });
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      const panel = screen.getByRole("tabpanel", { name: label });
      const image = within(panel).getByRole("img");
      expect(image).toHaveAccessibleName(
        new RegExp(`${label.toLowerCase()} screen with demonstration data`),
      );
      const src = new URL(image.getAttribute("src")!, "http://localhost");
      expect(
        existsSync(
          resolve(
            "public",
            (src.searchParams.get("url") ?? src.pathname).slice(1),
          ),
        ),
      ).toBe(true);
      expect(
        within(panel).getByRole("link", {
          name: new RegExp(`Try ${label.toLowerCase()} demo`),
        }),
      ).toHaveAttribute("href", `https://starter-demo.pycolors.io${route}`);
      expect(panel.querySelector(`a[href="${docs}"]`)).toHaveAccessibleName();
      expect(
        existsSync(
          resolve(
            `../starter-free/app/${route === "/login" ? "(auth)" : "(app)"}${route}/page.tsx`,
          ),
        ),
      ).toBe(true);
      for (const other of screen
        .getAllByRole("tabpanel", { hidden: true })
        .filter((node) => node !== panel)) {
        expect(other).toHaveAttribute("inert");
        expect(other).toHaveAttribute("aria-hidden", "true");
        expect(other).toHaveAttribute("tabindex", "-1");
      }
    }
  });

  it("supports keyboard screen selection without entering inactive previews", async () => {
    render(<ExamplesPage />);
    const dashboard = screen.getByRole("tab", { name: "Dashboard" });
    act(() => dashboard.focus());
    fireEvent.keyDown(dashboard, { key: "ArrowRight" });
    await waitFor(() =>
      expect(screen.getByRole("tab", { name: "Projects" })).toHaveFocus(),
    );
    expect(
      screen.getByRole("tabpanel", { name: "Projects" }),
    ).not.toHaveAttribute("inert");
    fireEvent.keyDown(document.activeElement!, { key: "End" });
    await waitFor(() =>
      expect(screen.getByRole("tab", { name: "Admin" })).toHaveFocus(),
    );
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    await waitFor(() => expect(dashboard).toHaveFocus());
  });

  it("makes demo limits explicit and keeps real navigation destinations", () => {
    render(<ExamplesPage />);
    expect(screen.getByRole("main")).toHaveTextContent(
      "Authentication, payments and permissions are mocked.",
    );
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Auth" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByRole("tabpanel", { name: "Auth" })).toHaveTextContent(
      "do not create real accounts or sessions",
    );
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Billing" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByRole("tabpanel", { name: "Billing" })).toHaveTextContent(
      "Checkout and the customer portal are not connected.",
    );
    for (const link of document.querySelectorAll("main a")) {
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (href.startsWith("https://")) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noreferrer noopener");
        expect(link.getAttribute("aria-label")).toContain("opens in a new tab");
      }
      if (!href.startsWith("/")) continue;
      const route = href.split("#")[0]!;
      const candidates = route.startsWith("/docs/")
        ? [
            resolve("content", `${route.slice(1)}.mdx`),
            resolve("content", route.slice(1), "index.mdx"),
          ]
        : [resolve("app/(site)", route.slice(1), "page.tsx")];
      expect(candidates.some(existsSync), href).toBe(true);
    }
  });

  it("highlights and copies the complete local setup commands", async () => {
    const previous = Object.getOwnPropertyDescriptor(navigator, "clipboard");
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      render(<ExamplesPage />);
      await waitFor(() =>
        expect(
          screen
            .getByRole("region", { name: "Example setup commands" })
            .querySelector("code")?.textContent,
        ).toBe(commands),
      );
      const region = screen.getByRole("region", {
        name: "Example setup commands",
      });
      expect(region.querySelectorAll("span[style]").length).toBeGreaterThan(3);
      fireEvent.click(screen.getByRole("button", { name: "Copy Text" }));
      await waitFor(() => expect(writeText).toHaveBeenCalledWith(commands));
      expect(screen.getByRole("button", { name: "Copied Text" })).toBeVisible();
    } finally {
      if (previous) Object.defineProperty(navigator, "clipboard", previous);
      else Reflect.deleteProperty(navigator, "clipboard");
    }
  });

  it("preserves the Starter Pro catalog price, checkout request and pending guard", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        }),
    );
    render(<ExamplesPage />);
    const button = screen.getByRole("button", {
      name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
    });
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/api/v1/checkout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: "starter-pro" }),
        signal: expect.any(AbortSignal),
      },
    );
    finish(
      new Response(
        JSON.stringify({
          url: "https://checkout.example.com/controlled-example",
        }),
        { status: 200 },
      ),
    );
    await waitFor(() =>
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(
        "https://checkout.example.com/controlled-example",
      ),
    );
  });

  it("keeps actionable checkout failure feedback", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(
      new Error("Controlled network failure"),
    );
    render(<ExamplesPage />);
    fireEvent.click(screen.getByRole("button", { name: /Buy Starter Pro/ }));
    const alert = await screen.findByRole("alert");
    expect(
      within(alert).getByRole("link", { name: "Contact purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations with a selected example and code block", async () => {
    const { container } = render(<ExamplesPage />);
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Settings" }), {
      button: 0,
      ctrlKey: false,
    });
    await waitFor(() =>
      expect(
        screen
          .getByRole("region", { name: "Example setup commands" })
          .querySelector("code")?.textContent,
      ).toBe(commands),
    );
    expect(await axe(container)).toHaveNoViolations();
  }, 15000);
});

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

import TemplatesPage, { metadata } from "../../app/(site)/templates/page";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { trackMoneyPathEvent } from "@/lib/analytics";

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
  window.history.replaceState(null, "", "/templates");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

describe("Templates discovery page", () => {
  it("preserves its canonical route, skip target and one available product", () => {
    render(<TemplatesPage />);
    expect(metadata.alternates?.canonical).toBe("/templates");
    expect(metadata.openGraph?.url).toBe("/templates");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("article", { name: "NA-AI Landing" }),
    ).toBeVisible();
    expect(screen.getByText("1 template available")).toBeVisible();
    expect(screen.queryByText(/Coming soon/)).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("keeps catalog pricing, delivery scope and frontend limitations beside the offer", () => {
    render(<TemplatesPage />);
    const product = screen.getByRole("article", { name: "NA-AI Landing" });
    expect(
      within(product).getByText(PRODUCT_DISPLAY["na-ai-landing"].priceLabel),
    ).toBeVisible();
    expect(product).toHaveTextContent("One-time payment");
    expect(product).toHaveTextContent(
      "Full source ZIP and setup documentation.",
    );
    expect(product).toHaveTextContent(
      "Authentication, database, payment processing and form delivery require your own integrations.",
    );
    expect(
      within(product).getByRole("link", { name: "View template details" }),
    ).toHaveAttribute("href", "/templates/na-ai-landing");
    expect(
      within(product).getByRole("link", { name: "Review the license" }),
    ).toHaveAttribute("href", "/license");
  });

  it("shows the matching real capture for each appearance with only one accessible panel", () => {
    render(<TemplatesPage />);
    expect(
      screen.getByRole("tablist", { name: "Template color mode" }),
    ).toBeVisible();
    expect(screen.getByRole("tab", { name: "Dark" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    for (const label of ["Light", "Dark"]) {
      const mode = label.toLowerCase();
      const tab = screen.getByRole("tab", { name: label });
      fireEvent.mouseDown(tab, { button: 0, ctrlKey: false });
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      const panel = screen.getByRole("tabpanel", { name: label });
      expect(tab).toHaveAttribute("aria-controls", panel.id);
      const image = within(panel).getByRole("img", {
        name: `NA-AI Landing hero and illustrative analytics preview in ${mode} mode`,
      });
      const src = new URL(image.getAttribute("src")!, "http://localhost");
      const path = src.searchParams.get("url") ?? src.pathname;
      expect(path).toBe(
        `/templates/na-ai/na-ai-analytics-workspace-${mode}.webp`,
      );
      expect(existsSync(resolve("public", path.slice(1)))).toBe(true);
      expect(within(panel).getByRole("link")).toHaveAttribute(
        "href",
        "/templates/na-ai-landing",
      );
      expect(panel).toHaveTextContent(
        "Template preview · Illustrative content",
      );
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("supports arrow-key selection and keeps focus on the appearance controls", async () => {
    render(<TemplatesPage />);
    const dark = screen.getByRole("tab", { name: "Dark" });
    const light = screen.getByRole("tab", { name: "Light" });
    act(() => dark.focus());
    fireEvent.keyDown(dark, { key: "ArrowRight" });
    await waitFor(() => expect(light).toHaveFocus());
    expect(light).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(light, { key: "Home" });
    await waitFor(() => expect(dark).toHaveFocus());
    expect(dark).toHaveAttribute("aria-selected", "true");
  });

  it("keeps valid internal destinations and an explicitly labelled external demo", () => {
    render(<TemplatesPage />);
    for (const row of document.querySelectorAll("main details"))
      fireEvent.click(row.querySelector("summary")!);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (href.startsWith("#"))
        expect(document.getElementById(href.slice(1))).not.toBeNull();
      if (href.startsWith("/"))
        expect(
          existsSync(resolve("app/(site)", href.slice(1), "page.tsx")),
          href,
        ).toBe(true);
    }
    const demo = screen.getByRole("link", {
      name: "Open NA-AI live demo (opens in a new tab)",
    });
    expect(demo).toHaveAttribute("href", "https://na-ai.pycolors.io");
    expect(demo).toHaveAttribute("target", "_blank");
    expect(demo).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("opens the shared FAQ independently with recovery, support and legal destinations", () => {
    render(<TemplatesPage />);
    const faq = screen.getByRole("region", { name: "Before you choose." });
    const rows = faq.querySelectorAll("details");
    expect(rows).toHaveLength(3);
    for (const row of rows) {
      expect(row.open).toBe(false);
      fireEvent.click(row.querySelector("summary")!);
      expect(row.open).toBe(true);
    }
    expect(faq).toHaveTextContent(
      "After payment is confirmed and delivery is processed",
    );
    for (const [name, href] of [
      ["Recover a purchase", "/orders/recover"],
      ["Get purchase support", "/orders/support"],
      ["Read the license", "/license"],
      ["Read purchase terms", "/terms"],
    ]) {
      expect(within(faq).getByRole("link", { name })).toHaveAttribute(
        "href",
        href,
      );
    }
    fireEvent.click(rows[0]!.querySelector("summary")!);
    expect(rows[0]!.open).toBe(false);
    expect(rows[1]!.open).toBe(true);
  });

  it("retains the real checkout payload and suppresses repeated purchase activations", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        }),
    );
    render(<TemplatesPage />);
    const buttons = screen.getAllByRole("button", {
      name: "Buy NA-AI Landing",
    });
    expect(buttons).toHaveLength(1);
    const button = buttons[0]!;
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveTextContent("Opening checkout…");
    fireEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/api/v1/checkout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: "na-ai-landing" }),
        signal: expect.any(AbortSignal),
      },
    );
    finish(
      new Response(
        JSON.stringify({
          url: "https://checkout.example.com/controlled-template",
        }),
        { status: 200 },
      ),
    );
    await waitFor(() =>
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(
        "https://checkout.example.com/controlled-template",
      ),
    );
    expect(trackMoneyPathEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "checkout_redirect_started",
        productSlug: "na-ai-landing",
        page: "/templates",
      }),
    );
  });

  it("retains an actionable checkout failure state", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(
      new Error("Controlled network failure"),
    );
    render(<TemplatesPage />);
    fireEvent.click(screen.getByRole("button", { name: "Buy NA-AI Landing" }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Checkout could not be opened.");
    expect(
      within(alert).getByRole("link", { name: "Contact purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations in either preview or the expanded FAQ", async () => {
    const { container } = render(<TemplatesPage />);
    expect(await axe(container)).toHaveNoViolations();
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Light" }), {
      button: 0,
      ctrlKey: false,
    });
    for (const row of container.querySelectorAll("details"))
      fireEvent.click(row.querySelector("summary")!);
    expect(await axe(container)).toHaveNoViolations();
  }, 15_000);
});

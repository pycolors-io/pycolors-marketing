import {
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

import StartersPage, {
  generateMetadata as getLocalizedMetadata0,
} from "../../app/[locale]/(site)/starters/page";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW } from "@/lib/products/starter-pro-mobile-preview";
import { navigateToCheckout } from "@/lib/api/checkout-navigation";
import { trackMoneyPathEvent } from "@/lib/analytics";

const metadata = await getLocalizedMetadata0({
  params: Promise.resolve({ locale: "en" }),
});

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
  window.history.replaceState(null, "", "/starters");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

describe("Starter discovery page", () => {
  it("presents Web, Mobile and Fullstack as primary source purchases with lighter alternatives", () => {
    render(<StartersPage />);
    const choices = screen.getByRole("region", {
      name: "Choose the source your product needs.",
    });
    expect(within(choices).getAllByRole("article")).toHaveLength(3);
    expect(
      within(choices).getByRole("article", { name: "Starter Pro Web" }),
    ).toBeVisible();
    for (const offer of [
      STARTER_PRO_MOBILE_PREVIEW,
      STARTER_PRO_MOBILE_PREVIEW.bundle,
    ]) {
      const card = within(choices).getByRole("article", {
        name:
          offer.slug === "starter-pro-mobile"
            ? "Starter Pro Mobile"
            : "Starter Pro Fullstack",
      });
      expect(card).toHaveTextContent(
        offer.slug === "starter-pro-mobile"
          ? "Native iOS and Android, with a compatible backend."
          : "Web and Mobile, built around the same accounts and data.",
      );
      expect(within(card).getByText(offer.priceLabel)).toBeVisible();
      expect(card).toHaveTextContent(offer.priceQualifier);
      expect(
        within(card).getByRole("button", {
          name: `Buy ${offer.name} — ${offer.priceLabel}`,
        }),
      ).toBeEnabled();
      const link = within(card).getByRole("link", { name: offer.action });
      expect(link).toHaveAttribute("href", offer.href);
      link.focus();
      expect(link).toHaveFocus();
      expect(
        within(card).getByRole("link", {
          name:
            offer.slug === "starter-pro-mobile"
              ? "Mobile setup guide"
              : "Fullstack setup guide",
        }),
      ).toHaveAttribute("href", offer.docsHref);
    }
    expect(choices).toHaveTextContent("provider costs are separate");
    const alternatives = screen.getByRole("region", {
      name: "Explore lighter starting points.",
    });
    expect(within(alternatives).getAllByRole("article")).toHaveLength(2);
    expect(
      within(alternatives).getByRole("article", { name: "Starter Free" }),
    ).toBeVisible();
    const landing = within(alternatives).getByRole("article", {
      name: "NA-AI Landing",
    });
    expect(
      within(landing).getByRole("button", {
        name: `Buy NA-AI Landing — ${PRODUCT_DISPLAY["na-ai-landing"].priceLabel}`,
      }),
    ).toBeEnabled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("preserves the public route and gives keyboard users a main target and valid section anchors", () => {
    render(<StartersPage />);
    expect(metadata.alternates?.canonical).toBe("/starters");
    expect(metadata.openGraph?.url).toBe("/starters");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href");
      if (href?.startsWith("#"))
        expect(document.getElementById(href.slice(1))).not.toBeNull();
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("distinguishes mock UI, frontend templates and integration foundations", () => {
    render(<StartersPage />);
    const free = screen.getByRole("article", { name: "Starter Free" });
    const web = screen.getByRole("article", { name: "Starter Pro Web" });
    const landing = screen.getByRole("article", { name: "NA-AI Landing" });
    expect(within(free).getByText(STARTER_FREE_PRICE_LABEL)).toBeVisible();
    expect(free).toHaveTextContent("No real accounts, payments or database.");
    expect(free).toHaveTextContent("Public repository");
    expect(
      within(web).getByText(PRODUCT_DISPLAY["starter-pro"].priceLabel),
    ).toBeVisible();
    expect(web).toHaveTextContent("One-time payment · VAT included");
    expect(web).toHaveTextContent("Web and installable PWA");
    expect(landing).toHaveTextContent(
      "No auth, billing or database integration",
    );
    expect(
      within(free).getByRole("link", { name: "Explore Starter Free" }),
    ).toHaveAttribute("href", "/starters/free");
    expect(
      within(web).getByRole("link", { name: "Explore Starter Pro Web" }),
    ).toHaveAttribute("href", "/starters/pro");
  });

  it("keeps illustrative landing content distinct from the mocked frontend preview", () => {
    render(<StartersPage />);
    for (const [name, href, caption] of [
      ["Starter Free", "/starters/free", "Dashboard preview · Sample data"],
      ["NA-AI Landing", "/templates/na-ai-landing", "Illustrative content"],
    ]) {
      const article = screen.getByRole("article", { name });
      const preview = within(article).getByRole("link", {
        name: `Explore the ${name} preview`,
      });
      expect(preview).toHaveAttribute("href", href);
      expect(within(preview).getByRole("img")).toHaveAccessibleName();
      expect(preview.querySelectorAll("img")).toHaveLength(2);
      expect(article.querySelector("figcaption")).toHaveTextContent(caption);
    }
  });

  it("clearly identifies the Free demo and public source with safe external links", () => {
    render(<StartersPage />);
    const demo = screen.getByRole("link", {
      name: "Try the Starter Free demo (opens in a new tab)",
    });
    expect(demo).toHaveAttribute("href", "https://starter-demo.pycolors.io");
    const repository = screen.getByRole("link", {
      name: "View source on GitHub (opens in a new tab)",
    });
    expect(repository).toHaveAttribute(
      "href",
      "https://github.com/pycolors-io/pycolors-starter-free",
    );
    for (const link of [demo, repository]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
    }
  });

  it("renders the shared nine-capability comparison once with accessible horizontal scrolling", () => {
    render(<StartersPage />);
    const tables = screen.getAllByRole("table", {
      name: "Compare Starter Free and Starter Pro",
    });
    expect(tables).toHaveLength(1);
    expect(within(tables[0]!).getAllByRole("rowheader")).toHaveLength(9);
    expect(
      screen.getByRole("region", {
        name: "Starter comparison, scroll horizontally for all columns",
      }),
    ).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByText(/does not automatically migrate your app or data/),
    ).toBeVisible();
    expect(document.querySelectorAll("#starter-comparison-setup")).toHaveLength(
      1,
    );
  });

  it("keeps the real purchase flow, duplicate-click guard and checkout destination", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        }),
    );
    render(<StartersPage />);
    const buttons = screen.getAllByRole("button", { name: "Buy Starter Pro" });
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
        body: JSON.stringify({ productSlug: "starter-pro", locale: "en" }),
        signal: expect.any(AbortSignal),
      },
    );
    finish(
      new Response(
        JSON.stringify({
          url: "https://checkout.example.com/controlled-checkout",
        }),
        { status: 200 },
      ),
    );
    await waitFor(() =>
      expect(navigateToCheckout).toHaveBeenCalledExactlyOnceWith(
        "https://checkout.example.com/controlled-checkout",
      ),
    );
    expect(trackMoneyPathEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "checkout_redirect_started",
        productSlug: "starter-pro",
        page: "/starters",
      }),
    );
  });

  it("keeps purchase failures visible with a support destination", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(
      new Error("Controlled network failure"),
    );
    render(<StartersPage />);
    fireEvent.click(screen.getByRole("button", { name: "Buy Starter Pro" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Checkout could not be opened.",
    );
    expect(
      screen.getByRole("link", { name: "Contact purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("button", { name: "Buy Starter Pro" }),
    ).toBeEnabled();
    expect(navigateToCheckout).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<StartersPage />);
    expect(await axe(container)).toHaveNoViolations();
  }, 15_000);
});

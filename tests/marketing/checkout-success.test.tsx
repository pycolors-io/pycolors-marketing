import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import CheckoutSuccessPage from "../../app/(site)/checkout/success/page";
import { MoneyPathPageEvent } from "@/components/analytics/money-path-event";

vi.mock("@/components/analytics/money-path-event", () => ({
  MoneyPathPageEvent: vi.fn(() => null),
}));

const sessionId = "cs_test_purchase76";
const paidSession = {
  id: sessionId,
  status: "complete",
  paymentStatus: "paid",
  productSlug: "starter-pro",
  productName: "PyColors Starter Pro",
  customerEmail: "buyer@example.com",
  amountTotal: 19900,
  currency: "eur",
};

function respond(body: unknown, status = 200) {
  vi.mocked(fetch).mockResolvedValue(Response.json(body, { status }));
}

async function renderPage(
  session_id: string | string[] | undefined = sessionId,
) {
  return render(
    await CheckoutSuccessPage({
      searchParams: Promise.resolve({ session_id }),
    }),
  );
}

function expectUnconfirmed() {
  expect(screen.getByText("Payment not confirmed")).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Your payment is confirmed." }),
  ).toBeNull();
  expect(screen.queryByText("Payment received")).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Start setup/ })).toBeNull();
  expect(screen.queryByRole("link", { name: /download/i })).toBeNull();
  expect(
    screen.getByRole("link", { name: "Recover purchase access" }),
  ).toHaveAttribute("href", "/orders/recover");
  expect(screen.getByRole("link", { name: "Contact support" })).toHaveAttribute(
    "href",
    "/orders/support",
  );
}

describe("Checkout success", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal("fetch", vi.fn());
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("does not confirm payment without a checkout session", async () => {
    render(await CheckoutSuccessPage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "We could not confirm your payment",
    );
    expect(screen.queryByText("Payment received")).not.toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
    expectUnconfirmed();
  });

  it.each(["", "   ", [sessionId, "cs_test_other"]])(
    "rejects an empty or ambiguous session query: %j",
    async (query) => {
      await renderPage(query);
      expectUnconfirmed();
      expect(fetch).not.toHaveBeenCalled();
      expect(
        screen.queryByRole("link", { name: "Check payment status again" }),
      ).toBeNull();
    },
  );

  it("confirms a matching, complete, paid session without claiming delivery", async () => {
    respond({ ok: true, session: paidSession });
    const { container } = await renderPage();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Your payment is confirmed.",
    );
    expect(screen.getByText("€199.00")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Contact support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(screen.getByRole("link", { name: /Start setup/ })).toHaveAttribute(
      "href",
      "/docs/starter-pro/getting-started",
    );
    expect(
      screen.getByRole("link", { name: "Resend access link" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(
      screen.queryByText("Order successfully recorded"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Order confirmed")).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /Payment confirmation does not confirm that the email has arrived/,
      ),
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledExactlyOnceWith(
      `https://api.example.com/api/v1/checkout/sessions/${sessionId}`,
      {
        cache: "no-store",
        signal: expect.any(AbortSignal),
      },
    );
    expect(vi.mocked(MoneyPathPageEvent).mock.calls[0]?.[0]).toEqual({
      event: "checkout_success_viewed",
      productSlug: "starter-pro",
      productName: "PyColors Starter Pro",
      page: "/checkout/success",
      status: "paid",
    });
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("preserves the other store product's setup destination", async () => {
    respond({
      ok: true,
      session: {
        ...paidSession,
        productSlug: "na-ai-landing",
        productName: "NA-AI Landing",
      },
    });
    await renderPage();
    expect(screen.getByRole("link", { name: /Start setup/ })).toHaveAttribute(
      "href",
      "/templates/na-ai-landing",
    );
  });

  it.each([
    ["complete", "unpaid", "Your payment is still pending."],
    ["open", "unpaid", "Your checkout is not complete."],
    ["expired", "unpaid", "This checkout has expired."],
    ["complete", "no_payment_required", "We could not confirm your payment."],
    ["open", "paid", "We could not confirm your payment."],
    [null, null, "We could not confirm your payment."],
  ])(
    "handles session %s / payment %s without a false confirmation",
    async (status, paymentStatus, title) => {
      respond({ ok: true, session: { ...paidSession, status, paymentStatus } });
      const { container } = await renderPage();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        title!,
      );
      expectUnconfirmed();
      expect(
        screen.getByRole("link", { name: "Check payment status again" }),
      ).toHaveAttribute("href", `/checkout/success?session_id=${sessionId}`);
      await expect(axe(container)).resolves.toHaveNoViolations();
    },
  );

  it.each([400, 404, 500])(
    "handles API status %i without a false confirmation",
    async (status) => {
      respond({ ok: true, session: paidSession }, status);
      await renderPage();
      expectUnconfirmed();
    },
  );

  it.each([
    null,
    { ok: true },
    { ok: false, session: paidSession },
    { ok: true, session: { ...paidSession, id: "cs_test_different" } },
    { ok: true, session: { ...paidSession, paymentStatus: "unknown" } },
    { ok: true, session: { ...paidSession, productName: null } },
    { ok: true, session: { ...paidSession, amountTotal: "19900" } },
    { ok: true, session: { ...paidSession, currency: "not-a-currency" } },
  ])(
    "handles malformed or mismatched response %# without confirmation",
    async (body) => {
      respond(body);
      await renderPage();
      expectUnconfirmed();
      expect(screen.queryByText("buyer@example.com")).toBeNull();
    },
  );

  it.each([
    new TypeError("Fetch failed"),
    new DOMException("Timed out", "TimeoutError"),
  ])("handles network and timeout failures", async (error) => {
    vi.mocked(fetch).mockRejectedValue(error);
    await renderPage();
    expectUnconfirmed();
    expect(
      screen.getByText(/This does not mean your payment failed/),
    ).toBeInTheDocument();
  });

  it("handles invalid JSON", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response("not JSON"));
    await renderPage();
    expectUnconfirmed();
  });

  it("handles missing API configuration", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "");
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      await renderPage();
      expectUnconfirmed();
      expect(fetch).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
    }
  });

  it("encodes an untrusted session query in fetch and retry URLs", async () => {
    respond(null);
    const query = "cs_test_other/../path?x=1&y=2";
    await renderPage(query);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.example.com/api/v1/checkout/sessions/${encodeURIComponent(query)}`,
      expect.any(Object),
    );
    expect(
      screen.getByRole("link", { name: "Check payment status again" }),
    ).toHaveAttribute(
      "href",
      `/checkout/success?session_id=${encodeURIComponent(query)}`,
    );
    expectUnconfirmed();
  });
});

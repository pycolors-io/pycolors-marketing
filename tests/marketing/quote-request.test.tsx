import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { QuoteRequestForm } from "../../components/quotes/quote-request-form";
import QuoteRequestPage, {
  metadata,
} from "../../app/(site)/request-a-quote/page";
import { STARTER_PRO_SERVICES } from "../../lib/products/starter-pro-services";

const id1 = "00000000-0000-4000-8000-000000000001";
const id2 = "00000000-0000-4000-8000-000000000002";
const brief =
  "Our team needs an approval workflow for projects with assigned reviewers and a discussion before the final decision.";
const fetchMock = vi.fn(
  async (
    _url: Parameters<typeof fetch>[0],
    options?: Parameters<typeof fetch>[1],
  ) => {
    const body = JSON.parse(String(options?.body));
    return Response.json(
      { ok: true, reference: body.requestId },
      { status: 202 },
    );
  },
);
beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockClear();
  vi.spyOn(crypto, "randomUUID").mockReturnValueOnce(id1).mockReturnValue(id2);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
function fill() {
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Test Requestor" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "requestor@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Indicative budget"), {
    target: { value: "5k-10k" },
  });
  fireEvent.change(screen.getByLabelText("What would you like to build?"), {
    target: { value: brief },
  });
}
const submit = () =>
  fireEvent.submit(
    screen.getByRole("form", { name: "Let’s define the next step." }),
  );

describe("Project quote requests", () => {
  it("preselects the service from a known query and retains canonical metadata", async () => {
    const view = await QuoteRequestPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ service: "business-adaptation" }),
    });
    render(view);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A clear scope for your next product.",
    );
    expect(screen.getByLabelText("Service")).toHaveValue("business-adaptation");
    expect(metadata.alternates).toEqual({ canonical: "/request-a-quote" });
    for (const service of Object.values(STARTER_PRO_SERVICES))
      expect(screen.getByText(service.priceLabel)).toBeVisible();
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("keeps unknown service values unselected", async () => {
    render(
      await QuoteRequestPage({
        params: Promise.resolve({}),
        searchParams: Promise.resolve({ service: "unrecognized" }),
      }),
    );
    expect(screen.getByLabelText("Service")).toHaveValue("");
  });
  it("validates required fields before creating a request", () => {
    render(<QuoteRequestForm initialService="guided-setup" />);
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("locks duplicate submissions, shows a loader and focuses the accepted reference", async () => {
    let resolve: (value: Response) => void = () => {};
    fetchMock.mockReturnValueOnce(
      new Promise<Response>((accept) => {
        resolve = accept;
      }),
    );
    render(<QuoteRequestForm initialService="guided-setup" />);
    fill();
    submit();
    submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("button", { name: "Submitting your brief…" }),
    ).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
    await act(async () => {
      resolve(Response.json({ ok: true, reference: id1 }, { status: 202 }));
    });
    const confirmation = await screen.findByRole("status");
    expect(confirmation).toHaveFocus();
    expect(confirmation).toHaveTextContent(id1);
    expect(
      within(confirmation).getByRole("link", { name: "Back to pricing" }),
    ).toHaveAttribute("href", "/pricing");
    const sent = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body));
    expect(sent).toMatchObject({
      requestId: id1,
      service: "guided-setup",
      brief,
      website: "",
    });
    expect(sent).not.toHaveProperty("to");
    expect(sent).not.toHaveProperty("price");
  });
  it("preserves a failed brief and reuses the same reference on retry", async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ error: "PRIVATE_PROVIDER_DIAGNOSTIC" }, { status: 503 }),
    );
    render(<QuoteRequestForm initialService="guided-setup" />);
    fill();
    submit();
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("We couldn’t confirm your submission");
    expect(alert).not.toHaveTextContent("PRIVATE_PROVIDER_DIAGNOSTIC");
    expect(screen.getByLabelText("What would you like to build?")).toHaveValue(
      brief,
    );
    expect(screen.queryByRole("status")).toBeNull();
    submit();
    await screen.findByRole("status");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[1]?.body).toEqual(
      fetchMock.mock.calls[1]?.[1]?.body,
    );
    expect(crypto.randomUUID).toHaveBeenCalledTimes(1);
  });
  it("creates a new request when a failed brief is edited", async () => {
    fetchMock.mockResolvedValueOnce(Response.json({}, { status: 503 }));
    render(<QuoteRequestForm initialService="guided-setup" />);
    fill();
    submit();
    await screen.findByRole("alert");
    fireEvent.change(screen.getByLabelText("What would you like to build?"), {
      target: { value: `${brief} We also need notifications.` },
    });
    submit();
    expect(await screen.findByRole("status")).toHaveTextContent(id2);
  });
  it("focuses safe field errors and never echoes arbitrary response text", async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json(
        { fields: ["brief", "unknown"], error: "PRIVATE_DATA" },
        { status: 400 },
      ),
    );
    render(<QuoteRequestForm initialService="guided-setup" />);
    fill();
    submit();
    await screen.findByText("Review the highlighted fields.");
    await waitFor(() =>
      expect(
        screen.getByLabelText("What would you like to build?"),
      ).toHaveFocus(),
    );
    expect(
      screen.getByLabelText("What would you like to build?"),
    ).toHaveAttribute("aria-invalid", "true");
    expect(
      screen.getByText("Describe your project in 40–4,000 characters."),
    ).toBeVisible();
    expect(document.body).not.toHaveTextContent("PRIVATE_DATA");
  });
  it("does not confirm an unexpected API response", async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ ok: true, reference: id2 }, { status: 202 }),
    );
    render(<QuoteRequestForm initialService="guided-setup" />);
    fill();
    submit();
    await screen.findByRole("alert");
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("keeps the form and confirmation accessible", async () => {
    const { container } = render(
      <QuoteRequestForm initialService="guided-setup" />,
    );
    expect((await axe(container)).violations).toEqual([]);
    fill();
    submit();
    await screen.findByRole("status");
    expect((await axe(container)).violations).toEqual([]);
  });
});

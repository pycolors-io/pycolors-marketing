import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

vi.hoisted(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
});
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));
// Exercise the real client and page together; only external transport is replaced.
import RecoverOrderPage from "../../app/(site)/orders/recover/page";

const marker = "synthetic-private-recovery-marker";
beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function submit() {
  fireEvent.change(screen.getByRole("textbox", { name: /^Purchase email/ }), {
    target: { value: "buyer@example.com" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: "Product" }), {
    target: { value: "na-ai-landing" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Resend access link" }));
}

describe("real recovery client and form boundary", () => {
  it.each(["legacy-api", "network", "malformed-success"])(
    "keeps %s details out of alerts and logs, preserves inputs and permits manual retry",
    async (mode) => {
      const logs = [
        vi.spyOn(console, "error"),
        vi.spyOn(console, "warn"),
        vi.spyOn(console, "log"),
      ];
      if (mode === "network")
        vi.mocked(fetch).mockRejectedValueOnce(new Error(marker));
      else
        vi.mocked(fetch).mockResolvedValueOnce(
          Response.json(
            { error: marker },
            { status: mode === "legacy-api" ? 400 : 200 },
          ),
        );
      vi.mocked(fetch).mockResolvedValueOnce(Response.json({ ok: true }));
      const { container } = render(<RecoverOrderPage />);
      submit();
      const alert = await screen.findByRole("alert");
      expect(alert.textContent?.includes(marker)).toBe(false);
      expect(alert).toHaveTextContent(
        "Unable to request your access link. Please try again or contact support.",
      );
      expect(
        screen.getByRole("textbox", { name: /^Purchase email/ }),
      ).toHaveValue("buyer@example.com");
      expect(screen.getByRole("combobox", { name: "Product" })).toHaveValue(
        "na-ai-landing",
      );
      expect(
        screen.getByRole("link", { name: "Contact support" }),
      ).toHaveAttribute("href", "/orders/support");
      expect(fetch).toHaveBeenCalledTimes(1);
      for (const log of logs) expect(log).not.toHaveBeenCalled();
      await expect(axe(container)).resolves.toHaveNoViolations();
      fireEvent.click(
        screen.getByRole("button", { name: "Resend access link" }),
      );
      expect(await screen.findByRole("status")).toHaveTextContent(
        "does not verify a purchase or email delivery",
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(vi.mocked(fetch).mock.calls[1]![1]!.body).toBe(
        JSON.stringify({
          email: "buyer@example.com",
          productSlug: "na-ai-landing",
        }),
      );
      for (const log of logs) expect(log).not.toHaveBeenCalled();
    },
  );
});

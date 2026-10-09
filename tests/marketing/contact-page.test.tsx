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
import ContactPage from "../../app/(site)/contact/page";
import AboutPage from "../../app/(site)/about/page";

const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);

afterEach(() => {
  if (originalClipboard) {
    Object.defineProperty(navigator, "clipboard", originalClipboard);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
  vi.unstubAllGlobals();
});

describe("Contact page", () => {
  it("separates general enquiries from purchase help with accessible, working destinations", async () => {
    const { container } = render(<ContactPage />);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Contact PyColors.",
    );
    const general = screen.getByRole("region", {
      name: "Find the right starting point.",
    });
    expect(
      within(general).getByRole("link", { name: "Write to PyColors" }),
    ).toHaveAttribute(
      "href",
      "mailto:contact@pycolors.com?subject=PyColors%20enquiry",
    );
    expect(
      within(general).getByRole("link", { name: "contact@pycolors.com" }),
    ).toHaveAttribute("href", "mailto:contact@pycolors.com");
    expect(general).toHaveTextContent("If nothing opens, copy the address");
    const purchase = screen.getByRole("region", {
      name: "Already have a purchase?",
    });
    expect(
      within(purchase).getByRole("link", { name: "Visit purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      within(purchase).getByRole("link", { name: /Recover purchase access/ }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(purchase).toHaveTextContent("You do not need a PyColors account");
    const resources = screen.getByRole("navigation", {
      name: "A few answers, already here.",
    });
    expect(
      within(resources)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/pricing", "/license", "/docs"]);
    for (const link of screen.getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      if (href.startsWith("/") && href !== "/docs") {
        expect(
          existsSync(resolve("app/(site)", href.slice(1), "page.tsx")),
          href,
        ).toBe(true);
      }
    }
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("copies the general enquiry address without sending a request", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    vi.stubGlobal("fetch", vi.fn());
    render(<ContactPage />);

    fireEvent.click(screen.getByRole("button", { name: "Copy contact email" }));
    expect(writeText).toHaveBeenCalledExactlyOnceWith("contact@pycolors.com");
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Email address copied.",
      ),
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("makes contact discoverable from About", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("link", { name: "Get in touch with PyColors" }),
    ).toHaveAttribute("href", "/contact");
  });
});

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import DemoPage, { metadata } from "@/app/(site)/demo/page";

const analytics = vi.hoisted(() => ({ track: vi.fn() }));
vi.mock("@vercel/analytics", () => analytics);
afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("starter demo discovery", () => {
  it("distinguishes the mock Free app from Pro workspace journeys and provides a tour when Pro is unavailable", () => {
    vi.stubEnv("NEXT_PUBLIC_STARTER_PRO_DEMO_URL", "");
    render(<DemoPage />);
    expect(metadata.alternates).toEqual({ canonical: "/demo" });
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const free = screen.getByRole("article", { name: "Starter Free" });
    const pro = screen.getByRole("article", { name: "Starter Pro" });
    expect(free).toHaveTextContent("No real accounts, database or payments");
    expect(pro).toHaveTextContent("saved workspace changes");
    expect(pro).toHaveTextContent("Free → Pro preview without a real payment");
    expect(
      within(free).getByRole("link", { name: "Open Free demo" }),
    ).toHaveAttribute("href", "https://starter-demo.pycolors.io/");
    expect(
      within(pro).getByRole("link", { name: "Watch Pro tour" }),
    ).toHaveAttribute("href", "/starters/pro#product-tour");
    expect(
      within(pro).queryByRole("link", { name: "Open Pro demo" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it.each([
    "https://evil.test/demo?token=secret",
    "javascript:alert(1)",
    "https://user:password@evil.test/demo",
    "http://remote.test",
    "https://example.test/unsupported",
  ])("never exposes an invalid Pro target: %s", (value) => {
    vi.stubEnv("NEXT_PUBLIC_STARTER_PRO_DEMO_URL", value);
    render(<DemoPage />);
    expect(screen.getByRole("link", { name: "Watch Pro tour" })).toBeVisible();
    expect(
      screen.queryByRole("link", { name: "Open Pro demo" }),
    ).not.toBeInTheDocument();
    expect(document.querySelector(`a[href="${value}"]`)).toBeNull();
  });

  it("opens the configured Pro deployment directly and measures only the demo click", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_STARTER_PRO_DEMO_URL",
      "https://pro-demo.pycolors.io/demo",
    );
    render(<DemoPage />);
    const link = screen.getByRole("link", { name: "Open Pro demo" });
    expect(link).toHaveAttribute(
      "href",
      "https://pro-demo.pycolors.io/demo?destination=%2Fdashboard",
    );
    expect(
      screen.queryByRole("link", { name: "Watch Pro tour" }),
    ).not.toBeInTheDocument();
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);
    expect(analytics.track).toHaveBeenCalledExactlyOnceWith(
      "marketing_to_pro_demo_clicked",
    );
    expect(
      screen.getByRole("article", { name: "Starter Pro" }),
    ).toHaveTextContent("A private workspace for two hours");
  });

  it("uses existing labelled captures and valid product/comparison destinations", () => {
    vi.stubEnv("NEXT_PUBLIC_STARTER_PRO_DEMO_URL", "");
    render(<DemoPage />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
    for (const image of images) {
      expect(image).toHaveAccessibleName(/fictional data/);
      const src = new URL(image.getAttribute("src")!, "https://pycolors.io");
      const asset = src.searchParams.get("url") ?? src.pathname;
      expect(existsSync(resolve("public", asset.slice(1))), asset).toBe(true);
    }
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
      const href = link.getAttribute("href")!;
      if (href.startsWith("/"))
        expect(
          existsSync(
            resolve("app/(site)", href.split("#")[0]!.slice(1), "page.tsx"),
          ),
          href,
        ).toBe(true);
    }
    expect(
      screen.getByRole("link", { name: "Compare Free and Pro" }),
    ).toHaveAttribute("href", "/starters");
  });

  it.each(["", "https://pro-demo.pycolors.io/demo"])(
    "has no automated accessibility violations with configuration %s",
    async (value) => {
      vi.stubEnv("NEXT_PUBLIC_STARTER_PRO_DEMO_URL", value);
      const { container } = render(<DemoPage />);
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});

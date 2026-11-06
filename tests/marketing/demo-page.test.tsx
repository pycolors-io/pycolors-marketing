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
  it("prioritizes the connected Pro demo while keeping the Free frontend clearly separate", () => {
    vi.stubEnv("NEXT_PUBLIC_STARTER_PRO_DEMO_URL", "");
    render(<DemoPage />);
    expect(metadata.alternates).toEqual({ canonical: "/demo" });
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const free = screen.getByRole("article", { name: "Starter Free" });
    const pro = screen.getByRole("article", { name: "Starter Pro" });
    expect(free).toHaveTextContent("No real accounts, database or payments");
    expect(pro).toHaveTextContent("saved workspace changes");
    expect(pro).toHaveTextContent("No card, charge or subscription is created");
    expect(screen.getAllByRole("article")[0]).toBe(pro);
    expect(
      within(free).getByRole("link", { name: "Open Free demo" }),
    ).toHaveAttribute("href", "https://starter-demo.pycolors.io/");
    expect(
      within(pro).getByRole("link", { name: "Open Pro demo" }),
    ).toHaveAttribute(
      "href",
      "https://pro-demo.pycolors.io/demo?destination=%2Fdashboard",
    );
    expect(
      within(pro).queryByRole("link", { name: "Watch Pro tour" }),
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
    ).toHaveTextContent("saved workspace changes stay private for two hours");
  });

  it("keeps all three journeys on the configured deployment with allowlisted destinations", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_STARTER_PRO_DEMO_URL",
      "https://demo.example.test/demo",
    );
    render(<DemoPage />);
    for (const [name, destination] of [
      ["Explore dashboard", "/dashboard"],
      ["Explore team workflows", "/admin"],
      ["Preview billing", "/billing"],
    ]) {
      const link = screen.getByRole("link", { name });
      const target = new URL(link.getAttribute("href")!);
      expect(target.origin).toBe("https://demo.example.test");
      expect(target.pathname).toBe("/demo");
      expect(target.searchParams.get("destination")).toBe(destination);
      link.addEventListener("click", (event) => event.preventDefault());
      fireEvent.click(link);
    }
    expect(analytics.track).toHaveBeenCalledTimes(3);
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

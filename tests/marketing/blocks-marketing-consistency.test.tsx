import * as React from "react";
import Link from "next/link";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import BlocksPage, { metadata } from "../../app/(site)/blocks/page";
import { MarketingLinkButton } from "../../components/marketing/cta-panel";
import { BLOCKS_CATALOG } from "../../lib/blocks/catalog";

const sectionNames = [
  "Choose a Block for your next screen",
  "From an example to code you own",
  "Source you control, not a managed dependency",
  "Need an application foundation instead?",
];

function getHero() {
  const hero = screen.getByRole("heading", { level: 1 }).closest("section");
  if (!hero) throw new Error("The shared PageHero section is missing");
  return hero;
}

function expectLinkButton(link: HTMLElement, primary: boolean) {
  expect(link.tagName).toBe("A");
  expect(link).toHaveAttribute("data-slot", "button");
  expect(link).toHaveClass("min-h-11", "h-auto", "whitespace-normal");
  expect(link).toHaveClass("rounded-[5px]", "focus-visible:ring-[3px]");
  expect(link).not.toHaveAttribute("role", "button");
  if (primary) {
    expect(link).toHaveClass("bg-primary", "text-primary-foreground");
  } else {
    expect(link).toHaveClass("border", "border-border", "bg-transparent");
    expect(link).not.toHaveClass("bg-primary");
  }
}

describe("Blocks Marketing consistency", () => {
  it("keeps one main, one hero and labelled full-width sections", () => {
    render(<BlocksPage />);
    const main = screen.getByRole("main");
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(main).toHaveAttribute("id", "content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(getHero().querySelector(".max-w-5xl")).not.toBeNull();
    const sections = Array.from(main.children).filter(
      (element) => element.tagName === "SECTION",
    );
    expect(sections).toHaveLength(sectionNames.length);
    sectionNames.forEach((name, index) => {
      const section = screen.getByRole("region", { name });
      const heading = within(section).getByRole("heading", { level: 2 });
      expect(section).toBe(sections[index]);
      expect(section).toHaveAttribute("aria-labelledby", heading.id);
      expect(section).toHaveClass("border-t", "border-border-subtle");
      expect(section).toHaveClass("py-16", "lg:py-20");
      expect(section.querySelector(".max-w-6xl")).not.toBeNull();
      expect(section).not.toHaveClass("overflow-hidden");
    });
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });

  it("gives hero actions primary-first native link semantics", () => {
    render(<BlocksPage />);
    const links = within(getHero()).getAllByRole("link");
    expect(links).toHaveLength(2);
    const primary = within(getHero()).getByRole("link", {
      name: "Explore the Blocks",
    });
    const secondary = within(getHero()).getByRole("link", {
      name: "Read the source-copy guide",
    });
    expect(links).toEqual([primary, secondary]);
    expect(primary).toHaveAttribute("href", "#catalog");
    expect(secondary).toHaveAttribute("href", "/docs/blocks");
    expectLinkButton(primary, true);
    expectLinkButton(secondary, false);
    expect(primary.parentElement).toHaveClass("flex-col", "sm:flex-row");
    expect(primary.parentElement).toHaveClass("sm:justify-center");
    const catalog = document.getElementById("catalog");
    expect(catalog).toHaveClass("scroll-mt-24");
  });

  it("renders every canonical card once in a responsive catalog", () => {
    render(<BlocksPage />);
    const catalog = screen.getByRole("region", { name: sectionNames[0] });
    const cards = within(catalog).getAllByRole("link");
    expect(cards).toHaveLength(BLOCKS_CATALOG.length);
    BLOCKS_CATALOG.forEach((block, index) => {
      const heading = within(catalog).getByRole("heading", {
        name: block.title,
        level: 3,
      });
      const link = heading.closest("a");
      expect(link).toBe(cards[index]);
      expect(link).toHaveAttribute("href", block.href);
      expect(link).toHaveTextContent(block.category);
      expect(link).toHaveTextContent(block.description);
      expect(link).toHaveClass("p-6", "sm:p-7");
      expect(link?.querySelector("a, button")).toBeNull();
    });
    expect(cards[0]?.parentElement).toHaveClass(
      "grid",
      "sm:grid-cols-2",
      "lg:grid-cols-3",
    );
    const count = `${BLOCKS_CATALOG.length} documented Blocks`;
    expect(within(getHero()).getByText(count)).toBeVisible();
  });

  it("preserves ordered integration steps and honest ownership copy", () => {
    render(<BlocksPage />);
    const steps = screen.getByRole("list", {
      name: "Block integration steps",
    });
    expect(steps.tagName).toBe("OL");
    expect(steps).toHaveClass("md:grid-cols-3");
    const items = within(steps).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    const titles = [
      "Configure the UI",
      "Copy the source",
      "Connect and validate",
    ];
    items.forEach((item, index) => {
      const heading = within(item).getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent(titles[index] ?? "Missing step");
      expect(item).toHaveTextContent(`Step ${index + 1} of 3`);
    });
    const install = within(steps).getByRole("link", {
      name: "UI installation",
    });
    const copy = within(steps).getByRole("link", {
      name: "Source-copy instructions",
    });
    expect(install).toHaveAttribute("href", "/docs/ui/installation");
    expect(copy).toHaveAttribute("href", "/docs/blocks");
    const ownership = screen.getByRole("region", { name: sectionNames[2] });
    expect(ownership).toHaveTextContent(
      "no automatic updates or synchronization",
    );
    expect(ownership).toHaveTextContent(
      "no Blocks npm package, Registry installer or CLI",
    );
    expect(ownership).toHaveTextContent("do not connect a backend for you");
  });

  it("keeps the Starter decision and closing action order", () => {
    render(<BlocksPage />);
    const closing = screen.getByRole("region", { name: sectionNames[3] });
    const primary = within(closing).getByRole("link", {
      name: "Compare Starters",
    });
    const secondary = within(closing).getByRole("link", {
      name: "Continue with Blocks",
    });
    expect(within(closing).getAllByRole("link")).toEqual([primary, secondary]);
    expect(primary).toHaveAttribute("href", "/starters");
    expect(secondary).toHaveAttribute("href", "/docs/blocks");
    expectLinkButton(primary, true);
    expectLinkButton(secondary, false);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(metadata.alternates).toEqual({ canonical: "/blocks" });
  });

  it("keeps icons decorative and passes structural axe checks", async () => {
    const { container } = render(<BlocksPage />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(BLOCKS_CATALOG.length);
    icons.forEach((icon) => {
      expect(icon.closest('[aria-hidden="true"]')).not.toBeNull();
      expect(icon).not.toHaveAttribute("tabindex", "0");
    });
    const result = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(result).toHaveNoViolations();
  });
});

describe("MarketingLinkButton", () => {
  it("preserves the child Link, callback, ref and native focus", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    const onClick = vi.fn();
    render(
      <MarketingLinkButton>
        <Link
          href="/docs/blocks"
          ref={ref}
          onClick={(event) => {
            event.preventDefault();
            onClick();
          }}
        >
          Browse source
        </Link>
      </MarketingLinkButton>,
    );
    const link = screen.getByRole("link", { name: "Browse source" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("href", "/docs/blocks");
    expectLinkButton(link, true);
    link.focus();
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledOnce();
    expect(link).toHaveFocus();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("preserves caller-owned external link attributes", () => {
    render(
      <MarketingLinkButton variant="outline">
        <a
          href="https://example.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          External guide
        </a>
      </MarketingLinkButton>,
    );
    const link = screen.getByRole("link", { name: "External guide" });
    expectLinkButton(link, false);
    expect(link).toHaveAttribute("href", "https://example.com/docs");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("allows long labels and merges caller geometry last", () => {
    const label = "Read the complete source-copy and integration documentation";
    render(
      <MarketingLinkButton className="px-8 rounded-lg">
        <Link href="/docs/blocks">{label}</Link>
      </MarketingLinkButton>,
    );
    const link = screen.getByRole("link", { name: label });
    expect(link).toHaveClass("max-w-full", "min-w-0", "whitespace-normal");
    expect(link).toHaveClass("h-auto", "min-h-11", "px-8", "rounded-lg");
    for (const token of ["px-6", "rounded-[5px]", "h-10"]) {
      expect(link).not.toHaveClass(token);
    }
  });
});

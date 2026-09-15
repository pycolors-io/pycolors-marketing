import * as React from "react";
import Link from "next/link";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import BlocksPage, { metadata } from "../../app/(site)/blocks/page";
import { MarketingLinkButton } from "../../components/marketing/cta-panel";
import { BLOCK_CATEGORIES, BLOCKS_CATALOG } from "../../lib/blocks/catalog";

const sectionNames = [
  "Choose the interface you need next",
  "Need the complete application foundation?",
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
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });

  it("gives hero actions primary-first native link semantics", () => {
    render(<BlocksPage />);
    const links = within(getHero()).getAllByRole("link");
    expect(links).toHaveLength(2);
    const primary = within(getHero()).getByRole("link", {
      name: "Explore Blocks",
    });
    const secondary = within(getHero()).getByRole("link", {
      name: "Source-copy guide",
    });
    expect(links).toEqual([primary, secondary]);
    expect(primary).toHaveAttribute("href", "#block-catalog");
    expect(secondary).toHaveAttribute("href", "/docs/blocks");
    expectLinkButton(primary, true);
    expectLinkButton(secondary, false);
    expect(primary.parentElement).toHaveClass("flex-col", "sm:flex-row");
    expect(primary.parentElement).toHaveClass("sm:justify-center");
    expect(document.getElementById("block-catalog")).toHaveClass(
      "scroll-mt-24",
    );
  });

  it("renders every canonical Block once with View, Source and Install actions", () => {
    render(<BlocksPage />);
    const catalog = screen.getByRole("region", { name: sectionNames[0] });
    const articles = within(catalog).getAllByRole("article");
    expect(articles).toHaveLength(BLOCKS_CATALOG.length);

    BLOCKS_CATALOG.forEach((block) => {
      const heading = within(catalog).getByRole("heading", {
        name: block.title,
        level: 4,
      });
      const article = heading.closest("article");
      if (!article) throw new Error(`Missing catalog article for ${block.id}`);
      const scoped = within(article);
      expect(heading).toBeVisible();
      expect(article).toHaveTextContent(block.category);
      expect(article).toHaveTextContent(block.description);
      expect(
        scoped.getByRole("link", { name: `View ${block.title} documentation` }),
      ).toHaveAttribute("href", block.href);
      expect(
        scoped.getByRole("link", { name: `View ${block.title} source` }),
      ).toHaveAttribute("href", `${block.href}#copy-source`);
      expect(
        scoped.getByRole("link", {
          name: `Install ${block.title} by copying source`,
        }),
      ).toHaveAttribute("href", `${block.href}#install-by-copying-source`);
    });

    expect(
      within(getHero()).getByText(`${BLOCKS_CATALOG.length} documented Blocks`),
    ).toBeVisible();
  });

  it("keeps ordered category navigation and consumer-owned source copy", () => {
    render(<BlocksPage />);
    const catalog = screen.getByRole("region", { name: sectionNames[0] });
    const navigation = within(catalog).getByRole("navigation", {
      name: "Block categories",
    });
    const categoryLinks = within(navigation).getAllByRole("link");
    expect(categoryLinks).toHaveLength(BLOCK_CATEGORIES.length);

    BLOCK_CATEGORIES.forEach((category, index) => {
      expect(categoryLinks[index]).toHaveTextContent(category.label);
      expect(categoryLinks[index]).toHaveAttribute(
        "href",
        `#category-${category.slug}`,
      );
      const section = within(catalog).getByRole("region", {
        name: category.label,
      });
      const expectedCount = BLOCKS_CATALOG.filter(
        (block) => block.category === category.label,
      ).length;
      expect(within(section).getAllByRole("article")).toHaveLength(
        expectedCount,
      );
    });

    for (const article of within(catalog).getAllByRole("article")) {
      expect(article).toHaveTextContent(
        "own its behavior, customization and future updates",
      );
    }
    expect(screen.getByText("Application-owned installation")).toBeVisible();
    expect(
      screen.getByText(/no Blocks Registry or CLI is required/u),
    ).toBeVisible();
  });

  it("keeps the Starter decision and closing action order", () => {
    render(<BlocksPage />);
    const closing = screen.getByRole("region", { name: sectionNames[1] });
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

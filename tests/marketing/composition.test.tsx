import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { MarketingCheckItem } from "../../components/marketing/check-item";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
} from "../../components/marketing/cta-panel";
import { MarketingFeatureCard } from "../../components/marketing/feature-card";
import {
  MarketingPill,
  MarketingPillList,
} from "../../components/marketing/pill-list";
import {
  MarketingResourceCard,
  isExternalHref,
} from "../../components/marketing/resource-card";
import { MarketingSectionHeader } from "../../components/marketing/section-header";
import { MarketingSectionShell } from "../../components/marketing/section-shell";
import { MarketingStatCard } from "../../components/marketing/stat-card";

describe("MarketingSectionShell", () => {
  it("renders a labelled section with bounded width and spacing", () => {
    const { container } = render(
      <MarketingSectionShell
        id="ladder"
        width="reading"
        spacing="compact"
        aria-labelledby="ladder-title"
        className="bg-surface"
      >
        <h2 id="ladder-title">Product ladder</h2>
      </MarketingSectionShell>,
    );

    const section = screen.getByRole("region", { name: "Product ladder" });

    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveAttribute("id", "ladder");
    expect(section.className).toContain("py-10");
    expect(section.className).toContain("bg-surface");
    expect(section.className).not.toContain("overflow-hidden");
    expect(container.querySelector(".max-w-3xl")).not.toBeNull();
  });

  it("uses the content width and default rhythm by default", () => {
    const { container } = render(
      <MarketingSectionShell>
        <p>Section body</p>
      </MarketingSectionShell>,
    );

    const section = container.querySelector("section");

    expect(section?.className).toContain("py-14");
    expect(container.querySelector(".max-w-6xl")).not.toBeNull();
  });
});

describe("MarketingSectionHeader", () => {
  it("renders exactly one h2 with eyebrow, description, and caller action", async () => {
    const { container } = render(
      <MarketingSectionHeader
        eyebrow="Ecosystem"
        title="One coherent product ladder"
        description="Move from template to production without a stack rewrite."
        titleId="ladder-title"
        align="left"
        action={<a href="/starters">Browse starters</a>}
      />,
    );

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "One coherent product ladder",
    });

    expect(container.querySelectorAll("h2")).toHaveLength(1);
    expect(heading).toHaveAttribute("id", "ladder-title");
    expect(screen.getByText("Ecosystem")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse starters" }),
    ).toBeInTheDocument();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("centers content for the center alignment", () => {
    const { container } = render(
      <MarketingSectionHeader align="center" title="Trusted foundations" />,
    );

    expect(container.firstElementChild?.className).toContain("text-center");
  });
});

describe("MarketingPillList", () => {
  it("renders non-interactive list semantics and approved tones", async () => {
    const { container } = render(
      <MarketingPillList aria-label="Included stack" align="center">
        <MarketingPill>Next.js</MarketingPill>
        <MarketingPill tone="pro">Stripe billing</MarketingPill>
        <MarketingPill tone="platform">Prisma</MarketingPill>
        <MarketingPill tone="success" icon={<svg />}>
          Auth.js
        </MarketingPill>
      </MarketingPillList>,
    );

    const list = screen.getByRole("list", { name: "Included stack" });
    const items = within(list).getAllByRole("listitem");

    expect(items).toHaveLength(4);
    expect(list.className).toContain("justify-center");
    expect(items[1]?.className).toContain("bg-pro-surface-muted");
    expect(items[2]?.className).toContain("bg-platform-muted");
    expect(items[3]?.className).toContain("bg-success-muted");
    expect(within(list).queryByRole("button")).toBeNull();
    expect(within(list).queryByRole("link")).toBeNull();
    expect(items[3]?.querySelector("[aria-hidden='true']")).not.toBeNull();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});

describe("MarketingCheckItem", () => {
  it("keeps meaning in text and hides the decorative check", async () => {
    const { container } = render(
      <ul>
        <MarketingCheckItem>Protected dashboard routes</MarketingCheckItem>
      </ul>,
    );

    const item = screen.getByRole("listitem");

    expect(item).toHaveTextContent("Protected dashboard routes");
    expect(item.querySelector("[aria-hidden='true']")).not.toBeNull();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});

describe("MarketingFeatureCard", () => {
  it("composes slots, respects the heading level, and applies the tone surface", async () => {
    const { container } = render(
      <MarketingFeatureCard
        tone="pro"
        headingLevel={4}
        icon={<svg />}
        title="Stripe billing"
        description="Checkout, portal, invoices, and webhook synchronization."
        meta={<span>Starter Pro</span>}
        action={<a href="/starters/pro">See Starter Pro</a>}
      />,
    );

    const heading = screen.getByRole("heading", {
      level: 4,
      name: "Stripe billing",
    });
    const card = container.firstElementChild;

    expect(heading).toBeInTheDocument();
    expect(card?.className).toContain("bg-pro-surface");
    expect(screen.getByText("Starter Pro")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "See Starter Pro" }),
    ).toHaveLength(1);
    expect(container.querySelector("[aria-hidden='true']")).not.toBeNull();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("renders a neutral surface and an h3 by default", () => {
    const { container } = render(
      <MarketingFeatureCard title="Accessible by default" />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Accessible by default" }),
    ).toBeInTheDocument();
    expect(container.firstElementChild?.className).toContain(
      "border-border-subtle",
    );
  });
});

describe("MarketingResourceCard", () => {
  it("renders one internal link carrying the full card", async () => {
    const { container } = render(
      <MarketingResourceCard
        href="/guides/design-tokens"
        title="Design tokens guide"
        description="Theme the ecosystem without forking components."
        meta="Guide"
      />,
    );

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/guides/design-tokens");
    expect(links[0]).not.toHaveAttribute("target");
    expect(links[0]).toHaveTextContent("Design tokens guide");
    expect(
      screen.getByRole("heading", { level: 3, name: "Design tokens guide" }),
    ).toBeInTheDocument();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("keeps external destinations safe and announced", () => {
    render(
      <MarketingResourceCard
        tone="pro"
        href="https://github.com/pycolors-io/pycolors"
        title="PyColors on GitHub"
      />,
    );

    const link = screen.getByRole("link", {
      name: /PyColors on GitHub\s*\(opens in a new tab\)/u,
    });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
    expect(link.className).toContain("bg-pro-surface");
  });

  it("keeps non-http destinations in the current context", () => {
    render(
      <MarketingResourceCard
        href="mailto:hello@pycolors.io"
        title="Email the team"
      />,
    );

    const link = screen.getByRole("link", { name: "Email the team" });

    expect(link).toHaveAttribute("href", "mailto:hello@pycolors.io");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveTextContent("opens in a new tab");
  });

  it("classifies only http(s) destinations as new-tab external links", () => {
    expect(isExternalHref("/pricing")).toBe(false);
    expect(isExternalHref("#section")).toBe(false);
    expect(isExternalHref("mailto:hello@pycolors.io")).toBe(false);
    expect(isExternalHref("https://pycolors.io")).toBe(true);
    expect(isExternalHref("//pycolors.io")).toBe(true);
  });
});

describe("MarketingStatCard", () => {
  it("exposes the label and value as text and composes tone and class", () => {
    const { container } = render(
      <MarketingStatCard
        tone="success"
        label="Published packages"
        value="4"
        description="Versioned through Changesets."
        className="w-full"
      />,
    );

    const card = container.firstElementChild;

    expect(screen.getByText("Published packages")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(
      screen.getByText("Versioned through Changesets."),
    ).toBeInTheDocument();
    expect(card?.className).toContain("bg-success-muted/40");
    expect(card?.className).toContain("w-full");
  });

  it("uses the neutral surface by default", () => {
    const { container } = render(
      <MarketingStatCard label="Uptime" value="99.9%" />,
    );

    expect(container.firstElementChild?.className).toContain(
      "border-border-subtle",
    );
  });
});

describe("MarketingCtaPanel", () => {
  it("renders the heading, body, and caller actions in primary-first order", async () => {
    const { container } = render(
      <MarketingCtaPanel
        tone="pro"
        align="center"
        title="Start with Starter Pro"
        titleId="cta-title"
        description="Auth, billing, and delivery already wired."
        actions={
          <MarketingActionGroup align="center">
            <a href="/starters/pro">Get Starter Pro</a>
            <a href="/pricing">Compare plans</a>
          </MarketingActionGroup>
        }
      />,
    );

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Start with Starter Pro",
    });
    const links = screen.getAllByRole("link");

    expect(heading).toHaveAttribute("id", "cta-title");
    expect(container.firstElementChild?.className).toContain("bg-pro-surface");
    expect(links.map((link) => link.textContent)).toEqual([
      "Get Starter Pro",
      "Compare plans",
    ]);
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("wraps actions and keeps left alignment by default", () => {
    const { container } = render(
      <MarketingActionGroup>
        <a href="/ui">Explore PyColors UI</a>
      </MarketingActionGroup>,
    );

    const group = container.firstElementChild;

    expect(group?.className).toContain("flex-wrap");
    expect(group?.className).toContain("sm:justify-start");
  });
});

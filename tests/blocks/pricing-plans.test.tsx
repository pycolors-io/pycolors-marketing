import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import { PricingPlansExample } from "../../components/docs/blocks/pricing-plans-example";

import {
  PricingPlans,
  type PricingPlan,
  type PricingPeriodControl,
} from "../../content/blocks/commerce/pricing-plans/index";

const plans = [
  {
    id: "launch",
    name: "Launch",
    description: "A small sample offer.",
    price: "$12",
    priceSuffix: "/ month",
    billingNote: "Consumer-supplied billing terms.",
    features: [{ id: "projects", label: "One project" }],
    action: <a href="/sample-launch">Explore Launch</a>,
  },
  {
    id: "studio",
    name: "Studio",
    description: "A larger sample offer.",
    price: "Contact the team",
    highlight: "For your team",
    features: [{ id: "projects", label: "More projects" }],
    action: <button type="button">Explore Studio</button>,
    footnote: "No purchase is made by this Block.",
  },
] satisfies readonly PricingPlan[];

const period = {
  label: "Billing period",
  value: "monthly",
  options: [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "quarterly", label: "Quarterly", disabled: true },
  ],
  onValueChange: vi.fn(),
} satisfies PricingPeriodControl;

describe("PricingPlans", () => {
  it("renders labelled offers with unchanged consumer prices and terms", () => {
    render(
      <PricingPlans
        description="Compare the sample offers."
        plans={plans}
        title="Choose an offer"
      />,
    );
    const region = screen.getByRole("region", { name: "Choose an offer" });
    expect(region).toHaveAccessibleDescription("Compare the sample offers.");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Choose an offer",
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    const launch = screen.getByRole("article", { name: "Launch" });
    expect(within(launch).getByText("$12")).toBeVisible();
    expect(within(launch).getByText("/ month")).toBeVisible();
    expect(
      within(launch).getByText("Consumer-supplied billing terms."),
    ).toBeVisible();
    expect(within(launch).getByRole("list")).toHaveTextContent("One project");
    expect(screen.getByText("Contact the team")).toBeVisible();
    expect(screen.queryByRole("combobox")).toBeNull();
  });

  it("uses explicit highlight wording without inventing popularity claims", () => {
    render(<PricingPlans plans={plans} title="Offers" />);
    expect(screen.getByRole("article", { name: "Studio" })).toHaveAttribute(
      "data-highlighted",
      "true",
    );
    expect(screen.getByText("For your team")).toBeVisible();
    expect(screen.getByRole("article", { name: "Launch" })).not.toHaveAttribute(
      "data-highlighted",
    );
    expect(screen.queryByText(/popular|recommended|save \d/iu)).toBeNull();
  });

  it("preserves action refs, callbacks, focus and native link destinations", () => {
    const select = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <PricingPlans
        plans={[
          plans[0],
          {
            ...plans[1],
            action: (
              <button onClick={select} ref={ref} type="button">
                Choose Studio
              </button>
            ),
          },
        ]}
        title="Offers"
      />,
    );
    expect(select).not.toHaveBeenCalled();
    const link = screen.getByRole("link", { name: "Explore Launch" });
    expect(link).toHaveAttribute("href", "/sample-launch");
    const button = screen.getByRole("button", { name: "Choose Studio" });
    expect(ref.current).toBe(button);
    button.focus();
    fireEvent.click(button);
    expect(select).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
  });

  it("keeps disabled consumer actions disabled", () => {
    const select = vi.fn();
    render(
      <PricingPlans
        plans={[
          {
            ...plans[0],
            action: (
              <button disabled onClick={select} type="button">
                Unavailable
              </button>
            ),
          },
        ]}
        title="Offers"
      />,
    );
    const button = screen.getByRole("button", { name: "Unavailable" });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(select).not.toHaveBeenCalled();
  });

  it("emits a period request without owning selection or changing prices", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <PricingPlans
        period={{ ...period, onValueChange }}
        plans={plans}
        title="Offers"
      />,
    );
    const select = screen.getByRole("combobox", { name: "Billing period" });
    expect(select).toHaveValue("monthly");
    expect(onValueChange).not.toHaveBeenCalled();
    select.focus();
    fireEvent.change(select, { target: { value: "yearly" } });
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(onValueChange).toHaveBeenCalledWith("yearly");
    expect(select).toHaveValue("monthly");
    expect(select).toHaveFocus();
    expect(screen.getByText("$12")).toBeVisible();

    rerender(
      <PricingPlans
        period={{ ...period, value: "yearly", onValueChange }}
        plans={[
          {
            ...plans[0],
            price: "$120",
            priceSuffix: "/ year",
            billingNote: "Annual total, billed once.",
          },
        ]}
        title="Offers"
      />,
    );
    expect(select).toHaveValue("yearly");
    expect(screen.getByText("$120")).toBeVisible();
    expect(screen.getByText("Annual total, billed once.")).toBeVisible();
    expect(screen.queryByText("$12")).toBeNull();
  });

  it.each(["monthly", "quarterly", "unknown"])(
    "ignores unchanged, disabled or unknown option %s",
    (value) => {
      const onValueChange = vi.fn();
      render(
        <PricingPlans
          period={{ ...period, onValueChange }}
          plans={plans}
          title="Offers"
        />,
      );
      fireEvent.change(screen.getByRole("combobox"), { target: { value } });
      expect(onValueChange).not.toHaveBeenCalled();
    },
  );

  it("exposes native disabled control and option semantics", () => {
    const onValueChange = vi.fn();
    render(
      <PricingPlans
        period={{ ...period, disabled: true, onValueChange }}
        plans={plans}
        title="Offers"
      />,
    );
    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
    expect(screen.getByRole("option", { name: "Quarterly" })).toBeDisabled();
    fireEvent.change(select, { target: { value: "yearly" } });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("does not silently select the first option for an invalid value", () => {
    const onValueChange = vi.fn();
    render(
      <PricingPlans
        period={{ ...period, value: "missing", onValueChange }}
        plans={plans}
        title="Offers"
      />,
    );
    expect(screen.getByRole("combobox")).toHaveValue("");
    const placeholder = screen.getByRole("option", { name: "Billing period" });
    expect(placeholder).toBeDisabled();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("hides a period control with no options", () => {
    render(
      <PricingPlans
        period={{ ...period, options: [] }}
        plans={plans}
        title="Offers"
      />,
    );
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("renders an explicit empty result without offers or a selector", () => {
    const { rerender } = render(
      <PricingPlans period={period} plans={[]} title="Offers" />,
    );
    expect(screen.getByText("No plans are available.")).toBeVisible();
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(screen.queryByRole("list")).toBeNull();
    rerender(
      <PricingPlans
        emptyMessage="Contact your administrator for available offers."
        plans={[]}
        title="Offers"
      />,
    );
    expect(screen.getByText(/Contact your administrator/u)).toBeVisible();
  });

  it("keeps labels unique between instances and stable when offers reorder", () => {
    const { container, rerender } = render(
      <>
        <PricingPlans period={period} plans={plans} title="First comparison" />
        <PricingPlans period={period} plans={plans} title="Second comparison" />
      </>,
    );
    const ids = Array.from(container.querySelectorAll("[id]"), (el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    const first = screen.getByRole("region", { name: "First comparison" });
    const launchId = within(first)
      .getByRole("article", { name: "Launch" })
      .getAttribute("aria-labelledby");
    rerender(
      <>
        <PricingPlans
          period={period}
          plans={[plans[1], plans[0]]}
          title="First comparison"
        />
        <PricingPlans period={period} plans={plans} title="Second comparison" />
      </>,
    );
    expect(
      within(first).getByRole("article", { name: "Launch" }),
    ).toHaveAttribute("aria-labelledby", launchId);
  });

  it("preserves long content and consumer root overrides", () => {
    const name = "An offer with a long consumer-owned name";
    const note = "Long billing terms stay visible rather than being truncated.";
    render(
      <PricingPlans
        className="space-y-8"
        plans={[{ ...plans[0], name, billingNote: note, features: [] }]}
        title="Offers"
      />,
    );
    expect(screen.getByRole("region")).toHaveClass("space-y-8", "min-w-0");
    expect(screen.getByRole("article", { name })).toHaveTextContent(note);
    expect(within(screen.getByRole("article")).queryByRole("list")).toBeNull();
  });

  it("runs the fictional example through period and action transitions", () => {
    render(<PricingPlansExample />);
    expect(screen.getByText(/not PyColors product prices/u)).toBeVisible();
    const select = screen.getByRole("combobox", {
      name: "Sample billing period",
    });
    fireEvent.change(select, { target: { value: "yearly" } });
    expect(select).toHaveValue("yearly");
    expect(screen.getByText("$120")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Try Launch example" }));
    expect(screen.getByText(/Selected Launch \(yearly\)/u)).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Contact is not connected" }),
    ).toBeDisabled();
    fireEvent.change(select, { target: { value: "monthly" } });
    expect(screen.queryByText(/Selected Launch/u)).toBeNull();
    expect(screen.getByText("$12")).toBeVisible();
  });

  it("has no detectable accessibility violations for representative offers", async () => {
    const { container } = render(
      <PricingPlans period={period} plans={plans} title="Offers" />,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});

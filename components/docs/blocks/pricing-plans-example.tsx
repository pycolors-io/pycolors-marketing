"use client";

import * as React from "react";
import { Button } from "@pycolors/ui";

import {
  PricingPlans,
  type PricingPlan,
} from "../../../content/blocks/commerce/pricing-plans";

const rates = {
  monthly: {
    launch: "$12",
    studio: "$29",
    suffix: "/ month",
    note: "Fictional monthly charge. No purchase is available.",
  },
  yearly: {
    launch: "$120",
    studio: "$290",
    suffix: "/ year",
    note: "Fictional annual total, billed once per year.",
  },
} as const;

export function PricingPlansExample() {
  const [period, setPeriod] = React.useState<"monthly" | "yearly">("monthly");
  const [selection, setSelection] = React.useState<string>();
  const rate = rates[period];
  const plans = [
    {
      id: "launch",
      name: "Launch",
      description: "A fictional offer for a small project.",
      price: rate.launch,
      priceSuffix: rate.suffix,
      billingNote: rate.note,
      features: [
        { id: "projects", label: "One sample project" },
        { id: "exports", label: "Sample export tools" },
      ],
      action: (
        <Button
          onClick={() => setSelection(`Launch (${period})`)}
          type="button"
          variant="outline"
        >
          Try Launch example
        </Button>
      ),
    },
    {
      id: "studio",
      name: "Studio",
      description: "A fictional offer for a growing team.",
      price: rate.studio,
      priceSuffix: rate.suffix,
      billingNote: rate.note,
      highlight: "Featured example",
      features: [
        { id: "projects", label: "Ten sample projects" },
        { id: "collaboration", label: "Sample collaboration tools" },
        { id: "exports", label: "Sample export tools" },
      ],
      action: (
        <Button
          onClick={() => setSelection(`Studio (${period})`)}
          type="button"
        >
          Try Studio example
        </Button>
      ),
    },
    {
      id: "custom",
      name: "Custom",
      description: "An example of a non-numeric, consumer-owned price.",
      price: "Let's talk",
      billingNote: "Scope and terms would be agreed separately.",
      features: [{ id: "scope", label: "A tailored sample scope" }],
      action: (
        <Button disabled type="button" variant="outline">
          Contact is not connected
        </Button>
      ),
      footnote: "This disabled action does not contact a team.",
    },
  ] satisfies readonly PricingPlan[];

  return (
    <div className="not-prose space-y-4">
      <PricingPlans
        description="Fictional offers only, not PyColors product prices. No purchase or network request occurs."
        period={{
          label: "Sample billing period",
          value: period,
          options: [
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ],
          onValueChange: (value) => {
            if (value === "monthly" || value === "yearly") {
              setPeriod(value);
              setSelection(undefined);
            }
          },
        }}
        plans={plans}
        title="Explore the pricing pattern"
      />
      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {selection
          ? `Selected ${selection} in local demo state. Nothing was purchased.`
          : "Choose an example to preview a consumer-owned action."}
      </p>
    </div>
  );
}

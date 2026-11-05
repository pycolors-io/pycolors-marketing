"use client";

import { useCopy } from "@/lib/i18n/use-copy";
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
  const tSite = useCopy();

  const [period, setPeriod] = React.useState<"monthly" | "yearly">("monthly");
  const [selection, setSelection] = React.useState<string>();
  const rate = rates[period];
  const plans = [
    {
      id: "launch",
      name: "Launch",
      description: tSite("A fictional offer for a small project."),
      price: rate.launch,
      priceSuffix: tSite(rate.suffix),
      billingNote: tSite(rate.note),
      features: [
        { id: "projects", label: tSite("One sample project") },
        { id: "exports", label: tSite("Sample export tools") },
      ],
      action: (
        <Button
          onClick={() => setSelection(`Launch (${tSite(period)})`)}
          type="button"
          variant="outline"
        >
          {tSite("Try Launch example")}
        </Button>
      ),
    },
    {
      id: "studio",
      name: "Studio",
      description: tSite("A fictional offer for a growing team."),
      price: rate.studio,
      priceSuffix: tSite(rate.suffix),
      billingNote: tSite(rate.note),
      highlight: tSite("Featured example"),
      features: [
        { id: "projects", label: tSite("Ten sample projects") },
        { id: "collaboration", label: tSite("Sample collaboration tools") },
        { id: "exports", label: tSite("Sample export tools") },
      ],
      action: (
        <Button
          onClick={() => setSelection(`Studio (${tSite(period)})`)}
          type="button"
        >
          {tSite("Try Studio example")}
        </Button>
      ),
    },
    {
      id: "custom",
      name: tSite("Custom"),
      description: tSite("An example of a non-numeric, consumer-owned price."),
      price: tSite("Let's talk"),
      billingNote: tSite("Scope and terms would be agreed separately."),
      features: [{ id: "scope", label: tSite("A tailored sample scope") }],
      action: (
        <Button disabled type="button" variant="outline">
          {tSite("Contact is not connected")}
        </Button>
      ),
      footnote: tSite("This disabled action does not contact a team."),
    },
  ] satisfies readonly PricingPlan[];

  return (
    <div className="not-prose space-y-4">
      <PricingPlans
        description={tSite(
          "Fictional offers only, not PyColors product prices. No purchase or network request occurs.",
        )}
        period={{
          label: tSite("Sample billing period"),
          value: period,
          options: [
            { value: "monthly", label: tSite("Monthly") },
            { value: "yearly", label: tSite("Yearly") },
          ],
          onValueChange: (value) => {
            if (value === "monthly" || value === "yearly") {
              setPeriod(value);
              setSelection(undefined);
            }
          },
        }}
        plans={plans}
        title={tSite("Explore the pricing pattern")}
      />
      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {tSite(
          selection
            ? tSite(
                "Selected {value0} in local demo state. Nothing was purchased.",
                { value0: selection },
              )
            : "Choose an example to preview a consumer-owned action.",
        )}
      </p>
    </div>
  );
}

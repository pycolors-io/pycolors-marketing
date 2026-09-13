"use client";

import * as React from "react";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
} from "@pycolors/ui";

export type PricingPlanFeature = Readonly<{
  id: string;
  label: string;
}>;

export type PricingPlan = Readonly<{
  id: string;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  billingNote?: string;
  highlight?: string;
  features: readonly PricingPlanFeature[];
  action: React.ReactNode;
  footnote?: string;
}>;

export type PricingPeriodOption = Readonly<{
  value: string;
  label: string;
  disabled?: boolean;
}>;

export type PricingPeriodControl = Readonly<{
  label: string;
  value: string;
  options: readonly PricingPeriodOption[];
  onValueChange: (value: string) => void;
  disabled?: boolean;
}>;

export type PricingPlansProps = Readonly<{
  title: string;
  description?: string;
  plans: readonly PricingPlan[];
  period?: PricingPeriodControl;
  emptyMessage?: string;
  className?: string;
}>;

/** Present consumer-owned offers without price calculations or purchases. */
export function PricingPlans({
  title,
  description,
  plans,
  period,
  emptyMessage = "No plans are available.",
  className,
}: PricingPlansProps) {
  const id = React.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const periodId = `${id}-period`;
  const selectedPeriod = period?.options.find(
    (option) => option.value === period.value,
  );

  return (
    <section
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cn("min-w-0 space-y-6", className)}
      data-slot="pricing-plans"
    >
      <div className="space-y-2">
        <h2 className="break-words text-2xl font-semibold" id={titleId}>
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground" id={descriptionId}>
            {description}
          </p>
        ) : null}
      </div>

      {plans.length === 0 ? (
        <p className="text-muted-foreground" data-slot="pricing-plans-empty">
          {emptyMessage}
        </p>
      ) : (
        <>
          {period && period.options.length > 0 ? (
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <label className="text-sm font-medium" htmlFor={periodId}>
                {period.label}
              </label>
              <select
                className={cn(
                  "min-h-11 min-w-0 max-w-full rounded-md border",
                  "border-input bg-background px-3 py-2 text-sm",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring disabled:opacity-50",
                )}
                disabled={period.disabled}
                id={periodId}
                onChange={(event) => {
                  const next = period.options.find(
                    (option) => option.value === event.currentTarget.value,
                  );
                  if (
                    next &&
                    !next.disabled &&
                    !period.disabled &&
                    next.value !== period.value
                  ) {
                    period.onValueChange(next.value);
                  }
                }}
                value={selectedPeriod ? period.value : ""}
              >
                {!selectedPeriod ? (
                  <option disabled value="">
                    {period.label}
                  </option>
                ) : null}
                {period.options.map((option) => (
                  <option
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <ul
            className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3"
            data-slot="pricing-plans-list"
            role="list"
          >
            {plans.map((plan) => {
              const planTitleId = `${id}-plan-${encodeURIComponent(plan.id)}`;

              return (
                <li className="min-w-0" key={plan.id}>
                  <Card
                    asChild
                    className={cn(
                      "flex h-full min-w-0 flex-col break-words",
                      plan.highlight && "border-primary ring-1 ring-primary",
                    )}
                  >
                    <article
                      aria-labelledby={planTitleId}
                      data-highlighted={plan.highlight ? "true" : undefined}
                      data-slot="pricing-plan"
                    >
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle id={planTitleId}>{plan.name}</CardTitle>
                          {plan.highlight ? (
                            <Badge variant="outline">{plan.highlight}</Badge>
                          ) : null}
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                        <p className="pt-3">
                          <span className="text-3xl font-semibold">
                            {plan.price}
                          </span>{" "}
                          {plan.priceSuffix ? (
                            <span className="text-sm text-muted-foreground">
                              {plan.priceSuffix}
                            </span>
                          ) : null}
                        </p>
                        {plan.billingNote ? (
                          <p className="text-sm text-muted-foreground">
                            {plan.billingNote}
                          </p>
                        ) : null}
                      </CardHeader>
                      <CardContent className="flex-1">
                        {plan.features.length > 0 ? (
                          <ul className="list-disc space-y-2 pl-5 text-sm">
                            {plan.features.map((feature) => (
                              <li key={feature.id}>{feature.label}</li>
                            ))}
                          </ul>
                        ) : null}
                      </CardContent>
                      <CardFooter className="flex-col items-stretch gap-3">
                        {plan.action}
                        {plan.footnote ? (
                          <p className="text-sm text-muted-foreground">
                            {plan.footnote}
                          </p>
                        ) : null}
                      </CardFooter>
                    </article>
                  </Card>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}

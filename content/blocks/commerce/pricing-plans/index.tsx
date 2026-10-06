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
        <h2
          className="break-words text-xl font-semibold tracking-tight"
          id={titleId}
        >
          {title}
        </h2>
        {description ? (
          <p
            className="text-sm leading-6 text-muted-foreground"
            id={descriptionId}
          >
            {description}
          </p>
        ) : null}
      </div>

      {plans.length === 0 ? (
        <p
          className="text-sm leading-6 text-muted-foreground"
          data-slot="pricing-plans-empty"
        >
          {emptyMessage}
        </p>
      ) : (
        <>
          {period && period.options.length > 0 ? (
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <label className="text-sm font-medium" htmlFor={periodId}>
                {period.label}
              </label>
              <span className="relative inline-grid min-w-24 max-w-full">
                <select
                  className="h-11 w-full min-w-0 appearance-none truncate rounded-[5px] border border-input bg-background py-2 pl-3 pr-9 text-base leading-5 text-foreground shadow-xs outline-none transition-colors hover:border-border focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm motion-reduce:transition-none"
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
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
                >
                  <path
                    d="m4 6 4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
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
                <li
                  className="row-span-6 grid min-w-0 grid-rows-subgrid"
                  key={plan.id}
                >
                  <Card
                    asChild
                    className={cn(
                      "row-span-6 grid h-full min-w-0 grid-rows-subgrid gap-0 rounded-[5px] border-border bg-background break-words",
                      plan.highlight && "border-primary",
                    )}
                  >
                    <article
                      aria-labelledby={planTitleId}
                      data-highlighted={plan.highlight ? "true" : undefined}
                      data-slot="pricing-plan"
                    >
                      <CardHeader className="contents">
                        <div className="flex flex-wrap items-center gap-2 px-5 pt-5 sm:px-6 sm:pt-6">
                          <CardTitle id={planTitleId}>{plan.name}</CardTitle>
                          {plan.highlight ? (
                            <Badge
                              variant="outline"
                              className="h-auto max-w-full whitespace-normal rounded-md text-[10px]"
                            >
                              {plan.highlight}
                            </Badge>
                          ) : null}
                        </div>
                        <CardDescription className="px-5 pt-2 leading-6 sm:px-6">
                          {plan.description}
                        </CardDescription>
                        <p className="px-5 pt-6 sm:px-6">
                          <span className="text-3xl font-semibold tracking-tight tabular-nums">
                            {plan.price}
                          </span>{" "}
                          {plan.priceSuffix ? (
                            <span className="text-sm leading-6 text-muted-foreground">
                              {plan.priceSuffix}
                            </span>
                          ) : null}
                        </p>
                        <p className="px-5 pt-2 text-xs leading-6 text-muted-foreground sm:px-6">
                          {plan.billingNote}
                        </p>
                      </CardHeader>
                      <CardContent className="px-5 pt-6 pb-6 sm:px-6">
                        {plan.features.length > 0 ? (
                          <ul
                            className="list-none space-y-3 p-0 text-sm leading-6"
                            role="list"
                          >
                            {plan.features.map((feature) => (
                              <li
                                className="flex items-start gap-2.5"
                                key={feature.id}
                              >
                                <span
                                  aria-hidden="true"
                                  className="text-muted-foreground"
                                >
                                  ✓
                                </span>
                                <span className="min-w-0">{feature.label}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </CardContent>
                      <CardFooter className="flex-col items-stretch justify-start gap-3 border-t border-border p-5 sm:p-6 [&>button]:min-h-11 [&>a]:min-h-11 [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:break-words">
                        {plan.action}
                        {plan.footnote ? (
                          <p className="text-xs leading-6 text-muted-foreground">
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

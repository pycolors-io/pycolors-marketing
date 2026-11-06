"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { useId, useState } from "react";
import { Button } from "@pycolors/ui";
import { OnboardingChecklist } from "@/content/blocks/account/onboarding-checklist";

const steps = [
  {
    id: "workspace",
    title: "Create your workspace",
    description: "Give your team a shared place to work.",
  },
  {
    id: "project",
    title: "Set up your first project",
    description: "Add a project to organize your next release.",
  },
  {
    id: "team",
    title: "Bring your team together",
    description: "Choose the people who will collaborate with you.",
  },
];

export function OnboardingChecklistExample({
  headingLevel = 3,
}: Readonly<{ headingLevel?: 2 | 3 | 4 | 5 | 6 }>) {
  const tSite = useCopy();

  const id = useId();
  const [completed, setCompleted] = useState<string[]>(["workspace"]);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <OnboardingChecklist
        completedLabel={tSite("Completed")}
        incompleteLabel={tSite("To do")}
        emptyMessage={tSite("No setup steps available.")}
        id={`setup-${id}`}
        heading={tSite("A great workspace starts here")}
        headingLevel={headingLevel}
        description={tSite(
          "Track the first steps that help your team get started.",
        )}
        steps={steps.map((step) => ({
          ...step,
          title: tSite(step.title),
          description: tSite(step.description),
          complete: completed.includes(step.id),
          action: (
            <Button
              aria-label={tSite("{value0} {value1}", {
                value0: tSite(
                  completed.includes(step.id) ? "Undo" : "Complete",
                ),
                value1: tSite(step.title).toLocaleLowerCase(tSite.locale),
              })}
              className="h-auto min-h-10 text-xs"
              variant="outline"
              type="button"
              onClick={() =>
                setCompleted((current) =>
                  current.includes(step.id)
                    ? current.filter((value) => value !== step.id)
                    : [...current, step.id],
                )
              }
            >
              {tSite(completed.includes(step.id) ? "Undo" : "Mark as done")}
            </Button>
          ),
        }))}
      />
      <p className="text-xs leading-6 text-muted-foreground" role="status">
        {tSite("Demo only · ")}
        {tSite(completed.length)} {tSite(" of ")}
        {tSite(steps.length)}{" "}
        {tSite(
          " steps completed locally. No workspace, project or invitation is created.",
        )}
      </p>
      <Button
        variant="ghost"
        className="h-auto min-h-10 text-xs"
        type="button"
        onClick={() => setCompleted(["workspace"])}
      >
        {tSite("Reset checklist")}
      </Button>
    </div>
  );
}

"use client";

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
  const id = useId();
  const [completed, setCompleted] = useState<string[]>(["workspace"]);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <OnboardingChecklist
        id={`setup-${id}`}
        heading="A great workspace starts here"
        headingLevel={headingLevel}
        description="Track the first steps that help your team get started."
        steps={steps.map((step) => ({
          ...step,
          complete: completed.includes(step.id),
          action: (
            <Button
              aria-label={`${completed.includes(step.id) ? "Undo" : "Complete"} ${step.title.toLowerCase()}`}
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
              {completed.includes(step.id) ? "Undo" : "Mark as done"}
            </Button>
          ),
        }))}
      />
      <p className="text-xs leading-6 text-muted-foreground" role="status">
        Demo only · {completed.length} of {steps.length} steps completed
        locally. No workspace, project or invitation is created.
      </p>
      <Button
        variant="ghost"
        className="h-auto min-h-10 text-xs"
        type="button"
        onClick={() => setCompleted(["workspace"])}
      >
        Reset checklist
      </Button>
    </div>
  );
}

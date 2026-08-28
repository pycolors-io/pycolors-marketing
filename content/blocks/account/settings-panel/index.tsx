"use client";

import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
  cn,
} from "@pycolors/ui";

type SettingsPanelFieldBase = Readonly<{
  id: string;
  name: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  description?: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
}>;

export type SettingsPanelField =
  | (SettingsPanelFieldBase &
      Readonly<{
        kind?: "input";
        type?: "text" | "email" | "url" | "tel";
      }>)
  | (SettingsPanelFieldBase &
      Readonly<{
        kind: "textarea";
        rows?: number;
      }>);

export type SettingsPanelSection = Readonly<{
  id: string;
  title: string;
  description?: string;
  fields: readonly SettingsPanelField[];
}>;

export type SettingsPanelFeedback = Readonly<{
  status: "success" | "error";
  title: string;
  description?: string;
}>;

export type SettingsPanelProps = Readonly<{
  title: string;
  description?: string;
  sections: readonly SettingsPanelSection[];
  submitLabel: string;
  submitting?: boolean;
  submittingLabel?: string;
  submitDisabled?: boolean;
  feedback?: SettingsPanelFeedback;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}>;

type SettingsFieldControlProps = Readonly<{
  controlId: string;
  field: SettingsPanelField;
  submitting: boolean;
}>;

function SettingsFieldControl({
  controlId,
  field,
  submitting,
}: SettingsFieldControlProps) {
  const sharedProps = {
    autoComplete: field.autoComplete,
    disabled: submitting || field.disabled,
    error: field.error,
    helperText: field.description,
    id: controlId,
    label: field.label,
    name: field.name,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => field.onValueChange(event.currentTarget.value),
    placeholder: field.placeholder,
    required: field.required,
    value: field.value,
  };

  if (field.kind === "textarea") {
    return <Textarea {...sharedProps} rows={field.rows} />;
  }

  return <Input {...sharedProps} type={field.type ?? "text"} />;
}

/**
 * A source-copy settings form whose values, validation, actions, and outcome
 * remain controlled by the consuming application.
 */
export function SettingsPanel({
  title,
  description,
  sections,
  submitLabel,
  submitting = false,
  submittingLabel = "Saving…",
  submitDisabled = false,
  feedback,
  onSubmit,
  className,
}: SettingsPanelProps) {
  const panelId = React.useId();
  const titleId = `${panelId}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className={cn("min-w-0", className)}
      data-slot="settings-panel"
    >
      <Card className="min-w-0 overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle id={titleId}>{title}</CardTitle>
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>

        <CardContent className="p-0">
          <form
            aria-busy={submitting || undefined}
            aria-labelledby={titleId}
            data-slot="settings-panel-form"
            noValidate
            onSubmit={onSubmit}
          >
            <div className="divide-y divide-border">
              {sections.map((section) => {
                const sectionTitleId = `${panelId}-${section.id}-title`;

                return (
                  <section
                    aria-labelledby={sectionTitleId}
                    className="grid min-w-0 gap-5 p-6 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] md:gap-8"
                    data-section-id={section.id}
                    data-slot="settings-panel-section"
                    key={section.id}
                  >
                    <div className="min-w-0">
                      <h4
                        className="text-sm font-semibold text-foreground"
                        id={sectionTitleId}
                      >
                        {section.title}
                      </h4>
                      {section.description ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                      {section.fields.map((field) => (
                        <div
                          className={cn(
                            "min-w-0",
                            field.kind === "textarea" && "sm:col-span-2",
                          )}
                          data-field-id={field.id}
                          data-slot="settings-panel-field"
                          key={field.id}
                        >
                          <SettingsFieldControl
                            controlId={`${panelId}-${field.id}`}
                            field={field}
                            submitting={submitting}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <div
              className="flex min-w-0 flex-col gap-4 border-t border-border bg-muted/20 p-6 sm:flex-row sm:items-center sm:justify-between"
              data-slot="settings-panel-actions"
            >
              <div className="min-w-0 flex-1">
                {feedback ? (
                  <Alert
                    ariaLive={
                      feedback.status === "error" ? "assertive" : "polite"
                    }
                    data-slot="settings-panel-feedback"
                    variant={
                      feedback.status === "error" ? "destructive" : "success"
                    }
                  >
                    <AlertTitle>{feedback.title}</AlertTitle>
                    {feedback.description ? (
                      <AlertDescription>
                        {feedback.description}
                      </AlertDescription>
                    ) : null}
                  </Alert>
                ) : null}
              </div>

              <Button
                className="w-full sm:w-auto"
                disabled={submitting || submitDisabled}
                type="submit"
              >
                {submitting ? submittingLabel : submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

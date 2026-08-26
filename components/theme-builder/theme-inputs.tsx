import type { ReactNode } from "react";

import { SIX_DIGIT_HEX_COLOR_PATTERN } from "@pycolors/color-engine";
import { Input as UiInput } from "@pycolors/ui";

import type {
  ThemeBuilderDraft,
  ThemeBuilderField,
  ThemeBuilderFieldErrors,
} from "./theme-builder-state";

type ThemeInputsProps = Readonly<{
  draft: ThemeBuilderDraft;
  errors: ThemeBuilderFieldErrors;
  onFieldChange: (field: ThemeBuilderField, value: string) => void;
}>;

type ColorFieldProps = Readonly<{
  field: Extract<
    ThemeBuilderField,
    "brandColor" | "neutralColor" | "lightBackgroundColor"
  >;
  label: string;
  helperText: string;
  required?: boolean;
  value: string;
  error?: string;
  pickerFallback: string;
  onFieldChange: ThemeInputsProps["onFieldChange"];
}>;

type ThemeSettingProps = Readonly<{
  title: string;
  description: string;
  children: ReactNode;
}>;

function ThemeSetting({ title, description, children }: ThemeSettingProps) {
  return (
    <div className="min-w-0 border-b border-border-subtle p-4 last:border-b-0">
      <div className="space-y-1">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground">
          {title}
        </h3>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ColorField({
  field,
  label,
  helperText,
  required = false,
  value,
  error,
  pickerFallback,
  onFieldChange,
}: ColorFieldProps) {
  const inputId = `theme-builder-${field}`;
  const pickerValue = SIX_DIGIT_HEX_COLOR_PATTERN.test(value)
    ? value
    : pickerFallback;

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_3.25rem] gap-2.5 items-end">
      <UiInput
        id={inputId}
        label={label}
        size="md"
        required={required}
        value={value}
        error={error}
        helperText={helperText}
        onChange={(event) => onFieldChange(field, event.target.value)}
        spellCheck={false}
        autoCapitalize="off"
      />

      <div className="grid gap-1.5">
        <label
          htmlFor={`${inputId}-picker`}
          className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
        >
          Color
        </label>
        <input
          id={`${inputId}-picker`}
          type="color"
          value={pickerValue}
          onChange={(event) => onFieldChange(field, event.target.value)}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-helper`}
          className="h-11 w-full min-w-20 cursor-pointer rounded-[5px] border border-input bg-background p-1 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

export function ThemeInputs({
  draft,
  errors,
  onFieldChange,
}: ThemeInputsProps) {
  return (
    <fieldset className="overflow-hidden rounded-[4px] border border-border-subtle bg-background">
      <legend className="sr-only">Theme settings</legend>

      <ThemeSetting
        title="Brand color"
        description="Required source for both generated modes."
      >
        <ColorField
          field="brandColor"
          label="Hex value"
          required
          value={draft.brandColor}
          error={errors.brandColor}
          helperText="Required · #RRGGBB"
          pickerFallback="#6a30d4"
          onFieldChange={onFieldChange}
        />
      </ThemeSetting>

      <ThemeSetting
        title="Theme name"
        description="Optional label included in generated metadata."
      >
        <UiInput
          id="theme-builder-name"
          label="Name"
          value={draft.name}
          error={errors.name}
          helperText="Optional"
          onChange={(event) => onFieldChange("name", event.target.value)}
          maxLength={64}
        />
      </ThemeSetting>

      <ThemeSetting
        title="Neutral hue"
        description="Optional tonal balance for the generated scale."
      >
        <ColorField
          field="neutralColor"
          label="Hex value"
          value={draft.neutralColor}
          error={errors.neutralColor}
          helperText="Optional · derives from brand"
          pickerFallback="#71717a"
          onFieldChange={onFieldChange}
        />
      </ThemeSetting>

      <ThemeSetting
        title="Light canvas"
        description="Optional base for the light-mode background."
      >
        <ColorField
          field="lightBackgroundColor"
          label="Hex value"
          value={draft.lightBackgroundColor}
          error={errors.lightBackgroundColor}
          helperText="Optional · engine default"
          pickerFallback="#ffffff"
          onFieldChange={onFieldChange}
        />
      </ThemeSetting>
    </fieldset>
  );
}

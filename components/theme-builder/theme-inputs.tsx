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
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <UiInput
        id={inputId}
        label={label}
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
          className="text-sm font-medium text-foreground"
        >
          Color picker
        </label>
        <input
          id={`${inputId}-picker`}
          type="color"
          value={pickerValue}
          onChange={(event) => onFieldChange(field, event.target.value)}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-helper`}
          className="h-11 w-full min-w-20 cursor-pointer rounded-md border border-input bg-background p-1 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-20"
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
    <fieldset className="grid gap-5">
      <legend className="text-base font-semibold tracking-tight text-foreground">
        Theme inputs
      </legend>

      <ColorField
        field="brandColor"
        label="Brand color"
        required
        value={draft.brandColor}
        error={errors.brandColor}
        helperText="Required. Enter a six-digit hexadecimal color such as #6a30d4."
        pickerFallback="#6a30d4"
        onFieldChange={onFieldChange}
      />

      <UiInput
        id="theme-builder-name"
        label="Theme name (optional)"
        value={draft.name}
        error={errors.name}
        helperText="Optional. Used for deterministic theme metadata."
        onChange={(event) => onFieldChange("name", event.target.value)}
        maxLength={64}
      />

      <ColorField
        field="neutralColor"
        label="Neutral color (optional)"
        value={draft.neutralColor}
        error={errors.neutralColor}
        helperText="Optional. Leave empty to derive a conservative neutral from the brand hue."
        pickerFallback="#71717a"
        onFieldChange={onFieldChange}
      />

      <ColorField
        field="lightBackgroundColor"
        label="Light background color (optional)"
        value={draft.lightBackgroundColor}
        error={errors.lightBackgroundColor}
        helperText="Optional. Leave empty to use the engine default light background."
        pickerFallback="#ffffff"
        onFieldChange={onFieldChange}
      />
    </fieldset>
  );
}

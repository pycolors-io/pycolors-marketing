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
  field: Exclude<ThemeBuilderField, "name">;
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
    <div className="grid min-w-0 max-w-md grid-cols-[minmax(0,1fr)_2.75rem] items-start gap-2">
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

      <div className="pt-6">
        <label htmlFor={`${inputId}-picker`} className="sr-only">
          Choose {label.toLowerCase()}
        </label>
        <input
          id={`${inputId}-picker`}
          type="color"
          value={pickerValue}
          onChange={(event) => onFieldChange(field, event.target.value)}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-helper`}
          className="h-11 w-11 cursor-pointer rounded-[4px] border border-input bg-background p-1 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
    <fieldset className="min-w-0 space-y-5">
      <legend className="sr-only">Theme settings</legend>

      <ColorField
        field="brandColor"
        label="Brand color"
        required
        value={draft.brandColor}
        error={errors.brandColor}
        helperText="Your primary color · #RRGGBB"
        pickerFallback="#6a30d4"
        onFieldChange={onFieldChange}
      />
      <ColorField
        field="neutralColor"
        label="Neutral color"
        value={draft.neutralColor}
        error={errors.neutralColor}
        helperText="Optional · derives from your brand"
        pickerFallback="#71717a"
        onFieldChange={onFieldChange}
      />
      <ColorField
        field="lightBackgroundColor"
        label="Light background"
        value={draft.lightBackgroundColor}
        error={errors.lightBackgroundColor}
        helperText="Light mode only · leave empty for automatic"
        pickerFallback="#fafafa"
        onFieldChange={onFieldChange}
      />
      <UiInput
        id="theme-builder-name"
        label="Theme name"
        value={draft.name}
        error={errors.name}
        helperText="Optional · included in your export"
        onChange={(event) => onFieldChange("name", event.target.value)}
        maxLength={64}
        className="max-w-md"
      />
    </fieldset>
  );
}

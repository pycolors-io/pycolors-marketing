import {
  generateTheme,
  validateThemeInput,
  type InputError,
  type SerializedThemeResult,
  type ThemeInput,
  type ThemeMode,
} from "@pycolors/color-engine";

export type ThemeBuilderDraft = Readonly<{
  brandColor: string;
  name: string;
  neutralColor: string;
  lightBackgroundColor: string;
}>;

export type ThemeBuilderField = keyof ThemeBuilderDraft;

export type ThemeBuilderFieldErrors = Readonly<
  Partial<Record<ThemeBuilderField, string>>
>;

export type ThemeBuilderState = Readonly<{
  draft: ThemeBuilderDraft;
  previewMode: ThemeMode;
  generatedTheme: SerializedThemeResult;
  fieldErrors: ThemeBuilderFieldErrors;
  generationError: string | null;
}>;

/**
 * These defaults match the existing PyColors violet branding, use a generated
 * neutral, and use a restrained off-white light background that remains
 * explicit and reproducible.
 */
export const THEME_BUILDER_DEFAULTS: ThemeBuilderDraft = {
  brandColor: "#6a30d4",
  name: "PyColors Theme",
  neutralColor: "",
  lightBackgroundColor: "#fafafa",
};

export const DEFAULT_THEME_BUILDER_MODE: ThemeMode = "light";

function toThemeInput(draft: ThemeBuilderDraft): ThemeInput {
  return {
    brandColor: draft.brandColor,
    ...(draft.name === "" ? {} : { name: draft.name }),
    ...(draft.neutralColor === "" ? {} : { neutralColor: draft.neutralColor }),
    ...(draft.lightBackgroundColor === ""
      ? {}
      : { lightBackgroundColor: draft.lightBackgroundColor }),
  };
}

function inputErrorsByField(
  errors: readonly InputError[],
): ThemeBuilderFieldErrors {
  return errors.reduce<Partial<Record<ThemeBuilderField, string>>>(
    (result, error) => {
      result[error.field] = error.message;
      return result;
    },
    {},
  );
}

type DraftEvaluation =
  | Readonly<{
      ok: true;
      generatedTheme: SerializedThemeResult;
    }>
  | Readonly<{
      ok: false;
      fieldErrors: ThemeBuilderFieldErrors;
      generationError: string | null;
    }>;

function evaluateDraft(draft: ThemeBuilderDraft): DraftEvaluation {
  const validated = validateThemeInput(toThemeInput(draft));
  if (!validated.ok) {
    return {
      ok: false,
      fieldErrors: inputErrorsByField(validated.errors),
      generationError: null,
    };
  }

  const generated = generateTheme(validated.value);
  if (!generated.ok) {
    return {
      ok: false,
      fieldErrors: {},
      generationError: generated.errors.map((error) => error.message).join(" "),
    };
  }

  return { ok: true, generatedTheme: generated.value };
}

/** Creates deterministic editor state without browser, URL, or storage input. */
export function createThemeBuilderState(): ThemeBuilderState {
  const initialEvaluation = evaluateDraft(THEME_BUILDER_DEFAULTS);
  if (!initialEvaluation.ok) {
    throw new Error(
      "Theme Builder defaults must remain valid according to the engine contract.",
    );
  }

  return {
    draft: THEME_BUILDER_DEFAULTS,
    previewMode: DEFAULT_THEME_BUILDER_MODE,
    generatedTheme: initialEvaluation.generatedTheme,
    fieldErrors: {},
    generationError: null,
  };
}

/**
 * Applies valid draft values immediately. Invalid user-controlled values keep
 * the prior complete theme so partial input can never corrupt the preview.
 */
export function updateThemeBuilderField(
  state: ThemeBuilderState,
  field: ThemeBuilderField,
  value: string,
): ThemeBuilderState {
  const draft = { ...state.draft, [field]: value };
  const evaluation = evaluateDraft(draft);

  if (!evaluation.ok) {
    return {
      ...state,
      draft,
      fieldErrors: evaluation.fieldErrors,
      generationError: evaluation.generationError,
    };
  }

  return {
    ...state,
    draft,
    generatedTheme: evaluation.generatedTheme,
    fieldErrors: {},
    generationError: null,
  };
}

/** Changes the displayed mode only; both generated modes remain in memory. */
export function selectThemeBuilderMode(
  state: ThemeBuilderState,
  previewMode: ThemeMode,
): ThemeBuilderState {
  return { ...state, previewMode };
}

/** Restores the documented deterministic defaults without reloading the page. */
export function resetThemeBuilderState(): ThemeBuilderState {
  return createThemeBuilderState();
}

export type ThemeCodeLanguage = "css" | "json";
export type ThemeCodeColorScheme = "light" | "dark";

export type PrettyCodeNode =
  | Readonly<{
      type: "text";
      value: string;
    }>
  | Readonly<{
      type: "element";
      tagName: string;
      properties?: Readonly<Record<string, unknown>>;
      children: readonly PrettyCodeNode[];
    }>;

export type HighlightThemeCodeRequest = Readonly<{
  id: number;
  content: string;
  language: ThemeCodeLanguage;
  colorScheme: ThemeCodeColorScheme;
}>;

export type HighlightThemeCodeResponse = Readonly<{
  id: number;
  code?: readonly PrettyCodeNode[];
  error?: string;
}>;

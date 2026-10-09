export type BlockSourceFile = Readonly<{
  path: string;
  content: string;
  language: "tsx" | "ts" | "jsx" | "js" | "css" | "json";
}>;

export type BlockSource = Readonly<{
  directory: string;
  files: readonly [BlockSourceFile, ...BlockSourceFile[]];
}>;

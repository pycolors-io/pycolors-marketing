import rehypePrettyCode from "rehype-pretty-code";

import type {
  HighlightThemeCodeRequest,
  HighlightThemeCodeResponse,
  PrettyCodeNode,
} from "./theme-code-highlighter-types";

type SourceCodeNode = Readonly<{
  type: "element";
  tagName: "code";
  properties: Readonly<Record<string, unknown>>;
  children: readonly PrettyCodeNode[];
}>;

type SourceTree = Readonly<{
  type: "root";
  children: readonly [
    Readonly<{
      type: "element";
      tagName: "pre";
      properties: Readonly<Record<string, unknown>>;
      children: readonly [SourceCodeNode];
    }>,
  ];
}>;

function createSourceTree({ content, language }: HighlightThemeCodeRequest) {
  return {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: {},
        children: [
          {
            type: "element",
            tagName: "code",
            properties: { className: [`language-${language}`] },
            children: [{ type: "text", value: content }],
          },
        ],
      },
    ],
  } as const satisfies SourceTree;
}

function findCodeChildren(node: unknown): readonly PrettyCodeNode[] | null {
  if (!node || typeof node !== "object") return null;

  const candidate = node as {
    tagName?: unknown;
    children?: unknown;
  };

  if (candidate.tagName === "code" && Array.isArray(candidate.children)) {
    return candidate.children as readonly PrettyCodeNode[];
  }

  if (!Array.isArray(candidate.children)) return null;

  for (const child of candidate.children) {
    const codeChildren = findCodeChildren(child);
    if (codeChildren) return codeChildren;
  }

  return null;
}

self.addEventListener(
  "message",
  async (event: MessageEvent<HighlightThemeCodeRequest>) => {
    const request = event.data;

    try {
      const transform = rehypePrettyCode({
        theme:
          request.colorScheme === "dark"
            ? "github-dark"
            : { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      });
      const source = createSourceTree(request);
      const highlight = transform as unknown as
        ((tree: SourceTree) => Promise<unknown> | unknown) | undefined;
      if (highlight) await highlight(source);
      const code = findCodeChildren(source);

      const response: HighlightThemeCodeResponse = {
        id: request.id,
        ...(code ? { code } : { error: "No highlighted code was returned." }),
      };
      self.postMessage(response);
    } catch {
      const response: HighlightThemeCodeResponse = {
        id: request.id,
        error: "Code highlighting could not be completed.",
      };
      self.postMessage(response);
    }
  },
);

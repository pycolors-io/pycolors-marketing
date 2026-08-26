"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import type {
  HighlightThemeCodeRequest,
  HighlightThemeCodeResponse,
  PrettyCodeNode,
  ThemeCodeColorScheme,
  ThemeCodeLanguage,
} from "./theme-code-highlighter-types";

type HighlightedThemeCodeProps = Readonly<{
  content: string;
  language: ThemeCodeLanguage;
  active: boolean;
  colorScheme?: ThemeCodeColorScheme;
}>;

type PendingRequest = Readonly<{
  resolve: (code: readonly PrettyCodeNode[]) => void;
  reject: () => void;
}>;

let worker: Worker | null = null;
let nextRequestId = 0;
const pendingRequests = new Map<number, PendingRequest>();

function rejectPendingRequests() {
  for (const { reject } of pendingRequests.values()) reject();
  pendingRequests.clear();
}

function getWorker() {
  if (worker || typeof window === "undefined") return worker;

  worker = new Worker(
    new URL("./theme-code-highlighter.worker.ts", import.meta.url),
    {
      type: "module",
    },
  );
  worker.addEventListener(
    "message",
    (event: MessageEvent<HighlightThemeCodeResponse>) => {
      const { id, code, error } = event.data;
      const pending = pendingRequests.get(id);
      if (!pending) return;

      pendingRequests.delete(id);
      if (error || !code) {
        pending.reject();
        return;
      }

      pending.resolve(code);
    },
  );
  worker.addEventListener("error", () => {
    rejectPendingRequests();
    worker = null;
  });

  return worker;
}

function highlightThemeCode(
  content: string,
  language: ThemeCodeLanguage,
  colorScheme: ThemeCodeColorScheme,
) {
  const currentWorker = getWorker();
  if (!currentWorker) return Promise.reject();

  const id = ++nextRequestId;
  const request: HighlightThemeCodeRequest = {
    id,
    content,
    language,
    colorScheme,
  };

  return new Promise<readonly PrettyCodeNode[]>((resolve, reject) => {
    pendingRequests.set(id, { resolve, reject });
    currentWorker.postMessage(request);
  });
}

function toStyle(style: unknown): CSSProperties | undefined {
  if (typeof style !== "string") return undefined;

  const declarations = style
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .map((declaration) => {
      const separator = declaration.indexOf(":");
      if (separator === -1) return null;

      const property = declaration.slice(0, separator).trim();
      const value = declaration.slice(separator + 1).trim();
      if (!property || !value) return null;

      const reactProperty = property.startsWith("--")
        ? property
        : property.replace(/-([a-z])/gu, (_, character: string) =>
            character.toUpperCase(),
          );

      return [reactProperty, value] as const;
    })
    .filter((declaration): declaration is readonly [string, string] =>
      Boolean(declaration),
    );

  return declarations.length ? Object.fromEntries(declarations) : undefined;
}

function renderPrettyCode(nodes: readonly PrettyCodeNode[]): ReactNode {
  return nodes.map((node, index) => {
    if (node.type === "text") return node.value;

    const className = Array.isArray(node.properties?.className)
      ? node.properties.className
          .filter((value): value is string => typeof value === "string")
          .join(" ")
      : undefined;
    const style = toStyle(node.properties?.style);

    return (
      <span
        key={`${index}-${node.tagName}`}
        className={className}
        style={style}
      >
        {renderPrettyCode(node.children)}
      </span>
    );
  });
}

/** Runs Rehype Pretty Code in a local worker so editing remains responsive. */
export function HighlightedThemeCode({
  content,
  language,
  active,
  colorScheme = "adaptive",
}: HighlightedThemeCodeProps) {
  const [highlighted, setHighlighted] = useState<
    readonly PrettyCodeNode[] | null
  >(null);

  useEffect(() => {
    if (!active) {
      setHighlighted(null);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      void highlightThemeCode(content, language, colorScheme)
        .then((code) => {
          if (!cancelled) setHighlighted(code);
        })
        .catch(() => {
          if (!cancelled) setHighlighted(null);
        });
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [active, colorScheme, content, language]);

  return <code>{highlighted ? renderPrettyCode(highlighted) : content}</code>;
}

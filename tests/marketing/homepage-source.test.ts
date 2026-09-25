// @vitest-environment node

import { existsSync, readFileSync, realpathSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { inspectText } from "../../../../scripts/ui-explorer/contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const entry = "app/(site)/page.tsx";
// Reviewed homepage inputs. Existing checkout/consent edges stay outside the
// showcase and retain their own behavioral tests; no backend source is allowed.
const approved = new Set([
  entry,
  "components/container.tsx",
  "components/marketing/cta-panel.tsx",
  "components/marketing/page-hero.tsx",
  "components/marketing/section-header.tsx",
  "components/marketing/section-shell.tsx",
  "components/marketing/showcase/saas-showcase.tsx",
  "components/marketing/showcase/showcase-fixtures.ts",
  "components/marketing/showcase/showcase-workspace.tsx",
  "components/marketing/tones.ts",
  "components/npm-badges.tsx",
  "components/pricing/buy-starter-pro-button.tsx",
  "components/pricing/checkout-failure-notice.tsx",
  "components/privacy/consent-gated-gtm.tsx",
  "components/seo/json-ld.tsx",
  "lib/analytics.ts",
  "lib/api/client.ts",
  "lib/docs/ui-explorer.ts",
  "lib/products/public-catalog.ts",
  "lib/seo/breadcrumb.ts",
  "lib/seo/website.ts",
  "lib/version.ts",
]);
const external = new Set([
  "react",
  "next",
  "next/image",
  "next/link",
  "next/script",
  "@pycolors/ui",
  "lucide-react",
]);

function inspectGraph(overrides: Readonly<Record<string, string>> = {}) {
  const seen = new Set<string>();
  function visit(file: string) {
    if (seen.has(file)) return;
    if (!approved.has(file)) throw new Error(`Unreviewed input: ${file}`);
    const absolute = resolve(root, file);
    if (realpathSync(absolute) !== absolute) throw new Error("Symlink input");
    seen.add(file);
    const text = overrides[file] ?? readFileSync(absolute, "utf8");
    inspectText(text, file);
    // #419's inspectModule restricts URLs to Explorer-owned resources, so the
    // homepage uses TypeScript traversal plus its shared credential/path check.
    const source = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function importFrom(value: ts.Node | undefined) {
      if (!value || !ts.isStringLiteralLike(value))
        throw new Error("Nonliteral import");
      const specifier = value.text;
      if (external.has(specifier)) return;
      if (!specifier.startsWith(".") && !specifier.startsWith("@/"))
        throw new Error(`Unreviewed package: ${specifier}`);
      const base = specifier.startsWith("@/")
        ? specifier.slice(2)
        : relative(root, resolve(dirname(absolute), specifier));
      const target = [base, `${base}.ts`, `${base}.tsx`].find((name) =>
        approved.has(name),
      );
      if (!target) throw new Error(`Unreviewed source: ${specifier}`);
      visit(target);
    }
    function scan(node: ts.Node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier
      )
        importFrom(node.moduleSpecifier);
      if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
        const callee = node.expression.getText(source);
        if (
          node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          callee === "require"
        )
          importFrom(node.arguments?.[0]);
        if (["eval", "Function", "import.meta.glob"].includes(callee))
          throw new Error("Dynamic source");
      }
      if (
        (ts.isPropertyAccessExpression(node) ||
          ts.isElementAccessExpression(node)) &&
        ["process", "import.meta"].includes(node.expression.getText(source)) &&
        file !== "lib/api/client.ts"
      )
        throw new Error("Environment access outside the existing API boundary");
      ts.forEachChild(node, scan);
    }
    scan(source);
  }
  visit(entry);
  return seen;
}

describe("homepage ownership and source contract", () => {
  it("resolves the full reviewed graph through public exports without private source", () => {
    expect(inspectGraph()).toEqual(approved);
    const clients = [...approved].filter((file) =>
      /^\s*["']use client["']/.test(readFileSync(resolve(root, file), "utf8")),
    );
    expect(clients.sort()).toEqual([
      "components/marketing/showcase/showcase-workspace.tsx",
      "components/npm-badges.tsx",
      "components/pricing/buy-starter-pro-button.tsx",
      "components/privacy/consent-gated-gtm.tsx",
    ]);
  });

  it.each([
    'import "@pycolors/core-db";',
    'export * from "../../starter-pro/app/page";',
    'import "@/content/blocks/private";',
    'import "@pycolors/ui/src/private";',
    'if (false) import("private-registry");',
    'const target = "private"; import(target);',
    "process.env.SECRET;",
  ])("rejects prohibited transitive input: %s", (source) => {
    expect(() => inspectGraph({ "lib/version.ts": source })).toThrow();
  });

  it("keeps literal homepage destinations backed by real routes or documentation", () => {
    const text = readFileSync(resolve(root, entry), "utf8");
    const source = ts.createSourceFile(
      entry,
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const links = new Set<string>();
    function scan(node: ts.Node) {
      if (
        ts.isJsxAttribute(node) &&
        node.name.getText(source) === "href" &&
        node.initializer &&
        ts.isStringLiteral(node.initializer)
      )
        links.add(node.initializer.text);
      if (
        ts.isPropertyAssignment(node) &&
        node.name.getText(source) === "href" &&
        ts.isStringLiteral(node.initializer)
      )
        links.add(node.initializer.text);
      ts.forEachChild(node, scan);
    }
    scan(source);
    expect(links.size).toBeGreaterThan(15);
    for (const href of links) {
      if (!href.startsWith("/")) continue;
      const path = href.replace(/^\//, "");
      const candidates = path.startsWith("docs/")
        ? [`content/${path}.mdx`, `content/${path}/index.mdx`]
        : [`app/(site)/${path}/page.tsx`, `app/(tools)/${path}/page.tsx`];
      expect(
        candidates.some((file) => existsSync(resolve(root, file))),
        href,
      ).toBe(true);
    }
  });
});

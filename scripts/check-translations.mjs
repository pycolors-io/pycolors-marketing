import fs from "node:fs";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const en = JSON.parse(
  fs.readFileSync(path.join(root, "messages/en.json"), "utf8"),
).site;
const fr = JSON.parse(
  fs.readFileSync(path.join(root, "messages/fr.json"), "utf8"),
).site;
function key(text) {
  let hash = 2166136261;
  for (const character of text.replace(/\s+/g, " ").trim()) {
    // Match JavaScript UTF-16 hashing, including supplementary characters.
    for (let index = 0; index < character.length; index++)
      hash = Math.imul(hash ^ character.charCodeAt(index), 16777619);
  }
  return `m${(hash >>> 0).toString(16)}`;
}
function scan(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((item) =>
      item.isDirectory()
        ? scan(path.join(dir, item.name))
        : [path.join(dir, item.name)],
    );
}
const files = [
  "app/[locale]",
  "components",
  "lib",
  "content/docs/previews",
  "content/blocks",
]
  .flatMap((dir) => scan(path.join(root, dir)))
  .filter((file) => /\.tsx?$/.test(file) && !file.includes(".test."));
const parsed = new Map(
  files.map((file) => [
    file,
    ts.createSourceFile(
      file,
      fs.readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    ),
  ]),
);
const errors = [];
for (const [id, text] of Object.entries(en)) {
  if (key(text) !== id) errors.push(`Stale message key: ${text}`);
  if (typeof fr[id] !== "string" || !fr[id].trim())
    errors.push(`Missing French message: ${text}`);
  if (typeof fr[id] === "string" && /[\u2047\ufffd]/.test(fr[id]))
    errors.push(`Corrupted French message: ${text}`);
  const variables = (value) => value.match(/\{value\d+\}/g)?.sort() ?? [];
  if (
    fr[id] &&
    JSON.stringify(variables(text)) !== JSON.stringify(variables(fr[id]))
  )
    errors.push(`Changed placeholders: ${text}`);
}
if (Object.keys(fr).some((id) => !Object.hasOwn(en, id)))
  errors.push("French catalogue has orphaned keys");
for (const [file, source] of parsed) {
  const translators = new Set(["tSite", "translate"]);
  function findTranslators(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      const init = ts.isAwaitExpression(node.initializer)
        ? node.initializer.expression
        : node.initializer;
      if (
        ts.isCallExpression(init) &&
        ["getCopy", "useCopy"].includes(init.expression.getText(source))
      )
        translators.add(node.name.text);
    }
    ts.forEachChild(node, findTranslators);
  }
  findTranslators(source);
  const checkedTemplates = new Set();
  function checkInterpolatedCopy(node) {
    if (
      ts.isTemplateExpression(node) &&
      /[a-zA-Z]/.test(
        node.head.text +
          node.templateSpans.map((span) => span.literal.text).join(""),
      ) &&
      !checkedTemplates.has(node.pos)
    ) {
      checkedTemplates.add(node.pos);
      errors.push(
        `${path.relative(root, file)}: use message placeholders for interpolated copy`,
      );
    }
    ts.forEachChild(node, checkInterpolatedCopy);
  }
  function visit(node) {
    if (
      ts.isJsxAttribute(node) &&
      node.name.getText(source) === "helperText" &&
      node.initializer &&
      ts.isStringLiteral(node.initializer) &&
      /[a-zA-Z]/.test(node.initializer.text)
    )
      errors.push(
        `${path.relative(root, file)}: translate helperText at its render boundary`,
      );
    if (
      ts.isCallExpression(node) &&
      translators.has(node.expression.getText(source)) &&
      node.arguments[0]
    )
      checkInterpolatedCopy(node.arguments[0]);
    if (
      ts.isCallExpression(node) &&
      translators.has(node.expression.getText(source)) &&
      node.arguments[0]
    ) {
      function checkMessage(expression) {
        if (ts.isStringLiteralLike(expression)) {
          const text = expression.text;
          if (/[a-zA-Z]/.test(text) && !Object.hasOwn(en, key(text)))
            errors.push(
              `${path.relative(root, file)}: missing source message ${JSON.stringify(text)}`,
            );
        } else if (ts.isConditionalExpression(expression)) {
          checkMessage(expression.whenTrue);
          checkMessage(expression.whenFalse);
        } else if (
          ts.isBinaryExpression(expression) &&
          [
            ts.SyntaxKind.QuestionQuestionToken,
            ts.SyntaxKind.BarBarToken,
          ].includes(expression.operatorToken.kind)
        ) {
          checkMessage(expression.left);
          checkMessage(expression.right);
        } else if (ts.isParenthesizedExpression(expression))
          checkMessage(expression.expression);
      }
      checkMessage(node.arguments[0]);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
// Server Components use the full catalogue. Only the client graph needs to be serialized.
const clients = new Set();
function collect(file) {
  if (clients.has(file) || !parsed.has(file)) return;
  clients.add(file);
  const source = parsed.get(file);
  for (const node of source.statements) {
    if (
      (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) ||
      !node.moduleSpecifier ||
      !ts.isStringLiteral(node.moduleSpecifier)
    )
      continue;
    const specifier = node.moduleSpecifier.text;
    const base = specifier.startsWith("@/")
      ? path.join(root, specifier.slice(2))
      : specifier.startsWith(".")
        ? path.resolve(path.dirname(file), specifier)
        : undefined;
    if (!base) continue;
    const target = [
      base,
      `${base}.ts`,
      `${base}.tsx`,
      path.join(base, "index.ts"),
      path.join(base, "index.tsx"),
    ].find((candidate) => parsed.has(candidate));
    if (target) collect(target);
  }
}
for (const [file, source] of parsed)
  if (/^\s*["']use client["']/.test(source.text)) collect(file);
const clientKeys = new Set();
for (const file of clients) {
  const source = parsed.get(file);
  function visit(node) {
    if (ts.isStringLiteralLike(node)) {
      const id = key(node.text);
      if (Object.hasOwn(en, id)) clientKeys.add(id);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
const output = JSON.stringify([...clientKeys].sort(), null, 2) + "\n";
const target = path.join(root, "messages/client-keys.json");
if (process.argv.includes("--write-client")) fs.writeFileSync(target, output);
else if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== output)
  errors.push("Client catalogue changed; run pnpm i18n:client");
if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else
  console.log(
    `Translations checked: ${Object.keys(en).length} messages; ${clientKeys.size} client messages.`,
  );

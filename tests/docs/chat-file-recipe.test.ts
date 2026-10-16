// @vitest-environment node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { format } from "prettier";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");
describe("local file consumer recipe", () => {
  it("keeps the complete documented reader aligned with the actual preview consumer", async () => {
    const doc = readFileSync(
      resolve(root, "content/docs/blocks/app-shells/ai-chat.mdx"),
      "utf8",
    );
    const recipe =
      /```ts title="src\/components\/use-local-chat-file.ts"\n([\s\S]*?)\n```/u.exec(
        doc,
      )?.[1];
    const source = readFileSync(
      resolve(root, "components/docs/blocks/use-local-chat-file.ts"),
      "utf8",
    ).replace("@/content/blocks/app-shells/ai-chat", "./blocks/ai-chat");
    expect(await format(recipe ?? "", { parser: "typescript" })).toBe(
      await format(source, { parser: "typescript" }),
    );
  });
});

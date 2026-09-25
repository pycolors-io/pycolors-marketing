// @vitest-environment node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const marketing = fileURLToPath(new URL("../..", import.meta.url));
const article = readFileSync(
  resolve(marketing, "content/blog/email-verification-nextjs-authjs.md"),
  "utf8",
);
const files = new Map(
  [...article.matchAll(/^```\w+ title="([^"\n]+)"\n([\s\S]*?)^```/gm)].map(
    ([, name, code]) => [name, code],
  ),
);

describe("email-verification article reproduction", () => {
  it("publishes a complete isolated fixture with valid executable syntax", () => {
    expect([...files.keys()]).toEqual([
      "package.json",
      "schema.prisma",
      "prisma.config.ts",
      "verification.mjs",
      "fixture.test.mjs",
    ]);
    const manifest = JSON.parse(files.get("package.json")!);
    expect(manifest.private).toBe(true);
    expect(manifest.scripts.test).toBe("node --test fixture.test.mjs");
    for (const version of Object.values({
      ...manifest.dependencies,
      ...manifest.devDependencies,
    }))
      expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    for (const name of ["verification.mjs", "fixture.test.mjs"]) {
      const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--check"],
        {
          input: files.get(name),
          encoding: "utf8",
        },
      );
      expect(result.status, `${name}: ${result.stderr}`).toBe(0);
    }
    // Syntax checks are intentionally not represented as database integration tests.
  });

  it("preserves editorial identity and points to an existing public auth document", () => {
    const frontmatter = article.split("---")[1];
    expect(frontmatter).toContain("author: Patrice Parny");
    expect(frontmatter).toContain('date: "2026-04-17"');
    expect(frontmatter).toContain("category: Next.js");
    expect(frontmatter).not.toMatch(/production-ready|dateModified/i);
    expect(frontmatter).toContain("label: Read auth docs");
    expect(frontmatter).toContain("href: /docs/starter-pro/auth");
    expect(
      readFileSync(
        resolve(marketing, "content/docs/starter-pro/auth.mdx"),
        "utf8",
      ).length,
    ).toBeGreaterThan(0);
  });
});

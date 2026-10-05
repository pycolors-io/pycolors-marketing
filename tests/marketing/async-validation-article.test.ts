// @vitest-environment node

import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const require = createRequire(import.meta.url);
const marketing = fileURLToPath(new URL("../..", import.meta.url));
const article = readFileSync(
  join(
    marketing,
    "content/blog/prevent-stale-async-validation-react-forms.mdx",
  ),
  "utf8",
);
const blocks = new Map(
  [...article.matchAll(/^```\w+ title="([^"\n]+)"\n([\s\S]*?)^```/gm)].map(
    ([, name, code]) => [name, code],
  ),
);

it("executes the published field and deterministic tests, including the broken negative control", () => {
  const fixture = mkdtempSync(join(tmpdir(), "pycolors-async-validation-"));
  try {
    for (const name of [
      "username-field.tsx",
      "username-field.test.tsx",
      "vitest.config.mts",
    ]) {
      const code = blocks.get(name);
      expect(code, `Missing article file: ${name}`).toBeDefined();
      writeFileSync(join(fixture, name), code!);
    }
    // Reuse CI's frozen dependencies; never install packages or call a service here.
    symlinkSync(
      join(marketing, "node_modules"),
      join(fixture, "node_modules"),
      "junction",
    );
    writeFileSync(
      join(fixture, "package.json"),
      JSON.stringify({ private: true, type: "module" }),
    );
    writeFileSync(
      join(fixture, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022", "DOM"],
          module: "ESNext",
          moduleResolution: "bundler",
          jsx: "react-jsx",
          strict: true,
          noEmit: true,
          skipLibCheck: true,
        },
        include: ["username-field.tsx", "username-field.test.tsx"],
      }),
    );
    const run = (script: string, args: string[]) =>
      spawnSync(process.execPath, [script, ...args], {
        cwd: fixture,
        encoding: "utf8",
        timeout: 30_000,
        env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0" },
      });
    const compiler = join(
      dirname(require.resolve("typescript/package.json")),
      "bin/tsc",
    );
    const types = run(compiler, ["--noEmit"]);
    expect(types.status, types.stdout + types.stderr).toBe(0);

    const vitest = join(
      dirname(require.resolve("vitest/package.json")),
      "vitest.mjs",
    );
    const fixed = run(vitest, ["run", "--config", "vitest.config.mts"]);
    expect(fixed.status, fixed.stdout + fixed.stderr).toBe(0);
    expect(fixed.stdout).toContain("4 passed");

    const source = blocks.get("username-field.tsx")!;
    const guard = "if (attempt !== generation.current) return;";
    expect(source.split(guard)).toHaveLength(3);
    writeFileSync(
      join(fixture, "username-field.tsx"),
      source.replaceAll(guard, ""),
    );
    const broken = run(vitest, ["run", "--config", "vitest.config.mts"]);
    expect(broken.status, broken.stdout + broken.stderr).toBe(1);
    expect(broken.stdout + broken.stderr).toContain("3 failed | 1 passed");
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
}, 90_000);

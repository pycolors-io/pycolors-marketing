// Opt-in, isolated consumer proof. No dependency changes in the monorepo.
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import process from "node:process";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const fixture = dirname(fileURLToPath(import.meta.url));
const marketing = resolve(fixture, "../../..");
const output = mkdtempSync(resolve(tmpdir(), "pycolors-ai-chat-consumer-"));
const write = (path, text) => writeFileSync(resolve(output, path), text);
const json = (path, value) => write(path, JSON.stringify(value, null, 2));
mkdirSync(resolve(output, "src/components/blocks/ai-chat"), {
  recursive: true,
});
cpSync(
  resolve(marketing, "content/blocks/app-shells/ai-chat"),
  resolve(output, "src/components/blocks/ai-chat"),
  { recursive: true },
);
const doc = readFileSync(
  resolve(marketing, "content/docs/blocks/app-shells/ai-chat.mdx"),
  "utf8",
);
const recipe =
  /```tsx title="src\/components\/connected-chat.tsx"\n([\s\S]*?)\n```/u.exec(
    doc,
  )?.[1];
if (!recipe) throw new Error("The complete documented SDK recipe is missing.");
write("src/components/connected-chat.tsx", recipe);
const agentRecipe =
  /```tsx title="src\/components\/agent-chat.tsx"\n([\s\S]*?)\n```/u.exec(
    doc,
  )?.[1];
if (!agentRecipe)
  throw new Error("The complete documented agent recipe is missing.");
write("src/components/agent-chat.tsx", agentRecipe);
for (const [filename, language] of [
  ["use-local-chat-file.ts", "ts"],
  ["local-file-chat.tsx", "tsx"],
  ["work-simulation.tsx", "tsx"],
  ["work-chat.tsx", "tsx"],
]) {
  const start = doc.indexOf(
    "```" + language + ' title="src/components/' + filename + '"\n',
  );
  const code =
    start < 0
      ? ""
      : doc.slice(doc.indexOf("\n", start) + 1).split("\n```", 1)[0];
  if (!code) throw new Error(`Missing complete file recipe: ${filename}`);
  write(`src/components/${filename}`, code);
}

cpSync(
  resolve(fixture, "consumer.test.tsx.txt"),
  resolve(output, "consumer.test.tsx"),
);
json("package.json", {
  name: "pycolors-ai-chat-consumer-proof",
  private: true,
  type: "module",
  scripts: { build: "tsc --noEmit && vite build", test: "vitest run" },
  dependencies: {
    "@pycolors/ui": "1.6.0",
    "@pycolors/tokens": "1.2.3",
    "lucide-react": "1.49.0",
    react: "19.3.0",
    "react-dom": "19.3.0",
    ai: "7.0.138",
    "@ai-sdk/react": "4.0.141",
  },
  devDependencies: {
    "@types/react": "19.3.0",
    "@types/react-dom": "19.3.0",
    typescript: "6.0.3",
    vite: "8.0.12",
    vitest: "4.1.11",
    jsdom: "30.1.2",
    "@testing-library/react": "16.3.2",
    "@testing-library/jest-dom": "7.0.1",
  },
});
json("tsconfig.json", {
  compilerOptions: {
    target: "ES2022",
    lib: ["ES2022", "DOM", "DOM.Iterable"],
    module: "ESNext",
    moduleResolution: "Bundler",
    jsx: "react-jsx",
    strict: true,
    skipLibCheck: true,
    noEmit: true,
  },
  include: ["src"],
});
write(
  "index.html",
  '<!doctype html><html lang="en"><head><title>Chat consumer proof</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
);
write(
  "src/main.tsx",
  'import * as React from "react";\nimport { createRoot } from "react-dom/client";\nimport { ConnectedChat } from "./components/connected-chat";\nimport { AgentChat } from "./components/agent-chat";\nimport { LocalFileChat } from "./components/local-file-chat";\nimport { WorkChat } from "./components/work-chat";\ncreateRoot(document.getElementById("root")!).render(<React.StrictMode><ConnectedChat /><AgentChat /><LocalFileChat /><WorkChat /></React.StrictMode>);',
);
write(
  "vitest.config.ts",
  'import { defineConfig } from "vitest/config";\nexport default defineConfig({ test: { environment: "jsdom", setupFiles: ["./setup.ts"], include: ["consumer.test.tsx"] } });',
);
write(
  "setup.ts",
  'import "@testing-library/jest-dom/vitest";\nimport { afterEach } from "vitest";\nimport { cleanup } from "@testing-library/react";\nafterEach(cleanup);',
);
console.log(`Isolated consumer: ${output}`);
for (const args of [["install", "--ignore-scripts"], ["test"], ["build"]]) {
  execFileSync("pnpm", args, {
    cwd: output,
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: args[0] === "build" ? "production" : "test",
    },
  });
}
console.log(
  "PASS: copied source + documented recipe, published dependencies, mock transport tests and production bundle. No provider calls.",
);

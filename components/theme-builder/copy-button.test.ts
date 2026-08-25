import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { copyThemeOutput } from "./copy-button";

test("reports successful and repeated local clipboard copies", async () => {
  const copied: string[] = [];
  const clipboard = {
    writeText: async (value: string) => {
      copied.push(value);
    },
  };

  const first = await copyThemeOutput("first", clipboard);
  const second = await copyThemeOutput("second", clipboard);

  assert.deepEqual(copied, ["first", "second"]);
  assert.equal(first.kind, "success");
  assert.equal(second.kind, "success");
  assert.match(first.message, /Copied/u);
});

test("keeps manual selection available when the Clipboard API is missing or rejects", async () => {
  const unavailable = await copyThemeOutput("theme", undefined);
  const rejected = await copyThemeOutput("theme", {
    writeText: async () => {
      throw new Error("blocked");
    },
  });

  assert.equal(unavailable.kind, "unavailable");
  assert.equal(rejected.kind, "failure");
  assert.match(unavailable.message, /Select the output/u);
  assert.match(rejected.message, /Select the output/u);
});

test("provides an accessible text status while output remains selectable", () => {
  const source = readFileSync(
    new URL("./copy-button.tsx", import.meta.url),
    "utf8",
  );
  const outputSource = readFileSync(
    new URL("./theme-output.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /aria-live="polite"/u);
  assert.match(source, /role="status"/u);
  assert.match(outputSource, /<pre/u);
  assert.match(outputSource, /Selectable code/u);
});

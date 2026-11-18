import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const controls =
  "#pricing-offers [data-offer] a[href], #pricing-offers [data-offer] button";

async function measureFocus(page) {
  return page.evaluate((selector) => {
    const element = globalThis.document.activeElement;
    const offerControls = [...globalThis.document.querySelectorAll(selector)];
    const index = offerControls.indexOf(element);
    if (index === -1) return { index };

    const rectangle = (rect) => ({
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    const rect = rectangle(element.getBoundingClientRect());
    const headerBottom = globalThis.document
      .querySelector("header.site-frame")
      .getBoundingClientRect().bottom;
    const visibleAt = (box) => {
      const target = globalThis.document.elementFromPoint(
        (box.left + box.right) / 2,
        (box.top + box.bottom) / 2,
      );
      return target !== null && element.contains(target);
    };
    const fragments = [];
    const walker = globalThis.document.createTreeWalker(
      element,
      globalThis.NodeFilter.SHOW_TEXT,
    );
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent.trim()) continue;
      const range = globalThis.document.createRange();
      range.selectNodeContents(walker.currentNode);
      for (const fragment of range.getClientRects()) {
        if (fragment.width > 0 && fragment.height > 0) {
          const box = rectangle(fragment);
          fragments.push({ ...box, unobscured: visibleAt(box) });
        }
      }
    }
    const style = globalThis.getComputedStyle(element);
    // Native scroll positions can round fractional control geometry by < 1 CSS px.
    // The fixed header and all obstruction hit tests keep their exact boundaries.
    const viewportTolerance = 1;
    return {
      index,
      offer: element.closest("[data-offer]").getAttribute("data-offer"),
      offerControlIndex: [
        ...element.closest("[data-offer]").querySelectorAll("a[href], button"),
      ].indexOf(element),
      label: element.textContent.trim(),
      rect,
      fragments,
      headerBottom,
      viewport: {
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      },
      viewportTolerance,
      scroll: { x: globalThis.scrollX, y: globalThis.scrollY },
      focusVisible: element.matches(":focus-visible"),
      indicator: {
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        outlineOffset: style.outlineOffset,
        boxShadow: style.boxShadow,
      },
      unobscured: visibleAt(rect) && fragments.every((item) => item.unobscured),
      contained:
        rect.top >= headerBottom &&
        rect.bottom <= globalThis.innerHeight + viewportTolerance &&
        rect.left >= -viewportTolerance &&
        rect.right <= globalThis.innerWidth + viewportTolerance,
    };
  }, controls);
}

async function settledFocus(page) {
  let previous;
  let stable = 0;
  for (let attempt = 0; attempt < 30; attempt++) {
    const current = await measureFocus(page);
    if (current.index === -1) return current;
    const position = JSON.stringify([
      current.index,
      current.rect,
      current.scroll,
    ]);
    stable = position === previous ? stable + 1 : 0;
    if (stable === 3) return current;
    previous = position;
    await page.waitForTimeout(50);
  }
  throw new Error("Pricing focus geometry did not settle.");
}

/** Observes native keyboard navigation; never activates an offer or adjusts scroll. */
export async function verifyPricingOfferFocus({
  browser,
  baseUrl,
  evidenceDirectory,
}) {
  const origin = new URL(baseUrl);
  assert(
    origin.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname) &&
      !origin.username &&
      !origin.password &&
      origin.pathname === "/" &&
      !origin.search &&
      !origin.hash,
    "Pricing browser regression only accepts a loopback origin.",
  );
  await fs.mkdir(evidenceDirectory, { recursive: true });
  const report = {
    browser: browser.version(),
    node: process.version,
    states: [],
  };
  const failures = [];

  for (const locale of ["en", "fr"]) {
    for (const width of [320, 768, 1440]) {
      for (const theme of ["light", "dark"]) {
        const state = `${locale}-${width}-${theme}`;
        const context = await browser.newContext({
          viewport: { width, height: 1000 },
          colorScheme: theme,
          reducedMotion: "reduce",
        });
        const observations = [];
        const errors = [];
        const externalRequests = [];
        const page = await context.newPage();
        page.on("pageerror", (error) => errors.push(error.name));
        await context.route("**/*", (route) => {
          const url = new URL(route.request().url());
          if (url.origin !== origin.origin) {
            externalRequests.push(url.origin);
            return route.abort();
          }
          if (url.pathname.startsWith("/_vercel/")) {
            return route.fulfill({ status: 200, body: "" });
          }
          return route.continue();
        });
        try {
          const url = `${origin.origin}${locale === "fr" ? "/fr/tarifs" : "/pricing"}`;
          const response = await page.goto(url);
          assert.equal(response.status(), 200, `${state}: pricing response`);
          await page
            .getByRole("button", {
              name:
                locale === "fr" ? "Refuser les facultatifs" : "Reject optional",
              exact: true,
            })
            .click();
          // A fresh navigation resets focus/scroll while retaining the real consent choice.
          await page.goto("about:blank");
          await page.goto(url);
          await page.evaluate(() => globalThis.document.fonts.ready);
          assert.equal(await page.locator("html").getAttribute("lang"), locale);
          assert.equal(
            await page
              .locator("html")
              .evaluate((html) => html.classList.contains("dark")),
            theme === "dark",
          );

          const count = await page.locator(controls).count();
          assert(count > 0, `${state}: pricing offers exist`);
          await page.keyboard.press("Tab");
          assert.equal(
            await page.locator(":focus").getAttribute("href"),
            "#content",
            `${state}: native skip link`,
          );
          await page.keyboard.press("Enter");
          assert.equal(
            await page.locator(":focus").getAttribute("id"),
            "content",
            `${state}: skip link destination`,
          );

          for (const [direction, key] of [
            ["forward", "Tab"],
            ["backward", "Shift+Tab"],
          ]) {
            const visited = [];
            for (let step = 0; step < 100; step++) {
              await page.keyboard.press(key);
              const focus = await settledFocus(page);
              if (focus.index === -1) {
                if (visited.length === count) break;
                continue;
              }
              visited.push(focus.index);
              observations.push({ direction, ...focus });
              const indicator =
                (focus.indicator.outlineStyle !== "none" &&
                  parseFloat(focus.indicator.outlineWidth) > 0) ||
                focus.indicator.boxShadow !== "none";
              if (
                !focus.contained ||
                !focus.unobscured ||
                !focus.focusVisible ||
                !indicator
              ) {
                failures.push({
                  state,
                  direction,
                  index: focus.index,
                  offer: focus.offer,
                  rect: focus.rect,
                  headerBottom: focus.headerBottom,
                  contained: focus.contained,
                  unobscured: focus.unobscured,
                  focusVisible: focus.focusVisible,
                  indicator,
                  obstructedFragments: focus.fragments.filter(
                    (fragment) => !fragment.unobscured,
                  ),
                });
              }
              if (
                locale === "fr" &&
                width === 1440 &&
                direction === "forward" &&
                ["starter-free", "starter-pro"].includes(focus.offer) &&
                focus.offerControlIndex === 0
              ) {
                await page.screenshot({
                  path: path.join(
                    evidenceDirectory,
                    `${state}-${focus.offer}.png`,
                  ),
                });
              }
              if (direction === "backward" && visited.length === count) break;
            }
            const expected = Array.from({ length: count }, (_, index) => index);
            if (direction === "backward") expected.reverse();
            assert.deepEqual(
              visited,
              expected,
              `${state}: native ${direction} offer order`,
            );
          }
          assert.equal(
            await page.evaluate(
              () =>
                globalThis.document.documentElement.scrollWidth <=
                globalThis.document.documentElement.clientWidth + 1,
            ),
            true,
            `${state}: no horizontal page overflow`,
          );
          assert.deepEqual(errors, [], `${state}: no uncaught runtime errors`);
        } catch (error) {
          failures.push({ state, error: error.message });
        } finally {
          report.states.push({
            state,
            observations,
            errors,
            externalRequests: [...new Set(externalRequests)],
          });
          console.log(
            `[pricing-focus] ${JSON.stringify({ state, observations: observations.length, failures: failures.filter((failure) => failure.state === state) })}`,
          );
          await context.close();
        }
      }
    }
  }
  report.failures = failures;
  await fs.writeFile(
    path.join(evidenceDirectory, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  assert.deepEqual(
    failures,
    [],
    `Pricing native-keyboard failures. Evidence: ${evidenceDirectory}`,
  );
  return report;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const requireUI = createRequire(
    new URL("../../../../packages/ui/package.json", import.meta.url),
  );
  const { chromium } = requireUI("playwright");
  const evidenceDirectory =
    process.argv[3] ??
    (await fs.mkdtemp(path.join(os.tmpdir(), "pycolors-pricing-focus-")));
  const browser = await chromium.launch({ headless: true });
  try {
    await verifyPricingOfferFocus({
      browser,
      baseUrl: process.argv[2] ?? "http://127.0.0.1:3183",
      evidenceDirectory,
    });
    console.log(
      `PASS: 12 pricing keyboard states. Evidence: ${evidenceDirectory}`,
    );
  } finally {
    await browser.close();
  }
}

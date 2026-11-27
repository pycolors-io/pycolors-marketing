import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import fs from "node:fs/promises";
import path from "node:path";

const controls = "main#content a[href]";
const destinations = [
  ["Back to home", "/", "/fr"],
  ["Compare starters", "/starters", "/fr/starters"],
  ["Products", "/pricing", "/fr/tarifs"],
  ["Documentation", "/docs", "/fr/docs"],
  ["Recover purchase access", "/orders/recover", "/fr/orders/recover"],
  ["Purchase support", "/orders/support", "/fr/orders/support"],
  ["Contact PyColors", "/contact", "/fr/contact"],
];
const normalize = (value) => value.replace(/\s+/gu, " ").trim();
const safeErrorName = (value) =>
  /^[A-Za-z]{1,64}$/u.test(value ?? "") ? value : "Error";

async function focusGeometry(page) {
  return page.evaluate((selector) => {
    const element = globalThis.document.activeElement;
    const index = [...globalThis.document.querySelectorAll(selector)].indexOf(
      element,
    );
    if (index === -1) return { index };
    const rectangle = ({ top, right, bottom, left, width, height }) => ({
      top,
      right,
      bottom,
      left,
      width,
      height,
    });
    const rect = rectangle(element.getBoundingClientRect());
    const headerBottom = globalThis.document
      .querySelector("header.site-frame")
      .getBoundingClientRect().bottom;
    const visibleAt = (bounds) => {
      const hit = globalThis.document.elementFromPoint(
        (bounds.left + bounds.right) / 2,
        (bounds.top + bounds.bottom) / 2,
      );
      return hit !== null && element.contains(hit);
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
      for (const fragment of range.getClientRects())
        if (fragment.width && fragment.height)
          fragments.push({
            ...rectangle(fragment),
            unobscured: visibleAt(fragment),
          });
    }
    const style = globalThis.getComputedStyle(element);
    const outlineExtent =
      style.outlineStyle === "none"
        ? 0
        : Math.max(
            0,
            parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset),
          );
    return {
      index,
      rect,
      headerBottom,
      scroll: { x: globalThis.scrollX, y: globalThis.scrollY },
      fragments: fragments.slice(0, 24),
      fragmentCount: fragments.length,
      focusVisible: element.matches(":focus-visible"),
      indicator:
        (style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0) ||
        style.boxShadow !== "none",
      unobscured:
        visibleAt(rect) && fragments.every((fragment) => fragment.unobscured),
      contained:
        rect.top >= headerBottom &&
        rect.bottom <= globalThis.innerHeight + 1 &&
        rect.left >= -1 &&
        rect.right <= globalThis.innerWidth + 1,
      indicatorContained:
        rect.top - outlineExtent >= headerBottom &&
        rect.bottom + outlineExtent <= globalThis.innerHeight + 1 &&
        rect.left - outlineExtent >= -1 &&
        rect.right + outlineExtent <= globalThis.innerWidth + 1,
    };
  }, controls);
}

async function settledFocus(page) {
  let previous;
  let stable = 0;
  for (let attempt = 0; attempt < 30; attempt++) {
    const current = await focusGeometry(page);
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
  assert.fail("404 native focus geometry did not settle.");
}

/** Loopback public pages only. Observe actual hydration and native focus; never force scroll or activate a purchase. */
export async function verifyMarketingNotFound({
  browser,
  baseUrl,
  evidenceDirectory,
  axeScriptPath,
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
    "404 browser regression only accepts a loopback origin.",
  );
  assert.equal(typeof axeScriptPath, "string");
  const [en, fr] = await Promise.all(
    ["en", "fr"].map(async (locale) =>
      JSON.parse(
        await fs.readFile(
          new URL(`../../messages/${locale}.json`, import.meta.url),
          "utf8",
        ),
      ),
    ),
  );
  const sourceKeys = new Map(
    Object.entries(en.site).map(([key, value]) => [normalize(value), key]),
  );
  function copy(value, locale) {
    const key = sourceKeys.get(value);
    assert(key, "Existing English message required.");
    if (locale === "en") return value;
    assert.equal(
      typeof fr.site[key],
      "string",
      "Existing French message required.",
    );
    return normalize(fr.site[key]);
  }
  await fs.mkdir(evidenceDirectory, { recursive: true });
  const report = {
    browser: browser.version(),
    initialHTMLScope:
      "HTTP status/noindex remain required. Initial recovery-shell language and custom markup are recorded separately; the rendered UI is verified in a hydrated browser.",
    states: [],
    failures: [],
  };
  async function saveReport() {
    const json = JSON.stringify(report, null, 2) + "\n";
    assert(Buffer.byteLength(json) <= 1_000_000, "Bounded 404 browser report.");
    await fs.writeFile(path.join(evidenceDirectory, "report.json"), json);
  }
  await saveReport();
  for (const locale of ["en", "fr"]) {
    for (const width of [390, 1440]) {
      for (const theme of ["light", "dark"]) {
        const state = `${locale}-${width}-${theme}`;
        const record = {
          state,
          phase: "setup",
          focus: [],
          screenshots: [],
          runtimeErrors: [],
          runtimeErrorCount: 0,
          blockedExternalRequests: 0,
          blockedUnsafeRequests: 0,
        };
        const context = await browser.newContext({
          viewport: { width, height: 1000 },
          colorScheme: theme,
          reducedMotion: "reduce",
        });
        let page;
        try {
          await context.route("**/*", (route) => {
            const request = route.request(),
              url = new URL(request.url());
            if (url.origin !== origin.origin) {
              record.blockedExternalRequests++;
              return route.abort();
            }
            if (
              !["GET", "HEAD"].includes(request.method()) ||
              url.pathname.startsWith("/api/")
            ) {
              record.blockedUnsafeRequests++;
              return route.abort();
            }
            if (url.pathname.startsWith("/_vercel/"))
              return route.fulfill({ status: 200, body: "" });
            return route.continue();
          });
          page = await context.newPage();
          page.setDefaultTimeout(15_000);
          page.setDefaultNavigationTimeout(30_000);
          page.on("pageerror", (error) => {
            record.runtimeErrorCount++;
            if (record.runtimeErrors.length < 8)
              record.runtimeErrors.push(safeErrorName(error.name));
          });
          const prefix = locale === "fr" ? "/fr" : "";
          const url = `${origin.origin}${prefix}/__pycolors-browser-missing-page`;
          record.phase = "http";
          const userAgent = await page.evaluate(
            () => globalThis.navigator.userAgent,
          );
          const raw = await context.request.get(url, {
            headers: { Accept: "text/html", "User-Agent": userAgent },
            maxRedirects: 0,
            timeout: 30_000,
          });
          const html = await raw.text();
          record.initialHTML = {
            status: raw.status(),
            contentType: raw.headers()["content-type"] ?? "",
            language:
              /<html\b[^>]*\blang=["']([^"']+)["']/iu.exec(html)?.[1] ?? null,
            hasHeadingMarkup: /<h1\b/iu.test(html),
            recoveryShell: /<html\b[^>]*\bid=["']__next_error__["']/iu.test(
              html,
            ),
            noindex:
              /<meta\b(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*\bnoindex\b)[^>]*>/iu.test(
                html,
              ),
          };
          assert.equal(raw.status(), 404, `${state}: actual HTTP 404`);
          assert.match(record.initialHTML.contentType, /text\/html/iu);
          assert(record.initialHTML.noindex, `${state}: initial noindex`);
          const heading = () =>
            page.getByRole("heading", {
              level: 1,
              name: copy("This page isn’t here.", locale),
              exact: true,
            });
          record.phase = "hydrate";
          assert.equal((await page.goto(url)).status(), 404);
          await heading().waitFor({ state: "visible" });
          await page
            .getByRole("button", {
              name: copy("Reject optional", locale),
              exact: true,
            })
            .click();
          // The real consent choice is retained; a fresh navigation resets native focus and scroll.
          await page.goto("about:blank");
          assert.equal((await page.goto(url)).status(), 404);
          await heading().waitFor({ state: "visible" });
          await page.evaluate(() => globalThis.document.fonts.ready);
          record.phase = "content";
          assert.equal(await page.locator("html").getAttribute("lang"), locale);
          assert.equal(await page.locator("h1").count(), 1);
          assert.equal(
            await page
              .locator("html")
              .evaluate((html) => html.classList.contains("dark")),
            theme === "dark",
          );
          const main = page.getByRole("main");
          assert.equal(await main.getAttribute("id"), "content");
          assert.equal(await main.getAttribute("tabindex"), "-1");
          assert.equal(await main.locator("button, form, input").count(), 0);
          assert.equal(await page.locator(controls).count(), 7);
          for (const [label, englishHref, frenchHref] of destinations) {
            const link = main.getByRole("link", {
              name: copy(label, locale),
              exact: true,
            });
            assert.equal(
              await link.getAttribute("href"),
              locale === "fr" ? frenchHref : englishHref,
            );
            assert.equal(await link.locator("a, button").count(), 0);
          }
          const dimensions = await page.evaluate(() => ({
            width: globalThis.document.documentElement.clientWidth,
            scrollWidth: globalThis.document.documentElement.scrollWidth,
            reducedMotion: globalThis.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches,
            scrollBehavior: globalThis.getComputedStyle(
              globalThis.document.documentElement,
            ).scrollBehavior,
          }));
          record.dimensions = dimensions;
          assert(
            dimensions.scrollWidth <= dimensions.width + 1,
            `${state}: no horizontal overflow`,
          );
          assert.equal(dimensions.reducedMotion, true);
          assert.equal(dimensions.scrollBehavior, "auto");
          const robots = await page
            .locator('meta[name="robots"]')
            .evaluateAll((nodes) =>
              nodes.map((node) => node.getAttribute("content")),
            );
          assert(
            robots.some((value) => /\bnoindex\b/iu.test(value ?? "")),
            `${state}: rendered noindex`,
          );
          const initialScreenshot = `${state}.png`;
          await page.screenshot({
            path: path.join(evidenceDirectory, initialScreenshot),
            animations: "disabled",
          });
          record.screenshots.push(initialScreenshot);
          record.phase = "keyboard";
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
          );
          for (const [direction, key] of [
            ["forward", "Tab"],
            ["backward", "Shift+Tab"],
          ]) {
            const expected = Array.from({ length: 7 }, (_, index) => index);
            if (direction === "backward") expected.reverse();
            for (const index of expected) {
              await page.keyboard.press(key);
              const focus = await settledFocus(page);
              record.focus.push({ direction, ...focus });
              assert.equal(
                focus.index,
                index,
                `${state}: native ${direction} order`,
              );
              assert(focus.fragmentCount > 0 && focus.fragmentCount <= 24);
              assert(
                focus.focusVisible && focus.indicator,
                `${state}: visible keyboard focus`,
              );
              assert(
                focus.contained && focus.unobscured && focus.indicatorContained,
                `${state}: focus below header and unobscured`,
              );
            }
            if (direction === "forward") {
              const focusScreenshot = `${state}-focus.png`;
              await page.screenshot({
                path: path.join(evidenceDirectory, focusScreenshot),
                animations: "disabled",
              });
              record.screenshots.push(focusScreenshot);
              await page.keyboard.press("Tab");
              assert.equal(
                (await settledFocus(page)).index,
                -1,
                `${state}: native exit from recovery links`,
              );
            }
          }
          record.phase = "axe";
          await page.addScriptTag({ path: axeScriptPath });
          const accessibility = await page.evaluate(async () => {
            const { violations } = await globalThis.axe.run(
              globalThis.document,
              {
                runOnly: {
                  type: "tag",
                  values: ["wcag2a", "wcag2aa", "wcag21aa"],
                },
              },
            );
            return {
              count: violations.length,
              violations: violations.map(({ id, impact, nodes }) => ({
                id,
                impact,
                nodeCount: nodes.length,
              })),
            };
          });
          record.axe = accessibility;
          assert.equal(accessibility.count, 0, `${state}: no axe violations`);
          assert.equal(
            record.runtimeErrorCount,
            0,
            `${state}: no browser runtime errors`,
          );
          assert.equal(
            record.blockedExternalRequests,
            0,
            `${state}: no external requests`,
          );
          assert.equal(
            record.blockedUnsafeRequests,
            0,
            `${state}: no POST or API requests`,
          );
          record.phase = "passed";
        } catch (error) {
          record.error = safeErrorName(error.name);
          if (page)
            record.observedDocument = await page
              .evaluate(() => ({
                language: globalThis.document.documentElement.lang,
                headings: [...globalThis.document.querySelectorAll("h1")]
                  .slice(0, 3)
                  .map((node) => node.textContent.slice(0, 150)),
                recoveryShell:
                  globalThis.document.documentElement.id === "__next_error__",
              }))
              .catch(() => null);
          if (page) {
            const screenshot = `${state}-failed.png`;
            await page
              .screenshot({
                path: path.join(evidenceDirectory, screenshot),
                animations: "disabled",
              })
              .then(() => record.screenshots.push(screenshot))
              .catch(() => undefined);
          }
          report.failures.push({
            state,
            phase: record.phase,
            error: record.error,
          });
        } finally {
          report.states.push(record);
          await context.close();
          await saveReport();
        }
      }
    }
  }
  assert.deepEqual(
    report.failures,
    [],
    "404 browser regressions; inspect the bounded public report.",
  );
  return report;
}

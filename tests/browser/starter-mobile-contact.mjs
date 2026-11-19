import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import fs from "node:fs/promises";
import path from "node:path";

const cardControls =
  '#platforms article[aria-labelledby="mobile-option-title"] a[href], #platforms article[aria-labelledby="bundle-option-title"] a[href]';
const contactRegion = 'section[aria-labelledby="general-contact-heading"]';
const contactControl = `${contactRegion} a[href^="mailto:contact@pycolors.com?subject="]`;
const products = [
  {
    id: "mobile",
    name: "Starter Pro Mobile",
    price: "249 €",
    qualifier: "Proposed extension",
    en: {
      action: "Discuss your Mobile project",
      heading: "Let's discuss your Mobile project.",
      subject: "Starter Pro Mobile enquiry",
    },
    fr: {
      action: "Parlons de votre projet Mobile",
      heading: "Parlons de votre projet Mobile.",
      subject: "Demande concernant Starter Pro Mobile",
    },
  },
  {
    id: "fullstack",
    name: "Starter Pro Fullstack",
    price: "499 €",
    qualifier: "Bundle to test",
    en: {
      action: "Discuss your Web and Mobile project",
      heading: "Let's discuss your Web and Mobile project.",
      subject: "Starter Pro Fullstack enquiry",
    },
    fr: {
      action: "Parlons de votre projet Web et Mobile",
      heading: "Parlons de votre projet Web et Mobile.",
      subject: "Demande concernant Starter Pro Fullstack",
    },
  },
];

function safeErrorName(value) {
  return typeof value === "string" && /^\w{1,64}$/u.test(value)
    ? value
    : "Error";
}

async function measureFocus(page, selector) {
  return page.evaluate((target) => {
    const element = globalThis.document.activeElement;
    const index = [...globalThis.document.querySelectorAll(target)].indexOf(
      element,
    );
    const rectangle = ({ top, right, bottom, left, width, height }) => ({
      top,
      right,
      bottom,
      left,
      width,
      height,
    });
    const rect = rectangle(element.getBoundingClientRect());
    const scroll = { x: globalThis.scrollX, y: globalThis.scrollY };
    // Leaving the cards can focus the distant FAQ. Observe that native scroll
    // too, before reversing direction; never cancel or reposition it in a test.
    if (index === -1)
      return { index, tag: element.tagName.toLowerCase(), rect, scroll };
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
      for (const fragment of range.getClientRects()) {
        if (fragment.width && fragment.height) {
          fragments.push({
            ...rectangle(fragment),
            unobscured: visibleAt(fragment),
          });
        }
      }
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
      viewport: {
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      },
      scroll,
      // Keep report geometry bounded; assert the full fragment count below.
      fragments: fragments.slice(0, 16),
      fragmentCount: fragments.length,
      focusVisible: element.matches(":focus-visible"),
      indicator:
        (style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0) ||
        style.boxShadow !== "none",
      outlineExtent,
      indicatorContained:
        rect.top - outlineExtent >= headerBottom &&
        rect.bottom + outlineExtent <= globalThis.innerHeight + 1 &&
        rect.left - outlineExtent >= -1 &&
        rect.right + outlineExtent <= globalThis.innerWidth + 1,
      unobscured: visibleAt(rect) && fragments.every((item) => item.unobscured),
      viewportTolerance: 1,
      contained:
        rect.top >= headerBottom &&
        rect.bottom <= globalThis.innerHeight + 1 &&
        rect.left >= -1 &&
        rect.right <= globalThis.innerWidth + 1,
    };
  }, selector);
}

async function settledFocus(page, selector) {
  let previous;
  let stable = 0;
  for (let attempt = 0; attempt < 30; attempt++) {
    const current = await measureFocus(page, selector);
    const position = JSON.stringify([
      current.index,
      current.tag,
      current.rect,
      current.scroll,
    ]);
    stable = position === previous ? stable + 1 : 0;
    if (stable === 3) return current;
    previous = position;
    await page.waitForTimeout(50);
  }
  assert.fail("Native keyboard geometry did not settle");
}

async function verifyKeyboard(page, selector, count, region, record) {
  assert.equal(await page.locator(selector).count(), count);
  for (const [direction, key] of [
    ["forward", "Tab"],
    ["backward", "Shift+Tab"],
  ]) {
    const visited = [];
    for (let step = 0; step < 100; step++) {
      await page.keyboard.press(key);
      const focus = await settledFocus(page, selector);
      if (focus.index === -1) {
        if (visited.length === count) {
          record.boundaries.push({ region, direction, ...focus });
          break;
        }
        continue;
      }
      record.focus.push({ region, direction, ...focus });
      assert(
        !visited.includes(focus.index),
        "Target visited only once per direction",
      );
      assert(focus.fragmentCount > 0 && focus.fragmentCount <= 16);
      assert(focus.focusVisible && focus.indicator);
      assert(focus.contained && focus.unobscured && focus.indicatorContained);
      visited.push(focus.index);
      if (direction === "backward" && visited.length === count) break;
    }
    const expected = Array.from({ length: count }, (_, index) => index);
    if (direction === "backward") expected.reverse();
    assert.deepEqual(visited, expected);
  }
}

async function verifyView(page, locale, theme, view, record) {
  await page.evaluate(() => globalThis.document.fonts.ready);
  assert.equal(await page.locator("html").getAttribute("lang"), locale);
  assert.equal(
    await page
      .locator("html")
      .evaluate((html) => html.classList.contains("dark")),
    theme === "dark",
  );
  const dimensions = await page.evaluate(() => ({
    width: globalThis.document.documentElement.clientWidth,
    scrollWidth: globalThis.document.documentElement.scrollWidth,
    reducedMotion: globalThis.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    scrollBehavior: globalThis.getComputedStyle(
      globalThis.document.documentElement,
    ).scrollBehavior,
  }));
  record.views.push({ view, ...dimensions });
  assert.equal(dimensions.reducedMotion, true);
  assert.equal(dimensions.scrollBehavior, "auto");
  assert(dimensions.scrollWidth <= dimensions.width + 1);
}

async function verifyAxe(page, selector, region, axeScriptPath, record) {
  if (!(await page.evaluate(() => typeof globalThis.axe === "object")))
    await page.addScriptTag({ path: axeScriptPath });
  const result = await page.evaluate(async (target) => {
    const { violations } = await globalThis.axe.run(
      globalThis.document.querySelector(target),
      { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } },
    );
    return {
      count: violations.length,
      violations: violations.slice(0, 20).map(({ id, impact, nodes }) => ({
        id: /^[a-z0-9-]{1,80}$/u.test(id) ? id : "unknown-rule",
        impact: ["minor", "moderate", "serious", "critical"].includes(impact)
          ? impact
          : "unknown",
        nodeCount: nodes.length,
      })),
    };
  }, selector);
  record.axe.push({ region, ...result });
  assert.equal(result.count, 0);
}

/** Public local pages only; reuses the caller's browser and running server. */
export async function verifyStarterMobileContact({
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
    "Mobile browser regression only accepts a loopback origin",
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
    Object.entries(en.site).map(([key, value]) => [value, key]),
  );
  function copy(value, locale) {
    if (locale === "en") return value;
    const translated = fr.site[sourceKeys.get(value)];
    assert.equal(
      typeof translated,
      "string",
      "Existing French message required",
    );
    return translated;
  }
  await fs.mkdir(evidenceDirectory, { recursive: true });
  const report = { browser: browser.version(), states: [], failures: [] };
  async function saveReport() {
    const json = `${JSON.stringify(report, null, 2)}\n`;
    assert(Buffer.byteLength(json) <= 2_000_000, "Bounded browser report");
    await fs.writeFile(path.join(evidenceDirectory, "report.json"), json);
  }
  await saveReport();

  for (const locale of ["en", "fr"]) {
    for (const width of [320, 768, 1440]) {
      for (const theme of ["light", "dark"]) {
        const state = `${locale}-${width}-${theme}`;
        const record = {
          state,
          phase: "setup",
          views: [],
          focus: [],
          boundaries: [],
          axe: [],
          screenshots: [],
          captures: [],
          runtimeErrorCount: 0,
          runtimeErrors: [],
          blockedExternalRequests: 0,
          blockedUnsafeRequests: 0,
        };
        const context = await browser.newContext({
          viewport: { width, height: 1000 },
          colorScheme: theme,
          reducedMotion: "reduce",
        });
        try {
          await context.route("**/*", (route) => {
            const request = route.request();
            const url = new URL(request.url());
            if (url.origin !== origin.origin) {
              record.blockedExternalRequests++;
              return route.abort();
            }
            if (url.pathname.startsWith("/_vercel/"))
              return route.fulfill({ status: 200, body: "" });
            if (
              !["GET", "HEAD"].includes(request.method()) ||
              /\/api\/|checkout|stripe/iu.test(url.pathname)
            ) {
              record.blockedUnsafeRequests++;
              return route.abort();
            }
            return route.continue();
          });
          const page = await context.newPage();
          page.setDefaultTimeout(15000);
          page.setDefaultNavigationTimeout(30000);
          page.on("pageerror", (error) => {
            record.runtimeErrorCount++;
            if (record.runtimeErrors.length < 8)
              record.runtimeErrors.push(safeErrorName(error.name));
          });
          const prefix = locale === "fr" ? "/fr" : "";
          const mobileUrl = `${origin.origin}${prefix}/starters/mobile`;
          async function capture(selector, label) {
            // No HTML, storage, cookies, trace, arbitrary error text or private routes.
            assert.equal(record.runtimeErrorCount, 0);
            const filename = `${state}-${label}.png`;
            await page.locator(selector).screenshot({
              path: path.join(evidenceDirectory, filename),
              animations: "disabled",
            });
            record.screenshots.push(filename);
            const bounds = await page.locator(selector).evaluate((element) => {
              const { top, right, bottom, left, width, height } =
                element.getBoundingClientRect();
              return {
                top,
                right,
                bottom,
                left,
                width,
                height,
                headerBottom: globalThis.document
                  .querySelector("header.site-frame")
                  .getBoundingClientRect().bottom,
                viewportWidth: globalThis.innerWidth,
                viewportHeight: globalThis.innerHeight,
              };
            });
            record.captures.push({ label, ...bounds });
            assert(
              bounds.top >= bounds.headerBottom &&
                bounds.bottom <= bounds.viewportHeight + 1 &&
                bounds.left >= -1 &&
                bounds.right <= bounds.viewportWidth + 1,
              "Captured region must be fully visible below the fixed header",
            );
          }
          record.phase = "mobile.consent";
          assert.equal((await page.goto(mobileUrl)).status(), 200);
          await page
            .getByRole("button", {
              name:
                locale === "fr" ? "Refuser les facultatifs" : "Reject optional",
              exact: true,
            })
            .click();
          await page.goto("about:blank");
          assert.equal((await page.goto(mobileUrl)).status(), 200);
          record.phase = "mobile.offers";
          await verifyView(page, locale, theme, "mobile", record);
          const web = page.getByRole("article", {
            name: "Starter Pro Web",
            exact: true,
          });
          assert.equal(
            await web.getByText("299 €", { exact: true }).count(),
            1,
          );
          for (const product of products) {
            const card = page.getByRole("article", {
              name: product.name,
              exact: true,
            });
            assert.equal(
              await card.getByText(product.price, { exact: true }).count(),
              1,
            );
            assert.equal(
              await card
                .getByText(copy(product.qualifier, locale), { exact: true })
                .count(),
              1,
            );
            assert.equal(
              await card
                .getByText(copy("Coming soon", locale), { exact: true })
                .count(),
              1,
            );
            assert.equal(await card.getByRole("button").count(), 0);
            assert.equal(await card.getByRole("link").count(), 1);
          }
          assert.equal(
            await page
              .getByText(
                copy(
                  "Mobile is not on sale. No release date has been announced.",
                  locale,
                ),
                { exact: true },
              )
              .count(),
            1,
          );
          assert.equal(await page.locator("main form").count(), 0);
          record.phase = "mobile.keyboard";
          await page.keyboard.press("Tab");
          assert.equal(
            await page.locator(":focus").getAttribute("href"),
            "#content",
          );
          await page.keyboard.press("Enter");
          assert.equal(
            await page.locator(":focus").getAttribute("id"),
            "content",
          );
          await verifyKeyboard(page, cardControls, 2, "mobile", record);
          record.phase = "mobile.capture";
          for (const [id, label] of [
            ["web-option-title", "option-web"],
            ["mobile-option-title", "option-mobile"],
            ["bundle-option-title", "option-fullstack"],
          ]) {
            await capture(`#platforms article[aria-labelledby="${id}"]`, label);
          }
          record.phase = "mobile.axe";
          await verifyAxe(page, "#platforms", "mobile", axeScriptPath, record);

          for (const product of products) {
            record.phase = `contact.${product.id}.navigation`;
            assert.equal((await page.goto(mobileUrl)).status(), 200);
            const action = page
              .getByRole("article", { name: product.name, exact: true })
              .getByRole("link", { name: product[locale].action, exact: true });
            const target = `${prefix}/contact?interest=starter-pro-${product.id}`;
            assert.equal(await action.getAttribute("href"), target);
            await action.click();
            await page.waitForURL(`${origin.origin}${target}`);
            const general = page.getByRole("region", {
              name: product[locale].heading,
              exact: true,
            });
            await general.waitFor();
            await verifyView(
              page,
              locale,
              theme,
              `contact.${product.id}`,
              record,
            );
            const email = `mailto:contact@pycolors.com?subject=${encodeURIComponent(product[locale].subject)}`;
            assert.equal(
              await general
                .getByRole("link", {
                  name: copy("Write to PyColors", locale),
                  exact: true,
                })
                .getAttribute("href"),
              email,
            );
            assert.equal(
              await general
                .getByRole("link", {
                  name: "contact@pycolors.com",
                  exact: true,
                })
                .getAttribute("href"),
              "mailto:contact@pycolors.com",
            );
            const purchase = page.getByRole("region", {
              name: copy("Already have a purchase?", locale),
              exact: true,
            });
            assert.equal(
              await purchase
                .getByRole("link", {
                  name: copy("Visit purchase support", locale),
                  exact: true,
                })
                .getAttribute("href"),
              `${prefix}/orders/support`,
            );
            assert.equal(
              await purchase
                .getByRole("link", {
                  name: copy("Recover purchase access", locale),
                })
                .getAttribute("href"),
              `${prefix}/orders/recover`,
            );
            assert.equal(await page.locator("main form").count(), 0);
            record.phase = `contact.${product.id}.keyboard`;
            await verifyKeyboard(page, contactControl, 1, product.id, record);
            record.phase = `contact.${product.id}.capture`;
            await capture(contactRegion, `contact-${product.id}`);
            record.phase = `contact.${product.id}.axe`;
            await verifyAxe(
              page,
              contactRegion,
              product.id,
              axeScriptPath,
              record,
            );
          }
          for (const [kind, query] of [
            ["unknown", "interest=unknown-product"],
            [
              "repeated",
              "interest=starter-pro-mobile&interest=starter-pro-fullstack",
            ],
          ]) {
            record.phase = `contact.fallback.${kind}`;
            assert.equal(
              (
                await page.goto(`${origin.origin}${prefix}/contact?${query}`)
              ).status(),
              200,
            );
            const general = page.getByRole("region", {
              name: copy("Find the right starting point.", locale),
              exact: true,
            });
            assert.equal(
              await general
                .getByRole("link", {
                  name: copy("Write to PyColors", locale),
                  exact: true,
                })
                .getAttribute("href"),
              "mailto:contact@pycolors.com?subject=PyColors%20enquiry",
            );
            await verifyView(page, locale, theme, `fallback.${kind}`, record);
          }
          record.phase = "runtime-and-requests";
          assert.equal(record.runtimeErrorCount, 0);
          assert.equal(record.blockedUnsafeRequests, 0);
          record.passed = true;
        } catch (error) {
          record.passed = false;
          report.failures.push({
            state,
            phase: record.phase,
            name: safeErrorName(error.name),
            location: String(error?.stack ?? "").match(
              /starter-mobile-contact\.mjs:\d+:\d+/u,
            )?.[0],
          });
        } finally {
          report.states.push(record);
          try {
            await saveReport();
            console.log(
              `[mobile-offer] ${JSON.stringify({
                state,
                passed: record.passed,
                phase: record.phase,
                views: record.views.length,
                focus: record.focus.length,
                axe: record.axe,
                runtimeErrorCount: record.runtimeErrorCount,
                blockedUnsafeRequests: record.blockedUnsafeRequests,
              })}`,
            );
          } finally {
            await context.close();
          }
        }
      }
    }
  }
  assert.deepEqual(
    report.failures,
    [],
    "Mobile/contact browser acceptance failed; inspect its bounded report and public screenshots",
  );
  return report;
}

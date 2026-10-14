// @vitest-environment node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const readGuide = (name: string) =>
  readFileSync(
    resolve(marketingRoot, `content/docs/starter/${name}.mdx`),
    "utf8",
  );
const guide = readGuide("getting-started");
const structure = readGuide("project-structure");
const heading = "## Your first session";
const start = guide.indexOf(heading);
const end = guide.indexOf("\n## ", start + heading.length);
const firstSession =
  start < 0 ? "" : guide.slice(start, end < 0 ? undefined : end);
const text = firstSession.replace(/\s+/g, " ");

// Documentation contracts only: these do not certify browser behavior or Pro.
describe("Starter Free first-session documentation", () => {
  it("introduces three informational steps before detailed guidance", () => {
    expect(start).toBeGreaterThan(-1);
    expect(start).toBeLessThan(guide.indexOf("## Steps"));
    const steps = Array.from(
      firstSession.matchAll(/^\d\. \*\*([^*]+)\*\*/gm),
      ([, title]) => title,
    );
    expect(steps).toEqual([
      "Try the project workflow.",
      "Make the app yours.",
      "Evaluate connected foundations.",
    ]);
    expect(text).toContain("not a completion checklist");
    expect(text).toContain(
      "does not complete a step or save onboarding progress",
    );
  });

  it("keeps local persistence, reset, and demo-data boundaries", () => {
    expect(text).toContain("**New project**");
    expect(text).toContain("**Create**");
    expect(text).toContain("`localStorage`");
    expect(text).toContain("Use sample data, not sensitive information");
    expect(text).toContain(
      "asks for confirmation, then replaces your local projects",
    );
    expect(text).toContain("cannot be undone and does not reset the theme");
    expect(text).toContain("**Local storage notice**");
    expect(text).toContain("will be lost after reloading");
    expect(text).toContain("**Illustrative demo data**");
    expect(text).toContain("not connected account or payment services");
    expect(text).toContain("browser/origin-local, not an account setting");
  });

  it("distinguishes Pro foundations from automatic migration", () => {
    for (const capability of [
      "Auth.js",
      "protected routes",
      "Prisma/PostgreSQL",
      "Stripe",
    ]) {
      expect(firstSession).toContain(capability);
    }
    expect(text).toContain("Pro is source code to configure and adapt");
    expect(text).toContain(
      "does not unlock the running Free demo or automatically migrate local projects",
    );
    expect(text).toContain("workflows remain yours to implement");
  });

  it("resolves docs links and keeps demo links on the starter", () => {
    const content = `${guide}\n${structure}`;
    const docPaths = Array.from(
      content.matchAll(/\]\((\/docs\/[^)#]+)(?:#[^)]*)?\)/g),
      ([, path]) => path,
    );
    expect(docPaths).toContain("/docs/starter/installation");
    expect(docPaths).toContain("/docs/starter/upgrade");
    expect(docPaths).toContain("/docs/starter-pro/what-is-included");
    for (const path of new Set(docPaths)) {
      expect(
        existsSync(resolve(marketingRoot, `content${path}.mdx`)),
        path,
      ).toBe(true);
    }
    expect(firstSession).toContain(
      "https://starter-demo.pycolors.io/dashboard",
    );
    expect(firstSession).toContain("http://localhost:3000/dashboard");
    expect(firstSession).not.toMatch(/\]\(\/(?:dashboard|projects)(?:[)#/])/);
    expect(content).toContain("](/starters/pro)");
    expect(
      existsSync(resolve(marketingRoot, "app/(site)/starters/pro/page.tsx")),
    ).toBe(true);
    expect(structure).toContain(
      "/docs/starter/getting-started#your-first-session",
    );
  });

  it("preserves anchors and complete app-local compositions", () => {
    for (const path of [
      "app/layout.tsx",
      "app/(app)/layout.tsx",
      "app/globals.css",
    ]) {
      expect(firstSession).toContain(path);
      expect(structure).toContain(path);
    }
    expect(guide).toContain("### First run path");
    expect(structure).toContain("## Mock data strategy");
    expect(structure).toContain("## Add a new feature");
    expect(structure).toContain("app/(app)/projects/layout.tsx");
    expect(structure).toContain("beneath the existing `ProjectProvider`");
    for (const prop of [
      "projects={projects}",
      "isLoading={isLoading}",
      "onRename={renameProject}",
      "onDelete={deleteProject}",
    ]) {
      expect(structure).toContain(prop);
    }
    expect(structure).toContain("@/components/app/page-shell");
    expect(structure).not.toContain("components/layout/page-shell");
    expect(structure).not.toContain("<ProjectTable />");
    expect(structure).toContain(
      "mkdir -p 'app/(app)/reports' components/reports",
    );
    expect(structure).toContain("export function ReportPanel()");
    expect(structure).toContain("@/components/reports/report-panel");
    expect(structure).not.toContain("actions={...}");
    expect(structure).not.toContain("return <ReportTable />");
  });
});

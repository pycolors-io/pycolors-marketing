import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";

import { GuidePageShell } from "@/components/guides/guide-page-shell";
import {
  GuideSection as Section,
  GuideCallout as Alert,
  GuideCalloutTitle as AlertTitle,
  GuideCalloutDescription as AlertDescription,
  GuideNextSteps,
  GuideChecklistCard as ChecklistCard,
} from "@/components/guides/guide-content";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pycolors/ui";

const metadata: Metadata = {
  title: "What a Production-Ready SaaS Starter Should Include",
  description:
    "Learn what a production-ready SaaS starter should include: authentication, dashboards, settings, billing entry points, UI systems, scalable architecture, and production-shaped product foundations.",
  alternates: {
    canonical: "/guides/production-ready-saas-starter",
  },

  openGraph: {
    title: "What a Production-Ready SaaS Starter Should Include",
    description:
      "A practical guide to authentication, dashboard structure, billing systems, settings architecture, UI foundations, and production-ready SaaS starter design.",
    url: "/guides/production-ready-saas-starter",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "What a Production-Ready SaaS Starter Should Include",
    description:
      "Learn the foundations behind a real production-ready SaaS starter for modern Next.js applications.",
    images: ["/seo/twitter-main.png"],
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "goal", label: "The goal of a starter" },
  { id: "auth", label: "Authentication surfaces" },
  { id: "layout", label: "Application layout" },
  { id: "dashboard", label: "Dashboard structure" },
  { id: "settings", label: "Settings architecture" },
  { id: "billing", label: "Billing entry points" },
  { id: "design-system", label: "Design system foundation" },
  { id: "backend", label: "Minimal backend assumptions" },
  { id: "exclude", label: "What should not be included" },
  { id: "mental-model", label: "Mental model" },
  { id: "next-steps", label: "Next steps" },
];

export default function GuideProductionReadySaaSStarterPage() {
  const tSite = useCopy();

  return (
    <GuidePageShell
      title={tSite(
        "What a Production-Ready SaaS Starter Should Actually Include",
      )}
      description={tSite(
        "A practical breakdown of the product surfaces and architectural foundations that make a SaaS starter genuinely useful — without unnecessary complexity.",
      )}
      toc={toc}
      tags={["Next.js", "Foundations"]}
      documentation={{
        title: "Included source",
        href: "/docs/starter-pro/what-is-included",
      }}
      relatedGuides={[
        {
          title: "How to build a SaaS with Next.js",
          href: "/guides/build-saas-nextjs",
        },
        {
          title: "SaaS dashboard design patterns",
          href: "/guides/saas-dashboard-design",
        },
      ]}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
        {
          label: "What a Production-Ready SaaS Starter Should Actually Include",
          href: "/guides/production-ready-saas-starter",
        },
      ]}
    >
      <div>
        <section id="overview" className="scroll-mt-28 py-10 sm:py-12">
          <div className="space-y-6">
            <Alert>
              <AlertTitle>{tSite("Core idea")}</AlertTitle>
              <AlertDescription>
                {tSite(
                  "A useful SaaS starter reduces repetitive setup work and makes its scope verifiable. Evaluate the included interface, the connected systems, and the configuration and checks your application still needs before launch.",
                )}
              </AlertDescription>
            </Alert>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {tSite(
                "Starter Free keeps authentication, billing, and data mocked for interface evaluation. Starter Pro includes authentication, billing, and database foundations; you still configure providers, adapt your product logic, and validate the result in your environment. Use the",
              )}
              {tSite(" ")}
              <Link
                href="/docs/starter-pro/production-checklist"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("Starter Pro production checklist")}
              </Link>
              {tSite(" ")}
              {tSite("to plan those checks before launch.")}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <ChecklistCard
                title={tSite("Core surfaces")}
                items={[
                  "Authentication",
                  "Dashboard",
                  "Settings",
                  "Billing entry points",
                ]}
              />
              <ChecklistCard
                title={tSite("Product credibility")}
                items={[
                  "Real layout structure",
                  "Consistent UI",
                  "Clear hierarchy",
                  "Useful defaults",
                ]}
              />
              <ChecklistCard
                title={tSite("Architecture")}
                items={[
                  "Simple route model",
                  "Scalable composition",
                  "Minimal assumptions",
                  "Clean upgrade path",
                ]}
              />
              <ChecklistCard
                title={tSite("What to avoid")}
                items={[
                  "Premature abstraction",
                  "Fake flexibility",
                  "Generic dashboards",
                  "Speculative complexity",
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {tSite(
                "If you want the more opinionated version of this topic, read",
              )}
              {tSite(" ")}
              <Link
                href="/blog/why-i-stopped-overengineering-saas-starters"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("Why I Stopped Overengineering SaaS Starters")}
              </Link>
              {tSite(". This guide is the structured, evergreen version.")}
            </p>
          </div>
        </section>

        <Section
          id="goal"
          title={tSite("The goal of a SaaS starter")}
          description={tSite(
            "A starter should help you ship faster, not simulate infinite flexibility.",
          )}
        >
          <p>
            {tSite(
              "Most SaaS starters fail because they try to feel complete instead of trying to be useful.",
            )}
          </p>

          <p>
            {tSite(
              "A strong starter should reduce the distance between cloning a repository and shipping a real product surface. That means focusing on the product areas that teams build again and again:",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What a starter should do")}
              items={[
                "Remove repetitive setup work",
                "Provide strong product defaults",
                "Offer realistic product surfaces",
                "Stay easy to extend",
              ]}
            />
            <ChecklistCard
              title={tSite("What a starter should not do")}
              items={[
                "Solve every future use case",
                "Maximize configuration everywhere",
                "Add enterprise complexity too early",
                "Pretend generic UI equals product value",
              ]}
            />
          </div>

          <p>
            {tSite(
              "The best mental model is simple: a starter is a production-shaped foundation, not a framework for every possible SaaS.",
            )}
          </p>
        </Section>

        <Section
          id="auth"
          title={tSite("1. Authentication surfaces")}
          description={tSite(
            "Authentication is one of the first foundations every SaaS needs.",
          )}
        >
          <p>
            {tSite(
              "A production-ready starter should already account for the main auth flows that real products need.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Flow")}</TableHead>
                <TableHead>{tSite("Why it matters")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Sign in")}
                </TableCell>
                <TableCell>
                  {tSite("Main entry point for returning users")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Sign up")}
                </TableCell>
                <TableCell>
                  {tSite("First conversion surface for new users")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Password reset")}
                </TableCell>
                <TableCell>
                  {tSite("Essential recovery and trust flow")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Protected app area")}
                </TableCell>
                <TableCell>
                  {tSite(
                    "Enforces server-side session and authorization checks for protected data and actions",
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Validate the documented sign-in, recovery, session expiry, and server-side access rules in your configured application.",
            )}
          </p>

          <p>
            {tSite("Related guide:")}
            {tSite(" ")}
            <Link
              href="/guides/saas-auth-flows"
              className="text-foreground underline underline-offset-4"
            >
              {tSite("Authentication flows for SaaS")}
            </Link>
          </p>
        </Section>

        <Section
          id="layout"
          title={tSite("2. Application layout")}
          description={tSite(
            "Layout is part of product structure, not just visual polish.",
          )}
        >
          <p>
            {tSite(
              "A real starter should give developers a coherent layout system for the public site and the authenticated app.",
            )}
          </p>

          <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`app/
  (marketing)/
  login/
  register/
  dashboard/
  settings/
  billing/
  ...`}</pre>
          </Card>

          <p>
            {tSite(
              "Good layout structure makes it easier to evolve the product without rebuilding the shell later. This matters a lot once settings, billing, admin, and team flows start expanding.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What to include")}
              items={[
                "Public marketing layout",
                "Authenticated app shell",
                "Clear top-level navigation",
                "Settings-ready sub-navigation",
              ]}
            />
            <ChecklistCard
              title={tSite("What to avoid")}
              items={[
                "Over-abstracted layout engines",
                "Too many shells too early",
                "Generic page wrappers everywhere",
                "Speculative enterprise navigation",
              ]}
            />
          </div>
        </Section>

        <Section
          id="dashboard"
          title={tSite("3. Dashboard structure")}
          description={tSite(
            "Dashboards should create product credibility, not fill space.",
          )}
        >
          <p>
            {tSite(
              "One of the fastest ways to weaken a starter is to include a generic dashboard that looks polished but says nothing.",
            )}
          </p>

          <p>
            {tSite(
              "A production-ready starter should include a dashboard structure that supports real product logic:",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Useful dashboard blocks")}
              items={[
                "Overview area",
                "Recent activity",
                "Quick actions",
                "Meaningful empty states",
              ]}
            />
            <ChecklistCard
              title={tSite("Weak dashboard patterns")}
              items={[
                "Random KPI cards",
                "Placeholder charts with no context",
                "Fake activity feeds",
                "Visually busy but structurally empty layouts",
              ]}
            />
          </div>

          <p>
            {tSite(
              "The goal is not visual complexity. The goal is product clarity.",
            )}
          </p>

          <p>
            {tSite("Related guide:")}
            {tSite(" ")}
            <Link
              href="/guides/saas-dashboard-design"
              className="text-foreground underline underline-offset-4"
            >
              {tSite("SaaS dashboard design patterns")}
            </Link>
          </p>
        </Section>

        <Section
          id="settings"
          title={tSite("4. Settings architecture")}
          description={tSite(
            "Settings are one of the most stable and valuable surfaces in SaaS.",
          )}
        >
          <p>
            {tSite(
              "Settings often look secondary, but they are one of the most important parts of a serious SaaS starter.",
            )}
          </p>

          <p>{tSite("A strong settings structure should account for:")}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Core settings surfaces")}
              items={["Profile", "Account", "Security", "Billing"]}
            />
            <ChecklistCard
              title={tSite("Why it matters")}
              items={[
                "Creates long-term structure",
                "Reduces future refactors",
                "Makes the app feel complete",
                "Supports upgrade paths later",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Even when the business layer is still minimal, these surfaces help the product feel credible much earlier.",
            )}
          </p>
        </Section>

        <Section
          id="billing"
          title={tSite("5. Billing entry points")}
          description={tSite(
            "Billing is where the product starts behaving like a business.",
          )}
        >
          <p>
            {tSite(
              "Mocked billing screens are useful while prototyping. Before charging customers, validate the configured payment flow, webhook handling, and the access changes driven by billing state.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Surface")}</TableHead>
                <TableHead>{tSite("Purpose")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Pricing entry points")}
                </TableCell>
                <TableCell>{tSite("Show upgrade path clearly")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Billing settings")}
                </TableCell>
                <TableCell>
                  {tSite("Give the app a business-ready structure")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Subscription surfaces")}
                </TableCell>
                <TableCell>
                  {tSite("Prepare for recurring revenue logic")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Trust patterns")}
                </TableCell>
                <TableCell>
                  {tSite("Plans, invoices, state, and transparency")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "The billing UI should reflect server-verified payment and subscription state. Check failed payments, cancellation, and recovery alongside the successful path.",
            )}
          </p>

          <p>
            {tSite("Related guide:")}
            {tSite(" ")}
            <Link
              href="/guides/saas-billing-ux"
              className="text-foreground underline underline-offset-4"
            >
              {tSite("SaaS billing UX best practices")}
            </Link>
          </p>
        </Section>

        <Section
          id="design-system"
          title={tSite("6. Design system foundation")}
          description={tSite(
            "A starter without a coherent UI foundation slows down every future decision.",
          )}
        >
          <p>
            {tSite(
              "A production-ready starter should not just include pages. It should include a reusable UI system that makes product work faster and more coherent.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Useful foundation")}
              items={[
                "Buttons, cards, inputs",
                "Layout consistency",
                "Typography system",
                "Dark mode readiness",
              ]}
            />
            <ChecklistCard
              title={tSite("Why it matters")}
              items={[
                "Faster iteration",
                "Cleaner composition",
                "Better consistency",
                "Lower design debt",
              ]}
            />
          </div>

          <p>
            {tSite(
              "This is where PyColors becomes more than a starter. The UI layer helps developers move from raw implementation to clearer product surfaces faster.",
            )}
          </p>

          <p>
            {tSite("Explore:")}
            {tSite(" ")}
            <Link
              href="/ui/patterns"
              className="text-foreground underline underline-offset-4"
            >
              {tSite("UI patterns")}
            </Link>
          </p>
        </Section>

        <Section
          id="backend"
          title={tSite("7. Minimal backend assumptions")}
          description={tSite(
            "A starter should leave room for growth without forcing unnecessary complexity.",
          )}
        >
          <p>
            {tSite(
              "A good starter should support real product evolution, but it should not hardcode speculative complexity.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Healthy assumptions")}
              items={[
                "Clear route structure",
                "Simple contracts",
                "Composable UI and product sections",
                "Upgradeable business layer",
              ]}
            />
            <ChecklistCard
              title={tSite("Bad assumptions")}
              items={[
                "Microservice-style complexity too early",
                "Unused feature modules",
                "Premature domain abstraction",
                "Enterprise scaffolding with no demand",
              ]}
            />
          </div>

          <p>
            {tSite(
              "The right balance is to make future extension possible, without paying the cost of complexity before it is needed.",
            )}
          </p>
        </Section>

        <Section
          id="exclude"
          title={tSite("What should not be included")}
          description={tSite(
            "Knowing what to remove is just as important as knowing what to keep.",
          )}
        >
          <p>
            {tSite(
              "The most common mistake in SaaS starters is adding things that look advanced but do not create leverage.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Usually unnecessary too early")}
              items={[
                "Fake enterprise modules",
                "Excessive configurability",
                "Generic dashboards",
                "Abstractions without repeated use cases",
              ]}
            />
            <ChecklistCard
              title={tSite("Better focus")}
              items={[
                "Authentication surface",
                "Settings architecture",
                "Billing entry points",
                "Coherent layout and UI system",
              ]}
            />
          </div>

          <p>
            {tSite(
              "This is exactly why simplifying the starter often makes it more useful, not less.",
            )}
          </p>

          <p>
            {tSite("Related article:")}
            {tSite(" ")}
            <Link
              href="/blog/why-i-stopped-overengineering-saas-starters"
              className="text-foreground underline underline-offset-4"
            >
              {tSite("Why I Stopped Overengineering SaaS Starters")}
            </Link>
          </p>
        </Section>

        <section
          id="mental-model"
          className="scroll-mt-28 border-t border-border-subtle py-8 sm:py-10"
        >
          <Alert>
            <AlertTitle>{tSite("Mental model to keep")}</AlertTitle>
            <AlertDescription>
              {tSite(
                "If a feature does not help developers ship faster, improve clarity, or strengthen product structure, it probably does not belong in the starter yet.",
              )}
            </AlertDescription>
          </Alert>
        </section>

        <GuideNextSteps
          title={tSite("Evaluate the foundation for your project")}
          description={tSite(
            "Review the included scope and setup requirements, then validate the configured application against the production checklist.",
          )}
          primary={{
            href: "/docs/starter-pro/what-is-included",
            label: "Review included scope",
          }}
        />
      </div>
    </GuidePageShell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(
    metadata,
    "/guides/production-ready-saas-starter",
    locale,
  );
}

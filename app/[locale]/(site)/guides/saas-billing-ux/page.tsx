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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pycolors/ui";

const metadata: Metadata = {
  title: "Billing Architecture & UX for SaaS Applications",
  description:
    "Learn how modern SaaS billing systems are designed across pricing visibility, subscriptions, usage metrics, invoices, upgrade flows, Stripe portals, payment recovery, and production-ready billing UX.",
  alternates: {
    canonical: "/guides/saas-billing-ux",
  },

  openGraph: {
    title: "Billing Architecture & UX for SaaS Applications",
    description:
      "A practical guide to SaaS billing architecture covering subscriptions, invoices, usage metrics, upgrade flows, Stripe portals, payment recovery, and production-ready billing UX.",
    url: "/guides/saas-billing-ux",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Billing Architecture & UX for SaaS Applications",
    description:
      "Learn how modern SaaS billing systems are designed across subscriptions, pricing UX, invoices, usage metrics, and payment recovery.",
    images: ["/seo/twitter-main.png"],
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "why-billing-matters", label: "Why billing matters" },
  { id: "pricing-visibility", label: "Pricing visibility" },
  { id: "plan-state", label: "Plan state" },
  { id: "usage-metrics", label: "Usage metrics" },
  { id: "invoices-and-history", label: "Invoices & history" },
  { id: "upgrade-downgrade", label: "Upgrade & downgrade" },
  { id: "portal-and-self-serve", label: "Portal & self-serve" },
  { id: "failed-payments", label: "Failed payments" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "build-order", label: "Build order" },
  { id: "next-steps", label: "Next steps" },
];

export default function GuideSaaSBillingUxPage() {
  const tSite = useCopy();

  return (
    <GuidePageShell
      title={tSite("SaaS billing UX best practices")}
      description={tSite(
        "Learn the core UX patterns behind SaaS billing — from pricing visibility and plan state to usage metrics, invoices, upgrades, portals, and failed payment handling.",
      )}
      toc={toc}
      tags={["Next.js", "Billing"]}
      documentation={{
        title: "Billing docs",
        href: "/docs/starter-pro/billing",
      }}
      relatedGuides={[
        {
          title: "Authentication flows for SaaS",
          href: "/guides/saas-auth-flows",
        },
        {
          title: "Team & organization systems for SaaS",
          href: "/guides/saas-organizations",
        },
      ]}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
        {
          label: "SaaS billing UX best practices",
          href: "/guides/saas-billing-ux",
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
                  "Billing UX is not a settings afterthought. In SaaS, it is one of the clearest places where trust, clarity, and monetization meet.",
                )}
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2">
              <ChecklistCard
                title={tSite("Core surfaces")}
                items={[
                  "Current plan",
                  "Usage and limits",
                  "Invoices",
                  "Upgrade actions",
                ]}
              />
              <ChecklistCard
                title={tSite("Business goals")}
                items={[
                  "Reduce confusion",
                  "Increase upgrades",
                  "Lower support load",
                  "Build trust",
                ]}
              />
              <ChecklistCard
                title={tSite("Operational needs")}
                items={[
                  "Subscription state",
                  "Portal access",
                  "Payment recovery",
                  "Billing history",
                ]}
              />
              <ChecklistCard
                title={tSite("PyColors path")}
                items={[
                  "Start with Free",
                  "Validate billing UX",
                  "Upgrade for real wiring",
                  "Scale safely",
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {tSite(
                "If you want to see how billing fits into a real SaaS surface, explore the",
              )}
              {tSite(" ")}
              <Link
                href="/ui/examples"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("examples")}
              </Link>
              {tSite(" ")}
              {tSite("or browse the")}
              {tSite(" ")}
              <Link
                href="/ui/patterns"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("UI patterns")}
              </Link>
              {tSite(" ")}
              {tSite("before starting with")}
              {tSite(" ")}
              <Link
                href="/starters/free"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("Starter Free")}
              </Link>
              .
            </p>
          </div>
        </section>

        <Section
          id="why-billing-matters"
          title={tSite("Why billing UX matters in SaaS")}
          description={tSite(
            "Billing is one of the most trust-sensitive areas of the product.",
          )}
        >
          <p>
            {tSite(
              "Users tolerate rough edges in some parts of a product, but billing is not one of them. When money, limits, invoices, and subscriptions are unclear, trust drops quickly.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What strong billing UX creates")}
              items={[
                "Clear expectations",
                "Higher upgrade confidence",
                "Lower billing support volume",
                "A more trustworthy product",
              ]}
            />
            <ChecklistCard
              title={tSite("What weak billing UX causes")}
              items={[
                "Confusion about charges",
                "Friction during upgrades",
                "Subscription anxiety",
                "More cancellations and tickets",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Good billing UX makes monetization feel integrated into the product rather than bolted on after the fact.",
            )}
          </p>
        </Section>

        <Section
          id="pricing-visibility"
          title={tSite("Make pricing and billing state visible")}
          description={tSite(
            "Users should not have to guess what plan they are on or what they are paying for.",
          )}
        >
          <p>
            {tSite(
              "Billing UX starts before checkout. The product should make the current plan, the upgrade options, and the main billing implications easy to understand.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("What users should see")}</TableHead>
                <TableHead>{tSite("Why it matters")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Current plan")}
                </TableCell>
                <TableCell>
                  {tSite("Reduces uncertainty about account status")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Main limits or benefits")}
                </TableCell>
                <TableCell>
                  {tSite("Explains what the plan actually means")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Upgrade path")}
                </TableCell>
                <TableCell>
                  {tSite("Helps users act without searching")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Billing cadence")}
                </TableCell>
                <TableCell>
                  {tSite("Prevents confusion around recurring charges")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Visibility reduces friction. When users can immediately understand their billing state, they feel more in control.",
            )}
          </p>
        </Section>

        <Section
          id="plan-state"
          title={tSite("Design the current plan state carefully")}
          description={tSite(
            "The plan card or billing summary is often the core of the billing page.",
          )}
        >
          <p>
            {tSite(
              "A billing page usually needs a clear “current state” section: what plan the user has, whether it is active, and what actions are available now.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("A strong plan summary shows")}
              items={[
                "Current plan name",
                "Billing status",
                "Renewal or next charge date",
                "Upgrade or manage actions",
              ]}
            />
            <ChecklistCard
              title={tSite("A weak plan summary causes")}
              items={[
                "Unclear account state",
                "Hidden next charge timing",
                "Confusion about cancellation",
                "Friction around upgrades",
              ]}
            />
          </div>

          <p>
            {tSite(
              "This block should feel trustworthy, not decorative. It is often the first thing users look at on the billing page.",
            )}
          </p>
        </Section>

        <Section
          id="usage-metrics"
          title={tSite("Show usage metrics when the plan depends on them")}
          description={tSite(
            "Usage-based billing requires clarity, context, and timing.",
          )}
        >
          <p>
            {tSite(
              "If the product uses credits, seats, storage, requests, or other usage-based constraints, the billing UX needs to make those limits visible before they become painful.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Useful usage signals")}
              items={[
                "Current usage vs limit",
                "Time period context",
                "Warning before hitting limits",
                "Link to upgrade or manage plan",
              ]}
            />
            <ChecklistCard
              title={tSite("Common problems")}
              items={[
                "Usage shown without context",
                "No time window or reset date",
                "Warnings too late",
                "Metrics separated from upgrade actions",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Good usage UX helps upgrades feel logical. Bad usage UX makes upgrades feel like a surprise penalty.",
            )}
          </p>
        </Section>

        <Section
          id="invoices-and-history"
          title={tSite("Make invoices and billing history easy to understand")}
          description={tSite(
            "Users need to trust what happened, not just what will happen.",
          )}
        >
          <p>
            {tSite(
              "Billing history is often where support questions begin. Users should be able to quickly understand what they paid, when they paid it, and where to go next if something looks wrong.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Billing history element")}</TableHead>
                <TableHead>{tSite("Why it matters")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{tSite("Date")}</TableCell>
                <TableCell>
                  {tSite("Establishes timing and billing cadence")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{tSite("Amount")}</TableCell>
                <TableCell>{tSite("Clarifies the exact charge")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{tSite("Status")}</TableCell>
                <TableCell>
                  {tSite("Helps explain paid, pending, or failed events")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Invoice access")}
                </TableCell>
                <TableCell>
                  {tSite("Supports accounting and user trust")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Invoice history should feel boring in the best possible way: clear, readable, and predictable.",
            )}
          </p>
        </Section>

        <Section
          id="upgrade-downgrade"
          title={tSite("Design upgrades and downgrades with confidence")}
          description={tSite(
            "Billing changes are product decisions, not just payment actions.",
          )}
        >
          <p>
            {tSite(
              "Upgrading should feel like a smooth product step. Downgrading should feel controlled and transparent, even if it is not the ideal business outcome.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Good upgrade UX")}
              items={[
                "Clear plan comparison",
                "Visible benefits of the next tier",
                "Obvious action buttons",
                "Expected charge timing explained",
              ]}
            />
            <ChecklistCard
              title={tSite("Good downgrade UX")}
              items={[
                "Clear consequence messaging",
                "No hidden penalties",
                "Visible timing of plan change",
                "Trust-preserving copy",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Billing changes should not feel risky. When the consequences are transparent, users are more likely to take action with confidence.",
            )}
          </p>
        </Section>

        <Section
          id="portal-and-self-serve"
          title={tSite("Use self-serve billing and customer portals well")}
          description={tSite(
            "Users should be able to manage billing without needing support.",
          )}
        >
          <p>
            {tSite(
              "Many SaaS products use a billing portal for payment methods, invoices, and subscription changes. This is useful, but the surrounding UX still matters.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What your product should handle well")}
              items={[
                "Clear portal entrypoint",
                "Context before users leave the app",
                "Expected actions explained",
                "Safe return path into the product",
              ]}
            />
            <ChecklistCard
              title={tSite("What to avoid")}
              items={[
                "Vague “manage billing” buttons",
                "No explanation of what happens next",
                "Scattered billing actions",
                "Broken flow after returning from portal",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Even when a third-party billing portal handles the action, your product still owns the user experience around it.",
            )}
          </p>
        </Section>

        <Section
          id="failed-payments"
          title={tSite("Handle failed payments without creating panic")}
          description={tSite(
            "Payment recovery should be clear, actionable, and calm.",
          )}
        >
          <p>
            {tSite(
              "Failed payments are one of the most delicate billing moments. Users need to understand what happened, whether access is affected, and what they should do next.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("UX need")}</TableHead>
                <TableHead>{tSite("Why it matters")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Clear status messaging")}
                </TableCell>
                <TableCell>
                  {tSite("Prevents confusion and account anxiety")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Actionable next step")}
                </TableCell>
                <TableCell>{tSite("Helps users recover quickly")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Access expectation")}
                </TableCell>
                <TableCell>
                  {tSite("Clarifies whether service is limited or not")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Calm tone")}
                </TableCell>
                <TableCell>
                  {tSite("Preserves trust during a sensitive moment")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Recovery flows should feel operational and helpful, not alarming or punitive.",
            )}
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title={tSite("Common SaaS billing UX mistakes")}
          description={tSite(
            "Most billing issues come from weak clarity, not lack of features.",
          )}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Typical mistakes")}
              items={[
                "Hiding the current plan state",
                "Weak usage context",
                "No invoice clarity",
                "Confusing upgrade or downgrade consequences",
              ]}
            />
            <ChecklistCard
              title={tSite("Better approach")}
              items={[
                "Make billing status visible immediately",
                "Explain limits and timing clearly",
                "Keep invoice history simple",
                "Design billing changes as trust moments",
              ]}
            />
          </div>

          <p>
            {tSite(
              "The strongest billing pages feel operationally calm. They reduce ambiguity and help users feel in control.",
            )}
          </p>
        </Section>

        <Section
          id="build-order"
          title={tSite("Recommended build order for billing UX")}
          description={tSite(
            "A practical sequence helps teams ship billing surfaces without chaos.",
          )}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Phase")}</TableHead>
                <TableHead>{tSite("Focus")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 1")}
                </TableCell>
                <TableCell>
                  {tSite("Current plan summary and upgrade entrypoint")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 2")}
                </TableCell>
                <TableCell>
                  {tSite("Usage metrics, warnings, and limit context")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 3")}
                </TableCell>
                <TableCell>
                  {tSite("Invoice history and portal entrypoints")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 4")}
                </TableCell>
                <TableCell>
                  {tSite(
                    "Payment recovery, subscription state, and real wiring",
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "This sequence lets teams validate the billing surface first, then wire Stripe and real subscription logic once the UX is solid.",
            )}
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>{tSite("Mental model to keep")}</AlertTitle>
            <AlertDescription>
              {tSite(
                "Great SaaS billing UX makes money-related decisions feel clear, controlled, and trustworthy. Users should always understand their current plan, their limits, and their next billing action.",
              )}
            </AlertDescription>
          </Alert>
        </section>

        <GuideNextSteps
          title={tSite("Build your billing UX faster with PyColors")}
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
  return localizePageMetadata(metadata, "/guides/saas-billing-ux", locale);
}

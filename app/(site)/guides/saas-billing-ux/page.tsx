import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

import { GuidePageShell } from '@/components/guides/guide-page-shell';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'SaaS billing UX best practices',
  description:
    'Learn how to design SaaS billing UX: pricing visibility, plan states, usage metrics, invoices, upgrades, portals, and common billing mistakes.',
  alternates: { canonical: '/guides/saas-billing-ux' },
  openGraph: {
    title: 'SaaS billing UX best practices · PyColors',
    description:
      'Learn how to design SaaS billing UX: pricing visibility, plan states, usage metrics, invoices, upgrades, portals, and common billing mistakes.',
    url: '/guides/saas-billing-ux',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS billing UX best practices · PyColors',
    description:
      'Learn how to design SaaS billing UX: pricing visibility, plan states, usage metrics, invoices, upgrades, portals, and common billing mistakes.',
    images: ['/seo/twitter-main.png'],
  },
};

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-border/60 py-10 sm:py-12"
    >
      <div className="mb-5 space-y-1 sm:mb-6">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>

        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

function ChecklistCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card className="p-5">
      <div className="space-y-3">
        <div className="text-sm font-medium">{title}</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'why-billing-matters', label: 'Why billing matters' },
  { id: 'pricing-visibility', label: 'Pricing visibility' },
  { id: 'plan-state', label: 'Plan state' },
  { id: 'usage-metrics', label: 'Usage metrics' },
  { id: 'invoices-and-history', label: 'Invoices & history' },
  { id: 'upgrade-downgrade', label: 'Upgrade & downgrade' },
  { id: 'portal-and-self-serve', label: 'Portal & self-serve' },
  { id: 'failed-payments', label: 'Failed payments' },
  { id: 'common-mistakes', label: 'Common mistakes' },
  { id: 'build-order', label: 'Build order' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuideSaaSBillingUxPage() {
  return (
    <GuidePageShell
      title="SaaS billing UX best practices"
      description="Learn the core UX patterns behind SaaS billing — from pricing visibility and plan state to usage metrics, invoices, upgrades, portals, and failed payment handling."
      toc={toc}
    >
      <div>
        <section
          id="overview"
          className="scroll-mt-28 py-10 sm:py-12"
        >
          <div className="space-y-6">
            <Alert>
              <AlertTitle>Core idea</AlertTitle>
              <AlertDescription>
                Billing UX is not a settings afterthought. In SaaS, it
                is one of the clearest places where trust, clarity,
                and monetization meet.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ChecklistCard
                title="Core surfaces"
                items={[
                  'Current plan',
                  'Usage and limits',
                  'Invoices',
                  'Upgrade actions',
                ]}
              />
              <ChecklistCard
                title="Business goals"
                items={[
                  'Reduce confusion',
                  'Increase upgrades',
                  'Lower support load',
                  'Build trust',
                ]}
              />
              <ChecklistCard
                title="Operational needs"
                items={[
                  'Subscription state',
                  'Portal access',
                  'Payment recovery',
                  'Billing history',
                ]}
              />
              <ChecklistCard
                title="PyColors path"
                items={[
                  'Start with Free',
                  'Validate billing UX',
                  'Upgrade for real wiring',
                  'Scale safely',
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              If you want to see how billing fits into a real SaaS
              surface, explore the{' '}
              <Link
                href="/examples"
                className="text-foreground underline underline-offset-4"
              >
                examples
              </Link>{' '}
              or browse the{' '}
              <Link
                href="/ui/patterns"
                className="text-foreground underline underline-offset-4"
              >
                UI patterns
              </Link>{' '}
              before starting with{' '}
              <Link
                href="/starters/free"
                className="text-foreground underline underline-offset-4"
              >
                Starter Free
              </Link>
              .
            </p>
          </div>
        </section>

        <Section
          id="why-billing-matters"
          title="Why billing UX matters in SaaS"
          description="Billing is one of the most trust-sensitive areas of the product."
        >
          <p>
            Users tolerate rough edges in some parts of a product, but
            billing is not one of them. When money, limits, invoices,
            and subscriptions are unclear, trust drops quickly.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What strong billing UX creates"
              items={[
                'Clear expectations',
                'Higher upgrade confidence',
                'Lower billing support volume',
                'A more trustworthy product',
              ]}
            />
            <ChecklistCard
              title="What weak billing UX causes"
              items={[
                'Confusion about charges',
                'Friction during upgrades',
                'Subscription anxiety',
                'More cancellations and tickets',
              ]}
            />
          </div>

          <p>
            Good billing UX makes monetization feel integrated into
            the product rather than bolted on after the fact.
          </p>
        </Section>

        <Section
          id="pricing-visibility"
          title="Make pricing and billing state visible"
          description="Users should not have to guess what plan they are on or what they are paying for."
        >
          <p>
            Billing UX starts before checkout. The product should make
            the current plan, the upgrade options, and the main
            billing implications easy to understand.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>What users should see</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Current plan
                </TableCell>
                <TableCell>
                  Reduces uncertainty about account status
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Main limits or benefits
                </TableCell>
                <TableCell>
                  Explains what the plan actually means
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Upgrade path
                </TableCell>
                <TableCell>
                  Helps users act without searching
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Billing cadence
                </TableCell>
                <TableCell>
                  Prevents confusion around recurring charges
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Visibility reduces friction. When users can immediately
            understand their billing state, they feel more in control.
          </p>
        </Section>

        <Section
          id="plan-state"
          title="Design the current plan state carefully"
          description="The plan card or billing summary is often the core of the billing page."
        >
          <p>
            A billing page usually needs a clear “current state”
            section: what plan the user has, whether it is active, and
            what actions are available now.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="A strong plan summary shows"
              items={[
                'Current plan name',
                'Billing status',
                'Renewal or next charge date',
                'Upgrade or manage actions',
              ]}
            />
            <ChecklistCard
              title="A weak plan summary causes"
              items={[
                'Unclear account state',
                'Hidden next charge timing',
                'Confusion about cancellation',
                'Friction around upgrades',
              ]}
            />
          </div>

          <p>
            This block should feel trustworthy, not decorative. It is
            often the first thing users look at on the billing page.
          </p>
        </Section>

        <Section
          id="usage-metrics"
          title="Show usage metrics when the plan depends on them"
          description="Usage-based billing requires clarity, context, and timing."
        >
          <p>
            If the product uses credits, seats, storage, requests, or
            other usage-based constraints, the billing UX needs to
            make those limits visible before they become painful.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Useful usage signals"
              items={[
                'Current usage vs limit',
                'Time period context',
                'Warning before hitting limits',
                'Link to upgrade or manage plan',
              ]}
            />
            <ChecklistCard
              title="Common problems"
              items={[
                'Usage shown without context',
                'No time window or reset date',
                'Warnings too late',
                'Metrics separated from upgrade actions',
              ]}
            />
          </div>

          <p>
            Good usage UX helps upgrades feel logical. Bad usage UX
            makes upgrades feel like a surprise penalty.
          </p>
        </Section>

        <Section
          id="invoices-and-history"
          title="Make invoices and billing history easy to understand"
          description="Users need to trust what happened, not just what will happen."
        >
          <p>
            Billing history is often where support questions begin.
            Users should be able to quickly understand what they paid,
            when they paid it, and where to go next if something looks
            wrong.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Billing history element</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Date</TableCell>
                <TableCell>
                  Establishes timing and billing cadence
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Amount</TableCell>
                <TableCell>Clarifies the exact charge</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  Helps explain paid, pending, or failed events
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Invoice access
                </TableCell>
                <TableCell>
                  Supports accounting and user trust
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Invoice history should feel boring in the best possible
            way: clear, readable, and predictable.
          </p>
        </Section>

        <Section
          id="upgrade-downgrade"
          title="Design upgrades and downgrades with confidence"
          description="Billing changes are product decisions, not just payment actions."
        >
          <p>
            Upgrading should feel like a smooth product step.
            Downgrading should feel controlled and transparent, even
            if it is not the ideal business outcome.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Good upgrade UX"
              items={[
                'Clear plan comparison',
                'Visible benefits of the next tier',
                'Obvious action buttons',
                'Expected charge timing explained',
              ]}
            />
            <ChecklistCard
              title="Good downgrade UX"
              items={[
                'Clear consequence messaging',
                'No hidden penalties',
                'Visible timing of plan change',
                'Trust-preserving copy',
              ]}
            />
          </div>

          <p>
            Billing changes should not feel risky. When the
            consequences are transparent, users are more likely to
            take action with confidence.
          </p>
        </Section>

        <Section
          id="portal-and-self-serve"
          title="Use self-serve billing and customer portals well"
          description="Users should be able to manage billing without needing support."
        >
          <p>
            Many SaaS products use a billing portal for payment
            methods, invoices, and subscription changes. This is
            useful, but the surrounding UX still matters.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What your product should handle well"
              items={[
                'Clear portal entrypoint',
                'Context before users leave the app',
                'Expected actions explained',
                'Safe return path into the product',
              ]}
            />
            <ChecklistCard
              title="What to avoid"
              items={[
                'Vague “manage billing” buttons',
                'No explanation of what happens next',
                'Scattered billing actions',
                'Broken flow after returning from portal',
              ]}
            />
          </div>

          <p>
            Even when a third-party billing portal handles the action,
            your product still owns the user experience around it.
          </p>
        </Section>

        <Section
          id="failed-payments"
          title="Handle failed payments without creating panic"
          description="Payment recovery should be clear, actionable, and calm."
        >
          <p>
            Failed payments are one of the most delicate billing
            moments. Users need to understand what happened, whether
            access is affected, and what they should do next.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>UX need</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Clear status messaging
                </TableCell>
                <TableCell>
                  Prevents confusion and account anxiety
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Actionable next step
                </TableCell>
                <TableCell>Helps users recover quickly</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Access expectation
                </TableCell>
                <TableCell>
                  Clarifies whether service is limited or not
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Calm tone
                </TableCell>
                <TableCell>
                  Preserves trust during a sensitive moment
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Recovery flows should feel operational and helpful, not
            alarming or punitive.
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title="Common SaaS billing UX mistakes"
          description="Most billing issues come from weak clarity, not lack of features."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Typical mistakes"
              items={[
                'Hiding the current plan state',
                'Weak usage context',
                'No invoice clarity',
                'Confusing upgrade or downgrade consequences',
              ]}
            />
            <ChecklistCard
              title="Better approach"
              items={[
                'Make billing status visible immediately',
                'Explain limits and timing clearly',
                'Keep invoice history simple',
                'Design billing changes as trust moments',
              ]}
            />
          </div>

          <p>
            The strongest billing pages feel operationally calm. They
            reduce ambiguity and help users feel in control.
          </p>
        </Section>

        <Section
          id="build-order"
          title="Recommended build order for billing UX"
          description="A practical sequence helps teams ship billing surfaces without chaos."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phase</TableHead>
                <TableHead>Focus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Phase 1</TableCell>
                <TableCell>
                  Current plan summary and upgrade entrypoint
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 2</TableCell>
                <TableCell>
                  Usage metrics, warnings, and limit context
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 3</TableCell>
                <TableCell>
                  Invoice history and portal entrypoints
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 4</TableCell>
                <TableCell>
                  Payment recovery, subscription state, and real
                  wiring
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This sequence lets teams validate the billing surface
            first, then wire Stripe and real subscription logic once
            the UX is solid.
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>Mental model to keep</AlertTitle>
            <AlertDescription>
              Great SaaS billing UX makes money-related decisions feel
              clear, controlled, and trustworthy. Users should always
              understand their current plan, their limits, and their
              next billing action.
            </AlertDescription>
          </Alert>
        </section>

        <section
          id="next-steps"
          className="scroll-mt-28 border-t border-border/60 py-8 sm:py-10"
        >
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Build your billing UX faster with PyColors
                </h2>
                <p className="text-sm text-muted-foreground">
                  Starter Free gives you a production-shaped billing
                  surface now. PRO is the upgrade path when
                  subscriptions, Stripe flows, and real billing wiring
                  need to be handled.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/starters/free">
                    Start with Starter Free
                  </Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/upgrade">
                    Explore PRO
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </GuidePageShell>
  );
}

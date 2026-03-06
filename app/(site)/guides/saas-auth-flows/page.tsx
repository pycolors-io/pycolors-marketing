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
  title: 'Authentication flows for SaaS',
  description:
    'Learn how to design authentication flows for SaaS: login, register, password reset, email verification, protected routes, sessions, and common mistakes.',
  alternates: { canonical: '/guides/saas-auth-flows' },
  openGraph: {
    title: 'Authentication flows for SaaS · PyColors',
    description:
      'Learn how to design authentication flows for SaaS: login, register, password reset, email verification, protected routes, sessions, and common mistakes.',
    url: '/guides/saas-auth-flows',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentication flows for SaaS · PyColors',
    description:
      'Learn how to design authentication flows for SaaS: login, register, password reset, email verification, protected routes, sessions, and common mistakes.',
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
  { id: 'why-auth-matters', label: 'Why auth matters' },
  { id: 'core-flows', label: 'Core flows' },
  { id: 'login-flow', label: 'Login flow' },
  { id: 'register-flow', label: 'Register flow' },
  { id: 'password-reset', label: 'Password reset' },
  { id: 'email-verification', label: 'Email verification' },
  { id: 'sessions-and-protection', label: 'Sessions & protection' },
  { id: 'oauth', label: 'OAuth' },
  { id: 'common-mistakes', label: 'Common mistakes' },
  { id: 'build-order', label: 'Build order' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function GuideSaaSAuthFlowsPage() {
  return (
    <GuidePageShell
      title="Authentication flows for SaaS"
      description="Learn the core authentication flows behind a modern SaaS product — from login and registration to password reset, email verification, protected routes, and sessions."
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
                Authentication is not just a gate. In SaaS, it is the
                first conversion surface, the first trust surface, and
                the first place users decide whether the product feels
                polished or fragile.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ChecklistCard
                title="Core flows"
                items={[
                  'Login',
                  'Register',
                  'Password reset',
                  'Email verification',
                ]}
              />
              <ChecklistCard
                title="Business goals"
                items={[
                  'Reduce friction',
                  'Increase trust',
                  'Protect sessions',
                  'Support real onboarding',
                ]}
              />
              <ChecklistCard
                title="System concerns"
                items={[
                  'Route protection',
                  'Session state',
                  'Error handling',
                  'OAuth support',
                ]}
              />
              <ChecklistCard
                title="PyColors path"
                items={[
                  'Start with Free',
                  'Validate auth UX',
                  'Upgrade for real wiring',
                  'Scale safely',
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              If you want to see how authentication fits into a real
              product surface, explore the{' '}
              <Link
                href="/examples"
                className="text-foreground underline underline-offset-4"
              >
                examples
              </Link>{' '}
              or start with{' '}
              <Link
                href="/starters/free"
                className="text-foreground underline underline-offset-4"
              >
                Starter Free
              </Link>{' '}
              before moving to{' '}
              <Link
                href="/upgrade"
                className="text-foreground underline underline-offset-4"
              >
                PRO
              </Link>
              .
            </p>
          </div>
        </section>

        <Section
          id="why-auth-matters"
          title="Why authentication matters in SaaS"
          description="Authentication shapes trust, activation, and retention from the first interaction."
        >
          <p>
            In most SaaS products, auth is the first real workflow a
            user touches. If it feels confusing, slow, or brittle, the
            rest of the product inherits that weakness immediately.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What good auth creates"
              items={[
                'Lower onboarding friction',
                'Higher trust',
                'Better recovery paths',
                'Clear entry into the product',
              ]}
            />
            <ChecklistCard
              title="What weak auth causes"
              items={[
                'Drop-off during signup',
                'Support burden',
                'Security uncertainty',
                'A weak first impression',
              ]}
            />
          </div>

          <p>
            Good authentication design is not only about security. It
            is also about conversion and product credibility.
          </p>
        </Section>

        <Section
          id="core-flows"
          title="Define the core auth flows early"
          description="Most SaaS products need more than one auth screen."
        >
          <p>
            Many teams think of authentication as a single login page.
            In practice, SaaS auth is a set of connected flows that
            should feel consistent and predictable.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flow</TableHead>
                <TableHead>Main role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Login</TableCell>
                <TableCell>Entry point for returning users</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Register
                </TableCell>
                <TableCell>
                  First conversion flow for new users
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Password reset
                </TableCell>
                <TableCell>Recovery and trust path</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Email verification
                </TableCell>
                <TableCell>
                  Account trust and abuse prevention
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">OAuth</TableCell>
                <TableCell>
                  Faster onboarding and less password friction
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            Thinking about these flows as a system early helps avoid a
            fragmented auth experience later.
          </p>
        </Section>

        <Section
          id="login-flow"
          title="Design the login flow for speed and clarity"
          description="The login screen should reduce hesitation and get returning users back into the product quickly."
        >
          <p>
            Returning users usually want one thing: access. That means
            the login flow should prioritize clarity, error handling,
            and low friction.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="What the login flow needs"
              items={[
                'Clear email and password fields',
                'Visible recovery path',
                'Strong loading and error states',
                'Optional OAuth path when relevant',
              ]}
            />
            <ChecklistCard
              title="What to avoid"
              items={[
                'Too much onboarding copy',
                'Weak error messages',
                'Hidden forgot-password path',
                'Confusing redirection after login',
              ]}
            />
          </div>

          <p>
            The best login screens feel simple because they remove
            noise, not because they ignore edge cases.
          </p>
        </Section>

        <Section
          id="register-flow"
          title="Design the register flow for conversion"
          description="Registration is both a UX flow and a business conversion point."
        >
          <p>
            Signup is where curiosity becomes activation. Every extra
            field, unclear step, or weak explanation increases
            drop-off.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Good signup traits</TableHead>
                <TableHead>Weak signup traits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Minimal required fields</TableCell>
                <TableCell>Too many inputs too early</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Clear value context</TableCell>
                <TableCell>No reason to continue</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Good validation feedback</TableCell>
                <TableCell>Vague or delayed errors</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Predictable next step</TableCell>
                <TableCell>Confusing post-signup state</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            A good register flow should lead naturally into
            onboarding, verification, or the first meaningful product
            action.
          </p>
        </Section>

        <Section
          id="password-reset"
          title="Treat password reset as a first-class flow"
          description="Password reset is one of the highest-trust auth moments in the product."
        >
          <p>
            Password reset is often ignored during early product work,
            but users only notice it when something has already gone
            wrong. That makes clarity and reassurance even more
            important.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Good password reset UX"
              items={[
                'Simple email request screen',
                'Clear confirmation state',
                'Safe new-password flow',
                'No ambiguous dead ends',
              ]}
            />
            <ChecklistCard
              title="Common password reset mistakes"
              items={[
                'Confusing copy',
                'No success confirmation',
                'Weak password requirements',
                'Broken or unclear recovery steps',
              ]}
            />
          </div>

          <p>
            A strong reset flow reduces support friction and increases
            product trust far more than many teams expect.
          </p>
        </Section>

        <Section
          id="email-verification"
          title="Use email verification deliberately"
          description="Verification can increase trust, but it should not destroy momentum."
        >
          <p>
            Email verification helps with account trust,
            deliverability, and abuse prevention, but it also adds
            friction. The key is deciding when it should block the
            user and when it should be staged later.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Good use cases"
              items={[
                'Prevent abuse',
                'Confirm account ownership',
                'Improve email quality',
                'Secure sensitive actions',
              ]}
            />
            <ChecklistCard
              title="UX trade-off to manage"
              items={[
                'Do not break momentum unnecessarily',
                'Explain the next step clearly',
                'Allow resend when needed',
                'Avoid making users feel lost',
              ]}
            />
          </div>

          <p>
            Verification should feel like part of the flow, not a
            product interruption.
          </p>
        </Section>

        <Section
          id="sessions-and-protection"
          title="Design sessions and protected routes as part of auth"
          description="Authentication UX does not stop at the form."
        >
          <p>
            A SaaS auth system includes more than screens. It also
            includes route protection, session awareness, redirect
            logic, and behavior when users are logged out or expired.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concern</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Protected routes
                </TableCell>
                <TableCell>
                  Prevent access to private product areas
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Session state
                </TableCell>
                <TableCell>
                  Keeps product behavior predictable
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Redirect logic
                </TableCell>
                <TableCell>
                  Reduces friction after login or logout
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Expired sessions
                </TableCell>
                <TableCell>
                  Avoids confusing and broken product states
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This is one of the reasons teams often outgrow a purely
            mocked auth layer and eventually need real wiring.
          </p>
        </Section>

        <Section
          id="oauth"
          title="Use OAuth to reduce friction where it makes sense"
          description="OAuth can improve activation, but it should fit the product and audience."
        >
          <p>
            For many SaaS products, OAuth can make signup and login
            faster. It is especially useful when users expect a quick
            path into the product.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Why OAuth helps"
              items={[
                'Fewer passwords to manage',
                'Faster signup',
                'Lower friction on return login',
                'Good fit for modern SaaS expectations',
              ]}
            />
            <ChecklistCard
              title="What still matters"
              items={[
                'Clear fallback path',
                'Good account linking logic',
                'Clean error states',
                'Predictable redirect behavior',
              ]}
            />
          </div>

          <p>
            OAuth is not a replacement for good authentication design.
            It is one path inside a larger auth system.
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title="Common mistakes in SaaS authentication flows"
          description="Most auth problems are not caused by missing providers. They are caused by weak UX and poor flow design."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Typical mistakes"
              items={[
                'Treating auth as only a login page',
                'Poor error and success states',
                'No clear recovery flow',
                'Weak redirect and session handling',
              ]}
            />
            <ChecklistCard
              title="Better approach"
              items={[
                'Design auth as a full system',
                'Prioritize clarity and trust',
                'Build reset and verification early',
                'Keep a clean upgrade path for real wiring',
              ]}
            />
          </div>

          <p>
            Teams often spend time debating providers while the real
            UX problems remain unsolved. Good auth starts with the
            user flow, not with the implementation detail.
          </p>
        </Section>

        <Section
          id="build-order"
          title="Recommended build order for auth flows"
          description="A practical order helps keep the auth surface coherent from the beginning."
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
                  Login, register, and baseline UI states
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 2</TableCell>
                <TableCell>
                  Password reset and strong feedback states
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 3</TableCell>
                <TableCell>
                  Email verification and redirect logic
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phase 4</TableCell>
                <TableCell>
                  Sessions, protection, OAuth, and real provider
                  wiring
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            This sequence helps teams validate the auth UX first, then
            introduce real auth infrastructure once the product
            surface is stable.
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>Mental model to keep</AlertTitle>
            <AlertDescription>
              SaaS authentication is not one page. It is a connected
              system of entry, recovery, trust, sessions, and product
              access. The best auth flows feel simple because they are
              well designed, not because they ignore complexity.
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
                  Build your auth flows faster with PyColors
                </h2>
                <p className="text-sm text-muted-foreground">
                  Starter Free gives you a production-shaped auth
                  surface now. PRO is the upgrade path when sessions,
                  providers, and real wiring need to be handled.
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

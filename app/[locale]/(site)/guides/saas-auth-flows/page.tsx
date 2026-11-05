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
  title: "Authentication Architecture for SaaS Applications",
  description:
    "Learn how modern SaaS authentication systems are designed across login, registration, password reset, email verification, OAuth, sessions, protected routes, and production-ready auth UX.",
  alternates: {
    canonical: "/guides/saas-auth-flows",
  },

  openGraph: {
    title: "Authentication Architecture for SaaS Applications",
    description:
      "A practical guide to SaaS authentication architecture covering login flows, sessions, OAuth, route protection, email verification, and production-ready auth UX.",
    url: "/guides/saas-auth-flows",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Authentication Architecture for SaaS Applications",
    description:
      "Learn how modern SaaS authentication systems are designed across sessions, OAuth, route protection, and production-ready auth UX.",
    images: ["/seo/twitter-main.png"],
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "why-auth-matters", label: "Why auth matters" },
  { id: "core-flows", label: "Core flows" },
  { id: "login-flow", label: "Login flow" },
  { id: "register-flow", label: "Register flow" },
  { id: "password-reset", label: "Password reset" },
  { id: "email-verification", label: "Email verification" },
  { id: "sessions-and-protection", label: "Sessions & protection" },
  { id: "oauth", label: "OAuth" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "build-order", label: "Build order" },
  { id: "next-steps", label: "Next steps" },
];

export default function GuideSaaSAuthFlowsPage() {
  const tSite = useCopy();

  return (
    <GuidePageShell
      title={tSite("Authentication flows for SaaS")}
      description={tSite(
        "Learn the core authentication flows behind a modern SaaS product — from login and registration to password reset, email verification, protected routes, and sessions.",
      )}
      toc={toc}
      tags={["Next.js", "Auth"]}
      documentation={{
        title: "Authentication docs",
        href: "/docs/starter-pro/auth",
      }}
      relatedGuides={[
        {
          title: "SaaS billing UX best practices",
          href: "/guides/saas-billing-ux",
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
          label: "Authentication flows for SaaS",
          href: "/guides/saas-auth-flows",
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
                  "Authentication is not just a gate. In SaaS, it is the first conversion surface, the first trust surface, and the first place users decide whether the product feels polished or fragile.",
                )}
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 sm:grid-cols-2">
              <ChecklistCard
                title={tSite("Core flows")}
                items={[
                  "Login",
                  "Register",
                  "Password reset",
                  "Email verification",
                ]}
              />
              <ChecklistCard
                title={tSite("Business goals")}
                items={[
                  "Reduce friction",
                  "Increase trust",
                  "Protect sessions",
                  "Support real onboarding",
                ]}
              />
              <ChecklistCard
                title={tSite("System concerns")}
                items={[
                  "Route protection",
                  "Session state",
                  "Error handling",
                  "OAuth support",
                ]}
              />
              <ChecklistCard
                title={tSite("PyColors path")}
                items={[
                  "Start with Free",
                  "Validate auth UX",
                  "Upgrade for real wiring",
                  "Scale safely",
                ]}
              />
            </div>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {tSite(
                "If you want to see how authentication fits into a real product surface, explore the",
              )}
              {tSite(" ")}
              <Link
                href="/ui/examples"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("examples")}
              </Link>
              {tSite(" ")}
              {tSite("or start with")}
              {tSite(" ")}
              <Link
                href="/starters/free"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("Starter Free")}
              </Link>
              {tSite(" ")}
              {tSite("before moving to")}
              {tSite(" ")}
              <Link
                href="/upgrade"
                className="text-foreground underline underline-offset-4"
              >
                {tSite("PRO")}
              </Link>
              .
            </p>
          </div>
        </section>

        <Section
          id="why-auth-matters"
          title={tSite("Why authentication matters in SaaS")}
          description={tSite(
            "Authentication shapes trust, activation, and retention from the first interaction.",
          )}
        >
          <p>
            {tSite(
              "In most SaaS products, auth is the first real workflow a user touches. If it feels confusing, slow, or brittle, the rest of the product inherits that weakness immediately.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What good auth creates")}
              items={[
                "Lower onboarding friction",
                "Higher trust",
                "Better recovery paths",
                "Clear entry into the product",
              ]}
            />
            <ChecklistCard
              title={tSite("What weak auth causes")}
              items={[
                "Drop-off during signup",
                "Support burden",
                "Security uncertainty",
                "A weak first impression",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Good authentication design is not only about security. It is also about conversion and product credibility.",
            )}
          </p>
        </Section>

        <Section
          id="core-flows"
          title={tSite("Define the core auth flows early")}
          description={tSite(
            "Most SaaS products need more than one auth screen.",
          )}
        >
          <p>
            {tSite(
              "Many teams think of authentication as a single login page. In practice, SaaS auth is a set of connected flows that should feel consistent and predictable.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Flow")}</TableHead>
                <TableHead>{tSite("Main role")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{tSite("Login")}</TableCell>
                <TableCell>
                  {tSite("Entry point for returning users")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Register")}
                </TableCell>
                <TableCell>
                  {tSite("First conversion flow for new users")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Password reset")}
                </TableCell>
                <TableCell>{tSite("Recovery and trust path")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Email verification")}
                </TableCell>
                <TableCell>
                  {tSite("Account trust and abuse prevention")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{tSite("OAuth")}</TableCell>
                <TableCell>
                  {tSite("Faster onboarding and less password friction")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "Thinking about these flows as a system early helps avoid a fragmented auth experience later.",
            )}
          </p>
        </Section>

        <Section
          id="login-flow"
          title={tSite("Design the login flow for speed and clarity")}
          description={tSite(
            "The login screen should reduce hesitation and get returning users back into the product quickly.",
          )}
        >
          <p>
            {tSite(
              "Returning users usually want one thing: access. That means the login flow should prioritize clarity, error handling, and low friction.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("What the login flow needs")}
              items={[
                "Clear email and password fields",
                "Visible recovery path",
                "Strong loading and error states",
                "Optional OAuth path when relevant",
              ]}
            />
            <ChecklistCard
              title={tSite("What to avoid")}
              items={[
                "Too much onboarding copy",
                "Weak error messages",
                "Hidden forgot-password path",
                "Confusing redirection after login",
              ]}
            />
          </div>

          <p>
            {tSite(
              "The best login screens feel simple because they remove noise, not because they ignore edge cases.",
            )}
          </p>
        </Section>

        <Section
          id="register-flow"
          title={tSite("Design the register flow for conversion")}
          description={tSite(
            "Registration is both a UX flow and a business conversion point.",
          )}
        >
          <p>
            {tSite(
              "Signup is where curiosity becomes activation. Every extra field, unclear step, or weak explanation increases drop-off.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Good signup traits")}</TableHead>
                <TableHead>{tSite("Weak signup traits")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{tSite("Minimal required fields")}</TableCell>
                <TableCell>{tSite("Too many inputs too early")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{tSite("Clear value context")}</TableCell>
                <TableCell>{tSite("No reason to continue")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{tSite("Good validation feedback")}</TableCell>
                <TableCell>{tSite("Vague or delayed errors")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{tSite("Predictable next step")}</TableCell>
                <TableCell>{tSite("Confusing post-signup state")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "A good register flow should lead naturally into onboarding, verification, or the first meaningful product action.",
            )}
          </p>
        </Section>

        <Section
          id="password-reset"
          title={tSite("Treat password reset as a first-class flow")}
          description={tSite(
            "Password reset is one of the highest-trust auth moments in the product.",
          )}
        >
          <p>
            {tSite(
              "Password reset is often ignored during early product work, but users only notice it when something has already gone wrong. That makes clarity and reassurance even more important.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Good password reset UX")}
              items={[
                "Simple email request screen",
                "Clear confirmation state",
                "Safe new-password flow",
                "No ambiguous dead ends",
              ]}
            />
            <ChecklistCard
              title={tSite("Common password reset mistakes")}
              items={[
                "Confusing copy",
                "No success confirmation",
                "Weak password requirements",
                "Broken or unclear recovery steps",
              ]}
            />
          </div>

          <p>
            {tSite(
              "A strong reset flow reduces support friction and increases product trust far more than many teams expect.",
            )}
          </p>
        </Section>

        <Section
          id="email-verification"
          title={tSite("Use email verification deliberately")}
          description={tSite(
            "Verification can increase trust, but it should not destroy momentum.",
          )}
        >
          <p>
            {tSite(
              "Email verification helps with account trust, deliverability, and abuse prevention, but it also adds friction. The key is deciding when it should block the user and when it should be staged later.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Good use cases")}
              items={[
                "Prevent abuse",
                "Confirm account ownership",
                "Improve email quality",
                "Secure sensitive actions",
              ]}
            />
            <ChecklistCard
              title={tSite("UX trade-off to manage")}
              items={[
                "Do not break momentum unnecessarily",
                "Explain the next step clearly",
                "Allow resend when needed",
                "Avoid making users feel lost",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Verification should feel like part of the flow, not a product interruption.",
            )}
          </p>
        </Section>

        <Section
          id="sessions-and-protection"
          title={tSite("Design sessions and protected routes as part of auth")}
          description={tSite("Authentication UX does not stop at the form.")}
        >
          <p>
            {tSite(
              "A SaaS auth system includes more than screens. It also includes route protection, session awareness, redirect logic, and behavior when users are logged out or expired.",
            )}
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tSite("Concern")}</TableHead>
                <TableHead>{tSite("Why it matters")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Protected routes")}
                </TableCell>
                <TableCell>
                  {tSite("Prevent access to private product areas")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Session state")}
                </TableCell>
                <TableCell>
                  {tSite("Keeps product behavior predictable")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Redirect logic")}
                </TableCell>
                <TableCell>
                  {tSite("Reduces friction after login or logout")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Expired sessions")}
                </TableCell>
                <TableCell>
                  {tSite("Avoids confusing and broken product states")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "This is one of the reasons teams often outgrow a purely mocked auth layer and eventually need real wiring.",
            )}
          </p>
        </Section>

        <Section
          id="oauth"
          title={tSite("Use OAuth to reduce friction where it makes sense")}
          description={tSite(
            "OAuth can improve activation, but it should fit the product and audience.",
          )}
        >
          <p>
            {tSite(
              "For many SaaS products, OAuth can make signup and login faster. It is especially useful when users expect a quick path into the product.",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Why OAuth helps")}
              items={[
                "Fewer passwords to manage",
                "Faster signup",
                "Lower friction on return login",
                "Good fit for modern SaaS expectations",
              ]}
            />
            <ChecklistCard
              title={tSite("What still matters")}
              items={[
                "Clear fallback path",
                "Good account linking logic",
                "Clean error states",
                "Predictable redirect behavior",
              ]}
            />
          </div>

          <p>
            {tSite(
              "OAuth is not a replacement for good authentication design. It is one path inside a larger auth system.",
            )}
          </p>
        </Section>

        <Section
          id="common-mistakes"
          title={tSite("Common mistakes in SaaS authentication flows")}
          description={tSite(
            "Most auth problems are not caused by missing providers. They are caused by weak UX and poor flow design.",
          )}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title={tSite("Typical mistakes")}
              items={[
                "Treating auth as only a login page",
                "Poor error and success states",
                "No clear recovery flow",
                "Weak redirect and session handling",
              ]}
            />
            <ChecklistCard
              title={tSite("Better approach")}
              items={[
                "Design auth as a full system",
                "Prioritize clarity and trust",
                "Build reset and verification early",
                "Keep a clean upgrade path for real wiring",
              ]}
            />
          </div>

          <p>
            {tSite(
              "Teams often spend time debating providers while the real UX problems remain unsolved. Good auth starts with the user flow, not with the implementation detail.",
            )}
          </p>
        </Section>

        <Section
          id="build-order"
          title={tSite("Recommended build order for auth flows")}
          description={tSite(
            "A practical order helps keep the auth surface coherent from the beginning.",
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
                  {tSite("Login, register, and baseline UI states")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 2")}
                </TableCell>
                <TableCell>
                  {tSite("Password reset and strong feedback states")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 3")}
                </TableCell>
                <TableCell>
                  {tSite("Email verification and redirect logic")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {tSite("Phase 4")}
                </TableCell>
                <TableCell>
                  {tSite(
                    "Sessions, protection, OAuth, and real provider wiring",
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p>
            {tSite(
              "This sequence helps teams validate the auth UX first, then introduce real auth infrastructure once the product surface is stable.",
            )}
          </p>
        </Section>

        <section className="border-t border-border/60 py-8 sm:py-10">
          <Alert>
            <AlertTitle>{tSite("Mental model to keep")}</AlertTitle>
            <AlertDescription>
              {tSite(
                "SaaS authentication is not one page. It is a connected system of entry, recovery, trust, sessions, and product access. The best auth flows feel simple because they are well designed, not because they ignore complexity.",
              )}
            </AlertDescription>
          </Alert>
        </section>

        <GuideNextSteps
          title={tSite("Build your auth flows faster with PyColors")}
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
  return localizePageMetadata(metadata, "/guides/saas-auth-flows", locale);
}

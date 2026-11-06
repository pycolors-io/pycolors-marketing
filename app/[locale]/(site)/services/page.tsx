import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  FileText,
  Layers3,
  PanelsTopLeft,
  Users,
} from "lucide-react";
import { Container } from "@/components/container";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingFaq } from "@/components/marketing/faq";
import {
  MarketingActionGroup,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { ProductStudioCapture } from "@/components/marketing/product-studio-capture";
import { productStudio } from "@/lib/showcase/product-studio";
import { CUSTOM_SOFTWARE_SERVICE } from "@/lib/products/project-services";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
import styles from "./services.module.css";

const metadata: Metadata = {
  title: "Client portals & custom business software · PyColors",
  description:
    "Client portals, internal tools, document automation and custom SaaS applications for service businesses. Define your scope with PyColors, from the first brief to handover.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    images: ["/seo/og-main.png"],
  },
};

const useCases = [
  {
    id: "client-portals",
    icon: Users,
    title: "Client portals & activity tracking",
    description:
      "Give your clients and team one place to follow requests, share documents and approve the next step.",
    features: [
      "Client files, projects and shared documents",
      "Requests, comments and approval steps",
      "Client access and team permissions",
    ],
  },
  {
    id: "internal-tools",
    icon: PanelsTopLeft,
    title: "Internal tools & dashboards",
    description:
      "Bring operational information and daily actions into a workspace your team can rely on.",
    features: [
      "Activity tracking, assignments and planning",
      "Business indicators and useful reports",
      "Connections to your existing data sources",
    ],
  },
  {
    id: "documents",
    icon: FileText,
    title: "Documents & automation",
    description:
      "Turn information into useful documents and a repeatable review process.",
    features: [
      "PDF generation, quotes and reports",
      "Data collection, review steps and validation",
      "Connections to your existing APIs",
    ],
  },
  {
    id: "saas",
    icon: Layers3,
    title: "Custom SaaS applications",
    description:
      "Turn a defined business problem into a first product your users can try and your team can develop further.",
    features: [
      "Accounts, workspaces and role-based journeys",
      "Subscriptions and agreed business workflows",
      "A first delivery with acceptance criteria",
    ],
  },
] as const;

const steps = [
  {
    title: "Understand the work",
    description:
      "Your users, current tools and first useful outcome shape the proposed scope.",
    output: "Your priorities and constraints",
  },
  {
    title: "Agree on the delivery",
    description:
      "Screens, workflows, integrations, responsibilities and acceptance criteria are defined before development.",
    output: "A written proposal to approve",
  },
  {
    title: "Build and verify",
    description:
      "Review the agreed workflows in a shared environment, with recorded checks and consolidated feedback.",
    output: "A version to review together",
  },
  {
    title: "Hand over clearly",
    description:
      "Receive the agreed source, configuration notes, validation results and next steps for your team.",
    output: "Source, checks and operating notes",
  },
] as const;

const commitments = [
  [
    "Direct collaboration",
    "Discuss your priorities directly with the person responsible for building your product.",
  ],
  [
    "A scope agreed before development",
    "Deliverables, budget, milestones and review criteria are set out in a written proposal.",
  ],
  [
    "A documented handover",
    "The proposal specifies the source, setup notes and follow-up your team will receive.",
  ],
] as const;

const foundations = [
  {
    href: "/ui",
    label: "PyColors UI",
    detail: "Explore the components behind the interface.",
  },
  {
    href: "/starters/pro",
    label: "Starter Pro",
    detail: "Inspect the SaaS foundation and its documented features.",
  },
  {
    href: productStudio.href,
    label: "Product studio",
    detail: "Follow a complete project, task and review workflow.",
  },
] as const;

const faq = [
  {
    question: "What happens after I share my project?",
    answer:
      "PyColors reviews your goals and existing tools with you. The scope, budget and delivery arrangements are then agreed in writing before development starts.",
  },
  {
    question: "Do I need a complete specification?",
    answer:
      "A clear problem and a few priority workflows are a useful starting point. Your brief provides the context for clarifying the scope, budget and delivery plan.",
  },
  {
    question: "Can you work with an existing application?",
    answer:
      "An initial review of the application, its constraints and the requested changes informs the proposal. The scope identifies what can be reused, what needs adapting and the boundaries of the work.",
  },
  {
    question: "Is Starter Pro required for every project?",
    answer:
      "The foundation depends on the project. If a Starter Pro licence is required, it is identified separately in the proposal, alongside development and third-party costs.",
  },
  {
    question: "What happens after delivery?",
    answer:
      "The proposal defines the handover and any included assistance. Hosting, ongoing operation, maintenance and future development are agreed separately when needed.",
  },
] as const;

export default function ServicesPage() {
  const tSite = useCopy();
  return (
    <main id="content" tabIndex={-1}>
      <Container className="pb-12 pt-24 sm:pb-16 sm:pt-28">
        <div className={styles.hero}>
          <PageHero
            className={styles.heroCopy}
            variant="compact"
            align="left"
            contentClassName="mx-0"
            badges={[{ label: "PyColors Services" }]}
            title={tSite("Build the software your business needs.")}
            description={tSite(
              "Client portals, internal tools and custom SaaS. Work directly with PyColors to define, design and build the workflows your team needs.",
            )}
            actions={
              <MarketingActionGroup>
                <MarketingLinkButton>
                  <Link href={CUSTOM_SOFTWARE_SERVICE.href}>
                    {tSite("Describe your project")}
                  </Link>
                </MarketingLinkButton>
                <Link href="#use-cases" className={styles.secondaryAction}>
                  {tSite("Find your use case")}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </MarketingActionGroup>
            }
            extra={
              <p className={styles.heroNote}>
                {tSite("A short brief is enough to start the conversation.")}
              </p>
            }
          />
          <figure className={styles.preview}>
            <div className={styles.previewHeader}>
              <span>
                <span aria-hidden="true" className={styles.referenceMark} />
                {tSite("Reference implementation")}
              </span>
              <Link href={productStudio.href}>
                {tSite("Explore the reference")}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
            <Link
              href={productStudio.href}
              aria-label={tSite(
                "View the Product studio reference implementation",
              )}
              className={styles.captureLink}
            >
              <ProductStudioCapture
                view="project"
                priority
                sizes="(min-width: 1536px) 680px, (min-width: 1024px) 48vw, 95vw"
              />
            </Link>
            <figcaption>
              <strong>{tSite("Product studio")}</strong>
              <span>{tSite(productStudio.summary)}</span>
              <p>{tSite(productStudio.disclosure)}</p>
            </figcaption>
          </figure>
        </div>
        <dl
          className={styles.commitments}
          aria-label={tSite("Working with PyColors")}
        >
          {commitments.map(([title, detail], index) => (
            <div key={title}>
              <dt>
                <span aria-hidden="true">0{index + 1}</span>
                {tSite(title)}
              </dt>
              <dd>{tSite(detail)}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container>
        <MarketingSectionShell
          id="use-cases"
          width="full"
          divider="pattern"
          aria-labelledby="services-use-cases-title"
        >
          <MarketingSectionHeader
            titleId="services-use-cases-title"
            align="left"
            eyebrow={tSite("Your business workflows")}
            title={tSite("Different businesses. Purpose-built workflows.")}
            description={tSite(
              "Examples of projects to scope around your activity. Features, integrations and delivery boundaries are agreed in the proposal.",
            )}
          />
          <div className={styles.caseGrid}>
            {useCases.map(
              ({ id, icon: Icon, title, description, features }, index) => (
                <article key={id} className={styles.caseCard}>
                  <div className={styles.caseTop}>
                    <Icon aria-hidden="true" className="size-5" />
                    <span aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h3>{tSite(title)}</h3>
                  <p>{tSite(description)}</p>
                  <ul>
                    {features.map((feature) => (
                      <li key={feature}>
                        <Check aria-hidden="true" />
                        {tSite(feature)}
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            )}
          </div>
          <p className={styles.scopeNote}>
            {tSite(
              "For agencies, service firms, training teams and sports businesses. Websites and template adaptations can be scoped alongside the product when needed.",
            )}
          </p>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="approach"
          width="full"
          aria-labelledby="services-approach-title"
        >
          <div className={styles.approach}>
            <div>
              <p className={styles.eyebrow}>{tSite("The PyColors approach")}</p>
              <h2 id="services-approach-title">
                {tSite("Explore the work behind PyColors.")}
              </h2>
              <p>
                {tSite(
                  "PyColors builds and maintains its own interface components, SaaS starter and reference application. Explore them to assess the design, workflows and documentation before discussing your project.",
                )}
              </p>
              <Link
                href={tSite.href("/request-a-quote/template")}
                className={styles.textLink}
              >
                {tSite("See what a proposal includes")}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
            <div className={styles.foundationLinks}>
              {foundations.map((foundation) => (
                <Link href={foundation.href} key={foundation.href}>
                  <div>
                    <h3>{tSite(foundation.label)}</h3>
                    <p>{tSite(foundation.detail)}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="delivery"
          width="full"
          aria-labelledby="services-delivery-title"
        >
          <MarketingSectionHeader
            titleId="services-delivery-title"
            align="left"
            eyebrow={tSite("A practical delivery process")}
            title={tSite("From your first brief to your team’s next step.")}
            description={tSite(
              "A shared scope and visible review points keep the work understandable, from the first discussion through handover.",
            )}
          />
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepNumber} aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{tSite(step.title)}</h3>
                <p>{tSite(step.description)}</p>
                <span className={styles.stepOutput}>{tSite(step.output)}</span>
              </li>
            ))}
          </ol>
          <div className={styles.deliveryEvidence}>
            <FileText aria-hidden="true" className="size-5" />
            <div>
              <h3>{tSite("Know what will be handed over.")}</h3>
              <p>
                {tSite(
                  "Review an example of scope, environment notes, acceptance checks and a documented handover.",
                )}
              </p>
            </div>
            <Link
              href="/starters/pro/implementation-example"
              className={styles.textLink}
            >
              {tSite("View example delivery")}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          aria-labelledby="services-engagements-title"
        >
          <MarketingSectionHeader
            titleId="services-engagements-title"
            align="left"
            eyebrow={tSite("Ways to work together")}
            title={tSite("Choose the right scope for your next step.")}
            description={tSite(
              "A custom product starts with its own scope and proposal. Focused engagements are also available for projects built on Starter Pro.",
            )}
          />
          <article className={styles.customEngagement}>
            <div>
              <p className={styles.eyebrow}>
                {tSite("Custom product development")}
              </p>
              <h3>{tSite(CUSTOM_SOFTWARE_SERVICE.title)}</h3>
              <p>{tSite(CUSTOM_SOFTWARE_SERVICE.description)}</p>
            </div>
            <div className={styles.customAction}>
              <span>{tSite("Price agreed after scoping")}</span>
              <MarketingLinkButton>
                <Link href={CUSTOM_SOFTWARE_SERVICE.href}>
                  {tSite(CUSTOM_SOFTWARE_SERVICE.action)}
                </Link>
              </MarketingLinkButton>
            </div>
          </article>
          <p className={styles.focusedLabel}>
            {tSite("Focused Starter Pro engagements")}
          </p>
          <div className={styles.engagements}>
            {Object.values(STARTER_PRO_SERVICES).map((service) => (
              <article key={service.id} className={styles.engagement}>
                <h3>{tSite(service.title)}</h3>
                <strong>{tSite(service.priceLabel)}</strong>
                <p>{tSite(service.description)}</p>
                <p className={styles.deliverable}>
                  {tSite(service.deliverable)}
                </p>
                <MarketingLinkButton variant="outline">
                  <Link href={service.href}>{tSite(service.action)}</Link>
                </MarketingLinkButton>
              </article>
            ))}
          </div>
          <p className={styles.scopeNote}>
            {tSite(
              "Starting fees apply to the scoped engagements above. Development, any source licence and third-party costs are itemized in your proposal.",
            )}{" "}
            <Link href="/docs/starter-pro/implementation-support">
              {tSite("Review scope and support")}
            </Link>
            .
          </p>
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          aria-labelledby="services-faq-title"
        >
          <MarketingFaq
            titleId="services-faq-title"
            title={tSite("Before getting started.")}
            description={tSite(
              "A few useful details about scope, foundations and follow-up.",
            )}
            items={faq.map((item) => ({
              question: tSite(item.question),
              answer: tSite(item.answer),
            }))}
          />
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          aria-labelledby="services-next-step-title"
        >
          <div className={styles.closing}>
            <div>
              <p className={styles.eyebrow}>{tSite("Your next step")}</p>
              <h2 id="services-next-step-title">
                {tSite("Your next project starts with a conversation.")}
              </h2>
              <p>
                {tSite(
                  "Describe the future users, the problem and a useful first version. A short brief opens the discussion about the next step.",
                )}
              </p>
            </div>
            <MarketingLinkButton>
              <Link href={CUSTOM_SOFTWARE_SERVICE.href}>
                {tSite("Describe your project")}
              </Link>
            </MarketingLinkButton>
          </div>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/services", locale);
}

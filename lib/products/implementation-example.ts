import {
  IMPLEMENTATION_EXAMPLE_PATH,
  STARTER_PRO_SERVICES,
} from "./starter-pro-services";

/** Illustrative engagement content, shared by the page and its downloadable document. */
export const implementationExample = {
  href: IMPLEMENTATION_EXAMPLE_PATH,
  downloadHref: `${IMPLEMENTATION_EXAMPLE_PATH}/handover`,
  filename: "pycolors-handover-example.md",
  project: "Product studio · internal delivery workspace",
  disclosure:
    "Illustrative delivery. The scope, environment, acceptance checks and follow-up for your engagement are confirmed in the written quote.",
  scopes: [
    {
      service: STARTER_PRO_SERVICES.setup,
      scope: [
        "One agreed preview environment, configured in accounts owned by your team.",
        "Your brand, sign-in providers, transactional email and Stripe sandbox settings.",
        "A first account → workspace → invitation → project journey, with recorded checks.",
      ],
      boundary:
        "This example configures the existing starter. A new business feature or a production data migration needs its own agreed scope.",
    },
    {
      service: STARTER_PRO_SERVICES.adaptation,
      scope: [
        "A client-delivery view built on workspace projects, assigned tasks and discussions.",
        "An agreed summary of pending work, owners and due dates, with the interface and data changes it requires.",
        "Role and workspace-access checks, regression results and developer notes for the adapted flow.",
      ],
      boundary:
        "The delivery view is an example adaptation to scope. Customer-facing access, a full CRM, external integrations and formal approvals are separate requirements to define.",
    },
  ],
  environment: [
    {
      area: "Source & runtime",
      configuration:
        "Delivered revision, runtime versions and reproducible startup commands.",
      evidence: "Revision reference and installation/build output.",
    },
    {
      area: "Database & access",
      configuration:
        "Preview PostgreSQL connection, migrations and workspace membership rules.",
      evidence: "Migration record and access-check results.",
    },
    {
      area: "Sign-in & email",
      configuration:
        "Agreed providers, callback URLs, verified sender and recovery flow.",
      evidence: "Redacted provider configuration and delivery references.",
    },
    {
      area: "Billing sandbox",
      configuration:
        "Your test catalog, webhook endpoint and expected plan changes.",
      evidence:
        "Sandbox checkout and webhook references; saved subscription state.",
    },
    {
      area: "Operations",
      configuration:
        "Diagnostic checks, operator contacts and the agreed backup/restore procedure.",
      evidence:
        "Operating notes, responsible owners and outstanding launch actions.",
    },
  ],
  acceptance: [
    {
      journey: "Account access",
      expected: "Sign in, recover access and return to the intended workspace.",
      evidence:
        "Test identity, environment, date and redacted recovery evidence.",
    },
    {
      journey: "Workspace onboarding",
      expected:
        "Create a workspace, invite a teammate and retain onboarding progress.",
      evidence: "Invitation delivery/acceptance reference and saved progress.",
    },
    {
      journey: "Project delivery",
      expected:
        "Create a project and task, assign an owner, set a date and save a discussion.",
      evidence: "Resource references and persistence after reload.",
    },
    {
      journey: "Permissions",
      expected:
        "Reject access from another workspace and respect the agreed member roles.",
      evidence: "Allowed/denied role checks and regression output.",
    },
    {
      journey: "Billing sandbox",
      expected:
        "Apply the agreed test subscription changes and verify the saved result.",
      evidence: "Sandbox event references, expected state and observed state.",
    },
  ],
  handover: [
    {
      title: "What was delivered",
      detail:
        "Scope, delivered revision, affected screens and the acceptance criteria agreed for the engagement.",
    },
    {
      title: "How to run it",
      detail:
        "Install, build and migration commands; environment names and where your team manages credentials.",
    },
    {
      title: "What was verified",
      detail:
        "For each agreed journey: environment, date, expected outcome, actual result and evidence reference.",
    },
    {
      title: "How to operate it",
      detail:
        "Health checks, logs, monitoring destination, backup/restore instructions and responsible owners, as scoped.",
    },
    {
      title: "What remains",
      detail:
        "Known limitations, open launch actions, their owners and the follow-up window written into your quote.",
    },
  ],
} as const;

export function createExampleHandover(
  translate: (value: string) => string = (value) => value,
  localizePath: (value: string) => string = (value) => value,
) {
  const example = implementationExample;
  return [
    "# PyColors · example implementation handover",
    "",
    example.disclosure,
    "",
    "SAMPLE ONLY — no customer delivery or completed acceptance is asserted. All result fields below are NOT RUN and must be completed for the agreed environment.",
    "",
    `${translate("Project")}: ${translate(example.project)}`,
    "Delivery date: [record the agreed delivery date]",
    "Delivered revision: [record the exact release/commit]",
    "Target environment: [record the agreed preview URL]",
    "Delivery owner: [record the responsible role]",
    "Receiving owner: [record your team's responsible role]",
    "",
    "## 1. Agreed scope",
    "",
    ...example.scopes.flatMap(({ service, scope, boundary }) => [
      `### ${translate(service.title)} · ${translate(service.priceLabel)}`,
      service.example.title,
      "",
      ...scope.map((item) => `- ${translate(item)}`),
      "",
      boundary,
      "",
    ]),
    "These are alternative example scopes. Starting service fees, the source licence and provider costs are itemized separately in the written quote. Final deliverables, price, acceptance and follow-up are agreed before work begins.",
    "Scope selected: [record the agreed service and scope reference]",
    "Changes and exclusions: [record agreed changes and exclusions]",
    "",
    "## 2. Environment configuration record",
    "",
    "Record configuration locations and ownership. Keep secret values, session cookies and customer data out of this document.",
    "",
    ...example.environment.flatMap((row) => [
      `### ${translate(row.area)}`,
      `${translate("Configuration")}: ${translate(row.configuration)}`,
      `${translate("Evidence expected")}: ${translate(row.evidence)}`,
      "Environment / owner / evidence location: [complete at handover]",
      "Status: NOT RUN — complete at acceptance",
      "",
    ]),
    "## 3. Acceptance record",
    "",
    "Keep the expected and observed outcome together. Record blockers and retest results rather than marking an unverified journey complete.",
    "",
    ...example.acceptance.flatMap((row) => [
      `### ${translate(row.journey)}`,
      `${translate("Expected")}: ${translate(row.expected)}`,
      `${translate("Evidence to attach")}: ${translate(row.evidence)}`,
      "Environment / date / tester: [complete]",
      "Actual result: [complete]",
      "Result: NOT RUN",
      "Evidence reference / remaining action / owner: [complete]",
      "",
    ]),
    "## 4. Team handover",
    "",
    ...example.handover.flatMap((row) => [
      `### ${translate(row.title)}`,
      row.detail,
      "Record / owner / location: [complete]",
      "",
    ]),
    "Receiving-team review: [record reviewer, date and remaining actions]",
    "Agreed follow-up: [copy the period, included assistance and contact route from the signed quote]",
    "",
    "## Continue with PyColors",
    "",
    "- Example and scope: https://pycolors.io/starters/pro/implementation-example",
    "- Project brief: https://pycolors.io/request-a-quote",
    "- Support boundaries: https://pycolors.io/docs/starter-pro/implementation-support",
    "",
  ]
    .map((line) => {
      const link = line.match(/^(- )([^:]+): (https:\/\/pycolors.io)(\/.*)$/);
      if (link)
        return `${link[1]}${translate(link[2]!)}: ${link[3]}${localizePath(link[4]!)}`;
      const heading = line.match(/^(#{1,6} )(.+)$/);
      return heading ? heading[1] + translate(heading[2]!) : translate(line);
    })
    .join("\n");
}

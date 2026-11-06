import type { Metadata } from "next";
import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/container";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import { SiteButton } from "@/components/site-button";
import { ProposalPrintButton } from "@/components/quotes/proposal-print-button";
import { getCopy } from "@/lib/i18n/server-copy";
import { isLocale } from "@/lib/i18n/routing";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { Link } from "@/lib/i18n/navigation";
import {
  proposalDocument,
  proposalInlines,
  type ProposalBlock,
} from "@/lib/quotes/proposal-document";
import { PROPOSAL_TEMPLATE_PATH } from "@/lib/quotes/proposal-template";
import styles from "./proposal.module.css";

const metadata: Metadata = {
  title: "How we scope your project · PyColors",
  description:
    "See how PyColors prepares your project proposal, from scope and deliverables to timeline, acceptance criteria and budget.",
  robots: { index: false, follow: true },
  alternates: { canonical: PROPOSAL_TEMPLATE_PATH },
};

function Inline({ text }: { text: string }) {
  return proposalInlines(text).map((part, index) =>
    part.href ? (
      <a key={index} href={part.href}>
        {part.text}
      </a>
    ) : part.bold ? (
      <strong key={index}>{part.text}</strong>
    ) : (
      part.text
    ),
  );
}

function Block({ block }: { block: ProposalBlock }) {
  if (block.type === "paragraph")
    return (
      <p>
        <Inline text={block.text} />
      </p>
    );
  if (block.type === "list")
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  return (
    <div
      className={styles.tableScroll}
      role="region"
      aria-label={block.headers.join(" · ")}
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            {block.headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ProposalTemplatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const tSite = await getCopy(locale);
  const document = proposalDocument(locale);
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pt-28">
        <header className={styles.hero}>
          <div>
            <Link href="/services" className={styles.back}>
              {tSite("PyColors Services")}{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <h1>{tSite("Your project. Clearly scoped.")}</h1>
            <p>
              {tSite(
                "Share your project. PyColors prepares a written proposal covering the scope, deliverables, timeline and budget. This preview shows its structure.",
              )}
            </p>
          </div>
          <div className={styles.actions}>
            <MarketingLinkButton>
              <Link href="/request-a-quote?service=custom-product">
                {tSite("Describe your project")}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </MarketingLinkButton>
            <a href="#proposal-document" className={styles.previewLink}>
              {tSite("Explore the proposal")}
            </a>
            <span>{tSite("Prepared by PyColors, reviewed with you.")}</span>
          </div>
        </header>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <nav aria-label={tSite("Proposal contents")}>
              <span className={styles.eyebrow}>
                {tSite("Inside the proposal")}
              </span>
              <ol>
                {document.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className={styles.nextStep}>
              <p>{tSite("Have a project in mind?")}</p>
              <Link href="/request-a-quote?service=custom-product">
                {tSite("Describe your project")}{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </aside>
          <article
            id="proposal-document"
            className={styles.document}
            aria-labelledby="proposal-document-title"
          >
            <div className={styles.documentHeader}>
              <div className={styles.documentMeta}>
                <span className={styles.eyebrow}>
                  <FileText size={15} aria-hidden="true" />
                  {tSite("Proposal outline")}
                </span>
                <div className={styles.documentTools}>
                  <SiteButton asChild variant="outline" size="sm">
                    <a
                      href={tSite.href(`${PROPOSAL_TEMPLATE_PATH}/word`)}
                      download
                    >
                      <ArrowDownToLine size={14} aria-hidden="true" />
                      {tSite("Download Word template")}
                    </a>
                  </SiteButton>
                  <ProposalPrintButton />
                </div>
              </div>
              <h2 id="proposal-document-title">{document.title}</h2>
              <p className={styles.previewIntroduction}>
                {tSite(
                  "An illustrative outline. PyColors prepares the final proposal for your engagement and reviews it with you.",
                )}
              </p>
              <p className={styles.printIntroduction}>
                {document.introduction}
              </p>
            </div>
            {document.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={styles.section}
                aria-labelledby={`${section.id}-title`}
              >
                <h3 id={`${section.id}-title`}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h3>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>
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
  return localizePageMetadata(metadata, PROPOSAL_TEMPLATE_PATH, locale);
}

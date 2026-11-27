import Image from "next/image";
import type { Metadata } from "next";
import { BookOpen, FileText, PackageOpen, RefreshCw } from "lucide-react";

import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteButton as Button } from "@/components/site-button";
import { Link } from "@/lib/i18n/navigation";
import { getCopy } from "@/lib/i18n/server-copy";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { DOCUMENTED_PRODUCT_RELEASES } from "@/lib/products/product-releases";
import styles from "@/components/marketing/product-releases.module.css";

const metadata: Metadata = {
  title: "Product releases and update guides",
  description:
    "Compare the documented versions of PyColors Web, Mobile, Fullstack and NA-AI, read release notes and find the update guide for your purchase.",
  alternates: { canonical: "/product-releases" },
};

export default async function ProductReleasesPage() {
  const tSite = await getCopy();

  return (
    <Container className={styles.page}>
      <main id="content" tabIndex={-1}>
        <PageHero
          variant="compact"
          align="left"
          maxWidth="5xl"
          badges={[{ label: tSite("Product releases"), variant: "outline" }]}
          title={tSite("Know your version. Plan your update.")}
          description={tSite(
            "Find the documented versions, release notes and guides for the PyColors products you own.",
          )}
          className={styles.hero}
        />

        <section
          aria-labelledby="product-versions-heading"
          className={styles.versions}
        >
          <header className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>
                {tSite("Your product reference")}
              </p>
              <h2 id="product-versions-heading">
                {tSite("Versions to compare")}
              </h2>
            </div>
            <p>
              {tSite(
                "These are documented source package versions. The manifest in your downloaded package identifies the version and components you received.",
              )}
            </p>
          </header>
          <div className={styles.productGrid}>
            {DOCUMENTED_PRODUCT_RELEASES.map((release) => (
              <article
                key={release.slug}
                data-product-release={release.slug}
                className={styles.productCard}
                aria-labelledby={`release-${release.slug}`}
              >
                <div className={styles.productIntro}>
                  <div className={styles.artwork}>
                    <Image
                      src={release.artwork}
                      alt=""
                      width={96}
                      height={96}
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <h3 id={`release-${release.slug}`}>
                      {tSite(release.name)}
                    </h3>
                    <p>{tSite(release.description)}</p>
                  </div>
                </div>
                <dl className={styles.versionDetails}>
                  <div className={styles.packageVersion}>
                    <dt>{tSite("Source package version")}</dt>
                    <dd>v{release.packageVersion}</dd>
                  </div>
                  <div className={styles.includedComponents}>
                    <dt>{tSite("Included components")}</dt>
                    <dd>
                      {release.includedComponents
                        .map((component) => tSite(component))
                        .join(" · ")}
                    </dd>
                  </div>
                </dl>
                <div className={styles.productLinks}>
                  {release.links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <BookOpen aria-hidden="true" />
                      {tSite(link.label)}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.updateSection}
          aria-labelledby="product-update-heading"
        >
          <header className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>
                {tSite("Keep building on your purchase")}
              </p>
              <h2 id="product-update-heading">
                {tSite("A clear path to your next update.")}
              </h2>
            </div>
            <p>
              {tSite(
                "Keep your customizations, understand the changes and update at your own pace.",
              )}
            </p>
          </header>
          <ol className={styles.updateSteps}>
            <li>
              <FileText aria-hidden="true" />
              <h3>{tSite("Read the changes")}</h3>
              <p>
                {tSite(
                  "Review the release notes and the guides for the components included in your purchase.",
                )}
              </p>
            </li>
            <li>
              <PackageOpen aria-hidden="true" />
              <h3>{tSite("Get your eligible download")}</h3>
              <p>
                {tSite(
                  "Request a fresh access link using the email from your original purchase. Included updates do not require a new purchase.",
                )}
              </p>
            </li>
            <li>
              <RefreshCw aria-hidden="true" />
              <h3>{tSite("Apply the update in a copy")}</h3>
              <p>
                {tSite(
                  "Keep a backup, compare the supplied files with your customizations and rehearse any migrations before updating your running application.",
                )}
              </p>
            </li>
          </ol>
        </section>

        <section
          className={styles.accessPanel}
          aria-labelledby="existing-purchase-heading"
        >
          <div>
            <p className={styles.eyebrow}>{tSite("Already a customer?")}</p>
            <h2 id="existing-purchase-heading">
              {tSite("Start from your existing purchase.")}
            </h2>
            <p>
              {tSite(
                "Purchase recovery sends a fresh link for eligible access. Check the downloaded manifest to see which version is available for your purchase.",
              )}
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/orders/recover">
              {tSite("Recover purchase access")}
            </Link>
          </Button>
        </section>

        <footer className={styles.notes}>
          <p>
            {tSite(
              "Updates follow the licence for your purchase and continued product availability. Separate products are not automatically added; earlier purchases retain their applicable terms.",
            )}
          </p>
          <div>
            <Link href="/license">{tSite("Read the licence")}</Link>
            <Link href="/changelog">{tSite("Ecosystem changelog")}</Link>
          </div>
        </footer>
      </main>
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/product-releases", locale);
}

import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Scale,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Card, Badge, Button } from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'License',
  description:
    'Licensing information for PyColors products, including open-source repositories, free starters, premium templates, future PRO products, and bundled commercial access.',
  alternates: { canonical: '/license' },
  openGraph: {
    title: 'License · PyColors',
    description:
      'Understand how PyColors products can be used across open-source repositories, commercial templates, PRO products, and bundled access.',
    url: '/license',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'License · PyColors',
    description:
      'Understand how PyColors products can be used across open-source repositories, commercial templates, PRO products, and bundled access.',
    images: ['/seo/twitter-main.png'],
  },
};

type LicenseSection = {
  title: string;
  description: string;
  items: string[];
};

const COMPANY = {
  name: 'Py Colors SASU',
  email: 'legal@pycolors.io',
};

const principles = [
  {
    title: 'Clear scope',
    description:
      'Each PyColors product category has its own licensing logic so builders, agencies, and teams know exactly what they can use, modify, and ship.',
    icon: <Scale className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Commercial confidence',
    description:
      'Licensing is structured to support real commercial usage while protecting the long-term value of the ecosystem.',
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Open-core sustainability',
    description:
      'Open foundations drive adoption. Premium layers fund maintenance, documentation, support, and future product acceleration.',
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  },
];

const openSourceSection: LicenseSection = {
  title: '1. Open-source repositories',
  description:
    'PyColors publishes public open-source repositories, including UI foundations, tokens, developer tooling, Starter Free, and public website mirrors.',
  items: [
    'Each public repository is governed by the license file included in that specific repository.',
    'If a repository includes an MIT license, that repository is governed by MIT for that repository scope only.',
    'Open-source access does not grant rights over paid products, premium assets, private repositories, premium drops, bundled commercial access, or future commercial offers unless explicitly stated.',
    'Brand assets, trademarks, product names, logos, domain names, and commercial positioning remain the property of Py Colors SASU unless expressly licensed.',
    'Open-source repositories are part of the PyColors open-core strategy, but they do not create a right to reproduce or redistribute premium acceleration layers.',
  ],
};

const templateSection: LicenseSection = {
  title: '2. Premium templates',
  description:
    'Premium templates sold by PyColors, including NA-AI — Premium AI Analytics Landing Page (Next.js), are commercial digital products.',
  items: [
    'A valid purchase grants a non-exclusive, non-transferable, revocable commercial license to use the purchased template for personal or commercial end products.',
    'Client work is allowed.',
    'You may modify the code for your own product or for a client deliverable.',
    'You may not resell, redistribute, sublicense, repackage, publish, or share the source code, design files, or substantially similar derivative template kits.',
    'You may not offer the template as a competing starter, UI kit, boilerplate, page builder pack, marketplace asset, or downloadable product.',
    'Unless explicitly stated otherwise on the product page or checkout page, one purchase covers one end product or one client project. Additional projects may require an additional license.',
  ],
};

const proSection: LicenseSection = {
  title: '3. PRO products and bundled access',
  description:
    'Future commercial products may include UI PRO, Starter PRO, premium blocks, premium templates, subscriptions, member access, and All-In Access.',
  items: [
    'UI PRO, Starter PRO, and future bundled access offers are governed by the commercial terms displayed on their relevant sales page, access page, checkout flow, invoice, or order form at the time of purchase.',
    'Commercial access may be granted as a one-time license, subscription, seat-based access, update-based entitlement, or bundle-based entitlement depending on the offer.',
    'Included products, updates, support, private releases, and future premium drops depend on the scope explicitly included in the purchased offer.',
    'All-In Access grants commercial access to the products and updates explicitly included in the offer at the time of purchase. It does not transfer ownership of the underlying products or intellectual property.',
    'Unless explicitly stated otherwise, future PRO purchases do not grant resale rights, sublicensing rights, or redistribution rights over the product itself.',
  ],
};

const restrictionsSection: LicenseSection = {
  title: '4. Restrictions across paid products',
  description:
    'These restrictions protect the value of PyColors products and keep the ecosystem sustainable.',
  items: [
    'No resale or redistribution of source code, premium assets, premium files, or private release materials.',
    'No sublicensing or white-label resale of the product itself.',
    'No public or private sharing of paid source code outside the scope of your authorized project, company, or permitted internal team use.',
    'No creation of competing commercial starters, UI kits, template packs, block libraries, or downloadable derivative products based substantially on PyColors paid products.',
    'No removal of license notices where preservation is required.',
    'No use of PyColors trademarks, brand identity, or product naming in a way that implies official affiliation, partnership, endorsement, or product origin without written permission.',
  ],
};

const updatesSection: LicenseSection = {
  title: '5. Updates and support',
  description:
    'Not every product includes the same level of updates, maintenance, documentation, or support.',
  items: [
    'Open-source repositories may receive public updates without any service-level commitment.',
    'Premium template purchases generally include the product version delivered at purchase time, plus any update rights explicitly described on the product page or checkout page.',
    'PRO products or bundles may include broader update access, premium documentation, private releases, or commercial support depending on the purchased offer.',
    'Included updates and future premium drops are limited to the scope of the applicable offer and should not be interpreted as unlimited rights to every current or future PyColors product.',
    'Unless expressly included, support is provided on a reasonable-effort basis and is not a managed services commitment.',
  ],
};

function SectionCard({ section }: { section: LicenseSection }) {
  return (
    <Card className="p-6 sm:p-7">
      <div className="space-y-2">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {section.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {section.description}
        </p>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
        {section.items.map((it) => (
          <li key={it} className="flex gap-2">
            <span
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
              aria-hidden="true"
            />
            <span className="text-pretty">{it}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function LicensePage() {
  const LAST_UPDATED = 'March 7, 2026';

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                Licensing & commercial use
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              License
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              This page explains how PyColors products can be used
              across open-source repositories, premium templates, PRO
              products, and bundled commercial offers.
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((p) => (
                <Card key={p.title} className="p-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    {p.icon}
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl space-y-4">
            <SectionCard section={openSourceSection} />
            <SectionCard section={templateSection} />
            <SectionCard section={proSection} />
            <SectionCard section={restrictionsSection} />
            <SectionCard section={updatesSection} />

            <Card className="p-6 sm:p-7">
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <h2 className="font-brand text-lg font-semibold tracking-tight text-foreground">
                  6. License priority
                </h2>
                <p>
                  If there is any conflict between this page and a
                  license shown on a specific repository, product
                  page, access page, checkout page, invoice, or
                  commercial order form, the more specific terms
                  control for that repository, product, or offer.
                </p>
                <p>
                  For example, an open-source repository license
                  governs that repository, while a paid Gumroad
                  template purchase is governed by the commercial
                  license attached to that purchase.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-7">
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <h2 className="font-brand text-lg font-semibold tracking-tight text-foreground">
                  7. Contact
                </h2>
                <p>
                  Licensing questions can be sent to{' '}
                  <a
                    className="underline underline-offset-4 hover:text-foreground"
                    href={`mailto:${COMPANY.email}`}
                  >
                    {COMPANY.email}
                  </a>
                  .
                </p>
                <p>
                  PyColors licensing is operated by {COMPANY.name}.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline">
                  <Link href="/terms">
                    Terms
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/privacy">
                    Privacy
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </Card>

            <p className="text-center text-xs text-muted-foreground">
              This page is informational and commercial in intent, but
              some product-specific licensing details may still
              require legal review before large-scale launch.
            </p>
          </section>
        </Container>
      </main>
    </div>
  );
}

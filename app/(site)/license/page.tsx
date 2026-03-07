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
    'Licensing information for PyColors products, including open-source packages, free starters, premium templates, future PRO products, and bundled commercial access.',
  alternates: { canonical: '/license' },
  openGraph: {
    title: 'License · PyColors',
    description:
      'Understand how PyColors products can be used across open-source, commercial templates, PRO products, and bundles.',
    url: '/license',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'License · PyColors',
    description:
      'Understand how PyColors products can be used across open-source, commercial templates, PRO products, and bundles.',
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
      'Each PyColors product category has its own licensing logic so customers know exactly what they can use, modify, and ship.',
    icon: <Scale className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Commercial confidence',
    description:
      'Licensing is structured to support founders, agencies, SaaS teams, and long-term commercial usage without ambiguity.',
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Sustainable ecosystem',
    description:
      'Free products help builders start fast. Premium products fund maintenance, upgrades, documentation, and future releases.',
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  },
];

const openSourceSection: LicenseSection = {
  title: '1. Open-source products',
  description:
    'Some PyColors products are distributed as open-source software, including PyColors UI and Starter Free.',
  items: [
    'Open-source products are governed by the license included in their repository.',
    'If a repository includes an MIT license, that repository is governed by MIT only.',
    'Open-source access does not grant rights over paid products, premium assets, private repositories, or future commercial drops unless explicitly stated.',
    'Brand assets, trademarks, product names, logos, and commercial positioning remain the property of Py Colors SASU unless expressly licensed.',
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
    'Unless explicitly stated otherwise on the product page, one purchase covers one end product or one client project. Additional projects may require an additional license.',
  ],
};

const proSection: LicenseSection = {
  title: '3. Future PRO products',
  description:
    'Future commercial products may include Starter Pro, UI Pro, premium blocks, premium templates, and bundle access.',
  items: [
    'Starter Pro, UI Pro, and future commercial bundles will be governed by the license terms displayed on their respective sales pages at the time of purchase.',
    'Commercial access may be granted as a one-time license, subscription, seat-based access, or bundle-based entitlement depending on the offer.',
    'Access to updates, support, future drops, and premium content may depend on the specific plan purchased.',
    'Unless explicitly stated, future PRO purchases do not transfer ownership of the product itself; they grant a right to use it under the applicable commercial terms.',
  ],
};

const restrictionsSection: LicenseSection = {
  title: '4. Restrictions that apply across paid products',
  description:
    'These restrictions protect the value of PyColors products and keep the ecosystem sustainable.',
  items: [
    'No resale or redistribution of source code, assets, or premium files.',
    'No sublicensing or white-label resale of the product itself.',
    'No public or private sharing of paid source code outside the scope of your authorized project or team.',
    'No removal of license notices where preservation is required.',
    'No use of PyColors trademarks, brand identity, or product naming in a way that implies official affiliation, partnership, or endorsement without written permission.',
  ],
};

const updatesSection: LicenseSection = {
  title: '5. Updates and support',
  description:
    'Not every product includes the same level of updates, maintenance, or support.',
  items: [
    'Open-source products may receive community-visible updates without any service-level commitment.',
    'Premium template purchases generally include the product version delivered at purchase time, plus any update rights explicitly described on the product page.',
    'Future PRO products or bundles may include broader update access, premium documentation, private releases, or commercial support depending on the offer.',
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
              across open-source repositories, premium templates,
              future PRO products, and bundled commercial offers.
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
                  license shown on a specific product page, checkout
                  page, repository, invoice, or commercial order form,
                  the more specific product-level terms will control
                  for that product.
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

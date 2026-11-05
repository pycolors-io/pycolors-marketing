import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import BuildGuide, {
  generateMetadata as getLocalizedMetadata0,
} from "../../app/[locale]/(site)/guides/build-saas-nextjs/page";
import FoundationGuide, {
  generateMetadata as getLocalizedMetadata1,
} from "../../app/[locale]/(site)/guides/production-ready-saas-starter/page";
import AuthGuide, {
  generateMetadata as getLocalizedMetadata2,
} from "../../app/[locale]/(site)/guides/saas-auth-flows/page";
import BillingGuide, {
  generateMetadata as getLocalizedMetadata3,
} from "../../app/[locale]/(site)/guides/saas-billing-ux/page";
import DashboardGuide, {
  generateMetadata as getLocalizedMetadata4,
} from "../../app/[locale]/(site)/guides/saas-dashboard-design/page";
import OrganizationGuide, {
  generateMetadata as getLocalizedMetadata5,
} from "../../app/[locale]/(site)/guides/saas-organizations/page";
import AdminGuide, {
  generateMetadata as getLocalizedMetadata6,
} from "../../app/[locale]/(site)/guides/saas-admin-panels/page";
import PwaGuide, {
  generateMetadata as getLocalizedMetadata7,
} from "../../app/[locale]/(site)/guides/pwa-for-saas/page";

const buildMetadata = await getLocalizedMetadata0({
  params: Promise.resolve({ locale: "en" }),
});

const foundationMetadata = await getLocalizedMetadata1({
  params: Promise.resolve({ locale: "en" }),
});

const authMetadata = await getLocalizedMetadata2({
  params: Promise.resolve({ locale: "en" }),
});

const billingMetadata = await getLocalizedMetadata3({
  params: Promise.resolve({ locale: "en" }),
});

const dashboardMetadata = await getLocalizedMetadata4({
  params: Promise.resolve({ locale: "en" }),
});

const organizationMetadata = await getLocalizedMetadata5({
  params: Promise.resolve({ locale: "en" }),
});

const adminMetadata = await getLocalizedMetadata6({
  params: Promise.resolve({ locale: "en" }),
});

const pwaMetadata = await getLocalizedMetadata7({
  params: Promise.resolve({ locale: "en" }),
});

const guides = [
  ["build-saas-nextjs", BuildGuide, buildMetadata],
  ["production-ready-saas-starter", FoundationGuide, foundationMetadata],
  ["saas-auth-flows", AuthGuide, authMetadata],
  ["saas-billing-ux", BillingGuide, billingMetadata],
  ["saas-dashboard-design", DashboardGuide, dashboardMetadata],
  ["saas-organizations", OrganizationGuide, organizationMetadata],
  ["saas-admin-panels", AdminGuide, adminMetadata],
  ["pwa-for-saas", PwaGuide, pwaMetadata],
] as const;

describe("Internal guide reading experience", () => {
  for (const [slug, Page, metadata] of guides) {
    it(`${slug} connects every section, documentation and related guide`, () => {
      const { container } = render(<Page />);
      expect(metadata.alternates?.canonical).toBe(`/guides/${slug}`);
      expect(screen.getByRole("main")).toHaveAttribute("id", "content");
      expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      const article = screen.getByRole("article", {
        name: screen.getByRole("heading", { level: 1 }).textContent!,
      });
      expect(article).toHaveAccessibleName(
        screen.getByRole("heading", { level: 1 }).textContent!,
      );
      const ids = [...container.querySelectorAll("[id]")].map(
        (element) => element.id,
      );
      expect(new Set(ids).size).toBe(ids.length);
      for (const link of container.querySelectorAll(
        'nav[aria-label="On this page"] a',
      )) {
        const target = document.getElementById(
          link.getAttribute("href")!.slice(1),
        );
        expect(target).not.toBeNull();
        expect(article).toContainElement(target);
      }
      const related = screen.getByRole("region", {
        name: "Connect the next part of your product.",
      });
      const links = within(related).getAllByRole("link");
      expect(links).toHaveLength(2);
      for (const link of links) {
        expect(link).toHaveAccessibleName();
        expect(link).not.toHaveAttribute("href", `/guides/${slug}`);
        expect(
          guides.some(
            ([relatedSlug]) =>
              link.getAttribute("href") === `/guides/${relatedSlug}`,
          ),
        ).toBe(true);
      }
      expect(
        container.querySelector('main > div > header a[href^="/docs/"]'),
      ).not.toBeNull();
      expect(within(article).queryByRole("status")).toBeNull();
    });

    it(`${slug} has no automated accessibility violations`, async () => {
      const { container } = render(<Page />);
      expect(await axe(container)).toHaveNoViolations();
    }, 15_000);
  }
});

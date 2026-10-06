import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import BuildGuide, {
  metadata as buildMetadata,
} from "../../app/(site)/guides/build-saas-nextjs/page";
import FoundationGuide, {
  metadata as foundationMetadata,
} from "../../app/(site)/guides/production-ready-saas-starter/page";
import AuthGuide, {
  metadata as authMetadata,
} from "../../app/(site)/guides/saas-auth-flows/page";
import BillingGuide, {
  metadata as billingMetadata,
} from "../../app/(site)/guides/saas-billing-ux/page";
import DashboardGuide, {
  metadata as dashboardMetadata,
} from "../../app/(site)/guides/saas-dashboard-design/page";
import OrganizationGuide, {
  metadata as organizationMetadata,
} from "../../app/(site)/guides/saas-organizations/page";
import AdminGuide, {
  metadata as adminMetadata,
} from "../../app/(site)/guides/saas-admin-panels/page";
import PwaGuide, {
  metadata as pwaMetadata,
} from "../../app/(site)/guides/pwa-for-saas/page";

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

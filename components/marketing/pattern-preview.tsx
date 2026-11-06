import { useCopy } from "@/lib/i18n/use-copy";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  CreditCard,
  LayoutDashboard,
  Settings2,
  Users,
} from "lucide-react";
import { cn } from "@pycolors/ui";
import styles from "./ui-patterns.module.css";

export type PatternKind =
  "dashboard" | "billing" | "settings" | "team" | "shell" | "upgrade";

/** Decorative layout illustrations. Working examples live in the linked Blocks. */
export function PatternPreview({
  kind,
  featured = false,
}: {
  kind: PatternKind;
  featured?: boolean;
}) {
  const tSite = useCopy();

  return (
    <div
      aria-hidden="true"
      className={cn(styles.mock, featured && styles.featuredMock)}
    >
      {kind === "dashboard" ? (
        <>
          <div className={styles.mockHeader}>
            <span>
              <LayoutDashboard size={13} />
              {tSite("Overview")}
            </span>
            {featured ? (
              <span className={styles.mockAction}>
                {tSite("New project ")}
                <ArrowUpRight size={11} />
              </span>
            ) : (
              <span className={styles.mockSubtle}>
                {tSite("This month")}
                <ChevronDown size={11} />
              </span>
            )}
          </div>
          <div className={styles.metrics}>
            <div>
              <span>{tSite("Projects")}</span>
              <strong>12</strong>
              <small>{tSite("3 in progress")}</small>
            </div>
            <div>
              <span>{tSite("Team members")}</span>
              <strong>8</strong>
              <small>{tSite("Across 2 teams")}</small>
            </div>
            <div>
              <span>{tSite("Tasks complete")}</span>
              <strong>86%</strong>
              <small>{tSite("On track")}</small>
            </div>
          </div>
          <div className={styles.mockRow}>
            <span>
              <i className={styles.mockDot} />
              {tSite("Website refresh")}
            </span>
            <span className={styles.mockPill}>{tSite("In progress")}</span>
          </div>
          <div className={styles.mockRow}>
            <span>
              <i className={styles.mockDot} />
              {tSite("Design system")}
            </span>
            <span className={styles.mockSubtle}>{tSite("Updated today")}</span>
          </div>
        </>
      ) : null}
      {kind === "billing" ? (
        <>
          <div className={styles.mockHeader}>
            <span>
              <CreditCard size={13} />
              {tSite("Subscription")}
            </span>
            <span className={styles.mockPill}>
              <i className={styles.successDot} />
              {tSite("Active")}
            </span>
          </div>
          <div className={styles.planSummary}>
            <div>
              <span className={styles.mockSubtle}>{tSite("Current plan")}</span>
              <strong>{tSite("Workspace plan")}</strong>
            </div>
            <span className={styles.mockAction}>
              {tSite("Manage plan")}
              <ArrowUpRight size={11} />
            </span>
          </div>
          <div className={styles.mockRow}>
            <span>{tSite("Billing cycle")}</span>
            <span>{tSite("Monthly")}</span>
          </div>
          <div className={styles.mockRow}>
            <span>{tSite("Payment method")}</span>
            <span>{tSite("Visa ···· 4242")}</span>
          </div>
          <div className={styles.mockRow}>
            <span>{tSite("Latest invoice")}</span>
            <span className={styles.mockPill}>{tSite("Paid")}</span>
          </div>
        </>
      ) : null}
      {kind === "settings" ? (
        <>
          <div className={styles.mockHeader}>
            <span>
              <Settings2 size={13} />
              {tSite("Workspace settings")}
            </span>
            <span className={styles.mockSubtle}>{tSite("General")}</span>
          </div>
          <div className={styles.mockField}>
            <span>{tSite("Workspace name")}</span>
            <div>{tSite("Acme Studio")}</div>
          </div>
          <div className={styles.mockField}>
            <span>{tSite("Contact email")}</span>
            <div>{tSite("team@example.com")}</div>
          </div>
          <div className={styles.mockFooter}>
            <span>
              <Check size={12} />
              {tSite("All changes saved")}
            </span>
            <span className={styles.mockAction}>{tSite("Save changes")}</span>
          </div>
        </>
      ) : null}
      {kind === "team" ? (
        <>
          <div className={styles.mockHeader}>
            <span>
              <Users size={13} />
              {tSite("Members")}
            </span>
            <span className={styles.mockAction}>{tSite("Invite member")}</span>
          </div>
          {[
            ["AL", "Alex Lee", "Owner"],
            ["JM", "Jamie Morgan", "Member"],
            ["TS", "Taylor Smith", "Invited"],
          ].map(([initials, name, role]) => (
            <div className={styles.member} key={initials}>
              <span className={styles.avatar}>{tSite(initials)}</span>
              <span>
                {tSite(name)}
                <small>
                  {tSite(
                    role === "Invited"
                      ? "Invitation pending"
                      : "Workspace member",
                  )}
                </small>
              </span>
              <span
                className={
                  role === "Invited" ? styles.mockPill : styles.mockSubtle
                }
              >
                {tSite(role)}
              </span>
            </div>
          ))}
        </>
      ) : null}
      {kind === "shell" ? (
        <div className={styles.shellPreview}>
          <div className={styles.mockSidebar}>
            <strong>
              <span className={styles.workspaceMark}>{tSite("A")}</span>
              {tSite("Acme")}
            </strong>
            <span className={styles.activeNav}>
              <LayoutDashboard size={12} />
              {tSite("Overview")}
            </span>
            <span>
              <Users size={12} />
              {tSite("Members")}
            </span>
            <span>
              <CreditCard size={12} />
              {tSite("Billing")}
            </span>
            <span>
              <Settings2 size={12} />
              {tSite("Settings")}
            </span>
            <small>{tSite("Workspace navigation")}</small>
          </div>
          <div className={styles.shellContent}>
            <div className={styles.shellHeader}>
              {tSite("Workspace / Overview")}
              <CircleDot size={12} />
            </div>
            <strong>{tSite("Your workspace")}</strong>
            <span className={styles.skeletonLine} />
            <div className={styles.skeletonCards}>
              <span />
              <span />
            </div>
            <div className={styles.skeletonTable}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      ) : null}
      {kind === "upgrade" ? (
        <>
          <div className={styles.mockHeader}>
            <span>{tSite("Your workspace, with room to grow.")}</span>
          </div>
          <div className={styles.planChoices}>
            <div>
              <span className={styles.mockSubtle}>{tSite("Current plan")}</span>
              <strong>{tSite("Essential")}</strong>
              <span>
                <Check size={11} />
                {tSite("Core workspace")}
              </span>
              <span>
                <Check size={11} />
                {tSite("Standard limits")}
              </span>
              <span className={styles.currentPlan}>{tSite("Your plan")}</span>
            </div>
            <div className={styles.nextPlan}>
              <span className={styles.mockSubtle}>{tSite("Next step")}</span>
              <strong>{tSite("Growth")}</strong>
              <span>
                <Check size={11} />
                {tSite("More capacity")}
              </span>
              <span>
                <Check size={11} />
                {tSite("Team controls")}
              </span>
              <span className={styles.mockAction}>
                {tSite("Compare plans")}
                <ArrowUpRight size={11} />
              </span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function PatternAnatomy() {
  const tSite = useCopy();

  return (
    <figure className={styles.anatomy}>
      <div className={styles.anatomyHeading}>
        <span>
          <LayoutDashboard size={14} aria-hidden="true" />
          {tSite("A screen, with a system.")}
        </span>
        <span>{tSite("UI / 01")}</span>
      </div>
      <div className={styles.anatomyStage}>
        <PatternPreview kind="dashboard" featured />
      </div>
      <figcaption>
        <ol className={styles.anatomyLegend}>
          <li>
            <span>01</span>
            <strong>{tSite("Orient")}</strong>
            <small>{tSite("A clear location")}</small>
          </li>
          <li>
            <span>02</span>
            <strong>{tSite("Understand")}</strong>
            <small>{tSite("Useful context")}</small>
          </li>
          <li>
            <span>03</span>
            <strong>{tSite("Act")}</strong>
            <small>{tSite("A visible next step")}</small>
          </li>
        </ol>
        <p>{tSite("Illustrative layout · Sample data")}</p>
      </figcaption>
    </figure>
  );
}

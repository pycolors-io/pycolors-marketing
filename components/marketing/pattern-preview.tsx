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
              Overview
            </span>
            {featured ? (
              <span className={styles.mockAction}>
                New project <ArrowUpRight size={11} />
              </span>
            ) : (
              <span className={styles.mockSubtle}>
                This month
                <ChevronDown size={11} />
              </span>
            )}
          </div>
          <div className={styles.metrics}>
            <div>
              <span>Projects</span>
              <strong>12</strong>
              <small>3 in progress</small>
            </div>
            <div>
              <span>Team members</span>
              <strong>8</strong>
              <small>Across 2 teams</small>
            </div>
            <div>
              <span>Tasks complete</span>
              <strong>86%</strong>
              <small>On track</small>
            </div>
          </div>
          <div className={styles.mockRow}>
            <span>
              <i className={styles.mockDot} />
              Website refresh
            </span>
            <span className={styles.mockPill}>In progress</span>
          </div>
          <div className={styles.mockRow}>
            <span>
              <i className={styles.mockDot} />
              Design system
            </span>
            <span className={styles.mockSubtle}>Updated today</span>
          </div>
        </>
      ) : null}
      {kind === "billing" ? (
        <>
          <div className={styles.mockHeader}>
            <span>
              <CreditCard size={13} />
              Subscription
            </span>
            <span className={styles.mockPill}>
              <i className={styles.successDot} />
              Active
            </span>
          </div>
          <div className={styles.planSummary}>
            <div>
              <span className={styles.mockSubtle}>Current plan</span>
              <strong>Workspace plan</strong>
            </div>
            <span className={styles.mockAction}>
              Manage plan
              <ArrowUpRight size={11} />
            </span>
          </div>
          <div className={styles.mockRow}>
            <span>Billing cycle</span>
            <span>Monthly</span>
          </div>
          <div className={styles.mockRow}>
            <span>Payment method</span>
            <span>Visa ···· 4242</span>
          </div>
          <div className={styles.mockRow}>
            <span>Latest invoice</span>
            <span className={styles.mockPill}>Paid</span>
          </div>
        </>
      ) : null}
      {kind === "settings" ? (
        <>
          <div className={styles.mockHeader}>
            <span>
              <Settings2 size={13} />
              Workspace settings
            </span>
            <span className={styles.mockSubtle}>General</span>
          </div>
          <div className={styles.mockField}>
            <span>Workspace name</span>
            <div>Acme Studio</div>
          </div>
          <div className={styles.mockField}>
            <span>Contact email</span>
            <div>team@example.com</div>
          </div>
          <div className={styles.mockFooter}>
            <span>
              <Check size={12} />
              All changes saved
            </span>
            <span className={styles.mockAction}>Save changes</span>
          </div>
        </>
      ) : null}
      {kind === "team" ? (
        <>
          <div className={styles.mockHeader}>
            <span>
              <Users size={13} />
              Members
            </span>
            <span className={styles.mockAction}>Invite member</span>
          </div>
          {[
            ["AL", "Alex Lee", "Owner"],
            ["JM", "Jamie Morgan", "Member"],
            ["TS", "Taylor Smith", "Invited"],
          ].map(([initials, name, role]) => (
            <div className={styles.member} key={initials}>
              <span className={styles.avatar}>{initials}</span>
              <span>
                {name}
                <small>
                  {role === "Invited"
                    ? "Invitation pending"
                    : "Workspace member"}
                </small>
              </span>
              <span
                className={
                  role === "Invited" ? styles.mockPill : styles.mockSubtle
                }
              >
                {role}
              </span>
            </div>
          ))}
        </>
      ) : null}
      {kind === "shell" ? (
        <div className={styles.shellPreview}>
          <div className={styles.mockSidebar}>
            <strong>
              <span className={styles.workspaceMark}>A</span>Acme
            </strong>
            <span className={styles.activeNav}>
              <LayoutDashboard size={12} />
              Overview
            </span>
            <span>
              <Users size={12} />
              Members
            </span>
            <span>
              <CreditCard size={12} />
              Billing
            </span>
            <span>
              <Settings2 size={12} />
              Settings
            </span>
            <small>Workspace navigation</small>
          </div>
          <div className={styles.shellContent}>
            <div className={styles.shellHeader}>
              Workspace / Overview
              <CircleDot size={12} />
            </div>
            <strong>Your workspace</strong>
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
            <span>Your workspace, with room to grow.</span>
          </div>
          <div className={styles.planChoices}>
            <div>
              <span className={styles.mockSubtle}>Current plan</span>
              <strong>Essential</strong>
              <span>
                <Check size={11} />
                Core workspace
              </span>
              <span>
                <Check size={11} />
                Standard limits
              </span>
              <span className={styles.currentPlan}>Your plan</span>
            </div>
            <div className={styles.nextPlan}>
              <span className={styles.mockSubtle}>Next step</span>
              <strong>Growth</strong>
              <span>
                <Check size={11} />
                More capacity
              </span>
              <span>
                <Check size={11} />
                Team controls
              </span>
              <span className={styles.mockAction}>
                Compare plans
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
  return (
    <figure className={styles.anatomy}>
      <div className={styles.anatomyHeading}>
        <span>
          <LayoutDashboard size={14} aria-hidden="true" />A screen, with a
          system.
        </span>
        <span>UI / 01</span>
      </div>
      <div className={styles.anatomyStage}>
        <PatternPreview kind="dashboard" featured />
      </div>
      <figcaption>
        <ol className={styles.anatomyLegend}>
          <li>
            <span>01</span>
            <strong>Orient</strong>
            <small>A clear location</small>
          </li>
          <li>
            <span>02</span>
            <strong>Understand</strong>
            <small>Useful context</small>
          </li>
          <li>
            <span>03</span>
            <strong>Act</strong>
            <small>A visible next step</small>
          </li>
        </ol>
        <p>Illustrative layout · Sample data</p>
      </figcaption>
    </figure>
  );
}

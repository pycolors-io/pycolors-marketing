"use client";

import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Check, RotateCcw, Settings2 } from "lucide-react";
import type { ThemeMode, ThemeModeResult } from "@pycolors/color-engine";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pycolors/ui";
import { useCopy } from "@/lib/i18n/use-copy";
import { createThemePreviewVariables } from "@/components/theme-builder/theme-preview-variables";
import { DEFAULT_THEME_FONT } from "@/components/theme-builder/theme-typography";
import styles from "./ui-workspace-preview.module.css";

type Workspace = Readonly<{
  name: string;
  email: string;
  activity: boolean;
  summary: boolean;
}>;
const INITIAL_WORKSPACE: Workspace = {
  name: "Northstar Studio",
  email: "hello@example.com",
  activity: true,
  summary: false,
};

const ACCENTS = [
  {
    id: "graphite",
    label: "Graphite",
    light: "#17181d",
    dark: "#ececf0",
    ink: "#17181d",
  },
  {
    id: "violet",
    label: "Violet",
    light: "#6b2fd4",
    dark: "#c4a7ff",
    ink: "#24123c",
  },
  {
    id: "blue",
    label: "Blue",
    light: "#2059bf",
    dark: "#a7c9ff",
    ink: "#102c57",
  },
] as const;

export function UiWorkspacePreview({
  theme,
  mode,
  children,
}: Readonly<{ theme: ThemeModeResult; mode: ThemeMode; children: ReactNode }>) {
  const tSite = useCopy();
  const id = useId();
  const [accent, setAccent] = useState<(typeof ACCENTS)[number]>(ACCENTS[0]);
  const [draft, setDraft] = useState(INITIAL_WORKSPACE);
  const [saved, setSaved] = useState(INITIAL_WORKSPACE);
  const [tab, setTab] = useState("overview");
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [hasSaved, setHasSaved] = useState(false);
  const [feedback, setFeedback] = useState<"saved" | "reset" | null>(null);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim());
  const nameValid = Boolean(draft.name.trim());
  const dirty = (Object.keys(draft) as (keyof Workspace)[]).some(
    (key) => draft[key] !== saved[key],
  );
  const style = {
    ...createThemePreviewVariables(theme),
    ...(accent.id !== "graphite"
      ? {
          "--primary": accent[mode],
          "--primary-foreground": mode === "light" ? "#ffffff" : accent.ink,
          "--ring": accent[mode],
        }
      : {}),
    fontFamily: DEFAULT_THEME_FONT.previewFamily,
    "--font-sans": DEFAULT_THEME_FONT.previewFamily,
    colorScheme: mode,
  } as CSSProperties;

  function reset() {
    setDraft(INITIAL_WORKSPACE);
    setSaved(INITIAL_WORKSPACE);
    setSubmitted(false);
    setHasSaved(false);
    setFeedback("reset");
    setTab("overview");
  }

  return (
    <section
      aria-labelledby={`${id}-title`}
      data-theme-builder-components={mode}
      className={styles.workspace}
      style={style}
    >
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>{tSite("PyColors UI")}</p>
          <h2 id={`${id}-title`}>{tSite("Your theme in use")}</h2>
          <p className={styles.intro}>
            {tSite(
              "Edit a workspace, save your changes and see the result. Switch between light and dark without losing your work.",
            )}
          </p>
        </div>
        <Badge variant="outline" className={styles.demoBadge}>
          {tSite("Interactive demo")}
        </Badge>
      </header>
      <div className={styles.personalization}>
        <fieldset className={styles.accentPicker}>
          <legend>{tSite("Choose an accent")}</legend>
          <div role="radiogroup" aria-label={tSite("Preview accent")}>
            {ACCENTS.map((option) => (
              <label key={option.id} className={styles.accentOption}>
                <input
                  type="radio"
                  name={`${id}-accent`}
                  value={option.id}
                  checked={accent.id === option.id}
                  onChange={() => setAccent(option)}
                />
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: option.light }}
                />
                <span>{tSite(option.label)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <p>{tSite("One interface. Your visual language.")}</p>
      </div>
      <div className={styles.layout}>
        <form
          noValidate
          className={styles.settings}
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
            if (!nameValid || !emailValid) {
              (!nameValid ? nameRef : emailRef).current?.focus();
              return;
            }
            const next = {
              ...draft,
              name: draft.name.trim(),
              email: draft.email.trim(),
            };
            setDraft(next);
            setSaved(next);
            setHasSaved(true);
            setFeedback("saved");
          }}
        >
          <div className={styles.cardHeading}>
            <div>
              <Settings2 aria-hidden="true" />
              <h3>{tSite("Workspace settings")}</h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={reset}
              className={styles.reset}
            >
              <RotateCcw aria-hidden="true" />
              {tSite("Reset workspace")}
            </Button>
          </div>
          <p className={styles.caption}>
            {tSite("Make it yours. The preview updates when you save.")}
          </p>
          <div className={styles.fields}>
            <Input
              ref={nameRef}
              id={`${id}-name`}
              label={tSite("Workspace display name")}
              value={draft.name}
              required
              maxLength={64}
              onChange={(event) => {
                setDraft({ ...draft, name: event.target.value });
                setFeedback(null);
              }}
              error={
                submitted && !nameValid
                  ? tSite("Enter a workspace name.")
                  : undefined
              }
            />
            <Input
              ref={emailRef}
              id={`${id}-email`}
              type="email"
              label={tSite("Contact email")}
              value={draft.email}
              required
              maxLength={254}
              onChange={(event) => {
                setDraft({ ...draft, email: event.target.value });
                setFeedback(null);
              }}
              error={
                submitted && !emailValid
                  ? tSite("Enter a valid email address.")
                  : undefined
              }
              helperText={tSite("No email is sent from this demo.")}
            />
          </div>
          <fieldset className={styles.notifications}>
            <legend>{tSite("Notifications")}</legend>
            {(
              [
                [
                  "activity",
                  "Project activity",
                  "Updates when your team makes progress.",
                ],
                [
                  "summary",
                  "Weekly summary",
                  "A recap of tasks, milestones, and delivery.",
                ],
              ] as const
            ).map(([field, title, description]) => (
              <label
                key={field}
                htmlFor={`${id}-${field}`}
                className={styles.notification}
              >
                <span>
                  <span className={styles.notificationTitle}>
                    {tSite(title)}
                  </span>
                  <span className={styles.caption}>{tSite(description)}</span>
                </span>
                <Checkbox
                  id={`${id}-${field}`}
                  checked={draft[field]}
                  onCheckedChange={(checked) => {
                    setDraft({ ...draft, [field]: checked === true });
                    setFeedback(null);
                  }}
                />
              </label>
            ))}
          </fieldset>
          <div className={styles.saveRow}>
            <p role="status" className={styles.feedback}>
              {feedback === "saved" && !dirty ? (
                <>
                  <Check aria-hidden="true" />
                  {tSite("Demo settings saved in this preview.")}
                </>
              ) : feedback === "reset" ? (
                tSite("Workspace reset to the sample values.")
              ) : (
                tSite("Changes stay in this preview.")
              )}
            </p>
            <Button type="submit" disabled={!nameValid} className={styles.save}>
              {tSite("Save demo settings")}
            </Button>
          </div>
        </form>
        <aside
          aria-label={tSite("Workspace preview")}
          className={styles.result}
        >
          <div className={styles.resultHeading}>
            <span className={styles.eyebrow}>{tSite("Workspace preview")}</span>
            <span className={styles.sample}>{tSite("Sample data")}</span>
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList
              aria-label={tSite("Component demo navigation")}
              className={styles.tabs}
            >
              <TabsTrigger value="overview">{tSite("Overview")}</TabsTrigger>
              <TabsTrigger value="activity">{tSite("Activity")}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className={styles.tabContent}>
              <div className={styles.identity}>
                <span aria-hidden="true" className={styles.avatar}>
                  {saved.name.charAt(0).toUpperCase()}
                </span>
                <h3>{saved.name}</h3>
                <p>{tSite("Sample team workspace")}</p>
              </div>
              <dl className={styles.details}>
                <div>
                  <dt>{tSite("Contact email")}</dt>
                  <dd>{saved.email}</dd>
                </div>
                <div>
                  <dt>{tSite("Project activity")}</dt>
                  <dd>{tSite(saved.activity ? "Enabled" : "Disabled")}</dd>
                </div>
                <div>
                  <dt>{tSite("Weekly summary")}</dt>
                  <dd>{tSite(saved.summary ? "Enabled" : "Disabled")}</dd>
                </div>
              </dl>
            </TabsContent>
            <TabsContent value="activity" className={styles.tabContent}>
              <ul className={styles.activity}>
                {hasSaved && (
                  <li>
                    <Check aria-hidden="true" />
                    <span>{tSite("Workspace settings updated.")}</span>
                  </li>
                )}
                <li>
                  <Check aria-hidden="true" />
                  <span>{tSite("Design review completed")}</span>
                </li>
                <li>
                  <Check aria-hidden="true" />
                  <span>{tSite("Theme tokens updated")}</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
          <p className={styles.resultNote}>
            {tSite("A local preview. No account or service is connected.")}
          </p>
        </aside>
      </div>
      {children}
    </section>
  );
}

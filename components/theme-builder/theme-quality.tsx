import { useCopy } from "@/lib/i18n/use-copy";
import { Check, ChevronDown, Moon, Sun } from "lucide-react";
import type {
  ContrastResult,
  SemanticRole,
  SerializedThemeResult,
  ThemeWarning,
} from "@pycolors/color-engine";

const TEXT_LABELS: Partial<Record<SemanticRole, string>> = {
  foreground: "Page text",
  "card-foreground": "Text inside cards",
  "popover-foreground": "Text inside popovers",
  "primary-foreground": "Text on primary buttons",
  "secondary-foreground": "Text on secondary buttons",
  "muted-foreground": "Secondary text",
  "accent-foreground": "Text on highlighted areas",
  "destructive-foreground": "Text on destructive buttons",
  "success-foreground": "Text on success messages",
  "warning-foreground": "Text on warning messages",
  "surface-foreground": "Text on content surfaces",
  "surface-inverted-foreground": "Text on inverted surfaces",
};

function describeCheck(
  check: ContrastResult,
  tSite: ReturnType<typeof useCopy>,
) {
  switch (check.foregroundRole) {
    case "ring":
      return {
        title: "Keyboard focus outline",
        guidance:
          "The active control may be hard to spot when using a keyboard. Increase the contrast of its focus outline.",
      };
    case "input":
      return {
        title: "Input field outlines",
        guidance:
          "Fields may blend into the page. Strengthen the outline if it is needed to identify the field.",
      };
    case "border":
      return {
        title: "Component borders",
        guidance:
          "Check borders that identify interactive controls. Decorative dividers can stay subtle.",
      };
    default:
      return {
        title: `${tSite(TEXT_LABELS[check.foregroundRole] ?? "Text against its background")}${check.target.usage === "large-text" ? tSite(" (large text)") : ""}`,
        guidance:
          "This text may be hard to read. Increase the difference between the text color and its background.",
      };
  }
}

function ColorSample({
  check,
  theme,
}: Readonly<{ check: ContrastResult; theme: SerializedThemeResult }>) {
  const tSite = useCopy();

  const colors = theme.modes[check.mode].semantic;
  const foreground = colors[check.foregroundRole].srgbHex;
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-border-subtle"
      style={{ backgroundColor: colors[check.backgroundRole].srgbHex }}
    >
      {check.target.usage === "non-text" ? (
        <span
          className="h-5 w-8 rounded-[3px] border"
          style={{ borderColor: foreground }}
        />
      ) : (
        <span
          className={
            check.target.usage === "large-text" ? "text-2xl" : "text-sm"
          }
          style={{ color: foreground }}
        >
          {tSite("Aa")}
        </span>
      )}
    </span>
  );
}

function generationWarningLabel(warning: ThemeWarning) {
  switch (warning.code) {
    case "neutral-derived":
      return "A neutral scale was generated from your brand.";
    case "gamut-mapped":
      return "A color was refined to display reliably.";
    case "foreground-fallback-used":
      return "Text color was strengthened for readability.";
    case "input-normalized":
      return "A color value was normalized.";
    default:
      return warning.code.replaceAll("-", " ");
  }
}

export function ThemeQuality({
  theme,
}: Readonly<{ theme: SerializedThemeResult }>) {
  const tSite = useCopy();

  const failed = theme.contrasts.filter((check) => check.status === "fail");
  const warnings = theme.warnings.filter(
    (warning) => warning.code !== "contrast-below-target",
  );
  const passed = theme.contrasts.length - failed.length;

  return (
    <details className="group/readability rounded-[5px] border border-border-subtle bg-background">
      <summary className="flex min-h-20 cursor-pointer list-none flex-wrap items-center gap-4 rounded-[5px] px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden sm:px-5">
        <span className="min-w-0 flex-1 basis-64">
          <span className="block text-sm font-medium">
            {tSite("Color readability")}
          </span>
          <span className="mt-1 block text-xs leading-5 text-muted-foreground">
            {tSite(
              "Checks text, field outlines, and keyboard focus in light and dark mode.",
            )}
          </span>
        </span>
        <span className="flex items-center gap-3 text-xs">
          <span className="rounded-full border border-border-subtle px-2.5 py-1 tabular-nums">
            {tSite(
              failed.length > 0
                ? tSite(
                    failed.length === 1
                      ? "{value0} check needs review"
                      : "{value0} checks need review",
                    { value0: failed.length },
                  )
                : "All checked colors meet their targets",
            )}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground transition-transform group-open/readability:rotate-180 motion-reduce:transition-none"
          />
        </span>
      </summary>

      <div className="border-t border-border-subtle">
        <div className="space-y-2 px-4 py-5 sm:px-5">
          <p className="text-sm font-medium">
            {tSite(passed)} {tSite(" of ")}
            {tSite(theme.contrasts.length)}{" "}
            {tSite(" checks meet their contrast target.")}
          </p>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            {tSite(
              "Contrast is how much text or a control stands out from its background.",
            )}
            {tSite(
              failed.length > 0
                ? " The items below may be harder to read or find. Review them before using this theme."
                : " These color combinations meet their targets. Check them in your complete interface before using this theme.",
            )}
          </p>
        </div>

        <div className="grid border-t border-border-subtle md:grid-cols-2">
          {(["light", "dark"] as const).map((mode) => {
            const checks = theme.contrasts.filter(
              (check) => check.mode === mode,
            );
            const toReview = checks.filter((check) => check.status === "fail");
            const Icon = mode === "light" ? Sun : Moon;
            return (
              <section
                key={mode}
                aria-label={tSite("{value0} mode readability", {
                  value0: mode === "light" ? "Light" : "Dark",
                })}
                className="min-w-0 px-4 py-5 last:border-t last:border-border-subtle sm:px-5 md:last:border-t-0 md:last:border-l"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Icon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                    {tSite(mode === "light" ? "Light mode" : "Dark mode")}
                  </h3>
                  <p className="text-xs tabular-nums text-muted-foreground">
                    {tSite(checks.length - toReview.length)}{" "}
                    {tSite(" passed · ")}
                    {tSite(toReview.length)}
                    {tSite(" ")}
                    {tSite("to review")}
                  </p>
                </div>
                {toReview.length > 0 ? (
                  <ul className="mt-4 divide-y divide-border-subtle">
                    {toReview.map((check) => {
                      const description = describeCheck(check, tSite);
                      return (
                        <li
                          key={`${check.foregroundRole}-${check.backgroundRole}-${check.target.usage}`}
                          className="flex gap-3 py-4 first:pt-0 last:pb-0"
                        >
                          <ColorSample check={check} theme={theme} />
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium">
                              {tSite(description.title)}
                            </h4>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                              {tSite(description.guidance)}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Check aria-hidden="true" className="size-4 shrink-0" />
                    {tSite("No contrast issues in the checked colors.")}
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <div className="space-y-4 border-t border-border-subtle px-4 py-5 sm:px-5">
          <p className="max-w-3xl text-xs leading-5 text-muted-foreground">
            {tSite(
              failed.length > 0
                ? "Try another preset to compare. For precise adjustments, edit the CSS variables listed below after export. "
                : null,
            )}
            {tSite(
              "This checks generated colors, not every state of your interface. Review actual text, hover, disabled, and keyboard focus states in your app.",
            )}
          </p>
          <details className="group/technical">
            <summary className="flex w-fit min-h-10 cursor-pointer list-none items-center gap-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              {tSite("Technical details")}
              <ChevronDown
                aria-hidden="true"
                className="size-3.5 transition-transform group-open/technical:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <p className="mb-4 max-w-3xl text-xs leading-5 text-muted-foreground">
              {tSite(
                "A higher ratio means more contrast. Each row shows the measured ratio and its target for that use. These results describe the exported colors; they do not certify a complete interface as accessible.",
              )}
            </p>
            {failed.length > 0 ? (
              <ul className="divide-y divide-border-subtle">
                {failed.map((check) => (
                  <li
                    key={`${check.mode}-${check.foregroundRole}-${check.backgroundRole}-${check.target.usage}`}
                    className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 text-xs"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="font-medium">
                        {tSite(describeCheck(check, tSite).title)} ·{tSite(" ")}
                        {tSite(check.mode === "light" ? "Light" : "Dark")}
                      </p>
                      <p className="break-words font-mono text-muted-foreground">
                        --{tSite(check.foregroundRole)} / --
                        {tSite(check.backgroundRole)}
                      </p>
                    </div>
                    <p className="shrink-0 tabular-nums text-muted-foreground">
                      {tSite("Measured ")}
                      {tSite(check.ratio.toFixed(2))}
                      {tSite(":1 · Target")}
                      {tSite(" ")}
                      {tSite(check.target.minimumRatio)}:1
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
            {warnings.length > 0 ? (
              <div className="mt-4 border-t border-border-subtle pt-4">
                <h4 className="text-xs font-medium">
                  {tSite("Automatic color adjustments")}
                </h4>
                <ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">
                  {warnings.map((warning, index) => (
                    <li
                      key={`${warning.code}-${warning.mode}-${warning.role}-${index}`}
                    >
                      {tSite(generationWarningLabel(warning))}
                      {tSite(
                        warning.mode
                          ? tSite(" Applied in {value0} mode.", {
                              value0: tSite(
                                warning.mode === "light" ? "light" : "dark",
                              ),
                            })
                          : "",
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </details>
        </div>
      </div>
    </details>
  );
}

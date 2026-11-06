"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";

import {
  SettingsPanel,
  type SettingsPanelFeedback,
  type SettingsPanelSection,
} from "@/content/blocks/account/settings-panel";

export function SettingsPanelExample() {
  const tSite = useCopy();

  const [displayName, setDisplayName] = React.useState("Alex Morgan");
  const [profileNote, setProfileNote] = React.useState(
    tSite("Product designer working across shared systems."),
  );
  const [workspaceName, setWorkspaceName] = React.useState("Northstar");
  const [displayNameError, setDisplayNameError] = React.useState<string>();
  const [feedback, setFeedback] = React.useState<SettingsPanelFeedback>();

  const sections = [
    {
      id: "profile",
      title: tSite("Profile"),
      description: tSite(
        "Choose the details collaborators see in shared work.",
      ),
      fields: [
        {
          id: "display-name",
          name: "displayName",
          label: tSite("Display name"),
          value: displayName,
          description: tSite(
            "Use the name people recognize when working with you.",
          ),
          error: displayNameError,
          autoComplete: "name",
          required: true,
          onValueChange: (value: string) => {
            setDisplayName(value);
            setDisplayNameError(undefined);
            setFeedback(undefined);
          },
        },
        {
          id: "profile-note",
          kind: "textarea",
          name: "profileNote",
          label: tSite("Profile note"),
          value: profileNote,
          description: tSite(
            "A short, public-facing description of your role.",
          ),
          rows: 3,
          onValueChange: setProfileNote,
        },
      ],
    },
    {
      id: "workspace",
      title: tSite("Workspace"),
      description: tSite(
        "Keep the shared workspace identity clear and current.",
      ),
      fields: [
        {
          id: "workspace-name",
          name: "workspaceName",
          label: tSite("Workspace name"),
          value: workspaceName,
          description: tSite(
            "Shown in navigation and shared workspace surfaces.",
          ),
          onValueChange: setWorkspaceName,
        },
      ],
    },
  ] satisfies readonly SettingsPanelSection[];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!displayName.trim()) {
      setDisplayNameError(tSite("Enter a display name."));
      setFeedback({
        status: "error",
        title: tSite("Review the highlighted field"),
        description: tSite("Nothing has been submitted."),
      });
      return;
    }

    setDisplayNameError(undefined);
    setFeedback({
      status: "success",
      title: tSite("Settings ready to save"),
      description: tSite(
        "Connect this callback to your own persistence layer.",
      ),
    });
  }

  return (
    <div className="not-prose">
      <SettingsPanel
        description={tSite(
          "Update the profile and workspace details your product displays.",
        )}
        feedback={feedback}
        onSubmit={handleSubmit}
        sections={sections}
        submitLabel={tSite("Save settings")}
        title={tSite("Account settings")}
      />
    </div>
  );
}

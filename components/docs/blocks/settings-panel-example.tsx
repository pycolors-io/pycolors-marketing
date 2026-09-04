"use client";

import * as React from "react";

import {
  SettingsPanel,
  type SettingsPanelFeedback,
  type SettingsPanelSection,
} from "@/content/blocks/account/settings-panel";

export function SettingsPanelExample() {
  const [displayName, setDisplayName] = React.useState("Alex Morgan");
  const [profileNote, setProfileNote] = React.useState(
    "Product designer working across shared systems.",
  );
  const [workspaceName, setWorkspaceName] = React.useState("Northstar");
  const [displayNameError, setDisplayNameError] = React.useState<string>();
  const [feedback, setFeedback] = React.useState<SettingsPanelFeedback>();

  const sections = [
    {
      id: "profile",
      title: "Profile",
      description: "Choose the details collaborators see in shared work.",
      fields: [
        {
          id: "display-name",
          name: "displayName",
          label: "Display name",
          value: displayName,
          description: "Use the name people recognize when working with you.",
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
          label: "Profile note",
          value: profileNote,
          description: "A short, public-facing description of your role.",
          rows: 3,
          onValueChange: setProfileNote,
        },
      ],
    },
    {
      id: "workspace",
      title: "Workspace",
      description: "Keep the shared workspace identity clear and current.",
      fields: [
        {
          id: "workspace-name",
          name: "workspaceName",
          label: "Workspace name",
          value: workspaceName,
          description: "Shown in navigation and shared workspace surfaces.",
          onValueChange: setWorkspaceName,
        },
      ],
    },
  ] satisfies readonly SettingsPanelSection[];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!displayName.trim()) {
      setDisplayNameError("Enter a display name.");
      setFeedback({
        status: "error",
        title: "Review the highlighted field",
        description: "Nothing has been submitted.",
      });
      return;
    }

    setDisplayNameError(undefined);
    setFeedback({
      status: "success",
      title: "Settings ready to save",
      description: "Connect this callback to your own persistence layer.",
    });
  }

  return (
    <div className="not-prose">
      <SettingsPanel
        description="Update the profile and workspace details your product displays."
        feedback={feedback}
        onSubmit={handleSubmit}
        sections={sections}
        submitLabel="Save settings"
        title="Account settings"
      />
    </div>
  );
}

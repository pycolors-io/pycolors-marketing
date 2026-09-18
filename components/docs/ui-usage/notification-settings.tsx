"use client";

import * as React from "react";
import {
  Button,
  Checkbox,
  CheckboxField,
  CheckboxLabel,
  Input,
} from "@pycolors/ui";

export function NotificationSettings() {
  const summaryId = React.useId();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [email, setEmail] = React.useState("");
  const [weeklySummary, setWeeklySummary] = React.useState(false);
  const [error, setError] = React.useState("");
  const [saved, setSaved] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved("");
    if (!emailRef.current?.validity.valid) {
      setError("Enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    setError("");
    setSaved(
      `Saved locally for ${email}. Weekly summary ${weeklySummary ? "on" : "off"}.`,
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4"
    >
      <Input
        ref={emailRef}
        label="Notification email"
        helperText="Use an example address; nothing is sent."
        type="email"
        name="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setError("");
          setSaved("");
        }}
        error={error}
      />
      <CheckboxField>
        <Checkbox
          id={summaryId}
          name="weeklySummary"
          checked={weeklySummary}
          onCheckedChange={(checked) => {
            setWeeklySummary(checked === true);
            setSaved("");
          }}
        />
        <CheckboxLabel htmlFor={summaryId}>
          Send a weekly workspace summary
        </CheckboxLabel>
      </CheckboxField>
      <Button type="submit">Save preview settings</Button>
      <p role="status" className="text-sm text-muted-foreground break-words">
        {saved}
      </p>
    </form>
  );
}

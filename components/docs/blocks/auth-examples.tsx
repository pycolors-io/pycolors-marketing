"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import * as React from "react";

import { PasswordRecoveryPanel } from "@/content/blocks/auth/password-recovery";
import { SignInPanel } from "@/content/blocks/auth/sign-in";
import { SignUpPanel } from "@/content/blocks/auth/sign-up";

type DemoFieldProps = Readonly<{
  autoComplete: string;
  label: string;
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
}>;

const inputClassName =
  "h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
const primaryButtonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";
const secondaryButtonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

function DemoField({
  autoComplete,
  label,
  name,
  placeholder,
  type,
}: DemoFieldProps) {
  const tSite = useCopy();

  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {tSite(label)}
      <input
        autoComplete={autoComplete}
        className={inputClassName}
        name={name}
        placeholder={tSite(placeholder)}
        type={type}
      />
    </label>
  );
}

function DemoStatus({ message }: { message?: string }) {
  const tSite = useCopy();

  return (
    <p aria-live="polite" className="min-h-5 text-xs text-muted-foreground">
      {tSite(
        message ?? "Interactive preview only. No network request is performed.",
      )}
    </p>
  );
}

export function SignInExample() {
  const tSite = useCopy();

  const [status, setStatus] = React.useState<string>();

  return (
    <div className="not-prose mx-auto max-w-md space-y-4">
      <SignInPanel
        title={tSite("Sign in")}
        description={tSite("Use your workspace account to continue.")}
        form={
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setStatus(
                "Sign-in submitted locally. No authentication occurred.",
              );
            }}
          >
            <DemoField
              autoComplete="email"
              label={tSite("Email")}
              name="email"
              placeholder={tSite("you@example.com")}
              type="email"
            />
            <DemoField
              autoComplete="current-password"
              label={tSite("Password")}
              name="password"
              placeholder="••••••••"
              type="password"
            />
            <button className={primaryButtonClassName} type="submit">
              {tSite("Sign in")}
            </button>
          </form>
        }
        providers={
          <button
            className={secondaryButtonClassName}
            onClick={() =>
              setStatus(
                "Provider action selected locally. No OAuth flow started.",
              )
            }
            type="button"
          >
            {tSite("Continue with GitHub")}
          </button>
        }
        footer={
          <span>
            {tSite("Need an account?")}
            {tSite(" ")}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/docs/blocks/auth/sign-up"
            >
              {tSite("View sign up")}
            </Link>
          </span>
        }
      />
      <DemoStatus message={status} />
    </div>
  );
}

export function SignUpExample() {
  const tSite = useCopy();

  const [status, setStatus] = React.useState<string>();

  return (
    <div className="not-prose mx-auto max-w-md space-y-4">
      <SignUpPanel
        title={tSite("Create your account")}
        description={tSite(
          "Create a workspace account with application-owned behavior.",
        )}
        form={
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setStatus(
                "Account creation submitted locally. Nothing was persisted.",
              );
            }}
          >
            <DemoField
              autoComplete="name"
              label={tSite("Name")}
              name="name"
              placeholder={tSite("Alex Morgan")}
              type="text"
            />
            <DemoField
              autoComplete="email"
              label={tSite("Email")}
              name="email"
              placeholder={tSite("you@example.com")}
              type="email"
            />
            <DemoField
              autoComplete="new-password"
              label={tSite("Password")}
              name="password"
              placeholder={tSite("Create a password")}
              type="password"
            />
            <button className={primaryButtonClassName} type="submit">
              {tSite("Create account")}
            </button>
          </form>
        }
        consent={
          <span>
            {tSite(
              "By continuing, you accept your application's terms and privacy policy.",
            )}
          </span>
        }
        footer={
          <span>
            {tSite("Already registered?")}
            {tSite(" ")}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/docs/blocks/auth/sign-in"
            >
              {tSite("View sign in")}
            </Link>
          </span>
        }
      />
      <DemoStatus message={status} />
    </div>
  );
}

export function PasswordRecoveryExample() {
  const tSite = useCopy();

  const [status, setStatus] = React.useState<string>();

  return (
    <div className="not-prose mx-auto max-w-md space-y-4">
      <PasswordRecoveryPanel
        title={tSite("Recover your account")}
        description={tSite(
          "Enter the email associated with your workspace account.",
        )}
        form={
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setStatus(
                "Recovery requested locally. No email or reset token was created.",
              );
            }}
          >
            <DemoField
              autoComplete="email"
              label={tSite("Email")}
              name="email"
              placeholder={tSite("you@example.com")}
              type="email"
            />
            <button className={primaryButtonClassName} type="submit">
              {tSite("Request recovery link")}
            </button>
          </form>
        }
        help={tSite("Use the address your application recognizes.")}
        footer={
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            href="/docs/blocks/auth/sign-in"
          >
            {tSite("Back to sign in")}
          </Link>
        }
      />
      <DemoStatus message={status} />
    </div>
  );
}

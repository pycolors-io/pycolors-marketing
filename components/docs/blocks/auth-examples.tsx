"use client";

import Link from "next/link";
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
  "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
const primaryButtonClassName =
  "inline-flex min-h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";
const secondaryButtonClassName =
  "inline-flex min-h-10 w-full items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

function DemoField({
  autoComplete,
  label,
  name,
  placeholder,
  type,
}: DemoFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {label}
      <input
        autoComplete={autoComplete}
        className={inputClassName}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}

function DemoStatus({ message }: { message?: string }) {
  return (
    <p aria-live="polite" className="min-h-5 text-xs text-muted-foreground">
      {message ?? "Interactive preview only. No network request is performed."}
    </p>
  );
}

export function SignInExample() {
  const [status, setStatus] = React.useState<string>();

  return (
    <div className="not-prose space-y-4">
      <SignInPanel
        description="Use your workspace account to continue."
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
              label="Email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <DemoField
              autoComplete="current-password"
              label="Password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
            <button className={primaryButtonClassName} type="submit">
              Sign in
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
            Continue with GitHub
          </button>
        }
        footer={
          <span>
            Need an account?{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/docs/blocks/auth/sign-up"
            >
              View sign up
            </Link>
          </span>
        }
      />
      <DemoStatus message={status} />
    </div>
  );
}

export function SignUpExample() {
  const [status, setStatus] = React.useState<string>();

  return (
    <div className="not-prose space-y-4">
      <SignUpPanel
        description="Create a workspace account with application-owned behavior."
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
              label="Name"
              name="name"
              placeholder="Alex Morgan"
              type="text"
            />
            <DemoField
              autoComplete="email"
              label="Email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <DemoField
              autoComplete="new-password"
              label="Password"
              name="password"
              placeholder="Create a password"
              type="password"
            />
            <button className={primaryButtonClassName} type="submit">
              Create account
            </button>
          </form>
        }
        consent={
          <span>
            {
              "By continuing, you accept your application's terms and privacy policy."
            }
          </span>
        }
        footer={
          <span>
            Already registered?{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/docs/blocks/auth/sign-in"
            >
              View sign in
            </Link>
          </span>
        }
      />
      <DemoStatus message={status} />
    </div>
  );
}

export function PasswordRecoveryExample() {
  const [status, setStatus] = React.useState<string>();

  return (
    <div className="not-prose space-y-4">
      <PasswordRecoveryPanel
        description="Enter the email associated with your workspace account."
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
              label="Email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <button className={primaryButtonClassName} type="submit">
              Request recovery link
            </button>
          </form>
        }
        help="Use the address your application recognizes."
        footer={
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            href="/docs/blocks/auth/sign-in"
          >
            Back to sign in
          </Link>
        }
      />
      <DemoStatus message={status} />
    </div>
  );
}

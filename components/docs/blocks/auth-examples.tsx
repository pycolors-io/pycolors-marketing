"use client";

import Link from "next/link";
import * as React from "react";
import { Button, Input } from "@pycolors/ui";

import { PasswordRecoveryPanel } from "@/content/blocks/auth/password-recovery";
import { SignInPanel } from "@/content/blocks/auth/sign-in";
import { SignUpPanel } from "@/content/blocks/auth/sign-up";

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
            <Input
              autoComplete="email"
              label="Email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <Input
              autoComplete="current-password"
              label="Password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
        }
        providers={
          <Button
            className="w-full"
            onClick={() =>
              setStatus(
                "Provider action selected locally. No OAuth flow started.",
              )
            }
            type="button"
            variant="outline"
          >
            Continue with GitHub
          </Button>
        }
        footer={
          <span>
            Need an account?{" "}
            <Link
              className="font-medium text-foreground underline"
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
            <Input
              autoComplete="name"
              label="Name"
              name="name"
              placeholder="Alex Morgan"
              type="text"
            />
            <Input
              autoComplete="email"
              label="Email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <Input
              autoComplete="new-password"
              label="Password"
              name="password"
              placeholder="Create a password"
              type="password"
            />
            <Button className="w-full" type="submit">
              Create account
            </Button>
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
              className="font-medium text-foreground underline"
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
            <Input
              autoComplete="email"
              label="Email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <Button className="w-full" type="submit">
              Request recovery link
            </Button>
          </form>
        }
        help="Use the address your application recognizes."
        footer={
          <Link
            className="font-medium text-foreground underline"
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

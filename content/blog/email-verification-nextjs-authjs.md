---
title: "How to Build Email Verification in Next.js (Auth.js) — Production Guide"
description: "Learn how to implement a secure email verification flow in Next.js using Auth.js, Prisma, and Resend. Production-ready approach for SaaS apps."
author: Patrice Parny
date: "2026-04-17"
category: Next.js
tags:
  - Next.js
  - Auth.js
  - Authentication
  - SaaS
  - Prisma
  - Email
featured: true
readingTime: 10 min read
cover: /seo/blog/og-blog-saas.png
cta:
  label: Get the production-ready starter
  href: /starters
  variant: pro
---

## How to Build Email Verification in Next.js (Auth.js)

If you're building a real SaaS product, **email verification is not optional**.

Without it, you risk:

- fake accounts
- spam users
- broken onboarding flows
- unreliable user data

In this guide, you’ll learn how to implement a **production-ready email verification flow** using:

- Next.js (App Router)
- Auth.js
- Prisma
- Resend

This is the exact architecture used in the PyColors Starter Pro.

---

## What We’re Building

A complete email verification flow:

1. User registers with email + password
2. A verification email is sent
3. User clicks a secure token link
4. Token is validated
5. Account is marked as verified

---

## Why Email Verification Matters in SaaS

In a real SaaS, email verification impacts:

- onboarding conversion
- security
- billing reliability
- support workflows

If you skip it early, you’ll pay for it later.

---

## Step 1 — Extend Your Database Schema

You need two things:

- a way to know if a user is verified
- a way to store verification tokens

With Prisma:

```prisma
model User {
  id             String   @id @default(cuid())
  email          String   @unique
  emailVerified  DateTime?
  passwordHash   String?
}

model UserToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  type      TokenType
  expiresAt DateTime
  createdAt DateTime @default(now())
}

enum TokenType {
  EMAIL_VERIFICATION
  PASSWORD_RESET
}
```

---

## Step 2 — Generate a Verification Token

```ts
import crypto from "crypto";

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}
```

---

## Step 3 — Store Token

```ts
await prisma.userToken.create({
  data: {
    email: user.email,
    token,
    type: "EMAIL_VERIFICATION",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
});
```

---

## Step 4 — Send Email

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_API_KEY);

await resend.emails.send({
  from: process.env.AUTH_EMAIL_FROM!,
  to: user.email,
  subject: "Verify your email",
  html: `<a href="${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}">Verify</a>`,
});
```

---

## Step 5 — Verify Token

```ts
const tokenRecord = await prisma.userToken.findUnique({
  where: { token },
});

if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
  throw new Error("Invalid or expired token");
}
```

---

## Step 6 — Mark Verified

```ts
await prisma.user.update({
  where: { email: tokenRecord.email },
  data: { emailVerified: new Date() },
});

await prisma.userToken.delete({
  where: { token },
});
```

---

## Step 7 — Protect App

```ts
if (!user.emailVerified) {
  throw new Error("Email not verified");
}
```

---

## Common Mistakes

- no expiration
- reusable tokens
- weak tokens
- blocking login too early

---

## Want This Already Built?

👉 https://pycolors.io/starters

---

## Final Thoughts

Build it once. Build it right.

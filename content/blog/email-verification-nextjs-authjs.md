---
title: "Email Verification with Auth.js and Prisma: A Tested Token Lifecycle"
description: "Build an isolated email-verification example with hashed, purpose-bound tokens. Test expiry, concurrent consumption, rollback and the Auth.js credentials gate."
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
readingTime: 20 min read
cover: /seo/blog/og-blog-saas.png
cta:
  label: Read auth docs
  href: /docs/starter-pro/auth
  variant: pro
---

A verification link should confirm **one current email address for one account,
once**. Looking up a token and setting `emailVerified` is insufficient when
another workflow shares the token table, two requests overlap, or a write fails.

The practical fix in this example is to store a token's hash, bind its purpose
and target, lock the relevant rows, and commit token consumption and account
verification together. Then check `emailVerified` inside the server-side
Auth.js Credentials callback, alongside password authentication.

_Originally published 17 April 2026. Revised 25 September 2026 with an isolated
PostgreSQL reproduction and executable regression tests._

## What this example demonstrates

This is an original educational lab, built from public packages and synthetic
`example.test` accounts. It is not copied from Starter Pro and does not claim
to reproduce its commercial implementation or certify a deployed system.
No real email is sent: delivery is an in-memory function.

Email verification demonstrates access to a mailbox at a point in time.
Authentication checks credentials; authorization decides which resources a
session may access. None of these establishes a person's real-world identity.

The executed integration uses **Auth.js core HTTP handlers**, including CSRF,
the Credentials callback and JWT session retrieval. Wiring those handlers
through Next.js route files, a database session adapter, OAuth, browser forms
and a real email provider is **NOT RUN** here. The lab does not constitute a
complete Next.js authentication application.

## The former example's defect

The previous tutorial had both `EMAIL_VERIFICATION` and `PASSWORD_RESET`
tokens but looked up a token without checking its purpose. It then updated the
account and deleted the token in separate operations.

The explicitly labelled counterexample in the test file reproduces two
consequences locally: a reset-purpose token reaches the verification write;
an error before consumption leaves the account verified with a usable token.
These are demonstrated tutorial defects, **not evidence of a production
exploit**. The unsafe sequence appears only in that negative test, not in the
recommended implementation.

## Reproduce the lab

Tested baseline: **Node 24.18.1, pnpm 10.32.1, PostgreSQL 16.13**, Prisma CLI,
Client and PostgreSQL adapter **7.9.1**, `pg` **8.23.0**, and `@auth/core`
**0.41.3**. Prisma's versioned v7 documentation applies; this is not a Prisma 8
migration. Direct dependencies are pinned below; retain the generated lockfile
for subsequent local runs. Fresh transitive resolutions can differ later.

Create a directory outside any existing application or pnpm workspace. Copy
all five named files below into it. Install PostgreSQL 16 locally and put its
`initdb`, `pg_ctl` and `createdb` binaries on your PATH. Use a disposable local
workstation: the temporary cluster uses trust authentication on loopback only,
not a deployment configuration. Port 54619 must be free; stop if startup fails.

```sh
set -eu
lab_data="$(mktemp -d)/email-verification-pg"
initdb -D "$lab_data" -U lab --auth-local=trust --auth-host=trust
pg_ctl -D "$lab_data" -l "$lab_data/server.log"   -o "-h 127.0.0.1 -p 54619 -k $lab_data" start
trap 'pg_ctl -D "$lab_data" -m fast stop' EXIT
createdb -h 127.0.0.1 -p 54619 -U lab email_verification_lab
export DATABASE_URL=postgresql://lab@127.0.0.1:54619/email_verification_lab
pnpm install
pnpm generate
pnpm schema
pnpm test
```

`schema` creates only the lab tables. Tests clear those tables between cases;
never point this lab at an existing application database. The runtime refuses
non-loopback hosts and any database name other than `email_verification_lab`.
The trap stops only this cluster; remove its temporary directory after review.

```json title="package.json"
{
  "name": "email-verification-lab",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@10.32.1",
  "engines": {
    "node": "24.x"
  },
  "scripts": {
    "generate": "prisma generate",
    "schema": "prisma db push",
    "test": "node --test fixture.test.mjs"
  },
  "dependencies": {
    "@auth/core": "0.41.3",
    "@prisma/client": "7.9.1",
    "@prisma/adapter-pg": "7.9.1",
    "pg": "8.23.0"
  },
  "devDependencies": {
    "prisma": "7.9.1"
  },
  "pnpm": {
    "onlyBuiltDependencies": ["@prisma/engines"]
  }
}
```

## Model: bind purpose, account and address

`LabToken.digest` stores SHA-256 of 32 cryptographically random bytes. It is
not the bearer secret. The raw value exists only in process memory and the
fake email adapter. A high-entropy token can use a fast hash; passwords use a
salted password derivation function instead.

`accountId` is stable; `email` snapshots the address at issuance. Verification
requires both the requested account ID and the account's current email to
match the token. This lab compares the stored address exactly; registration,
normalization and email-change policy are outside its scope. A real email
change must clear verification and invalidate old tokens, even when an address
later changes back. That lifecycle is not implemented here.

The expiry rule is **`now < expiresAt`**, at millisecond precision. Equality is
rejected. The default clock is PostgreSQL's wall clock, read after row-lock
waits, rather than a request timestamp captured before waiting.

```prisma title="schema.prisma"
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql"
}
enum Purpose {
  EMAIL_VERIFICATION
  PASSWORD_RESET
}
model LabAccount {
  id            String    @id
  email         String    @unique
  passwordHash  String
  emailVerified DateTime? @db.Timestamptz(3)
  tokens        LabToken[]
}
model LabToken {
  digest     String     @id @db.Char(64)
  accountId  String
  email      String
  purpose    Purpose
  expiresAt  DateTime   @db.Timestamptz(3)
  consumedAt DateTime?  @db.Timestamptz(3)
  account    LabAccount @relation(fields: [accountId], references: [id])
}
```

```ts title="prisma.config.ts"
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "schema.prisma",
  datasource: { url: env("DATABASE_URL") },
});
```

## Implementation and server-side gate

Each attempt locks the token first, then its account, inside a Prisma
interactive transaction at PostgreSQL `READ COMMITTED`. A second attempt for
the same token waits. After the first commits, the waiting read sees its
consumed state and rejects it. Conditional updates additionally require the
expected purpose, target, expiry and unconsumed/unverified state.

If either update or an intermediate step throws, the transaction rolls back.
A transaction by itself would not establish single use: the explicit row locks
and guarded writes are the concurrency mechanism. Other writers must respect
these account/token invariants and consistent lock ordering. Deadlocks/timeouts
remain possible and are errors, not successful verifications; retry policy and
operational capacity need deployment-specific review.

`lab.clock`, `lab.onConnection` and `lab.afterClaim` are test seams for boundary,
barrier and fault injection. They are never request parameters. Normal calls
use `verify(db, input)` with no hooks. The in-memory delivery call is outside
the transaction; a transport failure would need a separately designed resend
policy. Do not hold database locks while calling an email provider.

`authHandler` checks the stored password and then `emailVerified` in
`authorize`, before returning a user to Auth.js. The HTTP test below exercises
that callback rather than invoking a stand-alone gate in isolation. JWTs here
are local test sessions; later account changes do not automatically revoke
existing JWTs. `trustHost: true`, synchronous password hashing and fixed-name
log capture are lab choices, not a hosting, anti-enumeration or observability
policy for an application.

```js title="verification.mjs"
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Auth } from "@auth/core";
import Credentials from "@auth/core/providers/credentials";

// Deliberately restricted to a disposable local lab, never an application DB.
const url = new URL(process.env.DATABASE_URL);
if (
  url.hostname !== "127.0.0.1" ||
  url.pathname !== "/email_verification_lab"
) {
  throw new Error(
    "Use the disposable loopback email_verification_lab database",
  );
}
export function connect() {
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: url.href, max: 1 }),
    log: [],
  });
}
export const digest = (raw) => createHash("sha256").update(raw).digest("hex");
export function passwordHash(password, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
function matches(password, stored) {
  const [salt, expected] = stored.split(":");
  return timingSafeEqual(
    scryptSync(password, salt, 64),
    Buffer.from(expected, "hex"),
  );
}
export async function databaseNow(tx) {
  const [row] = await tx.$queryRaw`SELECT clock_timestamp() AS now`;
  return row.now;
}
export async function issue(db, accountId, deliver) {
  const account = await db.labAccount.findUniqueOrThrow({
    where: { id: accountId },
  });
  const raw = randomBytes(32).toString("hex");
  const now = await databaseNow(db);
  await db.labToken.create({
    data: {
      digest: digest(raw),
      accountId,
      email: account.email,
      purpose: "EMAIL_VERIFICATION",
      expiresAt: new Date(now.getTime() + 15 * 60_000),
    },
  });
  // The only raw-token destination is this test's in-memory delivery adapter.
  await deliver({ to: account.email, token: raw, accountId });
}
class Rejected extends Error {}
export async function verify(db, input, lab = {}) {
  if (
    !input ||
    typeof input.token !== "string" ||
    !/^[a-f0-9]{64}$/.test(input.token) ||
    typeof input.accountId !== "string" ||
    !/^[a-z0-9-]{1,64}$/.test(input.accountId)
  ) {
    return false;
  }
  // lab hooks are for the local test harness, NEVER request-controlled options.
  try {
    return await db.$transaction(
      async (tx) => {
        await lab.onConnection?.(tx);
        const hash = digest(input.token);
        const [token] = await tx.$queryRaw`
        SELECT * FROM "LabToken" WHERE digest = ${hash} FOR UPDATE`;
        if (
          !token ||
          token.purpose !== "EMAIL_VERIFICATION" ||
          token.consumedAt ||
          token.accountId !== input.accountId
        )
          throw new Rejected();
        const [account] = await tx.$queryRaw`
        SELECT * FROM "LabAccount" WHERE id = ${token.accountId} FOR UPDATE`;
        if (!account || account.email !== token.email || account.emailVerified)
          throw new Rejected();
        // Read the clock AFTER both locks: waiting must not extend validity.
        const now = await (lab.clock ?? databaseNow)(tx);
        if (token.expiresAt.getTime() <= now.getTime()) throw new Rejected();
        const claimed = await tx.labToken.updateMany({
          where: {
            digest: hash,
            consumedAt: null,
            purpose: "EMAIL_VERIFICATION",
            accountId: account.id,
            email: account.email,
            expiresAt: { gt: now },
          },
          data: { consumedAt: now },
        });
        if (claimed.count !== 1) throw new Rejected();
        await lab.afterClaim?.(tx);
        const updated = await tx.labAccount.updateMany({
          where: { id: account.id, email: token.email, emailVerified: null },
          data: { emailVerified: now },
        });
        if (updated.count !== 1) throw new Rejected();
        return true;
      },
      { isolationLevel: "ReadCommitted", maxWait: 5_000, timeout: 15_000 },
    );
  } catch (error) {
    if (error instanceof Rejected) return false;
    throw error; // Infrastructure/fault errors must roll back and remain visible.
  }
}
export function authHandler(db, secret, events) {
  return (request) =>
    Auth(request, {
      secret,
      trustHost: true,
      basePath: "/auth",
      session: { strategy: "jwt" },
      // Fixed event names only; never stringify provider errors or request data.
      logger: {
        error: () => events.push("auth-error"),
        warn: () => events.push("auth-warning"),
        debug: () => {},
      },
      providers: [
        Credentials({
          credentials: { email: {}, password: {} },
          async authorize(credentials) {
            if (
              typeof credentials.email !== "string" ||
              credentials.email.length > 254 ||
              typeof credentials.password !== "string" ||
              credentials.password.length > 128
            )
              return null;
            const account = await db.labAccount.findUnique({
              where: { email: credentials.email },
            });
            if (
              !account ||
              !matches(credentials.password, account.passwordHash)
            )
              return null;
            // Server-side gate in the ACTUAL Auth.js Credentials callback.
            if (!account.emailVerified) return null;
            return { id: account.id, email: account.email };
          },
        }),
      ],
    });
}
```

## Regression tests, including real overlap

The file below uses three independent Prisma clients, each with a single
PostgreSQL connection: contenders A/B plus an observer. A promise barrier holds
A after its token write. The observer waits until `pg_blocking_pids` reports B
blocked by A; only then may A commit. This is real overlapping database work,
not sequential promises or a sleep-based assumption. The five-second deadline
only bounds a failing test.

The rollback test reads the written token within the transaction, injects an
error before the account update, then compares all persisted rows with their
original state and retries successfully. Boundary tests use a fixed clock but
retain the real database. The counterexample is deliberately confined to its
own disposable test. Console interception captures output for secret checks;
Prisma is never mocked.

```js title="fixture.test.mjs"
import test, { beforeEach, after, mock } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  connect,
  digest,
  passwordHash,
  issue,
  verify,
  authHandler,
} from "./verification.mjs";

const db = connect(),
  a = connect(),
  b = connect();
const delivered = [],
  events = [],
  observedLogs = [];
for (const name of ["log", "warn", "error", "debug", "info"]) {
  mock.method(console, name, (...args) =>
    observedLogs.push(args.map(String).join(" ")),
  );
}
const password = "synthetic-password-only";
const credentialsHash = passwordHash(password);
beforeEach(async () => {
  await db.labToken.deleteMany();
  await db.labAccount.deleteMany();
  await db.labAccount.createMany({
    data: [
      {
        id: "alice",
        email: "alice@example.test",
        passwordHash: credentialsHash,
      },
      { id: "bob", email: "bob@example.test", passwordHash: credentialsHash },
    ],
  });
});
after(async () => {
  await Promise.all([db.$disconnect(), a.$disconnect(), b.$disconnect()]);
  mock.restoreAll();
});
async function mint() {
  await issue(db, "alice", async (mail) => delivered.push(mail));
  const { token, accountId } = delivered.at(-1);
  return { token, accountId };
}
async function snapshot() {
  return {
    accounts: await db.labAccount.findMany({ orderBy: { id: "asc" } }),
    tokens: await db.labToken.findMany({ orderBy: { digest: "asc" } }),
  };
}
async function rejectedUnchanged(input, lab) {
  const before = await snapshot();
  assert.equal(await verify(db, input, lab), false);
  assert.deepEqual(await snapshot(), before);
}
async function complete(input) {
  const state = await snapshot();
  const alice = state.accounts.find((row) => row.id === "alice");
  const bob = state.accounts.find((row) => row.id === "bob");
  const token = state.tokens.find((row) => row.digest === digest(input.token));
  assert.ok(alice.emailVerified instanceof Date);
  assert.equal(bob.emailVerified, null);
  assert.equal(token.consumedAt.getTime(), alice.emailVerified.getTime());
}
test("valid token: only its account is verified and consumption commits", async () => {
  const input = await mint();
  assert.equal(await verify(db, input), true);
  await complete(input);
});
test("malformed input is rejected without mutation", async () => {
  for (const input of [
    null,
    {},
    { token: [], accountId: "alice" },
    { token: "z".repeat(64), accountId: "alice" },
    { token: "a".repeat(64), accountId: {} },
  ])
    await rejectedUnchanged(input);
});
test("unknown token does not mutate", async () => {
  await rejectedUnchanged({
    token: randomBytes(32).toString("hex"),
    accountId: "alice",
  });
});
test("PASSWORD_RESET cannot verify an email", async () => {
  const input = await mint();
  await db.labToken.update({
    where: { digest: digest(input.token) },
    data: { purpose: "PASSWORD_RESET" },
  });
  await rejectedUnchanged(input);
});
for (const [name, offset] of [
  ["expired", -1],
  ["exact expiration", 0],
]) {
  test(`${name}: rejects at millisecond boundary`, async () => {
    const input = await mint();
    const now = new Date("2030-01-01T00:00:00.000Z");
    await db.labToken.update({
      where: { digest: digest(input.token) },
      data: { expiresAt: new Date(now.getTime() + offset) },
    });
    await rejectedUnchanged(input, { clock: async () => now });
  });
}
test("one millisecond before expiration is accepted", async () => {
  const input = await mint();
  const now = new Date("2030-01-01T00:00:00.000Z");
  await db.labToken.update({
    where: { digest: digest(input.token) },
    data: { expiresAt: new Date(now.getTime() + 1) },
  });
  assert.equal(await verify(db, input, { clock: async () => now }), true);
  await complete(input);
});
test("replay cannot consume a second time", async () => {
  const input = await mint();
  assert.equal(await verify(db, input), true);
  await rejectedUnchanged(input);
});
test("a different account cannot redeem the token", async () => {
  const input = await mint();
  await rejectedUnchanged({ ...input, accountId: "bob" });
});
test("an email changed since issuance is not verified", async () => {
  const input = await mint();
  await db.labAccount.update({
    where: { id: "alice" },
    data: { email: "changed@example.test" },
  });
  await rejectedUnchanged(input);
});
test("error after the real token write rolls back BOTH writes", async () => {
  const input = await mint();
  const before = await snapshot();
  await assert.rejects(
    verify(db, input, {
      afterClaim: async (tx) => {
        const token = await tx.labToken.findUnique({
          where: { digest: digest(input.token) },
        });
        assert.ok(token.consumedAt instanceof Date);
        throw new Error("injected-between-writes");
      },
    }),
    /injected-between-writes/,
  );
  assert.deepEqual(await snapshot(), before);
  assert.equal(await verify(db, input), true);
  await complete(input);
});
const deferred = () => Promise.withResolvers();
async function waitForDatabaseLock(blockedPid, blockerPid) {
  const deadline = Date.now() + 5_000; // Failure bound, not synchronization.
  while (Date.now() < deadline) {
    const [row] = await db.$queryRaw`
      SELECT ${blockerPid}::int = ANY(pg_blocking_pids(${blockedPid}::int)) AS waiting`;
    if (row.waiting) return;
  }
  assert.fail("PostgreSQL did not report the expected blocking connection");
}
test("two overlapping connections: database lock observed, exactly one succeeds", async () => {
  const input = await mint();
  const claimed = deferred(),
    secondStarted = deferred(),
    release = deferred();
  let pidA;
  const first = verify(a, input, {
    onConnection: async (tx) => {
      [{ pid: pidA }] = await tx.$queryRaw`SELECT pg_backend_pid() AS pid`;
    },
    afterClaim: async () => {
      claimed.resolve();
      await release.promise;
    },
  });
  first.catch(claimed.reject);
  await claimed.promise;
  const second = verify(b, input, {
    onConnection: async (tx) => {
      const [{ pid }] = await tx.$queryRaw`SELECT pg_backend_pid() AS pid`;
      secondStarted.resolve(pid);
    },
  });
  second.catch(secondStarted.reject);
  // Observe B blocked by A in PostgreSQL before permitting A to commit.
  try {
    const pidB = await secondStarted.promise;
    assert.notEqual(pidA, pidB);
    await waitForDatabaseLock(pidB, pidA);
  } finally {
    release.resolve();
  }
  assert.deepEqual(await Promise.all([first, second]), [true, false]);
  await complete(input);
});
test("counterexample ONLY: unscoped lookup accepts reset token and leaves partial state", async () => {
  const input = await mint();
  await db.labToken.update({
    where: { digest: digest(input.token) },
    data: { purpose: "PASSWORD_RESET" },
  });
  // DO NOT USE: the former tutorial's missing purpose check and split writes.
  await assert.rejects(
    (async () => {
      const row = await db.labToken.findUnique({
        where: { digest: digest(input.token) },
      });
      assert.equal(row.purpose, "PASSWORD_RESET");
      await db.labAccount.update({
        where: { id: row.accountId },
        data: { emailVerified: new Date() },
      });
      throw new Error("failure-before-token-consumption");
    })(),
    /failure-before-token-consumption/,
  );
  const state = await snapshot();
  assert.ok(state.accounts[0].emailVerified);
  assert.equal(state.tokens[0].consumedAt, null);
});
async function login(handler, suppliedPassword = password) {
  const csrf = await handler(new Request("http://localhost/auth/csrf"));
  const { csrfToken } = await csrf.json();
  const cookie = csrf.headers
    .getSetCookie()
    .map((value) => value.split(";")[0])
    .join("; ");
  return handler(
    new Request("http://localhost/auth/callback/credentials", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", cookie },
      body: new URLSearchParams({
        csrfToken,
        email: "alice@example.test",
        password: suppliedPassword,
      }),
    }),
  );
}
test("Auth.js HTTP callback denies unverified/wrong password, then issues a verified session", async () => {
  const handler = authHandler(db, randomBytes(32).toString("hex"), events);
  const denied = await login(handler);
  assert.match(denied.headers.get("location"), /error=CredentialsSignin/);
  assert.ok(
    !denied.headers
      .getSetCookie()
      .some((cookie) => cookie.startsWith("authjs.session-token=")),
  );
  const input = await mint();
  assert.equal(await verify(db, input), true);
  const wrong = await login(handler, "wrong-password");
  assert.match(wrong.headers.get("location"), /error=CredentialsSignin/);
  const allowed = await login(handler);
  const cookie = allowed.headers
    .getSetCookie()
    .map((value) => value.split(";")[0])
    .join("; ");
  assert.ok(cookie.includes("authjs.session-token="));
  const session = await handler(
    new Request("http://localhost/auth/session", { headers: { cookie } }),
  );
  assert.equal((await session.json()).user.email, "alice@example.test");
});
test("raw tokens appear only in memory delivery, never stored rows or captured logs", async () => {
  const input = await mint();
  assert.match(input.token, /^[a-f0-9]{64}$/);
  assert.equal(
    new Set(delivered.map((mail) => mail.token)).size,
    delivered.length,
  );
  assert.equal(delivered.at(-1).to, "alice@example.test");
  const stored = await snapshot();
  assert.equal(stored.tokens[0].digest.length, 64);
  assert.ok(stored.tokens[0].digest === digest(input.token));
  const observed = JSON.stringify({ stored, events, observedLogs });
  for (const mail of delivered)
    assert.ok(!observed.includes(mail.token), "raw secret leaked");
});
```

### Observed results and their limits

**15/15 tests passed** on the baseline above, using the code blocks published
here. The test suite starts from synthetic rows each time.

| Case                                   | Observed result                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------- |
| Valid token                            | Only Alice verified; consumption and verification timestamps agree                           |
| Malformed / unknown / PASSWORD_RESET   | Rejected; persisted rows unchanged                                                           |
| Expired / exactly at expiry            | Rejected; one millisecond before expiry accepted                                             |
| Replay / wrong account / changed email | Rejected without further mutation                                                            |
| Concurrent attempts                    | PostgreSQL blocking observed; results `[true, false]`; consistent final state                |
| Error after claim                      | Full rollback; same token subsequently succeeds                                              |
| Former unsafe sequence                 | Wrong-purpose token verifies; injected error leaves partial state                            |
| Auth.js HTTP integration               | Unverified and wrong-password sign-ins denied; verified credentials yield a readable session |
| Secret handling                        | Random bearer values absent from inspected rows and captured application logs                |

This does not test provider/proxy/database-service log configuration, all
possible schedules, distributed failover or delivery reliability. The lab
uses no provider keys or real accounts. The local database suite is separate
from the site's CI syntax/content checks; a green site build alone does not
rerun the PostgreSQL experiment.

## Before adapting this to an application

- Design registration, address comparison/change, resend and previous-token
  invalidation together. Add request/recipient throttling and enumeration-safe
  responses; this fixture's credential timing is not hardened.
- Build a deliberate confirmation route and CSRF/origin policy. Avoid consuming
  tokens on a simple email-link GET, which a link scanner may prefetch. Use a
  trusted configured origin, HTTPS and a no-referrer policy; exclude bearer
  tokens from access logs, analytics, errors and support payloads.
- Define session expiry/revocation and check authorization on protected routes
  and data operations. Gate every permitted sign-in method, not only Credentials.
- Configure real delivery, failure recovery and secret-free monitoring. Review
  transaction contention, timeouts, database permissions and account-change
  races with a backend/security reviewer.

None of these deployment systems is implemented by this lab. Verification
alone is not a security guarantee or a measured conversion improvement.

## Sources and next action

Sources checked on 25 September 2026:

- [Auth.js Credentials](https://authjs.dev/getting-started/authentication/credentials)
  defines the server `authorize` boundary; application-owned credential
  validation and persistence are still required.
- [OWASP Email Validation and Verification](https://cheatsheetseries.owasp.org/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.html)
  covers address handling, random single-use expiring tokens and email changes.
- [OWASP Forgot Password](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
  adds complementary token-lifecycle guidance. Password replacement, reset-session
  restrictions and reset notifications belong to password recovery; this lab
  does not implement or equate that flow with email verification.
- [Prisma v7 transactions](https://www.prisma.io/docs/orm/v7/prisma-client/queries/transactions)
  documents interactive transaction options and rollback.
- [PostgreSQL 16 row locks](https://www.postgresql.org/docs/16/explicit-locking.html#LOCKING-ROWS)
  and [READ COMMITTED](https://www.postgresql.org/docs/16/transaction-iso.html#XACT-READ-COMMITTED)
  explain the lock/wait behavior used in this experiment.

Before copying the pattern, reproduce the tests, keep purpose and target checks,
exercise the expiry boundary, observe genuine contention, and verify rollback.
Then review the unimplemented deployment checklist for your application.

**Next: [read the PyColors authentication documentation](/docs/starter-pro/auth)**
for the documented product flow and its boundaries. That documentation is
publicly readable; no purchase is required to understand this correction, and
this lab makes no equivalence claim about the product's implementation.

---
title: "Vérification de l'email avec Auth.js et Prisma : un cycle de vie de
  token testé"
description: "Construisez un exemple de vérification d'e-mail isolé avec des
  tokens hachés, liés à un but. Expiration du test, consommation simultanée,
  rollback et la porte d'authentification Auth.js."
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
readingTime: 20 min de lecture
cover: /seo/blog/og-blog-saas.png
cta:
  label: Read auth docs
  href: /docs/starter-pro/auth
  variant: pro
---

Un lien de vérification devrait confirmer **une adresse e-mail actuelle pour un compte, une fois**. Rechercher un token et un paramètre `emailVerified` est insuffisant lorsqu'un autre flux de travail partage la table de tokens, que deux demandes se chevauchent ou qu'une écriture échoue.

La solution pratique dans cet exemple est de stocker le hachage d'un token, de lier son but et sa cible, de verrouiller les lignes pertinentes et de valider la consommation de tokens et la vérification du compte. Alors vérifiez `emailVerified` à l'intérieur du callback Auth.js Credentials côté serveur, avec l'authentification par mot de passe.

_Initialement publié le 17 avril 2026. Révisé le 25 septembre 2026 avec une reproduction PostgreSQL isolée et des tests de régression exécutables._

## Ce que cet exemple démontre [#what-this-example-demonstrates]

Ceci est un laboratoire éducatif original, construit à partir de paquets publics et synthétiques `example.test` comptes. Il n'est pas copié à partir de Starter Pro et ne prétend pas reproduire sa mise en œuvre commerciale ou certifier un système déployé. Aucun email réel n’est envoyé : la livraison est une fonction in-memory.

La vérification par e-mail démontre l'accès à une boîte aux lettres à un moment donné. L'authentification vérifie les informations d'identification ; l'autorisation détermine les ressources auxquelles une session peut accéder. Rien de tout cela n'établit l'identité réelle d'une personne.

L'intégration exécutée utilise **Gestionnaires HTTP de noyau Auth.js**, y compris CSRF, le rappel des informations d'identification et la récupération des sessions JWT. Câblage de ces gestionnaires à travers Next.js fichiers de route, un adaptateur de session de base de données, OAuth, les formulaires de navigateur et un fournisseur de messagerie réel est **PAS D'EXÉCUTION** Voilà. Le laboratoire ne constitue pas une application d'authentification Next.js complète.

## Le défaut de l'exemple précédent [#the-former-examples-defect]

Le tutoriel précédent avait les deux `EMAIL_VERIFICATION` et `PASSWORD_RESET` tokens, mais je regardais un token sans vérifier son but. Il a ensuite mis à jour le compte et supprimé le token dans des opérations distinctes.

Le contre-exemple explicitement étiqueté dans le fichier de test reproduit localement deux conséquences: un token réinitialisé atteint l'écriture de vérification; une erreur avant consommation laisse le compte vérifié avec un token utilisable. Ce sont des défauts de tutoriel démontrés, **Pas de preuve d'un exploit de production**. La séquence dangereuse n'apparaît que dans ce test négatif, pas dans l'implémentation recommandée.

## Reproduire le labo [#reproduce-the-lab]

Valeur de base testée: **Node 24.18.1, pnpm 10.32.1, PostgreSQL 16.13**, Prisma CLI, Client et adaptateur PostgreSQL **7.9.1**, `pg` **8.23.0**et `@auth/core`
**0.41.3**. La documentation versionnée v7 de Prisma s'applique ; il ne s'agit pas d'une migration Prisma 8. Les dépendances directes sont épinglées ci-dessous ; conservez le fichier de verrouillage généré pour les exécutions locales suivantes. Les résolutions transitives peuvent différer plus tard.

Créez un répertoire en dehors de toute application existante ou espace de travail pnpm. Copiez les cinq fichiers nommés ci-dessous. Installez PostgreSQL 16 localement et mettez `initdb`, `pg_ctl` et `createdb` Binaires sur votre chemin. Utilisez un poste de travail local jetable : le cluster temporaire utilise l'authentification de confiance uniquement lors d'une boucle, et non une configuration de déploiement. Le port 54619 doit être libre ; arrêtez si le démarrage échoue.

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

`schema` ne crée que les tables de laboratoire. Les tests effacent ces tables entre les cas; ne pointez jamais ce laboratoire sur une base de données d'applications existante. Le runtime refuse les hôtes non-loopback et tout nom de base de données autre que `email_verification_lab`. Le piège arrête uniquement ce cluster ; supprimez son répertoire temporaire après examen.

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

## Modèle: lier le but, le compte et l'adresse [#model-bind-purpose-account-and-address]

`LabToken.digest` stocke SHA-256 de 32 octets cryptographiquement aléatoires. Ce n'est pas le secret du porteur. La valeur brute n'existe que dans la mémoire de processus et le faux adaptateur de messagerie. Un token à haute entropie peut utiliser un hachage rapide; les mots de passe utilisent une fonction de dérivation de mot de passe salée à la place.

`accountId` est stable; `email` snapshots l'adresse à l'émission. La vérification nécessite à la fois l'identifiant de compte demandé et l'e-mail actuel du compte pour correspondre au token. Ce laboratoire compare exactement l'adresse stockée; l'enregistrement, la normalisation et la politique de changement d'e-mail sont en dehors de son champ d'application. Un vrai changement d'e-mail doit effacer la vérification et invalider les anciens tokens, même lorsqu'une adresse change plus tard. Ce cycle de vie n’est pas mis en œuvre ici.

La règle d'expiration est **`now < expiresAt`**avec une précision de milliseconde. L’égalité est rejetée. L'horloge par défaut est l'horloge murale de PostgreSQL, lue après l'attente du verrouillage des lignes, plutôt qu'un horodatage de demande capturé avant l'attente.

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

## Implémentation et portail côté serveur [#implementation-and-server-side-gate]

Chaque tentative verrouille d'abord le token, puis son compte, dans une transaction interactive Prisma sur PostgreSQL. `READ COMMITTED`. Une deuxième tentative pour le même token attend. Après le premier commit, la lecture en attente voit son état consommé et le rejette. Les mises à jour conditionnelles nécessitent en outre le but attendu, la cible, l'expiration et l'état non consommé / non vérifié.

Si la mise à jour ou une étape intermédiaire est annulée, la transaction est annulée. Une transaction en elle-même n'établirait pas un usage unique : les verrous de ligne explicites et les écritures gardées sont le mécanisme de concurrence. Les autres rédacteurs doivent respecter ces invariants de compte / token et l'ordre de verrouillage cohérent. Les blocages/délai restent possibles et sont des erreurs, pas des vérifications réussies; réessayer la politique et la capacité opérationnelle nécessitent un examen spécifique au déploiement.

`lab.clock`, `lab.onConnection` et `lab.afterClaim` sont des coutures d'essai pour l'injection de limite, de barrière et de défaut. Ce ne sont jamais des paramètres de demande. Utilisation des appels normaux `verify(db, input)` Sans crochets. L'appel de livraison en mémoire est en dehors de la transaction; une défaillance de transport nécessiterait une politique de renvoi conçue séparément. Ne maintenez pas les verrous de base de données lorsque vous appelez un fournisseur de messagerie.

`authHandler` vérifie le mot de passe stocké, puis `emailVerified` en `authorize`, avant de renvoyer un utilisateur à Auth.js. Le test HTTP ci-dessous exerce un rappel plutôt que d'invoquer une porte autonome isolément. Les JWT ici sont des sessions de test locales; les modifications ultérieures du compte ne révoquent pas automatiquement les JWT existants. `trustHost: true`, le hachage synchrone des mots de passe et la capture des journaux à nom fixe sont des choix de laboratoire, et non une politique d'hébergement, d'anti-énumération ou d'observabilité pour une application.

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

## Tests de régression, y compris le chevauchement réel [#regression-tests-including-real-overlap]

Le fichier ci-dessous utilise trois clients Prisma indépendants, chacun avec une seule connexion PostgreSQL : les prétendants A/B plus un observateur. Une barrière de promesse tient A après son écriture symbolique. L'observateur attend `pg_blocking_pids` rapports B bloqués par A; alors seulement peut A commit. Il s’agit d’un véritable travail de base de données qui se chevauche, pas de promesses séquentielles ou d’une hypothèse basée sur le sommeil. Le délai de cinq secondes limite seulement un test raté.

Le test de restauration lit le token écrit dans la transaction, injecte une erreur avant la mise à jour du compte, puis compare toutes les lignes persistantes avec leur état d'origine et tente à nouveau avec succès. Les tests de limites utilisent une horloge fixe mais conservent la base de données réelle. Le contre-exemple est délibérément confiné à son propre test jetable. L'interception de console capture la sortie pour des vérifications secrètes; Prisma n'est jamais simulé.

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

### Les résultats observés et leurs limites [#observed-results-and-their-limits]

**15/15 tests réussis** sur la ligne de base ci-dessus, en utilisant les blocs de code publiés ici. La suite de tests commence à chaque fois à partir de lignes synthétiques.

| Affaire                                   | Résultat observé                                                                                                                         |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| token valide                              | Seule Alice vérifiée ; consommation et horodatages de vérification concordent                                                            |
| Malformé / inconnu / MOTS\_PRES           | Rejeté; lignes persistantes inchangées                                                                                                   |
| Expiré / exactement à l'expiration        | Rejeté; une milliseconde avant l'expiration acceptée                                                                                     |
| Replay / compte incorrect / email modifié | Rejeté sans autre mutation                                                                                                               |
| Tentatives concurrentes                   | Blocage de PostgreSQL observé; résultats `[true, false]`; état final cohérent                                                            |
| Erreur après la réclamation               | Retour complet ; le même token réussit par la suite                                                                                      |
| Ancienne séquence dangereuse              | Le token erroné vérifie; l'erreur injectée laisse un état partiel                                                                        |
| Intégration HTTP auth.js                  | Connexions non vérifiées et par mot de passe incorrect refusées; les informations d'identification vérifiées donnent une session lisible |
| Manipulation secrète                      | Valeurs aléatoires absentes des lignes inspectées et des journaux d'application capturés                                                 |

Cela ne teste pas la configuration du journal fournisseur/proxy/service de base de données, tous les plannings possibles, le basculement distribué ou la fiabilité de la livraison. Le laboratoire n'utilise pas de clés de fournisseur ou de comptes réels. La suite de base de données locale est séparée des vérifications de syntaxe/contenu CI du site ; une construction de site verte seule ne réexécute pas l'expérience PostgreSQL.

## Avant de l'adapter à une application [#before-adapting-this-to-an-application]

- Enregistrement de la conception, comparaison/changement d'adresse, renvoi et invalidation du token précédent ensemble. Ajouter demande/destinataire throttling et l'énumération-sécurité des réponses; ce montage de l'accréditation timing n'est pas durcie.
- Construisez une route de confirmation délibérée et une politique CSRF / origine. Évitez de consommer des tokens sur un simple lien e-mail GET, qu’un scanner de liens peut préextraire. Utilisez une origine configurée de confiance, HTTPS et une stratégie sans référence ; excluez les tokens de support des journaux d'accès, des analyses, des erreurs et des charges utiles de support.
- Définissez l'expiration/révocation de la session et vérifiez l'autorisation sur les routes et les opérations de données protégées. Gate toutes les méthodes de connexion autorisées, pas seulement les informations d'identification.
- Configurez la livraison réelle, la récupération des pannes et la surveillance sans secret. Passez en revue la contention des transactions, les délais d'attente, les autorisations de base de données et les courses de modification de compte avec un examinateur backend/security.

Aucun de ces systèmes de déploiement n'est mis en œuvre par ce laboratoire. La vérification seule n'est pas une garantie de sécurité ou une amélioration mesurée de la conversion.

## Sources et action suivante [#sources-and-next-action]

Sources vérifiées le 25 septembre 2026 :

- [Auth.js Informations d'identification](https://authjs.dev/getting-started/authentication/credentials) définit le serveur `authorize` limite; la validation et la persistance des titres de compétences appartenant à l'application sont toujours requises.
- [Validation et vérification des courriels OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.html) couvre la gestion des adresses, les tokens à usage unique aléatoires expirant et les changements d'e-mail.
- [Mot de passe oublié](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) ajoute des conseils complémentaires sur le cycle de vie des tokens. Le remplacement du mot de passe, les restrictions de réinitialisation de session et les notifications de réinitialisation appartiennent à la récupération du mot de passe; ce laboratoire n'implémente pas ou n'assimile pas ce flux à la vérification par courrier électronique.
- [Transactions Prisma v7](https://www.prisma.io/docs/orm/v7/prisma-client/queries/transactions) documente les options de transaction interactives et la restauration.
- [Serrures PostgreSQL 16 lignes](https://www.postgresql.org/docs/16/explicit-locking.html#LOCKING-ROWS) et [LIRE ENGAGÉ](https://www.postgresql.org/docs/16/transaction-iso.html#XACT-READ-COMMITTED) expliquer le comportement de verrouillage / attente utilisé dans cette expérience.

Avant de copier le motif, reproduisez les tests, conservez les contrôles d'objectif et de cible, exercez la limite d'expiration, observez la contention réelle et vérifiez le retour en arrière. Ensuite, consultez la liste de contrôle de déploiement non implémentée pour votre application.

**Suivant: [lire la documentation d'authentification PyColors](/docs/starter-pro/auth)** pour le flux de produits documentés et ses limites. Cette documentation est accessible au public; aucun achat n'est requis pour comprendre cette correction, et ce laboratoire ne fait aucune allégation d'équivalence concernant la mise en œuvre du produit.

# AI Chat consumer proof

Run from the repository root with its declared Node/pnpm versions:

```bash
TMPDIR=/private/tmp node apps/marketing/tests/fixtures/ai-chat-consumer/verify.mjs
```

This opt-in check creates a fresh temporary React/Vite app, copies all canonical
Block files and extracts the SDK recipe directly from the MDX guide. Dependencies
are pinned public npm packages, without workspace aliases or local tarballs.
It tests streaming, failed partial output, retry, cancellation, unsupported parts
and unmount through the actual AI SDK with an in-memory transport, then runs
TypeScript and the production bundle. The `.tsx.txt` fixture is compiled only in
the isolated app; the marketing runtime has no SDK dependency.

Installation requires npm registry access. The script reports and preserves its
temporary directory, lockfile and build output for inspection; remove it manually
when no longer needed. No provider/model call, credential, billing or deployment
is used. Browser style, physical IME and screen-reader review remain separate.

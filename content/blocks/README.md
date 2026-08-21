# PyColors Blocks source-copy contract

`apps/marketing/content/blocks` is the canonical source root for copyable
PyColors Blocks. It is intentionally a source directory, not an npm package,
registry, CLI, download service, or another delivery system.

## Canonical layout

When a Block is added, its source lives at this neutral path:

```text
apps/marketing/content/blocks/
├── README.md
└── <category>/
    └── <block-name>/
        └── ...Block source files
```

`<category>` and `<block-name>` are placeholders. This contract does not choose
or create a production category; #93 owns category definition, while #94
through #101 own production Block content.

The root `README.md` is the only allowed root-level file. Each category contains
Block directories, and a Block directory can contain the local files it needs.

## Source and preview direction

The source in this directory is canonical. Documentation previews should import
or render it directly where practical. They must not become a second source
copy that can drift from the canonical implementation.

## Import and delivery rules

Canonical Block source may import PyColors primitives only from the public
`@pycolors/ui` entry point:

```tsx
import { Button, Card } from "@pycolors/ui";
```

Do not import `@pycolors/ui/src/*`, `@pycolors/ui/dist/*`, app aliases, private
`@pycolors/*` packages, or other app/package internals. React or Next imports
are allowed only when the Block genuinely needs them. Keep relative imports
inside the Block directory.

Do not add `package.json`, package-manager lockfiles, registry metadata, or CLI
artifacts to this source tree. A Block is copied as source; it is not installed
from a Blocks package or managed through a registry.

## Consumer ownership

Consumers manually copy the Block source into their own application and own the
resulting code. They may customize structure, styling, and behavior for their
product. The copied source has no automatic updates or synchronization path;
consumers choose whether and how to compare future canonical changes.

Copying a Block does not change a package version and does not require a
Changeset. Consumers must install and use their own compatible public
`@pycolors/ui` dependency.

## Validation

Before adding canonical source, run:

```bash
pnpm check:blocks-contract
pnpm test:blocks-contract
pnpm format:check
pnpm --filter pycolors-marketing lint
pnpm --filter pycolors-marketing types:check
pnpm --filter pycolors-marketing build
```

Consumers should run their application lint, type-check, test, and build
commands after copying and customizing a Block.

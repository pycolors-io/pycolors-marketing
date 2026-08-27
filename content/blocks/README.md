# PyColors Blocks source-copy contract

`apps/marketing/content/blocks` is the canonical source root for copyable
PyColors Blocks. It is intentionally a source directory, not an npm package,
registry, CLI, download service, or another delivery system.

## Canonical layout

When a Block is added, its source lives at this neutral path:

```text
apps/marketing/content/blocks/
├── README.md
└── <category-slug>/
    └── <block-slug>/
        └── ...Block source files
```

`<category-slug>` must be one of the approved values below. `<block-slug>` must
be a stable lowercase kebab-case identity. This contract does not create a
production Block; #94 through #101 own that source.

The root `README.md` is the only allowed root-level file. Each category contains
non-empty Block directories, and a Block directory contains the local files it
needs. Do not create empty category or Block placeholders.

## Approved taxonomy

Every Block has exactly one primary category. Secondary discovery belongs in
tags or documentation metadata, never in duplicate source trees or category
aliases.

| Category            | Slug         | Authoritative source-owner issues |
| ------------------- | ------------ | --------------------------------- |
| Application shells  | `app-shells` | #94                               |
| Authentication      | `auth`       | #95                               |
| Commerce            | `commerce`   | #96 and #98                       |
| Account & workspace | `account`    | #97 and #99                       |
| Data & records      | `data`       | #101                              |
| Feedback & states   | `feedback`   | #100                              |

The slugs are an exact allowlist. Do not introduce aliases such as
`application-shells`, `authentication`, `billing`, `settings`, `admin`,
`tables`, or `states`.

## Shared identity contract

A Block keeps one `<category-slug>/<block-slug>` identity across canonical
source, documentation navigation, and future Registry metadata. For example,
source at `data/projects-table` is documented at
`/docs/blocks/data/projects-table` and, if separately approved for Registry
delivery, uses the item name `data-projects-table`.

Free and Pro availability are separate metadata on that shared identity. They
do not create parallel category taxonomies, duplicate implementations, or
public access to private source.

## Source authority and implementation order

- `@pycolors/ui` and `@pycolors/tokens` remain the public primitive and token
  authorities.
- Starter Free is product evidence only, and documentation previews are examples
  only. Neither is canonical Block source until the relevant source-owner issue
  promotes source into this directory.
- #94 through #101 own production Blocks; #93 owns only this taxonomy and
  naming contract.
- Registry architecture remains owned by #384 and its children. Future Registry
  manifests and artifacts distribute canonical source; they do not own another
  implementation. No manifest, generated JSON, route, CLI, or hosted delivery
  behavior belongs in this directory.
- Future Pro source and delivery remain a separate authority under #36.
- The approved first source sequence is #94, then #101, then #97. This ordering
  does not start those issues or make an unapproved candidate Registry-ready.

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

# PyColors UI

<p align="center"> <a href="https://github.com/pycolors-io/pycolors-ui/releases"> <img src="https://img.shields.io/badge/version-v1.1.0-blue?style=flat-square" alt="Version" /> </a> <a href="https://pycolors.io/roadmap"> <img src="https://img.shields.io/badge/roadmap-public-success?style=flat-square" alt="Roadmap" /> </a> <img src="https://img.shields.io/badge/status-production--ready-success?style=flat-square" alt="Status" /> <img src="https://img.shields.io/badge/docs-documentation--first-informational?style=flat-square" alt="Docs" /> </p> <p align="center"> <strong>A minimal, documentation-first UI foundation for building real-world web products.</strong><br /> The UI layer powering <strong>PyColors SaaS Starters</strong>. </p> <p align="center"> Built in public. Shipped with discipline. Designed to last. </p>

---

## Positioning

PyColors UI is a minimal UI foundation, not a generic component zoo.

It is designed to be:

- The UI layer used internally by PyColors SaaS Starters
- a stable base for shipping SaaS dashboards, apps, and marketing pages
- a system you can adopt independently, without buying anything

PyColors UI is the foundation.
Starters, templates, and blocks are products built on top of it.

---

## Vision

**PyColors UI** is not just a component library.
It is a **product-oriented UI foundation** aimed at developers who build:

- SaaS dashboards
- Marketing websites
- Internal tools
- Production-grade web applications

### Core principles

- **Documentation-first**
  Every component ships with Preview, Usage, Code, and Props.

- **Consistency over abundance**
  Fewer components, well-designed APIs, predictable variants and sizing.

- **Production-ready by default**
  Accessibility, sensible defaults, semantic tokens, and release hygiene.

- **Commercial mindset**
  Clear versioning, roadmap transparency, licensing readiness, and trust pages.

`v1.0` establishes the foundation. Everything else builds on top of it.

---

## Installation

### Requirements

- Node.js ≥ 18
- React ≥ 18
- Tailwind CSS v4
- TypeScript (recommended)

### Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Start the development server

```bash
pnpm dev
```

Then open:

```
http://localhost:3000
```

---

## Structure

The project is organized to support **documentation, UI components, and future monetization**.

```txt
.
├── app/
│   └── docs/                # Documentation (Fumadocs)
│
├── components/
│   ├── ui/                  # Core UI components (Button, Input, Card…)
│   ├── layout/              # Layout components (SiteHeader, Footer…)
│   └── container.tsx        # Layout width reference
│
├── lib/
│   ├── utils.ts             # Utilities (cn, helpers)
│   └── layout.shared.ts     # Navigation & shared layout data
│
├── styles/
│   └── globals.css          # Theme tokens, Tailwind v4 mapping
│
├── public/
│   └── assets/              # Static assets
│
├── README.md
└── package.json
```

### Key architectural decisions

- Single layout width source of truth (`Container`)
- Semantic design tokens mapped to Tailwind v4
- UI components decoupled from docs
- Public-facing trust pages (Changelog, Roadmap)

---

## Roadmap

PyColors UI follows a **transparent, release-driven roadmap**.

👉 Full roadmap available at:
https://pycolors.io/roadmap

---

## Status

- **Current version:** v1.0.0
- **Stability:** Production-ready
- **Update cadence:** Iterative, release-based

---

## Contributing

Issues, feedback, and discussions are welcome.
The goal is not to ship everything — but to ship the **right things**, well.

---

## License

License details will be published as part of the commercialization phase.

For now, this repository is public and free to explore, but the licensing terms may evolve as the project matures.

---

Built with care by **PyColors**.
Focus on clarity. Ship with intent.

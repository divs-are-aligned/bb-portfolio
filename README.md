# bb-portfolio

Personal portfolio and Platycerium (staghorn fern) catalog for
[bartbudak.io](https://bartbudak.io).

Built as a fully static site and deployed to Firebase Hosting.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) with `output: "export"` —
  the whole site is pre-rendered to static HTML in `out/`.
- **[@base-ui/react](https://base-ui.com)** for accessible UI primitives
  (dialog, tabs, tooltip, etc.); shadcn-style wrappers live in
  `src/components/ui`.
- **[GSAP](https://gsap.com)** (`@gsap/react`) for scroll/entry animations.
- **[D3](https://d3js.org)** + `topojson-client` for the biogeographical map
  and phylogeny tree in the Platycerium section.
- **Tailwind CSS v4** (via `@tailwindcss/postcss`).
- **[Firebase](https://firebase.google.com)** — Firestore + Storage back the
  "Plant S.O.S." help form; Firebase Hosting serves the static export.

> **Note:** this repo pins a specific, sometimes-modified build of Next.js.
> When in doubt about Next behavior, check `node_modules/next/dist/docs/`
> rather than relying on general Next.js knowledge. See `AGENTS.md`.

## Prerequisites

- Node.js 20 (matches the Cloud Functions runtime in `firebase.json`).
- [pnpm](https://pnpm.io) (the repo ships a `pnpm-lock.yaml`).
- [Firebase CLI](https://firebase.google.com/docs/cli) for deploys
  (`npm i -g firebase-tools`).

## Getting started

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment variables

The Firebase **web** config is split between hardcoded public values
(`authDomain`, `projectId`, `storageBucket` for the `bb-folio` project, in
`src/lib/firebase.ts`) and three values supplied via the environment. Create a
`.env.local` for local development:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

These are `NEXT_PUBLIC_*`, so they are inlined into the client bundle and are
**not secret** — access is constrained by the Firebase security rules, not by
hiding the keys.

## Scripts

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `pnpm dev`             | Start the Next.js dev server.                        |
| `pnpm build`           | Static export to `out/`.                             |
| `pnpm preview`         | Serve the built `out/` directory locally (`serve`).  |
| `pnpm lint`            | Run ESLint.                                          |
| `pnpm deploy`          | Build, then `firebase deploy --only hosting`.        |
| `pnpm deploy:preview`  | Deploy a temporary Firebase Hosting preview channel. |

## Building & deploying

The site is a static export hosted on Firebase Hosting (`hosting.public` is
`out/` in `firebase.json`).

```bash
pnpm build          # produces ./out
pnpm deploy         # build + firebase deploy --only hosting
```

To preview a deploy on a throwaway channel before promoting it:

```bash
pnpm deploy:preview
```

### Firebase security rules

Firestore and Storage rules are wired into `firebase.json`
(`firestore.rules` and `storage.rules`):

- **Firestore** — deny-all by default; the public site may only **create**
  documents in the `plant-help` collection (validated shape; no client
  read/update/delete).
- **Storage** — deny-all by default; the public site may only **create**
  image objects (≤ 8 MB) under `plant-help/`.

Deploy rules alongside (or independently of) hosting:

```bash
firebase deploy --only firestore:rules,storage:rules
# or everything:
firebase deploy
```

## Project layout

```
src/
  app/                 # App Router routes, metadata, sitemap/robots, OG image
  components/
    layout/            # Navbar, Footer, MobileNav
    sections/          # Page sections (Platycerium catalog, map, tree, …)
    shared/            # Cross-cutting components & providers
    ui/                # base-ui / shadcn-style primitives
  data/                # Static content (Platycerium species, care, phylogeny)
  lib/                 # Firebase init, utilities
functions/             # Firebase Cloud Functions (Node 20)
scripts/               # One-off maintenance scripts
```

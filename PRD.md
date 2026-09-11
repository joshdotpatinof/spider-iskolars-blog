# Product Requirements Document: spider-iskolars-blog

## Overview

A minimalist terminal-styled (bash shell) static blog built with SvelteKit, deployed to GitHub Pages via GitHub Actions. Serves as a project log for CS 191 software engineering updates for the Spider-Iskolars team, styled to look like a live terminal session.

**Repository:** `joshdotpatinof/spider-iskolars-blog`
**Live URL:** `https://joshdotpatinof.github.io/spider-iskolars-blog/`

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit 2.x (stable) |
| Static Adapter | `@sveltejs/adapter-static` |
| Styling | Scoped CSS in Svelte components |
| Font | Fira Code via Google Fonts |
| Content | TypeScript data file + `.md?raw` imports (zero runtime deps) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |
| Hosting | GitHub Pages |
| Node.js | 22.x |

## Visual Design

### Logo

🕷 emoji displayed in two places:
- **Terminal title bar** — 16px, beside the traffic-light dots
- **Homepage header** — 64px, pulsing animation (`@keyframes pulse`)

### Terminal Window

- Title bar: traffic-light dots (red/yellow/green) + 🕷 + `josh@spider-iskolars:~`
- Content area styled as terminal output with green text on dark background
- Blinking cursor and `$` prompt lines

### Colors

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--terminal-bg` | `#111111` | Terminal window background |
| `--terminal-bar` | `#1a1a1a` | Title bar |
| `--text-primary` | `#00ff00` | Main terminal green text |
| `--text-dim` | `#666666` | Timestamps / metadata |
| `--text-white` | `#e0e0e0` | Headings / emphasis |
| `--accent` | `#00cc00` | Links |
| `--border` | `#2a2a2a` | Terminal border |
| `--prompt` | `#ff6600` | Prompt symbol |
| `--dot-red/yellow/green` | traffic-light | Title bar dots |

## Pages

### Homepage (`/`)

The landing page is a terminal `ls -la` style directory listing:
```
$ ls -la entries/
──────────────────────────────────────────────────
permissions   size  date      filename
──────────────────────────────────────────────────
-rw-r--r--    1034  09-11    entry-01-project-plan.md
──────────────────────────────────────────────────
$ cat <filename> # to read an entry
```
Each row is clickable, linking to `/entry/{slug}/`.

### Entry Detail Page (`/entry/{slug}/`)

Renders inside a `<Terminal>` component:
```
$ cat entry-01-project-plan.md
──────────────────────────────────────
entry-01-project-plan.md
Date:        2026-09-11
Status:      published
Title:       Project Plan
Description: ...
Link:        View Project Plan →
──────────────────────────────────────

[Rendered markdown body content]

──────────────────────────────────────────────────
josh@spider-iskolars:~$ cd ~  # back to home
```

### 404 Page

Terminal-styled `404 NOT FOUND` with `$ cat /dev/null` and a `cd ~` back link.

## Content Pipeline

### Entry Data (`src/lib/content/entries.ts`)

```ts
export interface Entry {
  id: string;       // e.g. 'entry-01'
  slug: string;     // URL segment, e.g. 'entry-01-project-plan'
  file: string;     // markdown filename, e.g. 'entry-01-project-plan.md'
  title: string;
  date: string;     // 'YYYY-MM-DD'
  description: string;
  body: string;     // imported markdown via ?raw
  url?: string;     // external link (e.g. Google Doc)
  urlLabel?: string;
}
```

Each entry statically imports its markdown file:
```ts
import entry01 from '../../entries/entry-01-project-plan.md?raw';
```

### Markdown Renderer (`src/lib/markdown.ts`)

Custom zero-dependency renderer handling: headings, paragraphs, bold/italic, inline code, lists, links, horizontal rules. Input is HTML-escaped first for safety. Output used via `{@html}` on the entry detail page.

### Type Declarations (`src/app.d.ts`)

Ambient module declaration for `*.md?raw` imports so TypeScript resolves them as strings.

## File Structure

```
├── .github/workflows/deploy.yml        GitHub Actions CI/CD
├── static/.nojekyll                    Prevent Jekyll interference
├── src/
│   ├── app.html                        HTML shell + Fira Code font link
│   ├── app.css                         Global terminal CSS variables
│   ├── app.d.ts                        *.md?raw type declaration
│   ├── entries/
│   │   └── entry-01-project-plan.md    Source markdown for entry 01
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Terminal.svelte         Terminal window wrapper
│   │   │   ├── Prompt.svelte          $ prompt line component
│   │   │   ├── EntryListing.svelte    Filename + author row (homepage)
│   │   │   └── SpiderLogo.svelte      🕷 emoji icon
│   │   ├── content/
│   │   │   └── entries.ts             Entry metadata + body imports
│   │   └── markdown.ts                Zero-dep markdown renderer
│   └── routes/
│       ├── +layout.svelte             Root layout (import app.css)
│       ├── +layout.ts                 prerender + trailingSlash
│       ├── +page.svelte               Homepage (ls -la listing)
│       ├── +error.svelte              Terminal-styled 404
│       └── entry/[slug]/
│           ├── +page.ts               Static prerender entries()
│           └── +page.svelte           Entry detail view
├── vite.config.ts                     adapter-static + paths.base
└── PRD.md
```

## Configuration

### `vite.config.ts`

```ts
adapter: adapter({
  pages: 'build',
  assets: 'build',
  fallback: '404.html',
  strict: true,
}),
paths: {
  base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
},
```

### `src/routes/+layout.ts`

```ts
export const prerender = true;
export const trailingSlash = 'always';
```

- `prerender = true` — all pages prerendered as static HTML
- `trailingSlash = 'always'` — ensures `/entry/slug/index.html` output (not `/entry/slug.html`), compatible with GitHub Pages subpath deployment

### `static/.nojekyll`

Empty file. Prevents GitHub Pages from ignoring `_app/` assets.

## CI/CD (`.github/workflows/deploy.yml`)

Triggers on push to `main`:
1. Checkout → Setup Node 22 → `npm ci`
2. `npm run build` with `BASE_PATH=/${{ github.event.repository.name }}`
3. Upload `build/` artifact
4. Deploy via `actions/deploy-pages@v4`

Requires repo **Settings → Pages → Source: GitHub Actions**.

## Local Development

```bash
npm install
npm run dev    # dev server at :5173
npm run check  # type check
npm run build  # static output -> build/
npm run preview  # production preview at :4173
```

## Adding a New Blog Entry

1. Create `src/entries/entry-NN-title.md`
2. In `src/lib/content/entries.ts`: add `import` + entry object with `slug`, `body`, etc.
3. Push to `main` — GitHub Actions rebuilds automatically

## Success Criteria

- [x] `npm run build` produces working static output
- [x] 🕷 emoji in title bar (16px) and header (64px pulse)
- [x] `Spider-Iskolars` branding in all display text
- [x] Homepage shows `ls -la` listing of entries
- [x] Each entry clickable → separate detail page with rendered markdown
- [x] Google Doc link opens correctly in new tab
- [x] GitHub Actions deploys on push to main
- [x] Trailing slash routes work with GitHub Pages subpath
- [x] Terminal-styled 404 page
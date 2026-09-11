# spider-iskolars-blog

A terminal-styled project log for the Spider-Iskolars software engineering team (CS 191).

**Live Site:** [https://joshdotpatinof.github.io/spider-iskolars-blog/](https://joshdotpatinof.github.io/spider-iskolars-blog/)

## Tech Stack

- [SvelteKit](https://svelte.dev) — Framework
- [adapter-static](https://github.com/sveltejs/kit/tree/main/packages/adapter-static) — Static site generation
- [Fira Code](https://fonts.google.com/specimen/Fira+Code) — Monospace font

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Build

```bash
npm run build   # outputs to build/
npm run preview # preview production build at :4173
```

## Deploy

Push to `main` — GitHub Actions handles the rest.

In your GitHub repo, ensure **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.

## Adding a Blog Entry

1. Create a markdown file in `src/entries/`, e.g. `entry-02-first-milestone.md`
2. Open `src/lib/content/entries.ts`:
   - Import the file with `?raw`:
     ```ts
     import entry02 from '../../entries/entry-02-first-milestone.md?raw';
     ```
   - Add a new object to the `entries` array:
     ```ts
     {
       id: 'entry-02',
       slug: 'entry-02-first-milestone',
       file: 'entry-02-first-milestone.md',
       title: 'First Milestone',
       date: '2026-09-25',
       description: 'What we shipped in our first sprint.',
       body: entry02,
     }
     ```
3. Commit and push — GitHub Actions will rebuild and deploy automatically.

**URL pattern:** `src/entries/entry-01-project-plan.md` → `/entry/entry-01-project-plan/`

## Markdown Support

Entry markdown supports: `#` headings, `-` lists, `1.` ordered lists, `**bold**`, `*italic*`, `` `code` ``, `[links](url)`, and `---` horizontal rules. No runtime dependencies — all rendered at build time via a minimal custom renderer in `src/lib/markdown.ts`.

## Project Structure

```
src/
├── app.html / app.css          HTML shell + global terminal theme
├── lib/
│   ├── components/
│   │   ├── Terminal.svelte     Terminal window wrapper
│   │   ├── Prompt.svelte      $ prompt line
│   │   ├── EntryListing.svelte  Filename + author row (homepage)
│   │   └── SpiderLogo.svelte  🕷 emoji icon
│   ├── content/entries.ts      Entry data + markdown imports
│   └── markdown.ts             Zero-dep markdown renderer
├── entries/                    Source markdown for blog entries
└── routes/
    ├── +page.svelte            Homepage (entry list)
    ├── entry/[slug]/+page.*    Per-entry detail pages
    └── +error.svelte           Terminal-styled 404
```

# Sai Krishna Sunkari — Portfolio

Personal portfolio + writing site, built with [Astro](https://astro.build). Dark editorial
single-page design recreated from the Claude Design handoff, made fully responsive, plus a
`/writing` page that aggregates Medium + X articles.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve the built site
```

## Project structure

```
src/
  layouts/Base.astro        # <head>, SEO + OG/Twitter + JSON-LD, fonts, grain, nav
  pages/
    index.astro             # home (8 sections)
    writing.astro           # Medium (auto) + X (manual) articles
  components/               # Nav, Hero, Stats, Approach, Trajectory, Work, WorkCard, About, Contact
  data/                     # projects, timeline, ventures, capabilities, posts  <- edit content here
  lib/fetchMedium.ts        # build-time Medium RSS fetch + parse
  scripts/portfolio.ts      # reveal, count-up, timeline fill, active-nav, filter, mobile nav
  styles/global.css         # design tokens (CSS custom properties) + keyframes
```

## Editing content

- **Projects / timeline / ventures / capabilities** — edit the typed arrays in `src/data/`.
- **Writing page** mixes two sources into one list (newest first):
  - **Self-hosted posts** — Markdown files in `src/content/blog/`, rendered as real pages at
    `/writing/<slug>`. Authored via the CMS (below). Each can carry an "Originally posted on
    X / Medium" link back to the source.
  - **Medium posts** — auto-fetched from `https://medium.com/feed/@<handle>` at **build time**
    (set the handle in `src/data/posts.ts`, `MEDIUM_HANDLE`). These link out. If the fetch fails,
    the page still renders the local posts.
  - Delete the example post at `src/content/blog/example-agent-payment-rails.md`.

## Writing posts (CMS)

The site ships with **Sveltia CMS** — a visual editor with image upload, no Markdown by hand.

### Local editing (no GitHub needed)

Sveltia's local workflow uses the browser **File System Access API**, so it needs a
**Chromium browser — Chrome, Edge, or Brave** (Firefox and Safari are not supported, and
there is **no** proxy-server option for Sveltia).

```bash
npm run dev
```

Open <http://localhost:4321/admin> in Chrome/Edge → click **“Work with Local Repository”** →
pick this project folder → edit. Changes write straight to `src/content/blog/` and
`public/uploads/`; commit with Git afterwards.

- **Brave:** the button is greyed out until you enable the API — go to
  `brave://flags/#file-system-access-api`, set it to **Enabled**, relaunch, then reopen `/admin`.
- **Firefox/Safari:** not supported for local editing — use a Chromium browser, or edit the
  Markdown files in `src/content/blog/` by hand.

Then: create a post, paste your article, drag in images (saved to `public/uploads/`), set
"Originally posted on X" + the tweet link, and save.

### Editing on the live site (GitHub)

Push this project to GitHub first, then set `backend.repo` and `backend.branch` in
`public/admin/config.yml` to match your repo and its **default branch** (e.g. `main`).
Sign in with GitHub from the deployed `/admin`.
- **Work card images** — drop a screenshot into `src/assets/` and add a `cover:` import on the
  project in `src/data/projects.ts`; cards without a logo/cover use the refined solid treatment.

## Before deploying

- Set your production domain in `astro.config.mjs` (`site:`) — used for canonical URLs, OG tags
  and the sitemap.
- Add a `public/og-image.png` (1200×630) for social link previews.
- Confirm `MEDIUM_HANDLE` and the X article entries in `src/data/posts.ts`.

## Notes

- Accessibility: two low-contrast text tokens from the original design were bumped to pass
  WCAG AA on the dark background (see comments in `src/styles/global.css`).
- Respects `prefers-reduced-motion`.

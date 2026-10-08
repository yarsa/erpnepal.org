# erpnepal.org — `develop` (React stack)

Rebuild of the [Nepal Compliance](https://github.com/yarsa/nepal-compliance) marketing site on a React stack, page-for-page with the Frappe UI build on `frappe-ui-rebuild`: 31 English pages, the Nepali homepage draft and a 404 page. Production (erpnepal.org) still publishes from `master`.

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19, TypeScript 7, Vite 8 |
| Styling | Tailwind CSS 4 (tokens in `src/styles.css`) |
| Primitives | Base UI (`@base-ui/react`): Tabs, Accordion, Toggle Group, Menu, Toast, Separator |
| Icons | Tabler Icons (`@tabler/icons-react`) |
| Class utilities | CVA, clsx, tailwind-merge (`src/lib/cn.ts`, `src/components/ui/`) |
| Fonts | Inter and Noto Sans Devanagari, self-hosted variable fonts |
| Tooling | Biome (lint + format), tsx for scripts |
| Hosting | GitHub Pages (static files in `dist/`) |

## Develop

Requires Node.js 24.

```sh
npm install
npm run dev      # http://localhost:5173, client-rendered, with live project numbers
npm run build    # type-check, client + SSR build, pre-render to dist/
npm run check    # validate dist/
npm run preview  # http://localhost:4173, serves the pre-rendered build
npm run lint     # Biome; `npm run format` applies fixes
```

## How it works

- **Pages.** `src/routes.ts` lists every URL with its title and description; the URL set matches the previous site. Page components live in `src/pages/`, one lazy chunk per page type, so a page downloads only the text it shows.
- **Pre-rendered HTML.** `scripts/prerender.ts` renders every route with `renderToString` into `dist/`, at the `<!--app-head-->` and `<!--app-html-->` markers in `index.html` (it stops if either is missing). It adds title, description, canonical, Open Graph and JSON-LD (breadcrumbs, and Article for guides), and writes `sitemap.xml`, `robots.txt`, `llms.txt` and `404.html`. React then hydrates. All copy, including hidden feature tabs and closed FAQ answers, is in the static HTML.
- **Content.** Homepage and site text: `src/content/*.ts` (English and Nepali). Feature, add-on and guide text: `content/*.mjs`. Hand-written pages: `src/pages/ForYourBusinessPage.tsx` and `NepalHrmsPage.tsx`. Icon keys in content (`lucide-*`) map to Tabler in `src/lib/icons.tsx`.
- **Project numbers.** Stars, forks, Docker pulls and contributors are fetched at build time (`scripts/stats.ts`) and in `vite dev`. A failed request hides the number. Local builds reuse the last result for an hour; CI fetches fresh with `GITHUB_TOKEN`.
- **Static files.** `public/` (favicons, logos, Nepal HRMS screenshots and licence notices, `CNAME`) is copied to `dist/` as is.
- **Checks.** `npm run check` confirms the URL set, sitemap, robots and llms.txt, unique titles and descriptions, valid JSON-LD, no third-party resources, every same-site link and anchor, ~720 content strings in the static HTML, and a 150 KB gzip budget for the JS + CSS each page loads up front. Base UI Menu (~33 KB) and Toast load on demand.
- **Nepali draft.** `/ne/` is `noindex` and out of the sitemap while `draft` is set in `src/content/home.ne.ts`.
- **Links are root-relative** (`/features/`), which suits the custom domain. Serving from a sub-path would need a base path.

## CI

- `.github/workflows/develop.yml` lints, builds and checks every push to `develop`, and uploads `dist/` as an artifact. No deploy.
- `.github/workflows/pages.yml` runs on `master` only: lint, build, check, deploy to GitHub Pages, then `npm run check:live` confirms the live sitemap and pages. Merging `develop` into `master` switches production to this build.

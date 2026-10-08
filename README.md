<h1 align="center"><a href="https://erpnepal.org">erpnepal.org</a></h1>
<p align="center">
  The website for <a href="https://github.com/yarsa/nepal-compliance">Nepal Compliance</a>, the open source ERP solution for Nepalese businesses with HR, Payroll & Accounting compliance.
  <br/>
</p>

<p align="center">
  <a href="https://erpnepal.org"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Ferpnepal.org&label=erpnepal.org"></a>
  <a href="https://github.com/yarsa/erpnepal.org/actions/workflows/pages.yml"><img alt="Publish to GitHub Pages" src="https://github.com/yarsa/erpnepal.org/actions/workflows/pages.yml/badge.svg"></a>
  <a href="https://github.com/yarsa/erpnepal.org/actions/workflows/develop.yml"><img alt="Develop build check" src="https://github.com/yarsa/erpnepal.org/actions/workflows/develop.yml/badge.svg?branch=develop"></a>
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/license-Apache--2.0-blue"></a>
</p>

This site presents [Nepal Compliance](https://github.com/yarsa/nepal-compliance), an app built on top of [Frappe Framework](https://github.com/frappe/frappe), [ERPNext](https://github.com/frappe/erpnext) and [Frappe HR](https://github.com/frappe/hrms). It is a static website: every page is pre-rendered to HTML at build time and served by GitHub Pages, with no server, database, sign-up forms, analytics or third-party requests.

## What's on the site

- [x] Homepage with feature tour, compliance roadmap, install steps and FAQ
- [x] Nepali homepage at `/ne/` (draft, `noindex` until reviewed)
- [x] Feature pages: accounting and VAT, invoicing, CBMS, payroll, HR and leave, audit trails, Nepali dates
- [x] Add-on pages: payments, QR, SMS, attendance devices, ecommerce and more
- [x] Practical guides for running ERP software in Nepal, with sources
- [x] Nepal HRMS (beta) preview and a "for your business" page
- [x] Live project numbers from GitHub and Docker Hub, fetched at build time
- [x] Light and dark mode, mobile layout, keyboard and screen reader support
- [x] Sitemap, `robots.txt`, `llms.txt`, canonical links, Open Graph and structured data

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | [React](https://react.dev) 19, [TypeScript](https://www.typescriptlang.org), [Vite](https://vite.dev) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4, tokens in `src/styles.css` |
| UI primitives | [Base UI](https://base-ui.com): Tabs, Accordion, Toggle Group, Menu, Toast |
| Icons | [Tabler Icons](https://tabler.io/icons) |
| Component utilities | [CVA](https://cva.style), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| Fonts | Inter and Noto Sans Devanagari, self-hosted |
| Tooling | [Biome](https://biomejs.dev) for lint and format |
| Hosting | [GitHub Pages](https://pages.github.com) |

## Getting started

Requires Node.js 24.

```sh
npm install
npm run dev      # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-check, build, and pre-render every page to `dist/` |
| `npm run check` | Validate `dist/` (see [Checks](#checks)) |
| `npm run preview` | Serve the built site at http://localhost:4173 |
| `npm run lint` | Lint and format check; `npm run format` applies fixes |

## Branches and publishing

```
feature work ──▶ develop ──(pull request)──▶ master ──▶ GitHub Pages ──▶ erpnepal.org
```

- **`develop`** holds all work in progress. Every push runs [`develop.yml`](.github/workflows/develop.yml): lint, build and check. It does not deploy.
- **`master`** is production. Open a pull request from `develop` when a batch of changes is ready; [`pages.yml`](.github/workflows/pages.yml) builds and checks the pull request, and after the merge deploys to GitHub Pages and confirms the live sitemap and pages (`npm run check:live`).
- **Domain**: `erpnepal.org`, set by `public/CNAME`. In the repository settings, Pages must use **GitHub Actions** as its source.

## Project structure

```
content/              Feature, add-on and guide text (*.mjs)
public/               Static files copied as is: logos, screenshots, licence notices, CNAME
scripts/
  prerender.ts        Renders every page to HTML; writes sitemap, robots.txt, llms.txt, 404.html
  stats.ts            GitHub and Docker Hub numbers at build time
  check.ts            Validates the built site
  check-live.ts       Validates the live site after a deploy
src/
  content/            Homepage and site text, English (*.en.ts) and Nepali (*.ne.ts)
  pages/              One component per page type
  components/         Header, footer, homepage sections; page/ and ui/ building blocks
  lib/                i18n, icons, class names, site data
  routes.ts           Every URL with its title and description
  styles.css          Tailwind setup, colour tokens, fonts
docs/                 Research notes behind the guides and site copy
```

## Editing content

- **Homepage and navigation**: `src/content/home.en.ts`, `ui.en.ts`, and their Nepali counterparts `*.ne.ts`. Capability claims trace to the [Nepal Compliance README](https://github.com/yarsa/nepal-compliance#key-features).
- **Features, add-ons, guides**: `content/features.mjs`, `addons.mjs`, `guides-*.mjs`. A new entry gets its page, sitemap entry and `llms.txt` line automatically.
- **Page titles and descriptions**: `src/routes.ts` for the index and hand-written pages; detail pages take them from their content entry.
- **Nepali**: `/ne/` stays out of search while `draft` is set in `src/content/home.ne.ts`. After a native-speaker review, set `draft: ''`.

## Checks

`npm run check` fails the build if any of these break:

- [x] The URL set matches the published site, and the sitemap lists exactly the indexed pages
- [x] Every page has a unique title and description, a canonical link and valid structured data
- [x] Every same-site link and `#anchor` resolves
- [x] All page text, including hidden tabs and closed FAQ answers, is in the static HTML
- [x] No third-party scripts or stylesheets
- [x] Each page loads at most 150 KB gzip of JavaScript and CSS up front

## Contributing

Corrections and improvements are welcome. Work on a branch from `develop`, run `npm run lint`, `npm run build` and `npm run check`, then open a pull request into `develop`. To report an error on the site, [open an issue](https://github.com/yarsa/erpnepal.org/issues).

For the app itself, see the [Nepal Compliance contributing guide](https://github.com/yarsa/nepal-compliance/blob/master/CONTRIBUTING.md).

### License

The website code is licensed under the [Apache License 2.0](LICENSE). Nepal Compliance and Nepal HRMS are GPL-3.0; their licence notices ship in `public/assets/`. Font and component credits are in [NOTICE.md](NOTICE.md).

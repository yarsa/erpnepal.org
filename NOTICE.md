# Notices and attribution

The erpnepal.org website code in this repository is licensed under the [Apache License 2.0](LICENSE). It includes or depends on the third-party material listed below, each under its own licence.

## Nepal Compliance assets

From [yarsa/nepal-compliance](https://github.com/yarsa/nepal-compliance), licensed under GPL-3.0. The full licence text is in [`public/assets/nepal-compliance-LICENSE.txt`](public/assets/nepal-compliance-LICENSE.txt), and these files remain under it.

| File | Source |
| --- | --- |
| `public/assets/nepal-compliance.svg` | Product icon, `nepal_compliance/public/icon/nepal-compliance.svg` at commit `fbb9e95be233631713703b09bcb727044894c5c5`, unmodified |
| `public/assets/favicon.svg` | `nepal_compliance/public/icon/app-icon.svg`, copied on 2026-09-27, unmodified |
| `public/assets/favicon.png` | 96 × 96 raster rendering of the same app icon |

## Nepal HRMS assets

Copyright © 2026 Yarsa Labs Pvt. Ltd., licensed under GPL-3.0-or-later. [`LICENSE.txt`](public/assets/nepal-hrms/LICENSE.txt) and [`NOTICE.txt`](public/assets/nepal-hrms/NOTICE.txt) in that folder preserve the project's terms. Employee records in the screenshots are sample data, as stated in the Nepal HRMS README.

## Fonts

Self-hosted and served from this site; no font is requested from a third party.

| Font | Package | Licence |
| --- | --- | --- |
| Inter | `@fontsource-variable/inter` | SIL Open Font License 1.1 |
| Noto Sans Devanagari | `@fontsource-variable/noto-sans-devanagari` | SIL Open Font License 1.1 |

## Software in the published site

These packages are bundled into the JavaScript and CSS served to visitors. Each package's licence text ships with it in `node_modules/<package>/`.

| Package | Licence | Used for |
| --- | --- | --- |
| [React](https://github.com/facebook/react), React DOM, Scheduler | MIT | Rendering and hydration |
| [Base UI](https://github.com/mui/base-ui) (`@base-ui/react`) | MIT | Tabs, accordion, toggle group, menu and toast primitives |
| [Floating UI](https://github.com/floating-ui/floating-ui) | MIT | Menu positioning, via Base UI |
| [Tabler Icons](https://github.com/tabler/tabler-icons) (`@tabler/icons-react`) | MIT | Icons |
| [class-variance-authority](https://github.com/joe-bell/cva) | Apache-2.0 | Component style variants |
| [clsx](https://github.com/lukeed/clsx) | MIT | Class name joining |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | MIT | Class conflict resolution |
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | MIT | Generated stylesheet, including its base styles |

Build and development tools (Vite, TypeScript, Biome, tsx) produce the site but are not included in it.

## Names and trademarks

Frappe, ERPNext and Frappe HR identify open source projects by Frappe Technologies; the site links to their upstream repositories. Names of payment services, banks, SMS providers, attendance devices and government systems on the add-on and guide pages belong to their respective owners and are used only to identify them.

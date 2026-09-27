# Website review — September 27, 2026

## Changes

- Replaced promotional slogans with product, feature, installation, and licensing information.
- Removed the invented dashboard, orange identity, card grid, and decorative UI controls.
- Replaced Google Fonts with local Georgia for the product heading and Arial/Helvetica for the interface and body. No external resources are needed to render the site.
- Replaced simulated product imagery with a linked feature index. No generated imagery was necessary.
- Expanded unfamiliar terms and distinguished repository-listed capabilities from independently tested ERP behavior.
- Made 404 links work on both a project subpath and a custom domain without JavaScript.
- Limited workflow write permissions to deployment. Build validation now runs independently on pushes, pull requests, and manual runs.

## Independent reviews

Three agents reviewed design, content/accessibility, and security/build behavior. Their main challenges were the invented interface, repetitive slogans, small text, unclear abbreviations, and deployment assumptions. The content and visual reviewers approved the revised result. No exploitable vulnerability was identified in this static website; this is not an audit of the ERP application itself.

Applied the [Vercel web design review skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) and its [interface guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md). Mobbin was checked but its reference library was not signed in. No assets were copied from Mobbin or OpenArt.

## Verification

- Build and local-link/asset/metadata validation passed.
- Local, GitHub Pages subpath, and custom-domain builds passed.
- Invalid deployment URLs were rejected before output was changed.
- Checked 1440px desktop, 800px tablet, 390px mobile, and 320px narrow mobile layouts. No horizontal overflow observed.
- Mobile menu open/close, Escape key, anchor navigation, command copying, and FAQ expansion passed.
- Browser reported no JavaScript errors during these checks.
- Desktop, tablet, and mobile viewport screenshots retained here. Full-page browser captures had stitching artifacts and were discarded as review evidence.
- Browser-native 200% zoom and an automated accessibility audit were not run. Narrow-width reflow and keyboard interactions were checked directly.

## Publishing

Source is in `yarsa/erpnepal.org`. GitHub Pages is enabled and deployments pass. The custom domain has authoritative GitHub Pages DNS records and valid HTTPS; local DNS propagation remains to be observed. No DNS or custom-domain settings were changed by this agent.


## Feature-page expansion

The next revision adds seven source-backed feature guides and moves accounting, billing, and payroll ahead of dates on the homepage. The same three reviewers challenged page overlap, verified repository paths, checked build/link safety, and reviewed desktop accounting and mobile payroll screenshots. All reviewers passed the result.

Verified eight content pages plus the 404 page. Local, GitHub Pages subpath, and custom-domain builds passed. The checker validates every local link, cross-page anchor, asset, unique title/description, structured-data block, canonical, and sitemap entry. Temporary broken-anchor and unsafe-slug fixtures were correctly rejected. All seven feature pages rendered at 320px with no horizontal overflow, broken images, or JavaScript errors; keyboard navigation between features and mobile menu/Escape behavior passed.

Screenshots prefixed `feature-` show this revision. See [Search and AI discovery](../SEARCH.md) for implementation details and the remaining hosting/indexing steps. No ranking deadline or AI-answer inclusion is promised.

## Add-ons, workflow selector, and official favicon

Added nine dedicated integration pages and a separate homepage add-on directory. The core feature selector filters only the seven core guides. Keyboard checks passed for Accounting (3), Billing (4), and Payroll & HR (3); all nine add-ons remain visible, focus stays on the control, and Back restores the previous selection. Repeated selection does not add a duplicate history entry.

All nine add-on pages rendered at 320px without horizontal overflow or broken images, and no browser JavaScript errors were reported. Desktop directory, desktop workflow, and mobile integration screenshots are retained alongside this report.

Build validation covers 17 content pages plus 404. Local, project-subpath, and custom-domain configurations passed. Official upstream app-icon.svg replaces the placeholder favicon, with a 96×96 PNG fallback. Search Console submission remains an account step; no indexing or ranking result is claimed.

## Nepal HRMS beta preview

Added a dedicated `/nepal-hrms/` page, homepage introduction, and links from feature/add-on footers. The copy follows the owner's clarification: Nepal HRMS is part of the Nepal Compliance roadmap, tested separately before planned incorporation. It is not represented as shipped or given a release date.

The supplied repository at commit `3df172b1b13e5e90812b69494215e7b1e810a75c` provided the feature descriptions, logo, and four unmodified screenshots. Its README identifies screenshot employees as made-up. License and copyright notice are retained. The remote repository returned a public 404, so the site does not send visitors to unavailable source links.

Local, project-subpath, and custom-domain checks passed for 18 content pages plus 404. Desktop, 390px and 320px layouts checked; no horizontal overflow. Images have dimensions, descriptive alt text, and full-size links; below-fold gallery images load lazily. The sitemap and optional discovery index include the preview with beta wording.

## PageSpeed request-chain fix

Embedded the small shared stylesheet, script, and product SVG during the build. This removes the homepage CSS critical request chain and all three separate asset requests highlighted in the supplied PageSpeed report. The generated homepage is 12,516 bytes gzipped locally. Build checks reject reintroduced external styles/scripts and verify embedded logo integrity and script placement.

All 19 HTML documents passed local, project-subpath, and custom-domain validation. In-app browser confirmed zero external stylesheet/script elements, a loaded embedded logo, working workflow selection and mobile menu/Escape, and no JavaScript errors. Mobile screenshot retained as `inline-assets-mobile.png`. A fresh PageSpeed score was not measured. Larger images and favicons retain GitHub Pages cache policy.

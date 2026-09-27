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

Source is in `yarsa/erpnepal.org`. Pages enablement remains blocked by GitHub account access: SSH permits pushing the repository, but the workflow cannot create the Pages site, and the in-app browser is signed out. Enable Pages with GitHub Actions once using an account with repository administration rights. No DNS or custom-domain settings were changed.

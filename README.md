# Nepal Compliance marketing website

The public website for [Nepal Compliance](https://github.com/yarsa/nepal-compliance). Responsive static HTML, CSS, and JavaScript, designed for free GitHub Pages hosting. No runtime server, database, package dependencies, sign-up forms, or analytics.

## Preview

Requires Node.js 22+ and Python 3:

```sh
npm run build
npm run check
npm run preview
```

Open http://127.0.0.1:4173. Edit `index.html`, `styles.css`, or `app.js`, then rebuild and refresh. Feature guide content is in `content/features.mjs`; `scripts/feature-pages.mjs` renders seven standalone feature pages. Add-on content is in `content/addons.mjs`; `scripts/addon-pages.mjs` renders the separate directory and nine integration pages. Typography uses local Georgia and Arial/Helvetica system fonts. No external fonts or other third-party resources are requested.

## Publish on GitHub Pages

The repository is `yarsa/erpnepal.org`. In its **Settings → Pages**, choose **GitHub Actions** as the publishing source. Push to `master`; `.github/workflows/pages.yml` builds, checks, and publishes only `dist/`.

The default public address is https://yarsa.github.io/erpnepal.org/ unless an organization-level or repository-level custom domain changes it. The workflow obtains the real Pages URL and uses it for the canonical URL, social URL, sitemap, and robots.txt. A local build deliberately has no assumed canonical domain.

The workflow attempts automatic Pages enablement, but GitHub may require an administrator to enable Pages first. No paid hosting is needed for a public repository. This hosts the marketing site; the ERP application needs its own server.

## Optional custom domain: erpnepal.org

1. Verify domain ownership in the GitHub organization’s Pages settings.
2. Set `erpnepal.org` under repository **Settings → Pages → Custom domain**.
3. At the domain’s DNS provider, configure `@` A records pointing to:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. For `www`, add a CNAME pointing to `yarsa.github.io` (no repository path).
5. Once GitHub verifies DNS and issues the certificate, turn on **Enforce HTTPS**.
6. Rerun the Pages workflow so metadata uses the new domain.

Do not overwrite existing email records or unrelated DNS records. Configure the domain in GitHub before pointing DNS to it. A repository `CNAME` file is not required or used by this Actions deployment. Domain registration/renewal is separate from free website hosting.

Official references: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [custom domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Content and provenance

Feature and installation content was checked against `yarsa/nepal-compliance` at commit `fbb9e95be233631713703b09bcb727044894c5c5` on 2026-09-27:

- `README.md`: implemented date, billing, accounting, HR, and payroll features; biometric attendance remains planned.
- `docs/manual-install.md` and `docs/docker-install.md`: prerequisites and installation paths.
- The homepage feature index links to documented capabilities; it does not simulate a product interface.
- No claims of regulatory certification, guaranteed compliance, customer adoption, or commercial support are made.
- Local professional review is recommended before using accounting/payroll configuration in production.

The repository’s original Apache-2.0 license is preserved. The product itself is GPL-3.0. See `NOTICE.md` for the reused product icon.

## Search and feature pages

See [Search and AI discovery](docs/SEARCH.md) for page coverage, canonical URLs, structured data, sitemap generation, and the remaining publication/indexing steps. Search rankings and inclusion in AI answers are not guaranteed.

# Search and AI discovery

## What is implemented

The homepage introduces accounting, invoicing, payroll, and employee workflows. Seven feature pages answer distinct product questions. Nine dedicated add-on pages cover payments, QR devices, SMS, attendance, ecommerce, and custom integrations, with provider references and explicit scope. Nepali dates are a supporting feature.

| Page | Example search intent |
| --- | --- |
| `/` | ERPNext for Nepal; open-source ERP Nepal |
| `/features/accounting-and-vat/` | ERPNext Nepal VAT reports; Nepal accounting reports |
| `/features/invoicing/` | Nepal ERPNext invoice numbering; invoice cancellation |
| `/features/cbms/` | ERPNext IRD CBMS integration |
| `/features/payroll/` | Nepal payroll ERPNext; Frappe HR SSF EPF |
| `/features/hr-and-leave/` | Frappe HR Nepal leave allocation |
| `/features/audit-and-reports/` | ERPNext audit trail Nepal; invoice history |
| `/features/nepali-dates/` | ERPNext Nepali date support |

These are relevant query examples, not measured keyword volumes or ranking predictions.

- Every page is complete static HTML. Reading the content does not require JavaScript, authentication, or an external API.
- Feature pages have distinct titles, descriptions, explanatory headings, source references, questions and answers, and related links.
- The homepage links directly to every feature page. Each guide links to all other guides and the installation section.
- The production build creates canonical URLs and Open Graph URLs from the actual GitHub Pages deployment address. It supports a repository subpath and a custom domain.
- `sitemap.xml` includes all 17 content pages. `robots.txt` permits crawling and points to the sitemap. The error page is excluded and marked noindex.
- JSON-LD describes the website and source project, plus feature pages and breadcrumbs. It contains no fabricated ratings, prices, certifications, or guaranteed rich-result claims.
- `llms.txt` is a small optional text index generated from the same feature data. It is not a Google ranking signal or a guarantee of inclusion in any AI answer.
- The official repository icon is served as SVG and 96×96 PNG, with crawlable favicon links on all content pages.
- The core workflow selector uses accessible buttons; the static add-on directory remains independent. All content and links are present without JavaScript.
- No third-party fonts, analytics, or image requests are needed to read the site.

## Publication and indexing

GitHub Pages deployment is enabled. On September 27, 2026, authoritative DNS returned the four GitHub Pages A records for erpnepal.org, and an HTTPS request using that address returned 200 with valid certificate verification. The local recursive resolver still had no answer, so DNS propagation remains to be observed.

Publication checks and account steps:

1. Verify the homepage and each feature URL returns the intended page over HTTPS.
2. Decide whether to use the GitHub Pages address or `erpnepal.org`. If using the custom domain, configure and verify it before submitting URLs to Google. Rerun the build after changing the domain so canonicals and the sitemap match.
3. Verify the final site in Google Search Console using an account and domain verification method you control.
4. Submit the final `/sitemap.xml` URL in Search Console.
5. Use URL Inspection on the homepage and the accounting/payroll pages. Request indexing when Google allows it.
6. Review indexing status and actual search queries as data becomes available. Correct content using those observations rather than adding repetitive keyword pages.

No Search Console verification, sitemap submission, or indexing request has been performed without account access. No DNS records were changed.

## Timing and limits

The technical work can be completed today. Google controls crawl scheduling, indexing, and rankings. Crawling can take days to weeks, and indexing is not guaranteed. No implementation can honestly promise a first-page ranking within 24 hours.

Google says its ordinary search best practices also apply to AI features; special AI files and special schema are not required. Useful public content, accurate sources, crawlable links, and a functioning website are the basis for discovery.

References reviewed September 2026:

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Request a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## Editing and checking

Feature content lives in `content/features.mjs`; add-on content lives in `content/addons.mjs`. `scripts/feature-pages.mjs` supplies the shared page layout. `scripts/build.mjs` generates the pages and discovery files.

Run `npm run build && npm run check` for local validation. For deployment metadata checks, set the same `SITE_URL` for both commands. Validation checks every HTML document, local asset, cross-page link and fragment, unique metadata, JSON-LD, sitemap, canonical URL, and the 404 homepage link.

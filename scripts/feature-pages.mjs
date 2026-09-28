const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

const labels = { 'accounting-and-vat': 'Accounting and VAT', invoicing: 'Invoicing', cbms: 'CBMS integration', payroll: 'Payroll', 'hr-and-leave': 'Employee records and leave', 'audit-and-reports': 'Audit trails and records', 'nepali-dates': 'Nepali dates' };

export function renderFeaturePage(feature, features) {
  const e = escape;
  const related = feature.related.map(slug => features.find(item => item.slug === slug)).filter(Boolean);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${e(feature.title)} | Nepal Compliance</title>
  <meta name="description" content="${e(feature.description)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${e(feature.title)}">
  <meta property="og:description" content="${e(feature.description)}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/png" sizes="96x96" href="../../assets/favicon.png">
  <link rel="icon" type="image/svg+xml" sizes="any" href="../../assets/favicon.svg">
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../app.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="container nav-wrap">
  <a class="brand" href="../../" aria-label="Nepal Compliance home"><img src="../../assets/nepal-compliance.svg" width="35" height="35" alt=""><span>Nepal Compliance</span></a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="navigation" hidden>Menu <span aria-hidden="true">≡</span></button>
  <nav id="navigation" aria-label="Main navigation"><a href="../../features/">Features</a><a href="../../addons/">Add-ons</a><a href="../../#get-started">Installation</a><a href="../../guides/">Guides</a><a href="https://github.com/yarsa/nepal-compliance">GitHub <span aria-hidden="true">↗</span></a></nav>
</div></header>
<main id="main" class="container feature-page">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="../../">Home</a></li><li><a href="../../features/">Features</a></li><li aria-current="page">${e(feature.title)}</li></ol></nav>
  <div class="feature-page-layout">
    <aside class="feature-navigation"><nav aria-label="Feature pages"><p class="section-label">Features</p>${features.map(item => `<a href="../${e(item.slug)}/"${item.slug === feature.slug ? ' aria-current="page"' : ''}>${e(labels[item.slug] || item.title)}</a>`).join('\n')}</nav><p>Requires ERPNext and Frappe HR. <a href="../../#get-started">Installation requirements</a></p></aside>
    <article class="feature-article">
      <header class="feature-page-header"><p class="section-label">Nepal Compliance / Feature guide</p><h1>${e(feature.title)}</h1><p class="feature-lead">${e(feature.intro)}</p><p class="audience"><strong>For:</strong> ${e(feature.audience.replace(/^For /, ''))}</p></header>
      <nav class="page-contents" aria-label="On this page"><span>On this page</span>${feature.sections.map((section,index)=>`<a href="#section-${index+1}">${e(section.heading)}</a>`).join('')}</nav>
      ${feature.sections.map((section, index) => `<section class="feature-page-section" id="section-${index + 1}"><h2>${e(section.heading)}</h2><p>${e(section.body)}</p>${section.items?.length ? `<ul>${section.items.map(item => `<li>${e(item)}</li>`).join('')}</ul>` : ''}</section>`).join('\n')}
      <section class="feature-page-section"><h2>Questions about this feature</h2><div class="feature-questions">${feature.questions.map(question => `<section><h3>${e(question.question)}</h3><p>${e(question.answer)}</p></section>`).join('')}</div></section>
      <section class="feature-page-section source-section"><h2>Technical references</h2><p>For your implementation team: configuration and technical details for this workflow. Available options depend on your installed version.</p><ul>${feature.sources.map(source => `<li><a href="${e(source.url)}">${e(source.label)}</a></li>`).join('')}</ul></section>
      <section class="feature-next"><div><h2>See how it fits your business</h2><p>Explore everyday workflows and the practical steps to plan your setup.</p></div><a class="button" href="../../for-your-business/">Find your starting point</a></section>
      <nav class="related-features" aria-label="Related features"><h2>Related features</h2>${related.map(item => `<a href="../${e(item.slug)}/">${e(item.title)} <span aria-hidden="true">→</span></a>`).join('')}</nav>
    </article>
  </div>
</main>
<footer class="site-footer"><div class="container"><div class="footer-top"><div><a class="brand" href="../../"><img src="../../assets/nepal-compliance.svg" width="30" height="30" alt=""><span>Nepal Compliance</span></a><p>An open-source app for ERPNext and Frappe HR.</p></div><nav aria-label="Project resources"><a href="../../nepal-hrms/">Nepal HRMS · Beta</a><a href="https://github.com/yarsa/nepal-compliance">Repository</a><a href="https://github.com/yarsa/nepal-compliance/discussions">Community</a><a href="../../features/">All features</a></nav></div><div class="footer-bottom"><p>A project by <a href="https://github.com/yarsa">Yarsa</a> and contributors. Built on software by <a href="https://frappe.io">Frappe Technologies</a>.</p><a href="https://github.com/yarsa/nepal-compliance/blob/master/LICENSE">GPL-3.0</a></div></div></footer>
</body>
</html>`;
}

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const e = escape;
export function renderAddonDirectory(addons) {
  return `<section class="section container addon-section" id="addons" aria-labelledby="addons-title">
    <div class="section-heading"><p class="section-label">02 / Add-on integrations</p><div><h2 id="addons-title">Connect payments, devices, and business services</h2><p>Explore integration options for ERPNext. These add-ons are separate from the core Nepal Compliance app; availability, provider access, hardware compatibility, and implementation scope need confirmation.</p></div></div>
    <div class="addon-directory">${addons.map(addon => `<article><p class="addon-category">${e(addon.category)}</p><h3><a href="./addons/${e(addon.slug)}/">${e(addon.shortTitle)}</a></h3><p>${e(addon.description)}</p><a class="text-link" href="./addons/${e(addon.slug)}/" aria-label="Read about ${e(addon.shortTitle)}">Integration details <span aria-hidden="true">→</span></a></article>`).join('\n')}</div>
  </section>`;
}
export function renderAddonPage(addon, addons) {
  const related = addon.related.map(slug => addons.find(item => item.slug === slug)).filter(Boolean);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${e(addon.title)} | Nepal Compliance</title>
  <meta name="description" content="${e(addon.description)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${e(addon.title)}">
  <meta property="og:description" content="${e(addon.description)}">
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
<main id="main" class="container feature-page addon-page">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="../../">Home</a></li><li><a href="../../addons/">Add-ons</a></li><li aria-current="page">${e(addon.shortTitle)}</li></ol></nav>
  <div class="feature-page-layout">
    <aside class="feature-navigation"><nav aria-label="Add-on pages"><p class="section-label">Add-on integrations</p>${addons.map(item => `<a href="../${e(item.slug)}/"${item.slug === addon.slug ? ' aria-current="page"' : ''}>${e(item.shortTitle)}</a>`).join('\n')}</nav><p>Looking for the app’s included capabilities? <a href="../../features/">Browse core features</a>.</p></aside>
    <article class="feature-article">
      <header class="feature-page-header"><p class="section-label">${e(addon.category)} / Add-on guide</p><h1>${e(addon.title)}</h1><p class="feature-lead">${e(addon.intro)}</p><p class="audience"><strong>For:</strong> ${e(addon.audience.replace(/^For /, ''))}</p></header>
      <div class="integration-scope"><strong>Integration scope</strong><p>This is a separate integration option, not a feature included with the public Nepal Compliance installation. Confirm availability, compatible versions, provider access, and any implementation or service fees before proceeding.</p></div>
      <nav class="page-contents" aria-label="On this page"><span>On this page</span>${addon.sections.map((section,index)=>`<a href="#section-${index+1}">${e(section.heading)}</a>`).join('')}<a href="#questions">Questions and answers</a></nav>
      ${addon.sections.map((section,index)=>`<section class="feature-page-section" id="section-${index+1}"><h2>${e(section.heading)}</h2><p>${e(section.body)}</p>${section.items?.length?`<ul>${section.items.map(item=>`<li>${e(item)}</li>`).join('')}</ul>`:''}</section>`).join('\n')}
      <section class="feature-page-section" id="questions"><h2>Questions and answers</h2><div class="feature-questions">${addon.questions.map(question=>`<section><h3>${e(question.question)}</h3><p>${e(question.answer)}</p></section>`).join('')}</div></section>
      <section class="feature-page-section source-section"><h2>References and scope</h2><p>Provider references describe their own products and services. They do not establish that an ERPNext connector is installed, certified, or endorsed by the provider. This integration guide was reviewed in September 2026.</p><ul>${addon.sources.map(source=>`<li><a href="${e(source.url)}">${e(source.label)}</a></li>`).join('')}</ul></section>
      <section class="feature-next"><h2>Discuss your integration requirements</h2><p>Share the workflow you want to connect, your ERPNext version, and the provider or device model. Keep passwords, payment credentials, and employee data out of public discussions.</p><a class="button" href="https://github.com/yarsa/nepal-compliance/discussions">Open project discussions <span aria-hidden="true">↗</span></a></section>
      <nav class="related-features" aria-label="Related integrations"><h2>Related integrations</h2>${related.map(item=>`<a href="../${e(item.slug)}/">${e(item.shortTitle)} <span aria-hidden="true">→</span></a>`).join('')}</nav>
    </article>
  </div>
</main>
<footer class="site-footer"><div class="container"><div class="footer-top"><div><a class="brand" href="../../"><img src="../../assets/nepal-compliance.svg" width="30" height="30" alt=""><span>Nepal Compliance</span></a><p>An open-source app for ERPNext and Frappe HR.</p></div><nav aria-label="Project resources"><a href="../../nepal-hrms/">Nepal HRMS · Beta</a><a href="../../features/">Core features</a><a href="../../addons/">Add-ons</a><a href="../../sitemap.xml">Sitemap</a></nav></div><div class="footer-bottom"><p>A project by <a href="https://github.com/yarsa">Yarsa</a> and contributors. Provider product names identify their respective services.</p><a href="https://github.com/yarsa/nepal-compliance/blob/master/LICENSE">Core app: GPL-3.0</a></div></div></footer>
</body>
</html>`;
}

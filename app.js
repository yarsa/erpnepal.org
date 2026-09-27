const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.hidden = false;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-wrap')) closeMenu();
});
const copy = document.querySelector('.copy-button');
if (copy && navigator.clipboard && window.isSecureContext) {
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(document.querySelector('#install-command').textContent);
      copy.textContent = 'Copied!';
      status.textContent = 'App download command copied to clipboard.';
    } catch {
      status.textContent = 'Clipboard unavailable. Select and copy the command manually.';
      copy.textContent = 'Select code';
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('#install-command'));
      selection.removeAllRanges();
      selection.addRange(range);
    }
    setTimeout(() => { copy.textContent = 'Copy'; }, 2500);
  });
}

// Core feature explorer; the add-on directory is separate and remains unfiltered.
const explorer = document.querySelector('.workflow-explorer');
if (explorer) {
  const groups = {
    all: { label: 'All features', description: 'Explore the capabilities included in the core app.' },
    accounting: { label: 'Accounting', description: 'Review VAT registers, document history, and fiscal-period support.' },
    billing: { label: 'Billing', description: 'Explore invoice controls, CBMS integration, document history, and date handling.' },
    people: { label: 'Payroll & HR', description: 'Review salary components, employee records, leave allocation, and date support.' },
  };
  const buttons = [...explorer.querySelectorAll('[data-workflow]')];
  const guides = [...document.querySelectorAll('.feature-directory [data-workflows]')];
  function selectWorkflow(key, updateUrl = false) {
    if (!Object.hasOwn(groups, key)) key = 'all';
    let count = 0;
    for (const guide of guides) {
      guide.hidden = key !== 'all' && !guide.dataset.workflows.split(' ').includes(key);
      if (!guide.hidden) count++;
    }
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.workflow === key));
    document.querySelector('#workflow-description').textContent = groups[key].description;
    document.querySelector('#workflow-status').textContent = `${groups[key].label}: ${count} feature guides`;
    if (updateUrl) {
      const url = new URL(location.href);
      if (key === 'all') url.searchParams.delete('workflow');
      else url.searchParams.set('workflow', key);
      if (url.href !== location.href) history.pushState(null, '', url);
    }
  }
  explorer.hidden = false;
  selectWorkflow(new URLSearchParams(location.search).get('workflow') || 'all');
  for (const button of buttons) button.addEventListener('click', () => selectWorkflow(button.dataset.workflow, true));
  window.addEventListener('popstate', () => selectWorkflow(new URLSearchParams(location.search).get('workflow') || 'all'));
}

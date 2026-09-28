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
    document.querySelector('#workflow-status').textContent = `${groups[key].label}: ${count} features`;
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

// A quiet, controllable feature reel. All links remain available without JS.
const spotlight = document.querySelector('.feature-spotlight');
if (spotlight) {
  const rows = [...spotlight.querySelectorAll('.spotlight-item')];
  const track = spotlight.querySelector('.spotlight-track');
  const controls = spotlight.querySelector('.spotlight-controls');
  const toggle = controls.querySelector('[data-spotlight="toggle"]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let paused = motion.matches;
  let hovering = false;
  let visible = true;
  let timer;
  function draw() {
    const first = Math.max(0, Math.min(selected - 1, rows.length - 3));
    const height = rows[0].getBoundingClientRect().height;
    track.style.transform = `translateY(-${first * height}px)`;
    rows.forEach((row, index) => {
      row.classList.toggle('is-highlighted', index === selected);
      const outside = index < first || index >= first + 3;
      row.inert = outside;
      row.tabIndex = outside ? -1 : 0;
      if (outside) row.setAttribute('aria-hidden', 'true');
      else row.removeAttribute('aria-hidden');
    });
    spotlight.querySelector('.spotlight-count').textContent = `${String(selected + 1).padStart(2, '0')} / ${String(rows.length).padStart(2, '0')}`;
    toggle.textContent = paused ? 'Start rotation' : 'Pause rotation';
  }
  function schedule() {
    clearTimeout(timer);
    if (!paused && !hovering && visible && !document.hidden && !spotlight.contains(document.activeElement)) {
      timer = setTimeout(() => { selected = (selected + 1) % rows.length; draw(); schedule(); }, 5000);
    }
  }
  spotlight.classList.add('is-enhanced');
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.spotlight;
    if (!action) return;
    if (action === 'toggle') paused = !paused;
    else { paused = true; selected = (selected + (action === 'next' ? 1 : -1) + rows.length) % rows.length; }
    draw(); schedule();
  });
  spotlight.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  spotlight.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  spotlight.addEventListener('focusin', schedule);
  spotlight.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; draw(); schedule(); });
  window.addEventListener('resize', draw);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(spotlight);
  draw(); schedule();
}

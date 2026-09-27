import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';

const html = await readFile('dist/index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs');
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'Expected one main heading');
for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
  if (href.startsWith('#')) assert(ids.includes(href.slice(1)), `Broken anchor: ${href}`);
}
for (const [, path] of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
  if (path) await access(`dist/${path}`);
}
assert(html.includes('name="description"'), 'Missing description');
assert(html.includes('lang="en"'), 'Missing document language');
assert(!/href=["'](?:#|javascript:)["']/.test(html), 'Placeholder action');
await access('dist/404.html');
console.log('Passed: local links, assets, heading, metadata, and no placeholder actions.');

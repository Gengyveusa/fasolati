import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const root = fileURLToPath(new URL('../', import.meta.url));
const built = f => fs.readFileSync(path.join(root, 'dist', f), 'utf8');
const source = f => fs.readFileSync(path.join(root, f), 'utf8');
const ledger = () => JSON.parse(built('claims-ledger.json'));
const nodes = tree => [tree, ...(tree.childNodes || []).flatMap(nodes)];
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const elements = file => nodes(parse(built(file)));
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');

test('all five new pages exist with canonical metadata and one main heading', () => {
  for (const slug of ['life-board', 'pathway', 'loria-dossier', 'design-partners', 'evidence']) {
    const els = elements(`${slug}/index.html`);
    assert.equal(els.filter(n => n.tagName === 'h1').length, 1, slug);
    assert.equal(attr(els.find(n => n.tagName === 'link' && attr(n, 'rel') === 'canonical'), 'href'), `https://fasolati.life/${slug}/`);
  }
});
test('ledger contains eleven uniquely identified, bounded records', () => {
  const { claims } = ledger();
  assert.equal(claims.length, 11);
  assert.equal(new Set(claims.map(c => c.id)).size, 11);
  for (const c of claims) {
    for (const field of ['id', 'title', 'category', 'setting', 'statement', 'boundary', 'next', 'reviewed', 'permalink']) assert.ok(c[field], `${c.id}:${field}`);
    assert.match(c.reviewed, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(c.sources.length || c.category === 'Design boundary');
    for (const s of c.sources) assert.ok(s.url.startsWith('https://') && s.label);
  }
});
test('mechanism claims exactly reuse the existing science map', () => {
  const mechanisms = JSON.parse(built('evidence-map.json')).mechanisms;
  for (const m of mechanisms) {
    const c = ledger().claims.find(c => c.id === m.id);
    assert.equal(c.statement, m.finding); assert.equal(c.boundary, m.boundary);
    assert.equal(c.setting, m.setting); assert.equal(c.next, m.use);
    assert.equal(c.sources[0].url, m.url);
    if (m.boundaryUrl) assert.ok(c.sources.some(s => s.url === m.boundaryUrl));
  }
});
test('all JSON claims and citations appear in the rendered ledger', () => {
  const els = elements('evidence/index.html');
  for (const claim of ledger().claims) {
    const section = els.find(n => attr(n, 'id') === `claim-${claim.id}`);
    assert.ok(section, claim.id);
    const content = text(section);
    for (const field of ['statement', 'boundary', 'next']) assert.ok(content.includes(claim[field]), `${claim.id}:${field}`);
    for (const s of claim.sources) assert.ok(nodes(section).some(n => attr(n, 'href') === s.url), s.url);
  }
});
test('clinical records retain population, comparator and time boundaries', () => {
  const claims = ledger().claims;
  const glucose = claims.find(c => c.id === 'human-glycemic-control');
  for (const term of ['diabetes and periodontitis', '0.43', '0.28', '0.59', 'usual care', 'three to four months', 'moderate-certainty']) assert.ok(glucose.statement.includes(term));
  assert.match(glucose.boundary, /does not.*OMVs/);
  const crp = claims.find(c => c.id === 'human-crp');
  assert.match(crp.statement, /six months/); assert.match(crp.statement, /twelve months/); assert.match(crp.statement, /limited/);
});
test('revision records reference real claim anchors and contain before, after and reason', () => {
  const { claims, revisions } = ledger();
  assert.equal(revisions.length, 5);
  assert.equal(new Set(revisions.map(r => r.id)).size, revisions.length);
  const html = built('evidence/index.html');
  for (const r of revisions) {
    assert.ok(claims.some(c => c.id === r.claimId));
    for (const field of ['date', 'before', 'after', 'reason']) assert.ok(r[field]);
    assert.ok(html.includes(`id="${r.id}"`));
  }
});
test('RSS and JSON revision identities remain aligned', () => {
  const rss = built('evidence-updates.xml');
  assert.match(rss, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  assert.equal((rss.match(/<item>/g) || []).length, ledger().revisions.length);
  for (const r of ledger().revisions) {
    assert.ok(rss.includes(`fasolati-evidence-${r.id}`));
    assert.ok(rss.includes(`https://fasolati.life/evidence/#${r.id}`));
  }
});
test('topic choices are explicit and the client checks the intent allowlist', () => {
  const els = elements('partner/index.html');
  const select = els.find(n => n.tagName === 'select' && attr(n, 'id') === 'pf-topic');
  assert.ok(select);
  assert.deepEqual(nodes(select).filter(n => n.tagName === 'option').map(n => attr(n, 'value')), ['general', 'design-partner', 'loria-dossier', 'evidence-correction']);
  const js = source('src/scripts/partner-form.js');
  assert.match(js, /Object\.hasOwn\(TOPIC_LABELS, requestedIntent\)/);
  assert.ok(!js.includes("value: requestedIntent"));
});
test('downloads are present and nonempty', () => {
  for (const file of ['downloads/clinician-review-brief.md', 'downloads/loria-evidence-checklist.md']) assert.ok(built(file).length > 500, file);
});
test('new pages are in the sitemap and the inquiry form stays out', () => {
  const xml = built('sitemap-0.xml');
  for (const slug of ['life-board', 'pathway', 'loria-dossier', 'design-partners', 'evidence']) assert.ok(xml.includes(`https://fasolati.life/${slug}/`));
  assert.ok(!xml.includes('https://fasolati.life/partner/'));
});

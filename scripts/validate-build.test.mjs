import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validateBuild } from './validate-build.mjs';

// Isolated synthetic artifacts: never mutate the real dist or source tree.
const root = mkdtempSync(path.join(os.tmpdir(), 'fasolati-build-validator-'));
console.log(`Validator fixtures retained at ${root}`);
let fixtureNumber = 0;
const origin = 'https://fasolati.life';
const routes = ['/', '/loria/', '/lytica/', '/gut-stack/', '/engine/', '/shop/',
  '/platform/', '/science/', '/about/', '/partner/', '/404.html', '/privacy/'];
const outputFor = route => route.endsWith('/') ? `${route.slice(1)}index.html` : route.slice(1);
const xml = locations => `<?xml version="1.0"?><urlset>${locations.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`;
function fixture() {
  const directory = path.join(root, String(++fixtureNumber));
  const distDir = path.join(directory, 'dist');
  const sourceDir = path.join(directory, 'src');
  const write = (file, value) => {
    const destination = path.join(distDir, file);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, value);
  };
  const change = (file, replace) => write(file, replace(readFileSync(path.join(distDir, file), 'utf8')));
  const omit = file => renameSync(path.join(distDir, file), path.join(directory, `${file.replaceAll('/', '-')}.omitted`));
  const source = file => {
    const destination = path.join(sourceDir, 'pages', file);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, '// Synthetic source marker only');
  };
  source('privacy.astro');
  for (const route of routes) {
    const noindex = ['/partner/', '/404.html'].includes(route);
    write(outputFor(route), `<!doctype html><html lang="en"><head><title>Test</title>
      <meta name="description" content="A useful description.">
      <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow'}">
      <link href="${origin}${route}" rel="canonical">
      <meta property="og:url" content="${origin}${route}">
      <link rel="icon" href="/favicon.svg">
      <link rel="stylesheet" href="/_astro/site.css">
      <meta property="og:image" content="${origin}/og-image.png">
      </head><body><main id="main"><h1>A page</h1><p id="context">A &amp; B</p>
      <a href="/science/#main">Science</a><a href="#context">Context</a>
      <img src="/og-image.png" srcset="/og-image.png 1x, /og-image.png 2x" alt="test">
      <script type="module" src="/_astro/site.js"></script></main></body></html>`);
  }
  write('CNAME', 'fasolati.life\n');
  write('google4dc6a323ffad3e47.html', 'google-site-verification: google4dc6a323ffad3e47.html\n');
  write('603689461a654e986827fae6bfa54c1a.txt', '603689461a654e986827fae6bfa54c1a');
  write('robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://fasolati.life/sitemap-index.xml\n');
  write('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  write('og-image.png', 'synthetic nonempty image fixture');
  write('_astro/site.css', 'body{background-image:url("/og-image.png")}');
  write('_astro/site.js', 'import "./shared.js";');
  write('_astro/shared.js', 'export const name="test";');
  write('sitemap-index.xml', `<?xml version="1.0"?><sitemapindex><sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
  write('sitemap-0.xml', xml(routes.filter(r => !['/partner/', '/404.html'].includes(r)).map(r => `${origin}${r}`)));
  return { distDir, sourceDir, write, change, omit, source };
}
const rejects = (name, mutate, pattern) => test(name, () => {
  const f = fixture();
  mutate(f);
  const result = validateBuild(f);
  assert.equal(result.ok, false, 'the corrupted artifact must fail');
  assert.match(result.errors.join('\n'), pattern);
});

test('complete static artifact passes with alternate attribute order and privacy', () => {
  const result = validateBuild(fixture());
  assert.deepEqual(result.errors, []);
  assert.equal(result.pages, 12);
  assert.equal(result.sitemapURLs, 10);
});
test('missing output returns a useful error', () => {
  assert.match(validateBuild({ distDir: path.join(root, 'does-not-exist') }).errors[0], /Run npm run build first/);
});
test('CLI missing directory exits nonzero', () => {
  const script = fileURLToPath(new URL('./validate-build.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [script, '--dist', path.join(root, 'does-not-exist')], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Build directory is missing/);
});
rejects('required route removed', f => f.omit('engine/index.html'), /Missing required route \/engine\//);
rejects('source privacy requires its generated route', f => f.omit('privacy/index.html'), /Missing required route \/privacy\//);
rejects('wrong route canonical', f => f.change('science/index.html', s => s.replace(`href="${origin}/science/"`, `href="${origin}/about/"`)), /expected exactly one canonical/);
rejects('duplicate canonical', f => f.change('index.html', s => s.replace('</head>', `<link rel="canonical" href="${origin}/"></head>`)), /expected exactly one canonical/);
rejects('incorrect CNAME', f => f.write('CNAME', 'wrong.example'), /CNAME: missing or incorrect/);
rejects('missing verification', f => f.omit('google4dc6a323ffad3e47.html'), /verification\/domain contents/);
rejects('robots block all', f => f.change('robots.txt', s => `${s}Disallow: /\n`), /whole-site indexing/);
rejects('robots sitemap missing', f => f.write('robots.txt', 'User-agent: *\nAllow: /\n'), /sitemap declaration/);
rejects('science omitted from sitemap', f => f.change('sitemap-0.xml', s => s.replace(`<url><loc>${origin}/science/</loc></url>`, '')), /Sitemap must include \/science\//);
rejects('partner appears in sitemap', f => f.change('sitemap-0.xml', s => s.replace('</urlset>', `<url><loc>${origin}/partner/</loc></url></urlset>`)), /excluded\/non-page URL/);
rejects('404 appears in sitemap', f => f.change('sitemap-0.xml', s => s.replace('</urlset>', `<url><loc>${origin}/404.html</loc></url></urlset>`)), /excluded\/non-page URL/);
rejects('cyclic sitemap index', f => f.change('sitemap-index.xml', s => s.replace('sitemap-0.xml', 'sitemap-index.xml')), /duplicate\/cyclic sitemap/);
rejects('duplicate sitemap entry', f => f.change('sitemap-0.xml', s => s.replace('</urlset>', `<url><loc>${origin}/science/</loc></url></urlset>`)), /duplicate sitemap URL/);
rejects('noncanonical sitemap URL', f => f.change('sitemap-0.xml', s => s.replace(`${origin}/science/`, `${origin}/science`)), /sitemap route is not canonical/);
rejects('broken internal page link', f => f.change('index.html', s => s.replace('/science/#main', '/absent/')), /missing internal target \/absent\//);
rejects('broken cross-page anchor', f => f.change('index.html', s => s.replace('/science/#main', '/science/#absent')), /missing anchor/);
rejects('broken same-page anchor', f => f.change('index.html', s => s.replace('href="#context"', 'href="#absent"')), /missing anchor/);
rejects('encoded unsafe URL protocol', f => f.change('index.html', s => s.replace('href="#context"', 'href="java&#115;cript:alert(1)"')), /unsafe\/unsupported URL/);
rejects('missing image', f => f.change('index.html', s => s.replace('src="/og-image.png"', 'src="/missing.png"')), /missing internal target \/missing.png/);
rejects('missing srcset image', f => f.change('index.html', s => s.replace('/og-image.png 2x', '/missing.png 2x')), /srcset.*missing internal target/);
rejects('malformed srcset cannot silently bypass the validator', f => f.change('index.html', s => s.replace('/og-image.png 2x', '/missing.png nonsense')), /malformed or unsupported srcset/);
rejects('missing CSS asset', f => f.write('_astro/site.css', 'body{background:url(./missing.woff2)}'), /missing internal target/);
rejects('missing JS import', f => f.write('_astro/site.js', 'import{a}from"./missing.js";'), /missing internal target/);
rejects('missing SVG asset', f => f.write('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg"><image href="/missing.png"/></svg>'), /SVG href.*missing internal target/);
rejects('HTML mistaken for an asset', f => f.change('index.html', s => s.replace('src="/og-image.png"', 'src="/science/"')), /asset points to HTML/);
rejects('duplicate ID', f => f.change('index.html', s => s.replace('</main>', '<span id="main">Duplicate</span></main>')), /duplicate id "main"/);
rejects('duplicate H1', f => f.change('index.html', s => s.replace('</main>', '<h1>Duplicate</h1></main>')), /exactly one nonempty H1/);
rejects('missing H1', f => f.change('index.html', s => s.replace('<h1>A page</h1>', '')), /exactly one nonempty H1/);
rejects('duplicate HTML attribute', f => f.change('index.html', s => s.replace('id="main"', 'id="main" id="other"')), /duplicate-attribute/);
rejects('unresolved ARIA target', f => f.change('index.html', s => s.replace('<main id="main">', '<main id="main" aria-describedby="missing">')), /aria-describedby references missing id/);
rejects('bad JSON-LD', f => f.change('index.html', s => s.replace('</head>', '<script type="application/ld+json">{bad}</script></head>')), /invalid JSON-LD/);
rejects('public page accidentally noindex', f => f.change('science/index.html', s => s.replace('content="index,follow"', 'content="noindex,follow"')), /public route unexpectedly noindex/);
rejects('server output is not a Pages artifact', f => f.write('server/entry.mjs', 'console.log("server");'), /non-static or private/);
rejects('form GET could disclose personal data', f => f.change('index.html', s => s.replace('</main>', '<form method="get" action="/partner/"><input disabled></form></main>')), /forms must use POST/);
rejects('form must be safe before JS loads', f => f.change('index.html', s => s.replace('</main>', '<form method="post" action="/partner/"><input type="email"></form></main>')), /disabled until JavaScript/);
rejects('file upload is prohibited', f => f.change('index.html', s => s.replace('</main>', '<input type="file"></main>')), /file upload is not supported/);
for (const [name, marker] of [
  ['stale domain', 'https://fasolati.com/'],
  ['stale artifact', 'https://claude.ai/public/artifacts/old'],
  ['stale form service', 'https://formspree.io/f/old'],
  ['local storage', "localStorage.setItem('fasolati_leads','[]')"],
  ['placeholder', 'YOUR_FORM_ID'],
  ['background tracking', 'https://js.hs-scripts.com/243149587.js'],
]) rejects(`forbidden ${name}`, f => f.write('_astro/legacy.js', marker), /forbidden/);

function evidenceFixture(f) {
  f.source('evidence-map.json.ts');
  const mechanisms = Array.from({ length: 6 }, (_, i) => ({
    id: `mechanism-${i}`, name: `Mechanism ${i}`, route: 'Exposure to response', setting: 'Cells',
    finding: 'A reported finding.', boundary: 'Not a human clinical prediction.',
    use: 'A candidate benchmark.', source: `Published study ${i}`,
    url: `https://example.org/study/${i}`, permalink: `${origin}/science/#mechanism-${i}`,
    attribution: 'Published-study finding, not a completed Fasolati experiment.',
  }));
  const map = { title: 'Evidence map', version: '2026-09-12', website: `${origin}/science/`,
    scope: 'Not a systematic review.', clinicalStatus: 'No validated clinical utility.', mechanisms };
  f.write('evidence-map.json', JSON.stringify(map));
  f.change('science/index.html', s => s.replace('</main>', `${mechanisms.map(m => `<details class="mechanism" id="${m.id}">
    <summary>${m.name} ${m.route} ${m.setting}</summary>
    <p>${m.finding} ${m.boundary} ${m.use}</p><a href="${m.url}">${m.source}</a></details>`).join('')}</main>`));
  return map;
}
test('six exported evidence rows agree with rendered mechanisms', () => {
  const f = fixture();
  evidenceFixture(f);
  assert.deepEqual(validateBuild(f).errors, []);
});
rejects('export required when source endpoint exists', f => f.source('evidence-map.json.ts'), /evidence-map.json: missing or invalid JSON/);
rejects('evidence JSON must parse', f => { evidenceFixture(f); f.write('evidence-map.json', '{'); }, /missing or invalid JSON/);
rejects('evidence retains clinical boundary', f => {
  const map = evidenceFixture(f); map.mechanisms[0].boundary = ''; f.write('evidence-map.json', JSON.stringify(map));
}, /missing boundary/);
rejects('evidence must match published HTML', f => {
  const map = evidenceFixture(f); map.mechanisms[0].finding = 'Different result.'; f.write('evidence-map.json', JSON.stringify(map));
}, /finding differs from rendered evidence/);
rejects('evidence must have all six unique IDs', f => {
  const map = evidenceFixture(f); map.mechanisms[1].id = map.mechanisms[0].id; f.write('evidence-map.json', JSON.stringify(map));
}, /duplicate mechanism/);
rejects('evidence retains research-not-clinical context', f => {
  const map = evidenceFixture(f); map.clinicalStatus = 'Validated'; f.write('evidence-map.json', JSON.stringify(map));
}, /evidence\/clinical boundaries must be retained/);

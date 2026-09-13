import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, parseFragment } from 'parse5';

const PROJECT = fileURLToPath(new URL('../', import.meta.url));
const ORIGIN = 'https://fasolati.life';
const ROUTES = ['/', '/loria/', '/lytica/', '/gut-stack/', '/engine/', '/shop/',
  '/platform/', '/science/', '/about/', '/partner/', '/404.html'];
const VERIFICATION = {
  CNAME: 'fasolati.life',
  'google4dc6a323ffad3e47.html': 'google-site-verification: google4dc6a323ffad3e47.html',
  '603689461a654e986827fae6bfa54c1a.txt': '603689461a654e986827fae6bfa54c1a',
};
const FORBIDDEN = [
  [/fasolati\.com\b/i, 'retired fasolati.com domain'],
  [/claude\.ai\/public\/artifacts\//i, 'retired Claude prototype destination'],
  [/formspree(?:\.io)?/i, 'retired Formspree integration'],
  [/\bYOUR_(?:FORM|PORTAL|API)[A-Z_]*\b/i, 'placeholder form configuration'],
  [/\b(?:localStorage|fasolati_waitlist|fasolati_leads)\b/, 'browser storage / retired contact-data backup'],
  [/Show success anyway/i, 'unconditional form-success fallback'],
  [/js\.hs-scripts\.com|hs-script-loader/i, 'removed background tracking loader'],
];
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
const elements = root => {
  const all = [];
  const walk = node => {
    if (node.tagName) all.push(node);
    for (const child of node.childNodes || []) walk(child);
  };
  walk(root);
  return all;
};
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const tokens = value => (value || '').toLowerCase().split(/\s+/);
const normalize = value => value.replace(/\s+/g, ' ').trim();
const routeFor = file => file === 'index.html' ? '/' : file.endsWith('/index.html')
  ? `/${file.slice(0, -10)}` : `/${file}`;
const outputFor = route => route.endsWith('/') ? `${route.slice(1)}index.html` : route.slice(1);

/** Read-only validation of a complete production artifact; never fetches or submits data. */
export function validateBuild({ distDir = path.join(PROJECT, 'dist'), sourceDir = path.join(PROJECT, 'src') } = {}) {
  const root = path.resolve(distDir);
  const errors = [];
  const fail = message => errors.push(message);
  const files = new Map();
  const walkFiles = (directory, prefix = '') => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const relative = `${prefix}${entry.name}`;
      if (entry.isSymbolicLink()) fail(`${relative}: symlinks are not permitted in the static artifact`);
      else if (entry.isDirectory()) walkFiles(path.join(directory, entry.name), `${relative}/`);
      else if (entry.isFile()) files.set(relative, path.join(directory, entry.name));
    }
  };
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    return { ok: false, errors: [`Build directory is missing: ${root}. Run npm run build first.`], pages: 0, files: 0 };
  }
  walkFiles(root);
  const read = file => files.has(file) ? readFileSync(files.get(file), 'utf8') : '';
  const required = [...ROUTES];
  if (existsSync(path.join(sourceDir, 'pages/privacy.astro'))) required.push('/privacy/');
  for (const route of required) {
    if (!files.has(outputFor(route))) fail(`Missing required route ${route} (${outputFor(route)})`);
  }
  for (const [file, expected] of Object.entries(VERIFICATION)) {
    if (read(file).trim() !== expected) fail(`${file}: missing or incorrect verification/domain contents`);
  }
  for (const file of ['favicon.svg', 'og-image.png', 'robots.txt', 'sitemap-index.xml']) {
    if (!files.has(file) || statSync(files.get(file)).size === 0) fail(`Missing or empty required public asset: ${file}`);
  }
  // Server adapters and source/config files must never appear in a Pages artifact.
  for (const file of files.keys()) {
    if (/^(?:server\/|client\/|src\/|node_modules\/|\.git\/)|(?:^|\/)(?:\.env(?:\..*)?|package(?:-lock)?\.json|astro\.config\.[^/]+)$/.test(file)) {
      fail(`${file}: non-static or private build artifact`);
    }
    if (/\.(?:html|js|mjs|css|json|xml|svg|txt)$/i.test(file) || file === 'CNAME') {
      const content = read(file);
      for (const [pattern, label] of FORBIDDEN) if (pattern.test(content)) fail(`${file}: forbidden ${label}`);
    }
  }
  const robots = read('robots.txt').replace(/#.*$/gm, '');
  if (!/^Sitemap:\s*https:\/\/fasolati\.life\/sitemap-index\.xml\s*$/mi.test(robots)) {
    fail('robots.txt: missing canonical sitemap declaration');
  }
  if (/^Disallow:\s*\/\s*$/mi.test(robots)) fail('robots.txt: whole-site indexing is blocked');
  if (!/^User-agent:\s*\*\s*$/mi.test(robots) || !/^Allow:\s*\/\s*$/mi.test(robots)) {
    fail('robots.txt: expected public indexing policy is missing');
  }

  const documents = new Map();
  for (const file of files.keys()) {
    if (!file.endsWith('.html') || Object.hasOwn(VERIFICATION, file)) continue;
    const parseErrors = [];
    const document = parse(read(file), { scriptingEnabled: false, onParseError: e => parseErrors.push(e) });
    const nodes = elements(document);
    const ids = new Set();
    for (const node of nodes) {
      const id = attr(node, 'id');
      if (id !== undefined) {
        if (!id || /\s/.test(id)) fail(`${file}: empty or whitespace-containing id ${JSON.stringify(id)}`);
        if (ids.has(id)) fail(`${file}: duplicate id "${id}"`);
        ids.add(id);
      }
    }
    for (const error of parseErrors) {
      if (['duplicate-attribute', 'unexpected-null-character'].includes(error.code)) {
        fail(`${file}:${error.startLine}: malformed HTML (${error.code})`);
      }
    }
    const route = routeFor(file);
    const canonical = nodes.filter(n => n.tagName === 'link' && tokens(attr(n, 'rel')).includes('canonical'));
    if (canonical.length !== 1 || attr(canonical[0], 'href') !== `${ORIGIN}${route}`) {
      fail(`${file}: expected exactly one canonical ${ORIGIN}${route}`);
    }
    const h1 = nodes.filter(n => n.tagName === 'h1');
    if (h1.length !== 1 || !text(h1[0]).trim()) fail(`${file}: expected exactly one nonempty H1 (found ${h1.length})`);
    for (const [tag, predicate, attribute, expected] of [
      ['meta', n => attr(n, 'property') === 'og:url', 'content', `${ORIGIN}${route}`],
      ['meta', n => attr(n, 'name') === 'description', 'content', null],
    ]) {
      const matches = nodes.filter(n => n.tagName === tag && predicate(n));
      if (matches.length !== 1 || !attr(matches[0], attribute)?.trim() ||
          (expected && attr(matches[0], attribute) !== expected)) fail(`${file}: missing, duplicate or incorrect ${expected ? 'og:url' : 'description'}`);
    }
    if (nodes.filter(n => n.tagName === 'title' && text(n).trim()).length !== 1) fail(`${file}: expected one nonempty title`);
    if (nodes.some(n => n.tagName === 'base')) fail(`${file}: base elements obscure internal URL resolution`);
    const noindex = nodes.some(n => n.tagName === 'meta' && attr(n, 'name')?.toLowerCase() === 'robots' &&
      tokens(attr(n, 'content')?.replaceAll(',', ' ')).includes('noindex'));
    if (['/partner/', '/404.html'].includes(route) && !noindex) fail(`${file}: expected noindex`);
    if (!['/partner/', '/404.html'].includes(route) && noindex) fail(`${file}: public route unexpectedly noindex`);
    documents.set(file, { nodes, ids, route, noindex });
  }

  let references = 0;
  const resolveLocal = url => {
    let pathname;
    try { pathname = decodeURIComponent(url.pathname); } catch { return null; }
    if (pathname.includes('\0') || pathname.includes('\\')) return null;
    const relative = path.relative(root, path.resolve(root, `.${pathname}`)).split(path.sep).join('/');
    if (relative.startsWith('../') || path.isAbsolute(relative)) return null;
    if (files.has(relative)) return relative;
    const index = `${relative.replace(/\/$/, '')}${relative ? '/' : ''}index.html`;
    return files.has(index) ? index : null;
  };
  const checkURL = (value, base, context, { asset = false, fragment = true } = {}) => {
    references++;
    if (!value?.trim()) { fail(`${context}: empty URL`); return; }
    let url;
    try { url = new URL(value, base); } catch { fail(`${context}: invalid URL ${JSON.stringify(value)}`); return; }
    if (['mailto:', 'tel:'].includes(url.protocol) && !asset) return;
    if (url.protocol === 'data:' && asset) return;
    if (!['http:', 'https:'].includes(url.protocol)) { fail(`${context}: unsafe/unsupported URL ${value}`); return; }
    if (url.hostname !== 'fasolati.life') {
      if (asset && url.protocol !== 'https:') fail(`${context}: insecure external asset ${value}`);
      return; // Remote availability is a separate review, not a network-dependent build gate.
    }
    if (url.origin !== ORIGIN || url.username || url.password) fail(`${context}: noncanonical internal origin ${value}`);
    const target = resolveLocal(url);
    if (!target) { fail(`${context}: missing internal target ${value}`); return; }
    if (asset && target.endsWith('.html')) fail(`${context}: asset points to HTML ${value}`);
    if (fragment && url.hash && documents.has(target)) {
      let hash;
      try { hash = decodeURIComponent(url.hash.slice(1)).split(':~:text=')[0]; } catch { fail(`${context}: invalid fragment ${value}`); return; }
      const targetDoc = documents.get(target);
      const namedAnchor = targetDoc.nodes.some(n => n.tagName === 'a' && attr(n, 'name') === hash);
      if (hash && hash.toLowerCase() !== 'top' && !targetDoc.ids.has(hash) && !namedAnchor) fail(`${context}: missing anchor ${value}`);
    }
    return target;
  };
  const checkCSS = (css, base, context) => {
    for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/g)) {
      const value = (match[1] ?? match[2] ?? match[3]).trim();
      if (!value.startsWith('#')) checkURL(value, base, context, { asset: true, fragment: false });
    }
    for (const match of css.matchAll(/@import\s+["']([^"']+)["']/g)) checkURL(match[1], base, context, { asset: true });
  };
  const checkJS = (js, base, context) => {
    // Static import/export and literal dynamic-import/new-URL references emitted by Vite.
    for (const match of js.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?|\bnew\s+URL\s*\(\s*)["']((?:\.{1,2}\/|\/)[^"']+)["']/g)) {
      checkURL(match[1], base, context, { asset: true, fragment: false });
    }
  };
  for (const [file, { nodes, ids, route }] of documents) {
    const base = `${ORIGIN}${route}`;
    for (const node of nodes) {
      for (const a of node.attrs || []) {
        if (['href', 'src', 'poster', 'action', 'formaction'].includes(a.name) || (node.tagName === 'object' && a.name === 'data')) {
          const isAsset = ['src', 'poster', 'data'].includes(a.name) ||
            (node.tagName === 'link' && tokens(attr(node, 'rel')).some(r => ['stylesheet', 'icon', 'preload', 'modulepreload'].includes(r)));
          checkURL(a.value, base, `${file}: <${node.tagName} ${a.name}>`, { asset: isAsset });
        }
        if (['aria-labelledby', 'aria-describedby', 'aria-controls', 'for'].includes(a.name)) {
          for (const id of a.value.trim().split(/\s+/)) if (!ids.has(id)) fail(`${file}: ${a.name} references missing id "${id}"`);
        }
      }
      for (const property of ['og:image', 'twitter:image']) {
        if (node.tagName === 'meta' && [attr(node, 'property'), attr(node, 'name')].includes(property)) {
          checkURL(attr(node, 'content'), base, `${file}: ${property}`, { asset: true });
        }
      }
      // URL tokens in srcset are followed by optional width/density descriptors.
      const srcset = attr(node, 'srcset') ?? attr(node, 'imagesrcset');
      if (srcset !== undefined) {
        const pattern = /(?:^|,\s*)(\S+?)(?:\s+[\d.]+[wx])?(?=\s*,|\s*$)/g;
        const matches = [...srcset.matchAll(pattern)];
        if (!matches.length || srcset.replace(pattern, '').trim()) fail(`${file}: malformed or unsupported srcset`);
        for (const match of matches) checkURL(match[1], base, `${file}: srcset`, { asset: true });
      }
      if (attr(node, 'style')) checkCSS(attr(node, 'style'), base, `${file}: inline style`);
      if (node.tagName === 'style') checkCSS(text(node), base, `${file}: style`);
      if (node.tagName === 'script') {
        if (attr(node, 'type') === 'application/ld+json') {
          try { JSON.parse(text(node)); } catch { fail(`${file}: invalid JSON-LD`); }
        } else checkJS(text(node), base, `${file}: script`);
      }
      if (node.tagName === 'input' && attr(node, 'type')?.toLowerCase() === 'file') fail(`${file}: health-record/file upload is not supported`);
      if (node.tagName === 'form') {
        if (attr(node, 'method')?.toLowerCase() !== 'post') fail(`${file}: forms must use POST, never GET for personal data`);
        if (attr(node, 'action') !== '/partner/') fail(`${file}: form fallback must remain the reviewed /partner/ route`);
        const controls = elements(node).filter(n => ['input', 'textarea', 'select', 'button'].includes(n.tagName));
        for (const control of controls) {
          let disabled = attr(control, 'disabled') !== undefined;
          for (let p = control.parentNode; p && p !== node; p = p.parentNode) {
            if (p.tagName === 'fieldset' && attr(p, 'disabled') !== undefined) disabled = true;
          }
          if (!disabled) fail(`${file}: form controls must remain disabled until JavaScript initializes safely`);
        }
      }
    }
  }
  for (const file of files.keys()) {
    if (/\.css$/.test(file)) checkCSS(read(file), `${ORIGIN}/${file}`, file);
    if (/\.(?:js|mjs)$/.test(file)) checkJS(read(file), `${ORIGIN}/${file}`, file);
    if (/\.svg$/.test(file)) {
      const base = `${ORIGIN}/${file}`;
      for (const node of elements(parseFragment(read(file)))) {
        for (const a of node.attrs || []) {
          if (['href', 'src'].includes(a.name)) checkURL(a.value, base, `${file}: SVG ${a.name}`, { asset: true });
          if (a.name === 'style') checkCSS(a.value, base, `${file}: SVG style`);
        }
        if (node.tagName === 'style') checkCSS(text(node), base, `${file}: SVG style`);
      }
    }
  }

  const sitemapURLs = new Set();
  const visited = new Set();
  const checkSitemap = file => {
    if (visited.has(file)) { fail(`${file}: duplicate/cyclic sitemap reference`); return; }
    visited.add(file);
    const nodes = elements(parseFragment(read(file)));
    const index = nodes.some(n => n.tagName === 'sitemapindex');
    if (!index && !nodes.some(n => n.tagName === 'urlset')) fail(`${file}: expected sitemapindex or urlset`);
    const locations = nodes.filter(n => n.tagName === 'loc').map(n => text(n).trim());
    if (!locations.length) fail(`${file}: empty sitemap`);
    for (const location of locations) {
      let url;
      try { url = new URL(location); } catch { fail(`${file}: invalid sitemap URL ${location}`); continue; }
      if (url.origin !== ORIGIN || url.search || url.hash || url.username || url.password) {
        fail(`${file}: noncanonical sitemap URL ${location}`); continue;
      }
      const target = resolveLocal(url);
      if (!target) { fail(`${file}: missing sitemap destination ${location}`); continue; }
      if (index) {
        if (!target.endsWith('.xml')) fail(`${file}: sitemap index must reference XML`);
        else checkSitemap(target);
      } else {
        if (!documents.has(target) || documents.get(target).noindex) fail(`${file}: excluded/non-page URL in sitemap ${location}`);
        if (documents.has(target) && location !== `${ORIGIN}${documents.get(target).route}`) fail(`${file}: sitemap route is not canonical ${location}`);
        if (sitemapURLs.has(location)) fail(`${file}: duplicate sitemap URL ${location}`);
        sitemapURLs.add(location);
      }
    }
  };
  if (files.has('sitemap-index.xml')) checkSitemap('sitemap-index.xml');
  for (const { route, noindex } of documents.values()) {
    if (!noindex && !sitemapURLs.has(`${ORIGIN}${route}`)) fail(`Sitemap missing public route ${route}`);
  }
  for (const route of ['/partner/', '/404.html', '/404/']) {
    if (sitemapURLs.has(`${ORIGIN}${route}`)) fail(`Sitemap includes excluded route ${route}`);
  }
  if (!sitemapURLs.has(`${ORIGIN}/science/`)) fail('Sitemap must include /science/');

  if (existsSync(path.join(sourceDir, 'pages/evidence-map.json.ts')) || files.has('evidence-map.json')) {
    try {
      const map = JSON.parse(read('evidence-map.json'));
      for (const field of ['title', 'version', 'scope', 'clinicalStatus']) {
        if (typeof map[field] !== 'string' || !map[field].trim()) fail(`evidence-map.json: missing ${field}`);
      }
      if (map.website !== `${ORIGIN}/science/`) fail('evidence-map.json: wrong website');
      if (!/not a systematic review/i.test(map.scope || '') || !/no validated/i.test(map.clinicalStatus || '')) {
        fail('evidence-map.json: evidence/clinical boundaries must be retained');
      }
      const science = documents.get('science/index.html');
      const mechanisms = science?.nodes.filter(n => n.tagName === 'details' && tokens(attr(n, 'class')).includes('mechanism')) || [];
      if (!Array.isArray(map.mechanisms) || map.mechanisms.length !== 6 || mechanisms.length !== 6) {
        fail('evidence-map.json: expected all six rendered mechanisms');
      } else {
        const seen = new Set();
        for (const m of map.mechanisms) {
          if (seen.has(m.id)) fail(`evidence-map.json: duplicate mechanism ${m.id}`);
          seen.add(m.id);
          const rendered = mechanisms.find(n => attr(n, 'id') === m.id);
          for (const field of ['id', 'name', 'route', 'setting', 'finding', 'boundary', 'use', 'source', 'url', 'attribution']) {
            if (typeof m[field] !== 'string' || !m[field].trim()) fail(`evidence-map.json: ${m.id} missing ${field}`);
          }
          if (!rendered) fail(`evidence-map.json: mechanism ${m.id} absent from science HTML`);
          else {
            for (const field of ['name', 'route', 'setting', 'finding', 'boundary', 'use', 'source']) {
              if (!normalize(text(rendered)).includes(normalize(m[field] || ''))) fail(`evidence-map.json: ${m.id}.${field} differs from rendered evidence`);
            }
            if (!elements(rendered).some(n => n.tagName === 'a' && attr(n, 'href') === m.url)) fail(`evidence-map.json: ${m.id} source URL differs from rendered evidence`);
          }
          if (!/^https:\/\/[^/]+\/.+/.test(m.url || '')) fail(`evidence-map.json: ${m.id} source must be an HTTPS URL`);
          if (m.permalink !== `${ORIGIN}/science/#${m.id}`) fail(`evidence-map.json: incorrect permalink ${m.id}`);
          else checkURL(m.permalink, ORIGIN, `evidence-map.json: ${m.id}`);
          if (!/not a completed Fasolati experiment/i.test(m.attribution || '')) fail(`evidence-map.json: ${m.id} published-study attribution is missing`);
        }
      }
    } catch (error) { fail(`evidence-map.json: missing or invalid JSON (${error.message})`); }
  }
  return { ok: errors.length === 0, errors, pages: documents.size, files: files.size, references, sitemapURLs: sitemapURLs.size };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== '--dist')) {
    console.error('Usage: node scripts/validate-build.mjs [--dist DIRECTORY]');
    process.exitCode = 2;
  } else {
    const result = validateBuild(args.length ? { distDir: args[1] } : {});
    if (!result.ok) {
      console.error(`Build validation failed (${result.errors.length} issues):\n${result.errors.map(e => `- ${e}`).join('\n')}`);
      process.exitCode = 1;
    } else console.log(`Build validation passed: ${result.pages} pages, ${result.files} files, ${result.references} references, ${result.sitemapURLs} sitemap URLs.`);
  }
}

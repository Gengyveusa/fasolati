/**
 * Submit the site's URLs to IndexNow.
 *
 * WHY
 * ---
 * Nine URLs came into existence at once when the overlays became pages. Left
 * alone, an answer engine finds them whenever it next crawls — days to weeks.
 * IndexNow is a push: Bing, Yandex, Seznam and Naver accept a list of URLs
 * directly, no account and no API key exchange. Bing's index is what feeds
 * Copilot, so this covers answer surfaces that Google Search Console does not.
 *
 * Google does NOT participate in IndexNow. The Search Console sitemap
 * submission is still a separate, manual step — this does not replace it.
 *
 * OWNERSHIP
 * ---------
 * Control of the host is proven by serving the key as plain text at
 * https://fasolati.life/<key>.txt. That file lives in public/ and is deployed
 * with the site; if it 404s, submission fails with 403 and this script says so.
 *
 * USAGE
 * -----
 *   node scripts/indexnow.mjs          # submit every URL in the live sitemap
 *   node scripts/indexnow.mjs --dry    # print the payload, submit nothing
 *
 * Safe to re-run. Resubmitting an unchanged URL is explicitly allowed; the
 * protocol asks only that you not submit URLs that haven't changed at high
 * frequency, so this is a deploy-time or on-demand tool, not a cron job.
 */

const HOST = 'fasolati.life';
const KEY = '603689461a654e986827fae6bfa54c1a';
const SITEMAP = `https://${HOST}/sitemap-index.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const dry = process.argv.includes('--dry');

/** Follow the sitemap index to its child sitemaps and collect every <loc>. */
async function collectUrls() {
  const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const index = await fetch(SITEMAP).then((r) => {
    if (!r.ok) throw new Error(`sitemap index returned ${r.status}`);
    return r.text();
  });

  const children = locs(index);
  const urls = [];

  for (const child of children) {
    const xml = await fetch(child).then((r) => {
      if (!r.ok) throw new Error(`${child} returned ${r.status}`);
      return r.text();
    });
    urls.push(...locs(xml));
  }

  // The sitemap is the source of truth on purpose: it already excludes
  // /partner/ (noindex) and /404.html, so this cannot accidentally push a
  // page the site has asked search engines to ignore.
  return [...new Set(urls)];
}

const urlList = await collectUrls();

if (urlList.length === 0) {
  console.error('[indexnow] sitemap yielded no URLs — refusing to submit an empty set.');
  process.exit(1);
}

console.log(`[indexnow] ${urlList.length} URLs from ${SITEMAP}:`);
urlList.forEach((u) => console.log(`  ${u}`));

if (dry) {
  console.log('[indexnow] --dry: nothing submitted.');
  process.exit(0);
}

// Verify the key file is actually reachable before submitting. A 403 from the
// endpoint is otherwise indistinguishable from a dozen other problems.
const keyUrl = `https://${HOST}/${KEY}.txt`;
const keyRes = await fetch(keyUrl);
const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
if (keyBody !== KEY) {
  console.error(
    `[indexnow] key file check failed: ${keyUrl} returned ${keyRes.status}` +
      (keyRes.ok ? ` with body "${keyBody.slice(0, 40)}"` : '') +
      `\n  The key must be deployed before submission will be accepted.`
  );
  process.exit(1);
}
console.log(`[indexnow] key verified at ${keyUrl}`);

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: keyUrl,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted but key still validating. Both are success.
if (res.status === 200 || res.status === 202) {
  console.log(`[indexnow] submitted ${urlList.length} URLs — HTTP ${res.status}`);
} else {
  console.error(`[indexnow] FAILED — HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}

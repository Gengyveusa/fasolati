import { CLAIMS, REVISIONS } from '../data/claims';
export const prerender = true;
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
export function GET() {
  const items = REVISIONS.map(r => {
    const claim = CLAIMS.find(c => c.id === r.claimId)!;
    const description = `${r.after}\nInterpretation limit: ${claim.boundary}\nWhy changed: ${r.reason}\nPublished support: ${claim.sources.map(s => `${s.label}: ${s.url}`).join('; ')}`;
    return `<item><title>${r.date}: ${escape(r.title)}</title><link>https://fasolati.life/evidence/#${r.id}</link><guid isPermaLink="false">fasolati-evidence-${r.id}</guid><description>${escape(description)}</description></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Fasolati evidence updates</title><link>https://fasolati.life/evidence/</link><description>Selected editorial changes, with sources and interpretation boundaries. Dates identify the review day; no automatic monitoring or cadence is promised.</description><language>en-us</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}

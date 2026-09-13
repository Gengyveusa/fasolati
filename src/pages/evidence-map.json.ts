import { MECHANISMS } from '../data/science';
export const prerender = true;
export function GET() {
  return new Response(JSON.stringify({
    title: 'Fasolati science spine: selected mechanism map',
    version: '2026-09-12',
    website: 'https://fasolati.life/science/',
    scope: 'Selected published evidence with interpretation boundaries. Not a systematic review.',
    clinicalStatus: 'Research architecture. No validated Fasolati assay, personal disease-risk score, or clinical utility is established by this map.',
    mechanisms: MECHANISMS.map(m => ({
      ...m, permalink: `https://fasolati.life/science/#${m.id}`,
      attribution: 'Published-study finding summarized by Fasolati, not a completed Fasolati experiment.'
    }))
  }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

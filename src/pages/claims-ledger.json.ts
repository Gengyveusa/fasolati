import { CLAIMS, REVISIONS, LEDGER_VERSION } from '../data/claims';
export const prerender = true;
export function GET() {
  return new Response(JSON.stringify({
    title: 'Fasolati evidence ledger', version: LEDGER_VERSION,
    scope: 'Selected evidence and design boundaries; not a systematic review or clinical validation.',
    reviewPolicy: 'Editorial checked dates are not clinical approvals. New public changes require human release review.',
    claims: CLAIMS.map(c => ({ ...c, permalink: `https://fasolati.life/evidence/#claim-${c.id}` })),
    revisions: REVISIONS
  }, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

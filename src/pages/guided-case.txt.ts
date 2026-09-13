import { GUIDED_NARRATIVE } from '../data/guided-case';

/** Build-time static text; the download never includes visitor information. */
export function GET() {
  return new Response(GUIDED_NARRATIVE, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

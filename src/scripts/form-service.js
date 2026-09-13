// The canonical is fixed by the built page. Never forward a visitor's query or fragment.
export const pageUri = () => document.querySelector('link[rel="canonical"]')?.href || 'https://fasolati.life/';
export async function submitForm(formId, fields, pageName) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/243149587/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ fields, context: { pageUri: pageUri(), pageName } })
    });
    if (!response.ok) throw new Error('The form service did not accept the request.');
  } finally {
    clearTimeout(timeout);
  }
}

const PORTAL_ID = '243149587';
const FORM_ID = '5a5c96a7-ca42-496a-b530-a76a99879e14';
const LABELS = { lytica: 'Lytica development updates', 'gut-stack': 'Gut Stack development updates', engine: 'Life Board development updates' };
document.querySelectorAll('[data-waitlist]').forEach(form => {
  const input = form.querySelector('input[type=email]');
  const button = form.querySelector('button');
  const status = document.getElementById('update-status');
  if (!input || !button || !status) return;
  let sending = false;
  const originalLabel = button.textContent;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true; button.disabled = true; button.textContent = 'Sending…';
    status.textContent = 'Requesting development updates…';
    try {
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          fields: [
            {name: 'email', value: input.value.trim()},
            {name: 'jobtitle', value: LABELS[form.dataset.waitlist] || form.dataset.waitlist}
          ],
          context: {pageUri: window.location.href, pageName: 'Fasolati development updates'}
        })
      });
      if (!response.ok) throw new Error('Request was not accepted');
      button.textContent = 'Request accepted'; input.disabled = true;
      status.textContent = 'Your request was accepted. This is an expression of interest, not a product order or promise of access.';
    } catch {
      status.textContent = 'Delivery could not be confirmed. Please retry; a retry may create a duplicate if the previous request reached us.';
      button.disabled = false; button.textContent = originalLabel;
    } finally { sending = false; }
  });
});

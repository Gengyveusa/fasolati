import { submitForm } from './form-service.js';
const FORM_ID = '5a5c96a7-ca42-496a-b530-a76a99879e14';
const LABELS = { lytica: 'Lytica development updates', 'gut-stack': 'Gut Stack development updates', engine: 'Life Board development updates' };
document.querySelectorAll('[data-waitlist]').forEach(form => {
  const input = form.querySelector('input[type=email]');
  const button = form.querySelector('button');
  const status = document.getElementById('update-status');
  if (!input || !button || !status) return;
  let sending = false, accepted = false;
  const originalLabel = button.textContent;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || accepted || !form.reportValidity()) return;
    const email = input.value.trim();
    if (!email) return;
    sending = true; button.disabled = true; input.disabled = true; button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Requesting development updates…';
    try {
      await submitForm(FORM_ID, [
        { name: 'email', value: email },
        { name: 'jobtitle', value: LABELS[form.dataset.waitlist] || form.dataset.waitlist }
      ], 'Fasolati development updates');
      accepted = true;
      button.textContent = 'Request accepted';
      status.textContent = 'Your request was accepted by the form service. This is an expression of interest, not a product order or promise of access.';
    } catch {
      status.textContent = 'Delivery could not be confirmed. Your email is still here. Please retry; a retry may create a duplicate if the previous request reached us.';
      button.disabled = false; input.disabled = false; button.textContent = originalLabel;
    } finally {
      sending = false;
      form.setAttribute('aria-busy', 'false');
    }
  });
  // No-JavaScript and failed-script states remain disabled, preventing accidental native submission.
  input.disabled = false;
  button.disabled = false;
});

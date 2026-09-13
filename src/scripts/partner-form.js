const PORTAL_ID = '243149587';
const FORM_ID = '644c74cd-8136-4b45-9d4b-2a62ff1f3df6';
const ROLE_LABELS = { clinician: 'Clinician', investor: 'Investor', dso: 'DSO Partner', researcher: 'Researcher', general: 'General Interest' };
const roleGrid = document.getElementById('role-grid');
const submitBtn = document.getElementById('pf-submit');
const form = document.getElementById('partner-form');
const success = document.getElementById('partner-success');
const status = document.getElementById('partner-status');
if (roleGrid && submitBtn && form && success && status) {
  const field = name => document.getElementById(`pf-${name}`);
  let selectedRole = null;
  let sending = false;
  const check = () => {
    const valid = selectedRole && field('first').value.trim() && field('last').value.trim() && field('email').value.trim() && field('email').validity.valid;
    submitBtn.disabled = sending || !valid;
    submitBtn.textContent = sending ? 'Sending…' : valid ? 'Send inquiry' : 'Select a role and fill required fields';
  };
  roleGrid.querySelectorAll('.role-card').forEach(card => {
    card.setAttribute('aria-pressed', 'false');
    card.addEventListener('click', () => {
      roleGrid.querySelectorAll('.role-card').forEach(c => { c.classList.remove('selected'); c.setAttribute('aria-pressed', 'false'); });
      card.classList.add('selected'); card.setAttribute('aria-pressed', 'true');
      selectedRole = card.dataset.role;
      document.querySelectorAll('.role-value').forEach(rv => rv.classList.remove('show'));
      document.getElementById(`rv-${selectedRole}`)?.classList.add('show');
      check();
    });
  });
  form.addEventListener('input', check);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending || !selectedRole || !form.reportValidity()) return;
    sending = true; check(); status.textContent = 'Sending your inquiry…';
    try {
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: field('first').value.trim() },
            { name: 'lastname', value: field('last').value.trim() },
            { name: 'email', value: field('email').value.trim() },
            { name: 'phone', value: field('phone').value.trim() },
            { name: 'company', value: field('company').value.trim() },
            { name: 'jobtitle', value: ROLE_LABELS[selectedRole] },
            { name: 'message', value: field('message').value.trim() }
          ],
          context: { pageUri: window.location.href, pageName: 'Fasolati contact inquiry' }
        })
      });
      if (!response.ok) throw new Error('Submission was not accepted');
      form.classList.add('hidden'); success.classList.add('show');
      success.setAttribute('tabindex', '-1'); success.focus();
    } catch {
      status.textContent = 'Delivery could not be confirmed. Your entries are still here. Please try again; if the previous request reached us, a retry may create a duplicate.';
    } finally { sending = false; check(); }
  });
}

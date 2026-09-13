import { submitForm } from './form-service.js';
const FORM_ID = '644c74cd-8136-4b45-9d4b-2a62ff1f3df6';
const ROLE_LABELS = { clinician: 'Clinician', investor: 'Investor', dso: 'DSO Partner', researcher: 'Researcher', general: 'General Interest' };
const TOPIC_LABELS = { general: 'General inquiry', 'design-partner': 'Clinician design-partner interest', 'loria-dossier': 'Loria dossier information', 'evidence-correction': 'Evidence question or correction' };
const roleGrid = document.getElementById('role-grid');
const submitBtn = document.getElementById('pf-submit');
const form = document.getElementById('partner-form');
const success = document.getElementById('partner-success');
const status = document.getElementById('partner-status');
if (roleGrid && submitBtn && form && success && status) {
  const field = name => document.getElementById(`pf-${name}`);
  const fields = form.querySelector('fieldset');
  const topic = field('topic');
  const requestedIntent = new URLSearchParams(window.location.search).get('intent');
  if (topic && Object.hasOwn(TOPIC_LABELS, requestedIntent)) topic.value = requestedIntent;
  let selectedRole = null, sending = false, accepted = false;
  const valid = () => selectedRole && field('first').value.trim() && field('last').value.trim() && field('email').value.trim() && field('email').validity.valid;
  const check = () => {
    submitBtn.disabled = sending || accepted || !valid();
    submitBtn.textContent = sending ? 'Sending…' : valid() ? 'Send inquiry' : 'Select a role and fill required fields';
  };
  roleGrid.querySelectorAll('.role-card').forEach(card => {
    card.setAttribute('aria-pressed', 'false');
    card.addEventListener('click', () => {
      if (sending || accepted) return;
      roleGrid.querySelectorAll('.role-card').forEach(c => { c.classList.remove('selected'); c.setAttribute('aria-pressed', 'false'); });
      card.classList.add('selected'); card.setAttribute('aria-pressed', 'true');
      selectedRole = card.dataset.role;
      document.querySelectorAll('.role-value').forEach(rv => rv.classList.remove('show'));
      document.getElementById(`rv-${selectedRole}`)?.classList.add('show');
      check();
    });
  });
  form.addEventListener('input', check);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || accepted || !valid() || !form.reportValidity()) return;
    const payload = [
      { name: 'firstname', value: field('first').value.trim() },
      { name: 'lastname', value: field('last').value.trim() },
      { name: 'email', value: field('email').value.trim() },
      { name: 'phone', value: field('phone').value.trim() },
      { name: 'company', value: field('company').value.trim() },
      { name: 'jobtitle', value: ROLE_LABELS[selectedRole] },
      { name: 'message', value: `Topic: ${Object.hasOwn(TOPIC_LABELS, topic?.value) ? TOPIC_LABELS[topic.value] : TOPIC_LABELS.general}\n\n${field('message').value.trim()}` }
    ];
    sending = true; check(); fields.disabled = true; form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your inquiry…';
    try {
      await submitForm(FORM_ID, payload, 'Fasolati contact inquiry');
      accepted = true;
      form.classList.add('hidden'); success.classList.add('show');
      success.setAttribute('tabindex', '-1'); success.focus();
    } catch {
      status.textContent = 'Delivery could not be confirmed. Your entries are still here. Please try again; if the previous request reached us, a retry may create a duplicate.';
    } finally {
      sending = false; fields.disabled = accepted; form.setAttribute('aria-busy', 'false'); check();
    }
  });
  fields.disabled = false;
  check();
}

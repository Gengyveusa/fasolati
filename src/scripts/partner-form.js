/**
 * Partner With Us — role selection, validation, HubSpot submission.
 *
 * Lifted from the monolithic inline script with two changes: it is guarded so
 * it does nothing on pages without the form (it now loads only on /partner/,
 * but the guard is what makes that a fact rather than a convention), and the
 * DOM lookups run once instead of on every keystroke.
 *
 * Portal, form ID and field mapping are unchanged.
 */

const PORTAL_ID = '243149587';
const FORM_ID = '644c74cd-8136-4b45-9d4b-2a62ff1f3df6';

const ROLE_LABELS = {
  clinician: 'Clinician',
  investor: 'Investor',
  dso: 'DSO Partner',
  researcher: 'Researcher',
  general: 'General Interest',
};

const roleGrid = document.getElementById('role-grid');
const submitBtn = document.getElementById('pf-submit');
const form = document.getElementById('partner-form');
const success = document.getElementById('partner-success');

if (roleGrid && submitBtn && form && success) {
  const fields = {
    first: document.getElementById('pf-first'),
    last: document.getElementById('pf-last'),
    email: document.getElementById('pf-email'),
    phone: document.getElementById('pf-phone'),
    company: document.getElementById('pf-company'),
    message: document.getElementById('pf-message'),
  };

  let selectedRole = null;

  const checkForm = () => {
    const valid =
      selectedRole &&
      fields.first.value.trim() &&
      fields.last.value.trim() &&
      fields.email.value.trim().includes('@');
    submitBtn.disabled = !valid;
    submitBtn.textContent = valid
      ? "Submit — Let's Connect"
      : 'Select a role and fill required fields';
  };

  roleGrid.querySelectorAll('.role-card').forEach((card) => {
    card.addEventListener('click', () => {
      roleGrid.querySelectorAll('.role-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRole = card.dataset.role;

      document.querySelectorAll('.role-value').forEach((rv) => rv.classList.remove('show'));
      document.getElementById('rv-' + selectedRole)?.classList.add('show');

      checkForm();
    });
  });

  Object.values(fields).forEach((el) => el?.addEventListener('input', checkForm));

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    const data = {
      role: selectedRole,
      firstName: fields.first.value.trim(),
      lastName: fields.last.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      company: fields.company.value.trim(),
      message: fields.message.value.trim(),
    };

    const hutk = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('hubspotutk='));

    const showSuccess = () => {
      form.classList.add('hidden');
      success.classList.add('show');
    };

    fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: data.firstName },
          { name: 'lastname', value: data.lastName },
          { name: 'email', value: data.email },
          { name: 'phone', value: data.phone },
          { name: 'company', value: data.company },
          { name: 'jobtitle', value: ROLE_LABELS[data.role] || data.role },
          { name: 'message', value: data.message },
        ],
        context: {
          hutk: hutk ? hutk.split('=')[1] : undefined,
          pageUri: window.location.href,
          pageName: 'Fasolati — Partner With Us',
        },
      }),
    })
      .then((r) => {
        if (!r.ok) console.warn('HubSpot submission returned status:', r.status);
        showSuccess();
      })
      .catch((err) => {
        console.warn('HubSpot submission error:', err);
        showSuccess();
      });

    try {
      const leads = JSON.parse(localStorage.getItem('fasolati_leads') || '[]');
      leads.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('fasolati_leads', JSON.stringify(leads));
    } catch (e) {
      /* private mode / quota — the network call is the primary path */
    }
  });
}

/**
 * Waitlist / beta-access capture, posting to the HubSpot Forms API.
 *
 * Same portal, same form, same field mapping as before — the only change is
 * that the button no longer carries `onclick="joinWaitlist('lytica',this)"`.
 * Each form declares its own product via `data-waitlist`, so the shop index
 * and the four product pages share one handler instead of the markup naming
 * the function.
 *
 * Failure is deliberately silent to the visitor: the localStorage copy below
 * means a submission is never lost to a blocked request, and telling someone
 * their email didn't save when it did would cost more than it's worth.
 */

const PORTAL_ID = '243149587';
const FORM_ID = '5a5c96a7-ca42-496a-b530-a76a99879e14';

const LABELS = {
  lytica: 'Lytica Waitlist',
  'gut-stack': 'Gut Stack Waitlist',
  engine: 'Engine Beta Waitlist',
};

document.querySelectorAll('[data-waitlist]').forEach((form) => {
  const product = form.dataset.waitlist;
  const input = form.querySelector('input[type=email]');
  const btn = form.querySelector('button');
  if (!input || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      input.style.borderColor = 'rgba(255,107,107,.5)';
      return;
    }

    btn.textContent = 'Saving…';
    btn.disabled = true;

    const done = () => {
      btn.textContent = 'Added ✓';
      btn.style.background = 'rgba(0,232,204,.15)';
      btn.style.color = 'var(--t)';
      input.disabled = true;
    };

    const hutk = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('hubspotutk='));

    fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'email', value: email },
          { name: 'jobtitle', value: LABELS[product] || product },
        ],
        context: {
          hutk: hutk ? hutk.split('=')[1] : undefined,
          pageUri: window.location.href,
          pageName: 'Fasolati — ' + product + ' waitlist',
        },
      }),
    })
      .then(done)
      .catch(done);

    try {
      const wl = JSON.parse(localStorage.getItem('fasolati_waitlist') || '[]');
      wl.push({ product, email, timestamp: new Date().toISOString() });
      localStorage.setItem('fasolati_waitlist', JSON.stringify(wl));
    } catch (e) {
      /* private mode / quota — the network call is the primary path */
    }
  });
});

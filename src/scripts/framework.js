/**
 * The Systemic Health Framework mind map — home page only.
 *
 * Behaviour is unchanged; the wiring is not. Every node header and pill used
 * to carry `onclick="toggleNode(this)"` / `onclick="togglePill(this)"`, which
 * requires the handlers to be globals on `window`. Module scripts aren't
 * global, so the handlers are bound here by delegation instead — one listener
 * on the section rather than 36 inline attributes.
 *
 * The collapsed bodies are `display:none` in the markup, not absent from it.
 * That distinction matters: a crawler parsing the raw HTML reads all 31 pill
 * explanations whether or not anything ever clicks them.
 */

const root = document.getElementById('framework');

if (root) {
  root.addEventListener('click', (e) => {
    const node = e.target.closest('.nd-h');
    if (node && root.contains(node)) return toggleNode(node);

    const pill = e.target.closest('.pill');
    if (pill && root.contains(pill)) return togglePill(pill);
  });

  // Pills are divs, so they need explicit keyboard activation to match the
  // node headers, which are real buttons and get it for free.
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const pill = e.target.closest('.pill');
    if (pill && root.contains(pill)) {
      e.preventDefault();
      togglePill(pill);
    }
  });
}

function toggleNode(btn) {
  btn.classList.toggle('open');
  const body = btn.nextElementSibling;
  if (body) body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

function togglePill(pill) {
  const exp = pill.nextElementSibling;
  if (!exp) return;
  const isOpen = exp.style.display !== 'none';
  pill.classList.toggle('open');
  exp.style.display = isOpen ? 'none' : 'block';

  const dot = pill.querySelector('.pill-dot');
  const plus = pill.querySelector('.pill-plus');
  const color = plus ? plus.style.color : '';
  if (dot) {
    dot.style.background = isOpen ? 'rgba(255,255,255,.25)' : color;
    dot.style.boxShadow = isOpen ? 'none' : '0 0 8px ' + color + '60';
  }
}

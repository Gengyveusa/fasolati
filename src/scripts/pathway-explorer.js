/**
 * Enhances a server-rendered evidence map. The source of truth is pathway.ts
 * and science.ts; the browser changes visibility, never scientific content.
 */
const explorer = document.querySelector('[data-pathway-explorer]');

if (explorer) {
  const stages = [...explorer.querySelectorAll('[data-pathway-stage]')];
  const links = [...explorer.querySelectorAll('[data-pathway-link]')];
  const status = explorer.querySelector('[data-pathway-status]');
  const compare = explorer.querySelector('[data-pathway-all]');
  const previous = explorer.querySelector('[data-pathway-prev]');
  const next = explorer.querySelector('[data-pathway-next]');
  const reset = explorer.querySelector('[data-pathway-reset]');
  let current = 0;
  let showAll = false;

  if (stages.length && links.length === stages.length && status && compare && previous && next && reset) {
    const indexFromHash = () => stages.findIndex((stage) => `#${stage.id}` === window.location.hash);

    function render() {
      stages.forEach((stage, index) => { stage.hidden = !showAll && index !== current; });
      links.forEach((link, index) => {
        if (!showAll && index === current) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
      status.textContent = showAll
        ? `All ${stages.length} stages · Compare evidence and boundaries`
        : `Stage ${current + 1} of ${stages.length} · ${stages[current].dataset.label}`;
      compare.setAttribute('aria-pressed', String(showAll));
      compare.textContent = showAll ? 'Return to one stage' : 'Compare all stages';
      previous.disabled = showAll || current === 0;
      next.disabled = showAll || current === stages.length - 1;
      explorer.dataset.view = showAll ? 'all' : 'stage';
    }

    function select(index, { focus = true, address = true } = {}) {
      if (index < 0 || index >= stages.length) return;
      current = index;
      showAll = false;
      render();
      if (address) {
        try { window.history.replaceState(null, '', `#${stages[current].id}`); } catch { /* Some embedded previews block history. */ }
      }
      if (focus) {
        stages[current].querySelector('[data-pathway-title]')?.focus({ preventScroll: true });
        stages[current].scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    }

    links.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        select(index);
      });
      link.addEventListener('keydown', (event) => {
        let destination;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') destination = (index + 1) % links.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') destination = (index - 1 + links.length) % links.length;
        if (event.key === 'Home') destination = 0;
        if (event.key === 'End') destination = links.length - 1;
        if (destination === undefined) return;
        event.preventDefault();
        select(destination, { focus: false });
        links[destination].focus({ preventScroll: true });
      });
    });

    compare.addEventListener('click', () => {
      showAll = !showAll;
      render();
    });
    previous.addEventListener('click', () => select(current - 1));
    next.addEventListener('click', () => select(current + 1));
    reset.addEventListener('click', () => {
      explorer.querySelectorAll('details[open]').forEach((detail) => { detail.open = false; });
      select(0);
    });
    window.addEventListener('hashchange', () => {
      const index = indexFromHash();
      if (index !== -1) select(index, { address: false });
    });

    let printedDetails = [];
    window.addEventListener('beforeprint', () => {
      printedDetails = [...explorer.querySelectorAll('details')].map((detail) => [detail, detail.open]);
      printedDetails.forEach(([detail]) => { detail.open = true; });
    });
    window.addEventListener('afterprint', () => {
      printedDetails.forEach(([detail, open]) => { detail.open = open; });
      printedDetails = [];
    });

    const initial = indexFromHash();
    current = initial === -1 ? 0 : initial;
    render();
    explorer.querySelector('[data-pathway-tools]').hidden = false;
    explorer.querySelector('[data-pathway-pagination]').hidden = false;
    if (initial !== -1) requestAnimationFrame(() => stages[current].scrollIntoView({ block: 'start', behavior: 'instant' }));
  }
}

/**
 * Progressive enhancement only. All authored visits and citations are already
 * present in HTML, rendered from guided-case.ts. No health inputs or requests.
 */
const board = document.querySelector('[data-guided-board]');

if (board) {
  const visits = [...board.querySelectorAll('[data-visit]')];
  const links = [...board.querySelectorAll('[data-visit-link]')];
  const status = board.querySelector('[data-board-status]');
  const readAll = board.querySelector('[data-board-all]');
  const previous = board.querySelector('[data-board-prev]');
  const next = board.querySelector('[data-board-next]');
  const reset = board.querySelector('[data-board-reset]');
  const complete = board.querySelector('[data-board-complete]');
  let current = 0;
  let showAll = false;

  if (visits.length && links.length === visits.length && status && readAll && previous && next && reset) {
    const indexFromHash = () => visits.findIndex((visit) => `#${visit.id}` === window.location.hash);
    const updateAddress = () => {
      // A public section name only; never a measurement or a health record.
      try { window.history.replaceState(null, '', `#${visits[current].id}`); } catch { /* Opaque previews can block history. */ }
    };

    function render() {
      visits.forEach((visit, index) => { visit.hidden = !showAll && index !== current; });
      links.forEach((link, index) => {
        if (!showAll && index === current) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
      previous.disabled = showAll || current === 0;
      next.disabled = showAll || current === visits.length - 1;
      readAll.setAttribute('aria-pressed', String(showAll));
      readAll.textContent = showAll ? 'Return to one visit' : 'Read all visits';
      status.textContent = showAll
        ? `All ${visits.length} fictional visits · Complete authored record`
        : `Fictional visit ${current + 1} of ${visits.length} · ${visits[current].dataset.label}`;
      if (complete) complete.hidden = !showAll && current !== visits.length - 1;
      board.querySelectorAll('[data-trace-visit]').forEach((cell) => {
        cell.classList.toggle('is-current', !showAll && `visit-${cell.dataset.traceVisit}` === visits[current].id);
      });
      board.dataset.view = showAll ? 'all' : 'guided';
    }

    function select(index, { focus = true, address = true } = {}) {
      if (index < 0 || index >= visits.length) return;
      current = index;
      showAll = false;
      render();
      if (address) updateAddress();
      if (focus) {
        visits[current].querySelector('[data-visit-title]')?.focus({ preventScroll: true });
        visits[current].scrollIntoView({ block: 'start', behavior: 'instant' });
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

    previous.addEventListener('click', () => select(current - 1));
    next.addEventListener('click', () => select(current + 1));
    readAll.addEventListener('click', () => {
      showAll = !showAll;
      render();
    });
    reset.addEventListener('click', () => {
      board.querySelectorAll('details[open]').forEach((detail) => { detail.open = false; });
      select(0);
    });
    window.addEventListener('hashchange', () => {
      const index = indexFromHash();
      if (index !== -1) select(index, { address: false });
    });

    // Printing reveals the complete authored record, not just the selected visit.
    let printedDetails = [];
    window.addEventListener('beforeprint', () => {
      printedDetails = [...board.querySelectorAll('details')].map((detail) => [detail, detail.open]);
      printedDetails.forEach(([detail]) => { detail.open = true; });
    });
    window.addEventListener('afterprint', () => {
      printedDetails.forEach(([detail, open]) => { detail.open = open; });
      printedDetails = [];
    });

    const initial = indexFromHash();
    current = initial === -1 ? 0 : initial;
    render();
    board.querySelector('[data-board-tools]').hidden = false;
    board.querySelector('[data-board-pagination]').hidden = false;
    if (initial !== -1) requestAnimationFrame(() => visits[current].scrollIntoView({ block: 'start', behavior: 'instant' }));
  }
}

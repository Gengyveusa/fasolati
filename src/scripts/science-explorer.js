const list = document.querySelector('.mechanism-list');
const tools = document.querySelector('.evidence-tools');
if (list && tools) {
  const rows = [...list.querySelectorAll('details.mechanism')];
  const search = tools.querySelector('input[type="search"]');
  const count = document.getElementById('evidence-count');
  const expand = tools.querySelector('[data-expand]');
  const reset = tools.querySelector('[data-reset]');
  const empty = document.getElementById('evidence-empty');
  const visible = () => rows.filter(row => !row.hidden);
  const normalize = value => value.normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
  const syncExpand = () => { expand.textContent = visible().length && visible().every(row => row.open) ? 'Collapse visible' : 'Expand visible'; };
  const filter = () => {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    rows.forEach(row => { row.hidden = !terms.every(term => normalize(row.textContent).includes(term)); });
    const n = visible().length;
    count.textContent = `${n} of ${rows.length} mechanisms${terms.length ? ' match' : ''}`;
    empty.hidden = n !== 0;
    expand.disabled = n === 0;
    reset.hidden = !search.value;
    syncExpand();
  };
  search.addEventListener('input', filter);
  reset.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
  expand.addEventListener('click', () => {
    const open = !visible().every(row => row.open);
    visible().forEach(row => { row.open = open; });
    syncExpand();
  });
  rows.forEach(row => row.addEventListener('toggle', syncExpand));
  function revealHash() {
    const id = location.hash.slice(1);
    const row = rows.find(item => item.id === id);
    if (row) {
      search.value = ''; filter(); row.open = true;
      row.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  addEventListener('hashchange', revealHash);
  tools.hidden = false;
  filter(); revealHash();
  let printState;
  addEventListener('beforeprint', () => {
    printState = rows.map(row => ({ row, open: row.open, hidden: row.hidden }));
    rows.forEach(row => { row.hidden = false; row.open = true; });
  });
  addEventListener('afterprint', () => printState?.forEach(({row, open, hidden}) => { row.open = open; row.hidden = hidden; }));
}

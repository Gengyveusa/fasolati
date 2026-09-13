const controls = document.getElementById('ledger-controls');
const search = document.getElementById('claim-search');
const category = document.getElementById('claim-category');
const count = document.getElementById('claim-count');
const empty = document.getElementById('claim-empty');
const clear = document.getElementById('claim-clear');
const records = [...document.querySelectorAll('.claim-record')];
if (controls && search && category && count && empty && clear) {
  const filter = () => {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    records.forEach(record => {
      record.hidden = !(words.every(w => record.dataset.search.includes(w)) && (category.value === 'all' || record.dataset.category === category.value));
      if (!record.hidden) visible++;
    });
    count.textContent = `${visible} of ${records.length} claims`;
    empty.hidden = visible !== 0;
  };
  const reset = () => { search.value = ''; category.value = 'all'; filter(); };
  search.addEventListener('input', filter);
  category.addEventListener('change', filter);
  clear.addEventListener('click', () => { reset(); search.focus(); });
  const revealFragment = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (target?.classList.contains('claim-record') && target.hidden) {
      reset(); target.scrollIntoView({ block: 'start' });
    }
  };
  window.addEventListener('hashchange', revealFragment);
  controls.hidden = false;
  revealFragment();
}

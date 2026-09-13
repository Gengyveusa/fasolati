const nav = document.getElementById('nav');
const ham = document.getElementById('hamburger');
const menu = document.getElementById('menu-overlay');
const close = document.getElementById('menu-close');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

function setMenu(open) {
  if (!menu || !ham) return;
  menu.inert = !open;
  menu.classList.toggle('open', open);
  ham.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  [main, footer, nav].forEach(el => { if (el) el.inert = open; });
  if (open) close?.focus(); else ham.focus();
}
ham?.addEventListener('click', () => setMenu(true));
close?.addEventListener('click', () => setMenu(false));
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (menu?.classList.contains('open')) setMenu(false);
    document.querySelectorAll('.topnav-item[open]').forEach(el => { el.open = false; el.querySelector('summary')?.focus(); });
  }
  if (e.key === 'Tab' && menu?.classList.contains('open')) {
    const links = [...menu.querySelectorAll('a, button')];
    const first = links[0], last = links[links.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }
});
document.addEventListener('click', e => {
  document.querySelectorAll('.topnav-item[open]').forEach(el => { if (!el.contains(e.target)) el.open = false; });
});
const themeButton = document.getElementById('theme-toggle');
function updateThemeLabel() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  themeButton?.setAttribute('aria-label', `Switch to ${next} theme`);
}
updateThemeLabel();
themeButton?.addEventListener('click', () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  updateThemeLabel();
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('v'); io.unobserve(entry.target); } });
  }, {threshold: 0.04});
  document.querySelectorAll('.mo').forEach(el => io.observe(el));
} else document.querySelectorAll('.mo').forEach(el => el.classList.add('v'));

// Preserve the original brand's ambient particle field, with reduced-motion support.
const canvas = document.getElementById('particle-canvas');
if (canvas && !reducedMotion.matches) {
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0;
  const points = Array.from({length: 65}, () => ({x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 0.5}));
  const resize = () => { width = canvas.width = innerWidth; height = canvas.height = innerHeight; };
  resize(); window.addEventListener('resize', resize);
  const draw = () => {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = document.documentElement.dataset.theme === 'light' ? 'rgba(0,105,95,0.16)' : 'rgba(0,232,204,0.16)';
      points.forEach(p => { p.y = (p.y + 0.00005) % 1; ctx.beginPath(); ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2); ctx.fill(); });
    }
    requestAnimationFrame(draw);
  };
  draw();
}
